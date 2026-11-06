"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Plus, Minus, HelpCircle, ShieldCheck } from "lucide-react";

const webMobileFaqs = [
  {
    topic: "CODEBASES & COST",
    question: "Why choose unified custom web application and mobile app development over maintaining separate codebases?",
    answer:
      "We architect unified backends and shared components using modern cross-platform engineering. Your web dashboards and mobile applications share identical business rules, validation schemas, and database types. This eliminates duplicate development costs and cuts long-term maintenance overhead by more than 50%."
  },
  {
    topic: "OFFLINE BEHAVIOR",
    question: "How does offline-first mobile app development function without cellular network?",
    answer:
      "The mobile app operates offline-first. It writes orders, timestamps, and photos directly into encrypted device storage (SQLite). Field staff experience zero freezes or error screens. The moment a signal is detected, a background worker automatically syncs the queue with your central cloud database without data conflicts."
  },
  {
    topic: "INTELLECTUAL PROPERTY",
    question: "Who owns the source code, database, and App Store accounts?",
    answer:
      "You do. 100%. All code is written directly into your company's private GitHub repository from day one. Mobile apps are signed and published under your official Apple Developer and Google Play Console accounts. Subham Sarkar never retains proprietary locks on your business logic or infrastructure."
  },
  {
    topic: "SOFTWARE INTEGRATIONS",
    question: "Can custom web and mobile applications integrate with Tally and existing enterprise software?",
    answer:
      "Yes. Invoices, receipts, inventory movements, and customer orders confirmed on a mobile screen or web portal flow straight into your existing accounting software (Tally, Zoho Books, QuickBooks) automatically via secure API bridges."
  },
  {
    topic: "POST-LAUNCH SUPPORT",
    question: "What happens if a bug occurs or Apple/Google updates their mobile operating system?",
    answer:
      "Every project includes a 30-day post-launch support and stabilization period where I personally monitor telemetry, resolve any edge cases, and ensure flawless daily operation across devices."
  }
];

export default function WebMobileFAQ() {
  return (
    <section className="relative border-b border-surface-container-highest py-20 lg:py-28 overflow-hidden">
      <div className="w-full container px-4 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Sticky Column */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32 self-start">
            <div className="space-y-4">
              <span className="font-display text-[10.5px] leading-4 tracking-[0.15em] uppercase font-bold text-primary px-3 py-1 bg-primary/10 border border-primary/20 rounded-md inline-flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5" />
                CLEAR ANSWERS // FAQS
              </span>
              <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.12] tracking-[-0.02em] font-bold text-on-surface text-balance">
                Common Questions, Answered Honestly.
              </h2>
            </div>
            
            <p className="font-sans text-[15px] sm:text-[16px] leading-[25px] text-secondary text-balance">
              Investing in core business software requires total clarity on code ownership, offline edge cases, and long-term costs. Every detail is transparent before work begins.
            </p>

            <div className="p-5 rounded-2xl bg-surface-container border border-surface-container-highest space-y-3">
              <div className="flex items-center gap-2 text-primary font-display text-[12px] leading-4 tracking-wider uppercase font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>DIRECT ARCHITECTURAL CONSULTATION</span>
              </div>
              <p className="font-sans text-[13px] leading-5 text-secondary">
                Have specific field worker challenges or multi-device requirements? Speak directly with Subham Sarkar.
              </p>
            </div>
          </div>

          {/* Right Accordion Column */}
          <div className="lg:col-span-7 space-y-4">
            {webMobileFaqs.map((faq, idx) => (
              <Disclosure key={idx} as="div" defaultOpen={idx === 0} className="group">
                {({ open }) => (
                  <div className="bg-surface-container-lowest/80 backdrop-blur-xs rounded-2xl border border-surface-container-highest transition-all duration-300 hover:border-primary/40 overflow-hidden">
                    <DisclosureButton className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer">
                      <div className="space-y-1.5 pr-2">
                        <span className="font-display text-[9.5px] leading-3 tracking-widest uppercase font-bold text-primary">
                          {faq.topic}
                        </span>
                        <h3 className="font-display text-[17px] sm:text-[18px] leading-[24px] font-bold text-on-surface group-hover:text-primary transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="p-2 rounded-xl bg-surface-container text-secondary group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0 mt-1">
                        {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </DisclosureButton>

                    <DisclosurePanel unmount={false} className={`px-6 pb-6 pt-2 font-sans text-[14.5px] leading-[24px] text-secondary border-t border-surface-container-highest/60 mt-1 ${open ? 'block' : 'hidden'}`}>
                      <p>{faq.answer}</p>
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
