import { CheckCircle2, GitCommit, Calendar, Rocket, Shield } from "lucide-react";

export default function AiProcess() {
  const steps = [
    {
      phase: "PHASE 01",
      duration: "STAGE 01",
      icon: GitCommit,
      title: "Workflow & Data Boundary Audit",
      description:
        "We review your daily office tasks, sample documents (invoices, contracts, emails), and decision paths. We identify sensitive customer records and set up strict private boundaries.",
      deliverable: "Agent Specification Blueprint, Privacy Boundary Matrix, and Test Corpus"
    },
    {
      phase: "PHASE 02",
      duration: "STAGE 02",
      icon: Calendar,
      title: "Private Inference & Schema Engineering",
      description:
        "We set up private self-hosted AI servers on your cloud with zero data logging. We build strict validation rules so the AI only executes approved database actions.",
      deliverable: "Private Inference Sandbox + Validated Function Calling Suite"
    },
    {
      phase: "PHASE 03",
      duration: "STAGE 03",
      icon: Shield,
      title: "Document Reading & Stress Evaluation",
      description:
        "We test with hundreds of real messy documents - crumpled receipts, blurry phone photos, and multi-page invoices. We connect the instant WhatsApp and Slack approval buttons for managers.",
      deliverable: "Automated Ingestion Pipeline + Interactive Approval Gateway"
    },
    {
      phase: "PHASE 04",
      duration: "STAGE 04",
      icon: Rocket,
      title: "Production Deployment & 30-Day Hypercare",
      description:
        "We roll out the system live on your cloud servers. We set up live accuracy and cost monitoring, transfer 100% of the repository code, and provide 30 days of active support.",
      deliverable: "Full Git IP Transfer, Telemetry Dashboard, and 30-Day Post-Launch Support"
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
            How Your AI Automation Is Engineered &amp; Deployed
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            No endless meetings or opaque agency handoffs. You work directly with Subham Sarkar through distinct, reviewable milestones. Pacing and sprint allocation depend on your exact project scope and model requirements.
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

