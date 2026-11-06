import { CheckCircle2, GitCommit, Calendar, Rocket, Shield } from "lucide-react";

export default function MigrationProcess() {
  const steps = [
    {
      phase: "PHASE 01",
      duration: "WEEKS 1-2",
      icon: GitCommit,
      title: "Monolith & Schema Forensic Audit",
      description:
        "We analyze old database tables, stored procedures, and hidden software quirks. We map out the clean modern database design and decide which parts to replace first.",
      deliverable: "Forensic Audit Report, Schema Mapping Matrix, and Migration Plan"
    },
    {
      phase: "PHASE 02",
      duration: "WEEKS 3-4",
      icon: Calendar,
      title: "Traffic Router & Parallel Sync Setup",
      description:
        "We set up an intelligent router in front of your legacy app and start saving live entries into both systems at the same time. The new system stays continuously up-to-date in real time.",
      deliverable: "Active Dual-Write Queue + Replicated Staging Database"
    },
    {
      phase: "PHASE 03",
      duration: "WEEKS 5-6",
      icon: Shield,
      title: "Live Shadow Testing & Output Checks",
      description:
        "Both systems process real customer requests in the background. Automated checks compare calculations and numbers between both systems to guarantee 100% accuracy before any users switch.",
      deliverable: "Shadow Verification Report & Mathematical Parity Attestation"
    },
    {
      phase: "PHASE 04",
      duration: "WEEK 7+",
      icon: Rocket,
      title: "Gradual Cutover & Old System Retirement",
      description:
        "We move users in small, controlled stages (5% to 100%) during regular office hours with an instant 1-click fallback safety net, followed by retiring the old server and providing 30 days of direct support.",
      deliverable: "Zero-Downtime Cutover, Legacy Decommissioning, and 30-Day Warranty"
    }
  ];

  return (
    <section className="relative border-b border-surface-container-highest py-20 lg:py-28 overflow-hidden">
      <div className="w-full container px-4 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-18 space-y-4">
          <div className="flex items-center gap-2 font-display text-[10.5px] leading-4 tracking-[0.15em] uppercase font-bold text-primary">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>EXECUTION METHODOLOGY // STRUCTURED DELIVERY</span>
          </div>
          <h2 className="font-display text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.12] tracking-[-0.02em] font-bold text-on-surface text-balance">
            How We Migrate Your Systems: Step by Step.
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            No endless meetings or opaque agency handoffs. You work directly with Subham Sarkar through distinct, reviewable milestones where progress is verified in running code.
          </p>
        </div>

        {/* 4 Process Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-surface-container-lowest/80 backdrop-blur-xs rounded-2xl p-6 lg:p-7 border border-surface-container-highest shadow-xs hover:border-primary/40 hover:shadow-xl transition-all duration-500 group flex flex-col justify-between relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[10px] leading-3 tracking-widest uppercase font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded">
                      {step.phase}
                    </span>
                    <span className="font-mono text-[10px] text-secondary font-bold">
                      {step.duration}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-surface-container border border-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-display text-[18px] leading-[1.3] tracking-[-0.01em] font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="font-sans text-[13.5px] leading-[22px] text-secondary">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-container-highest/60 bg-surface-container-low/40 -mx-6 -mb-6 p-5 rounded-b-2xl">
                  <span className="font-display text-[9px] leading-3 tracking-wider uppercase font-bold text-primary block mb-1">
                    VERIFIED DELIVERABLE
                  </span>
                  <p className="font-sans text-[12px] leading-4 text-on-surface font-medium">
                    {step.deliverable}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

