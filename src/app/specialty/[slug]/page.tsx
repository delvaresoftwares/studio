import { specialties } from '@/lib/specialties-data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import SpecialtyDetailContent from '@/components/specialty-detail-content';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const data = specialties.find(s => s.slug === slug);
    if (!data) return {};

    return {
        title: `${data.title} — Delvare Software Development Company`,
        description: `${data.description} A ${data.title.toLowerCase()} service by Delvare, the software development company behind ECBills.in, Blendly.sbs and more.`,
        keywords: ['software development company', 'custom software development', 'delvare', 'delvare.in', data.title.toLowerCase(), `${data.title} by Delvare`, 'SaaS development', 'AI automation', 'cloud infrastructure', 'cybersecurity services', 'delvare clients'],
        openGraph: {
            title: `${data.title} — Delvare`,
            description: `${data.description} Built and delivered by Delvare for clients worldwide.`,
            url: `${siteConfig.url}/specialty/${data.slug}`,
            images: [{ url: siteConfig.ogImage, width: 500, height: 500, alt: `${data.title} — Delvare Software Development Company` }],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${data.title} — Delvare`,
            description: `${data.description} Built and delivered by Delvare for clients worldwide.`,
            images: [siteConfig.ogImage],
        },
    };
}

export default async function SpecialtyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = specialties.find(s => s.slug === slug);

    if (!data) {
        notFound();
    }

    const serviceJsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Service',
                name: `${data.title} — Delvare`,
                serviceType: data.title,
                description: data.detailedDescription || data.description,
                provider: {
                    '@type': 'Organization',
                    name: 'Delvare',
                    url: siteConfig.url,
                    email: 'admin@delvare.in',
                },
                areaServed: 'Worldwide',
            },
            {
                '@type': 'FAQPage',
                mainEntity: (data.faqs ?? []).map((faq: { question: string; answer: string }) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
                })),
            },
            {
                '@type': 'Organization',
                name: 'Delvare',
                url: siteConfig.url,
                logo: siteConfig.icon,
                knowsAbout: data.title,
            },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <SpecialtyDetailContent data={data} />
        </>
    );
}
