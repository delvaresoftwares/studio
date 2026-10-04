'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { hasInAppNavigation } from '@/lib/scroll-restoration';

/**
 * Back navigation for detail pages.
 *
 * A plain <Link href="/"> pushes a fresh history entry, so the visitor lands on
 * the homepage hero and pressing Back again returns here. Going back through
 * history instead reuses the existing entry, which lets ScrollRestoration
 * replay the offset the visitor left from. Deep links have no in-app entry to
 * return to, so those fall back to a normal navigation.
 */
export function useSmartBack(fallbackHref = '/') {
  const router = useRouter();

  return useCallback(() => {
    if (hasInAppNavigation()) {
      router.back();
      return;
    }
    router.push(fallbackHref);
  }, [router, fallbackHref]);
}