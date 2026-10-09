"use client";

export default function PostHandover() {
  return (
    <section className="w-full bg-surface-container-low/40 relative overflow-hidden py-24 border-t border-surface-container-highest/30">
      
      {/* Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_70%)] opacity-[0.03] pointer-events-none blur-[60px]"></div>

      <div className="w-full container px-4 lg:px-8 relative z-10">
        
        {/* Centered Header Block */}
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-6 mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_var(--color-primary)]"></span>
            <span className="font-display text-[11px] leading-4 tracking-[0.15em] font-bold uppercase tracking-widest text-primary">
              AFTER THE PROJECT ENDS
            </span>
          </div>
          
          <h2 className="font-display text-[36px] lg:text-[48px] leading-[1.15] tracking-[-0.02em] font-bold text-on-surface">
            What Happens After Handover?
          </h2>
          
          <p className="font-sans text-[16px] lg:text-[18px] leading-relaxed tracking-[-0.005em] font-medium text-secondary max-w-5xl">
            The real worry with hiring any developer isn't the build — it's what happens after. Will you be stuck if something breaks? Left with a system nobody else understands? Quietly billed for things that should've been included? Here's exactly what happens once your project goes live, stated plainly, upfront.
          </p>
        </div>
        
        {/* 3 Reassurance Pillars in Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Card 1 */}
          <div className="group relative bg-surface-container-lowest/60 backdrop-blur-2xl border border-surface-container-highest/50 rounded-[2rem] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] hover:border-surface-container-highest hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col justify-between">
            
            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-primary/5 blur-[30px] rounded-full pointer-events-none group-hover:bg-primary/15 transition-colors duration-500"></div>
            
            <div className="relative z-10">
              <div className="relative inline-block bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full mb-8 overflow-hidden group/pill cursor-default">
                 <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover/pill:translate-x-[250%] transition-transform duration-700 ease-in-out skew-x-[-15deg]"></div>
                 <span className="relative z-10 font-display text-[10px] tracking-[0.15em] font-bold text-primary uppercase">INCLUDED WITH EVERY PROJECT</span>
              </div>
              
              <h3 className="font-display text-[22px] font-bold text-on-surface mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                Post-Launch Support
              </h3>
              
              <p className="font-sans text-[15px] leading-relaxed text-secondary font-medium">
                A defined support period follows every launch. If something breaks, behaves unexpectedly, or wasn't caught during testing, it gets fixed — at no extra cost, and without you having to fight for it. This isn't a sales add-on; it's part of how every project is delivered.
              </p>
            </div>
            
            <div className="mt-8 pt-5 border-t border-surface-container-highest/50 relative z-10">
              <div className="flex items-center justify-between">
                 <span className="font-display text-[10px] tracking-[0.15em] font-bold text-secondary uppercase">RESPONSE TIME</span>
                 <span className="font-sans text-[13px] font-bold text-on-surface">6–8 HOURS</span>
              </div>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="group relative bg-surface-container-lowest/60 backdrop-blur-2xl border border-surface-container-highest/50 rounded-[2rem] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] hover:border-surface-container-highest hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col justify-between">
            
            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-primary/5 blur-[30px] rounded-full pointer-events-none group-hover:bg-primary/15 transition-colors duration-500"></div>
            
            <div className="relative z-10">
              <div className="relative inline-block bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full mb-8 overflow-hidden group/pill cursor-default">
                 <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover/pill:translate-x-[250%] transition-transform duration-700 ease-in-out skew-x-[-15deg]"></div>
                 <span className="relative z-10 font-display text-[10px] tracking-[0.15em] font-bold text-primary uppercase">FULL OWNERSHIP</span>
              </div>
              
              <h3 className="font-display text-[22px] font-bold text-on-surface mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                You Get Everything, Clearly
              </h3>
              
              <p className="font-sans text-[15px] leading-relaxed text-secondary font-medium">
                Once the project is complete, you receive the full source code, complete documentation, and a proper walkthrough of how everything works — not a locked-down system only I can touch. Any competent developer can pick up where we left off, maintain it, or extend it. You're never stuck waiting on one person to keep your business running.
              </p>
            </div>
            
            <div className="mt-8 pt-5 border-t border-surface-container-highest/50 relative z-10">
              <div className="flex items-center justify-between">
                 <span className="font-display text-[10px] tracking-[0.15em] font-bold text-secondary uppercase">HANDOVER</span>
                 <span className="font-sans text-[13px] font-bold text-on-surface">COMPLETE, NOT PARTIAL</span>
              </div>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="group relative bg-surface-container-lowest/60 backdrop-blur-2xl border border-surface-container-highest/50 rounded-[2rem] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] hover:border-surface-container-highest hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col justify-between">
            
            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-primary/5 blur-[30px] rounded-full pointer-events-none group-hover:bg-primary/15 transition-colors duration-500"></div>
            
            <div className="relative z-10">
              <div className="relative inline-block bg-surface-container-highest/30 border border-surface-container-highest/50 px-3.5 py-1.5 rounded-full mb-8 overflow-hidden group/pill cursor-default">
                 <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover/pill:translate-x-[250%] transition-transform duration-700 ease-in-out skew-x-[-15deg]"></div>
                 <span className="relative z-10 font-display text-[10px] tracking-[0.15em] font-bold text-secondary uppercase">OPTIONAL</span>
              </div>
              
              <h3 className="font-display text-[22px] font-bold text-on-surface mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                Ongoing Support, If You Want It
              </h3>
              
              <p className="font-sans text-[15px] leading-relaxed text-secondary font-medium">
                Some businesses want a continued point of contact as they grow — someone who already knows the system, available for questions, small changes, or planning what comes next. That's available if you want it. It's never assumed, never pushed, and never a condition of the work already delivered.
              </p>
            </div>
            
            <div className="mt-8 pt-5 border-t border-surface-container-highest/50 relative z-10">
              <div className="flex items-center justify-between">
                 <span className="font-display text-[10px] tracking-[0.15em] font-bold text-secondary uppercase">AVAILABILITY</span>
                 <span className="font-sans text-[13px] font-bold text-primary">BY REQUEST</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
