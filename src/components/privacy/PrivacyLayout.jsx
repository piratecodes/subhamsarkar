"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  UserCheck,
  Database,
  Cookie,
  Bell,
  CheckCircle2,
  Share2,
  Globe,
  Clock,
  ShieldCheck,
  UserCheck2,
  UserX,
  Baby,
  ExternalLink,
  History,
  Mail,
  MapPin,
  ArrowRight,
  Send,
} from "lucide-react";

const sections = [
  { id: "who-i-am", num: "01", title: "Who I Am and What This Policy Covers", icon: UserCheck },
  { id: "info-collect", num: "02", title: "Information I Collect", icon: Database },
  { id: "cookies-storage", num: "03", title: "Cookies, Local Storage & Technologies", icon: Cookie },
  { id: "push-notifications", num: "04", title: "Push Notifications & Interest Grouping", icon: Bell },
  { id: "why-use-info", num: "05", title: "Why I Use Your Information", icon: CheckCircle2 },
  { id: "who-share", num: "06", title: "Who I Share It With", icon: Share2 },
  { id: "international-transfers", num: "07", title: "International Data Transfers", icon: Globe },
  { id: "how-long-keep", num: "08", title: "How Long I Keep Your Information", icon: Clock },
  { id: "how-protect", num: "09", title: "How I Protect Your Information", icon: ShieldCheck },
  { id: "your-rights", num: "10", title: "Your Rights", icon: UserCheck2 },
  { id: "withdraw-consent", num: "11", title: "How to Withdraw Consent or Unsubscribe", icon: UserX },
  { id: "children-privacy", num: "12", title: "Children's Privacy", icon: Baby },
  { id: "third-party-links", num: "13", title: "Third-Party Links", icon: ExternalLink },
  { id: "changes-policy", num: "14", title: "Changes to This Policy", icon: History },
  { id: "contact-grievance", num: "15", title: "Contact and Grievance Redressal", icon: Mail },
];

