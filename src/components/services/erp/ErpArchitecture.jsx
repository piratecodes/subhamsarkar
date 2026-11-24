import { Database, ShieldCheck, Cpu, RefreshCw, CheckCircle2, Lock, Layers, Receipt } from "lucide-react";

export default function ErpArchitecture() {
  const pillars = [
    {
      num: "01",
      icon: Database,
      title: "Audit-Ready Accounting and Transaction Records",
      subtitle: "Every entry recorded, with a permanent history of changes",
      body: "Financial figures and stock movements follow double-entry accounting rules. Finalized bills are locked against quiet edits or deletion, and every adjustment records who made it, when and why, so your books stay reliable.",
      bullets: [
        "No secret edits: a permanent history of every change, date and user",
        "Clean books: daily income and expense totals you can check against your bank",
        "CA and tax ready: clean records exported for audits and tax filing"
      ]
    },
    {
      num: "02",
      icon: Layers,
      title: "Live Stock Tracking Across Godowns and Stores",
      subtitle: "Know what you actually have in stock, in every location",
      body: "When a customer buys an item at a counter, on your website or through a field representative, stock updates across all branches in real time. Warehouse staff get clear packing lists, and transfers between godowns update automatically.",
      bullets: [
        "Stock synced across retail counters, godowns and online orders",
        "Helps prevent double-selling during rush hours and festival sales",
        "Barcode and QR scanning where your operation needs it"
      ]
    },
    {
      num: "03",
      icon: Cpu,
      title: "Smart Reordering & Supplier Purchase Tracking",
      subtitle: "Know when and how much to reorder before stock runs out",
      body: "Take the guesswork out of purchasing. The system tracks how fast each product sells and alerts you before stock runs low, preparing purchase order drafts with the right supplier prices automatically.",
      bullets: [
        "Automatic low-stock alerts based on real daily sales speed",
        "3-Way verification: matches Purchase Orders, Delivery Challans, and Bills",
        "Custom approval rules for discounts and large vendor payments"
      ]
    },
    {
      num: "04",
      icon: Receipt,
      title: "Accounting Software and GST Connections",
      subtitle: "Entries flow across without double typing",
      body: "Your accountants can keep using the tools they know. Where the accounting software offers a way to connect, invoices and tax entries can flow into it directly, which reduces manual typing and copy-paste errors. The exact connections are agreed per project.",
      bullets: [
        "Connections to accounting software such as Tally or Zoho Books, where required",
        "GST e-invoice support where your business needs it",
        "Regular checks that the ERP and your accounts agree"
      ]
    }
  ];

  return (
    <section id="erp-architecture" className="relative border-b border-surface-container-highest py-20 lg:py-28 overflow-hidden">
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
            Core Pillars of Custom ERP Software Development.
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            Every screen is engineered so your staff can perform daily tasks fast without making errors, while you get complete control and real-time visibility over every rupee, warehouse item, and dispatch.
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
