"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Users, 
  Settings, 
  Fingerprint,
  Radio
} from "lucide-react";
import Image from "next/image";
import navlogo from "@/assets/navlogo.png";
import { useSidebar } from "./SidebarContext";

export default function SudoSidebar({ user }) {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useSidebar();

  const navItems = [
    { name: 'Command Center', path: '/sudo', icon: LayoutDashboard },
    { name: 'Projects / Dossiers', path: '/sudo/projects', icon: Briefcase },
    { name: 'Global Insights', path: '/sudo/insights', icon: FileText },
    { name: 'Transmission Leads', path: '/sudo/leads', icon: Users },
    { name: 'Teams & Operatives', path: '/sudo/teams', icon: Users },
    { name: 'Push Broadcast', path: '/sudo/notifications', icon: Radio },
  ];

  const profilePicUrl = user?.profileImage || null;

  // Stagger variants for the nav items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, filter: "blur(10px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 250, damping: 20 } }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed lg:sticky top-0 lg:top-4 left-0 w-72 bg-surface-container-lowest/70 backdrop-blur-3xl border border-outline/10 flex flex-col flex-shrink-0 h-screen lg:h-[calc(100vh-32px)] lg:m-4 lg:ml-4 lg:mr-0 rounded-r-[2.5rem] lg:rounded-[2.5rem] overflow-hidden z-50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Premium Glassmorphic Inner Border */}
        <div className="absolute inset-0 rounded-r-[2.5rem] lg:rounded-[2.5rem] border-[0.5px] border-white/5 pointer-events-none" />

        {/* Ambient background glows */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Header Logo Area */}
        <div className="h-28 flex items-center px-8 shrink-0 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            className="flex items-center gap-3 relative group"
          >
            {/* Small Logo */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <figure className="relative aspect-video h-12 w-auto align-middle">
                <Image src={navlogo} alt="Logo" className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_10px_rgba(var(--color-primary),0.3)] transition-all duration-500 group-hover:scale-110" sizes="100vw" loading="lazy" draggable={false} />
              </figure>
            </div>
            
            {/* Text */}
            <div className="flex flex-col">
              <motion.h1 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="font-display font-black tracking-widest text-on-surface uppercase text-[11px] leading-tight"
              >
                Subham<span className="text-primary">.Digital</span>
              </motion.h1>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[8px] tracking-[0.3em] font-black text-on-surface-variant/70 uppercase mt-0.5"
              >
                System Elevate
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Navigation Menu */}
        <motion.nav 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 py-4 px-5 space-y-3 overflow-y-auto scrollbar-none relative z-10"
        >
          <div className="px-3 mb-6">
            <span className="text-[9px] tracking-[0.2em] text-on-surface-variant/50 uppercase font-bold">Admin Portal</span>
          </div>

          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <motion.div key={item.name} variants={itemVariants} className="relative group">
                <Link 
                  href={item.path} 
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-4 text-[11px] font-display font-black tracking-[0.15em] uppercase rounded-2xl transition-all duration-300 relative z-10 overflow-hidden ${
                    isActive
                      ? 'text-primary scale-[0.98] shadow-inner'
                      : 'text-on-surface-variant hover:text-on-surface hover:pl-6'
                  }`}
                >
                  {/* Background Box for ALL Links */}
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-surface-container-highest shadow-[inset_0_4px_10px_rgba(0,0,0,0.1)] border border-outline/10' 
                      : 'bg-surface-container/30 border border-outline/5 hover:bg-surface-container/50'
                  }`} />
                  
                  {/* Active Indicator Pulse Glow (replaces hard red line) */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-glow"
                      className="absolute inset-0 rounded-2xl bg-primary/10 shadow-[inset_0_0_20px_rgba(var(--color-primary),0.05)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}

                  {/* Icon wrapper for extra visual flair */}
                  <div className={`relative flex items-center justify-center mr-4 w-7 h-7 rounded-xl transition-all duration-300 z-10 ${
                    isActive 
                      ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(var(--color-primary),0.4)]' 
                      : 'bg-surface-container-high text-on-surface-variant group-hover:bg-primary/20 group-hover:text-primary group-hover:shadow-[0_0_10px_rgba(var(--color-primary),0.2)]'
                  }`}>
                    <item.icon className={`h-[15px] w-[15px] transition-transform duration-300 ${isActive ? 'scale-90' : 'group-hover:scale-110'}`} />
                  </div>
                  
                  <span className="relative z-10 mt-0.5 drop-shadow-sm">{item.name}</span>
                  
                  {/* Animated chevron on hover */}
                  {!isActive && (
                    <motion.div className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative z-10">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary drop-shadow-[0_0_5px_rgba(var(--color-primary),0.5)]"><path d="m9 18 6-6-6-6"/></svg>
                    </motion.div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>

        {/* User Profile Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, type: "spring" }}
          className="p-5 mx-4 mb-4 mt-2 rounded-[2rem] bg-surface-container-lowest/80 border border-outline/10 shrink-0 relative z-10 shadow-lg backdrop-blur-xl"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-primary/40 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-12 h-12 rounded-full bg-surface-container-highest text-primary flex items-center justify-center font-display text-xl font-black shadow-inner shrink-0 overflow-hidden ring-2 ring-transparent group-hover:ring-primary/30 transition-all duration-300">
                {profilePicUrl ? (
                  <Image src={profilePicUrl} alt="Profile" width={48} height={48} className="w-full h-full object-cover" />
                ) : (
                  user?.firstName?.charAt(0).toUpperCase() || 'A'
                )}
              </div>
            </div>
            
            <div className="overflow-hidden flex-1">
              <p className="font-display font-black text-on-surface text-[13px] tracking-wide truncate">
                {user?.firstName ? `${user.firstName} ${user.lastName}` : 'Administrator'}
              </p>
              <p className="text-[8px] uppercase tracking-[0.25em] text-primary font-bold mt-1 truncate">
                {user?.designation || user?.role?.replace('_', ' ')}
              </p>
            </div>
          </div>
          
          <Link 
            href="/sudo/settings" 
            onClick={() => setIsOpen(false)}
            className={`group relative overflow-hidden w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-500 shadow-sm text-[10px] uppercase tracking-[0.15em] font-black border ${ 
              pathname.includes('/settings') 
                ? 'bg-primary text-on-primary border-primary shadow-[0_8px_16px_-6px_rgba(var(--color-primary),0.5)] scale-[0.98]' 
                : 'bg-surface border-outline/10 text-on-surface hover:bg-surface-container hover:border-outline/20 hover:shadow-md' 
            }`}
          >
            {/* Sweep Hover Effect */}
            {!pathname.includes('/settings') && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            )}

            <Settings size={15} className={`transition-all duration-700 ${pathname.includes('/settings') ? 'animate-spin-slow text-on-primary' : 'group-hover:rotate-180 group-hover:text-primary'}`} /> 
            <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Configuration</span>
          </Link>
        </motion.div>
      </aside>
    </>
  );
}
