'use client';

import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Users, PieChart, Package, MessageSquare, Cloud, ExternalLink, ShieldCheck } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, TypingText } from '@/components/ui/motion';

const features = [
    {
        title: "Fast & Easy Billing",
        description: "An intuitive interface designed for rapid checkouts and seamless daily management.",
        icon: <ShoppingCart className="w-5 h-5 text-primary" />
    },
    {
        title: "Multi-Store & Staff Management",
        description: "Centrally manage multiple locations and assign role-based access to your staff.",
        icon: <Users className="w-5 h-5 text-primary" />
    },
    {
        title: "Accounting & Reporting",
        description: "Generate deep financial insights, track profitability, and simplify your tax compliance.",
        icon: <PieChart className="w-5 h-5 text-primary" />
    },
    {
        title: "Accurate Stock Tracking",
        description: "Real-time inventory updates prevent stockouts and eliminate product discrepancies.",
        icon: <Package className="w-5 h-5 text-primary" />
    },
    {
        title: "Real-time Chat System",
        description: "Built-in communication channels for instant admin-to-staff interactions.",
        icon: <MessageSquare className="w-5 h-5 text-primary" />
    },
    {
        title: "Secure Cloud Sync",
        description: "Your data is automatically synced across all devices and heavily encrypted.",
        icon: <Cloud className="w-5 h-5 text-primary" />
    }
];

const EcosystemSection = () => {
    return (
        <section className="w-full py-32 bg-white border-y border-border overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto space-y-16">

                    <FadeIn delay={0.2} className="text-center">
                        <Badge variant="outline" className="mb-6 border-primary/20 py-1.5 px-6 text-[10px] font-black tracking-[0.3em] uppercase text-primary bg-primary/5">
                            Proprietary Platform
                        </Badge>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[1.1] mb-6">
                            <TypingText text="Global" delay={0.3} /> <span className="text-primary italic font-light">Ecosystem.</span>
                        </h2>
                        <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
                            A comprehensive Inventory management and billing system. We build and deploy <span className="text-foreground font-bold">ECBills.in</span> to completely automate retail and enterprise operations.
                        </p>
                    </FadeIn>

                    <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feat, idx) => (
                            <StaggerItem key={idx}>
                                <div className="group h-full p-8 rounded-[2rem] bg-[#fcfcfc] border border-border/60 hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        {feat.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">{feat.title}</h3>
                                        <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">
                                            {feat.description}
                                        </p>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    <FadeIn delay={0.6} className="flex justify-center pt-8">
                        <a href="https://ecbills.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background hover:bg-primary hover:text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-primary/25 hover:-translate-y-1">
                            Explore ECBills.in <ExternalLink className="w-4 h-4" />
                        </a>
                    </FadeIn>

                </div>
            </div>
        </section>
    );
};

export default EcosystemSection;
