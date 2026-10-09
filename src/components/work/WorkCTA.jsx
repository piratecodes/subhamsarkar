import Link from "next/link";
import { ArrowRight, CalendarDays, Fingerprint } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function WorkCTA() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        
        @keyframes spin-slow {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        @keyframes data-stream-horizontal {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-data-horizontal {
          animation: data-stream-horizontal 6s linear infinite;
        }
      `}} />

      <section className="w-full bg-surface-container/30 py-24 border-t border-outline/10 relative overflow-hidden">
        
        {/* Background Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-surface-container/30 via-transparent to-surface-container/30 pointer-events-none z-0"></div>

        <div className="w-full container px-4 lg:px-12 relative z-10">
          <div className="relative group/cta p-[1px] rounded-[2rem] overflow-hidden transform transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(var(--color-primary-rgb),0.15)]">
            
            {/* Spinning Glow Border */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 group-hover/cta:opacity-100 transition-opacity duration-700">
               <div className="absolute top-1/2 left-1/2 w-[250%] h-[250%] md:w-[150%] md:h-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_180deg,rgba(var(--color-primary-rgb),0.6)_360deg)] animate-spin-slow"></div>
            </div>

            <div className="bg-surface-container-lowest/90 backdrop-blur-3xl p-10 lg:p-20 rounded-[31px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 relative z-10">
              
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-[200%] animate-scanline z-0 pointer-events-none mix-blend-overlay"></div>
              
              <div className="max-w-3xl space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-error/10 border border-error/20 rounded-full font-display text-[10px] leading-4 tracking-[0.2em] text-error font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(var(--color-error-rgb),0.15)] animate-pulse">
                  <Fingerprint className="text-[14px]" />
                  CONFIDENTIAL ARCHITECTURAL ADVISORY
                </div>
                
                <h2 className="font-display text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.03em] font-bold text-on-surface text-balance">
                  Have Something Similar You're Dealing With?
                </h2>
                
                <p className="font-sans text-[16px] md:text-[18px] leading-8 tracking-[-0.01em] font-normal text-secondary border-l-2 border-surface-container-highest pl-5">
                  Every business's situation is a little different. Tell us what you're working with, and we'll tell you plainly whether it needs fixing, rebuilding, or something else entirely - no pressure, no jargon, and no obligation to move forward.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-4 w-full lg:w-auto relative z-10 shrink-0">
                
                <MagneticButton className="w-full sm:w-auto z-10" magneticPull={0.25}>
                  <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary hover:bg-primary-light text-on-primary font-display text-[11px] leading-4 tracking-[0.15em] font-bold uppercase tracking-widest rounded-xl shadow-[0_10px_30px_rgba(var(--color-primary-rgb),0.3)] hover:shadow-[0_15px_40px_rgba(var(--color-primary-rgb),0.5)] transition-all text-center relative overflow-hidden group/btn">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-data-horizontal"></div>
                    <CalendarDays className="text-[20px]" />
                    <span>Initiate a Free Consultation</span>
                  </Link>
                </MagneticButton>
                
                <Link href="/services" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 bg-surface-container/50 hover:bg-surface-container-high border border-surface-container-highest text-on-surface font-display text-[11px] leading-4 tracking-[0.15em] font-bold uppercase tracking-widest rounded-xl hover:-translate-y-1 hover:border-primary/30 transition-all text-center group/btn2">
                  <span>Explore Our Services</span>
                  <ArrowRight className="text-[18px] group-hover/btn2:translate-x-1 transition-transform text-primary" />
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
