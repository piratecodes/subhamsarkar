import Image from "next/image";
import { MapPin, Clock, Phone } from "lucide-react";
import architectureDiagram from "@/assets/architecture-diagram2.png";

export default function StudioElevation() {
  return (
    <section className="w-full py-20 relative overflow-hidden bg-surface/25">
      {/* Abstract Background Orbs for ambient lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      
      <div className="w-full container px-4 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="inline-block font-display text-[11px] leading-4 tracking-[0.15em] font-bold uppercase text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                WHERE I WORK FROM
              </span>
              <h2 className="font-display text-[36px] md:text-[42px] leading-[44px] md:leading-[50px] tracking-[-0.02em] font-bold text-on-surface">
                Based in Kolkata, Working With Clients Everywhere
              </h2>
              <p className="font-sans text-[16px] leading-7 text-secondary">
                Headquartered in Kolkata, India — working with businesses across time zones, in person or remotely, wherever the project needs.
              </p>
            </div>
            
            <div className="space-y-4">
              {/* Row 1 */}
              <div className="flex items-center justify-between py-3 px-4 sm:px-5 bg-surface-container-lowest/95 backdrop-blur-md rounded-xl border border-surface-container-highest shadow-sm gap-4 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group cursor-default relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                <div className="flex items-center gap-3.5 relative z-10">
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-500 shadow-inner group-hover:shadow-md">
                    <MapPin className="w-[18px] h-[18px] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <span className="font-display text-[12px] tracking-widest text-secondary group-hover:text-primary transition-colors duration-500 uppercase font-bold">LOCATION</span>
                </div>
                <span className="relative z-10 font-sans font-semibold text-on-surface text-[14px] text-right group-hover:text-primary transition-colors duration-500">Kolkata, West Bengal, India</span>
              </div>
              
              {/* Row 2 */}
              <div className="flex items-center justify-between py-3 px-4 sm:px-5 bg-surface-container-lowest/95 backdrop-blur-md rounded-xl border border-surface-container-highest shadow-sm gap-4 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group cursor-default relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out delay-75"></div>
                <div className="flex items-center gap-3.5 relative z-10">
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-500 shadow-inner group-hover:shadow-md">
                    <Clock className="w-[18px] h-[18px] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <span className="font-display text-[12px] tracking-widest text-secondary group-hover:text-primary transition-colors duration-500 uppercase font-bold">WORKING HOURS</span>
                </div>
                <span className="relative z-10 font-sans font-semibold text-on-surface text-[14px] text-right group-hover:text-primary transition-colors duration-500">09:00–19:00 IST (UTC +5:30)</span>
              </div>
              
              {/* Row 3 */}
              <div className="flex items-center justify-between py-3 px-4 sm:px-5 bg-surface-container-lowest/95 backdrop-blur-md rounded-xl border border-surface-container-highest shadow-sm gap-4 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group cursor-default relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out delay-150"></div>
                <div className="flex items-center gap-3.5 relative z-10">
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-500 shadow-inner group-hover:shadow-md">
                    <Phone className="w-[18px] h-[18px] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <span className="font-display text-[12px] tracking-widest text-secondary group-hover:text-primary transition-colors duration-500 uppercase font-bold">AVAILABLE FOR CALLS</span>
                </div>
                <span className="relative z-10 font-sans font-semibold text-on-surface text-[14px] text-right group-hover:text-primary transition-colors duration-500">Evenings, EST & GMT friendly</span>
              </div>
            </div>
          </div>
          
          {/* Architectural Contextual Photography */}
          <div className="lg:col-span-7 relative group mt-8 lg:mt-0">
            {/* Decorative offset backplate */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-[2rem] translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 group-hover:from-primary/30 transition-all duration-700 ease-out"></div>
            
            {/* Ambient Idle Glow */}
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px] animate-pulse -z-10"></div>
            
            <div className="w-full relative z-10 rounded-[2rem] overflow-hidden shadow-xl border border-surface-container-highest bg-surface-container group-hover:shadow-2xl group-hover:border-primary/40 transition-all duration-700 ease-out transform group-hover:-rotate-1 group-hover:scale-[1.02]">
              <Image 
                src={architectureDiagram}
                alt="Architectural Diagram" 
                className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              
              {/* Overlay gradient to make it look premium */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-highest/90 via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-700"></div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 bg-surface-container-lowest/55 backdrop-blur-xl px-2.5 py-1.5 rounded-2xl shadow-lg border border-white/20 flex items-center gap-4 group-hover:-translate-y-2 group-hover:shadow-xl hover:border-primary/50 transition-all duration-500 cursor-default">
                <div className="relative flex items-center justify-center w-3.5 h-3.5">
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></span>
                  <span className="relative w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]"></span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-[8px] leading-3 tracking-[0.15em] text-secondary font-bold uppercase mb-1">
                    HOW IT COMES TOGETHER
                  </span>
                  <span className="font-display text-xs leading-4 tracking-[0.02em] text-on-surface font-bold group-hover:text-primary transition-colors duration-300">
                    One System, Many Moving Parts
                  </span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
