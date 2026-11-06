"use client";

import Link from "next/link";
import { ArrowRight, ShieldAlert, ArrowRightCircle, Activity, Sparkles } from "lucide-react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function CrmShowcase({ projects = [] }) {
  // Only render if there is real data assigned from the backend
  if (!projects || projects.length === 0) return null;

  return (
    <section id="featured-systems" className="relative border-b border-surface-container-highest py-20 lg:py-28 overflow-hidden">
      
      {/* Background Animated Ambience */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[130px] pointer-events-none z-0 animate-[floatAurora_22s_ease-in-out_infinite_alternate]"></div>
      <div className="absolute bottom-1/4 -left-20 w-[450px] h-[450px] bg-secondary-container/20 rounded-full blur-[120px] pointer-events-none z-0 animate-[floatAurora_26s_ease-in-out_infinite_alternate-reverse]"></div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 font-display text-[11px] leading-[16px] tracking-[0.12em] font-semibold text-primary uppercase">
              <Activity className="w-3.5 h-3.5" />
              <span>FEATURED CASE STUDIES</span>
              <span className="text-secondary font-display text-[12px] leading-[16px] tracking-[0.04em] font-medium">[PORTFOLIO-EXCERPTS]</span>
            </div>
            <h2 className="font-display text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.12] tracking-[-0.02em] font-bold text-on-surface text-balance">
              Custom CRM Platforms in Production.
            </h2>
            <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
              Architectural blueprints engineered by Subham Sarkar where lead capture, omnichannel communication, and CPQ quotation pipelines operate with maximum velocity.
            </p>
          </div>

          <Link 
            href="/work?category=crm" 
            className="inline-flex items-center gap-2 font-display text-[11px] leading-[16px] tracking-[0.12em] font-semibold uppercase tracking-widest text-primary hover:text-primary-container transition-colors shrink-0 group self-start md:self-end"
          >
            <span>View All CRM Work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-4 Dossier Cards Grid (Matching FeaturedWork) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((dossier, i) => {
            const pipeline = Array.isArray(dossier.pipeline) ? dossier.pipeline : (typeof dossier.pipeline === 'string' ? JSON.parse(dossier.pipeline || '[]') : []);
            const statsArray = Array.isArray(dossier.stats) ? dossier.stats : (typeof dossier.stats === 'string' ? JSON.parse(dossier.stats || '[]') : (dossier.stats && typeof dossier.stats === 'object' ? Object.entries(dossier.stats).map(([k, v]) => ({ label: k, value: String(v) })) : []));
            const imagesArray = Array.isArray(dossier.images) ? dossier.images : (typeof dossier.images === 'string' ? JSON.parse(dossier.images || '[]') : []);
            const allImages = [dossier.thumbnail, ...imagesArray].filter(Boolean);

            return (
              <div 
                key={dossier.id || i} 
                className="bg-surface-container-low/75 rounded-[32px] overflow-hidden shadow-lg border border-outline/10 flex flex-col group hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-500 transform hover:-translate-y-2 relative"
              >
                
                {/* Top Media Section (The Tablet Screen) */}
                <div className="relative w-full">
                  <Splide
                    options={{
                      type: 'fade',
                      rewind: true,
                      arrows: false,
                      pagination: true,
                      autoplay: true,
                      interval: 4000 + (i * 500),
                      pauseOnHover: true,
                    }}
                    className="w-full group-hover:opacity-90 transition-opacity"
                  >
                    {allImages.map((img, idx) => (
                      <SplideSlide key={idx}>
                        <img 
                          src={img.url || img} 
                          alt={`${dossier.title} view ${idx + 1}`} 
                          className="w-full aspect-[3/2] object-cover block" 
                        />
                      </SplideSlide>
                    ))}
                    {allImages.length === 0 && (
                      <SplideSlide>
                        <img 
                          src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                          alt={dossier.title} 
                          className="w-full aspect-[3/2] object-cover block" 
                        />
                      </SplideSlide>
                    )}
                  </Splide>

                  {/* Overlays Container */}
                  <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                    <div className="pointer-events-auto shrink-0 max-w-[65%]">
                      <span className="bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] text-on-surface shadow-lg border border-outline/10 inline-block truncate max-w-full">
                        {dossier.eyebrow || dossier.category || 'CRM PLATFORMS'}
                      </span>
                    </div>
                    
                    <div className="pointer-events-auto ml-auto shrink-0 max-w-full">
                      {dossier.associatedWith ? (
                        dossier.associatedWithLink ? (
                          <a 
                            href={dossier.associatedWithLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-primary/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] text-on-primary shadow-lg flex items-center gap-2 border border-primary-container hover:bg-primary transition-colors cursor-pointer truncate max-w-full"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0"></div>
                            <span className="truncate">{dossier.associatedWith}</span>
                          </a>
                        ) : (
                          <span className="bg-primary/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] text-on-primary shadow-lg flex items-center gap-2 border border-primary-container truncate max-w-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0"></div>
                            <span className="truncate">{dossier.associatedWith}</span>
                          </span>
                        )
                      ) : (
                        <span className="bg-error/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] text-white shadow-lg border border-error/50 flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5" /> NDA PROTECTED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Floating Stats Pill (Top 2 Key Stats) */}
                  {statsArray && statsArray.length > 0 && (
                    <div className="absolute bottom-3 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 bg-surface-container-lowest/50 backdrop-blur-xl px-3.5 py-1.5 rounded-xl border border-surface-container-highest/50 shadow-xl">
                      {statsArray.slice(0, 2).map((stat, sIdx) => (
                        <span key={sIdx} className={`font-display text-[9px] font-bold uppercase tracking-widest whitespace-nowrap ${sIdx === 1 ? 'text-primary' : 'text-secondary'}`}>
                          {stat.label}: {stat.value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Content Section */}
                <div className="p-5 flex flex-col flex-grow bg-surface">
                  
                  <div className="mb-3">
                    <h3 className="font-display text-[20px] leading-[26px] tracking-[-0.01em] font-black text-on-surface mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
                      {dossier.title}
                    </h3>
                    <p className="font-sans text-[13px] leading-[20px] font-normal text-secondary line-clamp-2">
                      {dossier.summary || dossier.bottleneck}
                    </p>
                  </div>

                  {/* Challenge, Approach & Outcome Block */}
                  <div className="mb-4 bg-surface-container/40 border border-outline/5 rounded-2xl p-3">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 flex flex-col gap-1.5">
                        <span className="text-[9px] font-black text-secondary uppercase tracking-[0.15em] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-error"></span> THE CHALLENGE
                        </span>
                        <p className="text-[11px] text-on-surface-variant font-medium leading-relaxed line-clamp-3">
                          {dossier.bottleneck || "Delayed lead response times and fragmented sales communications caused deal drop-offs and lost revenue."}
                        </p>
                      </div>
                      <div className="hidden md:block w-px bg-outline/10"></div>
                      <div className="md:hidden w-full h-px bg-outline/10"></div>
                      <div className="flex-1 flex flex-col gap-1.5">
                        <span className="text-[9px] font-black text-secondary uppercase tracking-[0.15em] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> THE APPROACH
                        </span>
                        <p className="text-[11px] text-on-surface-variant font-medium leading-relaxed line-clamp-3">
                          {dossier.approach || "Architected automated WhatsApp & email webhook ingestion with instant rule-based sales routing."}
                        </p>
                      </div>
                    </div>

                    {/* The Outcome Section */}
                    {dossier.outcome && (
                      <div className="mt-3 pt-3 border-t border-outline/10 flex flex-col gap-1.5">
                        <span className="text-[9px] font-black text-secondary uppercase tracking-[0.15em] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span> THE OUTCOME
                        </span>
                        <p className="text-[11px] text-on-surface font-medium leading-relaxed line-clamp-3">
                          {dossier.outcome}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Execution Pipeline */}
                  {pipeline && pipeline.length > 0 && (
                    <div className="mb-4 flex flex-col gap-1.5 justify-center mt-auto w-full overflow-hidden">
                      <span className="text-[9px] font-black text-secondary uppercase tracking-[0.15em] text-center mb-0.5">EXECUTION PIPELINE</span>
                      <div 
                        className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/40 cursor-grab active:cursor-grabbing focus:outline-none rounded-2xl"
                        tabIndex="0"
                        role="region"
                        aria-label="Execution Pipeline, use arrow keys or drag to scroll"
                        onMouseDown={(e) => {
                          const slider = e.currentTarget;
                          slider['isDown'] = true;
                          slider['startX'] = e.pageX - slider.offsetLeft;
                          slider['scrollLeftStart'] = slider.scrollLeft;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget['isDown'] = false;
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget['isDown'] = false;
                        }}
                        onMouseMove={(e) => {
                          const slider = e.currentTarget;
                          if (!slider['isDown']) return;
                          e.preventDefault();
                          const x = e.pageX - slider.offsetLeft;
                          const walk = (x - slider['startX']) * 1.5;
                          slider.scrollLeft = slider['scrollLeftStart'] - walk;
                        }}
                      >
                        {pipeline.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 shrink-0 max-w-[140px]">
                            <div className={`flex-1 text-center py-1.5 px-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest line-clamp-2 leading-[12px] flex items-center justify-center min-h-[36px] min-w-[100px] shadow-sm border ${
                              idx === 1 
                                ? 'bg-primary/10 text-primary border-primary/30' 
                                : 'bg-surface-container text-on-surface-variant border-outline/5'
                            }`}>
                              {typeof step === 'string' ? step : (step.text || step.bullet || step.label || "Step")}
                            </div>
                            {idx < pipeline.length - 1 && (
                              <ArrowRight className="w-4 h-4 text-outline/50 shrink-0 mx-0.5" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Footer Buttons */}
                <div className="mt-auto flex border-t border-outline/10 bg-surface-container-lowest">
                  <Link 
                    href={`/work?ref=featured&project=${encodeURIComponent(dossier.ref)}`} 
                    scroll={false}
                    className="flex-1 p-4 flex items-center justify-center border-r border-outline/10 hover:bg-surface-container group/btn1 transition-colors"
                  >
                    <span className="font-display text-[10px] font-black uppercase tracking-[0.15em] text-secondary group-hover/btn1:text-on-surface transition-colors">
                      View Context
                    </span>
                  </Link>
                  <Link 
                    href={`/work?ref=featured&project=${encodeURIComponent(dossier.ref)}&view=blueprint`} 
                    scroll={false}
                    className="flex-[1.2] p-4 flex items-center justify-center gap-2 hover:bg-primary group/btn2 transition-colors"
                  >
                    <span className="font-display text-[10px] font-black uppercase tracking-[0.15em] text-primary group-hover/btn2:text-on-primary transition-colors">
                      Deep Blueprint
                    </span>
                    <ArrowRightCircle className="w-4 h-4 text-primary group-hover/btn2:text-on-primary transition-colors transform group-hover/btn2:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Category Work Callout Banner */}
        <div className="mt-14 p-6 lg:p-8 rounded-[28px] bg-surface-container-low/80 backdrop-blur-sm border border-surface-container-highest flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm hover:border-primary/30 transition-all duration-500">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-primary font-display text-[11px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXPANDED BLUEPRINT REPOSITORY</span>
            </div>
            <h4 className="font-display text-[18px] sm:text-[20px] font-bold text-on-surface">
              Explore All Custom CRM Architectures
            </h4>
            <p className="font-sans text-[13.5px] text-secondary">
              Filter case studies by omnichannel messaging, deal pipeline automation, and multi-team permission hierarchies.
            </p>
          </div>

          <Link
            href="/work?category=crm"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-display text-[11.5px] leading-4 tracking-widest uppercase font-bold px-6 py-4 rounded-xl transition-all duration-300 shrink-0 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <span>Explore All CRM Work</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .splide__pagination { bottom: 3.5rem !important; z-index: 10 !important; }
        .splide__pagination__page { background: rgba(255,255,255,0.4) !important; border-radius: 99px !important; width: 6px !important; height: 6px !important; margin: 0 4px !important; transition: all 0.3s ease !important; }
        .splide__pagination__page.is-active { background: var(--color-primary) !important; width: 20px !important; box-shadow: 0 0 10px rgba(var(--color-primary-rgb), 0.5) !important; }
      `}} />
    </section>
  );
}
