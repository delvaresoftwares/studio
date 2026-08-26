'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { trackClickAction } from '@/app/actions';

const SESSION_ID_KEY = 'delvare-visitor-id';

const getSessionId = (): string => {
  try {
    let id = localStorage.getItem(SESSION_ID_KEY);
    if (!id) {
      id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `v-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(SESSION_ID_KEY, id);
    }
    return id;
  } catch {
    return 'anonymous';
  }
};

export function useTrackClick(buttonId: string) {
  const pathname = usePathname();

  const trackClick = useCallback(() => {
    trackClickAction(buttonId, pathname || '/', getSessionId()).catch(() => {
      /* analytics must never break the page */
    });
  }, [buttonId, pathname]);

  return trackClick;
}
