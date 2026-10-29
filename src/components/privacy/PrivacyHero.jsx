import { ShieldCheck, Calendar, ArrowDown, Lock, Scale } from "lucide-react";

export default function PrivacyHero({ settings }) {
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
        <div className="absolute w-112 h-112 bg-secondary/10 rounded-full blur-[100px] pointer-events-none translate-y-16"></div>
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
            <Lock className="w-3.5 h-3.5 ml-0.5" />
            <span>PRIVACY &amp; DATA PROTECTION</span>
          </div>

          <span className="font-mono text-[11px] font-semibold text-secondary/80 bg-surface-container/60 px-3 py-1.5 rounded-full border border-surface-container-highest/60">
            LAST UPDATED: OCTOBER 2026
          </span>
        </div>

        {/* Main Title & Subtitle */}
        <div className="max-w-5xl space-y-4 mb-8">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-on-surface">
            Privacy Policy
          </h1>
          <p className="font-sans text-base sm:text-lg md:text-xl text-secondary max-w-4xl mx-auto leading-relaxed">
            How personal information, client telemetry, and engineering communications are collected, safeguarded, and respected across <strong className="text-on-surface">subhamsarkar.dev</strong>.
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
            This Privacy Policy explains what personal information <strong className="text-on-surface">Subham Sarkar</strong> (&ldquo;I&rdquo;, &ldquo;me&rdquo;, &ldquo;my&rdquo;) collects when you use <strong className="text-on-surface">subhamsarkar.dev</strong> (the &ldquo;Website&rdquo;), why it is collected, who sees it, how long it is kept, and what choices you have. I have written it in plain language on purpose. If anything is unclear, write to me at the address in Section 15.
          </p>
        </div>

        {/* Jump to TOC Button */}
        <div className="mt-8">
          <a
            href="#who-i-am"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container hover:bg-primary text-on-surface hover:text-on-primary font-display text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <span>Explore 15 Sections Below</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

      </section>
    </div>
  );
}
