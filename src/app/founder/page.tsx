'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Code2, Globe, Cpu, Award, TrendingUp, Github, Linkedin, ArrowRight, Activity, Terminal, Layout, ExternalLink, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { FOUNDER_DATA } from './constants';
import { roadmap } from './roadmap';
import { useLenis } from 'lenis/react';

const iconMap: Record<string, any> = {
    Terminal, Cpu, Globe, Award, TrendingUp, Code2, ShieldCheck, Layout, Activity
};

const COMMIT_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

const MATRIX_STAGES = 30;

const buildMatrixRamp = () => {
    const from = [22, 46, 36];
    const to = [57, 211, 83];
    return Array.from({ length: MATRIX_STAGES }, (_, i) => {
        const t = i / (MATRIX_STAGES - 1);
        const r = Math.round(from[0] + (to[0] - from[0]) * t);
        const g = Math.round(from[1] + (to[1] - from[1]) * t);
        const b = Math.round(from[2] + (to[2] - from[2]) * t);
        return `rgb(${r}, ${g}, ${b})`;
    });
};

const matrixRamp = buildMatrixRamp();

const CommitActivity = ({ className, animated }: { className?: string; animated?: boolean }) => {
    const [cells, setCells] = useState<number[]>(() =>
        Array.from({ length: 84 }, (_, i) => {
            const week = Math.floor(i / 7);
            const day = i % 7;
            const seed = (week * 17 + day * 31 + day * week * 7) % 12;
            const burst = week % 4 === 1 ? 1 : 0;
            const base = seed < 4 ? 0 : seed < 7 ? 1 : seed < 10 ? 2 : 3;
            return Math.min(4, base + burst);
        })
    );

    useEffect(() => {
        if (!animated) return;
        const id = setInterval(() => {
            setCells(prev => prev.map(level => Math.random() < 0.4 ? Math.floor(Math.random() * MATRIX_STAGES) : level));
        }, 220);
        return () => clearInterval(id);
    }, [animated]);

    return (
        <div className={cn("p-4 rounded-2xl bg-[#0a0a0a] border border-white/10", className)}>
            <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Commit Activity</span>
                <span className="flex items-center gap-1 text-[9px] font-bold text-white/40">
                    <div className="w-2 h-2 rounded-[2px] bg-[#161b22]" />
                    <div className="w-2 h-2 rounded-[2px] bg-[#0e4429]" />
                    <div className="w-2 h-2 rounded-[2px] bg-[#006d32]" />
                    <div className="w-2 h-2 rounded-[2px] bg-[#26a641]" />
                    <div className="w-2 h-2 rounded-[2px] bg-[#39d353]" />
                </span>
            </div>
            <div className="flex gap-1.5">
                <div className="grid grid-rows-7 gap-1 text-[8px] font-bold uppercase text-white/30">
                    {['Mon', '', 'Wed', '', 'Fri', '', ''].map((label, i) => (
                        <div key={i} className="flex items-center h-2.5 leading-none">{label}</div>
                    ))}
                </div>
                <div className="grid grid-rows-7 grid-flow-col gap-1 flex-1">
                    {cells.map((level, i) => (
                        <div
                            key={i}
                            className="w-2.5 h-2.5 rounded-[2px] transition-colors duration-500 ease-in-out hover:ring-1 hover:ring-primary/60"
                            style={{ backgroundColor: animated ? matrixRamp[level] : COMMIT_COLORS[Math.min(4, level)] }}
                        />
                    ))}
                </div>
            </div>
            <div className="flex justify-between mt-3 text-[8px] font-bold uppercase tracking-widest text-white/30">
                <span>12 Weeks Ago</span>
                <span>Now</span>
            </div>
        </div>
    );
};

