import { CheckCircle2, GitCommit, Calendar, Rocket, Shield } from "lucide-react";

export default function CrmProcess() {
  const steps = [
    {
      phase: "PHASE 01",
      duration: "WEEKS 1-2",
      icon: GitCommit,
      title: "Sales Process & Ingestion Audit",
      description:
        "We review your current lead channels (Meta Ads, Google, website forms, WhatsApp) and sales stages. We map out qualification criteria, lead assignment rules, and instant notification triggers.",
      deliverable: "Pipeline Specification, Ingestion Architecture, and Wireframes"
    },
    {
      phase: "PHASE 02",
      duration: "WEEKS 3-4",
      icon: Calendar,
      title: "Pipeline & Messaging Engine Prototype",
      description:
        "We build the core CRM database, webhook listeners, and official WhatsApp Business Cloud API integration. Your team accesses a private staging environment to test live lead capture and automated response dispatch.",
      deliverable: "Private Staging Alpha + Automated WhatsApp/Email Test Sandbox"
    },
    {
      phase: "PHASE 03",
      duration: "WEEKS 5-6",
      icon: Shield,
      title: "Quotation Engine & Customer Timeline Build",
      description:
        "We build the custom quotation generator, branded PDF maker, digital signature approval, and the complete client interaction timeline.",
      deliverable: "Automated Quotation Engine + Tested E-Signature Flow"
    },
    {
      phase: "PHASE 04",
      duration: "WEEK 7+",
      icon: Rocket,
      title: "Contact Migration & Production Launch",
      description:
        "We clean up, deduplicate, and import your existing contact history from legacy software or spreadsheets into the new CRM. We run hands-on training for your sales reps and provide 30 days of direct support.",
      deliverable: "Full Git IP Transfer, Contact Migration, and 30-Day Warranty"
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
            How We Build Your CRM: Step by Step.
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

