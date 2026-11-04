'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CalendarDays, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatBlogDate } from '@/lib/format-blog-date';
import type { BlogSummary } from '@/lib/blog-types';

interface BlogCardProps {
    post: BlogSummary;
    variant?: 'light' | 'dark';
    className?: string;
}

/**
 * Shared article card. Used by the index, related posts and the founder page,
 * so every surface stays visually identical to the product/service cards.
 */
const BlogCard = ({ post, variant = 'light', className }: BlogCardProps) => {
    const dark = variant === 'dark';

    return (
        <Link
            href={`/blogs/${post.slug}`}
            aria-label={`Read ${post.title}`}
            className={cn(
                'group flex h-full flex-col overflow-hidden rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                dark
                    ? 'bg-white/[0.04] border-white/10 hover:border-primary/40 hover:bg-white/[0.07]'
                    : 'bg-white border-border/70 shadow-sm hover:border-primary/30 hover:shadow-2xl',
                className
            )}
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary-ink backdrop-blur-sm">
                    {post.category}
                </span>
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className={cn('flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em]', dark ? 'text-white/60' : 'text-muted-foreground')}>
                    <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3 w-3" /> {formatBlogDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3 w-3" /> {post.readingTime} min read
                    </span>
                </div>

                <h3 className={cn('mt-4 font-headline text-xl sm:text-2xl font-black leading-tight tracking-tight transition-colors group-hover:text-primary-ink', dark ? 'text-white' : 'text-foreground')}>
                    {post.title}
                </h3>

                <p className={cn('mt-3 mb-6 line-clamp-2 text-sm font-medium leading-relaxed', dark ? 'text-white/50' : 'text-muted-foreground')}>
                    {post.excerpt}
                </p>

                <div className={cn('mt-auto flex items-center justify-between gap-4 border-t pt-5', dark ? 'border-white/10' : 'border-border/70')}>
                    <span className="flex min-w-0 items-center gap-3">
                        <span className={cn('relative h-9 w-9 shrink-0 overflow-hidden rounded-full border', dark ? 'border-white/15' : 'border-border')}>
                            <Image src={post.author.avatar} alt={post.author.name} fill sizes="36px" className="object-cover" />
                        </span>
                        <span className="min-w-0">
                            <span className={cn('flex items-center gap-1.5 truncate text-[11px] font-black uppercase tracking-wider', dark ? 'text-white' : 'text-foreground')}>
                                <User className="h-3 w-3 shrink-0 text-primary" /> {post.author.name}
                            </span>
                            <span className={cn('block truncate text-[10px] font-bold uppercase tracking-widest', dark ? 'text-white/60' : 'text-muted-foreground')}>
                                {post.author.role}
                            </span>
                        </span>
                    </span>
                    <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 group-hover:bg-primary group-hover:text-white', dark ? 'bg-primary/15 text-primary' : 'bg-primary/10 text-primary-ink')}>
                        <ArrowUpRight className="h-4 w-4" />
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
