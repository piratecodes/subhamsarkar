import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/actions/auth';

export async function GET(request) {
  try {
    const session = await verifyAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const categoriesStr = searchParams.get('categories');
    const recencyStr = searchParams.get('recency');

    const categories = categoriesStr ? categoriesStr.split(',') : [];
    const recency = recencyStr ? recencyStr.split(',') : [];
    
    const vpnFilter = searchParams.get('vpn'); // 'any', 'vpn_only', 'exclude_vpn'
    const countryFilter = searchParams.get('country'); // 'all' or 'IN', 'US', etc.

    const filterConditions = {
      category: {
        in: categories.filter(c => c !== 'converted')
      },
      recencyState: {
        in: recency
      },
      unsubscribedAt: null
    };

    if (vpnFilter === 'vpn_only') filterConditions.isVpn = true;
    if (vpnFilter === 'exclude_vpn') filterConditions.isVpn = false;
    
    if (countryFilter && countryFilter !== 'all') {
      filterConditions.countryCode = countryFilter;
    }

    // Always exclude converted
    const count = await prisma.pushSubscription.count({
      where: filterConditions
    });

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Count Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
