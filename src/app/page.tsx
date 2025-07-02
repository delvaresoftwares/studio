import Header from '@/components/header';
import HeroSection from '@/components/sections/hero';
import ServicesSection from '@/components/sections/services';
import TechFeaturesSection from '@/components/sections/tech-features';
import CostEstimatorSection from '@/components/sections/cost-estimator';
import GameSpaceSection from '@/components/sections/game-space';
import ContactSection from '@/components/sections/contact';
import Footer from '@/components/footer';
import BackgroundDecor from '@/components/background-decor';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <BackgroundDecor />
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <TechFeaturesSection />
        <CostEstimatorSection />
        <GameSpaceSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
