"use client";

import Link from "next/link";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Plus, Minus, HelpCircle, ShieldCheck } from "lucide-react";

const migrationFaqs = [
  {
    topic: "WHAT IT IS",
    question: "What is legacy software modernization?",
    answer:
      "It means updating or replacing software that has become slow, fragile or hard to change, so that it fits how the business works today. That can mean connecting it to new tools, improving it in stages, rebuilding it or replacing it, depending on what the system needs.",
  },
  {
    topic: "SERVICES",
    question: "What do legacy software modernization services include?",
    answer:
      "An assessment of the system and its data, a plan that compares the options, the build itself, data cleaning and migration, testing against the old system, a staged switch of users and retirement of the old system. If the old process is mainly spreadsheets and manual steps, [business process automation services](/services/business-process-automation) can be part of the plan.",
  },
  {
    topic: "REPLACE OR MODERNIZE",
    question: "Should I replace my legacy system or modernize it?",
    answer:
      "It depends on the system. Some can stay and be connected to new tools, some can be improved in stages, and some are better rebuilt or replaced. The assessment at the start compares these routes for your case. The section on [keeping, improving or rebuilding](#legacy-modernization-options) sets out when each fits.",
  },
  {
    topic: "REWRITE VS REFACTOR",
    question: "What is the difference between rewriting and refactoring legacy software?",
    answer:
      "Refactoring improves the structure of existing code without changing what it does, usually in small steps. A rewrite builds the system again from scratch. Many projects do not need a full rewrite at once, and modules can be rebuilt one at a time while the rest keeps running.",
  },
  {
    topic: "DOWNTIME",
    question: "Can legacy software be modernized without downtime?",
    answer:
      "The aim is minimal disruption, and the work is planned for it. The old and new systems run side by side, users move in stages during normal working hours and a rollback plan is prepared before each stage. No project can honestly promise that nothing will ever go wrong, which is why every stage has a way back.",
  },
  {
    topic: "DATA MIGRATION",
    question: "How is data moved from an old system or Excel sheets to a modern database?",
    answer:
      "Records are cleaned first, for example duplicates, missing dates and broken references. They are then loaded by scripts that can be run again safely, and counts and totals are compared with the source. A log records every correction, so you can see what changed.",
  },
  {
    topic: "ROLLBACK",
    question: "What happens if something goes wrong during the switch to the new system?",
    answer:
      "A rollback plan is prepared before each stage, so users can be moved back to the old system while the issue is fixed. Because users move in small groups first, a problem is found while few people are affected.",
  },
  {
    topic: "ACCURACY CHECK",
    question: "How do you check that the new software calculates the same as the old one?",
    answer:
      "Both systems process the same inputs, and automated checks compare totals, calculations and record counts. Differences are investigated and fixed before users switch. This greatly reduces risk, and the old system stays available during the staged switch because every system has edge cases.",
  },
  {
    topic: "SYSTEM TYPES",
    question: "Which kinds of old systems can be modernized?",
    answer:
      "Old desktop software, outdated websites, spreadsheet-run processes, and older ERP or CRM systems. If the old system is an ERP or CRM that no longer fits, a [custom CRM built around your customer data](/services/custom-crm-development) is one option. For old web apps, see [web and mobile application development](/services/web-and-mobile-application-development).",
  },
  {
    topic: "COST",
    question: "How much does legacy software modernization cost?",
    answer:
      "Pricing is scoped per project after a short conversation. The main drivers are the size of the system, the quality of its data, how well it is documented, the connections to other tools, the approach chosen and how long old and new must run together. The [section on cost and timeline](#legacy-cost-and-timeline) sets these out.",
  },
  {
    topic: "TIMELINE",
    question: "How long does legacy software modernization take?",
    answer:
      "It depends on scope, so the timeline is agreed after a short conversation. The phases are an assessment, parallel sync setup, shadow testing and a staged switch with 30 days of support after launch. A small internal tool and a system the whole business runs on take very different amounts of time.",
  },
  {
    topic: "DATA & HOSTING",
    question: "Who owns the data and hosting after legacy software modernization?",
    answer:
      "Your business data is yours, and you always have access to it. I design, build and host the new system, so the servers, source code and admin credentials stay under my management. I choose the environment, a VPS or a cloud platform, to suit your requirements, and I stay responsible for the system in production. If you need specific terms, raise them in the first conversation.",
  },
];

// Turns "[text](/path)" or "[text](#anchor)" in an answer into an internal next/link.
function renderAnswer(text) {
  const nodes = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    nodes.push(
      <Link
        key={`${match[2]}-${match.index}`}
        href={match[2]}
        className="text-primary underline underline-offset-2 hover:no-underline"
      >
        {match[1]}
      </Link>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

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
              Modernizing old software means being clear on data safety, cutover risk, rollback and cost. Every scenario is explained before work begins.
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
              <Disclosure key={faq.question} as="div" defaultOpen={idx === 0} className="group">
                {({ open }) => (
                  <div className="bg-surface-container-lowest/80 backdrop-blur-xs rounded-2xl border border-surface-container-highest transition-all duration-300 hover:border-primary/40 overflow-hidden">
                    <div className="relative p-6 flex items-start justify-between gap-4">
                      <div className="space-y-1.5 pr-2">
                        <span className="font-display text-[9.5px] leading-3 tracking-widest uppercase font-bold text-primary">
                          {faq.topic}
                        </span>
                        <h3 className="font-display text-[17px] sm:text-[18px] leading-[24px] font-bold text-on-surface group-hover:text-primary transition-colors">
                          <DisclosureButton className="block cursor-pointer text-left after:absolute after:inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                            {faq.question}
                          </DisclosureButton>
                        </h3>
                      </div>
                      <div
                        aria-hidden="true"
                        className="p-2 rounded-xl bg-surface-container text-secondary group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0 mt-1"
                      >
                        {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </div>

                    <DisclosurePanel
                      unmount={false}
                      className={`px-6 pb-6 pt-2 font-sans text-[14.5px] leading-[24px] text-secondary border-t border-surface-container-highest/60 mt-1 ${open ? 'block' : 'hidden'}`}
                    >
                      <p>{renderAnswer(faq.answer)}</p>
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
