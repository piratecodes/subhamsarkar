import { ShieldCheck, ArrowRightLeft, RefreshCw, Database, CheckCircle2, Lock, GitFork, Cpu } from "lucide-react";

export default function MigrationArchitecture() {
  const pillars = [
    {
      num: "01",
      icon: GitFork,
      title: "Step-by-Step Modernization, Not One Risky Rewrite",
      subtitle: "Replace the old software piece by piece while the business keeps running",
      body: "Where the system allows it, a routing layer is placed in front of the legacy software. New and rebuilt modules are developed on clean, modern technology, and as each one proves reliable, traffic moves to it until the old system can be retired. Where a staged route is not practical, the assessment says so and a different approach is chosen.",
      bullets: [
        "Operations continue, with fewer long feature freezes",
        "Fragile parts isolated behind stable connections",
        "Improvements delivered module by module"
      ]
    },
    {
      num: "02",
      icon: ArrowRightLeft,
      title: "Parallel Running: Old and New Side by Side",
      subtitle: "Compare results before anyone switches",
      body: "Where it is suitable, the old and new systems run side by side while incoming orders and updates are recorded in both. Automated checks compare the results and flag differences, so the team can resolve them before users move.",
      bullets: [
        "Both systems kept in step during testing",
        "Automated alerts on differences in totals and records",
        "Real-world testing before the switch"
      ]
    },
    {
      num: "03",
      icon: Database,
      title: "Cleaned and Reconciled Historical Data",
      subtitle: "Cleaning, de-duplicating and standardizing years of past records",
      body: "Old databases and spreadsheets often hold duplicate contacts, missing dates and broken references. Automated cleaning steps fix and validate each row before it enters the new database, and counts and totals are reconciled against the source.",
      bullets: [
        "Migration scripts can be re-run safely without duplicate rows",
        "Counts and checksums compare the new data with the old",
        "A clear log of every correction made"
      ]
    },
    {
      num: "04",
      icon: RefreshCw,
      title: "Gradual User Transition with a Rollback Plan",
      subtitle: "Move users in controlled stages",
      body: "Users move in controlled stages, starting with a small internal group and widening as results hold. A rollback plan is prepared before each stage, so if something looks wrong, traffic can return to the old system.",
      bullets: [
        "Cutovers planned for normal working hours",
        "Rollback prepared before each stage",
        "Hosting costs reviewed as part of the move to the cloud"
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
            Each step is tested against your real data and planned with a way back, so change happens gradually instead of in one risky jump.
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
