"use client";

import { motion } from "framer-motion";
import { FaChrome } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function PushPreviewCard({ title, message, image, url }) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [image]);

  return (
    <div className="w-full h-full flex flex-col">
      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4 block">
        Live Preview
      </label>
      
      <div className="rounded-2xl bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-surface-container-lowest/50 border border-outline-variant/20 py-8 px-4 flex items-center justify-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[460px] bg-surface/95 backdrop-blur-xl border border-outline-variant/30 rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col relative z-10 group"
        >
          {/* Header / OS bar */}
          <div className="px-4 py-2.5 bg-surface-container-highest/60 flex items-center justify-between border-b border-outline-variant/10">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <FaChrome className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Google Chrome • subham.digital
              </span>
            </div>
            <span className="text-[10px] text-on-surface-variant/70 font-medium">now</span>
          </div>

          {/* Content */}
          <div className="p-4 flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-outline-variant/20 bg-surface flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <img 
                src="https://ui-avatars.com/api/?name=SD&background=953918E6&color=fff&size=128&rounded=false" 
                alt="Logo" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="flex-1 min-w-0 pt-0.5">
              <h5 className="text-[15px] font-black text-on-surface truncate">
                {title || "Notification Title"}
              </h5>
              <p className="text-xs font-medium text-on-surface-variant mt-1 line-clamp-2 leading-relaxed">
                {message || "The main message of your notification will appear here. It can span up to two lines on most devices."}
              </p>
            </div>
          </div>

          {/* Image (if any) */}
          {image && !imageError && (
            <div className="w-full aspect-[2/1] bg-surface-container relative overflow-hidden border-t border-outline-variant/10">
              <img 
                src={image} 
                alt="Hero Preview" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={() => setImageError(true)}
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
