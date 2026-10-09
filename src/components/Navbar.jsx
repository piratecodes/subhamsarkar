"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image'
import { usePathname } from "next/navigation";
import { Compass, Menu, X } from "lucide-react";
import { Dialog, DialogPanel } from "@headlessui/react";

import logo from '@/assets/navlogo.png'

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => pathname === path;

  const navLinks = [
    { name: "About / Journey", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Work", href: "/work" },
    { name: "Industry Insights", href: "/insights" },
    { name: "Process", href: "/process" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
      scrolled 
        ? "bg-surface-container-lowest/85 backdrop-blur-2xl border-b border-surface-container-highest/50 shadow-[0_8px_30px_rgba(0,0,0,0.4)]" 
        : "bg-linear-to-b from-surface/95 via-surface/60 to-transparent backdrop-blur-[6px] border-b border-transparent"
    }`}>
      {/* Cinematic Spotlight Edge (Visible only when at the top) */}
      <div className={`absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out pointer-events-none ${scrolled ? 'opacity-0 scale-x-90' : 'opacity-100 scale-x-100'}`}>
        {/* Core sharp line */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent"></div>
        {/* Intense center core */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-primary blur-[1px]"></div>
        {/* Upward volumetric spotlight glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-10 bg-primary/15 blur-[25px] origin-bottom rounded-[100%]"></div>
      </div>
      <div className="w-full container px-6 lg:px-12 h-20 flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-3 md:gap-6">
          <div className="relative h-10 w-auto md:h-14 md:w-auto shrink-0">
            <Image src={logo} alt="brand logo" className="w-full h-full object-contain" loading="lazy" draggable={false}/>
          </div>
          <div className="flex flex-col group">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-base md:text-xl leading-6 md:leading-8 tracking-[-0.01em] font-bold text-on-surface group-hover:text-primary transition-colors">SUBHAM SARKAR</span>
              <span className="font-display text-[10px] md:text-xs leading-3.5 md:leading-4 tracking-[0.12em] font-semibold px-1.5 py-0.5 bg-surface-container-highest/75 text-secondary rounded">ARCH</span>
            </div>
            <span className="font-display text-[10px] md:text-[12px] leading-3.5 md:leading-4 font-medium text-secondary tracking-wider truncate max-w-50 md:max-w-none">SUBHAM.DIGITAL // STUDIO ELEVATION</span>
          </div>
          </Link>
        </div>
        <nav className="hidden lg:flex items-center gap-1 xl:gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative px-3 py-1.5 rounded-full font-display text-[10px] xl:text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase transition-all duration-300 group flex items-center justify-center ${
                isActive(link.href)
                  ? "text-primary"
                  : "text-secondary hover:text-on-surface"
              }`}
            >
              {/* Text physically reacts (presses down) when the pill appears */}
              <span className={`relative z-10 transition-transform duration-300 inline-block ${isActive(link.href) ? "scale-95" : "group-hover:scale-95 group-active:scale-90"}`}>
                {link.name}
              </span>
              
              {/* Hover Tablet Effect (Pops out slightly) */}
              <div className={`absolute inset-0 rounded-full transition-all duration-300 pointer-events-none z-0 ${
                isActive(link.href) 
                  ? "bg-surface-container-highest/40 shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] border border-surface-container-highest/80 opacity-100 scale-100" 
                  : "bg-surface-container-highest/60 border border-surface-container-highest/50 shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.05)] opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-active:scale-95"
              }`}></div>
            </Link>
          ))}
        </nav>
        <div className="flex-1 flex justify-end items-center gap-4">
          <Link href="/contact" className="hidden sm:inline-flex relative items-center gap-2 px-5 py-2.5 bg-surface-container-low/50 hover:bg-primary text-secondary hover:text-on-primary border border-surface-container-highest/50 hover:border-primary font-display text-[11px] leading-4 font-semibold uppercase tracking-widest rounded-full transition-all duration-500 overflow-hidden group/btn shadow-sm hover:shadow-lg hover:-translate-y-0.5">
            <div className="absolute inset-0 bg-linear-to-r from-primary/20 via-primary/10 to-transparent -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700 ease-out pointer-events-none"></div>
            <Compass className="text-[16px] group-hover/btn:rotate-45 transition-transform duration-500" />
            <span className="relative z-10">Schedule Free Consultation</span>
          </Link>
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="lg:hidden p-2 text-on-surface hover:text-primary transition-colors focus:outline-none cursor-pointer touch-manipulation"
            onClick={(e) => { e.preventDefault(); setMobileMenuOpen(true); }}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6 pointer-events-none" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dialog */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-surface-container-low border-l border-surface-container-highest px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-2xl">
          <div className="flex items-center justify-between border-b border-surface-container-highest pb-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-auto shrink-0">
                <Image src={logo} alt="brand logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-base font-bold text-on-surface">SUBHAM SARKAR</span>
                <span className="font-display text-[10px] tracking-[0.12em] font-medium text-secondary">STUDIO DIRECTORY</span>
              </div>
            </div>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-on-surface hover:text-primary transition-colors focus:outline-none"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-surface-container-highest">
              <div className="space-y-2 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block -mx-3 rounded-lg px-3 py-3.5 font-display text-sm font-semibold leading-6 tracking-[0.08em] uppercase transition-colors ${
                      isActive(link.href)
                        ? "bg-surface-container-highest text-primary"
                        : "text-on-surface hover:bg-surface-container-high/75"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 flex flex-col gap-4">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex w-full justify-center items-center gap-2 px-4 py-3.5 bg-primary-container hover:bg-primary text-on-primary font-display text-[12px] leading-4 font-semibold uppercase tracking-widest rounded-lg transition-all shadow-sm"
                >
                  <Compass className="text-[18px]" />
                  <span>Schedule Free Consultation</span>
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
