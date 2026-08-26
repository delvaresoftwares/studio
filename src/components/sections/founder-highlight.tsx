'use client';

import Link from 'next/link';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/motion';

const FOUNDER_DATA = {
    name: 'Alfas B',
    role: 'Founder & CEO',
    company: 'DELVARE',
    bio: 'Shipping solutions for international clients. What started as an outburst of freelance services has now evolved into a structured enterprise.',
    avatar: '/assets/avatar.png',
};

const quickSkills = ['Software Engineering', 'System Architecture', 'Cyber Security', 'AI & Automation'];

const FounderHighlight = () => {
    return (
        <section id="founder" className="w-full relative py-20 lg:py-28 overflow-hidden bg-[#030303] text-white">
            {/* Ambient glows */}
            <div className="absolute top-0 -left-32 w-[500px] h-[500px] bg-primary/20 blur-[180px] rounded-full mix-blend-screen opacity-50 pointer-events-none animate-[pulse_10s_ease-in-out_infinite]" />
            <div className="absolute bottom-0 -right-32 w-[420px] h-[420px] bg-emerald-600/10 blur-[150px] rounded-full mix-blend-screen opacity-60 pointer-events-none" />
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn delay={0.1} className="text-center mb-12 md:mb-16">
                    <Badge variant="outline" className="mb-5 border-primary/30 py-1.5 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-primary bg-primary/10">
                        The Mind Behind Delvare
                    </Badge>
                    <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 leading-[1.05] text-white">
                        The Founder & {' '}
                        <span className="text-primary italic font-light">CEO.</span>
                    </h2>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="group/max-w max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-14 p-8 sm:p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-500">
                        {/* Profile circle */}
                        <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 shrink-0">
                            <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-br from-primary/40 via-primary/10 to-transparent shadow-[0_0_100px_-20px_rgba(16,185,129,0.3)] group-hover/max-w:shadow-[0_0_120px_-15px_rgba(16,185,129,0.5)] transition-shadow duration-500">
                                {/* Strictly clipped circular photo */}
                                <div className="absolute inset-2 rounded-full overflow-hidden bg-zinc-900 border border-white/10 [transform:translateZ(0)]">
                                    <img
                                        src={FOUNDER_DATA.avatar}
                                        alt={`${FOUNDER_DATA.name} — ${FOUNDER_DATA.role}, ${FOUNDER_DATA.company}`}
                                        loading="lazy"
                                        className="w-full h-full object-cover object-center rounded-full transition-transform duration-700 group-hover/max-w:scale-105"
                                    />
                                </div>
                                {/* Orbiting rings */}
                                <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite] pointer-events-none" />
                                <div className="absolute inset-[-0.75rem] rounded-full border border-dashed border-white/10 animate-[spin_20s_linear_infinite_reverse] pointer-events-none" />
                            </div>
                        </div>

                        {/* Quick details */}
                        <div className="flex-1 min-w-0 text-center md:text-left space-y-6">
                            <div className="space-y-3">
                                <h3 className="text-4xl sm:text-5xl font-black tracking-tighter leading-none text-white">
                                    {FOUNDER_DATA.name}
                                </h3>
                                <p className="text-lg sm:text-xl font-bold text-white/80">
                                    {FOUNDER_DATA.role} at{' '}
                                    <span className="text-primary font-black">{FOUNDER_DATA.company}</span>
                                </p>
                            </div>

                            <p className="text-sm sm:text-base text-white/50 leading-relaxed font-medium">
                                {FOUNDER_DATA.bio}
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                {quickSkills.map((skill) => (
                                    <span key={skill} className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-primary/10 hover:border-primary/40 transition-all cursor-default text-[9px] font-black uppercase tracking-widest text-primary">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 pt-2">
                                <Link href="/founder">
                                    <Button size="lg" className="h-14 px-8 rounded-2xl bg-primary text-black hover:bg-white hover:text-black font-black uppercase tracking-widest text-[11px] shadow-[0_0_40px_-10px_rgba(16,185,129,0.6)] transition-all duration-500">
                                        Founder Profile
                                        <ArrowRight className="ml-3 w-4 h-4" />
                                    </Button>
                                </Link>
                                <div className="flex gap-3">
                                    <a href="https://github.com/living-tuna" target="_blank" rel="noreferrer" aria-label="GitHub">
                                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-white/10 bg-white/5 hover:bg-primary hover:border-primary text-white transition-all">
                                            <Github className="w-5 h-5" />
                                        </Button>
                                    </a>
                                    <a href="https://in.linkedin.com/in/alfas-b-717054222" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-white/10 bg-white/5 hover:bg-blue-600 hover:border-blue-600 text-white transition-all">
                                            <Linkedin className="w-5 h-5" />
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default FounderHighlight;
