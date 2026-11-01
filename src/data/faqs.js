import { Settings2, Globe, FileText, Shield } from "lucide-react";

export const servicesFaqs = [
  {
    queryNum: "QUERY 01",
    topic: "EXISTING SYSTEMS",
    question: "Do you work with an existing tech setup or only from scratch?",
    answer: "Both. A large share of the work I do involves existing systems that have become slow, outdated, or difficult to maintain - not just new builds. Where possible, we improve and modernize what you already have step by step, rather than forcing a risky full rebuild."
  },
  {
    queryNum: "QUERY 02",
    topic: "CONFIDENTIALITY & OWNERSHIP",
    question: "How do you handle confidentiality and proprietary business logic?",
    answer: "Every engagement is covered by a confidentiality agreement before any technical details are discussed. Code is written directly into your own private repository, not mine - and business logic built for one client is never reused or shared with another."
  },
  {
    queryNum: "QUERY 03",
    topic: "TIMELINES & SCHEDULES",
    question: "What is a typical project timeline and deployment milestone schedule?",
    answer: "Every project is different, so timelines are only defined after I review your requirements. Work is broken into clear milestones, so you always know what is being delivered and when."
  },
  {
    queryNum: "QUERY 04",
    topic: "SUPPORT AFTER LAUNCH",
    question: "Do you offer post-launch maintenance and emergency support?",
    answer: "Yes. Every build includes a stabilization period after launch to catch and fix any issues, at no extra cost. After that, ongoing support and maintenance are available if you want them - but they're never a requirement to keep your system running."
  },
  {
    queryNum: "QUERY 05",
    topic: "OWNERSHIP & INDEPENDENCE",
    question: "Can systems be handed off fully to our internal engineering team without vendor lock-in?",
    answer: "Yes - this is a core principle of how I build. Every solution is built using common, widely-supported technologies, not proprietary tools only I can maintain. You receive full documentation and a proper handoff, so your own team can maintain and extend the system independently, with or without me."
  }
];

export const processFaqs = [
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

export const contactFaqs = [
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
    answer: "Yes, routinely. Bilateral mutual non-disclosure agreements can be executed prior to technical scoping, safeguarding all trade secrets, IP, database schema plans, and commercial algorithms."
  }
];
