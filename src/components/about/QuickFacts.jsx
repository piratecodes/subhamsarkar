import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Sparkles } from "lucide-react";
import logo from "@/assets/navlogo.png";

export default function QuickFacts({ settings }) {
  const linkClass =
    "font-medium text-primary hover:text-on-surface underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors duration-200";

  // Dynamic social links with fallbacks
  const linkedinUrl = settings?.linkedin || "https://linkedin.com/in/subhamsarkar99";
  const githubUrl = settings?.github || "https://github.com/piratecodes";
  const instagramUrl = settings?.instagram || "https://instagram.com/subhamsarkar99";
  const twitterUrl = settings?.twitter || settings?.x;

  const facts = [
    {
      label: "Name",
      value: "Subham Sarkar",
    },
    {
      label: "Role",
      value: "Software Architect & Full-Stack Developer",
    },
    {
      label: "Based in",
      value: "Kolkata, West Bengal, India",
    },
    {
      label: "Works with",
      value: "Businesses across India, and remote clients worldwide",
    },
    {
      label: "Languages",
      value: "English, Bengali, Hindi",
    },
    {
      label: "Builds",
      node: (
        <>
          <Link href="/services/custom-erp-development" className={linkClass}>
            Custom ERP
          </Link>{" "}
          and{" "}
          <Link href="/services/custom-crm-development" className={linkClass}>
            CRM systems
          </Link>
          ,{" "}
          <Link
            href="/services/web-and-mobile-application-development"
            className={linkClass}
          >
            web and mobile applications
          </Link>
          ,{" "}
          <Link
            href="/services/business-process-automation"
            className={linkClass}
          >
            AI automation
          </Link>
        </>
      ),
    },
    {
      label: "Also offers",
      node: (
        <>
          <Link
            href="/services/legacy-software-modernization"
            className={linkClass}
          >
            Legacy software modernization
          </Link>
          ,{" "}
          <Link
            href="/services/application-security-audit"
            className={linkClass}
          >
            application security audit
          </Link>
        </>
      ),
    },
    {
      label: "Background",
      value: "Began in cybersecurity as a penetration tester at 17",
    },
    {
      label: "Experience",
      value: "10+ years in software and security",
    },
    {
      label: "Replies",
      value: "Typically within 12 hours",
    },
  ];

  return (
    <section className="relative w-full py-10 lg:py-14">
      <div className="w-full container px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Dossier Card Container */}
        <div className="relative p-6 sm:p-8 lg:p-10 rounded-2xl backdrop-blur-xs border border-surface-container-highest shadow-sm hover:border-primary/20 transition-all duration-500 overflow-hidden">
          
          {/* Subtle Top Glow Sheen */}
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/40 to-transparent"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Left Column (Editorial Identity & Quotable Summary) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              
              <div className="flex flex-col space-y-5">
                <div className="flex items-center gap-2 font-display text-[10px] sm:text-[11px] leading-4 tracking-[0.12em] font-semibold text-primary uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20 shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.1)] w-fit">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span>AT A GLANCE</span>
                </div>

                <h2 className="font-display text-[26px] sm:text-[30px] lg:text-[34px] leading-[1.15] tracking-[-0.02em] font-bold text-on-surface">
                  Quick Facts About Subham Sarkar
                </h2>

                {/* Quotable AI / Search Snippet */}
                <div className="relative border-l-2 border-primary/60 pl-4 py-2 bg-primary/[0.02] rounded-r-xl">
                  <p className="font-sans text-[14px] sm:text-[15px] leading-[1.7] text-secondary font-medium">
                    Subham Sarkar is a software architect and full-stack developer based in Kolkata, India, who builds custom ERP, CRM, web and mobile systems and AI automation for businesses across India.
                  </p>
                </div>

                {/* Backend-Connected Social Links */}
                <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-[11px] font-semibold tracking-wider text-secondary">
                  <span className="text-[10px] uppercase font-bold text-primary tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    ELSEWHERE:
                  </span>

                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 ${linkClass}`}
                      aria-label="LinkedIn Profile"
                    >
                      <FaLinkedin className="w-3.5 h-3.5 shrink-0" />
                      <span>LinkedIn</span>
                    </a>
                  )}

                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 ${linkClass}`}
                      aria-label="GitHub Profile"
                    >
                      <FaGithub className="w-3.5 h-3.5 shrink-0" />
                      <span>GitHub</span>
                    </a>
                  )}

                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 ${linkClass}`}
                      aria-label="Instagram Profile"
                    >
                      <FaInstagram className="w-3.5 h-3.5 shrink-0" />
                      <span>Instagram</span>
                    </a>
                  )}

                  {twitterUrl && (
                    <a
                      href={twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 ${linkClass}`}
                      aria-label="X Twitter Profile"
                    >
                      <FaXTwitter className="w-3.5 h-3.5 shrink-0" />
                      <span>X</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Bottom-Left: Landscape Logo Watermark & Ambient Corner Glare (Desktop only; omitted on mobile where space is naturally compact) */}
              <div className="hidden lg:flex relative items-end pt-8 pointer-events-none select-none">
                {/* Warm Ambient Radial Glare */}
                <div className="absolute -bottom-14 -left-14 w-80 h-80 rounded-full bg-primary/15 blur-3xl pointer-events-none animate-pulse" />
                
                {/* Unconstrained Landscape Studio Logo Watermark (2.18:1 aspect ratio) */}
                <div className="relative w-64 xl:w-72 h-auto opacity-10 transition-opacity duration-700">
                  <Image
                    src={logo}
                    alt="Subham Sarkar"
                    className="w-full h-auto object-contain filter grayscale contrast-125"
                    priority={false}
                  />
                </div>
              </div>

            </div>

            {/* Right Column (High-Precision Specification Ledger) */}
            <div className="lg:col-span-7 flex flex-col divide-y divide-surface-container-highest/70 text-sm">
              {facts.map((fact, idx) => (
                <div
                  key={idx}
                  className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 group"
                >
                  <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-bold text-secondary uppercase shrink-0 sm:w-32">
                    {fact.label}
                  </span>
                  <div className="font-sans text-[14px] sm:text-[14.5px] leading-relaxed text-on-surface font-medium sm:text-right">
                    {fact.node ? fact.node : fact.value}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
