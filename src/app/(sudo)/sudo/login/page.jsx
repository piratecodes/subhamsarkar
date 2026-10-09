"use client";

import { useState, useEffect } from "react";
import { login, resetPasswordRequest } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Loader2, KeyRound, Fingerprint } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/logo.png";

function useScrambleText(text, isMounted) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isMounted) return;
    const chars = "!<>-_\\\\/[]{}—=+*^?#_";
    let iteration = 0;
    
    // Start with fully scrambled
    setDisplayText(text.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join(""));

    const interval = setInterval(() => {
      setDisplayText(text.split("").map((char, index) => {
        if (index < iteration) {
          return text[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
    
    return () => clearInterval(interval);
  }, [text, isMounted]);

  return displayText;
}

export default function SudoLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState("login");
  const [password, setPassword] = useState("");

  // 3D Magnetic Glass Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const [particles, setParticles] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const scrambledTitle = useScrambleText("SUBHAM.DIGITAL", isMounted);

  useEffect(() => {
    setIsMounted(true);
    setParticles(Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    })));
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result.success) {
      toast.success("Authentication successful. Decrypting dashboard...");
      router.push("/sudo");
    } else {
      toast.error(result.error);
      setIsLoading(false);
    }
  }

  async function handleForgot(e) {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const identifier = formData.get("identifier");
    const result = await resetPasswordRequest(identifier);
    
    if (result.success) {
      toast.success(result.message);
      setView("login");
    } else {
      toast.error(result.error);
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">
      {/* MAGICAL ANIMATED BACKGROUND GLIMPSES (Theme Compliant) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Light Rays / Volumetric Beams */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 left-[20%] w-[150%] h-[150%] origin-top-left -rotate-45 bg-linear-to-b from-primary/10 via-transparent to-transparent pointer-events-none blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.05, 0.2, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -top-1/4 right-[20%] w-[150%] h-[150%] origin-top-right rotate-45 bg-linear-to-b from-secondary/10 via-transparent to-transparent pointer-events-none blur-3xl"
        />

        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-primary/10 mix-blend-multiply filter blur-[100px]"
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-secondary/10 mix-blend-multiply filter blur-[120px]"
        />

        {/* Floating Particles */}
        {isMounted && particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: `${p.y}vh`, x: `${p.x}vw` }}
            animate={{ 
              opacity: [0, 0.5, 0],
              y: [`${p.y}vh`, `${p.y - 20}vh`],
              x: [`${p.x}vw`, `${p.x + (Math.random() > 0.5 ? 5 : -5)}vw`]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
            className="absolute rounded-full bg-primary/30 blur-[1px]"
            style={{ width: p.size, height: p.size }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="w-full max-w-105 relative z-10 p-10 rounded-[2.5rem] bg-linear-to-br from-surface-container-lowest/70 to-surface-container-lowest/20 backdrop-blur-2xl backdrop-saturate-[1.5] border border-white/50 shadow-2xl shadow-primary/10 group"
      >
        <div className="flex flex-col items-center mb-10 relative z-10">
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1.15, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.5, delay: 0.2 }}
            className="mb-8 relative"
          >
            {/* Pulsing ring behind logo (reacts to password length) */}
            <motion.div 
              animate={{ 
                scale: [1, 1.4 + (password.length * 0.05), 1], 
                opacity: [0.1, Math.min(0.5, password.length * 0.05), 0.1] 
              }}
              transition={{ duration: Math.max(0.5, 3 - (password.length * 0.2)), repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-primary/40 rounded-full blur-md"
            ></motion.div>
            <figure className="relative h-28 w-36">
                <Image 
                src={logo} fill sizes="100vw"
                alt="Subham.Digital Logo" draggable={false}
                className="object-cover scale-152 relative z-10 drop-shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.4)]" 
                priority
              />
            </figure>
          </motion.div>
          
          {/* Animated Gradient Branding with Theme Colors & Glitch */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-display uppercase tracking-[0.25em] font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-inverse-primary to-primary bg-[length:200%_auto] animate-gradient"
          >
            {scrambledTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-primary text-[10px] tracking-[0.3em] uppercase mt-4 bg-primary-container/20 py-1.5 px-4 rounded-full border border-primary/20 flex items-center gap-2"
          >
            <Fingerprint size={12} className="animate-pulse" />
            Restricted Access
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {view === "login" ? (
            <motion.form 
              key="login"
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 30, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              onSubmit={handleLogin} 
              className="space-y-5 relative z-10"
            >
              <div className="space-y-4">
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-on-surface-variant/50 group-focus-within/input:text-primary transition-colors duration-300" />
                  </div>
                  <input
                    name="identifier"
                    type="text"
                    required
                    placeholder="Username or Email"
                    className="block w-full pl-12 pr-4 py-3.5 border border-outline/20 rounded-2xl bg-surface-container/50 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:bg-surface-container transition-all shadow-inner backdrop-blur-sm"
                  />
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 -z-10 bg-primary/0 group-hover/input:bg-primary/5 rounded-2xl transition-colors blur-xl"></div>
                </div>
                
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-on-surface-variant/50 group-focus-within/input:text-primary transition-colors duration-300" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Security Passkey"
                    className="block w-full pl-12 pr-4 py-3.5 border border-outline/20 rounded-2xl bg-surface-container/50 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:bg-surface-container transition-all shadow-inner backdrop-blur-sm cursor-text"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end text-xs pt-1">
                <button type="button" onClick={() => setView("forgot")} className="text-on-surface-variant hover:text-primary transition-colors tracking-widest uppercase font-semibold">
                  Forgot Clearance?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="relative overflow-hidden w-full flex items-center justify-center py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.2)] text-xs font-black tracking-[0.2em] uppercase text-on-primary bg-primary hover:bg-primary-container focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group/btn hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative z-10 flex items-center">
                  {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <>
                      Initialize Link
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </motion.form>
          ) : (
            <motion.form 
              key="forgot"
              initial={{ opacity: 0, x: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              onSubmit={handleForgot}
              className="space-y-5 relative z-10"
            >
               <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-on-surface-variant/50 group-focus-within/input:text-primary transition-colors duration-300" />
                  </div>
                  <input
                    name="identifier"
                    type="text"
                    required
                    placeholder="Username or System Email"
                    className="block w-full pl-12 pr-4 py-3.5 border border-outline/20 rounded-2xl bg-surface-container/50 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:bg-surface-container transition-all shadow-inner backdrop-blur-sm"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative overflow-hidden w-full flex items-center justify-center py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.2)] text-xs font-black tracking-[0.2em] uppercase text-on-primary bg-primary hover:bg-primary-container transition-all duration-300 disabled:opacity-50 group/btn hover:-translate-y-0.5"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    <span className="relative z-10 flex items-center">
                      {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Request Protocol"}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("login")}
                    className="w-full flex items-center justify-center py-4 px-6 rounded-2xl text-xs font-bold tracking-[0.2em] uppercase text-on-surface-variant hover:text-on-surface transition-colors border border-transparent hover:border-outline/20"
                  >
                    Abort & Return
                  </button>
                </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Futuristic HUD Elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 right-8 flex flex-col items-end gap-1 pointer-events-none"
      >
        <div className="flex items-center gap-2 text-[10px] tracking-widest text-on-surface-variant uppercase font-mono">
          <span>Auth Server</span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          <span className="text-on-surface font-bold">Online</span>
        </div>
        <div className="text-[9px] tracking-widest text-on-surface-variant/50 uppercase font-mono">
          SUBHAM.DIGITAL // 256-Bit SSL
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-8 hidden md:flex flex-col items-start gap-1 pointer-events-none"
      >
        <div className="w-12 h-px bg-primary/30 mb-1"></div>
        <div className="text-[9px] tracking-[0.3em] text-on-surface-variant uppercase font-mono">
          Secure Uplink
        </div>
      </motion.div>
    </div>
  );
}
