"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, Fragment, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, Disclosure, DisclosureButton, DisclosurePanel, Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import { ArrowRight, Compass, X, ChevronDown, ChevronLeft, ChevronRight, Check, Maximize2, ZoomIn, Activity, Database, Lock, Globe } from "lucide-react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; 

const IconMap = {
  ArrowRight, Compass, X, ChevronDown, ChevronLeft, ChevronRight, Check, Maximize2, ZoomIn, Activity, Database, Lock, Globe
}; 

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ALL_CATEGORIES = [
  { id: "all", label: "All Portfolios" },
  { id: "erp", label: "ERP Systems" },
  { id: "crm", label: "CRM & Platforms" },
  { id: "ai-agents", label: "AI Agents" },
  { id: "migration", label: "Cloud Migration" },
  { id: "web-mobile", label: "Web & Mobile" }
];

const crmCase = {
  category: "crm",
  industry: "Private Equity & Wealth Management",
  industry_niche: "FinTech Fund Administration",
  associatedWith: "Apex Group",
  ref: "REF: 2024-02",
  status: "Completed, Active",
  discipline: "FinTech CRM",
  title: "Bringing 4 Disconnected Tools Into One Secure System",
  summary: "Fund managers and investors were working across separate apps and spreadsheets that didn't stay in sync, creating real compliance risk during high-value transactions.",
  pipeline: [
    { text: "Disconnected Tools", type: "bg-surface-container-highest/75 text-on-surface border border-outline/10" },
    { text: "Real-Time Sync", type: "bg-primary/10 text-primary border border-primary/30 shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.1)]" },
    { text: "Secure, Unified System", type: "bg-surface-container-highest/75 text-on-surface border border-outline/10" }
  ],
  bottleneck: "Investors and fund managers relied on disconnected mobile apps and internal spreadsheets that frequently fell out of sync, creating serious compliance risk during high-value capital transactions.",
  approach: "We built one secure system where all portals stay synchronized in real time, with clear role-based access and a complete, tamper-evident record of every action taken.",
  outcome: "Four separate tools were consolidated into one system. Data now stays consistent everywhere, and every transaction is fully accounted for with no discrepancies.",
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD3uE8Aw5XumIfE1mnFitEPkE9QERMeY3YmaWElxsRU7UkBhDMkuGMj3PI1lde8qeYSBY-EzLF7eveJydoV8U4IHvh_JWssZb0SHUj5gTgNTNE1atCSllHmWs8jP6S0uVg7jx2km-VKsM40c27Gdn8XCdCADEeo0l_Q4MasI7k86IefFPsC-MYHRMFgV7IHKW6gznWhOP5zWyXi0JWYOIZl2dPDFGP-kQBHTmBic8G20O_fJlNYONJpfg",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDy2pNX2gNasEr06CgFT4dX2a_M_gQp7u2dGaAr1Jj25tRNUNSIdDap_RBGUybsy-x_jMzfuTKrm-IWHJk1gp4LlhI_-ENplgpX3PRPZdA7CsjW-JRBDhHRYQicTojMgXgj6QFg8CFDppcvbQKV_A26EZRxu586B118gY8SnEgNJYrv3TIldNfBLpUQNt0aEMhU_41rykeRlkaVEMWkG_N66ZeZhnTvvY4CVph-kg_VS-pgBtMUxUtFXA",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCDPEr5RLDMx_wQuqyIAkuK2gc44xW6MbpjMAMziDz0IvqFJom6ekOl8YDHjbDeWQJ_T84Nu41_wuWDpp4gWeyxsvT7Mv1_XjLfmi6nA2hThoO4NL4wm-vqp9Cw17gGgnrmXXYl0eyAPasLQQSjSikPo_gDS5Sl93m1vf6v2uKW4T1AizSM7kOBI0lYdY3xD-fOMvsaO9AKcRxaWR1ifw6eP19-5CfGCxtn1kuuA53cIIbz6QvPHjhVPg"
  ],
  stats: {
    left: "DATA CONFLICTS: NONE",
    right: "AUDIT TRAIL: COMPLETE"
  },
  topologySchematic: {
    nodes: [
      { label: "Client Portals", sublabel: "Web & Mobile Access", highlighted: false, icon: Globe },
      { label: "Sync Layer", sublabel: "Keeps Everything Consistent", highlighted: false, icon: Activity },
      { label: "Core System", sublabel: "Fund & Investor Records", highlighted: true, icon: Database },
      { label: "Audit Log", sublabel: "Complete Transaction History", highlighted: false, icon: Lock }
    ]
  },
  technicalDetails: [
    {
      groupLabel: "How Data Stays in Sync",
      body: "Every portal connects to a single source of truth, so no one is ever looking at outdated information.",
      bullets: [
        "Real-time updates across all connected portals",
        "Role-based access so each user sees only what they should",
        "No manual reconciliation required between systems"
      ]
    },
    {
      groupLabel: "Audit & Accountability",
      body: "Every action taken in the system is recorded clearly, so nothing is ever in question later.",
      bullets: [
        "Complete, tamper-evident record of every transaction",
        "Full history available for compliance review at any time"
      ]
    }
  ]
};

