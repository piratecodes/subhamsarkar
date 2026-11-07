import Link from "next/link";
import { ArrowRight, ArrowRightLeft, RefreshCw, ShieldCheck, Terminal, CheckCircle2, TrendingUp, Sparkles, Database } from "lucide-react";

export default function MigrationHero() {
  return (
    <section className="relative border-b border-surface-container-highest overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 group/hero">
      
      {/* Animated Top Border Beam */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/80 to-transparent w-full opacity-50 z-0"></div>
      <div className="absolute top-0 left-0 h-[1px] w-1/4 bg-gradient-to-r from-transparent via-primary to-transparent animate-[shimmer_3s_infinite] z-0"></div>

      {/* Background Animated Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.035] animate-[panGrid_35s_linear_infinite]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>
        <div className="absolute -top-32 right-1/4 w-[550px] h-[550px] bg-primary/10 rounded-full blur-[130px] animate-[floatAurora_20s_ease-in-out_infinite_alternate]"></div>
        <div className="absolute top-1/2 -left-32 w-[450px] h-[450px] bg-secondary-container/30 rounded-full blur-[110px] animate-[floatAurora_25s_ease-in-out_infinite_alternate-reverse]"></div>
      </div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
        
        {/* Editorial Eyebrow & Status Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-display text-[10.5px] leading-4 uppercase tracking-[0.15em] text-primary font-bold px-3 py-1 bg-primary/10 border border-primary/20 rounded-md shadow-xs flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              CORE DISCIPLINE // SPEC: 05
            </span>
            <span className="font-display text-[11px] leading-4 tracking-widest text-secondary font-medium px-2.5 py-1 bg-surface-container rounded border border-surface-container-highest">
              LEGACY SOFTWARE MIGRATION
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-display text-[10.5px] leading-4 tracking-[0.12em] font-semibold text-secondary uppercase bg-surface-container-lowest/90 px-3.5 py-1.5 rounded-full border border-surface-container-highest shadow-xs">
            <span className="flex items-center gap-1.5 text-primary">
              <ShieldCheck className="w-3.5 h-3.5" /> ARCHITECT: SUBHAM SARKAR
            </span>
            <span className="text-surface-container-highest">|</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              DIRECT ENGAGEMENT
            </span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-display text-[44px] sm:text-[54px] lg:text-[68px] leading-[1.08] tracking-[-0.03em] font-bold text-on-surface text-balance">
              Zero-Downtime Software Modernization &amp; Legacy System Migration.
            </h1>
            
            <p className="font-sans text-[17px] sm:text-[19px] leading-[28px] tracking-[-0.01em] font-normal text-secondary max-w-2xl text-balance">
              Safely replace slow, fragile software and fragmented spreadsheets without pausing daily business operations. Engineered by Subham Sarkar, zero-downtime software modernization migrates decades of legacy database records to modern cloud infrastructure using parallel dual-writing verification and staged cutovers with zero data loss.
            </p>

            {/* Feature Badges with Hover Interactions */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {[
                { icon: ArrowRightLeft, label: "Zero Downtime (Dual-Writing Verification)" },
                { icon: ShieldCheck, label: "100% Data Fidelity Guarantee" },
                { icon: RefreshCw, label: "Step-by-Step Software Modernization" }
              ].map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container border border-surface-container-highest text-secondary font-display text-[11.5px] leading-4 tracking-[0.02em] font-medium hover:border-primary/40 hover:text-on-surface transition-all duration-300"
                  >
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    <span>{badge.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/contact?service=software-modernization"
                className="group/btn relative inline-flex items-center gap-2.5 bg-primary hover:bg-primary-container text-on-primary font-display text-[12.5px] leading-4 tracking-[0.1em] font-bold uppercase px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="absolute top-0 bottom-0 left-0 w-10 bg-white/20 -skew-x-12 animate-[buttonSheen_3s_infinite] pointer-events-none"></div>
                <span>Discuss Your Modernization Plan</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>
              
              <a
                href="#migration-architecture"
                className="inline-flex items-center gap-2 text-secondary hover:text-on-surface font-display text-[12px] leading-4 tracking-[0.1em] font-semibold uppercase px-5 py-3.5 rounded-xl border border-surface-container-highest hover:border-primary/40 bg-surface-container-lowest/80 transition-all duration-300 shadow-xs hover:shadow-sm"
              >
                <span>How the Migration Works</span>
              </a>
            </div>

            {/* Micro-guarantee */}
            <div className="pt-2 flex items-center gap-3 text-secondary font-sans text-[12px] leading-4">
              <span className="flex items-center gap-1.5 text-primary font-semibold">
                <CheckCircle2 className="w-4 h-4" /> 100% Data Fidelity Guarantee
              </span>
              <span className="text-surface-container-highest">•</span>
              <span>Instant Rollback Safety Net</span>
              <span className="text-surface-container-highest">•</span>
              <span>30-Day Post-Launch Support</span>
            </div>
          </div>

          {/* Interactive Architectural Graphic */}
          <div className="lg:col-span-5 relative">
            
            {/* Terminal Window Frame */}
            <div className="relative rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-2xl p-6 lg:p-7 space-y-6 overflow-hidden">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-surface-container-highest pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-error/70"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary-container"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></div>
                  <span className="font-display text-[11px] leading-4 tracking-wider text-secondary font-mono ml-2">
                    system_migration.dashboard
                  </span>
                </div>
                <span className="font-display text-[9.5px] leading-3 tracking-widest font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase">
                  ZERO DOWNTIME
                </span>
              </div>

              {/* Live Metric Cards Grid */}
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-3.5 rounded-xl bg-surface-container border border-surface-container-highest/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-secondary tracking-wider uppercase font-sans font-bold">Data Parity</span>
                    <Database className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="text-[18px] font-bold text-on-surface tracking-tight">100.00% MATCH</div>
                  <div className="text-[10px] text-emerald-400 font-sans font-medium flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span>
                    Every Record Verified
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container border border-surface-container-highest/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-secondary tracking-wider uppercase font-sans font-bold">Cutover Stage</span>
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="text-[18px] font-bold text-primary tracking-tight">CANARY TEST</div>
                  <div className="text-[10px] text-secondary font-sans">Gradual User Transition</div>
                </div>
              </div>

              {/* Data Flow Pipeline Animation */}
              <div className="space-y-3 font-mono text-[11.5px] leading-relaxed">
                <div className="text-[10.5px] font-bold uppercase tracking-wider text-secondary font-sans flex items-center justify-between">
                  <span>Live Parallel Testing Feed</span>
                  <span className="text-primary font-mono text-[10px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                    PARALLEL
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-highest font-mono text-[11px] space-y-2 text-secondary">
                  <div className="flex items-center justify-between text-on-surface">
                    <span className="text-primary font-bold">ORDER_SAVED: DUAL_WRITE</span>
                    <span className="text-[10px] text-secondary">Old System ⟷ New System</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full w-full animate-[progressIndeterminate_2s_infinite]"></div>
                  </div>
                  <div className="flex items-center justify-between text-[9.5px] pt-1">
                    <span className="text-emerald-400 font-semibold">Both Databases Updated (4ms)</span>
                    <span className="text-secondary">Outputs Match 100%</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-highest font-mono text-[11px] space-y-1.5 text-secondary">
                  <div className="flex items-center justify-between text-on-surface">
                    <span className="text-secondary font-bold">SAFETY_CIRCUIT</span>
                    <span className="text-emerald-400 font-semibold text-[10px]">ARMED</span>
                  </div>
                  <div className="text-[10px] text-secondary truncate">
                    Instant 1-Click Rollback Ready • Zero Business Interruption
                  </div>
                </div>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="pt-2 border-t border-surface-container-highest flex items-center justify-between text-secondary font-mono text-[10.5px]">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-primary" />
                  <span>SUBHAM SARKAR ARCHITECTURE</span>
                </span>
                <span className="text-primary font-bold">SPEC: 05 // V3.0</span>
              </div>
            </div>

            {/* Background Decorative Blueprint Accents */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-primary/20 rounded-bl-2xl pointer-events-none"></div>
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-primary/20 rounded-tr-2xl pointer-events-none"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
