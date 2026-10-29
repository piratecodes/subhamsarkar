import { Scale, Calendar, ShieldCheck, ArrowDown, FileText, CheckCircle2, Lock, Terminal } from "lucide-react";

export default function TermsHero({ settings }) {
  const contactAddress = settings?.address || "Kolkata, West Bengal, India";

  return (
    <div className="relative border-b border-surface-container-highest/60 bg-transparent overflow-hidden">
      
      {/* Background Architectural Blueprint Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-70">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in srgb, var(--color-primary) 18%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 18%, transparent) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        ></div>
        
        {/* Soft centered radial auroras */}
        <div className="absolute w-150 h-150 bg-primary/10 rounded-full blur-[140px] pointer-events-none -translate-y-12 animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute w-112.5 h-112.5 bg-secondary/10 rounded-full blur-[100px] pointer-events-none translate-y-16"></div>
      </div>

      {/* Decorative Technical Corner Crosshairs */}
      <div className="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-primary/30 pointer-events-none"></div>
      <div className="absolute top-6 right-6 w-5 h-5 border-t-2 border-r-2 border-primary/30 pointer-events-none"></div>
      <div className="absolute bottom-6 left-6 w-5 h-5 border-b-2 border-l-2 border-primary/30 pointer-events-none"></div>
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b-2 border-r-2 border-primary/30 pointer-events-none"></div>

      <section className="relative z-10 w-full container px-4 lg:px-12 pt-28 pb-16 flex flex-col items-center text-center">
        
        {/* Top Technical Metadata Header */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary font-display text-[11px] font-bold uppercase tracking-widest shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <Scale className="w-3.5 h-3.5 ml-0.5" />
            <span>TERMS &amp; CONDITIONS</span>
          </div>

          <span className="font-mono text-[11px] font-semibold text-secondary/80 bg-surface-container/60 px-3 py-1.5 rounded-full border border-surface-container-highest/60">
            LAST UPDATED: OCTOBER 2026
          </span>
        </div>

        {/* Main Title & Subtitle */}
        <div className="max-w-5xl space-y-4 mb-8">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-on-surface">
            Terms &amp; Conditions
          </h1>
          <p className="font-sans text-base sm:text-lg md:text-xl text-secondary max-w-4xl mx-auto leading-relaxed">
            The foundational operational agreement, intellectual property standards, and professional engagement protocols governing <strong className="text-on-surface">subhamsarkar.dev</strong>.
          </p>
        </div>

        {/* Metadata Telemetry Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-display tracking-wider uppercase text-secondary mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-container-lowest/90 border border-surface-container-highest/70 backdrop-blur-md shadow-sm">
            <span className="text-secondary/70">DOMAIN:</span>
            <strong className="text-on-surface font-mono">subhamsarkar.dev</strong>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-container-lowest/90 border border-surface-container-highest/70 backdrop-blur-md shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span className="text-secondary/70">EFFECTIVE &amp; UPDATED:</span>
            <strong className="text-on-surface">OCTOBER 2026</strong>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-container-lowest/90 border border-surface-container-highest/70 backdrop-blur-md shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span className="text-secondary/70">JURISDICTION:</span>
            <strong className="text-on-surface">{contactAddress}</strong>
          </div>
        </div>

        {/* Centered Preamble Card */}
        <div className="w-full max-w-5xl p-6 sm:p-7 rounded-2xl bg-surface-container-lowest/90 border border-surface-container-highest/80 backdrop-blur-xl shadow-sm text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>
          <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary relative z-10">
            These Terms and Conditions (the &ldquo;Terms&rdquo;) govern your use of <strong className="text-on-surface">subhamsarkar.dev</strong> (the &ldquo;Website&rdquo;), operated by <strong className="text-on-surface">Subham Sarkar</strong> (&ldquo;I&rdquo;, &ldquo;me&rdquo;, &ldquo;my&rdquo;), a software architect and ERP/CRM developer based in {contactAddress}. By using the Website you agree to these Terms. If you do not agree, please do not use it.
          </p>
        </div>

        {/* Jump to TOC Button */}
        <div className="mt-8">
          <a
            href="#about-website"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container hover:bg-primary text-on-surface hover:text-on-primary font-display text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <span>Explore 16 Sections Below</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

      </section>
    </div>
  );
}
