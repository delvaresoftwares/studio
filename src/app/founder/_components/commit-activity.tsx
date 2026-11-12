'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const COMMIT_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
const WEEKDAYS = ['Mon', '', 'Wed', '', 'Fri', '', ''];
const CELL_COUNT = 84;
const MATRIX_STAGES = 30;
const TICK_MS = 220;

const buildMatrixRamp = () => {
    const from = [22, 46, 36];
    const to = [57, 211, 83];

    return Array.from({ length: MATRIX_STAGES }, (_, index) => {
        const t = index / (MATRIX_STAGES - 1);
        const channels = from.map((start, channel) =>
            Math.round(start + (to[channel] - start) * t)
        );
        return `rgb(${channels.join(', ')})`;
    });
};

const MATRIX_RAMP = buildMatrixRamp();

const buildCells = () =>
    Array.from({ length: CELL_COUNT }, (_, index) => {
        const week = Math.floor(index / 7);
        const day = index % 7;
        const seed = (week * 17 + day * 31 + day * week * 7) % 12;
        const burst = week % 4 === 1 ? 1 : 0;
        const base = seed < 4 ? 0 : seed < 7 ? 1 : seed < 10 ? 2 : 3;
        return Math.min(4, base + burst);
    });

type CommitActivityProps = {
    className?: string;
    animated?: boolean;
};

/**
 * Contribution-style activity grid.
 *
 * The animation only ticks while the grid is on screen and never runs for
 * users who ask for reduced motion, so it costs nothing when scrolled away.
 */
export default function CommitActivity({ className, animated = false }: CommitActivityProps) {
    const [cells, setCells] = useState(buildCells);
    const [isVisible, setIsVisible] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!animated || !container) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { rootMargin: '160px' }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, [animated]);

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const syncPreference = () => setPrefersReducedMotion(query.matches);

        syncPreference();
        query.addEventListener('change', syncPreference);
        return () => query.removeEventListener('change', syncPreference);
    }, []);

    useEffect(() => {
        if (!animated || !isVisible || prefersReducedMotion) return;

        const interval = window.setInterval(() => {
            setCells((previous) =>
                previous.map((level) =>
                    Math.random() < 0.4 ? Math.floor(Math.random() * MATRIX_STAGES) : level
                )
            );
        }, TICK_MS);

        return () => window.clearInterval(interval);
    }, [animated, isVisible, prefersReducedMotion]);

    return (
        <div
            ref={containerRef}
            className={cn('p-4 rounded-2xl bg-[#0a0a0a] border border-white/10', className)}
        >
            <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40">
                    Commit Activity
                </span>
                <span className="flex items-center gap-1" aria-hidden>
                    {COMMIT_COLORS.map((color) => (
                        <span
                            key={color}
                            className="w-2 h-2 rounded-[2px]"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </span>
            </div>

            <div className="flex gap-1.5">
                <div className="grid grid-rows-7 gap-1 text-[8px] font-bold uppercase text-white/30">
                    {WEEKDAYS.map((label, index) => (
                        <div key={index} className="flex items-center h-2.5 leading-none">
                            {label}
                        </div>
                    ))}
                </div>
                <div
                    className="grid grid-rows-7 grid-flow-col gap-1 flex-1"
                    role="img"
                    aria-label="Commit activity over the last twelve weeks"
                >
                    {cells.map((level, index) => (
                        <div
                            key={index}
                            className="w-2.5 h-2.5 rounded-[2px] transition-colors duration-500 ease-in-out hover:ring-1 hover:ring-primary/60"
                            style={{
                                backgroundColor: animated
                                    ? MATRIX_RAMP[level]
                                    : COMMIT_COLORS[Math.min(4, level)],
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="flex justify-between mt-3 text-[8px] font-bold uppercase tracking-widest text-white/30">
                <span>12 Weeks Ago</span>
                <span>Now</span>
            </div>
        </div>
    );
}
