'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Package,
    BarChart3,
    ScanBarcode,
    FileText,
    Users,
    Zap,
    ArrowRight,
    CheckCircle2,
    ExternalLink,
    ShieldCheck,
    Globe,
    Layers,
    Receipt,
    TrendingUp,
    Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const highlights = [
    {
        icon: <ScanBarcode className="w-5 h-5" />,
        label: 'Fast Support',
        color: 'text-primary',
        bg: 'bg-primary/5',
    },
    {
        icon: <FileText className="w-5 h-5" />,
        label: 'Clear Documentation',
        color: 'text-primary',
        bg: 'bg-primary/5',
    },
    {
        icon: <Users className="w-5 h-5" />,
        label: 'Dedicated Team',
        color: 'text-primary',
        bg: 'bg-primary/5',
    },
    {
        icon: <BarChart3 className="w-5 h-5" />,
        label: 'Performance Metrics',
        color: 'text-primary',
        bg: 'bg-primary/5',
    },
    {
        icon: <ShieldCheck className="w-5 h-5" />,
        label: 'System Security',
        color: 'text-primary',
        bg: 'bg-primary/5',
    },
    {
        icon: <Globe className="w-5 h-5" />,
        label: 'Remote Access',
        color: 'text-primary',
        bg: 'bg-primary/5',
    },
];

const features = [
    '24/7 technical support for all your systems',
    'Automated monitoring to detect issues early',
    'Regular security patches and updates',
    'Clear and simple performance reports',
    'Dedicated support manager for your account',
    'Fast response times for all requests',
];

const stats = [
    { value: '24/7', label: 'Support Availability', icon: <Receipt className="w-5 h-5 text-primary" /> },
    { value: '99.9%', label: 'Uptime Reliability', icon: <TrendingUp className="w-5 h-5 text-primary" /> },
    { value: 'Fast', label: 'Response Time', icon: <Clock className="w-5 h-5 text-primary" /> },
    { value: 'Pro', label: 'Proactive Management', icon: <Zap className="w-5 h-5 text-primary" /> },
];

const ProductsSection = () => {
    const [hovered, setHovered] = useState(false);

    return (
        <section
            id="products"
            className="w-full relative py-32 overflow-hidden bg-primary text-white"
        >
            {/* Background effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-white/[0.05] blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, #fff 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-20 animate-fade-in-up">
                    <Badge
                        variant="outline"
                        className="mb-5 border-white/20 py-1.5 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-white/60"
                    >
                        <Layers className="w-3 h-3 mr-2" />
                        Our IT Support Tools
                    </Badge>
                    <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tight mb-8">
                        IT Support Tools{' '}
                        <span className="text-white/40 font-light italic">
                            That Just Work.
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 leading-relaxed font-medium">
                        We deploy professional-grade tools to manage, maintain, and protect your business infrastructure, ensuring maximum uptime and security.
                    </p>
                </div>

                {/* Main Product Showcase */}
                <div
                    className={cn(
                        'relative max-w-6xl mx-auto rounded-[3rem] overflow-hidden border border-border transition-all duration-700 animate-fade-in-up bg-white',
                        hovered
                            ? 'shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] -translate-y-1'
                            : 'shadow-2xl'
                    )}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Left panel: Narrative */}
                        <div className="p-10 md:p-16 flex flex-col justify-between gap-12 bg-[#fafafa]">
                            <div>
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-16 h-16 rounded-2xl bg-white border border-primary/10 flex items-center justify-center shadow-xl">
                                        <Package className="w-8 h-8 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
                                            Infrastructure Management
                                        </p>
                                        <h3 className="text-4xl font-black tracking-tighter leading-none text-brand-dark">
                                            Delvare Support
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-muted-foreground text-lg leading-relaxed mb-10 font-medium italic">
                                    "A comprehensive suite for managing your IT, so you can focus on running your business."
                                </p>

                                {/* Feature Set */}
                                <ul className="grid grid-cols-1 gap-4">
                                    {features.map((feat, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-3 text-[15px] text-muted-foreground font-semibold"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Execution CTAs */}
                            <div className="flex flex-wrap gap-5">
                                <Button
                                    size="xl"
                                    className="h-16 bg-primary hover:bg-primary/90 text-white rounded-xl px-10 gap-3 font-bold shadow-xl transition-all duration-300"
                                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    View Services
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Right panel: Technical proof */}
                        <div className="relative p-10 md:p-16 flex flex-col gap-10 bg-white">
                            {/* Performance Metrics */}
                            <div className="grid grid-cols-2 gap-5">
                                {stats.map((stat, i) => (
                                    <div
                                        key={i}
                                        className="bg-secondary/30 border border-border/50 rounded-2xl p-6 flex flex-col gap-3 hover:border-primary/20 transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between">
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <p className="text-3xl font-black text-foreground tracking-tighter">
                                                {stat.value}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                                                {stat.label}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Logic Highlights */}
                            <div className="space-y-6">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
                                    IT Management Engine
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {highlights.map((h, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-4 px-5 py-4 rounded-xl bg-white border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group"
                                        >
                                            <div
                                                className={cn(
                                                    'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-secondary text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300'
                                                )}
                                            >
                                                {h.icon}
                                            </div>
                                            <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                                                {h.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;
