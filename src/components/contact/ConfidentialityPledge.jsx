import Link from "next/link";
import { ArrowUp, BadgeCheck, ShieldCheck, Lock } from "lucide-react";

export default function ConfidentialityPledge() {
  return (
    <section className="w-full py-16 relative">
      <div className="w-full container px-4 lg:px-12 relative z-10">
        
        {/* Banner Container */}
        <div className="relative overflow-hidden p-6 md:p-8 bg-surface-container-lowest/80 backdrop-blur-xl rounded-[2rem] border border-surface-container-highest/60 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group hover:shadow-2xl hover:border-primary/40 transition-all duration-700 ease-out hover:-translate-y-1">
          
          {/* Idle Ambient Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-50 animate-pulse pointer-events-none"></div>
          
          {/* Hover Gradient Sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out pointer-events-none"></div>

          {/* Decorative background icons (texture) */}
          <ShieldCheck className="absolute -right-10 -bottom-10 w-48 h-48 text-primary/[0.04] group-hover:text-primary/[0.08] -rotate-12 animate-pulse group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 ease-out pointer-events-none" style={{ animationDuration: '4s' }} />
          <Lock className="absolute right-1/4 -top-10 w-32 h-32 text-primary/[0.04] group-hover:text-primary/[0.08] rotate-12 animate-pulse group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out pointer-events-none" style={{ animationDuration: '5s', animationDelay: '1s' }} />

          {/* Left Side Content */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 relative z-10 w-full md:w-auto">
            
            {/* Animated Icon Block */}
            <div className="relative w-14 h-14 shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-primary/10 animate-ping opacity-50 group-hover:opacity-0 transition-opacity duration-500" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-0 rounded-2xl bg-primary/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-700"></div>
              
              <div className="relative w-full h-full rounded-2xl bg-surface-container flex items-center justify-center text-primary shadow-[0_0_15px_rgba(var(--color-primary),0.15)] group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 group-hover:shadow-lg">
                <BadgeCheck className="w-6 h-6 animate-pulse group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
            
            {/* Text Content */}
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 animate-pulse group-hover:bg-primary transition-colors duration-500"></span>
                <span className="font-display text-[11px] leading-4 font-bold uppercase tracking-widest text-secondary group-hover:text-primary transition-colors duration-500">
                  OUR COMMITMENT
                </span>
              </div>
              <h3 className="font-display text-[22px] md:text-[24px] leading-7 md:leading-8 tracking-[-0.01em] font-bold text-on-surface group-hover:text-primary transition-colors duration-500">
                All Messages Are Reviewed Personally by Me
              </h3>
              <p className="font-sans text-[14px] md:text-[15px] leading-6 tracking-[-0.005em] font-normal text-secondary max-w-2xl group-hover:text-secondary/90 transition-colors duration-500">
                Your blueprints, system architecture, database diagrams, and proprietary business logic remain strictly confidential under legal non-disclosure.
              </p>
            </div>
          </div>
          
          {/* Right Side Action */}
          <div className="flex items-center shrink-0 relative z-10 w-full md:w-auto mt-2 md:mt-0">
            <Link href="#contact-name" className="w-full md:w-auto px-6 py-4 bg-surface-container hover:bg-primary text-on-surface hover:text-on-primary font-display text-[11px] leading-4 tracking-widest font-bold uppercase rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2.5 shadow-sm hover:shadow-lg group/btn overflow-hidden relative">
              <span className="relative z-10 flex items-center gap-2.5">
                <div className="relative w-4 h-4 overflow-hidden">
                  <ArrowUp className="absolute top-0 left-0 w-4 h-4 animate-bounce group-hover/btn:animate-none transition-transform duration-300 group-hover/btn:-translate-y-full" />
                  <ArrowUp className="absolute top-full left-0 w-4 h-4 transition-transform duration-300 group-hover/btn:-translate-y-full" />
                </div>
                <span>Return to Form</span>
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
