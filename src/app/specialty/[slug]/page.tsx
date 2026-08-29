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
        title: `${data.title} | Delvare Specialty`,
        description: data.description,
        keywords: ['who is alfas', 'alfas delvare', 'delvare', 'delvare.in', 'delvare softwares', 'best software startups', data.title.toLowerCase(), 'delvare clients', 'delvare vision', 'delvare pillars', 'specialty'],
        openGraph: {
            title: `${data.title} | Delvare Specialty`,
            description: data.description,
            url: `${siteConfig.url}/specialty/${data.slug}`,
            images: [{ url: siteConfig.ogImage, width: 500, height: 500, alt: `${data.title} — Delvare Specialty` }],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${data.title} | Delvare Specialty`,
            description: data.description,
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

    return <SpecialtyDetailContent data={data} />;
}
