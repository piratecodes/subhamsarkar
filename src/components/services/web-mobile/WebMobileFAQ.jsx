"use client";

import Link from "next/link";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Plus, Minus, HelpCircle, ShieldCheck } from "lucide-react";

const webMobileFaqs = [
  {
    topic: "CODEBASES & COST",
    question: "Why choose unified custom web application and mobile app development over maintaining separate codebases?",
    answer:
      "One backend and one set of business rules serve your web dashboards and your installed apps, so validation, pricing and data types are written once. A change is made in one place instead of three, which reduces duplicate work and keeps every screen consistent."
  },
  {
    topic: "WEB & MOBILE COST",
    question: "How much does web and mobile application development cost?",
    answer: (
      <>
        Pricing is scoped per project after a short conversation, because the same idea can be a small build or a large one. The main drivers are the number of users and roles, the devices you need, how much must work offline, the systems it connects to and the scale it runs at. The section on{" "}
        <Link href="#cost-and-timeline" className="text-primary hover:underline font-medium">
          what shapes cost and timeline
        </Link>{" "}
        sets these out.
      </>
    )
  },
  {
    topic: "TIMELINE",
    question: "How long does web and mobile application development take?",
    answer:
      "It depends on scope, so the timeline is agreed after a short conversation and set out in phases: requirements and data design, the core build and a working prototype, testing in hard conditions, then launch with 30 days of support. A simple web app with an admin panel and an offline PWA with several integrations take very different amounts of time, which is why one fixed number would mislead you."
  },
  {
    topic: "WEB VS MOBILE",
    question: "What is the difference between web application development and mobile application development?",
    answer: (
      <>
        A web application runs in a browser and needs nothing to install. A mobile application is installed on a phone and can use more of the device, such as background location or Bluetooth. A PWA sits between the two: it is built with web technology, installs to the home screen and can work offline. The right choice depends on where your team works, as explained in{" "}
        <Link href="#web-or-mobile-first" className="text-primary hover:underline font-medium">
          web app or mobile app first
        </Link>
        .
      </>
    )
  },
  {
    topic: "PWA DEFINITION",
    question: "What is progressive web app development?",
    answer:
      "Progressive web app development means building a website that behaves like an app. People open it in a browser, add it to the home screen, and it opens full screen. When it is built for offline use, it can keep working with a weak or missing signal. One build serves Android, iPhone, tablets and laptops."
  },
  {
    topic: "OFFLINE BEHAVIOR",
    question: "How does offline-first mobile app development function without cellular network?",
    answer:
      "An offline-first app saves orders, timestamps and photos on the device first, so staff can keep working with no signal. When the connection returns, the queued changes are sent to your central database, and clear rules decide what happens when two people edit the same record. On iPhone, sync runs while the app is open and online."
  },
  {
    topic: "IPHONE OFFLINE SYNC",
    question: "Does a PWA work offline on iPhone?",
    answer: (
      <>
        Yes, with limits. A PWA can store data and keep working without a signal, but Safari does not support Background Sync, so an iPhone app sends waiting changes when it is open and online. Good offline-first app development plans for this and tests on real iPhones. For the wider picture, see{" "}
        <Link href="/insights/progressive-web-app-for-business-offline" className="text-primary hover:underline font-medium">
          how a PWA keeps a business running offline
        </Link>
        .
      </>
    )
  },
  {
    topic: "IPHONE PUSH",
    question: "Can a PWA send push notifications on iPhone?",
    answer:
      "Yes, with a condition. On iPhone, push notifications work only after the user adds the PWA to the home screen from the Share menu. Notification behaviour is tested on real devices before launch, so you know what your team and customers will see."
  },
  {
    topic: "APP STORE DISTRIBUTION",
    question: "Can a PWA go on the app stores?",
    answer:
      "Google Play accepts a PWA packaged as a Trusted Web Activity. Apple's App Store does not accept PWAs as PWAs, so an iPhone store listing needs a native app. If store listings matter to you, decide this at the start."
  },
  {
    topic: "PWA VS NATIVE",
    question: "When is a native app better than a PWA?",
    answer: (
      <>
        When you need constant background location, Bluetooth devices, very large offline data, or the smoothest feel on one phone. For forms, checklists, quotes and staff tools, PWA development services are often enough. Read{" "}
        <Link href="/insights/web-app-vs-mobile-app-which-to-build-first" className="text-primary hover:underline font-medium">
          web app vs mobile app: which to build first
        </Link>{" "}
        for a fuller comparison.
      </>
    )
  },
  {
    topic: "PWA PRICING & SCOPE",
    question: "How is PWA development priced?",
    answer: (
      <>
        Per project, after a short conversation. The cost depends on how much must work offline, how many systems it connects to, how many user roles it has, which devices it is tested on, and whether it needs store packaging or AI features. To see what moves the figure, read the{" "}
        <Link href="/insights/progressive-web-app-development-cost" className="text-primary hover:underline font-medium">
          progressive web app development cost guide
        </Link>
        .
      </>
    )
  },
  {
    topic: "TECHNOLOGY STACK",
    question: "What technology stack is used for custom web application development?",
    answer:
      "There is no fixed stack. The choice follows your user numbers, the channels you need and the shape of your data. Small to mid-size business apps often use Next.js, NestJS, Prisma and PostgreSQL. Mid-size systems with several channels may use Spring, and AI features use FastAPI. Redis helps when many users are active together, and Kafka when a very large number of requests arrive at once. Real-time data from many users may call for Cassandra, MongoDB or BullMQ. Large enterprise front ends may use Angular, and admin panels that do not need to rank on Google can use Vite with React."
  },
  {
    topic: "DATA & HOSTING",
    question: "Who owns the data, the source code and the hosting for a custom web and mobile application?",
    answer:
      "Your business data is yours, and you always have access to it. I design, build and host the system, so the source code, the servers and the admin credentials stay under my management. I choose the hosting, a VPS or a cloud platform, to suit your requirements and the technology stack, and I stay responsible for the system in production, including its security and stability. If you need specific terms, such as continuity arrangements, raise them in the first conversation."
  },
  {
    topic: "SOFTWARE INTEGRATIONS",
    question: "Can custom web and mobile applications integrate with Tally and existing enterprise software?",
    answer: (
      <>
        Yes, where the other software offers a way to connect, such as an API or a file export. Orders, invoices, receipts and stock movements confirmed in the app can be sent to your existing accounting or ERP software, and the exact connections are agreed per project after a short conversation. If you are weighing a bigger move, see{" "}
        <Link href="/services/custom-erp-development" className="text-primary hover:underline font-medium">
          custom ERP software
        </Link>
        .
      </>
    )
  },
  {
    topic: "POST-LAUNCH SUPPORT",
    question: "What happens if a bug occurs or Apple/Google updates their mobile operating system?",
    answer: (
      <>
        Every project includes 30 days of support after launch. During that time my team and I fix bugs and edge cases found in real use. Support beyond the 30 days, including updates for new operating system versions, is agreed per project. After launch, an{" "}
        <Link href="/services/application-security-audit" className="text-primary hover:underline font-medium">
          application security audit
        </Link>{" "}
        can also check the finished system.
      </>
    )
  }
];

export default function WebMobileFAQ() {
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
              Investing in business software means being clear on data access, offline behaviour, hosting and long-term costs. Every detail is explained before work begins.
            </p>

            <div className="p-5 rounded-2xl bg-surface-container border border-surface-container-highest space-y-3">
              <div className="flex items-center gap-2 text-primary font-display text-[12px] leading-4 tracking-wider uppercase font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>DIRECT ARCHITECTURAL CONSULTATION</span>
              </div>
              <p className="font-sans text-[13px] leading-5 text-secondary">
                Have specific field worker challenges or multi-device requirements? Speak directly with Subham Sarkar.
              </p>
            </div>
          </div>

          {/* Right Accordion Column */}
          <div className="lg:col-span-7 space-y-4">
            {webMobileFaqs.map((faq, idx) => (
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
