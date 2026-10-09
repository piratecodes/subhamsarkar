"use client";

import { useState, useMemo, Fragment } from 'react';
import { deleteProject } from '@/actions/dossier';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { Briefcase, Search, Plus, Edit3, Trash2, Eye, Calendar, Folder, Target, ChevronDown, Check } from 'lucide-react';
import { format } from 'date-fns';

import SudoPageHero from '../layout/SudoPageHero';
import ProjectFormDrawer from './ProjectFormDrawer';

export default function ProjectsTableClient({ initialProjects }) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  
  const sortOptions = [
    { id: 'newest', label: 'Newest Created' },
    { id: 'oldest', label: 'Oldest Created' },
    { id: 'recent_modified', label: 'Recently Modified' }
  ];
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  // Unique lists from projects
  const uniqueCategories = useMemo(() => ["All Categories", ...new Set(projects.map(p => p.category).filter(Boolean))], [projects]);
  const uniqueIndustries = useMemo(() => ["All Industries", ...new Set(projects.map(p => p.industry).filter(Boolean))], [projects]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Drawer
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Compute stats
  const stats = useMemo(() => {
    const total = projects.length;
    const published = projects.filter(p => p.isPublished).length;
    const drafts = total - published;
    return { total, published, drafts };
  }, [projects]);

  // Filter logic
  const filteredProjects = useMemo(() => {
    let result = projects.filter(p => {
      const matchSearch = (p.title + ' ' + p.category + ' ' + p.ref).toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === "All Categories" || p.category === selectedCategory;
      const matchInd = selectedIndustry === "All Industries" || p.industry === selectedIndustry;
      const matchStatus = selectedStatus === "All Status" || (selectedStatus === "Published" ? p.isPublished : !p.isPublished);
      return matchSearch && matchCat && matchInd && matchStatus;
    });

    if (selectedSort.id === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (selectedSort.id === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (selectedSort.id === 'recent_modified') {
      result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    return result;
  }, [projects, searchQuery, selectedCategory, selectedIndustry, selectedStatus, selectedSort]);

  const paginatedProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await deleteProject(id);
      if (res.success) {
        toast.success("Project deleted successfully");
        setProjects(prev => prev.filter(p => p.id !== id));
        router.refresh();
      } else {
        toast.error("Failed to delete project");
      }
    } catch (err) {
      toast.error("Error deleting project");
    }
  };

  const handleOpenNew = () => {
    setSelectedProject(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container space-y-8"
    >
      <SudoPageHero 
        title="Dossiers & Projects"
        description="Manage your portfolio, case studies, and engineering briefs."
        Icon={Briefcase}
        stats={[
          { label: 'Total Projects', value: stats.total },
          { 
            label: 'Published', 
            value: stats.published, 
            pulsingDot: true, 
            colorClass: 'bg-emerald-500/10 border-emerald-500/20',
            labelColorClass: 'text-emerald-600 dark:text-emerald-400',
            valueColorClass: 'text-emerald-700 dark:text-emerald-300'
          },
          { 
            label: 'Drafts', 
            value: stats.drafts, 
            solidDot: true, 
            colorClass: 'bg-amber-500/10 border-amber-500/20',
            labelColorClass: 'text-amber-600 dark:text-amber-400',
            valueColorClass: 'text-amber-700 dark:text-amber-300'
          }
        ]}
        actions={
          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenNew}
            className="group overflow-hidden bg-primary text-on-primary px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:shadow-2xl font-black uppercase tracking-[0.15em] text-sm"
          >
            {/* Shimmer sweeping effect */}
            <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-12"></div>
            <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90 relative z-10" />
            <span className="relative z-10">New Dossier</span>
          </motion.button>
        }
      />

      {/* Floating Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-surface/80 backdrop-blur-xl rounded-2xl border border-outline/10 shadow-lg p-3 flex flex-col xl:flex-row items-center justify-between gap-4 z-30 relative"
      >
        <div className="flex-1 w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
          <input 
            type="text" 
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface placeholder:text-on-surface-variant/50 rounded-xl pl-10 pr-4 py-3 text-sm font-medium border border-outline/20 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
          {/* Category Dropdown */}
          <Listbox value={selectedCategory} onChange={setSelectedCategory}>
            <div className="relative w-full sm:w-[180px]">
              <ListboxButton className="relative w-full cursor-pointer bg-surface-container hover:bg-surface-container-high text-on-surface py-3 pl-4 pr-10 text-left rounded-xl border border-outline/20 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm font-medium transition-colors">
                <span className="block truncate">{selectedCategory}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronDown className="h-4 w-4 text-on-surface-variant" aria-hidden="true" />
                </span>
              </ListboxButton>
              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-surface-container-highest py-0 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50 border border-outline/10 scrollbar-hide">
                  {uniqueCategories.map((cat, catIdx) => (
                    <ListboxOption key={catIdx} className={({ active }) => `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${active ? 'bg-primary text-on-primary' : 'text-on-surface'}`} value={cat}>
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'}`}>{cat}</span>
                          {selected ? (
                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-on-primary' : 'text-primary'}`}>
                              <Check className="h-4 w-4" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </Listbox>

          {/* Industry Dropdown */}
          <Listbox value={selectedIndustry} onChange={setSelectedIndustry}>
            <div className="relative w-full sm:w-[150px]">
              <ListboxButton className="relative w-full cursor-pointer bg-surface-container hover:bg-surface-container-high text-on-surface py-3 pl-4 pr-10 text-left rounded-xl border border-outline/20 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm font-medium transition-colors">
                <span className="block truncate">{selectedIndustry}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronDown className="h-4 w-4 text-on-surface-variant" aria-hidden="true" />
                </span>
              </ListboxButton>
              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-surface-container-highest py-0 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50 border border-outline/10 scrollbar-hide">
                  {uniqueIndustries.map((ind, indIdx) => (
                    <ListboxOption key={indIdx} className={({ active }) => `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${active ? 'bg-primary text-on-primary' : 'text-on-surface'}`} value={ind}>
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'}`}>{ind}</span>
                          {selected ? (
                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-on-primary' : 'text-primary'}`}>
                              <Check className="h-4 w-4" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </Listbox>

          {/* Status Dropdown */}
          <Listbox value={selectedStatus} onChange={setSelectedStatus}>
            <div className="relative w-full sm:w-[140px]">
              <ListboxButton className="relative w-full cursor-pointer bg-surface-container hover:bg-surface-container-high text-on-surface py-3 pl-4 pr-10 text-left rounded-xl border border-outline/20 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm font-medium transition-colors">
                <span className="block truncate">{selectedStatus}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronDown className="h-4 w-4 text-on-surface-variant" aria-hidden="true" />
                </span>
              </ListboxButton>
              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-surface-container-highest py-0 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50 border border-outline/10 scrollbar-hide">
                  {["All Status", "Published", "Drafts"].map((status, statusIdx) => (
                    <ListboxOption key={statusIdx} className={({ active }) => `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${active ? 'bg-primary text-on-primary' : 'text-on-surface'}`} value={status}>
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'}`}>{status}</span>
                          {selected ? (
                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-on-primary' : 'text-primary'}`}>
                              <Check className="h-4 w-4" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </Listbox>

          {/* Sort Dropdown */}
          <Listbox value={selectedSort} onChange={setSelectedSort}>
            <div className="relative w-full sm:w-[180px]">
              <ListboxButton className="relative w-full cursor-pointer bg-surface-container hover:bg-surface-container-high text-on-surface py-3 pl-4 pr-10 text-left rounded-xl border border-outline/20 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm font-medium transition-colors">
                <span className="block truncate">{selectedSort.label}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronDown className="h-4 w-4 text-on-surface-variant" aria-hidden="true" />
                </span>
              </ListboxButton>
              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-surface-container-highest py-0 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50 border border-outline/10 scrollbar-hide right-0 sm:auto">
                  {sortOptions.map((sort, sortIdx) => (
                    <ListboxOption key={sortIdx} className={({ active }) => `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${active ? 'bg-primary text-on-primary' : 'text-on-surface'}`} value={sort}>
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'}`}>{sort.label}</span>
                          {selected ? (
                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-on-primary' : 'text-primary'}`}>
                              <Check className="h-4 w-4" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </Listbox>
        </div>
      </motion.div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="group/tablebox relative p-2 md:p-3 bg-surface/50 backdrop-blur-xl rounded-[1.5rem] border border-outline/10 shadow-sm flex flex-col transition-all duration-700 hover:shadow-xl hover:border-primary/20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/tablebox:opacity-100 rounded-[1.5rem] transition-opacity duration-1000 pointer-events-none"></div>
        
        <div className="relative z-10">
          {paginatedProjects.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-surface-container-lowest/50"
            >
              <Briefcase className="w-12 h-12 text-on-surface-variant mb-4" />
              <h3 className="text-lg font-bold text-on-surface">No Projects Found</h3>
              <p className="text-sm font-medium text-secondary mt-1 max-w-sm mx-auto">
                {searchQuery 
                  ? "We couldn't find any projects matching your filters." 
                  : "You haven't created any projects yet."}
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="hidden lg:grid grid-cols-12 gap-3 px-5 py-3 bg-surface-container rounded-xl uppercase text-[10px] tracking-[0.2em] font-black text-secondary border border-outline/10 shadow-sm mb-1">
                <div className="col-span-4">Project Title & Slug</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Industry</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
              
              <div className="flex flex-col gap-2">
                <AnimatePresence mode="popLayout">
                  {paginatedProjects.map((project, idx) => (
                    <motion.div 
                      key={project.id} 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30, delay: idx * 0.05 }}
                      whileHover={{ scale: 1.01, y: -2 }}
                      className="group relative bg-surface border border-outline/10 rounded-2xl p-4 lg:px-5 lg:py-3 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 flex flex-col lg:grid lg:grid-cols-12 lg:items-center gap-3 cursor-default z-10"
                    >
                      <div className="col-span-4 flex flex-col">
                        <span className="text-sm font-bold text-on-surface truncate pr-4">{project.title}</span>
                        <div className="text-[10px] font-mono font-medium text-secondary flex items-center gap-1.5 mt-1 truncate">
                          <span className="px-1.5 py-0.5 bg-surface-container rounded border border-outline/10">{project.ref || 'no-ref'}</span>
                        </div>
                      </div>
                      
                      <div className="col-span-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-secondary px-2.5 py-1.5 bg-surface-container rounded-lg border border-outline/10 inline-flex items-center gap-1.5 shadow-sm">
                          <Folder className="w-3 h-3" />
                          {project.category}
                        </span>
                      </div>

                      <div className="col-span-2">
                        <span className="text-[10px] font-bold text-on-surface-variant truncate">
                          {project.industry}
                        </span>
                      </div>

                      <div className="col-span-2">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg border shadow-sm ${project.isPublished ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'}`}>
                          {project.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      
                      <div className="col-span-2 flex items-center justify-end gap-2 lg:opacity-100">
                        <motion.button
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(project)}
                          className="p-2 text-primary bg-primary/5 hover:bg-primary/20 rounded-xl border border-primary/10 shadow-sm hover:shadow-primary/20 transition-colors"
                          title="Edit Project"
                        >
                          <Edit3 className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.15, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(project.id)}
                          className="p-2 text-error bg-error/5 hover:bg-error/20 rounded-xl border border-error/10 shadow-sm hover:shadow-error/20 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Drawer */}
      <ProjectFormDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        project={selectedProject}
        onSuccess={() => {
          router.refresh();
          // We will rely on server refresh + revalidatePath from the action
        }}
      />
    </motion.div>
  );
}
