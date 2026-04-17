'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setFadeOut(true), 100);
                    setTimeout(() => setIsLoading(false), 600);
                    return 100;
                }
                const diff = 20 + Math.random() * 20;
                return Math.min(prev + diff, 100);
            });
        }, 60);

        return () => clearInterval(interval);
    }, []);

    if (!isLoading) return null;

    return (
        <div className={cn(
            "fixed inset-0 z-[100000] bg-black flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]",
            fadeOut ? "opacity-0 scale-110 pointer-events-none" : "opacity-100 scale-100"
        )}>
            <div className="relative flex flex-col items-center gap-10">
                {/* Logo with 1s fade in */}
                <div className="relative w-28 h-28 md:w-40 md:h-40 animate-in fade-in zoom-in-75 duration-700">
                    <Logo variant="logo" light className="w-full h-full scale-150" />
                    {/* Pulsing Outer Ring */}
                    <div className="absolute inset-[-20%] border-2 border-primary/20 rounded-full animate-ping opacity-30" />
                </div>

                {/* Progress Bar Container - High Speed */}
                <div className="flex flex-col items-center gap-6 w-64 md:w-96">
                    <div className="w-full h-[2px] bg-white/10 relative overflow-hidden rounded-full">
                        <div
                            className="absolute inset-y-0 left-0 bg-primary transition-all duration-150 ease-out shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20">
                            INITIALIZING_SYSTEM
                        </span>
                        <span className="text-[11px] font-black text-primary tabular-nums tracking-widest">
                            {Math.round(progress)}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Background Texture for Premium Feel */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}
            />
        </div>
    );
};

export default Preloader;
