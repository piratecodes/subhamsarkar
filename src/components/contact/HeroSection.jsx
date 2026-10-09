import { ShieldCheck } from "lucide-react";
export default function HeroSection() {
  return (
    <section className="w-full relative pt-10 pb-6 overflow-hidden">
      {/* Background Ambient Orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-display text-[11px] leading-4 tracking-[0.15em] font-bold text-primary uppercase">
                START A CONVERSATION
              </span>
            </div>
            <h1 className="font-display text-[56px] leading-[64px] tracking-[-0.03em] font-bold text-on-surface font-semibold tracking-tight">
              Let&apos;s Build a Backbone That Never Falls.
            </h1>
            <p className="font-sans text-[18px] leading-[28px] tracking-[-0.01em] font-normal text-secondary pt-1">
              Whether you need a custom ERP built from scratch, help fixing what you already have, or AI layered into your existing operations &mdash; this is where that conversation starts.
            </p>
          </div>
          
          {/* Cadence Telemetry Badge */}
          <div className="relative overflow-hidden p-5 bg-surface-container-lowest/80 backdrop-blur-xl border border-surface-container-highest/60 rounded-2xl shadow-sm max-w-sm flex items-start gap-3.5 group hover:border-primary/40 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 cursor-default mt-6 md:mt-0">
            {/* Ambient idle background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 animate-pulse pointer-events-none"></div>
            {/* Hover sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out pointer-events-none"></div>
            
            <div className="relative shrink-0 mt-0.5">
               <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-700"></div>
               <ShieldCheck className="relative text-primary text-[22px] group-hover:scale-110 transition-transform duration-500 animate-pulse group-hover:animate-none" />
            </div>

            <div className="flex flex-col space-y-1 relative z-10">
              <span className="font-display text-[11px] leading-4 tracking-[0.15em] font-bold uppercase tracking-wider text-on-surface group-hover:text-primary transition-colors duration-500">
                RESPONSE TIME: 6&ndash;8 HOURS
              </span>
              <p className="font-sans text-[13.5px] leading-[22px] tracking-[-0.005em] font-normal text-secondary group-hover:text-secondary/90 transition-colors duration-500">
                A real reply from me, directly &mdash; not an automated response, not a queue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
