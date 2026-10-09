import Link from "next/link";
import { BadgeCheck, CalendarDays, CheckCircle2 } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function ServicesCTA() {
  return (
    <section className="w-full bg-surface-container-low/75 border-t border-surface-container-highest py-16 lg:py-24 relative overflow-hidden">
      
      {/* Ambient BG Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
        <div className="group relative bg-surface-container-lowest/80 backdrop-blur-xl rounded-2xl p-10 lg:p-16 shadow-xl border border-outline/10 overflow-hidden transition-colors duration-700 hover:border-primary/30">
          
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-[10px] leading-4 tracking-[0.12em] uppercase tracking-widest text-primary font-bold bg-primary/10 border border-primary/20 px-2 py-1 rounded">
                  GET STARTED — RESPONSE WITHIN 6-8 BUSINESS HOURS
                </span>
                <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-medium text-secondary bg-surface-container px-2 py-1 rounded">
                  SLOT AVAILABILITY: STRICTLY LIMITED
                </span>
              </div>
              
              <h2 className="font-display text-[36px] lg:text-[44px] leading-[44px] lg:leading-[52px] tracking-[-0.02em] font-bold tracking-tight text-on-surface text-balance">
                Ready to engineer an unshakeable foundation?
              </h2>
              <p className="font-sans text-[18px] lg:text-[20px] leading-[30px] tracking-[-0.01em] font-normal text-on-surface-variant max-w-2xl text-balance">
                Book a free consultation. We'll talk through what's slowing your business down, look at what you're currently working with, and tell you plainly what it would take to fix it — no jargon, no pressure.
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4">
                <MagneticButton className="shrink-0 z-10" magneticPull={0.25}>
                  <Link href="/contact" className="group/btn relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-on-primary font-display text-[12px] leading-4 tracking-[0.12em] font-bold uppercase tracking-widest rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)] overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
                    <CalendarDays className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Initiate a Free Consultation</span>
                  </Link>
                </MagneticButton>
                <div className="flex items-center gap-2 font-display text-[11px] leading-4 tracking-[0.12em] font-semibold text-secondary uppercase max-w-[250px]">
                  <BadgeCheck className="w-6 h-6 text-primary shrink-0" />
                  <span className="leading-snug">Direct conversation with me. No sales team, no middlemen.</span>
                </div>
              </div>
            </div>
            
            {/* Technical Specification Card (Right Elevation) */}
            <div className="lg:col-span-4 bg-surface-container/50 backdrop-blur-md p-8 rounded-2xl space-y-4 border border-outline/10 border-l-4 border-l-primary/60 group-hover:border-l-primary transition-colors duration-500 relative overflow-hidden shadow-inner">
              
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative z-10 font-display text-[11px] leading-4 tracking-[0.12em] text-primary font-semibold uppercase tracking-widest border-b border-surface-container-highest pb-3">
                WHAT YOU'LL WALK AWAY WITH
              </div>
              
              <ul className="relative z-10 space-y-4 font-sans text-[14px] leading-[22px] tracking-[0em] font-medium text-on-surface pt-2">
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle2 className="w-5 h-5 text-secondary/40 group-hover/item:text-primary transition-colors duration-300 shrink-0 mt-0.5" />
                  <span className="group-hover/item:text-primary transition-colors duration-300">A clear picture of what's actually going wrong</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle2 className="w-5 h-5 text-secondary/40 group-hover/item:text-primary transition-colors duration-300 shrink-0 mt-0.5" />
                  <span className="group-hover/item:text-primary transition-colors duration-300">No obligation to move forward</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle2 className="w-5 h-5 text-secondary/40 group-hover/item:text-primary transition-colors duration-300 shrink-0 mt-0.5" />
                  <span className="group-hover/item:text-primary transition-colors duration-300">An honest opinion on whether it needs fixing or rebuilding</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle2 className="w-5 h-5 text-secondary/40 group-hover/item:text-primary transition-colors duration-300 shrink-0 mt-0.5" />
                  <span className="group-hover/item:text-primary transition-colors duration-300">A realistic estimate of time and cost</span>
                </li>
              </ul>
              
              <div className="relative z-10 pt-4 mt-6 border-t border-surface-container-highest font-display text-[11px] leading-4 tracking-[0.12em] text-secondary font-semibold uppercase">
                Most conversations happen within a <span className="text-primary font-bold">day or two</span> of reaching out.
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
