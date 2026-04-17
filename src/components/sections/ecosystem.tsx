'use client';

import { Badge } from '@/components/ui/badge';
import { Package, Globe, Zap, Users, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const technologies = [
    { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/000000' },
    { name: 'Gatsby', icon: 'https://cdn.simpleicons.org/gatsby/663399' },
    { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
    { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
    { name: 'Flutter', icon: 'https://cdn.simpleicons.org/flutter/02569B' },
    { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonwebservices/232F3E' },
    { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
    { name: 'OpenAI', icon: 'https://cdn.simpleicons.org/openai/000000' },
];

const clients = [
    { name: 'ECBills', category: 'Retail Tech' },
    { name: 'Global Logistics', category: 'Infrastructure' },
    { name: 'Core Systems', category: 'High-Level SaaS' },
    { name: 'Prime Analytics', category: 'Data Intelligence' }
];

const EcosystemSection = () => {
    return (
        <section className="w-full py-32 bg-white border-y border-border overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">

                    {/* Left Column: Asset & Leaders */}
                    <div className="lg:col-span-12 xl:col-span-5 space-y-16">
                        <div className="space-y-8">
                            <Badge variant="outline" className="border-border py-1.5 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-muted-foreground">
                                Asset & Partnerships
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.9]">
                                The Elite <br />
                                <span className="text-primary italic font-light">Ecosystem.</span>
                            </h2>
                            <p className="text-muted-foreground text-lg font-medium italic">
                                "Our past clients and core assets are the foundation of our engineering excellence."
                            </p>
                        </div>

                        {/* EC Bills Highlight */}
                        <div className="group relative p-8 md:p-10 rounded-[3rem] bg-[#fcfcfc] border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl shrink-0">
                                    <Package className="w-8 h-8 text-white" />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Signature Asset</span>
                                        <h3 className="text-3xl font-black text-foreground">ECBills.in</h3>
                                    </div>
                                    <p className="text-muted-foreground text-sm font-medium leading-relaxed italic">
                                        World-class inventory and billing engine powering high-stakes retail environments.
                                    </p>
                                    <a href="https://ecbills.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:gap-4 transition-all">
                                        Explore Platform <ArrowRight className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Leaders / Clients */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 pl-2">Market Leaders We Support</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {clients.map((client) => (
                                    <div key={client.name} className="flex flex-col p-6 rounded-2xl border border-border bg-white hover:bg-primary/[0.02] hover:border-primary/20 transition-all">
                                        <span className="text-xs font-black text-foreground">{client.name}</span>
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">{client.category}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Tech Stack */}
                    <div className="lg:col-span-12 xl:col-span-7">
                        <div className="h-full rounded-[4rem] bg-[#fafafa] border border-border/40 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/[0.03] blur-[100px] rounded-full" />

                            <div className="relative z-10 space-y-12">
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Technical Stack</h4>
                                    <p className="text-2xl md:text-3xl font-black tracking-tight text-foreground leading-tight">
                                        High-availability stacks <br />
                                        <span className="text-muted-foreground italic font-light">built for global performance.</span>
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                                    {technologies.map((tech) => (
                                        <div key={tech.name} className="flex flex-col items-center gap-4 group/tech">
                                            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-3xl bg-white shadow-sm border border-border/80 group-hover/tech:border-primary/20 group-hover/tech:-translate-y-1 transition-all duration-300">
                                                <img
                                                    src={tech.icon}
                                                    alt={tech.name}
                                                    className="w-8 h-8 md:w-9 md:h-9 object-contain grayscale opacity-60 group-hover/tech:grayscale-0 group-hover/tech:opacity-100 transition-all"
                                                />
                                            </div>
                                            <span className="text-[9px] font-black tracking-widest uppercase text-muted-foreground/40 group-hover/tech:text-primary transition-colors">
                                                {tech.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8 border-t border-border flex flex-wrap gap-8">
                                    {[
                                        { label: 'Security', icon: <ShieldCheck className="w-4 h-4" /> },
                                        { label: 'Agile Ops', icon: <Zap className="w-4 h-4" /> },
                                        { label: 'Cloud Native', icon: <Globe className="w-4 h-4" /> }
                                    ].map(item => (
                                        <div key={item.label} className="flex items-center gap-3">
                                            <div className="text-primary">{item.icon}</div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-foreground">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default EcosystemSection;
