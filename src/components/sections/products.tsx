'use client';

import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Receipt,
    BookOpen,
    Zap,
    Users,
    PieChart,
    Package,
    MessageSquare,
    Cloud,
    MapPin,
    Feather,
    HeartHandshake,
    ExternalLink,
    ArrowRight,
    Layers,
    Heart,
    Bookmark,
    Lock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FadeIn, StaggerContainer, StaggerItem, TypingText } from '@/components/ui/motion';

const getFaviconUrl = (domain: string) =>
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

type ProductFeature = {
    icon: ReactNode;
    title: string;
    desc: string;
};

type Product = {
    id: string;
    name: string;
    domain: string;
    url: string;
    badgeLabel: string;
    tagline: string;
    description: string;
    quote: string;
    ctaLabel: string;
    icon: ReactNode;
    panelGradient: string;
    badgeClasses: string;
    iconBoxClasses: string;
    glowGradient: string;
    features: ProductFeature[];
    visual: 'screenshot' | 'blendly';
};

const products: Product[] = [
    {
        id: 'ecbills',
        name: 'ECBills.in',
        domain: 'ecbills.in',
        url: 'https://ecbills.in',
        badgeLabel: 'Intelligent & Rapid Billing System',
        tagline: 'Billing & Inventory, Perfected.',
        description:
            'Our flagship PaaS platform that completely automates retail and enterprise operations. Built for infinite retail scale, precision inventory tracking and high-availability selling.',
        quote: '"From billing counter to balance sheet — one seamless system."',
        ctaLabel: 'Explore ECBills.in',
        icon: <Receipt className="w-7 h-7 sm:w-8 sm:h-8 text-white" />,
        panelGradient: 'bg-gradient-to-br from-emerald-500/[0.07] via-cyan-50 to-emerald-100/40',
        badgeClasses: 'border-primary/20 bg-primary/5 text-primary',
        iconBoxClasses: 'bg-gradient-to-br from-emerald-500 to-cyan-600 shadow-lg shadow-emerald-500/25',
        glowGradient: 'bg-gradient-to-tr from-emerald-400/25 via-cyan-300/20 to-transparent',
        features: [
            {
                icon: <Zap className="w-5 h-5 text-primary" />,
                title: 'Fast & Easy Billing',
                desc: 'Rapid checkouts built for busy counters.',
            },
            {
                icon: <Users className="w-5 h-5 text-primary" />,
                title: 'Multi-Store & Staff',
                desc: 'Role-based access across locations.',
            },
            {
                icon: <PieChart className="w-5 h-5 text-primary" />,
                title: 'Accounting & Reports',
                desc: 'Deep financial insights on demand.',
            },
            {
                icon: <Package className="w-5 h-5 text-primary" />,
                title: 'Live Stock Tracking',
                desc: 'Real-time inventory, zero discrepancies.',
            },
            {
                icon: <MessageSquare className="w-5 h-5 text-primary" />,
                title: 'Built-in Team Chat',
                desc: 'Instant admin-to-staff messaging.',
            },
            {
                icon: <Cloud className="w-5 h-5 text-primary" />,
                title: 'Secure Cloud Sync',
                desc: 'Encrypted sync across every device.',
            },
        ],
        visual: 'screenshot',
    },
    {
        id: 'blendly',
        name: 'Blendly.sbs',
        domain: 'blendly.sbs',
        url: 'https://blendly.sbs',
        badgeLabel: 'Social Network for Literature Lovers',
        tagline: 'Where Readers Meet.',
        description:
            'A community-driven platform to lend books nearby and read poetry online. Connecting readers, fostering sharing and building a culture of knowledge exchange.',
        quote: '"Every book on your shelf is a story someone nearby is waiting for."',
        ctaLabel: 'Visit Blendly',
        icon: <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-white" />,
        panelGradient: 'bg-gradient-to-br from-violet-500/[0.07] via-pink-50 to-violet-100/40',
        badgeClasses: 'border-violet-500/20 bg-violet-500/5 text-violet-600',
        iconBoxClasses: 'bg-gradient-to-br from-violet-500 to-pink-500 shadow-lg shadow-violet-500/25',
        glowGradient: 'bg-gradient-to-tr from-violet-400/25 via-pink-300/20 to-transparent',
        features: [
            {
                icon: <BookOpen className="w-5 h-5 text-violet-600" />,
                title: 'Lend & Borrow Books',
                desc: 'Share titles with readers near you.',
            },
            {
                icon: <Feather className="w-5 h-5 text-violet-600" />,
                title: 'Read & Write Poetry',
                desc: 'A home for verse, online.',
            },
            {
                icon: <MapPin className="w-5 h-5 text-violet-600" />,
                title: 'Discover Nearby Readers',
                desc: 'Find bibliophiles around you.',
            },
            {
                icon: <HeartHandshake className="w-5 h-5 text-violet-600" />,
                title: 'Community Driven',
                desc: 'Knowledge exchange, powered by people.',
            },
        ],
        visual: 'blendly',
    },
];

