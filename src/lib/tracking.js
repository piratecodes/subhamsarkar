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
