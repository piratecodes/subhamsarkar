"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Plus, Minus, HelpCircle, ShieldCheck } from "lucide-react";

const migrationFaqs = [
  {
    topic: "ZERO DOWNTIME",
    question: "How do you guarantee zero business downtime during legacy system migration?",
    answer:
      "We run your legacy software and the modern cloud system in parallel using dual-writing architecture. Orders, payments, and inventory adjustments are saved to both systems concurrently. We verify that all numbers match 100% before gradually shifting users over, ensuring zero operational downtime."
  },
  {
    topic: "ROLLBACK SAFETY",
    question: "What safety rollbacks exist during software modernization if an unexpected issue arises?",
    answer:
      "Because live traffic is shifted progressively (5%, 25%, 50%, 100%) and both databases stay continuously synchronized in real time, we maintain an instant fallback mechanism. If an edge case appears, traffic can be diverted back to the legacy system in under 10 milliseconds with zero lost records."
  },
  {
    topic: "DATA MIGRATION",
    question: "How do you handle data migration from legacy systems and Excel sheets to a modern cloud database?",
    answer:
      "We engineer automated, idempotent ETL (Extract, Transform, Load) pipelines that sanitize, deduplicate, and validate historical records against strict modern database schemas before insertion, eliminating corrupted or missing legacy entries."
  },
  {
    topic: "INCREMENTAL REFACTORING",
    question: "Can you modernize legacy software without rewriting the entire codebase from scratch?",
    answer:
      "Yes. Using the industry-standard Strangler-Fig pattern, we extract and replace outdated modules one by one. Your business experiences immediate performance gains and new capabilities without waiting months for a risky, ground-up rewrite."
  },
  {
    topic: "ACCURACY AUDIT",
    question: "How do you verify that the new software calculates identically to the old one?",
    answer:
      "We run automated shadow-testing on live requests. Both systems process identical inputs in the background, and outputs are diff-checked in real time to guarantee that complex tax logic, pricing tiers, and ledger balances match perfectly."
  }
];

export default function MigrationFAQ() {
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
              Upgrading core software requires total confidence in transaction integrity, rollback procedures, and continuous customer availability. Every scenario is accounted for before execution begins.
            </p>

            <div className="p-5 rounded-2xl bg-surface-container border border-surface-container-highest space-y-3">
              <div className="flex items-center gap-2 text-primary font-display text-[12px] leading-4 tracking-wider uppercase font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>DIRECT ARCHITECTURAL CONSULTATION</span>
              </div>
              <p className="font-sans text-[13px] leading-5 text-secondary">
                Have an aging monolith or slow database that needs a safe upgrade? Speak directly with Subham Sarkar.
              </p>
            </div>
          </div>

          {/* Right Accordion Column */}
          <div className="lg:col-span-7 space-y-4">
            {migrationFaqs.map((faq, idx) => (
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
