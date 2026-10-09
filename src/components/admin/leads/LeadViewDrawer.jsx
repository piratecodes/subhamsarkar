"use client";

import { Fragment, useState, useEffect } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Calendar, Clock, MessageSquare, ShieldAlert, Save, Edit3, Loader2 } from 'lucide-react';
import { updateLeadNotes } from '@/actions/leads';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function LeadViewDrawer({ isOpen, onClose, lead, onUpdate }) {
  const [adminNotes, setAdminNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (lead) {
      setAdminNotes(lead.adminNotes || '');
    }
  }, [lead]);

  const handleSaveNotes = async () => {
    if (!lead) return;
    setIsSaving(true);
    try {
      const res = await updateLeadNotes(lead.id, adminNotes);
      if (res.success) {
        toast.success("Notes saved");
        if (onUpdate) onUpdate(res.lead);
      } else {
        toast.error("Failed to save notes");
      }
    } catch (err) {
      toast.error("Error saving notes");
    } finally {
      setIsSaving(false);
    }
  };

  if (!lead) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={() => onClose(false)}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex justify-end w-full max-w-full pl-0 sm:pl-16">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-full max-w-2xl bg-surface shadow-2xl flex flex-col h-full">
                  
                  {/* Header */}
                  <div className="relative px-8 py-8 bg-surface-container-lowest border-b border-outline/10 flex items-center justify-between shrink-0 overflow-hidden group/header">
                    <motion.div 
                      animate={{ x: ['-100%', '200%', '-100%'] }} 
                      transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                      className="absolute inset-y-0 w-[80%] bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none blur-3xl opacity-50 group-hover/header:opacity-100"
                    ></motion.div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
                    
                    <div className="relative z-10">
                      <h2 className="text-3xl font-display font-black flex items-center gap-4 bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                        <motion.div 
                          animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }} 
                          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
                          className="p-3 bg-primary/10 rounded-2xl border border-primary/30 shadow-[0_0_20px_rgba(var(--color-primary),0.4)] backdrop-blur-md"
                        >
                          <User className="w-6 h-6 text-primary" />
                        </motion.div>
                        Lead Details
                      </h2>
                      <p className="text-[11px] font-black uppercase tracking-[0.25em] text-secondary mt-3">
                        Received {format(new Date(lead.createdAt), 'MMM d, yyyy, h:mm a')}
                      </p>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.15, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onClose(false)} 
                      className="relative z-10 p-3 text-on-surface-variant bg-surface-container hover:text-error hover:bg-error/10 rounded-full shadow-md hover:shadow-error/30 transition-all"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Body */}
                  <div className="flex-1 overflow-y-auto p-8 bg-surface-container-lowest relative space-y-8">
                    <div className="absolute inset-0 bg-gradient-to-b from-surface to-surface-container-lowest pointer-events-none h-20 opacity-50"></div>

                    {/* Contact Info Card */}
                    <div className="bg-surface rounded-2xl border border-outline/10 shadow-sm p-6 space-y-6 relative z-10 group/card transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                      <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                        <User className="w-4 h-4" /> Contact Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Full Name</p>
                          <p className="text-base font-medium text-on-surface">{lead.firstName} {lead.lastName}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Email</p>
                          <a href={`mailto:${lead.email}`} className="text-base font-medium text-primary hover:underline flex items-center gap-2">
                            <Mail className="w-4 h-4" /> {lead.email}
                          </a>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Phone</p>
                          {lead.phone ? (
                            <a href={`tel:${lead.phone}`} className="text-base font-medium text-on-surface hover:text-primary transition-colors flex items-center gap-2">
                              <Phone className="w-4 h-4" /> {lead.phone}
                            </a>
                          ) : (
                            <span className="text-sm text-secondary italic">Not provided</span>
                          )}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Timeline</p>
                          <p className="text-base font-medium text-on-surface flex items-center gap-2">
                            <Clock className="w-4 h-4 text-secondary" /> {lead.timeline.replace(/_/g, ' ')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Request Details */}
                    <div className="bg-surface rounded-2xl border border-outline/10 shadow-sm p-6 space-y-4 relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" /> Client Comments
                        </h3>
                        {lead.requiresNda && (
                          <span className="bg-error/10 text-error px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-error/20 flex items-center gap-1.5 shadow-[0_0_15px_rgba(var(--color-error),0.15)]">
                            <ShieldAlert className="w-3 h-3" /> Requires NDA
                          </span>
                        )}
                      </div>
                      <div className="bg-surface-container rounded-xl p-4 border border-outline/10 text-on-surface whitespace-pre-wrap text-sm leading-relaxed">
                        {lead.comments || <span className="italic text-secondary">No comments provided.</span>}
                      </div>
                    </div>

                    {/* Admin Notes */}
                    <div className="bg-surface rounded-2xl border border-outline/10 shadow-sm p-6 space-y-4 relative z-10 focus-within:border-primary/30 focus-within:shadow-lg transition-all">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center gap-2">
                          <Edit3 className="w-4 h-4" /> Internal Admin Notes
                        </h3>
                        <button 
                          onClick={handleSaveNotes}
                          disabled={isSaving}
                          className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                          {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                          Save Notes
                        </button>
                      </div>
                      <textarea
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        placeholder="Add internal notes about this lead here... (Only visible to admins)"
                        className="w-full bg-surface-container rounded-xl p-4 border border-outline/20 focus:border-primary focus:ring-4 focus:ring-primary/10 text-on-surface text-sm leading-relaxed min-h-[150px] resize-y transition-all outline-none"
                      />
                    </div>
                  </div>

                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
