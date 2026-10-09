import Link from 'next/link';
import Image from 'next/image';
import img1 from "@/assets/myimage_web.png";

export default function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden bg-transparent">
      
      {/* Breathtaking Animated Background (Directly from Landing Page for maximum 'soul') */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_60%)] opacity-[0.08] blur-[100px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[90vw] h-[90vw] max-w-[1200px] max-h-[1200px] bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_60%)] opacity-[0.05] blur-[120px]" style={{ animation: 'pulse-slow-glow 10s ease-in-out infinite 3s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[50vw] bg-[radial-gradient(ellipse,var(--color-primary-container)_0%,transparent_70%)] opacity-[0.03] blur-[150px] -rotate-[30deg]"></div>
        
        {/* Deep tech grid overlay */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "linear-gradient(color-mix(in srgb, var(--color-primary) 30%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 30%, transparent) 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(ellipse at center, black 0%, transparent 80%)" }}></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden opacity-50">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-primary rounded-full blur-[1px]"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `float-up ${Math.random() * 5 + 5}s ease-in infinite`,
                animationDelay: `-${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-slow-glow {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50% { opacity: 0.12; transform: scale(1.05); }
        }
        .animate-pulse-glow {
          animation: pulse-slow-glow 8s ease-in-out infinite;
        }

        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
        }

        @keyframes border-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-border-flow {
          background: linear-gradient(90deg, transparent, rgba(var(--color-primary-rgb), 0.6), transparent);
          background-size: 200% 100%;
          animation: border-flow 4s linear infinite;
        }
        
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 5s linear infinite;
        }
        
        @keyframes tab-pulse {
          0%, 100% { border-color: rgba(var(--color-primary-rgb), 0.1); box-shadow: 0 0 0 rgba(var(--color-primary-rgb), 0); }
          50% { border-color: rgba(var(--color-primary-rgb), 0.4); box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.2); }
        }
        .animate-tab-pulse {
          animation: tab-pulse 3s infinite ease-in-out;
        }
      `}} />

      <section className="relative z-10 w-full container px-4 sm:px-6 lg:px-12 py-8 lg:py-10 flex items-center justify-center min-h-[calc(100vh-100px)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
          
          {/* Narrative Left Column */}
          <div className="lg:col-span-7 flex flex-col space-y-4 lg:space-y-5 relative z-20">
            
            <div className="flex flex-wrap items-center gap-3 font-display text-[10px] leading-[16px] tracking-[0.15em] font-bold text-secondary uppercase relative">
              <div className="absolute -top-4 -left-4 w-1.5 h-1.5 bg-primary rounded-full blur-[1px]" style={{ animation: 'float-up 4s ease-in infinite' }}></div>
              <span className="relative inline-flex items-center gap-2 px-3 py-1.5 bg-surface-container-highest/30 backdrop-blur-md text-primary rounded-full shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.15)] group overflow-hidden border border-primary/20">
                <span className="relative z-10 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)] animate-pulse"></span>
                <span className="relative z-10 font-bold tracking-widest text-on-surface">ARCHITECTURAL CHRONICLE</span>
              </span>
              <span className="md:border-l border-surface-container-highest md:pl-3">
                A Decade In Enterprise Production
              </span>
            </div>
            
            <h1 className="font-display text-[36px] leading-[1.05] tracking-[-0.03em] font-black lg:text-[46px] drop-shadow-lg text-balance relative text-on-surface">
              Systems That Don&apos;t Fall: <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-[linear-gradient(to_right,var(--color-primary),var(--color-secondary),var(--color-primary))] bg-[length:200%_auto] animate-gradient-x drop-shadow-md">
                The Decade-Long Evolution
                {/* Glowing animated underline */}
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 rounded-full blur-[2px] animate-pulse"></span>
              </span>
            </h1>
            
            {/* Pull Quote / Card-House Metaphor container */}
            <div className="relative group bg-surface-container-low/40 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-surface-container-highest shadow-sm hover:shadow-[0_8px_30px_rgba(var(--color-primary-rgb),0.05)] hover:border-primary/20 transition-all duration-500 overflow-hidden space-y-3">
              <div className="absolute top-0 left-0 w-full h-[2px] animate-border-flow opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex items-center justify-between text-secondary font-display text-[9px] lg:text-[10px] leading-none tracking-[0.1em] font-bold pb-2 border-b border-surface-container-highest/50 relative z-10">
                <span className="uppercase text-primary">WHERE THIS ALL STARTED</span>
                <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.1)]">A PERSONAL NOTE</span>
              </div>
              
              {/* Double Quoted Spotlight Text (Work Page Style - Now Bold) */}
              <p className="relative font-sans text-[16px] lg:text-[18px] leading-[1.6] tracking-[-0.01em] text-on-surface font-bold italic border-l-2 border-primary/40 pl-4 py-2 bg-gradient-to-r from-primary/5 to-transparent rounded-r-xl relative z-10 shadow-[inset_0_0_20px_rgba(var(--color-primary-rgb),0.02)]">
                <span className="absolute -top-3 -left-2 text-4xl text-primary/30 font-serif leading-none">"</span>
                Over the years, I built card houses hoping one day they&apos;d survive a breeze. They never did — one wrong piece and the whole thing came down. So I gave up on cards and started building architectures that don&apos;t fall, no matter how much weight you stack on them.
                <span className="absolute -bottom-4 -right-2 text-4xl text-primary/30 font-serif leading-none">"</span>
              </p>
              
              {/* Below Text Spotlight Appearance */}
              <p className="font-sans text-[14px] lg:text-[15px] leading-[1.7] tracking-[0em] font-normal text-secondary border-l-2 border-surface-container-highest pl-4 py-2 bg-gradient-to-r from-surface-container/30 to-transparent rounded-r-xl group-hover:border-primary/20 transition-colors duration-500 relative z-10">
                For over a decade, I've built the systems that businesses run on quietly, in the background - custom ERP and CRM platforms, connected websites and apps, and the everyday infrastructure that keeps growing companies from falling apart under their own weight. I don't build throwaway prototypes. I build things meant to still be running, unattended and unnoticed, years from now.
              </p>
            </div>
            
            {/* Quick Spec Ledger (Now Highly Active) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 relative z-20">
              <div className="p-3 bg-surface-container-low/60 backdrop-blur-md rounded-xl group/card border border-surface-container-highest hover:bg-surface-container transition-colors duration-300 animate-tab-pulse relative overflow-hidden" style={{ animationDelay: '0s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-1.5 mb-1 relative z-10">
                  <span className="w-1 h-1 bg-primary rounded-full animate-ping"></span>
                  <span className="font-display text-[10px] tracking-[0.1em] font-bold text-secondary uppercase">HOW I THINK</span>
                </div>
                <span className="block font-display text-[13px] tracking-tight font-semibold text-on-surface group-hover/card:text-primary transition-colors relative z-10">In Systems, Not Shortcuts</span>
              </div>
              <div className="p-3 bg-surface-container-low/60 backdrop-blur-md rounded-xl group/card border border-surface-container-highest hover:bg-surface-container transition-colors duration-300 animate-tab-pulse relative overflow-hidden" style={{ animationDelay: '1s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-1.5 mb-1 relative z-10">
                  <span className="w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '1s' }}></span>
                  <span className="font-display text-[10px] tracking-[0.1em] font-bold text-secondary uppercase">HOW I WORK</span>
                </div>
                <span className="block font-display text-[13px] tracking-tight font-semibold text-on-surface group-hover/card:text-primary transition-colors relative z-10">Direct, No Middlemen</span>
              </div>
              <div className="p-3 bg-surface-container-low/60 backdrop-blur-md rounded-xl group/card border border-surface-container-highest hover:bg-surface-container transition-colors duration-300 animate-tab-pulse relative overflow-hidden" style={{ animationDelay: '2s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-1.5 mb-1 relative z-10">
                  <span className="w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '2s' }}></span>
                  <span className="font-display text-[10px] tracking-[0.1em] font-bold text-secondary uppercase">WHAT I VALUE</span>
                </div>
                <span className="block font-display text-[13px] tracking-tight font-semibold text-primary relative z-10">Built Once, Built Right</span>
              </div>
            </div>
            
          </div>

          {/* Architectural Profile Elevation Card */}
          <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-0 relative z-20 w-full max-w-[340px] lg:max-w-[400px] mx-auto lg:ml-auto lg:mr-0">
            <div className="bg-surface-container-lowest/60 backdrop-blur-xl rounded-[1rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-surface-container-highest overflow-hidden group hover:shadow-[0_20px_60px_rgba(var(--color-primary-rgb),0.2)] hover:border-primary/40 transition-all duration-700 relative">
              
              {/* Spinning Glow Border behind Image Card */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_180deg,rgba(var(--color-primary-rgb),0.5)_360deg)] animate-[spin_6s_linear_infinite]"></div>
              </div>

              {/* Main Structural Visual Frame (True Portrait without max-h constraints) */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-container-highest/30 z-10">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-700 z-10 mix-blend-overlay pointer-events-none"></div>
                
                <Image 
                  src={img1} 
                  alt="Subham Sarkar Architectural Studio Profile" 
                  fill 
                  className="object-cover object-top grayscale-25 contrast-110 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-1000 brightness-105"
                  priority
                />
                
                {/* Simplified Overlay Ticks - ONLY "SYSTEMS DESIGNER" */}
                <div className="absolute inset-0 z-20 pointer-events-none p-4 flex flex-col justify-end">
                  <div className="flex justify-end items-center text-surface-lowest/90 font-display text-[9px] leading-none tracking-[0.1em] font-bold uppercase">
                    <span className="bg-primary text-on-primary px-3.5 py-2 rounded-md backdrop-blur-md shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.7)] flex items-center gap-2">
                      <span className="w-2 h-2 bg-on-primary rounded-full animate-pulse shadow-[0_0_10px_white]"></span>
                      SYSTEMS DESIGNER
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Metadata Matrix */}
              <div className="p-4 lg:p-5 space-y-3 bg-surface-container-low/90 backdrop-blur-xl relative z-10 border-t border-surface-container-highest">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-display text-[8px] tracking-[0.15em] font-bold text-secondary uppercase block mb-0.5">IDENTITY</span>
                    <span className="font-display text-[16px] lg:text-[18px] tracking-tight font-bold text-on-surface">Subham Sarkar</span>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-[8px] tracking-[0.15em] font-bold text-secondary uppercase block mb-0.5">WEBSITE</span>
                    <Link href="https://subham.digital" className="font-display text-[9px] tracking-[0.15em] text-primary font-bold hover:text-on-surface transition-colors">SUBHAM.DIGITAL</Link>
                  </div>
                </div>
                
                {/* Quantitative Benchmarks */}
                <div className="grid grid-cols-2 gap-2 lg:gap-3">
                  <div className="bg-surface-container-lowest/80 p-2 lg:p-3 rounded-lg border border-surface-container-highest group/stat hover:border-primary/40 hover:bg-surface-container transition-all">
                    <div className="font-display text-[22px] lg:text-[24px] leading-none tracking-tight font-bold text-primary mb-1">10+</div>
                    <div className="font-display text-[7px] leading-[10px] tracking-[0.1em] font-bold text-secondary uppercase">Years In Enterprise Production</div>
                  </div>
                  <div className="bg-surface-container-lowest/80 p-2 lg:p-3 rounded-lg border border-surface-container-highest group/stat hover:border-primary/40 hover:bg-surface-container transition-all">
                    <div className="font-display text-[22px] lg:text-[24px] leading-none tracking-tight font-bold text-on-surface group-hover/stat:text-primary transition-colors mb-1">20+</div>
                    <div className="font-display text-[7px] leading-[10px] tracking-[0.1em] font-bold text-secondary uppercase">Businesses Engineered</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
