"use client";

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { X, Loader2, ShieldCheck, Monitor, Smartphone, Globe, LogOut, AlertTriangle, ShieldOff } from 'lucide-react';
import { getTeamMemberSessions, revokeTeamMemberSession, revokeAllTeamMemberSessions } from '@/actions/team';
import toast from 'react-hot-toast';

export default function StaffSessionsModal({ isOpen, setIsOpen, targetStaff, currentUser }) {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmingSessionId, setConfirmingSessionId] = useState(null);
  const [isRevokingAll, setIsRevokingAll] = useState(false);

  useEffect(() => {
    if (isOpen && targetStaff) {
      loadSessions();
      setConfirmingSessionId(null);
    }
  }, [isOpen, targetStaff]);

  const loadSessions = async () => {
    setIsLoading(true);
    const result = await getTeamMemberSessions(targetStaff.id);
    if (result.success) {
      setSessions(result.sessions);
      setCurrentSessionId(result.currentSessionId);
    } else {
      toast.error(result.error);
      if (result.error.includes("manage sessions for another Super Admin")) {
        setIsOpen(false);
      }
    }
    setIsLoading(false);
  };

  const handleRevoke = async (sessionId) => {
    const result = await revokeTeamMemberSession(sessionId, targetStaff.id);
    if (result.success) {
      toast.success(result.message);
      setSessions(prev => prev.filter(s => s.id !== sessionId));
      setConfirmingSessionId(null);
    } else {
      toast.error(result.error);
    }
  };

  const handleRevokeAll = async () => {
    if (!window.confirm("Are you sure you want to revoke all other terminal sessions for this operative?")) return;
    setIsRevokingAll(true);
    const result = await revokeAllTeamMemberSessions(targetStaff.id);
    if (result.success) {
      toast.success(result.message);
      loadSessions();
    } else {
      toast.error(result.error);
    }
    setIsRevokingAll(false);
  };

  const getDeviceIcon = (deviceInfo) => {
    const info = (deviceInfo || '').toLowerCase();
    if (info.includes('mobile') || info.includes('iphone') || info.includes('android')) return <Smartphone className="text-primary" size={24} />;
    if (info.includes('windows') || info.includes('mac') || info.includes('linux')) return <Monitor className="text-primary" size={24} />;
    return <Globe className="text-primary" size={24} />;
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={() => setIsOpen(false)}>
        <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95 translate-y-4" enterTo="opacity-100 scale-100 translate-y-0" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100 translate-y-0" leaveTo="opacity-0 scale-95 translate-y-4">
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-[2rem] bg-surface-container-lowest border border-outline/10 text-left align-middle shadow-2xl transition-all">
                
                <div className="bg-surface-container px-8 py-5 border-b border-outline/10 flex items-center justify-between">
                  <DialogTitle className="text-xl font-display font-black tracking-widest uppercase text-on-surface flex items-center gap-3">
                    <ShieldCheck size={24} className="text-primary" /> 
                    Active Terminals
                  </DialogTitle>
                  <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-surface text-on-surface-variant transition-colors hover:scale-110 active:scale-95">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-8">
                  <div className="mb-6 pb-6 border-b border-outline/10 flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-on-surface text-lg">{targetStaff?.firstName} {targetStaff?.lastName}</h3>
                      <p className="text-sm font-mono text-on-surface-variant mt-1">@{targetStaff?.username}</p>
                    </div>
                    {sessions.length > 1 && (
                      <button 
                        onClick={handleRevokeAll}
                        disabled={isRevokingAll}
                        className="px-4 py-2 bg-error/10 hover:bg-error text-error hover:text-on-error rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                      >
                        {isRevokingAll ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldOff className="w-4 h-4" />}
                        Revoke All Others
                      </button>
                    )}
                  </div>

                  {isLoading ? (
                    <div className="flex justify-center py-10"><Loader2 className="animate-spin text-primary" size={32} /></div>
                  ) : sessions.length === 0 ? (
                    <div className="py-10 text-center">
                      <p className="text-on-surface-variant font-medium">No active terminal sessions found.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                      {sessions.map((session) => {
                        const isCurrent = session.id === currentSessionId;
                        const isConfirming = confirmingSessionId === session.id;
                        
                        return (
                          <div key={session.id} className={`flex items-center justify-between p-5 rounded-2xl border ${isCurrent ? 'bg-primary/5 border-primary/20' : 'bg-surface-container/30 border-outline/10 hover:bg-surface-container'} transition-colors`}>
                            <div className="flex items-center gap-5">
                              <div className={`p-3 rounded-xl ${isCurrent ? 'bg-surface-container-lowest border border-primary/20' : 'bg-surface-container-high border border-outline/10'}`}>
                                {getDeviceIcon(session.device)}
                              </div>
                              <div>
                                <p className="font-bold text-sm text-on-surface flex items-center gap-2">
                                  {session.device || 'Unknown Terminal'}
                                  {isCurrent && (
                                    <span className="text-[9px] uppercase tracking-widest bg-primary text-on-primary px-2 py-0.5 rounded-full font-black shadow-[0_0_10px_rgba(var(--color-primary),0.5)]">Current</span>
                                  )}
                                </p>
                                <p className="text-xs font-mono text-on-surface-variant mt-1.5">
                                  {session.ipAddress || 'IP Hidden'} • Last Sync: {new Date(session.lastActive).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                            
                            {!isCurrent && (
                              isConfirming ? (
                                <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                                  <button onClick={() => setConfirmingSessionId(null)} className="px-3 py-2 text-xs font-bold text-on-surface-variant bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors">
                                    Cancel
                                  </button>
                                  <button onClick={() => handleRevoke(session.id)} className="px-3 py-2 text-xs font-bold text-on-error bg-error rounded-lg shadow-lg shadow-error/20 hover:bg-error/90 transition-colors flex items-center gap-1">
                                    <AlertTriangle size={14} /> Confirm
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setConfirmingSessionId(session.id)}
                                  className="p-3 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-xl transition-all border border-transparent hover:border-error/20 hover:scale-110 active:scale-95"
                                  title="Force Disconnect Terminal"
                                >
                                  <LogOut size={20} strokeWidth={2.5} />
                                </button>
                              )
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