export default function PrivacyLayout({ settings }) {
  const [activeSection, setActiveSection] = useState("who-i-am");
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall page scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
        setReadingProgress(progress);
      }

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i].id);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  const contactEmail = settings?.email || "hello@subhamsarkar.dev";
  const contactAddress = settings?.address || "Kolkata, West Bengal, India";

  return (
    <section className="w-full py-16 relative">
      <div className="w-full container px-4 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ========================================================== */}
          {/* STICKY TABLE OF CONTENTS SIDEBAR (4 Cols on Desktop)       */}
          {/* ========================================================== */}
          <aside className="lg:col-span-4 sticky top-28 z-20">
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl border border-surface-container-highest/70 shadow-lg space-y-4">
              
              {/* Sidebar Header & Progress Bar */}
              <div className="space-y-3 pb-3 border-b border-surface-container-highest/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="font-display text-[11px] font-bold uppercase tracking-widest text-on-surface">
                      TABLE OF CONTENTS
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-primary">
                    {readingProgress}%
                  </span>
                </div>

                {/* Progress bar track */}
                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-150 ease-out rounded-full"
                    style={{ width: `${readingProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Scrollable Navigation List */}
              <nav
                aria-label="Privacy Table of contents"
                className="max-h-[calc(100vh-280px)] overflow-y-auto space-y-1 pr-1 scrollbar-thin scrollbar-thumb-surface-container-highest"
              >
                {sections.map((item) => {
                  const isActive = activeSection === item.id;
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => scrollToSection(e, item.id)}
                      className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-display transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-on-primary font-bold shadow-sm translate-x-1"
                          : "text-secondary hover:text-on-surface hover:bg-surface-container/60 font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <span
                          className={`font-mono text-[10px] shrink-0 ${
                            isActive ? "text-on-primary/80" : "text-primary/70 group-hover:text-primary"
                          }`}
                        >
                          {item.num}
                        </span>
                        <span className="truncate tracking-wide">{item.title}</span>
                      </div>
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                          isActive
                            ? "text-on-primary scale-110"
                            : "text-secondary/50 group-hover:text-primary group-hover:scale-105"
                        }`}
                      />
                    </a>
                  );
                })}
              </nav>

              {/* Direct Quick Action in Sidebar */}
              <div className="pt-2 border-t border-surface-container-highest/60">
                <Link
                  href="/contact"
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-primary text-on-surface hover:text-on-primary font-display text-[11px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group shadow-sm"
                >
                  <span>Contact Subham</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          </aside>

          {/* ========================================================== */}
          {/* MAIN PRIVACY CONTENT (8 Cols on Desktop)                   */}
          {/* ========================================================== */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Who I Am and What This Policy Covers */}
            <article
              id="who-i-am"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  01
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Who I Am and What This Policy Covers
                </h2>
              </div>
              <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary space-y-3.5">
                <p>
                  The Website is operated by <strong className="text-on-surface">Subham Sarkar</strong>, a software architect and ERP/CRM developer based in {contactAddress}. For the purposes of applicable data protection law, I am the party that decides how your personal information is used (the &ldquo;Data Fiduciary&rdquo; under India&apos;s Digital Personal Data Protection Act, 2023, and the &ldquo;controller&rdquo; under laws such as the GDPR).
                </p>
                <div className="p-4 rounded-xl bg-surface-container/60 border border-surface-container-highest/60 text-xs sm:text-sm text-on-surface">
                  This policy applies to the Website only. It does not cover information shared with me later under a signed project agreement or NDA. That information is governed by that agreement.
                </div>
              </div>
            </article>

            {/* 2. Information I Collect */}
            <article
              id="info-collect"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  02
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Information I Collect
                </h2>
              </div>
              <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary space-y-4">
                
                <div className="p-4 rounded-xl bg-surface-container/40 border border-surface-container-highest/60 space-y-1">
                  <h3 className="font-display text-sm font-bold text-on-surface">
                    a) Information you give me
                  </h3>
                  <p className="text-xs sm:text-sm">
                    When you use the contact form, I collect your first name, last name, email address, phone number (optional, with country code), the type of help you need, when you want to start, the project details you write, and whether you would like an NDA signed before sharing details. If you email me, I collect your email address and whatever you include in your message.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-container/40 border border-surface-container-highest/60 space-y-1">
                  <h3 className="font-display text-sm font-bold text-on-surface">
                    b) Push notification information
                  </h3>
                  <p className="text-xs sm:text-sm">
                    If you choose to allow notifications, your browser gives me a push subscription: a technical address (endpoint) and encryption keys that let me send notifications to your browser. This does not include your name or email address.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-container/40 border border-surface-container-highest/60 space-y-1">
                  <h3 className="font-display text-sm font-bold text-on-surface">
                    c) Browsing activity
                  </h3>
                  <p className="text-xs sm:text-sm">
                    On selected pages (Insights articles, Services, Work and Contact) I record which pages you view, how far you scroll on an article, a random session identifier, how many separate visits you have made, the dates of your first and last visit, and whether you have submitted the contact form.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-container/40 border border-surface-container-highest/60 space-y-1">
                  <h3 className="font-display text-sm font-bold text-on-surface">
                    d) Technical information
                  </h3>
                  <p className="text-xs sm:text-sm">
                    My hosting provider and servers may automatically log your IP address, browser type, device type, referring page and the time of your visit. This is used for security and for keeping the Website running.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-container/60 border border-primary/20 space-y-1">
                  <h3 className="font-display text-sm font-bold text-primary">
                    e) What I do not collect
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface">
                    I do not take payments through the Website, and I do not ask for sensitive personal data such as ID numbers, bank details or health information. Please do not include these in the contact form.
                  </p>
                </div>

              </div>
            </article>

            {/* 3. Cookies, Local Storage and Similar Technologies */}
            <article
              id="cookies-storage"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  03
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Cookies, Local Storage and Similar Technologies
                </h2>
              </div>
              <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary space-y-3.5">
                <p>
                  The Website uses a random session identifier stored in your browser (in a cookie or local storage) so that visits to the pages listed in Section 2(c) can be grouped together. It contains no personal details on its own.
                </p>
                <p>
                  I also use Google Analytics and Cloudflare Web Analytics to measure aggregated traffic trends and site performance without personally identifying individual visitors.
                </p>
                <div className="p-4 rounded-xl bg-surface-container/60 border border-surface-container-highest/60 text-xs sm:text-sm text-on-surface">
                  You can clear or block cookies and local storage in your browser settings at any time. Blocking them will not stop you from reading the Website or using the contact form.
                </div>
              </div>
            </article>

            {/* 4. Push Notifications and Interest Grouping */}
            <article
              id="push-notifications"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  04
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Push Notifications and Interest Grouping
                </h2>
              </div>
              <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary space-y-3.5">
                <p>
                  Push notifications are strictly opt-in. I only send them if you click &ldquo;Allow&rdquo; in your browser prompt.
                </p>
                <p>
                  To avoid sending irrelevant messages, I place push subscribers into broad groups based on the browsing activity in Section 2(c):
                </p>
                <ul className="space-y-2.5 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                    <span><strong className="text-on-surface">Readers</strong>, who read my Insights articles in depth.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                    <span><strong className="text-on-surface">Prospective clients</strong>, who have looked at my Services, Work or Contact pages.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                    <span><strong className="text-on-surface">General visitors</strong>, who have browsed briefly.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                    <span><strong className="text-on-surface">Existing enquirers</strong>, who have submitted the contact form. I stop sending broadcast notifications to them, because I communicate with them directly.</span>
                  </li>
                </ul>
                <p>
                  I also note whether a subscriber has been active recently, so that I send fewer or no notifications to people who have not visited for a long time.
                </p>
                <p className="text-xs sm:text-sm text-secondary/90">
                  If you browsed the Website before allowing notifications, activity recorded under your session identifier may be linked to your push subscription once you allow them. This grouping is used only to decide which notifications to send you. It is not used to make decisions that have legal or similarly significant effects on you.
                </p>
              </div>
            </article>

            {/* 5. Why I Use Your Information */}
            <article
              id="why-use-info"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  05
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Why I Use Your Information
                </h2>
              </div>
              <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary space-y-4">
                
                {/* Structured Matrix Table */}
                <div className="overflow-x-auto rounded-xl border border-surface-container-highest/70">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-surface-container/80 text-on-surface font-display uppercase tracking-wider text-[11px] border-b border-surface-container-highest/70">
                      <tr>
                        <th className="py-3 px-4">Purpose</th>
                        <th className="py-3 px-4">Information used</th>
                        <th className="py-3 px-4">Basis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container-highest/50">
                      <tr>
                        <td className="py-3 px-4 font-medium text-on-surface">Replying to your enquiry and discussing a possible project</td>
                        <td className="py-3 px-4">Contact form details</td>
                        <td className="py-3 px-4">Your request, and steps before entering a contract</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-on-surface">Sending push notifications</td>
                        <td className="py-3 px-4">Push subscription</td>
                        <td className="py-3 px-4">Your consent</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-on-surface">Choosing relevant notifications</td>
                        <td className="py-3 px-4">Browsing activity, session identifier</td>
                        <td className="py-3 px-4">Your consent</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-on-surface">Keeping the Website secure and working</td>
                        <td className="py-3 px-4">Technical logs</td>
                        <td className="py-3 px-4">Legitimate interests and uses permitted by law</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-on-surface">Meeting legal obligations</td>
                        <td className="py-3 px-4">As required</td>
                        <td className="py-3 px-4">Legal obligation</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-xl bg-surface-container/60 border border-surface-container-highest/60 text-xs sm:text-sm font-medium text-on-surface">
                  I do not sell your personal information, and I do not use it for advertising.
                </div>
              </div>
            </article>

            {/* 6. Who I Share It With */}
            <article
              id="who-share"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  06
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Who I Share It With
                </h2>
              </div>
              <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary space-y-3.5">
                <p>
                  I share information only with service providers who help run the Website, and only as needed:
                </p>
                <ul className="space-y-2.5 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                    <span><strong className="text-on-surface">Analytics and telemetry:</strong> Google Analytics (Google LLC) and Cloudflare Web Analytics (Cloudflare, Inc.) for aggregated, anonymized traffic measurement and site reliability analysis.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                    <span><strong className="text-on-surface">Hosting and infrastructure:</strong> Cloudflare edge routing, DDoS mitigation, and enterprise VPS server providers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                    <span><strong className="text-on-surface">Database:</strong> Secure, managed relational database infrastructure accessed exclusively via verified server actions.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                    <span><strong className="text-on-surface">Email delivery and inbox:</strong> Google Workspace and secure authenticated SMTP transmission relays.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                    <span><strong className="text-on-surface">Push delivery:</strong> Browser vendors&apos; push services (such as those operated by Google, Mozilla, Apple and Microsoft) carry notifications to your device.</span>
                  </li>
                </ul>
                <p className="pt-2 text-xs sm:text-sm font-medium text-on-surface">
                  I may also disclose information if the law requires it, or to protect my legal rights. I do not share contact form details with other clients or businesses.
                </p>
              </div>
            </article>

            {/* 7. International Data Transfers */}
            <article
              id="international-transfers"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  07
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  International Data Transfers
                </h2>
              </div>
              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary">
                I am based in India, but some providers may store or process data on servers in other countries. Where this happens, I rely on providers with appropriate security practices and apply the safeguards required by the law that applies to you.
              </p>
            </article>

            {/* 8. How Long I Keep Your Information */}
            <article
              id="how-long-keep"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  08
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  How Long I Keep Your Information
                </h2>
              </div>
              <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary space-y-4">
                
                {/* Retention Schedule Table */}
                <div className="overflow-x-auto rounded-xl border border-surface-container-highest/70">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-surface-container/80 text-on-surface font-display uppercase tracking-wider text-[11px] border-b border-surface-container-highest/70">
                      <tr>
                        <th className="py-3 px-4">Information</th>
                        <th className="py-3 px-4">Kept for</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container-highest/50">
                      <tr>
                        <td className="py-3 px-4 font-medium text-on-surface">Contact form enquiries that do not become a project</td>
                        <td className="py-3 px-4">24 months after the last message</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-on-surface">Client records for projects</td>
                        <td className="py-3 px-4">As required by the project agreement and by law</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-on-surface">Push subscriptions</td>
                        <td className="py-3 px-4">Until you unsubscribe, or until your browser&apos;s subscription expires (expired subscriptions are removed automatically)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-on-surface">Browsing activity records</td>
                        <td className="py-3 px-4">12 months</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-on-surface">Server logs</td>
                        <td className="py-3 px-4">90 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                  Data is retained only as long as necessary for the operational purposes stated above. Contact enquiries and telemetry records are reviewed periodically and purged either upon verified request under Section 10 or during scheduled database maintenance routines.
                </p>
              </div>
            </article>

            {/* 9. How I Protect Your Information */}
            <article
              id="how-protect"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  09
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  How I Protect Your Information
                </h2>
              </div>
              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary">
                I use reasonable technical and organisational safeguards, including encrypted connections (HTTPS), restricted access to the admin area, and limiting who can see enquiries to me alone. No system is completely secure, so I cannot guarantee absolute security. If a breach affects your personal information, I will notify you and the relevant authority as the law requires.
              </p>
            </article>

            {/* 10. Your Rights */}
            <article
              id="your-rights"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  10
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Your Rights
                </h2>
              </div>
              <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary space-y-3.5">
                <p>You have the right to:</p>
                <ul className="space-y-2 pl-2">
                  {[
                    "Know what personal information I hold about you and how it is used",
                    "Ask me to correct inaccurate or incomplete information",
                    "Ask me to erase your information",
                    "Withdraw your consent at any time",
                    "Make a complaint (see Section 15)",
                    "Nominate another person to exercise these rights for you if you cannot",
                  ].map((right, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                      <span>{right}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  If you are in the European Economic Area or the United Kingdom, you may also ask me to restrict processing, to give you a portable copy of your information, and to stop processing based on legitimate interests. You may also complain to your local data protection authority.
                </p>
                <div className="p-4 rounded-xl bg-surface-container/60 border border-surface-container-highest/60 text-xs sm:text-sm text-on-surface">
                  To use any of these rights, email me (Section 15). I will respond within 30 days, and usually sooner. I may need to confirm your identity first.
                </div>
              </div>
            </article>

            {/* 11. How to Withdraw Consent or Unsubscribe */}
            <article
              id="withdraw-consent"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  11
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  How to Withdraw Consent or Unsubscribe
                </h2>
              </div>
              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary">
                You can stop push notifications at any time through your browser&apos;s site settings for subhamsarkar.dev (look for the padlock or settings icon next to the address bar and set Notifications to Block). You can also email me and I will delete your subscription record. Withdrawing consent does not affect anything done before you withdrew it.
              </p>
            </article>

            {/* 12. Children's Privacy */}
            <article
              id="children-privacy"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  12
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Children&apos;s Privacy
                </h2>
              </div>
              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary">
                The Website is meant for businesses and adults. I do not knowingly collect information from anyone under 18. If you believe a child has submitted information, contact me and I will delete it.
              </p>
            </article>

            {/* 13. Third-Party Links */}
            <article
              id="third-party-links"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  13
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Third-Party Links
                </h2>
              </div>
              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary">
                The Website may link to other sites, such as GitHub, LinkedIn, X and Instagram. I am not responsible for their privacy practices, and I encourage you to read their policies.
              </p>
            </article>

            {/* 14. Changes to This Policy */}
            <article
              id="changes-policy"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  14
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Changes to This Policy
                </h2>
              </div>
              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary">
                I may update this policy as the Website or the law changes. The &ldquo;Last updated&rdquo; date at the top shows the latest version. If a change is significant, I will announce it on the Website.
              </p>
            </article>

            {/* 15. Contact and Grievance Redressal */}
            <article
              id="contact-grievance"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/90 border border-primary/30 backdrop-blur-xl shadow-md space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-sm">
                  15
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Contact and Grievance Redressal
                </h2>
              </div>

              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary">
                For questions, requests or complaints about your personal information:
              </p>

              {/* Dynamic Contact Box via Settings API */}
              <div className="p-6 rounded-2xl bg-surface-container/70 border border-surface-container-highest/70 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-bold text-on-surface">
                      Subham Sarkar
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-secondary font-medium">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{contactAddress}</span>
                    </div>
                  </div>

                  {/* Direct Message Button */}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-display text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shrink-0 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send a Message</span>
                  </Link>
                </div>

                <div className="pt-3 border-t border-surface-container-highest/60 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <span className="text-secondary font-medium">Direct Email:</span>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="font-mono font-semibold text-primary hover:underline hover:text-primary/90 transition-colors"
                    >
                      {contactEmail}
                    </a>
                  </div>

                  <p className="text-xs text-secondary font-medium">
                    I aim to acknowledge your message within <strong className="text-on-surface">7 days</strong> and resolve it within <strong className="text-on-surface">30 days</strong>.
                  </p>
                </div>
              </div>

            </article>

          </div>

        </div>
      </div>
    </section>
  );
}
