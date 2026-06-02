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
    { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonaws' },
    { name: 'Python', icon: 'https://cdn.simpleicons.org/python' },
    { name: 'OpenAI', icon: 'https://cdn.simpleicons.org/openai' },
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
                <div className="max-w-2xl mx-auto space-y-16">

                    {/* Asset & Leaders */}
                    <div className="space-y-16">
                        <div className="space-y-8 text-center">
                            <Badge variant="outline" className="border-border py-1.5 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-muted-foreground">
                                Asset & Partnerships
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.9]">
                                Our Global <br />
                                <span className="text-primary italic font-light">Ecosystem.</span>
                            </h2>
                            <p className="text-muted-foreground text-lg font-medium italic">
                                "The partnerships and tools that form the backbone of our success."
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
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 pl-2 text-center">Market Leaders We Support</h4>
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
                </div>
            </div>
        </section>
    );
};

export default EcosystemSection;
