'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, Code2, Globe, Cpu, Award, TrendingUp, Github, Linkedin, ArrowRight, Activity, Terminal, Layout, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { FOUNDER_DATA } from './constants';

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
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [profileActive, setProfileActive] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-[#030303] text-white selection:bg-primary/30 selection:text-white font-sans overflow-hidden">
            {/* Custom Mouse Cursor Glow */}
            <div 
                className="fixed inset-0 pointer-events-none z-0 opacity-40 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.08), transparent 40%)`
                }}
            />

            <Header />

            <main className="relative z-10 pt-32 pb-20">
                {/* Hero Section */}
                <section className={cn("relative min-h-[90vh] flex flex-col items-center justify-center px-4", profileActive && "pb-72 md:pb-56")}>
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
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Business Solutions</span>
                                    </div>
                                    </div>
                                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85]">
                                        {FOUNDER_DATA.name}<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300 italic font-light">.</span>
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
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center md:justify-start gap-3 animate-fade-in-up [animation-delay:500ms]">
                                    {[
                                        { title: "SaaS", sub: "Software Development" },
                                        { title: "AI & Automation", sub: "Workflow Intelligence" },
                                        { title: "Cloud Solutions", sub: "Infrastructure" },
                                        { title: "UI/UX Design", sub: "Product Experience" },
                                        { title: "Cyber Security", sub: "Zero-Trust Systems" },
                                    ].map((cat) => (
                                        <div key={cat.title} className="flex flex-col px-4 py-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-primary/10 hover:border-primary/40 transition-all cursor-default">
                                            <span className="text-[11px] font-black uppercase tracking-widest text-primary">{cat.title}</span>
                                            <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider">{cat.sub}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Visualizer - Profile Logo */}
                            <div className="flex-1 w-full max-w-md relative flex justify-center md:justify-end">
                                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-br from-primary/40 via-primary/10 to-transparent shadow-[0_0_100px_-20px_rgba(16,185,129,0.3)] group">
                                    <div className="absolute inset-0 bg-[#050505] rounded-full z-0 group-hover:scale-[0.98] transition-transform duration-500" />
                                    
                                    <div className="absolute inset-2 rounded-full overflow-hidden bg-zinc-900 border border-white/10 z-10 cursor-pointer">
                                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <img 
                                            src="/assets/avatar.png" 
                                            alt={FOUNDER_DATA.name} 
                                            onClick={() => setProfileActive(active => !active)}
                                            className={cn(
                                                "w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110",
                                                profileActive ? "grayscale-0" : "grayscale group-hover:grayscale-0"
                                            )}
                                        />
                                    </div>
                                    
                                    {/* Orbiting Elements */}
                                    <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]" />
                                    <div className="absolute inset-[-1rem] rounded-full border border-dashed border-white/10 animate-[spin_20s_linear_infinite_reverse]" />

                                    {/* Message Bubbles on Profile Click */}
                                    {profileActive && (
                                        <>
                                            <div className="absolute z-30 left-1/2 -translate-x-1/2 top-full mt-5 w-max max-w-[280px] animate-bubble-pop">
                                                <div className="bg-primary text-black rounded-2xl rounded-tl-md px-5 py-3 text-[13px] font-black leading-snug shadow-[0_0_40px_-10px_rgba(16,185,129,0.6)]">
                                                    At Delvare, I'm raising <span className="underline decoration-black/30">delvare.in</span> from runway.
                                                </div>
                                            </div>
                                            <div className="absolute z-30 left-1/2 -translate-x-1/2 top-[calc(100%+6.5rem)] w-max max-w-[300px] animate-bubble-pop [animation-delay:180ms]">
                                                <div className="bg-primary/90 backdrop-blur border border-black/10 text-black rounded-2xl rounded-tl-md px-5 py-3">
                                                    <span className="block text-[9px] font-black uppercase tracking-widest mb-1 text-black/60">Active Projects</span>
                                                    <span className="text-[12px] font-black leading-snug">Dvenue.space · flufflwaks_backend · Blendly.sbs · Masdaralriyadh.com · laynered.com</span>
                                                </div>
                                            </div>
                                        </>
                                    )}
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
                                <h3 className="text-2xl font-black tracking-tighter mb-4 text-white">Engineering First</h3>
                                <p className="text-white/50 leading-relaxed font-medium">
                                    Experienced building React framework. Used Vite.js, Next.js and Gatsby. Worked with laynered.com, Masdar, etc. Writing for all clients. (SEO attached).
                                </p>

                                <CommitActivity className="mt-8" animated />
                            </div>

                            <div className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all text-white/60">
                                    <TrendingUp className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tighter mb-4 text-white">Networks</h3>
                                <p className="text-white/50 leading-relaxed font-medium">
                                    Operating at 3-6 levels of active clients past few years. Pacing our service items such as ECBills.in and other services.
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
                                <h3 className="text-2xl font-black tracking-tighter mb-4 text-white">C-Suite at Delvare</h3>

                                <div className="space-y-3">
                                    <div className="flex justify-center">
                                        <div className="px-5 py-2 rounded-xl bg-primary text-black text-[11px] font-black uppercase tracking-widest shadow-[0_0_30px_-8px_rgba(16,185,129,0.7)]">
                                            CEO · Alfas
                                        </div>
                                    </div>
                                    <div className="flex justify-center"><div className="w-px h-4 bg-primary/40" /></div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex flex-col items-center">
                                            <div className="w-full text-center px-3 py-2 rounded-lg border border-primary/30 bg-primary/5 text-[10px] font-black uppercase tracking-wider text-primary">
                                                Finance & Business Ops
                                            </div>
                                            <div className="w-px h-3 bg-primary/30" />
                                            <div className="text-[9px] font-bold text-white/40 uppercase tracking-wider text-center">Core Navigator</div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-full text-center px-3 py-2 rounded-lg border border-primary/30 bg-primary/5 text-[10px] font-black uppercase tracking-wider text-primary">
                                                Development
                                            </div>
                                            <div className="w-px h-3 bg-primary/30" />
                                            <div className="text-[9px] font-bold text-white/40 uppercase tracking-wider text-center">Top Dev · Interns (Up to 5)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Comprehensive Expertise / Operations */}
                <section className="py-32 relative border-b border-white/5">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="mb-20 text-center">
                            <Badge variant="outline" className="mb-6 border-primary/30 py-1.5 px-6 text-[10px] font-black tracking-[0.3em] uppercase text-primary bg-primary/10">
                                First and Finest Modern Stack
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">
                                Core <span className="text-primary italic font-light">Business Stack.</span>
                            </h2>
                            <p className="max-w-2xl mx-auto text-lg text-white/50 mt-6 leading-relaxed font-medium">
                                Delvare focuses on pillars of service/products from Delvare, third-party business, and startup founders. Below are the services provided at Delvare.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { title: "Marketing & SEO", icon: TrendingUp, desc: "Automating digital marketing, SEO, and outreach using AI integrations and function handling." },
                                { title: "Business Analyst", icon: Activity, desc: "Analyzing financial and economic factors, strategic growth modeling, and board-level vision." },
                                { title: "Software Engineering", icon: Code2, desc: "Emerging frameworks for startups and PaaS architectures. Your idea, our engineering." },
                                { title: "AI Dashboards", icon: Terminal, desc: "Interconnecting systems for enterprise-grade oversight with zero manual effort." },
                                { title: "AI & Automation", icon: Cpu, desc: "LLM fine-tuning, RAG implementation, and hyperparameter optimization for workflows." },
                                { title: "UI/UX Design", icon: Layout, desc: "Cognitive load reduction and brand value integration via deep UI/UX psychology." },
                                { title: "Cloud Solutions", icon: Globe, desc: "Managing and migrating cloud infrastructure for absolute business efficiency." },
                                { title: "Cyber Security", icon: ShieldCheck, desc: "Vulnerability scans, zero-trust architectures, and securing AI training pipelines." },
                                { title: "Managed Support", icon: Award, desc: "Technical handling, strategic consultancy, and mutual growth staking." }
                            ].map((service, idx) => (
                                <div key={idx} className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                                            <service.icon className="w-5 h-5 text-white/70 group-hover:text-white" />
                                        </div>
                                        <h3 className="text-lg font-black tracking-tight text-white/90">{service.title}</h3>
                                    </div>
                                    <p className="text-sm text-white/40 leading-relaxed font-medium">{service.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Proprietary Platforms */}
                <section className="py-32 relative border-b border-white/5">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <Badge variant="outline" className="border-emerald-500/30 py-1.5 px-6 text-[10px] font-black tracking-[0.3em] uppercase text-emerald-400 bg-emerald-500/10">
                                    Intelligent & Rapid Billing System
                                </Badge>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]">
                                    Founder <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 italic font-light">ECBills.in</span>
                                </h2>
                                <p className="text-lg text-white/50 leading-relaxed font-medium">
                                    Beyond client services, I am actively building proprietary platforms. ECBills.in is our flagship PaaS — designed for infinite retail scale, precision inventory tracking, and high-availability operations.
                                </p>
                                <a href="https://ecbills.in" target="_blank" rel="noopener noreferrer" className="inline-block mt-4">
                                    <Button size="xl" className="h-16 px-10 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-[11px] transition-all duration-500">
                                        View Live Platform <ArrowRight className="ml-3 w-4 h-4" />
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Blendly */}
                <section className="py-32 relative border-b border-white/5">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
  
                            <div className="order-1 md:order-2 space-y-8">
                                <Badge variant="outline" className="border-violet-500/30 py-1.5 px-6 text-[10px] font-black tracking-[0.3em] uppercase text-violet-400 bg-violet-500/10">
                                    Social connection based on Book taste
                                </Badge>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]">
                                    Blendly <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 italic font-light">Read & Share.</span>
                                </h2>
                                <p className="text-lg text-white/50 leading-relaxed font-medium">
                                    Blendly is a community-driven platform to lend books nearby and read poetry online. Connecting readers, fostering sharing, and building a culture of knowledge exchange.
                                </p>
                                <a href="https://blendly.sbs" target="_blank" rel="noopener noreferrer" className="inline-block mt-4">
                                    <Button size="xl" className="h-16 px-10 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-[11px] transition-all duration-500">
                                        Visit Blendly <ArrowRight className="ml-3 w-4 h-4" />
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Published Book */}
                <section className="py-32 relative">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <Badge variant="outline" className="border-amber-500/30 py-1.5 px-6 text-[10px] font-black tracking-[0.3em] uppercase text-amber-400 bg-amber-500/10">
                                    Published Author
                                </Badge>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]">
                                    Nature of the<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 italic font-light">Divine.</span>
                                </h2>
                                <p className="text-lg text-white/50 leading-relaxed font-medium">
                                    A guide to spiritual awakening and alignment with existence. Blending spiritual insight with practical wisdom — helping readers align their minds with the nature of the Divine, unlocking true motivation, clarity, and inner peace.
                                </p>
                                <div className="flex flex-wrap gap-4 pt-2">
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
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
