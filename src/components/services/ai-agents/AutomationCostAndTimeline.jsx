import Link from "next/link";
import { 
  FileText, 
  Layers, 
  ShieldCheck, 
  Lock, 
  Database, 
  Server, 
  ArrowRight, 
  Sliders 
} from "lucide-react";

export default function AutomationCostAndTimeline() {
  const factors = [
    {
      num: "01",
      icon: FileText,
      title: "Documents and volume",
      body: "How many documents or requests, and how messy they are."
    },
    {
      num: "02",
      icon: Layers,
      title: "Systems connected",
      body: "The number of tools, databases and apps involved, and what each allows."
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Accuracy and approval rules",
      body: "How strict the checks must be and who approves what."
    },
    {
      num: "04",
      icon: Lock,
      title: "Privacy needs",
      body: "Whether sensitive records need a private AI environment."
    },
    {
      num: "05",
      icon: Database,
      title: "Process and data quality",
      body: "How clear the process is today and how clean the data is."
    },
    {
      num: "06",
      icon: Server,
      title: "Running costs after launch",
      body: "Hosting, or AI provider fees if one is used, plus monitoring."
    }
  ];

  return (
    <section 
      id="automation-cost-and-timeline" 
      aria-labelledby="automation-cost-and-timeline-title" 
      className="relative border-b border-surface-container-highest py-14 lg:py-20 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-primary/5 rounded-full blur-[130px] pointer-events-none z-0 animate-[floatAurora_24s_ease-in-out_infinite_alternate]"></div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 lg:mb-14 space-y-3.5">
          <div className="flex items-center gap-2 font-display text-[10.5px] leading-4 tracking-[0.15em] uppercase font-bold text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <Sliders className="w-3.5 h-3.5" />
            <span>SCOPING // WHAT SHAPES THE PROJECT</span>
          </div>
          <h2 
            id="automation-cost-and-timeline-title"
            className="font-display text-[30px] sm:text-[38px] lg:text-[44px] leading-[1.14] tracking-[-0.02em] font-bold text-on-surface text-balance"
          >
            What Shapes Business Process Automation Cost and Timeline
          </h2>
          <p className="font-sans text-[15.5px] sm:text-[17px] leading-[25px] text-secondary text-balance">
            Pricing is scoped per project after a short conversation, because one workflow and a company-wide automation are very different jobs. These factors move cost and timeline the most.
          </p>
        </div>

        {/* 6 Factor Tiles (1 col mobile, 2 col sm, 3 col lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {factors.map((factor, idx) => {
            const Icon = factor.icon;
            return (
              <div
                key={idx}
                className="bg-surface-container-lowest/80 backdrop-blur-xs rounded-2xl p-5 lg:p-6 border border-surface-container-highest shadow-xs flex flex-col justify-between group hover:border-primary/40 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Active Indicator Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b border-surface-container-highest/60 pb-3">
                    <span className="font-display text-[10.5px] leading-4 tracking-widest uppercase font-bold text-primary flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      {factor.num}
                    </span>
                    <div className="p-2 rounded-xl bg-surface-container text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300 shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display text-[18px] sm:text-[19px] leading-[1.3] font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                    {factor.title}
                  </h3>

                  <p className="font-sans text-[14px] sm:text-[14.5px] leading-[22px] text-secondary">
                    {factor.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Line & CTA Button */}
        <div className="mt-10 lg:mt-14 text-center max-w-3xl mx-auto space-y-6">
          <p className="font-sans text-[14.5px] sm:text-[15.5px] leading-[25px] text-secondary">
            Every project starts with a short conversation about these points. For ideas on what to automate first, read{" "}
            <Link 
              href="/insights/ai-agents-for-business" 
              className="text-primary hover:underline font-medium"
            >
              how AI agents work in a business
            </Link>
            .
          </p>

          <div className="pt-1 flex justify-center">
            <Link
              href="/contact?service=ai-agents"
              className="group/btn relative inline-flex items-center gap-2.5 bg-primary hover:bg-primary-container text-on-primary font-display text-[12.5px] leading-4 tracking-[0.1em] font-bold uppercase px-8 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 overflow-hidden"
            >
              <div className="absolute top-0 bottom-0 left-0 w-12 bg-white/20 -skew-x-12 animate-[buttonSheen_3s_infinite] pointer-events-none"></div>
              <span>Discuss Your AI Automation</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

