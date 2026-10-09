"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { broadcastPushNotification } from "@/actions/push";
import { toast } from "react-hot-toast";
import { Link2, Search, X, CheckCircle, RadioTower, ArrowRight, Zap, Filter, CalendarDays, FolderGit2, Sparkles } from "lucide-react";
import { Switch, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import { ChevronDown, Check } from "lucide-react";
import { Fragment } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PushPreviewCard from "./PushPreviewCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BroadcastForm({ recentInsights = [], recentDossiers = [], availableCountries = [] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal State
  const [activeTab, setActiveTab] = useState("insights"); // 'insights' | 'dossiers'
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest' | 'oldest'
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Scheduling State
  const [scheduledFor, setScheduledFor] = useState(null);
  const [timezoneOptimized, setTimezoneOptimized] = useState(true);
  const minDateTime = useMemo(() => new Date(), []);

  // Extract Categories based on Active Tab
  const availableCategories = useMemo(() => {
    const items = activeTab === 'insights' ? recentInsights : recentDossiers;
    const cats = items.map(i => i.category).filter(Boolean);
    return ['All', ...new Set(cats)];
  }, [activeTab, recentInsights, recentDossiers]);

  function handleTabSwitch(tab) {
    setActiveTab(tab);
    setSelectedCategory('All');
    setSearchQuery('');
  }

  // Controlled form state for auto-fill
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [requireInteraction, setRequireInteraction] = useState(false);

  function handleContentSelect(type, data) {
    if (type === "insight") {
      setTitle(`New Insight: ${data.title}`);
      setMessage(data.excerpt || `Read our latest article on ${data.title}.`);
      setUrl(`https://subham.digital/insights/${data.slug}`);
      if (data.coverImage) setImage(`https://subham.digital${data.coverImage}`);
    } else if (type === "dossier") {
      setTitle(`New Project: ${data.title}`);
      setMessage(`Check out our recent work for ${data.associatedWith || "a new client"}.`);
      setUrl(`https://subham.digital/work`);
      if (data.thumbnail) setImage(`https://subham.digital${data.thumbnail}`);
    }
    setIsModalOpen(false);
  }

  // Targeting State
  const [categories, setCategories] = useState({
    warm_lead: true,
    content_follower: true,
    casual: true
  });
  const [recency, setRecency] = useState({
    active: true,
    cooling: true,
    inactive: true
  });
  const [vpnFilter, setVpnFilter] = useState("any"); // "any", "vpn_only", "exclude_vpn"
  const [countryFilter, setCountryFilter] = useState("all");

  const vpnOptions = [
    { id: 'any', name: 'Any Connection' },
    { id: 'vpn_only', name: 'VPN Users Only' },
    { id: 'exclude_vpn', name: 'Exclude VPN' }
  ];

  const locationOptions = useMemo(() => {
    return [
      { id: 'all', name: 'Global (All)', count: null },
      ...availableCountries.map(c => ({ id: c.code, name: c.name || c.code, count: c.count }))
    ];
  }, [availableCountries]);

  const [targetCount, setTargetCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  // Fetch count whenever filters change
  useEffect(() => {
    const fetchCount = async () => {
      setIsCounting(true);
      try {
        const activeCategories = Object.keys(categories).filter(k => categories[k]);
        const activeRecency = Object.keys(recency).filter(k => recency[k]);
        
        const params = new URLSearchParams();
        params.set('categories', activeCategories.join(','));
        params.set('recency', activeRecency.join(','));
        params.set('vpn', vpnFilter);
        params.set('country', countryFilter);
        
        const res = await fetch(`/api/subscribers/count?${params.toString()}`);
        const data = await res.json();
        if (data.count !== undefined) {
          setTargetCount(data.count);
        }
      } catch (err) {
        console.error('Failed to fetch count', err);
      } finally {
        setIsCounting(false);
      }
    };
    
    // Add debounce to avoid spamming
    const timeout = setTimeout(fetchCount, 300);
    return () => clearTimeout(timeout);
  }, [categories, recency, vpnFilter, countryFilter]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const activeCategories = Object.keys(categories).filter(k => categories[k]);
    const activeRecency = Object.keys(recency).filter(k => recency[k]);
    
    if (activeCategories.length === 0 || activeRecency.length === 0) {
      toast.error('Please select at least one category and recency state.');
      setLoading(false);
      return;
    }

    const targetUrl = url || "https://subham.digital";
    
    // Call the new API instead of server action directly if we need to pass filters.
    // Wait, the backend API expects `subscriberIds`, not filters!
    // But earlier I decided the new `/api/push/send` could take subscriberIds. I need to modify `/api/push/send` to take filters.
    // Or I can fetch the IDs here first? No, let's fetch the IDs here, OR modify the `/api/push/send` to accept filters directly.
    // Wait! Let's just modify the `handleSubmit` to hit the new `/api/push/send` with filters.
    
    try {
      const res = await fetch('/api/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categories: activeCategories,
          recency: activeRecency,
          title,
          message,
          actionUrl: targetUrl,
          imageUrl: image,
          requireInteraction,
          vpn: vpnFilter,
          country: countryFilter,
          scheduledFor: scheduledFor ? scheduledFor.toISOString() : null,
          timezoneOptimized: scheduledFor ? timezoneOptimized : false,
          targetLocalHour: scheduledFor ? scheduledFor.getHours() : null
        })
      });
      const data = await res.json();
      
      if (data.success) {
        if (data.queued) {
          toast.success(`Transmission added to dispatch queue for ${new Date(scheduledFor).toLocaleString()}!`, { icon: '🕰️' });
        } else {
          toast.success(`Transmission initiated! Sent to background worker.`, { icon: '🚀' });
        }
        // Reset
        setTitle("");
        setMessage("");
        setUrl("");
        setImage("");
        setRequireInteraction(false);
        setScheduledFor(null);
        router.refresh();
      } else {
        toast.error(data.error || "Failed to broadcast");
      }
    } catch (err) {
      toast.error("Transmission error");
    }
    
    setLoading(false);
  }

  // Filter and Sort Logic
  const filterAndSort = (items) => {
    let result = items.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedCategory !== 'All') {
      result = result.filter(i => i.category === selectedCategory);
    }

    result.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });

    return result;
  };

  const filteredInsights = filterAndSort(recentInsights);
  const filteredDossiers = filterAndSort(recentDossiers);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <>
    <motion.form 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit} 
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <div className="lg:col-span-2 space-y-6">
        {/* Attach Content Trigger */}
        {(recentInsights.length > 0 || recentDossiers.length > 0) && (
          <motion.div variants={itemVariants} className="p-5 bg-linear-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between transition-all hover:border-primary/40 group relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="flex items-center gap-4 text-primary relative z-10">
              <div className="p-2.5 bg-primary/20 backdrop-blur-sm rounded-xl group-hover:scale-110 transition-transform duration-300 relative">
                <Zap className="w-5 h-5 text-primary drop-shadow-[0_0_10px_rgba(var(--color-primary),0.8)]" />
              </div>
              <div>
                <span className="block text-sm font-black uppercase tracking-widest text-primary drop-shadow-sm flex items-center gap-2">
                  Fast Compose
                </span>
                <span className="block text-xs font-medium opacity-80 mt-0.5">Link a recent post to auto-fill the transmission</span>
              </div>
            </div>
            
            <button 
              type="button" 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-6 py-2.5 bg-surface-container-highest/80 backdrop-blur-md rounded-xl border border-white/10 text-xs font-black uppercase tracking-widest text-on-surface hover:bg-primary/20 hover:border-primary/50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-[0_0_15px_rgba(0,0,0,0.2)] flex items-center justify-center gap-2 relative z-10 group/btn overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:animate-[shimmer_1.5s_infinite]" />
              Browse Archives
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

        <div className="space-y-5">
          <motion.div variants={itemVariants} className="group relative">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 block group-focus-within:text-primary transition-colors">Transmission Title</label>
            <input 
              type="text" 
              required 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. New Architectural Insight!"
              className="w-full bg-surface-container-lowest/50 backdrop-blur-sm border border-outline-variant/30 rounded-xl px-5 py-4 text-on-surface font-medium focus:outline-none focus:border-primary/60 focus:bg-primary/5 transition-all shadow-sm"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="group relative">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 block group-focus-within:text-primary transition-colors">Main Message</label>
            <textarea 
              required 
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="I just published a new article about system design..."
              className="w-full bg-surface-container-lowest/50 backdrop-blur-sm border border-outline-variant/30 rounded-xl px-5 py-4 text-on-surface font-medium focus:outline-none focus:border-primary/60 focus:bg-primary/5 resize-none transition-all shadow-sm leading-relaxed"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="group relative">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 block group-focus-within:text-primary transition-colors">Action URL <span className="text-on-surface-variant/50 normal-case font-medium">(Optional)</span></label>
            <input 
              type="url" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://subham.digital/insights/system-design"
              className="w-full bg-surface-container-lowest/50 backdrop-blur-sm border border-outline-variant/30 rounded-xl px-5 py-4 text-sm text-on-surface font-medium focus:outline-none focus:border-primary/60 focus:bg-primary/5 transition-all shadow-sm"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="group relative">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 block group-focus-within:text-primary transition-colors">Hero Image URL <span className="text-on-surface-variant/50 normal-case font-medium">(Optional)</span></label>
            <input 
              type="url" 
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://subham.digital/uploads/insight-cover.jpg"
              className="w-full bg-surface-container-lowest/50 backdrop-blur-sm border border-outline-variant/30 rounded-xl px-5 py-4 text-sm text-on-surface font-medium focus:outline-none focus:border-primary/60 focus:bg-primary/5 transition-all shadow-sm"
            />
            <p className="text-[11px] font-medium text-on-surface-variant/70 mt-2">Displays a rich media image inside the notification (mostly supported on Android/Windows).</p>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="flex items-center justify-between p-5 rounded-2xl bg-surface-container-lowest/50 border border-outline-variant/20 mt-6 group hover:border-primary/30 transition-colors cursor-pointer" onClick={() => setRequireInteraction(!requireInteraction)}>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-on-surface flex items-center gap-2 cursor-pointer group-hover:text-primary transition-colors">
              Require User Interaction
            </label>
            <p className="text-xs text-on-surface-variant font-medium mt-1">Force notification to stay on screen until dismissed.</p>
          </div>
          <Switch
            checked={requireInteraction}
            onChange={setRequireInteraction}
            className={`${
              requireInteraction ? 'bg-primary' : 'bg-surface-container-highest border-outline-variant/30'
            } relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none shadow-inner`}
          >
            <span className="sr-only">Require Interaction</span>
            <span
              aria-hidden="true"
              className={`${
                requireInteraction ? 'translate-x-7 shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'translate-x-0'
              } pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out`}
            />
          </Switch>
        </motion.div>

        {/* Live Preview Card */}
        <motion.div variants={itemVariants} className="pt-2 flex-1 flex">
          <PushPreviewCard 
            title={title}
            message={message}
            image={image}
            url={url}
          />
        </motion.div>
      </div>
      
      {/* Targeting Panel */}
      <div className="lg:col-span-1 space-y-6">
        <motion.div variants={itemVariants} className="bg-primary/5 border border-primary/20 backdrop-blur-xl rounded-4xl py-3 px-6 flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="p-2 bg-primary/10 rounded-full border border-primary/20 mb-2 relative z-10">
            <RadioTower className={`w-10 h-10 text-primary ${isCounting ? 'animate-spin' : 'animate-pulse'}`} />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-5xl font-display font-black text-primary drop-shadow-[0_0_15px_rgba(var(--color-primary),0.3)]">{targetCount}</h3>
            <p className="text-xs font-black text-primary/80 uppercase tracking-[0.2em] mt-2">Targeted Receivers</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="p-6 bg-surface-container-lowest/50 border border-outline-variant/20 rounded-2xl space-y-6">
          <h4 className="text-sm font-black uppercase tracking-widest text-on-surface">Targeting Filters</h4>
          
          <div className="flex gap-4 pb-4 border-b border-outline-variant/10">
            {/* Privacy Listbox */}
            <div className="flex-1 space-y-2 relative">
              <div className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Privacy</div>
              <Listbox value={vpnFilter} onChange={setVpnFilter}>
                <div className="relative">
                  <ListboxButton className="relative w-full cursor-pointer bg-surface-container-highest/50 border border-outline-variant/30 text-on-surface text-sm rounded-lg px-3 py-2 text-left focus:outline-none focus:border-primary/50 transition-colors hover:bg-surface-container-highest">
                    <span className="block truncate">
                      {vpnOptions.find(o => o.id === vpnFilter)?.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDown className="h-4 w-4 text-on-surface-variant" aria-hidden="true" />
                    </span>
                  </ListboxButton>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions className="absolute z-[100] mt-1 max-h-60 w-full overflow-hidden rounded-lg bg-surface border border-outline-variant/20 p-0 text-base shadow-xl focus:outline-none sm:text-sm">
                      {vpnOptions.map((option) => (
                        <ListboxOption
                          key={option.id}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-10 pr-4 transition-colors ${
                              active ? 'bg-primary/10 text-primary' : 'text-on-surface'
                            }`
                          }
                          value={option.id}
                        >
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'}`}>
                                {option.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                  <Check className="h-4 w-4" aria-hidden="true" />
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

            {/* Location Listbox */}
            <div className="flex-1 space-y-2 relative">
              <div className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Location</div>
              <Listbox value={countryFilter} onChange={setCountryFilter}>
                <div className="relative">
                  <ListboxButton className="relative w-full cursor-pointer bg-surface-container-highest/50 border border-outline-variant/30 text-on-surface text-sm rounded-lg px-3 py-2 text-left focus:outline-none focus:border-primary/50 transition-colors hover:bg-surface-container-highest">
                    <span className="block truncate">
                      {locationOptions.find(o => o.id === countryFilter)?.name}
                      {countryFilter !== 'all' && locationOptions.find(o => o.id === countryFilter)?.count != null && (
                        <span className="ml-2 text-xs text-on-surface-variant/70">
                          ({locationOptions.find(o => o.id === countryFilter)?.count})
                        </span>
                      )}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDown className="h-4 w-4 text-on-surface-variant" aria-hidden="true" />
                    </span>
                  </ListboxButton>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <ListboxOptions className="absolute z-[100] mt-1 max-h-60 w-full overflow-hidden rounded-lg bg-surface border border-outline-variant/20 p-0 text-base shadow-xl focus:outline-none sm:text-sm">
                      {locationOptions.map((option) => (
                        <ListboxOption
                          key={option.id}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-10 pr-4 transition-colors ${
                              active ? 'bg-primary/10 text-primary' : 'text-on-surface'
                            }`
                          }
                          value={option.id}
                        >
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'}`}>
                                {option.name}
                                {option.count != null && (
                                  <span className="ml-2 text-xs opacity-70">
                                    ({option.count})
                                  </span>
                                )}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                  <Check className="h-4 w-4" aria-hidden="true" />
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

          <div className="space-y-4">
            <div className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Audience Category</div>
            {['warm_lead', 'content_follower', 'casual'].map(cat => (
              <div key={cat} className="flex items-center justify-between cursor-pointer group" onClick={() => setCategories(prev => ({ ...prev, [cat]: !prev[cat] }))}>
                <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">
                  {cat === 'warm_lead' ? 'Warm Leads' : cat === 'content_follower' ? 'Content Followers' : 'Casual Visitors'}
                </span>
                <Switch
                  checked={categories[cat]}
                  onChange={() => {}} // Handled by parent div
                  className={`${
                    categories[cat] ? 'bg-primary' : 'bg-surface-container-highest border-outline-variant/30'
                  } relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none shadow-inner`}
                >
                  <span className="sr-only">Toggle {cat}</span>
                  <span
                    aria-hidden="true"
                    className={`${
                      categories[cat] ? 'translate-x-5 shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-300 ease-in-out`}
                  />
                </Switch>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-outline-variant/10">
            <div className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Recency State</div>
            {['active', 'cooling', 'inactive'].map(state => (
              <div key={state} className="flex items-center justify-between cursor-pointer group" onClick={() => setRecency(prev => ({ ...prev, [state]: !prev[state] }))}>
                <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors capitalize">
                  {state}
                </span>
                <Switch
                  checked={recency[state]}
                  onChange={() => {}} // Handled by parent div
                  className={`${
                    recency[state] ? 'bg-primary' : 'bg-surface-container-highest border-outline-variant/30'
                  } relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none shadow-inner`}
                >
                  <span className="sr-only">Toggle {state}</span>
                  <span
                    aria-hidden="true"
                    className={`${
                      recency[state] ? 'translate-x-5 shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-300 ease-in-out`}
                  />
                </Switch>
              </div>
            ))}
          </div>
          <div className="space-y-4 pt-4 border-t border-outline-variant/10">
            <div className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Schedule Dispatch <span className="lowercase font-medium opacity-50">(Optional)</span></div>
            
            <style jsx global>{`
              .react-datepicker-wrapper { width: 100%; }
              .react-datepicker {
                background-color: var(--color-surface);
                border: 1px solid rgba(var(--color-outline-variant-rgb), 0.3);
                border-radius: 12px;
                font-family: inherit;
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
              }
              .react-datepicker__header {
                background-color: rgba(var(--color-surface-container-highest-rgb), 0.5);
                border-bottom: 1px solid rgba(var(--color-outline-variant-rgb), 0.2);
                border-top-left-radius: 12px;
                border-top-right-radius: 12px;
              }
              .react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header {
                color: var(--color-on-surface);
              }
              .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
                color: var(--color-on-surface-variant);
              }
              .react-datepicker__day:hover, .react-datepicker__month-text:hover, .react-datepicker__quarter-text:hover, .react-datepicker__year-text:hover {
                background-color: rgba(var(--color-primary-rgb), 0.1);
                border-radius: 8px;
              }
              .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range {
                background-color: var(--color-primary);
                color: var(--color-on-primary);
                border-radius: 8px;
              }
              .react-datepicker__day--keyboard-selected, .react-datepicker__month-text--keyboard-selected, .react-datepicker__quarter-text--keyboard-selected, .react-datepicker__year-text--keyboard-selected {
                background-color: rgba(var(--color-primary-rgb), 0.2);
                color: var(--color-primary);
                border-radius: 8px;
              }
              .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item:hover {
                background-color: rgba(var(--color-primary-rgb), 0.1);
              }
              .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
                background-color: var(--color-primary);
                color: var(--color-on-primary);
              }
              .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::before, .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::after {
                border-bottom-color: rgba(var(--color-surface-container-highest-rgb), 0.5);
              }
              .react-datepicker__navigation-icon::before {
                border-color: var(--color-on-surface-variant);
              }
              .react-datepicker__navigation:hover *::before {
                border-color: var(--color-primary);
              }
            `}</style>

            <div className="relative group rounded-xl border border-outline-variant/30 bg-surface-container-highest/50 hover:border-primary/50 transition-colors shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
              <DatePicker 
                selected={scheduledFor}
                onChange={(date) => setScheduledFor(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={minDateTime}
                minTime={scheduledFor && scheduledFor.getDate() === minDateTime.getDate() ? minDateTime : new Date(new Date().setHours(0,0,0,0))}
                maxTime={new Date(new Date().setHours(23,59,59,999))}
                placeholderText="Select dispatch date and time"
                className="w-full bg-transparent text-on-surface font-medium text-sm pl-4 pr-16 py-3.5 outline-none cursor-pointer placeholder:text-on-surface-variant/50"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-primary z-10">
                <CalendarDays className="w-5 h-5 drop-shadow-[0_0_8px_rgba(var(--color-primary),0.3)]" />
              </div>
              {scheduledFor && (
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setScheduledFor(null);
                  }}
                  className="absolute inset-y-0 right-12 pr-2 flex items-center text-on-surface-variant hover:text-primary transition-colors z-20"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-[10px] text-on-surface-variant/70 font-medium mb-3">Leave empty to initiate transmission immediately.</p>
            
            {scheduledFor && (
              <div className="flex items-center gap-4 p-4 bg-surface border border-outline-variant/30 rounded-xl">
                <Switch
                  checked={timezoneOptimized}
                  onChange={setTimezoneOptimized}
                  className={`${
                    timezoneOptimized ? 'bg-primary' : 'bg-surface-container-highest'
                  } relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface cursor-pointer shadow-inner`}
                >
                  <span className="sr-only">Use timezone optimized dispatch</span>
                  <span
                    className={`${
                      timezoneOptimized ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out shadow-sm`}
                  />
                </Switch>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-on-surface">Timezone Optimized Dispatch</span>
                  <span className="text-[10px] text-on-surface-variant font-medium mt-0.5">
                    Calculate timezone offsets to deliver at exactly {scheduledFor.getHours() === 0 ? "12" : (scheduledFor.getHours() > 12 ? scheduledFor.getHours() - 12 : scheduledFor.getHours())}:{scheduledFor.getMinutes() < 10 ? '0'+scheduledFor.getMinutes() : scheduledFor.getMinutes()} {scheduledFor.getHours() >= 12 ? 'PM' : 'AM'} for each user's local timezone.
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.button 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit" 
          disabled={loading || targetCount === 0}
          className="w-full bg-primary text-on-primary font-black uppercase tracking-widest text-sm py-5 rounded-2xl hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(var(--color-primary),0.3)] hover:shadow-[0_0_40px_rgba(var(--color-primary),0.5)] flex items-center justify-center gap-3 overflow-hidden relative disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
          {scheduledFor ? (
            <CalendarDays className={`w-5 h-5 ${loading ? 'animate-bounce' : 'animate-pulse'}`} />
          ) : (
            <RadioTower className={`w-5 h-5 ${loading ? 'animate-bounce' : 'animate-pulse'}`} />
          )}
          {loading ? (scheduledFor ? 'Queuing...' : 'Transmitting...') : (scheduledFor ? 'Add to Dispatch Queue' : 'Initiate Transmission')}
        </motion.button>
      </div>
    </motion.form>

    {/* Content Picker Modal */}
    <Transition show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[150]" onClose={() => setIsModalOpen(false)}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-inverse-surface/80 backdrop-blur-md transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95 sm:rotate-1"
              enterTo="opacity-100 translate-y-0 sm:scale-100 sm:rotate-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100 sm:rotate-0"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 sm:rotate-1"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-[2rem] bg-surface/95 backdrop-blur-2xl border border-outline-variant/20 text-left shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all sm:my-8 w-full max-w-4xl flex flex-col max-h-[85vh]">
                
                {/* Header & Tabs */}
                <div className="bg-linear-to-b from-surface-container-lowest/80 to-transparent px-8 py-6 flex flex-col gap-5 relative overflow-hidden shrink-0">
                  <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-primary/20 rounded-full blur-[60px] pointer-events-none" />
                  <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
                  
                  <div className="flex items-center justify-between relative z-10">
                    <DialogTitle as="h3" className="text-3xl font-display font-black text-on-surface flex items-center gap-3">
                      <Sparkles className="w-8 h-8 text-primary drop-shadow-[0_0_15px_rgba(var(--color-primary),0.8)]" />
                      Content Archives
                    </DialogTitle>
                    <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-on-surface hover:bg-white/10 transition-colors p-2 rounded-full relative z-10 group">
                      <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-8 border-b border-outline-variant/20 relative z-10">
                    <button 
                      onClick={() => handleTabSwitch('insights')} 
                      className={`pb-3 text-sm font-black uppercase tracking-widest transition-all relative flex items-center gap-2 ${activeTab === 'insights' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                    >
                      Insights
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px]">{recentInsights.length}</span>
                      {activeTab === 'insights' && (
                        <motion.div layoutId="activeTab" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary rounded-t-full shadow-[0_0_10px_rgba(var(--color-primary),1)]" />
                      )}
                    </button>
                    <button 
                      onClick={() => handleTabSwitch('dossiers')} 
                      className={`pb-3 text-sm font-black uppercase tracking-widest transition-all relative flex items-center gap-2 ${activeTab === 'dossiers' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                    >
                      Dossiers
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px]">{recentDossiers.length}</span>
                      {activeTab === 'dossiers' && (
                        <motion.div layoutId="activeTab" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary rounded-t-full shadow-[0_0_10px_rgba(var(--color-primary),1)]" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Search & Filters */}
                <div className="px-8 py-5 bg-surface-container/20 border-y border-outline-variant/10 shrink-0 flex flex-col sm:flex-row gap-4 items-center">
                  
                  {/* Search */}
                  <div className="relative flex-1 w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text" 
                      placeholder={`Search ${activeTab}...`}
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:bg-surface-container-highest transition-colors placeholder:text-on-surface-variant/50 font-medium shadow-inner"
                    />
                  </div>
                  
                  {/* Category Dropdown */}
                  <div className="w-full sm:w-44 shrink-0 relative z-30">
                    <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-2xl bg-surface-container-lowest py-3 pl-4 pr-10 text-left border border-outline-variant/30 focus:outline-none focus-visible:border-primary text-sm shadow-sm transition-colors hover:border-primary/50 flex items-center gap-2 group">
                          <FolderGit2 className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                          <span className="block truncate text-on-surface font-semibold">
                            {selectedCategory === 'All' ? 'All Categories' : selectedCategory}
                          </span>
                        </Listbox.Button>
                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                          <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-2xl bg-surface border border-outline-variant/20 p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] ring-1 ring-white/5 focus:outline-none z-50">
                            {availableCategories.map((cat, idx) => (
                              <Listbox.Option
                                key={idx}
                                className={({ active }) => `relative cursor-pointer select-none py-2 px-3 rounded-xl transition-colors ${active ? 'bg-primary/15 text-primary font-bold' : 'text-on-surface hover:bg-surface-container font-medium'}`}
                                value={cat}
                              >
                                <span className="block truncate">{cat === 'All' ? 'All Categories' : cat}</span>
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="w-full sm:w-44 shrink-0 relative z-20">
                    <Listbox value={sortOrder} onChange={setSortOrder}>
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-2xl bg-surface-container-lowest py-3 pl-4 pr-10 text-left border border-outline-variant/30 focus:outline-none focus-visible:border-primary text-sm shadow-sm transition-colors hover:border-primary/50 flex items-center gap-2 group">
                          <Filter className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                          <span className="block truncate text-on-surface font-semibold">
                            {sortOrder === 'newest' ? 'Most Recent' : 'Oldest First'}
                          </span>
                        </Listbox.Button>
                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                          <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-2xl bg-surface border border-outline-variant/20 p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] ring-1 ring-white/5 focus:outline-none z-50">
                            <Listbox.Option
                              className={({ active }) => `relative cursor-pointer select-none py-2 px-3 rounded-xl transition-colors ${active ? 'bg-primary/15 text-primary font-bold' : 'text-on-surface hover:bg-surface-container font-medium'}`}
                              value="newest"
                            >
                              <span className="block truncate">Most Recent</span>
                            </Listbox.Option>
                            <Listbox.Option
                              className={({ active }) => `relative cursor-pointer select-none py-2 px-3 rounded-xl transition-colors ${active ? 'bg-primary/15 text-primary font-bold' : 'text-on-surface hover:bg-surface-container font-medium'}`}
                              value="oldest"
                            >
                              <span className="block truncate">Oldest First</span>
                            </Listbox.Option>
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                </div>

                {/* List Container - Dynamic Height */}
                <div className="max-h-[55vh] overflow-y-auto px-6 py-4 space-y-3 scrollbar-thin scrollbar-thumb-surface-variant scrollbar-track-transparent bg-surface-container-lowest/30">
                  {activeTab === 'insights' && (
                    filteredInsights.length === 0 ? (
                      <div className="py-24 text-center text-on-surface-variant font-medium flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center">
                          <Search className="w-8 h-8 opacity-40" />
                        </div>
                        No insights matched your filters.
                      </div>
                    ) : (
                      <AnimatePresence>
                        {filteredInsights.map(item => (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.98, y: 5 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                            key={item.id} 
                            onClick={() => handleContentSelect('insight', item)}
                            className="flex items-center gap-4 p-2.5 rounded-2xl bg-surface-container/20 hover:bg-surface-container-highest cursor-pointer transition-all duration-300 border border-transparent hover:border-primary/40 hover:shadow-[0_0_25px_rgba(var(--color-primary),0.15)] group relative overflow-visible"
                          >
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                            
                            <div className="w-14 h-14 bg-surface-container-lowest rounded-xl overflow-hidden shrink-0 relative border border-white/5 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(var(--color-primary),0.3)] transition-all">
                              {item.coverImage ? (
                                <Image src={item.coverImage} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="56px" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-on-surface-variant/30 bg-surface-container"><Link2 className="w-4 h-4" /></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0 z-10">
                              <h4 className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">{item.title}</h4>
                              <div className="flex items-center gap-3 mt-1.5">
                                {item.category && (
                                  <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                                    {item.category}
                                  </span>
                                )}
                                <p className="text-[9px] text-on-surface-variant/60 uppercase tracking-widest font-black flex items-center gap-1">
                                  <CalendarDays className="w-3 h-3" />
                                  {new Date(item.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="shrink-0 pr-3 z-10">
                               <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-[0_0_15px_rgba(var(--color-primary),0.5)] text-on-primary">
                                 <ArrowRight className="w-4 h-4" />
                               </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )
                  )}

                  {activeTab === 'dossiers' && (
                    filteredDossiers.length === 0 ? (
                      <div className="py-24 text-center text-on-surface-variant font-medium flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center">
                          <Search className="w-8 h-8 opacity-40" />
                        </div>
                        No dossiers matched your filters.
                      </div>
                    ) : (
                      <AnimatePresence>
                        {filteredDossiers.map(item => (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.98, y: 5 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                            key={item.id} 
                            onClick={() => handleContentSelect('dossier', item)}
                            className="flex items-center gap-4 p-2.5 rounded-2xl bg-surface-container/20 hover:bg-surface-container-highest cursor-pointer transition-all duration-300 border border-transparent hover:border-primary/40 hover:shadow-[0_0_25px_rgba(var(--color-primary),0.15)] group relative overflow-visible"
                          >
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                            
                            <div className="w-14 h-14 bg-surface-container-lowest rounded-xl overflow-hidden shrink-0 relative border border-white/5 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(var(--color-primary),0.3)] transition-all">
                              {item.thumbnail ? (
                                <Image src={item.thumbnail} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="56px" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-on-surface-variant/30 bg-surface-container"><Link2 className="w-4 h-4" /></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0 z-10">
                              <h4 className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">{item.title}</h4>
                              <p className="text-xs text-on-surface-variant truncate mt-0.5">{item.associatedWith || 'Client Work'}</p>
                              <div className="flex items-center gap-3 mt-1.5">
                                {item.category && (
                                  <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                                    {item.category}
                                  </span>
                                )}
                                <p className="text-[9px] text-on-surface-variant/60 uppercase tracking-widest font-black flex items-center gap-1">
                                  <CalendarDays className="w-3 h-3" />
                                  {new Date(item.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="shrink-0 pr-3 z-10">
                               <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-[0_0_15px_rgba(var(--color-primary),0.5)] text-on-primary">
                                 <ArrowRight className="w-4 h-4" />
                               </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )
                  )}
                </div>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
    </>
  );
}
