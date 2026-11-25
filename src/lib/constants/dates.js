// Single source of truth for static page modification dates
export const PAGE_LASTMOD = {
  "/": "2026-11-25",
  "/about": "2026-11-25",
  "/services": "2026-11-25",
  "/services/custom-erp-development": "2026-11-25",
  "/services/custom-crm-development": "2026-11-25",
  "/services/web-and-mobile-application-development": "2026-11-25",
  "/services/business-process-automation": "2026-11-25",
  "/services/legacy-software-modernization": "2026-11-25",
  "/services/application-security-audit": "2026-11-25",
  "/work": "2026-11-25",
  "/process": "2026-11-25",
  "/contact": "2026-11-25",
  "/insights": "2026-11-17",
  "/privacy-policy": "2026-11-01",
  "/terms-and-conditions": "2026-11-01",
};

export function toIsoKolkata(dateString) {
  if (!dateString) return undefined;
  return `${dateString}T00:00:00+05:30`;
}
