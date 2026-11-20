import Header from '@/components/header';
import Footer from '@/components/footer';
import Hero from './_components/hero';
import JournalSection from './_components/journal';
import MetricsSection from './_components/metrics';
import RoadmapSection from './_components/roadmap';
import ScrollGlow from './_components/scroll-glow';
import Spotlights from './_components/spotlights';
import { siteConfig } from '@/lib/site-config';
import { serializeJsonLd } from '@/lib/json-ld';
import { FOUNDER_DATA } from './constants';

/**
 * Founder portfolio.
 *
 * The page itself is a server component; only the interactive islands
 * (`ScrollGlow`, `CommitActivity`, `RoadmapSection`, `FounderAge`) hydrate.
 */
export default function FounderPortfolioPage() {
    const founderJsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ProfilePage',
                '@id': `${siteConfig.url}/founder#webpage`,
                url: `${siteConfig.url}/founder`,
                name: `${FOUNDER_DATA.name} — Founder & CEO, Delvare`,
                isPartOf: {
                    '@type': 'WebSite',
                    '@id': `${siteConfig.url}#website`,
                    url: siteConfig.url,
                    name: siteConfig.name,
                },
                mainEntity: {
                    '@type': 'Person',
                    '@id': `${siteConfig.url}/founder#person`,
                    name: FOUNDER_DATA.name,
                    jobTitle: FOUNDER_DATA.role,
                    worksFor: {
                        '@type': 'Organization',
                        name: siteConfig.name,
                        url: siteConfig.url,
                    },
                    description: FOUNDER_DATA.bio,
                    url: `${siteConfig.url}/founder`,
                    image: `${siteConfig.url}${FOUNDER_DATA.profileUrl}`,
                    sameAs: [
                        FOUNDER_DATA.socials.github,
                        FOUNDER_DATA.socials.linkedin,
                    ],
                    knowsAbout: [
                        'Custom Software Development',
                        'SaaS Platform Development',
                        'Cloud Infrastructure',
                        'Cybersecurity',
                        'AI Automation',
                        'Next.js',
                        'Flutter',
                        'Full-Stack Engineering',
                    ],
                },
            },
        ],
    };

    return (
        <div className="min-h-screen bg-[#030303] text-white selection:bg-primary/30 selection:text-white font-sans overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(founderJsonLd) }}
            />
            <ScrollGlow />
            <Header />

            <main className="relative z-10 pt-32 pb-20">
                <Hero />
                <MetricsSection />
                <RoadmapSection />
                <JournalSection />
                <Spotlights />
            </main>

            <Footer />
        </div>
    );
}
