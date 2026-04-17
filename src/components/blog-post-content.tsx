'use client';

import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft, Printer, FileText } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

interface BlogPostContentProps {
    post: any;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
    return (
        <div className="min-h-screen bg-white">
            <div className="no-print">
                <Header />
            </div>

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Print Only Header */}
                    <div className="hidden print:block mb-10 border-b-2 border-primary pb-6">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-2xl font-black tracking-tighter text-primary italic">DELVARE.</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Technical Protocol / Study Material</span>
                        </div>
                        <h1 className="text-4xl font-black text-foreground mb-2">{post.title}</h1>
                        <div className="flex gap-4 text-[10px] font-bold text-muted-foreground uppercase">
                            <span>{post.date}</span>
                            <span>By {post.author}</span>
                            <span>Source: delvare.in/blog/{post.slug}</span>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="no-print flex justify-between items-center mb-12">
                        <Link href="/#blog" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Articles
                        </Link>
                        <button
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary border border-border rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                        >
                            <Printer className="w-4 h-4" /> Print Protocol
                        </button>
                    </div>

                    {/* Header */}
                    <div className="space-y-8 mb-16 text-center md:text-left print:hidden">
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            {post.tags.map((tag: string) => (
                                <Badge key={tag} variant="outline" className="border-primary text-primary px-4 py-1">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[1.1]">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                            <span className="flex items-center gap-3"><Calendar className="w-4 h-4 text-primary" /> {post.date}</span>
                            <span className="flex items-center gap-3"><User className="w-4 h-4 text-primary" /> {post.author}</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="relative h-[500px] w-full rounded-[3rem] overflow-hidden mb-16 shadow-2xl print:h-[300px] print:rounded-2xl">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Content */}
                    <article className="prose prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-muted-foreground prose-p:font-medium prose-p:leading-relaxed prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:bg-secondary/30 prose-blockquote:p-10 prose-blockquote:rounded-3xl prose-blockquote:font-black prose-blockquote:italic print:prose-p:text-black print:prose-headings:text-black">
                        <div className="space-y-10 whitespace-pre-line text-lg font-medium text-muted-foreground leading-relaxed print:text-black print:text-base">
                            {post.content.replace(/#+.*\n/g, '').trim()}
                        </div>
                    </article>

                    {/* Print Final Page Summary */}
                    <div className="hidden print:block mt-16 pt-10 border-t border-border">
                        <div className="flex items-center gap-4 mb-4">
                            <FileText className="w-6 h-6 text-primary" />
                            <h3 className="font-black uppercase tracking-widest text-sm">Deployment Review</h3>
                        </div>
                        <p className="text-xs text-muted-foreground leading-loose">
                            This document is a proprietary technical briefing provided by Delvare Core. The information contained herein is intended for educational and strategic evaluation purposes. For implementation assistance or deployment inquiries, contact our engineering division at delvare.in/contact.
                        </p>
                        <div className="mt-8 flex justify-between items-center text-[8px] font-black uppercase text-muted-foreground opacity-50">
                            <span>© 2026 Delvare MNC</span>
                            <span>Ref: Protocol_{post.slug.toUpperCase()}</span>
                        </div>
                    </div>

                    {/* Footer of article */}
                    <div className="no-print mt-24 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-3xl bg-primary text-white flex items-center justify-center font-black text-2xl italic">D</div>
                            <div>
                                <p className="font-black text-sm uppercase tracking-widest">Delvare Editorial</p>
                                <p className="text-xs text-muted-foreground">Insights from our leading engineers.</p>
                            </div>
                        </div>
                        <Link href="/#contact">
                            <button className="h-16 px-10 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                                Start a Conversation
                            </button>
                        </Link>
                    </div>
                </div>
            </main>

            <div className="no-print">
                <Footer />
            </div>
        </div>
    );
}
