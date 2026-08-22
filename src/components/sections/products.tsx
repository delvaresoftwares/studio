'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
    ArrowRight,
    Check,
    Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FadeIn, StaggerContainer, StaggerItem, TypingText } from '@/components/ui/motion';

type Product = {
    id: string;
    name: string;
    domain: string;
    badgeLabel: string;
    tagline: string;
    description: string;
    bgImage: string;
    tintClasses: string;
    badgeClasses: string;
    chipIconClasses: string;
    features: string[];
};

const products: Product[] = [
    {
        id: 'ecbills',
        name: 'ECBills.in',
        domain: 'ecbills.in',
        badgeLabel: 'Intelligent & Rapid Billing System',
        tagline: 'Billing & Inventory, Perfected.',
        description:
            'Our flagship PaaS platform that completely automates retail and enterprise operations. Built for infinite retail scale, precision inventory tracking and high-availability selling.',
        bgImage: '/assets/products/ecbills-bg.jpg',
        tintClasses: 'bg-gradient-to-br from-emerald-500/50 to-cyan-600/40',
        badgeClasses: 'border-emerald-300/30 bg-emerald-400/15 text-emerald-100',
        chipIconClasses: 'text-emerald-300',
        features: ['Fast & Easy Billing', 'Live Stock Tracking', 'Multi-Store & Staff', 'Secure Cloud Sync'],
    },
    {
        id: 'blendly',
        name: 'Blendly.sbs',
        domain: 'blendly.sbs',
        badgeLabel: 'Social Network for Literature Lovers',
        tagline: 'Where Readers Meet.',
        description:
            'A community-driven platform to lend books nearby and read poetry online. Connecting readers, fostering sharing and building a culture of knowledge exchange.',
        bgImage: '/assets/products/blendly-bg.jpg',
        tintClasses: 'bg-gradient-to-br from-violet-500/45 to-pink-500/35',
        badgeClasses: 'border-violet-300/30 bg-violet-400/15 text-violet-100',
        chipIconClasses: 'text-violet-300',
        features: ['Lend & Borrow Books', 'Read & Write Poetry', 'Discover Nearby Readers'],
    },
];

const ProductCard = ({ product }: { product: Product }) => (
    <StaggerItem className="h-full">
        <Link
            href={`/main/${product.id}`}
            aria-label={`${product.name} — click to see more`}
            className="group block h-full focus-visible:outline-none"
        >
            <div
                className={cn(
                    'relative h-full min-h-[27rem] sm:min-h-[31rem] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-md',
                    'hover:shadow-[0_25px_70px_-20px_rgba(16,185,129,0.4)] hover:border-primary/40',
                    'transition-all duration-500'
                )}
            >
                {/* Beautiful background */}
                <img
                    src={product.bgImage}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Readability gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/25" />
                {/* Brand tint that warms up on hover */}
                <div className={cn('absolute inset-0 mix-blend-overlay opacity-60 group-hover:opacity-100 transition-opacity duration-700', product.tintClasses)} />

                {/* Details within the card */}
                <div className="relative z-10 flex h-full flex-col justify-end p-7 sm:p-9 text-left">
                    <span className={cn('self-start rounded-full border backdrop-blur-sm px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em]', product.badgeClasses)}>
                        {product.badgeLabel}
                    </span>

                    <h3 className="mt-4 font-headline text-3xl sm:text-4xl font-black tracking-tighter text-white leading-none break-words">
                        {product.name}
                    </h3>
                    <p className="mt-2.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-white/70">
                        {product.tagline}
                    </p>

                    <p className="mt-4 text-sm text-white/75 leading-relaxed font-medium line-clamp-3">
                        {product.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {product.features.map((feature) => (
                            <span key={feature} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-white/90">
                                <Check className={cn('w-3 h-3 shrink-0', product.chipIconClasses)} />
                                {feature}
                            </span>
                        ))}
                    </div>

                    <div className="mt-7 inline-flex self-start items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg transition-all duration-300 group-hover:bg-primary group-hover:gap-3">
                        Click to see more
                        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                </div>
            </div>
        </Link>
    </StaggerItem>
);

const ProductsSection = () => {
    return (
        <section id="products" className="w-full relative py-20 md:py-28 overflow-hidden bg-white">
            <div className="container mx-auto px-4 relative z-10">
                <FadeIn delay={0.1} className="text-center mb-12 md:mb-16">
                    <Badge variant="outline" className="mb-5 border-primary/20 py-1.5 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-primary/70 bg-primary/5">
                        <Layers className="w-3 h-3 mr-2" />
                        Standing Out in the Crowd
                    </Badge>
                    <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 leading-[1.05]">
                        <TypingText text="Products by " delay={0.1} />{' '}
                        <br className="sm:hidden" />
                        <span className="text-primary/60 font-light italic">Delvare</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed font-medium">
                        Beyond client services, we ship our own platforms. Click a product to see everything it offers.
                    </p>
                </FadeIn>

                <StaggerContainer
                    staggerDelay={0.12}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch"
                >
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
};

export default ProductsSection;
