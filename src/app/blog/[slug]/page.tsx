import { blogs } from '@/lib/blogs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPostContent from '@/components/blog-post-content';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = blogs.find(b => b.slug === slug);
    if (!post) return {};
    return {
        title: `${post.title} | Delvare Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        }
    };
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogs.find(b => b.slug === slug);

    if (!post) {
        notFound();
    }

    return <BlogPostContent post={post} />;
}
