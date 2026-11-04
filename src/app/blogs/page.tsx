import type { Metadata } from 'next';
import BlogsIndexContent from '@/components/blogs-index-content';
import { blogTopics, blogs, getFeaturedPost } from '@/lib/blogs';
import { serializeJsonLd } from '@/lib/json-ld';
import { siteConfig } from '@/lib/site-config';

const pageUrl = `${siteConfig.url}/blogs`;
const hubImage = `${siteConfig.url}/og/delvare-journal.jpg`;
const featured = getFeaturedPost();

export const metadata: Metadata = {
    title: { absolute: 'Blog — Software, AI, Cloud & Growth Insights | Delvare' },
    description:
        'Practical articles from Delvare on custom software, AI automation, cloud performance and SEO — written by the team that builds and runs the systems.',
    keywords: [
        'delvare blog',
        'software development blog',
        'software engineering insights',
        'AI automation articles',
        'cloud infrastructure blog',
        'SaaS development insights',
        'SEO content strategy',
        'software development company kerala',
    ],
    alternates: {
        canonical: '/blogs',
    },
    openGraph: {
        type: 'website',
        url: pageUrl,
        title: 'Delvare Journal — Engineering Insights',
        description:
            'Practical writing on software, AI, cloud infrastructure and growth from the Delvare team.',
        siteName: siteConfig.name,
        images: [
            {
                url: hubImage,
                width: 1200,
                height: 630,
                alt: 'Delvare Journal — Engineering Insights',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Delvare Journal — Engineering Insights',
        description:
            'Practical writing on software, AI, cloud infrastructure and growth from the Delvare team.',
        images: [hubImage],
    },
};

export default function BlogsPage() {
    const blogJsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Blog',
                '@id': `${pageUrl}#blog`,
                name: 'Delvare Journal',
                url: pageUrl,
                image: hubImage,
                description:
                    'Practical articles on custom software, AI automation, cloud performance and SEO from Delvare.',
                inLanguage: 'en',
                publisher: {
                    '@type': 'Organization',
                    name: 'Delvare',
                    url: siteConfig.url,
                    logo: {
                        '@type': 'ImageObject',
                        url: siteConfig.icon,
                    },
                },
                blogPost: blogs.map((post) => ({
                    '@type': 'BlogPosting',
                    headline: post.title,
                    url: `${siteConfig.url}/blogs/${post.slug}`,
                    datePublished: post.date,
                    dateModified: post.updated,
                    articleSection: post.category,
                    author: {
                        '@type': 'Person',
                        name: post.author.name,
                        url: `${siteConfig.url}${post.author.profileUrl}`,
                    },
                })),
            },
            {
                '@type': 'ItemList',
                name: 'Delvare Journal articles',
                itemListElement: blogs.map((post, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    url: `${siteConfig.url}/blogs/${post.slug}`,
                    name: post.title,
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
                        item: pageUrl,
                    },
                ],
            },
            {
                '@type': 'CollectionPage',
                '@id': `${pageUrl}#page`,
                url: pageUrl,
                name: 'Delvare Journal',
                about: blogTopics
                    .filter((topic) => topic !== 'All')
                    .map((topic) => ({ '@type': 'Thing', name: topic })),
                isPartOf: { '@id': `${pageUrl}#blog` },
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogJsonLd) }}
            />
            <BlogsIndexContent />
        </>
    );
}
