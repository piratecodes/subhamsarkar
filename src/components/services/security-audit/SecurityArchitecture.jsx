import { ShieldCheck, Lock, Key, CheckCircle2, ShieldAlert, Cpu, FileCheck, Terminal } from "lucide-react";

export default function SecurityArchitecture() {
  const pillars = [
    {
      num: "01",
      icon: ShieldCheck,
      title: "Hands-On API & Login Security Inspection",
      subtitle: "Thorough testing of business logic, authentication, and database queries",
      body: "We test your application just like an ethical hacker would. We examine login sessions, password resets, token storage, URL parameter tampering, and form injections to discover real vulnerabilities before malicious actors do.",
      bullets: [
        "Checks all public and private API endpoints and input validation rules",
        "Tests session handling, password reset links, and authentication tokens",
        "Covers OWASP Top 10 vulnerabilities with verified proof-of-concept tests"
      ]
    },
    {
      num: "02",
      icon: Lock,
      title: "Lock Down Customer & Tenant Data",
      subtitle: "Enforcing data boundaries at the database engine level",
      body: "Security belongs in your database, not just frontend styling. We implement strict data access rules ensuring that no user, employee, or compromised link can ever view another customer's private invoices, contracts, or account balances.",
      bullets: [
        "Prevents horizontal privilege leaks (changing IDs in URLs to view other accounts)",
        "Clear permission rules: staff only view the exact records their role permits",
        "Least-privilege cloud server and database connection access"
      ]
    },
    {
      num: "03",
      icon: Key,
      title: "Smart Bot Defenses & Rate Limiting",
      subtitle: "Automatically blocks brute-force password attacks and form spam",
      body: "Protect your infrastructure from automated bot attacks and credential stuffing. We set up smart rate-limiters and IP filters that block attack scripts automatically without slowing down real, legitimate customers.",
      bullets: [
        "Stops attackers from guessing passwords or spamming OTP forms",
        "Prevents surprise cloud server bill spikes caused by bot traffic loops",
        "Protects checkout, registration, and inquiry forms from automated spam"
      ]
    },
    {
      num: "04",
      icon: FileCheck,
      title: "Ready-to-Merge Code Fixes & Attestation Report",
      subtitle: "Direct Pull Requests with code patches, not just a useless PDF",
      body: "We do not leave you with a list of unsolved problems. I personally write and test the exact code patches required to fix every discovered issue, followed by a signed Security Attestation Report for your enterprise clients and investors.",
      bullets: [
        "Production-ready Pull Requests with code fixes and automated security tests",
        "Signed Attestation Report certifying verified closure of all findings",
        "Assistance with enterprise security questionnaires (SOC 2, ISO 27001 readiness)"
      ]
    }
  ];

  return (
    <section id="security-architecture" className="relative border-b border-surface-container-highest py-20 lg:py-28 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none z-0 animate-[floatAurora_24s_ease-in-out_infinite_alternate]"></div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 lg:mb-20 space-y-4">
          <div className="flex items-center gap-2 font-display text-[10.5px] leading-4 tracking-[0.15em] uppercase font-bold text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>HOW THE AUDIT WORKS // CORE CAPABILITIES</span>
          </div>
          <h2 className="font-display text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.12] tracking-[-0.02em] font-bold text-on-surface text-balance">
            Real Defense, Built Directly into Your Code.
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[26px] text-secondary text-balance">
            Every step is designed to expose real weaknesses, write permanent code remediations, and prove security compliance to your clients.
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
