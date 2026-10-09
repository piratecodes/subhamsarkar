"use client";

import { useState, useRef, Fragment } from "react";
import { Dialog, Transition, DialogPanel, DialogTitle, TransitionChild } from "@headlessui/react";
import { UserCircle, X, Camera, Save, Loader2 } from "lucide-react";
import ImageCropperModal from "../shared/ImageCropperModal";
import { uploadMedia } from "@/actions/media";
import { updateProfile } from "@/actions/auth";
import toast from "react-hot-toast";
import Image from "next/image";

export default function MyAccountModal({ isOpen, setIsOpen, user }) {
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [cropInitialImage, setCropInitialImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Local state for optimistic updates
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    alternateEmail: user?.alternateEmail || "",
    designation: user?.designation || "",
    bio: user?.bio || "",
  });

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setCropInitialImage(reader.result?.toString() || "");
        setIsCropperOpen(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCropComplete = async (blob) => {
    try {
      const formData = new FormData();
      formData.append("file", blob, "avatar.jpg");
      formData.append("folder", "staffs");
      
      const result = await uploadMedia(formData);
      if (result.success) {
        setProfileImage(result.url);
        // Automatically save the new image to the user's profile
        const updateData = new FormData();
        updateData.append("profileImage", result.url);
        await updateProfile(updateData);
        toast.success("Profile image updated");
      } else {
        toast.error(result.error || "Failed to upload image");
      }
    } catch (e) {
      toast.error("An error occurred");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("alternateEmail", formData.alternateEmail);
      data.append("designation", formData.designation);
      data.append("bio", formData.bio);
      if (profileImage) data.append("profileImage", profileImage);
      
      const result = await updateProfile(data);
      
      if (result.success) {
        toast.success("Profile updated successfully");
        setIsOpen(false);
      } else {
        toast.error(result.error || "Failed to update profile");
      }
    } catch (e) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={() => setIsOpen(false)}>
          <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95 translate-y-4" enterTo="opacity-100 scale-100 translate-y-0" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100 translate-y-0" leaveTo="opacity-0 scale-95 translate-y-4">
                <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-[2rem] bg-surface-container-lowest border border-outline/20 text-left align-middle shadow-2xl transition-all">
                  
                  {/* Hero Cover */}
                  <div className="relative h-48 bg-gradient-to-r from-primary/80 to-secondary/80 p-8 overflow-hidden flex flex-col justify-start items-end text-right pt-10 pr-12">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                    <div className="relative z-10 text-white">
                      <h2 className="text-3xl font-display font-black tracking-wide drop-shadow-md">Operative Profile</h2>
                      <p className="text-sm font-mono mt-1 opacity-90 drop-shadow">Configure your personal identification and comms.</p>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 h-10 w-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors hover:scale-110 active:scale-95 z-10">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
                    
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-6 relative -mt-16 sm:-mt-20 z-10 mb-8">
                      <div className="shrink-0 flex flex-col items-center">
                        <label htmlFor="profile-upload" className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-surface border-4 border-surface-container-lowest shadow-2xl flex items-center justify-center overflow-hidden cursor-pointer group hover:border-primary/50 transition-colors">
                          <input type="file" id="profile-upload" accept="image/*" className="hidden" onChange={handleFileSelect} />
                          {profileImage ? (
                            <Image src={profileImage} alt="Profile" width={160} height={160} className="h-full w-full object-cover group-hover:opacity-40 transition-opacity" />
                          ) : (
                            <span className="text-primary text-5xl font-display font-bold group-hover:opacity-30 transition-opacity">
                              {user?.firstName?.charAt(0).toUpperCase() || 'A'}
                            </span>
                          )}
                          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="w-8 h-8 text-white mb-1" />
                            <span className="text-[10px] text-white font-bold uppercase tracking-widest">Update</span>
                          </div>
                        </label>
                      </div>

                      <div className="pt-4 sm:pt-0 flex-1 pb-4">
                        <h2 className="text-2xl font-display font-black text-on-surface truncate">
                          {user?.firstName || 'Unknown'} {user?.lastName || 'User'}
                        </h2>
                        <p className="text-sm text-secondary font-medium mt-1 truncate">
                          {user?.designation || user?.role || 'Operative'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-outline/10">
                      <div className="group/input">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within/input:text-primary transition-colors">First Name <span className="text-error">*</span></label>
                        <input type="text" required className="w-full p-3.5 bg-surface-container/50 border border-outline/10 hover:border-outline/30 rounded-xl focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm text-on-surface transition-all shadow-sm" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                      </div>
                      <div className="group/input">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within/input:text-primary transition-colors">Last Name <span className="text-error">*</span></label>
                        <input type="text" required className="w-full p-3.5 bg-surface-container/50 border border-outline/10 hover:border-outline/30 rounded-xl focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm text-on-surface transition-all shadow-sm" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="group/input">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within/input:text-primary transition-colors">Primary Email <span className="text-error">*</span></label>
                        <input type="email" required className="w-full p-3.5 bg-surface-container/50 border border-outline/10 hover:border-outline/30 rounded-xl focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm text-on-surface transition-all shadow-sm" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <div className="group/input">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within/input:text-primary transition-colors">Alternate Email</label>
                        <input type="email" className="w-full p-3.5 bg-surface-container/50 border border-outline/10 hover:border-outline/30 rounded-xl focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm text-on-surface transition-all shadow-sm" value={formData.alternateEmail} onChange={(e) => setFormData({...formData, alternateEmail: e.target.value})} placeholder="Backup comms link" />
                      </div>
                    </div>

                    <div className="group/input">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within/input:text-primary transition-colors">Designation / Role</label>
                      <input type="text" className="w-full p-3.5 bg-surface-container/50 border border-outline/10 hover:border-outline/30 rounded-xl focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm text-on-surface transition-all shadow-sm" value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} placeholder="e.g. Lead Architect" />
                    </div>

                    <div className="group/input">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within/input:text-primary transition-colors">Short Bio</label>
                      <textarea rows="3" className="w-full p-3.5 bg-surface-container/50 border border-outline/10 hover:border-outline/30 rounded-xl focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm text-on-surface transition-all shadow-sm resize-y custom-scrollbar" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} placeholder="A little bit about yourself..." />
                    </div>

                    <div className="pt-6">
                      <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-container disabled:opacity-50 text-on-primary hover:text-on-primary-container font-black uppercase tracking-widest text-xs py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)] hover:scale-105 active:scale-95">
                        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        Save Configuration
                      </button>
                    </div>
                  </form>

                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      <ImageCropperModal 
        isOpen={isCropperOpen}
        onClose={() => {
          setIsCropperOpen(false);
          setCropInitialImage(null);
        }}
        onCropComplete={handleCropComplete}
        circularCrop={true}
        initialImage={cropInitialImage}
      />
    </>
  );
}
