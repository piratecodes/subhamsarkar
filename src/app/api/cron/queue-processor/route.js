import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import webpush from 'web-push';

webpush.setVapidDetails(
  "mailto:contact@subham.digital",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export const dynamic = 'force-dynamic';

function getNextLocalTime(timezone, targetHour) {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      hourCycle: 'h23',
    });
    const currentLocalHourStr = formatter.format(now);
    const currentLocalHour = parseInt(currentLocalHourStr, 10);
    
    let hoursToAdd = targetHour - currentLocalHour;
    if (hoursToAdd <= 0) {
      hoursToAdd += 24;
    }
    
    const scheduledFor = new Date(now.getTime() + hoursToAdd * 60 * 60 * 1000);
    // Rough approximation, snap to the hour
    scheduledFor.setMinutes(0, 0, 0);
    return scheduledFor;
  } catch (e) {
    // If timezone is invalid or missing, send immediately
    return new Date();
  }
}

export async function GET(request) {
  try {
    // ============================================
    // STEP 1: GENERATE QUEUE ITEMS FOR NEW CAMPAIGNS
    // ============================================
    const pendingCampaigns = await prisma.pushCampaign.findMany({
      where: { status: 'PENDING' },
      take: 2
    });

    for (const campaign of pendingCampaigns) {
      // Mark as PROCESSING so we don't pick it up again
      await prisma.pushCampaign.update({
        where: { id: campaign.id },
        data: { status: 'PROCESSING' }
      });

      const filters = typeof campaign.filters === 'string' 
        ? JSON.parse(campaign.filters) 
        : (campaign.filters || {});

      const filterConditions = {
        hasSubmittedForm: false,
        unsubscribedAt: null
      };

      if (filters.categories?.length) filterConditions.category = { in: filters.categories };
      if (filters.recency?.length) filterConditions.recencyState = { in: filters.recency };
      if (filters.vpn === 'vpn_only') filterConditions.isVpn = true;
      if (filters.vpn === 'exclude_vpn') filterConditions.isVpn = false;
      if (filters.country && filters.country !== 'all') filterConditions.countryCode = filters.country;

      const subscriptions = await prisma.pushSubscription.findMany({
        where: filterConditions,
        select: { id: true, timezone: true }
      });

      // Create queue items in bulk
      const queueItems = subscriptions.map(sub => {
        let scheduledFor = campaign.scheduledFor || new Date();
        
        // Phase 2: Timezone Aware Dispatch
        if (filters.timezoneOptimized && sub.timezone) {
          scheduledFor = getNextLocalTime(sub.timezone, filters.targetLocalHour || 9);
        }

        return {
          campaignId: campaign.id,
          subscriberId: sub.id,
          scheduledFor,
          status: 'PENDING'
        };
      });

      if (queueItems.length > 0) {
        await prisma.pushNotificationQueue.createMany({
          data: queueItems
        });
      } else {
        // No matching subscribers, just complete it
        await prisma.pushCampaign.update({
          where: { id: campaign.id },
          data: { status: 'COMPLETED' }
        });
      }
    }

    // ============================================
    // STEP 2: DISPATCH DUE QUEUE ITEMS
    // ============================================
    const now = new Date();
    const itemsToDispatch = await prisma.pushNotificationQueue.findMany({
      where: {
        status: 'PENDING',
        scheduledFor: { lte: now }
      },
      include: {
        campaign: true,
        subscriber: true
      },
      take: 50 // Limit batch size for serverless
    });

    if (itemsToDispatch.length === 0) {
      return NextResponse.json({ success: true, message: "Queue is empty" });
    }

    let sent = 0;
    let failed = 0;
    const campaignStats = {};

    const hostUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://subham.digital";

    const promises = itemsToDispatch.map(async (item) => {
      if (!campaignStats[item.campaignId]) {
        campaignStats[item.campaignId] = { sent: 0, failed: 0 };
      }

      const sub = item.subscriber;
      const pushSub = {
        endpoint: sub.endpoint,
        keys: { p256dh: sub.p256dh, auth: sub.auth }
      };

      // Phase 3: Telemetry Tracking Proxy URL
      const trackingUrl = `${hostUrl}/api/push/track?id=${item.id}&url=${encodeURIComponent(item.campaign.url || hostUrl)}`;

      const payload = JSON.stringify({
        title: item.campaign.title,
        body: item.campaign.message,
        url: trackingUrl,
        image: item.campaign.image,
        requireInteraction: item.campaign.requireInteraction
      });

      try {
        await webpush.sendNotification(pushSub, payload);
        
        // Mark Sent
        await prisma.pushNotificationQueue.update({
          where: { id: item.id },
          data: { status: 'SENT', deliveredAt: new Date() }
        });
        
        sent++;
        campaignStats[item.campaignId].sent++;
      } catch (error) {
        // Mark Failed
        await prisma.pushNotificationQueue.update({
          where: { id: item.id },
          data: { 
            status: 'FAILED', 
            errorReason: error.statusCode ? `HTTP ${error.statusCode}` : error.message 
          }
        });

        if (error.statusCode === 410 || error.statusCode === 404) {
          await prisma.pushSubscription.update({
            where: { id: sub.id },
            data: { unsubscribedAt: new Date() }
          });
        }
        
        failed++;
        campaignStats[item.campaignId].failed++;
      }
    });

    await Promise.allSettled(promises);

    // Update campaign stats
    for (const [campaignId, stats] of Object.entries(campaignStats)) {
      await prisma.pushCampaign.update({
        where: { id: campaignId },
        data: {
          sentCount: { increment: stats.sent },
          failedCount: { increment: stats.failed }
        }
      });
      
      // Check if all items for this campaign are done
      const pendingLeft = await prisma.pushNotificationQueue.count({
        where: { campaignId, status: 'PENDING' }
      });
      
      if (pendingLeft === 0) {
        await prisma.pushCampaign.update({
          where: { id: campaignId },
          data: { status: 'COMPLETED' }
        });
      }
    }

    return NextResponse.json({ success: true, processed: itemsToDispatch.length, sent, failed });
  } catch (error) {
    console.error('Cron Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
