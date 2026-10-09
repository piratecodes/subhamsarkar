"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function ProcessCTA() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="w-full relative overflow-hidden py-12 lg:py-16">
      
      <div className="w-full container px-4 lg:px-8 relative z-10">
        
        {/* Floating CTA Banner Card */}
        <div className="relative w-full bg-surface-container-lowest/40 backdrop-blur-3xl border border-surface-container-highest/60 rounded-[2.5rem] p-10 lg:p-14 text-center overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
          
          {/* Background Radial Glow contained within the card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_70%)] opacity-[0.08] pointer-events-none blur-[50px]"></div>
          
          <div className="relative z-10 max-w-5xl mx-auto space-y-6">
          
          {/* Eyebrow */}
          <div className={`flex items-center justify-center gap-2 transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_var(--color-primary)]"></span>
            <span className="font-display text-[12px] leading-4 tracking-[0.15em] font-bold uppercase tracking-widest text-primary">
              GET STARTED
            </span>
          </div>
          
          {/* Headline */}
          <h2 className={`font-display text-[42px] lg:text-[56px] leading-[1.1] tracking-[-0.02em] font-bold text-on-surface transition-all duration-1000 delay-[200ms] ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Ready to Talk Through What This Would <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Look Like for You?</span>
          </h2>
          
          {/* Body Text */}
          <p className={`font-sans text-[18px] lg:text-[20px] leading-relaxed tracking-[-0.005em] font-medium text-secondary max-w-5xl mx-auto transition-all duration-1000 delay-[400ms] ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            You don't need a finished plan or technical knowledge to start this conversation. Tell us what's going on with your business, and we'll walk you through how the process would actually apply to your situation.
          </p>
          
          {/* Button & Subtext */}
          <div className={`pt-6 flex flex-col items-center justify-center gap-4 transition-all duration-1000 delay-[600ms] ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            <div className="relative group/cta inline-block z-10">
               {/* Hover Glow Behind Button */}
               <div className="absolute inset-0 bg-primary/40 blur-2xl group-hover/cta:bg-primary/60 transition-colors duration-500 rounded-2xl pointer-events-none"></div>
               
               <MagneticButton className="inline-block" magneticPull={0.25}>
                 <Link href="/contact" className="relative inline-flex items-center justify-center gap-4 px-8 py-5 bg-surface-container-lowest/80 backdrop-blur-xl border border-primary/40 hover:border-primary text-on-surface hover:text-primary font-display text-[13px] leading-4 tracking-[0.15em] font-bold uppercase rounded-2xl overflow-hidden transition-all duration-300">
                   {/* Shine Sweep */}
                   <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover/cta:translate-x-[250%] transition-transform duration-700 ease-in-out skew-x-[-15deg]"></div>
                   
                   <Calendar className="w-5 h-5 relative z-10" />
                   <span className="relative z-10">Book a Free Consultation</span>
                   <ArrowRight className="w-5 h-5 relative z-10 group-hover/cta:translate-x-1 transition-transform" />
                 </Link>
               </MagneticButton>
            </div>
            
            <p className="font-sans text-[15px] text-secondary/80 font-medium italic mt-2">
              No commitment. Just a conversation.
            </p>
            
          </div>
          
          </div>
        </div>
      </div>
    </section>
  );
}
