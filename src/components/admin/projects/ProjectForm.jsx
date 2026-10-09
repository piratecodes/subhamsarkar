"use client";

import { useState } from "react";
import { createProject, updateProject } from "@/actions/dossier";
import { useRouter } from "next/navigation";
import { Save, RefreshCw, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProjectForm({ project = null }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

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
            <select 
              required
              name="category"
              defaultValue={project?.category || "engineering"}
              className="w-full bg-surface-container border border-outline/20 text-on-surface text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
            >
              <option value="engineering">Engineering</option>
              <option value="design">Design & UX</option>
              <option value="architecture">Architecture</option>
              <option value="ai-agents">AI & Agents</option>
            </select>
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
