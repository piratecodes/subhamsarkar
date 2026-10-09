"use client";
import { useState, useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';

const phaseData = [
  {
    id: 1,
    name: "01 Discovery",
    badge: "PHASE 1 OF 5",
    headline: "Understanding What's Really Going On",
    narrative: "Before anything is built, we map out exactly how your current systems work, where things are breaking down, and what's actually at risk. No assumptions — just a clear, honest picture of where you stand.",
    bullets: [
      "Review of your current systems and workflows",
      "Identifying what's actually causing problems, not just symptoms",
      "A clear list of risks and priorities before any work begins"
    ],
    deliverable: "A clear breakdown of the problem",
    involvement: "1–2 short conversations",
    outcome: "A shared understanding before any commitment"
  },
  {
    id: 2,
    name: "02 Planning",
    badge: "PHASE 2 OF 5",
    headline: "Planning Before Building",
    narrative: "We design how the system will actually work — how data flows, how it connects to what you already use, and how it'll hold up as your business grows — before a single line of code is written.",
    bullets: [
      "A clear plan for how the system will be structured",
      "Decisions made upfront, not discovered mid-project",
      "Your sign-off before development begins"
    ],
    deliverable: "A full plan you can review and approve",
    involvement: "One review conversation",
    outcome: "No surprises once building starts"
  },
  {
    id: 3,
    name: "03 Building",
    badge: "PHASE 3 OF 5",
    headline: "Building the Core System",
    narrative: "This is where the actual system gets built — piece by piece, tested as we go, so issues get caught early rather than discovered later.",
    bullets: [
      "Regular check-ins so you see real progress, not silence",
      "Testing happens throughout, not just at the end",
      "Milestone-based delivery, so payment matches visible work"
    ],
    deliverable: "A working system, built in stages",
    involvement: "Periodic check-ins",
    outcome: "Visible progress you can actually see"
  },
  {
    id: 4,
    name: "04 Testing & Migration",
    badge: "PHASE 4 OF 5",
    headline: "Testing and Safely Moving Over",
    narrative: "If this involves replacing or connecting to an existing system, this is where we make sure nothing breaks in the process — old and new run side by side until everything is verified.",
    bullets: [
      "Old and new systems tested in parallel before any switch",
      "Every piece of data checked and verified",
      "A safe, gradual transition — not a risky all-at-once switch"
    ],
    deliverable: "A fully tested, verified system",
    involvement: "Final review and approval",
    outcome: "Confidence before going live"
  },
  {
    id: 5,
    name: "05 Handover",
    badge: "PHASE 5 OF 5",
    headline: "Full Handover, Fully Yours",
    narrative: "Once everything is live and stable, you receive complete ownership — the code, the documentation, and a proper walkthrough — so your system never depends on any one person to keep running.",
    bullets: [
      "Full source code and documentation handed over",
      "A walkthrough so you understand how everything works",
      "Ongoing support available afterward, if you want it — never required"
    ],
    deliverable: "Complete ownership, on completion",
    involvement: "One final walkthrough session",
    outcome: "A system that's fully yours"
  }
];

export default function ProcessWorkflow() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const DURATION_PER_SLIDE = 8000; // 8 seconds per slide
  const TOTAL_SLIDES = phaseData.length;
  
  const lastUpdateRef = useRef(Date.now());
  const progressRef = useRef(0);
  
  // Refs for direct DOM manipulation to achieve buttery 60fps
  const progressLineRef = useRef(null);
  const glowHeadRef = useRef(null);
  const trackRef = useRef(null);
  const timelineScrollRef = useRef(null);
  
  // Splide Ref for programmatic navigation
  const splideRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    lastUpdateRef.current = Date.now();

    const tick = () => {
      const now = Date.now();
      const delta = now - lastUpdateRef.current;
      lastUpdateRef.current = now;

      // Pause timer on hover, while user is physically dragging the slide, or scrubbing the timeline
      if (!isHovered && !isDragging && !isScrubbing) {
        progressRef.current += (delta / DURATION_PER_SLIDE) * 100;
        
        if (progressRef.current >= 100) {
          progressRef.current = 0;
          // Auto-slide to the next phase via Splide API
          if (splideRef.current && splideRef.current.splide) {
             const nextIndex = (selectedIndex + 1) % TOTAL_SLIDES;
             splideRef.current.splide.go(nextIndex);
          }
        }
        
        // Direct DOM update for absolute smoothness without triggering React re-renders
        if (progressLineRef.current && glowHeadRef.current) {
          const currentPercentage = (selectedIndex * 20) + (progressRef.current * 0.2);
          progressLineRef.current.style.width = `${currentPercentage}%`;
          glowHeadRef.current.style.left = `calc(${currentPercentage}% - 10px)`;
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging, isScrubbing, DURATION_PER_SLIDE, TOTAL_SLIDES, selectedIndex]);

  // Smoothly pan the timeline on mobile when the active phase changes
  useEffect(() => {
    if (timelineScrollRef.current && window.innerWidth < 1024) {
      const maxScroll = timelineScrollRef.current.scrollWidth - timelineScrollRef.current.clientWidth;
      if (maxScroll > 0) {
        const targetScroll = (selectedIndex / (TOTAL_SLIDES - 1)) * maxScroll;
        timelineScrollRef.current.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex, TOTAL_SLIDES]);

  // Timeline Scrubbing Logic
  const handlePointerDown = (e) => {
    setIsScrubbing(true);
    handlePointerMove(e);
  };

  const handlePointerMove = (e) => {
    if (!trackRef.current) return;
    if (!isScrubbing && e.type !== 'pointerdown') return;
    
    const rect = trackRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    
    const percentage = (x / rect.width) * 100;
    
    let newIndex = Math.floor(percentage / 20);
    if (newIndex >= TOTAL_SLIDES) newIndex = TOTAL_SLIDES - 1;
    
    const fractionalProgress = ((percentage % 20) / 20) * 100;
    
    setSelectedIndex(newIndex);
    progressRef.current = fractionalProgress;
    
    if (progressLineRef.current && glowHeadRef.current) {
      progressLineRef.current.style.width = `${percentage}%`;
      glowHeadRef.current.style.left = `calc(${percentage}% - 10px)`;
    }
    
    if (splideRef.current && splideRef.current.splide) {
      if (splideRef.current.splide.index !== newIndex) {
        splideRef.current.splide.go(newIndex);
      }
    }
  };

  useEffect(() => {
    if (isScrubbing) {
      const handleMove = (e) => handlePointerMove(e);
      const handleUp = () => setIsScrubbing(false);
      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleUp);
      return () => {
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', handleUp);
      };
    }
  }, [isScrubbing]);

  const handleTabClick = (index) => {
    // Jump to the slide if a top navigation tab is clicked
    if (splideRef.current && splideRef.current.splide) {
       splideRef.current.splide.go(index);
    }
  };

  const onSplideMove = (splide, newIndex) => {
    setSelectedIndex(newIndex);
    progressRef.current = 0;
    if (progressLineRef.current && glowHeadRef.current) {
      const currentPercentage = newIndex * 20;
      progressLineRef.current.style.width = `${currentPercentage}%`;
      glowHeadRef.current.style.left = `calc(${currentPercentage}% - 10px)`;
    }
  };

  // Splide Slider Configuration
  const splideOptions = {
    type: 'slide',
    perPage: 1,
    arrows: false,
    pagination: false,
    drag: true,
    speed: 1000,
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    gap: '2rem',
  };

  return (
    <section className="w-full bg-surface/25 py-24 relative overflow-hidden" id="process-workflow">
      
      {/* CSS Animation Definitions */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress-shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-progress-shimmer {
          animation: progress-shimmer 2s infinite linear;
        }
        @keyframes card-sheen {
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-card-sheen {
          animation: card-sheen 6s infinite ease-in-out;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .splide__track {
          overflow: visible !important;
        }
      `}} />

      <div className="w-full container px-4 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-6xl mx-auto mb-14 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_var(--color-primary)]"></span>
            <span className="font-display text-[12px] leading-4 tracking-[0.15em] font-bold uppercase tracking-widest text-primary">
              HOW WE WORK
            </span>
          </div>
          <h2 className="font-display text-[36px] lg:text-[48px] leading-[1.15] tracking-[-0.02em] font-bold text-on-surface max-w-4xl">
            A Clear, Proven Process for Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Custom Software</span> That Lasts
          </h2>
          <p className="font-sans text-[16px] lg:text-[18px] leading-relaxed tracking-[-0.005em] font-medium text-secondary max-w-6xl">
            Every ERP, CRM, or custom software project follows the same five-phase process - from understanding your business and planning the right architecture, to building, testing, and a full handover once everything is live. No fixed timelines, because no two businesses - or their systems - are the same. What stays constant is how the work gets done: clearly, in stages, with you informed at every step.
          </p>
        </div>

        {/* Interactive Workspace (Hover to Pause) */}
        <div 
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
          className="relative"
        >
            
          {/* Tab Navigation / Progress Container with Light Glass Background */}
          <div 
            ref={timelineScrollRef}
            className="relative mb-6 bg-surface-container-lowest/50 backdrop-blur-2xl border border-surface-container-highest/60 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-20 overflow-x-auto hide-scrollbar touch-pan-x"
          >
            
            <div className="min-w-[700px] lg:min-w-full p-5 lg:p-7">
              {/* The Draggable Interactive Track */}
            <div 
              ref={trackRef}
              onPointerDown={handlePointerDown}
              className="relative w-full h-8 mb-5 flex items-center cursor-pointer group/track touch-none"
            >
              {/* Background Thick Track */}
              <div className="absolute left-0 w-full h-2.5 bg-surface-container-highest/80 rounded-full overflow-hidden transition-all duration-300 group-hover/track:h-3.5 shadow-inner">
                <div 
                  ref={progressLineRef}
                  className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary relative overflow-hidden shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.9)]"
                  style={{ width: '0%' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-progress-shimmer"></div>
                </div>
              </div>
              
              {/* Nodes overlay */}
              <div className="absolute left-0 w-full flex pointer-events-none">
                {phaseData.map((_, i) => (
                  <div key={i} className="flex-1 relative">
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[4px] bg-surface transition-all duration-500 z-10 ${i <= selectedIndex ? 'border-primary shadow-[0_0_10px_var(--color-primary)]' : 'border-surface-container-highest'}`}>
                       {i === selectedIndex && <div className="absolute inset-0 w-full h-full rounded-full bg-primary/40 animate-ping"></div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Glowing Leading Edge */}
              <div 
                ref={glowHeadRef}
                className="absolute w-6 h-6 bg-surface rounded-full border-[4px] border-primary shadow-[0_0_25px_var(--color-primary)] z-20 pointer-events-none flex items-center justify-center transition-transform duration-300 group-hover/track:scale-[1.2]"
                style={{ left: '-12px' }}
              >
                 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Labels */}
            <div className="flex w-full mt-2">
              {phaseData.map((phase, i) => (
                <button 
                  key={phase.id} 
                  onClick={() => handleTabClick(i)}
                  className="flex-1 text-left group focus:outline-none cursor-pointer pr-4"
                >
                  <div className={`font-display text-[11px] lg:text-[13px] font-bold tracking-[0.1em] uppercase transition-all duration-300 flex flex-col gap-1.5 ${i === selectedIndex ? 'text-primary' : i < selectedIndex ? 'text-on-surface' : 'text-secondary group-hover:text-on-surface-variant'}`}>
                    <span className={`text-[10px] tracking-[0.2em] font-black ${i === selectedIndex ? 'opacity-100' : 'opacity-50'}`}>
                      PHASE 0{i + 1}
                    </span>
                    <span className="leading-tight">{phase.name.replace(`0${i+1} `, '')}</span>
                  </div>
                </button>
              ))}
            </div>
            </div>
          </div>

          {/* Actual Sliding Carousel Canvas with Splide */}
          <div className="w-full relative z-10">
            <Splide
              ref={splideRef}
              options={splideOptions}
              onMove={onSplideMove}
              onDrag={() => setIsDragging(true)}
              onDragged={() => setIsDragging(false)}
              className="!pb-8"
            >
              {phaseData.map((data, idx) => (
                <SplideSlide key={data.id}>
                  <div className={`transition-all duration-1000 ease-out h-full ${idx === selectedIndex ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.98] blur-[2px]'}`}>
                    <div className="bg-surface-container-lowest/90 backdrop-blur-3xl rounded-3xl p-8 lg:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.2)] border border-surface-container-highest/80 group/card relative overflow-hidden h-full cursor-grab active:cursor-grabbing">
                      
                      {/* Background creative accent */}
                      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_70%)] opacity-[0.03] blur-3xl rounded-full pointer-events-none"></div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10 pointer-events-none">
                        
                        {/* Left: Narrative & Bullets */}
                        <div className="lg:col-span-7 space-y-8">
                          
                          {/* Heading Block cascades in */}
                          <div className={`transition-all duration-700 ease-out ${idx === selectedIndex ? 'opacity-100 translate-y-0 delay-[200ms]' : 'opacity-0 translate-y-8'}`}>
                            <span className="font-display text-[11px] leading-4 tracking-[0.15em] font-bold text-primary uppercase bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 mb-6 inline-block">
                              {data.badge}
                            </span>
                            <h3 className="font-display text-[32px] lg:text-[40px] leading-[1.15] tracking-[-0.02em] font-bold text-on-surface mb-6">
                              {data.headline}
                            </h3>
                            <p className="font-sans text-[16px] lg:text-[18px] leading-relaxed tracking-[-0.005em] font-normal text-secondary">
                              {data.narrative}
                            </p>
                          </div>
                          
                          <ul className="space-y-4">
                            {data.bullets.map((bullet, i) => (
                              <li 
                                key={i} 
                                className={`flex items-start gap-3 transition-all duration-700 ease-out ${idx === selectedIndex ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                                style={{ transitionDelay: `${300 + (i * 100)}ms` }}
                              >
                                <div className="mt-1 bg-primary/10 p-0.5 rounded-full flex-shrink-0 border border-primary/20">
                                  <CheckCircle className="w-4 h-4 text-primary" />
                                </div>
                                <span className="font-sans text-[15px] leading-relaxed text-on-surface font-medium">
                                  {bullet}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Right: Modern Floating Glass Panel cascades in */}
                        <div className={`lg:col-span-5 w-full mt-6 lg:mt-0 lg:pl-4 h-full transition-all duration-1000 ease-out ${idx === selectedIndex ? 'opacity-100 translate-y-0 delay-[500ms]' : 'opacity-0 translate-y-12'}`}>
                          <div className="bg-surface-container/60 backdrop-blur-xl border border-surface-container-highest/80 rounded-[1.5rem] p-8 lg:p-10 relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-500 h-full">
                             
                             {/* Card Sheen Effect */}
                             <div className="absolute top-0 bottom-0 left-0 w-[50%] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] skew-x-[-15deg] pointer-events-none animate-card-sheen"></div>

                             {/* Corner accent glow */}
                             <div className="absolute top-[-20%] right-[-20%] w-48 h-48 bg-primary/15 blur-[50px] rounded-full pointer-events-none"></div>
                             
                             <h4 className="font-display text-[12px] tracking-[0.15em] font-bold text-primary mb-8 flex items-center gap-2 uppercase">
                               <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]"></div>
                               What You Get
                             </h4>
                             
                             <div className="space-y-8">
                               <div>
                                 <span className="font-display text-[10px] tracking-[0.12em] font-bold uppercase text-secondary block mb-1">DELIVERABLE</span>
                                 <span className="font-sans text-[16px] lg:text-[17px] font-semibold text-on-surface block leading-tight">{data.deliverable}</span>
                               </div>
                               <div>
                                 <span className="font-display text-[10px] tracking-[0.12em] font-bold uppercase text-secondary block mb-1">YOUR INVOLVEMENT</span>
                                 <span className="font-sans text-[16px] lg:text-[17px] font-semibold text-on-surface block leading-tight">{data.involvement}</span>
                               </div>
                               <div>
                                 <span className="font-display text-[10px] tracking-[0.12em] font-bold uppercase text-secondary block mb-1">OUTCOME</span>
                                 <span className="font-sans text-[16px] lg:text-[17px] font-semibold text-primary block leading-tight">{data.outcome}</span>
                               </div>
                             </div>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </SplideSlide>
              ))}
            </Splide>          </div>
        </div>
        
      </div>
    </section>
  );
}
