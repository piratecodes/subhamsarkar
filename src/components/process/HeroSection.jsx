"use client";
import { CheckCircle, Flag, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="w-full bg-surface-container/25 relative overflow-hidden py-16 lg:py-20 border-b border-surface-container-highest/30">
      
      {/* Red & Blue Color Aura Backgrounds */}
      <div className="absolute top-[10%] left-[-5%] w-[40%] h-[70%] bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.12)_0%,transparent_60%)] blur-[60px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[80%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12)_0%,transparent_60%)] blur-[60px] pointer-events-none"></div>
      
      {/* Subtle Blueprint Geometric Grid Accent (placed above auras so it doesn't hide) */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#1c1c18_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <div className="w-full container px-4 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Text Block */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            
            <div className={`flex items-center gap-2 mb-1 transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_var(--color-primary)]"></span>
              <span className="font-display text-[11px] leading-4 tracking-[0.15em] font-bold text-primary uppercase tracking-widest">
                HOW WE WORK
              </span>
            </div>

            {/* New Pill with Hover Shine Sweep */}
            <div className={`transition-all duration-700 delay-[100ms] ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="relative inline-block bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full mb-3 w-fit overflow-hidden group/pill cursor-default">
                 <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover/pill:translate-x-[250%] transition-transform duration-700 ease-in-out skew-x-[-15deg]"></div>
                 <span className="relative z-10 font-display text-[11px] md:text-[12px] font-semibold text-primary tracking-[0.05em]">Five Phases. One Clear Path. No Surprises.</span>
              </div>
            </div>
            
            {/* Animated Headline with Glowing Accent */}
            <h1 className={`font-display text-[42px] md:text-[48px] lg:text-[60px] leading-[1.05] tracking-[-0.03em] text-on-surface font-bold tracking-tight mb-2 transition-all duration-700 delay-[200ms] ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              How We Build Software That <span className="relative inline-block group/glow cursor-default whitespace-nowrap">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 relative z-10 transition-all duration-500 drop-shadow-sm group-hover/glow:drop-shadow-[0_0_12px_var(--color-primary)]">Actually Lasts</span>
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary/40 blur-[2px] group-hover/glow:blur-[4px] group-hover/glow:bg-primary transition-all duration-500"></span>
              </span>
            </h1>
            
            <div className="space-y-5 font-sans text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed tracking-[-0.005em] text-secondary max-w-3xl font-medium text-justify lg:text-left">
              <p className={`transition-all duration-700 delay-[300ms] ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Most software problems aren't coding problems — they're planning problems. Our five-phase process replaces guesswork with clear milestones, honest communication, and full transparency from the first conversation to final handover.
              </p>
              <p className={`transition-all duration-700 delay-[400ms] ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                There's no fixed timeline here, because no two businesses are the same — but there is a fixed way of working. You'll always know what phase you're in, what's coming next, and what's expected from both sides.
              </p>
            </div>
                     {/* Inline Icon Badges & Bottom Text */}
            <div className={`pt-4 transition-all duration-1000 delay-[500ms] ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex flex-wrap items-center gap-3 text-[12px] leading-4 tracking-[0.05em] font-medium font-display text-on-surface mb-5">
                
                {/* Tablet 1 */}
                <div className="relative group/tablet cursor-default rounded-lg p-[1.5px] overflow-hidden transition-transform active:scale-95">
                  <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0_75%,var(--color-primary)_100%)] opacity-0 group-hover/tablet:opacity-100 group-hover/tablet:animate-[spin_2s_linear_infinite]"></div>
                  <div className="relative flex items-center gap-2 bg-surface-container/80 backdrop-blur-xl px-3.5 py-2.5 rounded-[6.5px] w-full h-full border border-surface-container-highest/30 group-hover/tablet:border-transparent transition-colors">
                    <Flag className="w-3.5 h-3.5 text-primary group-hover/tablet:scale-125 transition-transform duration-300" />
                    <span className="group-hover/tablet:text-primary transition-colors duration-300">Clear Milestones</span>
                  </div>
                </div>

                {/* Tablet 2 */}
                <div className="relative group/tablet cursor-default rounded-lg p-[1.5px] overflow-hidden transition-transform active:scale-95">
                  <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0_75%,var(--color-primary)_100%)] opacity-0 group-hover/tablet:opacity-100 group-hover/tablet:animate-[spin_2s_linear_infinite]" style={{ animationDelay: '-0.5s' }}></div>
                  <div className="relative flex items-center gap-2 bg-surface-container/80 backdrop-blur-xl px-3.5 py-2.5 rounded-[6.5px] w-full h-full border border-surface-container-highest/30 group-hover/tablet:border-transparent transition-colors">
                    <CheckCircle className="w-3.5 h-3.5 text-primary group-hover/tablet:scale-125 transition-transform duration-300" />
                    <span className="group-hover/tablet:text-primary transition-colors duration-300">Full Ownership, On Completion</span>
                  </div>
                </div>

                {/* Tablet 3 */}
                <div className="relative group/tablet cursor-default rounded-lg p-[1.5px] overflow-hidden transition-transform active:scale-95">
                  <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0_75%,var(--color-primary)_100%)] opacity-0 group-hover/tablet:opacity-100 group-hover/tablet:animate-[spin_2s_linear_infinite]" style={{ animationDelay: '-1s' }}></div>
                  <div className="relative flex items-center gap-2 bg-surface-container/80 backdrop-blur-xl px-3.5 py-2.5 rounded-[6.5px] w-full h-full border border-surface-container-highest/30 group-hover/tablet:border-transparent transition-colors">
                    <MessageCircle className="w-3.5 h-3.5 text-primary group-hover/tablet:scale-125 transition-transform duration-300" />
                    <span className="group-hover/tablet:text-primary transition-colors duration-300">Direct Communication Throughout</span>
                  </div>
                </div>

              </div>
              <p className="font-sans text-[14px] text-secondary/90 italic font-medium">
                Every project follows this same process — whether it's a small fix or a full system build.
              </p>
            </div>
          </div>
          
          {/* Right Floating Glass Panel */}
          <div className={`lg:col-span-4 flex flex-col justify-between h-full bg-surface-container-lowest/60 backdrop-blur-xl border border-surface-container-highest/40 rounded-2xl p-6 lg:p-7 shadow-[0_15px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)] hover:border-surface-container-highest transition-all duration-700 delay-[500ms] ease-out ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
             
             <div>
               <h4 className="font-display text-[11px] tracking-[0.15em] font-bold text-primary mb-5 flex items-center gap-2 uppercase">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)] animate-pulse"></div>
                 THE PATH
               </h4>
               
               <ul className="space-y-2.5">
                 {[
                   { step: "01", name: "Discovery", desc: "Understanding your business" },
                   { step: "02", name: "Planning", desc: "Designing the right approach" },
                   { step: "03", name: "Building", desc: "Bringing it to life" },
                   { step: "04", name: "Testing", desc: "Making sure it holds up" },
                   { step: "05", name: "Handover", desc: "Fully yours, start to finish" }
                 ].map((item, i) => (
                   <li key={i} className="group flex items-start gap-3.5 p-2 px-3 -ml-3 rounded-xl hover:bg-surface-container/50 transition-colors cursor-default">
                     <span className="font-display text-[10.5px] tracking-[0.1em] font-bold text-primary mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity">{item.step}</span>
                     <div className="flex flex-col">
                       <span className="font-sans text-lg font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">{item.name}</span>
                       <span className="font-sans text-sm text-secondary leading-tight font-medium mt-0.5">{item.desc}</span>
                     </div>
                   </li>
                 ))}
               </ul>
               
               <div className="mt-6 pt-5 border-t border-surface-container-highest/50 grid grid-cols-2 gap-4 relative group/telemetry cursor-default">
                 {/* Subtle hover gradient glow */}
                 <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-transparent group-hover/telemetry:from-primary/5 transition-colors duration-700 pointer-events-none rounded-lg"></div>
                 
                 <div className="relative z-10 pr-2 border-r border-surface-container-highest/30">
                   <span className="font-display text-[9.5px] tracking-[0.15em] font-bold text-secondary uppercase mb-2 flex items-center gap-1.5">
                     <span className="w-1 h-1 bg-primary rounded-full animate-pulse"></span> PACE
                   </span>
                   <span className="font-sans text-[12.5px] font-bold text-on-surface leading-snug block">
                     Set By Your Project, Not a Template
                   </span>
                 </div>
                 
                 <div className="relative z-10 pl-2">
                   <span className="font-display text-[9.5px] tracking-[0.15em] font-bold text-secondary uppercase mb-2 flex items-center gap-1.5">
                     <span className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '500ms' }}></span> COMM
                   </span>
                   <span className="font-sans text-[12.5px] font-bold text-primary leading-snug block">
                     Regular Updates, No Silence
                   </span>
                 </div>
               </div>
               
               <div className="mt-5 pt-6 border-t border-surface-container-highest/30 flex justify-center">
                 <p className="font-display text-[9.5px] text-secondary uppercase tracking-[0.1em] font-bold bg-surface-container/50 px-3.5 py-2 rounded-full border border-surface-container-highest/30 text-center shadow-inner">
                   No fixed timeline — every project moves at its own pace.
                 </p>
               </div>
             </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
