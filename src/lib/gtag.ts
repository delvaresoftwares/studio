'use client';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type GtagParams = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: unknown;
};

/** Fires a GA4 event if the page's gtag() is available. Never throws. */
export function trackEvent(name: string, params?: GtagParams): void {
  try {
    if (typeof window === 'undefined') return;
    window.gtag?.('event', name, params ?? {});
  } catch {
    /* analytics must never break the page */
  }
}

/** Fires a GA4 page_view manually (used when navigation bypasses History API). */
export function trackPageView(path: string): void {
  try {
    if (typeof window === 'undefined') return;
    window.gtag?.('event', 'page_view', { page_path: path });
  } catch {
    /* analytics must never break the page */
  }
}