"use client";
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from "@headlessui/react";
import { Plus, Minus, ShieldCheck, Terminal } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      queryNum: "QUERY 01",
      topic: "EXISTING SYSTEMS",
      question: "Do you work with an existing tech setup or only from scratch?",
      answer: "Both. A large share of the work I do involves existing systems that have become slow, outdated, or difficult to maintain — not just new builds. Where possible, we improve and modernize what you already have step by step, rather than forcing a risky full rebuild."
    },
    {
      queryNum: "QUERY 02",
      topic: "CONFIDENTIALITY & OWNERSHIP",
      question: "How do you handle confidentiality and proprietary business logic?",
      answer: "Every engagement is covered by a confidentiality agreement before any technical details are discussed. Code is written directly into your own private repository, not mine — and business logic built for one client is never reused or shared with another."
    },
    {
      queryNum: "QUERY 03",
      topic: "TIMELINES & SCHEDULES",
      question: "What is a typical project timeline and deployment milestone schedule?",
      answer: "Work is broken into short, clearly defined milestones, so you always know what's being delivered and when. A focused fix or migration typically takes a few weeks; a full custom ERP/CRM build usually takes a few months, depending on scope — we'll give you a realistic estimate before anything begins."
    },
    {
      queryNum: "QUERY 04",
      topic: "SUPPORT AFTER LAUNCH",
      question: "Do you offer post-launch maintenance and emergency support?",
      answer: "Yes. Every build includes a stabilization period after launch to catch and fix any issues, at no extra cost. After that, ongoing support and maintenance are available if you want them — but they're never a requirement to keep your system running."
    },
    {
      queryNum: "QUERY 05",
      topic: "OWNERSHIP & INDEPENDENCE",
      question: "Can systems be handed off fully to our internal engineering team without vendor lock-in?",
      answer: "Yes — this is a core principle of how I build. Every solution is built using common, widely-supported technologies, not proprietary tools only I can maintain. You receive full documentation and a proper handoff, so your own team can maintain and extend the system independently, with or without me."
    }
  ];

  return (
    <section className="w-full bg-surface py-20 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32 self-start">
            <div className="space-y-4">
              <span className="font-display text-[11px] leading-4 tracking-[0.12em] uppercase tracking-widest text-primary font-bold bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-md shadow-sm inline-flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" />
                FIELD INTERROGATION // FAQS
              </span>
              <h2 className="font-display text-[40px] lg:text-[48px] leading-[48px] lg:leading-[56px] tracking-[-0.02em] font-bold tracking-tight text-on-surface text-balance">
                Practical Architectural Doubts, Addressed Directly.
              </h2>
            </div>
            
            <p className="font-sans text-[16px] leading-[26px] tracking-[-0.005em] font-normal text-secondary text-balance">
              Enterprise architecture demands absolute clarity. Every contractual, operational, and intellectual property query is documented here with zero ambiguity.
            </p>
            
            <div className="p-6 bg-surface-container-lowest/80 backdrop-blur-sm rounded-2xl space-y-3 border border-outline/10 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors duration-500">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary/30 group-hover:bg-primary transition-colors duration-500"></div>
              <div className="flex items-center gap-2 font-display text-[11px] leading-4 tracking-[0.12em] text-on-surface font-bold uppercase">
                <ShieldCheck className="w-4 h-4 text-primary" />
                NON-DISCLOSURE GUARANTEE
              </div>
              <p className="font-sans text-[14px] leading-[22px] tracking-[0em] font-normal text-secondary">
                All discussions are preceded by mutual NDA execution upon request. Schematics, database models, and proprietary business logic remain your exclusive intellectual property.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, i) => (
              <Disclosure key={i} as="div" className={({ open }) => `group backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-500 shadow-sm relative ${
                open ? 'bg-surface-container-lowest border-primary/30 shadow-lg' : 'bg-surface-container-lowest/70 border-outline/10 hover:border-primary/30 hover:shadow-lg hover:bg-surface-container-lowest'
              }`}>
                {({ open }) => (
                  <>
                    {/* Subtle Grid Overlay */}
                    <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none z-0 ${open ? 'opacity-[0.03]' : 'opacity-0 group-hover:opacity-[0.02]'}`} style={{ backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
                    
                    {/* Active Accent Line */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-primary transition-transform duration-500 origin-top ${open ? 'scale-y-100' : 'scale-y-0'}`}></div>

                    <DisclosureButton className="relative z-10 w-full flex justify-between items-start text-left focus:outline-none p-6 lg:p-8">
                      <div className="space-y-3 pr-8">
                        <div className="flex flex-wrap items-center gap-3 text-secondary font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase">
                          <span className={`px-2 py-0.5 rounded transition-colors duration-500 ${open ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container group-hover:bg-primary/10 group-hover:text-primary'}`}>
                            {faq.queryNum}
                          </span>
                          <span className={open ? 'text-primary' : 'group-hover:text-on-surface transition-colors'}>{faq.topic}</span>
                        </div>
                        <h3 className={`font-display text-[20px] leading-[28px] tracking-[0em] font-bold transition-colors duration-300 ${open ? 'text-primary' : 'text-on-surface'}`}>
                          {faq.question}
                        </h3>
                      </div>
                      
                      <div className={`relative w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 mt-1 ${
                        open ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)]' : 'bg-surface border-outline/20 text-secondary group-hover:border-primary/50 group-hover:text-primary'
                      }`}>
                        {open ? (
                          <Minus className="w-5 h-5 animate-in spin-in-90 duration-300" />
                        ) : (
                          <Plus className="w-5 h-5 animate-in spin-in-90 duration-300" />
                        )}
                      </div>
                    </DisclosureButton>
                    
                    <Transition
                      enter="transition duration-300 ease-out"
                      enterFrom="transform -translate-y-2 opacity-0"
                      enterTo="transform translate-y-0 opacity-100"
                      leave="transition duration-200 ease-out"
                      leaveFrom="transform translate-y-0 opacity-100"
                      leaveTo="transform -translate-y-2 opacity-0"
                    >
                      <DisclosurePanel className="relative z-10 px-6 lg:px-8 pb-8 font-sans text-[15px] leading-[26px] tracking-[-0.005em] font-normal text-on-surface-variant">
                        <div className="pt-5 border-t border-outline/5 relative">
                          <div className="absolute left-0 top-0 w-12 h-[1px] bg-gradient-to-r from-primary/50 to-transparent"></div>
                          {faq.answer}
                        </div>
                      </DisclosurePanel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
