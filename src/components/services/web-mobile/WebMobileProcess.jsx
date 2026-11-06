import { CheckCircle2, GitCommit, Calendar, Rocket, Shield } from "lucide-react";

export default function WebMobileProcess() {
  const steps = [
    {
      phase: "PHASE 01",
      duration: "WEEKS 1-2",
      icon: GitCommit,
      title: "Data Flow Mapping & Schema Architecture",
      description:
        "We review your daily operations, spreadsheets, and staff routines. We define clear offline rules (what data can be entered without internet) and design clean, reliable database tables.",
      deliverable: "System Blueprint, Schema Diagrams, and API Data Contracts"
    },
    {
      phase: "PHASE 02",
      duration: "WEEKS 3-5",
      icon: Calendar,
      title: "Core Sync Layer & Offline Prototype",
      description:
        "We build the central cloud API and local device storage. We deploy an internal testing build directly to your phones so your team can test real entries and offline queuing in real conditions.",
      deliverable: "Private TestFlight / Internal Android Build + Admin Console"
    },
    {
      phase: "PHASE 03",
      duration: "WEEKS 6-7",
      icon: Shield,
      title: "Stress Testing & Low-Connectivity Field Trials",
      description:
        "We test tough scenarios: simulated low cellular network, simultaneous edits across multiple branches, and conflicting entries to confirm that background sync resolves everything cleanly.",
      deliverable: "Audit Verification Report & Production Candidate Build"
    },
    {
      phase: "PHASE 04",
      duration: "WEEK 8+",
      icon: Rocket,
      title: "Zero-Downtime Deployment & 30-Day Stabilization",
      description:
        "We launch the system live on your cloud servers. We train your staff, transfer 100% of the repository code to your company, and provide 30 days of direct support to ensure smooth daily operation.",
      deliverable: "Full Git IP Transfer, Documentation, and 30-Day Warranty"
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
            How We Build Together: Step by Step.
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            No endless meetings or opaque agency handoffs. You work directly with Subham Sarkar through distinct, reviewable milestones where progress is verified in running code.
          </p>
        </div>

        {/* 4 Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="bg-surface-container-lowest/80 backdrop-blur-xs rounded-2xl p-6 border border-surface-container-highest shadow-xs flex flex-col justify-between group hover:border-primary/40 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1.5 relative overflow-hidden"
              >
                {/* Active Indicator Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-surface-container-highest/60 pb-3">
                    <span className="font-display text-[11px] leading-4 tracking-widest uppercase font-bold text-primary flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      {st.phase}
                    </span>
                    <span className="font-mono text-[9.5px] leading-3 tracking-wider uppercase font-semibold text-secondary bg-surface-container px-2 py-1 rounded">
                      {st.duration}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-surface-container text-primary w-fit group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-display text-[18px] leading-[1.3] font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                    {st.title}
                  </h3>

                  <p className="font-sans text-[13.5px] leading-[21px] text-secondary">
                    {st.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-container-highest/60 bg-surface-container-low/40 -mx-6 -mb-6 p-4 rounded-b-2xl">
                  <span className="font-display text-[9px] leading-3 tracking-wider uppercase font-bold text-primary block mb-1">
                    KEY DELIVERABLE
                  </span>
                  <span className="font-sans text-[12px] leading-4 text-on-surface font-medium block">
                    {st.deliverable}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}