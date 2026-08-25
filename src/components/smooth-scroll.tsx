'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { ReactNode, useEffect } from 'react';
import { registerLenis } from '@/lib/smooth-scroll';

const LenisRegistrar = () => {
    const lenis = useLenis();

    useEffect(() => {
        registerLenis(lenis ?? null);
        return () => registerLenis(null);
    }, [lenis]);

    return null;
};

export default function SmoothScroll({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root options={{
            duration: 1.1,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            anchors: true,
            infinite: false,
        }}>
            <LenisRegistrar />
            {children}
        </ReactLenis>
    );
}
