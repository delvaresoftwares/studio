import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'Alfas B - Founder & CEO | Delvare.in, ECBills, Blendly, Author',
    description: 'Alfas B is the Founder and CEO of Delvare.in — shipping SaaS, AI automation, cloud, and cybersecurity solutions. Also founder of ECBills.in, Blendly.sbs, and published author of "Nature of the Divine".',
    keywords: ['alfas','who is alfas', 'alfas delvare', 'alfas b author', 'delvare.in', 'delvare softwares', 'best software startups', 'nature of the divine', 'blendly', 'ecbills', 'SaaS founder india'],
    openGraph: {
        title: 'Alfas B - Founder & CEO | Delvare.in',
        description: 'Founder of Delvare.in, ECBills.in, Blendly.sbs. Published author of "Nature of the Divine". Shipping enterprise SaaS, AI automation, and cybersecurity solutions.',
        url: `${siteConfig.url}/founder`,
        images: [
            {
                url: '/assets/avatar.png',
                width: 800,
                height: 800,
                alt: 'Alfas B - Founder of Delvare.in',
            },
        ],
    },
};

export default function FounderLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
