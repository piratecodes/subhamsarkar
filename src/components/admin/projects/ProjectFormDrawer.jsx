"use client";

import { Fragment, useState, useEffect, useMemo, useRef } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild, Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption, Switch } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, Plus, Edit3, Settings, FileText, Image as ImageIcon, Loader2, ChevronsUpDown, Check, UploadCloud, Trash2, RotateCcw, Radio } from 'lucide-react';
import { createProject, updateProject } from '@/actions/dossier';
import { uploadMedia, deleteMediaFiles } from '@/actions/media';
import { broadcastPushNotification } from '@/actions/push';
import toast from 'react-hot-toast';
import ImageCropperModal from '../shared/ImageCropperModal';



export default function ProjectFormDrawer({ isOpen, onClose, project, onSuccess }) {
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [broadcastOnPublish, setBroadcastOnPublish] = useState(false);
  const [sessionUploads, setSessionUploads] = useState([]);

  const [formData, setFormData] = useState({
    eyebrow: '',
    title: '',
    category: '',
    industry: '',
    industryNiche: '',
    associatedWith: '',
    associatedWithLogo: '',
    associatedWithLogoAlt: '',
    associatedWithLink: '',
    ref: '',
    status: 'COMPLETED',
    discipline: '',
    summary: '',
    bottleneck: '',
    approach: '',
    outcome: '',
    thumbnail: '',
    thumbnailAlt: '',
    images: [],
    pipeline: [],
    stats: [],
    topologySchematic: [],
    technicalDetails: [],
    isPublished: true
  });

  const [touchedFields, setTouchedFields] = useState({ ref: false });
  const [catQuery, setCatQuery] = useState('');
  const [indQuery, setIndQuery] = useState('');
  const [statusQuery, setStatusQuery] = useState('');
  const [techQueries, setTechQueries] = useState({});

  const [dbCategories, setDbCategories] = useState([]);
  const [dbIndustries, setDbIndustries] = useState([]);

  useEffect(() => {
    async function loadDynamicFields() {
      const { getUniqueDossierCategoriesAndIndustries } = await import('@/actions/dossier');
      const res = await getUniqueDossierCategoriesAndIndustries();
      if (res?.success) {
        setDbCategories(res.categories || []);
        setDbIndustries(res.industries || []);
      }
    }
    if (isOpen) {
      loadDynamicFields();
    }
  }, [isOpen]);

  // Media loading states
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const thumbInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // Cropper state
  const [cropQueue, setCropQueue] = useState([]);
  const currentCrop = cropQueue[0];
  const isCropperOpen = !!currentCrop;

  useEffect(() => {
    if (project) {
      setFormData({
        eyebrow: project.eyebrow || '',
        title: project.title || '',
        category: project.category || '',
        industry: project.industry || '',
        industryNiche: project.industryNiche || '',
        associatedWith: project.associatedWith || '',
        associatedWithLogo: project.associatedWithLogo || '',
        associatedWithLogoAlt: project.associatedWithLogoAlt || '',
        associatedWithLink: project.associatedWithLink || '',
        ref: project.ref || '',
        status: project.status || 'COMPLETED',
        discipline: project.discipline || '',
        summary: project.summary || '',
        bottleneck: project.bottleneck || '',
        approach: project.approach || '',
        outcome: project.outcome || '',
        thumbnail: project.thumbnail || '',
        thumbnailAlt: project.thumbnailAlt || '',
        images: Array.isArray(project.images) ? project.images : [],
        pipeline: Array.isArray(project.pipeline) ? project.pipeline : [],
        stats: Array.isArray(project.stats) ? project.stats : [],
        topologySchematic: Array.isArray(project.topologySchematic) ? project.topologySchematic : [],
        technicalDetails: Array.isArray(project.technicalDetails) ? project.technicalDetails : [],
        isPublished: project.isPublished ?? true
      });
    } else {
      setFormData({
        title: '', category: '', industry: '', industryNiche: '',
        associatedWith: '', associatedWithLogo: '', associatedWithLogoAlt: '', associatedWithLink: '', ref: '', status: 'COMPLETED', discipline: '',
        summary: '', bottleneck: '', approach: '', outcome: '',
        thumbnail: '', thumbnailAlt: '', images: [],
        pipeline: [], stats: [], topologySchematic: [], technicalDetails: [],
        isPublished: true
      });
    }
    setTouchedFields({ ref: false });
    setActiveTab('basic');
    setCatQuery('');
    setIndQuery('');
  }, [project, isOpen]);

  const filteredCategories = catQuery === '' 
    ? dbCategories 
    : dbCategories.filter(c => c.toLowerCase().includes(catQuery.toLowerCase()));

  const filteredIndustries = indQuery === ''
    ? dbIndustries
    : dbIndustries.filter(i => i.toLowerCase().includes(indQuery.toLowerCase()));

  const handleSave = async () => {
    if (!formData.title || !formData.category || !formData.industry) {
      toast.error('Title, Category, and Industry are required');
      setActiveTab('basic');
      return;
    }
    
    setIsSaving(true);
    try {
      let res;
      if (project) {
        res = await updateProject(project.id, formData);
      } else {
        res = await createProject(formData);
      }
      
      if (res.success) {
        toast.success(project ? 'Project updated!' : 'Project created!');
        
        // Cleanup discarded session uploads
        const finalUrls = [
          formData.thumbnail,
          formData.associatedWithLogo,
          ...(formData.images || []).map(img => img.url)
        ].filter(Boolean);
        
        const discardedUploads = sessionUploads.filter(url => !finalUrls.includes(url));
        if (discardedUploads.length > 0) {
          deleteMediaFiles(discardedUploads).catch(console.error);
        }
        setSessionUploads([]);

        // Handle Broadcast
        if (broadcastOnPublish && formData.isPublished && !project) {
           const title = `New Project: ${formData.title}`;
           const message = `Check out our recent work for ${formData.associatedWith || "a new client"}.`;
           const url = `https://subham.digital/work`;
           const image = formData.thumbnail ? `https://subham.digital${formData.thumbnail}` : null;
           broadcastPushNotification(title, message, url, image, false).catch(console.error);
           toast.success("Broadcast initiated!");
        }

        if (onSuccess) onSuccess();
        onClose(true);
      } else {
        toast.error(res.error || 'Failed to save project');
      }
    } catch (err) {
      toast.error('An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const handleThumbSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setCropQueue(prev => [...prev, { type: 'thumbnail', dataUrl: reader.result }]);
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input
  };

  const handleLogoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setCropQueue(prev => [...prev, { type: 'associatedWithLogo', dataUrl: reader.result }]);
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input
  };

  const handleImagesSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    Promise.all(files.map(file => new Promise(resolve => {
       const reader = new FileReader();
       reader.onloadend = () => resolve({ type: 'gallery', dataUrl: reader.result });
       reader.readAsDataURL(file);
    }))).then(items => {
       setCropQueue(prev => [...prev, ...items]);
    });
    e.target.value = ''; // Reset input
  };

  const handleCropComplete = async (croppedBlob) => {
    if (!currentCrop) return;
    
    const data = new FormData();
    data.append("file", croppedBlob, "cropped.jpg");
    data.append("folder", "projects");
    
    if (currentCrop.type === 'thumbnail') {
      setIsUploadingThumb(true);
      const res = await uploadMedia(data);
      if (res.success) {
        setSessionUploads(prev => [...prev, res.url]);
        setFormData(prev => ({ ...prev, thumbnail: res.url }));
        toast.success("Thumbnail uploaded");
      } else {
        toast.error("Thumbnail upload failed");
      }
      setIsUploadingThumb(false);
    } else if (currentCrop.type === 'gallery') {
      setIsUploadingImage(true);
      const res = await uploadMedia(data);
      if (res.success) {
        setSessionUploads(prev => [...prev, res.url]);
        setFormData(prev => ({ ...prev, images: [...prev.images, { url: res.url, alt: '' }] }));
        toast.success("Image uploaded to gallery");
      } else {
        toast.error("Gallery image upload failed");
      }
      setIsUploadingImage(false);
    } else if (currentCrop.type === 'associatedWithLogo') {
      const res = await uploadMedia(data);
      if (res.success) {
        setSessionUploads(prev => [...prev, res.url]);
        setFormData(prev => ({ ...prev, associatedWithLogo: res.url }));
        toast.success("Logo uploaded");
      } else {
        toast.error("Logo upload failed");
      }
    }
    
    setCropQueue(prev => prev.slice(1));
  };

  const handleCropCancel = () => {
    setCropQueue(prev => prev.slice(1));
  };

  const handleDrawerClose = async () => {
    if (sessionUploads.length > 0) {
      deleteMediaFiles(sessionUploads).catch(console.error);
      setSessionUploads([]);
    }
    onClose(false);
  };

  const updateImageAlt = (idx, altText) => {
    const newImages = [...formData.images];
    newImages[idx].alt = altText;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const removeImage = (idx) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  return (
    <>
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={handleDrawerClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex justify-end w-full max-w-full pl-0 sm:pl-16">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-full max-w-4xl bg-surface shadow-2xl flex flex-col h-full">
                  
                  {/* Header */}
                  <div className="relative px-8 py-8 bg-surface-container-lowest border-b border-outline/10 flex items-center justify-between shrink-0 overflow-hidden group/header">
                    <motion.div 
                      animate={{ x: ['-100%', '200%', '-100%'] }} 
                      transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                      className="absolute inset-y-0 w-[80%] bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none blur-3xl opacity-50 group-hover/header:opacity-100"
                    ></motion.div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
                    
                    <div className="relative z-10">
                      <h2 className="text-3xl font-display font-black flex items-center gap-4 bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                        <motion.div 
                          animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }} 
                          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
                          className="p-3 bg-primary/10 rounded-2xl border border-primary/30 shadow-[0_0_20px_rgba(var(--color-primary),0.4)] backdrop-blur-md"
                        >
                          {project ? <Edit3 className="w-6 h-6 text-primary" /> : <Plus className="w-6 h-6 text-primary" />}
                        </motion.div>
                        {project ? 'Edit Project' : 'New Project'}
                      </h2>
                      <p className="text-[11px] font-black uppercase tracking-[0.25em] text-secondary mt-3">Portfolio / Dossier</p>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.15, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleDrawerClose} 
                      className="relative z-10 p-3 text-on-surface-variant bg-surface-container hover:text-error hover:bg-error/10 rounded-full shadow-md hover:shadow-error/30 transition-all"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Magic LayoutId Tabs */}
                  <div className="flex px-4 sm:px-8 py-4 sm:py-5 gap-2 sm:gap-4 bg-surface/80 backdrop-blur-xl border-b border-outline/10 shrink-0 shadow-sm relative z-20 overflow-x-auto scrollbar-none after:content-[''] after:w-4 sm:after:w-8 after:shrink-0">
                    {[
                      { id: 'basic', label: 'Overview', icon: Settings },
                      { id: 'content', label: 'Details', icon: FileText },
                      { id: 'media', label: 'Media & Stats', icon: ImageIcon }
                    ].map((tab) => (
                      <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)} 
                        className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-[10px] sm:text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 flex items-center gap-2 outline-none whitespace-nowrap shrink-0 ${activeTab === tab.id ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                      >
                        {activeTab === tab.id && (
                          <motion.div 
                            layoutId="magic-tab-indicator-project"
                            className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl shadow-[0_0_20px_rgba(var(--color-primary),0.2)]"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        <tab.icon className="w-4 h-4 relative z-10" /> 
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Body */}
                  <div className="flex-1 overflow-y-auto p-8 bg-surface-container-lowest relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-surface to-surface-container-lowest pointer-events-none h-20 opacity-50"></div>
                    
                    {activeTab === 'basic' && (
                      <div className="max-w-3xl space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-on-surface mb-2">Discipline *</label>
                            <input type="text" placeholder="e.g. Enterprise Solution" value={formData.discipline} onChange={e => setFormData(prev => ({...prev, discipline: e.target.value}))} className="w-full p-4 bg-surface-container rounded-xl border border-outline/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-on-surface mb-2">Eyebrow (Pre-title Context)</label>
                            <input type="text" placeholder="e.g. Authorized Case Study" value={formData.eyebrow} onChange={e => setFormData(prev => ({...prev, eyebrow: e.target.value}))} className="w-full p-4 bg-surface-container rounded-xl border border-outline/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-on-surface mb-2">Project Title *</label>
                          <input type="text" value={formData.title} onChange={e => {
                            setFormData(prev => {
                              const title = e.target.value;
                              return {
                                ...prev,
                                title,
                                ...(!touchedFields.ref && { ref: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') })
                              };
                            });
                          }} className="w-full p-4 bg-surface-container rounded-xl border border-outline/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          
                          {/* Category Combobox */}
                          <div className="relative">
                            <label className="block text-sm font-bold text-on-surface mb-2">Category *</label>
                            <Combobox value={formData.category} onChange={(val) => setFormData(prev => ({...prev, category: val}))}>
                              <div className="relative z-30">
                                <ComboboxInput
                                  className="w-full p-3 bg-surface-container rounded-xl border border-outline/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                                  displayValue={(cat) => cat}
                                  onChange={(event) => {
                                    setCatQuery(event.target.value);
                                    setFormData(prev => ({...prev, category: event.target.value}));
                                  }}
                                  placeholder="Select or type..."
                                />
                                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
                                  <ChevronsUpDown className="w-4 h-4 text-secondary" aria-hidden="true" />
                                </ComboboxButton>
                                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setCatQuery('')}>
                                  <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-surface-container border border-outline/20 py-1 text-base shadow-2xl focus:outline-none sm:text-sm">
                                    {catQuery.length > 0 && !filteredCategories.includes(catQuery) && (
                                      <ComboboxOption value={catQuery} className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary/10 text-primary' : 'text-on-surface'}`}>
                                        Create "{catQuery}"
                                      </ComboboxOption>
                                    )}
                                    {filteredCategories.map((cat) => (
                                      <ComboboxOption key={cat} value={cat} className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary/10 text-primary' : 'text-on-surface'}`}>
                                        {({ selected }) => (
                                          <>
                                            <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'}`}>{cat}</span>
                                            {selected && <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Check className="w-4 h-4 text-primary" /></span>}
                                          </>
                                        )}
                                      </ComboboxOption>
                                    ))}
                                  </ComboboxOptions>
                                </Transition>
                              </div>
                            </Combobox>
                          </div>

                          {/* Industry Combobox */}
                          <div className="relative">
                            <label className="block text-sm font-bold text-on-surface mb-2">Industry *</label>
                            <Combobox value={formData.industry} onChange={(val) => setFormData(prev => ({...prev, industry: val}))}>
                              <div className="relative z-20">
                                <ComboboxInput
                                  className="w-full p-3 bg-surface-container rounded-xl border border-outline/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                                  displayValue={(ind) => ind}
                                  onChange={(event) => {
                                    setIndQuery(event.target.value);
                                    setFormData(prev => ({...prev, industry: event.target.value}));
                                  }}
                                  placeholder="Select or type..."
                                />
                                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
                                  <ChevronsUpDown className="w-4 h-4 text-secondary" aria-hidden="true" />
                                </ComboboxButton>
                                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setIndQuery('')}>
                                  <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-surface-container border border-outline/20 py-1 text-base shadow-2xl focus:outline-none sm:text-sm">
                                    {indQuery.length > 0 && !filteredIndustries.includes(indQuery) && (
                                      <ComboboxOption value={indQuery} className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary/10 text-primary' : 'text-on-surface'}`}>
                                        Create "{indQuery}"
                                      </ComboboxOption>
                                    )}
                                    {filteredIndustries.map((ind) => (
                                      <ComboboxOption key={ind} value={ind} className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary/10 text-primary' : 'text-on-surface'}`}>
                                        {({ selected }) => (
                                          <>
                                            <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'}`}>{ind}</span>
                                            {selected && <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Check className="w-4 h-4 text-primary" /></span>}
                                          </>
                                        )}
                                      </ComboboxOption>
                                    ))}
                                  </ComboboxOptions>
                                </Transition>
                              </div>
                            </Combobox>
                          </div>
                          
                          {/* Status Combobox */}
                          <div className="relative">
                            <label className="block text-sm font-bold text-on-surface mb-2">Status</label>
                            <Combobox value={formData.status} onChange={(val) => setFormData(prev => ({...prev, status: val}))}>
                              <div className="relative z-10">
                                <ComboboxInput
                                  className="w-full p-3 bg-surface-container rounded-xl border border-outline/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                                  displayValue={(stat) => stat}
                                  onChange={(event) => {
                                    setStatusQuery(event.target.value);
                                    setFormData(prev => ({...prev, status: event.target.value}));
                                  }}
                                  placeholder="Select or type..."
                                />
                                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
                                  <ChevronsUpDown className="w-4 h-4 text-secondary" aria-hidden="true" />
                                </ComboboxButton>
                                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setStatusQuery('')}>
                                  <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-surface-container border border-outline/20 py-1 text-base shadow-2xl focus:outline-none sm:text-sm">
                                    {statusQuery.length > 0 && !["COMPLETED", "IN_PROGRESS", "ON_HOLD", "CANCELLED"].includes(statusQuery) && (
                                      <ComboboxOption value={statusQuery} className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary/10 text-primary' : 'text-on-surface'}`}>
                                        Create "{statusQuery}"
                                      </ComboboxOption>
                                    )}
                                    {["COMPLETED", "IN_PROGRESS", "ON_HOLD", "CANCELLED"].map((stat) => (
                                      <ComboboxOption key={stat} value={stat} className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary/10 text-primary' : 'text-on-surface'}`}>
                                        {({ selected }) => (
                                          <>
                                            <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'}`}>{stat}</span>
                                            {selected && <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Check className="w-4 h-4 text-primary" /></span>}
                                          </>
                                        )}
                                      </ComboboxOption>
                                    ))}
                                  </ComboboxOptions>
                                </Transition>
                              </div>
                            </Combobox>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-sm font-bold text-on-surface">Reference ID (Slug) *</label>
                              <button 
                                onClick={() => {
                                  setTouchedFields(prev => ({...prev, ref: false}));
                                  setFormData(prev => ({...prev, ref: prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}));
                                }} 
                                className="text-[10px] flex items-center gap-1 font-bold text-primary hover:text-primary/80 uppercase tracking-widest"
                              >
                                <RotateCcw className="w-3 h-3" /> Auto
                              </button>
                            </div>
                            <input 
                              type="text" 
                              value={formData.ref} 
                              onChange={e => {
                                setFormData({...formData, ref: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')});
                                setTouchedFields(prev => ({...prev, ref: true}));
                              }} 
                              className="w-full p-3 bg-surface-container rounded-xl border border-outline/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm font-mono text-sm" 
                            />
                          </div>
                        </div>
                        
                        {/* Associated Company Details */}
                        <div className="p-5 bg-surface-container/30 rounded-2xl border border-outline/10 space-y-5">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Associated Company Details</h4>
                          
                          {/* Line 1: Name and Link */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-bold text-on-surface mb-2">Company Name</label>
                              <input 
                                type="text" 
                                value={formData.associatedWith} 
                                onChange={e => setFormData({...formData, associatedWith: e.target.value})} 
                                className="w-full p-3 bg-surface-container rounded-xl border border-outline/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm text-sm" 
                                placeholder="e.g. Acme Corp"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-on-surface mb-2">Website URL</label>
                              <input 
                                type="url" 
                                value={formData.associatedWithLink} 
                                onChange={e => setFormData({...formData, associatedWithLink: e.target.value})} 
                                className="w-full p-3 bg-surface-container rounded-xl border border-outline/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm text-sm" 
                                placeholder="https://"
                              />
                            </div>
                          </div>

                          {/* Line 2: Logo and Alt Text */}
                          <div className="flex gap-5 items-start">
                            <div className="shrink-0 flex flex-col">
                              <label className="block text-sm font-bold text-on-surface mb-2">Company Logo</label>
                              <div
                                className="aspect-video w-32 rounded-xl border-2 border-dashed border-outline/30 hover:border-primary flex items-center justify-center bg-surface-container overflow-hidden group transition-all relative"
                              >
                                {formData.associatedWithLogo ? (
                                  <>
                                    <img src={formData.associatedWithLogo} alt="Logo" className="w-full h-full object-contain p-2" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-2">
                                      <button 
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const input = document.createElement('input');
                                          input.type = 'file';
                                          input.accept = 'image/*';
                                          input.onchange = handleLogoSelect;
                                          input.click();
                                        }} 
                                        className="p-1.5 bg-surface rounded-full text-primary hover:scale-110 transition-transform shadow-lg" 
                                        title="Change Logo"
                                      >
                                        <UploadCloud className="w-3.5 h-3.5" />
                                      </button>
                                      <button 
                                        type="button"
                                        onClick={(e) => { 
                                          e.stopPropagation(); 
                                          setFormData(prev => ({...prev, associatedWithLogo: ''})); 
                                        }} 
                                        className="p-1.5 bg-error rounded-full text-white hover:scale-110 transition-transform shadow-lg" 
                                        title="Remove Logo"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const input = document.createElement('input');
                                      input.type = 'file';
                                      input.accept = 'image/*';
                                      input.onchange = handleLogoSelect;
                                      input.click();
                                    }}
                                    className="w-full h-full flex items-center justify-center"
                                  >
                                    <ImageIcon className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
                                  </button>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex-1">
                              <label className="block text-sm font-bold text-on-surface mb-2">Logo Alt Text</label>
                              <input 
                                type="text" 
                                value={formData.associatedWithLogoAlt} 
                                onChange={e => setFormData({...formData, associatedWithLogoAlt: e.target.value})} 
                                className="w-full p-3 bg-surface-container rounded-xl border border-outline/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm text-sm" 
                                placeholder="e.g. Acme Corp Logo"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-on-surface mb-2">Summary</label>
                          <textarea rows={4} value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full p-3 bg-surface-container rounded-xl border border-outline/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-y shadow-sm" />
                        </div>
                      </div>
                    )}

                    {activeTab === 'content' && (
                      <div className="max-w-3xl space-y-8 relative z-10">
                        <div className="space-y-4">
                          <label className="block text-sm font-bold text-on-surface">The Bottleneck / Challenge</label>
                          <textarea rows={4} value={formData.bottleneck} onChange={e => setFormData({...formData, bottleneck: e.target.value})} className="w-full p-3 bg-surface-container rounded-xl border border-outline/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-y shadow-sm" />
                        </div>
                        <div className="space-y-4">
                          <label className="block text-sm font-bold text-on-surface">Our Approach</label>
                          <textarea rows={4} value={formData.approach} onChange={e => setFormData({...formData, approach: e.target.value})} className="w-full p-3 bg-surface-container rounded-xl border border-outline/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-y shadow-sm" />
                        </div>
                        <div className="space-y-4">
                          <label className="block text-sm font-bold text-on-surface">The Outcome</label>
                          <textarea rows={4} value={formData.outcome} onChange={e => setFormData({...formData, outcome: e.target.value})} className="w-full p-3 bg-surface-container rounded-xl border border-outline/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-y shadow-sm" />
                        </div>
                        
                        <hr className="border-outline/10 my-8" />

                        {/* Pipeline Array */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="block text-sm font-bold text-on-surface">Architectural Pipeline (Bullets)</label>
                            <button onClick={() => setFormData(p => ({...p, pipeline: [...p.pipeline, { bullet: '' }]}))} className="text-[10px] font-black tracking-widest uppercase text-primary bg-primary/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-primary/20 transition-colors">
                              <Plus className="w-3 h-3" /> Add Bullet
                            </button>
                          </div>
                          <div className="space-y-2">
                            <AnimatePresence>
                              {formData.pipeline.map((step, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-3 bg-surface-container-lowest p-2 rounded-xl border border-outline/10">
                                  <div className="flex-1">
                                    <input type="text" placeholder="Pipeline bullet point..." value={typeof step === 'string' ? step : (step.bullet || '')} onChange={e => { const newArr = [...formData.pipeline]; newArr[idx] = { bullet: e.target.value }; setFormData(p => ({...p, pipeline: newArr})); }} className="w-full p-2.5 bg-surface-container rounded-lg border border-outline/20 focus:border-primary transition-all text-sm" />
                                  </div>
                                  <button onClick={() => setFormData(p => ({...p, pipeline: p.pipeline.filter((_, i) => i !== idx)}))} className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors shrink-0">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        </div>



                      </div>
                    )}
                    
                    {activeTab === 'media' && (
                      <div className="max-w-4xl space-y-8 relative z-10">
                        
                        {/* Thumbnail Upload */}
                        <div className="bg-surface p-6 rounded-2xl border border-outline/10 shadow-sm space-y-4">
                          <h3 className="text-sm font-black uppercase tracking-widest text-on-surface">Project Thumbnail</h3>
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/3 aspect-video bg-surface-container rounded-xl border border-outline/20 overflow-hidden relative group flex items-center justify-center p-2">
                              {formData.thumbnail ? (
                                <>
                                  <img src={formData.thumbnail} alt="Thumbnail" className="w-full h-full object-contain" />
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-4">
                                    <button onClick={() => thumbInputRef.current?.click()} className="p-3 bg-surface rounded-full text-primary hover:scale-110 transition-transform shadow-lg" title="Change Image">
                                      <UploadCloud className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => setFormData(prev => ({...prev, thumbnail: ''}))} className="p-3 bg-error rounded-full text-white hover:scale-110 transition-transform shadow-lg" title="Remove Image">
                                      <Trash2 className="w-5 h-5" />
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <button onClick={() => thumbInputRef.current?.click()} className="flex flex-col items-center justify-center text-secondary hover:text-primary transition-colors">
                                  {isUploadingThumb ? <Loader2 className="w-8 h-8 animate-spin" /> : <UploadCloud className="w-8 h-8 mb-2" />}
                                  <span className="text-xs font-bold uppercase tracking-widest">Upload Thumb</span>
                                </button>
                              )}
                              <input type="file" ref={thumbInputRef} onChange={handleThumbSelect} accept="image/*" className="hidden" />
                            </div>
                            <div className="flex-1 space-y-4">
                              <div>
                                <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-widest">Alt Text for Thumbnail *</label>
                                <input 
                                  type="text" 
                                  value={formData.thumbnailAlt} 
                                  onChange={e => setFormData({...formData, thumbnailAlt: e.target.value})} 
                                  placeholder="Describe the image for SEO..."
                                  className="w-full p-3 bg-surface-container rounded-xl border border-outline/20 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm" 
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Multiple Images Upload */}
                        <div className="bg-surface p-6 rounded-2xl border border-outline/10 shadow-sm space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-widest text-on-surface">Project Gallery Images</h3>
                            <button 
                              onClick={() => imageInputRef.current?.click()}
                              disabled={isUploadingImage}
                              className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors disabled:opacity-50"
                            >
                              {isUploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                              Add Images
                            </button>
                            <input type="file" multiple ref={imageInputRef} onChange={handleImagesSelect} accept="image/*" className="hidden" />
                          </div>

                          <div className="space-y-4">
                            <AnimatePresence>
                              {formData.images.map((img, idx) => (
                                <motion.div 
                                  key={idx}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  className="flex items-center gap-4 bg-surface-container-lowest p-3 rounded-xl border border-outline/10"
                                >
                                  <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-surface-container border border-outline/20">
                                    <img src={img.url} className="w-full h-full object-cover" alt="" />
                                  </div>
                                  <div className="flex-1">
                                    <label className="block text-[10px] font-bold text-secondary mb-1 uppercase tracking-widest">Alt Text *</label>
                                    <input 
                                      type="text" 
                                      value={img.alt} 
                                      onChange={(e) => updateImageAlt(idx, e.target.value)}
                                      placeholder="Describe this gallery image..."
                                      className="w-full p-2 bg-surface rounded-lg border border-outline/20 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                                    />
                                  </div>
                                  <button onClick={() => removeImage(idx)} className="p-3 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-xl transition-all shrink-0 mt-4">
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                            {formData.images.length === 0 && !isUploadingImage && (
                              <div className="text-center py-12 border-2 border-dashed border-outline/20 rounded-xl">
                                <p className="text-sm font-medium text-secondary">No gallery images added yet.</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <hr className="border-outline/10 my-8" />

                        {/* Stats Array */}
                        <div className="bg-surface p-6 rounded-2xl border border-outline/10 shadow-sm space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-widest text-on-surface">Key Statistics</h3>
                            <button onClick={() => setFormData(p => ({...p, stats: [...p.stats, { label: '', value: '' }]}))} className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors">
                              <Plus className="w-4 h-4" /> Add Stat
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <AnimatePresence>
                              {formData.stats.map((stat, idx) => (
                                <motion.div 
                                  key={idx}
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  className="flex items-center gap-3 bg-surface-container-lowest p-3 rounded-xl border border-outline/10"
                                >
                                  <div className="flex-1 space-y-2">
                                    <input type="text" placeholder="Value (e.g. 500+)" value={stat.value} onChange={e => { const newArr = [...formData.stats]; newArr[idx].value = e.target.value; setFormData(p => ({...p, stats: newArr})); }} className="w-full p-2 bg-surface-container rounded-lg border border-outline/20 focus:border-primary transition-all text-sm font-black text-primary" />
                                    <input type="text" placeholder="Label (e.g. Happy Clients)" value={stat.label} onChange={e => { const newArr = [...formData.stats]; newArr[idx].label = e.target.value; setFormData(p => ({...p, stats: newArr})); }} className="w-full p-2 bg-surface-container rounded-lg border border-outline/20 focus:border-primary transition-all text-xs font-bold text-secondary uppercase tracking-widest" />
                                  </div>
                                  <button onClick={() => setFormData(p => ({...p, stats: p.stats.filter((_, i) => i !== idx)}))} className="p-3 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-xl transition-all shrink-0">
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        </div>



                        {/* Technical Details Array */}
                        <div className="bg-surface p-6 rounded-2xl border border-outline/10 shadow-sm space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-widest text-on-surface">Technical Implementation Details</h3>
                            <button onClick={() => setFormData(p => ({...p, technicalDetails: [...p.technicalDetails, { heading: '', description: '', bullets: [''] }]}))} className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors">
                              <Plus className="w-4 h-4" /> Add Tab/Block
                            </button>
                          </div>

                          <div className="space-y-4">
                            <AnimatePresence>
                              {formData.technicalDetails.map((detail, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="flex gap-4 p-5 bg-surface-container-lowest border border-outline/10 rounded-2xl relative group">
                                  <div className="flex-1 space-y-4">
                                    
                                    <div className="space-y-1 relative z-20">
                                      <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Tab Heading (Combobox)</label>
                                      <Combobox value={detail.heading || detail.feature || ''} onChange={val => { const newArr = [...formData.technicalDetails]; newArr[idx].heading = val; setFormData(p => ({...p, technicalDetails: newArr})); }}>
                                        <div className="relative">
                                          <ComboboxInput
                                            className="w-full p-2.5 bg-surface-container rounded-lg border border-outline/20 focus:border-primary transition-all text-sm font-bold"
                                            displayValue={(item) => item}
                                            onChange={(event) => {
                                              const val = event.target.value;
                                              setTechQueries(prev => ({...prev, [idx]: val}));
                                              const newArr = [...formData.technicalDetails];
                                              newArr[idx].heading = val;
                                              setFormData(p => ({...p, technicalDetails: newArr}));
                                            }}
                                            placeholder="e.g. How Data Stays in Sync"
                                          />
                                          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
                                            <ChevronsUpDown className="w-4 h-4 text-secondary" aria-hidden="true" />
                                          </ComboboxButton>
                                          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setTechQueries(prev => ({...prev, [idx]: ''}))}>
                                            <ComboboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-surface-container border border-outline/20 py-1 text-base shadow-2xl focus:outline-none sm:text-sm">
                                              {techQueries[idx] && techQueries[idx].length > 0 && !["How Data Stays in Sync", "Audit & Accountability", "Security & Compliance", "Performance & Scaling"].includes(techQueries[idx]) && (
                                                <ComboboxOption value={techQueries[idx]} className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary/10 text-primary' : 'text-on-surface'}`}>
                                                  Create "{techQueries[idx]}"
                                                </ComboboxOption>
                                              )}
                                              {["How Data Stays in Sync", "Audit & Accountability", "Security & Compliance", "Performance & Scaling"].map((opt) => (
                                                <ComboboxOption key={opt} value={opt} className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primary/10 text-primary' : 'text-on-surface'}`}>
                                                  {({ selected }) => (
                                                    <>
                                                      <span className={`block truncate ${selected ? 'font-bold' : 'font-medium'}`}>{opt}</span>
                                                      {selected && <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Check className="w-4 h-4 text-primary" /></span>}
                                                    </>
                                                  )}
                                                </ComboboxOption>
                                              ))}
                                            </ComboboxOptions>
                                          </Transition>
                                        </div>
                                      </Combobox>
                                    </div>
                                    
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Small Description</label>
                                      <textarea rows={2} placeholder="Description..." value={detail.description || ''} onChange={e => { const newArr = [...formData.technicalDetails]; newArr[idx] = {...newArr[idx], description: e.target.value}; setFormData(p => ({...p, technicalDetails: newArr})); }} className="w-full p-2.5 bg-surface-container rounded-lg border border-outline/20 focus:border-primary transition-all text-sm" />
                                    </div>
                                    
                                    <div className="space-y-2 bg-surface-container/30 p-3 rounded-xl border border-outline/5">
                                      <div className="flex items-center justify-between mb-1">
                                        <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Bullets</label>
                                      </div>
                                      {(detail.bullets || []).map((b, bIdx) => (
                                        <div key={bIdx} className="flex items-center gap-2">
                                          <div className="w-1.5 h-1.5 bg-primary/50 rotate-45 shrink-0" />
                                          <input type="text" placeholder="Bullet point..." value={b} onChange={e => { 
                                            const newArr = [...formData.technicalDetails]; 
                                            const newBullets = [...(newArr[idx].bullets || [])];
                                            newBullets[bIdx] = e.target.value;
                                            newArr[idx] = {...newArr[idx], bullets: newBullets};
                                            setFormData(p => ({...p, technicalDetails: newArr})); 
                                          }} className="flex-1 p-2 bg-surface rounded border border-outline/10 focus:border-primary/50 transition-all text-xs" />
                                          <button onClick={() => {
                                            const newArr = [...formData.technicalDetails];
                                            newArr[idx].bullets = newArr[idx].bullets.filter((_, i) => i !== bIdx);
                                            setFormData(p => ({...p, technicalDetails: newArr}));
                                          }} className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error/10 rounded transition-colors shrink-0">
                                            <X className="w-3 h-3" />
                                          </button>
                                        </div>
                                      ))}
                                      <button onClick={() => {
                                        const newArr = [...formData.technicalDetails];
                                        const currentBullets = newArr[idx].bullets || [];
                                        newArr[idx] = {...newArr[idx], bullets: [...currentBullets, '']};
                                        setFormData(p => ({...p, technicalDetails: newArr}));
                                      }} className="text-[10px] font-bold text-primary hover:text-primary/80 flex items-center gap-1 mt-2 transition-colors">
                                        <Plus className="w-3 h-3" /> Add Bullet
                                      </button>
                                    </div>
                                    
                                  </div>
                                  <button onClick={() => setFormData(p => ({...p, technicalDetails: p.technicalDetails.filter((_, i) => i !== idx)}))} className="text-on-surface-variant hover:text-error shrink-0 transition-colors self-start p-2 hover:bg-error/10 rounded-lg">
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Topology Schematic Array */}
                        <div className="bg-surface p-6 rounded-2xl border border-outline/10 shadow-sm space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-widest text-on-surface">Topology / Architecture Schematic</h3>
                            <button onClick={() => setFormData(p => ({...p, topologySchematic: [...p.topologySchematic, { node: '', info: '', isActive: false }]}))} className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors">
                              <Plus className="w-4 h-4" /> Add Node
                            </button>
                          </div>
                          
                          <div className="space-y-4">
                            <AnimatePresence>
                              {formData.topologySchematic.map((node, idx) => (
                                <motion.div 
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  className="flex gap-4 p-5 bg-surface-container-lowest border border-outline/10 rounded-2xl relative group items-start"
                                  style={node.isActive ? { borderColor: 'rgba(var(--color-primary), 0.5)', backgroundColor: 'rgba(var(--color-primary), 0.05)' } : {}}
                                >
                                  <div className="pt-2">
                                    <input 
                                      type="checkbox" 
                                      checked={node.isActive || false}
                                      onChange={e => { const newArr = [...formData.topologySchematic]; newArr[idx].isActive = e.target.checked; setFormData(p => ({...p, topologySchematic: newArr})); }}
                                      className="w-4 h-4 rounded text-primary focus:ring-primary focus:ring-offset-surface-container bg-surface border-outline/30 cursor-pointer"
                                      title="Mark as active portion"
                                    />
                                  </div>
                                  <div className="flex-1 space-y-3">
                                    <input type="text" placeholder="Node Name (e.g. Client App)" value={node.node} onChange={e => { const newArr = [...formData.topologySchematic]; newArr[idx].node = e.target.value; setFormData(p => ({...p, topologySchematic: newArr})); }} className="w-full p-2 bg-surface-container rounded-lg border border-outline/20 focus:border-primary transition-all text-sm font-bold" />
                                    <textarea rows={2} placeholder="Node Details & Technologies" value={node.info} onChange={e => { const newArr = [...formData.topologySchematic]; newArr[idx].info = e.target.value; setFormData(p => ({...p, topologySchematic: newArr})); }} className="w-full p-2 bg-surface-container rounded-lg border border-outline/20 focus:border-primary transition-all text-sm" />
                                  </div>
                                  <button onClick={() => setFormData(p => ({...p, topologySchematic: p.topologySchematic.filter((_, i) => i !== idx)}))} className="text-on-surface-variant hover:text-error shrink-0 transition-colors self-start p-2 hover:bg-error/10 rounded-lg">
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-4 sm:px-8 py-4 pb-6 sm:pb-5 bg-surface border-t border-outline/10 flex flex-col sm:flex-row justify-between sm:items-center shrink-0 relative z-30 gap-5 sm:gap-0">
                    
                    {/* Mobile Toggles */}
                    <div className="grid grid-cols-2 gap-3 w-full sm:hidden">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-on-surface-variant flex items-center gap-1">Status</span>
                        <div className="flex flex-col items-start gap-1">
                          <Switch
                            checked={formData.isPublished}
                            onChange={(checked) => setFormData(p => ({...p, isPublished: checked}))}
                            className={`${formData.isPublished ? 'bg-primary' : 'bg-surface-container-high'} relative inline-flex h-6 w-14 items-center rounded-full transition-colors focus:outline-none`}
                          >
                            <span className={`${formData.isPublished ? 'translate-x-9' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                          </Switch>
                          <span className={`text-[8px] font-bold uppercase tracking-widest ${formData.isPublished ? 'text-primary' : 'text-on-surface-variant'}`}>
                            {formData.isPublished ? 'Publish Now' : 'Draft Mode'}
                          </span>
                        </div>
                      </div>

                      {!project && (
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-on-surface-variant flex items-center gap-1">
                            <Radio className="w-2.5 h-2.5" /> Push Notify
                          </span>
                          <div className="flex flex-col items-start gap-1">
                            <Switch
                              checked={broadcastOnPublish}
                              onChange={setBroadcastOnPublish}
                              disabled={!formData.isPublished}
                              className={`${broadcastOnPublish ? 'bg-primary' : 'bg-surface-container-high'} relative inline-flex h-6 w-14 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50`}
                            >
                              <span className={`${broadcastOnPublish ? 'translate-x-9' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                            </Switch>
                            <span className={`text-[8px] font-bold uppercase tracking-widest ${broadcastOnPublish ? 'text-primary' : 'text-on-surface-variant'} ${!formData.isPublished && 'opacity-50'}`}>
                              {broadcastOnPublish ? 'Active' : 'Disabled'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Desktop Toggles */}
                    <div className="hidden sm:flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Status:</span>
                      <Switch
                        checked={formData.isPublished}
                        onChange={(checked) => setFormData(p => ({...p, isPublished: checked}))}
                        className={`${formData.isPublished ? 'bg-primary' : 'bg-surface-container-high'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                      >
                        <span className={`${formData.isPublished ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                      </Switch>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${formData.isPublished ? 'text-primary' : 'text-secondary'}`}>
                        {formData.isPublished ? 'Publish Now' : 'Save as Draft'}
                      </span>
                      
                      {!project && (
                        <div className="flex items-center gap-3 border-l border-outline/10 pl-6 ml-3">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-1">
                            <Radio className="w-3 h-3" />
                            Push Notify
                          </span>
                          <Switch
                            checked={broadcastOnPublish}
                            onChange={setBroadcastOnPublish}
                            disabled={!formData.isPublished}
                            className={`${broadcastOnPublish ? 'bg-primary' : 'bg-surface-container-high'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50`}
                          >
                            <span className={`${broadcastOnPublish ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                          </Switch>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto mt-1 sm:mt-0">
                      <button onClick={handleDrawerClose} className="px-5 sm:px-6 py-3 sm:py-2.5 font-bold text-xs uppercase tracking-widest text-on-surface hover:text-primary bg-surface-container hover:bg-surface-container-high rounded-xl transition-colors shrink-0 border border-outline/5">
                        Cancel
                      </button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave} 
                        disabled={isSaving}
                        className="flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-2.5 font-black text-xs uppercase tracking-[0.15em] bg-primary text-on-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Settings className="w-4 h-4" />}
                        Save Project
                      </motion.button>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
    <ImageCropperModal
      isOpen={isCropperOpen}
      onClose={handleCropCancel}
      onCropComplete={handleCropComplete}
      defaultAspect={16/9}
      circularCrop={false}
      initialImage={currentCrop?.dataUrl}
    />
    </>
  );
}
