import { ShieldCheck, Cpu, Database, CheckCircle2, Lock, Bot, FileSearch, UserCheck } from "lucide-react";

export default function AiArchitecture() {
  const pillars = [
    {
      num: "01",
      icon: Lock,
      title: "Private AI Where Your Data Requires It",
      subtitle: "Sensitive records stay inside a controlled environment",
      body: "Where privacy matters most, I run private open-weight AI models, such as Llama or Mistral, in a dedicated environment, so client emails, invoices and phone numbers are not sent to public chatbots or used to train third-party models. If you already use a provider such as OpenAI or Claude and are comfortable with it, the same workflow can use it with the same checks.",
      bullets: [
        "Your records stay within a defined private boundary",
        "Open software and open models where suitable, without per-query fees to public AI providers",
        "Caching to keep high-volume document pipelines responsive"
      ]
    },
    {
      num: "02",
      icon: Cpu,
      title: "Validation Rules That Catch Wrong Numbers",
      subtitle: "The AI works inside exact rules and never decides alone",
      body: "AI is used as a smart reader, never as an unmonitored decision maker. Every output is checked against predefined rules, and if the system is unsure of an invoice total or a GST number, it flags the record for a person to review instead of guessing.",
      bullets: [
        "ation: totals, dates and names must match expected formats",
        "Database pre-checks before any new record is written",
        "Automatic review alerts whenever confidence is below a set threshold"
      ]
    },
    {
      num: "03",
      icon: FileSearch,
      title: "Invoice and Document Automation for Messy Real-World Files",
      subtitle: "Tables, amounts and vendor details pulled into clean records",
      body: "Turn piles of paperwork into clean digital records. The system reads receipts, phone photos, scanned vendor bills and long multi-page contracts, and extracts line items, tax numbers and dates for review.",
      bullets: [
        "Reads skewed phone photos and scanned PDFs",
        "Table stitching across multi-page supplier statements",
        "Matches incoming bills to open purchase orders in your database"
      ]
    },
    {
      num: "04",
      icon: UserCheck,
      title: "Human-in-the-Loop Approval for Important Decisions",
      subtitle: "Routine tasks happen automatically; big actions require a human click",
      body: "Automation should assist your team, not replace its judgment. Everyday reading, ticket tagging and email drafting run automatically, while a high-value payment, vendor disbursement or contract signing pauses and sends a card to a manager for approval on WhatsApp or Slack.",
      bullets: [
        "One-tap approval buttons on WhatsApp, Telegram or Slack",
        "A complete history of the AI's reasoning and the approving manager",
        "Easy undo if an automated entry needs"
      ]
    }
  ];

  return (
    <section id="ai-architecture" className="relative border-b border-surface-container-highest py-20 lg:py-28 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none z-0 animate-[floatAurora_24s_ease-in-out_infinite_alternate]"></div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-20 space-y-4">
          <div className="flex items-center gap-2 font-display text-[10.5px] leading-4 tracking-[0.15em] uppercase font-bold text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>HOW THE SYSTEM WORKS // CORE CAPABILITIES</span>
          </div>
          <h2 className="font-display text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.12] tracking-[-0.02em] font-bold text-on-surface text-balance">
            How Business Process Automation Is Built to Stay Accurate and Controlled
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            Every workflow is designed to remove manual clerical work while keeping your records confidential, accurate and under control.
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
