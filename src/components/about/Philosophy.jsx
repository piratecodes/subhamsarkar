"use client";

import { Key, Shield, Workflow } from "lucide-react";
import Tilt from "react-parallax-tilt";

export default function Philosophy() {
  const axioms = [
    {
      num: "AXIOM 01",
      icon: Shield,
      title: "Reliability First",
      desc: "If one part of your system fails, the rest shouldn't. Payment issues shouldn't take down your inventory. A slow report shouldn't stop new orders from coming in. Systems are built so one failure stays contained, not contagious.",
      metric: "Isolated Failure Design"
    },
    {
      num: "AXIOM 02",
      icon: Workflow,
      title: "Built to Scale, Not Just to Launch",
      desc: "Speed today shouldn't cost you stability tomorrow. Systems are built clean from the start, so growth doesn't mean constant, costly rebuilding.",
      metric: "Scales Without Rebuilding"
    },
    {
      num: "AXIOM 03",
      icon: Key,
      title: "You Own It, Fully",
      desc: "Your business logic is your competitive edge — not mine. You receive complete, understandable code and documentation. You're never locked into needing me, or anyone, to keep it running.",
      metric: "Full Ownership, On Completion"
    }
  ];

  return (
    <section className="relative w-full py-16">
      
      {/* Dynamic Background for the section */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] bg-[radial-gradient(ellipse,rgba(var(--color-primary-rgb),0.06)_0%,transparent_60%)] blur-[60px] mix-blend-plus-lighter animate-pulse-glow"></div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-border {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes subtle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}} />

      <div className="w-full container px-4 lg:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="space-y-4 max-w-2xl mb-12">
          <div className="flex items-center gap-1">
            <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold text-primary uppercase tracking-widest border-l-2 border-primary pl-3">
              DOCTRINE // SYSTEMIC AXIOMS
            </span>
          </div>
          <h2 className="font-display text-[36px] leading-[44px] tracking-[-0.02em] font-bold text-on-surface tracking-tight drop-shadow-sm">
            Principles Grounded in Structural Rationalism
          </h2>
          <p className="font-sans text-[15px] leading-6 tracking-[-0.005em] font-medium text-secondary">
            Good software shouldn't get more fragile the more successful your business becomes. Three principles guide everything I build.
          </p>
        </div>

        {/* 3 Structural Columns - Spinning Neon Border Architecture with react-parallax-tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {axioms.map((ax, i) => (
            <Tilt 
              key={i} glareEnable={true}
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              perspective={1000}
              transitionSpeed={1000}
              scale={1.03}
              gyroscope={true}
              className="h-full"
            >
              <div className="relative group rounded-2xl p-[1px] overflow-hidden shadow-md hover:shadow-2xl h-full flex flex-col [transform-style:preserve-3d]">
                
                {/* Spinning Conic Gradient Border Layer */}
                <div className="absolute inset-[-100%] z-0 pointer-events-none [background:conic-gradient(from_0deg,transparent_0_280deg,rgba(var(--color-primary-rgb),0.4)_360deg)] animate-[spin-border_5s_linear_infinite] group-hover:[background:conic-gradient(from_0deg,transparent_0_260deg,rgba(var(--color-primary-rgb),1)_360deg)] group-hover:[animation-duration:2.5s]"></div>
                
                {/* Static Backup Border to enclose the card */}
                <div className="absolute inset-0 border border-surface-container-highest rounded-2xl z-0 pointer-events-none"></div>

                {/* Inner Card Layer (Preserving your exact colors) */}
                <div className="relative z-10 bg-surface-container-low/75 backdrop-blur-xl h-full rounded-[15px] p-6 lg:p-8 flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
                
                <div className="space-y-6">
                  {/* Distinctive Header: Icon left, Number right */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center border border-surface group-hover:border-primary/40 group-hover:bg-primary/5 transition-colors duration-500 relative">
                      <div className="absolute inset-0 bg-primary/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <ax.icon className="w-5 h-5 text-secondary group-hover:text-primary relative z-10 transition-colors duration-500 group-hover:[animation:subtle-bounce_1.5s_ease-in-out_infinite]" />
                    </div>
                    
                    <span className="font-display text-[11px] leading-4 tracking-[0.2em] font-bold text-secondary/60 group-hover:text-primary transition-colors tracking-widest uppercase relative">
                      <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-ping"></span>
                      {ax.num}
                    </span>
                  </div>

                  {/* Content Area */}
                  <div>
                    <h3 className="font-display text-[18px] lg:text-[20px] leading-[1.3] tracking-[0em] font-bold text-on-surface mb-3 group-hover:text-primary transition-colors duration-500">
                      {ax.title}
                    </h3>
                    <p className="font-sans text-[14px] lg:text-[15px] leading-[1.6] tracking-[-0.005em] font-medium text-secondary">
                      {ax.desc}
                    </p>
                  </div>
                </div>

                {/* Enhanced Metric of Merit Block (from the previous design) */}
                <div className="mt-8 pt-5 border-t border-surface-container-highest group-hover:border-primary/20 transition-colors duration-500">
                  <div className="bg-surface-container-lowest group-hover:bg-primary/5 p-4 rounded-xl border border-transparent group-hover:border-primary/20 transition-all duration-500 flex flex-col gap-1.5 shadow-sm group-hover:shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.05)] relative overflow-hidden" style={{ transform: "translateZ(40px)" }}>
                    {/* Glowing highlight in the corner of the metric box */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <span className="font-display text-[10px] leading-4 tracking-[0.1em] font-bold text-secondary uppercase relative z-10">
                      METRIC OF MERIT
                    </span>
                    <span className="font-sans text-[13px] lg:text-[14px] leading-5 tracking-[0em] font-bold text-on-surface relative z-10">
                      {ax.metric}
                    </span>
                  </div>
                </div>

              </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
