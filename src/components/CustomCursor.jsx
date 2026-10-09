"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState('default'); // 'default', 'pointer', 'drag'
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default to true to prevent SSR flash
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    // Check if device is a touch device (phones/tablets don't need custom cursors)
    if (window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    let requestRef;
    
    // Use requestAnimationFrame for buttery smooth 60fps tracking without lagging the main thread
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseMove = (e) => {
      if (requestRef) cancelAnimationFrame(requestRef);
      requestRef = requestAnimationFrame(() => updatePosition(e));
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      const isClickable = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, .splide__arrow, .splide__pagination__page');
      const isDraggable = target.closest('.splide__list, .splide__track, .cursor-grab');

      if (isClickable) {
        setCursorState('pointer');
      } else if (isDraggable) {
        setCursorState('drag');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseDown = (e) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prevRipples) => [...prevRipples, newRipple]);

      // Remove the ripple after the animation completes
      setTimeout(() => {
        setRipples((prevRipples) => prevRipples.filter((r) => r.id !== newRipple.id));
      }, 1000); 
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mousedown", handleMouseDown, { passive: true });
    
    // Hide when leaving window
    const onMouseLeave = () => setIsVisible(false);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (requestRef) cancelAnimationFrame(requestRef);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  const isPointer = cursorState === 'pointer';
  const isDrag = cursorState === 'drag';

  // Calculate dynamic sizes based on state
  let ringSize = 32;
  if (isPointer) ringSize = 48;
  if (isDrag) ringSize = 52;

  let dotSize = 8;
  if (isPointer) dotSize = 4;
  if (isDrag) dotSize = 0; // Hide inner dot when dragging so we can show text

  return (
    <>
      {/* Click Ripples (Absolute Photorealistic Water Wave) */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <React.Fragment key={ripple.id}>
            {/* Impact Center (The droplet collision point) */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="fixed pointer-events-none z-[9997] rounded-full"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
                background: "rgba(255,255,255,0.2)",
                boxShadow: "0 0 10px rgba(255,255,255,0.5)",
                backdropFilter: "blur(2px)",
              }}
            />

            {/* Layer 1: The Crest (Primary Wave) */}
            <motion.div
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.1, 0.8, 0.3, 1] }}
              className="fixed pointer-events-none z-[9997] rounded-full"
              style={{
                left: ripple.x - 40,
                top: ripple.y - 40,
                width: 80,
                height: 80,
                // Ultra-sharp specular highlight to make it look wet
                background: "radial-gradient(circle, transparent 20%, rgba(255,255,255,0.2) 45%, rgba(0,0,0,0.15) 55%, transparent 70%)",
                boxShadow: "inset 0 0 15px rgba(255,255,255,0.3), inset 0 0 5px rgba(255,255,255,0.6), 0 5px 15px rgba(0,0,0,0.1)",
                backdropFilter: "blur(4px)",
              }}
            />
            
            {/* Layer 2: The Trough (Secondary Wake) */}
            <motion.div
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 2.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: [0.1, 0.8, 0.3, 1], delay: 0.1 }}
              className="fixed pointer-events-none z-[9997] rounded-full"
              style={{
                left: ripple.x - 40,
                top: ripple.y - 40,
                width: 80,
                height: 80,
                background: "radial-gradient(circle, transparent 30%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.05) 60%, transparent 70%)",
                boxShadow: "inset 0 0 8px rgba(255,255,255,0.15)",
                backdropFilter: "blur(2px)",
              }}
            />
          </React.Fragment>
        ))}
      </AnimatePresence>

      {/* Outer Trailing Ring */}
      <div 
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full transition-all duration-75 ease-out flex items-center justify-center font-bold text-primary tracking-widest overflow-hidden
          ${isVisible ? 'opacity-100' : 'opacity-0'} 
          ${isPointer ? 'bg-primary/20 border border-transparent shadow-[0_0_15px_rgba(220,38,38,0.3)]' : ''}
          ${isDrag ? 'bg-primary/20 border border-transparent shadow-[0_0_15px_rgba(220,38,38,0.3)] backdrop-blur-[2px]' : ''}
          ${!isPointer && !isDrag ? 'bg-transparent border border-primary/50' : ''}
        `}
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          transform: `translate3d(${position.x - (ringSize / 2)}px, ${position.y - (ringSize / 2)}px, 0)`,
          willChange: 'transform, width, height'
        }}
      >
        <AnimatePresence>
          {isDrag && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
              className="flex items-center justify-center w-full h-full absolute inset-0"
            >
              {/* Magical Rotating Lens Ring */}
              <motion.div 
                className="absolute inset-[2px] rounded-full border border-dashed border-primary/50"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              />
              
              <motion.div
                className="flex items-center justify-between text-[11px] font-black z-10 w-[22px]"
                animate={{ width: ["12px", "24px", "12px"], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <span>&lt;</span>
                <span>&gt;</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Inner Instant Dot */}
      <div 
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-primary transition-all duration-200 ease-out flex items-center justify-center
          ${isVisible && !isDrag ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          // No delay on transform for the inner dot, it tracks instantly
          transform: `translate3d(${position.x - (dotSize / 2)}px, ${position.y - (dotSize / 2)}px, 0)`,
          willChange: 'transform'
        }}
      />
    </>
  );
}
