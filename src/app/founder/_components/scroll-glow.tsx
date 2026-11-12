'use client';

import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';

const OFFSCREEN_GLOW =
    'radial-gradient(600px circle at -200px -200px, rgba(16, 185, 129, 0.08), transparent 40%)';

/**
 * Page-level client island: resets scroll on mount and paints the cursor glow
 * by writing to the DOM inside rAF (no React re-render per mouse move).
 */
export default function ScrollGlow() {
    const glowRef = useRef<HTMLDivElement>(null);
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
    }, [lenis]);

    useEffect(() => {
        if (!window.matchMedia('(pointer: fine)').matches) return;

        let frame = 0;
        let x = 0;
        let y = 0;

        const handleMouseMove = (event: MouseEvent) => {
            x = event.clientX;
            y = event.clientY;

            if (frame) return;

            frame = requestAnimationFrame(() => {
                frame = 0;
                if (glowRef.current) {
                    glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.08), transparent 40%)`;
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={glowRef}
            aria-hidden
            className="fixed inset-0 pointer-events-none z-0 opacity-40 transition-opacity duration-300"
            style={{ background: OFFSCREEN_GLOW }}
        />
    );
}
