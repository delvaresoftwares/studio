import { blogs } from '@/lib/blogs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPostContent from '@/components/blog-post-content';
import { siteConfig } from '@/lib/site-config';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = blogs.find(b => b.slug === slug);
    if (!post) return {};
    return {
        title: `${post.title} | Delvare Blog — Software Development Insights`,
        description: `${post.excerpt} Insights from Delvare, the software development company behind ECBills.in, Blendly.sbs and more.`,
        keywords: ['software development company', 'software engineering', 'delvare', 'delvare.in', post.title.toLowerCase(), 'AI automation', 'cloud infrastructure', 'SaaS development', 'blog'],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.image],
            url: `${siteConfig.url}/blog/${post.slug}`,
            type: 'article',
            authors: [post.author],
            publishedTime: post.date,
        },
    };
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogs.find(b => b.slug === slug);

    if (!post) {
        notFound();
    }

    const blogJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: post.date,
        author: {
            '@type': 'Organization',
            name: 'Delvare',
            url: siteConfig.url,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Delvare',
            logo: { '@type': 'ImageObject', url: siteConfig.icon },
        },
        mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
            />
            <BlogPostContent post={post} />
        </>
    );
}
