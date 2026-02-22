'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Cpu, Cloud, Code2, Globe, HardDrive, ShieldCheck, LifeBuoy } from 'lucide-react';

const keywordItems = [
    { text: "AI", icon: <Cpu className="w-8 h-8 md:w-12 md:h-12" /> },
    { text: "Cloud", icon: <Cloud className="w-8 h-8 md:w-12 md:h-12" /> },
    { text: "Softwares", icon: <Code2 className="w-8 h-8 md:w-12 md:h-12" /> },
    { text: "Websites", icon: <Globe className="w-8 h-8 md:w-12 md:h-12" /> },
    { text: "Hardware", icon: <HardDrive className="w-8 h-8 md:w-12 md:h-12" /> },
    { text: "Engineering", icon: <ShieldCheck className="w-8 h-8 md:w-12 md:h-12" /> },
    { text: "Support", icon: <LifeBuoy className="w-8 h-8 md:w-12 md:h-12" /> },
];

const KeywordMarquee = () => {
    return (
        <section className="w-full py-20 overflow-hidden bg-background relative border-y border-foreground/5 dark:border-white/5">
            {/* Decorative background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="flex flex-col gap-12 relative z-10">
                {/* Row 1: Smooth Forward */}
                <div className="relative rotate-[-2deg] scale-110">
                    <div className="flex whitespace-nowrap animate-marquee">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex gap-16 items-center px-8">
                                {keywordItems.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 text-foreground/10 dark:text-white/20 hover:text-emerald-500/40 transition-colors duration-500 cursor-default">
                                        <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                                            {item.text}
                                        </span>
                                        <div className="text-emerald-500/30">
                                            {item.icon}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2: Smooth Reverse */}
                <div className="relative rotate-[2deg] scale-110 -mt-4">
                    <div className="flex whitespace-nowrap animate-marquee-reverse">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex gap-16 items-center px-8">
                                {keywordItems.map((item, idx) => (
                                    <div key={idx+2} className="flex items-center gap-4 text-foreground/10 dark:text-white/20 hover:text-emerald-500/40 transition-colors duration-500 cursor-default">
                                        <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                                            {item.text}
                                        </span>
                                        <div className="text-emerald-500/30">
                                            {item.icon}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floating Center Overlay (Optional but nice for depth) */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none flex justify-center">
                    <div className="flex gap-4 opacity-50">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
                        <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping delay-300" />
                        <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping delay-700" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KeywordMarquee;
