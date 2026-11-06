import { ShieldCheck, ArrowRightLeft, RefreshCw, Database, CheckCircle2, Lock, GitFork, Cpu } from "lucide-react";

export default function MigrationArchitecture() {
  const pillars = [
    {
      num: "01",
      icon: GitFork,
      title: "Step-by-Step Modernization (No Risky All-at-Once Rewrites)",
      subtitle: "Replace old software piece by piece while your business keeps running",
      body: "We set up an intelligent traffic router in front of your legacy software. New features and refactored modules are built independently on clean, fast modern technologies. As each piece proves reliable, we redirect user traffic module by module until the old system is retired.",
      bullets: [
        "Continuous business operations: zero multi-month feature freezes",
        "Low risk: isolates fragile legacy components behind stable connections",
        "Immediate speed improvements: modern modules deliver performance right away"
      ]
    },
    {
      num: "02",
      icon: ArrowRightLeft,
      title: "Live Parallel Testing (Old & New Run Side by Side)",
      subtitle: "Verify that 100% of orders, payments, and data match perfectly",
      body: "Never guess if data matches. While your legacy software continues operating normally, incoming orders and updates are saved to both databases concurrently. Automated checks compare outputs between the old and new systems until 100% data parity is proven.",
      bullets: [
        "Zero data drift: real-time synchronization keeps both databases in sync",
        "Automated disparity alerts catching historical quirks before user switchover",
        "Live production load testing without any impact on current customers"
      ]
    },
    {
      num: "03",
      icon: Database,
      title: "Cleaned & Verified Historical Data",
      subtitle: "Cleansing, deduplicating, and normalizing decades of past records",
      body: "Old databases frequently contain duplicate contacts, missing dates, and broken references. We build automated data cleaning pipelines that sanitize, validate, and verify every single row before inserting it into the new database.",
      bullets: [
        "Safe repeat runs: migration scripts can re-run without creating duplicate rows",
        "Mathematical verification: checksums verify that every single order migrated intact",
        "Clear migration log showing all sanitized records and corrections"
      ]
    },
    {
      num: "04",
      icon: RefreshCw,
      title: "Gradual User Transition with Instant 1-Click Rollback",
      subtitle: "Move users in controlled stages with zero recovery downtime",
      body: "We don't flip a switch overnight. We route 5% of internal staff first, then 25%, 50%, and finally 100% of customers during normal working hours. If anything looks unexpected, traffic switches back to the old system in under 10 milliseconds.",
      bullets: [
        "No weekend emergencies: cutovers happen safely during regular business hours",
        "Instant zero-loss rollback protection armed throughout the switchover",
        "Cloud optimization reducing ongoing monthly server hosting bills"
      ]
    }
  ];

  return (
    <section id="migration-architecture" className="relative border-b border-surface-container-highest py-20 lg:py-28 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none z-0 animate-[floatAurora_24s_ease-in-out_infinite_alternate]"></div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-20 space-y-4">
          <div className="flex items-center gap-2 font-display text-[10.5px] leading-4 tracking-[0.15em] uppercase font-bold text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>HOW THE MIGRATION WORKS // CORE CAPABILITIES</span>
          </div>
          <h2 className="font-display text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.12] tracking-[-0.02em] font-bold text-on-surface text-balance">
            Deterministic Framework for Cloud Software Modernization.
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            Every step is tested in parallel, verified against your real data, and protected by instant rollbacks. Here is how we guarantee a safe, zero-downtime legacy system migration.
          </p>
        </div>

        {/* 4 Architectural Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-surface-container-lowest/90 backdrop-blur-xs rounded-2xl p-7 lg:p-9 border border-surface-container-highest shadow-xs hover:border-primary/40 hover:shadow-xl transition-all duration-500 group flex flex-col justify-between relative overflow-hidden"
              >
                {/* Crosshair Graphic Accent */}
                <div className="absolute top-4 right-4 font-mono text-[10px] text-surface-container-highest group-hover:text-primary transition-colors font-bold">
                  [{pillar.num}]
                </div>

                <div className="space-y-5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-surface-container border border-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-[21px] leading-[1.25] tracking-[-0.01em] font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                        {pillar.title}
                      </h3>
                      <p className="font-sans text-[12.5px] leading-4 text-secondary font-medium mt-0.5">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="font-sans text-[14.5px] leading-[23px] text-secondary pt-1">
                    {pillar.body}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-surface-container-highest/80 space-y-2.5">
                  <span className="font-display text-[10px] leading-4 tracking-wider uppercase font-bold text-primary block">
                    WHAT YOU GET
                  </span>
                  <ul className="space-y-2">
                    {pillar.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 font-sans text-[13px] leading-5 text-on-surface">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
