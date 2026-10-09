"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import { ArrowRight, ArrowUpRight, Briefcase, Calendar, CalendarCheck, Check, CheckCheck, CircleCheckBig, ChevronDown, Copy, Hash, Lock, Mail, RefreshCw, Shield, Terminal } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Confetti from 'react-confetti';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { createLead } from "@/actions/leads";
import { trackEvent } from "@/lib/tracking";

const CustomCountrySelect = ({ value, onChange, options, iconComponent: Icon }) => {
  return (
    <div className="relative flex items-center shrink-0">
      <Listbox value={value} onChange={onChange}>
        <ListboxButton className="flex items-center gap-1.5 px-2 py-1 focus:outline-none transition-colors group">
          <div className="w-[1.5em] h-[1em] rounded-sm overflow-hidden flex items-center justify-center border border-surface-container-highest shadow-sm">
            {Icon && <Icon country={value} label={value} />}
          </div>
          <ChevronDown className="w-[16px] h-[16px] text-secondary group-hover:text-primary transition-colors" />
        </ListboxButton>
        <ListboxOptions anchor="bottom start" className="[--anchor-gap:10px] ml-[-5px] max-h-60 w-[280px] overflow-auto rounded-xl bg-surface-container-lowest/60 backdrop-blur-xl border border-surface-container-highest/50 p-1.5 text-base shadow-xl ring-1 ring-black/5 focus:outline-none z-50 font-sans">
          {options.map((option) => (
            option.value ? (
              <ListboxOption
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 px-3 rounded-lg flex items-center gap-3 transition-colors ${
                    active ? 'bg-primary/10 text-primary' : 'text-on-surface hover:bg-surface-container-high/50'
                  }`
                }
              >
                <div className="w-[1.5em] h-[1em] rounded-sm overflow-hidden shrink-0 flex items-center justify-center border border-surface-container-highest/50 shadow-sm">
                  {Icon && <Icon country={option.value} label={option.label} />}
                </div>
                <span className="block truncate font-medium text-[14px] flex-1">
                  {option.label}
                </span>
                <span className="text-secondary font-mono text-[12px] opacity-80 shrink-0">
                  +{getCountryCallingCode(option.value)}
                </span>
              </ListboxOption>
            ) : null
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

const options = [
  { value: "new-system", label: "Building a New System (ERP, CRM, or Custom Software)" },
  { value: "fix-upgrade", label: "Fixing or Upgrading What I Already Have" },
  { value: "migration", label: "Moving Off an Old/Outdated System" },
  { value: "ai-automation", label: "Adding AI or Automation to My Business" },
  { value: "guidance", label: "Not Sure Yet — I Need Guidance" }
];

export default function TransmissionPortal({ settings }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [CopyIconState, setCopyIconState] = useState(() => Copy);
  const [copyClass, setCopyClass] = useState("");
  const [scopeValue, setScopeValue] = useState(options[0].value);
  const [phoneValue, setPhoneValue] = useState();
  const [timelineValue, setTimelineValue] = useState("immediate");
  const [ndaRequested, setNdaRequested] = useState(false);
  const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 });

  const getUsername = (url, prefix = '') => {
    if (!url) return '';
    try {
      let path = new URL(url).pathname.replace(/\/$/, '');
      if (prefix === '@') {
        return '@' + path.split('/').pop();
      }
      return path;
    } catch (e) {
      return 'VIEW PROFILE';
    }
  };

  useEffect(() => {
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const copyDirectEmail = async () => {
    try {
      if (settings?.email) {
        await navigator.clipboard.writeText(settings.email);
        setCopyIconState(() => Check);
        setCopyClass("text-on-primary");
        toast.success("Address copied to clipboard!", { duration: 3000 });
        setTimeout(() => {
          setCopyIconState(() => Copy);
          setCopyClass("");
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to copy email: ", err);
      toast.error("Failed to copy address.", { duration: 3000 });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    // Custom Validation
    const formData = new FormData(form);
    const firstName = formData.get("first-name");
    const email = formData.get("contact-email");
    const systemSpecs = formData.get("system-specs");

    const missingFields = [];
    if (!firstName || !firstName.trim()) missingFields.push("First Name");
    if (!email || !email.trim()) missingFields.push("Email");
    if (!phoneValue) missingFields.push("Phone Number");
    if (!timelineValue) missingFields.push("Timeline");
    if (!systemSpecs || !systemSpecs.trim()) missingFields.push("Project Details");

    if (missingFields.length > 0) {
      toast.error(`Missing required fields: ${missingFields.join(", ")}`, {
        duration: 4000,
        icon: '⚠️',
        style: {
          border: '1px solid rgba(239, 68, 68, 0.2)',
          background: 'rgba(20, 20, 20, 0.9)',
          color: '#fff',
        },
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please provide a valid email format.", { icon: '⚠️' });
      return;
    }

    setIsSubmitting(true);
    
    // Append phone value to form data since it's controlled
    if (phoneValue) {
      formData.set("contact-phone", phoneValue);
    }
    if (scopeValue) {
      formData.set("project-scope", scopeValue);
    }
    
    const result = await createLead(formData);

    setIsSubmitting(false);
    
    if (result.success) {
      setIsSuccess(true);
      toast.success("Transmission successful. I will connect with you within 12 hours.", {
        duration: 6000,
      });
      trackEvent('form_submit', '/contact');
      
      // Reset standard HTML inputs (text, textarea, radio, checkbox)
      form.reset();
      
      // Reset React controlled inputs
      setPhoneValue();
      setScopeValue(options[0].value);
      
      // Reset success state after confetti/toast finishes
      setTimeout(() => {
        setIsSuccess(false);
      }, 6000);
    } else {
      toast.error(result.error || "Transmission failed.");
    }
  };

  return (
    <section className="w-full relative py-16 overflow-hidden">
      {/* Background Ambient Orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/4 pointer-events-none"></div>

      <div className="w-full container px-4 lg:px-12 relative z-10">
      {isSuccess && windowDimension.width > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          <Confetti 
            width={windowDimension.width} 
            height={windowDimension.height} 
            recycle={false} 
            numberOfPieces={500} 
            gravity={0.12}
          />
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Primary Architectural Transmission Form (Col 1-7) */}
        <div className="lg:col-span-7 relative overflow-hidden bg-surface-container-lowest/80 backdrop-blur-xl p-6 lg:p-10 rounded-2xl border border-surface-container-highest/60 shadow-lg space-y-6 group/form hover:shadow-xl hover:border-primary/30 transition-all duration-700">
          
          {/* Ambient Form Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-30 animate-pulse pointer-events-none"></div>
          
          <div className="flex items-center justify-between pb-2 relative z-10 border-b border-surface-container-highest/50 mb-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-display text-[12px] leading-4 tracking-[0.04em] font-bold text-primary">DIRECT LINE TO THE ARCHITECT</span>
            </div>
            <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-bold uppercase text-secondary bg-surface-container px-2 py-1 rounded-md">
              RESPONSE TIME: 6–8 HOURS
            </span>
          </div>

          <form className="space-y-5 relative z-10" onSubmit={handleFormSubmit} noValidate>
            {/* Field 1 & 2: First & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 relative">
                <div className="flex items-center justify-between">
                  <label className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase tracking-wider text-on-surface font-semibold flex items-center gap-1" htmlFor="first-name">
                    <span>01. FIRST NAME</span>
                    <span className="text-primary font-display text-[12px] leading-4 tracking-[0.04em] font-medium">[REQ]</span>
                  </label>
                </div>
                <input 
                  id="first-name" 
                  name="first-name"
                  type="text" 
                  placeholder="e.g. Priya" 
                  required 
                  className="w-full px-4 py-3 bg-surface-container/75 text-on-surface font-sans text-[15px] leading-6 tracking-[-0.005em] font-normal rounded focus:outline-none focus:bg-surface-container-high/75 transition-colors placeholder:text-secondary/60" 
                />
              </div>
              <div className="space-y-1.5 relative">
                <div className="flex items-center justify-between">
                  <label className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase tracking-wider text-on-surface font-semibold flex items-center gap-1" htmlFor="last-name">
                    <span>02. LAST NAME</span>
                    <span className="text-secondary font-display text-[12px] leading-4 tracking-[0.04em] font-medium">[OPTIONAL]</span>
                  </label>
                </div>
                <input 
                  id="last-name" 
                  name="last-name"
                  type="text" 
                  placeholder="e.g. Sharma" 
                  className="w-full px-4 py-3 bg-surface-container/75 text-on-surface font-sans text-[15px] leading-6 tracking-[-0.005em] font-normal rounded focus:outline-none focus:bg-surface-container-high/75 transition-colors placeholder:text-secondary/60" 
                />
              </div>
            </div>

            {/* Field 3 & 4: Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase tracking-wider text-on-surface font-semibold flex items-center gap-1" htmlFor="contact-email">
                    <span>03. EMAIL</span>
                    <span className="text-primary font-display text-[12px] leading-4 tracking-[0.04em] font-medium">[REQ]</span>
                  </label>
                </div>
                <input 
                  id="contact-email" 
                  name="contact-email"
                  type="email" 
                  placeholder="e.g. priya@yourcompany.com" 
                  required 
                  className="w-full px-4 py-3 bg-surface-container/75 text-on-surface font-sans text-[15px] leading-6 tracking-[-0.005em] font-normal rounded focus:outline-none focus:bg-surface-container-high/75 transition-colors placeholder:text-secondary/60" 
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase tracking-wider text-on-surface font-semibold flex items-center gap-1" htmlFor="contact-phone">
                    <span>04. PHONE NUMBER</span>
                    <span className="text-primary font-display text-[12px] leading-4 tracking-[0.04em] font-medium">[REQ]</span>
                  </label>
                </div>
                {/* Wrap phone input in a custom style override if needed, using standard input styles */}
                <div className="w-full px-4 py-3 bg-surface-container/75 text-on-surface font-sans text-[15px] leading-6 tracking-[-0.005em] font-normal rounded focus-within:bg-surface-container-high/75 transition-colors [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:placeholder:text-secondary/60 [&_.PhoneInput]:gap-2">
                  <PhoneInput
                    id="contact-phone"
                    international
                    defaultCountry="IN"
                    value={phoneValue}
                    onChange={setPhoneValue}
                    placeholder="e.g. +91 98765 43210"
                    countrySelectComponent={CustomCountrySelect}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Field 3: Scope Dropdown */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase tracking-wider text-on-surface font-semibold" htmlFor="project-scope">
                  05. WHAT DO YOU NEED HELP WITH?
                </label>
              </div>
              <div className="relative">
                <Listbox value={scopeValue} onChange={setScopeValue}>
                  <div className="relative mt-1">
                    <ListboxButton className="relative w-full cursor-pointer rounded bg-surface-container/75 py-3 pl-4 pr-10 text-left focus:outline-none focus:bg-surface-container-high/75 transition-colors font-sans text-[15px] leading-6 tracking-[-0.005em] font-normal text-on-surface">
                      <span className="block truncate">{options.find(opt => opt.value === scopeValue)?.label}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                        <ChevronDown className="text-[20px] text-secondary" />
                      </span>
                    </ListboxButton>
                    <ListboxOptions className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-surface-container-lowest/60 backdrop-blur-xl border border-surface-container-highest/50 p-1.5 text-base shadow-xl ring-1 ring-black/5 focus:outline-none z-50 font-sans">
                      {options.map((option, idx) => (
                        <ListboxOption
                          key={idx}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2.5 px-4 rounded-lg transition-colors duration-200 ${
                              active ? 'bg-primary/10 text-primary' : 'text-on-surface hover:bg-surface-container-high/50'
                            }`
                          }
                          value={option.value}
                        >
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                {option.label}
                              </span>
                            </>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
              </div>
            </div>

            {/* Field 4: Horizon / Timeline Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase tracking-wider text-on-surface font-semibold flex items-center gap-1">
                  <span>06. WHEN ARE YOU LOOKING TO START?</span>
                  <span className="text-primary font-display text-[12px] leading-4 tracking-[0.04em] font-medium">[REQ]</span>
                </label>
              </div>
              <input type="hidden" name="timeline" value={timelineValue} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "immediate", label: "Right Away" },
                  { id: "quarterly", label: "1–3 Months" },
                  { id: "exploratory", label: "Exploring" },
                ].map((option) => (
                  <motion.div
                    key={option.id}
                    onClick={() => setTimelineValue(option.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-4 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-300 ${
                      timelineValue === option.id 
                        ? "bg-primary/10 border-primary/50 shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.15)]" 
                        : "bg-surface-container/75 border-surface-container-highest/30 hover:border-surface-container-highest hover:bg-surface-container-high/75"
                    }`}
                  >
                    <div className="flex items-center justify-center w-full mb-1">
                      <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        timelineValue === option.id ? "bg-primary shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.8)]" : "bg-surface-dim"
                      }`}></div>
                    </div>
                    <span className={`font-display text-[14px] leading-5 tracking-[0.02em] font-bold text-center mt-1 transition-colors duration-300 ${
                      timelineValue === option.id ? "text-primary" : "text-on-surface"
                    }`}>
                      {option.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Field 5: System Specs & Challenge */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase tracking-wider text-on-surface font-semibold flex items-center gap-1" htmlFor="system-specs">
                  <span>07. TELL US ABOUT YOUR PROJECT</span>
                  <span className="text-primary font-display text-[12px] leading-4 tracking-[0.04em] font-medium">[REQ]</span>
                </label>
                <span className="font-display text-[12px] leading-4 tracking-[0.04em] font-medium text-secondary tracking-tighter">MAX 2,000 CHARS</span>
              </div>
              <textarea 
                id="system-specs" 
                name="system-specs"
                rows="5" 
                placeholder="What's currently working, what isn't, and what you're hoping to achieve." 
                className="w-full px-4 py-3 bg-surface-container/75 text-on-surface font-sans text-[15px] leading-6 tracking-[-0.005em] font-normal rounded focus:outline-none focus:bg-surface-container-high/75 transition-colors resize-y placeholder:text-secondary/60"
              ></textarea>
            </div>

            {/* Field 6: Bilateral Mutual NDA Agreement */}
            <div 
              className="p-5 bg-surface-container/75 hover:bg-surface-container-high/75 border border-surface-container-highest/30 rounded-xl flex flex-row items-center justify-between gap-4 select-none cursor-pointer transition-colors duration-300 group/nda"
              onClick={() => setNdaRequested(!ndaRequested)}
            >
              <input type="hidden" name="nda-checkbox" value={ndaRequested ? "on" : "off"} />
              <div className="flex flex-col">
                <span className={`font-display text-[12px] leading-4 tracking-[0.12em] font-bold uppercase tracking-wider mb-1 transition-colors duration-300 ${ndaRequested ? 'text-primary' : 'text-on-surface group-hover/nda:text-primary/70'}`}>
                  REQUEST NDA
                </span>
                <span className="font-display text-[11px] leading-4 tracking-[0.04em] font-medium text-secondary">
                  I'd like a non-disclosure agreement signed before sharing detailed project info.
                </span>
              </div>
              
              <div 
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300 focus:outline-none ${ndaRequested ? 'bg-primary shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.4)]' : 'bg-surface-dim'}`}
              >
                <motion.span
                  className="inline-block h-4 w-4 transform rounded-full bg-surface-container-lowest transition-transform duration-300 shadow-sm"
                  initial={false}
                  animate={{ x: ndaRequested ? 24 : 4 }}
                />
              </div>
            </div>

            {/* Submission Action Bar */}
            <div className="pt-4 flex justify-end">
              <button 
                type="submit" 
                disabled={isSubmitting || isSuccess}
                className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-container hover:bg-primary text-on-primary font-display text-[12px] leading-4 tracking-[0.12em] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 group/submit disabled:opacity-80"
              >
                {/* Button sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/submit:translate-x-[100%] transition-transform duration-700 ease-out pointer-events-none"></div>
                
                {isSubmitting ? (
                  <>
                    <RefreshCw className="text-[18px] animate-spin relative z-10" />
                    <span className="relative z-10">TRANSMITTING...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCheck className="text-[18px] relative z-10" />
                    <span className="relative z-10">TRANSMITTED</span>
                  </>
                ) : (
                  <>
                    <Lock className="text-[18px] group-hover/submit:-rotate-12 transition-transform relative z-10" />
                    <span className="relative z-10">SEND MESSAGE</span>
                    <ArrowRight className="text-[18px] group-hover/submit:translate-x-1 transition-transform relative z-10" />
                  </>
                )}
              </button>
            </div>

            {/* Success Notification Toast Placeholder */}
            {isSuccess && (
              <div className="p-4 bg-secondary-container text-on-secondary-fixed rounded flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CircleCheckBig className="text-primary" />
                  <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase tracking-wider font-semibold">
                    Transmission acknowledged. Confirmation sent to specified corporate endpoint.
                  </span>
                </div>
                <span className="font-display text-[12px] leading-4 tracking-[0.04em] font-medium text-secondary">REF: #ARC-9804</span>
              </div>
            )}
          </form>
        </div>

        {/* Verification, Telemetry & Direct Contact Sidebar (Col 8-12) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Architect Direct Channel Card */}
          {settings?.email && (
            <div className="relative overflow-hidden bg-surface-container-lowest/80 backdrop-blur-xl p-6 rounded-2xl border border-surface-container-highest/60 shadow-sm space-y-4 hover:shadow-xl hover:border-primary/20 transition-all duration-500 group/comm hover:-translate-y-1">
              <div className="relative z-10">
              <div className="flex items-center justify-between pb-1">
                <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold text-primary uppercase tracking-widest font-semibold">
                  PRIMARY ACCESS // DIRECT COMM
                </span>
                <span className="font-display text-[12px] leading-4 tracking-[0.04em] font-medium text-secondary group-hover/comm:text-primary transition-colors duration-500">CHANNEL: E-MAIL</span>
              </div>
              <div className="space-y-1">
                <span className="font-display text-[12px] leading-4 tracking-[0.04em] font-medium text-secondary uppercase">Monitored Transmission Address:</span>
                <div className="p-3 bg-surface-container-low/50 border border-surface-container-highest/30 rounded-xl flex items-center justify-between group-hover/comm:border-primary/40 group-hover/comm:shadow-[0_0_20px_rgba(var(--color-primary),0.1)] transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/comm:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <span className="relative z-10 font-display text-[20px] sm:text-[24px] leading-[32px] tracking-[-0.01em] font-bold text-on-surface tracking-tight selection:bg-primary-container truncate mr-2">
                    {settings.email}
                  </span>
                  <div className="relative z-10 flex items-center gap-1.5 shrink-0">
                    <a 
                      href={`mailto:${settings.email}`}
                      title="Send Direct Email"
                      onClick={() => toast.success("Opening default mail client...")}
                      className="p-2 bg-surface-container hover:bg-primary rounded-lg text-secondary hover:text-on-primary transition-all duration-300 flex items-center group/btn shadow-sm hover:shadow-md"
                    >
                      <Mail className="text-[18px] group-hover/btn:scale-110 transition-transform" />
                    </a>
                    <button 
                      type="button" 
                      onClick={copyDirectEmail}
                      title="Copy Address to Clipboard"
                      className="p-2 bg-surface-container hover:bg-primary rounded-lg text-secondary hover:text-on-primary transition-all duration-300 flex items-center group/btn shadow-sm hover:shadow-md"
                    >
                      <CopyIconState className={`text-[18px] group-hover/btn:scale-110 transition-transform ${copyClass}`} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 font-display text-[12px] leading-4 tracking-[0.04em] font-medium px-2 py-1 bg-surface-container/75 rounded text-secondary group-hover/comm:text-primary transition-colors duration-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary group-hover/comm:bg-primary group-hover/comm:animate-pulse transition-all duration-500 inline-block"></span>
                  <span>CALCUTTA TIME (IST / UTC +5:30)</span>
                </span>
              </div>
              </div>
            </div>
          )}

          {/* Verified Digital Fingerprints & Social Profiles */}
          <div className="relative overflow-hidden bg-surface-container-lowest/80 backdrop-blur-xl p-6 rounded-2xl border border-surface-container-highest/60 shadow-sm space-y-4 hover:shadow-xl hover:border-primary/20 transition-all duration-500">
            <div className="flex items-center justify-between pb-1">
              <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase tracking-widest text-on-surface font-semibold">
                VERIFIED IDENTITIES // REPOSITORIES
              </span>
              <span className="font-display text-[12px] leading-4 tracking-[0.04em] font-medium text-secondary">PUBLIC LEDGER</span>
            </div>
            <div className="grid grid-cols-2 gap-3 font-display text-[11px] leading-4 tracking-[0.12em] font-semibold">
              {/* GitHub Link */}
              {settings?.github && (
                <a href={settings.github} target="_blank" rel="noopener noreferrer" className="relative overflow-hidden p-3.5 bg-surface-container/40 hover:bg-transparent rounded-xl flex flex-col justify-between border border-surface-container-highest/30 hover:border-primary/40 transition-all duration-500 group hover:-translate-y-0.5">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="relative z-10 flex items-center justify-between text-secondary group-hover:text-primary mb-4">
                    <FaGithub className="text-[20px] group-hover:scale-110 transition-transform duration-500" />
                    <ArrowUpRight className="text-[14px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
                  </div>
                  <div className="relative z-10 flex flex-col space-y-0.5">
                    <span className="text-on-surface font-bold uppercase tracking-wider group-hover:text-primary transition-colors duration-500">GITHUB</span>
                    <span className="font-display text-[12px] leading-4 tracking-[0.04em] font-medium text-secondary group-hover:text-primary/80 transition-colors duration-500">{getUsername(settings.github)}</span>
                  </div>
                </a>
              )}
              {/* LinkedIn Link */}
              {settings?.linkedin && (
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="relative overflow-hidden p-3.5 bg-surface-container/40 hover:bg-transparent rounded-xl flex flex-col justify-between border border-surface-container-highest/30 hover:border-primary/40 transition-all duration-500 group hover:-translate-y-0.5">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="relative z-10 flex items-center justify-between text-secondary group-hover:text-primary mb-4">
                    <FaLinkedin className="text-[20px] group-hover:scale-110 transition-transform duration-500" />
                    <ArrowUpRight className="text-[14px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
                  </div>
                  <div className="relative z-10 flex flex-col space-y-0.5">
                    <span className="text-on-surface font-bold uppercase tracking-wider group-hover:text-primary transition-colors duration-500">LINKEDIN</span>
                    <span className="font-display text-[12px] leading-4 tracking-[0.04em] font-medium text-secondary group-hover:text-primary/80 transition-colors duration-500">{getUsername(settings.linkedin)}</span>
                  </div>
                </a>
              )}
              {/* X/Twitter Link */}
              {settings?.twitter && (
                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="relative overflow-hidden p-3.5 bg-surface-container/40 hover:bg-transparent rounded-xl flex flex-col justify-between border border-surface-container-highest/30 hover:border-primary/40 transition-all duration-500 group hover:-translate-y-0.5">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="relative z-10 flex items-center justify-between text-secondary group-hover:text-primary mb-4">
                    <FaXTwitter className="text-[20px] group-hover:scale-110 transition-transform duration-500" />
                    <ArrowUpRight className="text-[14px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
                  </div>
                  <div className="relative z-10 flex flex-col space-y-0.5">
                    <span className="text-on-surface font-bold uppercase tracking-wider group-hover:text-primary transition-colors duration-500">X / TWITTER</span>
                    <span className="font-display text-[12px] leading-4 tracking-[0.04em] font-medium text-secondary group-hover:text-primary/80 transition-colors duration-500">{getUsername(settings.twitter, '@')}</span>
                  </div>
                </a>
              )}
              {/* Instagram Link */}
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="relative overflow-hidden p-3.5 bg-surface-container/40 hover:bg-transparent rounded-xl flex flex-col justify-between border border-surface-container-highest/30 hover:border-primary/40 transition-all duration-500 group hover:-translate-y-0.5">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="relative z-10 flex items-center justify-between text-secondary group-hover:text-primary mb-4">
                    <FaInstagram className="text-[20px] group-hover:scale-110 transition-transform duration-500" />
                    <ArrowUpRight className="text-[14px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
                  </div>
                  <div className="relative z-10 flex flex-col space-y-0.5">
                    <span className="text-on-surface font-bold uppercase tracking-wider group-hover:text-primary transition-colors duration-500">INSTAGRAM</span>
                    <span className="font-display text-[12px] leading-4 tracking-[0.04em] font-medium text-secondary group-hover:text-primary/80 transition-colors duration-500">{getUsername(settings.instagram)}</span>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Security & Confidentiality Assurance Callout */}
          <div className="relative overflow-hidden bg-surface-container-lowest/60 backdrop-blur-xl p-5 rounded-2xl border border-surface-container-highest/60 shadow-sm space-y-2 group/assurance hover:border-primary/30 transition-all duration-500">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/assurance:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="relative z-10 flex items-center gap-2">
              <Shield className="text-primary text-[18px]" />
              <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase tracking-wider text-on-surface font-semibold">
                HOW YOUR INFORMATION IS HANDLED
              </span>
            </div>
            <p className="font-sans text-[13px] leading-5 tracking-[0em] font-normal text-secondary pt-1">
              Everything you share is reviewed only by me — never outsourced, never shared with third parties. If you'd rather sign an NDA before going into detail, that's always an option, not a requirement.
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
