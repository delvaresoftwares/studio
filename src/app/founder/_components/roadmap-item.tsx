'use client';

import { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getIcon } from '../icons';
import type { RoadmapEntry } from '../roadmap';

type RoadmapItemProps = {
    item: RoadmapEntry;
    index: number;
    isOpen: boolean;
    onToggle: (index: number) => void;
    /** Collapsed items stay mounted for the height animation, but must not be tabbable. */
    interactive?: boolean;
};

function RoadmapItem({
    item,
    index,
    isOpen,
    onToggle,
    interactive = true,
}: RoadmapItemProps) {
    const Icon = getIcon(item.logo);
    const end = item.toMonth ? `${item.toMonth} ${item.toYear}` : item.toYear;

    return (
        <div className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group">
            <div className="flex items-center absolute left-[1.4375rem] md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-[#030303] bg-primary/20 text-primary justify-center z-10 transition-transform group-hover:scale-110">
                <Icon className="w-5 h-5" aria-hidden />
            </div>

            <div
                role="button"
                tabIndex={interactive ? 0 : -1}
                aria-expanded={isOpen}
                aria-controls={`roadmap-details-${index}`}
                onClick={() => onToggle(index)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        onToggle(index);
                    }
                }}
                className={cn(
                    'w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-auto md:ml-0 p-8 rounded-3xl cursor-pointer select-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303]',
                    isOpen
                        ? 'bg-white/[0.05] border border-primary/30'
                        : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10'
                )}
            >
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black tracking-widest uppercase text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                        {item.fromMonth} {item.fromYear} - {end}
                    </span>
                </div>

                <h3 className="text-2xl font-black text-white tracking-tight mb-3">{item.heading}</h3>

                <p
                    className={cn(
                        'text-sm text-white/50 leading-relaxed font-medium',
                        !isOpen && 'line-clamp-2 mb-6'
                    )}
                >
                    {item.description}
                </p>

                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            id={`roadmap-details-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden"
                        >
                            <div className="flex flex-wrap gap-2 pt-1 pb-6">
                                {item.hashtags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[9px] font-black tracking-widest uppercase text-primary/70 bg-primary/5 px-2 py-1 rounded-md"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">
                    {isOpen ? 'Show Less' : 'Read More'}
                    <ChevronDown
                        className={cn(
                            'w-3 h-3 transition-transform duration-300',
                            isOpen && 'rotate-180'
                        )}
                    />
                </span>
            </div>
        </div>
    );
}

const MemoRoadmapItem = memo(RoadmapItem);
MemoRoadmapItem.displayName = 'RoadmapItem';

export default MemoRoadmapItem;
