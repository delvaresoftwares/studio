import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BlogCard from '@/components/blog-card';
import { blogSummaries } from '@/lib/blog-summaries';
import { FOUNDER_DATA } from '../constants';
import Eyebrow from './eyebrow';

export default function JournalSection() {
    return (
        <section className="py-24 relative border-b border-white/5">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <Eyebrow className="mb-6">Writing</Eyebrow>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">
                            From the{' '}
                            <span className="text-primary italic font-light">Journal.</span>
                        </h2>
                        <p className="mt-5 max-w-2xl text-lg text-white/50 leading-relaxed font-medium">
                            Notes on software, AI, cloud infrastructure and building a company —
                            written by {FOUNDER_DATA.name} for the Delvare Journal.
                        </p>
                    </div>
                    <Link
                        href="/blogs"
                        className="group inline-flex min-h-11 items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-white/70 hover:text-primary transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                        Read all articles
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                    {blogSummaries.slice(0, 2).map((post) => (
                        <BlogCard key={post.slug} post={post} variant="dark" />
                    ))}
                </div>
            </div>
        </section>
    );
}
