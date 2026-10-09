import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/actions/auth';

export async function GET(request) {
  try {
    const session = await verifyAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const groups = await prisma.pushSubscription.groupBy({
      by: ['category', 'recencyState'],
      where: { unsubscribedAt: null },
      _count: true
    });

    let total = 0;
    let activeWarmLeads = 0;
    let contentFollowers = 0;
    let casualVisitors = 0;
    
    let coolingWarmLeads = 0;
    let inactive = 0;
    let converted = 0;

    groups.forEach(g => {
      const cnt = g._count;
      total += cnt;

      if (g.category === 'converted') {
        converted += cnt;
      } else {
        if (g.recencyState === 'inactive') {
          inactive += cnt;
        }

        if (g.category === 'warm_lead') {
          if (g.recencyState === 'active') activeWarmLeads += cnt;
          if (g.recencyState === 'cooling') coolingWarmLeads += cnt;
        }

        if (g.category === 'content_follower') contentFollowers += cnt;
        if (g.category === 'casual') casualVisitors += cnt;
      }
    });

    return NextResponse.json({
      total,
      activeWarmLeads,
      contentFollowers,
      casualVisitors,
      coolingWarmLeads,
      inactive,
      converted
    });
  } catch (error) {
    console.error('Stats Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
