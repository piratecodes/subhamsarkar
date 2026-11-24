"use client";

import Link from "next/link";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Plus, Minus, HelpCircle, ShieldCheck } from "lucide-react";

const securityFaqs = [
  {
    topic: "WHAT IT IS",
    question: "What is a web application security audit?",
    answer:
      "It is a structured check of how your application handles logins, data access, APIs and server settings, to find weaknesses before attackers do. It combines automated checks with hands-on testing by a person and ends with a report of what was found and what to fix. For new applications, [building security in from the start](/services/web-and-mobile-application-development) is cheaper than fixing it later.",
  },
  {
    topic: "AUDIT SCOPE & COVERAGE",
    question: "What does a comprehensive security audit cover?",
    answer:
      "The review covers login and signup security, session handling, password reset flows, database permission gaps, API rate limiting and how cloud servers connect to your database. The scope is agreed before testing starts, so you know what is and is not included.",
  },
  {
    topic: "AUDIT VS PENTEST",
    question: "What is the difference between a security audit, a penetration test and a vulnerability scan?",
    answer:
      "A scan is software looking for known weaknesses. A penetration test is a person actively trying to break in. This service combines hands-on testing with a review of logins, APIs, permissions and server access, and adds fixes and a retest. The [section on which you need](#audit-vs-pentest) explains each.",
  },
  {
    topic: "API TESTING",
    question: "Does the audit include API security testing, not only web pages?",
    answer:
      "Yes. Many applications keep most of their logic in APIs, so public and private endpoints are listed in the scope and tested along with the web pages and login flows.",
  },
  {
    topic: "ACTIONABLE REMEDIATIONS",
    question: "Do you provide actual code fixes or just a report?",
    answer:
      "Both. You receive a written report of what was found, and for each issue I prepare the code change for your developers to review and merge, with automated tests where possible. The fixes are then retested. Some issues need decisions from your team, and the report explains those.",
  },
  {
    topic: "BOT & BRUTE-FORCE DEFENSE",
    question: "How do you protect our platform against bots and credential guessing?",
    answer:
      "Rate limits that slow automated scripts, IP filters and challenges on login, OTP and inquiry forms are set up where your setup allows. The aim is to make attacks much harder while real customers notice little change.",
  },
  {
    topic: "OPERATIONAL SAFETY",
    question: "Will penetration testing disrupt our live production systems?",
    answer:
      "Testing is planned to avoid disruption. It runs on a staging copy or an isolated clone where possible, and anything done on a live system is agreed in advance, with a quiet time window if needed. No test is entirely risk free, so the rules are written down before work starts.",
  },
  {
    topic: "ENTERPRISE QUESTIONNAIRES",
    question: "Can this help our platform pass enterprise client security questionnaires?",
    answer:
      "It can help. The audit finds and fixes real weaknesses, and the written report shows what was tested and fixed, which many clients ask for. I can also help you answer the technical questions. It does not replace a formal certification.",
  },
  {
    topic: "SECURITY CERTIFICATE",
    question: "Do you provide a VAPT certificate or other security certification?",
    answer:
      "No. You receive a written report and a retest summary from me, not a formal certificate. If your client or regulator requires an audit by an accredited or government-empanelled firm, or a certification such as ISO 27001, this service will not meet that requirement. For everything else, the report and the fixes are the real proof.",
  },
  {
    topic: "AUDIT COST",
    question: "How much does a web application security audit cost?",
    answer:
      "Pricing is scoped per project after a short conversation. The main drivers are the size of the application, user roles, APIs, the access you can give, how many fixes and retests are needed, and your deadlines. The [section on cost and timeline](#security-cost-and-timeline) sets these out, and the [web application penetration testing cost guide](/insights/web-application-penetration-testing-cost) goes deeper.",
  },
  {
    topic: "TIMELINE",
    question: "How long does a web application security audit take?",
    answer:
      "It depends on the size of the application, its APIs and roles, and how many issues need fixing and retesting, so the timeline is agreed after a short conversation. Testing is followed by fixes and a retest, and the fixes depend on how quickly your developers can review them.",
  },
  {
    topic: "ACCESS REQUIRED",
    question: "Do you need our source code for a security audit?",
    answer:
      "Not always. Testing can start from the running application with test accounts. Source access lets the review go deeper and is needed for code fixes. Access and confidentiality terms, including an NDA, are agreed before work begins.",
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

export default function SecurityFAQ() {
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
              Securing customer data means being clear on what is tested, what you receive and what this service does not provide, including certification. Every question is answered upfront.
            </p>

            <div className="p-5 rounded-2xl bg-surface-container border border-surface-container-highest space-y-3">
              <div className="flex items-center gap-2 text-primary font-display text-[12px] leading-4 tracking-wider uppercase font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>DIRECT ARCHITECTURAL CONSULTATION</span>
              </div>
              <p className="font-sans text-[13px] leading-5 text-secondary">
                Preparing for an enterprise vendor security questionnaire or experiencing bot traffic? Speak directly with Subham Sarkar.
              </p>
            </div>
          </div>

          {/* Right Accordion Column */}
          <div className="lg:col-span-7 space-y-4">
            {securityFaqs.map((faq, idx) => (
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