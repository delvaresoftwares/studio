import Header from '@/components/header';
import Footer from '@/components/footer';
import Hero from './_components/hero';
import JournalSection from './_components/journal';
import MetricsSection from './_components/metrics';
import RoadmapSection from './_components/roadmap';
import ScrollGlow from './_components/scroll-glow';
import Spotlights from './_components/spotlights';

/**
 * Founder portfolio.
 *
 * The page itself is a server component; only the interactive islands
 * (`ScrollGlow`, `CommitActivity`, `RoadmapSection`, `FounderAge`) hydrate.
 */
export default function FounderPortfolioPage() {
    return (
        <div className="min-h-screen bg-[#030303] text-white selection:bg-primary/30 selection:text-white font-sans overflow-hidden">
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
