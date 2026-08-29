'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, CheckCircle2, Zap, Cloud, Code2, ShieldCheck, LifeBuoy, GitBranch, Cpu, Brain, MessageSquare, Layout, Database, Search, TrendingUp, Calendar, Receipt, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import ServiceFaq from '@/components/service-faq';
import { useLenis } from 'lenis/react';

const iconMap: Record<string, any> = {
    Cloud, Brain, Code2, ShieldCheck, LifeBuoy, GitBranch, Zap, MessageSquare, Cpu, Layout, Database, Search, TrendingUp, Calendar, Receipt, BookOpen
};

interface SpecialtyDetailContentProps {
    data: any;
}

export default function SpecialtyDetailContent({ data }: SpecialtyDetailContentProps) {
    const lenis = useLenis();
    const Icon = iconMap[data.icon] || Zap;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (lenis) lenis.scrollTo(0, { immediate: true });
            else window.scrollTo(0, 0);
        }, 10);
        return () => clearTimeout(timer);
    }, [data.slug, lenis]);

    if (!data) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="flex flex-col min-h-screen bg-white text-foreground">
            <Header />

            <main className="flex-grow">
                {/* Immersion Section */}
                <section className="relative min-h-screen flex flex-col items-center pt-32 pb-20 overflow-hidden">
                    {/* Background Visuals */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className={cn("absolute top-0 right-0 w-[80%] h-[80%] blur-[150px] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2", data.accent)} />
                        <div className={cn("absolute bottom-0 left-0 w-[60%] h-[60%] blur-[150px] opacity-10 rounded-full translate-y-1/2 -translate-x-1/2", data.accent)} />

                        {/* Mesh Grid */}
                        <div className="absolute inset-0 opacity-[0.05]"
                            style={{
                                backgroundImage: `linear-gradient(#10b981 0.5px, transparent 0.5px), linear-gradient(90deg, #10b981 0.5px, transparent 0.5px)`,
                                backgroundSize: '60px 60px'
                            }}
                        />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                            {/* Heading line with Back Button */}
                            <div className="flex items-center justify-center gap-4 sm:gap-6 w-full animate-fade-in-up">
                                <Link
                                    href="/"
                                    aria-label="Go back"
                                    className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 hover:-translate-x-1 transition-all shadow-lg"
                                >
                                    <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                                </Link>
                                <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-foreground text-left sm:text-center">
                                    {data.title.split(' ')[0]}{' '}
                                    <span className="text-primary italic font-light tracking-tight">{data.title.split(' ').slice(1).join(' ')}</span>
                                </h1>
                            </div>

                            {/* Large Image & Icon Visualization */}
                            <div className="py-10 w-full animate-fade-in-up [animation-delay:100ms]">
                                <div className="relative z-10 bg-white p-3 sm:p-4 rounded-[2.5rem] sm:rounded-[4rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] border border-border overflow-hidden mx-auto max-w-2xl w-full">
                                    <div className={cn("w-full aspect-[4/3] sm:aspect-video rounded-[2rem] sm:rounded-[3.5rem] flex flex-col items-center justify-center text-white relative overflow-hidden", data.accent)}>
                                        {/* Service Image */}
                                        <img
                                            src={data.portfolioImages ? data.portfolioImages[0] : data.image}
                                            alt={data.title}
                                            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                                        />

                                        <Icon className="w-20 h-20 sm:w-28 sm:h-28 drop-shadow-2xl z-10" />

                                        {/* Data Lines Overlay */}
                                        <div className="absolute inset-0 opacity-20 z-0"
                                            style={{
                                                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, white 1px, white 2px)',
                                                backgroundSize: '100% 4px'
                                            }}
                                        />

                                        {/* Rotating Ring */}
                                        <div className="absolute inset-[-10%] border-[15px] sm:border-[20px] border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
                                    </div>
                                </div>
                            </div>

                            {/* Subheading */}
                            <p className="text-lg sm:text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl italic tracking-tight animate-fade-in-up [animation-delay:200ms]">
                                "{data.detailedDescription || data.description}"
                            </p>

                            {/* Stats strip */}
                            {(data.stats ?? []).length > 0 && (
                                <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-12 w-full max-w-xl animate-fade-in-up [animation-delay:250ms]">
                                    {data.stats.map((stat: { label: string; value: string }) => (
                                        <div key={stat.label} className="text-center">
                                            <p className="font-headline text-lg sm:text-2xl font-black tracking-tighter italic text-primary">{stat.value}</p>
                                            <p className="mt-1 text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Points (Readable formatting) */}
                            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 pt-12 text-left animate-fade-in-up [animation-delay:300ms] w-full">
                                {(data.featureDefinitions || data.features.map((f: string) => ({ title: f, definition: "Elite Protocol" }))).map((feat: { title: string, definition: string }, i: number) => (
                                    <div key={i} className="flex gap-4 items-start group bg-white p-5 rounded-2xl border border-border hover:border-primary/30 transition-all shadow-sm">
                                        <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:text-white text-primary transition-colors">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-black text-sm sm:text-base text-foreground tracking-tight">{feat.title}</p>
                                            <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">{feat.definition}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Buttons */}
                            <div className="relative z-20 flex flex-col sm:flex-row w-full sm:w-auto justify-center gap-4 pt-12 animate-fade-in-up [animation-delay:400ms]">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto px-10 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg hover:-translate-y-1 transition-all font-black uppercase tracking-[0.15em] text-[11px] h-14"
                                    onClick={() => window.dispatchEvent(new CustomEvent('open-contact-form', { detail: { type: 'contact' } }))}
                                >
                                    Schedule Meeting <Calendar className="ml-2 w-4 h-4" />
                                </Button>
                                <Link href="/#services" className="w-full sm:w-auto">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full sm:w-auto px-10 border-border border-2 hover:bg-secondary rounded-xl transition-all font-black uppercase tracking-[0.15em] text-[11px] h-14"
                                    >
                                        See Other Services <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section — unique questions per service */}
                <ServiceFaq
                    faqs={data.faqs}
                    title={`${data.title} — FAQs`}
                />

                {/* Footer Insight Section */}
                <section className="py-20 border-t border-border">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
                            <div className="flex items-center gap-6">
                                <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center font-black text-primary italic text-2xl">
                                    <img src="/assets/arrow.png" alt="D" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground">DELVARE.IN</p>
                                    <p className="text-sm font-medium text-muted-foreground italic">"IT Solutions"</p>
                                </div>
                            </div>

                            <Link href="/#services" className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-colors">
                                Explore all services
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
