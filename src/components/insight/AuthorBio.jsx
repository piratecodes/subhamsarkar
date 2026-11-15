'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa6';
import { ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function AuthorBio({ customAuthor, author, settings }) {
  const authorName = customAuthor || (author ? `${author.firstName} ${author.lastName}`.trim() : 'Subham Sarkar');
  const addressText = settings?.address || 'Barrackpore, Kolkata -700122, INDIA';
  const linkedinUrl = settings?.linkedin || 'https://linkedin.com/in/subhamsarkar99';
  const githubUrl = settings?.github || 'https://github.com/piratecodes';
  const instagramUrl = settings?.instagram || 'https://instagram.com/subhamsarkar99';

  return (
    <motion.aside
      itemScope
      itemType="https://schema.org/Person"
      aria-label="About the author"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mt-16 pt-2 group"
    >
      {/* Invisible Schema Metadata URL */}
      <link itemProp="url" href="https://subhamsarkar.dev" />

      {/* Dynamic Ambient Glow Backdrop */}
      <div className="absolute -inset-1.5 bg-linear-to-r from-primary/30 via-secondary/15 to-primary/25 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-700 -z-10" />

      {/* Cybernetic Tech Grid Detail */}
      <div className="relative overflow-hidden bg-surface-container/30 backdrop-blur-xl border border-surface-container-highest/70 hover:border-primary/40 rounded-[2rem] p-6 sm:p-8 transition-all duration-500 shadow-xl shadow-black/10">

        {/* Subtle Decorative Ambient Beam */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-bl from-primary/10 via-transparent to-transparent pointer-events-none rounded-tr-[2rem]" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 relative z-10">

          {/* Avatar Profile Frame - Responsive Portrait Display */}
          <div className="relative shrink-0 mx-auto md:mx-0">
            <div className="relative p-1.5 bg-linear-to-br from-primary/80 via-surface-container-highest to-secondary/60 rounded-3xl shadow-xl group-hover:scale-[1.02] transition-transform duration-500">
              <div className="relative w-36 h-48 sm:w-44 sm:h-56 md:w-48 md:h-64 rounded-[1.25rem] overflow-hidden bg-surface-container-highest shadow-inner">
                <Image
                  itemProp="image"
                  src="/myimage_web.png"
                  alt={`${authorName}, software architect and full-stack developer`}
                  fill
                  sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, 200px"
                  className="object-cover object-top filter contrast-[1.05] grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                />
                {/* Subtle vignette gradient overlay at bottom of portrait */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Status Indicator Dot - Terracotta Brand Pill */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:-right-2 bg-surface-container-lowest/95 backdrop-blur-md border border-primary/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-black/20 whitespace-nowrap">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[9px] sm:text-[9.5px] font-mono font-bold uppercase tracking-wider text-primary">Chai-Fuelled Builder</span>
            </div>
          </div>

          {/* Author Details & Credentials */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.15em] leading-none bg-primary/10 text-primary border border-primary/25">
                <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Author</span>
              </span>

              {addressText && (
                <address
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                  className="not-italic text-[11px] font-mono uppercase tracking-wider text-secondary"
                >
                  <span itemProp="streetAddress">{addressText}</span>
                </address>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-on-surface tracking-tight">
              <Link href="/about" itemProp="name" className="hover:text-primary transition-colors">
                {authorName}
              </Link>
            </h3>

            <p itemProp="jobTitle" className="text-sm font-mono text-primary/90 uppercase tracking-wider mt-0.5 mb-3 font-semibold">
              Software Architect & Full-Stack Developer
            </p>

            <p itemProp="description" className="text-justify text-on-surface-variant text-sm sm:text-base leading-relaxed max-w-3xl text-pretty">
              Software architect and full-stack developer in Kolkata, building the custom ERP, CRM, web and mobile systems that growing businesses across India run on. These guides turn jargon into plain language, with real numbers and honest trade-offs, so software decisions never need a translator. Driven by stubbornness and a belief that good software should be boring in the best way.
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-linear-to-r from-transparent via-surface-container-highest to-transparent my-5" />

            {/* Actions: Social Connectors + Direct Consultation CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4">

              {/* Social Channels with rel="author" & itemProp="sameAs" */}
              <div className="flex items-center gap-2.5 mx-auto md:mx-0">
                <span className="text-[11px] font-mono uppercase tracking-widest text-secondary mr-1">Connect:</span>

                <a
                  itemProp="sameAs"
                  rel="author noopener noreferrer"
                  href={linkedinUrl}
                  target="_blank"
                  aria-label="Subham Sarkar on LinkedIn"
                  className="w-9 h-9 rounded-xl bg-surface-container/60 hover:bg-[#0077b5] hover:text-white border border-surface-container-highest hover:border-[#0077b5] text-secondary flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>

                <a
                  itemProp="sameAs"
                  rel="author noopener noreferrer"
                  href={githubUrl}
                  target="_blank"
                  aria-label="Subham Sarkar on GitHub"
                  className="w-9 h-9 rounded-xl bg-surface-container/60 hover:bg-[#24292e] hover:text-white border border-surface-container-highest hover:border-[#24292e] text-secondary flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <FaGithub className="w-4 h-4" />
                </a>

                <a
                  itemProp="sameAs"
                  rel="author noopener noreferrer"
                  href={instagramUrl}
                  target="_blank"
                  aria-label="Subham Sarkar on Instagram"
                  className="w-9 h-9 rounded-xl bg-surface-container/60 hover:bg-linear-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white border border-surface-container-highest hover:border-transparent text-secondary flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
              </div>

              {/* Consultation CTA Button */}
              <Link
                href="/contact"
                className="group/btn inline-flex items-center gap-2.5 bg-primary text-on-primary font-bold text-xs uppercase tracking-[0.12em] px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 mx-auto md:mx-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-on-primary/90 animate-pulse" />
                <span>Discuss Your Project</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>

            </div>

          </div>

        </div>

      </div>
    </motion.aside>
  );
}
