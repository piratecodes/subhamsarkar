import { prisma } from "@/lib/prisma";
import { Users, FileText, Plus, Settings as SettingsIcon, LayoutDashboard } from "lucide-react";
import DashboardTrendsClient from "@/components/admin/dashboard/DashboardTrendsClient";
import DashboardKPIsClient from "@/components/admin/dashboard/DashboardKPIsClient";
import SudoPageHero from "@/components/admin/layout/SudoPageHero";
import Link from "next/link";
import { format } from "date-fns";

export const metadata = {
  title: "Dashboard",
};


export default async function DashboardPage() {
  const [dossierCount, insightCount, leadCount, newLeads, allLeads, recentLeads] = await Promise.all([
    prisma.dossier.count(),
    prisma.insight.count(),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.lead.findMany({ select: { createdAt: true }, orderBy: { createdAt: 'desc' } }),
    prisma.lead.findMany({ take: 5, orderBy: { createdAt: 'desc' } })
  ]);

  return (
    <div className="space-y-8 pb-12">
      <SudoPageHero 
        title="Command Center"
        description="System overview and core metrics."
        iconNode={<LayoutDashboard className="w-6 h-6 text-primary" />}
        actions={
          <div className="px-4 py-2 rounded-xl border border-outline/10 bg-surface-container flex items-center gap-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-emerald-500"></span>
            <span className="text-[10px] uppercase font-black tracking-widest text-secondary">
              System:
            </span>
            <span className="font-mono font-bold text-sm text-on-surface">
              Nominal
            </span>
          </div>
        }
      />

      <DashboardKPIsClient 
        leadCount={leadCount}
        newLeads={newLeads}
        dossierCount={dossierCount}
        insightCount={insightCount}
      />

      {/* Leads Trend Chart */}
      <DashboardTrendsClient leads={allLeads} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Activity Widget */}
        <div className="bg-surface-container-lowest/50 backdrop-blur-2xl border border-outline/10 rounded-[2rem] p-6 lg:p-8 shadow-lg relative overflow-hidden group">
           <div className="absolute inset-0 rounded-[2rem] border-[0.5px] border-white/5 pointer-events-none" />
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />
           
           <h3 className="text-sm font-display font-black text-on-surface uppercase tracking-[0.2em] mb-6 relative z-10">Recent Transmissions</h3>
           
           <div className="space-y-3 relative z-10">
             {recentLeads.length > 0 ? (
               recentLeads.map((lead) => (
                 <Link key={lead.id} href="/sudo/leads" className="block p-4 rounded-xl border border-outline/10 bg-surface-container hover:bg-surface-container-highest transition-colors">
                   <div className="flex justify-between items-start mb-2">
                     <span className="font-bold text-on-surface text-sm">{lead.firstName} {lead.lastName || ''}</span>
                     <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                        lead.status === 'NEW' ? 'bg-primary/20 text-primary' : 'bg-surface-container-highest text-secondary'
                     }`}>
                       {lead.status}
                     </span>
                   </div>
                   <div className="flex justify-between items-center text-secondary text-xs">
                     <span className="truncate mr-4">{lead.email}</span>
                     <span className="shrink-0">{format(new Date(lead.createdAt), 'MMM d, yyyy')}</span>
                   </div>
                 </Link>
               ))
             ) : (
               <div className="text-center py-16 border border-dashed border-outline/20 rounded-2xl bg-surface-container/30 relative z-10 backdrop-blur-sm">
                 <div className="w-16 h-16 mx-auto bg-surface-container-highest rounded-full flex items-center justify-center mb-4 shadow-inner border border-outline/10">
                   <Users className="w-8 h-8 text-on-surface-variant/50" />
                 </div>
                 <p className="text-on-surface-variant text-[11px] font-bold uppercase tracking-[0.15em]">No incoming leads yet</p>
                 <p className="text-on-surface-variant/50 text-[9px] uppercase tracking-widest mt-2">The pipeline is currently clear</p>
               </div>
             )}
           </div>
        </div>
        
        {/* Quick Actions Widget */}
        <div className="bg-surface-container-lowest/50 backdrop-blur-2xl border border-outline/10 rounded-[2rem] p-6 lg:p-8 shadow-lg relative overflow-hidden group">
           <div className="absolute inset-0 rounded-[2rem] border-[0.5px] border-white/5 pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-secondary/10 transition-colors duration-700" />
           
           <h3 className="text-sm font-display font-black text-on-surface uppercase tracking-[0.2em] mb-6 relative z-10">Quick Actions</h3>
           
           <div className="space-y-4 relative z-10">
             <Link href="/sudo/projects" className="group/action w-full flex items-center justify-between px-6 py-5 rounded-2xl bg-surface-container hover:bg-surface-container-highest text-on-surface font-medium transition-all duration-300 border border-outline/10 shadow-sm hover:shadow-md">
               <div className="flex items-center gap-4">
                 <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover/action:scale-110 transition-transform duration-300">
                   <Plus className="w-4 h-4" />
                 </div>
                 <span className="text-[11px] font-black font-display uppercase tracking-[0.15em]">Draft New Dossier</span>
               </div>
               <div className="w-6 h-6 rounded-full border border-outline/10 flex items-center justify-center opacity-0 group-hover/action:opacity-100 -translate-x-4 group-hover/action:translate-x-0 transition-all duration-300">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m9 18 6-6-6-6"/></svg>
               </div>
             </Link>
             
             <Link href="/sudo/insights" className="group/action w-full flex items-center justify-between px-6 py-5 rounded-2xl bg-surface-container hover:bg-surface-container-highest text-on-surface font-medium transition-all duration-300 border border-outline/10 shadow-sm hover:shadow-md">
               <div className="flex items-center gap-4">
                 <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover/action:scale-110 transition-transform duration-300">
                   <FileText className="w-4 h-4" />
                 </div>
                 <span className="text-[11px] font-black font-display uppercase tracking-[0.15em]">Write New Insight</span>
               </div>
               <div className="w-6 h-6 rounded-full border border-outline/10 flex items-center justify-center opacity-0 group-hover/action:opacity-100 -translate-x-4 group-hover/action:translate-x-0 transition-all duration-300">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m9 18 6-6-6-6"/></svg>
               </div>
             </Link>

             <Link href="/sudo/settings" className="group/action w-full flex items-center justify-between px-6 py-5 rounded-2xl bg-surface-container hover:bg-surface-container-highest text-on-surface font-medium transition-all duration-300 border border-outline/10 shadow-sm hover:shadow-md">
               <div className="flex items-center gap-4">
                 <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover/action:scale-110 transition-transform duration-300">
                   <SettingsIcon className="w-4 h-4" />
                 </div>
                 <span className="text-[11px] font-black font-display uppercase tracking-[0.15em]">Update Configuration</span>
               </div>
               <div className="w-6 h-6 rounded-full border border-outline/10 flex items-center justify-center opacity-0 group-hover/action:opacity-100 -translate-x-4 group-hover/action:translate-x-0 transition-all duration-300">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m9 18 6-6-6-6"/></svg>
               </div>
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
