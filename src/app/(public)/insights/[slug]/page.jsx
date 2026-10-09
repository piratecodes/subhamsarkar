import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import TableOfContents from '@/components/insight/TableOfContents';
import InsightFaq from '@/components/insight/InsightFaq';
import { prisma } from "@/lib/prisma";

import GlareHover from '@/components/Glarehover'
import PageTracker from "@/components/PageTracker";

export const revalidate = 300;
// 1. DYNAMIC METADATA ENGINE
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  try {
    const blog = await prisma.insight.findUnique({
      where: { slug }
    });
    
    if (!blog) return {};

    return {
      title: blog.seoMetaTitle || `${blog.title} | Subham Sarkar`,
      description: blog.seoMetaDescription || blog.excerpt || "Read our latest insights.",
      keywords: blog.seoMetaKeywords || "",
      alternates: {
        canonical: blog.seoCanonicalUrl || `https://subham.digital/insights/${blog.slug}`,
      },
      robots: blog.seoIsNoIndex ? "noindex, nofollow" : "index, follow",
      openGraph: {
        title: blog.seoMetaTitle || blog.title,
        description: blog.seoMetaDescription || blog.excerpt,
        url: `https://subham.digital/insights/${blog.slug}`,
        type: 'article',
        images: blog.coverImage ? [{ url: blog.coverImage }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.seoMetaTitle || blog.title,
        description: blog.seoMetaDescription || blog.excerpt,
        images: blog.coverImage ? [blog.coverImage] : [],
      }
    };
  } catch (error) {
    return {};
  }
}

