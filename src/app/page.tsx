import Header from '@/components/header';
import HeroSection from '@/components/sections/hero';
import ServicesSection from '@/components/sections/services';
import TechFeaturesSection from '@/components/sections/tech-features';
import CostEstimatorSection from '@/components/sections/cost-estimator';
import GameSpaceSection from '@/components/sections/game-space';
import ContactSection from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <TechFeaturesSection />
        <CostEstimatorSection />
        <GameSpaceSection />
        <ContactSection />
      </main>
    </div>
  );
}
