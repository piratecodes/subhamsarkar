import { BadgeCheck, Database, FolderLock, Key, Timer, Activity, ShieldAlert, Cpu } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative w-full bg-transparent overflow-hidden">
      
      {/* Studio Light Beams (Work Page) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Cinematic Primary Beam (Amber/Gold to complement the theme) */}
        <div className="absolute -top-[50%] right-[-20%] w-[150%] h-[100%] origin-top-right -rotate-[35deg] bg-gradient-to-b from-transparent via-amber-500/20 to-transparent blur-[70px] animate-pulse-glow"></div>
        
        {/* Cinematic Secondary Beam (Rose/Crimson for warmth) */}
        <div className="absolute -top-[50%] left-[-20%] w-[150%] h-[100%] origin-top-left rotate-[25deg] bg-gradient-to-b from-transparent via-rose-500/15 to-transparent blur-[90px]" style={{ animation: 'pulse-slow-glow 7s ease-in-out infinite 2s' }}></div>
        
        {/* Cool Cyan Ambient Base Glow to provide contrast to the warm beams */}
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(14,165,233,0.1)_0%,transparent_70%)] blur-[100px]"></div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse-slow-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        .animate-pulse-glow {
          animation: pulse-slow-glow 4s ease-in-out infinite;
        }

        @keyframes data-stream-horizontal {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-data-horizontal {
          animation: data-stream-horizontal 6s linear infinite;
        }
        
        @keyframes spin-slow {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />

      {/* Tech Ticker Bar */}
      <div className="w-full bg-surface-container-lowest/30 backdrop-blur-xl border-y border-surface-container-highest px-4 lg:px-12 py-3 flex flex-wrap items-center justify-between text-secondary relative overflow-hidden group shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-[100%] animate-data-horizontal opacity-80 z-0 pointer-events-none"></div>
        <div className="flex items-center gap-3 font-display text-[10px] leading-4 tracking-[0.2em] font-bold uppercase relative z-10">
          <span className="inline-flex relative w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full w-2 h-2 bg-primary shadow-[0_0_10px_rgba(var(--color-primary-rgb),1)]"></span>
          </span>
          <span className="text-on-surface">OUR WORK //</span>
          <span className="hidden sm:inline">REAL PROJECTS, REAL OUTCOMES</span>
        </div>
        <div className="flex items-center gap-4 font-display text-[10px] leading-4 tracking-[0.2em] font-bold uppercase relative z-10">
          <span className="hidden md:inline">BUILT FOR RELIABILITY, MANAGED WITH CARE</span>
          <span className="text-primary bg-primary/10 px-3 py-1 rounded shadow-sm border border-primary/20 flex items-center gap-2">
            <Activity className="w-3 h-3 animate-pulse" />
            FIRST RESPONSE: 6–8 HOURS
          </span>
        </div>
      </div>

      <section className="w-full container px-4 lg:px-12 py-4 lg:py-6 relative z-10 flex flex-col justify-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative">
          
          <div className="lg:col-span-8 space-y-3 lg:space-y-4 relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-container-lowest/50 backdrop-blur-xl rounded-full border border-surface-container-highest shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.15)] text-secondary font-display text-[9px] leading-4 tracking-[0.2em] font-bold uppercase group cursor-default hover:border-primary/40 transition-all duration-300">
              <FolderLock className="text-[12px] text-primary group-hover:animate-pulse" />
              <span>COMPLETED ENGAGEMENTS // <span className="text-on-surface">BUILT TO LAST</span></span>
            </div>
            
            <h1 className="font-display text-[32px] lg:text-[44px] leading-[1.1] tracking-[-0.03em] font-bold text-transparent bg-clip-text bg-gradient-to-br from-on-surface via-on-surface to-primary/80 drop-shadow-sm">
              Real Systems, Built for Businesses That Depend on Them.
            </h1>
            
            <p className="font-sans text-[14px] lg:text-[15px] leading-[24px] lg:leading-[26px] tracking-[-0.01em] font-normal text-secondary max-w-2xl border-l-2 border-primary/40 pl-4 bg-gradient-to-r from-primary/5 to-transparent p-2 rounded-r-xl">
              Every project shown here is real work for real businesses. Where discretion was requested, details are shared without identifying information — because protecting one client's trust matters more than impressing the next visitor. What's shown is the actual problem, the actual thinking, and the actual result.
            </p>
          </div>
          
          {/* Architectural Seal & Blueprint Metric Card */}
          <div className="lg:col-span-4 relative group/card transform transition-all duration-500 hover:-translate-y-2">
            
            {/* Spinning Glow Border - MAGIC TRICK RESTORED */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-60 group-hover/card:opacity-100 transition-opacity duration-700">
               <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_180deg,rgba(var(--color-primary-rgb),0.8)_360deg)] animate-spin-slow"></div>
            </div>
            
            <div className="bg-surface-container-lowest/60 backdrop-blur-3xl p-6 lg:p-7 rounded-2xl border border-surface-container-highest space-y-5 lg:space-y-6 relative z-10 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              
              {/* Inner ambient glow instead of scanline */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0 pointer-events-none"></div>

              <div className="relative z-10 space-y-4 lg:space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-surface-container-highest">
                  <span className="font-display text-[10px] leading-4 tracking-[0.2em] font-bold uppercase text-secondary">PROJECTS DELIVERED</span>
                  <span className="font-display text-[10px] leading-4 tracking-[0.2em] font-bold uppercase text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.2)]">ACTIVE & ONGOING</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline font-display text-[10px] leading-4 tracking-[0.2em] font-bold uppercase text-secondary">
                    <span>BUSINESSES SERVED</span>
                    <span className="font-display text-[32px] leading-8 tracking-[-0.02em] text-on-surface font-bold">20+</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2.5 rounded-full overflow-hidden shadow-inner relative">
                    <div className="absolute top-0 left-0 bg-primary h-full w-[94%] rounded-full shadow-[0_0_15px_rgba(var(--color-primary-rgb),1)]"></div>
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full h-full animate-data-horizontal mix-blend-overlay"></div>
                  </div>
                </div>
                <div className="pt-2 text-on-surface font-display text-[11px] leading-5 tracking-[0.08em] font-semibold flex items-start gap-3 bg-surface-container/40 backdrop-blur-xl p-4 rounded-xl border border-surface-container-highest hover:border-primary/40 hover:shadow-[0_10px_30px_rgba(var(--color-primary-rgb),0.1)] transition-all">
                  <BadgeCheck className="text-[20px] text-primary shrink-0 mt-0.5 animate-pulse" />
                  <span>Every project includes direct, hands-on architectural support.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Architectural Metrics Bar (Fully Restored Animated Design, Compact Size) */}
        <div className="mt-2 lg:mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-5 relative z-20">
          
          <div className="group/metric bg-surface-container-lowest/50 backdrop-blur-2xl p-5 lg:p-6 rounded-2xl border border-surface-container-highest shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_50px_rgba(var(--color-primary-rgb),0.2)] hover:border-primary/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="flex items-center justify-between text-secondary relative z-10">
              <span className="font-display text-[10px] leading-4 tracking-[0.2em] font-bold uppercase group-hover/metric:text-on-surface transition-colors">SYSTEMS STILL RUNNING</span>
              <Timer className="text-primary text-[20px] group-hover/metric:scale-125 group-hover/metric:rotate-12 transition-all duration-500 shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.5)] rounded-full" />
            </div>
            <div className="mt-3 lg:mt-4 font-display text-[32px] lg:text-[36px] leading-[1] tracking-[-0.03em] font-bold text-on-surface relative z-10 group-hover/metric:text-primary transition-colors duration-500">
              Every<span className="text-secondary group-hover/metric:text-primary/70 font-light transition-colors duration-500"> One</span>
            </div>
            <p className="mt-2 font-sans text-[13px] leading-5 tracking-[0em] font-normal text-secondary relative z-10">Every system delivered is still in use today — nothing abandoned.</p>
          </div>
          
          <div className="group/metric bg-surface-container-lowest/50 backdrop-blur-2xl p-5 lg:p-6 rounded-2xl border border-surface-container-highest shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_50px_rgba(var(--color-primary-rgb),0.2)] hover:border-primary/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/25 via-transparent to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="flex items-center justify-between text-secondary relative z-10">
              <span className="font-display text-[10px] leading-4 tracking-[0.2em] font-bold uppercase group-hover/metric:text-on-surface transition-colors">WHAT GETS SOLVED</span>
              <Cpu className="text-primary text-[20px] group-hover/metric:scale-125 group-hover/metric:rotate-12 transition-all duration-500 shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.5)] rounded-full" />
            </div>
            <div className="mt-3 lg:mt-4 font-display text-[32px] lg:text-[36px] leading-[1] tracking-[-0.03em] font-bold text-on-surface relative z-10 group-hover/metric:text-primary transition-colors duration-500">
              Real<span className="text-secondary group-hover/metric:text-primary/70 font-light transition-colors duration-500"> Bottlenecks</span>
            </div>
            <p className="mt-2 font-sans text-[13px] leading-5 tracking-[0em] font-normal text-secondary relative z-10">Not cosmetic fixes — the specific architectural problems that were actually slowing the business down.</p>
          </div>
          
          <div className="group/metric bg-surface-container-lowest/50 backdrop-blur-2xl p-5 lg:p-6 rounded-2xl border border-surface-container-highest shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_50px_rgba(var(--color-primary-rgb),0.2)] hover:border-primary/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="flex items-center justify-between text-secondary relative z-10">
              <span className="font-display text-[10px] leading-4 tracking-[0.2em] font-bold uppercase group-hover/metric:text-on-surface transition-colors">SECURITY DISCIPLINE</span>
              <ShieldAlert className="text-primary text-[20px] group-hover/metric:scale-125 group-hover/metric:-rotate-12 transition-all duration-500 shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.5)] rounded-full" />
            </div>
            <div className="mt-3 lg:mt-4 font-display text-[32px] lg:text-[36px] leading-[1] tracking-[-0.03em] font-bold text-on-surface relative z-10 group-hover/metric:text-primary transition-colors duration-500">
              100<span className="text-secondary group-hover/metric:text-primary/70 font-light transition-colors duration-500">%</span>
            </div>
            <p className="mt-2 font-sans text-[13px] leading-5 tracking-[0em] font-normal text-secondary relative z-10">Data protection and access control are built in from day one, never bolted on later.</p>
          </div>

        </div>
      </section>
    </div>
  );
}