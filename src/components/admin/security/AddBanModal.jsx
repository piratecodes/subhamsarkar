"use client";

import { 
  Dialog, 
  DialogPanel, 
  DialogTitle, 
  Transition, 
  TransitionChild, 
  Listbox, 
  ListboxButton, 
  ListboxOptions, 
  ListboxOption 
} from '@headlessui/react';
import { Fragment, useState } from 'react';
import { X, ShieldAlert, Loader2, Ban, ChevronDown, Check } from 'lucide-react';
import { manualBanIpAction } from '@/actions/security';
import toast from 'react-hot-toast';

const DURATION_OPTIONS = [
  { id: '1', label: '1 Hour (Quick Quarantine)' },
  { id: '6', label: '6 Hours' },
  { id: '24', label: '24 Hours (Standard Threat Lockdown)' },
  { id: '72', label: '72 Hours' },
  { id: '168', label: '7 Days (Persistent Attacker)' },
  { id: '720', label: '30 Days (Severe Violation)' },
];

export default function AddBanModal({ isOpen, setIsOpen, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [reason, setReason] = useState('Manual Administrator Blacklist');
  const [durationHours, setDurationHours] = useState('24');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ipAddress.trim()) {
      toast.error('Please specify an IP address.');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('ipAddress', ipAddress.trim());
    formData.append('reason', reason.trim());
    formData.append('durationHours', durationHours);

    try {
      const result = await manualBanIpAction(formData);
      if (result.success) {
        toast.success(result.message);
        setIsOpen(false);
        setIpAddress('');
        setReason('Manual Administrator Blacklist');
        setDurationHours('24');
        if (onSuccess) onSuccess();
      } else {
        toast.error(result.error || 'Failed to ban IP.');
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedDuration = DURATION_OPTIONS.find((opt) => opt.id === durationHours) || DURATION_OPTIONS[2];

  return (
    <Transition show={isOpen} as={Fragment} unmount={false}>
      <Dialog as="div" className="relative z-[100]" onClose={() => setIsOpen(false)} unmount={false}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          unmount={false}
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
              unmount={false}
            >
              <DialogPanel unmount={false} className="w-full max-w-lg transform overflow-visible rounded-[2.5rem] bg-surface-container-lowest border border-outline/10 text-left align-middle shadow-2xl transition-all relative">
                {/* Header */}
                <div className="bg-surface-container px-8 py-5 border-b border-outline/10 flex items-center justify-between rounded-t-[2.5rem]">
                  <DialogTitle className="text-lg font-display font-black tracking-widest uppercase text-on-surface flex items-center gap-3">
                    <ShieldAlert size={22} className="text-error" />
                    Enforce Perimeter Ban
                  </DialogTitle>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-surface text-on-surface-variant transition-colors hover:scale-110 active:scale-95"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">
                      Target IP Address <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 192.168.1.105 or 203.0.113.1"
                      className="w-full p-4 bg-surface-container/50 border border-outline/20 rounded-2xl focus:ring-2 focus:ring-error/40 focus:border-error outline-none text-on-surface font-mono text-sm transition-all shadow-inner"
                      value={ipAddress}
                      onChange={(e) => setIpAddress(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">
                      Security Reason
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Repeated unauthorized attempts, Suspicious scans"
                      className="w-full p-4 bg-surface-container/50 border border-outline/20 rounded-2xl focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none text-on-surface text-sm transition-all shadow-inner"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>

                  {/* Modern Headless UI Listbox Dropdown floating outside with Anchor */}
                  <div className="relative">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">
                      Ban Duration
                    </label>
                    <Listbox value={durationHours} onChange={setDurationHours}>
                      <div className="relative">
                        <ListboxButton className="relative w-full cursor-pointer rounded-2xl bg-surface-container/50 p-4 pr-12 text-left border border-outline/20 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm font-semibold text-on-surface shadow-inner transition-all flex items-center justify-between group hover:border-outline/40">
                          <span className="block truncate">
                            {selectedDuration.label}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                            <ChevronDown className="h-4 w-4 text-on-surface-variant group-hover:text-primary transition-colors" aria-hidden="true" />
                          </span>
                        </ListboxButton>

                        <ListboxOptions
                          unmount={false}
                          anchor={{ to: 'bottom start', gap: '8px' }}
                          transition
                          className="w-[var(--button-width)] z-[150] max-h-72 overflow-y-auto rounded-2xl bg-surface-container-highest border border-outline/20 text-sm shadow-2xl focus:outline-none backdrop-blur-2xl p-0 transition duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 scrollbar-none"
                        >
                          {DURATION_OPTIONS.map((opt) => (
                            <ListboxOption
                              key={opt.id}
                              value={opt.id}
                              className={({ focus, selected }) =>
                                `relative cursor-pointer select-none py-3.5 pl-10 pr-4 transition-colors flex items-center justify-between ${
                                  focus 
                                    ? "bg-primary/20 text-primary font-bold" 
                                    : selected
                                    ? "bg-surface-container text-primary font-bold"
                                    : "text-on-surface hover:bg-surface-container"
                                }`
                              }
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate ${selected ? "font-black text-primary" : "font-medium"}`}>
                                    {opt.label}
                                  </span>
                                  {selected && (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-primary">
                                      <Check className="h-4 w-4" aria-hidden="true" />
                                    </span>
                                  )}
                                </>
                              )}
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </div>
                    </Listbox>
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-outline/10">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-5 py-3 text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-3.5 rounded-2xl bg-error hover:bg-error/90 text-on-error font-display font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Ban size={15} />
                          Lock IP Down
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
