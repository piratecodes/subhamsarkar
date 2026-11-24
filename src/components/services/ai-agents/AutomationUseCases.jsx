import Link from "next/link";
import { 
  FileText, 
  FileSearch, 
  Inbox, 
  UserCheck, 
  RefreshCw, 
  BarChart3, 
  Workflow 
} from "lucide-react";

export default function AutomationUseCases() {
  const cases = [
    {
      num: "01",
      icon: FileText,
      title: "Invoice and bill processing",
      body: "Read vendor bills, check totals and tax numbers and match them to purchase orders."
    },
    {
      num: "02",
      icon: FileSearch,
      title: "Contract and document intake",
      body: "Pull key dates, parties and amounts from contracts and scanned records."
    },
    {
      num: "03",
      icon: Inbox,
      title: "Customer inquiry triage",
      body: "Sort incoming emails and messages by topic and urgency and route them to the right person."
    },
    {
      num: "04",
      icon: UserCheck,
      title: "Approvals on WhatsApp or Slack",
      body: "Send a one-tap approval card to a manager before a payment or other key action goes ahead."
    },
    {
      num: "05",
      icon: RefreshCw,
      title: "Multi-system data entry",
      body: "Stop re-typing the same record into several tools by connecting them."
    },
    {
      num: "06",
      icon: BarChart3,
      title: "Reports and reminders",
      body: "Collect figures from several sources and send routine reports and follow-ups on schedule."
    }
  ];

  return (
    <section 
      id="automation-use-cases" 
      aria-labelledby="automation-use-cases-title" 
      className="relative border-b border-surface-container-highest py-14 lg:py-20 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-primary/5 rounded-full blur-[130px] pointer-events-none z-0 animate-[floatAurora_24s_ease-in-out_infinite_alternate]"></div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 lg:mb-14 space-y-3.5">
          <div className="flex items-center gap-2 font-display text-[10.5px] leading-4 tracking-[0.15em] uppercase font-bold text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <Workflow className="w-3.5 h-3.5" />
            <span>WHAT CAN BE AUTOMATED // USE CASES</span>
          </div>
          <h2 
            id="automation-use-cases-title"
            className="font-display text-[30px] sm:text-[38px] lg:text-[44px] leading-[1.14] tracking-[-0.02em] font-bold text-on-surface text-balance"
          >
            Business Process Automation Use Cases: What Can Be Automated
          </h2>
          <p className="font-sans text-[15.5px] sm:text-[17px] leading-[25px] text-secondary text-balance">
            The best processes to automate are repetitive, high-volume and governed by clear rules. These are the most common starting points.
          </p>
        </div>

        {/* 6 Use Case Tiles (1 col mobile, 2 col sm, 3 col lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((item, idx) => {
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
        <p className="font-sans text-[14.5px] sm:text-[15.5px] leading-[25px] text-secondary mt-10 lg:mt-12 text-center max-w-3xl mx-auto">
          Not every process needs AI, and a fixed rule is often enough. As your processes grow, a{" "}
          <Link 
            href="/services/custom-erp-development" 
            className="text-primary hover:underline font-medium"
          >
            custom ERP system
          </Link>{" "}
          or a{" "}
          <Link 
            href="/services/custom-crm-development" 
            className="text-primary hover:underline font-medium"
          >
            custom CRM built around your customer data
          </Link>{" "}
          can bring them together. For a smaller starting point, read{" "}
          <Link 
            href="/insights/ai-automation-for-small-business" 
            className="text-primary hover:underline font-medium"
          >
            AI automation for a small business
          </Link>
          .
        </p>

      </div>
    </section>
  );
}

