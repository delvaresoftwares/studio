'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import BlogCard from '@/components/blog-card';
import { FadeIn, StaggerContainer, StaggerItem, TypingText } from '@/components/ui/motion';
import { blogSummaries } from '@/lib/blog-summaries';

const BlogSection = () => {
    const latestPosts = blogSummaries.slice(0, 3);

    return (
        <section id="blog" className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                <FadeIn delay={0.2} className="text-center mb-16 sm:mb-20">
                    <Badge variant="outline" className="mb-6 border-primary text-primary-ink px-6 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase">
                        The Journal
                    </Badge>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-foreground leading-none">
                        <TypingText text="Industry" delay={0.4} /> <span className="text-primary-ink italic font-light">Insights.</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-lg text-muted-foreground font-medium italic">
                        "Fresh perspectives on tech, growth, and the future of business."
                    </p>
                </FadeIn>

                <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latestPosts.map((post) => (
                        <StaggerItem key={post.slug} className="h-full">
                            <BlogCard post={post} />
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <div className="mt-16 text-center">
                    <Link
                        href="/blogs"
                        className="inline-flex h-16 items-center justify-center gap-2 rounded-2xl border border-primary px-10 text-[11px] font-black uppercase tracking-widest text-primary-ink transition-all hover:bg-primary-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        View All Articles <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
