import Link from "next/link";
import { Compass, FolderOpen } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function AboutCTA() {
  return (
    <section className="w-full container px-4 lg:px-12 py-16 relative group">

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes button-sheen {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(250%) skewX(-15deg); }
        }
        .animate-button-sheen {
          animation: button-sheen 3s ease-in-out infinite;
        }
        @keyframes playful-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-playful-bounce {
          animation: playful-bounce 2s ease-in-out infinite;
        }
        @keyframes orb-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -40px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }
        @keyframes sonar-ping {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-orb-float {
          animation: orb-float 15s ease-in-out infinite;
        }
        .animate-sonar-ping {
          animation: sonar-ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}} />

      {/* Playful, subtle gradient background container */}
      <div className="relative bg-surface-container-highest/60 backdrop-blur-xl p-10 lg:p-14 rounded-[1.5rem] shadow-sm border border-surface-container-highest overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 hover:shadow-lg hover:border-primary/20 transition-all duration-700">

        {/* Floating Playful Color Orbs (Charms from theme) */}
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[150%] bg-primary/10 blur-[80px] rounded-full pointer-events-none animate-orb-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-[-30%] right-[10%] w-[50%] h-[120%] bg-secondary-container/20 blur-[80px] rounded-full pointer-events-none animate-orb-float" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[100%] bg-primary-container/20 blur-[60px] rounded-full pointer-events-none animate-orb-float" style={{ animationDelay: '-10s' }}></div>

        <div className="space-y-4 max-w-2xl relative z-10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="font-display text-[11px] leading-4 tracking-[0.15em] text-primary font-bold uppercase tracking-widest">
              NEXT STEP // SYSTEM AUDIT & CONSULTATION
            </span>
          </div>

          <h3 className="font-display text-[32px] lg:text-[40px] leading-[1.1] tracking-[-0.02em] text-on-surface font-bold tracking-tight">
            Ready to build an architecture that doesn&apos;t fall?
          </h3>

          <p className="font-sans text-[16px] leading-[26px] tracking-[-0.005em] font-medium text-secondary/90">
            Review documented case studies of mission-critical systems in production, or schedule an architectural audit of your database schemas and operational pipelines.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5 shrink-0 w-full lg:w-auto relative z-10">

          {/* Secondary Button */}
          <Link
            href="/work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-surface text-on-surface hover:text-primary hover:bg-surface-container-lowest font-display text-[12px] leading-4 tracking-[0.1em] font-bold uppercase rounded-xl transition-all duration-300 shadow-sm border border-surface-container-highest hover:border-primary/20 hover:-translate-y-1"
          >
            <FolderOpen className="w-4 h-4" />
            <span>View Our Work</span>
          </Link>

          {/* Primary Catchy Button with Sonar Ping */}
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-0 bg-primary/30 rounded-xl animate-sonar-ping pointer-events-none z-0"></div>
            <MagneticButton className="w-full sm:w-auto" magneticPull={0.25}>
              <Link 
                href="/contact" 
                className="relative z-10 overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-on-primary font-display text-[12px] leading-4 tracking-[0.1em] font-bold uppercase rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 group/btn"
              >
                {/* Continuous Sheen Effect */}
                <div className="absolute top-0 bottom-0 left-0 w-12 bg-white/20 animate-button-sheen blur-[4px]"></div>
                
                <Compass className="w-4 h-4 group-hover/btn:animate-playful-bounce" />
                <span className="relative z-10">Book a Free Consultation</span>
              </Link>
            </MagneticButton>
          </div>
          
        </div>
      </div>
    </section>
  );
}
