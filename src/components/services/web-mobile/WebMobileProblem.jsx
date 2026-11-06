import { WifiOff, AlertTriangle, CopyX, Layers } from "lucide-react";

export default function WebMobileProblem() {
  const problems = [
    {
      icon: WifiOff,
      badge: "THE OFFLINE CRASH",
      title: "Apps Freeze the Moment Mobile Signal Drops",
      description:
        "Field workers, delivery staff, and sales reps enter basements, warehouses, or areas with poor cellular reception. Standard cloud-only apps freeze, show error screens, or lose filled forms - forcing staff back to writing on paper receipts.",
      impact: "Lost customer orders, delayed dispatches, and frustrated field staff."
    },
    {
      icon: CopyX,
      badge: "DOUBLE-ENTRY HEADACHE",
      title: "Staff Spend Hours Re-Typing Phone Orders into Desktops",
      description:
        "Field agents collect orders and customer details on mobile phones, but the main office billing and stock system lives on a desktop web browser. Office staff waste hours every week manually cross-checking and re-typing entries.",
      impact: "Expensive human typing errors, delayed customer invoices, and inaccurate stock numbers."
    },
    {
      icon: Layers,
      badge: "INCONSISTENT RULES",
      title: "iPhone, Android & Website Showing Different Prices",
      description:
        "When an iPhone app, Android app, and website are built as separate projects by different teams, simple updates like new discount rules, tax rates, or pricing tiers must be coded 3 separate times. Eventually, rules drift apart and customers get quoted different amounts.",
      impact: "Angry customer disputes, inconsistent bills, and doubled maintenance costs."
    }
  ];

  return (
    <section className="relative border-b border-surface-container-highest py-20 lg:py-28 overflow-hidden">
      {/* Subtle Grid Accent */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-18 space-y-4">
          <div className="flex items-center gap-2 font-display text-[10.5px] leading-4 tracking-[0.15em] uppercase font-bold text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>OPERATIONAL BOTTLENECK // THE REALITY</span>
          </div>
          <h2 className="font-display text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.12] tracking-[-0.02em] font-bold text-on-surface text-balance">
            Where Fragmented Web and Mobile Apps Break Daily Operations.
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            Building a simple brochure website is easy. Engineering custom web applications and native mobile apps that synchronize smoothly across warehouses and patchy cellular connections is where generic agencies fail.
          </p>
        </div>

        {/* 3 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((prob, i) => {
            const Icon = prob.icon;
            return (
              <div
                key={i}
                className="bg-surface-container-lowest/80 backdrop-blur-xs rounded-2xl p-6 lg:p-8 border border-surface-container-highest shadow-xs flex flex-col justify-between group hover:border-primary/40 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1.5 relative overflow-hidden"
              >
                {/* Active Hover Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-surface-container text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-display text-[9px] leading-3 tracking-widest uppercase font-bold text-secondary bg-surface-container px-2 py-1 rounded">
                      {prob.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-[20px] leading-[1.25] tracking-[-0.01em] font-bold text-on-surface pt-1 group-hover:text-primary transition-colors duration-300">
                    {prob.title}
                  </h3>

                  <p className="font-sans text-[14px] leading-[22px] text-secondary">
                    {prob.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-container-highest/60 bg-surface-container-low/40 -mx-6 -mb-6 p-6 lg:-mx-8 lg:-mb-8 lg:p-8 rounded-b-2xl">
                  <span className="font-display text-[9.5px] leading-4 tracking-wider uppercase font-bold text-primary block mb-1">
                    REAL BUSINESS IMPACT
                  </span>
                  <p className="font-sans text-[12.5px] leading-[18px] text-on-surface font-medium">
                    {prob.impact}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
