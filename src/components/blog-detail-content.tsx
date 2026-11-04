'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import BlogCard from '@/components/blog-card';
import ServiceFaq from '@/components/service-faq';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { useLenis } from 'lenis/react';
import { useSmartBack } from '@/hooks/use-smart-back';
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    CalendarDays,
    CheckCircle2,
    Clock,
    Github,
    Linkedin,
    Quote,
    Sparkles,
    User,
} from 'lucide-react';
import { formatBlogDate } from '@/lib/format-blog-date';
import type { BlogPost, BlogSummary } from '@/lib/blog-types';

interface BlogDetailContentProps {
    post: BlogPost;
    relatedPosts: BlogSummary[];
}

const openContactForm = () =>
    window.dispatchEvent(new CustomEvent('open-contact-form', { detail: { type: 'contact' } }));

export default function BlogDetailContent({ post, relatedPosts }: BlogDetailContentProps) {
    const lenis = useLenis();
    const goBack = useSmartBack('/blogs');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (lenis) lenis.scrollTo(0, { immediate: true });
            else window.scrollTo(0, 0);
        }, 10);
        return () => clearTimeout(timer);
    }, [post.slug, lenis]);

    return (
        <div className="flex flex-col min-h-screen bg-white text-foreground">
            <Header />

            <main className="flex-grow">
                {/* Cinematic hero — the same language as the product detail view. */}
                <section className="relative min-h-[92vh] flex items-end overflow-hidden pt-32">
                    <Image
                        src={post.image}
                        alt=""
                        aria-hidden
                        fill
                        priority
                        sizes="(min-width: 1600px) 1600px, 100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30" />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/25 via-transparent to-cyan-500/15 mix-blend-overlay" />

                    <div className="absolute -top-32 -right-32 w-[26rem] h-[26rem] sm:w-[34rem] sm:h-[34rem] border-[18px] sm:border-[24px] border-white/10 rounded-full animate-[spin_16s_linear_infinite]" />
                    <div className="absolute top-1/3 -left-40 w-[22rem] h-[22rem] border border-white/15 rounded-full" />
                    <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage:
                                'repeating-linear-gradient(0deg, transparent, transparent 1px, white 1px, white 2px)',
                            backgroundSize: '100% 4px',
                        }}
                    />

                    <button
                        type="button"
                        onClick={goBack}
                        aria-label="Go back"
                        className="absolute top-28 left-4 sm:left-8 z-20 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all shadow-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div className="container mx-auto px-4 relative z-10 pb-16 sm:pb-24">
                        <div className="max-w-4xl">
                            <FadeIn>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/15 backdrop-blur-sm px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100">
                                        <Sparkles className="h-3 w-3" /> {post.category}
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
                                        Delvare Journal
                                    </span>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.08}>
                                <h1 className="mt-5 font-headline text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] break-words">
                                    {post.title}
                                </h1>
                            </FadeIn>

                            <FadeIn delay={0.16}>
                                <p className="mt-5 text-base sm:text-xl text-white/75 leading-relaxed font-medium max-w-2xl italic">
                                    {post.subtitle}
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.24}>
                                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-7">
                                    <Link href={post.author.profileUrl} className="group flex items-center gap-3">
                                        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/25">
                                            <Image src={post.author.avatar} alt={post.author.name} fill sizes="44px" className="object-cover" />
                                        </span>
                                        <span>
                                            <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-white group-hover:text-primary transition-colors">
                                                <User className="h-3 w-3 text-primary" /> {post.author.name}
                                            </span>
                                            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                                                {post.author.role}
                                            </span>
                                        </span>
                                    </Link>

                                    <span className="hidden sm:block h-8 w-px bg-white/15" />

                                    <div className="flex flex-wrap items-center gap-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/75">
                                        <span className="inline-flex items-center gap-2">
                                            <CalendarDays className="h-3.5 w-3.5 text-primary" /> {formatBlogDate(post.date)}
                                        </span>
                                        <span className="inline-flex items-center gap-2">
                                            <Clock className="h-3.5 w-3.5 text-primary" /> {post.readingTime} min read
                                        </span>
                                    </div>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.32}>
                                <div className="mt-7 flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white/85"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.4}>
                                <div className="mt-9 flex flex-col sm:flex-row gap-4">
                                    <Button
                                        size="lg"
                                        onClick={openContactForm}
                                        className="px-8 h-14 rounded-xl bg-white text-black hover:bg-primary hover:text-white text-[11px] font-black uppercase tracking-[0.15em] shadow-lg transition-all duration-300 hover:-translate-y-1"
                                    >
                                        Discuss This With Us <CalendarDays className="ml-2 w-4 h-4" />
                                    </Button>
                                    <Link
                                        href="/blogs"
                                        className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-xl bg-white/10 backdrop-blur-md border border-white/25 text-white hover:bg-primary hover:border-primary text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-1"
                                    >
                                        All Articles <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Stats strip — matches the product detail view. */}
                <section className="bg-black py-12">
                    <StaggerContainer
                        staggerDelay={0.1}
                        className="container mx-auto px-4 grid grid-cols-3 gap-6 max-w-4xl text-center"
                    >
                        {post.stats.map((stat) => (
                            <StaggerItem key={stat.label}>
                                <p className="font-headline text-2xl sm:text-4xl font-black tracking-tighter italic text-emerald-400">
                                    {stat.value}
                                </p>
                                <p className="mt-1.5 text-[10px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
                                    {stat.label}
                                </p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </section>

                {/* Article body */}
                <section className="py-16 sm:py-24 bg-white">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <FadeIn>
                            <p className="text-xl sm:text-2xl text-foreground/80 font-medium leading-relaxed italic border-l-4 border-primary pl-6">
                                {post.excerpt}
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.05}>
                            <div className="mt-10 rounded-3xl border border-primary/20 bg-primary/[0.04] p-6 sm:p-8">
                                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary-ink">
                                    Key Takeaways
                                </p>
                                <ul className="mt-5 space-y-3">
                                    {post.takeaways.map((takeaway) => (
                                        <li key={takeaway} className="flex gap-3 text-sm sm:text-base font-medium leading-relaxed text-foreground/80">
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                                            <span>{takeaway}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>

                        <div className="mt-14 space-y-12">
                            {post.sections.map((section, index) => (
                                <FadeIn key={section.heading} delay={0.03}>
                                    <section>
                                        <div className="flex items-start gap-4">
                                            <span className="mt-1 font-headline text-sm font-black italic text-primary-ink/70">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <h2 className="font-headline text-2xl sm:text-4xl font-black tracking-tighter leading-[1.1] text-foreground">
                                                {section.heading}
                                            </h2>
                                        </div>

                                        <div className="mt-5 space-y-4 sm:pl-9">
                                            {section.paragraphs.map((paragraph) => (
                                                <p key={paragraph} className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed">
                                                    {paragraph}
                                                </p>
                                            ))}

                                            {section.bullets && (
                                                <ul className="space-y-3 pt-1">
                                                    {section.bullets.map((bullet) => (
                                                        <li key={bullet} className="flex gap-3 text-sm sm:text-base font-medium leading-relaxed text-foreground/75">
                                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                                                            <span>{bullet}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </section>
                                </FadeIn>
                            ))}
                        </div>

                        {/* Author */}
                        <FadeIn className="mt-16">
                            <div className="flex flex-col sm:flex-row gap-6 rounded-[2rem] border border-border bg-[#fafafa] p-6 sm:p-8">
                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border bg-white">
                                    <Image src={post.author.avatar} alt={post.author.name} fill sizes="80px" className="object-cover" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">Written by</p>
                                    <h3 className="mt-2 font-headline text-2xl font-black tracking-tight text-foreground">
                                        {post.author.name}
                                    </h3>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-ink">{post.author.role}</p>
                                    <p className="mt-3 text-sm font-medium leading-relaxed text-muted-foreground">
                                        {post.author.bio}
                                    </p>
                                    <div className="mt-4 flex flex-wrap items-center gap-3">
                                        <Link
                                            href={post.author.profileUrl}
                                            className="inline-flex min-h-11 items-center gap-1.5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary-ink hover:gap-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                        >
                                            View portfolio <ArrowUpRight className="h-3.5 w-3.5" />
                                        </Link>
                                        {post.author.sameAs.map((href) => (
                                            <a
                                                key={href}
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={href.includes('github') ? `${post.author.name} on GitHub` : `${post.author.name} on LinkedIn`}
                                                className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-white text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                                            >
                                                {href.includes('github') ? <Github className="h-4 w-4" /> : <Linkedin className="h-4 w-4" />}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Related service — the internal link that makes the post useful commercially. */}
                        <FadeIn className="mt-8">
                            <div className="relative overflow-hidden rounded-[2rem] bg-primary-ink p-7 sm:p-9 text-white">
                                <div className="absolute -top-16 -right-16 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
                                <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-black/10 blur-2xl" />
                                <div className="relative z-10">
                                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/85">
                                        Built by Delvare
                                    </p>
                                    <h3 className="mt-3 font-headline text-2xl sm:text-3xl font-black tracking-tighter">
                                        {post.serviceTitle}
                                    </h3>
                                    <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/90 font-medium leading-relaxed">
                                        {post.serviceBlurb}
                                    </p>
                                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                        <Link
                                            href={`/main/${post.serviceSlug}`}
                                            className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-white text-primary-ink hover:bg-black hover:text-white text-[11px] font-black uppercase tracking-[0.15em] transition-all"
                                        >
                                            Explore the service <ArrowRight className="h-4 w-4" />
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={openContactForm}
                                            className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl border border-white/30 text-white hover:bg-white/10 text-[11px] font-black uppercase tracking-[0.15em] transition-all"
                                        >
                                            Start a project
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                <ServiceFaq
                    faqs={post.faqs}
                    title="Questions about this topic?"
                    subtitle="The practical questions we hear most often when this subject comes up in a project."
                />

                {relatedPosts.length > 0 && (
                    <section className="py-20 sm:py-24 bg-white">
                        <div className="container mx-auto px-4 max-w-6xl">
                            <FadeIn className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                                        Keep reading
                                    </p>
                                    <h2 className="mt-3 font-headline text-3xl sm:text-5xl font-black tracking-tighter leading-[1.05]">
                                        Related <span className="text-primary-ink italic font-light">articles.</span>
                                    </h2>
                                </div>
                                <Link
                                    href="/blogs"
                                    className="inline-flex min-h-11 items-center gap-2 px-1 text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground hover:text-primary-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                >
                                    All articles <ArrowRight className="h-4 w-4" />
                                </Link>
                            </FadeIn>

                            <StaggerContainer staggerDelay={0.1} className="grid sm:grid-cols-2 gap-6">
                                {relatedPosts.map((related) => (
                                    <StaggerItem key={related.slug}>
                                        <BlogCard post={related} />
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </div>
                    </section>
                )}

                {/* Closing CTA — same band as the product detail page. */}
                <section className="relative py-24 overflow-hidden">
                    <Image src={post.image} alt="" aria-hidden fill sizes="(min-width: 1600px) 1600px, 100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-black/80" />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-cyan-500/20 mix-blend-overlay" />
                    <FadeIn className="container mx-auto px-4 relative z-10 text-center">
                        <Quote className="mx-auto h-10 w-10 text-primary" />
                        <h2 className="mt-5 font-headline text-3xl sm:text-5xl font-black tracking-tighter text-white leading-tight max-w-3xl mx-auto break-words">
                            Have a problem <span className="italic font-light">worth solving?</span>
                        </h2>
                        <p className="mt-4 text-sm sm:text-base text-white/75 font-medium max-w-xl mx-auto">
                            Tell us what is slowing the business down. We will tell you what we would build — and what we would not.
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
                                href="/blogs"
                                className="inline-flex items-center justify-center gap-2 px-9 h-14 rounded-xl bg-white/10 backdrop-blur-md border border-white/25 text-white hover:bg-primary hover:border-primary text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-1"
                            >
                                Back to the Journal
                            </Link>
                        </div>
                    </FadeIn>
                </section>
            </main>

            <Footer />
        </div>
    );
}
