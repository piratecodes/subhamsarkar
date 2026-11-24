import Link from "next/link";
import {
  Boxes,
  Users,
  Smartphone,
  Workflow,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  Compass
} from "lucide-react";

export default function ChooseAService() {
  const services = [
    {
      num: "01",
      icon: Boxes,
      title: "Stock, billing and branches out of sync",
      body: "Spreadsheets that never match across godowns, stores and accounts.",
      linkText: "See how a custom ERP is built",
      href: "/services/custom-erp-development"
    },
    {
      num: "02",
      icon: Users,
      title: "Leads and customer chats scattered",
      body: "Enquiries waiting in inboxes and history lost when staff leave.",
      linkText: "See how a custom CRM works",
      href: "/services/custom-crm-development"
    },
    {
      num: "03",
      icon: Smartphone,
      title: "Field staff with weak signal",
      body: "Teams that need to record work with no internet.",
      linkText: "See web and mobile app options",
      href: "/services/web-and-mobile-application-development"
    },
    {
      num: "04",
      icon: Workflow,
      title: "Repetitive paperwork and approvals",
      body: "Hours lost typing invoices and sorting requests.",
      linkText: "See what can be automated",
      href: "/services/business-process-automation"
    },
    {
      num: "05",
      icon: RefreshCw,
      title: "Old software nobody dares touch",
      body: "Slow systems and fragile databases that hold the business back.",
      linkText: "See how old software is modernized",
      href: "/services/legacy-software-modernization"
    },
    {
      num: "06",
      icon: ShieldCheck,
      title: "Customer data to protect",
      body: "Worry about leaks, bots or client security reviews.",
      linkText: "See how a security audit works",
      href: "/services/application-security-audit"
    }
  ];

  return (
    <section
      id="choose-a-service"
      aria-labelledby="choose-a-service-title"
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
            <span>WHERE TO START // CHOOSE A SERVICE</span>
          </div>
          <h2
            id="choose-a-service-title"
            className="font-display text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.12] tracking-[-0.02em] font-bold text-on-surface text-balance"
          >
            Which Software Development Service Do You Need?
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            Start with the problem that costs you most. Each problem below points to the service that addresses it.
          </p>
        </div>

        {/* 6 Cards Grid (1 col mobile, 2 col sm, 3 col lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-surface-container-lowest/80 backdrop-blur-xs rounded-2xl p-6 lg:p-8 border border-surface-container-highest shadow-xs flex flex-col justify-between group hover:border-primary/40 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1.5 relative overflow-hidden"
              >
                {/* Active Indicator Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-surface-container-highest/60 pb-3">
                    <span className="font-display text-[10px] sm:text-[10.5px] leading-3 sm:leading-4 tracking-widest uppercase font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      {item.num}
                    </span>
                    <div className="p-2 rounded-xl bg-surface-container text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300 shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display text-[18px] sm:text-[20px] leading-[1.3] font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="font-sans text-[14.5px] sm:text-[15px] leading-[23px] text-secondary">
                    {item.body}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-surface-container-highest/60">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-primary hover:text-on-surface transition-colors duration-300 font-display text-[12.5px] leading-4 tracking-[0.04em] font-bold group/link"
                  >
                    <span>{item.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Line */}
        <p className="font-sans text-[15px] sm:text-[16px] leading-[26px] text-secondary mt-12 lg:mt-16 text-center max-w-3xl mx-auto">
          Not sure which fits? Describe your situation on a free call and you will get an honest view of where to start. Read{" "}
          <Link
            href="/insights"
            className="text-primary hover:underline font-medium"
          >
            the insights library for buyers
          </Link>{" "}
          for guides on cost, comparisons and planning.
        </p>
      </div>
    </section>
  );
}