const erpCase = {
  category: "erp",
  industry: "Global Freight & Customs",
  industry_niche: "Multi-Port Logistics",
  associatedWith: "Trans-Pacific Authority",
  ref: "REF: 2024-01",
  status: "In Production",
  discipline: "Supply Chain ERP",
  title: "Autonomous Multi-Port Supply Chain ERP",
  summary: "Full-scale structural overhaul replacing fragmented spreadsheets with an isolated, multi-currency ledger processing 1.2M automated manifests monthly.",
  pipeline: [
    { text: "Legacy Spreadsheets", type: "bg-surface-container-highest/75 text-on-surface border border-outline/10" },
    { text: "Unified Multi-Ledger", type: "bg-primary/10 text-primary border border-primary/30 shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.1)]" },
    { text: "Automated Customs", type: "bg-surface-container-highest/75 text-on-surface border border-outline/10" }
  ],
  bottleneck: "Legacy spreadsheet fragmentation across 14 freight terminals caused compliance lag and massive processing delays.",
  approach: "Engineered an isolated event-driven ERP with multi-currency dynamic hedging and zero-loss offline sync.",
  outcome: "Eliminated manual freight customs lag entirely, dropping processing latency by 74%.",
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDy2pNX2gNasEr06CgFT4dX2a_M_gQp7u2dGaAr1Jj25tRNUNSIdDap_RBGUybsy-x_jMzfuTKrm-IWHJk1gp4LlhI_-ENplgpX3PRPZdA7CsjW-JRBDhHRYQicTojMgXgj6QFg8CFDppcvbQKV_A26EZRxu586B118gY8SnEgNJYrv3TIldNfBLpUQNt0aEMhU_41rykeRlkaVEMWkG_N66ZeZhnTvvY4CVph-kg_VS-pgBtMUxUtFXA",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCDPEr5RLDMx_wQuqyIAkuK2gc44xW6MbpjMAMziDz0IvqFJom6ekOl8YDHjbDeWQJ_T84Nu41_wuWDpp4gWeyxsvT7Mv1_XjLfmi6nA2hThoO4NL4wm-vqp9Cw17gGgnrmXXYl0eyAPasLQQSjSikPo_gDS5Sl93m1vf6v2uKW4T1AizSM7kOBI0lYdY3xD-fOMvsaO9AKcRxaWR1ifw6eP19-5CfGCxtn1kuuA53cIIbz6QvPHjhVPg"
  ],
  stats: {
    left: "LATENCY: -74%",
    right: "VOLUME: 1.2M/MO"
  },
  topologySchematic: {
    nodes: [
      { label: "Port Terminals", sublabel: "Edge Ingestion", highlighted: false, icon: Globe },
      { label: "Kafka Event Stream", sublabel: "Zero-Loss Queue", highlighted: true, icon: Activity },
      { label: "Central Ledger", sublabel: "Multi-Currency DB", highlighted: false, icon: Database }
    ]
  },
  technicalDetails: [
    {
      groupLabel: "Event Architecture",
      body: "Fully decoupled event streaming ensuring zero data loss during offline terminal states.",
      bullets: ["Containerized edge nodes", "Cryptographic ledger"]
    }
  ]
};

const aiCase = {
  eyebrow: "Zero-Egress Protocol",
  category: "ai-agents",
  industry: "Medical Diagnostics",
  industry_niche: "Clinical Billing",
  associatedWith: null,
  ref: "REF: 2024-03",
  status: "Completed, Zero Egress",
  discipline: "Healthcare AI Agents",
  title: "Air-Gapped AI Agent Cluster for HealthTech Billing",
  summary: "Local AI deployment operating strictly inside hospital firewalls with zero external data egress and massive claims parsing automation.",
  thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070",
  thumbnailAlt: "AI Medical Interface",
  pipeline: [
    { text: "Manual Doctor Notes", type: "bg-surface-container-highest/75 text-on-surface border border-outline/10" },
    { text: "Air-Gapped AI Parsing", type: "bg-primary/10 text-primary border border-primary/30 shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.1)]" },
    { text: "Automated ICD-10", type: "bg-surface-container-highest/75 text-on-surface border border-outline/10" }
  ],
  bottleneck: "Clinical billing staff spent 200+ manual hours daily parsing doctor notes.",
  approach: "Integrated a HIPAA-compliant local AI Agent cluster inside the hospital's network perimeter.",
  outcome: "Automated 88% of standard insurance claims parsing with zero third-party cloud data egress.",
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCDPEr5RLDMx_wQuqyIAkuK2gc44xW6MbpjMAMziDz0IvqFJom6ekOl8YDHjbDeWQJ_T84Nu41_wuWDpp4gWeyxsvT7Mv1_XjLfmi6nA2hThoO4NL4wm-vqp9Cw17gGgnrmXXYl0eyAPasLQQSjSikPo_gDS5Sl93m1vf6v2uKW4T1AizSM7kOBI0lYdY3xD-fOMvsaO9AKcRxaWR1ifw6eP19-5CfGCxtn1kuuA53cIIbz6QvPHjhVPg",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD3uE8Aw5XumIfE1mnFitEPkE9QERMeY3YmaWElxsRU7UkBhDMkuGMj3PI1lde8qeYSBY-EzLF7eveJydoV8U4IHvh_JWssZb0SHUj5gTgNTNE1atCSllHmWs8jP6S0uVg7jx2km-VKsM40c27Gdn8XCdCADEeo0l_Q4MasI7k86IefFPsC-MYHRMFgV7IHKW6gznWhOP5zWyXi0JWYOIZl2dPDFGP-kQBHTmBic8G20O_fJlNYONJpfg"
  ],
  stats: {
    left: "AUTOMATION: 88%",
    right: "DATA EGRESS: ZERO"
  },
  topologySchematic: {
    nodes: [
      { label: "EHR Ingestion", sublabel: "HL7/FHIR Protocol", highlighted: false, icon: Database },
      { label: "Local GPU Cluster", sublabel: "Quantized LLMs", highlighted: true, icon: Activity },
      { label: "Billing Output", sublabel: "ICD-10 Mapped", highlighted: false, icon: Lock }
    ]
  },
  technicalDetails: [
    {
      groupLabel: "Privacy & Compliance",
      body: "Absolute zero-egress guarantee; internet access physically disabled at the cluster level.",
      bullets: ["On-premise deployment", "HIPAA Compliant"]
    }
  ]
};

const ITEMS_PER_PAGE = 5;

