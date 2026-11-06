import { Database, ShieldCheck, Cpu, RefreshCw, CheckCircle2, Lock } from "lucide-react";

export default function WebMobileArchitecture() {
  const pillars = [
    {
      num: "01",
      icon: Database,
      title: "Works 100% Offline (Auto-Syncs When Reconnected)",
      subtitle: "Staff continue working without interruptions, even in dead zones",
      body: "Staff can record orders, take customer signatures, and snap photos even with zero mobile signal. The app saves everything on the phone safely and automatically uploads to your main database the moment internet returns - without any lost entries.",
      bullets: [
        "Saves all orders, photos, and signatures locally on the device",
        "Automatic background upload the moment 4G or Wi-Fi is detected",
        "Zero data loss during cellular dropouts or basement work"
      ]
    },
    {
      num: "02",
      icon: RefreshCw,
      title: "Live Instant Updates Across Web & Mobile",
      subtitle: "Changes appear on office screens in under a second",
      body: "No more constant manual page refreshing. When an order status updates or a field worker completes a delivery, the change appears on office desktop screens in under a second.",
      bullets: [
        "Instant push notifications and order status alerts",
        "Fast screen response times designed to work on low-cost Android phones",
        "Low mobile data consumption optimized for patchy cellular networks"
      ]
    },
    {
      num: "03",
      icon: Cpu,
      title: "Single Shared Rulebook for Web, Android & iPhone",
      subtitle: "Identical pricing, taxes, and discounts on every screen",
      body: "Instead of writing pricing, discounts, and GST logic three separate times in different programming languages, we write the rules once. Your website and mobile apps always calculate identical numbers.",
      bullets: [
        "One central source for pricing, GST, and customer fields",
        "Update business rules instantly without waiting for app store reviews",
        "Zero discrepancy between what a rep quotes and what the bill shows"
      ]
    },
    {
      num: "04",
      icon: Lock,
      title: "Clear, Role-Based Staff Permissions",
      subtitle: "Each employee sees only what they need to do their job",
      body: "Field reps only see the daily routes and customers assigned to them. Store managers see their store's figures, and business owners see overall performance across all branches - with a complete history of every change.",
      bullets: [
        "Simple, secure logins with role-specific dashboards",
        "Prevents unauthorized employees from viewing sensitive financial margins",
        "Permanent history log of all order modifications and status updates"
      ]
    }
  ];

  return (
    <section id="featured-systems" className="relative border-b border-surface-container-highest py-20 lg:py-28 overflow-hidden">
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
            Core Architecture of Custom Web Application &amp; Mobile App Development.
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            Every screen is engineered so field staff and desktop operators complete tasks in seconds, while management gets live visibility with zero data conflicts.
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
