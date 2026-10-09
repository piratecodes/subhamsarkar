"use client";

import { useState, Fragment } from "react";
import { Dialog, Transition, DialogPanel, DialogTitle, TransitionChild } from "@headlessui/react";
import { KeyRound, X, Save, Loader2 } from "lucide-react";
import { changePassword } from "@/actions/auth";
import toast from "react-hot-toast";

export default function ChangePasswordModal({ isOpen, setIsOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    
    if (formData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    
    try {
      const data = new FormData();
      data.append("currentPassword", formData.currentPassword);
      data.append("newPassword", formData.newPassword);
      
      const result = await changePassword(data);
      
      if (result.success) {
        toast.success("Password changed successfully");
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setIsOpen(false);
      } else {
        toast.error(result.error || "Failed to change password");
      }
    } catch (e) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={() => setIsOpen(false)}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
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
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-[2rem] bg-surface-container-lowest border border-outline/20 text-left align-middle shadow-2xl transition-all">
                
                <div className="relative h-36 bg-gradient-to-r from-primary/80 to-secondary/80 p-6 overflow-hidden flex flex-col justify-end">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                  
                  <div className="relative z-10 text-white flex items-end gap-4">
                    <div className="p-3 bg-white/20 shadow-lg rounded-2xl backdrop-blur-sm border border-white/20">
                       <KeyRound className="w-6 h-6 text-white" />
                    </div>
                    <div className="pb-1">
                      <h2 className="text-2xl font-display font-black tracking-wide drop-shadow-md">Security Hub</h2>
                      <p className="text-xs font-mono mt-1 opacity-90 drop-shadow text-white/90">Authentication credentials</p>
                    </div>
                  </div>
                  
                  <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 h-10 w-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors hover:scale-110 active:scale-95 z-10 shadow-sm border border-white/10">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5 bg-surface">
                  <div className="group/input">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within/input:text-primary transition-colors">Current Password <span className="text-error">*</span></label>
                    <input 
                      type="password" 
                      required 
                      className="w-full p-3.5 bg-surface-container/50 border border-outline/10 hover:border-outline/30 rounded-xl focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm text-on-surface transition-all shadow-sm" 
                      value={formData.currentPassword} 
                      onChange={(e) => setFormData({...formData, currentPassword: e.target.value})} 
                    />
                  </div>

                  <div className="group/input">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within/input:text-primary transition-colors">New Password <span className="text-error">*</span></label>
                    <input 
                      type="password" 
                      required 
                      className="w-full p-3.5 bg-surface-container/50 border border-outline/10 hover:border-outline/30 rounded-xl focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm text-on-surface transition-all shadow-sm" 
                      value={formData.newPassword} 
                      onChange={(e) => setFormData({...formData, newPassword: e.target.value})} 
                    />
                  </div>
                  
                  <div className="group/input">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within/input:text-primary transition-colors">Confirm New Password <span className="text-error">*</span></label>
                    <input 
                      type="password" 
                      required 
                      className="w-full p-3.5 bg-surface-container/50 border border-outline/10 hover:border-outline/30 rounded-xl focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm text-on-surface transition-all shadow-sm" 
                      value={formData.confirmPassword} 
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                    />
                  </div>

                  <div className="pt-6">
                    <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-container disabled:opacity-50 text-on-primary hover:text-on-primary-container font-black uppercase tracking-widest text-xs py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)] hover:scale-105 active:scale-95">
                      {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                      Update Credentials
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
