"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, Fingerprint, MessageSquareText } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import MagneticButton from "@/components/MagneticButton";

export default function FloatingContact({ settings }) {
  const [isOpen, setIsOpen] = useState(false);

  // If no settings exist for these contacts, we don't show the floating contact at all.
  if (!settings?.whatsapp && !settings?.email) return null;

  const whatsappUrl = settings?.whatsapp;
  const emailUrl = settings?.email ? `mailto:${settings.email}` : '';

  const toggleOpen = () => setIsOpen(!isOpen);

  // Magic Radial Coordinates (Quarter Circle fan-out to the top-left)
  const waX = -75;
  const waY = -15;
  
  const emX = -25;
  const emY = -75;

  return (
    <div className="fixed bottom-6 right-6 z-9990 flex items-center justify-center w-14 h-14 pointer-events-none">
      
      {/* Magic HUD Ring (Expands dynamically on open) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="absolute w-55 h-55 pointer-events-none will-change-transform flex items-center justify-center"
          >
            {/* Base Radial Glow */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--color-primary-rgb),0.05),transparent_60%)]"></div>
            
            {/* Outer Dashed Ring (Slow Clockwise Spin) */}
            <div className="absolute inset-0 rounded-full border border-dashed border-primary/30 animate-spin shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.1)]" style={{ animationDuration: '30s' }}></div>
            
            {/* Inner Dotted Ring (Slow Counter-Clockwise Spin) */}
            <div className="absolute w-40 h-40 rounded-full border-[1.5px] border-dotted border-primary/20 animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }}></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Sub-Node */}
      <AnimatePresence>
        {isOpen && settings?.whatsapp && (
          <motion.a
            href={`https://wa.me/${whatsappUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ x: 0, y: 0, scale: 0.5, opacity: 0, rotate: -90 }}
            animate={{ x: waX, y: waY, scale: 1, opacity: 1, rotate: 0 }}
            exit={{ x: 0, y: 0, scale: 0.5, opacity: 0, rotate: 90 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.05 }}
            className="absolute pointer-events-auto flex items-center justify-center w-12 h-12 bg-[#25D366]/10 backdrop-blur-xl border border-[#25D366]/40 rounded-full text-[#25D366] shadow-[0_0_20px_rgba(37,211,102,0.2)] hover:bg-[#25D366] hover:text-black hover:shadow-[0_0_40px_rgba(37,211,102,0.5)] transition-colors duration-300 group will-change-transform"
          >
            <FaWhatsapp size={22} />
            {/* Hover Tooltip */}
            <span className="absolute right-14 font-display text-[10px] font-black tracking-widest uppercase bg-surface-container-lowest/90 px-3 py-1.5 rounded-lg border border-[#25D366]/30 text-on-surface opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
              Encrypted Line
            </span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* Email Sub-Node */}
      <AnimatePresence>
        {isOpen && settings?.email && (
          <motion.a
            href={emailUrl}
            initial={{ x: 0, y: 0, scale: 0.5, opacity: 0, rotate: -90 }}
            animate={{ x: emX, y: emY, scale: 1, opacity: 1, rotate: 0 }}
            exit={{ x: 0, y: 0, scale: 0.5, opacity: 0, rotate: 90 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            className="absolute pointer-events-auto flex items-center justify-center w-12 h-12 bg-primary/10 backdrop-blur-xl border border-primary/40 rounded-full text-primary shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.2)] hover:bg-primary hover:text-on-primary hover:shadow-[0_0_40px_rgba(var(--color-primary-rgb),0.5)] transition-colors duration-300 group will-change-transform"
          >
            <Mail size={20} />
            {/* Hover Tooltip */}
            <span className="absolute right-14 font-display text-[10px] font-black tracking-widest uppercase bg-surface-container-lowest/90 px-3 py-1.5 rounded-lg border border-primary/30 text-on-surface opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
              Direct Protocol
            </span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* Core Command Node */}
      <MagneticButton className="absolute z-10 w-14 h-14" magneticPull={isOpen ? 0 : 0.4}>
        <motion.button
          onClick={toggleOpen}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="pointer-events-auto w-full h-full bg-surface-container-lowest/90 backdrop-blur-3xl border border-primary/50 rounded-full shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.4)] flex items-center justify-center text-primary overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--color-primary-rgb),0.4),transparent_70%)] group-hover:scale-150 transition-transform duration-500"></div>
          
          {/* Magic Scanning Line inside the button when idle */}
          {!isOpen && (
            <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin pointer-events-none" style={{ animationDuration: '3s' }}></div>
          )}

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 180, scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-10 text-primary"
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -180, scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-10 text-primary flex items-center justify-center"
              >
                <MessageSquareText size={24} className="hidden md:block" />
                <Fingerprint size={26} className="block md:hidden" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </MagneticButton>

    </div>
  );
}
