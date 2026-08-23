'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/ui/motion';

export type FaqItem = {
    question: string;
    answer: string;
};

const FaqRow = ({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) => (
    <div
        className={cn(
            'bg-white rounded-2xl border transition-all duration-300 overflow-hidden',
            isOpen ? 'border-primary/40 shadow-md' : 'border-border/70 hover:border-primary/25 hover:shadow-sm'
        )}
    >
        <button
            onClick={onToggle}
            aria-expanded={isOpen}
            className="w-full flex items-center gap-4 p-4 sm:p-5 text-left cursor-pointer"
        >
            <span className={cn(
                'flex-grow min-w-0 text-sm sm:text-base font-black tracking-tight transition-colors',
                isOpen ? 'text-primary' : 'text-foreground'
            )}>
                {item.question}
            </span>
            <ChevronDown className={cn(
                'w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-300',
                isOpen && 'rotate-180 text-primary'
            )} />
        </button>
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                >
                    <p className="px-4 sm:px-5 pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                        {item.answer}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const ServiceFaq = ({
    faqs,
    title = 'Questions, answered.',
    subtitle = 'The things clients ask us most about this service — click any question to see the answer.',
    className,
}: {
    faqs?: FaqItem[];
    title?: string;
    subtitle?: string;
    className?: string;
}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!faqs || faqs.length === 0) return null;

    return (
        <section className={cn('py-20 bg-[#fafafa]', className)}>
            <div className="container mx-auto px-4 max-w-3xl">
                <FadeIn className="text-center mb-10 md:mb-14">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-5">
                        <MessageCircleQuestion className="w-6 h-6" />
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-[1.05]">
                        {title.split(' ')[0]}{' '}
                        <span className="text-primary italic font-light">{title.split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <p className="mt-4 text-base text-muted-foreground font-medium max-w-xl mx-auto">
                        {subtitle}
                    </p>
                </FadeIn>

                <FadeIn delay={0.1} className="space-y-3">
                    {faqs.map((item, idx) => (
                        <FaqRow
                            key={item.question}
                            item={item}
                            isOpen={openIndex === idx}
                            onToggle={() => setOpenIndex(prev => (prev === idx ? null : idx))}
                        />
                    ))}
                </FadeIn>
            </div>
        </section>
    );
};

export default ServiceFaq;