const BrowserFrame = ({ domain }: { domain: string }) => (
    <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-border bg-white/80 backdrop-blur-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <div className="flex items-center gap-1.5 ml-2 flex-1 min-w-0 max-w-[220px] rounded-full bg-secondary/70 border border-border/60 px-3 py-1">
            <Lock className="w-2.5 h-2.5 text-muted-foreground shrink-0" />
            <span className="text-[9px] sm:text-[10px] font-bold text-muted-foreground truncate">{domain}</span>
        </div>
    </div>
);

const EcbillVisual = ({ product }: { product: Product }) => (
    <div className="relative w-full max-w-xl mx-auto">
        <div className={cn('absolute -inset-4 sm:-inset-8 blur-3xl rounded-[3rem] pointer-events-none', product.glowGradient)} />
        <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-border shadow-[0_40px_80px_-30px_rgba(0,0,0,0.25)] overflow-hidden transition-transform duration-700 hover:-translate-y-2 will-change-transform">
            <BrowserFrame domain={product.domain} />
            <img
                src="/assets/ecbillmin.png"
                alt={`${product.name} dashboard preview`}
                loading="lazy"
                className="w-full h-auto object-cover"
            />
        </div>

        <div className="absolute -bottom-4 -left-2 sm:left-6 flex items-center gap-2.5 rounded-2xl bg-white border border-border shadow-xl px-4 py-3 animate-float">
            <span className="relative flex w-2.5 h-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-primary" />
            </span>
            <div className="leading-tight">
                <p className="text-[10px] sm:text-xs font-black text-foreground tracking-tight">Live Platform</p>
                <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Retail Ready</p>
            </div>
        </div>

        <div className="hidden sm:flex absolute -top-4 right-4 lg:right-8 items-center gap-2 rounded-2xl bg-white border border-border shadow-xl px-4 py-3 animate-float [animation-delay:-4s]">
            <Package className="w-4 h-4 text-primary" />
            <p className="text-xs font-black text-foreground tracking-tight">99.9% Uptime</p>
        </div>
    </div>
);

const BlendlyVisual = ({ product }: { product: Product }) => (
    <div className="relative w-full max-w-md mx-auto">
        <div className={cn('absolute inset-x-0 top-1/2 -translate-y-1/2 aspect-square blur-3xl rounded-full pointer-events-none', product.glowGradient)} />

        <div className="hidden sm:block relative z-0 w-[82%] ml-auto rotate-[2deg] opacity-95 -mb-3.5">
            <div className="rounded-2xl bg-white border border-border shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-12 rounded-lg bg-gradient-to-br from-violet-200 to-pink-200 border border-violet-200/60 flex items-center justify-center shrink-0">
                    <Bookmark className="w-4 h-4 text-violet-500" />
                </div>
                <div className="min-w-0 leading-tight">
                    <p className="text-xs font-black text-foreground truncate">Now lending near you</p>
                    <p className="text-[10px] font-bold text-muted-foreground">3 books available within 2 km</p>
                </div>
                <MapPin className="w-4 h-4 text-violet-500 ml-auto shrink-0" />
            </div>
        </div>

        <div className="relative z-10 rotate-[1.5deg] hover:rotate-0 transition-transform duration-700 will-change-transform">
            <div className="rounded-3xl bg-white border border-border shadow-[0_40px_80px_-30px_rgba(139,92,246,0.35)] overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-violet-500 to-pink-500" />
                <div className="p-5 sm:p-7 space-y-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-border bg-secondary shrink-0 flex items-center justify-center">
                            <img
                                src={getFaviconUrl(product.domain)}
                                alt=""
                                aria-hidden
                                loading="lazy"
                                className="w-6 h-6 object-contain"
                            />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-black text-foreground tracking-tight">blendly</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">@poetry · just now</p>
                        </div>
                        <Feather className="w-4 h-4 text-violet-400 ml-auto shrink-0" />
                    </div>

                    <div className="space-y-1.5 py-2">
                        <p className="font-serif italic text-base sm:text-lg text-foreground/85 leading-relaxed">
                            “Pages turn like tides at dusk,
                        </p>
                        <p className="font-serif italic text-base sm:text-lg text-foreground/85 leading-relaxed pl-4 sm:pl-6">
                            carrying borrowed worlds back home.”
                        </p>
                    </div>

                    <div className="flex items-center gap-5 pt-1 border-t border-border/60">
                        <span className="flex items-center gap-1.5 text-[11px] font-black text-muted-foreground">
                            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> 128
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] font-black text-muted-foreground">
                            <BookOpen className="w-3.5 h-3.5 text-violet-500" /> Lend
                        </span>
                        <Badge className="ml-auto bg-violet-500/10 text-violet-600 border-none text-[8px] font-black uppercase tracking-widest">
                            Poetry Feed
                        </Badge>
                    </div>
                </div>
            </div>
        </div>

        <div className="relative z-20 -rotate-[2deg] hover:rotate-0 transition-transform duration-700 will-change-transform -mt-4 mx-auto w-[86%]">
            <div className="rounded-2xl bg-white/95 backdrop-blur border border-border shadow-lg p-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-violet-600" />
                </div>
                <div className="min-w-0 leading-tight">
                    <p className="text-xs sm:text-sm font-black text-foreground tracking-tight">Lend a book nearby</p>
                    <p className="text-[10px] font-bold text-muted-foreground">Readers are waiting in your area</p>
                </div>
                <ArrowRight className="w-4 h-4 text-violet-500 ml-auto shrink-0 -rotate-45" />
            </div>
        </div>
    </div>
);

