"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/tracking";
import { usePathname } from "next/navigation";

export default function PageTracker({ pageType }) {
  const pathname = usePathname();
  const trackedScroll = useRef(false);

  useEffect(() => {
    // 1. Fire page_view immediately on mount (if applicable)
    if (pageType === "services" || pageType === "work" || pageType === "contact") {
      trackEvent("page_view", pathname);
    }

    // 2. Setup scroll listener for insights
    if (pageType === "insight") {
      const handleScroll = () => {
        if (trackedScroll.current) return;
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent >= 60) {
          trackedScroll.current = true;
          trackEvent("scroll_depth", pathname, Math.round(scrollPercent));
          window.removeEventListener("scroll", handleScroll);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname, pageType]);

  return null;
}
