import Link from "next/link";
import { Coffee, Compass, ArrowRight, Zap, Sparkles, ShieldCheck } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function ClosingCTA() {
  return (
    <section className="w-full container px-4 sm:px-6 lg:px-12 py-12">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 15s linear infinite;
        }
      `}} />

      <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-surface-container-highest bg-surface-container-low/75 group hover:border-primary/20 transition-colors duration-500">
        
        {/* Original Spotlight/Torch Light Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none group-hover:from-primary/15 transition-colors duration-700"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="relative z-10 px-6 py-10 lg:px-12 lg:py-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          
          {/* LEFT: Text Content */}
          <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left space-y-5">
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-[10px] leading-[16px] tracking-[0.12em] font-semibold text-primary uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                EXECUTION PROTOCOL
              </span>
              <span className="text-secondary font-display text-[11px] leading-[16px] tracking-[0.04em] font-medium flex items-center gap-2 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.8)]"></span>
                STATUS: ACCEPTING Q3 ROADMAPS
              </span>
            </div>

            <h2 className="text-on-surface font-display text-[28px] lg:text-[36px] tracking-[-0.02em] font-bold leading-[1.15]">
              Not Sure What You Actually Need? <br className="hidden lg:block"/> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary/80 inline-block mt-1">
                That's a Normal Place to Start.
              </span>
            </h2>
            
            <p className="font-sans text-[14px] lg:text-[15px] text-secondary leading-relaxed max-w-xl group-hover:text-on-surface/90 transition-colors duration-500">
              Whether you're starting from a rough idea or you've already got a clear plan, we start the same way - a conversation. Tell us where things stand, and we'll tell you plainly what it would take, what to expect, and how we'd approach it.
            </p>
          </div>
          
          {/* RIGHT: CTA Area */}
          <div className="w-full md:w-auto flex flex-col items-center justify-center shrink-0 pt-2 md:pt-4 self-end-safe">
            
            {/* Catchy Trust Badge */}
            <div className="hidden md:flex items-center gap-3 mb-5 px-2">
              <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                {/* Spinning Rosette/Seal */}
                <svg className="absolute inset-0 w-full h-full text-primary animate-[slow-spin_15s_linear_infinite]" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 0L57 14L72 10L74 26L89 30L82 43L94 54L78 61L82 76L66 76L61 90L50 80L39 90L34 76L18 76L22 61L6 54L18 43L11 30L26 26L28 10L43 14L50 0Z" opacity="0.15"/>
                </svg>
                <ShieldCheck size={18} className="text-primary relative z-10" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display text-[11px] tracking-widest font-bold text-on-surface uppercase leading-tight mb-0.5">
                  Zero-Risk Engagement
                </span>
                <span className="font-sans text-[11px] text-secondary font-medium">
                  subham.digital • Build with care
                </span>
              </div>
            </div>

            <MagneticButton className="w-full sm:w-auto z-10" magneticPull={0.25}>
              <Link href="/contact" className="relative group/btn inline-flex items-center justify-center overflow-hidden rounded-2xl p-[1px] w-full sm:w-auto shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 active:translate-y-0">
                {/* Spinning Gradient Border */}
                <span className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(var(--color-primary-rgb),0.1)_0%,rgba(var(--color-primary-rgb),1)_50%,rgba(var(--color-primary-rgb),0.1)_100%)] animate-slow-spin opacity-40 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                
                {/* Button Body */}
                <div className="relative flex items-center justify-center gap-2.5 px-6 py-4 lg:px-8 lg:py-5 bg-surface-container border border-surface-container-highest rounded-2xl w-full sm:w-auto group-hover/btn:bg-surface-container-low transition-colors duration-300 z-10 overflow-hidden">
                  
                  {/* Inner Shimmer */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out"></div>
                  
                  <Compass className="text-[18px] text-primary group-hover/btn:rotate-45 transition-transform duration-500" />
                  <span className="font-display text-[12px] lg:text-[13px] tracking-widest font-bold text-on-surface uppercase whitespace-nowrap">
                    Book a Free Consultation
                  </span>
                  <ArrowRight className="text-[16px] text-primary -translate-x-2 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all duration-300" />
                </div>
              </Link>
            </MagneticButton>
            
            {/* Text directly BELOW the button */}
            <div className="flex items-center justify-center md:justify-end gap-1.5 mt-4 text-secondary font-medium font-sans text-[13px]">
              <Coffee className="text-[14px]" />
              <span>No commitment. Just a conversation.</span>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
