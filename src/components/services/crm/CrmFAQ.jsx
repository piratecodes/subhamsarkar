"use client";

import Link from "next/link";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Plus, Minus, HelpCircle, ShieldCheck } from "lucide-react";

const crmFaqs = [
  {
    topic: "WHAT IT IS",
    question: "What is custom CRM software development?",
    answer:
      "It means building a customer and sales system around the way your team actually sells, instead of fitting your process into a readymade product. Leads, follow-ups, quotations and customer history live in one place, and the scope is agreed per project. Many businesses start with the one process causing the most lost leads.",
  },
  {
    topic: "CUSTOM VS READYMADE",
    question: "Should we build a custom CRM or use Zoho, HubSpot or Salesforce?",
    answer:
      "It depends on how standard your sales process is. A readymade CRM can be enough for a small team with a simple process. A custom CRM fits better when your quotation rules or lead sources are unusual, many roles need access, or the CRM must work with other systems. The [section on build or buy](#crm-vs-readymade) sets out each case, and this guide on [Salesforce alternatives for small teams in India](/insights/salesforce-alternatives-small-teams-india) compares the options.",
  },
  {
    topic: "WHEN YOU NEED IT",
    question: "When does a business need a custom CRM system?",
    answer:
      "Usually when leads arrive faster than people can track them. Common signs are enquiries waiting in inboxes, customer chats living on personal phones, quotes kept in separate Excel files, and customer history leaving when a rep leaves. When these repeat, one shared system becomes more practical than another spreadsheet.",
  },
  {
    topic: "CRM FEATURES",
    question: "What features can a custom CRM include?",
    answer:
      "Typical features are lead capture from your website, ads and WhatsApp, fair lead assignment, a complete customer timeline, follow-up reminders, quotations with your pricing and GST rules, role-based access and reports. You choose what is built and in what order.",
  },
  {
    topic: "WHATSAPP & AUTOMATION",
    question: "How does an automated lead management system send WhatsApp and email follow-ups?",
    answer:
      "The CRM connects to the WhatsApp Business Cloud API, email services and SMS gateways where they are set up for your business. When a lead arrives, a greeting, a catalog link or a follow-up message can be sent automatically and the lead is assigned to the right person. Other steps in the same flow can be handled through [automated workflows](/services/business-process-automation).",
  },
  {
    topic: "QUOTING & PIPELINE",
    question: "Can custom CRM software generate GST quotations and track custom sales pipelines?",
    answer:
      "Yes. A quotation engine can apply your discount slabs, state GST and bundle pricing, produce a branded PDF and send it with an online acceptance link. Your own sales stages, approvals and reports can be set up so the pipeline matches how you really sell.",
  },
  {
    topic: "DATA PRIVACY & ACCESS",
    question: "How does role-based access control stop sales reps from exporting customer lists?",
    answer:
      "Access rules decide what each role can see and do. Reps see only the leads assigned to their area, and bulk export can be switched off for non-admin accounts. Every view, note and edit is logged, so you can see who touched which record.",
  },
  {
    topic: "CONTACT MIGRATION",
    question: "How do we move our existing contacts and deal history from spreadsheets or old software?",
    answer:
      "Contacts are exported from your old CRM, spreadsheets or Google Contacts, cleaned for duplicates and formatting, then imported and checked against your records. If the old software is badly outdated, [modernizing the legacy system](/services/legacy-software-modernization) may be part of the plan.",
  },
  {
    topic: "CRM COST",
    question: "How much does custom CRM development cost?",
    answer:
      "Pricing is scoped per project after a short conversation. The main drivers are the number of users and roles, lead sources, the complexity of your sales process, the data brought across, connections to other tools and the rollout approach. The [section on cost and timeline](#crm-cost-and-timeline) sets these out, and the [custom CRM development cost guide](/insights/custom-crm-development-cost) goes deeper.",
  },
  {
    topic: "TIMELINE",
    question: "How long does it take to build a custom CRM system?",
    answer:
      "It depends on scope, so the timeline is agreed after a short conversation. The phases are a sales process audit, the core pipeline and messaging build, the quotation and customer timeline build, then contact migration and launch with 30 days of support. Starting with the most painful process can let part of the system go live earlier.",
  },
  {
    topic: "TEAM ADOPTION",
    question: "How do you make sure my sales team actually uses the CRM?",
    answer:
      "A CRM is used when it saves reps time. Screens are designed around your team's daily steps, with fewer clicks, automatic logging where integrations are set up and a single view of each customer. Reps are trained before launch, and starting with one process helps the team build the habit.",
  },
  {
    topic: "DATA & HOSTING",
    question: "Who owns the data, hosting and source code of a custom CRM?",
    answer:
      "Your business data is yours, and you always have access to it. I design, build and host the system, so the servers, source code and admin credentials stay under my management. I choose the environment, a VPS or a cloud platform, to suit your requirements, and I stay responsible for the system in production. If you need specific terms, raise them in the first conversation.",
  },
];

// Turns "[text](/path)" in an answer into an internal next/link.
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
              Scaling your sales pipeline means being clear on WhatsApp setup, data access, hosting and long-term costs. Every detail is explained before work begins.
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
                      className={`px-6 pb-6 pt-2 font-sans text-[14.5px] leading-[24px] text-secondary border-t border-surface-container-highest/60 mt-1 ${open ? "block" : "hidden"}`}
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