"use server";

import { prisma } from "@/lib/prisma";
import webpush from "web-push";
import { verifyAdminSession } from "./auth";
import { headers } from "next/headers";
import crypto from "crypto";

webpush.setVapidDetails(
  "mailto:contact@subham.digital",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function recalculateSubscriberState(subscriberId) {
  const subscriber = await prisma.pushSubscription.findUnique({
    where: { id: subscriberId },
    include: { events: true }
  });

  if (!subscriber) return;

  const events = subscriber.events;

  let score = 0;
  let hasSubmittedForm = subscriber.hasSubmittedForm;
  let lastSeenAt = subscriber.createdAt; // baseline

  const sessions = new Set();
  const sessionServicesOrWork = new Set();
  const sessionContact = new Set();

  for (const ev of events) {
    if (ev.createdAt > lastSeenAt) lastSeenAt = ev.createdAt;
    sessions.add(ev.sessionId);

    if (ev.eventType === 'form_submit') {
      hasSubmittedForm = true;
    }

    if (ev.eventType === 'scroll_depth' && ev.page.startsWith('/insights/') && ev.scrollPercent >= 60) {
      score += 2;
    }

    if (ev.eventType === 'page_view') {
      if (ev.page === '/services') {
        score += 2;
        sessionServicesOrWork.add(ev.sessionId);
      } else if (ev.page.startsWith('/work')) {
        score += 1;
        sessionServicesOrWork.add(ev.sessionId);
      } else if (ev.page === '/contact') {
        score += 1;
        sessionContact.add(ev.sessionId);
      }
    }
  }

  // Bonus: visited services/work AND contact in same session
  for (const sid of sessions) {
    if (sessionServicesOrWork.has(sid) && sessionContact.has(sid)) {
      score += 3;
      break; // apply bonus once
    }
  }

  const visitCount = sessions.size || 1;
  if (visitCount >= 2) {
    score += 2;
  }

  let category = 'casual';
  if (hasSubmittedForm) category = 'converted';
  else if (score >= 5) category = 'warm_lead';
  else if (score >= 2) category = 'content_follower';

  const daysSinceLastSeen = (new Date().getTime() - lastSeenAt.getTime()) / (1000 * 3600 * 24);
  let recencyState = 'active';
  if (daysSinceLastSeen > 45) recencyState = 'inactive';
  else if (daysSinceLastSeen > 14) recencyState = 'cooling';

  await prisma.pushSubscription.update({
    where: { id: subscriberId },
    data: {
      score,
      category,
      recencyState,
      visitCount,
      hasSubmittedForm,
      lastSeenAt
    }
  });
}



export async function savePushSubscription(subscriptionStr, sessionId) {
  try {
    const subscription = JSON.parse(subscriptionStr);
    
    // Telemetry capture
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || 'unknown');

    let countryCode = null;
    let countryName = null;
    let timezone = null;
    let isVpn = false;
    let ipHash = null;

    if (ip && ip !== 'unknown' && ip !== '::1' && ip !== '127.0.0.1' && !ip.startsWith('192.168.')) {
      try {
        ipHash = crypto.createHash('sha256').update(ip).digest('hex');

        const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,timezone,proxy,hosting`, { next: { revalidate: 3600 } });
        if (res.ok) {
          const geoData = await res.json();
          if (geoData.status === 'success') {
            countryCode = geoData.countryCode || null;
            countryName = geoData.country || null;
            timezone = geoData.timezone || null;
            isVpn = !!(geoData.proxy || geoData.hosting);
          }
        }
      } catch (e) {
        console.error("IP Geo Lookup failed:", e);
      }
    }
    
    const sub = await prisma.pushSubscription.upsert({
      where: { endpoint: subscription.endpoint },
      update: {
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
        countryCode: countryCode !== null ? countryCode : undefined,
        countryName: countryName !== null ? countryName : undefined,
        timezone: timezone !== null ? timezone : undefined,
        isVpn: isVpn,
        ipHash: ipHash !== null ? ipHash : undefined,
        unsubscribedAt: null, // Reactivate if they were previously marked as unsubscribed
      },
      create: {
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
        countryCode,
        countryName,
        timezone,
        isVpn,
        ipHash,
      }
    });

    if (sessionId) {
      // Link previous anonymous events
      await prisma.visitorEvent.updateMany({
        where: { sessionId: sessionId, subscriberId: null },
        data: { subscriberId: sub.id }
      });
      await recalculateSubscriberState(sub.id);
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to save push subscription:", error);
    return { success: false, error: "Failed to save subscription" };
  }
}

// Left intact for compatibility, but the new API route will handle the filtered broadcast
export async function broadcastPushNotification(title, message, url, image, requireInteraction) {
  try {
    const session = await verifyAdminSession();
    if (!session) return { success: false, error: "Unauthorized" };

    const subscriptions = await prisma.pushSubscription.findMany();
    
    const payload = JSON.stringify({
      title,
      body: message,
      url: url || "https://subham.digital",
      image: image || null,
      requireInteraction: requireInteraction === true
    });

    let successCount = 0;
    let failureCount = 0;

    const pushPromises = subscriptions.map(async (sub) => {
      const pushSub = {
        endpoint: sub.endpoint,
        keys: { p256dh: sub.p256dh, auth: sub.auth }
      };

      try {
        await webpush.sendNotification(pushSub, payload);
        successCount++;
      } catch (error) {
        if (error.statusCode === 410 || error.statusCode === 404) {
          await prisma.pushSubscription.delete({ where: { id: sub.id } });
        }
        failureCount++;
      }
    });

    await Promise.all(pushPromises);
    return { success: true, successCount, failureCount };
  } catch (error) {
    console.error("Broadcast failed:", error);
    return { success: false, error: "Broadcast failed" };
  }
}

export async function cancelPushCampaign(campaignId) {
  try {
    const session = await verifyAdminSession();
    if (!session) return { success: false, error: "Unauthorized" };

    await prisma.pushCampaign.delete({
      where: { 
        id: campaignId,
        status: { in: ["PENDING", "PROCESSING"] }
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Cancel failed:", error);
    return { success: false, error: "Cancel failed" };
  }
}

export async function updatePushCampaign(campaignId, data) {
  try {
    const session = await verifyAdminSession();
    if (!session) return { success: false, error: "Unauthorized" };

    await prisma.pushCampaign.update({
      where: { 
        id: campaignId,
        status: { in: ["PENDING", "PROCESSING"] }
      },
      data
    });

    return { success: true };
  } catch (error) {
    console.error("Update failed:", error);
    return { success: false, error: "Update failed" };
  }
}

export async function deleteCompletedCampaign(campaignId) {
  try {
    const session = await verifyAdminSession();
    if (!session) return { success: false, error: "Unauthorized" };

    await prisma.pushCampaign.delete({
      where: { 
        id: campaignId,
        status: "COMPLETED"
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Delete failed:", error);
    return { success: false, error: "Delete failed" };
  }
}
