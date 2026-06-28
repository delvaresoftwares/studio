'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, Code2, Globe, Cpu, Award, TrendingUp, Github, Linkedin, ArrowRight, Activity, Terminal, Layout, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { FOUNDER_DATA } from './constants';

export default function FounderPortfolioPage() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
                                <div className="space-y-6 animate-fade-in-up">
                                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Business Solutions</span>
                                    </div>
                                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85]">
                                        {FOUNDER_DATA.name}<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300 italic font-light">.</span>
                                    </h1>
                                </div>

                                <div className="space-y-6 animate-fade-in-up [animation-delay:200ms] max-w-xl">
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

                                <div className="flex flex-wrap gap-5 animate-fade-in-up [animation-delay:400ms]">
                                    <Button size="xl" className="h-16 px-10 rounded-2xl bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest text-[11px] shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-[1.02] transition-all">
                                        Contact Me <ArrowRight className="ml-3 w-4 h-4" />
                                    </Button>
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
                            </div>

                            {/* Right Visualizer - Profile Logo */}
                            <div className="flex-1 w-full max-w-md relative animate-fade-in-up [animation-delay:300ms] flex justify-center md:justify-end">
                                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-br from-primary/40 via-primary/10 to-transparent shadow-[0_0_100px_-20px_rgba(16,185,129,0.3)] group">
                                    <div className="absolute inset-0 bg-[#050505] rounded-full z-0 group-hover:scale-[0.98] transition-transform duration-500" />
                                    
                                    <div className="absolute inset-2 rounded-full overflow-hidden bg-zinc-900 border border-white/10 z-10">
                                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <img 
                                            src="/assets/avatar.png" 
                                            alt={FOUNDER_DATA.name} 
                                            className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
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
                            {[
                                { icon: Code2, title: "Engineering First", desc: "Writing code that scales implicitly. From raw logic to enterprise APIs." },
                                { icon: TrendingUp, title: "Strategic Networking", desc: "Turning high-value commitments and freelance outbursts into structured enterprise solutions." },
                                { icon: Award, title: "Uncompromising Quality", desc: "If it doesn't wow the client, it doesn't leave the staging environment." }
                            ].map((item, i) => (
                                <div key={i} className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all text-white/60">
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tighter mb-4 text-white">{item.title}</h3>
                                    <p className="text-white/50 leading-relaxed font-medium">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Comprehensive Expertise / Operations */}
                <section className="py-32 relative border-b border-white/5">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="mb-20 text-center animate-fade-in-up">
                            <Badge variant="outline" className="mb-6 border-primary/30 py-1.5 px-6 text-[10px] font-black tracking-[0.3em] uppercase text-primary bg-primary/10">
                                Comprehensive Strategy
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">
                                Complete <span className="text-primary italic font-light">Business Solutions.</span>
                            </h2>
                            <p className="max-w-2xl mx-auto text-lg text-white/50 mt-6 leading-relaxed font-medium">
                                As Founder and CEO, I architect, deploy, and manage tailored solutions born out of a commitment to networking and freelance excellence.
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
                <section className="py-32 relative">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8 animate-fade-in-up">
                                <Badge variant="outline" className="border-emerald-500/30 py-1.5 px-6 text-[10px] font-black tracking-[0.3em] uppercase text-emerald-400 bg-emerald-500/10">
                                    Product As A Service
                                </Badge>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]">
                                    Architecting <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 italic font-light">ECBills.in</span>
                                </h2>
                                <p className="text-lg text-white/50 leading-relaxed font-medium">
                                    Beyond client services, I am actively building proprietary platforms. ECBills.in is our flagship PaaS—designed for infinite retail scale, precision inventory tracking, and high-availability operations.
                                </p>
                                <a href="https://ecbills.in" target="_blank" rel="noreferrer" className="inline-block mt-4">
                                    <Button size="xl" className="h-16 px-10 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-[11px] transition-all duration-500">
                                        View Live Platform <ArrowRight className="ml-3 w-4 h-4" />
                                    </Button>
                                </a>
                            </div>

                            <div className="relative aspect-square md:aspect-[4/3] rounded-[3rem] border border-white/10 bg-white/5 overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent mix-blend-screen opacity-50 group-hover:opacity-100 transition-all duration-700" />
                                <div className="absolute inset-4 rounded-[2rem] border border-white/10 bg-[#050505] overflow-hidden flex flex-col p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-[9px] font-black uppercase tracking-widest">
                                            Tech Stack
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 flex flex-wrap gap-2 content-start overflow-y-auto pr-2 custom-scrollbar">
                                        {['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Supabase', 'Firebase', 'Atlas', 'Redis', 'Tailwind', 'Flutter', 'Windows', 'Linux', 'Vercel', 'Git', 'GitHub'].map(tech => (
                                            <Badge key={tech} variant="outline" className="border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary/50 text-white/70 hover:text-white transition-colors py-1.5 px-3">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Back to Hub CTA */}
                <section className="py-32 relative text-center">
                    <div className="container max-w-4xl mx-auto px-4">
                        <div className="p-16 rounded-[4rem] bg-gradient-to-b from-primary/10 to-transparent border border-primary/20 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none"></div>
                            
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 relative z-10">Return to <br/><span className="text-primary italic">Delvare.in</span></h2>
                            <p className="text-xl text-white/60 font-medium mb-12 max-w-2xl mx-auto relative z-10">
                                Explore the systems and products we are building for the modern business ecosystem.
                            </p>
                            
                            <Link href="/">
                                <Button size="xl" className="relative z-10 h-16 px-12 rounded-2xl bg-primary text-black hover:bg-primary/90 font-black uppercase tracking-[0.2em] shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] transition-all hover:scale-[1.02]">
                                    <Home className="w-5 h-5 mr-3" /> Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
