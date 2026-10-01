import Header from '@/components/header';
import HeroSection from '@/components/sections/hero';
import KeywordMarquee from '@/components/sections/keywords';
import ServicesSection from '@/components/sections/services';
import ProductsSection from '@/components/sections/products';
import Footer from '@/components/footer';

export default function HomeClient() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-foreground">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <KeywordMarquee />
        <ServicesSection />
        <ProductsSection />
        <Footer />
      </main>
    </div>
  );
}