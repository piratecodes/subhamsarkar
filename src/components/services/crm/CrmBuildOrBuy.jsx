import Link from "next/link";
import { PackageCheck, Sliders, Link2, Compass } from "lucide-react";

export default function CrmBuildOrBuy() {
  const options = [
    {
      num: "01",
      icon: PackageCheck,
      title: "A readymade CRM may be enough",
      body: "Choose this when your sales process is standard, your team is small and you mainly need to track contacts and deals. A ready-made product is quick to start and needs little setup."
    },
    {
      num: "02",
      icon: Sliders,
      title: "A custom CRM fits better",
      body: "Choose this when your sales process, quotation rules or lead sources are unusual, when many people in different roles need access, or when the CRM must work together with stock, billing or other systems."
    },
    {
      num: "03",
      icon: Link2,
      title: "Connect rather than replace",
      body: "Choose this when your current CRM works but sits apart from your other tools. Where it offers a way to connect, links to WhatsApp, quotations or your accounts can be built around it."
    }
  ];

  return (
    <section
      id="crm-vs-readymade"
      aria-labelledby="crm-vs-readymade-title"
      className="relative border-b border-surface-container-highest py-20 lg:py-28 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none z-0 animate-[floatAurora_24s_ease-in-out_infinite_alternate]"></div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-18 space-y-4">
          <div className="flex items-center gap-2 font-display text-[10.5px] leading-4 tracking-[0.15em] uppercase font-bold text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <Compass className="w-3.5 h-3.5" />
            <span>DECISION GUIDE // BUILD OR BUY</span>
          </div>
          <h2
            id="crm-vs-readymade-title"
            className="font-display text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.12] tracking-[-0.02em] font-bold text-on-surface text-balance"
          >
            Custom CRM or a Readymade CRM? How to Decide
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            There is no single right answer. The better choice depends on how standard your sales process is and how your team works.
          </p>
        </div>

        {/* 3 Cards Grid (1 col mobile, 3 col md) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {options.map((option, idx) => {
            const Icon = option.icon;
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
                      {option.num}
                    </span>
                    <h3 className="font-display text-[19px] sm:text-[20px] leading-[1.28] font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                      {option.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-surface-container/70 border border-surface-container-highest/60 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary group-hover:scale-105 transition-all duration-300 shrink-0 shadow-xs">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                </div>

                {/* Body Text */}
                <p className="relative z-10 font-sans text-[14.5px] sm:text-[15px] leading-[23px] text-secondary font-medium">
                  {option.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing Line */}
        <p className="font-sans text-[15px] sm:text-[16px] leading-[26px] text-secondary mt-12 lg:mt-16 text-center max-w-3xl mx-auto">
          Which route suits you is part of the first conversation. If you are comparing options, read{" "}
          <Link
            href="/insights/salesforce-alternatives-small-teams-india"
            className="text-primary hover:underline font-medium"
          >
            Salesforce alternatives for small teams in India
          </Link>
          . When your needs grow beyond sales, a{" "}
          <Link
            href="/services/custom-erp-development"
            className="text-primary hover:underline font-medium"
          >
            custom ERP system
          </Link>{" "}
          can bring accounting, stock and payroll into the same picture, and{" "}
          <Link
            href="/services/business-process-automation"
            className="text-primary hover:underline font-medium"
          >
            business process automation
          </Link>{" "}
          can connect the tools you already use.
        </p>
      </div>
    </section>
  );
}
