'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Users, Cpu, Trophy } from 'lucide-react';

const CareerSection = () => {
    return (
        <section id="careers" className="w-full py-24 bg-emerald-950 text-white relative overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400 rounded-full blur-[100px] animate-pulse delay-700" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="space-y-8">
                        <Badge className="bg-emerald-500 hover:bg-emerald-400 text-white border-none px-4 py-1 font-bold">LIFELONG LEARNING</Badge>
                        <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-tight">
                            Learn from the <span className="text-emerald-400 font-serif italic">Elite.</span>
                        </h2>
                        <p className="text-xl text-emerald-100/70 font-medium leading-relaxed max-w-xl">
                            We aren't just an MNC; we're a launchpad for the next generation of visionaries. Join our mentorship programs and work on production-level XAAS stacks.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { icon: <GraduationCap className="text-emerald-400" />, title: "Real-world Experience", desc: "Skip the theory; build live enterprise systems." },
                                { icon: <Cpu className="text-emerald-400" />, title: "Future Tech", desc: "Work with AI, Cloud native and Security infra." },
                                { icon: <Users className="text-emerald-400" />, title: "Mentorship", desc: "Direct access to senior security engineers." },
                                { icon: <Trophy className="text-emerald-400" />, title: "Certifications", desc: "Industry recognized validation of your skills." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-emerald-800/50 border border-emerald-500/30">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-emerald-50">{item.title}</h4>
                                        <p className="text-sm text-emerald-100/50">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button size="xl" className="bg-white text-emerald-950 hover:bg-emerald-50 font-black shadow-2xl" onClick={() => {
                            window.dispatchEvent(new CustomEvent('open-contact-form', { detail: { type: 'career' } }));
                        }}>
                            Join the Academy
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-emerald-500/20 rounded-2xl sm:rounded-[2rem] blur-2xl rotate-3" />
                        <Card className="relative bg-emerald-900/40 backdrop-blur-3xl border-emerald-500/30 rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl">
                            <CardContent className="p-0">
                                <div className="p-8 border-b border-emerald-500/20 bg-emerald-800/30">
                                    <div className="flex gap-2 mb-4">
                                        <div className="h-3 w-3 rounded-full bg-red-500/50" />
                                        <div className="h-3 w-3 rounded-full bg-amber-500/50" />
                                        <div className="h-3 w-3 rounded-full bg-emerald-500/50" />
                                    </div>
                                    <div className="space-y-4 font-mono text-[10px] sm:text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                                        <div className="flex gap-4">
                                            <span className="text-emerald-500/50">01</span>
                                            <span className="text-emerald-400">class</span>
                                            <span className="text-white">FutureEngineer</span>
                                            <span className="text-emerald-400">{` {`}</span>
                                        </div>
                                        <div className="flex gap-4 pl-4">
                                            <span className="text-emerald-500/50">02</span>
                                            <span className="text-emerald-400"> constructor</span>
                                            <span className="text-white">() {`{`}</span>
                                        </div>
                                        <div className="flex gap-4 pl-8">
                                            <span className="text-emerald-500/50">03</span>
                                            <span className="text-white">this.potential = </span>
                                            <span className="text-emerald-200">Infinity</span>
                                            <span className="text-white">;</span>
                                        </div>
                                        <div className="flex gap-4 pl-8">
                                            <span className="text-emerald-500/50">04</span>
                                            <span className="text-white">this.skills += </span>
                                            <span className="text-emerald-400">"SecurityEngineering"</span>
                                            <span className="text-white">;</span>
                                        </div>
                                        <div className="flex gap-4 pl-4">
                                            <span className="text-emerald-500/50">05</span>
                                            <span className="text-white">{`}`}</span>
                                        </div>
                                        <div className="flex gap-4">
                                            <span className="text-emerald-500/50">06</span>
                                            <span className="text-white">{`}`}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 sm:p-12 text-center space-y-6">
                                    <h3 className="text-xl sm:text-2xl font-black">Not a job. A Transformation.</h3>
                                    <div className="flex justify-center gap-1">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className="h-1 w-8 bg-emerald-500 rounded-full" />
                                        ))}
                                    </div>
                                    <p className="text-emerald-100/60 font-medium">
                                        "The best way to predict the future is to build it ourselves. At Delvare, we give you the tools and the mission."
                                    </p>
                                    <div className="pt-4 flex items-center justify-center gap-3">
                                        <div className="h-12 w-12 rounded-full border border-emerald-500/50 p-1">
                                            <div className="w-full h-full rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-400">D</div>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-white">Delvare Lead</p>
                                            <p className="text-xs text-emerald-400 font-mono">Head of Engineering</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerSection;
