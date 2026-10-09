"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from "@headlessui/react";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqs = [
  {
    num: "01",
    question: "How involved do I need to be during the build?",
    answer: "As much or as little as makes sense for you. At minimum, you'll be involved at the start (explaining your business) and at key checkpoints (reviewing progress and approving each phase). You won't be asked to sit through daily updates, but you'll never be left wondering what's happening either."
  },
  {
    num: "02",
    question: "What if I don't know exactly what I want yet?",
    answer: "That's normal, and it's actually where the process starts. The first phase exists specifically to figure that out together — most clients arrive with a problem, not a finished spec, and that's enough to begin."
  },
  {
    num: "03",
    question: "What happens if requirements change partway through?",
    answer: "They often do, and that's expected. Because work is broken into phases and milestones rather than delivered all at once, changes can be discussed and adjusted for at the next checkpoint — not treated as a crisis or a reason to start over."
  },
  {
    num: "04",
    question: "How will I know if the project is on track?",
    answer: "You'll have visibility at every phase, not just a single update at the end. If something is taking longer than expected or a decision needs your input, you'll hear about it as it happens, not after the fact."
  },
  {
    num: "05",
    question: "Do I get documentation, or does only you understand the system?",
    answer: "You get full documentation, always — this isn't optional or something reserved for larger clients. It's part of what makes it possible to hand the system over completely at the end."
  },
  {
    num: "06",
    question: "What if I'm not happy with the direction partway through?",
    answer: "Because the work is milestone-based, you're never looking at a finished product for the first time at the very end. If something isn't right, it gets caught and corrected at the next checkpoint, not discovered too late to fix easily."
  }
];

export default function ProcessFAQ() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="w-full relative overflow-hidden py-24 bg-surface-container-low/20 border-t border-surface-container-highest/30">
      
      {/* Background Gradient */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-primary/5 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="w-full container px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column Header */}
          <div className={`lg:col-span-5 space-y-6 lg:sticky lg:top-32 transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_var(--color-primary)]"></span>
              <span className="font-display text-[11px] leading-4 tracking-[0.15em] font-bold uppercase tracking-widest text-primary">
                COMMON QUESTIONS
              </span>
            </div>
            
            <h2 className="font-display text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] font-bold text-on-surface">
              Questions About How This <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Actually Works</span>
            </h2>
            
            <p className="font-sans text-[16px] lg:text-[18px] leading-relaxed tracking-[-0.005em] font-medium text-secondary">
              Every process sounds good on a webpage. Here's what people actually want to know before committing to one — answered plainly, without a sales pitch attached.
            </p>
            
            <div className="pt-8 relative inline-block group/btn">
              <div className="absolute inset-0 bg-primary/10 blur-xl group-hover/btn:bg-primary/30 transition-colors duration-500 rounded-2xl pointer-events-none"></div>
              <Link href="/contact" className="relative flex items-center gap-5 bg-surface-container-lowest/80 backdrop-blur-xl border border-primary/20 hover:border-primary/50 px-6 py-4 rounded-2xl font-display text-[11px] leading-4 tracking-[0.15em] font-bold uppercase text-on-surface hover:text-primary transition-all duration-300 shadow-sm">
                <span>Have a specific project in mind?</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 group-hover/btn:bg-primary/20 border border-primary/20 flex items-center justify-center transition-all duration-300 group-hover/btn:scale-110">
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
          
          {/* Right Column Accordions */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`transition-all duration-700 ease-out`}
                style={{ 
                  opacity: mounted ? 1 : 0, 
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${i * 100}ms`
                }}
              >
                <Disclosure as="div" className="bg-surface-container-lowest/60 backdrop-blur-xl border border-surface-container-highest/40 rounded-2xl overflow-hidden hover:border-surface-container-highest transition-colors group/faq">
                  {({ open }) => (
                    <>
                      <DisclosureButton className="w-full p-6 lg:px-8 focus:outline-none flex flex-row items-center justify-between gap-4 text-left">
                        <div className="flex items-start gap-4">
                          <span className="font-display text-[12px] tracking-[0.15em] font-bold text-primary/70 mt-1 shrink-0 group-hover/faq:text-primary transition-colors">
                            {faq.num} //
                          </span>
                          <span className="font-sans text-[16px] lg:text-[18px] font-bold text-on-surface leading-snug group-hover/faq:text-primary transition-colors">
                            {faq.question}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-surface-container/50 flex items-center justify-center shrink-0 border border-surface-container-highest/30 group-hover/faq:border-primary/30 transition-colors">
                          <ChevronDown className={`w-4 h-4 text-secondary group-hover/faq:text-primary transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                        </div>
                      </DisclosureButton>
                      
                      <Transition
                        enter="transition duration-300 ease-out"
                        enterFrom="transform scale-[0.98] opacity-0 -translate-y-4"
                        enterTo="transform scale-100 opacity-100 translate-y-0"
                        leave="transition duration-200 ease-in"
                        leaveFrom="transform scale-100 opacity-100 translate-y-0"
                        leaveTo="transform scale-[0.98] opacity-0 -translate-y-4"
                      >
                        <DisclosurePanel className="px-6 lg:px-8 pb-8 pt-2">
                          <div className="pl-0 sm:pl-[44px]">
                            <p className="font-sans text-[15px] lg:text-[16px] leading-relaxed tracking-[-0.005em] font-medium text-secondary">
                              {faq.answer}
                            </p>
                          </div>
                        </DisclosurePanel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
