"use client";

import { useEffect } from "react";
import { Flame, Wrench } from "lucide-react";
import "@/styles/globals.css";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space",
  display: 'swap',
});

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <head>
        <title>Error Encountered</title>
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary min-h-screen flex flex-col`}>
        <div className="w-full flex-1 relative flex items-center justify-center overflow-hidden">
      {/* Giant Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-display font-black text-error/5 pointer-events-none select-none z-0">
        500
      </div>

      <div className="relative z-10 w-full container px-6 lg:px-12 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-error/10 rounded-3xl rotate-12 flex items-center justify-center mb-8 border border-error/20 shadow-xl relative animate-[pulse_2s_infinite]">
          <Flame className="w-12 h-12 text-error" />
        </div>

        <h1 className="text-on-surface font-display text-4xl lg:text-7xl tracking-[-0.03em] font-bold mb-6 text-balance">
          Unplanned Demolition. <br className="hidden md:block"/> Well, this is awkward.
        </h1>
        
        <p className="font-sans text-lg lg:text-[19px] text-secondary mb-10 max-w-2xl leading-relaxed">
          Our code just tripped over its own shoelaces and crashed. Don't worry, a highly trained team of autonomous agents (or just me) has been notified. 
        </p>

        <button
          onClick={() => reset()}
          className="group relative inline-flex items-center gap-3 px-8 py-5 bg-error hover:bg-error/90 text-on-error font-display text-[13px] tracking-[0.1em] font-bold uppercase rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden focus:outline-none"
        >
          <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></span>
          <Wrench className="text-[20px] group-hover:rotate-45 transition-transform duration-300" />
          <span>Hit it with a wrench (Try Again)</span>
        </button>
      </div>
    </div>
      </body>
    </html>
  );
}
