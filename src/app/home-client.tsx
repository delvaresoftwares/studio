'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/header';
import HeroSection from '@/components/sections/hero';
import KeywordMarquee from '@/components/sections/keywords';
import ServicesSection from '@/components/sections/services';
import ProductsSection from '@/components/sections/products';

import Footer from '@/components/footer';
import BackgroundDecor from '@/components/background-decor';

const ClientsSection = dynamic(() => import('@/components/sections/clients'), {
  ssr: false,
  loading: () => null,
});

import { useState } from 'react';

export default function HomeClient() {
  const [quotationData, setQuotationData] = useState<any>(null);

  return (
    <div className="flex flex-col min-h-screen bg-white text-foreground">
      <BackgroundDecor />
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <KeywordMarquee />
        <ServicesSection />
        <ProductsSection />
        <ClientsSection />

        <Footer />
      </main>
    </div>
  );
  }
