import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'Alfas B — Founder & CEO, Delvare | Software Development Company',
    description:
        'Alfas B is the Founder & CEO of Delvare — a software development company shipping custom software, SaaS platforms, AI automation, cloud and cybersecurity solutions. Founder of ECBills.in and Blendly.sbs, and published author of "Nature of the Divine".',
    keywords: [
        'alfas', 'alfas b', 'who is alfas', 'alfas delvare', 'alfas b ceo', 'alfas b founder',
        'software development company founder', 'SaaS founder india', 'delvare.in', 'delvare founder',
        'nature of the divine', 'blendly', 'blendly.sbs', 'ecbills', 'ecbills.in', 'dvenue',
        'software engineering', 'cybersecurity', 'AI automation', 'cloud computing',
    ],
    openGraph: {
        title: 'Alfas B — Founder & CEO, Delvare Software Development Company',
        description:
            'Founder & CEO of Delvare.in — custom software, SaaS & AI development. Also founder of ECBills.in and Blendly.sbs, and published author of "Nature of the Divine".',
        url: `${siteConfig.url}/founder`,
        images: [
            {
                url: '/assets/avatar.png',
                width: 800,
                height: 800,
                alt: 'Alfas B — Founder & CEO of Delvare',
            },
        ],
    },
};

export default function FounderLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
