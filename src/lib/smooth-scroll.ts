'use client';

import type Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
    lenisInstance = instance;
}

type ScrollOptions = {
    offset?: number;
    immediate?: boolean;
    duration?: number;
};

/**
 * Lenis-aware scroll helper. All programmatic scrolling on the site must go
 * through this — native window.scrollTo / scrollIntoView fight Lenis's
 * animated position and produce visible jumps/jitter.
 */
export function smoothScrollTo(
    target: number | string | HTMLElement,
    options: ScrollOptions = {}
) {
    const { offset = 0, immediate = false, duration } = options;

    if (lenisInstance) {
        lenisInstance.scrollTo(target as never, { offset, immediate, duration });
        return;
    }

    if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
    } else if (typeof target === 'string') {
        document.querySelector(target)?.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
    } else {
        target.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
    }
}
