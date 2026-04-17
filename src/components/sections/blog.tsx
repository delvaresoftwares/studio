'use client';

import { blogs } from '@/lib/blogs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Link from 'next/link';

const BlogSection = () => {
    return (
        <section id="blog" className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20 animate-fade-in-up">
                    <Badge variant="outline" className="mb-6 border-primary text-primary px-6 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase">
                        Our Blog
                    </Badge>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-foreground leading-none">
                        Latest <span className="text-primary italic font-light">Articles.</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-lg text-muted-foreground font-medium italic">
                        "Simple tips and tricks to help your business win with modern technology."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {blogs.map((post, idx) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug}>
                            {/* Desktop Card */}
                            <Card className="hidden md:flex flex-col group border border-border/50 hover:border-primary/20 transition-all duration-500 overflow-hidden bg-[#fdfdfd] rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up h-full" style={{ animationDelay: `${idx * 150}ms` }}>
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-6 left-6 flex gap-2">
                                        {post.tags.map(tag => (
                                            <Badge key={tag} className="bg-primary text-white backdrop-blur-md rounded-lg border-none font-black text-[9px] uppercase tracking-widest">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <CardContent className="p-10 space-y-5">
                                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                                        <span className="flex items-center gap-2"><Calendar className="w-3" /> {post.date}</span>
                                        <span className="flex items-center gap-2"><User className="w-3" /> {post.author}</span>
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-foreground/70 font-medium line-clamp-2 italic">
                                        {post.excerpt}
                                    </p>
                                    <div className="pt-4 flex items-center text-primary font-black text-xs uppercase tracking-widest gap-2">
                                        Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Mobile Card - rectangular */}
                            <Card className="flex md:hidden group border border-border/50 p-4 gap-4 items-center bg-[#fdfdfd] rounded-2xl shadow-sm mb-4">
                                <div className="flex-grow space-y-2">
                                    <div className="flex items-center gap-2">
                                        {post.tags.slice(0, 1).map(tag => (
                                            <Badge key={tag} className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-widest px-2 py-0.5">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <h3 className="text-lg font-black tracking-tight text-foreground leading-tight">
                                        {post.title}
                                    </h3>
                                    <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="pt-1 flex items-center text-primary font-black text-[9px] uppercase tracking-widest gap-1">
                                        Read <ArrowRight className="w-3 h-3" />
                                    </div>
                                </div>
                                <div className="w-24 h-24 shrink-0 overflow-hidden rounded-xl">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Button size="xl" variant="outline" className="h-16 px-10 rounded-2xl border-primary text-primary hover:bg-primary hover:text-white transition-all font-black text-[10px] uppercase tracking-widest">
                        View All Articles
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