export default function FounderPortfolioPage() {
    const [expandedRoadmap, setExpandedRoadmap] = useState<number | null>(null);
    const [roadmapOpen, setRoadmapOpen] = useState(false);
    const roadmapRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const mouseXRef = useRef(0);
    const mouseYRef = useRef(0);
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);

        // Cursor glow is driven by direct style writes inside a rAF — no
        // per-mousemove React re-render of the whole page.
        let raf = 0;
        const handleMouseMove = (e: MouseEvent) => {
            const glow = glowRef.current;
            mouseXRef.current = e.clientX;
            mouseYRef.current = e.clientY;
            if (!raf) {
                raf = requestAnimationFrame(() => {
                    raf = 0;
                    if (glow) {
                        glow.style.background = `radial-gradient(600px circle at ${mouseXRef.current}px ${mouseYRef.current}px, rgba(16, 185, 129, 0.08), transparent 40%)`;
                    }
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            if (raf) cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [lenis]);

    const renderRoadmapItem = (item: (typeof roadmap)[number], idx: number) => {
        const Icon = iconMap[item.logo] || Award;
        const isOpen = expandedRoadmap === idx;
        return (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group">
                <div className="flex items-center absolute left-[1.4375rem] md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-[#030303] bg-primary/20 text-primary justify-center z-10 transition-transform group-hover:scale-110">
                    <Icon className="w-5 h-5" />
                </div>
                <div
                    onClick={() => setExpandedRoadmap(prev => prev === idx ? null : idx)}
                    aria-expanded={isOpen}
                    className={cn(
                        "w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-auto md:ml-0 p-8 rounded-3xl cursor-pointer select-none transition-all duration-300",
                        isOpen
                            ? "bg-white/[0.05] border border-primary/30"
                            : "bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10"
                    )}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-black tracking-widest uppercase text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                            {item.fromMonth} {item.fromYear} - {item.toMonth ? `${item.toMonth} ${item.toYear}` : item.toYear}
                        </span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight mb-3">{item.heading}</h3>
                    <p className={cn(
                        "text-sm text-white/50 leading-relaxed font-medium",
                        !isOpen && "line-clamp-2 mb-6"
                    )}>
                        {item.description}
                    </p>
                    <AnimatePresence initial={false}>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                className="overflow-hidden"
                            >
                                <div className="flex flex-wrap gap-2 pt-1 pb-6">
                                    {item.hashtags.map(tag => (
                                        <span key={tag} className="text-[9px] font-black tracking-widest uppercase text-primary/70 bg-primary/5 px-2 py-1 rounded-md">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">
                        {isOpen ? 'Show Less' : 'Read More'}
                        <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isOpen && "rotate-180")} />
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#030303] text-white selection:bg-primary/30 selection:text-white font-sans overflow-hidden">
            {/* Custom Mouse Cursor Glow */}
            <div
                ref={glowRef}
                className="fixed inset-0 pointer-events-none z-0 opacity-40 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at -200px -200px, rgba(16, 185, 129, 0.08), transparent 40%)`
                }}
            />

            <Header />

            <main className="relative z-10 pt-32 pb-20">
                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4">
                    {/* Background Gradients */}
                    <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary/20 blur-[200px] rounded-full mix-blend-screen opacity-50 animate-[pulse_10s_ease-in-out_infinite]" />
                    <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full mix-blend-screen opacity-50" />
                    
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

                    <div className="container max-w-6xl mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
                            {/* Left Text */}
                            <div className="flex-1 space-y-10">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Portfolio</span>
                                    </div>
                                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85]">
                                        {FOUNDER_DATA.name}<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300 italic font-light"></span>
                                    </h1>
                                </div>

                                <div className="space-y-6 max-w-xl">
                                    <h2 className="text-2xl md:text-3xl font-bold text-white/90 leading-tight">
                                        {FOUNDER_DATA.role} at <span className="text-primary font-black">{FOUNDER_DATA.company}</span>
                                    </h2>
                                    <p className="text-lg text-white/50 leading-relaxed font-medium">
                                        {FOUNDER_DATA.bio}
                                    </p>
                                    
                                    <div className="flex items-center gap-4 pt-2 border-t border-white/10 mt-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">Age</span>
                                            <span className="text-white font-bold">{FOUNDER_DATA.age} Years Old</span>
                                        </div>
                                        <div className="w-px h-8 bg-white/10 mx-2"></div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">DOB</span>
                                            <span className="text-white font-bold">25.12.2001</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-5">
                                    <div className="flex gap-3">
                                        <a href={FOUNDER_DATA.socials.github} target="_blank" rel="noreferrer">
                                            <Button variant="outline" size="icon" className="h-16 w-16 rounded-2xl border-white/10 bg-white/5 hover:bg-primary hover:border-primary text-white transition-all">
                                                <Github className="w-6 h-6" />
                                            </Button>
                                        </a>
                                        <a href={FOUNDER_DATA.socials.linkedin} target="_blank" rel="noreferrer">
                                            <Button variant="outline" size="icon" className="h-16 w-16 rounded-2xl border-white/10 bg-white/5 hover:bg-blue-600 hover:border-blue-600 text-white transition-all">
                                                <Linkedin className="w-6 h-6" />
                                            </Button>
                                        </a>
                                        <a href="/" className="group" aria-label="Visit Delvare">
                                            <Button variant="outline" size="icon" className="h-16 w-16 rounded-2xl border-white/10 bg-white/5 hover:bg-primary hover:border-primary text-white transition-all p-3.5">
                                                <img
                                                    src="/assets/arrow-transparent.png"
                                                    alt="Delvare"
                                                    className="w-full h-full object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-all"
                                                />
                                            </Button>
                                        </a>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center md:justify-start gap-2.5 animate-fade-in-up [animation-delay:500ms]">
                                    {[
                                        { title: "Flutter", sub: "Android, iOS, Web" },
                                        { title: "React framework", sub: "Next.js, Vite.js, Gatsby" },
                                        { title: "Backend", sub: "Express, Supabase, SQL" },
                                        { title: "Security", sub: "Exploitation & Defense" },
                                        { title: "Automation", sub: "Workflow automation" },
                                        { title: "AI & Machine Learning", sub: "Intelligent Systems" },

                                    ].map((cat) => (
                                        <div key={cat.title} className="inline-flex items-baseline gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-primary/10 hover:border-primary/40 transition-all cursor-default">
                                            <span className="text-[11px] font-black uppercase tracking-widest text-primary whitespace-nowrap">{cat.title}</span>
                                            <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider hidden sm:inline">{cat.sub}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Visualizer - Profile Logo */}
                            <div className="flex-1 w-full max-w-md relative flex justify-center md:justify-end">
                                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-br from-primary/40 via-primary/10 to-transparent shadow-[0_0_100px_-20px_rgba(16,185,129,0.3)] group">
                                    <div className="absolute inset-0 bg-[#050505] rounded-full z-0 group-hover:scale-[0.98] transition-transform duration-500" />
                                    
                                    <div className="absolute inset-2 rounded-full overflow-hidden bg-zinc-900 border border-white/10 z-10 [transform:translateZ(0)]">
                                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        <img
                                            src="/assets/avatar.png"
                                            alt={FOUNDER_DATA.name}
                                            className="w-full h-full object-cover object-center rounded-full transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        />
                                    </div>
                                    
                                    {/* Orbiting Elements */}
                                    <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]" />
                                    <div className="absolute inset-[-1rem] rounded-full border border-dashed border-white/10 animate-[spin_20s_linear_infinite_reverse]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Metrics / Philosophy Section */}
                <section className="py-32 relative border-b border-white/5">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all text-white/60">
                                    <Code2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tighter mb-4 text-white">Software Engineering</h3>
                                <p className="text-white/50 leading-relaxed font-medium">
                                    Experienced building diverse frameworks. Experienced with Vite.js, Next.js, Gatsby & Flutter.
                                </p>

                                <CommitActivity className="mt-8" animated />
                            </div>

                            <div className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all text-white/60">
                                    <TrendingUp className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tighter mb-4 text-white">Networking</h3>
                                <p className="text-white/50 leading-relaxed font-medium">
                                Years of experience in Client-Relation, Sales and Decision Making. I have been a part of multiple startups. 
                                </p>

                                <div className="mt-8 space-y-3">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Active Clients</span>
                                    <div className="flex flex-wrap gap-2">
                                        {['laynered.com', 'Masdaralriyadh.com', 'Dvenue.space', 'Blendly.sbs', 'ECBills.in'].map(client => (
                                            <span key={client} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-black uppercase tracking-wider hover:bg-primary hover:text-black transition-all">
                                                {client}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all text-white/60">
                                    <Award className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tighter mb-4 text-white">Founder & CEO</h3>

                                <div className="space-y-3">
                                    <div className="flex justify-center">
                                        <div className="px-5 py-2 rounded-xl bg-primary text-black text-[11px] font-black uppercase tracking-widest shadow-[0_0_30px_-8px_rgba(16,185,129,0.7)]">
                                            ME
                                        </div>
                                    </div>
                                    <div className="flex justify-center"><div className="w-px h-4 bg-primary/40" /></div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex flex-col items-center">
                                            <div className="w-full text-center px-3 py-2 rounded-lg border border-primary/30 bg-primary/5 text-[10px] font-black uppercase tracking-wider text-primary">
                                                CEO
                                            </div>
                                            <div className="w-px h-3 bg-primary/30" />
                                            <div className="text-[9px] font-bold text-white/40 uppercase tracking-wider text-center">A-Z operation</div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-full text-center px-3 py-2 rounded-lg border border-primary/30 bg-primary/5 text-[10px] font-black uppercase tracking-wider text-primary">
                                                Development
                                            </div>
                                            <div className="w-px h-3 bg-primary/30" />
                                            
                                            <div className="text-[9px] font-bold text-white/40 uppercase tracking-wider text-center">Lead Dev</div>
                                        </div>
                                        
                                    </div>
                                </div>
                                    
                                
                    
                                                  <p className="text-white/50 p-4 leading-relaxed font-medium">
Piloting Delvare from Zero to a structured enterprise, I oversee all operations, from strategic planning to hands-on development. 
                                </p>
                            </div>
                            
                        </div>
                        
                    </div>
                </section>

                {/* Career Roadmap / Experience */}
                <section ref={roadmapRef} className="scroll-mt-24 py-24 relative border-b border-white/5">
                    <div className="container max-w-5xl mx-auto px-4">
                        <div className="mb-20 text-center">
                            <Badge variant="outline" className="mb-6 border-primary/30 py-1.5 px-6 text-[10px] font-black tracking-[0.3em] uppercase text-primary bg-primary/10">
                                My Experience
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">
                                Career <span className="text-primary italic font-light">Roadmap.</span>
                            </h2>
                        </div>

                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.375rem] md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                            {roadmap.slice(0, 3).map((item, idx) => renderRoadmapItem(item, idx))}

                            <div className={cn(
                                "grid transition-all duration-500 ease-out",
                                roadmapOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            )}>
                                <div className="overflow-hidden min-h-0">
                                    <div className="space-y-8">
                                        {roadmap.slice(3).map((item, idx) => renderRoadmapItem(item, idx + 3))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {roadmap.length > 3 && (
                            <div className="mt-14 text-center">
                                <Button
                                    onClick={() => setRoadmapOpen(prev => !prev)}
                                    className="h-12 px-8 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all inline-flex items-center gap-2"
                                >
                                    {roadmapOpen ? 'Collapse' : 'Expand'}
                                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", roadmapOpen && "rotate-180")} />
                                </Button>
                            </div>
                        )}
                    </div>
                </section>

                <section className="py-24 relative border-b border-white/5">
                    <div className="container max-w-4xl mx-auto px-4 text-center">
                        <div className="flex flex-col items-center space-y-8">
                            <Badge variant="outline" className="border-emerald-500/30 py-1.5 px-6 text-[10px] font-black tracking-[0.3em] uppercase text-emerald-400 bg-emerald-500/10">
                                Intelligent & Rapid Billing System
                            </Badge>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]">
                                Founder <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 italic font-light">ECBills.in</span>
                            </h2>
                            <p className="text-lg text-white/50 leading-relaxed font-medium max-w-2xl mx-auto">
                                Beyond client services, I am actively building proprietary platforms. ECBills.in is our flagship PaaS — designed for infinite retail scale, precision inventory tracking, and high-availability operations.
                            </p>
                            <a href="https://ecbills.in" target="_blank" rel="noopener noreferrer" className="inline-block mt-4">
                                <Button size="xl" className="h-16 px-10 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-[11px] transition-all duration-500">
                                    View Live Platform <ArrowRight className="ml-3 w-4 h-4" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </section>

                <section className="py-24 relative border-b border-white/5">
                    <div className="container max-w-4xl mx-auto px-4 text-center">
                        <div className="flex flex-col items-center space-y-8">
                            <Badge variant="outline" className="border-violet-500/30 py-1.5 px-6 text-[10px] font-black tracking-[0.3em] uppercase text-violet-400 bg-violet-500/10">
                                Social network for Literature Lovers
                            </Badge>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]">
                                Founder <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 italic font-light">Blendly.sbs</span>
                            </h2>
                            <p className="text-lg text-white/50 leading-relaxed font-medium max-w-2xl mx-auto">
                                Blendly is a community-driven platform to lend books nearby and read poetry online. Connecting readers, fostering sharing, and building a culture of knowledge exchange.
                            </p>
                            <a href="https://blendly.sbs" target="_blank" rel="noopener noreferrer" className="inline-block mt-4">
                                <Button size="xl" className="h-16 px-10 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-[11px] transition-all duration-500">
                                    Visit Blendly <ArrowRight className="ml-3 w-4 h-4" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </section>

                <section className="py-24 relative">
                    <div className="container max-w-4xl mx-auto px-4 text-center">
                        <div className="flex flex-col items-center space-y-8">
                            <Badge variant="outline" className="border-amber-500/30 py-1.5 px-6 text-[10px] font-black tracking-[0.3em] uppercase text-amber-400 bg-amber-500/10">
                                Author (Philosophy & Spirituality)
                            </Badge>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]">
                                Nature of the<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 italic font-light">Divine.</span>
                            </h2>
                            <p className="text-lg text-white/50 leading-relaxed font-medium max-w-2xl mx-auto">
                                Non-Fiction on the Simple solution for humanity's complex struggles. The secret key, the divine code, the ultimate-truth. Nature of the Divine helps readers unlick the hidden understandings about a world created by God, the real world.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 pt-2">
                                <a href="https://www.amazon.in/Nature-Divine-spiritual-awakening-development/dp/9334306513" target="_blank" rel="noopener noreferrer">
                                    <Button size="xl" className="h-14 px-8 rounded-2xl bg-[#FF9900] text-black hover:bg-[#FF9900]/90 font-black uppercase tracking-widest text-[10px] transition-all duration-500">
                                        Amazon <ExternalLink className="ml-2 w-3.5 h-3.5" />
                                    </Button>
                                </a>
                                <a href="https://www.flipkart.com/nature-divine-align/p/itm2433ecc20ab88" target="_blank" rel="noopener noreferrer">
                                    <Button size="xl" className="h-14 px-8 rounded-2xl bg-[#2874F0] text-white hover:bg-[#2874F0]/90 font-black uppercase tracking-widest text-[10px] transition-all duration-500">
                                        Flipkart <ExternalLink className="ml-2 w-3.5 h-3.5" />
                                    </Button>
                                </a>
                                <a href="https://www.natureofthedivine.com" target="_blank" rel="noopener noreferrer">
                                    <Button size="xl" className="h-14 px-8 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-[10px] transition-all duration-500">
                                        Website <ExternalLink className="ml-2 w-3.5 h-3.5" />
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
