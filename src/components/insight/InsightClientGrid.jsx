"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import GlareHover from '@/components/Glarehover'

export default function InsightClientGrid({ initialBlogs, categories }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get('category') || '';
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Debounce search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(searchTerm);
    }, 600);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Sync state with URL
  useEffect(() => {
    const cat = searchParams.get('category') || '';
    if (cat !== selectedCategory) {
      setSelectedCategory(cat);
    }
  }, [searchParams, selectedCategory]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    router.push(cat ? `/insights?category=${encodeURIComponent(cat)}` : '/insights', { scroll: false });
  };

  const filteredBlogs = initialBlogs.filter(blog => {
    const matchesSearch = blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? blog.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const recent5Blogs = initialBlogs.slice(0, 5);
  const isDefaultView = !searchQuery && !selectedCategory;

  // Category Counts
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = initialBlogs.filter(b => b.category === cat).length;
    return acc;
  }, {});


  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Main Card Component to avoid duplication
  const BlogCard = ({ blog }) => (
    <motion.div variants={itemVariants} className="h-full">
      <Link href={`/insights/${blog.slug}`} key={blog.id} className="group bg-surface-container/40 border border-surface-container-highest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col h-full z-10">
        <div className="relative h-48 w-full overflow-hidden shrink-0">
          <Image
            src={blog.coverImage || '/default-placeholder.png'}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col relative overflow-hidden">
          {/* Subtle twist: A radial gradient that reveals on hover inside the card */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0,transparent_100%)] opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none" />
          
          {blog.category && <span className="text-primary text-[10px] font-display font-bold uppercase tracking-widest mb-2 z-10 relative">{blog.category}</span>}
          <h3 className="text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors line-clamp-2 z-10 relative">{blog.title}</h3>
          <p className="text-secondary text-sm mb-4 line-clamp-3 flex-1 z-10 relative">{blog.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-secondary font-medium pt-4 border-t border-surface-container-highest mt-auto z-10 relative">
            <span className="text-on-surface font-bold">{blog.customAuthor || blog.author?.name || 'Admin'}</span>
            <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 min-w-0">

          {/* Default View: Hero + Category Rows */}
          {isDefaultView ? (
            <div className="space-y-16">

              {/* HERO FEATURE */}
              {initialBlogs.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
                  <h2 className="text-2xl font-display font-extrabold text-on-surface mb-6 tracking-tight uppercase flex items-center gap-2">
                    <span className="w-8 h-1 bg-primary rounded-full inline-block"></span>
                    Latest Insight
                  </h2>
                  <Link href={`/insights/${initialBlogs[0].slug}`} className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-primary/50 border border-transparent transition-all duration-500 block bg-surface-container-lowest">
                    <GlareHover glareColor="#953918" glareOpacity={0.3} glareAngle={-30} glareSize={300} transitionDuration={800} playOnce={false} >
                      <figure className="w-full h-auto rounded-3xl overflow-hidden shadow-2xl border-0 relative block" >
                        <Image
                          src={initialBlogs[0].coverImage || '/default-placeholder.png'} alt={initialBlogs[0].title}
                          width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} priority className="object-contain hover:scale-[1.02] transition-transform duration-700 ease-out"
                        />
                      </figure>
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-3/4">
                        {initialBlogs[0].category && (
                          <span className="inline-block bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow-md mb-4">
                            {initialBlogs[0].category}
                          </span>
                        )}
                        <h3 className="text-3xl md:text-4xl font-bold text-on-surface mb-4 leading-tight group-hover:text-primary transition-colors drop-shadow-md">{initialBlogs[0].title}</h3>
                        <p className="text-on-surface-variant text-base md:text-lg mb-4 line-clamp-2 drop-shadow-sm">{initialBlogs[0].excerpt}</p>
                        <div className="flex items-center text-secondary text-sm font-medium">
                          <span className="text-on-surface font-bold">{initialBlogs[0].customAuthor || initialBlogs[0].author?.name || 'Admin'}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(initialBlogs[0].createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </GlareHover>
                  </Link>
                </motion.div>
              )}

              {/* CATEGORY ROWS */}
              {categories.map(cat => {
                const catBlogs = initialBlogs.filter(b => b.category === cat && b.id !== initialBlogs[0]?.id).slice(0, 4);
                if (catBlogs.length === 0) return null;

                return (
                  <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} key={cat} className="pt-8 border-t border-surface-container-highest/50 relative">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-display font-bold text-on-surface uppercase tracking-wider flex items-center gap-3">
                        {cat}
                        <span className="h-px bg-surface-container-highest flex-1 ml-4 hidden sm:block w-24"></span>
                      </h3>
                      <button onClick={() => handleCategorySelect(cat)} className="text-xs font-bold text-primary hover:text-primary/80 uppercase tracking-widest flex items-center gap-1 transition-colors z-10 shrink-0 group">
                        View More <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10">
                      {catBlogs.map(blog => <BlogCard key={blog.id} blog={blog} />)}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (

            /* FILTERED / SEARCH VIEW */
            <motion.div initial="hidden" animate="show" variants={containerVariants}>
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-8 border-b border-surface-container-highest/50 pb-4">
                <h2 className="text-2xl font-display font-bold text-on-surface uppercase tracking-wider">
                  {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory ? `${selectedCategory} Articles` : 'All Articles'}
                </h2>
                <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-surface-container px-3 py-1 rounded-full border border-surface-container-highest">{filteredBlogs.length} POSTS</span>
              </motion.div>

              {filteredBlogs.length === 0 ? (
                <motion.div variants={itemVariants} className="text-center py-20 bg-surface-container/20 rounded-2xl border border-surface-container-highest/50">
                  <p className="text-xl font-display font-bold text-on-surface">No articles found.</p>
                  <p className="text-secondary mt-2">Try adjusting your search or category filter.</p>
                  <button onClick={() => { setSearchQuery(''); handleCategorySelect(''); }} className="mt-6 bg-primary/10 text-primary border border-primary/20 px-6 py-2 rounded-xl font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors text-xs">
                    Clear Filters
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {filteredBlogs.map(blog => <BlogCard key={blog.id} blog={blog} />)}
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <motion.aside 
          initial="hidden" animate="show" 
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } }} 
          className="lg:w-80 shrink-0 sticky top-24 h-fit flex-col gap-8 hidden lg:flex"
        >

          {/* SEARCH BOX */}
          <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }} className="group bg-surface-container/30 backdrop-blur-md p-6 rounded-2xl border border-surface-container-highest shadow-sm hover:border-primary/40 hover:shadow-[0_0_30px_rgba(var(--color-primary),0.05)] transition-all duration-500 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h3 className="text-[12px] font-display font-bold text-on-surface mb-4 tracking-widest uppercase flex items-center gap-2">
              <span className="w-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              Search Articles
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Type to search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="peer w-full bg-surface-container-lowest border border-surface-container-highest rounded-xl py-3 px-4 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-on-surface placeholder:text-secondary/50 relative z-10"
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-secondary peer-focus:text-primary peer-focus:scale-110 peer-focus:rotate-[-10deg] transition-all duration-300 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchTerm && (
              <button onClick={() => { setSearchTerm(''); setSearchQuery(''); }} className="mt-3 text-[10px] text-secondary hover:text-primary font-bold uppercase tracking-widest w-full text-right transition-colors relative z-10">
                Clear Search
              </button>
            )}
          </motion.div>

          {/* CATEGORIES AUTO */}
          <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }} className="group bg-surface-container/30 backdrop-blur-md p-6 rounded-2xl border border-surface-container-highest shadow-sm hover:border-surface-container-highest transition-all duration-500 overflow-hidden relative">
            <h3 className="text-[12px] font-display font-bold text-on-surface mb-4 tracking-widest uppercase flex items-center gap-2">
              <span className="w-4 h-px bg-secondary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              Categories
            </h3>
            <ul className="space-y-2 relative z-10">
              <li>
                <button
                  onClick={() => handleCategorySelect('')}
                  className={`w-full group/btn flex items-center justify-between text-sm font-medium p-3 rounded-xl transition-all duration-300 border relative overflow-hidden ${!selectedCategory ? 'bg-primary/10 text-primary border-primary/30 font-bold shadow-inner' : 'text-on-surface-variant bg-surface-container border-transparent hover:border-surface-container-highest hover:bg-surface-container-high'}`}
                >
                  {!selectedCategory && <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />}
                  <span className="text-xs uppercase tracking-wider font-bold group-hover/btn:translate-x-1 transition-transform duration-300">All Articles</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded transition-transform duration-300 group-hover/btn:scale-110 ${!selectedCategory ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-secondary'}`}>
                    {initialBlogs.length}
                  </span>
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategorySelect(cat)}
                    className={`w-full group/btn flex items-center justify-between text-sm font-medium p-3 rounded-xl transition-all duration-300 border relative overflow-hidden ${selectedCategory === cat ? 'bg-primary/10 text-primary border-primary/30 font-bold shadow-inner' : 'text-on-surface-variant bg-surface-container border-transparent hover:border-surface-container-highest hover:bg-surface-container-high'}`}
                  >
                    {selectedCategory === cat && <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />}
                    <span className="text-xs uppercase tracking-wider font-bold group-hover/btn:translate-x-1 transition-transform duration-300 relative">{cat}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded transition-transform duration-300 group-hover/btn:scale-110 relative ${selectedCategory === cat ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-secondary'}`}>
                      {categoryCounts[cat] || 0}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* RECENT 5 POSTS */}
          <motion.div variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }} className="group bg-surface-container/30 backdrop-blur-md p-6 rounded-2xl border border-surface-container-highest shadow-sm transition-all duration-500 overflow-hidden relative">
            <h3 className="text-[12px] font-display font-bold text-on-surface mb-4 tracking-widest uppercase flex items-center gap-2">
              <span className="w-4 h-px bg-on-surface scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              Recent Posts
            </h3>
            <div className="space-y-4 relative z-10">
              {recent5Blogs.map((blog, idx) => (
                <Link href={`/insights/${blog.slug}`} key={blog.id} className="group/post flex items-start gap-4 hover:bg-surface-container p-2 -mx-2 rounded-xl transition-all duration-300 relative overflow-hidden">
                  <figure className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-surface-container-highest">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover/post:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
                    <Image src={blog.coverImage || '/default-placeholder.png'} alt={blog.title} fill className="object-cover group-hover/post:scale-110 transition-transform duration-700 ease-out" />
                  </figure>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h4 className="text-sm font-bold text-on-surface line-clamp-2 group-hover/post:text-primary group-hover/post:translate-x-1 transition-all duration-300">{blog.title}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mt-1 block group-hover/post:translate-x-0.5 transition-transform duration-300 delay-75">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

        </motion.aside>

        {/* MOBILE SIDEBAR (Visible only on smaller screens, no sticky) */}
        <aside className="w-full shrink-0 space-y-8 lg:hidden flex flex-col gap-8">
          {/* SEARCH BOX */}
          <div className="group bg-surface-container/30 p-6 rounded-2xl border border-surface-container-highest shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h3 className="text-[12px] font-display font-bold text-on-surface mb-4 tracking-widest uppercase flex items-center gap-2">
              <span className="w-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              Search Articles
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Type to search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="peer w-full bg-surface-container-lowest border border-surface-container-highest rounded-xl py-3 px-4 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-on-surface placeholder:text-secondary/50 relative z-10"
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-secondary peer-focus:text-primary peer-focus:scale-110 peer-focus:rotate-[-10deg] transition-all duration-300 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchTerm && (
              <button onClick={() => { setSearchTerm(''); setSearchQuery(''); }} className="mt-3 text-[10px] text-secondary hover:text-primary font-bold uppercase tracking-widest w-full text-right transition-colors relative z-10">
                Clear Search
              </button>
            )}
          </div>

          {/* CATEGORIES AUTO */}
          <div className="group bg-surface-container/30 p-6 rounded-2xl border border-surface-container-highest shadow-sm relative overflow-hidden">
            <h3 className="text-[12px] font-display font-bold text-on-surface mb-4 tracking-widest uppercase flex items-center gap-2">
              <span className="w-4 h-px bg-secondary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              Categories
            </h3>
            <ul className="space-y-2 relative z-10">
              <li>
                <button
                  onClick={() => handleCategorySelect('')}
                  className={`w-full group/btn flex items-center justify-between text-sm font-medium p-3 rounded-xl transition-all duration-300 border relative overflow-hidden ${!selectedCategory ? 'bg-primary/10 text-primary border-primary/30 font-bold shadow-inner' : 'text-on-surface-variant bg-surface-container border-transparent hover:border-surface-container-highest hover:bg-surface-container-high'}`}
                >
                  {!selectedCategory && <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />}
                  <span className="text-xs uppercase tracking-wider font-bold group-hover/btn:translate-x-1 transition-transform duration-300">All Articles</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded transition-transform duration-300 group-hover/btn:scale-110 ${!selectedCategory ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-secondary'}`}>
                    {initialBlogs.length}
                  </span>
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategorySelect(cat)}
                    className={`w-full group/btn flex items-center justify-between text-sm font-medium p-3 rounded-xl transition-all duration-300 border relative overflow-hidden ${selectedCategory === cat ? 'bg-primary/10 text-primary border-primary/30 font-bold shadow-inner' : 'text-on-surface-variant bg-surface-container border-transparent hover:border-surface-container-highest hover:bg-surface-container-high'}`}
                  >
                    {selectedCategory === cat && <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />}
                    <span className="text-xs uppercase tracking-wider font-bold group-hover/btn:translate-x-1 transition-transform duration-300 relative">{cat}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded transition-transform duration-300 group-hover/btn:scale-110 relative ${selectedCategory === cat ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-secondary'}`}>
                      {categoryCounts[cat] || 0}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

      </div>
    </div>
  );
}
