import Link from "next/link";
import { 
  WifiOff, 
  Smartphone, 
  Layers, 
  Zap, 
  ArrowRight, 
  Sparkles,
  AlertTriangle
} from "lucide-react";

export default function ProgressiveWebApps() {
  const cards = [
    {
      icon: WifiOff,
      title: "Offline-first app development",
      line: "Your team keeps working with no signal. Changes are saved on the device and synced when the connection returns, with clear rules when two people edit the same record."
    },
    {
      icon: Smartphone,
      title: "Installable PWA, one build",
      line: "A PWA opens from a link, installs to the home screen, and runs on Android, iPhone, tablets and laptops."
    },
    {
      icon: Layers,
      title: "Add a PWA to Existing Software",
      line: (
        <>
          Add PWA features to an existing website, or connect a new PWA to a{" "}
          <Link 
            href="/services/custom-erp-development" 
            className="text-primary hover:underline font-medium"
          >
            custom ERP
          </Link>{" "}
          or a{" "}
          <Link 
            href="/services/custom-crm-development" 
            className="text-primary hover:underline font-medium"
          >
            custom CRM
          </Link>
          , or to older software.
        </>
      )
    },
    {
      icon: Zap,
      title: "Fast, findable and supported",
      line: "Server rendering for pages that must rank on Google, clean admin dashboards, and support after launch."
    }
  ];

  const steps = [
    { num: "01", text: "Understand the workflow and what must work offline" },
    { num: "02", text: "Design the data and sync rules" },
    { num: "03", text: "Build in phases" },
    { num: "04", text: "Test on real phones in the worst signal" },
    { num: "05", text: "Launch and support" }
  ];

  return (
    <section id="progressive-web-apps" className="relative border-b border-surface-container-highest py-20 lg:py-28 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none z-0 animate-[floatAurora_24s_ease-in-out_infinite_alternate]"></div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
        
        {/* 1. Heading block: H2 plus intro paragraph */}
        <div className="max-w-3xl mb-14 lg:mb-20 space-y-4">
          <div className="flex items-center gap-2 font-display text-[10.5px] leading-4 tracking-[0.15em] uppercase font-bold text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <Sparkles className="w-3.5 h-3.5" />
            <span>OFFLINE-FIRST ARCHITECTURE // CROSS-PLATFORM</span>
          </div>
          <h2 className="font-display text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.12] tracking-[-0.02em] font-bold text-on-surface text-balance">
            Progressive Web App Development and Offline Sync
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            PWA development services for founders and growing businesses that need software to run fast on any device, even with a weak signal. The work covers offline-first design, data sync, installable apps and links to your ERP or CRM, from one build for Android, iPhone, tablets and laptops, led directly by the architect from first call to launch.
          </p>
        </div>

        {/* 2. A 2x2 grid of four cards (one column on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 lg:mb-24">
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
                    {card.line}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. A two-column row (stacked on mobile): left "Built around your problem" text, right a bordered callout card in the amber accent */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16 lg:mb-24">
          <div className="lg:col-span-7 bg-surface-container-lowest/80 backdrop-blur-xs rounded-2xl p-6 sm:p-8 lg:p-10 border border-surface-container-highest shadow-xs flex flex-col justify-center space-y-4">
            <h3 className="font-display text-[22px] sm:text-[26px] lg:text-[28px] leading-[1.2] tracking-[-0.02em] font-bold text-on-surface">
              Technology Stack, Chosen for Your Project
            </h3>
            <p className="font-sans text-[15px] sm:text-[16px] leading-[26px] text-secondary">
              There is no fixed stack. Next.js when search visibility matters, Vite with React when it does not. Spring or NestJS for the backend, depending on scale. FastAPI for AI features. PostgreSQL, MySQL, MongoDB or Cassandra to suit your data.
            </p>
          </div>

          <div className="lg:col-span-5 bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-center space-y-4 shadow-xs relative overflow-hidden">
            <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400 font-display text-[11px] leading-4 uppercase tracking-[0.12em] font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>PLATFORM BEHAVIOR</span>
            </div>
            <h3 className="font-display text-[20px] sm:text-[22px] leading-[1.25] font-bold text-on-surface">
              PWA on iPhone: What Works and What Does Not
            </h3>
            <p className="font-sans text-[14.5px] sm:text-[15px] leading-[24px] text-secondary">
              Safari on iPhone does not support Background Sync, so an iPhone app syncs while it is open and online. Installation is manual through the Share menu, and push notifications work only after the app is added to the home screen. The Apple App Store does not accept PWAs as standalone apps, while Google Play accepts them as a Trusted Web Activity. For constant background location or Bluetooth hardware, a native app may be the better choice.
            </p>
          </div>
        </div>

        {/* 4. A 5-step process stepper (horizontal on desktop, vertical on mobile) */}
        <div className="mb-16 lg:mb-24">
          <div className="max-w-2xl mb-8 lg:mb-12">
            <h3 className="font-display text-[24px] sm:text-[28px] lg:text-[32px] leading-[1.2] tracking-[-0.02em] font-bold text-on-surface">
              How a PWA Development Project Runs
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 relative">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="group relative bg-surface-container-lowest/70 backdrop-blur-md border border-surface-container-highest/50 hover:border-primary/40 rounded-2xl p-5 lg:p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Corner Subtle Aurora */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/5 blur-[20px] rounded-full pointer-events-none group-hover:bg-primary/15 transition-colors duration-500"></div>

                {/* Top Active Indicator Beam */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div>
                  <div className="relative z-10 flex items-center justify-between gap-3 mb-3.5">
                    <span className="font-mono text-[12px] font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg shrink-0 shadow-xs">
                      STEP {step.num}
                    </span>
                    <span className="text-secondary/50 font-mono text-xs font-semibold">{idx + 1}/5</span>
                  </div>

                  <p className="relative z-10 font-sans text-[14px] sm:text-[14.5px] leading-[22px] font-medium text-on-surface">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="font-sans text-[14px] leading-[22px] text-secondary text-center mt-6">
            Timeline and pricing depend on scope, so every project starts with a short conversation.
          </p>
        </div>

      </div>
    </section>
  );
}

