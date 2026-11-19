export async function trackEvent(eventType, page, scrollPercent = null) {
  try {
    // Get or create anonymous session ID
    let sessionId = localStorage.getItem('visitor_session_id');
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      localStorage.setItem('visitor_session_id', sessionId);
    }

    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType,
        page,
        scrollPercent,
        sessionId
      })
    });
  } catch (err) {
    // Silent fail for analytics
    console.error('Tracking failed:', err);
  }
}

/**
 * Standard GA4 Lead Conversion Event (generate_lead)
 * Tracks actual business inquiries across WhatsApp, direct email, and contact form.
 */
export function trackLeadConversion({ method, source = "website", details = {} }) {
  try {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "generate_lead",
        lead_method: method, // 'form' | 'whatsapp' | 'email'
        lead_source: source, // 'contact_page' | 'floating_hub' | 'footer'
        page_path: window.location.pathname,
        ...details,
      });

      if (process.env.NODE_ENV === "development") {
        console.log(
          `%c[Lead Conversion] %c${method.toUpperCase()}%c via ${source}`,
          "color: #15803d; font-weight: bold;",
          "color: #953918; font-weight: bold;",
          "color: inherit;"
        );
      }
    }
  } catch (err) {
    // Silent fail for analytics
  }
}

/**
 * Standard Mid-Funnel CTA Click Event (cta_click)
 * Tracks high-intent button clicks navigating prospects to the contact/booking page.
 */
export function trackCtaClick({ cta_name, destination = "/contact" }) {
  try {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "cta_click",
        cta_name,
        destination,
        page_path: window.location.pathname,
      });

      if (process.env.NODE_ENV === "development") {
        console.log(
          `%c[CTA Click] %c${cta_name}%c ➔ ${destination}`,
          "color: #2563eb; font-weight: bold;",
          "color: #953918; font-weight: bold;",
          "color: inherit;"
        );
      }
    }
  } catch (err) {
    // Silent fail for analytics
  }
}

