import { ShieldCheck, MessageSquare, Zap, FileText, CheckCircle2, Lock, Users, GitBranch } from "lucide-react";

export default function CrmArchitecture() {
  const pillars = [
    {
      num: "01",
      icon: Zap,
      title: "Automatic WhatsApp and SMS Replies to New Leads",
      subtitle: "Lead capture from your website, Google, Meta and WhatsApp",
      body: "Never lose a high-intent buyer to a slow response. When someone fills in an enquiry form or messages your business, they can receive an automatic, personalized WhatsApp greeting with your catalog or booking link, while the lead is assigned to the right sales rep on duty.",
      bullets: [
        "WhatsApp Business Cloud API and transactional SMS integration, where required",
        "Fair lead distribution: round-robin, by territory or by deal size",
        "Notifications sent to reps on their phones and laptops"
      ]
    },
    {
      num: "02",
      icon: MessageSquare,
      title: "Complete Customer History in One Timeline",
      subtitle: "Every message, email and quotation in one place",
      body: "Say goodbye to scattered client records. Every lead and customer gets one searchable profile that logs email exchanges, WhatsApp chats, quote revisions and visit notes, and call records where call integration is set up, so any team member can step in with full context.",
      bullets: [
        "Full conversation history stays with the company when a sales rep leaves",
        "Central file storage for customer KYC documents, contracts, drawings and photos",
        "Automated follow-up reminders so no deal slips through"
      ]
    },
    {
      num: "03",
      icon: FileText,
      title: "PDF Quotations with Custom Pricing and GST",
      subtitle: "Professional quotes in minutes, with online acceptance",
      body: "Create error-free quotations in minutes instead of half an hour in Excel. The system applies your tiered volume discounts, state GST rates and approval limits, then sends a branded PDF to the customer with an online acceptance link.",
      bullets: [
        "MManager approval for quotes above standard discount limits",
        "Online acceptance from the customer's phone",
        "An order created automatically once the client accepts"
      ]
    },
    {
      num: "04",
      icon: Users,
      title: "Unlimited Staff Logins for Your Whole Team",
      subtitle: "Give every team member access without seat limits",
      body: "The CRM is hosted and managed in a production environment chosen for your requirements. Add your sales reps, telecallers, support staff, warehouse dispatchers and billing team without seat limits, backed by clear role-based access rules.",
      bullets: [
        "Unlimited users, contacts and deal stages",
        "Territory permissions: reps see only leads assigned to their area",
        "Audit logging of who viewed, edited or exported customer records"
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
            Every screen is engineered around your team's real sales workflow. Here is how a custom lead management system turns enquiries into paying customers faster.
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
