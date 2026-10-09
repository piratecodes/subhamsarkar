"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, FileText, Activity } from "lucide-react";

export default function DashboardKPIsClient({ leadCount, newLeads, dossierCount, insightCount }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const kpis = [
    {
      title: "Total Leads",
      value: leadCount,
      icon: Users,
      color: "var(--color-primary)",
      badge: newLeads > 0 ? `${newLeads} Awaiting` : null
    },
    {
      title: "Active Portfolios",
      value: dossierCount,
      icon: Briefcase,
      color: "var(--color-secondary)",
    },
    {
      title: "Published Insights",
      value: insightCount,
      icon: FileText,
      color: "var(--color-primary)",
    },
    {
      title: "System Status",
      value: "Optimal",
      icon: Activity,
      color: "#10b981", // Emerald 500
      subtitle: "Zero critical errors."
    }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {kpis.map((kpi, idx) => (
        <motion.div 
          key={idx}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="relative overflow-hidden bg-surface-container-lowest/50 backdrop-blur-2xl border border-outline/10 rounded-[2rem] p-6 shadow-lg group cursor-pointer"
        >
          {/* Glass highlight */}
          <div className="absolute inset-0 rounded-[2rem] border-[0.5px] border-white/5 pointer-events-none" />
          
          {/* Hover Glow */}
          <div 
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
            style={{ backgroundColor: kpi.color }}
          />

          <div className="relative z-10 flex justify-between items-start mb-6">
            <div 
              className="p-3 rounded-2xl shadow-inner border border-outline/10 backdrop-blur-md"
              style={{ backgroundColor: `color-mix(in srgb, ${kpi.color} 15%, transparent)` }}
            >
              <kpi.icon className="w-6 h-6" style={{ color: kpi.color }} />
            </div>
            
            {kpi.badge && (
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-error/10 text-error border border-error/20 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-error mr-2 animate-pulse"></span>
                {kpi.badge}
              </div>
            )}
          </div>

          <div className="relative z-10">
            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{kpi.title}</p>
            <p className="text-3xl font-display font-black text-on-surface tracking-tight">{kpi.value}</p>
            {kpi.subtitle && (
              <p className="text-[10px] text-on-surface-variant/70 font-bold uppercase tracking-widest mt-2">{kpi.subtitle}</p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
