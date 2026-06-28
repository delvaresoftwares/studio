import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'Alfas - Founder & CEO | Delvare.in',
    description: 'Learn about Alfas, the Founder and CEO of Delvare.in. Delvare Softwares is among the best software startups, shipping comprehensive business solutions and AI architectures.',
    keywords: ['who is alfas', 'alfas delvare', 'delvare', 'delvare.in', 'delvare softwares', 'best software startups'],
    openGraph: {
        title: 'Alfas - Founder & CEO | Delvare.in',
        description: 'Learn about Alfas, the Founder and CEO of Delvare.in. Delvare Softwares is among the best software startups, shipping comprehensive business solutions.',
        url: `${siteConfig.url}/founder`,
        images: [
            {
                url: '/assets/avatar.png',
                width: 800,
                height: 800,
                alt: 'Alfas - Founder of Delvare',
            },
        ],
    },
};

export default function FounderLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
