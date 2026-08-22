'use client';

import { useEffect } from 'react';
import { useLenis } from 'lenis/react';

export const useScrollLock = (active: boolean) => {
  const lenis = useLenis();

  useEffect(() => {
    if (!active) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    lenis?.stop();
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      lenis?.start();
    };
  }, [active, lenis]);
};
