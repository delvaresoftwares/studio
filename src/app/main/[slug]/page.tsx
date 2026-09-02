import { specialties } from '@/lib/specialties-data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import SpecialtyDetailContent from '@/components/specialty-detail-content';
import ProductDetailContent from '@/components/product-detail-content';

const PRODUCT_SLUGS = ['ecbills', 'blendly'];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const data = specialties.find(s => s.slug === slug);
    if (!data) return {};

    const isProduct = PRODUCT_SLUGS.includes(data.slug);

    return {
        title: isProduct
            ? `${data.title} — Developed by Delvare`
            : `${data.title} — Delvare Software Development Company`,
        description: `${data.detailedDescription || data.description} Built, run and grown by Delvare.`,
        keywords: ['software development company', 'custom software development', 'delvare', 'delvare.in',
            data.title.toLowerCase(), `${data.title} by Delvare`, 'ecbills.in', 'blendly.sbs', 'SaaS development',
            'PaaS development', 'AI automation', 'cloud infrastructure', 'cybersecurity services', 'delvare clients'],
        openGraph: {
            title: `${data.title} — Delvare`,
            description: `${data.detailedDescription || data.description} Built, run and grown by Delvare.`,
            url: `${siteConfig.url}/main/${data.slug}`,
            images: [{ url: siteConfig.ogImage, width: 500, height: 500, alt: `${data.title} — Developed by Delvare` }],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${data.title} — Delvare`,
            description: `${data.detailedDescription || data.description} Built, run and grown by Delvare.`,
            images: [siteConfig.ogImage],
        },
    };
}

export default async function SpecialtyPortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = specialties.find(s => s.slug === slug);

    if (!data) {
        notFound();
    }

    const isProduct = PRODUCT_SLUGS.includes(data.slug);

    const productJsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            isProduct
                ? {
                      '@type': 'SoftwareApplication',
                      name: data.title,
                      applicationCategory: 'BusinessApplication',
                      operatingSystem: 'Web',
                      description: data.detailedDescription || data.description,
                      url: `${siteConfig.url}/main/${data.slug}`,
                      publisher: {
                          '@type': 'Organization',
                          name: 'Delvare',
                          url: siteConfig.url,
                      },
                  }
                : {
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            {isProduct ? (
                <ProductDetailContent data={data} />
            ) : (
                <SpecialtyDetailContent data={data} />
            )}
        </>
    );
}
