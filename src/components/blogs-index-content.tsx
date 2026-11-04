'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import BlogCard from '@/components/blog-card';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { cn } from '@/lib/utils';
import {
    ArrowRight,
    ArrowUpRight,
    CalendarDays,
    Clock,
    Layers,
    PenLine,
    Sparkles,
    User,
} from 'lucide-react';
import { formatBlogDate } from '@/lib/format-blog-date';
import { blogTopics, blogSummaries, getFeaturedSummary } from '@/lib/blog-summaries';

const openContactForm = () =>
    window.dispatchEvent(new CustomEvent('open-contact-form', { detail: { type: 'contact' } }));

export default function BlogsIndexContent() {
    const [topic, setTopic] = useState('All');
    const featured = getFeaturedSummary();

    const filteredPosts = useMemo(
        () => (topic === 'All' ? blogSummaries : blogSummaries.filter((post) => post.category === topic)),
        [topic]
    );

    const visiblePosts = topic === 'All' ? filteredPosts.filter((post) => post.slug !== featured.slug) : filteredPosts;

    const stats = [
        { label: 'Articles', value: String(blogSummaries.length).padStart(2, '0') },
        { label: 'Topics', value: String(blogTopics.length - 1).padStart(2, '0') },
        { label: 'Authors', value: String(new Set(blogSummaries.map((post) => post.author.name)).size).padStart(2, '0') },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white text-foreground">
            <Header />

            <main className="flex-grow">
                {/* Journal hero — same ambient treatment as the specialty detail view. */}
                <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-[80%] h-[80%] blur-[150px] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 bg-primary" />
                        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] blur-[150px] opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 bg-primary" />
                        <div
                            className="absolute inset-0 opacity-[0.05]"
                            style={{
                                backgroundImage:
                                    'linear-gradient(#10b981 0.5px, transparent 0.5px), linear-gradient(90deg, #10b981 0.5px, transparent 0.5px)',
                                backgroundSize: '60px 60px',
                            }}
                        />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                        <FadeIn className="text-center max-w-4xl mx-auto">
                            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-primary-ink">
                                <PenLine className="h-3.5 w-3.5" /> The Delvare Journal
                            </span>
                            <h1 className="mt-7 font-headline text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                                Engineering{' '}
                                <span className="text-primary-ink italic font-light tracking-tight">Insights.</span>
                            </h1>
                            <p className="mt-7 text-base sm:text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto italic">
                                Practical writing on software, AI, cloud infrastructure and growth — from the team that builds and runs it.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.15} className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto">
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <p className="font-headline text-2xl sm:text-3xl font-black tracking-tighter italic text-primary-ink">
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </FadeIn>
                    </div>
                </section>

                {/* Featured article */}
                {topic === 'All' && (
                    <section className="pb-16 sm:pb-20">
                        <div className="container mx-auto px-4 max-w-6xl">
                            <FadeIn>
                                <Link
                                    href={`/blogs/${featured.slug}`}
                                    aria-label={`Read ${featured.title}`}
                                    className="group grid lg:grid-cols-2 overflow-hidden rounded-[2.5rem] border border-border bg-white shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-500"
                                >
                                    <div className="relative min-h-[20rem] lg:min-h-[32rem] overflow-hidden">
                                        <Image
                                            src={featured.image}
                                            alt={featured.imageAlt}
                                            fill
                                            priority
                                            sizes="(min-width: 1024px) 50vw, 100vw"
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                        <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-primary-ink backdrop-blur-sm">
                                            <Sparkles className="h-3 w-3" /> Featured
                                        </span>
                                    </div>

                                    <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary-ink">
                                                {featured.category}
                                            </span>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground inline-flex items-center gap-1.5">
                                                <CalendarDays className="h-3 w-3" /> {formatBlogDate(featured.date)}
                                            </span>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground inline-flex items-center gap-1.5">
                                                <Clock className="h-3 w-3" /> {featured.readingTime} min read
                                            </span>
                                        </div>

                                        <h2 className="mt-5 font-headline text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-[1.05] text-foreground group-hover:text-primary-ink transition-colors">
                                            {featured.title}
                                        </h2>
                                        <p className="mt-4 text-sm sm:text-base text-muted-foreground font-medium leading-relaxed">
                                            {featured.excerpt}
                                        </p>

                                        <div className="mt-7 flex flex-wrap gap-2">
                                            {featured.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full border border-border px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-5">
                                            <span className="flex items-center gap-3">
                                                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border">
                                                    <Image src={featured.author.avatar} alt={featured.author.name} fill sizes="40px" className="object-cover" />
                                                </span>
                                                <span>
                                                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-foreground">
                                                        <User className="h-3 w-3 text-primary" /> {featured.author.name}
                                                    </span>
                                                    <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                                        {featured.author.role}
                                                    </span>
                                                </span>
                                            </span>
                                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-ink text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                                                <ArrowUpRight className="h-5 w-5" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </FadeIn>
                        </div>
                    </section>
                )}

                {/* Topic filter + archive */}
                <section id="articles" className="pb-20 sm:pb-28">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground inline-flex items-center gap-2">
                                    <Layers className="h-3.5 w-3.5 text-primary-ink" /> All Articles
                                </p>
                                <h2 className="mt-3 font-headline text-3xl sm:text-5xl font-black tracking-tighter leading-[1.05]">
                                    Notes from the <span className="text-primary-ink italic font-light">build.</span>
                                </h2>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {blogTopics.map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => setTopic(item)}
                                        aria-pressed={topic === item}
                                        className={cn(
                                            'inline-flex min-h-10 items-center rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                                            topic === item
                                                ? 'border-primary-ink bg-primary-ink text-white shadow-md'
                                                : 'border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-primary-ink'
                                        )}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </FadeIn>

                        <p className="sr-only" aria-live="polite">
                            {visiblePosts.length} {visiblePosts.length === 1 ? 'article' : 'articles'} shown
                            {topic !== 'All' ? ` in ${topic}` : ''}.
                        </p>

                        {visiblePosts.length > 0 ? (
                            <StaggerContainer staggerDelay={0.08} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                                {visiblePosts.map((post) => (
                                    <StaggerItem key={post.slug} className="h-full">
                                        <BlogCard post={post} />
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        ) : (
                            <p className="text-center text-sm font-medium text-muted-foreground py-16">
                                No articles in this topic yet. <button type="button" onClick={() => setTopic('All')} className="inline-flex min-h-10 items-center px-1 text-primary-ink font-black underline underline-offset-4">Show all articles</button>.
                            </p>
                        )}
                    </div>
                </section>

                {/* CTA — same closing band language as the service pages. */}
                <section className="relative py-24 overflow-hidden bg-black">
                    <div className="absolute inset-0 opacity-30">
                        <Image
                            src={featured.image}
                            alt=""
                            aria-hidden
                            fill
                            sizes="100vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/25 via-black/80 to-cyan-500/20" />
                    <FadeIn className="container mx-auto px-4 relative z-10 text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/70">
                            Delvare — Software Development Company
                        </p>
                        <h2 className="mt-5 font-headline text-3xl sm:text-5xl font-black tracking-tighter text-white leading-tight max-w-3xl mx-auto break-words">
                            Reading is useful. <span className="italic font-light">Shipping is better.</span>
                        </h2>
                        <p className="mt-4 text-sm sm:text-base text-white/60 font-medium max-w-xl mx-auto">
                            If an article describes a problem you recognise, tell us where it hurts. We will map the smallest useful fix.
                        </p>
                        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
                            <Button
                                size="lg"
                                onClick={openContactForm}
                                className="px-9 h-14 rounded-xl bg-white text-black hover:bg-primary hover:text-white text-[11px] font-black uppercase tracking-[0.15em] shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                Start a Conversation
                            </Button>
                            <Link
                                href="/#services"
                                className="inline-flex items-center justify-center gap-2 px-9 h-14 rounded-xl bg-white/10 backdrop-blur-md border border-white/25 text-white hover:bg-primary hover:border-primary text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-1"
                            >
                                Explore Services <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </FadeIn>
                </section>
            </main>

            <Footer />
        </div>
    );
}
