'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const AIChatWidget = dynamic(() => import('@/components/ai-chat-widget'), {
  ssr: false,
  loading: () => null,
});

/**
 * Defers the chat widget (and the framer-motion / chat-knowledge code it pulls
 * in) until the browser is idle, or until the visitor shows intent by moving the
 * pointer, scrolling, or pressing a key. The widget is mounted in the root
 * layout, so without this gate its chunk was requested during the first render
 * of every route.
 */
const LazyChatWidget = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const events = ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const;

    let cancelled = false;
    let usedIdleCallback = false;

    const activate = () => {
      if (cancelled) return;
      cancelled = true;
      setReady(true);
      for (const event of events) {
        window.removeEventListener(event, activate);
      }
    };

    let idleId: number;
    if (win.requestIdleCallback) {
      usedIdleCallback = true;
      idleId = win.requestIdleCallback(activate, { timeout: 3000 });
    } else {
      idleId = window.setTimeout(activate, 2500);
    }

    for (const event of events) {
      window.addEventListener(event, activate, { passive: true, once: true });
    }

    return () => {
      cancelled = true;
      if (usedIdleCallback && win.cancelIdleCallback) win.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      for (const event of events) {
        window.removeEventListener(event, activate);
      }
    };
  }, [ready]);

  if (!ready) return null;

  return <AIChatWidget />;
};

export default LazyChatWidget;