import React, { Suspense } from 'react';
import InsightClientGrid from '@/components/insight/InsightClientGrid';
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Industry Insights | Subham Sarkar",
  description: "Expert articles on ERP systems, CRM strategy, and software architecture for growing businesses.",
};
export const revalidate = 300;

export default async function InsightsPage() {
  let insights = [];
  let categories = [];

  try {
    insights = await prisma.insight.findMany({
      where: { isPublished: true },
      include: { author: true },
      orderBy: { createdAt: 'desc' }
    });

    // Extract unique categories
    categories = [...new Set(insights.map(i => i.category))].filter(Boolean);
  } catch (err) {
    console.error("Failed to fetch insights", err);
  }

  return (
    <main className="min-h-screen py-8 relative">
      {/* AMBIENT BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Blurred Orbs */}
        <div className="absolute -top-[20%] left-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] mix-blend-multiply opacity-70" />
        <div className="absolute top-[10%] right-[5%] w-[35%] h-[35%] rounded-full bg-secondary/15 blur-[100px] mix-blend-multiply opacity-50" />
        
        {/* Subtle Geometric Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(var(--color-surface-container-highest)_1px,transparent_1px),linear-gradient(90deg,var(--color-surface-container-highest)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-30" />
      </div>

      <div className="pt-10 pb-16 px-4 sm:px-6 lg:px-8 relative flex flex-col lg:flex-row items-center justify-between gap-12 container mx-auto">
        {/* LEFT: Text Content */}
        <div className="relative z-10 w-full lg:w-1/2 flex flex-col items-start space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container/60 border border-surface-container-highest backdrop-blur-xl shadow-sm hover:border-primary/40 transition-colors cursor-default animate-[fade-in-right_0.5s_ease-out]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="font-display text-[10px] sm:text-[11px] leading-4 tracking-[0.2em] font-bold uppercase text-on-surface">
              Commercial Awareness
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-extrabold tracking-[-0.03em] leading-[1.05] drop-shadow-sm text-on-surface animate-[fade-in-right_0.7s_ease-out]">
            Industry <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/80 to-surface-tint italic pr-2">Insights</span>
          </h1>
          
          <p className="font-sans text-base md:text-lg leading-relaxed text-secondary max-w-xl font-medium animate-[fade-in-right_0.9s_ease-out]">
            Thoughts, blueprints, and technical deep dives into software architecture, robust custom ERPs, and resilient business systems.
          </p>
        </div>

        {/* RIGHT: Animated Decorative Element */}
        <div className="hidden lg:flex relative w-1/2 h-[350px] items-center justify-center pointer-events-none animate-[fade-in-left_1s_ease-out]">
          <div className="relative w-full max-w-md aspect-video">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_50%)] opacity-10 animate-pulse" />
            
            {/* Main Floating UI Card: Article Layout */}
            <div className="absolute top-4 left-4 right-12 bottom-12 bg-surface-container-lowest/40 backdrop-blur-xl border border-surface-container-highest/80 rounded-2xl shadow-2xl p-6 flex flex-col gap-4 animate-[bounce_6s_infinite_ease-in-out]">
              {/* Header Bar */}
              <div className="flex justify-between items-center pb-3 border-b border-surface-container-highest/50">
                <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">Featured</div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
                  <div className="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
                  <div className="w-1.5 h-1.5 rounded-full bg-surface-container-highest" />
                </div>
              </div>
              {/* Skeleton Article Content */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="h-24 w-full bg-surface-container-highest/30 rounded-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="h-4 w-3/4 bg-on-surface/10 rounded-full" />
                  <div className="h-3 w-full bg-on-surface/5 rounded-full" />
                  <div className="h-3 w-5/6 bg-on-surface/5 rounded-full" />
                </div>
              </div>
            </div>

            {/* Smaller Floating Stat Card (overlapping) */}
            <div className="absolute -bottom-4 -right-4 w-60 h-28 bg-surface-container/60 backdrop-blur-2xl border border-surface-container-highest rounded-2xl shadow-xl p-4 flex flex-col justify-center animate-[bounce_5s_infinite_ease-in-out_reverse]">
              <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                Industrial Intelligence
              </div>
              <div className="text-xl font-display font-black text-on-surface tracking-tight leading-tight mt-1">
                The Future of<br/>Business Automations
              </div>
            </div>
            
            {/* Floating Tag */}
            <div className="absolute -top-6 -left-6 px-3.5 py-1.5 bg-inverse-surface/90 backdrop-blur-md rounded-xl border border-surface-container-highest shadow-2xl animate-[bounce_7s_infinite_ease-in-out]">
               <div className="text-[10px] font-bold uppercase tracking-widest text-inverse-on-surface flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Knowledge Base
               </div>
            </div>
            
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
        <InsightClientGrid initialBlogs={insights} categories={categories} />
      </Suspense>
    </main>
  );
}
