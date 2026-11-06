import Link from "next/link";
import { ArrowRight, Terminal, ShieldCheck } from "lucide-react";

export default function WebMobileCTA() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background Animated Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none z-0 animate-[floatAurora_20s_ease-in-out_infinite_alternate]"></div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
        <div className="bg-surface-container-lowest/75 backdrop-blur-md rounded-3xl p-8 sm:p-12 lg:p-16 border border-surface-container-highest shadow-xl text-center space-y-8 relative overflow-hidden group hover:border-primary/40 transition-all duration-700">
          
          {/* Animated Top Border Beam */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
          <div className="absolute top-0 left-0 h-[1.5px] w-1/4 bg-gradient-to-r from-transparent via-primary-container to-transparent animate-[shimmer_3s_infinite]"></div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="font-display text-[10.5px] leading-4 tracking-[0.15em] uppercase font-bold text-primary px-3 py-1 bg-primary/10 border border-primary/20 rounded-md inline-flex items-center gap-2 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              KEEP YOUR APPS IN SYNC
            </span>
            
            <h2 className="font-display text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.08] tracking-[-0.03em] font-bold text-on-surface text-balance">
              Ready to Build Your Web &amp; Mobile Ecosystem?
            </h2>

            <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
              Skip the agency sales pitches and junior developer handoffs. Speak directly with Subham Sarkar to evaluate your business data flow, offline constraints, and production timeline.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact?service=web-mobile"
              className="group/btn relative inline-flex items-center gap-2.5 bg-primary hover:bg-primary-container text-on-primary font-display text-[12.5px] leading-4 tracking-[0.1em] font-bold uppercase px-8 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 overflow-hidden"
            >
              <div className="absolute top-0 bottom-0 left-0 w-12 bg-white/20 -skew-x-12 animate-[buttonSheen_3s_infinite] pointer-events-none"></div>
              <span>Discuss Your App Requirements</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/work?category=web-mobile"
              className="inline-flex items-center gap-2 text-on-surface hover:text-primary font-display text-[12px] leading-4 tracking-[0.1em] font-semibold uppercase px-6 py-4 rounded-xl border border-surface-container-highest hover:border-primary/40 bg-surface-container/60 transition-all duration-300"
            >
              <span>Browse All Case Studies</span>
            </Link>
          </div>

          {/* Reassurance points */}
          <div className="pt-6 border-t border-surface-container-highest/60 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-secondary font-display text-[11px] leading-4 uppercase tracking-wider font-semibold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Mutual NDA Executed on Request
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Direct Senior Architect Access
            </span>
            <span className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-primary" />
              100% Client Code &amp; Data Ownership
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
