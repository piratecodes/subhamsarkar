"use client";

import { useState } from "react";
import { Clock, Calendar, Trash2, Edit3, X, Save, AlertCircle } from "lucide-react";
import { cancelPushCampaign, updatePushCampaign } from "@/actions/push";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function QueueManager({ initialQueues = [] }) {
  const router = useRouter();
  const [queues, setQueues] = useState(initialQueues);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", scheduledFor: "" });
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setQueues(initialQueues);
  }, [initialQueues]);

  const confirmCancel = (id) => {
    setDeleteId(id);
  };

  const executeCancel = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const res = await cancelPushCampaign(deleteId);
    if (res.success) {
      toast.success("Broadcast cancelled");
      setQueues(queues.filter(q => q.id !== deleteId));
      setDeleteId(null);
      router.refresh();
    } else {
      toast.error(res.error);
    }
    setIsDeleting(false);
  };

  const openEdit = (campaign) => {
    setEditingId(campaign.id);
    setEditData({
      title: campaign.title,
      // Convert to local datetime string for input format YYYY-MM-DDThh:mm
      scheduledFor: campaign.scheduledFor ? new Date(campaign.scheduledFor.getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0,16) : ""
    });
  };

  const handleSaveEdit = async () => {
    if (!editData.title || !editData.scheduledFor) {
      toast.error("Title and time are required");
      return;
    }
    
    const res = await updatePushCampaign(editingId, {
      title: editData.title,
      scheduledFor: new Date(editData.scheduledFor)
    });

    if (res.success) {
      toast.success("Broadcast updated");
      setQueues(queues.map(q => q.id === editingId ? { ...q, title: editData.title, scheduledFor: new Date(editData.scheduledFor) } : q));
      setEditingId(null);
      router.refresh();
    } else {
      toast.error(res.error);
    }
  };

  if (queues.length === 0) return null;

  return (
    <div className="bg-surface-container-lowest/50 backdrop-blur-2xl border border-outline/10 rounded-4xl p-6 lg:p-8 shadow-lg relative overflow-hidden group h-full">
      <div className="absolute inset-0 rounded-4xl border-[0.5px] border-white/5 pointer-events-none" />
      <div className="mb-6 relative z-10 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-black tracking-tight text-on-surface flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(var(--color-primary),0.8)]" />
            Dispatch Queue
          </h2>
          <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Scheduled Transmissions</p>
        </div>
        <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-black rounded-lg border border-primary/20">
          {queues.length} Pending
        </div>
      </div>

      <div className="space-y-4 relative z-10 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40">
        {queues.map((campaign) => (
          <motion.div 
            key={campaign.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center justify-between p-4 bg-surface-container/50 border border-outline/10 rounded-2xl hover:border-outline/30 transition-colors"
          >
            <div className="flex-1 min-w-0 pr-4">
              <h4 className="text-sm font-bold text-on-surface truncate">{campaign.title}</h4>
              <div className="flex items-center gap-2 mt-1 text-xs font-medium text-on-surface-variant">
                <Calendar className="w-3.5 h-3.5" />
                {campaign.scheduledFor ? new Date(campaign.scheduledFor).toLocaleString() : 'Immediate Dispatch'}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => openEdit(campaign)}
                className="p-2 bg-surface hover:bg-primary/10 text-on-surface-variant hover:text-primary rounded-xl transition-colors shadow-sm border border-outline/10"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => confirmCancel(campaign.id)}
                className="p-2 bg-surface hover:bg-red-500/10 text-on-surface-variant hover:text-red-500 rounded-xl transition-colors shadow-sm border border-outline/10"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <Transition show={!!editingId} as={Fragment}>
        <Dialog as="div" className="relative z-[150]" onClose={() => setEditingId(null)}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-surface p-6 text-left align-middle shadow-2xl transition-all border border-outline/10">
                  <div className="flex justify-between items-center mb-6">
                    <DialogTitle as="h3" className="text-lg font-black tracking-tight text-on-surface flex items-center gap-2">
                      <Edit3 className="w-5 h-5 text-primary" />
                      Edit Dispatch
                    </DialogTitle>
                    <button onClick={() => setEditingId(null)} className="p-2 rounded-full hover:bg-surface-container-highest transition-colors">
                      <X className="w-5 h-5 text-on-surface-variant" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">Transmission Title</label>
                      <input 
                        type="text" 
                        value={editData.title}
                        onChange={e => setEditData({ ...editData, title: e.target.value })}
                        className="w-full bg-surface-container/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface font-medium focus:outline-none focus:border-primary/60"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">Scheduled For</label>
                      <input 
                        type="datetime-local" 
                        value={editData.scheduledFor}
                        onChange={e => setEditData({ ...editData, scheduledFor: e.target.value })}
                        className="w-full bg-surface-container/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface font-medium focus:outline-none focus:border-primary/60"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      type="button"
                      className="flex-1 bg-surface-container text-on-surface px-4 py-3 rounded-xl font-bold hover:bg-surface-container-highest transition-colors"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="flex-1 bg-primary text-on-primary px-4 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(var(--color-primary),0.3)]"
                      onClick={handleSaveEdit}
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Confirmation Modal */}
      <Transition show={!!deleteId} as={Fragment}>
        <Dialog as="div" className="relative z-[200]" onClose={() => setDeleteId(null)}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-inverse-surface/80 backdrop-blur-md transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-2xl bg-surface-container border border-outline-variant/30 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="px-6 py-6 sm:px-8 sm:py-8">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-error/10 sm:mx-0 sm:h-10 sm:w-10">
                        <AlertCircle className="h-6 w-6 text-error" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle as="h3" className="text-lg font-bold leading-6 text-on-surface">
                          Cancel Broadcast
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-on-surface-variant">
                            Are you sure you want to cancel this scheduled broadcast? This action cannot be undone and the transmission will be discarded.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest px-6 py-4 sm:flex sm:flex-row-reverse sm:px-8">
                    <button
                      type="button"
                      disabled={isDeleting}
                      className="inline-flex w-full justify-center rounded-xl bg-error px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-error/90 sm:ml-3 sm:w-auto transition-colors disabled:opacity-50"
                      onClick={executeCancel}
                    >
                      {isDeleting ? 'Cancelling...' : 'Cancel Broadcast'}
                    </button>
                    <button
                      type="button"
                      disabled={isDeleting}
                      className="mt-3 inline-flex w-full justify-center rounded-xl bg-surface-container-highest px-4 py-2.5 text-sm font-bold text-on-surface shadow-sm border border-outline-variant/20 hover:bg-surface-container-highest/80 sm:mt-0 sm:w-auto transition-colors"
                      onClick={() => setDeleteId(null)}
                    >
                      Keep it
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
