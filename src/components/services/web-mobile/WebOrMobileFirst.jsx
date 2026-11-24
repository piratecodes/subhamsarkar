import Link from "next/link";
import { Monitor, Smartphone, Radio, Compass } from "lucide-react";

export default function WebOrMobileFirst() {
  const cards = [
    {
      icon: Monitor,
      title: "Start with a web app",
      body: (
        <>
          Choose this when your team works mostly at a desk, on dashboards, reports, approvals, billing and stock control. A web app opens in any browser, needs nothing to install and is usually the fastest route to a working system.
        </>
      ),
    },
    {
      icon: Smartphone,
      title: "Start with an installable PWA",
      body: (
        <>
          Choose this when your team works on the move or in low-signal areas, such as field staff and delivery teams. An{" "}
          <Link
            href="#pwa-offline-sync"
            className="text-primary hover:underline font-medium"
          >
            installable PWA
          </Link>{" "}
          installs from a link, runs on Android, iPhone, tablets and laptops from one build, and can keep working offline and sync when the connection returns.
        </>
      ),
    },
    {
      icon: Radio,
      title: "Consider a native app",
      body: (
        <>
          Choose this when your app needs constant background location, Bluetooth hardware or other deep device access. A PWA cannot do these reliably, particularly on iPhone, so a native app may be the better choice.
        </>
      ),
    },
  ];

  return (
    <section
      id="web-or-mobile-first"
      aria-labelledby="web-or-mobile-first-title"
      className="relative border-b border-surface-container-highest py-20 lg:py-28 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none z-0 animate-[floatAurora_24s_ease-in-out_infinite_alternate]"></div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-20 space-y-4">
          <div className="flex items-center gap-2 font-display text-[10.5px] leading-4 tracking-[0.15em] uppercase font-bold text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <Compass className="w-3.5 h-3.5" />
            <span>DECISION GUIDE // WHAT TO BUILD FIRST</span>
          </div>
          <h2
            id="web-or-mobile-first-title"
            className="font-display text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.12] tracking-[-0.02em] font-bold text-on-surface text-balance"
          >
            Web App or Mobile App First? How to Decide
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            Most businesses do not need to build everything at once. The right first build depends on where your team works and what the app must do on the device.
          </p>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-surface-container-lowest/80 backdrop-blur-xs rounded-2xl p-6 lg:p-8 border border-surface-container-highest shadow-xs flex flex-col justify-between group hover:border-primary/40 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 relative"
              >
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-[20px] sm:text-[22px] leading-[1.25] tracking-[-0.01em] font-bold text-on-surface">
                    {card.title}
                  </h3>
                  <p className="font-sans text-[15px] sm:text-[16px] leading-[25px] text-secondary">
                    {card.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Line with Link */}
        <p className="font-sans text-[15px] sm:text-[16px] leading-[26px] text-secondary mt-12 lg:mt-16 text-center max-w-3xl mx-auto">
          Not sure which fits? Read{" "}
          <Link
            href="/insights/web-app-vs-mobile-app-which-to-build-first"
            className="text-primary hover:underline font-medium"
          >
            &quot;which to build first, a web app or a mobile app&quot;
          </Link>
          , or describe your team&apos;s working day on a short call.
        </p>
      </div>
    </section>
  );
}

