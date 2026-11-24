import Link from "next/link";
import { 
  Users, 
  Smartphone, 
  WifiOff, 
  Link2, 
  Database, 
  Cloud, 
  ArrowRight, 
  Sliders 
} from "lucide-react";

export default function CostAndTimeline() {
  const factors = [
    {
      num: "01",
      icon: Users,
      title: "Users and roles",
      body: "How many people use the system, and what each role can see or do."
    },
    {
      num: "02",
      icon: Smartphone,
      title: "Devices and channels",
      body: "Web only, or web plus an installable app, and whether an admin panel is needed."
    },
    {
      num: "03",
      icon: WifiOff,
      title: "How much must work offline",
      body: "Viewing data offline is far simpler than saving, editing and syncing records with rules for conflicts."
    },
    {
      num: "04",
      icon: Link2,
      title: "Integrations",
      body: "Connections to your ERP, CRM, accounting software or other systems, and what those systems allow."
    },
    {
      num: "05",
      icon: Database,
      title: "Existing software and data",
      body: "Whether you start fresh or bring in data and processes from older tools."
    },
    {
      num: "06",
      icon: Cloud,
      title: "Scale and hosting",
      body: "Expected user numbers, data volume and the cloud environment the system runs on."
    }
  ];

  return (
    <section 
      id="cost-and-timeline" 
      aria-labelledby="cost-and-timeline-title" 
      className="relative border-b border-surface-container-highest py-20 lg:py-28 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none z-0 animate-[floatAurora_24s_ease-in-out_infinite_alternate]"></div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-18 space-y-4">
          <div className="flex items-center gap-2 font-display text-[10.5px] leading-4 tracking-[0.15em] uppercase font-bold text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <Sliders className="w-3.5 h-3.5" />
            <span>SCOPING // WHAT SHAPES THE PROJECT</span>
          </div>
          <h2 
            id="cost-and-timeline-title"
            className="font-display text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.12] tracking-[-0.02em] font-bold text-on-surface text-balance"
          >
            What Shapes Web and Mobile App Development Cost and Timeline
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            Pricing is scoped per project after a short conversation, because the same idea can be a small build or a large one. These are the factors that move cost and timeline the most.
          </p>
        </div>

        {/* 6 Factor Tiles (1 col mobile, 2 col sm, 3 col lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {factors.map((factor, idx) => {
            const Icon = factor.icon;
            return (
              <div
                key={idx}
                className="bg-surface-container-lowest/80 backdrop-blur-xs rounded-2xl p-6 lg:p-8 border border-surface-container-highest shadow-xs flex flex-col justify-between group hover:border-primary/40 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1.5 relative overflow-hidden"
              >
                {/* Active Indicator Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-surface-container-highest/60 pb-3">
                    <span className="font-display text-[11px] leading-4 tracking-widest uppercase font-bold text-primary flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      {factor.num}
                    </span>
                    <div className="p-2 rounded-xl bg-surface-container text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300 shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display text-[18px] sm:text-[20px] leading-[1.3] font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                    {factor.title}
                  </h3>

                  <p className="font-sans text-[14.5px] sm:text-[15px] leading-[23px] text-secondary">
                    {factor.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Line & CTA Button */}
        <div className="mt-14 lg:mt-18 text-center max-w-3xl mx-auto space-y-6">
          <p className="font-sans text-[15px] sm:text-[16px] leading-[26px] text-secondary">
            Every project starts with a short conversation about these points, and the scope follows from it. For one common case, read{" "}
            <Link 
              href="/insights/progressive-web-app-development-cost" 
              className="text-primary hover:underline font-medium"
            >
              &quot;what drives the cost of a PWA&quot;
            </Link>
            .
          </p>

          <div className="pt-2 flex justify-center">
            <Link
              href="/contact?service=web-mobile"
              className="group/btn relative inline-flex items-center gap-2.5 bg-primary hover:bg-primary-container text-on-primary font-display text-[12.5px] leading-4 tracking-[0.1em] font-bold uppercase px-8 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 overflow-hidden"
            >
              <div className="absolute top-0 bottom-0 left-0 w-12 bg-white/20 -skew-x-12 animate-[buttonSheen_3s_infinite] pointer-events-none"></div>
              <span>Discuss Your App Requirements</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

