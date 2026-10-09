"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({ children, className = "", magneticPull = 0.3 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    // Calculate the distance from the center of the element
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Apply the magnetic pull factor to determine how far it moves
    setPosition({ x: middleX * magneticPull, y: middleY * magneticPull });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ touchAction: 'none' }}
    >
      {/* 
        The outer div acts as the stable hitbox. 
        The inner motion.div is what actually moves. 
        This prevents the jittering loop that happens if the hitbox moves away from the mouse.
      */}
      <motion.div
        animate={{ x, y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className="w-full h-full flex"
      >
        {children}
      </motion.div>
    </div>
  );
}
