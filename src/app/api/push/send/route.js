import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import webpush from 'web-push';
import { verifyAdminSession } from '@/actions/auth';
import { revalidatePath } from 'next/cache';

webpush.setVapidDetails(
  "mailto:contact@subhamsarkar.dev",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function POST(request) {
  try {
    const session = await verifyAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { categories, recency, title, message, actionUrl, imageUrl, requireInteraction, vpn, country, scheduledFor, timezoneOptimized, targetLocalHour } = body;

    if (!categories || !recency || !Array.isArray(categories) || !Array.isArray(recency)) {
      return NextResponse.json({ error: 'Invalid targeting filters' }, { status: 400 });
    }

    const filters = {
      categories,
      recency,
      vpn,
      country,
      timezoneOptimized: !!timezoneOptimized,
      targetLocalHour: targetLocalHour || 9 // Default to 9:00 AM local time if timezone optimized
    };

    const campaign = await prisma.pushCampaign.create({
      data: {
        title,
        message,
        url: actionUrl || "https://subhamsarkar.dev",
        image: imageUrl || null,
        requireInteraction: requireInteraction === true,
        filters,
        status: "PENDING",
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
      }
    });

    // If it's an immediate broadcast, trigger the processor async
    if (!scheduledFor) {
      // Fire and forget
      fetch(new URL('/api/cron/queue-processor', request.url).toString()).catch(console.error);
    }

    revalidatePath('/sudo/notifications');

    return NextResponse.json({ success: true, campaignId: campaign.id, queued: !!scheduledFor });
  } catch (error) {
    console.error('Send Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
