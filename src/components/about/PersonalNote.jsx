import { Handshake } from "lucide-react";
export default function PersonalNote() {
  return (
    <section className="relative w-full bg-surface-container/75 py-16 overflow-hidden group">
      
      {/* Peaceful, very slow ambient background pulse */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-[radial-gradient(ellipse,rgba(var(--color-primary-rgb),0.02)_0%,transparent_60%)] animate-pulse-glow"></div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slow-breath {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes line-breathe {
          0%, 100% { width: 32px; opacity: 0.3; }
          50% { width: 80px; opacity: 1; }
        }
        .animate-slow-breath {
          background-size: 200% 200%;
          animation: slow-breath 8s ease-in-out infinite;
        }
        .animate-float-gentle {
          animation: float-gentle 6s ease-in-out infinite;
        }
        .animate-line-breathe {
          animation: line-breathe 4s ease-in-out infinite;
        }
      `}} />

      <div className="w-full max-w-4xl mx-auto px-4 lg:px-12 text-center space-y-6 relative z-10">
        
        {/* Animated Pill (Always pulsing slightly) */}
        <div className="inline-flex items-center gap-2 px-5 py-1.5 bg-surface-container-high/60 border border-surface-container-highest rounded-full backdrop-blur-sm shadow-sm cursor-default">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping blur-sm" style={{ animationDuration: '3s' }}></div>
            <Handshake className="text-[14px] text-primary relative z-10 animate-float-gentle" style={{ animationDuration: '4s' }} />
          </div>
          <span className="font-display text-[10px] leading-4 tracking-[0.15em] font-bold text-secondary uppercase tracking-widest">
            PERSONAL REFLECTION
          </span>
        </div>
        
        {/* Main Heading with subtle gradient breath */}
        <h2 className="font-display text-[36px] leading-[44px] tracking-[-0.02em] font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-on-surface via-on-surface-variant to-on-surface animate-slow-breath">
          The Quiet Dignity of Resilient Infrastructure
        </h2>
        
        {/* Quote text with floating decorative quotes */}
        <div className="relative py-4">
          <span className="absolute top-0 left-4 lg:-left-4 text-6xl text-primary/20 font-serif leading-none animate-float-gentle">"</span>
          <p className="font-sans text-[18px] lg:text-[20px] leading-[32px] tracking-[-0.01em] font-medium text-secondary/90 leading-relaxed italic max-w-3xl mx-auto relative z-10">
            Beyond the code and structural calculations, what drives this work is craft. In an industry filled with ephemeral prototypes, there is genuine honor in creating software infrastructure that quietly, flawlessly runs a company&apos;s livelihood year after year without making headlines.
          </p>
          <span className="absolute bottom-0 right-4 lg:-right-4 text-6xl text-primary/20 font-serif leading-none animate-float-gentle" style={{ animationDelay: '2s' }}>"</span>
        </div>
        
        {/* Signature Block */}
        <div className="pt-6 flex flex-col items-center justify-center relative">
          {/* Continuously breathing underline */}
          <div className="h-[1px] bg-primary/40 mb-5 animate-line-breathe"></div>
          
          <span className="font-display text-[24px] leading-[32px] tracking-[-0.01em] text-on-surface font-bold tracking-tight">Subham Sarkar</span>
          <span className="font-display text-[11px] leading-4 tracking-[0.1em] font-medium text-secondary tracking-widest uppercase mt-1">Principal Systems Architect & Developer</span>
        </div>
      </div>
    </section>
  );
}
