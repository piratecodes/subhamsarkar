"use client";

import { motion } from 'framer-motion';

export default function SudoPageHero({ title, description, iconNode, stats = [], actions = null }) {
  return (
    <div className="relative overflow-hidden bg-surface-container-lowest/50 backdrop-blur-xl border border-outline/10 rounded-3xl p-6 lg:p-8 shadow-lg flex flex-col lg:flex-row lg:items-end justify-between gap-6 group/hero">
      {/* Ambient Hero Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover/hero:bg-primary/20 transition-colors duration-1000 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3 group-hover/hero:bg-secondary/20 transition-colors duration-1000 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col gap-5">
        <div>
          <h1 className="text-3xl lg:text-4xl font-display font-black flex items-center gap-3 bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
            {iconNode && (
              <motion.div 
                animate={{ y: [0, -4, 0] }} 
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="p-3 bg-primary/10 rounded-2xl border border-primary/20 shadow-[0_0_30px_rgba(var(--color-primary),0.3)] backdrop-blur-md shrink-0"
              >
                {iconNode}
              </motion.div>
            )}
            {title}
          </h1>
          {description && (
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mt-3">
              {description}
            </p>
          )}
        </div>

        {/* Quick Metrics Bar */}
        {stats && stats.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            {stats.map((stat, idx) => (
              <div key={idx} className={`px-4 py-2 rounded-xl border flex items-center gap-2 shadow-sm ${stat.colorClass || 'bg-surface-container border-outline/10'}`}>
                {stat.pulsingDot && (
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${stat.dotColorClass || 'bg-emerald-500'}`}></span>
                )}
                {!stat.pulsingDot && stat.solidDot && (
                  <span className={`w-1.5 h-1.5 rounded-full ${stat.dotColorClass || 'bg-amber-500'}`}></span>
                )}
                <span className={`text-[10px] uppercase font-black tracking-widest ${stat.labelColorClass || 'text-secondary'}`}>
                  {stat.label}:
                </span>
                <span className={`font-mono font-bold text-sm ${stat.valueColorClass || 'text-on-surface'}`}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {actions && (
        <div className="relative z-10 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
