import { Palette, ScrollText, Handshake, Network } from "lucide-react";

export default function CoreTraits() {
  const traits = [
    {
      num: "TRAIT-01",
      icon: Palette,
      title: "The Craftsman's Eye",
      desc: "Every interface, every workflow, every screen a client will use is considered the way a designer considers a room — not just 'does it work,' but 'does it feel right to use, every day.'",
      footer: "Interfaces people actually enjoy using"
    },
    {
      num: "TRAIT-02",
      icon: ScrollText,
      title: "A Way With Words",
      desc: "Before a line of code is written, a system has to be understood as a story — where it starts, where the friction is, how it should end. That habit of thinking in narrative, not just logic, shapes every decision made.",
      footer: "Documentation people actually read"
    },
    {
      num: "TRAIT-03",
      icon: Handshake,
      title: "The Diplomat's Instinct",
      desc: "Every client conversation is treated as a negotiation worth getting right — listening for what's actually being asked, not just what's said, and finding a solution both sides are genuinely glad to land on.",
      footer: "Fewer misunderstandings, fewer rebuilds"
    },
    {
      num: "TRAIT-04",
      icon: Network,
      title: "The Architect's Discipline",
      desc: "At the core is still the architect: someone who believes a system, like anything well-made, should be built once, built properly, and left alone to work.",
      footer: "Systems that don't need constant fixing"
    }
  ];

  return (
    <section className="relative w-full py-16">
      
      {/* Subtle Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[60vw] bg-[radial-gradient(ellipse,rgba(var(--color-primary-rgb),0.12)_0%,transparent_70%)] blur-[80px] -rotate-6 animate-orbit-glow mix-blend-screen"></div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-icon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes orbit-glow {
          0% { transform: translate(0, 0) scale(1); opacity: 0.1; }
          33% { transform: translate(-3%, 5%) scale(1.05); opacity: 0.15; }
          66% { transform: translate(5%, -3%) scale(0.95); opacity: 0.12; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.1; }
        }
        .animate-orbit-glow {
          animation: orbit-glow 15s ease-in-out infinite;
        }

        @keyframes border-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-border-shimmer {
          background: linear-gradient(90deg, transparent, rgba(var(--color-primary-rgb), 0.3), rgba(var(--color-secondary-rgb), 0.3), transparent);
          background-size: 200% 100%;
          animation: border-shimmer 4s linear infinite;
        }
      `}} />

      <div className="w-full container px-6 lg:px-12 relative z-10 flex flex-col space-y-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 font-display text-[11px] leading-4 tracking-[0.12em] font-semibold text-primary uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20 shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.1)]">
            <span>BEYOND THE ARCHITECTURE</span>
          </div>
          <h2 className="font-display text-[36px] leading-11 tracking-[-0.02em] font-semibold text-on-surface text-balance">
            The Person Behind the System
          </h2>
          <p className="font-sans text-[16px] leading-[26px] tracking-[-0.005em] font-normal text-secondary text-balance">
            Every system is built by someone who thinks a certain way. Four ways of thinking shape how I work.
          </p>
        </div>

        {/* 4-Column Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {traits.map((trait, index) => {
            const Icon = trait.icon;
            return (
              <div 
                key={index} 
                className="group relative bg-surface-container-low/60 backdrop-blur-md p-6 rounded-2xl flex flex-col justify-between shadow-sm border border-outline-variant hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(var(--color-primary-rgb),0.1)]"
              >
                {/* Minimalist Shimmering Top Border */}
                <div className="absolute top-0 left-4 right-4 h-[1px] animate-border-shimmer opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 rounded-2xl"></div>

                <div className="relative z-10 flex flex-col h-full">
                  
                  {/* Top: Badge and Icon */}
                  <div className="flex items-center justify-between pb-6">
                    <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold text-secondary group-hover:text-primary transition-colors uppercase bg-surface-container-highest/50 group-hover:bg-primary/10 px-2 py-0.5 rounded border border-transparent group-hover:border-primary/20 flex items-center gap-1.5 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)] group-hover:shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.2)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:bg-primary group-hover:animate-ping"></span>
                      [{trait.num}]
                    </span>
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 blur-md rounded-full opacity-50 group-hover:opacity-100 transition-all duration-500"></div>
                      <Icon className="w-5 h-5 text-primary opacity-60 group-hover:opacity-100 transition-all duration-500 relative z-10 [animation:float-icon_4s_ease-in-out_infinite] group-hover:[animation:float-icon_2s_ease-in-out_infinite]" />
                    </div>
                  </div>
                  
                  {/* Middle: Content */}
                  <div className="flex-grow pb-6">
                    <h3 className="font-display text-[18px] leading-6 tracking-[0em] font-semibold text-on-surface group-hover:text-primary transition-colors duration-300 pb-3">
                      {trait.title}
                    </h3>
                    <p className="font-sans text-[14px] leading-[22px] tracking-[-0.005em] font-normal text-secondary group-hover:text-on-surface-variant transition-colors duration-300">
                      {trait.desc}
                    </p>
                  </div>
                  
                  {/* Bottom: Footer */}
                  <div className="pt-4 border-t border-surface-container-highest group-hover:border-primary/20 transition-colors duration-500 flex flex-col gap-1.5 mt-auto">
                    <span className="font-display text-[10px] leading-[14px] tracking-[0.08em] font-semibold text-primary uppercase">
                      WHERE IT SHOWS UP:
                    </span>
                    <span className="font-sans text-[13px] leading-[18px] font-medium text-on-surface-variant transform group-hover:translate-x-1 group-hover:text-on-surface transition-all duration-300">
                      {trait.footer}
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
