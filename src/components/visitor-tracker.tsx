'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackVisitAction } from '@/app/actions';

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

const VisitorTracker = () => {
    const pathname = usePathname();
    const lastTracked = useRef<string | null>(null);

    useEffect(() => {
        if (!pathname || pathname.startsWith('/admin')) return;
        if (lastTracked.current === pathname) return;
        lastTracked.current = pathname;

        trackVisitAction(pathname, getSessionId()).catch(() => {
            /* analytics must never break the page */
        });
    }, [pathname]);

    return null;
};

export default VisitorTracker;
