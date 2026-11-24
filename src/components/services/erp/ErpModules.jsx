import Link from "next/link";
import { 
  Receipt, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  BarChart3, 
  Boxes 
} from "lucide-react";

export default function ErpModules() {
  const modules = [
    {
      num: "01",
      icon: Receipt,
      title: "Accounting and billing",
      body: "Invoices, payments, ledgers and GST-ready records in one place."
    },
    {
      num: "02",
      icon: Package,
      title: "Inventory and warehouse",
      body: "Stock across godowns, stores and online orders, with transfers and reorder alerts."
    },
    {
      num: "03",
      icon: ShoppingCart,
      title: "Purchase and suppliers",
      body: "Purchase orders, delivery checks and vendor payments with approval rules."
    },
    {
      num: "04",
      icon: TrendingUp,
      title: "Sales, enquiries and complaints",
      body: "Orders, quotes and discount rules, plus a record of every enquiry and complaint, tracked until it is resolved."
    },
    {
      num: "05",
      icon: Users,
      title: "HR and payroll",
      body: "Staff records, attendance, leave and salary processing across branches."
    },
    {
      num: "06",
      icon: BarChart3,
      title: "Reports and branch visibility",
      body: "One dashboard of live figures across every branch and department."
    }
  ];

  return (
    <section 
      id="erp-modules" 
      aria-labelledby="erp-modules-title" 
      className="relative border-b border-surface-container-highest py-20 lg:py-28 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none z-0 animate-[floatAurora_24s_ease-in-out_infinite_alternate]"></div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-18 space-y-4">
          <div className="flex items-center gap-2 font-display text-[10.5px] leading-4 tracking-[0.15em] uppercase font-bold text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <Boxes className="w-3.5 h-3.5" />
            <span>ERP MODULES // WHAT IT CAN COVER</span>
          </div>
          <h2 
            id="erp-modules-title"
            className="font-display text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.12] tracking-[-0.02em] font-bold text-on-surface text-balance"
          >
            Custom ERP Modules: What a Custom ERP Can Cover
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            A custom ERP is built from the parts your business needs, and nothing is forced on you. These are the areas most often brought together in one system, and the scope is agreed per project.
          </p>
        </div>

        {/* 6 Module Tiles (1 col mobile, 2 col sm, 3 col lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {modules.map((item, idx) => {
            const Icon = item.icon;
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
                      {item.num}
                    </span>
                    <h3 className="font-display text-[19px] sm:text-[20px] leading-[1.28] font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-surface-container/70 border border-surface-container-highest/60 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary group-hover:scale-105 transition-all duration-300 shrink-0 shadow-xs">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                </div>

                {/* Body Text */}
                <p className="relative z-10 font-sans text-[14.5px] sm:text-[15px] leading-[23px] text-secondary font-medium">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing Line */}
        <p className="font-sans text-[15px] sm:text-[16px] leading-[26px] text-secondary mt-12 lg:mt-16 text-center max-w-3xl mx-auto">
          Most businesses start with the one or two areas causing the most pain and add the rest in phases. If customer tracking is the main need, see{" "}
          <Link
            href="/services/custom-crm-development"
            className="text-primary hover:underline font-medium"
          >
            custom CRM development
          </Link>
          . If you are weighing Tally against an ERP, read{" "}
          <Link
            href="/insights/tally-vs-erp-which-does-your-business-need"
            className="text-primary hover:underline font-medium"
          >
            Tally or an ERP: which fits your business
          </Link>
          . Systems you already use can also be connected through{" "}
          <Link
            href="/services/business-process-automation"
            className="text-primary hover:underline font-medium"
          >
            business process automation
          </Link>
          .
        </p>

      </div>
    </section>
  );
}

