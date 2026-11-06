"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Plus, Minus, HelpCircle, ShieldCheck } from "lucide-react";

const erpFaqs = [
  {
    topic: "CUSTOM VS READYMADE",
    question: "Why do companies choose custom ERP development over readymade software like SAP, NetSuite, or Odoo?",
    answer:
      "Readymade ERP platforms charge steep per-user monthly licenses (often ₹10,000 to ₹25,000+ per user every month) and force your business to change how you work just to fit generic templates. Custom ERP software development gives you 100% intellectual property ownership, zero recurring seat fees, and is built specifically around how your team actually operates - from warehouse logistics to billing."
  },
  {
    topic: "STOCK ACCURACY",
    question: "How does custom ERP software manage inventory and stock across multiple godowns?",
    answer:
      "Every time goods move, an order is placed, or a shipment is dispatched, the system updates stock counts across all locations immediately. Billing counter staff, warehouse pickers, and mobile reps all see the exact same numbers in real time, preventing double-bookings, stockouts, and phantom inventory errors."
  },
  {
    topic: "ACCOUNTING & GST",
    question: "Can custom ERP software integrate directly with Tally and GST billing software?",
    answer:
      "Yes. Invoices, payment receipts, and e-way bills are pushed directly into Tally, Zoho Books, or government GST portals automatically. Your accounts team doesn't have to re-type a single bill, completely eliminating human copy-paste errors and double entries."
  },
  {
    topic: "ERP COST & LICENSING",
    question: "What is the cost of custom ERP software development compared to SAP in India?",
    answer:
      "Commercial ERPs like SAP Business One require steep implementation fees plus recurring per-user licenses that balloon as you hire. Custom ERP software engineering is a one-time fixed investment where you retain full database and code ownership, allowing you to add hundreds of staff members with zero additional licensing fees."
  },
  {
    topic: "DATA & CODE OWNERSHIP",
    question: "Who owns the database, server infrastructure, and source code?",
    answer:
      "You own 100% of everything. All code is written into your company's private GitHub repository from day one, and database clusters reside on your own cloud servers (AWS, DigitalOcean, or private servers). Subham Sarkar provides direct architectural consulting with zero vendor lock-in."
  }
];

export default function ErpFAQ() {
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
              Building custom operations software is an important decision. We provide complete clarity on intellectual property, third-party connections, and real costs before writing a single line of code.
            </p>

            <div className="p-5 rounded-2xl bg-surface-container border border-surface-container-highest space-y-3">
              <div className="flex items-center gap-2 text-primary font-display text-[12px] leading-4 tracking-wider uppercase font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>DIRECT ARCHITECTURAL CONSULTATION</span>
              </div>
              <p className="font-sans text-[13px] leading-5 text-secondary">
                Have a specific operational workflow or multi-branch setup? Speak directly with Subham Sarkar.
              </p>
            </div>
          </div>

          {/* Right Accordion Column */}
          <div className="lg:col-span-7 space-y-4">
            {erpFaqs.map((faq, idx) => (
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
