export default function WorkCaseStudiesHeading() {
  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-title"
      className="w-full container px-4 lg:px-12 pt-12 pb-8 lg:pt-16 lg:pb-10 relative z-10"
    >
      <div className="flex flex-col gap-3 max-w-3xl">
        <div className="font-display text-[10px] sm:text-[11px] leading-4 tracking-[0.2em] font-bold uppercase text-primary">
          CASE STUDIES // SELECTED WORK
        </div>
        <h2
          id="case-studies-title"
          className="font-display text-[32px] lg:text-[40px] leading-[1.1] tracking-[-0.02em] font-bold text-on-surface text-balance"
        >
          Custom Software Case Studies: ERP, CRM and Web Platforms
        </h2>
        <p className="font-sans text-[14px] lg:text-[15px] leading-[24px] lg:leading-[26px] tracking-[-0.01em] font-normal text-secondary">
          Production case studies across custom web platforms, CRM, and enterprise systems, each documented with the operational problem, architectural approach, and verified outcome.
        </p>
      </div>
    </section>
  );
}
