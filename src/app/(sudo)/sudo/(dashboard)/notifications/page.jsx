import React from 'react';
import { prisma } from '@/lib/prisma';
import BroadcastForm from '@/components/admin/notifications/BroadcastForm';
import SudoPageHero from '@/components/admin/layout/SudoPageHero';
import { Radio, Users, Target, Activity, Coffee, LineChart, RadioTower } from 'lucide-react';
import TrendChart from '@/components/admin/notifications/TrendChart';
import QueueManager from '@/components/admin/notifications/QueueManager';
import BroadcastAnalytics from '@/components/admin/notifications/BroadcastAnalytics';

export const metadata = {
  title: "Broadcast Notifications",
};

export default async function NotificationsPage() {
  // Fetch initial data
  const [subscriberCount, recentInsights, recentDossiers, groups, countriesData, queuedCampaigns, completedCampaigns] = await Promise.all([
    prisma.pushSubscription.count({ where: { unsubscribedAt: null } }),
    prisma.insight.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, slug: true, excerpt: true, coverImage: true, createdAt: true, category: true }
    }),
    prisma.dossier.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, associatedWith: true, thumbnail: true, createdAt: true, category: true }
    }),
    prisma.pushSubscription.groupBy({
      by: ['category', 'recencyState'],
      where: { unsubscribedAt: null },
      _count: true
    }),
    prisma.pushSubscription.groupBy({
      by: ['countryCode', 'countryName'],
      where: { unsubscribedAt: null, countryCode: { not: null } },
      _count: true
    }),
    prisma.pushCampaign.findMany({
      where: { status: { in: ["PENDING", "PROCESSING"] } },
      orderBy: { scheduledFor: 'asc' }
    }),
    prisma.pushCampaign.findMany({
      where: { status: "COMPLETED" },
      orderBy: { updatedAt: 'desc' },
      take: 10,
      include: {
        queueItems: {
          where: { clickedAt: { not: null } },
          select: { id: true }
        }
      }
    })
  ]);

  const countries = countriesData.map(c => ({ code: c.countryCode, name: c.countryName, count: c._count }));

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
      if (g.recencyState === 'inactive') inactive += cnt;
      if (g.category === 'warm_lead') {
        if (g.recencyState === 'active') activeWarmLeads += cnt;
        if (g.recencyState === 'cooling') coolingWarmLeads += cnt;
      }
      if (g.category === 'content_follower') contentFollowers += cnt;
      if (g.category === 'casual') casualVisitors += cnt;
    }
  });

  return (
    <div className="container space-y-8 pb-12">
      <SudoPageHero
        title="Push Broadcast"
        description="Transmit targeted push notifications based on engagement."
        iconNode={<Radio className="w-6 h-6 text-primary" />}
        actions={
          <div className="px-4 py-2 rounded-xl border border-outline/10 bg-surface-container flex items-center gap-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-emerald-500"></span>
            <span className="text-[10px] uppercase font-black tracking-widest text-secondary">
              Network:
            </span>
            <span className="font-mono font-bold text-sm text-on-surface">
              {total} Online
            </span>
          </div>
        }
      />

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Total Subscribers", value: total, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
          { title: "Active Warm Leads", value: activeWarmLeads, icon: Target, color: "text-red-500", bg: "bg-red-500/10" },
          { title: "Content Followers", value: contentFollowers, icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { title: "Casual Visitors", value: casualVisitors, icon: Coffee, color: "text-yellow-500", bg: "bg-yellow-500/10" },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-surface-container-lowest/50 backdrop-blur-md border border-outline/10 rounded-2xl p-5 flex items-center gap-4">
            <div className={`p-3 rounded-full ${kpi.bg}`}>
              <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-secondary">{kpi.title}</div>
              <div className="text-2xl font-display font-black text-on-surface">{kpi.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Line */}
      <div className="text-center text-xs font-medium text-secondary/70">
        Cooling Warm Leads: {coolingWarmLeads} &middot; Inactive: {inactive} &middot; Converted (removed from push): {converted}
      </div>

      {/* TREND CHART */}
      <div className="bg-surface-container-lowest/50 backdrop-blur-md border border-outline/10 rounded-4xl p-6 lg:p-8 shadow-lg">
        <div className="mb-8 relative z-10">
          <h2 className="text-xl font-display font-black tracking-tight text-on-surface flex items-center gap-2">
            <LineChart className="w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(var(--color-primary),0.8)]" />
            Subscriber Growth
          </h2>
          <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Incoming Transmission Volume</p>
        </div>
        <TrendChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-surface-container-lowest/50 backdrop-blur-2xl border border-outline/10 rounded-4xl p-6 lg:p-8 shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 rounded-4xl border-[0.5px] border-white/5 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />
            
            <div className="mb-8 relative z-10">
              <h2 className="text-xl font-display font-black tracking-tight text-on-surface flex items-center gap-2">
                <RadioTower className="w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(var(--color-primary),0.8)]" />
                Compose Transmission
              </h2>
              <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Dispatch Push Notifications To Network</p>
            </div>

            <div className="relative z-10">
              <BroadcastForm recentInsights={recentInsights} recentDossiers={recentDossiers} availableCountries={countries} />
            </div>
          </div>
        </div>
      </div>

      {/* Queue Manager Section */}
      <div className="mt-8">
        <QueueManager initialQueues={queuedCampaigns} />
      </div>
      
      {/* Analytics Section */}
      <div className="mt-8">
        <BroadcastAnalytics campaigns={completedCampaigns} />
      </div>
    </div>
  );
}
