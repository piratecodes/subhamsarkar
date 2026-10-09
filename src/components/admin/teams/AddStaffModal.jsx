"use client";

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { X, Loader2, UserPlus, Save, ChevronDown, Check } from 'lucide-react';
import { createTeamMember, updateTeamMember } from '@/actions/team';
import toast from 'react-hot-toast';

const ROLES = [
  { id: 'STAFF', name: 'Operative (Staff)' },
  { id: 'MANAGER', name: 'Officer (Manager)' },
  { id: 'SUPER_ADMIN', name: 'Commander (Super Admin)' },
];

const STATUS = [
  { id: 'true', name: 'Active Duty' },
  { id: 'false', name: 'Clearance Revoked' },
];

export default function AddStaffModal({ isOpen, setIsOpen, staffData, currentUser, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    alternateEmail: '',
    designation: '',
    role: 'STAFF',
    isActive: 'true',
    password: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (staffData) {
        setFormData({
          firstName: staffData.firstName || '',
          lastName: staffData.lastName || '',
          username: staffData.username || '',
          email: staffData.email || '',
          alternateEmail: staffData.alternateEmail || '',
          designation: staffData.designation || '',
          role: staffData.role || 'STAFF',
          isActive: staffData.isActive ? 'true' : 'false',
          password: ''
        });
      } else {
        setFormData({
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          alternateEmail: '',
          designation: '',
          role: 'STAFF',
          isActive: 'true',
          password: ''
        });
      }
    }
  }, [isOpen, staffData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataObj = new FormData();
    Object.keys(formData).forEach(key => {
      formDataObj.append(key, formData[key]);
    });

    try {
      let result;
      if (staffData) {
        result = await updateTeamMember(staffData.id, formDataObj);
      } else {
        result = await createTeamMember(formDataObj);
      }

      if (result.success) {
        toast.success(result.message);
        setIsOpen(false);
        if (staffData && onSuccess) {
          onSuccess({ ...staffData, ...formData, isActive: formData.isActive === 'true' });
        } else if (onSuccess) {
          onSuccess(null);
        }
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

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
                    <UserPlus size={24} className="text-primary" /> 
                    {staffData ? 'Modify Operative' : 'Enlist Personnel'}
                  </DialogTitle>
                  <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-surface text-on-surface-variant transition-colors hover:scale-110 active:scale-95">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">First Name <span className="text-error">*</span></label>
                      <input type="text" required className="w-full p-3.5 bg-surface-container/50 border border-outline/20 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none text-on-surface font-medium transition-all" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">Last Name <span className="text-error">*</span></label>
                      <input type="text" required className="w-full p-3.5 bg-surface-container/50 border border-outline/20 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none text-on-surface font-medium transition-all" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">Primary Comms (Email) <span className="text-error">*</span></label>
                      <input type="email" required disabled={!!staffData && !isSuperAdmin} className="w-full p-3.5 bg-surface-container/50 border border-outline/20 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none text-on-surface font-medium transition-all disabled:opacity-50" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">System Username <span className="text-error">*</span></label>
                      <input type="text" required disabled={!!staffData} className="w-full p-3.5 bg-surface-container/50 border border-outline/20 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none text-on-surface font-medium transition-all disabled:opacity-50" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">Alternative Comms (Email)</label>
                      <input type="email" className="w-full p-3.5 bg-surface-container/50 border border-outline/20 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none text-on-surface font-medium transition-all" value={formData.alternateEmail} onChange={(e) => setFormData({...formData, alternateEmail: e.target.value})} />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">Designation</label>
                      <input type="text" className="w-full p-3.5 bg-surface-container/50 border border-outline/20 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none text-on-surface font-medium transition-all" value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} placeholder="e.g. Lead Engineer" />
                    </div>

                    {isSuperAdmin && (
                      <>
                        <div className="relative z-20">
                          <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">Clearance Level <span className="text-error">*</span></label>
                          <Listbox value={formData.role} onChange={(val) => setFormData({...formData, role: val})}>
                            <div className="relative">
                              <ListboxButton className="relative w-full cursor-pointer rounded-xl bg-surface-container/50 p-3.5 pr-10 text-left border border-outline/20 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all">
                                <span className="block truncate font-bold text-on-surface">
                                  {ROLES.find((r) => r.id === formData.role)?.name}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <ChevronDown className="h-5 w-5 text-on-surface-variant" aria-hidden="true" />
                                </span>
                              </ListboxButton>
                              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-hidden rounded-xl bg-surface-container border border-outline/20 text-base shadow-2xl focus:outline-none sm:text-sm z-50">
                                  {ROLES.map((role) => (
                                    <ListboxOption key={role.id} className={({ focus }) => `relative cursor-pointer select-none py-3 pl-10 pr-4 transition-colors ${focus ? 'bg-primary/10 text-primary' : 'text-on-surface'}`} value={role.id}>
                                      {({ selected }) => (
                                        <>
                                          <span className={`block truncate ${selected ? 'font-black' : 'font-medium'}`}>{role.name}</span>
                                          {selected ? (<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary"><Check className="h-4 w-4" aria-hidden="true" /></span>) : null}
                                        </>
                                      )}
                                    </ListboxOption>
                                  ))}
                                </ListboxOptions>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>
                        <div className="relative z-10">
                          <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">Operative Status <span className="text-error">*</span></label>
                          <Listbox value={formData.isActive} onChange={(val) => setFormData({...formData, isActive: val})}>
                            <div className="relative">
                              <ListboxButton className="relative w-full cursor-pointer rounded-xl bg-surface-container/50 p-3.5 pr-10 text-left border border-outline/20 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all">
                                <span className="block truncate font-bold text-on-surface">
                                  {STATUS.find((s) => s.id === formData.isActive)?.name}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <ChevronDown className="h-5 w-5 text-on-surface-variant" aria-hidden="true" />
                                </span>
                              </ListboxButton>
                              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-hidden rounded-xl bg-surface-container border border-outline/20 text-base shadow-2xl focus:outline-none sm:text-sm z-50">
                                  {STATUS.map((status) => (
                                    <ListboxOption key={status.id} className={({ focus }) => `relative cursor-pointer select-none py-3 pl-10 pr-4 transition-colors ${focus ? 'bg-primary/10 text-primary' : 'text-on-surface'}`} value={status.id}>
                                      {({ selected }) => (
                                        <>
                                          <span className={`block truncate ${selected ? 'font-black' : 'font-medium'}`}>{status.name}</span>
                                          {selected ? (<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary"><Check className="h-4 w-4" aria-hidden="true" /></span>) : null}
                                        </>
                                      )}
                                    </ListboxOption>
                                  ))}
                                </ListboxOptions>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>
                      </>
                    )}

                    {!staffData && (
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">Temporary Access Code <span className="text-error">*</span></label>
                        <input type="text" required minLength={8} className="w-full p-3.5 bg-surface-container/50 border border-outline/20 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none text-on-surface font-mono transition-all" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="Minimum 8 characters" />
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-outline/10">
                    <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-3 bg-primary hover:bg-primary-container text-on-primary font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100">
                      {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                      {staffData ? 'Update Dossier' : 'Execute Enlistment'}
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
