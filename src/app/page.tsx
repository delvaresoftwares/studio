import Header from '@/components/header';
import HeroSection from '@/components/sections/hero';
import KeywordMarquee from '@/components/sections/keywords';
import ServicesSection from '@/components/sections/services';
import CareerSection from '@/components/sections/careers';
import TechFeaturesSection from '@/components/sections/tech-features';
import CostEstimatorSection from '@/components/sections/cost-estimator';
import GameSpaceSection from '@/components/sections/game-space';
import ContactSection from '@/components/sections/contact';
import Footer from '@/components/footer';
import BackgroundDecor from '@/components/background-decor';
import WhatsAppButton from '@/components/whatsapp-button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <BackgroundDecor />
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <KeywordMarquee />
        <ServicesSection />
        <CareerSection />
        <TechFeaturesSection />
        <CostEstimatorSection />
        <GameSpaceSection />
        <ContactSection />
        <WhatsAppButton />
        <Footer />
      </main>
    </div>
  );
}
