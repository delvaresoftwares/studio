import { specialties } from '@/lib/specialties-data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SpecialtyDetailContent from '@/components/specialty-detail-content';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const data = specialties.find(s => s.slug === slug);
    if (!data) return {};

    return {
        title: `${data.title} Portfolio | Delvare`,
        description: data.description,
    };
}

export default async function SpecialtyPortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = specialties.find(s => s.slug === slug);

    if (!data) {
        notFound();
    }

    return <SpecialtyDetailContent data={data} />;
}
