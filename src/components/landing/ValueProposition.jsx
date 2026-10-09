import { Lock, ShieldCheck, Database, Key, FileText, Handshake } from "lucide-react";

export default function ValueProposition() {
  return (
    <section className="relative w-full py-10 overflow-hidden">
      
      {/* Encapsulated animations */}
      <style dangerouslySetInnerHTML={{__html: `
        /* 1. Moving Border Glow (Idle Card) */
        @keyframes border-spin {
          100% { transform: rotate(360deg); }
        }

        /* 2. Indeterminate Loading (Pillar 1 Idle) */
        @keyframes loading-slide {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(350%); }
        }

        /* 3. Smooth Fill (Pillar 1 Hover) */
        @keyframes smooth-fill {
          0% { width: 0%; opacity: 0.5; }
          100% { width: 100%; opacity: 1; }
        }
        .group-hover\\:animate-smooth-fill {
          animation: smooth-fill 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* 4. Data Flow (Pillar 2 Idle) */
        @keyframes data-flow {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        .animate-data-flow {
          background-size: 200% 100%;
          animation: data-flow 4s linear infinite;
        }

        /* 5. Encryption Joining (Pillar 2 Hover) */
        @keyframes encrypt-left {
          0% { width: 0%; }
          50%, 100% { width: 50%; box-shadow: 0 0 12px rgba(220,38,38,0.8); }
        }
        .group-hover\\:animate-encrypt-left {
          animation: encrypt-left 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes encrypt-right {
          0% { width: 0%; }
          50%, 100% { width: 50%; box-shadow: 0 0 12px rgba(220,38,38,0.8); }
        }
        .group-hover\\:animate-encrypt-right {
          animation: encrypt-right 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes encrypt-shield {
          0%, 49% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); box-shadow: 0 0 20px rgba(255,255,255,0.8); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 10px rgba(220,38,38,0.8); }
        }
        .group-hover\\:animate-encrypt-shield {
          animation: encrypt-shield 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* 6. Laser Scan (Pillar 3 Idle) */
        @keyframes laser-scan {
          0% { left: 0%; opacity: 0.8; }
          50% { left: 100%; opacity: 0.8; }
          100% { left: 0%; opacity: 0.8; }
        }
        
        /* 7. Draw Line (Pillar 3 Hover) */
        @keyframes draw-line {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .group-hover\\:animate-draw-line {
          animation: draw-line 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}} />

      <div className="w-full container px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 gap-4 border-b border-surface-container-highest/50 mb-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2 font-display text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-primary uppercase">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>WHY THIS FEELS DIFFERENT</span>
              <span className="text-secondary font-display text-[12px] leading-[16px] tracking-[0.04em] font-medium ml-1">
                [ENG-03]
              </span>
            </div>
            <h2 className="font-display text-[32px] lg:text-[36px] leading-[1.15] tracking-[-0.02em] font-bold text-on-surface">
              Starting Over With a New Developer Is Scary. Here's How We Make It Safer.
            </h2>
          </div>
          <p className="font-sans text-[15px] leading-relaxed tracking-[0em] font-normal text-secondary max-w-sm text-justify">
            If you've been burned before - an unfinished website, a system you don't understand, a developer who disappeared - that caution is fair. Here's what's built into how we work, specifically because of that.
          </p>
        </div>

        {/* 3-Column Pillar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          
          {/* Pillar 1 */}
          <div className="group relative rounded-2xl overflow-hidden p-[1px] h-full shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-transform duration-700 hover:scale-[1.02]">
            {/* IDLE BORDER LIGHT (Spins around the card) */}
            <div className="absolute inset-[-100%] mx-auto my-auto animate-[border-spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,rgba(220,38,38,0.7)_100%)] group-hover:opacity-0 transition-opacity duration-500"></div>
            {/* HOVER BORDER (Solid red) */}
            <div className="absolute inset-0 bg-surface-container-highest group-hover:bg-primary/50 transition-colors duration-300"></div>
            
            {/* ACTUAL CARD CONTENT */}
            <div className="relative bg-surface-container/95 backdrop-blur-xl h-full w-full rounded-[15px] p-6 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-surface-container-highest/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between pb-5">
                  <span className="font-display text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-primary uppercase">PAYMENT STRUCTURE</span>
                  <span className="font-display text-[12px] leading-[16px] tracking-[0.04em] font-medium text-secondary uppercase bg-surface-container-highest/50 px-2 py-0.5 rounded">01 // MILESTONES</span>
                </div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-[-0.01em] font-semibold text-on-surface pb-3 group-hover:text-primary transition-colors duration-300">
                  You Pay As You See Progress
                </h3>
                <p className="font-sans text-[14px] leading-[22px] tracking-[-0.005em] font-normal text-secondary mb-6 flex-grow">
                  Work is broken into milestones. You see real, working progress before each payment - never a large sum upfront for something you can't yet see.
                </p>
              </div>
              
              <div className="relative z-10 mt-auto bg-surface-container-highest/30 border border-surface-container-highest p-4 rounded-xl group-hover:bg-primary/5 transition-all duration-500">
                <div className="flex items-center justify-between text-secondary font-display text-[12px] leading-[16px] tracking-[0.04em] font-medium mb-2">
                  <span>PAYMENT TERMS</span>
                  <span className="text-on-surface group-hover:text-primary transition-colors duration-300">MILESTONE-BASED</span>
                </div>
                
                {/* INNER BOX ANIMATION */}
                <div className="w-full bg-surface-container-highest/50 h-2 rounded-full mt-3 overflow-hidden relative border border-surface-container-highest/50">
                  {/* IDLE: Continuous sliding loader */}
                  <div className="absolute top-0 left-0 h-full w-[30%] bg-primary/40 rounded-full animate-[loading-slide_3s_ease-in-out_infinite] group-hover:hidden"></div>
                  
                  {/* HOVER: Smooth Fill */}
                  <div className="bg-primary h-full w-0 rounded-full group-hover:animate-smooth-fill relative z-10 shadow-[0_0_8px_rgba(220,38,38,0.5)] hidden group-hover:block"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="group relative rounded-2xl overflow-hidden p-[1px] h-full shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-transform duration-700 hover:scale-[1.02]">
            {/* IDLE BORDER LIGHT */}
            <div className="absolute inset-[-100%] mx-auto my-auto animate-[border-spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,rgba(220,38,38,0.7)_100%)] group-hover:opacity-0 transition-opacity duration-500" style={{ animationDelay: '-1.3s' }}></div>
            {/* HOVER BORDER */}
            <div className="absolute inset-0 bg-surface-container-highest group-hover:bg-primary/50 transition-colors duration-300"></div>
            
            {/* ACTUAL CARD CONTENT */}
            <div className="relative bg-surface-container/95 backdrop-blur-xl h-full w-full rounded-[15px] p-6 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-surface-container-highest/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between pb-5">
                  <span className="font-display text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-primary uppercase">SOVEREIGN OWNERSHIP</span>
                  <span className="font-display text-[12px] leading-[16px] tracking-[0.04em] font-medium text-secondary uppercase bg-surface-container-highest/50 px-2 py-0.5 rounded">02 // IP ISOLATION</span>
                </div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-[-0.01em] font-semibold text-on-surface pb-3 group-hover:text-primary transition-colors duration-300">
                  You Own Your System - No Lock-In, No Hostage Situations
                </h3>
                <p className="font-sans text-[14px] leading-[22px] tracking-[-0.005em] font-normal text-secondary mb-6 flex-grow">
                  Once complete, your code and documentation are fully yours - no one else needed to maintain or extend it, unless you choose to.
                </p>
              </div>
              
              <div className="relative z-10 mt-auto bg-surface-container-highest/30 border border-surface-container-highest p-4 rounded-xl group-hover:bg-primary/5 transition-all duration-500">
                <div className="flex items-center justify-between text-secondary font-display text-[12px] leading-[16px] tracking-[0.04em] font-medium mb-2">
                  <span>DELIVERABLE SPEC:</span>
                  <span className="text-on-surface group-hover:text-primary transition-colors duration-300">FULL SYSTEM, ON COMPLETION</span>
                </div>
                
                {/* INNER BOX ANIMATION */}
                <div className="flex items-center justify-center gap-4 mt-4 text-primary/40 relative">
                  <Database size={16} className="group-hover:text-primary transition-colors duration-300" />
                  <div className="flex-grow h-[3px] bg-surface-container-highest/50 relative overflow-hidden flex items-center justify-center rounded-full">
                    {/* IDLE: Continuous data stream pattern */}
                    <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent_25%,rgba(220,38,38,0.4)_50%,transparent_75%)] animate-data-flow group-hover:hidden"></div>
                    
                    {/* HOVER: Encryption Joining */}
                    <div className="absolute left-0 top-0 h-full bg-primary rounded-l-full hidden group-hover:block group-hover:animate-encrypt-left"></div>
                    <div className="absolute right-0 top-0 h-full bg-primary rounded-r-full hidden group-hover:block group-hover:animate-encrypt-right"></div>
                  </div>
                  
                  {/* Center Shield Lock */}
                  <div className="absolute left-[50%] top-[50%] hidden group-hover:flex items-center justify-center bg-surface-container rounded-full group-hover:animate-encrypt-shield z-10 border border-primary/50 text-primary">
                    <ShieldCheck size={16} className="p-[2px]" />
                  </div>

                  <Key size={16} className="group-hover:text-primary transition-colors duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="group relative rounded-2xl overflow-hidden p-[1px] h-full shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-transform duration-700 hover:scale-[1.02]">
            {/* IDLE BORDER LIGHT */}
            <div className="absolute inset-[-100%] mx-auto my-auto animate-[border-spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,rgba(220,38,38,0.7)_100%)] group-hover:opacity-0 transition-opacity duration-500" style={{ animationDelay: '-2.6s' }}></div>
            {/* HOVER BORDER */}
            <div className="absolute inset-0 bg-surface-container-highest group-hover:bg-primary/50 transition-colors duration-300"></div>
            
            {/* ACTUAL CARD CONTENT */}
            <div className="relative bg-surface-container/95 backdrop-blur-xl h-full w-full rounded-[15px] p-6 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-surface-container-highest/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between pb-5">
                  <span className="font-display text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-primary uppercase">CONFIDENTIALITY</span>
                  <span className="font-display text-[12px] leading-[16px] tracking-[0.04em] font-medium text-secondary uppercase bg-surface-container-highest/50 px-2 py-0.5 rounded">03 // NDA PROTECTED</span>
                </div>
                <h3 className="font-display text-[18px] leading-[1.3] tracking-[-0.01em] font-semibold text-on-surface pb-3 group-hover:text-primary transition-colors duration-300">
                  Confidentiality Is Standard, Not an Upsell
                </h3>
                <p className="font-sans text-[14px] leading-[22px] tracking-[-0.005em] font-normal text-secondary mb-6 flex-grow">
                  Every engagement is covered by a clear confidentiality agreement before any technical details are discussed. Your business information stays protected by default.
                </p>
              </div>
              
              <div className="relative z-10 mt-auto bg-surface-container-highest/30 border border-surface-container-highest p-4 rounded-xl group-hover:bg-primary/5 transition-all duration-500">
                <div className="flex items-center justify-between text-secondary font-display text-[12px] leading-[16px] tracking-[0.04em] font-medium mb-3">
                  <span>PROTOCOL:</span>
                  <span className="text-on-surface group-hover:text-primary transition-colors duration-300">SIGNED NDA, EVERY PROJECT</span>
                </div>
                
                {/* INNER BOX ANIMATION */}
                <div className="flex items-center justify-center gap-3 mb-3 text-primary/40">
                  <FileText size={16} className="group-hover:text-primary transition-colors duration-300" />
                  <div className="flex-grow h-[2px] bg-surface-container-highest/50 relative flex items-center rounded-full">
                    {/* IDLE: Laser Scanner */}
                    <div className="absolute top-[-2px] h-[6px] w-[2px] bg-primary/70 rounded-full animate-[laser-scan_4s_ease-in-out_infinite] group-hover:hidden shadow-[0_0_5px_rgba(220,38,38,0.5)]"></div>
                    
                    {/* HOVER: Draw Signature Line */}
                    <div className="absolute top-0 left-0 h-full bg-primary group-hover:animate-draw-line w-0 shadow-[0_0_8px_rgba(220,38,38,0.5)] hidden group-hover:block"></div>
                  </div>
                  <Handshake size={16} className="group-hover:text-primary transition-colors duration-300" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[12px] font-display leading-[16px] tracking-[0.04em] font-medium text-primary-container">
                    <Lock className="text-[14px]" />
                    <span>ZERO SHARED REPOSITORIES</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
