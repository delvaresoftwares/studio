'use client';

import { useCallback, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { roadmap } from '../roadmap';
import Eyebrow from './eyebrow';
import RoadmapItem from './roadmap-item';

const INITIAL_VISIBLE = 3;

export default function RoadmapSection() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [listExpanded, setListExpanded] = useState(false);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);
    const lenis = useLenis();

    const toggleItem = useCallback((index: number) => {
        setExpandedIndex((current) => (current === index ? null : index));
    }, []);

    const toggleList = () => {
        const button = toggleButtonRef.current;
        const topBefore = button?.getBoundingClientRect().top ?? 0;
        const nextExpanded = !listExpanded;

        setListExpanded(nextExpanded);

        if (nextExpanded) return;

        // Collapsing removes the cards above the button. Measure the shift on
        // the next frame and correct the scroll so the button stays put.
        requestAnimationFrame(() => {
            const currentButton = toggleButtonRef.current;
            if (!currentButton) return;

            const delta = currentButton.getBoundingClientRect().top - topBefore;
            const target = (lenis ? lenis.scroll : window.scrollY) + delta;

            if (lenis) lenis.scrollTo(target, { immediate: true });
            else window.scrollTo({ top: target, behavior: 'auto' });
        });
    };

    return (
        <section className="scroll-mt-24 py-24 relative border-b border-white/5">
            <div className="container max-w-5xl mx-auto px-4">
                <div className="mb-20 text-center">
                    <Eyebrow className="mb-6">My Experience</Eyebrow>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">
                        Career <span className="text-primary italic font-light">Roadmap.</span>
                    </h2>
                </div>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.375rem] md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {roadmap.slice(0, INITIAL_VISIBLE).map((item, index) => (
                        <RoadmapItem
                            key={item.heading}
                            item={item}
                            index={index}
                            isOpen={expandedIndex === index}
                            onToggle={toggleItem}
                        />
                    ))}

                    <div
                        id="roadmap-rest"
                        aria-hidden={!listExpanded}
                        className={cn(
                            'grid',
                            listExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        )}
                    >
                        <div className="overflow-hidden min-h-0">
                            <div className="space-y-8">
                                {roadmap.slice(INITIAL_VISIBLE).map((item, index) => {
                                    const itemIndex = index + INITIAL_VISIBLE;

                                    return (
                                        <RoadmapItem
                                            key={item.heading}
                                            item={item}
                                            index={itemIndex}
                                            isOpen={expandedIndex === itemIndex}
                                            onToggle={toggleItem}
                                            interactive={listExpanded}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {roadmap.length > INITIAL_VISIBLE && (
                        <div className="pt-2 text-center">
                            <Button
                                ref={toggleButtonRef}
                                onClick={toggleList}
                                aria-expanded={listExpanded}
                                aria-controls="roadmap-rest"
                                className="h-12 px-8 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all inline-flex items-center gap-2"
                            >
                                {listExpanded ? 'Collapse' : 'Expand'}
                                <ChevronDown
                                    className={cn(
                                        'w-4 h-4 transition-transform duration-300',
                                        listExpanded && 'rotate-180'
                                    )}
                                />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
