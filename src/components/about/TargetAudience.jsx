"use client";

import { Building2, Compass, Table } from "lucide-react";
import Tilt from "react-parallax-tilt";
export default function TargetAudience() {
  const profiles = [
    {
      icon: Building2,
      title: "Mid-Market & Enterprise Growth Trapped in SaaS",
      profile: "Profile A",
      desc: "Companies paying astronomical per-seat licensing fees for closed software that cannot be customized to match their unique operational processes or supply chains."
    },
    {
      icon: Table,
      title: "Operations Teams Constrained by Spreadsheet Chaos",
      profile: "Profile B",
      desc: "Organizations where hundreds of critical decisions daily hinge on manual Excel workbooks, brittle Zapier webhooks, and disconnected point solutions prone to data corruption."
    },
    {
      icon: Compass,
      title: "Founders & CTOs Requiring Battle-Hardened Core Systems",
      profile: "Profile C",
      desc: "Visionary engineering leaders building sovereign platforms who cannot afford to rebuild their foundations in two years when concurrent throughput jumps tenfold."
    }
  ];

  return (
    <section className="relative w-full py-16">
      
      {/* Subtle Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[80vw] h-[40vw] bg-[radial-gradient(ellipse,rgba(var(--color-primary-rgb),0.05)_0%,transparent_60%)] blur-[80px]"></div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes subtle-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-subtle-shimmer {
          animation: subtle-shimmer 3s ease-in-out infinite;
        }
      `}} />

      <div className="w-full container px-4 lg:px-12 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left Column: Context & Cadence */}
        <div className="lg:col-span-5 space-y-6 lg:space-y-8 flex flex-col justify-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-display text-[11px] leading-4 tracking-[0.12em] font-semibold text-primary uppercase tracking-widest border-l-2 border-primary pl-3">
              PARTNERSHIP PROFILE // ENGAGEMENT CRITERIA
            </div>
            <h2 className="font-display text-[36px] leading-[44px] tracking-[-0.02em] font-semibold text-on-surface tracking-tight drop-shadow-sm">
              Who I Typically Work With
            </h2>
            <p className="font-sans text-[15px] leading-6 tracking-[-0.005em] font-normal text-secondary leading-relaxed">
              I do not build throwaway prototypes or generic marketing frontends. Engagements are tailored for leadership teams whose operations have outgrown generic solutions and need structural software infrastructure.
            </p>
          </div>

          {/* Enhanced Engagement Cadence Box */}
          <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} perspective={1000} transitionSpeed={1000} scale={1.01} gyroscope={true}>
            <div className="relative overflow-hidden p-8 bg-surface-container-high/75 backdrop-blur-sm rounded-[1.25rem] shadow-sm border border-surface-container-highest group h-full">
              {/* Continuous Shimmer Effect */}
              <div className="absolute top-0 left-0 bottom-0 w-[200px] bg-gradient-to-r from-transparent via-primary/5 to-transparent skew-x-12 animate-subtle-shimmer pointer-events-none z-0"></div>
              
              {/* Glowing left edge on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/40 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-10"></div>

              <div className="relative z-10 space-y-2">
                <span className="font-display text-[11px] leading-4 tracking-[0.15em] font-bold text-primary block uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  ENGAGEMENT CADENCE
                </span>
                <span className="font-display text-[20px] leading-7 tracking-[0em] font-bold text-on-surface block">
                  Direct Senior Architectural Access
                </span>
                <p className="font-sans text-[14px] leading-[22px] tracking-[-0.005em] font-medium text-secondary">
                  No account managers, no junior offshore handoffs. Every schema, migration script, and API model is authored and inspected personally.
                </p>
              </div>
            </div>
          </Tilt>
        </div>

        {/* Right Column: 3 Qualifications Cards (Drawer Pull-out Effect) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
          {profiles.map((prof, i) => (
            <div 
              key={i} 
              className="group relative bg-surface-container-lowest/80 backdrop-blur-md p-6 lg:p-8 rounded-[1.25rem] shadow-sm border border-surface-container-highest hover:border-primary/30 transition-all duration-500 hover:-translate-x-2 hover:shadow-[15px_15px_40px_rgba(var(--color-primary-rgb),0.06)] flex flex-col sm:flex-row items-start gap-5 overflow-hidden cursor-default"
            >
              {/* Subtle hover gradient trace */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

              {/* Icon Container */}
              <div 
                className="relative w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0 border border-surface group-hover:border-primary/20 transition-colors duration-500 z-10"
              >
                <div className="absolute inset-0 bg-primary/20 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <prof.icon className="text-[24px] text-secondary group-hover:text-primary transition-all duration-500 group-hover:scale-110 relative z-10" />
              </div>
              
              {/* Content */}
              <div className="space-y-2 relative z-10 flex-grow">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-[18px] leading-6 tracking-[0em] font-bold text-on-surface group-hover:text-primary transition-colors duration-500">
                    {prof.title}
                  </span>
                  <span className="font-display text-[10px] leading-[14px] font-bold bg-surface-container border border-surface-container-highest text-secondary group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-colors duration-500 px-2 py-0.5 rounded uppercase tracking-wider">
                    {prof.profile}
                  </span>
                </div>
                <p className="font-sans text-[14.5px] leading-6 tracking-[-0.005em] font-medium text-secondary group-hover:text-on-surface-variant transition-colors duration-500">
                  {prof.desc}
                </p>
              </div>
              
              {/* Active right border indicator */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1/2 w-1 bg-primary/40 rounded-l-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
