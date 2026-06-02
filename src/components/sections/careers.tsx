'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Users, Cpu, Trophy, ArrowRight } from 'lucide-react';

const CareerSection = () => {
    return (
        <section id="careers" className="w-full py-40 overflow-hidden bg-primary relative">
            {/* Minimal Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-white/[0.05] blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-10">
                        <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter leading-none text-white">
                            Build Your <br />
                            <span className="text-white/40 font-light italic tracking-tight italic">Legacy.</span>
                        </h2>
                        <p className="text-xl text-white/60 leading-relaxed max-w-xl font-medium italic">
                            "We don't just hire developers; we mentor the next generation of tech leaders."
                        </p>

                        <div className="grid sm:grid-cols-2 gap-8">
                            {[
                                { icon: <GraduationCap className="text-primary" />, title: "Live Deployment", desc: "Work directly on production-grade enterprise modules." },
                                { icon: <Cpu className="text-primary" />, title: "Core Tech", desc: "Master AI integration and high-tier cloud architecture." },
                                { icon: <Users className="text-primary" />, title: "Direct Mentorship", desc: "Collaborate with senior lead engineers in a flat hierarchy." },
                                { icon: <Trophy className="text-primary" />, title: "Distinction", desc: "Earn official certification of technical mastery." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-5 items-start group">
                                    <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-white/10 border border-white/10 group-hover:bg-white group-hover:text-primary transition-all duration-500 text-white">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-black text-[10px] uppercase tracking-widest text-white">{item.title}</h4>
                                        <p className="text-sm text-white/60 font-semibold leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            size="xl"
                            className="h-16 px-10 text-[10px] uppercase tracking-[0.2em] font-black bg-white text-primary rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                            onClick={() => {
                                window.dispatchEvent(new CustomEvent('open-contact-form', { detail: { type: 'career' } }));
                            }}>
                            Apply for Academy Protocol
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-10 bg-primary/[0.02] rounded-[4rem] blur-[80px] pointer-events-none" />
                        <Card className="relative bg-white border border-border rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)]">
                            <CardContent className="p-0">
                                <div className="p-10 border-b border-border bg-[#fafafa]">
                                    <div className="flex gap-2 mb-8 items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                                        <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                                        <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                                        <span className="ml-4 text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground/40">GENESIS_MODULE.TS</span>
                                    </div>
                                    <div className="space-y-4 font-mono text-sm leading-relaxed text-muted-foreground scrollbar-hide select-none pt-4 italic">
                                        <div className="flex gap-6">
                                            <span className="text-slate-400/30">01</span>
                                            <span><span className="text-pink-400">class</span> <span className="text-blue-400">Engineer_Node</span> {`{`}</span>
                                        </div>
                                        <div className="flex gap-6 pl-6">
                                            <span className="text-slate-400/30">02</span>
                                            <span><span className="text-orange-400">constructor</span>() {`{`}</span>
                                        </div>
                                        <div className="flex gap-6 pl-12">
                                            <span className="text-slate-400/30">03</span>
                                            <span>this.<span className="text-blue-300">vision</span> = <span className="text-purple-400 italic">Infinity</span>;</span>
                                        </div>
                                        <div className="flex gap-6 pl-12">
                                            <span className="text-slate-400/30">04</span>
                                            <span>this.<span className="text-blue-300">stack</span>.push(<span className="text-emerald-400">"Delvare_XAAS"</span>);</span>
                                        </div>
                                        <div className="flex gap-6 pl-6">
                                            <span className="text-slate-400/30">05</span>
                                            <span>{`}`}</span>
                                        </div>
                                        <div className="flex gap-6">
                                            <span className="text-slate-300">06</span>
                                            <span>{`}`}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-12 text-center space-y-8">
                                    <div className="flex justify-center gap-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-1.5 w-1.5 bg-primary/20 rounded-full" />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground font-semibold italic text-lg opacity-80 leading-relaxed max-w-sm mx-auto">
                                        "The future is not observed. It is architected. Join our mission to build the next generation of global systems."
                                    </p>
                                    <div className="pt-6 flex flex-col items-center gap-2">
                                        <div className="h-16 w-16 rounded-3xl border border-border flex items-center justify-center bg-secondary font-black text-primary text-xl shadow-sm italic">
                                            D
                                        </div>
                                        <div className="text-center">
                                            <p className="font-black text-[10px] uppercase tracking-widest text-foreground">Delvare Executive</p>
                                            <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">Engineering Command</p>
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
