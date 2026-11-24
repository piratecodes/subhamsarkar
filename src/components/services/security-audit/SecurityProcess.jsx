import { CheckCircle2, GitCommit, Calendar, Rocket, Shield } from "lucide-react";

export default function SecurityProcess() {
  const steps = [
    {
      phase: "PHASE 01",
      duration: "STAGE 01",
      icon: GitCommit,
      title: "Scope and Attack Surface Mapping",
      description:
        "We list all public and private API endpoints, login flows, database connections and cloud server roles, then map the attack paths most likely to matter for your stack.",
      deliverable: "A scope document, an attack surface list and agreed rules for testing"
    },
    {
      phase: "PHASE 02",
      duration: "STAGE 02",
      icon: Calendar,
      title: "Hands-On Penetration and Permission Testing",
      description:
        "We simulate real attacks against a staging copy or isolated clone where possible. We test for account takeover, URL ID tampering, session hijacking, parameter injection and API rate-limit bypasses.",
      deliverable: "A findings report with proof for each verified issue."
    },
    {
      phase: "PHASE 03",
      duration: "STAGE 03",
      icon: Shield,
      title: "Code Fixes and Edge Hardening",
      description:
        "I deliver code fixes as GitHub or GitLab Pull Requests for your developers to review, with database rules and automated regression tests where possible.",
      deliverable: "Remediation Pull Requests and security tests for review."
    },
    {
      phase: "PHASE 04",
      duration: "STAGE 04",
      icon: Rocket,
      title: "Retest and Verification Report",
      description:
        "We re-run the relevant security tests against your updated code to confirm each fix works, and document what is closed and what remains open.",
      deliverable: "A written retest report and 30 days of advisory support."
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
            How a Web Application Security Audit Runs, Step by Step
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            You work directly with the architect through clear, reviewable milestones. Timelines depend on your application's size and the number of issues found, and are agreed after a short conversation.
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
                    DELIVERABLE
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

