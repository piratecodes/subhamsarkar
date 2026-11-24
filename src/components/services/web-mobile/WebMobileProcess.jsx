import { CheckCircle2, GitCommit, Calendar, Rocket, Shield } from "lucide-react";

export default function WebMobileProcess() {
  const steps = [
    {
      phase: "PHASE 01",
      duration: "STAGE 01",
      icon: GitCommit,
      title: "Requirements, Data Flow and Schema Design",
      description:
        "I review your daily operations, spreadsheets and staff routines, then define which data can be entered offline and design the database around it.",
      deliverable: "System blueprint, schema diagrams and API contracts, reviewed with you before build."
    },
    {
      phase: "PHASE 02",
      duration: "STAGE 02",
      icon: Calendar,
      title: "Core Sync Layer and Offline-First Prototype",
      description:
        "We build the central API and the on-device storage under my architecture, then give your team a working test version to open on their own phones and try real entries, with and without a signal.",
      deliverable: "A working test version for your phones, plus the admin console."
    },
    {
      phase: "PHASE 03",
      duration: "STAGE 03",
      icon: Shield,
      title: "Testing for Weak Signal and Simultaneous Edits",
      description:
        "We test the hard cases: a weak or dropped connection, simultaneous edits from several branches and conflicting entries. I review the results to confirm that sync resolves them correctly.",
      deliverable: "A test report and a release candidate build ready for launch."
    },
    {
      phase: "PHASE 04",
      duration: "STAGE 04",
      icon: Rocket,
      title: "Production Launch and 30-Day Stabilization",
      description:
        "We launch the system in a production environment chosen for your requirements, train your staff and provide 30 days of direct support after launch.",
      deliverable: "The production system, staff training and 30 days of post-launch support."
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
            The Custom Web Application Development Process
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            You work directly with the architect through clear, reviewable milestones. I design the architecture and review every delivery myself, with developers I work with handling the build. Timelines depend on your scope and features, and are agreed after a short conversation.
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
                    DELIVERABLE
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