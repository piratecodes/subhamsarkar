"use client";

import { useState, useEffect, useMemo, Fragment } from 'react';
import { deleteInsight } from '@/actions/insights';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2, Search, Plus, Edit3, Trash2, BookOpen, Filter, ChevronLeft, ChevronRight, Check, ChevronsUpDown, Folder, Calendar } from 'lucide-react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition as HeadlessTransition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

import InsightFormDrawerV2 from './InsightFormDrawerV2';
import SudoPageHero from '../layout/SudoPageHero';

export default function InsightsTableClientV2({ initialInsights }) {
  const router = useRouter();
  
  const [insights, setInsights] = useState(initialInsights);
  
  useEffect(() => {
    setInsights(initialInsights);
  }, [initialInsights]);

  // Compute live stats for the Hero section
  const stats = useMemo(() => {
    const total = insights.length;
    const published = insights.filter(i => i.isPublished).length;
    const draft = insights.filter(i => !i.isPublished).length;
    return { total, published, draft };
  }, [insights]);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, PUBLISHED, DRAFT
  const [dateFilter, setDateFilter] = useState('NEWEST'); // NEWEST, OLDEST, RECENTLY_MODIFIED
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const itemsPerPageOptions = [10, 25, 50, 100];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);

  const handleOpenNew = () => {
    setSelectedInsight(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (insight) => {
    setSelectedInsight(insight);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this insight? This cannot be undone.")) return;
    try {
      const res = await deleteInsight(id);
      if (res.success) {
        toast.success("Insight deleted successfully");
        setInsights(prev => prev.filter(i => i.id !== id));
        router.refresh();
      } else {
        toast.error("Failed to delete insight");
      }
    } catch (err) {
      toast.error("Error deleting insight");
    }
  };

  // Advanced Filtering & Sorting
  const filteredInsights = useMemo(() => {
    let result = [...insights];

    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => 
        b.title?.toLowerCase().includes(q) ||
        b.slug?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q)
      );
    }

    // 2. Status Filter
    if (statusFilter === 'PUBLISHED') {
      result = result.filter(b => b.isPublished);
    } else if (statusFilter === 'DRAFT') {
      result = result.filter(b => !b.isPublished);
    }

    // 2.5 Category Filter
    if (categoryFilter !== 'ALL') {
      result = result.filter(b => b.category === categoryFilter);
    }

    // 3. Date Sort
    if (dateFilter === 'NEWEST') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (dateFilter === 'OLDEST') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (dateFilter === 'RECENTLY_MODIFIED') {
      result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    return result;
  }, [insights, searchQuery, statusFilter, dateFilter, categoryFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredInsights.length / itemsPerPage);
  
  // Calculate unique categories for dropdown
  const uniqueCategories = useMemo(() => {
    return [...new Set(insights.map(b => b.category).filter(Boolean))].sort();
  }, [insights]);
  const paginatedInsights = filteredInsights.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to page 1 if filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, dateFilter, itemsPerPage]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container space-y-8"
    >
      {/* Premium Dashboard Hero Card */}
      <SudoPageHero 
        title="Insights & Articles"
        description="Manage marketing content, drafts, and automated SEO."
        Icon={BookOpen}
        stats={[
          { label: 'Total', value: stats.total },
          { 
            label: 'Published', 
            value: stats.published, 
            pulsingDot: true, 
            colorClass: 'bg-emerald-500/10 border-emerald-500/20',
            labelColorClass: 'text-emerald-600 dark:text-emerald-400',
            valueColorClass: 'text-emerald-700 dark:text-emerald-300'
          },
          { 
            label: 'Drafts', 
            value: stats.draft, 
            solidDot: true, 
            colorClass: 'bg-amber-500/10 border-amber-500/20',
            labelColorClass: 'text-amber-600 dark:text-amber-400',
            valueColorClass: 'text-amber-700 dark:text-amber-300'
          }
        ]}
        actions={
          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenNew}
            className="group overflow-hidden bg-primary text-on-primary px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:shadow-2xl font-black uppercase tracking-[0.15em] text-sm"
          >
            {/* Shimmer sweeping effect */}
            <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-12"></div>
            
            <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90 relative z-10" />
            <span className="relative z-10">Create Insight</span>
          </motion.button>
        }
      />

      {/* Floating Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-surface/80 backdrop-blur-xl border border-outline/10 shadow-lg rounded-2xl p-3 flex flex-col md:flex-row items-center gap-4 z-20 relative"
      >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by title, slug, or category..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface-container border border-outline/20 hover:border-primary/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm text-on-surface shadow-sm hover:shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto z-10">
            <div className="relative w-full md:w-40">
              <Listbox value={statusFilter} onChange={setStatusFilter}>
                <div className="relative">
                  <ListboxButton className="relative w-full cursor-default rounded-xl bg-surface-container py-2.5 pl-3 pr-10 text-left border border-outline/20 hover:border-primary/30 hover:shadow-md focus:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all text-sm">
                    <span className="flex items-center gap-2 truncate font-bold text-on-surface">
                      <Filter className="h-4 w-4 text-on-surface-variant shrink-0" />
                      <span className="truncate">{statusFilter === 'ALL' ? 'All Status' : statusFilter === 'PUBLISHED' ? 'Published' : 'Drafts'}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronsUpDown className="h-4 w-4 text-on-surface-variant" aria-hidden="true" />
                    </span>
                  </ListboxButton>
                  <HeadlessTransition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-hidden rounded-xl bg-surface-container py-0 text-sm shadow-xl ring-1 ring-black/5 focus:outline-none z-50 border border-outline/10">
                      {['ALL', 'PUBLISHED', 'DRAFT'].map((status) => (
                        <ListboxOption key={status} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-primary text-on-primary font-bold' : 'text-on-surface font-medium'}`} value={status}>
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'}`}>
                                {status === 'ALL' ? 'All Status' : status === 'PUBLISHED' ? 'Published' : 'Drafts'}
                              </span>
                              {selected ? <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-current"><Check className="h-4 w-4" aria-hidden="true" /></span> : null}
                            </>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </HeadlessTransition>
                </div>
              </Listbox>
            </div>

            <div className="relative w-full md:w-48">
              <Listbox value={categoryFilter} onChange={setCategoryFilter}>
                <div className="relative">
                  <ListboxButton className="relative w-full cursor-default rounded-xl bg-surface-container py-2.5 pl-3 pr-10 text-left border border-outline/20 hover:border-primary/30 hover:shadow-md focus:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all text-sm">
                    <span className="flex items-center gap-2 truncate font-bold text-on-surface">
                      <Folder className="h-4 w-4 text-on-surface-variant shrink-0" />
                      <span className="truncate">{categoryFilter === 'ALL' ? 'All Categories' : categoryFilter}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronsUpDown className="h-4 w-4 text-on-surface-variant" aria-hidden="true" />
                    </span>
                  </ListboxButton>
                  <HeadlessTransition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-hidden rounded-xl bg-surface-container py-0 text-sm shadow-xl ring-1 ring-black/5 focus:outline-none z-50 border border-outline/10">
                      {['ALL', ...uniqueCategories].map((cat) => (
                        <ListboxOption key={cat} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-primary text-on-primary font-bold' : 'text-on-surface font-medium'}`} value={cat}>
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'}`}>
                                {cat === 'ALL' ? 'All Categories' : cat}
                              </span>
                              {selected ? <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-current"><Check className="h-4 w-4" aria-hidden="true" /></span> : null}
                            </>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </HeadlessTransition>
                </div>
              </Listbox>
            </div>

            <div className="relative w-full md:w-40">
              <Listbox value={dateFilter} onChange={setDateFilter}>
                <div className="relative">
                  <ListboxButton className="relative w-full cursor-default rounded-xl bg-surface-container py-2.5 pl-3 pr-10 text-left border border-outline/20 hover:border-primary/30 hover:shadow-md focus:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all text-sm">
                    <span className="flex items-center gap-2 truncate font-bold text-on-surface">
                      <Calendar className="h-4 w-4 text-on-surface-variant shrink-0" />
                      <span className="truncate">{dateFilter === 'NEWEST' ? 'Newest Created' : dateFilter === 'OLDEST' ? 'Oldest Created' : 'Recently Modified'}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronsUpDown className="h-4 w-4 text-on-surface-variant" aria-hidden="true" />
                    </span>
                  </ListboxButton>
                  <HeadlessTransition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <ListboxOptions className="absolute right-0 mt-1 max-h-60 w-full overflow-hidden rounded-xl bg-surface-container py-0 text-sm shadow-xl ring-1 ring-black/5 focus:outline-none z-50 border border-outline/10">
                      {['NEWEST', 'OLDEST', 'RECENTLY_MODIFIED'].map((date) => (
                        <ListboxOption key={date} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-primary text-on-primary font-bold' : 'text-on-surface font-medium'}`} value={date}>
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'}`}>
                                {date === 'NEWEST' ? 'Newest Created' : date === 'OLDEST' ? 'Oldest Created' : 'Recently Modified'}
                              </span>
                              {selected ? <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-current"><Check className="h-4 w-4" aria-hidden="true" /></span> : null}
                            </>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </HeadlessTransition>
                </div>
              </Listbox>
            </div>
          </div>
      </motion.div>

      {/* Main Table Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="group/tablebox relative p-2 md:p-3 bg-surface/50 backdrop-blur-xl rounded-[1.5rem] border border-outline/10 shadow-sm flex flex-col transition-all duration-700 hover:shadow-xl hover:border-primary/20"
      >
        {/* Animated ambient background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/tablebox:opacity-100 rounded-[1.5rem] transition-opacity duration-1000 pointer-events-none"></div>
        
        <div className="relative z-10">
        {paginatedInsights.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-surface-container-lowest/50"
          >
            <BookOpen className="w-12 h-12 text-on-surface-variant mb-4" />
            <h3 className="text-lg font-bold text-on-surface">No Insights Found</h3>
            <p className="text-sm font-medium text-secondary mt-1 max-w-sm mx-auto">
              {searchQuery || statusFilter !== 'ALL' || categoryFilter !== 'ALL' 
                ? "We couldn't find any insights matching your filters. Try adjusting them." 
                : "Get started by creating your very first insight or thought leadership article."}
            </p>
            {(searchQuery || statusFilter !== 'ALL' || categoryFilter !== 'ALL') && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('ALL');
                  setCategoryFilter('ALL');
                }}
                className="mt-4 px-4 py-2 font-bold uppercase tracking-widest text-xs text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              {/* Header Row */}
              <div className="hidden lg:grid grid-cols-12 gap-3 px-5 py-3 bg-surface-container rounded-xl uppercase text-[10px] tracking-[0.2em] font-black text-secondary border border-outline/10 shadow-sm mb-1">
                <div className="col-span-3">Title & Slug</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Author</div>
                <div className="col-span-2">Dates</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
              
              {/* Cards */}
              <div className="flex flex-col gap-2">
                <AnimatePresence mode="popLayout">
                  {paginatedInsights.map((insight, idx) => (
                    <motion.div 
                      key={insight.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        delay: idx * 0.05 
                      }}
                      whileHover={{ scale: 1.01, y: -2 }}
                      className="group relative bg-surface border border-outline/10 rounded-2xl p-3 lg:px-5 lg:py-3 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 flex flex-col lg:grid lg:grid-cols-12 lg:items-center gap-3 cursor-default"
                    >
                      
                      <div className="col-span-3 flex flex-col">
                        <p className="font-bold text-on-surface truncate" title={insight.title}>{insight.title}</p>
                        <p className="text-[11px] font-mono text-secondary truncate">/{insight.slug}</p>
                      </div>
                      
                      <div className="col-span-2">
                        <span className="inline-flex px-3 py-1.5 rounded-lg bg-surface-variant text-on-surface font-bold text-[10px] uppercase tracking-widest shadow-sm">
                          {insight.category || 'Uncategorized'}
                        </span>
                      </div>
                      
                      <div className="col-span-2 flex items-center gap-3">
                        <img 
                          src={insight.author?.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${insight.author?.firstName ? insight.author.firstName + ' ' + insight.author.lastName : 'Admin'}`} 
                          alt="author" 
                          className="w-10 h-10 rounded-full object-cover border-2 border-outline/20 bg-surface-container shadow-sm"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-on-surface truncate max-w-[120px]">
                            {insight.author?.firstName ? `${insight.author.firstName} ${insight.author.lastName}` : 'Admin'}
                          </span>
                          {insight.customAuthor && (
                            <span className="text-[9px] uppercase tracking-widest text-primary font-black truncate max-w-[120px]" title={`Public Author: ${insight.customAuthor}`}>
                              Public: {insight.customAuthor}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="col-span-2 flex flex-col gap-1 text-xs">
                        <span className="text-secondary font-medium"><span className="text-on-surface-variant font-bold mr-1">Created:</span> {new Date(insight.createdAt).toLocaleDateString()}</span>
                        <span className="text-secondary font-medium"><span className="text-on-surface-variant font-bold mr-1">Modified:</span> {new Date(insight.updatedAt).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="col-span-2">
                        {insight.isPublished ? (
                          <span className="text-emerald-500 bg-emerald-500/10 px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)] inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Published
                          </span>
                        ) : (
                          <span className="text-amber-500 bg-amber-500/10 px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)] inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            Draft
                          </span>
                        )}
                      </div>
                      
                      <div className="col-span-1 flex items-center justify-end gap-2 lg:opacity-100">
                        <motion.button
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(insight)}
                          className="p-2.5 text-primary bg-primary/5 hover:bg-primary/20 rounded-xl border border-primary/10 shadow-sm hover:shadow-primary/20"
                          title="Edit"
                        >
                          <Edit3 className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.15, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(insight.id)}
                          className="p-2.5 text-error bg-error/5 hover:bg-error/20 rounded-xl border border-error/10 shadow-sm hover:shadow-error/20"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </>
        )}
        </div>
      </motion.div>

      {/* Pagination Floating Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-surface/80 backdrop-blur-xl rounded-2xl border border-outline/10 shadow-lg p-3 flex flex-col md:flex-row items-center justify-between gap-4 z-20 relative"
      >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-secondary">Rows per page:</span>
                  <div className="relative w-20">
                    <Listbox value={itemsPerPage} onChange={setItemsPerPage}>
                      <div className="relative mt-1">
                        <ListboxButton className="relative w-full cursor-default rounded-lg bg-surface-container py-1.5 pl-3 pr-8 text-left border border-outline/20 focus:outline-none sm:text-sm font-bold text-on-surface">
                          <span className="block truncate">{itemsPerPage}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronsUpDown className="h-4 w-4 text-on-surface-variant" aria-hidden="true" />
                          </span>
                        </ListboxButton>
                        <HeadlessTransition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                          <ListboxOptions className="absolute bottom-full mb-1 max-h-60 w-full overflow-hidden rounded-xl bg-surface-container py-0 text-sm shadow-xl ring-1 ring-black/5 focus:outline-none z-[100] border border-outline/10">
                            {itemsPerPageOptions.map((opt) => (
                              <ListboxOption key={opt} className={({ active }) => `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary text-on-primary font-bold' : 'text-on-surface font-medium'}`} value={opt}>
                                {({ selected }) => <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'}`}>{opt}</span>}
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </HeadlessTransition>
                      </div>
                    </Listbox>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                  Showing <span className="text-on-surface">{filteredInsights.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-on-surface">{Math.min(currentPage * itemsPerPage, filteredInsights.length)}</span> of <span className="text-on-surface">{filteredInsights.length}</span> entries
                </span>
              </div>
              
              {totalPages > 1 && (
                <div className="flex items-center gap-1 bg-surface-container rounded-lg p-1 border border-outline/10">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-md text-on-surface-variant hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 text-on-surface">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-md text-on-surface-variant hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
      </motion.div>

      <InsightFormDrawerV2 
        isOpen={isDrawerOpen} 
        onClose={(success) => {
          setIsDrawerOpen(false);
          if (success) {
            router.refresh(); // Automatically re-fetches server state and updates initialInsights prop
          }
        }} 
        insight={selectedInsight} 
      />
    </motion.div>
  );
}
