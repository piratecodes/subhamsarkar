import Link from "next/link";
import { Bot, Users, Laptop, Workflow, ArrowRightLeft, ShieldCheck, ArrowRight } from "lucide-react";

export default function DisciplineStrip() {
  const disciplines = [
    {
      title: "Custom ERP Software Development",
      spec: "[SPEC-01]",
      icon: Workflow,
      desc: "Replacing rigid readymade software with custom ERP development gives growing enterprises total operational control. Engineered for multi-warehouse inventory management, automated GST billing software integration, and immutable financial ledgers - with zero recurring per-user fees.",
      stat: "RESILIENT LEDGERS",
      href: "/services/custom-erp-development"
    },
    {
      title: "Custom CRM Software Development",
      spec: "[SPEC-02]",
      icon: Users,
      desc: "Scattered WhatsApp messages and delayed follow-ups cause warm business leads to vanish. Tailored custom CRM development equips sales teams with an automated lead management system, instant WhatsApp CRM routing, and CPQ quotation engines - with unlimited seats and zero monthly fees.",
      stat: "ZERO SEAT FEES",
      href: "/services/custom-crm-development"
    },
    {
      title: "Custom Web & Mobile Applications",
      spec: "[SPEC-03]",
      icon: Laptop,
      desc: "Field dispatches and warehouse operations should never freeze when cellular data drops. Enterprise custom web application development paired with offline-first iOS and Android mobile apps keeps client portals, inventory logs, and field force automation apps in continuous synchronization.",
      stat: "OFFLINE-FIRST SYNC",
      href: "/services/web-and-mobile-application-development"
    },
    {
      title: "AI Business Process Automation",
      spec: "[SPEC-04]",
      icon: Bot,
      desc: "Manual invoice sorting, multi-system data entry, and clerical paperwork drain productive hours and invite costly human errors. Custom AI business process automation and private AI agent integration deliver self-hosted, air-gapped machine intelligence that streamlines operations without exposing company data to public models.",
      stat: "AIR-GAPPED AUTOMATION",
      href: "/services/business-process-automation"
    },
    {
      title: "Legacy Software Modernization",
      spec: "[SPEC-05]",
      icon: ArrowRightLeft,
      desc: "Fragile monolithic codebases and bloated Excel workbooks trap business operations in fear of system crashes. Phased legacy software modernization and automated database migration transition mission-critical ledgers into scalable cloud architectures with zero operational downtime and 100% data parity.",
      stat: "ZERO DOWNTIME PARITY",
      href: "/services/legacy-software-modernization"
    },
    {
      title: "Application Security Audit",
      spec: "[SPEC-06]",
      icon: ShieldCheck,
      desc: "Automated vulnerability scanners generate confusing warning reports without providing actionable code fixes. Architectural application security audits and API penetration testing uncover authentication bypasses, enforce zero-trust role permissions, and deliver verified production-ready code pull requests.",
      stat: "DIRECT CODE FIXES",
      href: "/services/application-security-audit"
    }
  ];

  return (
    <section className="relative w-full bg-surface-container-low/60 py-12 lg:py-16 overflow-hidden">
      
      {/* Encapsulated animations (fluid and purely relative) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wave-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes idle-breathe {
          0%, 100% { 
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
            border-color: var(--color-surface-container-highest);
          }
          50% { 
            box-shadow: 0 15px 30px -10px rgba(220,38,38, 0.15);
            border-color: rgba(220,38,38, 0.25);
          }
        }
        @keyframes glass-shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          15%, 100% { transform: translateX(200%) skewX(-20deg); }
        }
        @keyframes mini-bounce {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}} />

      <div className="w-full container px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 gap-4 border-b border-surface-container-highest/50 mb-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-display text-[10px] leading-[16px] tracking-[0.2em] font-bold text-primary uppercase">CORE DISCIPLINES</span>
            </div>
            <h2 className="font-display text-[26px] lg:text-[32px] leading-[1.2] tracking-[-0.02em] font-bold text-on-surface">
              Architectural Service Disciplines
            </h2>
          </div>
          <div className="flex items-center font-display text-[10px] leading-[16px] tracking-[0.1em] font-semibold text-secondary/70 border border-surface-container-highest px-4 py-1.5 rounded-full bg-surface-container/30 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 mr-2"></span>
            SPECIFICATION REGISTRY: SS-01 TO SS-06
          </div>
        </div>

        {/* 6-Card Architectural Grid (Fluid 2x3 layout with zero rigid pixel locks) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {disciplines.map((item, i) => (
            <Link 
              key={i} 
              href={item.href}
              className="relative h-full group block focus:outline-none"
            >
              {/* Layer 2: Wavy Float (Pauses on Hover) */}
              <div 
                className="h-full w-full will-change-transform group-hover:[animation-play-state:paused] [animation:wave-float_4s_ease-in-out_infinite]"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {/* Layer 3: Card UI (Fluid flexbox for natural portrait proportions on all screens) */}
                <div 
                  className="relative bg-surface-container/60 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-surface-container-highest transition-all duration-500 overflow-hidden flex flex-col justify-between h-full group-hover:-translate-y-2 group-hover:shadow-[0_15px_30px_-10px_rgba(220,38,38,0.3)] group-hover:border-primary/50 group-hover:[animation:none] [animation:idle-breathe_4s_ease-in-out_infinite]"
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  {/* Idle Glass Shimmer (Occasional sweeping glare) */}
                  <div className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none mix-blend-overlay" style={{ animation: `glass-shimmer 10s infinite ${i * 0.5}s` }}></div>
                  
                  {/* Subtle Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-surface-container-highest/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
                  
                  {/* Top scanning line on hover */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent -translate-x-full group-hover:animate-scanline opacity-0 group-hover:opacity-100 z-0"></div>

                  {/* Persistent Faint Architectural Corner Crosses with Idle Breathing */}
                  <div className="absolute top-4 left-4 w-1.5 h-1.5 border-t border-l border-surface-container-highest group-hover:border-primary/40 transition-colors duration-500 pointer-events-none" style={{ animation: `breathe 4s ease-in-out infinite ${i * 0.3}s` }}></div>
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 border-t border-r border-surface-container-highest group-hover:border-primary/40 transition-colors duration-500 pointer-events-none" style={{ animation: `breathe 4s ease-in-out infinite ${i * 0.3 + 1}s` }}></div>
                  <div className="absolute bottom-4 left-4 w-1.5 h-1.5 border-b border-l border-surface-container-highest group-hover:border-primary/40 transition-colors duration-500 pointer-events-none" style={{ animation: `breathe 4s ease-in-out infinite ${i * 0.3 + 2}s` }}></div>
                  <div className="absolute bottom-4 right-4 w-1.5 h-1.5 border-b border-r border-surface-container-highest group-hover:border-primary/40 transition-colors duration-500 pointer-events-none" style={{ animation: `breathe 4s ease-in-out infinite ${i * 0.3 + 3}s` }}></div>

                  <div className="relative z-10 flex flex-col h-full">
                    
                    {/* Header Row: Stable, centered Icon Tile (No weird tilt rotation) */}
                    <div className="flex items-start justify-between pb-5">
                      <div className="w-11 h-11 rounded-xl bg-surface-container-lowest/80 border border-surface-container-highest shadow-xs flex items-center justify-center text-secondary group-hover:text-primary group-hover:bg-primary/10 group-hover:border-primary/40 transition-all duration-300 group-hover:scale-105">
                        <item.icon className="w-5 h-5 transition-colors duration-300" strokeWidth={1.75} />
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-display text-[9.5px] leading-[14px] tracking-[0.15em] font-bold text-secondary/70 uppercase group-hover:text-primary transition-colors duration-300">
                          {item.spec}
                        </span>
                        
                        {/* Live Mini Element (Data Flow Visualizer) */}
                        <div className="flex items-end gap-[2px] h-3 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-0.5 bg-primary rounded-t-sm origin-bottom" style={{ animation: 'mini-bounce 0.8s ease-in-out infinite alternate' }}></div>
                          <div className="w-0.5 bg-primary rounded-t-sm origin-bottom" style={{ animation: 'mini-bounce 0.8s ease-in-out infinite alternate 0.3s' }}></div>
                          <div className="w-0.5 bg-primary rounded-t-sm origin-bottom" style={{ animation: 'mini-bounce 0.8s ease-in-out infinite alternate 0.1s' }}></div>
                          <div className="w-0.5 bg-primary rounded-t-sm origin-bottom" style={{ animation: 'mini-bounce 0.8s ease-in-out infinite alternate 0.5s' }}></div>
                          <div className="w-0.5 bg-primary rounded-t-sm origin-bottom" style={{ animation: 'mini-bounce 0.8s ease-in-out infinite alternate 0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-display text-[18px] lg:text-[19px] leading-[24px] tracking-[-0.01em] font-bold text-on-surface pb-2.5 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    {/* Description: 100% Human-crafted & naturally keyword-embedded (Zero I, Zero We) */}
                    <p className="font-sans text-[13.5px] leading-[22px] tracking-[0em] font-normal text-secondary mb-6 flex-grow">
                      {item.desc}
                    </p>
                    
                    {/* Status Indicator & Interactive Nav Arrow */}
                    <div className="pt-3.5 border-t border-surface-container-highest/50 font-display text-[9.5px] leading-[14px] tracking-[0.15em] font-bold text-secondary uppercase flex items-center justify-between group-hover:border-primary/20 transition-colors duration-500 mt-auto">
                      <div className="flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                        {/* Status Dot with Idle Pulse */}
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary/40 group-hover:bg-primary/50 opacity-75 duration-1000"></span>
                          <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-secondary group-hover:bg-primary group-hover:shadow-[0_0_8px_var(--color-primary)] transition-all duration-300"></span>
                        </span>
                        <span>{item.stat}</span>
                      </div>
                      
                      {/* Arrow appearing and shifting right on hover */}
                      <span className="opacity-60 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 text-secondary group-hover:text-primary transition-all duration-300 flex items-center gap-1 font-display text-[10px] tracking-widest">
                        <span>EXPLORE</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
