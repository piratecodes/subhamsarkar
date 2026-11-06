"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Plus, Minus, HelpCircle, ShieldCheck } from "lucide-react";

const aiFaqs = [
  {
    topic: "BUSINESS AUTOMATION",
    question: "How can I automate my business operations using private AI agent development?",
    answer:
      "We identify repetitive clerical tasks - such as invoice data extraction, customer inquiry triage, and multi-system data entry. We then deploy private AI agents that execute these tasks reliably behind strict validation rules, reducing manual processing time by up to 80%."
  },
  {
    topic: "DATA PRIVACY",
    question: "How does an enterprise AI chatbot for business prevent sensitive data leaks to public models?",
    answer:
      "We deploy self-hosted open-weight models (like Llama 3 or Mistral) on your company's own private cloud servers, or connect through enterprise zero-retention private endpoints. Your customer lists, profit margins, and financial records never leave your secure infrastructure or get used to train public models."
  },
  {
    topic: "ACCURACY & RELIABILITY",
    question: "How do you eliminate AI hallucinations in business process automation?",
    answer:
      "We never allow raw AI outputs to write to your database directly. Every response is validated against strict JSON schemas. If an extracted invoice amount or vendor ID falls below confidence thresholds, the system routes it to a human-in-the-loop review queue instead of guessing."
  },
  {
    topic: "HIGH-ROI USE CASES",
    question: "What workflows and clerical tasks are best suited for process automation software?",
    answer:
      "High-volume, rule-based operations: parsing scanned PDF invoices and matching them against purchase orders, categorizing incoming customer tickets, auditing vendor contracts, and reconciling bank statements with accounting ledgers."
  },
  {
    topic: "SYSTEM INTEGRATION",
    question: "Can private AI agents connect directly to our existing databases and WhatsApp Business?",
    answer:
      "Yes. We build secure tool interfaces and Model Context Protocol (MCP) bridges so agents can query database records, verify active order numbers, draft customer updates, and send alerts to WhatsApp Business or Slack within strict permission boundaries."
  }
];

export default function AiFAQ() {
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
              Deploying enterprise AI requires total clarity on privacy isolation, hallucination safeguards, and long-term hosting economics. Every detail is transparent before work begins.
            </p>

            <div className="p-5 rounded-2xl bg-surface-container border border-surface-container-highest space-y-3">
              <div className="flex items-center gap-2 text-primary font-display text-[12px] leading-4 tracking-wider uppercase font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>DIRECT ARCHITECTURAL CONSULTATION</span>
              </div>
              <p className="font-sans text-[13px] leading-5 text-secondary">
                Have specific document parsing bottlenecks or data privacy requirements? Speak directly with Subham Sarkar.
              </p>
            </div>
          </div>

          {/* Right Accordion Column */}
          <div className="lg:col-span-7 space-y-4">
            {aiFaqs.map((faq, idx) => (
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
