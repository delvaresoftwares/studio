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

    return {
        title: `${data.title} | Delvare`,
        description: data.description,
        keywords: ['who is alfas', 'alfas delvare', 'delvare', 'delvare.in', 'delvare softwares', 'best software startups', data.title.toLowerCase(), 'delvare clients', 'delvare vision', 'delvare pillars', 'services'],
        openGraph: {
            title: `${data.title} | Delvare`,
            description: data.description,
            url: `${siteConfig.url}/main/${data.slug}`,
            images: [{ url: siteConfig.ogImage, width: 500, height: 500, alt: `${data.title} — Delvare` }],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${data.title} | Delvare`,
            description: data.description,
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

    return PRODUCT_SLUGS.includes(slug) ? (
        <ProductDetailContent data={data} />
    ) : (
        <SpecialtyDetailContent data={data} />
    );
}
