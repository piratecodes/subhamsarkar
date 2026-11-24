"use client";

import Link from "next/link";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Plus, Minus, HelpCircle, ShieldCheck } from "lucide-react";

const erpFaqs = [
  {
    topic: "WHAT IT IS",
    question: "What is custom ERP software development?",
    answer:
      "It means building one connected system for the main parts of your business, such as accounting, stock, purchasing, sales, payroll and reporting, around the way your teams actually work, instead of fitting your work into a readymade product. The scope is agreed per project, and many businesses start with the areas causing the most trouble.",
  },
  {
    topic: "CUSTOM VS READYMADE",
    question: "Why do companies choose custom ERP development over off-the-shelf software packages?",
    answer:
      "Many readymade ERP products charge a monthly fee for each user, and they ask you to adapt your work to fixed templates. A custom ERP is designed around your own pricing rules, dispatch steps and approvals, and is built for your whole team to use. Whether a custom build or an existing product suits you depends on how far your processes differ from the standard, and that is part of the first conversation.",
  },
  {
    topic: "WHEN YOU NEED IT",
    question: "When does a business need a custom ERP?",
    answer:
      "Usually when basic tools stop coping. Common signs are several branches, payroll and manual data entry taking up staff time, departments working in separate spreadsheets, little visibility for the owner, and a steady stream of enquiries and complaints to chase. When these pile up, one connected system becomes more practical than adding another tool.",
  },
  {
    topic: "ERP MODULES",
    question: "What modules can a custom ERP software system include?",
    answer:
      "Typical areas are accounting and billing, inventory and warehouse, purchasing and suppliers, sales, enquiries and complaints, HR and payroll, and reporting across branches. You choose what is built and in what order. The [modules section](#erp-modules) above lists these in more detail.",
  },
  {
    topic: "STOCK ACCURACY",
    question: "How does custom ERP software manage inventory and stock across multiple godowns?",
    answer:
      "Whenever goods move, an order is placed or a shipment is dispatched, the system updates stock across all locations. Billing counters, warehouse staff and field representatives see the same numbers, which helps prevent double-selling, stockouts and mismatched counts.",
  },
  {
    topic: "ACCOUNTING & GST",
    question: "Can custom ERP software integrate with Tally and GST billing software?",
    answer:
      "Yes, where the accounting software offers a way to connect, such as an API or a file export. Invoices, receipts and tax entries can then flow into it without retyping, and GST invoicing is set up where your business needs it. The exact connections are agreed per project. If you are choosing between the two, read [this Tally vs ERP guide](/insights/tally-vs-erp-which-does-your-business-need).",
  },
  {
    topic: "ERP COST",
    question: "What is the cost structure of custom ERP software development in India?",
    answer:
      "Pricing is scoped per project after a short conversation, and the work is organized in milestones. The main drivers are the number of modules, users and branches, the data brought across, the connections to other tools, compliance needs and the rollout approach. The [section on cost and timeline](#erp-cost-and-timeline) sets these out, and the [custom ERP software development cost guide](/insights/custom-erp-software-development-cost) goes deeper.",
  },
  {
    topic: "TIMELINE",
    question: "How long does it take to build a custom ERP system?",
    answer:
      "It depends on scope, so the timeline is agreed after a short conversation. The phases are an operational audit, the core build, integrations and data checks, then launch with 30 days of support. Building the most important modules first can let part of the system go live earlier.",
  },
  {
    topic: "RISKS",
    question: "What are the risks of a custom ERP, and how are they reduced?",
    answer:
      "The usual risks are an unclear scope, messy data and staff who do not adopt the system. They are reduced by agreeing the scope in milestones, cleaning and checking your data before it moves, testing with your team in a private environment and training your staff before launch. No project is risk free, so progress is reviewed at each milestone.",
  },
  {
    topic: "DATA MIGRATION",
    question: "How is existing data moved from spreadsheets or old software into a custom ERP?",
    answer:
      "Customer, product and stock records are cleaned first, for example duplicates and missing details. They are then imported and checked against your books, and a reconciliation report shows the result. If the old system is badly outdated, [modernizing the outdated system](/services/legacy-software-modernization) may be part of the plan.",
  },
  {
    topic: "AFTER LAUNCH",
    question: "What support is included after a custom ERP goes live?",
    answer:
      "Every project includes 30 days of direct support after launch. During that time, bugs and edge cases found in real use are fixed. Support beyond 30 days, including changes as your business grows, is agreed per project. A [security audit of the finished ERP](/services/application-security-audit) can also be added.",
  },
  {
    topic: "DATA & HOSTING",
    question: "Who owns the data, hosting and source code of a custom ERP?",
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
              Building custom operations software is an important decision. Every detail on data, connections to other tools, hosting and costs is explained before work begins.
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