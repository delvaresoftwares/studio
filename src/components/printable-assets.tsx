'use client';

import { Badge } from '@/components/ui/badge';
import { Bot, Cpu, Globe, Zap, Shield, Rocket, Smartphone, Code, Brain, Cloud, Hammer, RefreshCcw } from 'lucide-react';

export const QuotationPDFTemplate = ({ data }: { data: any }) => {
    if (!data) return null;

    return (
        <div id="quotation-pdf-template" className="absolute -left-[9999px] top-0 w-[210mm] bg-white text-black p-[25mm] font-serif leading-relaxed">
            {/* Header - Academic / Enterprise Style */}
            <div className="border-b-[4px] border-black pb-10 mb-16 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">DELVARE MNC</h1>
                    <p className="text-[10px] font-black tracking-[0.6em] text-gray-400 uppercase">Engineering & Infrastructure Protocol</p>
                </div>
                <div className="text-right">
                    <p className="font-black text-xs uppercase tracking-widest">Document: <span className="text-primary italic">#EST-{Math.floor(Math.random() * 9000) + 1000}</span></p>
                    <p className="text-[10px] uppercase font-bold text-gray-400">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>

            <div className="space-y-16">
                <section className="grid grid-cols-2 gap-12 mb-12">
                    <div>
                        <h3 className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mb-4 font-black">Authorized Recipient</h3>
                        <p className="font-black text-2xl tracking-tighter">{data.clientName}</p>
                        <p className="text-xs font-bold text-gray-500 mt-2">{data.clientEmail}</p>
                        <p className="text-xs font-bold text-gray-500">{data.clientPhone}</p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <h3 className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mb-4 font-black">Project Categorization</h3>
                        <p className="font-black text-2xl tracking-tighter">{data.label}</p>
                        <Badge variant="outline" className="mt-2 border-black/10 rounded-none text-[8px] font-black tracking-widest uppercase">Verified Nexus Instance</Badge>
                    </div>
                </section>

                <section>
                    <h2 className="text-xs font-black uppercase tracking-[0.5em] text-gray-400 mb-6 bg-[#fafafa] p-4 text-center border border-gray-100">Executive Abstract</h2>
                    <p className="text-xl italic text-gray-800 leading-relaxed font-serif text-center max-w-2xl mx-auto">
                        "Following high-fidelity simulations via the Delvare AI Engine, we have projected the following investment requirements for the implementation of the <strong>{data.label}</strong> for <strong>{data.clientName}</strong>."
                    </p>
                </section>

                <section className="grid grid-cols-12 gap-12">
                    <div className="col-span-7 space-y-6">
                        <h3 className="font-black uppercase text-[9px] tracking-[0.4em] text-gray-400">Technical Parameters</h3>
                        <div className="space-y-4">
                            {[
                                { k: 'DOMAIN', v: data.label },
                                { k: 'COMPLEXITY', v: data.complexity },
                                { k: 'VELOCITY', v: data.speed },
                                { k: 'SCALE', v: data.scale },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-3">
                                    <span className="font-black text-[9px] tracking-widest text-gray-400">{item.k}</span>
                                    <span className="font-black text-xs uppercase italic">{item.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-5 bg-[#fafafa] border border-gray-100 p-10 flex flex-col justify-center items-center text-center shadow-sm">
                        <h3 className="text-[9px] tracking-[0.5em] uppercase mb-6 font-black text-gray-400">Projected Total</h3>
                        <p className="text-5xl font-black tracking-tighter">{data.amount}</p>
                        <div className="h-px w-20 bg-primary/20 my-6" />
                        <p className="text-[9px] opacity-40 uppercase font-black tracking-[0.3em]">Delvare Systematic Estimate</p>
                    </div>
                </section>

                <section className="pt-20 border-t border-gray-100">
                    <div className="flex justify-between items-center opacity-40 italic font-serif text-[9px] uppercase tracking-widest">
                        <p>Delvare MNC // High Security Document</p>
                        <p>&copy; 2026 Architectural Division</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export const CatalogPDFTemplate = () => {
    const services = [
        {
            title: 'Neural Engine',
            tag: 'AI/ML Ecosystem',
            desc: 'Training and integration of proprietary neural models for complex enterprise logistics.',
            features: ['Large Model Fine-tuning', 'Neural Network Audits', 'Predictive Analysis Nodes']
        },
        {
            title: 'Cloud Core',
            tag: 'Infrastructure Deployment',
            desc: 'High-availability serverless architectures and managed cloud automation protocols.',
            features: ['Security-First IaC', 'Zero-Downtime Scaling', 'Distributed Cloud Hubs']
        },
        {
            title: 'Digital Asset',
            tag: 'Full-Stack Engineering',
            desc: 'Production of high-visibility digital interfaces across Web, Android, and iOS ecosystems.',
            features: ['Architecture Synthesis', 'Cross-Device Orchestration', 'Vite-Tier Performance']
        }
    ];

    return (
        <div id="catalog-pdf-template" className="absolute -left-[9999px] top-0 w-[210mm] bg-white text-black p-0 font-sans">
            {/* Cover Page */}
            <div className="h-[297mm] flex flex-col items-center justify-center p-24 text-center relative overflow-hidden bg-white border-[20px] border-[#fafafa]">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[100px] -mr-64 -mt-64" />

                <Badge variant="outline" className="border-black mb-12 py-2 px-8 text-sm uppercase tracking-[0.8em] font-black rounded-none">
                    MANIFESTO
                </Badge>
                <h1 className="text-[120px] font-black tracking-tighter leading-[0.85] mb-12 uppercase italic">
                    DELVARE<br />
                    <span className="text-gray-200">SYSTEMS</span>
                </h1>
                <div className="h-px w-32 bg-primary/30 mb-12" />
                <p className="text-xl text-gray-500 font-medium max-w-lg leading-relaxed italic">
                    "Architectural exposition of the primary technology nodes and deployment strategies of Delvare MNC."
                </p>

                <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-20">
                    <div className="text-center">
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-1">EDITION</p>
                        <p className="font-bold tracking-tighter">NEXUS_CORE</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-1">VERSION</p>
                        <p className="font-bold tracking-tighter">V4.2.2026</p>
                    </div>
                </div>
            </div>

            {/* Service Pages */}
            {services.map((service, index) => (
                <div key={index} className="h-[297mm] p-24 bg-white text-black flex flex-col relative border-t-[1px] border-gray-100">
                    <div className="flex justify-between items-start mb-32">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full border-4 border-black flex items-center justify-center font-black text-2xl">{index + 1}</div>
                            <div className="h-px w-20 bg-gray-200" />
                        </div>
                        <Badge className="bg-black text-white px-6 py-2 rounded-none text-[9px] tracking-widest font-black uppercase">SECTION_PROJECTION_{index + 1}</Badge>
                    </div>

                    <div className="max-w-3xl">
                        <h2 className="text-[100px] font-black tracking-tighter leading-none uppercase italic mb-8 decoration-primary decoration-[20px] underline underline-offset-[10px] decoration-primary/10">{service.title}</h2>
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.5em] mb-12 ml-2">{service.tag}</h3>

                        <p className="text-4xl leading-tight font-serif italic text-gray-800 mb-20 max-w-2xl">
                            "{service.desc}"
                        </p>

                        <div className="grid grid-cols-1 gap-6 ml-2">
                            {service.features.map((f, i) => (
                                <div key={i} className="flex items-center gap-6 border-b border-gray-100 pb-4 group">
                                    <div className="w-2 h-2 bg-primary" />
                                    <span className="font-black uppercase text-xs tracking-[0.3em]">{f}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto flex justify-between items-center opacity-30 text-[9px] font-black tracking-widest uppercase">
                        <p>Delvare Documentation Node</p>
                        <p>Page 0{index + 2} // {service.title}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
