import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogDetailContent from '@/components/blog-detail-content';
import { blogs, getPostBySlug, getPostWordCount } from '@/lib/blogs';
import { getRelatedSummaries } from '@/lib/blog-summaries';
import { serializeJsonLd } from '@/lib/json-ld';
import { siteConfig } from '@/lib/site-config';

// Only the slugs returned by generateStaticParams exist. Anything else is a
// real 404 instead of a prerendered 200 response containing the not-found UI.
export const dynamicParams = false;

export function generateStaticParams() {
    return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};

    const url = `${siteConfig.url}/blogs/${post.slug}`;

    return {
        title: { absolute: `${post.title} | Delvare` },
        description: post.metaDescription,
        keywords: [
            'delvare blog',
            'software development company',
            'software engineering',
            post.title.toLowerCase(),
            post.category.toLowerCase(),
            ...post.tags.map((tag) => tag.toLowerCase()),
        ],
        authors: [{ name: post.author.name, url: `${siteConfig.url}${post.author.profileUrl}` }],
        alternates: {
            canonical: `/blogs/${post.slug}`,
        },
        openGraph: {
            type: 'article',
            url,
            title: post.title,
            description: post.metaDescription,
            siteName: siteConfig.name,
            locale: 'en_US',
            publishedTime: post.date,
            modifiedTime: post.updated,
            authors: [post.author.name],
            section: post.category,
            tags: post.tags,
            images: [
                {
                    url: `${siteConfig.url}${post.ogImage}`,
                    width: 1200,
                    height: 630,
                    alt: post.imageAlt,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.metaDescription,
            images: [`${siteConfig.url}${post.ogImage}`],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const url = `${siteConfig.url}/blogs/${post.slug}`;
    const wordCount = getPostWordCount(post);
    const relatedPosts = getRelatedSummaries(post, 2);

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BlogPosting',
                '@id': `${url}#article`,
                headline: post.title,
                alternativeHeadline: post.subtitle,
                description: post.metaDescription,
                image: [
                    `${siteConfig.url}${post.ogImage}`,
                    `${siteConfig.url}${post.image}`,
                ],
                datePublished: post.date,
                dateModified: post.updated,
                url,
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': url,
                },
                articleSection: post.category,
                keywords: post.tags.join(', '),
                wordCount,
                inLanguage: 'en',
                isPartOf: {
                    '@type': 'Blog',
                    name: 'Delvare Journal',
                    url: `${siteConfig.url}/blogs`,
                },
                author: {
                    '@type': 'Person',
                    name: post.author.name,
                    jobTitle: post.author.role,
                    description: post.author.bio,
                    url: `${siteConfig.url}${post.author.profileUrl}`,
                    image: `${siteConfig.url}${post.author.avatar}`,
                    sameAs: post.author.sameAs,
                    worksFor: {
                        '@type': 'Organization',
                        name: 'Delvare',
                        url: siteConfig.url,
                    },
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'Delvare',
                    url: siteConfig.url,
                    logo: {
                        '@type': 'ImageObject',
                        url: siteConfig.icon,
                    },
                },
            },
            {
                '@type': 'FAQPage',
                mainEntity: post.faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: faq.answer,
                    },
                })),
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: siteConfig.url,
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Blog',
                        item: `${siteConfig.url}/blogs`,
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: post.title,
                        item: url,
                    },
                ],
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
            />
            <BlogDetailContent post={post} relatedPosts={relatedPosts} />
        </>
    );
}
