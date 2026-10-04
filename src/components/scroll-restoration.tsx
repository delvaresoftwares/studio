'use client';

import { useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { getLenis } from '@/lib/smooth-scroll';
import {
  markInAppNavigation,
  readScrollPosition,
  saveScrollPosition,
} from '@/lib/scroll-restoration';

/** Re-assert the offset across this window, in case a late layout shift or the
 *  router's own focus-and-scroll reset lands after the first attempt. */
const REASSERT_DELAYS = [0, 100, 300, 700];

/** How long after a scroll gesture its offset is still treated as the visitor's. */
const RECORD_WINDOW_MS = 1500;

/**
 * Replays the visitor's scroll offset when they navigate back or forward.
 *
 * Fresh forward navigations still start at the top, which is what the detail
 * pages' own scroll reset expects.
 */
const ScrollRestoration = () => {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const popFromPath = useRef<string | null>(null);
  const timers = useRef<number[]>([]);
  const isFirstRender = useRef(true);

  pathnameRef.current = pathname;

  // Take scroll control away from the browser so it cannot restore an offset
  // behind Lenis's back.
  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return;
    window.history.scrollRestoration = 'manual';
  }, []);

  // Record the offset, but only while the visitor is actually scrolling.
  //
  // A plain scroll listener is not enough: both the router and Lenis clamp the
  // offset back to the top while swapping routes, and recording that would
  // overwrite the outgoing route's position with 0 — destroying the very offset
  // a later back navigation needs. So a scroll is only believed for a short
  // window after real scroll intent (wheel, touch, scroll keys, scrollbar drag),
  // which also covers Lenis's animation tail after the gesture ends.
  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return;

    const SCROLL_KEYS = [' ', 'Spacebar', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'];
    let activeUntil = 0;
    let raf = 0;

    const save = () => {
      raf = 0;
      if (performance.now() > activeUntil) return;
      const current = pathnameRef.current;
      if (current) saveScrollPosition(current, window.scrollY);
    };

    const handleScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(save);
    };

    const openWindow = () => {
      activeUntil = performance.now() + RECORD_WINDOW_MS;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.includes(e.key)) openWindow();
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Scrollbar drags start past the viewport edge and emit no wheel events.
      if (e.clientX >= document.documentElement.clientWidth) openWindow();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', openWindow, { passive: true });
    window.addEventListener('touchmove', openWindow, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', openWindow);
      window.removeEventListener('touchmove', openWindow);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const cancelReassert = useCallback(() => {
    timers.current.forEach((id) => {
      clearTimeout(id);
      cancelAnimationFrame(id);
    });
    timers.current = [];
    popFromPath.current = null;
  }, []);

  /** Jumps to the offset recorded for the route that just came into view. */
  const applyRestore = useCallback(() => {
    const from = popFromPath.current;
    const path = pathnameRef.current;

    // The router commits the incoming route either side of the popstate
    // event, so there is nothing to restore until the path has actually
    // changed — otherwise this would replay the outgoing route's offset.
    if (from === null || path === null || path === from) return;

    const target = readScrollPosition(path);
    if (target === null || target <= 0) return;

    // Late-loading images can leave the document shorter than the stored
    // offset, so never scroll past the end.
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const y = Math.min(target, max);
    const lenis = getLenis();
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(y, { immediate: true, force: true });
    } else {
      window.scrollTo(0, y);
    }
  }, []);

  const scheduleRestore = useCallback(() => {
    cancelReassert();
    popFromPath.current = pathnameRef.current;

    REASSERT_DELAYS.forEach((delay) => {
      timers.current.push(window.setTimeout(applyRestore, delay));
    });
  }, [applyRestore, cancelReassert]);

  useEffect(() => {
    const handlePopState = () => scheduleRestore();

    // A visitor who scrolls during the re-assert window has taken over; leave
    // their position alone.
    const handleIntent = () => cancelReassert();

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('wheel', handleIntent, { passive: true });
    window.addEventListener('touchstart', handleIntent, { passive: true });
    window.addEventListener('keydown', handleIntent);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('wheel', handleIntent);
      window.removeEventListener('touchstart', handleIntent);
      window.removeEventListener('keydown', handleIntent);
      cancelReassert();
    };
  }, [scheduleRestore, cancelReassert]);

  // Runs after the router swaps the tree for the incoming route, covering the
  // case where the route commits before the popstate event is delivered.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    markInAppNavigation();
  }, [pathname]);

  return null;
};

export default ScrollRestoration;