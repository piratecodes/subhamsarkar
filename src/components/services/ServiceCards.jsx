import { CheckCircle } from "lucide-react";
import { services } from "@/data/services";

export default function ServiceCards() {

  return (
    <section className="w-full bg-surface-container-low/75 py-16">
      <div className="w-full container px-4 lg:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase tracking-widest text-primary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              DEPLOYABLE BLUEPRINTS // SECTION 02
            </span>
            <h2 className="font-display text-[36px] lg:text-[44px] leading-[44px] lg:leading-[52px] tracking-[-0.02em] font-bold tracking-tight text-on-surface mt-2 text-balance">
              Engineered Architectural Disciplines
            </h2>
          </div>
          <p className="font-sans text-[14px] leading-[22px] tracking-[0em] font-medium text-secondary max-w-sm">
            Inspect full architectural boundaries, inclusions, target profiles, and real-world failure mitigation strategies for each tier.
          </p>
        </div>
        
        <div className="space-y-8">
          {services.map((svc, i) => (
            <div key={i} className="group relative bg-surface-container-lowest/90 rounded-2xl p-6 lg:p-10 shadow-sm border border-outline/10 transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/40 overflow-hidden">
              
              {/* Blueprint Crosshairs (Corners) */}
              <div className="absolute top-4 left-4 w-3 h-3 text-primary/10 group-hover:text-primary/50 transition-colors duration-700 pointer-events-none"><svg viewBox="0 0 12 12" className="stroke-current" strokeWidth="1"><path d="M6 0v12M0 6h12"/></svg></div>
              <div className="absolute top-4 right-4 w-3 h-3 text-primary/10 group-hover:text-primary/50 transition-colors duration-700 pointer-events-none"><svg viewBox="0 0 12 12" className="stroke-current" strokeWidth="1"><path d="M6 0v12M0 6h12"/></svg></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 text-primary/10 group-hover:text-primary/50 transition-colors duration-700 pointer-events-none"><svg viewBox="0 0 12 12" className="stroke-current" strokeWidth="1"><path d="M6 0v12M0 6h12"/></svg></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 text-primary/10 group-hover:text-primary/50 transition-colors duration-700 pointer-events-none"><svg viewBox="0 0 12 12" className="stroke-current" strokeWidth="1"><path d="M6 0v12M0 6h12"/></svg></div>

              {/* Subtle Blueprint Grid Overlay (Reveals on Hover) */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700 pointer-events-none z-0" 
                style={{ 
                  backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)", 
                  backgroundSize: "32px 32px" 
                }}
              ></div>
              
              {/* Ambient Glow */}
              <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0"></div>

              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-5 text-secondary font-display text-[11px] leading-4 tracking-[0.12em] font-semibold border-b border-surface-container-highest">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-md font-bold shadow-sm ${svc.specType}`}>{svc.spec}</span>
                  <span className="text-on-surface font-semibold tracking-widest uppercase">{svc.title}</span>
                </div>
                <div className="flex items-center gap-1 font-display text-[12px] leading-4 tracking-[0.04em] font-medium opacity-80">
                  <span>{svc.subtitle}</span>
                </div>
              </div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
                {/* Left Column: Icon & Description */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-surface-container border border-outline/10 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-on-primary group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ease-out">
                    <svc.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-display text-[26px] leading-[34px] tracking-[-0.01em] font-bold text-on-surface mt-2">
                      {svc.name}
                    </h3>
                    <p className="font-sans text-[15px] leading-[26px] tracking-[-0.005em] font-normal text-on-surface-variant mt-3 text-balance">
                      {svc.desc}
                    </p>
                  </div>
                  <div className="pt-4 p-5 bg-surface-container/30 rounded-xl border border-outline/5 border-l-2 border-l-secondary/30 relative overflow-hidden group-hover:border-l-primary/50 transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold text-secondary uppercase block mb-1 relative z-10">Engineered For</span>
                    <p className="font-sans text-[13px] leading-5 tracking-[0em] text-on-surface font-medium relative z-10">
                      {svc.for}
                    </p>
                  </div>
                </div>
                
                {/* Middle Column: Inclusions */}
                <div className="lg:col-span-4 bg-surface-container-low/50 p-6 rounded-2xl space-y-4 border border-outline/5 transition-colors duration-500 group-hover:bg-surface-container-low/80">
                  <span className="font-display text-[11px] leading-4 tracking-[0.12em] text-primary font-semibold uppercase tracking-wider block border-b border-surface-container-highest pb-3">
                    Deliverables &amp; Core Inclusions
                  </span>
                  <ul className="space-y-4 font-sans text-[14px] leading-[22px] tracking-[0em] font-normal text-on-surface pt-2">
                    {svc.includes.map((inc, j) => {
                      const [strongPart, restPart] = inc.split(': ');
                      return (
                        <li key={j} className="flex items-start gap-3 group/item">
                          <div className="relative mt-0.5 shrink-0">
                            <CheckCircle className="w-5 h-5 text-secondary/40 group-hover/item:text-primary transition-colors duration-300 relative z-10" />
                            <div className="absolute inset-0 bg-primary/20 blur-sm rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <span><strong className="text-on-surface group-hover/item:text-primary transition-colors duration-300">{strongPart}:</strong> <span className="text-secondary">{restPart}</span></span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                
                {/* Right Column: Telemetry/Query Block */}
                <div className="lg:col-span-4 flex flex-col justify-between bg-surface-container/50 border border-outline/10 p-6 rounded-2xl shadow-inner group-hover:border-primary/20 transition-colors duration-500 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary/20 group-hover:bg-primary transition-colors duration-500"></div>
                  
                  <div className="space-y-3 z-10 pl-2">
                    <span className="font-display text-[10px] leading-4 tracking-[0.12em] font-semibold text-secondary uppercase tracking-wider block bg-surface-container-highest/50 w-max px-2 py-0.5 rounded">
                      Field Query // Direct Assessment
                    </span>
                    <h4 className="font-display text-[18px] leading-6 tracking-[0em] font-bold text-on-surface pt-2">
                      {svc.query}
                    </h4>
                    <p className="font-sans text-[14px] leading-6 tracking-[0em] font-normal text-secondary pt-2">
                      <strong className="text-on-surface font-semibold">Architectural Verdict:</strong> {svc.verdict}
                    </p>
                  </div>
                  
                  <div className="pt-6 mt-4 border-t border-surface-container-highest flex items-center justify-between font-display text-[11px] leading-4 tracking-[0.12em] font-semibold text-secondary pl-2">
                    <span className="group-hover:text-primary/80 transition-colors duration-500">{svc.metric}</span>
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
