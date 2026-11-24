import Link from "next/link";
import { Scan, Terminal, ShieldCheck, Compass } from "lucide-react";

export default function SecurityAuditOptions() {
  const options = [
    {
      num: "01",
      icon: Scan,
      title: "Vulnerability scan",
      body: "Software checks your application for known weaknesses and produces a list. It is quick and useful as a first pass, but it can miss logic flaws, such as one customer being able to view another customer's records."
    },
    {
      num: "02",
      icon: Terminal,
      title: "Penetration test",
      body: "A person actively tries to break into your application and proves what can really be exploited. It shows how an attacker could get in and what they could reach."
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Security audit with fixes",
      body: "This service combines hands-on testing with a review of logins, APIs, permissions and server access. Findings are explained in plain language, fixes come as code for your developers to review, and the fixes are retested."
    }
  ];

  return (
    <section
      id="audit-vs-pentest"
      aria-labelledby="audit-vs-pentest-title"
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
            <span>DECISION GUIDE // WHAT TO BUY</span>
          </div>
          <h2
            id="audit-vs-pentest-title"
            className="font-display text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.12] tracking-[-0.02em] font-bold text-on-surface text-balance"
          >
            Security Audit vs Penetration Test vs Vulnerability Scan: Which Do You Need?
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            These three are often confused, and the right choice depends on what you need to know and who will read the result.
          </p>
        </div>

        {/* 3 Cards Grid (1 col mobile, 3 col md) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {options.map((option, idx) => {
            const Icon = option.icon;
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
                      {option.num}
                    </span>
                    <h3 className="font-display text-[19px] sm:text-[20px] leading-[1.28] font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                      {option.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-surface-container/70 border border-surface-container-highest/60 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary group-hover:scale-105 transition-all duration-300 shrink-0 shadow-xs">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                </div>

                {/* Body Text */}
                <p className="relative z-10 font-sans text-[14.5px] sm:text-[15px] leading-[23px] text-secondary font-medium">
                  {option.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing Line */}
        <p className="font-sans text-[15px] sm:text-[16px] leading-[26px] text-secondary mt-12 lg:mt-16 text-center max-w-3xl mx-auto">
          Building something new?{" "}
          <Link
            href="/services/web-and-mobile-application-development"
            className="text-primary hover:underline font-medium"
          >
            Web and mobile application development
          </Link>{" "}
          can include security from the start. Running old software? It often carries extra risk, and{" "}
          <Link
            href="/services/legacy-software-modernization"
            className="text-primary hover:underline font-medium"
          >
            legacy software modernization
          </Link>{" "}
          can address it.
        </p>
      </div>
    </section>
  );
}
