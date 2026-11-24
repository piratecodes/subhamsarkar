import Link from "next/link";
import {
  Layers,
  FileCheck2,
  Database,
  Link2,
  ArrowRightLeft,
  Clock
} from "lucide-react";

export default function ProcessTimelineFactors() {
  const factors = [
    {
      num: "01",
      icon: Layers,
      title: "Scope and number of modules",
      body: "How much the system covers and how many parts depend on each other."
    },
    {
      num: "02",
      icon: FileCheck2,
      title: "Clarity of requirements",
      body: "How well the workflows are understood at the start, and how many decisions are still open."
    },
    {
      num: "03",
      icon: Database,
      title: "Data to bring across",
      body: "How much existing data moves in, and how clean it is."
    },
    {
      num: "04",
      icon: Link2,
      title: "Connections to other tools",
      body: "Accounting software, messaging, scanners and other systems the new software must work with."
    },
    {
      num: "05",
      icon: ArrowRightLeft,
      title: "Replacing an existing system",
      body: "Whether old and new must run side by side before users switch."
    },
    {
      num: "06",
      icon: Clock,
      title: "Review speed and decisions",
      body: "How quickly approvals and feedback come back at each milestone."
    }
  ];

  return (
    <section
      id="process-timeline-factors"
      aria-labelledby="process-timeline-factors-title"
      className="w-full bg-surface-container-low/20 relative overflow-hidden py-20 lg:py-24 border-t border-surface-container-highest/30"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[350px] bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_70%)] opacity-[0.03] pointer-events-none blur-[60px]"></div>

      <div className="w-full container px-4 lg:px-8 relative z-10">
        {/* Centered Header Block */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-4 mb-12 lg:mb-14">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_var(--color-primary)]"></span>
            <span className="font-display text-[11px] leading-4 tracking-[0.15em] font-bold uppercase tracking-widest text-primary">
              TIMELINES // WHAT MOVES THE SCHEDULE
            </span>
          </div>

          <h2
            id="process-timeline-factors-title"
            className="font-display text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.16] tracking-[-0.02em] font-bold text-on-surface"
          >
            What Affects the Timeline of a Custom Software Project
          </h2>

          <p className="font-sans text-[15.5px] sm:text-[17px] leading-relaxed tracking-[-0.005em] font-medium text-secondary max-w-3xl">
            There is no fixed timeline, because projects differ. After discovery and planning you receive a timeline for your own project, set in milestones. These are the factors that move it most.
          </p>
        </div>

        {/* 6 Factor Cards (1 col mobile, 2 col sm, 3 col lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {factors.map((factor, idx) => {
            const Icon = factor.icon;
            return (
              <div
                key={idx}
                className="group relative bg-surface-container-lowest/70 backdrop-blur-md border border-surface-container-highest/50 hover:border-primary/40 rounded-2xl p-6 lg:p-7 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Corner Subtle Aurora */}
                <div className="absolute -top-8 -right-8 w-28 h-28 bg-primary/5 blur-[25px] rounded-full pointer-events-none group-hover:bg-primary/15 transition-colors duration-500"></div>

                {/* Top Active Indicator Beam */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Header: Number before H3 and Icon on the Right */}
                <div className="relative z-10 flex items-start justify-between gap-3.5 mb-3.5">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="font-mono text-[13px] font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg shrink-0 mt-0.5 shadow-xs">
                      {factor.num}
                    </span>
                    <h3 className="font-display text-[19px] sm:text-[20px] leading-[1.28] font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                      {factor.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-surface-container/70 border border-surface-container-highest/60 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary group-hover:scale-105 transition-all duration-300 shrink-0 shadow-xs">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                </div>

                {/* Body Text */}
                <p className="relative z-10 font-sans text-[14.5px] sm:text-[15px] leading-[23px] text-secondary font-medium">
                  {factor.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing Line */}
        <p className="font-sans text-[15px] sm:text-[16px] leading-[26px] text-secondary mt-12 lg:mt-16 text-center max-w-4xl mx-auto">
          To see how this plays out in a specific project, read how{" "}
          <Link
            href="/services/custom-erp-development"
            className="text-primary hover:underline font-medium"
          >
            a custom ERP project
          </Link>{" "}
          runs, how{" "}
          <Link
            href="/services/custom-crm-development"
            className="text-primary hover:underline font-medium"
          >
            a custom CRM project
          </Link>{" "}
          runs, how{" "}
          <Link
            href="/services/web-and-mobile-application-development"
            className="text-primary hover:underline font-medium"
          >
            a web and mobile app project
          </Link>{" "}
          runs, or how{" "}
          <Link
            href="/services/legacy-software-modernization"
            className="text-primary hover:underline font-medium"
          >
            a legacy modernization project
          </Link>{" "}
          runs.
        </p>
      </div>
    </section>
  );
}
