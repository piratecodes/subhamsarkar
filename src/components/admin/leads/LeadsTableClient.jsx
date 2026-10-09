"use client";

import { useState, useMemo, Fragment } from 'react';
import { deleteLead, updateLeadStatus } from '@/actions/leads';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, Trash2, ShieldAlert, Eye, Check, ChevronsUpDown, Mail, Calendar } from 'lucide-react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition as HeadlessTransition } from '@headlessui/react';
import { format } from 'date-fns';

import SudoPageHero from '../layout/SudoPageHero';
import LeadViewDrawer from './LeadViewDrawer';

const STATUS_COLORS = {
  NEW: { text: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30', shadow: 'shadow-blue-500/20' },
  CONTACTED: { text: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30', shadow: 'shadow-amber-500/20' },
  IN_PROGRESS: { text: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/30', shadow: 'shadow-purple-500/20' },
  DEAL_CLOSED: { text: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', shadow: 'shadow-emerald-500/20' },
  CANCELLED: { text: 'text-error', bg: 'bg-error/10', border: 'border-error/30', shadow: 'shadow-error/20' }
};

export default function LeadsTableClient({ initialLeads }) {
  const router = useRouter();
  const [leads, setLeads] = useState(initialLeads);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Drawer
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Compute stats
  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter(l => l.status === 'NEW').length;
    const contacted = leads.filter(l => l.status === 'CONTACTED').length;
    const closed = leads.filter(l => l.status === 'DEAL_CLOSED').length;
    return { total, newCount, contacted, closed };
  }, [leads]);

  // Filter logic
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchSearch = (lead.firstName + ' ' + lead.lastName + ' ' + lead.email).toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || lead.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  const paginatedLeads = filteredLeads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await deleteLead(id);
      if (res.success) {
        toast.success("Lead deleted successfully");
        setLeads(prev => prev.filter(l => l.id !== id));
        router.refresh();
      } else {
        toast.error("Failed to delete lead");
      }
    } catch (err) {
      toast.error("Error deleting lead");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Optimistic update
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
      const res = await updateLeadStatus(id, newStatus);
      if (res.success) {
        toast.success("Status updated");
        router.refresh();
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      toast.error("Error updating status");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container space-y-8"
    >
      <SudoPageHero 
        title="Transmission Leads"
        description="Manage incoming client requests, project inquiries, and NDAs."
        Icon={Users}
        stats={[
          { label: 'Total Leads', value: stats.total },
          { 
            label: 'New', 
            value: stats.newCount, 
            pulsingDot: true, 
            colorClass: 'bg-blue-500/10 border-blue-500/20',
            labelColorClass: 'text-blue-600 dark:text-blue-400',
            valueColorClass: 'text-blue-700 dark:text-blue-300'
          },
          { 
            label: 'Contacted', 
            value: stats.contacted, 
            solidDot: true, 
            colorClass: 'bg-amber-500/10 border-amber-500/20',
            labelColorClass: 'text-amber-600 dark:text-amber-400',
            valueColorClass: 'text-amber-700 dark:text-amber-300'
          },
          { 
            label: 'Deals Closed', 
            value: stats.closed, 
            solidDot: true, 
            colorClass: 'bg-emerald-500/10 border-emerald-500/20',
            labelColorClass: 'text-emerald-600 dark:text-emerald-400',
            valueColorClass: 'text-emerald-700 dark:text-emerald-300'
          }
        ]}
      />

      {/* Floating Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-surface/80 backdrop-blur-xl rounded-2xl border border-outline/10 shadow-lg p-3 flex flex-col md:flex-row items-center justify-between gap-4 z-30 relative"
      >
        <div className="flex-1 w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
          <input 
            type="text" 
            placeholder="Search leads by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface placeholder:text-on-surface-variant/50 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium border border-outline/20 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          {/* Status Filter */}
          <div className="relative w-40 z-20">
            <Listbox value={statusFilter} onChange={setStatusFilter}>
              <div className="relative">
                <ListboxButton className="relative w-full cursor-default rounded-xl bg-surface-container py-2.5 pl-3 pr-10 text-left border border-outline/20 focus:outline-none sm:text-sm font-bold text-on-surface hover:bg-surface-container-high transition-colors">
                  <span className="block truncate">{statusFilter.replace(/_/g, ' ')}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronsUpDown className="h-4 w-4 text-secondary" aria-hidden="true" />
                  </span>
                </ListboxButton>
                <HeadlessTransition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-surface-container border border-outline/10 py-1 text-base shadow-2xl focus:outline-none sm:text-sm z-50 p-1 space-y-0.5">
                    {['ALL', 'NEW', 'CONTACTED', 'IN_PROGRESS', 'DEAL_CLOSED', 'CANCELLED'].map((status) => (
                      <ListboxOption key={status} value={status} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 rounded-lg transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-on-surface'}`}>
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'}`}>{status.replace(/_/g, ' ')}</span>
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

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="group/tablebox relative p-2 md:p-3 bg-surface/50 backdrop-blur-xl rounded-[1.5rem] border border-outline/10 shadow-sm flex flex-col transition-all duration-700 hover:shadow-xl hover:border-primary/20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/tablebox:opacity-100 rounded-[1.5rem] transition-opacity duration-1000 pointer-events-none"></div>
        
        <div className="relative z-10">
          {paginatedLeads.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-surface-container-lowest/50"
            >
              <Users className="w-12 h-12 text-on-surface-variant mb-4" />
              <h3 className="text-lg font-bold text-on-surface">No Leads Found</h3>
              <p className="text-sm font-medium text-secondary mt-1 max-w-sm mx-auto">
                {searchQuery || statusFilter !== 'ALL' 
                  ? "We couldn't find any leads matching your filters." 
                  : "You don't have any incoming transmissions yet."}
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="hidden lg:grid grid-cols-12 gap-3 px-5 py-3 bg-surface-container rounded-xl uppercase text-[10px] tracking-[0.2em] font-black text-secondary border border-outline/10 shadow-sm mb-1">
                <div className="col-span-3">Contact</div>
                <div className="col-span-2">Date Received</div>
                <div className="col-span-2">Timeline</div>
                <div className="col-span-2">Requires NDA</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
              
              <div className="flex flex-col gap-2">
                <AnimatePresence mode="popLayout">
                  {paginatedLeads.map((lead, idx) => (
                    <motion.div 
                      key={lead.id} 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30, delay: idx * 0.05 }}
                      whileHover={{ scale: 1.01, y: -2 }}
                      className="group relative bg-surface border border-outline/10 rounded-2xl p-4 lg:px-5 lg:py-3 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 flex flex-col lg:grid lg:grid-cols-12 lg:items-center gap-3 cursor-default z-10"
                    >
                      <div className="col-span-3 flex flex-col">
                        <span className="text-sm font-bold text-on-surface truncate">{lead.firstName} {lead.lastName}</span>
                        <a href={`mailto:${lead.email}`} className="text-[11px] font-mono font-medium text-secondary hover:text-primary transition-colors flex items-center gap-1.5 mt-1 truncate">
                          <Mail className="w-3 h-3" /> {lead.email}
                        </a>
                      </div>
                      
                      <div className="col-span-2 text-xs font-medium text-on-surface-variant flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-secondary" />
                        {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                      </div>
                      
                      <div className="col-span-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-secondary px-2.5 py-1.5 bg-surface-container rounded-lg border border-outline/10 inline-block shadow-sm">
                          {lead.timeline.replace(/_/g, ' ')}
                        </span>
                      </div>

                      <div className="col-span-2">
                        {lead.requiresNda ? (
                          <span className="text-error bg-error/10 px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-error/30 shadow-[0_0_15px_rgba(var(--color-error),0.15)] inline-flex items-center gap-1.5">
                            <ShieldAlert className="w-3 h-3" />
                            Yes
                          </span>
                        ) : (
                          <span className="text-secondary text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5">No</span>
                        )}
                      </div>
                      
                      <div className="col-span-2 relative z-20">
                        {/* Status Dropdown */}
                        <Listbox value={lead.status} onChange={(v) => handleStatusChange(lead.id, v)}>
                          <div className="relative w-full max-w-[140px]">
                            <ListboxButton className={`relative w-full cursor-pointer rounded-xl py-1.5 pl-3 pr-8 text-left text-[10px] font-black uppercase tracking-widest border shadow-sm transition-all focus:outline-none ${STATUS_COLORS[lead.status].bg} ${STATUS_COLORS[lead.status].text} ${STATUS_COLORS[lead.status].border}`}>
                              <span className="block truncate">{lead.status.replace(/_/g, ' ')}</span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronsUpDown className="h-3 w-3 opacity-50" aria-hidden="true" />
                              </span>
                            </ListboxButton>
                            <HeadlessTransition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                              <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-surface-container border border-outline/10 py-1 text-base shadow-2xl focus:outline-none sm:text-sm z-50 p-1 space-y-0.5">
                                {Object.keys(STATUS_COLORS).map((status) => (
                                  <ListboxOption key={status} value={status} className={({ active }) => `relative cursor-pointer select-none py-2 pl-8 pr-4 rounded-lg transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-on-surface'}`}>
                                    {({ selected }) => (
                                      <>
                                        <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'} text-[10px] uppercase tracking-widest`}>{status.replace(/_/g, ' ')}</span>
                                        {selected ? <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-current"><Check className="h-3 w-3" aria-hidden="true" /></span> : null}
                                      </>
                                    )}
                                  </ListboxOption>
                                ))}
                              </ListboxOptions>
                            </HeadlessTransition>
                          </div>
                        </Listbox>
                      </div>
                      
                      <div className="col-span-1 flex items-center justify-end gap-2 lg:opacity-100">
                        <motion.button
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => { setSelectedLead(lead); setIsDrawerOpen(true); }}
                          className="p-2 text-primary bg-primary/5 hover:bg-primary/20 rounded-xl border border-primary/10 shadow-sm hover:shadow-primary/20 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.15, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(lead.id)}
                          className="p-2 text-error bg-error/5 hover:bg-error/20 rounded-xl border border-error/10 shadow-sm hover:shadow-error/20 transition-colors"
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
          )}
        </div>
      </motion.div>

      {/* Drawer */}
      <LeadViewDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        lead={selectedLead}
        onUpdate={(updatedLead) => {
          setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
        }}
      />
    </motion.div>
  );
}
