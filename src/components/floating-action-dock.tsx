'use client';

import { useState, useEffect } from 'react';
import {
    ChevronUp,
    X,
    Zap,
    Calculator,
    MessageCircle,
    FileText,
    ArrowUpRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/site-config';
import { generatePDF } from '@/lib/pdf-generator';

const FloatingActionDock = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const actions = [
        {
            id: 'whatsapp',
            icon: <MessageCircle className="w-6 h-6" />,
            label: 'Executive Support',
            color: 'bg-primary',
            onClick: () => window.open(siteConfig.contact.whatsapp, '_blank')
        },
        {
            id: 'learning',
            icon: <Zap className="w-6 h-6" />,
            label: 'Training Hub',
            color: 'bg-primary',
            onClick: () => window.dispatchEvent(new CustomEvent('open-learning-hub'))
        },
        {
            id: 'estimator',
            icon: <Calculator className="w-6 h-6" />,
            label: 'Core Estimator',
            color: 'bg-primary',
            onClick: () => window.dispatchEvent(new CustomEvent('open-estimator'))
        },
        {
            id: 'catalog',
            icon: <FileText className="w-6 h-6" />,
            label: 'Full Catalog',
            color: 'bg-primary',
            onClick: () => generatePDF('catalog-pdf-template', 'Delvare_Executive_Catalog')
        }
    ];

    return (
        <div className={cn(
            "fixed bottom-8 right-8 z-[90] flex flex-col items-end gap-4 transition-all duration-700",
            scrolled ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        )}>
            {/* Action Buttons Layer */}
            <div className={cn(
                "flex flex-col gap-4 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
            )}>
                {actions.map((action, idx) => (
                    <div
                        key={action.id}
                        className="flex items-center gap-4 group cursor-pointer"
                        style={{
                            transitionDelay: `${idx * 100}ms`,
                            transform: isOpen ? 'translateY(0)' : 'translateY(20px)'
                        }}
                        onClick={() => {
                            action.onClick();
                            setIsOpen(false);
                        }}
                    >
                        {/* Chat Bubble Description */}
                        <div className={cn(
                            "bg-primary text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 transform origin-right group-hover:scale-105 group-hover:bg-primary group-hover:border-primary/20 relative",
                            isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
                        )}>
                            {action.label}
                            {/* Small Arrow Pointer */}
                            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-primary rotate-45 border-r border-t border-white/10 transition-colors" />
                        </div>
                        <div className={cn(
                            "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 relative",
                            action.color,
                            isOpen ? "scale-100" : "scale-0"
                        )}>
                            {action.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Trigger FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl border border-white/10 group overflow-hidden",
                    isOpen ? "bg-white text-brand-dark rotate-180" : "bg-primary text-white"
                )}
            >
                {isOpen ? (
                    <X className="w-8 h-8" />
                ) : (
                    <ChevronUp className="w-8 h-8 group-hover:-translate-y-1 transition-transform" />
                )}

                {!isOpen && (
                    <div className="absolute inset-0 bg-primary/20 animate-ping opacity-20 pointer-events-none rounded-2xl" />
                )}
            </button>
        </div>
    );
};

export default FloatingActionDock;
