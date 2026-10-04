'use client';

/**
 * Scroll restoration for client-side navigation.
 *
 * The App Router does not restore the scroll offset on history navigation — its
 * only scroll write on a route change is `htmlElement.scrollTop = 0` in the
 * focus-and-scroll path — so a browser Back lands on the top of the previous
 * page. Lenis compounds this by keeping its own animated position, so even a
 * correct native restore gets animated away.
 *
 * Offsets are therefore recorded per route here and replayed by the
 * ScrollRestoration component on back/forward navigations only. Fresh forward
 * navigations are intentionally left at the top.
 */

const POSITION_PREFIX = 'delvare-scroll:';
const IN_APP_NAVIGATION_KEY = 'delvare-in-app-nav';

/** Records where the visitor is on `pathname`. Rounded to avoid float noise. */
export function saveScrollPosition(pathname: string, y: number = window.scrollY) {
  try {
    sessionStorage.setItem(POSITION_PREFIX + pathname, String(Math.round(y)));
  } catch {
    /* private mode or quota exceeded — restoration is best-effort */
  }
}

/** Last recorded offset for `pathname`, or null if the route was never left. */
export function readScrollPosition(pathname: string): number | null {
  try {
    const raw = sessionStorage.getItem(POSITION_PREFIX + pathname);
    if (raw === null) return null;
    const y = parseInt(raw, 10);
    return Number.isFinite(y) ? y : null;
  } catch {
    return null;
  }
}

/**
 * Marks that this session moved between routes inside the app, which means a
 * back button has somewhere in-app to return to. Set from the route-change
 * effect, so a deep link that never navigated in-app stays unmarked and its
 * back button falls back to the homepage instead of leaving the site.
 */
export function markInAppNavigation() {
  try {
    sessionStorage.setItem(IN_APP_NAVIGATION_KEY, '1');
  } catch {
    /* best-effort */
  }
}

export function hasInAppNavigation(): boolean {
  try {
    return sessionStorage.getItem(IN_APP_NAVIGATION_KEY) === '1';
  } catch {
    return false;
  }
}