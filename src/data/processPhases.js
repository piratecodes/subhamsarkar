export const processPhases = [
  {
    id: "discovery",
    name: "Discovery",
    badge: "PHASE 1 OF 5",
    headline: "Understanding What's Really Going On",
    narrative:
      "Before anything is built, we map out exactly how your current systems work, where things are breaking down and what is actually at risk. No assumptions, just a clear, honest picture of where you stand.",
    bullets: [
      "Review of your current systems and workflows",
      "Identifying what is actually causing problems, not just symptoms",
      "A clear list of risks and priorities before any work begins",
    ],
    deliverable: "A clear breakdown of the problem",
    involvement: "1 to 2 short conversations",
    outcome: "A shared understanding before any commitment",
  },
  {
    id: "planning",
    name: "Planning",
    badge: "PHASE 2 OF 5",
    headline: "Planning Before Building",
    narrative:
      "We design how the system will actually work: how data flows, how it connects to what you already use and how it will hold up as your business grows, before a single line of code is written.",
    bullets: [
      "A clear plan for how the system will be structured",
      "Decisions made upfront, not discovered mid-project",
      "Your sign-off before development begins",
    ],
    deliverable: "A full plan you can review and approve",
    involvement: "One review conversation",
    outcome: "Fewer surprises once building starts",
  },
  {
    id: "building",
    name: "Building",
    badge: "PHASE 3 OF 5",
    headline: "Building the Core System",
    narrative:
      "This is where the actual system gets built, piece by piece and tested as we go, so issues get caught early rather than discovered later.",
    bullets: [
      "Regular check-ins so you see real progress, not silence",
      "Testing happens throughout, not just at the end",
      "Milestone-based delivery, so payment matches visible work",
    ],
    deliverable: "A working system, built in stages",
    involvement: "Periodic check-ins",
    outcome: "Progress you can see at every milestone",
  },
  {
    id: "testing",
    name: "Testing & Migration",
    badge: "PHASE 4 OF 5",
    headline: "Testing and Safely Moving Over",
    narrative:
      "If this involves replacing or connecting to an existing system, this is where we make sure nothing breaks in the process. Old and new run side by side until the results are checked.",
    bullets: [
      "Old and new systems tested in parallel before any switch, where an existing system is being replaced",
      "Data checked against the source before it is relied on",
      "A gradual transition in stages, not a risky all-at-once switch",
    ],
    deliverable: "A thoroughly tested system",
    involvement: "Final review and approval",
    outcome: "Confidence before going live",
  },
  {
    id: "launch",
    name: "Launch",
    badge: "PHASE 5 OF 5",
    headline: "Launch, Training and Support",
    narrative:
      "Once everything is tested and stable, the system goes live. Your team gets a proper walkthrough and documentation so they can use it with confidence, and support continues after launch, so nobody is left alone with a new system.",
    bullets: [
      "Launch in a production environment chosen for your requirements",
      "A walkthrough and documentation so your team understands how everything works",
      "30 days of support included, with further support available if you want it",
    ],
    deliverable: "A live system, documentation and a walkthrough",
    involvement: "One final walkthrough session",
    outcome: "A system your team can use with confidence",
  },
];;

export const phaseData = processPhases;
