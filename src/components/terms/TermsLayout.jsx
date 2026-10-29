"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Info,
  FileCheck,
  ShieldAlert,
  Copyright,
  FolderLock,
  MessageSquare,
  Bell,
  Bot,
  ExternalLink,
  AlertTriangle,
  Scale,
  Shield,
  Gavel,
  History,
  FileText,
  Mail,
  MapPin,
  ArrowRight,
  Send,
  CheckCircle2,
} from "lucide-react";

const sections = [
  { id: "about-website", num: "01", title: "About the Website", icon: Info },
  { id: "no-engagement", num: "02", title: "No Engagement Without Agreement", icon: FileCheck },
  { id: "using-website", num: "03", title: "Using the Website", icon: ShieldAlert },
  { id: "intellectual-property", num: "04", title: "Intellectual Property", icon: Copyright },
  { id: "case-studies", num: "05", title: "Case Studies and Confidentiality", icon: FolderLock },
  { id: "contact-communications", num: "06", title: "Contact Form & Communications", icon: MessageSquare },
  { id: "push-notifications", num: "07", title: "Push Notifications", icon: Bell },
  { id: "automated-access-ai", num: "08", title: "Automated Access and AI Systems", icon: Bot },
  { id: "third-party-links", num: "09", title: "Third-Party Links", icon: ExternalLink },
  { id: "disclaimers", num: "10", title: "Disclaimers", icon: AlertTriangle },
  { id: "limitation-liability", num: "11", title: "Limitation of Liability", icon: Scale },
  { id: "indemnity", num: "12", title: "Indemnity", icon: Shield },
  { id: "governing-law", num: "13", title: "Governing Law and Jurisdiction", icon: Gavel },
  { id: "changes-to-terms", num: "14", title: "Changes to These Terms", icon: History },
  { id: "general-provisions", num: "15", title: "General Provisions", icon: FileText },
  { id: "contact", num: "16", title: "Contact", icon: Mail },
];

