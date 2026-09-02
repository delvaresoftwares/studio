import type { Metadata } from 'next';
import HomeClient from './home-client';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
    title: 'Delvare — Software Development Company | Custom Software, SaaS & AI Solutions',
    description:
        'Delvare is a software development company building custom software, SaaS & PaaS platforms (ECBills.in, Blendly.sbs, Dvenue), AI automation, cloud infrastructure and cybersecurity for businesses worldwide — managed end-to-end by our founder. See our vision, mission and the three pillars behind everything we ship.',
    keywords: [
        'delvare', 'delvare.in', 'software development company', 'custom software development',
        'software development company kerala', 'web development company', 'app development company',
        'SaaS development', 'SaaS platform development', 'PaaS development', 'AI automation',
        'AI integration services', 'cloud infrastructure', 'cybersecurity services', 'UI UX design',
        'digital transformation', 'business automation', 'delvare trinity', 'trinity of delvare',
        'delvare pillars', 'delvare vision', 'delvare mission', 'alfas delvare', 'ecbills',
        'ecbills.in', 'blendly', 'blendly.sbs', 'dvenue', 'masdar al riyadh', 'laynered',
        'spectra school', 'nature of the divine', 'alien hills', 'software hardware evolution',
        'future AI systems',
    ],
    openGraph: {
        title: 'Delvare — Software Development Company | Custom Software, SaaS & AI Solutions',
        description:
            'Custom software, SaaS & PaaS platforms, AI automation, cloud and cybersecurity — built, run and grown by Delvare for clients worldwide. Founder & CEO: Alfas B.',
        url: siteConfig.url,
        images: [
            {
                url: siteConfig.ogImage,
                width: 500,
                height: 500,
                alt: 'Delvare — Software Development Company',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Delvare — Software Development Company',
        description:
            'Custom software, SaaS & AI solutions developed by Delvare. Platforms: ECBills.in, Blendly.sbs, Dvenue and more.',
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
            '@type': 'WebSite',
            name: 'Delvare',
            url: siteConfig.url,
            description: siteConfig.description,
        },
        {
            '@type': 'Organization',
            name: 'Delvare',
            url: siteConfig.url,
            logo: siteConfig.icon,
            image: siteConfig.ogImage,
            email: 'admin@delvare.in',
            founder: {
                '@type': 'Person',
                name: 'Alfas B',
                jobTitle: 'Founder & CEO',
                url: `${siteConfig.url}/founder`,
            },
            description:
                'Delvare is a software development company delivering high-performance business solutions — custom software, SaaS & PaaS platforms, AI automation, cloud & infrastructure, and cybersecurity — for businesses worldwide.',
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
            name: 'Delvare — Software Development Company | Vision, Mission & Our Three Pillars',
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
                    description: 'Delivering custom software and digital solutions to businesses and startups internationally.',
                },
                {
                    '@type': 'CreativeWork',
                    name: 'Pillar 2 — Seamless Systems & Apps by Delvare',
                    description:
                        'Helping global workflows using our seamless systems and apps built by Delvare — ECBills.in, Blendly.sbs, Dvenue and more.',
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
            name: 'Platforms Developed by Delvare',
            description:
                'Every website and platform below was designed, developed, run and grown by Delvare — our own products (ECBills, Blendly, Dvenue) and the websites we have built and manage for international clients.',
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