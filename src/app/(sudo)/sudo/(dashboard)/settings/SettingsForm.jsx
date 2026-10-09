"use client";

import { useState } from "react";
import { updateSiteSettings } from "@/actions/settings";
import { Save, RefreshCw, Mail, Phone, MapPin } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaXTwitter, FaInstagram } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function SettingsForm({ settings }) {
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const formData = new FormData(e.target);
      const result = await updateSiteSettings(formData);
      
      if (result.success) {
        toast.success("Company settings updated successfully");
      } else {
        toast.error(result.error || "Failed to update settings");
      }
    } catch (e) {
      toast.error("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      
      {/* Contact Information */}
      <div className="bg-surface-container/50 border border-outline/10 p-6 rounded-2xl space-y-4">
        <h3 className="text-lg font-bold text-on-surface mb-4">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-display text-[11px] font-bold uppercase tracking-widest text-on-surface flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> Official Email
            </label>
            <input 
              name="email"
              defaultValue={settings?.email || ""}
              type="email"
              className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="contact@example.com"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-display text-[11px] font-bold uppercase tracking-widest text-on-surface flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" /> WhatsApp / Phone
            </label>
            <input 
              name="whatsapp"
              defaultValue={settings?.whatsapp || ""}
              className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>

        <div className="space-y-1.5 pt-2">
          <label className="font-display text-[11px] font-bold uppercase tracking-widest text-on-surface flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" /> Headquarters Address
          </label>
          <textarea 
            name="address"
            defaultValue={settings?.address || ""}
            rows={2}
            className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-y"
            placeholder="123 Innovation Drive..."
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-surface-container/50 border border-outline/10 p-6 rounded-2xl space-y-4">
        <h3 className="text-lg font-bold text-on-surface mb-4">Social Media Presence</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-display text-[11px] font-bold uppercase tracking-widest text-on-surface flex items-center gap-2">
              <FaLinkedinIn className="w-3.5 h-3.5" /> LinkedIn URL
            </label>
            <input 
              name="linkedin"
              defaultValue={settings?.linkedin || ""}
              className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="font-display text-[11px] font-bold uppercase tracking-widest text-on-surface flex items-center gap-2">
              <FaGithub className="w-3.5 h-3.5" /> GitHub URL
            </label>
            <input 
              name="github"
              defaultValue={settings?.github || ""}
              className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="https://github.com/..."
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="font-display text-[11px] font-bold uppercase tracking-widest text-on-surface flex items-center gap-2">
              <FaXTwitter className="w-3.5 h-3.5" /> Twitter / X URL
            </label>
            <input 
              name="twitter"
              defaultValue={settings?.twitter || ""}
              className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="https://twitter.com/..."
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="font-display text-[11px] font-bold uppercase tracking-widest text-on-surface flex items-center gap-2">
              <FaInstagram className="w-3.5 h-3.5" /> Instagram URL
            </label>
            <input 
              name="instagram"
              defaultValue={settings?.instagram || ""}
              className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="https://instagram.com/..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button 
          type="submit"
          disabled={isSaving}
          className="flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-on-primary font-display text-[12px] font-bold uppercase tracking-[0.1em] rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isSaving ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isSaving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>
    </form>
  );
}
