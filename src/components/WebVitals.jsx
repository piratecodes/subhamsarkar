"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * WebVitals Real User Monitoring (RUM) Reporter
 *
 * Captures Core Web Vitals (LCP, INP, CLS, FCP, TTFB) natively via Next.js.
 * - In Production: Dispatches to GA4 (gtag) and GTM (dataLayer) with zero server overhead.
 * - In Development: Formats and logs scores directly to the browser DevTools console.
 * - Fully CSP-compliant: No external scripts injected; relies on already-whitelisted GA/GTM domains.
 */
export default function WebVitals() {
  useReportWebVitals((metric) => {
    // 1. Local Development Console Feedback
    if (process.env.NODE_ENV === "development") {
      const ratingColor =
        metric.rating === "good"
          ? "#15803d" // Green
          : metric.rating === "needs-improvement"
          ? "#ca8a04" // Amber
          : "#dc2626"; // Red

      const displayVal =
        metric.name === "CLS"
          ? metric.value.toFixed(3)
          : `${Math.round(metric.value)}ms`;

      console.log(
        `%c[Web Vitals] %c${metric.name}%c: ${displayVal} (%c${metric.rating}%c)`,
        "color: #953918; font-weight: bold;",
        "font-weight: bold; color: inherit;",
        "color: inherit;",
        `color: ${ratingColor}; font-weight: bold;`,
        "color: inherit;"
      );
    }

    if (typeof window === "undefined") return;

    // GA4 requires integer values in milliseconds (CLS is multiplied by 1000 for precision)
    const normalizedValue = Math.round(
      metric.name === "CLS" ? metric.value * 1000 : metric.value
    );

    // 2. Dispatch to GTM dataLayer (Primary channel since GA4 is connected via GTM)
    // Ensures dataLayer array exists even if GTM script is still downloading (no metrics lost)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "web_vitals",
      event_category: "Web Vitals",
      metric_name: metric.name,
      metric_value: normalizedValue,
      metric_rating: metric.rating, // 'good' | 'needs-improvement' | 'poor'
      metric_id: metric.id, // unique per pageview
      metric_delta: metric.delta,
    });
  });

  return null;
}

