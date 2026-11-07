import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { phaseData } from "@/data/processPhases";

export default function TrustStrip() {
  return (
    <section className="relative w-full py-8 overflow-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-pulse-ring {
          animation: pulse-ring 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes slide-node {
          0% { transform: translateY(100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        .animate-slide-node {
          animation: slide-node 2s linear infinite;
        }
        @keyframes flash-line {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-flash-line {
          background: linear-gradient(90deg, transparent, rgba(var(--color-primary-rgb), 0.8), transparent);
          background-size: 50% 100%;
          background-repeat: no-repeat;
          animation: flash-line 2s ease-in-out infinite;
        }
      `}} />

      <div className="w-full container px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Unified Glass Panel */}
        <div className="relative group bg-surface-container-low/40 backdrop-blur-xl border border-surface-container-highest/50 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-primary/30 transition-colors duration-700">
          
          {/* Subtle global gradient sheen */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-surface-container-highest/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-surface-container-highest/40">
            
            {/* Metric 1: Direct Technical Channel */}
            <div className="relative flex flex-col justify-between p-7 lg:p-8 group/metric overflow-hidden">
              {/* Background Radar Animation */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 text-primary/5 group-hover/metric:text-primary/20 transition-colors duration-700 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" fill="none" className="group-hover/metric:animate-pulse-ring" />
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" className="group-hover/metric:animate-pulse-ring" style={{ animationDelay: '0.75s' }} />
                  <circle cx="50" cy="50" r="2" fill="currentColor" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover/metric:bg-primary group-hover/metric:shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.8)] transition-all duration-300"></div>
                  <span className="font-display text-[10px] leading-[16px] tracking-[0.15em] font-bold text-secondary group-hover/metric:text-primary transition-colors duration-300 uppercase">
                    DIRECT ENGAGEMENT
                  </span>
                </div>
                <div className="flex items-baseline gap-2.5 mb-2.5">
                  <span className="font-display text-[48px] lg:text-[56px] leading-[1] tracking-[-0.03em] font-bold bg-clip-text text-transparent bg-gradient-to-b from-on-surface to-on-surface/60 group-hover/metric:to-on-surface transition-all duration-300">
                    1
                  </span>
                  <span className="font-display text-[13px] lg:text-[14px] tracking-[0.08em] font-bold text-primary uppercase">
                    DIRECT ARCHITECT
                  </span>
                </div>
                <p className="font-sans text-[13px] leading-[22px] tracking-[-0.005em] font-normal text-secondary max-w-[360px] group-hover/metric:text-on-surface/80 transition-colors duration-300">
                  From the first call to the final handover, there’s one direct line to the person planning your system. No account managers, no messages passed along.
                </p>
              </div>

              <div className="relative z-10 pt-5 mt-auto">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-1.5 font-display text-[10px] leading-[16px] tracking-[0.12em] font-semibold text-secondary group-hover/metric:text-primary transition-colors uppercase"
                >
                  <span>Direct technical consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/metric:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Metric 2: Deterministic Delivery Framework */}
            <div className="relative flex flex-col justify-between p-7 lg:p-8 group/metric overflow-hidden bg-gradient-to-b from-transparent to-surface-container-highest/10">
              {/* Background Data Nodes Animation */}
              <div className="absolute top-0 right-4 w-24 h-full pointer-events-none opacity-0 group-hover/metric:opacity-100 transition-opacity duration-700">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-surface-container-highest -translate-x-1/2"></div>
                <div className="absolute left-1/2 top-1/4 w-1.5 h-1.5 bg-primary rounded-full -translate-x-1/2 animate-slide-node"></div>
                <div className="absolute left-1/2 top-3/4 w-1 h-1 bg-primary/50 rounded-full -translate-x-1/2 animate-slide-node" style={{ animationDelay: '1s' }}></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover/metric:bg-primary group-hover/metric:shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.8)] transition-all duration-300"></div>
                  <span className="font-display text-[10px] leading-[16px] tracking-[0.15em] font-bold text-secondary group-hover/metric:text-primary transition-colors duration-300 uppercase">
                    DELIVERY PIPELINE
                  </span>
                </div>
                <div className="flex items-baseline gap-2.5 mb-2.5">
                  <span className="font-display text-[48px] lg:text-[56px] leading-[1] tracking-[-0.03em] font-bold bg-clip-text text-transparent bg-gradient-to-b from-on-surface to-on-surface/60 group-hover/metric:to-on-surface transition-all duration-300">
                    {phaseData.length}
                  </span>
                  <span className="font-display text-[13px] lg:text-[14px] tracking-[0.08em] font-bold text-primary uppercase">
                    VERIFIED PHASES
                  </span>
                </div>
                <p className="font-sans text-[13px] leading-[22px] tracking-[-0.005em] font-normal text-secondary max-w-[360px] group-hover/metric:text-on-surface/80 transition-colors duration-300">
                  Every project moves through the same five stages, from understanding the problem to final handover, so nothing feels like a surprise.
                </p>
              </div>

              <div className="relative z-10 pt-5 mt-auto">
                <Link 
                  href="/process" 
                  className="inline-flex items-center gap-1.5 font-display text-[10px] leading-[16px] tracking-[0.12em] font-semibold text-secondary group-hover/metric:text-primary transition-colors uppercase"
                >
                  <span>Explore 5 delivery stages</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/metric:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Metric 3: Architectural Capabilities */}
            <div className="relative flex flex-col justify-between p-7 lg:p-8 group/metric overflow-hidden">
              {/* Background Flash Line Animation */}
              <div className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover/metric:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="w-full h-full animate-flash-line"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover/metric:bg-primary group-hover/metric:shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.8)] transition-all duration-300"></div>
                  <span className="font-display text-[10px] leading-[16px] tracking-[0.15em] font-bold text-secondary group-hover/metric:text-primary transition-colors duration-300 uppercase">
                    SYSTEM ARCHITECTURE
                  </span>
                </div>
                <div className="flex items-baseline gap-2.5 mb-2.5">
                  <span className="font-display text-[48px] lg:text-[56px] leading-[1] tracking-[-0.03em] font-bold bg-clip-text text-transparent bg-gradient-to-b from-on-surface to-on-surface/60 group-hover/metric:to-on-surface transition-all duration-300">
                    {services.length}
                  </span>
                  <span className="font-display text-[13px] lg:text-[14px] tracking-[0.08em] font-bold text-primary uppercase">
                    CORE DISCIPLINES
                  </span>
                </div>
                <p className="font-sans text-[13px] leading-[22px] tracking-[-0.005em] font-normal text-secondary max-w-[360px] group-hover/metric:text-on-surface/80 transition-colors duration-300">
                  ERP, CRM, web and mobile apps, AI automation, legacy modernization and security audit. One conversation can cover whatever the business needs next.
                </p>
              </div>

              <div className="relative z-10 pt-5 mt-auto">
                <Link 
                  href="/services" 
                  className="inline-flex items-center gap-1.5 font-display text-[10px] leading-[16px] tracking-[0.12em] font-semibold text-secondary group-hover/metric:text-primary transition-colors uppercase"
                >
                  <span>View 6 engineering specializations</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/metric:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