export default function DossierGrid({ initialDossiers = [] }) {
  const casesData = initialDossiers || [];

  const availableCategoryIds = Array.from(new Set(casesData.map(c => c.category)));
  const customCategories = availableCategoryIds
    .filter(id => !ALL_CATEGORIES.find(c => c.id === id))
    .map(id => ({ id, label: id }));
    
  const activeCategories = [
    { id: "all", label: "All Portfolios" },
    ...ALL_CATEGORIES.filter(c => availableCategoryIds.includes(c.id)),
    ...customCategories
  ];

  const availableIndustries = Array.from(new Set(casesData.map(c => c.industry).filter(Boolean)));
  const industryOptions = [
    { id: "all", label: "All Industries" },
    ...availableIndustries.map(ind => ({ id: ind, label: ind }))
  ];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get('category');
  const urlIndustry = searchParams.get('industry');
  const urlProjectRef = searchParams.get('project');
  const urlView = searchParams.get('view');

  const validCategory = activeCategories.find(c => c.id === urlCategory) || activeCategories[0];
  const validIndustry = industryOptions.find(i => i.id === urlIndustry) || industryOptions[0];
  const validProjectRef = urlProjectRef && casesData.some(c => c.ref === urlProjectRef) ? urlProjectRef : null;

  const [selectedCategory, setSelectedCategory] = useState(validCategory);
  const [selectedIndustry, setSelectedIndustry] = useState(validIndustry);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalId, setActiveModalId] = useState(urlView === 'blueprint' ? validProjectRef : null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [highlightedRef, setHighlightedRef] = useState(null);

  // Auto-scroll logic
  useEffect(() => {
    if (validProjectRef) {
      // If opening the blueprint, do it faster and instantly so it completes before scroll-lock engages
      const isBlueprint = urlView === 'blueprint';
      const delay = isBlueprint ? 10 : 300;
      const scrollBehavior = isBlueprint ? 'auto' : 'smooth';

      const timer = setTimeout(() => {
        const el = document.getElementById(`dossier-${validProjectRef}`);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 120; // 120px top margin
          window.scrollTo({ top: y, behavior: scrollBehavior });
          
          // Only trigger the highlight pulse if we aren't covering it with the modal.
          // (This has the awesome side-effect of pulsing the item right after they close the modal!)
          if (!isBlueprint) {
            setHighlightedRef(validProjectRef);
            setTimeout(() => setHighlightedRef(null), 3500); // Remove highlight after 3.5s
          }
        }
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [validProjectRef, urlView, selectedCategory, selectedIndustry]);

  // Sync state to URL and clean up invalid params on mount/change
  useEffect(() => {
    let shouldUpdateUrl = false;
    const params = new URLSearchParams(searchParams.toString());

    if (urlCategory !== validCategory.id && urlCategory !== null) {
      if (validCategory.id === 'all') params.delete('category');
      else params.set('category', validCategory.id);
      shouldUpdateUrl = true;
    }
    
    if (urlIndustry !== validIndustry.id && urlIndustry !== null) {
      if (validIndustry.id === 'all') params.delete('industry');
      else params.set('industry', validIndustry.id);
      shouldUpdateUrl = true;
    }
    
    if (urlProjectRef !== validProjectRef && urlProjectRef !== null) {
      params.delete('project');
      shouldUpdateUrl = true;
    }

    if (urlView && urlView !== 'blueprint') {
      params.delete('view');
      shouldUpdateUrl = true;
    }
    
    // If we have a view but no valid project, clean up the view
    if (urlView === 'blueprint' && !validProjectRef) {
      params.delete('view');
      shouldUpdateUrl = true;
    }

    if (shouldUpdateUrl) {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [urlCategory, urlIndustry, urlProjectRef, urlView, validCategory.id, validIndustry.id, validProjectRef, pathname, router, searchParams]);

  // Sync state to valid URL parameters (e.g. back button navigations)
  useEffect(() => { setSelectedCategory(validCategory); }, [validCategory.id]);
  useEffect(() => { setSelectedIndustry(validIndustry); }, [validIndustry.id]);
  useEffect(() => { setActiveModalId(urlView === 'blueprint' ? validProjectRef : null); }, [validProjectRef, urlView]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    const params = new URLSearchParams(searchParams.toString());
    if (cat.id === 'all') params.delete('category');
    else params.set('category', cat.id);
    
    // Clear deep link state because the user is freely browsing
    params.delete('project');
    params.delete('view');
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleIndustryChange = (ind) => {
    setSelectedIndustry(ind);
    const params = new URLSearchParams(searchParams.toString());
    if (ind.id === 'all') params.delete('industry');
    else params.set('industry', ind.id);

    // Clear deep link state because the user is freely browsing
    params.delete('project');
    params.delete('view');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleOpenModal = (ref) => {
    setActiveModalId(ref);
    const params = new URLSearchParams(searchParams.toString());
    params.set('project', ref);
    params.set('view', 'blueprint');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCloseModal = () => {
    setActiveModalId(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('view'); 
    params.delete('project');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedIndustry, searchQuery]);

  const activeDossiers = casesData.filter(c => {
    const matchesCategory = selectedCategory.id === "all" || c.category === selectedCategory.id;
    const matchesIndustry = selectedIndustry.id === "all" || c.industry === selectedIndustry.id;
    const matchesSearch = !searchQuery || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (c.summary && c.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.bottleneck && c.bottleneck.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesIndustry && matchesSearch;
  });

  const totalPages = Math.ceil(activeDossiers.length / ITEMS_PER_PAGE);
  const paginatedDossiers = activeDossiers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const activeModalData = activeModalId ? casesData.find(c => c.ref === activeModalId) : null;

  return (
    <>
      {/* Magic Tricks Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes text-sweep {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-text-sweep {
          background-size: 200% auto;
          animation: text-sweep 4s linear infinite;
        }
        
        @keyframes spin-slow {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        @keyframes data-stream {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        .animate-data-stream {
          animation: data-stream 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        
        @keyframes highlight-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0); border-color: rgba(var(--color-primary-rgb), 0); }
          50% { box-shadow: 0 0 40px 10px rgba(var(--color-primary-rgb), 0.4); border-color: rgba(var(--color-primary-rgb), 1); }
        }
        .animate-highlight-pulse {
          animation: highlight-pulse 1s cubic-bezier(0.4, 0, 0.2, 1) 3;
          z-index: 50 !important;
        }

        @keyframes float-ambient {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-float-ambient {
          animation: float-ambient 6s ease-in-out infinite;
        }
      `}} />

      <section className="w-full bg-surface-container/30 border-y border-outline/10 relative z-20">
        <div className="w-full container px-4 lg:px-12 py-6">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 w-full">
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto flex-1">
                {/* Dynamic Dropdown Filter: Category */}
                <div className="relative w-full sm:w-64">
                  <Listbox value={selectedCategory} onChange={handleCategoryChange}>
                    <div className="relative mt-1">
                      <ListboxButton className="relative w-full cursor-default rounded-lg bg-surface-container py-3.5 pl-5 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white/75 sm:text-sm border border-outline/10 hover:border-primary/50 transition-colors group">
                        <span className="block truncate font-display text-[12px] font-bold tracking-widest uppercase text-on-surface transition-colors group-hover:text-primary">
                          CAT: {selectedCategory.label}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                          <ChevronDown className="h-4 w-4 text-primary transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
                        </span>
                      </ListboxButton>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <ListboxOptions className="absolute mt-2 max-h-60 w-full overflow-auto rounded-lg bg-surface-container-high py-2 text-base shadow-2xl ring-1 ring-black/5 focus:outline-none sm:text-sm z-50 border border-outline/10 backdrop-blur-xl">
                          {activeCategories.map((category, categoryIdx) => (
                            <ListboxOption
                              key={categoryIdx}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-3.5 pl-12 pr-4 transition-colors ${
                                  active ? 'bg-primary/10 text-primary' : 'text-on-surface hover:text-primary/70'
                                }`
                              }
                              value={category}
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate font-display text-[11px] font-semibold tracking-wider uppercase ${selected ? 'font-bold text-primary' : 'font-normal'}`}>
                                    {category.label}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary">
                                      <Check className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </Transition>
                    </div>
                  </Listbox>
                </div>

                {/* Dynamic Dropdown Filter: Industry */}
                <div className="relative w-full sm:w-64">
                  <Listbox value={selectedIndustry} onChange={handleIndustryChange}>
                    <div className="relative mt-1">
                      <ListboxButton className="relative w-full cursor-default rounded-lg bg-surface-container py-3.5 pl-5 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white/75 sm:text-sm border border-outline/10 hover:border-primary/50 transition-colors group">
                        <span className="block truncate font-display text-[12px] font-bold tracking-widest uppercase text-on-surface transition-colors group-hover:text-primary">
                          IND: {selectedIndustry.label}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                          <ChevronDown className="h-4 w-4 text-primary transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
                        </span>
                      </ListboxButton>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <ListboxOptions className="absolute mt-2 max-h-60 w-full overflow-auto rounded-lg bg-surface-container-high py-2 text-base shadow-2xl ring-1 ring-black/5 focus:outline-none sm:text-sm z-50 border border-outline/10 backdrop-blur-xl">
                          {industryOptions.map((ind, indIdx) => (
                            <ListboxOption
                              key={indIdx}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-3.5 pl-12 pr-4 transition-colors ${
                                  active ? 'bg-primary/10 text-primary' : 'text-on-surface hover:text-primary/70'
                                }`
                              }
                              value={ind}
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate font-display text-[11px] font-semibold tracking-wider uppercase ${selected ? 'font-bold text-primary' : 'font-normal'}`}>
                                    {ind.label}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-primary">
                                      <Check className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:w-80 shrink-0">
                <input
                  type="text"
                  placeholder="Search workflows & tech..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-container py-3.5 pl-10 pr-4 rounded-lg shadow-sm border border-outline/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-sans text-sm text-on-surface placeholder:text-secondary/50 transition-colors"
                />
                <svg className="absolute left-3 top-3.5 h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

            </div>

            {/* Status Info */}
            <div className="flex items-center gap-4 text-secondary font-display text-[11px] leading-4 tracking-[0.12em] font-medium uppercase shrink-0">
              <span className="hidden sm:inline">SORT: STRUCTURAL SEVERITY [DESC]</span>
              <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span>INDEX REF 2025.A</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dossier Grid Section */}
      <section className="w-full container px-4 lg:px-12 py-16 relative z-10 min-h-[400px]">
        {casesData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 bg-surface-container-lowest/50 rounded-3xl border border-surface-container-highest shadow-inner relative overflow-hidden animate-[fade-in-up_0.5s_ease-out]">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--color-primary-rgb),0.05)_0%,transparent_70%)] pointer-events-none"></div>
             <Globe className="w-20 h-20 text-primary/30 animate-[spin_10s_linear_infinite]" strokeWidth={1} />
             <h3 className="font-display text-[28px] md:text-[36px] font-bold text-on-surface tracking-wide">SYSTEM VOID</h3>
             <p className="font-sans text-secondary max-w-lg text-[15px] leading-relaxed relative z-10">
               No portfolios or case studies have been deployed to the public grid yet. The architectural vacuum is awaiting new blueprints.
             </p>
          </div>
        ) : activeDossiers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-5 animate-[fade-in-up_0.5s_ease-out]">
            <Compass className="w-16 h-16 text-primary/30 animate-pulse" />
            <h3 className="font-display text-[28px] md:text-[36px] font-bold text-on-surface">No Projects Found</h3>
            <p className="font-sans text-secondary max-w-lg text-[15px] leading-relaxed">
              We couldn't locate any matching records for your current filters or search query. 
              Please adjust your parameters and try again.
            </p>
            <button 
              onClick={() => { setSelectedCategory(activeCategories[0]); setSelectedIndustry(industryOptions[0]); setSearchQuery(""); }} 
              className="mt-6 px-8 py-3 bg-primary/10 text-primary border border-primary/20 rounded-xl font-display font-bold text-[11px] uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-24">
            {paginatedDossiers.map((dossier, idx) => (
            <article 
              key={dossier.id} 
              id={`dossier-${dossier.ref}`}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              }}
              className={`relative group/card transform transition-all duration-500 hover:-translate-y-2 hover:z-20 p-[1px] rounded-[1.1rem] overflow-hidden animate-float-ambient ${
                highlightedRef === dossier.ref ? 'animate-highlight-pulse ring-2 ring-primary border-primary rounded-2xl' : ''
              }`} 
              style={{ animationDelay: `${idx * 0.8}s` }}
            >
              
              {/* MAGIC TRICK #1: Continuous Ambient Rotating Glow Border */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-40 group-hover/card:opacity-100 transition-opacity duration-700">
                <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] sm:w-[120%] sm:h-[200%] bg-[conic-gradient(from_0deg,transparent_0_180deg,rgba(var(--color-primary-rgb),0.6)_360deg)] animate-spin-slow"></div>
              </div>
              
              <div className="relative bg-surface-container/30 backdrop-blur-3xl rounded-2xl shadow-xl overflow-hidden border border-surface-container-highest transition-all duration-500 group-hover/card:border-transparent hover:shadow-[0_20px_50px_rgba(255,0,0,0.15)] z-10 w-full h-full flex flex-col">
                
                {/* Global Ambient Red Glare */}
                <div className="absolute -top-[30%] -right-[10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.1),transparent_70%)] pointer-events-none z-0 transition-opacity duration-700 group-hover/card:opacity-100 opacity-50 mix-blend-plus-lighter"></div>
                <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.06),transparent_70%)] pointer-events-none z-0 transition-opacity duration-700 group-hover/card:opacity-100 opacity-30 mix-blend-plus-lighter"></div>

                {/* Premium Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-20 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                {/* Mouse Interactive Spotlight */}
                <div 
                  className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 mix-blend-overlay"
                  style={{
                    background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08), transparent 40%)'
                  }}
                ></div>

                {/* Card Architectural Header */}
                <div className="bg-surface-container-low/50 px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-secondary font-display text-[11px] leading-4 tracking-[0.08em] font-medium uppercase border-b border-surface-container-highest transition-colors group-hover/card:bg-surface-container-low/80 relative z-30">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-on-surface tracking-widest bg-surface-container-highest px-2.5 py-1 rounded shadow-inner border border-surface-container" title="System Classification Code">
                      DSR-{(dossier.category || 'PRJ').substring(0, 3).toUpperCase()}-{new Date(dossier.createdAt || Date.now()).getFullYear().toString().slice(-2)}-{dossier.id.slice(-6).toUpperCase()}
                    </span>
                    <span className="text-primary font-semibold">{dossier.discipline || 'ENTERPRISE SPEC'}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-full shadow-inner border border-surface-container-highest transition-colors group-hover/card:bg-surface-container-high group-hover/card:border-primary/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.8)] animate-pulse"></span>
                      <span className="text-on-surface">{dossier.status}</span>
                    </span>
                  </div>
                </div>
                
                <div className="p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-30 flex-grow overflow-hidden">
                  
                  {/* Subtle Red Glare Inner glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.08),transparent_50%)] pointer-events-none z-0 opacity-30 group-hover/card:opacity-70 transition-opacity duration-700 mix-blend-plus-lighter"></div>
                  {/* Text Details */}
                  <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-between space-y-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 transition-transform duration-300 group-hover/card:translate-x-1">
                        <Compass className="w-4 h-4 text-primary" />
                        <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-bold uppercase tracking-widest text-primary">
                          {dossier.industry} {dossier.industry_niche && `// ${dossier.industry_niche}`}
                        </span>
                      </div>
                      <h2 className="font-display text-[32px] lg:text-[40px] leading-[1.1] tracking-[-0.02em] font-bold text-on-surface text-balance transition-all duration-500 group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-linear-to-r group-hover/card:from-on-surface group-hover/card:to-primary">
                        {dossier.eyebrow && (
                          <span className="block font-sans text-[13px] leading-5 font-bold text-primary mb-2 tracking-wide uppercase">
                            {dossier.eyebrow}
                          </span>
                        )}
                        {dossier.title}
                      </h2>
                    </div>
                    
                    {/* Schematic Pipeline Micro-diagram */}
                    {dossier.pipeline && dossier.pipeline.length > 0 && (
                      <div className="bg-surface-container-lowest/50 p-6 rounded-xl border border-surface-container-highest relative overflow-hidden group/pipeline hover:border-primary/30 transition-colors shadow-inner">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/10 to-transparent -translate-x-[100%] group-hover/pipeline:translate-x-[100%] transition-transform duration-[1500ms] ease-in-out pointer-events-none z-0"></div>
                        
                        {/* MAGIC TRICK #3: Continuous Ambient Text Sweep */}
                        <span className="block font-display text-[10px] leading-4 tracking-[0.12em] font-bold text-transparent bg-clip-text bg-linear-to-r from-secondary via-white to-secondary animate-text-sweep uppercase tracking-widest mb-4 relative z-10">
                          ARCHITECTURAL PIPELINE
                        </span>
                        
                        <div 
                          className="flex items-center gap-3 font-display text-[11px] leading-4 tracking-[0.06em] font-medium uppercase relative z-10 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/40 pb-4 cursor-grab active:cursor-grabbing focus:outline-none rounded-2xl"
                          tabIndex="0"
                          role="region"
                          aria-label="Architectural Pipeline, use arrow keys or drag to scroll"
                          onMouseDown={(e) => {
                            const slider = e.currentTarget;
                            slider['isDown'] = true;
                            slider['startX'] = e.pageX - slider.offsetLeft;
                            slider['scrollLeftStart'] = slider.scrollLeft;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget['isDown'] = false;
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget['isDown'] = false;
                          }}
                          onMouseMove={(e) => {
                            const slider = e.currentTarget;
                            if (!slider['isDown']) return;
                            e.preventDefault();
                            const x = e.pageX - slider.offsetLeft;
                            const walk = (x - slider['startX']) * 1.5;
                            slider.scrollLeft = slider['scrollLeftStart'] - walk;
                          }}
                        >
                          {dossier.pipeline.map((p, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <span className={`px-3.5 py-1.5 rounded-md shadow-sm transition-all duration-300 hover:-translate-y-0.5 ${p.type || (i % 2 === 0 ? 'bg-surface-container-highest/75 text-on-surface border border-outline/10' : 'bg-primary/10 text-primary border border-primary/30 shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.1)]')}`}>
                                {p.text || p.bullet || p}
                              </span>
                              {i < dossier.pipeline.length - 1 && (
                                <ArrowRight className="text-secondary/50 text-[14px] transition-transform duration-300 group-hover/pipeline:translate-x-1 group-hover/pipeline:text-primary/70" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Challenge, Approach, Outcome Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                      {dossier.bottleneck && (
                        <div className="space-y-2">
                          <h3 className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase tracking-widest text-on-surface flex items-center gap-2 group-hover/card:text-error transition-colors">
                            <span className="w-1 h-3 bg-error rounded-full shadow-[0_0_5px_rgba(var(--color-error-rgb),0.5)]"></span> The Bottleneck
                          </h3>
                          <p className="font-sans text-[13px] leading-[22px] tracking-[-0.01em] font-normal text-secondary group-hover/card:text-secondary/90 transition-colors">
                            {dossier.bottleneck}
                          </p>
                        </div>
                      )}
                      {dossier.approach && (
                        <div className="space-y-2">
                          <h3 className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase tracking-widest text-on-surface flex items-center gap-2 group-hover/card:text-secondary transition-colors">
                            <span className="w-1 h-3 bg-secondary rounded-full shadow-[0_0_5px_rgba(var(--color-secondary-rgb),0.5)]"></span> The Approach
                          </h3>
                          <p className="font-sans text-[13px] leading-[22px] tracking-[-0.01em] font-normal text-secondary group-hover/card:text-secondary/90 transition-colors">
                            {dossier.approach}
                          </p>
                        </div>
                      )}
                      {dossier.outcome && (
                        <div className="space-y-2">
                          <h3 className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase tracking-widest text-on-surface flex items-center gap-2 group-hover/card:text-primary transition-colors">
                            <span className="w-1 h-3 bg-primary rounded-full shadow-[0_0_5px_rgba(var(--color-primary-rgb),0.8)] animate-pulse"></span> The Outcome
                          </h3>
                          <p className="font-sans text-[13px] leading-[22px] tracking-[-0.01em] font-normal text-secondary group-hover/card:text-secondary/90 transition-colors">
                            {dossier.outcome}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Outer Card Thumbnail Image */}
                  <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center h-full">
                    <div 
                      className="relative rounded-2xl overflow-hidden h-[300px] lg:h-full min-h-[350px] border border-surface-container-highest bg-surface-container-lowest group/img cursor-pointer shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-primary/50"
                      onClick={() => handleOpenModal(dossier.ref)}
                    >
                      {dossier.thumbnail ? (
                        <img 
                          className="w-full h-full object-cover opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-[20000ms] ease-out" 
                          alt={dossier.thumbnailAlt || dossier.title} 
                          src={dossier.thumbnail}
                        />
                      ) : dossier.images && dossier.images.length > 0 ? (
                        <img 
                          className="w-full h-full object-cover opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-[20000ms] ease-out" 
                          alt={dossier.title} 
                          src={dossier.images[0]}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-surface-container-high/50 text-secondary font-display text-[11px] tracking-widest uppercase">
                          No Preview Available
                        </div>
                      )}
                      
                      {/* Hover Zoom Inspect Overlay */}
                      <div className="absolute inset-0 bg-surface/40 backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                         <div className="bg-surface-container-lowest px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 text-primary font-display font-bold text-[12px] tracking-widest uppercase transform translate-y-8 group-hover/img:translate-y-0 transition-all duration-500 border border-primary/30">
                           <Maximize2 className="w-4 h-4 animate-pulse" /> Inspect Deep Blueprint
                         </div>
                      </div>

                      {dossier.stats && Array.isArray(dossier.stats) && dossier.stats.length > 0 && (
                        <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/95 backdrop-blur-xl px-5 py-3 rounded-xl flex items-center justify-between font-display text-[11px] leading-4 tracking-[0.08em] font-bold text-secondary uppercase border border-surface-container-highest shadow-xl z-20 group-hover/img:border-primary/20 transition-colors">
                          <span>{dossier.stats[0]?.label}: {dossier.stats[0]?.value}</span>
                          {dossier.stats[1] && (
                            <span className="text-primary">{dossier.stats[1]?.label}: {dossier.stats[1]?.value}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Associated With / NDA */}
                <div className="bg-surface-container-low/50 px-6 py-4 border-t border-surface-container-highest relative z-30 group-hover/card:bg-surface-container-low/80 transition-colors overflow-hidden">
                  
                  {/* BG Animation for footer */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-[100%] group-hover/card:translate-x-[100%] transition-transform duration-[2000ms] ease-in-out pointer-events-none z-0"></div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10 w-full">
                    {dossier.associatedWith ? (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold text-secondary uppercase hidden sm:inline-block">Associated with:</span>
                          <a href={dossier.associatedWithLink || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/assoc hover:bg-surface-container-high px-2 py-1.5 rounded-md transition-colors border border-transparent hover:border-surface-container-highest">
                            {dossier.associatedWithLogo ? (
                              <img src={dossier.associatedWithLogo} alt={dossier.associatedWithLogoAlt || dossier.associatedWith} className="h-4 w-auto object-contain" />
                            ) : (
                              <Globe className="w-4 h-4 text-primary" />
                            )}
                            <span className="font-sans text-[13px] font-bold text-on-surface group-hover/assoc:text-primary transition-colors">{dossier.associatedWith}</span>
                          </a>
                        </div>
                        <div className="font-display text-[10px] leading-4 tracking-[0.15em] font-bold text-primary uppercase bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full flex items-center gap-2 shrink-0">
                          <Check className="w-3 h-3" />
                          Authorized Showcase
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 px-2 py-1.5 opacity-80">
                          <Lock className="w-4 h-4 text-error" />
                          <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-bold text-error uppercase">Project Protected Under NDA</span>
                        </div>
                        <div className="font-display text-[10px] leading-4 tracking-[0.15em] font-bold text-error uppercase bg-error/10 border border-error/20 px-3 py-1.5 rounded-full flex items-center gap-2 shrink-0">
                          <span className="w-1.5 h-1.5 bg-error rounded-full animate-ping shadow-[0_0_8px_rgba(var(--color-error-rgb),0.8)]"></span>
                          Strict Confidentiality
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

        {/* Dynamic Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center justify-center gap-8 mt-24 pt-12 border-t border-outline/10 relative z-20">
            {/* Tech Readout */}
            <div className="font-display text-[10px] leading-4 tracking-[0.2em] font-bold text-secondary uppercase flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.8)]"></span>
              INDEX RANGE // {String((currentPage - 1) * ITEMS_PER_PAGE + 1).padStart(2, '0')} - {String(Math.min(currentPage * ITEMS_PER_PAGE, activeDossiers.length)).padStart(2, '0')} OF {String(activeDossiers.length).padStart(2, '0')} RECORDS
            </div>

            {/* Futuristic Pagination Bar */}
            <div className="flex items-center gap-4 bg-surface-container-lowest/80 backdrop-blur-xl p-2 rounded-full border border-surface-container-highest shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative overflow-hidden group/pag">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover/pag:translate-x-full transition-transform duration-[3000ms] ease-linear infinite pointer-events-none z-0"></div>
              
              <button 
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(p => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-container hover:shadow-inner disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 relative z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-2 relative z-10">
                <div className="absolute top-1/2 left-2 right-2 h-[1px] bg-surface-container-highest -translate-y-1/2 z-0"></div>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setCurrentPage(i + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-display text-[13px] font-bold transition-all duration-500 ${
                      currentPage === i + 1 
                        ? 'bg-primary text-on-primary shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.5)] scale-110 border border-transparent'
                        : 'bg-surface-container-lowest text-secondary hover:text-primary hover:bg-surface-container hover:scale-105 border border-surface-container-highest'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>
              
              <button 
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(p => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-container hover:shadow-inner disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 relative z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Headless UI Interactive Zoom Modal */}
      <Transition appear show={!!activeModalId} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={() => handleCloseModal()}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-700"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-xl"
            leave="ease-in duration-500"
            leaveFrom="opacity-100 backdrop-blur-xl"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-inverse-surface/80" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-2 sm:p-6 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-[cubic-bezier(0.16,1,0.3,1)] duration-1000"
                enterFrom="opacity-0 scale-[0.8] translate-y-24 blur-xl"
                enterTo="opacity-100 scale-100 translate-y-0 blur-0"
                leave="ease-[cubic-bezier(0.16,1,0.3,1)] duration-700"
                leaveFrom="opacity-100 scale-100 translate-y-0 blur-0"
                leaveTo="opacity-0 scale-[0.9] translate-y-12 blur-md"
              >
                <DialogPanel className="w-full max-w-[1024px] transform overflow-hidden sm:rounded-2xl bg-surface/95 backdrop-blur-3xl text-left align-middle shadow-[0_30px_100px_rgba(0,0,0,0.8)] transition-all border border-surface-container-highest relative">
                  
                  {/* Subtle Modal Ambient Border Glow */}
                  <div className="absolute -inset-[1px] bg-linear-to-b from-primary/20 via-transparent to-primary/5 rounded-2xl pointer-events-none z-0"></div>

                  {activeModalData && (
                    <div className="relative z-10">
                      {/* Fixed Sticky Header */}
                      <div className="sticky top-0 z-50 bg-surface-container-lowest/80 backdrop-blur-2xl px-6 py-5 flex items-center justify-between border-b border-surface-container-highest shadow-sm">
                        <div className="flex items-center gap-3">
                          <Compass className="text-primary text-[24px]" />
                          <DialogTitle as="h3" className="font-display text-[13px] leading-4 tracking-[0.15em] uppercase tracking-widest text-on-surface font-bold m-0 flex flex-col sm:flex-row sm:items-center sm:gap-2">
                            <span>BLUEPRINT SPEC //</span> 
                            <span className="text-primary">{activeModalData.id.toUpperCase()}</span>
                          </DialogTitle>
                        </div>
                        <button 
                          className="w-10 h-10 rounded-full bg-surface-container hover:bg-error/10 hover:text-error flex items-center justify-center text-on-surface transition-all duration-300 shadow-sm border border-transparent hover:border-error/20" 
                          onClick={() => handleCloseModal()}
                        >
                          <X className="text-[20px]" />
                        </button>
                      </div>
                      
                      {/* Modal Content Body */}
                      <div className="p-6 lg:p-8 space-y-8">
                        
                        <div className="flex flex-col xl:flex-row gap-10">
                          {/* Text Context */}
                          <div className="xl:w-1/3 flex flex-col justify-center">
                            <div>
                              {activeModalData.discipline && (
                                <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-md border border-primary/20 inline-block mb-3 shadow-sm">
                                  {activeModalData.discipline}
                                </span>
                              )}
                              <h3 className="font-display text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] font-bold text-on-surface mt-2 text-balance">
                                <span className="block font-sans text-[13px] leading-5 font-bold text-primary mb-2 tracking-wide uppercase">
                                  {activeModalData.eyebrow || `${activeModalData.category} - ${activeModalData.industry}`}
                                </span>
                                {activeModalData.title}
                              </h3>
                              <p className="font-sans text-[15px] leading-7 tracking-[-0.01em] font-normal text-secondary mt-5 border-l-2 border-primary/30 pl-4">
                                {activeModalData.summary}
                              </p>
                            </div>
                          </div>
                          
                          {/* Splide Image Slider with Smaller Height & Advanced Animations */}
                          <div className="xl:w-2/3 bg-surface-container-lowest/50 border border-surface-container-highest rounded-2xl p-1.5 relative overflow-hidden group shadow-inner">
                            {activeModalData.images && activeModalData.images.length > 0 ? (
                              <Splide 
                                options={{
                                  type: 'fade', // Fluid crossfade animation
                                  rewind: true,
                                  autoplay: true,
                                  interval: 4000,
                                  arrows: false,
                                  pagination: true,
                                  pauseOnHover: true,
                                  speed: 1500, // Cinematic transition speed
                                  easing: "cubic-bezier(0.25, 1, 0.5, 1)"
                                }}
                                className="w-full rounded-[10px] overflow-hidden [&_.splide\_\_pagination]:bottom-4 [&_.splide\_\_pagination\_\_page]:bg-white/30 [&_.splide\_\_pagination\_\_page.is-active]:bg-primary [&_.splide\_\_pagination\_\_page.is-active]:scale-125 transition-transform"
                              >
                                {activeModalData.images.map((img, idx) => (
                                  <SplideSlide key={idx}>
                                    <div className="w-full h-[300px] sm:h-[400px] relative bg-surface-container-lowest flex items-center justify-center overflow-hidden group/slide">
                                      <img 
                                          src={img.url || img} 
                                          alt={img.alt || `${activeModalData.title} - view ${idx + 1}`}
                                          className="w-full h-full object-cover object-center transition-transform duration-[15000ms] ease-out group-hover/slide:scale-110"
                                      />
                                      <div className="absolute inset-0 bg-linear-to-t from-surface-container-lowest/80 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                                      
                                      {/* Fullscreen Zoom Option */}
                                      <button 
                                        onClick={() => setZoomedImage(img.url || img)}
                                        className="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur-xl p-3 rounded-full text-primary border border-primary/30 opacity-0 group-hover/slide:opacity-100 transition-all duration-300 hover:bg-primary hover:text-on-primary hover:scale-110 shadow-[0_10px_20px_rgba(var(--color-primary-rgb),0.2)]"
                                        title="View Fullscreen Blueprint"
                                      >
                                        <ZoomIn className="w-5 h-5" />
                                      </button>
                                    </div>
                                  </SplideSlide>
                                ))}
                              </Splide>
                            ) : null}
                          </div>
                        </div>

                        {/* Highly Designed Topology Schematic with Terminal bg overlay */}
                        {activeModalData.topologySchematic && ((Array.isArray(activeModalData.topologySchematic) && activeModalData.topologySchematic.length > 0) || (activeModalData.topologySchematic.nodes && activeModalData.topologySchematic.nodes.length > 0)) && (
                          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-8 lg:p-12 relative overflow-hidden group/topo shadow-inner">
                            {/* Tech Terminal Grid Background Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60 pointer-events-none z-0"></div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-surface-container-highest pb-6 relative z-10">
                              <span className="font-display text-[11px] leading-4 tracking-[0.15em] font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_rgba(var(--color-secondary-rgb),0.5)]"></span>
                                ISOLATION & FAILOVER TOPOLOGY SCHEMATIC
                              </span>
                              <span className="font-display text-[10px] leading-4 tracking-[0.12em] font-bold text-error uppercase tracking-widest bg-error/10 border border-error/20 px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(var(--color-error-rgb),0.15)] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-error rounded-full animate-ping"></span>
                                ENCLAVE: ACTIVE-REDUNDANT
                              </span>
                            </div>
                            
                            <div 
                              className="flex items-center relative z-10 w-full pb-6 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/40 py-4 px-2 gap-0 cursor-grab active:cursor-grabbing focus:outline-none rounded-2xl"
                              tabIndex="0"
                              role="region"
                              aria-label="Topology Schematic, use arrow keys or drag to scroll"
                              onMouseDown={(e) => {
                                const slider = e.currentTarget;
                                slider['isDown'] = true;
                                slider['startX'] = e.pageX - slider.offsetLeft;
                                slider['scrollLeftStart'] = slider.scrollLeft;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget['isDown'] = false;
                              }}
                              onMouseUp={(e) => {
                                e.currentTarget['isDown'] = false;
                              }}
                              onMouseMove={(e) => {
                                const slider = e.currentTarget;
                                if (!slider['isDown']) return;
                                e.preventDefault();
                                const x = e.pageX - slider.offsetLeft;
                                const walk = (x - slider['startX']) * 1.5;
                                slider.scrollLeft = slider['scrollLeftStart'] - walk;
                              }}
                            >
                              {(Array.isArray(activeModalData.topologySchematic) ? activeModalData.topologySchematic : activeModalData.topologySchematic.nodes).map((node, index) => {
                                const IconComponent = typeof node.icon === 'string' ? IconMap[node.icon] || Globe : node.icon || Globe;
                                const isHighlighted = node.highlighted || node.isActive;
                                return (
                                  <Fragment key={index}>
                                    <div className={`
                                      flex flex-col items-center justify-center text-center px-6 py-6 border-2 rounded-xl min-w-[220px] transition-all duration-700 relative z-20 backdrop-blur-md shrink-0
                                      ${isHighlighted 
                                        ? 'border-error/80 shadow-[0_0_40px_rgba(var(--color-error-rgb),0.25)] bg-error/10 lg:scale-110 before:absolute before:inset-0 before:rounded-xl before:border before:border-error before:animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] before:opacity-30' 
                                        : 'border-surface-container-highest border-dashed bg-surface-container-lowest/80 hover:bg-surface-container hover:border-primary/40 hover:-translate-y-1'
                                      }
                                    `}>
                                      {IconComponent && (
                                        <div className={`mb-3 p-2 rounded-lg ${isHighlighted ? 'bg-error/20 text-error' : 'bg-surface-container-high text-secondary'}`}>
                                          <IconComponent className={`w-5 h-5 ${isHighlighted ? 'animate-pulse' : ''}`} />
                                        </div>
                                      )}
                                      <span className={`font-display text-[13px] leading-5 tracking-[0.15em] font-bold uppercase tracking-widest mb-1.5 whitespace-normal ${isHighlighted ? 'text-error' : 'text-on-surface'}`}>
                                        {node.label || node.node}
                                      </span>
                                      {(node.sublabel || node.info) && (
                                        <span className="font-sans text-[12px] leading-5 font-normal text-secondary whitespace-normal">
                                          {node.sublabel || node.info}
                                        </span>
                                      )}
                                    </div>
                                    
                                    {/* Connecting Line Horizontal */}
                                    {index < (Array.isArray(activeModalData.topologySchematic) ? activeModalData.topologySchematic : activeModalData.topologySchematic.nodes).length - 1 && (
                                      <div className="flex relative items-center justify-center h-0.5 w-12 shrink-0 bg-surface-container-highest overflow-hidden">
                                        <div className={`absolute left-0 w-full h-full bg-linear-to-r from-transparent ${isHighlighted || ((Array.isArray(activeModalData.topologySchematic) ? activeModalData.topologySchematic : activeModalData.topologySchematic.nodes)[index+1]?.highlighted || (Array.isArray(activeModalData.topologySchematic) ? activeModalData.topologySchematic : activeModalData.topologySchematic.nodes)[index+1]?.isActive) ? 'via-error animate-pulse' : 'via-primary opacity-50'} to-transparent`}></div>
                                      </div>
                                    )}
                                  </Fragment>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Technical Accordions */}
                        {activeModalData.technicalDetails && activeModalData.technicalDetails.length > 0 && (
                          <div className="space-y-4 pt-2 border-t border-surface-container-highest">
                            <h4 className="font-display text-[12px] leading-4 font-bold text-on-surface uppercase tracking-widest mb-6 flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.8)] inline-block"></span>
                              TECHNICAL IMPLEMENTATION DETAILS
                            </h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {activeModalData.technicalDetails.map((detail, idx) => (
                                <Disclosure key={idx} as="div" className="bg-surface-container-lowest/80 backdrop-blur-sm border border-surface-container-highest rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-[0_10px_30px_rgba(var(--color-primary-rgb),0.05)]">
                                  {({ open }) => (
                                    <>
                                      <DisclosureButton className="flex w-full justify-between items-center px-6 py-5 text-left font-display text-[14px] leading-5 tracking-[0.04em] font-bold text-on-surface hover:bg-surface-container focus:outline-none transition-colors group">
                                        <span className="transition-colors group-hover:text-primary">{detail.groupLabel || detail.heading}</span>
                                        <ChevronDown className={`${open ? 'rotate-180 text-primary' : 'text-secondary'} h-5 w-5 transition-transform duration-300`} />
                                      </DisclosureButton>
                                      <Transition
                                        enter="transition duration-200 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-150 ease-in"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                      >
                                        <DisclosurePanel className="px-6 pb-6 text-[14px] leading-6 font-sans font-normal text-secondary border-t border-surface-container-highest pt-5 bg-surface-container-lowest">
                                          <p className="mb-5 text-on-surface/90 font-medium leading-relaxed">{detail.body || detail.description}</p>
                                          {detail.bullets && detail.bullets.length > 0 && (
                                            <ul className="space-y-3 list-none pl-1">
                                              {detail.bullets.map((bullet, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                  <span className="text-primary mt-0.5 text-[14px] opacity-80">❖</span>
                                                  <span className="leading-relaxed">{bullet}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          )}
                                        </DisclosurePanel>
                                      </Transition>
                                    </>
                                  )}
                                </Disclosure>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Modal Footer */}
                      <div className="bg-surface-container/90 backdrop-blur-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between border-t border-surface-container-highest gap-4">
                        <span className="font-display text-[10px] leading-4 tracking-[0.1em] font-medium text-secondary uppercase flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                          SUBHAM SARKAR ARCHITECTURAL ATELIER // CASE STUDY
                        </span>
                        <button 
                          className="px-8 py-3 bg-on-surface hover:bg-error hover:text-white text-surface font-display text-[11px] leading-4 tracking-[0.15em] font-bold uppercase tracking-widest rounded transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(var(--color-error-rgb),0.4)] w-full sm:w-auto" 
                          onClick={() => handleCloseModal()}
                        >
                          Close Dossier
                        </button>
                      </div>
                    </div>
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Fullscreen Lightbox for Zoomed Image */}
      <Transition appear show={!!zoomedImage} as={Fragment}>
        <Dialog as="div" className="relative z-[200]" onClose={() => setZoomedImage(null)}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-inverse-surface/95 backdrop-blur-2xl" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-7xl transform overflow-hidden bg-transparent text-left align-middle transition-all flex flex-col items-center relative group">
                  <button 
                    className="absolute top-0 right-0 z-10 m-4 w-12 h-12 rounded-full bg-surface-container/50 hover:bg-error/80 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl opacity-0 group-hover:opacity-100" 
                    onClick={() => setZoomedImage(null)}
                  >
                    <X className="text-[24px]" />
                  </button>
                  {zoomedImage && (
                    <img 
                      src={zoomedImage} 
                      alt="Fullscreen Blueprint"
                      className="w-full h-auto max-h-[90vh] object-contain rounded-xl shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
                    />
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