// 2. SERVER COMPONENT PAGE
export default async function SingleBlogPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let blog = null;
  let similarBlogs = [];
  let allCategories = [];

  try {
    // Fetch Single Blog
    blog = await prisma.insight.findUnique({
      where: { slug },
      include: { author: true }
    });

    if (blog && blog.isPublished) {
      // Fetch All Published Blogs
      const publishedBlogs = await prisma.insight.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' }
      });

      if (publishedBlogs.length > 0) {
        allCategories = [...new Set(publishedBlogs.map(b => b.category))].filter(Boolean);
        similarBlogs = publishedBlogs.filter(b => b.category === blog.category && b.id !== blog.id).slice(0, 3);

        // Recommendation Engine Fallback: If no blogs in this exact category, show the latest published blogs
        if (similarBlogs.length === 0) {
          similarBlogs = publishedBlogs.filter(b => b.id !== blog.id).slice(0, 3);
        }
      }
    } else {
      blog = null; // Unpublish check
    }
  } catch (err) {
    console.error("Fetch error", err);
  }

  if (!blog) return notFound();

  // Inject JSON-LD Schema
  const jsonLd = blog.seoJsonLdSchema ? (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: blog.seoJsonLdSchema }}
    />
  ) : null;

  return (
    <main className="min-h-screen pt-2 pb-12">
      <PageTracker pageType="insight" />
      {jsonLd}

      <div className="container px-4 sm:px-6 lg:px-8">

        {/* HEADER SECTION - Seamless, No Border Box */}
        <div className="relative w-full mx-auto text-center pt-8 pb-6 mb-2 overflow-visible mt-2">
          
          {/* Ambient Glow Orbs directly on the page background */}
          <div className="absolute inset-0 z-0 pointer-events-none flex justify-center">
            <div className="absolute top-[-20%] w-[120%] max-w-7xl h-[150%] bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_60%)] opacity-[0.07] animate-pulse" />
            <div className="absolute top-[10%] w-[100%] max-w-5xl h-[100%] bg-[radial-gradient(ellipse_at_center,var(--color-secondary)_0%,transparent_60%)] opacity-[0.05]" />
            <div className="absolute inset-0 bg-[linear-gradient(var(--color-surface-container-highest)_1px,transparent_1px),linear-gradient(90deg,var(--color-surface-container-highest)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_80%_at_50%_20%,#000_20%,transparent_100%)] opacity-[0.15]" />
          </div>

          {/* Side Energy Elements */}
          <div className="absolute top-1/2 left-0 md:left-[5%] -translate-y-1/2 w-32 h-64 bg-primary/20 blur-[80px] animate-[pulse_4s_ease-in-out_infinite] pointer-events-none" />
          <div className="absolute top-1/2 left-[2%] md:left-[8%] -translate-y-1/2 w-0.5 h-32 bg-gradient-to-b from-transparent via-primary/80 to-transparent opacity-70 animate-[fade-in-left_1s_ease-out] pointer-events-none" />
          
          <div className="absolute top-1/2 right-0 md:right-[5%] -translate-y-1/2 w-32 h-64 bg-secondary/20 blur-[80px] animate-[pulse_5s_ease-in-out_infinite_reverse] pointer-events-none" />
          <div className="absolute top-1/2 right-[2%] md:right-[8%] -translate-y-1/2 w-0.5 h-32 bg-gradient-to-b from-transparent via-secondary/80 to-transparent opacity-70 animate-[fade-in-right_1s_ease-out] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center animate-[fade-in-up_0.6s_ease-out]">
            {blog.category && (
              <Link href={`/insights?category=${encodeURIComponent(blog.category)}`} className="inline-flex items-center gap-2.5 bg-surface-container/40 backdrop-blur-xl border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-6 hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 z-10 group shadow-[0_4px_20px_rgba(var(--color-primary),0.15)] hover:shadow-[0_8px_30px_rgba(var(--color-primary),0.3)] hover:-translate-y-1">
                <span className="w-2 h-2 rounded-full bg-primary group-hover:bg-on-primary animate-pulse transition-colors" />
                {blog.category}
              </Link>
            )}
            
            <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-display font-extrabold tracking-[-0.03em] leading-[1.05] mb-8 z-10 text-balance max-w-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-on-surface to-secondary drop-shadow-lg">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-secondary font-medium z-10 text-xs sm:text-sm font-mono uppercase tracking-[0.1em]">
              <span className="text-on-surface font-bold flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center shadow-inner border border-surface-container-highest">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                {blog.customAuthor || blog.author?.name || 'Admin'}
              </span>
              
              <span className="text-surface-container-highest w-1.5 h-1.5 rounded-full bg-surface-container-highest"></span>
              
              <span className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center shadow-inner border border-surface-container-highest">
                  <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* FEATURED IMAGE */}
        {blog.coverImage && (
          <div className="max-w-6xl mx-auto relative mb-12 z-10">
            {/* Ambient Image Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/15 to-secondary/15 rounded-[3rem] blur-3xl -z-10 animate-pulse" />
            
            {/* Floating 'Read Time' Badge */}
            <div className="absolute -top-6 right-8 md:-top-8 md:right-16 z-20 animate-[bounce_4s_infinite_ease-in-out]">
              <div className="bg-surface-container/60 backdrop-blur-xl border border-surface-container-highest px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-secondary uppercase tracking-widest">Est. Read</div>
                  <div className="text-sm font-display font-bold text-on-surface">5 Min</div>
                </div>
              </div>
            </div>

            <GlareHover glareColor="#953918" glareOpacity={0.3} glareAngle={-30} glareSize={300} transitionDuration={800} playOnce={false} className="w-full h-auto rounded-[2.5rem] overflow-hidden shadow-2xl border border-surface-container-highest/50 block relative z-10" >
              <Image
                src={blog.coverImage}
                alt={blog.title}
                width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}
                priority
                className="object-contain hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
            </GlareHover>
          </div>
        )}

        {/* CONTENT GRID (TOC + ARTICLE + SIDEBAR) */}
        <div className="flex flex-col lg:flex-row gap-12 mt-16">

          {/* Main Article Content */}
          <article className="flex-1 min-w-0 z-10">
            {/* The insight-content class is used by TableOfContents to find headings */}
            <div
              className="insight-content prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-on-surface prose-headings:scroll-mt-28 prose-a:text-primary hover:prose-a:opacity-80 prose-img:rounded-2xl prose-img:shadow-md prose-p:text-on-surface-variant prose-li:text-on-surface-variant prose-strong:text-on-surface marker:text-primary"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Dynamic FAQs */}
            <InsightFaq faqs={blog.faqs} />
          </article>

          {/* Right Sidebar (TOC & Categories) */}
          <aside className="lg:w-80 shrink-0 sticky top-24 h-fit flex flex-col gap-8">
            <TableOfContents />

            <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-6 shadow-sm">
              <h3 className="text-[12px] font-display font-bold text-on-surface mb-4 tracking-widest uppercase">Categories</h3>
              <ul className="space-y-2">
                {allCategories.map(cat => (
                  <li key={cat}>
                    <Link href={`/insights?category=${encodeURIComponent(cat)}`} className="text-secondary hover:text-primary font-medium transition-colors flex items-center gap-2 text-sm uppercase tracking-wider">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* SIMILAR BLOGS SECTION */}
        {similarBlogs.length > 0 && (
          <div className="mt-24 pt-16 border-t border-surface-container-highest/50">
            <h3 className="text-3xl font-display font-extrabold text-on-surface mb-8 tracking-tight">Recommended for You</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarBlogs.map(similar => (
                <Link href={`/insights/${similar.slug}`} key={similar.id} className="group block bg-surface-container/40 border border-surface-container-highest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={similar.coverImage || '/default-placeholder.png'}
                      alt={similar.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-2">{similar.title}</h4>
                    <p className="text-secondary text-sm line-clamp-2">{similar.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
