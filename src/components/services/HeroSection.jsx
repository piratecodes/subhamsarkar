import { Network, SaveAll, Shield, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative border-b border-surface-container-highest bg-transparent overflow-hidden">
      
      {/* Animated Color Effects Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-100">
        {/* Deep background mesh */}
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "linear-gradient(color-mix(in srgb, var(--color-primary) 20%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 20%, transparent) 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
        
        {/* Rotating colorful nebula/aurora (Theme Colors) */}
        <div className="absolute w-[200vw] h-[200vw] max-w-[1500px] max-h-[1500px] bg-[conic-gradient(from_0deg_at_50%_50%,var(--color-primary)_0deg,transparent_60deg,var(--color-secondary)_180deg,transparent_240deg,var(--color-primary)_360deg)] opacity-[0.15] animate-[spin-slow_25s_linear_infinite] blur-[100px]"></div>
        <div className="absolute w-[150vw] h-[150vw] max-w-[1000px] max-h-[1000px] bg-[conic-gradient(from_180deg_at_50%_50%,var(--color-secondary)_0deg,transparent_60deg,var(--color-primary)_180deg,transparent_240deg,var(--color-secondary)_360deg)] opacity-20 animate-[spin-slow-reverse_20s_linear_infinite] blur-[80px]"></div>
      </div>

      {/* Decorative Corner Hashes */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-primary/20 pointer-events-none"></div>
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-primary/20 pointer-events-none"></div>
      
      <section className="relative z-10 w-full container px-4 lg:px-12 py-20 lg:py-28">
        
        {/* Structural Blueprint Grid Annotation */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-[10px] leading-4 uppercase tracking-widest text-primary font-bold px-3 py-1 bg-primary/10 border border-primary/20 rounded-md shadow-sm">
              SYSTEM CAPABILITIES // ARCHITECTURAL SPECIFICATIONS
            </span>
            <span className="font-display text-[12px] leading-4 tracking-[0.04em] font-medium text-secondary/70 bg-surface-container/50 px-3 py-1 rounded border border-outline/5">
              DOC.ID: ARCH-SVC-409
            </span>
          </div>
          <div className="hidden md:flex items-center gap-3 font-display text-[11px] leading-4 tracking-widest font-semibold text-secondary uppercase bg-surface-container-lowest/80 px-4 py-1.5 rounded-full border border-surface-container-highest shadow-inner">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary/50"></div> COMMITMENT: NO SHORTCUTS</span>
            <span className="text-outline/30">|</span>
            <span className="flex items-center gap-2">SUPPORT: DIRECT ACCESS <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div></span>
          </div>
        </div>

        {/* Main Headline & Editorial Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-display text-[52px] lg:text-[72px] leading-[1.05] tracking-[-0.03em] font-bold text-on-surface text-balance">
              High-Impact Architectural &amp; Development Services
            </h1>
            <p className="font-sans text-[18px] lg:text-[20px] leading-7.5 tracking-[-0.01em] font-normal text-on-surface-variant max-w-2xl text-balance">
              Software architecture is not about adding complexity - it is the disciplined elimination of failure modes. Every engagement is engineered from foundational schema design to hardened deployment, tailored specifically for enterprises that cannot afford downtime.
            </p>
          </div>
          
          {/* Architectural Key Performance Metric Widget */}
          <div className="lg:col-span-5 lg:pl-10">
            <div className="group relative bg-surface-container-lowest/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-outline/10 hover:border-primary/40 transition-colors duration-700 overflow-hidden">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] pointer-events-none group-hover:bg-primary/30 transition-colors duration-700"></div>

              <div className="relative z-10 flex items-center justify-between text-secondary font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase tracking-wider mb-6 border-b border-surface-container-highest pb-3">
                <span className="flex items-center gap-2"><Network className="w-4 h-4 text-primary" /> What You Can Expect</span>
                <span suppressHydrationWarning className="text-primary font-bold bg-primary/10 px-2 py-0.5 rounded">{new Date().getFullYear()}</span>
              </div>
              
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface-container-low/60 rounded-xl border border-outline/5 group-hover:bg-surface-container/50 transition-colors duration-500">
                  <div className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold text-secondary uppercase mb-1">RESPONSE TIME</div>
                  <div className="font-display text-[28px] leading-[36px] tracking-[-0.01em] font-bold text-on-surface mb-2">6-8 Hours</div>
                  <div className="font-display text-[10px] leading-[14px] font-bold tracking-[0.12em] text-primary uppercase bg-primary/10 w-max px-1.5 py-0.5 rounded">DIRECT REPLY, NO QUEUE</div>
                </div>
                <div className="p-4 bg-surface-container-low/60 rounded-xl border border-outline/5 group-hover:bg-surface-container/50 transition-colors duration-500">
                  <div className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold text-secondary uppercase mb-1">OWNERSHIP</div>
                  <div className="font-display text-[28px] leading-[36px] tracking-[-0.01em] font-bold text-on-surface mb-2">100%</div>
                  <div className="font-display text-[10px] leading-[14px] font-bold tracking-[0.12em] text-secondary uppercase bg-surface-variant w-max px-1.5 py-0.5 rounded">YOURS, ON COMPLETION</div>
                </div>
              </div>
              
              <div className="relative z-10 w-full bg-surface-container-highest/50 h-2 rounded-full overflow-hidden mt-6 shadow-inner">
                <div className="bg-gradient-to-r from-primary via-primary-container to-primary h-full w-full animate-[dataPacketFlow_3s_linear_infinite]" style={{ backgroundSize: '200% 100%' }}></div>
              </div>
              
              <div className="relative z-10 flex justify-between font-display text-[11px] leading-4 tracking-[0.12em] font-semibold text-secondary uppercase mt-4">
                <span>CONFIDENTIALITY</span>
                <span className="font-bold text-on-surface flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" /> NDA ON EVERY PROJECT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Cross-Section Blueprint Line */}
        <div className="mt-16 pt-6 border-t border-surface-container-highest/80 grid grid-cols-2 md:grid-cols-4 gap-6 font-display text-[11px] leading-4 tracking-[0.12em] font-semibold text-secondary uppercase">
          <div className="flex items-center gap-3 group/feat">
            <div className="p-2 rounded-lg bg-surface-container group-hover/feat:bg-primary/10 transition-colors duration-300">
              <Network className="w-5 h-5 text-primary" />
            </div>
            <span className="group-hover/feat:text-on-surface transition-colors duration-300">No Single Point of Failure</span>
          </div>
          <div className="flex items-center gap-3 group/feat">
            <div className="p-2 rounded-lg bg-surface-container group-hover/feat:bg-primary/10 transition-colors duration-300">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="group-hover/feat:text-on-surface transition-colors duration-300">Your Data Stays Private</span>
          </div>
          <div className="flex items-center gap-3 group/feat">
            <div className="p-2 rounded-lg bg-surface-container group-hover/feat:bg-primary/10 transition-colors duration-300">
              <SaveAll className="w-5 h-5 text-primary" />
            </div>
            <span className="group-hover/feat:text-on-surface transition-colors duration-300">Safe, Tested Rollouts</span>
          </div>
          <div className="flex items-center gap-3 group/feat">
            <div className="p-2 rounded-lg bg-surface-container group-hover/feat:bg-primary/10 transition-colors duration-300">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <span className="group-hover/feat:text-on-surface transition-colors duration-300">Full Audit Trail</span>
          </div>
        </div>
      </section>
      
      <style>{`
        @keyframes dataPacketFlow {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          100% { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
