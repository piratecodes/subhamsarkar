import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, BookOpen, Compass, CircleCheck, ShieldCheck } from 'lucide-react'

import img1 from "@/assets/myimage_web.png"

export default function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden bg-transparent">
      
      {/* Breathtaking Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_60%)] opacity-[0.20] blur-[100px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[90vw] h-[90vw] max-w-[1200px] max-h-[1200px] bg-[radial-gradient(circle,var(--color-secondary)_0%,transparent_60%)] opacity-[0.15] blur-[120px]" style={{ animation: 'pulse-slow-glow 10s ease-in-out infinite 3s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[50vw] bg-[radial-gradient(ellipse,var(--color-primary-container)_0%,transparent_70%)] opacity-[0.10] blur-[150px] -rotate-[30deg]"></div>
        
        {/* Deep tech grid overlay */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "linear-gradient(color-mix(in srgb, var(--color-primary) 30%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 30%, transparent) 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(ellipse at center, black 0%, transparent 80%)" }}></div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-slow-glow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
        .animate-pulse-glow {
          animation: pulse-slow-glow 8s ease-in-out infinite;
        }

        @keyframes data-stream-horizontal {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-data-horizontal {
          animation: data-stream-horizontal 6s linear infinite;
        }
        
        @keyframes rotate-slow {
          100% { transform: rotate(360deg); }
        }
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
        
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 5s linear infinite;
        }
        
        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
        }
      `}} />

      <section className="relative z-10 w-full container px-4 sm:px-6 lg:px-12 py-6 lg:py-8 min-h-[calc(100vh-100px)] flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          
          {/* Left Column: Architectural Thesis */}
          <div className="lg:col-span-7 flex flex-col space-y-4 relative z-20">
            
            {/* Eyebrow & Status Flag */}
            <div className="flex flex-wrap items-center gap-3 font-display text-[10px] leading-[16px] tracking-[0.15em] font-bold text-secondary uppercase relative">
              {/* Floating particles around eyebrow */}
              <div className="absolute -top-4 -left-4 w-1.5 h-1.5 bg-primary rounded-full blur-[1px]" style={{ animation: 'float-up 4s ease-in infinite' }}></div>
              <div className="absolute top-8 left-1/4 w-1 h-1 bg-secondary rounded-full blur-[1px]" style={{ animation: 'float-up 5s ease-in infinite 2s' }}></div>
              
              <span className="relative inline-flex items-center gap-2 px-3 py-1.5 bg-surface-container-highest/30 backdrop-blur-md text-primary rounded-full shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.15)] group overflow-hidden border border-primary/20">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full animate-data-horizontal"></span>
                <span className="relative z-10 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)] animate-pulse"></span>
                <span className="relative z-10 font-bold tracking-widest text-on-surface">Software Architecture & Custom ERP / CRM Development</span>
              </span>
            </div>

            {/* Headline with continuous gradient shimmer */}
            <h1 className="font-display text-[36px] leading-[1.05] tracking-[-0.03em] font-black lg:text-[56px] drop-shadow-lg text-balance relative text-on-surface">
              Building The Backbone Behind{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary),var(--color-primary))] bg-[length:200%_auto] animate-gradient-x drop-shadow-md">
                Every Unstoppable Business
                {/* Glowing animated underline */}
                <span className="absolute -bottom-1 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 rounded-full blur-[2px] animate-pulse"></span>
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80"></span>
              </span>
            </h1>

            {/* Tagline Pill (Hyper-Decorated) */}
            <div className="inline-flex items-center self-start gap-3 px-4 py-2 bg-surface-container-highest/40 backdrop-blur-xl border border-surface-container-highest/50 text-on-surface rounded-r-2xl rounded-l-md shadow-lg relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_15px_var(--color-primary)]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[gradient-x_4s_linear_infinite] pointer-events-none"></div>
              <span className="font-display text-[10px] leading-[16px] tracking-[0.15em] font-black uppercase text-secondary group-hover:text-primary transition-colors duration-300">A Decade in the Making. 20+ Businesses Running On It.</span>
            </div>

            {/* Narrative Copy with Traveling Border */}
            <div className="relative p-5 lg:p-6 rounded-2xl overflow-hidden group">
              {/* Traveling Glowing Border Line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent -translate-x-full animate-data-horizontal opacity-70"></div>
              <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-secondary to-transparent translate-x-full animate-data-horizontal opacity-70" style={{ animationDelay: '3s' }}></div>
              <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent -translate-y-full animate-data-horizontal opacity-50" style={{ animationDuration: '4s' }}></div>
              
              <div className="absolute inset-0 bg-surface-container-lowest/40 backdrop-blur-lg rounded-2xl border border-surface-container/40 z-0"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,color-mix(in_srgb,var(--color-primary)_10%,transparent),transparent_50%)] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <p className="relative z-10 font-sans text-[16px] lg:text-[18px] leading-[28px] tracking-[-0.01em] font-medium text-secondary max-w-3xl text-justify">
                As a software architect, I build the systems that businesses run on - custom ERP and CRM platforms, connected websites and apps, and the everyday infrastructure your team depends on. For over a decade, businesses have trusted me to build software that actually works, so they can spend less time managing systems and more time running their business.
              </p>
            </div>

            {/* Structural Metrics Micro-Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 font-display text-[11px] leading-[16px] tracking-[0.04em] font-medium">
              
              <div className="group relative p-5 bg-surface-container-lowest/60 backdrop-blur-2xl rounded-2xl border border-surface-container-highest shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:border-primary/60 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden cursor-default">
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full opacity-50 group-hover:animate-ping"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,color-mix(in_srgb,var(--color-primary)_15%,transparent),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute -inset-[100%] bg-[linear-gradient(transparent_40%,rgba(255,255,255,0.1)_50%,transparent_60%)] -rotate-45 group-hover:animate-data-horizontal z-0"></div>
                <div className="relative z-10 flex flex-col">
                  <span className="text-secondary font-black tracking-[0.2em] text-[9px] uppercase">SYSTEM RELIABILITY</span>
                  <span className="font-display text-[24px] leading-tight tracking-tight font-black text-on-surface mt-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-on-surface transition-all duration-300">99.9%</span>
                  <span className="text-[9px] text-tertiary mt-1 font-bold tracking-[0.1em] uppercase">ZERO UNPLANNED DOWNTIME</span>
                </div>
              </div>
              
              <div className="group relative p-5 bg-surface-container-lowest/60 backdrop-blur-2xl rounded-2xl border border-surface-container-highest shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:border-primary/60 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden cursor-default">
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full opacity-50 group-hover:animate-ping"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,color-mix(in_srgb,var(--color-secondary)_15%,transparent),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute -inset-[100%] bg-[linear-gradient(transparent_40%,rgba(255,255,255,0.1)_50%,transparent_60%)] -rotate-45 group-hover:animate-data-horizontal z-0" style={{ animationDelay: '0.2s' }}></div>
                <div className="relative z-10 flex flex-col">
                  <span className="text-secondary font-black tracking-[0.2em] text-[9px] uppercase">RESPONSE TIME</span>
                  <span className="font-display text-[24px] leading-tight tracking-tight font-black text-on-surface mt-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-on-surface transition-all duration-300">&lt; 12 HRS</span>
                  <span className="text-[9px] text-tertiary mt-1 font-bold tracking-[0.1em] uppercase">DIRECT, NO DELAYS</span>
                </div>
              </div>

              <div className="group relative p-5 bg-surface-container-lowest/60 backdrop-blur-2xl rounded-2xl border border-surface-container-highest shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:border-primary/60 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden cursor-default">
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full opacity-50 group-hover:animate-ping"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,color-mix(in_srgb,var(--color-primary-container)_15%,transparent),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute -inset-[100%] bg-[linear-gradient(transparent_40%,rgba(255,255,255,0.1)_50%,transparent_60%)] -rotate-45 group-hover:animate-data-horizontal z-0" style={{ animationDelay: '0.4s' }}></div>
                <div className="relative z-10 flex flex-col">
                  <span className="text-secondary font-black tracking-[0.2em] text-[9px] uppercase">CONFIDENTIALITY</span>
                  <span className="font-display text-[24px] leading-tight tracking-tight font-black text-on-surface mt-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-on-surface transition-all duration-300">NDA</span>
                  <span className="text-[9px] text-tertiary mt-1 font-bold tracking-[0.1em] uppercase">ON EVERY ENGAGEMENT</span>
                </div>
              </div>
            </div>

            {/* Hero Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              {/* Primary Button */}
              <Link href="/contact" className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-on-primary font-display text-[11px] leading-[16px] tracking-[0.15em] font-bold uppercase rounded-xl shadow-[0_10px_30px_rgba(var(--color-primary-rgb),0.3)] hover:shadow-[0_15px_40px_rgba(var(--color-primary-rgb),0.6)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* Animated multi-color inner glow that activates on hover */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,var(--color-primary),var(--color-secondary),var(--color-primary))] opacity-0 group-hover:opacity-100 bg-[length:200%_200%] group-hover:animate-gradient-x transition-opacity duration-300 z-0"></div>
                {/* Quick bright sweep effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-data-horizontal z-0"></div>
                <Compass className="text-[18px] relative z-10 group-hover:rotate-45 transition-transform duration-500" />
                <span className="relative z-10">Initiate Free Consultation</span>
              </Link>
              
              {/* Secondary Button */}
              <Link href="/work" className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface-container-lowest/50 backdrop-blur-xl border border-surface-container-highest text-on-surface font-display text-[11px] leading-[16px] tracking-[0.15em] font-bold uppercase rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-sm overflow-hidden">
                {/* Subtle animated background gradient on hover */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(var(--color-primary-rgb),0.1),rgba(var(--color-secondary-rgb),0.1),transparent)] opacity-0 group-hover:opacity-100 bg-[length:200%_100%] group-hover:animate-gradient-x transition-opacity duration-500 z-0 pointer-events-none"></div>
                {/* Glowing animated border effect */}
                <div className="absolute inset-0 border border-transparent group-hover:border-primary/50 rounded-xl transition-colors duration-300 z-10 pointer-events-none shadow-[inset_0_0_20px_transparent] group-hover:shadow-[inset_0_0_20px_rgba(var(--color-primary-rgb),0.1)]"></div>
                <BookOpen className="text-[18px] text-secondary group-hover:text-primary transition-colors relative z-10" />
                <span className="relative z-10">Explore Architectural Dossiers</span>
              </Link>
            </div>

            {/* Blueprint Crosshair Notation */}
            <div className="flex flex-wrap items-center gap-4 text-secondary font-display text-[9px] leading-4 tracking-[0.1em] font-bold uppercase pt-2">
              <span className="flex items-center"><CircleCheck className="text-primary w-3.5 h-3.5 mr-1.5" /> Direct Architect Access</span>   
              <span className="flex items-center"><CircleCheck className="text-primary-container w-3.5 h-3.5 mr-1.5" /> Lifetime Code Support</span>
              <span className="text-on-surface flex items-center bg-surface-container px-2 py-1 rounded"><ShieldCheck className="text-primary w-3.5 h-3.5 mr-1.5" /> ZERO_MIDDLEMEN</span>
            </div>
          </div>

          {/* Right Column: Lead Architectural Elevation / Portrait */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0 group/frame mx-auto w-full max-w-[460px]">
            
            {/* Continuous Spinning Glow Border behind Image */}
            <div className="absolute -inset-4 bg-[conic-gradient(from_0deg,transparent_0_180deg,var(--color-primary)_360deg)] opacity-20 group-hover/frame:opacity-40 rounded-2xl animate-rotate-slow blur-2xl transition-opacity duration-1000 pointer-events-none z-0"></div>
            <div className="absolute -inset-2 bg-[conic-gradient(from_180deg,transparent_0_180deg,var(--color-secondary)_360deg)] opacity-10 group-hover/frame:opacity-20 rounded-2xl animate-rotate-slow blur-xl transition-opacity duration-1000 pointer-events-none z-0" style={{ animationDirection: 'reverse', animationDuration: '25s' }}></div>

            {/* Drafting Frame Container */}
            <div className="relative w-full bg-surface-container-lowest/40 backdrop-blur-3xl p-2.5 sm:p-3 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-surface-container-highest group-hover/frame:border-primary/50 transition-all duration-500 z-10 hover:-translate-y-2">
              
              {/* Portrait Surface */}
              <div className="relative overflow-hidden rounded-[16px] bg-transparent shadow-inner group-hover/frame:shadow-[inset_0_0_50px_rgba(var(--color-primary-rgb),0.1)] transition-all duration-700 aspect-auto">
                
                {/* Continuous Dynamic Scanline Overlay over Image */}
                <div className="absolute inset-0 w-full h-[200%] bg-gradient-to-b from-transparent via-primary/10 to-transparent pointer-events-none z-20 animate-scan-vertical mix-blend-overlay"></div>

                <Image src={img1} alt="Subham Sarkar, Software Architect and Systems Engineer" 
                  className="w-full h-auto object-cover transform-gpu transition-transform duration-700 group-hover/frame:scale-[1.02]" loading="eager" draggable={false}/>

                {/* Dimension Overlay Markers */}
                <div className="absolute top-3 left-3 bg-surface-container-lowest/70 backdrop-blur-lg px-2.5 py-1 rounded-lg text-on-surface font-display text-[9px] leading-[14px] tracking-[0.2em] font-black border border-surface-container-highest shadow-sm z-30 flex items-center gap-1.5 group-hover/frame:border-primary/30 transition-colors">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_5px_var(--color-primary)]"></span>
                  SUBHAM SARKAR 
                </div>
                
                <div className="absolute bottom-3 right-3 bg-inverse-surface/90 text-inverse-on-surface px-3 py-1.5 rounded-xl font-display text-[9px] leading-[14px] tracking-[0.15em] font-black shadow-2xl border border-inverse-surface/50 backdrop-blur-md flex items-center gap-1.5 z-30 hover:bg-primary hover:text-on-primary transition-all duration-300 cursor-default group-hover/frame:-translate-y-1">
                  <BadgeCheck className="text-[14px]" />
                  <span>10+ YRS DEPLOYED EXP</span>
                </div>

                {/* Subtle Ambient Studio Lighting Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/10 mix-blend-overlay pointer-events-none z-10 opacity-50 group-hover/frame:opacity-100 transition-opacity duration-700"></div>

                {/* Premium Glass Glare Sweep on Hover */}
                <div className="absolute inset-0 overflow-hidden rounded-[16px] pointer-events-none z-20">
                  <div className="absolute top-0 left-0 w-[150%] h-[150%] bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.05)_45%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.05)_55%,transparent_60%)] -translate-x-full -translate-y-full group-hover/frame:translate-x-[20%] group-hover/frame:translate-y-[20%] transition-transform duration-[1500ms] ease-out"></div>
                </div>
              </div>

              {/* Bottom Telemetry Strip */}
              <div className="pt-3 pb-1.5 px-2 flex justify-between items-center text-secondary font-display text-[9px] leading-4 tracking-[0.1em] font-black uppercase border-t border-surface-container-highest mt-3">
                <div className="flex space-x-1.5 items-center group-hover/frame:text-primary transition-colors duration-300"><ShieldCheck className="h-3.5 w-3.5" /> <span>100% SOVEREIGN IP HANDOVER</span></div>
                <div className="text-right text-on-surface bg-surface-container px-2 py-0.5 rounded shadow-inner hidden sm:block">DISCRETION: STRICT AIR-GAP</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
