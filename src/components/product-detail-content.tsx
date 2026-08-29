'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    ArrowUpRight,
    Calendar,
    Check,
    Receipt,
    BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { products } from '@/components/sections/products';
import ServiceFaq from '@/components/service-faq';
import { useLenis } from 'lenis/react';

const productIconMap: Record<string, any> = {
    ecbills: Receipt,
    blendly: BookOpen,
};

const accents: Record<string, { stat: string; softBg: string; softBorder: string; heading: string }> = {
    ecbills: {
        stat: 'text-emerald-400',
        softBg: 'bg-emerald-500/10',
        softBorder: 'hover:border-emerald-300',
        heading: 'text-primary',
    },
    blendly: {
        stat: 'text-violet-400',
        softBg: 'bg-violet-500/10',
        softBorder: 'hover:border-violet-300',
        heading: 'text-violet-600',
    },
};

interface ProductDetailContentProps {
    data: any;
}

const ProductDetailContent = ({ data }: ProductDetailContentProps) => {
    const lenis = useLenis();
    const product = products.find(p => p.id === data?.slug);
    const Icon = productIconMap[data?.slug];
    const accent = accents[data?.slug] ?? accents.ecbills;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (lenis) lenis.scrollTo(0, { immediate: true });
            else window.scrollTo(0, 0);
        }, 10);
        return () => clearTimeout(timer);
    }, [data?.slug, lenis]);

    if (!product || !Icon) return null;

    return (
        <div className="flex flex-col min-h-screen bg-white text-foreground">
            <Header />

            <main className="flex-grow">
                {/* Cinematic hero — same language as the showcase cards */}
                <section className="relative min-h-screen flex items-end overflow-hidden">
                    <img
                        src={product.bgImage}
                        alt=""
                        aria-hidden
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
                    <div className={cn('absolute inset-0 mix-blend-overlay opacity-70', product.tintClasses)} />

                    {/* Ambient geometry */}
                    <div className="absolute -top-32 -right-32 w-[26rem] h-[26rem] sm:w-[34rem] sm:h-[34rem] border-[18px] sm:border-[24px] border-white/10 rounded-full animate-[spin_16s_linear_infinite]" />
                    <div className="absolute top-1/3 -left-40 w-[22rem] h-[22rem] border border-white/15 rounded-full" />
                    <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage:
                                'repeating-linear-gradient(0deg, transparent, transparent 1px, white 1px, white 2px)',
                            backgroundSize: '100% 4px',
                        }}
                    />

                    <Link
                        href="/"
                        aria-label="Go back"
                        className="absolute top-28 left-4 sm:left-8 z-20 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all shadow-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>

                    <div className="container mx-auto px-4 relative z-10 pb-16 sm:pb-24 pt-44">
                        <div className="max-w-3xl">
                            <FadeIn>
                                <span
                                    className={cn(
                                        'inline-flex items-center gap-2 rounded-full border backdrop-blur-sm px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em]',
                                        product.badgeClasses
                                    )}
                                >
                                    <span className={cn('h-1.5 w-1.5 rounded-full animate-pulse', product.chipIconClasses.replace('text-', 'bg-'))} />
                                    {product.badgeLabel}
                                </span>
                            </FadeIn>

                            <FadeIn delay={0.08}>
                                <h1 className="mt-5 font-headline text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white leading-[0.95] break-words">
                                    {product.name}
                                </h1>
                            </FadeIn>

                            <FadeIn delay={0.16}>
                                <p className="mt-4 text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-white/70">
                                    {product.tagline}
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.24}>
                                <p className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed font-medium max-w-2xl">
                                    {data.detailedDescription || product.description}
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.32}>
                                <div className="mt-7 flex flex-wrap gap-2">
                                    {product.features.map(feature => (
                                        <span
                                            key={feature}
                                            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-white/90"
                                        >
                                            <Check className={cn('w-3 h-3 shrink-0', product.chipIconClasses)} />
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.4}>
                                <div className="mt-9 flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={`https://${product.domain}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-xl bg-white text-black hover:bg-primary hover:text-white text-[11px] font-black uppercase tracking-[0.15em] shadow-lg transition-all duration-300 hover:-translate-y-1"
                                    >
                                        Visit {product.domain} <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                    <Button
                                        size="lg"
                                        onClick={() =>
                                            window.dispatchEvent(
                                                new CustomEvent('open-contact-form', { detail: { type: 'contact' } })
                                            )
                                        }
                                        className="px-8 h-14 rounded-xl bg-white/10 backdrop-blur-md border border-white/25 text-white hover:bg-primary hover:border-primary text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-1"
                                    >
                                        Schedule Meeting <Calendar className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Stats strip */}
                <section className="bg-black py-12">
                    <StaggerContainer
                        staggerDelay={0.1}
                        className="container mx-auto px-4 grid grid-cols-3 gap-6 max-w-4xl text-center"
                    >
                        {(data.stats ?? []).map((stat: { label: string; value: string }) => (
                            <StaggerItem key={stat.label}>
                                <p className={cn('font-headline text-2xl sm:text-4xl font-black tracking-tighter italic', accent.stat)}>
                                    {stat.value}
                                </p>
                                <p className="mt-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
                                    {stat.label}
                                </p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </section>

                {/* Feature deep-dive */}
                <section className="py-20 md:py-28 bg-white overflow-hidden">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <FadeIn className="text-center mb-12 md:mb-16">
                            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                                The Toolkit
                            </p>
                            <h2 className="font-headline mt-3 text-3xl sm:text-5xl font-black tracking-tighter leading-[1.05]">
                                Everything{' '}
                                <span className={cn('italic font-light', accent.heading)}>
                                    {product.name}
                                </span>{' '}
                                does
                            </h2>
                        </FadeIn>

                        <StaggerContainer
                            staggerDelay={0.08}
                            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                        >
                            {(data.featureDefinitions ??
                                (data.features ?? []).map((f: string) => ({ title: f, definition: '' }))).map(
                                    (feat: { title: string; definition: string }, i: number) => (
                                        <StaggerItem key={i} className="h-full">
                                            <div
                                                className={cn(
                                                    'group h-full bg-white p-6 rounded-3xl border border-border shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1',
                                                    accent.softBorder
                                                )}
                                            >
                                                <div
                                                    className={cn(
                                                        'h-11 w-11 rounded-2xl flex items-center justify-center transition-colors duration-500 group-hover:bg-primary group-hover:text-white',
                                                        accent.softBg
                                                    )}
                                                >
                                                    <Icon className="w-5 h-5 text-current" />
                                                </div>
                                                <p className="mt-5 font-black text-sm sm:text-base tracking-tight text-foreground">
                                                    {feat.title}
                                                </p>
                                                <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                                                    {feat.definition}
                                                </p>
                                            </div>
                                        </StaggerItem>
                                    )
                                )}
                        </StaggerContainer>
                    </div>
                </section>

                {/* Product FAQs — unique questions per product */}
                <ServiceFaq
                    faqs={data.faqs}
                    title={`${product.name} — FAQs`}
                    subtitle={`Real questions people ask before using ${product.name}. Click any question to see the answer.`}
                />

                {/* Closing CTA band */}
                <section className="relative py-24 overflow-hidden">
                    <img src={product.bgImage} alt="" aria-hidden loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/75" />
                    <div className={cn('absolute inset-0 mix-blend-overlay opacity-60', product.tintClasses)} />
                    <FadeIn className="container mx-auto px-4 relative z-10 text-center">
                        <h2 className="font-headline text-3xl sm:text-5xl font-black tracking-tighter text-white leading-tight max-w-3xl mx-auto break-words">
                            Experience{' '}
                            <span className="italic font-light">{product.name}</span>{' '}
                            live today.
                        </h2>
                        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href={`https://${product.domain}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-9 h-14 rounded-xl bg-white text-black hover:bg-primary hover:text-white text-[11px] font-black uppercase tracking-[0.15em] shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                Launch Platform <ArrowUpRight className="w-4 h-4" />
                            </a>
                            <Button
                                size="lg"
                                onClick={() =>
                                    window.dispatchEvent(
                                        new CustomEvent('open-contact-form', { detail: { type: 'contact' } })
                                    )
                                }
                                className="px-9 h-14 rounded-xl bg-white/10 backdrop-blur-md border border-white/25 text-white hover:bg-primary hover:border-primary text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-1"
                            >
                                Talk to Us <Calendar className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </FadeIn>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetailContent;
