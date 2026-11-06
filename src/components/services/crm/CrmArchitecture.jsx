import { ShieldCheck, MessageSquare, Zap, FileText, CheckCircle2, Lock, Users, GitBranch } from "lucide-react";

export default function CrmArchitecture() {
  const pillars = [
    {
      num: "01",
      icon: Zap,
      title: "5-Second WhatsApp & SMS Auto-Replies to New Leads",
      subtitle: "Instant lead capture from your website, Google, Meta, and WhatsApp",
      body: "Never lose a high-intent buyer to delayed responses. When someone fills out an inquiry form or messages your business, they receive an immediate personalized WhatsApp greeting with your catalog or booking link, while the lead is assigned to the right sales rep on duty.",
      bullets: [
        "Official WhatsApp Business Cloud API & transactional SMS integration",
        "Fair lead distribution rules: round-robin, by territory, or by deal size",
        "Instant notification pings pushed to reps on their mobile phones and laptops"
      ]
    },
    {
      num: "02",
      icon: MessageSquare,
      title: "Complete Customer History in One Timeline",
      subtitle: "Every call recording, message, email, and quotation in one place",
      body: "Say goodbye to scattered client records. Every lead and customer gets a single, searchable profile that automatically logs call recordings, email exchanges, WhatsApp chats, quote revisions, and visit notes so any team member can step in with full context.",
      bullets: [
        "Full conversation history preserved even when individual sales reps resign",
        "Centralized files: stores customer KYC docs, contracts, drawings, and photos",
        "Automated follow-up task reminders so no deal ever slips through the cracks"
      ]
    },
    {
      num: "03",
      icon: FileText,
      title: "Instant PDF Quotes with Custom Pricing & GST",
      subtitle: "Generate professional quotes in 30 seconds with digital signing",
      body: "Generate error-free quotations in seconds instead of wasting half an hour on Excel. The system calculates your tiered volume discounts, state GST rates, and approval limits automatically, sending a branded PDF directly to the customer with an online acceptance link.",
      bullets: [
        "Manager approval triggers for quotes exceeding standard discount limits",
        "One-click digital signature acceptance directly from the customer's phone",
        "Automatic order creation the moment the client approves the quotation"
      ]
    },
    {
      num: "04",
      icon: Users,
      title: "Unlimited Staff Logins & Zero Monthly Fees",
      subtitle: "Give your entire team access without paying ₹15,000/month per seat",
      body: "We deploy the CRM on your company's own private cloud. Add your sales reps, telecallers, support staff, warehouse dispatchers, and billing team with zero additional monthly software fees, backed by clear role-based access rules.",
      bullets: [
        "Unlimited users, contacts, and deal stages with zero recurring license costs",
        "Territory permissions: reps only see leads assigned to their area",
        "Full audit logging showing who viewed, edited, or exported customer records"
      ]
    }
  ];

  return (
    <section id="crm-architecture" className="relative border-b border-surface-container-highest py-20 lg:py-28 overflow-hidden">
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
            Core Pillars of Custom CRM Software Development.
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            Every screen is engineered around your team's real sales workflow. Here is how our custom lead management system turns inquiries into paying customers faster.
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
