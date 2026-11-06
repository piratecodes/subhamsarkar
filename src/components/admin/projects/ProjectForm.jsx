"use client";

import { useState, useMemo, Fragment } from "react";
import { createProject, updateProject } from "@/actions/dossier";
import { useRouter } from "next/navigation";
import { Save, RefreshCw, ArrowLeft, X, Check, ChevronsUpDown } from "lucide-react";
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { AVAILABLE_SERVICES } from "./ProjectFormDrawer";

export default function ProjectForm({ project = null }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [selectedServices, setSelectedServices] = useState(
    Array.isArray(project?.assignedServices) 
      ? project.assignedServices 
      : (typeof project?.assignedServices === 'string' ? JSON.parse(project.assignedServices || '[]') : [])
  );
  const [serviceQuery, setServiceQuery] = useState('');

  const filteredServices = useMemo(() => {
    if (!serviceQuery) return AVAILABLE_SERVICES;
    return AVAILABLE_SERVICES.filter(s =>
      s.label.toLowerCase().includes(serviceQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(serviceQuery.toLowerCase())
    );
  }, [serviceQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const formData = new FormData(e.target);
      
      const data = {
        title: formData.get("title"),
        category: formData.get("category"),
        industry: formData.get("industry"),
        industryNiche: formData.get("industryNiche"),
        associatedWith: formData.get("associatedWith"),
        ref: formData.get("ref"),
        status: formData.get("status"),
        discipline: formData.get("discipline"),
        summary: formData.get("summary"),
        bottleneck: formData.get("bottleneck"),
        approach: formData.get("approach"),
        outcome: formData.get("outcome"),
        assignedServices: selectedServices,
        isPublished: formData.get("isPublished") === "true"
      };

      let result;
      if (project) {
        result = await updateProject(project.id, data);
      } else {
        result = await createProject(data);
      }
      
      if (result.success) {
        toast.success(project ? "Project updated!" : "Project created!");
        router.push("/sudo/projects");
      } else {
        toast.error(result.error || "Failed to save project");
      }
    } catch (e) {
      toast.error("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Basics Section */}
      <div className="bg-surface-container/50 border border-outline/10 p-6 sm:p-8 rounded-3xl space-y-6">
        <h3 className="text-xl font-display font-black text-on-surface flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">1</span>
          Core Identity
        </h3>
        
        <div>
          <label className="block font-display text-[11px] font-bold uppercase tracking-widest text-on-surface mb-2">Project Title *</label>
          <input 
            required
            name="title"
            defaultValue={project?.title || ""}
            className="w-full bg-surface-container border border-outline/20 text-on-surface text-lg rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
            placeholder="e.g. Next-Gen AI CRM System"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-display text-[11px] font-bold uppercase tracking-widest text-on-surface mb-2">Category *</label>
            <input 
              required
              name="category"
              defaultValue={project?.category || "Web Application"}
              className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="e.g. Web Application, ERP, FinTech"
            />
          </div>
          <div>
            <label className="block font-display text-[11px] font-bold uppercase tracking-widest text-on-surface mb-2">Reference ID *</label>
            <input 
              required
              name="ref"
              defaultValue={project?.ref || `PRJ-${Math.floor(Math.random() * 10000)}`}
              className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Feature on Service Showcase Pages (Multi-Select Combobox) */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <label className="block font-display text-[11px] font-bold uppercase tracking-widest text-on-surface">
              Feature on Service Showcase Pages (Multi-Select)
            </label>
            <span className="text-[11px] text-secondary">
              Select or type &amp; press Enter / comma
            </span>
          </div>

          <Combobox
            value={selectedServices}
            onChange={setSelectedServices}
            multiple
          >
            <div className="relative z-20">
              <div className="min-h-[50px] p-2.5 bg-surface-container rounded-xl border border-outline/20 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all shadow-sm flex flex-wrap items-center gap-2">
                {selectedServices.map((serviceId) => {
                  const srv = AVAILABLE_SERVICES.find(s => s.id === serviceId) || { label: serviceId, id: serviceId };
                  return (
                    <span
                      key={serviceId}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/15 text-primary border border-primary/30 text-xs font-bold font-display shadow-xs"
                    >
                      <span>{srv.label}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedServices(prev => prev.filter(s => s !== serviceId));
                        }}
                        className="hover:text-error transition-colors p-0.5 rounded-full"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  );
                })}

                <div className="flex-1 min-w-[160px] flex items-center">
                  <ComboboxInput
                    className="w-full bg-transparent p-1 text-sm text-on-surface focus:outline-none placeholder:text-secondary/60"
                    placeholder={selectedServices.length ? "Add another service..." : "Select services or type & press Enter..."}
                    value={serviceQuery}
                    onChange={(event) => setServiceQuery(event.target.value)}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ',') && serviceQuery.trim()) {
                        e.preventDefault();
                        const cleanVal = serviceQuery.replace(/,/g, '').trim().toLowerCase().replace(/\s+/g, '-');
                        if (cleanVal && !selectedServices.includes(cleanVal)) {
                          setSelectedServices(prev => [...prev, cleanVal]);
                        }
                        setServiceQuery('');
                      }
                    }}
                  />
                </div>

                <ComboboxButton className="pr-2">
                  <ChevronsUpDown className="w-4 h-4 text-secondary hover:text-on-surface transition-colors" />
                </ComboboxButton>
              </div>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setServiceQuery('')}
              >
                <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-surface-container border border-outline/20 py-1 text-base shadow-2xl focus:outline-none sm:text-sm z-30">
                  {serviceQuery.trim() && !AVAILABLE_SERVICES.some(s => s.id === serviceQuery.trim().toLowerCase()) && (
                    <ComboboxOption
                      value={serviceQuery.trim().toLowerCase().replace(/\s+/g, '-')}
                      className={({ active }) => `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${active ? 'bg-primary/10 text-primary' : 'text-on-surface'}`}
                    >
                      Add custom service: "{serviceQuery.trim()}"
                    </ComboboxOption>
                  )}
                  {filteredServices.map((srv) => {
                    const isSelected = selectedServices.includes(srv.id);
                    return (
                      <ComboboxOption
                        key={srv.id}
                        value={srv.id}
                        className={({ active }) => `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${active ? 'bg-primary/10 text-primary' : 'text-on-surface'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`block truncate ${isSelected ? 'font-bold text-primary' : 'font-medium'}`}>
                            {srv.label}
                          </span>
                          <span className="font-mono text-[10px] text-secondary bg-surface-container-high px-2 py-0.5 rounded">
                            {srv.id}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <Check className="w-4 h-4 text-primary" />
                          </span>
                        )}
                      </ComboboxOption>
                    );
                  })}
                </ComboboxOptions>
              </Transition>
            </div>
          </Combobox>
        </div>
      </div>

      {/* Metadata Section */}
      <div className="bg-surface-container/50 border border-outline/10 p-6 sm:p-8 rounded-3xl space-y-6">
        <h3 className="text-xl font-display font-black text-on-surface flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">2</span>
          Classification
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-display text-[11px] font-bold uppercase tracking-widest text-on-surface mb-2">Industry *</label>
            <input 
              required
              name="industry"
              defaultValue={project?.industry || ""}
              placeholder="e.g. Healthcare"
              className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block font-display text-[11px] font-bold uppercase tracking-widest text-on-surface mb-2">Niche</label>
            <input 
              name="industryNiche"
              defaultValue={project?.industryNiche || ""}
              placeholder="e.g. Telemedicine"
              className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block font-display text-[11px] font-bold uppercase tracking-widest text-on-surface mb-2">Discipline *</label>
            <input 
              required
              name="discipline"
              defaultValue={project?.discipline || ""}
              placeholder="e.g. Fullstack Dev"
              className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-display text-[11px] font-bold uppercase tracking-widest text-on-surface mb-2">Associated With (Company)</label>
            <input 
              name="associatedWith"
              defaultValue={project?.associatedWith || ""}
              placeholder="e.g. Google"
              className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block font-display text-[11px] font-bold uppercase tracking-widest text-on-surface mb-2">Current Status *</label>
            <select 
              required
              name="status"
              defaultValue={project?.status || "COMPLETED"}
              className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
            >
              <option value="COMPLETED">Completed</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="bg-surface-container/50 border border-outline/10 p-6 sm:p-8 rounded-3xl space-y-6">
        <h3 className="text-xl font-display font-black text-on-surface flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">3</span>
          The Narrative
        </h3>

        <div>
          <label className="block font-display text-[11px] font-bold uppercase tracking-widest text-on-surface mb-2">Executive Summary *</label>
          <textarea 
            required
            name="summary"
            rows={3}
            defaultValue={project?.summary || ""}
            placeholder="High-level overview of the project..."
            className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-y"
          />
        </div>

        <div>
          <label className="block font-display text-[11px] font-bold uppercase tracking-widest text-on-surface mb-2">The Bottleneck / Problem *</label>
          <textarea 
            required
            name="bottleneck"
            rows={4}
            defaultValue={project?.bottleneck || ""}
            placeholder="What was the core issue you were solving?"
            className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-y"
          />
        </div>

        <div>
          <label className="block font-display text-[11px] font-bold uppercase tracking-widest text-on-surface mb-2">The Approach / Solution *</label>
          <textarea 
            required
            name="approach"
            rows={4}
            defaultValue={project?.approach || ""}
            placeholder="How did you solve it?"
            className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-y"
          />
        </div>

        <div>
          <label className="block font-display text-[11px] font-bold uppercase tracking-widest text-on-surface mb-2">The Outcome / Impact *</label>
          <textarea 
            required
            name="outcome"
            rows={4}
            defaultValue={project?.outcome || ""}
            placeholder="What were the quantifiable results?"
            className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-y"
          />
        </div>
      </div>

      {/* Visibility */}
      <div className="bg-surface-container/50 border border-outline/10 p-6 sm:p-8 rounded-3xl flex items-center justify-between">
        <div>
          <h3 className="text-lg font-display font-black text-on-surface">Publish Status</h3>
          <p className="text-sm text-secondary">Make this dossier visible on your public portfolio.</p>
        </div>
        <select 
          name="isPublished"
          defaultValue={project?.isPublished ? "true" : "false"}
          className="bg-surface-container border border-outline/20 text-on-surface text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
        >
          <option value="true">Published (Public)</option>
          <option value="false">Draft (Hidden)</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6">
        <Link 
          href="/sudo/projects"
          className="flex items-center gap-2 text-secondary hover:text-on-surface text-sm font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel & Return
        </Link>
        <button 
          type="submit"
          disabled={isSaving}
          className="flex items-center px-8 py-4 bg-primary hover:bg-primary/90 text-on-primary font-display text-xs font-bold uppercase tracking-[0.15em] rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isSaving ? (
            <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
          ) : (
            <Save className="w-5 h-5 mr-3" />
          )}
          {isSaving ? 'Processing...' : (project ? 'Save Dossier' : 'Create Dossier')}
        </button>
      </div>

    </form>
  );
}
