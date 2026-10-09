import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/actions/auth';

export async function GET(request) {
  try {
    const session = await verifyAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const url = new URL(request.url);
    const range = url.searchParams.get('range') || '1m';
    const startParam = url.searchParams.get('start');
    const endParam = url.searchParams.get('end');

    let days = 30;
    let endDate = new Date();
    
    if (startParam && endParam && range === 'custom') {
      const s = new Date(startParam);
      const e = new Date(endParam);
      if (!isNaN(s) && !isNaN(e)) {
        endDate = e;
        days = Math.max(1, Math.ceil((e - s) / (1000 * 60 * 60 * 24)));
      }
    } else {
      if (range === '7d') days = 7;
      else if (range === '1m') days = 30;
      else if (range === '3m') days = 90;
      else if (range === '6m') days = 180;
      else if (range === '1y') days = 365;
    }

    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - days);

    const subscriptions = await prisma.pushSubscription.findMany({
      where: {
        OR: [
          { createdAt: { gte: startDate, lte: endDate } },
          { unsubscribedAt: { gte: startDate, lte: endDate } }
        ]
      },
      select: {
        createdAt: true,
        unsubscribedAt: true,
        category: true
      }
    });

    // Group by date and category
    const trendMap = {};

    // Initialize days
    for (let i = 0; i <= days; i++) {
      const d = new Date(endDate);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      trendMap[dateStr] = {
        date: dateStr,
        warm_lead: 0,
        content_follower: 0,
        casual: 0,
        converted: 0,
        removed: 0
      };
    }

    subscriptions.forEach(sub => {
      // Add to created counts if created within range
      if (sub.createdAt >= startDate && sub.createdAt <= endDate) {
        const createdDateStr = sub.createdAt.toISOString().split('T')[0];
        if (trendMap[createdDateStr]) {
          trendMap[createdDateStr][sub.category]++;
        }
      }

      // Add to removed counts if unsubscribed within range
      if (sub.unsubscribedAt && sub.unsubscribedAt >= startDate && sub.unsubscribedAt <= endDate) {
        const unsubDateStr = sub.unsubscribedAt.toISOString().split('T')[0];
        if (trendMap[unsubDateStr]) {
          trendMap[unsubDateStr].removed++;
        }
      }
    });

    // Convert to sorted array
    const trendData = Object.values(trendMap).sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json({ trend: trendData });
  } catch (error) {
    console.error('Trend Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
