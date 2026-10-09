"use client";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDown, FileText, Globe, Shield, Settings2 } from "lucide-react";

export default function PreTransmissionFAQ() {
  const faqs = [
    {
      spec: "CRITERIA",
      icon: Settings2,
      question: "Is there a minimum project size or budget threshold?",
      answer: "Engagements typically start for comprehensive architecture audits, high-volume decoupling initiatives, or full-scope module builds where resilience is paramount. I typically do not take on ad-hoc frontend patching or template modifications."
    },
    {
      spec: "GLOBAL COMM",
      icon: Globe,
      question: "Do you work with international or remote clients across different time zones?",
      answer: "Yes. Currently supporting enterprise clients across North America, Europe, and Southeast Asia. I operate on rigorous asynchronous documentation, daily sprint journals, and predictable synchronous overlap windows for architectural checkpoints."
    },
    {
      spec: "PREPARATION",
      icon: FileText,
      question: "What information should I include in my initial message?",
      answer: "A concise summary of your current technology stack, the primary bottleneck or transactional load profile, expected delivery constraints, and whether you possess architectural documentation or require ground-up systems modeling."
    },
    {
      spec: "GOVERNANCE",
      icon: Shield,
      question: "Do you sign NDAs before discussing proprietary business workflows?",
      answer: "Yes, routinely. Bilateral mutual non-disclosure agreements are dispatched and executed within 24 hours of receiving your transmission, safeguarding all trade secrets, IP, database schema plans, and commercial algorithms prior to technical scoping."
    }
  ];

  return (
    <section className="w-full py-16">
      <div className="w-full container px-4 lg:px-12 space-y-12">
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-1">
            <span className="inline-block font-display text-[11px] leading-4 tracking-[0.15em] font-bold uppercase text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              COMMON QUESTIONS
            </span>
          </div>
          <h2 className="font-display text-[36px] md:text-[42px] leading-[44px] md:leading-[50px] tracking-[-0.02em] font-bold text-on-surface">
            Questions Before You Reach Out
          </h2>
          <p className="font-sans text-[16px] leading-7 tracking-[-0.005em] font-normal text-secondary max-w-3xl">
            Reaching out to someone new always comes with a few unspoken questions - is my project too small, will I be understood, what happens to what I share. Here are honest answers to the ones people ask most, so you know exactly what to expect before that first message even goes out.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <Disclosure as="div" key={i} className="relative flex flex-col bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl border border-surface-container-highest shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/40 group overflow-hidden">
              {({ open }) => (
                <>
                  {/* Idle Card Ambient Glow */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent transition-opacity duration-500 pointer-events-none animate-pulse ${open ? 'opacity-0' : 'opacity-50 group-hover:opacity-0'}`}
                    style={{ animationDelay: `${i * 200}ms` }}
                  ></div>

                  {/* Hover Sweep Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out pointer-events-none"></div>
                  
                  {/* Open State Glow */}
                  <div className={`absolute inset-0 bg-primary/5 transition-opacity duration-700 pointer-events-none ${open ? 'opacity-100' : 'opacity-0'}`}></div>

                  <DisclosureButton className="w-full flex-grow text-left p-5 sm:p-6 focus:outline-none relative z-10 cursor-pointer">
                    <div className="w-full flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      
                      <div className="flex items-start gap-4">
                        {/* Icon Container */}
                        <div className="relative w-12 h-12 flex-shrink-0 mt-0.5">
                          {/* Idle Pulsing Ring */}
                          <div 
                            className={`absolute inset-0 rounded-xl border border-primary/40 opacity-50 animate-pulse transition-opacity duration-300 ${open ? 'opacity-0' : 'group-hover:opacity-0'}`}
                            style={{ animationDelay: `${i * 200}ms` }}
                          ></div>
                          {/* Open state ping */}
                          <div className={`absolute inset-0 rounded-xl bg-primary/30 transition-all duration-500 ${open ? 'opacity-100 animate-ping' : 'opacity-0'}`}></div>
                          
                          <div className={`relative w-full h-full rounded-xl flex items-center justify-center transition-all duration-500 shadow-inner ${open ? 'bg-primary text-on-primary shadow-lg scale-110' : 'bg-surface-container text-secondary group-hover:bg-primary group-hover:text-on-primary group-hover:shadow-md'}`}>
                            <faq.icon className={`w-5 h-5 transition-transform duration-500 ${open ? 'scale-110' : 'group-hover:scale-110 group-hover:animate-pulse'}`} />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <span 
                              className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 animate-pulse ${open ? 'bg-primary' : 'bg-primary/60 group-hover:bg-primary'}`}
                              style={{ animationDelay: `${i * 200}ms` }}
                            ></span>
                            <span className={`font-display text-[11px] leading-4 tracking-[0.15em] font-bold uppercase transition-colors duration-500 ${open ? 'text-primary' : 'text-secondary group-hover:text-primary'}`}>
                              {faq.spec}
                            </span>
                          </div>
                          <h3 className={`font-display text-[17px] leading-6 font-bold transition-colors duration-500 ${open ? 'text-primary' : 'text-on-surface group-hover:text-primary'}`}>
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Chevron Button */}
                      <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-500 self-start sm:self-auto sm:mt-1 ${open ? 'bg-primary border-primary text-on-primary rotate-180 shadow-md' : 'bg-surface border-surface-container-highest text-secondary group-hover:border-primary/50 group-hover:text-primary group-hover:shadow-sm'}`}>
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                    </div>
                  </DisclosureButton>
                  
                  {/* Expandable Body */}
                  <DisclosurePanel className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 relative z-10 transition-all duration-500 ease-in-out origin-top">
                    <div className="pl-0 sm:pl-[4rem] font-sans text-[15px] leading-relaxed text-secondary/90 border-t border-surface-container-highest/50 pt-4 mt-2">
                      {faq.answer}
                    </div>
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
