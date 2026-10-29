"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, TerminalSquare } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import logo from "@/assets/navlogo.png";

export default function Footer({ settings }) {
  const [liveTime, setLiveTime] = useState("YYYY.MM.DD // 00:00:00:000");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // GMT+5:30 (IST)
      const istDate = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
      const year = istDate.getUTCFullYear();
      const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
      const day = String(istDate.getUTCDate()).padStart(2, '0');
      const hours = String(istDate.getUTCHours()).padStart(2, '0');
      const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
      const seconds = String(istDate.getUTCSeconds()).padStart(2, '0');
      const ms = String(istDate.getUTCMilliseconds()).padStart(3, '0');
      
      setLiveTime(`${year}.${month}.${day} // ${hours}:${minutes}:${seconds}:${ms}`);
    };
    
    // Update very quickly for the ms effect
    const intervalId = setInterval(updateTime, 47);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <footer className="w-full bg-surface-container-lowest/50 text-secondary border-t border-surface-container-highest relative overflow-hidden group/footer">
      
      {/* Animated Top Border Beam */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/80 to-transparent w-full opacity-50 z-0"></div>
      <div className="absolute top-0 left-0 h-[1px] w-1/4 bg-gradient-to-r from-transparent via-primary to-transparent animate-[shimmer_2s_infinite] z-0"></div>

      {/* Fluid Mesh Aurora Glows (Concentrated on the right side) */}
      <div className="absolute top-[-30%] right-[-10%] w-[60%] h-[120%] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0 animate-[floatAurora_20s_ease-in-out_infinite_alternate]"></div>
      <div className="absolute top-[20%] right-[15%] w-[40%] h-[100%] bg-secondary/5 rounded-full blur-[130px] pointer-events-none z-0 animate-[floatAurora_25s_ease-in-out_infinite_alternate-reverse]"></div>
      <div className="absolute bottom-[-40%] right-[5%] w-[50%] h-[100%] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0 animate-[floatAurora_30s_ease-in-out_infinite_alternate]"></div>
      
      {/* Subtle CRT Scanlines for tech feel */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)" }}></div>

      {/* Moving Blueprint Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0 animate-[panGrid_30s_linear_infinite]" style={{ backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>

      {/* Massive Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none z-0 select-none overflow-hidden opacity-[0.04]">
        <span className="text-[18vw] font-display font-bold leading-none tracking-tighter text-on-surface whitespace-nowrap">SUBHAM</span>
      </div>

      <div className="w-full container px-4 lg:px-12 pt-8 pb-5 relative z-10">
        
        {/* Live Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 mb-5 border-b border-surface-container-highest/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-display text-[9px] leading-4 tracking-[0.15em] font-semibold text-secondary uppercase bg-surface-container px-2 py-0.5 rounded shadow-inner border border-surface-container-highest">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              <span>Pulse Steady. Deadline? Already History</span>
            </div>
            
            {/* Real Heartbeat Monitor SVG (Accurate P-QRS-T Waveform) */}
            <div className="hidden sm:flex items-center gap-1.5 opacity-90 text-primary overflow-hidden relative h-5 w-24">
              <svg viewBox="0 0 100 20" className="absolute inset-0 w-full h-full stroke-primary fill-none stroke-[1.5px]" strokeLinecap="round" strokeLinejoin="round">
                <path 
                  d="M0 10 L20 10 Q25 6, 30 10 L35 10 L38 14 L43 2 L48 17 L52 10 L65 10 Q72 4, 80 10 L100 10" 
                  className="animate-[heartbeatDraw_2s_linear_infinite]" 
                  strokeDasharray="150" 
                  strokeDashoffset="150" 
                />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Live Ticking Clock (Date + Time) */}
            <div className="font-mono text-[10px] leading-4 tracking-widest font-medium text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 text-center flex items-center gap-1">
              <span>{liveTime}</span>
              <span className="text-[7px] text-primary/70 ml-1">IST</span>
            </div>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pb-6">
          
          {/* Brand & Identity Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between group">
            {/* Using a darker surface container without white borders/shadows */}
            <div className="bg-surface-container-lowest/5 backdrop-blur-md p-5 rounded-xl border border-surface-container-highest hover:border-primary/30 transition-all duration-700 h-full relative overflow-hidden shadow-sm">
              
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative z-10">
                <Link href="/" className="inline-flex items-center gap-3 mb-3">
                  <div className="relative h-10 w-auto shrink-0 transition-transform duration-500 group-hover:scale-105">
                    <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    <Image src={logo} alt="Subham Sarkar Logo" className="h-full w-auto object-contain relative z-10" loading="lazy" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-[17px] leading-5 tracking-[-0.01em] font-bold text-on-surface group-hover:text-primary transition-colors duration-300">SUBHAM SARKAR</span>
                      <span className="font-display text-[8px] leading-tight tracking-[0.15em] font-bold px-1.5 py-0.5 bg-primary/20 text-primary border border-primary/30 rounded animate-[pulse_3s_ease-in-out_infinite]">ARCH</span>
                    </div>
                    <span className="font-display text-[8px] leading-3 tracking-[0.1em] font-medium text-secondary tracking-wider mt-1 uppercase">
                      SUBHAMSARKAR.DEV // Studio Elevation
                    </span>
                  </div>
                </Link>
                
                <h2 className="font-display text-[20px] lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold text-on-surface mb-2 text-balance">
                  Building The Backbone Behind Every Unstoppable Business.
                </h2>
                <p className="font-sans text-[12px] leading-[18px] tracking-[-0.005em] font-normal text-secondary max-w-md">
                  Over a decade of experience building custom ERP, CRM, and enterprise software systems designed for reliability and client ownership.
                </p>
              </div>
              
              {/* Contact Details */}
              <div className="pt-4 mt-4 border-t border-surface-container-highest/50 space-y-2.5 relative z-10">
                {settings?.address && (
                  <div className="flex items-center gap-3 font-display text-[8.5px] leading-3 tracking-[0.1em] font-bold text-secondary hover:text-primary transition-colors cursor-pointer w-max group/item">
                    <div className="p-1.5 bg-surface-container-high rounded-md group-hover/item:bg-primary/20 transition-colors shadow-inner relative overflow-hidden border border-surface-container-highest">
                      <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover/item:translate-y-0 transition-transform duration-300"></div>
                      <MapPin className="w-3.5 h-3.5 relative z-10" />
                    </div>
                    <span>HQ: {settings.address.toUpperCase()}</span>
                  </div>
                )}
                {settings?.email && (
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-3 font-display text-[8.5px] leading-3 tracking-[0.1em] font-bold text-secondary hover:text-primary transition-colors w-max group/item">
                    <div className="p-1.5 bg-surface-container-high rounded-md group-hover/item:bg-primary/20 transition-colors shadow-inner relative overflow-hidden border border-surface-container-highest">
                      <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover/item:translate-y-0 transition-transform duration-300"></div>
                      <Mail className="w-3.5 h-3.5 relative z-10" />
                    </div>
                    <span>COMMUNICATION: {settings.email.toUpperCase()}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {/* Directory Links */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-2 font-display text-[9.5px] leading-4 tracking-[0.15em] font-bold text-primary uppercase border-b border-surface-container-highest pb-2">
                <TerminalSquare className="w-3 h-3" />
                <span>Navigation Directory</span>
              </div>
              <ul className="space-y-1.5 font-sans text-[12.5px] leading-5 tracking-[0em] font-medium text-secondary">
                {[
                  { name: "Home Overview", href: "/" },
                  { name: "About & Journey", href: "/about" },
                  { name: "Services & Capabilities", href: "/services" },
                  { name: "Work & Case Studies", href: "/work" },
                  { name: "Process & Methodology", href: "/process" },
                  { name: "Contact Studio", href: "/contact" }
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="group flex items-center justify-between py-1 hover:text-primary transition-colors duration-300">
                      <span className="relative overflow-hidden">
                        <span className="block transition-transform duration-300 group-hover:-translate-y-full">{link.name}</span>
                        <span className="block absolute top-0 left-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-primary">{link.name}</span>
                      </span>
                      <ArrowUpRight className="w-3 h-3 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-2 font-display text-[9.5px] leading-4 tracking-[0.15em] font-bold text-primary uppercase border-b border-surface-container-highest pb-2">
                <TerminalSquare className="w-3 h-3" />
                <span>Core Disciplines</span>
              </div>
              <ul className="space-y-1.5 font-sans text-[11.5px] leading-4 font-normal text-secondary">
                {[
                  { title: "ERP Systems Engineering", spec: "01" },
                  { title: "Enterprise CRM Architectures", spec: "02" },
                  { title: "Web & Mobile Ecosystems", spec: "03" },
                  { title: "Autonomous AI Agents", spec: "04" },
                  { title: "Legacy Migration", spec: "05" }
                ].map((item, idx) => (
                  <li key={idx} className="group flex items-center justify-between p-2 rounded-lg border border-transparent hover:border-surface-container-highest hover:bg-surface-container/50 transition-all duration-300 cursor-default">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary/30 group-hover:bg-primary transition-colors shadow-[0_0_5px_rgba(var(--color-primary-rgb),0)] group-hover:shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.8)]"></div>
                      <span className="group-hover:text-on-surface transition-colors">{item.title}</span>
                    </div>
                    <span className="font-display text-[8px] leading-3 tracking-[0.12em] font-bold text-surface-variant-highest group-hover:text-primary bg-surface-container px-1.5 py-0.5 rounded shadow-inner transition-colors">
                      SPEC: {item.spec}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-4 border-t border-surface-container-highest flex flex-col lg:flex-row items-center justify-between gap-3 relative z-10">
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 font-display text-[8.5px] sm:text-[9.5px] leading-3 tracking-[0.1em] font-medium text-secondary text-center sm:text-left">
            <span>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> SUBHAM SARKAR. ALL RIGHTS RESERVED.</span>
            
            {/* Social Links */}
            <div className="flex items-center gap-3.5">
              {settings?.linkedin && (
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:-translate-y-1 transition-all duration-300" aria-label="LinkedIn">
                  <FaLinkedin className="text-[14px]" />
                </a>
              )}
              {settings?.github && (
                <a href={settings.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:-translate-y-1 transition-all duration-300" aria-label="GitHub">
                  <FaGithub className="text-[14px]" />
                </a>
              )}
              {settings?.twitter && (
                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:-translate-y-1 transition-all duration-300" aria-label="Twitter">
                  <FaXTwitter className="text-[14px]" />
                </a>
              )}
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:-translate-y-1 transition-all duration-300" aria-label="Instagram">
                  <FaInstagram className="text-[14px]" />
                </a>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-3 font-display text-[8.5px] sm:text-[9.5px] leading-3 tracking-[0.15em] font-bold uppercase">
            <Link href="/privacy-policy" className="text-secondary hover:text-primary transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-right hover:after:origin-left">PRIVACY POLICY</Link>
            <span className="text-surface-container-highest">|</span>
            <Link href="/terms-and-conditions" className="text-secondary hover:text-primary transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-right hover:after:origin-left">TERMS & CONDITIONS</Link>
            <span className="text-surface-container-highest">|</span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-right hover:after:origin-left">SITEMAP</a>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes panGrid {
          0% { background-position: 0px 0px; }
          100% { background-position: 24px 24px; }
        }
        @keyframes heartbeatDraw {
          0% { stroke-dashoffset: 150; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { stroke-dashoffset: -150; opacity: 0; }
        }
        @keyframes floatAurora {
          0% { transform: translate(0%, 0%) scale(1); }
          33% { transform: translate(5%, 10%) scale(1.05); }
          66% { transform: translate(-5%, 5%) scale(0.95); }
          100% { transform: translate(0%, 0%) scale(1); }
        }
      `}</style>
    </footer>
  );
}
