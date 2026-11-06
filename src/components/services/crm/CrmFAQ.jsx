"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Plus, Minus, HelpCircle, ShieldCheck } from "lucide-react";

const crmFaqs = [
  {
    topic: "PRICING & ROI",
    question: "Why choose custom CRM development over Salesforce, HubSpot, or Zoho for growing businesses in India?",
    answer:
      "Mainstream SaaS CRMs charge ₹8,000 to ₹25,000+ per user every month. For a team of 25 sales reps, managers, and support staff, that amounts to ₹25 to ₹50 lakhs every year in recurring software bills. Custom CRM development gives your entire company unlimited user logins with zero recurring monthly seat fees."
  },
  {
    topic: "WHATSAPP & AUTOMATION",
    question: "How does an automated lead management system trigger instant WhatsApp and email follow-ups?",
    answer:
      "We connect directly to the official WhatsApp Business Cloud API, transactional email services (SendGrid, Postmark), and SMS gateways. New lead greetings, automated follow-up sequences, and quotation PDF links are sent automatically within 5 seconds of inquiry receipt."
  },
  {
    topic: "QUOTING & PIPELINE",
    question: "Can custom CRM software generate automated GST quotations and track custom sales pipelines?",
    answer:
      "Yes. Generic CRMs struggle with custom pricing formulas and state-specific taxes. We build a dedicated quotation engine that calculates your exact discount slabs, state GST, and bundle pricing, outputting a professional branded PDF in under 30 seconds."
  },
  {
    topic: "DATA PRIVACY & ACCESS",
    question: "How does role-based access control prevent sales reps from exporting customer lists?",
    answer:
      "We enforce strict role-based access rules (RBAC). Sales reps only see the specific leads assigned to their area or route, and bulk export features can be completely disabled for non-admin accounts. Every customer view, note, and edit is permanently logged."
  },
  {
    topic: "CONTACT MIGRATION",
    question: "How do we move our existing contacts and deal history from spreadsheets or old software?",
    answer:
      "We run automated data migration pipelines from your legacy CRM, spreadsheets, or Google Contacts. We clean up duplicates, format phone numbers, and import all existing interactions so you don't lose a single contact or pending deal."
  }
];

export default function CrmFAQ() {
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
              Scaling your sales pipeline requires complete clarity on WhatsApp limits, data security, and long-term costs. Every detail is transparent before work begins.
            </p>

            <div className="p-5 rounded-2xl bg-surface-container border border-surface-container-highest space-y-3">
              <div className="flex items-center gap-2 text-primary font-display text-[12px] leading-4 tracking-wider uppercase font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>DIRECT ARCHITECTURAL CONSULTATION</span>
              </div>
              <p className="font-sans text-[13px] leading-5 text-secondary">
                Have specific lead distribution rules or high inquiry volumes? Speak directly with Subham Sarkar.
              </p>
            </div>
          </div>

          {/* Right Accordion Column */}
          <div className="lg:col-span-7 space-y-4">
            {crmFaqs.map((faq, idx) => (
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
