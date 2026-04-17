'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, CheckCircle2, Zap, Cloud, Code2, ShieldCheck, LifeBuoy, GitBranch, Cpu, Brain, MessageSquare, Layout, Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const iconMap: Record<string, any> = {
    Cloud, Brain, Code2, ShieldCheck, LifeBuoy, GitBranch, Zap, MessageSquare, Cpu, Layout, Database
};

interface SpecialtyDetailContentProps {
    data: any;
}

export default function SpecialtyDetailContent({ data }: SpecialtyDetailContentProps) {
    const router = useRouter();
    const Icon = iconMap[data.icon] || Zap;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [data.slug]);

    if (!data) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="flex flex-col min-h-screen bg-white text-foreground">
            <Header />

            <main className="flex-grow">
                {/* Immersion Section */}
                <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
                    {/* Background Visuals */}
                    <div className="absolute inset-0 z-0">
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
                        <div className="max-w-7xl mx-auto">
                            {/* Navigation */}
                            <div className="flex items-center justify-between mb-16 animate-fade-in-up">
                                <button
                                    onClick={() => router.back()}
                                    className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-all group"
                                >
                                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <ArrowLeft className="w-4 h-4" />
                                    </div>
                                    Go Back
                                </button>

                                <Badge variant="outline" className="border-primary/20 text-primary px-5 py-2 text-[10px] font-black tracking-[0.3em] uppercase bg-primary/5">
                                    Service Details
                                </Badge>
                            </div>

                            <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
                                {/* Left Content */}
                                <div className="lg:col-span-12 xl:col-span-7 space-y-10">
                                    <div className="space-y-6">
                                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-foreground animate-fade-in-up">
                                            {data.title.split(' ')[0]} <br />
                                            <span className="text-primary italic font-light tracking-tight">{data.title.split(' ').slice(1).join(' ')}</span>
                                        </h1>
                                        <p className="text-xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-2xl italic tracking-tight animate-fade-in-up [animation-delay:100ms]">
                                            "{data.description}"
                                        </p>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-8 pt-6 animate-fade-in-up [animation-delay:200ms]">
                                        {data.features.slice(0, 4).map((feat: string, i: number) => (
                                            <div key={i} className="flex gap-4 items-start group">
                                                <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-secondary border border-border group-hover:border-primary/30 transition-all">
                                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="font-black text-[11px] uppercase tracking-widest text-foreground">{feat}</p>
                                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-40">Ready to Use</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-5 pt-10 animate-fade-in-up [animation-delay:300ms]">
                                        <Button
                                            size="xl"
                                            className="h-18 px-12 bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-2xl hover:-translate-y-1 transition-all font-black uppercase tracking-[0.2em] text-[11px]"
                                            onClick={() => window.open(`https://wa.me/918606821125?text=I am interested in ${data.title}`)}
                                        >
                                            Get Started <Zap className="ml-3 w-5 h-5 fill-current" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="xl"
                                            className="h-18 px-10 border-border border-2 hover:bg-secondary rounded-2xl transition-all font-black uppercase tracking-[0.2em] text-[11px]"
                                            onClick={() => router.push('/#services')}
                                        >
                                            See All Services <ArrowRight className="ml-3 w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Right Visualization */}
                                <div className="lg:col-span-12 xl:col-span-5 relative animate-fade-in-up [animation-delay:400ms]">
                                    <div className="relative z-10 bg-white p-4 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-border overflow-hidden">
                                        <div className={cn("w-full aspect-square rounded-[3.5rem] flex flex-col items-center justify-center text-white relative overflow-hidden", data.accent)}>
                                            <Icon className="w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl z-10" />

                                            {/* Data Lines Overlay */}
                                            <div className="absolute inset-0 opacity-20 z-0"
                                                style={{
                                                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, white 1px, white 2px)',
                                                    backgroundSize: '100% 4px'
                                                }}
                                            />

                                            {/* Rotating Ring */}
                                            <div className="absolute inset-[-10%] border-[20px] border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
                                        </div>

                                        <div className="p-8 pt-10 space-y-6">
                                            <div className="flex justify-between items-end">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Node Integrity</p>
                                                    <p className="text-3xl font-black tracking-tighter text-foreground">Optimal</p>
                                                </div>
                                                <div className="text-right space-y-1">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Deployment</p>
                                                    <p className="text-3xl font-black tracking-tighter text-primary">Active</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                {data.stats.map((stat: any, i: number) => (
                                                    <div key={i} className="flex items-center justify-between group">
                                                        <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">{stat.label}</span>
                                                        <span className="text-lg font-black tracking-tight text-foreground">{stat.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Glow */}
                                    <div className={cn("absolute -inset-10 blur-[100px] opacity-10 rounded-full", data.accent)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Insight Section */}
                <section className="py-20 bg-[#fafafa] border-t border-border">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
                            <div className="flex items-center gap-6">
                                <div className="h-16 w-16 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center font-black text-primary italic text-2xl">
                                    D
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground">Made by Delvare</p>
                                    <p className="text-sm font-medium text-muted-foreground italic">"Simple tech for better business."</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-1.5 w-8 rounded-full bg-border" />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