const ProductShowcase = ({ product, index }: { product: Product; index: number }) => (
    <FadeIn delay={0.15 * (index + 1)}>
        <article className="relative grid grid-cols-1 lg:grid-cols-2 rounded-[2rem] lg:rounded-[3rem] overflow-hidden border border-border bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.15)] hover:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.25)] transition-all duration-700">

            {/* Visual panel */}
            <div
                className={cn(
                    'relative order-1 p-6 pt-10 pb-12 sm:p-12 lg:p-16 flex items-center justify-center overflow-hidden',
                    product.panelGradient,
                    index % 2 === 1 && 'lg:order-2'
                )}
            >
                <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />
                {product.visual === 'screenshot' ? (
                    <EcbillVisual product={product} />
                ) : (
                    <BlendlyVisual product={product} />
                )}
            </div>

            {/* Content panel */}
            <div className={cn('relative order-2 p-7 sm:p-10 lg:p-14 flex flex-col justify-center gap-5 sm:gap-7', index % 2 === 1 && 'lg:order-1')}>
                <div className="space-y-4">
                    <Badge variant="outline" className={cn('py-1.5 px-4 text-[9px] sm:text-[10px] font-black tracking-[0.25em] uppercase', product.badgeClasses)}>
                        {product.badgeLabel}
                    </Badge>

                    <div className="flex items-center gap-4">
                        <div className={cn('w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0', product.iconBoxClasses)}>
                            {product.icon}
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-black tracking-tighter text-foreground leading-none break-words">
                                {product.name}
                            </h3>
                            <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-primary/70 mt-2">
                                {product.tagline}
                            </p>
                        </div>
                    </div>

                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium">
                        {product.description}
                    </p>

                    <p className="text-sm sm:text-base text-foreground/70 leading-relaxed font-medium italic border-l-2 border-primary/30 pl-4">
                        {product.quote}
                    </p>
                </div>

                <StaggerContainer staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feat, i) => (
                        <StaggerItem key={i}>
                            <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-secondary/40 p-3.5 sm:p-4 hover:border-primary/30 hover:bg-white transition-colors duration-300 h-full">
                                <div className="w-9 h-9 rounded-xl bg-white border border-border/60 flex items-center justify-center shrink-0 shadow-sm">
                                    {feat.icon}
                                </div>
                                <div className="min-w-0 leading-tight">
                                    <p className="text-[13px] sm:text-sm font-black text-foreground tracking-tight">{feat.title}</p>
                                    <p className="text-[11px] sm:text-xs font-medium text-muted-foreground mt-1 line-clamp-2">{feat.desc}</p>
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 sm:pt-2">
                    <a href={product.url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                        <Button
                            size="xl"
                            className="w-full sm:w-auto h-14 sm:h-16 rounded-2xl bg-foreground text-background hover:bg-primary hover:text-white font-black uppercase tracking-widest text-[11px] gap-3 px-8 shadow-xl transition-all duration-300"
                        >
                            {product.ctaLabel}
                            <ExternalLink className="w-4 h-4" />
                        </Button>
                    </a>
                    <Button
                        variant="ghost"
                        size="xl"
                        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full sm:w-auto h-14 sm:h-16 rounded-2xl font-black uppercase tracking-widest text-[11px] gap-2 px-6 text-muted-foreground hover:text-primary hover:bg-secondary/60"
                    >
                        Built by our team
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </article>
    </FadeIn>
);

const ProductsSection = () => {
    return (
        <section id="products" className="w-full relative py-24 md:py-32 overflow-hidden bg-white">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[140px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn delay={0.1} className="text-center mb-16 md:mb-24">
                    <Badge variant="outline" className="mb-5 border-primary/20 py-1.5 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-primary/70 bg-primary/5">
                        <Layers className="w-3 h-3 mr-2" />
                        Our Products
                    </Badge>
                    <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[1.05]">
                        <TypingText text="Built by us." delay={0.3} />{' '}
                        <br className="sm:hidden" />
                        <span className="text-primary/60 font-light italic">Live in the wild.</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                        Beyond client services, we ship our own platforms — production-grade products serving real businesses and communities every day.
                    </p>
                </FadeIn>

                <div className="space-y-12 md:space-y-16 max-w-6xl mx-auto">
                    {products.map((product, i) => (
                        <ProductShowcase key={product.id} product={product} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;
