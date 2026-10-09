import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function EngagementModels() {
  const models = [
    {
      featured: false,
      num: "ENGAGEMENT: 01",
      tag: "STARTING FRESH",
      title: "Fixed-Scope New Build",
      desc: "A clearly defined project — from initial planning to a fully working system handed over to you — with scope, cost, and timeline agreed before work begins.",
      characteristicsTitle: "Key Characteristics",
      characteristicsTitleClasses: "text-secondary",
      characteristics: [
        "Cost and timeline agreed upfront, no surprises",
        "Full source code and documentation handed over",
        "Progress delivered in milestones, not all at once"
      ],
      timeline: "TYPICAL TIMELINE: 8 TO 16 WEEKS",
      linkText: "Discuss a New Build",
      linkClasses: "text-on-surface hover:text-primary"
    },
    {
      featured: true,
      num: "ENGAGEMENT: 02 // RECOMMENDED",
      tag: "ONGOING SUPPORT",
      title: "Ongoing Architecture Partnership",
      desc: "Continued, direct access to senior-level support as your systems grow — regular check-ins and hands-on help whenever you need it, without hiring a full-time team.",
      characteristicsTitle: "Key Characteristics",
      characteristicsTitleClasses: "text-primary font-bold",
      characteristics: [
        "Direct access to me, not a support queue",
        "Regular system health check-ins, not just fixes",
        "Scales up or down as your needs change"
      ],
      timeline: "RETAINER: MONTHLY, CANCEL ANYTIME",
      linkText: "Start a Partnership",
      linkClasses: "text-primary hover:text-on-surface"
    },
    {
      featured: false,
      num: "ENGAGEMENT: 03",
      tag: "FIXING WHAT YOU HAVE",
      title: "Migration & Modernization",
      desc: "Safely moving off an outdated system, or fixing performance issues in what you already have — without disrupting the business while it happens.",
      characteristicsTitle: "Key Characteristics",
      characteristicsTitleClasses: "text-secondary",
      characteristics: [
        "No disruption to your day-to-day operations",
        "Old and new systems verified in parallel first",
        "Relief from the specific issues costing you the most"
      ],
      timeline: "TYPICAL TIMELINE: 4 TO 12 WEEKS",
      linkText: "Assess My Current System",
      linkClasses: "text-on-surface hover:text-primary"
    }
  ];

  return (
    <section className="w-full bg-surface-container-low/75 py-16">
      <div className="w-full container px-4 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase tracking-widest text-primary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              HOW WE WORK TOGETHER
            </span>
            <h2 className="font-display text-[36px] lg:text-[44px] leading-[44px] lg:leading-[52px] tracking-[-0.02em] font-bold tracking-tight text-on-surface mt-2 text-balance">
              Three Ways to Start, Depending on Where You Are
            </h2>
          </div>
          <p className="font-sans text-[14px] leading-[22px] tracking-[0em] font-medium text-secondary max-w-sm text-balance">
            Whether you're building something new, fixing what you have, or need ongoing support - here's what working together typically looks like.
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-4">
          {models.map((model, i) => (
            <div 
              key={i} 
              className={`group relative rounded-2xl p-6 lg:p-10 border transition-all duration-700 overflow-hidden flex flex-col justify-between ${
                model.featured 
                  ? 'bg-surface-container-lowest/95 border-primary/40 shadow-[0_0_40px_rgba(var(--color-primary-rgb),0.1)] hover:shadow-[0_0_60px_rgba(var(--color-primary-rgb),0.15)] hover:-translate-y-2 z-10 lg:scale-[1.03]' 
                  : 'bg-surface-container-lowest/70 border-outline/10 hover:border-outline/30 hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              
              {/* Top Accent Border */}
              {model.featured ? (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary/40 via-primary to-primary/40"></div>
              ) : (
                <div className="absolute top-0 left-0 right-0 h-1 bg-surface-variant group-hover:bg-primary/50 transition-colors duration-500"></div>
              )}

              {/* Ambient Background Glow */}
              <div className={`absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-opacity duration-1000 ${
                model.featured ? 'bg-primary/20 opacity-100' : 'bg-primary/10 opacity-0 group-hover:opacity-100'
              }`}></div>
              
              {/* Subtle Grid Overlay */}
              <div 
                className={`absolute inset-0 transition-opacity duration-700 pointer-events-none z-0 ${
                  model.featured ? 'opacity-[0.03]' : 'opacity-0 group-hover:opacity-[0.03]'
                }`}
                style={{ 
                  backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)", 
                  backgroundSize: "24px 24px" 
                }}
              ></div>

              {/* Card Content */}
              <div className="relative z-10 flex-grow">
                <div className={`flex flex-wrap gap-2 justify-between items-center pb-4 font-display text-[11px] leading-4 tracking-[0.12em] font-semibold border-b border-surface-container-highest mb-6 ${
                  model.featured ? 'text-primary' : 'text-secondary'
                }`}>
                  <span className={model.featured ? "bg-primary/10 px-2 py-0.5 rounded text-primary font-bold shadow-sm" : ""}>{model.num}</span>
                  <span className="tracking-widest">{model.tag}</span>
                </div>
                
                <h3 className={`font-display text-[26px] leading-[34px] tracking-[-0.01em] font-bold ${
                  model.featured ? 'text-on-surface' : 'text-on-surface/90 group-hover:text-on-surface transition-colors'
                }`}>
                  {model.title}
                </h3>
                <p className="font-sans text-[15px] leading-[26px] tracking-[-0.005em] font-normal text-on-surface-variant mt-3 text-balance">
                  {model.desc}
                </p>
                
                {/* Characteristics Box */}
                <div className={`mt-8 p-6 rounded-xl space-y-4 border transition-colors duration-500 ${
                  model.featured 
                    ? 'bg-primary/5 border-primary/20 shadow-inner' 
                    : 'bg-surface-container-low/40 border-outline/5 group-hover:bg-surface-container-low/80'
                }`}>
                  <div className={`font-display text-[11px] leading-4 tracking-[0.12em] uppercase font-semibold border-b pb-3 ${
                    model.featured ? 'text-primary border-primary/10' : 'text-secondary border-outline/10'
                  }`}>
                    {model.characteristicsTitle}
                  </div>
                  <div className="space-y-3 font-sans text-[14px] leading-[22px] font-medium text-on-surface">
                    {model.characteristics.map((c, j) => (
                      <div key={j} className="flex items-start gap-3 group/item">
                        <div className="relative mt-2 shrink-0">
                          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 relative z-10 ${
                            model.featured ? 'bg-primary shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.8)]' : 'bg-secondary/40 group-hover/item:bg-primary'
                          }`}></div>
                        </div>
                        <span className={`transition-colors duration-300 ${
                          model.featured ? 'text-on-surface' : 'text-on-surface/80 group-hover/item:text-primary'
                        }`}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="relative z-10 pt-6 mt-8 border-t border-surface-container-highest flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <span className="font-display text-[10px] leading-4 tracking-[0.12em] font-semibold text-secondary/80">
                  {model.timeline}
                </span>
                <Link 
                  href="/contact" 
                  className={`inline-flex items-center justify-center gap-2 font-display text-[11px] leading-4 tracking-[0.12em] uppercase font-bold transition-all duration-300 group/btn px-5 py-3 rounded-lg ${
                    model.featured 
                      ? 'bg-primary text-on-primary shadow-md hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)] hover:-translate-y-0.5' 
                      : 'bg-surface text-on-surface hover:bg-surface-container hover:text-primary border border-outline/10 hover:border-primary/30'
                  }`}
                >
                  <span>{model.linkText}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
