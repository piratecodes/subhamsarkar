import { CheckCircle2 } from "lucide-react";

export default function TopologyDiagram() {
  const nodes = [
    {
      label: "WHERE YOU WORK",
      title: "Web & Mobile",
      subtitle: "Works Offline Too",
      highlight: true
    },
    {
      label: "SECURITY CHECKPOINT",
      title: "Traffic Filtering",
      subtitle: "Fast, Protected Entry",
      highlight: false
    },
    {
      label: "THE CORE SYSTEM",
      title: "Your ERP / CRM",
      subtitle: "Where Business Logic Lives",
      highlight: true,
      isCore: true
    },
    {
      label: "YOUR DATA",
      title: "Secure Storage",
      subtitle: "Accurate & Backed Up",
      highlight: false
    },
    {
      label: "AI LAYER (OPTIONAL)",
      title: "Private & Isolated",
      subtitle: "Your Data Stays In-House",
      highlight: true
    }
  ];

  return (
    <section className="w-full container px-4 lg:px-12 py-10 bg-surface/50">
      <style>{`
        @keyframes dataPacketFlow {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(300%); opacity: 0; }
        }
        @keyframes floatNode {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-data-packet {
          animation: dataPacketFlow 2s linear infinite;
        }
        .animate-float-node {
          animation: floatNode 4s ease-in-out infinite;
        }
      `}</style>
      
      <div className="bg-surface-container-high/75 rounded-2xl p-6 lg:p-10 relative shadow-sm border border-outline/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-surface-container-highest gap-4">
          <div>
            <span className="font-display text-[11px] leading-4 tracking-[0.12em] text-primary uppercase tracking-widest font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              HOW A TYPICAL SYSTEM IS STRUCTURED
            </span>
            <h3 className="font-display text-[24px] lg:text-[28px] leading-[32px] lg:leading-[36px] tracking-[-0.01em] font-bold text-on-surface mt-2 text-balance">
              Built in Layers, So Nothing Depends on Everything Else
            </h3>
          </div>
          <div className="font-display text-[12px] leading-4 tracking-[0.04em] font-medium text-secondary bg-surface-container/75 px-4 py-2 rounded-lg border border-outline/10 whitespace-nowrap">
            DESIGNED FOR RELIABILITY & PRIVACY
          </div>
        </div>

        {/* CSS-based Flexible & Animated Topology Diagram */}
        <div className="w-full py-12 overflow-x-auto hide-scrollbar">
          <div className="flex items-center min-w-max px-4 py-8">
            {nodes.map((node, idx) => (
              <div key={idx} className="flex items-center">
                
                {/* Node Box with Float Animation */}
                <div 
                  className="animate-float-node"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <div className={`relative flex flex-col items-center text-center p-6 rounded-xl border transition-all duration-300 min-w-[170px] max-w-[240px] flex-shrink-0 group ${
                    node.isCore 
                      ? "bg-surface-container-lowest border-primary/50 shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.15)] scale-105 z-10" 
                      : "bg-surface/50 backdrop-blur-sm border-outline/20 hover:border-outline/40 hover:bg-surface"
                  }`}>
                    
                    {/* Core Ambient Glow */}
                    {node.isCore && (
                      <div className="absolute inset-0 rounded-xl bg-primary/10 animate-pulse blur-md -z-10 pointer-events-none"></div>
                    )}

                    {/* Subtle Top Glow on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div>

                    <span className={`font-display text-[10px] leading-[14px] uppercase font-bold tracking-[0.12em] mb-3 ${
                      node.highlight ? "text-primary" : "text-secondary"
                    }`}>
                      {node.label}
                    </span>
                    <span className={`font-display text-[15px] leading-[22px] tracking-[-0.01em] font-bold mb-1 ${
                      node.isCore ? "text-on-surface text-[17px]" : "text-on-surface/90"
                    }`}>
                      {node.title}
                    </span>
                    <span className="font-display text-[11px] leading-[16px] tracking-[0.04em] text-secondary">
                      {node.subtitle}
                    </span>
                    
                    {/* Core Node Ping Indicator */}
                    {node.isCore && (
                      <div className="absolute -bottom-2 w-4 h-4 rounded-full border-[3px] border-surface-container-lowest bg-primary flex items-center justify-center shadow-sm">
                        <div className="absolute w-full h-full rounded-full bg-primary animate-ping opacity-75"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Flowing Data Connector */}
                {idx < nodes.length - 1 && (
                  <div className="flex items-center justify-center w-12 md:w-20 relative overflow-hidden h-8 -mx-1">
                    {/* Base Track */}
                    <div className="w-full border-t-[1.5px] border-dashed border-secondary/40 absolute top-1/2 -translate-y-1/2"></div>
                    {/* Flowing Packet */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-data-packet"
                      style={{ animationDelay: `${idx * 0.4}s` }}
                    ></div>
                  </div>
                )}
                
                {/* End Status Indicator */}
                {idx === nodes.length - 1 && (
                  <div className="flex items-center justify-center w-16 text-primary ml-2 pl-4 relative">
                    <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full"></div>
                    <CheckCircle2 className="w-8 h-8 opacity-90 relative z-10" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between text-secondary font-display text-[11px] leading-5 tracking-[0.08em] uppercase font-semibold pt-6 border-t border-surface-container-highest gap-4">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary/50"></span>
            DESIGN PRINCIPLE: EACH LAYER IS INDEPENDENT — ONE ISSUE DOESN'T BRING DOWN THE REST
          </span>
          <span className="flex items-center gap-2">
            BUILT AND TESTED BEFORE HANDOVER
            <span className="w-1.5 h-1.5 rounded-full bg-secondary/50"></span>
          </span>
        </div>
      </div>
    </section>
  );
}