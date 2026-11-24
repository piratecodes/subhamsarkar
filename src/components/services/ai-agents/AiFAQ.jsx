"use client";

import Link from "next/link";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Plus, Minus, HelpCircle, ShieldCheck } from "lucide-react";

const aiFaqs = [
  {
    topic: "BUSINESS AUTOMATION",
    question: "What is AI business process automation?",
    answer:
      "It means using AI to handle work that follows a pattern but is too varied for fixed rules, such as reading invoices, sorting inquiries and drafting replies, inside a workflow with checks and approvals. Standard workflow automation follows fixed rules. AI adds the ability to read unstructured documents and messages, with a person approving important actions.",
  },
  {
    topic: "WORKFLOW AUTOMATION",
    question: "What is the difference between AI automation and standard workflow automation?",
    answer:
      "Standard workflow automation moves data between tools using fixed rules, for example sending an alert when a form is submitted. AI automation is added where the input is messy, such as a photo of a bill or a free-text email. Many projects use both, and a fixed rule is used wherever it is enough.",
  },
  {
    topic: "HOW IT WORKS",
    question: "How can I automate my business operations using private AI agent development?",
    answer:
      "We identify repetitive clerical tasks such as invoice data extraction, customer inquiry triage and multi-system data entry. Private AI agents then carry out those tasks behind strict validation rules, with a person approving anything important, so your team spends its time on exceptions instead of typing.",
  },
  {
    topic: "DATA PRIVACY",
    question: "How is my data kept private when AI is used for business process automation?",
    answer:
      "It depends on how sensitive the data is. Where privacy matters most, I run open-weight models such as Llama or Mistral in a dedicated private environment, so records are not sent to public chatbots. If you already use a provider such as OpenAI or Claude and are comfortable with it, the workflow can use it with the same checks. A [security audit for your systems](/services/application-security-audit) can test the finished setup.",
  },
  {
    topic: "ACCURACY & RELIABILITY",
    question: "How do you reduce AI hallucinations in business process automation?",
    answer:
      "Every output is checked against predefined rules and your database before anything is saved. If the system is unsure of an invoice total or a GST number, it flags the record for a person to review instead of guessing. No AI system is perfect, so the aim is that wrong outputs are caught before they reach your records.",
  },
  {
    topic: "HIGH-ROI USE CASES",
    question: "What business processes are best suited to automation?",
    answer:
      "Repetitive, high-volume work with clear rules, such as invoice processing, document intake, inquiry triage, approvals and data entry across several tools. The [use cases section](#automation-use-cases) above lists the most common starting points.",
  },
  {
    topic: "INTEGRATIONS",
    question: "Can AI automation connect to our existing software, databases and WhatsApp Business?",
    answer:
      "Yes, where the other software offers a way to connect, such as an API, a database connection or a file export. Typical connections are databases, WhatsApp Business, Slack, email, accounting software, your ERP and your CRM. Software with no connection point may need [legacy software modernization](/services/legacy-software-modernization) first.",
  },
  {
    topic: "COST",
    question: "How much does business process automation cost?",
    answer:
      "Pricing is scoped per project after a short conversation. The main drivers are the number of documents, the systems connected, the accuracy and approval rules, the privacy needs and the running costs after launch. The [section on cost and timeline](#automation-cost-and-timeline) sets these out.",
  },
  {
    topic: "TIMELINE",
    question: "How long does a business process automation project take?",
    answer:
      "It depends on scope, so the timeline is agreed after a short conversation. The phases are a workflow audit, private setup, testing on real documents, then launch with 30 days of support. One workflow and a company-wide automation take very different amounts of time.",
  },
  {
    topic: "AFTER LAUNCH",
    question: "What happens if an automation breaks or a connected system changes?",
    answer:
      "Monitoring tracks accuracy and cost, so problems show up early. Every project includes 30 days of active support after launch. Support beyond that, including changes when a connected system updates, is agreed per project.",
  },
  {
    topic: "DATA & HOSTING",
    question: "Who owns the data and hosting for an automated business process?",
    answer:
      "Your business data is yours, and you always have access to it. I design, build and host the system, so the servers, source code and admin credentials stay under my management. I choose the environment, a VPS or a cloud platform, to suit your requirements, and I stay responsible for the system in production. If you need specific terms, raise them in the first conversation.",
  },
  {
    topic: "SMALL BUSINESS",
    question: "Is AI automation suitable for a small business?",
    answer:
      "Yes, when the work is repetitive, frequent and rule-based, such as invoices arriving daily or the same entries typed twice. It is usually not worth it for a handful of documents a week. The best start is one process, proven first. Read [AI automation for a small business](/insights/ai-automation-for-small-business) for more.",
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
              Automating business processes with AI means being clear on data privacy, accuracy safeguards, hosting and long-term running costs. Every detail is explained before work begins.
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
