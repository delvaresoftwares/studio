import type { Metadata } from 'next';
import HomeClient from './home-client';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'Trinity of Delvare | Vision, Mission & Our Three Pillars',
    description:
        'The Trinity of Delvare — our vision to pioneer technological evolution with software-hardware that acts as an entire company, our mission to power business and start-ups with radiant technology, and our three pillars: delivering solutions internationally, powering global workflows with our apps, and researching the software-hardware evolution for future AI systems.',
    keywords: [
        'delvare', 'delvare.in', 'delvare trinity', 'trinity of delvare', 'delvare pillars', 'our three pillars',
        'delvare vision', 'delvare mission', 'alfas delvare', 'ecbills', 'ecbills.in', 'blendly', 'blendly.sbs',
        'dvenue', 'masdar al riyadh', 'laynered', 'spectra school', 'nature of the divine', 'alien hills',
        'software hardware evolution', 'future AI systems', 'AI automation', 'business automation',
    ],
    openGraph: {
        title: 'Trinity of Delvare | Vision, Mission & Our Three Pillars',
        description:
            'The Trinity of Delvare — our vision to pioneer technological evolution with software-hardware that acts as an entire company, our mission to power business and start-ups with radiant technology, and our three pillars.',
        url: siteConfig.url,
        images: [
            {
                url: siteConfig.ogImage,
                width: 500,
                height: 500,
                alt: 'Trinity of Delvare — Vision, Mission & Pillars',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Trinity of Delvare | Vision, Mission & Our Three Pillars',
        description: 'The Trinity of Delvare — our vision, mission and the three pillars that define everything we build.',
        images: [siteConfig.ogImage],
        creator: '@delvare',
    },
};

const clientsSeo = [
    { name: 'EC Bills', url: 'https://ecbills.in' },
    { name: 'Blendly', url: 'https://blendly.sbs' },
    { name: 'Dvenue', url: 'https://dvenue.space' },
    { name: 'Dvenue Bublnet', url: 'https://dvenue.bublnet.in' },
    { name: 'Masdar Al Riyadh', url: 'https://masdaralriyadh.com' },
    { name: 'Laynered', url: 'https://laynered.com' },
    { name: 'Spectra School', url: 'https://spectraschool.in' },
    { name: 'Nature of the Divine', url: 'https://natureofthedivine.com' },
    { name: 'Alien Hills', url: 'https://alienhills.shop' },
    { name: 'Delvare', url: 'https://delvare.in' },
];

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            name: 'Delvare',
            url: siteConfig.url,
            logo: siteConfig.icon,
            image: siteConfig.ogImage,
            email: 'admin@delvare.in',
            description:
                'Delvare is an XAAS company delivering high-performance business solutions — custom software, cloud & infrastructure, AI automation and cybersecurity.',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'CO-Space | VSV Building, 4th Floor, Spectra School of Designs | East of Iron Bridge, CCNB Road',
                addressLocality: 'Aleppuzha',
                addressRegion: 'Kerala',
                postalCode: '688001',
                addressCountry: 'IN',
            },
        },
        {
            '@type': 'AboutPage',
            name: 'Trinity of Delvare — Vision, Mission & Our Three Pillars',
            url: siteConfig.url,
            mainEntity: {
                '@type': 'Thing',
                name: 'Vision & Mission of Delvare',
                description:
                    'Vision: To be the #pioneer of technological evolution — engineering computing hardware-software that acts as an entire company, letting founders and C-suites automate their business pipeline, development, deployment, and maintenance across all digital aspects. Mission: To empower business and start-ups with radiant technology solutions that drive innovation, efficiency, and growth in the digital age.',
            },
            about: [
                {
                    '@type': 'CreativeWork',
                    name: 'Pillar 1 — Delivering Solutions',
                    description: 'Delivering solutions to businesses and startups internationally.',
                },
                {
                    '@type': 'CreativeWork',
                    name: 'Pillar 2 — Seamless Systems & Apps',
                    description: 'Helping global workflows using our seamless systems and interesting apps by Delvare.',
                },
                {
                    '@type': 'CreativeWork',
                    name: 'Pillar 3 — Software-Hardware Evolution',
                    description:
                        'Researching on utilising the software-hardware evolution for the future AI systems that automates almost everything digitally possible.',
                },
            ],
        },
        {
            '@type': 'ItemList',
            name: 'Clients of Delvare',
            description:
                'Products built, run and grown by Delvare — from billing platforms to literature networks and global third-party clients.',
            itemListElement: clientsSeo.map((client, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: client.name,
                url: client.url,
            })),
        },
    ],
};

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HomeClient />
        </>
    );
}