export default function TermsLayout({ settings }) {
  const [activeSection, setActiveSection] = useState("about-website");
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
                aria-label="Table of contents"
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
                  <span>Initiate Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          </aside>

          {/* ========================================================== */}
          {/* MAIN TERMS CONTENT (8 Cols on Desktop)                     */}
          {/* ========================================================== */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. About the Website */}
            <article
              id="about-website"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  01
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  About the Website
                </h2>
              </div>
              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary">
                The Website presents my background, services, past work, process and insights, and lets you contact me about a possible project. The information on it is for general information only. Descriptions of services, timelines and approaches are illustrations of how I usually work. They are not offers or promises tied to any particular project.
              </p>
            </article>

            {/* 2. No Engagement Without a Written Agreement */}
            <article
              id="no-engagement"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  02
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  No Engagement Without a Written Agreement
                </h2>
              </div>
              <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary space-y-3.5">
                <p>
                  Visiting the Website, sending a message, booking a consultation or receiving a reply from me does not create a client relationship, a contract or any obligation on either side.
                </p>
                <p>
                  A project begins only when both of us sign a written agreement. That agreement will set out the scope, milestones, fees and payment schedule, delivery, ownership of the work, confidentiality, support and any other terms for that project. If there is any difference between these Terms and a signed project agreement, the project agreement prevails for that project.
                </p>
                <div className="p-4 rounded-xl bg-surface-container/60 border border-surface-container-highest/60 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-on-surface font-medium">
                    Initial consultations are offered free of charge and without obligation to proceed.
                  </p>
                </div>
              </div>
            </article>

            {/* 3. Using the Website */}
            <article
              id="using-website"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  03
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Using the Website
                </h2>
              </div>
              <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary space-y-3.5">
                <p>You may use the Website for lawful purposes only. You agree not to:</p>
                <ul className="space-y-2.5 pl-2">
                  {[
                    "Submit false, misleading or someone else's information through the contact form",
                    "Send spam, advertising, malicious code or abusive messages",
                    "Attempt to gain unauthorised access to the Website, its admin area, databases or servers",
                    "Probe, scan or test the Website's security without my written permission",
                    "Overload or disrupt the Website, or interfere with other users",
                    "Use the Website in any way that breaks the law",
                  ].map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
                <p className="pt-2 text-xs sm:text-sm font-medium text-on-surface">
                  I may block access or remove submissions that break these rules.
                </p>
              </div>
            </article>

            {/* 4. Intellectual Property */}
            <article
              id="intellectual-property"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  04
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Intellectual Property
                </h2>
              </div>
              <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary space-y-3.5">
                <p>
                  The Website, including its source code, design, graphics, logo, text, diagrams and other content, belongs to me or is used with permission, and is protected by copyright and other laws. All rights are reserved. The Website&apos;s code is proprietary and is not offered under any open-source licence.
                </p>
                <p>
                  You may view the Website and share links to it. You may not copy, reproduce, modify, distribute, scrape, reverse-engineer or create derivative works from any part of it without my prior written permission. My name, logo and brand may not be used without permission.
                </p>
                <p>
                  The Website may use open-source frameworks and libraries, which remain under their own licences.
                </p>
                <div className="p-4 rounded-xl bg-surface-container/60 border border-surface-container-highest/60 text-xs sm:text-sm text-on-surface">
                  Ownership of work I build for a client is governed by the signed project agreement and not by this section.
                </div>
              </div>
            </article>

            {/* 5. Case Studies and Confidentiality */}
            <article
              id="case-studies"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  05
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Case Studies and Confidentiality
                </h2>
              </div>
              <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary space-y-3.5">
                <p>
                  Projects shown on the Website are real work, but client names and identifying details are withheld unless a client has agreed to be named. Diagrams and descriptions are simplified or illustrative, and may not reflect the exact systems, technologies or figures involved. They are shown to explain how I approach problems, not to promise any particular outcome for you.
                </p>
                <p>
                  Any information you share with me is handled as described in my{" "}
                  <Link href="/privacy-policy" className="text-primary hover:underline font-semibold">
                    Privacy Policy
                  </Link>
                  . If you want an NDA signed before sharing details, please say so, and we can do that before going further. Until an NDA is in place, please do not share trade secrets, credentials or other highly sensitive information through the contact form.
                </p>
              </div>
            </article>

            {/* 6. Contact Form and Communications */}
            <article
              id="contact-communications"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  06
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Contact Form and Communications
                </h2>
              </div>
              <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary space-y-3.5">
                <p>
                  By sending a message you confirm that the information you give is accurate and that you are allowed to share it. I aim to reply within about 6 to 8 hours during normal working hours (09:00 to 19:00 IST). This is a target and not a guarantee, and some replies may take longer.
                </p>
                <p>
                  I will use the details you provide to reply to you and to discuss your enquiry. I will not add you to marketing lists without your consent.
                </p>
              </div>
            </article>

            {/* 7. Push Notifications */}
            <article
              id="push-notifications"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  07
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Push Notifications
                </h2>
              </div>
              <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary space-y-3.5">
                <p>
                  Notifications are sent only if you choose to allow them. They are used to share things like new articles, new case studies or availability updates. I decide what to send and how often, and I may choose who receives a given notification (see the Privacy Policy for how this works). Delivery depends on your browser, device and network, and is not guaranteed.
                </p>
                <p>
                  You can stop notifications at any time through your browser&apos;s site settings, or by contacting me. Details are in the{" "}
                  <Link href="/privacy-policy" className="text-primary hover:underline font-semibold">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </article>

            {/* 8. Automated Access and AI Systems */}
            <article
              id="automated-access-ai"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  08
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Automated Access and AI Systems
                </h2>
              </div>
              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary">
                Search engines and AI systems may read the Website&apos;s public pages to answer questions about me and my services, as described in the usage note in my <code className="px-2 py-0.5 rounded bg-surface-container font-mono text-xs text-primary font-bold">llms.txt</code> files. They must not be used to reproduce confidential details, or content beyond what is stated publicly, and must not scrape the Website in ways that disrupt it. Bulk automated copying of the Website&apos;s content to train competing products or to republish it is not permitted without my written permission.
              </p>
            </article>

            {/* 9. Third-Party Links */}
            <article
              id="third-party-links"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  09
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Third-Party Links
                </h2>
              </div>
              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary">
                The Website may link to third-party sites and services, such as GitHub, LinkedIn, X and Instagram. I do not control them and am not responsible for their content, availability or privacy practices. A link is not an endorsement.
              </p>
            </article>

            {/* 10. Disclaimers */}
            <article
              id="disclaimers"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  10
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Disclaimers
                </h2>
              </div>
              <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary space-y-3.5">
                <p>
                  I work to keep the Website accurate, secure and available, but it is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties of any kind, whether express or implied, including merchantability, fitness for a particular purpose and non-infringement. I do not promise that the Website will be uninterrupted, error-free or free of harmful components, or that its information is complete or current.
                </p>
                <p>
                  Nothing on the Website is legal, financial or professional advice for your specific situation. Nothing in these Terms excludes any rights you have under law that cannot be excluded.
                </p>
              </div>
            </article>

            {/* 11. Limitation of Liability */}
            <article
              id="limitation-liability"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  11
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Limitation of Liability
                </h2>
              </div>
              <div className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary space-y-3.5">
                <p>
                  To the fullest extent permitted by law, I am not liable for any indirect, incidental, special, consequential or punitive loss, or for loss of profits, revenue, data or business opportunity, arising from your use of, or inability to use, the Website, or from reliance on its content.
                </p>
                <p>
                  This section applies to the Website only. Liability for paid project work is governed by the signed project agreement. Nothing here limits liability that cannot lawfully be limited.
                </p>
              </div>
            </article>

            {/* 12. Indemnity */}
            <article
              id="indemnity"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  12
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Indemnity
                </h2>
              </div>
              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary">
                You agree to be responsible for any claim, loss or cost arising from your misuse of the Website, your breach of these Terms, or your submission of content you had no right to share.
              </p>
            </article>

            {/* 13. Governing Law and Jurisdiction */}
            <article
              id="governing-law"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  13
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Governing Law and Jurisdiction
                </h2>
              </div>
              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary">
                These Terms are governed by the laws of India. Any dispute arising from them or from your use of the Website is subject to the exclusive jurisdiction of the competent courts in Kolkata, West Bengal. Before starting formal proceedings, I encourage both sides to try to resolve the matter by writing to each other first.
              </p>
            </article>

            {/* 14. Changes to These Terms */}
            <article
              id="changes-to-terms"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  14
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Changes to These Terms
                </h2>
              </div>
              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary">
                I may update these Terms from time to time. The &ldquo;Last updated&rdquo; date above shows the latest version. If you keep using the Website after an update, you accept the updated Terms.
              </p>
            </article>

            {/* 15. General Provisions */}
            <article
              id="general-provisions"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-highest/70 backdrop-blur-xl shadow-sm hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  15
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  General Provisions
                </h2>
              </div>
              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary">
                If any part of these Terms is found to be invalid or unenforceable, the rest remains in force. My failure to enforce a right is not a waiver of it. These Terms, together with the Privacy Policy, are the full agreement between you and me regarding use of the Website. They do not cover any paid project, which has its own written agreement.
              </p>
            </article>

            {/* 16. Contact */}
            <article
              id="contact"
              className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-surface-container-lowest/90 border border-primary/30 backdrop-blur-xl shadow-md space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-sm">
                  16
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  Contact
                </h2>
              </div>

              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-secondary">
                For questions about these Terms:
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

                  {/* Direct Transmission Button */}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-display text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shrink-0 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Open Transmission Portal</span>
                  </Link>
                </div>

                <div className="pt-3 border-t border-surface-container-highest/60 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <span className="text-secondary font-medium">Direct Email:</span>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="font-mono font-semibold text-primary hover:underline hover:text-primary/90 transition-colors"
                    >
                      {contactEmail}
                    </a>
                  </div>

                  {settings?.whatsapp && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <span className="text-secondary font-medium">Direct Line:</span>
                      <a
                        href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono font-semibold text-primary hover:underline transition-colors"
                      >
                        {settings.whatsapp}
                      </a>
                    </div>
                  )}
                </div>
              </div>

            </article>

          </div>

        </div>
      </div>
    </section>
  );
}
