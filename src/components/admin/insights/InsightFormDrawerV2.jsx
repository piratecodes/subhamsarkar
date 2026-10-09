"use client";

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption, Switch } from '@headlessui/react';
import { Fragment, useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2, Image as ImageIcon, Plus, Trash2, FileText, Settings, Code, Link as LinkIcon, Unlink, RotateCcw, ChevronsUpDown, Check, Edit3, Radio } from 'lucide-react';
import { createInsight, updateInsight, getInsightCategories, getInsightByCategory } from '@/actions/insights';
import { broadcastPushNotification } from '@/actions/push';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import ImageCropperModal from '../shared/ImageCropperModal';
import { uploadMedia, deleteMediaFiles } from '@/actions/media';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const FaqItem = ({ faq, idx, removeFaq, updateFaq, minimalJoditConfig }) => {
  const [initialAnswer] = useState(faq.answer || '');
  return (
    <div className="bg-transparent border border-outline/30 p-4 rounded-xl relative group">
      <button onClick={() => removeFaq(idx)} className="absolute top-2 right-2 text-error hover:text-error/80 bg-surface-container rounded-lg shadow-sm p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <Trash2 size={14} />
      </button>
      <div className="space-y-3 pr-8">
        <input 
          type="text" 
          value={faq.question || ''} 
          onChange={e => updateFaq(idx, 'question', e.target.value)} 
          placeholder="Question..." 
          className="w-full font-bold text-on-surface bg-transparent border-b border-outline/30 focus:border-primary focus:outline-none pb-1" 
        />
        <div className="mt-2 bg-surface rounded-xl overflow-hidden border border-outline/30">
          <JoditEditor
            value={initialAnswer}
            config={minimalJoditConfig}
            onBlur={newContent => updateFaq(idx, 'answer', newContent)}
            onChange={() => {}} 
          />
        </div>
      </div>
    </div>
  );
};

