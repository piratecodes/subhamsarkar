import { Bot, Database, Laptop, Network, Workflow } from "lucide-react";

export default function DisciplineStrip() {
  const disciplines = [
    { title: "ERP Systems Architecture", spec: "[SPEC-01]", icon: Workflow, desc: "Resource models, immutable financial ledger logic, real-time multi-warehouse inventory synchronization, and custom audit pipelines.", stat: "RESILIENT STATE" },
    { title: "Enterprise CRM Engines", spec: "[SPEC-02]", icon: Database, desc: "Unified enterprise deal pipelines, granular role-based tenant isolation, customer telemetry history, and custom communication routing.", stat: "ISOLATED TENANCY" },
    { title: "Web & Mobile Ecosystems", spec: "[SPEC-03]", icon: Laptop, desc: "High-throughput, ultra-low latency customer portals and cross-platform native interfaces with synchronized offline state machines.", stat: "OFFLINE RESILIENCE" },
    { title: "Brokers & Event Buses", spec: "[SPEC-04]", icon: Network, desc: "Asynchronous event streaming, bank clearinghouse hooks, robust queue orchestrators (Kafka/RabbitMQ), and distributed circuit breakers.", stat: "ZERO PACKET LOSS" },
    { title: "AI Agents & Automation", spec: "[SPEC-05]", icon: Bot, desc: "Deterministic reasoning agents, air-gapped local RAG infrastructure, document analysis nodes, and automated invoice triage pipelines.", stat: "LOCAL RAG / AIR-GAPPED" }
  ];

  return (
    <section className="relative w-full bg-surface-container-low/60 py-10 overflow-hidden">
      
      {/* Encapsulated animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wave-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes idle-breathe {
          0%, 100% { 
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
            border-color: var(--color-surface-container-highest);
          }
          50% { 
            box-shadow: 0 15px 30px -10px rgba(220,38,38, 0.15);
            border-color: rgba(220,38,38, 0.25);
          }
        }
        @keyframes glass-shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          15%, 100% { transform: translateX(200%) skewX(-20deg); }
        }
        @keyframes mini-bounce {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}} />

      <div className="w-full container px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 gap-4 border-b border-surface-container-highest/50 mb-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-display text-[10px] leading-[16px] tracking-[0.2em] font-bold text-primary uppercase">CORE DISCIPLINES</span>
            </div>
            <h2 className="font-display text-[24px] lg:text-[28px] leading-[1.2] tracking-[-0.02em] font-bold text-on-surface">
              Master Blueprint Capabilities
            </h2>
          </div>
          <div className="flex items-center font-display text-[10px] leading-[16px] tracking-[0.1em] font-semibold text-secondary/70 border border-surface-container-highest px-4 py-1.5 rounded-full bg-surface-container/30 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 mr-2"></span>
            SPECIFICATION REGISTRY: SS-01 TO SS-05
          </div>
        </div>

        {/* 5-Column Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {disciplines.map((item, i) => (
            <div key={i} className="relative h-full group">
              {/* Layer 1: Stable Hitbox */}
              {/* Layer 2: Wavy Float (Pauses on Hover) */}
              <div 
                className="h-full w-full will-change-transform group-hover:[animation-play-state:paused] [animation:wave-float_4s_ease-in-out_infinite]"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                {/* Layer 3: Card UI (Breathes, Translates up on hover) */}
                <div 
                  className="relative bg-surface-container/60 backdrop-blur-md p-5 lg:p-6 rounded-2xl border transition-all duration-500 overflow-hidden flex flex-col justify-between h-full group-hover:-translate-y-2 group-hover:shadow-[0_15px_30px_-10px_rgba(220,38,38,0.3)] group-hover:border-primary/50 group-hover:[animation:none] [animation:idle-breathe_4s_ease-in-out_infinite]"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
              {/* Idle Glass Shimmer (Occasional sweeping glare) */}
              <div className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none mix-blend-overlay" style={{ animation: `glass-shimmer 10s infinite ${i * 0.5}s` }}></div>
              
              {/* Subtle Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-surface-container-highest/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
              
              {/* Top scanning line on hover */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent -translate-x-full group-hover:animate-scanline opacity-0 group-hover:opacity-100 z-0"></div>

              {/* Persistent Faint Architectural Corner Crosses with Idle Breathing */}
              <div className="absolute top-4 left-4 w-1.5 h-1.5 border-t border-l border-surface-container-highest group-hover:border-primary/40 transition-colors duration-500 pointer-events-none" style={{ animation: `breathe 4s ease-in-out infinite ${i * 0.4}s` }}></div>
              <div className="absolute top-4 right-4 w-1.5 h-1.5 border-t border-r border-surface-container-highest group-hover:border-primary/40 transition-colors duration-500 pointer-events-none" style={{ animation: `breathe 4s ease-in-out infinite ${i * 0.4 + 1}s` }}></div>
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 border-b border-l border-surface-container-highest group-hover:border-primary/40 transition-colors duration-500 pointer-events-none" style={{ animation: `breathe 4s ease-in-out infinite ${i * 0.4 + 2}s` }}></div>
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 border-b border-r border-surface-container-highest group-hover:border-primary/40 transition-colors duration-500 pointer-events-none" style={{ animation: `breathe 4s ease-in-out infinite ${i * 0.4 + 3}s` }}></div>

              <div className="relative z-10 flex flex-col h-full">
                
                {/* Header Row: Icon Box, Spec Label & Mini Visualizer */}
                <div className="flex items-start justify-between pb-5">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-lowest/50 border border-surface-container-highest shadow-sm flex items-center justify-center group-hover:bg-primary/5 group-hover:border-primary/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 origin-bottom-left">
                    <item.icon className="text-[18px] text-secondary group-hover:text-primary transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-display text-[9px] leading-[14px] tracking-[0.15em] font-bold text-secondary/60 uppercase group-hover:text-primary/70 transition-colors duration-300">
                      {item.spec}
                    </span>
                    
                    {/* Live Mini Element (Data Flow Visualizer) - Always active but dims on idle */}
                    <div className="flex items-end gap-[2px] h-3 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-0.5 bg-primary rounded-t-sm origin-bottom" style={{ animation: 'mini-bounce 0.8s ease-in-out infinite alternate' }}></div>
                      <div className="w-0.5 bg-primary rounded-t-sm origin-bottom" style={{ animation: 'mini-bounce 0.8s ease-in-out infinite alternate 0.3s' }}></div>
                      <div className="w-0.5 bg-primary rounded-t-sm origin-bottom" style={{ animation: 'mini-bounce 0.8s ease-in-out infinite alternate 0.1s' }}></div>
                      <div className="w-0.5 bg-primary rounded-t-sm origin-bottom" style={{ animation: 'mini-bounce 0.8s ease-in-out infinite alternate 0.5s' }}></div>
                      <div className="w-0.5 bg-primary rounded-t-sm origin-bottom" style={{ animation: 'mini-bounce 0.8s ease-in-out infinite alternate 0.2s' }}></div>
                    </div>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="font-display text-[17px] leading-[22px] tracking-[-0.01em] font-bold text-on-surface pb-2 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className="font-sans text-[12px] leading-[20px] tracking-[0em] font-normal text-secondary mb-5 flex-grow">
                  {item.desc}
                </p>
                
                {/* Status Indicator */}
                <div className="pt-3 border-t border-surface-container-highest/50 font-display text-[9px] leading-[14px] tracking-[0.15em] font-bold text-secondary uppercase flex items-center justify-between group-hover:border-primary/20 transition-colors duration-500 mt-auto">
                  <div className="flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                    {/* Status Dot with Idle Pulse */}
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary/40 group-hover:bg-primary/50 opacity-75 duration-1000"></span>
                      <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-secondary group-hover:bg-primary group-hover:shadow-[0_0_8px_var(--color-primary)] transition-all duration-300"></span>
                    </span>
                    {item.stat}
                  </div>
                  {/* Arrow appearing on hover */}
                  <span className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 text-primary transition-all duration-500 font-sans text-[12px]">
                    →
                  </span>
                </div>

              </div>
            </div>
          </div>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}