export default function InsightFormDrawerV2({ isOpen, onClose, insight, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [broadcastOnPublish, setBroadcastOnPublish] = useState(false);
  const [existingCategories, setExistingCategories] = useState([]);
  const [query, setQuery] = useState('');
  
  const [editorContent, setEditorContent] = useState('');
  const editorRef = useRef(null);

  const filteredCategories = query === '' 
    ? existingCategories 
    : existingCategories.filter((cat) => cat.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    getInsightCategories().then(res => {
      if (res.success && res.categories) {
        setExistingCategories(res.categories);
      }
    }).catch(console.error);
  }, []);

  const handleCategorySelect = async (catName) => {
    setFormData(prev => ({ ...prev, category: catName }));
    if (!catName || formData.excerpt) return;
    try {
      const res = await getInsightByCategory(catName);
      if (res.success && res.excerpt) {
        setFormData(prev => ({ ...prev, excerpt: res.excerpt }));
        toast.success(`Loaded previous excerpt for "${catName}"`);
      }
    } catch(e) {}
  };
  const [activeTab, setActiveTab] = useState('basic');
  
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [pendingCropImage, setPendingCropImage] = useState(null);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [sessionUploads, setSessionUploads] = useState([]);

  const defaultFormData = {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: null,
    coverImageAlt: '',
    category: '',
    customAuthor: '',
    faqs: [],
    isPublished: true,
    seoMetaTitle: '',
    seoMetaDescription: '',
    seoMetaKeywords: '',
    seoCanonicalUrl: '',
    seoIsNoIndex: false,
    seoJsonLdSchema: ''
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [touchedFields, setTouchedFields] = useState({
    seoMetaTitle: false,
    seoMetaDescription: false,
    seoJsonLdSchema: false,
    slug: false
  });

  useEffect(() => {
    if (insight && isOpen) {
      setFormData({
        title: insight.title || '',
        slug: insight.slug || '',
        excerpt: insight.excerpt || '',
        content: insight.content || '',
        coverImage: insight.coverImage || null,
        coverImageAlt: insight.coverImageAlt || '',
        category: insight.category || '',
        customAuthor: insight.customAuthor || '',
        faqs: Array.isArray(insight.faqs) ? insight.faqs : [],
        isPublished: insight.isPublished ?? true,
        seoMetaTitle: insight.seoMetaTitle || '',
        seoMetaDescription: insight.seoMetaDescription || '',
        seoMetaKeywords: insight.seoMetaKeywords || '',
        seoCanonicalUrl: insight.seoCanonicalUrl || '',
        seoIsNoIndex: insight.seoIsNoIndex || false,
        seoJsonLdSchema: insight.seoJsonLdSchema || ''
      });
      setTouchedFields({
        seoMetaTitle: !!insight.seoMetaTitle,
        seoMetaDescription: !!insight.seoMetaDescription,
        seoJsonLdSchema: !!insight.seoJsonLdSchema,
        slug: true
      });
      setEditorContent(insight.content || '');
      setActiveTab('basic');
    } else if (isOpen) {
      setFormData(defaultFormData);
      setTouchedFields({
        seoMetaTitle: false,
        seoMetaDescription: false,
        seoJsonLdSchema: false,
        slug: false
      });
      setEditorContent('');
      setActiveTab('basic');
    }
  }, [insight, isOpen]);

  // Automated SEO Engine
  useEffect(() => {
    setFormData(prev => {
      let updated = { ...prev };
      let changed = false;

      // 1. Meta Title
      if (!touchedFields.seoMetaTitle && prev.title !== prev.seoMetaTitle) {
        updated.seoMetaTitle = prev.title;
        changed = true;
      }

      // 2. Meta Description
      if (!touchedFields.seoMetaDescription) {
        const strippedText = prev.content.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
        const excerpt = strippedText.length > 180 ? strippedText.substring(0, 180) + '...' : strippedText;
        if (excerpt && excerpt !== prev.seoMetaDescription) {
          updated.seoMetaDescription = excerpt;
          changed = true;
        }
      }

      // 3. JSON-LD Schema
      if (!touchedFields.seoJsonLdSchema) {
        const authorName = prev.customAuthor || "Subham";
        const currentMetaDesc = updated.seoMetaDescription !== undefined ? updated.seoMetaDescription : prev.seoMetaDescription;
        const currentMetaTitle = updated.seoMetaTitle !== undefined ? updated.seoMetaTitle : prev.seoMetaTitle;
        const datePublished = (insight?.createdAt ? new Date(insight.createdAt) : new Date()).toISOString().split('T')[0];
        const dateModified = new Date().toISOString().split('T')[0];
        
        // Use a placeholder for the schema if the image is pending upload. 
        // The server action will automatically replace this placeholder with the true, final generated URL!
        const imageUrl = (prev.coverImage && prev.coverImage.startsWith('data:')) 
          ? "__IMAGE_URL_PLACEHOLDER__"
          : (prev.coverImage || "");

        const schemaObj = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": currentMetaTitle || prev.title,
          "image": imageUrl ? [imageUrl] : [],
          "author": { "@type": "Person", "name": authorName },
          "publisher": { "@type": "Organization", "name": "Subham Digital", "logo": { "@type": "ImageObject", "url": "https://subhamsarkar.dev/logo.png" } },
          "datePublished": datePublished,
          "dateModified": dateModified,
          "description": currentMetaDesc || "",
          "url": prev.seoCanonicalUrl || `https://subhamsarkar.dev/insights/${prev.slug || ''}`,
          "mainEntityOfPage": `https://subhamsarkar.dev/insights/${prev.slug || ''}`
        };

        const newSchemaStr = JSON.stringify(schemaObj, null, 2);
        if (newSchemaStr !== prev.seoJsonLdSchema) {
          updated.seoJsonLdSchema = newSchemaStr;
          changed = true;
        }
      }

      return changed ? updated : prev;
    });
  }, [formData.title, formData.content, formData.coverImage, formData.slug, formData.customAuthor, formData.seoCanonicalUrl, formData.seoMetaTitle, formData.seoMetaDescription, touchedFields, insight]);

    const joditConfig = useMemo(() => ({
    readonly: false,
    placeholder: 'Start writing your insight...',
    height: 600,
    enableDragAndDropFileToEditor: true,
    uploader: { insertImageAsBase64URI: true }, // Simple base64 for inline images
    popupRoot: typeof document !== 'undefined' ? document.body : null,
    toolbarAdaptive: false, // dYOY FIX: Prevents toolbar buttons from vanishing when resizing/toggling code view!
    showTooltip: true,
    
    useNativeTooltip: true, // Native browser tooltips are fully reliable for hover
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', 'eraser', '|',
      'ul', 'ol', '|',
      'font', 'fontsize', 'paragraph', 'classSpan', '|',
      'superscript', 'subscript', 'brush', '|',
      'file', 'image', 'video', '\n',
      
      'spellcheck', 'speechRecognize', '|',
      'cut', 'copy', 'paste', 'selectall', 'copyformat', '|',
      'hr', 'table', 'link', 'symbol', '|',
      'align', 'undo', 'redo', '|',
      'find', 'source', 'fullsize', 'preview', 'print'
    ]
  }), []);

    const minimalJoditConfig = useMemo(() => ({
    readonly: false,
    placeholder: 'Answer (supports formatting & links)...',
    height: 500,
    toolbarAdaptive: true,
    useNativeTooltip: true,
    popupRoot: typeof document !== 'undefined' ? document.body : null,
    buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol', 'link', 'source']
  }), []);

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      toast.error('Title and Slug are required');
      setActiveTab('basic');
      return;
    }
    
    setIsLoading(true);
    try {
      let res;
      if (insight) {
        res = await updateInsight(insight.id, formData);
      } else {
        res = await createInsight(formData);
      }
      
      if (res.success) {
        toast.success(insight ? 'Insight updated!' : 'Insight created!');
        
        if (broadcastOnPublish && formData.isPublished && !insight) {
          const strippedContent = formData.content.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
          const fallbackExcerpt = strippedContent.split(' ').slice(0, 20).join(' ') + '...';
          const notificationExcerpt = formData.excerpt || fallbackExcerpt;
          const targetUrl = `https://subhamsarkar.dev/insights/${formData.slug}`;
          
          await broadcastPushNotification(`New Insight: ${formData.title}`, notificationExcerpt, targetUrl, formData.coverImage, false);
          toast.success("Broadcast sent to all subscribers!");
        }

        // Cleanup any uploaded images that were discarded during editing
        const discardedUploads = sessionUploads.filter(url => url !== formData.coverImage);
        if (discardedUploads.length > 0) {
          deleteMediaFiles(discardedUploads).catch(console.error);
        }

        onClose(true);
      } else {
        toast.error(res.error || 'Failed to save insight');
      }
    } catch (e) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrawerClose = () => {
    // If user cancels, clean up all session uploads
    if (sessionUploads.length > 0) {
      deleteMediaFiles(sessionUploads).catch(console.error);
    }
    onClose(false);
  };

  
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPendingCropImage(reader.result);
        setIsCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPendingCropImage(reader.result);
        setIsCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageCropComplete = async (croppedFile) => {
    setIsCropperOpen(false);
    setIsUploadingCover(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', croppedFile, 'insight-cover.jpg');
      uploadData.append('folder', 'insights');

      const res = await uploadMedia(uploadData);
      if (res.success) {
        setFormData(prev => ({...prev, coverImage: res.url}));
        setSessionUploads(prev => [...prev, res.url]);
        toast.success("Cover image securely uploaded!");
      } else {
        toast.error("Failed to upload cover image.");
      }
    } catch (err) {
      toast.error("An error occurred during upload.");
    } finally {
      setIsUploadingCover(false);
    }
  };

  const addFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const updateFaq = (idx, field, value) => {
    const newFaqs = [...formData.faqs];
    newFaqs[idx][field] = value;
    setFormData({...formData, faqs: newFaqs});
  };

  const removeFaq = (idx) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== idx)
    }));
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <>
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleDrawerClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
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
                    {/* Sweeping Light Ray Background Magic */}
                    <motion.div 
                      animate={{ x: ['-100%', '200%', '-100%'] }} 
                      transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                      className="absolute inset-y-0 w-[80%] bg-linear-to-r from-transparent via-primary/30 to-transparent pointer-events-none blur-3xl opacity-50 group-hover/header:opacity-100"
                    ></motion.div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
                    
                    <div className="relative z-10">
                      <h2 className="text-3xl font-display font-black flex items-center gap-4 bg-linear-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                        <motion.div 
                          animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }} 
                          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
                          className="p-3 bg-primary/10 rounded-2xl border border-primary/30 shadow-[0_0_20px_rgba(var(--color-primary),0.4)] backdrop-blur-md"
                        >
                          {insight ? <Edit3 className="w-6 h-6 text-primary" /> : <Plus className="w-6 h-6 text-primary" />}
                        </motion.div>
                        {insight ? 'Edit Insight' : 'New Insight'}
                      </h2>
                      <p className="text-[11px] font-black uppercase tracking-[0.25em] text-secondary mt-3">Thought Leadership / Article</p>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.15, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleDrawerClose} 
                      className="relative z-10 p-3 text-on-surface-variant bg-surface-container hover:text-error hover:bg-error/10 rounded-full shadow-md hover:shadow-error/30"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Magic LayoutId Tabs */}
                  <div className="flex px-4 sm:px-8 py-4 sm:py-5 gap-2 sm:gap-4 bg-surface/80 backdrop-blur-xl border-b border-outline/10 shrink-0 shadow-sm relative z-20 overflow-x-auto scrollbar-none after:content-[''] after:w-4 sm:after:w-8 after:shrink-0">
                    {[
                      { id: 'basic', label: 'Basics', icon: Settings },
                      { id: 'content', label: 'Content & FAQs', icon: FileText },
                      { id: 'seo', label: 'SEO & Meta', icon: Code }
                    ].map((tab) => (
                      <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)} 
                        className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-[10px] sm:text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 flex items-center gap-2 outline-none whitespace-nowrap shrink-0 ${activeTab === tab.id ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                      >
                        {activeTab === tab.id && (
                          <motion.div 
                            layoutId="magic-tab-indicator"
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
                    <div className="absolute inset-0 bg-linear-to-b from-surface to-surface-container-lowest pointer-events-none h-20 opacity-50"></div>
                    
                    {/* Basic Tab */}
                    {activeTab === 'basic' && (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="max-w-3xl space-y-8 pb-10">

                        <motion.div variants={itemVariants} className="group">
                          <label className="block text-sm font-bold text-on-surface mb-2 group-focus-within:text-primary transition-colors">Title *</label>
                          <input type="text" value={formData.title} onChange={e => {
                            setFormData({...formData, title: e.target.value});
                            if(!touchedFields.slug) {
                              setFormData(prev => ({...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}));
                            }
                          }} className="w-full p-4 bg-surface-container hover:bg-surface-container-high border border-outline/20 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg font-bold shadow-sm hover:shadow-md" placeholder="Give it a catchy title" />
                        </motion.div>

                        <motion.div variants={itemVariants} className="w-full">
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-sm font-bold text-on-surface">URL Slug *</label>
                              <button onClick={() => setTouchedFields(prev => ({...prev, slug: false}))} className="text-[10px] flex items-center gap-1 font-bold text-primary hover:text-primary/80 uppercase tracking-widest">
                                <RotateCcw className="w-3 h-3" /> Auto
                              </button>
                            </div>
                            <div className="flex items-center w-full bg-surface-container hover:bg-surface-container-high border border-outline/20 rounded-xl focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 overflow-hidden transition-all shadow-sm hover:shadow-md">
                              <span className="px-3 py-2.5 bg-surface-variant/30 text-secondary border-r border-outline/20 text-sm font-mono font-medium">
                                /insights/
                              </span>
                              <input 
                                type="text" 
                                value={formData.slug} 
                                onChange={e => {
                                  setFormData({...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')});
                                  setTouchedFields(prev => ({...prev, slug: true}));
                                }} 
                                className="flex-1 p-2.5 bg-transparent focus:outline-none text-sm font-mono text-on-surface" 
                                placeholder="url-slug-goes-here" 
                              />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="relative">
                            <label className="block text-sm font-bold text-on-surface mb-1">Category</label>
                            <Combobox value={formData.category} onChange={handleCategorySelect}>
                              <div className="relative">
                                <ComboboxInput
                                  className="w-full p-3 bg-surface-container hover:bg-surface-container-high border border-outline/20 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm shadow-sm hover:shadow-md"
                                  displayValue={(cat) => cat}
                                  onChange={(event) => {
                                    setQuery(event.target.value);
                                    setFormData(prev => ({...prev, category: event.target.value}));
                                  }}
                                  placeholder="Select or type..."
                                />
                                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronsUpDown className="w-4 h-4 text-secondary" aria-hidden="true" />
                                </ComboboxButton>
                              </div>
                              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setQuery('')}>
                                <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-surface-container py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm border border-outline/10">
                                  {query.length > 0 && !filteredCategories.includes(query) && (
                                    <ComboboxOption value={query} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-primary text-on-primary' : 'text-on-surface'}`}>
                                      Create "{query}"
                                    </ComboboxOption>
                                  )}
                                  {filteredCategories.length === 0 && query === '' ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-secondary">Nothing found.</div>
                                  ) : (
                                    filteredCategories.map((cat, idx) => (
                                      <ComboboxOption key={idx} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-primary text-on-primary' : 'text-on-surface'}`} value={cat}>
                                        {({ selected, active }) => (
                                          <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{cat}</span>
                                            {selected ? (
                                              <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-on-primary' : 'text-primary'}`}>
                                                <Check className="h-4 w-4" aria-hidden="true" />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </ComboboxOption>
                                    ))
                                  )}
                                </ComboboxOptions>
                              </Transition>
                            </Combobox>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-on-surface mb-1">Custom Author</label>
                            <input type="text" value={formData.customAuthor} onChange={e => setFormData({...formData, customAuthor: e.target.value})} className="w-full p-3 bg-surface-container hover:bg-surface-container-high border border-outline/20 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm shadow-sm hover:shadow-md" placeholder="Leave blank for Default Admin" />
                          </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="group">
                          <label className="block text-sm font-bold text-on-surface mb-2 group-focus-within:text-primary transition-colors">Short Excerpt (For Cards & Listing)</label>
                          <textarea value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full p-4 bg-surface-container hover:bg-surface-container-high border border-outline/20 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm h-28 resize-none shadow-sm hover:shadow-md" placeholder="A brief summary to hook the reader..." />
                        </motion.div>

                      <motion.div variants={itemVariants} className="bg-surface-container-lowest border border-outline/10 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <label className="block text-sm font-bold text-on-surface mb-4">Featured Image</label>
                        {formData.coverImage ? (
                          <div className='flex flex-row space-x-5 items-start'>
                            <div className="relative rounded-xl overflow-hidden border border-outline/20 w-full max-w-sm mb-3">
                              <img src={formData.coverImage} alt="Cover Preview" className="w-full h-48 object-cover" />
                              <button onClick={() => setFormData(prev => ({...prev, coverImage: null}))} className="absolute top-2 right-2 bg-error text-white p-1.5 rounded-lg hover:bg-error/80 shadow-md transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="w-full max-w-sm">
                              <label className="block text-xs font-bold text-secondary mb-1">Image Alt Text (SEO)</label>
                              <input 
                                type="text" 
                                value={formData.coverImageAlt || ''} 
                                onChange={e => setFormData({...formData, coverImageAlt: e.target.value})} 
                                className="w-full p-2 text-sm border border-outline/20 bg-surface-container rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none" 
                                placeholder="Describe the image for Google..." 
                              />
                            </div>
                          </div>
                        ) : (
                          <div 
                            onDragOver={e => e.preventDefault()} 
                            onDrop={handleDrop}
                            className={`relative flex flex-col items-center justify-center w-full max-w-sm h-40 border-2 border-dashed border-outline/30 rounded-xl bg-surface transition-all group overflow-hidden ${isUploadingCover ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/5 hover:border-primary text-on-surface-variant cursor-pointer'}`}
                          >
                            {isUploadingCover ? (
                              <div className="flex flex-col items-center text-primary">
                                <Loader2 className="w-8 h-8 mb-2 animate-spin" />
                                <span className="text-sm font-medium">Uploading Cover...</span>
                              </div>
                            ) : (
                              <>
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  onChange={handleFileSelect} 
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                />
                                <ImageIcon className="w-8 h-8 mb-2 opacity-50 group-hover:text-primary group-hover:scale-110 transition-all" />
                                <span className="text-sm font-medium">Click to Upload or Drag Image Here</span>
                                <span className="text-xs opacity-60 mt-1">1200x630 (1.9:1) recommended</span>
                              </>
                            )}
                          </div>
                        )}
                      </motion.div>

                      </motion.div>
                    )}

                    {/* Content Tab */}
                    {activeTab === 'content' && (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8 pb-10">
                        <motion.div variants={itemVariants}>
                          <label className="block text-sm font-bold text-on-surface mb-3">Main Content</label>
                          <div className="border border-outline/20 rounded-xl overflow-hidden shadow-sm">
                            <JoditEditor
                              ref={editorRef}
                              value={editorContent}
                              config={joditConfig}
                              onBlur={newContent => {
                                setFormData({...formData, content: newContent});
                                setEditorContent(newContent);
                              }}
                              onChange={() => {}} 
                            />
                          </div>
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="pt-6 border-t border-outline/10">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-on-surface">Frequently Asked Questions</h3>
                              <p className="text-xs text-secondary mt-1">Add optional FAQs to the bottom of this insight.</p>
                            </div>
                            <button onClick={addFaq} className="flex items-center gap-2 px-4 py-2 bg-surface-container hover:bg-outline/10 text-on-surface rounded-lg font-bold text-xs uppercase tracking-widest transition-colors">
                              <Plus className="w-4 h-4" /> Add FAQ
                            </button>
                          </div>
                          
                          {formData.faqs.length === 0 ? (
                            <div className="text-center py-12 bg-surface-container rounded-xl border border-dashed border-outline/30">
                              <p className="text-sm text-secondary font-medium">No FAQs added yet.</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {formData.faqs.map((faq, idx) => (
                                <FaqItem key={idx} idx={idx} faq={faq} updateFaq={updateFaq} removeFaq={removeFaq} minimalJoditConfig={minimalJoditConfig} />
                              ))}
                            </div>
                          )}
                        </motion.div>
                      </motion.div>
                    )}

                    {/* SEO Tab */}
                    {activeTab === 'seo' && (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="max-w-3xl space-y-6 pb-10">
                        <motion.div variants={itemVariants} className="bg-primary/5 border border-primary/20 p-4 rounded-xl mb-6 flex gap-4">
                          <Code className="w-6 h-6 text-primary shrink-0" />
                          <div>
                            <h4 className="font-bold text-primary text-sm mb-1">SEO Engine Active</h4>
                            <p className="text-xs text-primary/80">Meta fields and JSON-LD schema are automatically synced based on your Basic Info and Content. You can manually override them below.</p>
                          </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="group">
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-sm font-bold text-on-surface">Meta Title</label>
                            <div className="flex items-center gap-2">
                              {touchedFields.seoMetaTitle ? (
                                <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                                  <Unlink className="w-3 h-3" /> Manual
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                                  <LinkIcon className="w-3 h-3" /> Auto
                                </span>
                              )}
                              {touchedFields.seoMetaTitle && (
                                <button onClick={() => setTouchedFields(prev => ({...prev, seoMetaTitle: false}))} className="text-[10px] flex items-center gap-1 font-bold text-primary uppercase tracking-widest hover:text-primary/80 transition-colors">
                                  <RotateCcw className="w-3 h-3" /> Reset
                                </button>
                              )}
                            </div>
                          </div>
                          <input type="text" value={formData.seoMetaTitle} onChange={e => { setFormData({...formData, seoMetaTitle: e.target.value}); if (!touchedFields.seoMetaTitle) setTouchedFields(prev => ({...prev, seoMetaTitle: true})); }} className="w-full p-4 bg-surface-container hover:bg-surface-container-high border border-outline/20 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm shadow-sm hover:shadow-md" placeholder="Defaults to Insight Title" />
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="group">
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-sm font-bold text-on-surface">Meta Description</label>
                            <div className="flex items-center gap-2">
                              {touchedFields.seoMetaDescription ? (
                                <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                                  <Unlink className="w-3 h-3" /> Manual
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                                  <LinkIcon className="w-3 h-3" /> Auto
                                </span>
                              )}
                              {touchedFields.seoMetaDescription && (
                                <button onClick={() => setTouchedFields(prev => ({...prev, seoMetaDescription: false}))} className="text-[10px] flex items-center gap-1 font-bold text-primary uppercase tracking-widest hover:text-primary/80 transition-colors">
                                  <RotateCcw className="w-3 h-3" /> Reset
                                </button>
                              )}
                            </div>
                          </div>
                          <textarea value={formData.seoMetaDescription} onChange={e => { setFormData({...formData, seoMetaDescription: e.target.value}); if (!touchedFields.seoMetaDescription) setTouchedFields(prev => ({...prev, seoMetaDescription: true})); }} className="w-full p-4 bg-surface-container hover:bg-surface-container-high border border-outline/20 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm h-28 resize-none shadow-sm hover:shadow-md" placeholder="Defaults to Excerpt" />
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="group">
                          <label className="block text-sm font-bold text-on-surface mb-1">Target Keywords</label>
                          <input type="text" value={formData.seoMetaKeywords} onChange={e => setFormData({...formData, seoMetaKeywords: e.target.value})} className="w-full p-4 bg-surface-container hover:bg-surface-container-high border border-outline/20 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm shadow-sm hover:shadow-md" placeholder="react, AI, engineering..." />
                        </motion.div>

                        <motion.div variants={itemVariants} className="group">
                          <label className="block text-sm font-bold text-on-surface mb-1">Canonical URL</label>
                          <input type="text" value={formData.seoCanonicalUrl} onChange={e => setFormData({...formData, seoCanonicalUrl: e.target.value})} className="w-full p-4 bg-surface-container hover:bg-surface-container-high border border-outline/20 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm text-secondary font-mono shadow-sm hover:shadow-md" placeholder={`https://subhamsarkar.dev/insights/${formData.slug || 'slug'}`} />
                          <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mt-2">Leave empty to use the default URL.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="group">
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-sm font-bold text-on-surface">Custom JSON-LD Schema (Optional)</label>
                            <div className="flex items-center gap-2">
                              {touchedFields.seoJsonLdSchema ? (
                                <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                                  <Unlink className="w-3 h-3" /> Manual
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                                  <LinkIcon className="w-3 h-3" /> Auto
                                </span>
                              )}
                              {touchedFields.seoJsonLdSchema && (
                                <button onClick={() => setTouchedFields(prev => ({...prev, seoJsonLdSchema: false}))} className="text-[10px] flex items-center gap-1 font-bold text-primary uppercase tracking-widest hover:text-primary/80 transition-colors">
                                  <RotateCcw className="w-3 h-3" /> Reset
                                </button>
                              )}
                            </div>
                          </div>
                          <textarea value={formData.seoJsonLdSchema} onChange={e => { setFormData({...formData, seoJsonLdSchema: e.target.value}); if (!touchedFields.seoJsonLdSchema) setTouchedFields(prev => ({...prev, seoJsonLdSchema: true})); }} className="w-full p-3 border border-outline/20 rounded-xl font-mono text-[11px] h-48 bg-[#0d1117] text-[#7ee787] focus:border-primary focus:outline-none leading-relaxed" placeholder='{ "@context": "https://schema.org"... }' />
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex items-center gap-3 p-4 bg-error/5 rounded-xl border border-error/20">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={formData.seoIsNoIndex} onChange={e => setFormData({...formData, seoIsNoIndex: e.target.checked})} className="sr-only peer" />
                            <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-outline/10 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-error"></div>
                            <span className="ml-3 text-sm font-bold text-on-surface">NoIndex (Hide from Google Search)</span>
                          </label>
                        </motion.div>
                      </motion.div>
                    )}

                  </div>

                  {/* Footer */}
                  <div className="px-4 sm:px-8 py-4 pb-6 sm:pb-5 border-t border-outline/10 bg-surface shrink-0 flex flex-col sm:flex-row justify-between sm:items-center relative z-30 shadow-lg gap-5 sm:gap-0">
                    
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

                      {!insight && (
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

                      {!insight && (
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
                        disabled={isLoading} 
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-2.5 font-display font-black text-xs uppercase tracking-[0.15em] text-on-primary bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-lg shadow-primary/30 disabled:opacity-50 whitespace-nowrap"
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {insight ? 'Update Insight' : 'Save Insight'}
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
        onClose={() => { setIsCropperOpen(false); setPendingCropImage(null); }}
        onCropComplete={handleImageCropComplete}
        defaultAspect={16/9}
        circularCrop={false}
        initialImage={pendingCropImage}
    />
    </>
  );
}
