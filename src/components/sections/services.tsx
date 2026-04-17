'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cloud, BarChart, ShieldCheck, ArrowRight, Zap, Check, Globe, Layout, LifeBuoy, Database, Brain, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation } from '@/hooks/use-location';

const services = [
  {
    title: "Software for Business",
    slug: "software-design",
    description: "We build strong, safe software that grows with your business and works everywhere.",
    price: 9999,
    icon: <Database className="w-8 h-8" />,
    features: ["Custom Software", "Easy to Scale", "Works Together"],
    accent: "bg-primary shadow-primary/20",
  },
  {
    title: "Websites & Apps",
    slug: "software-design",
    description: "Fast, beautiful websites that help you find more customers and look great on phones.",
    price: 4999,
    icon: <Layout className="w-8 h-8" />,
    features: ["Super Fast", "Modern Look", "Easy to Manage"],
    accent: "bg-brand-dark shadow-black/20",
  },
  {
    title: "Cloud Hosting",
    slug: "cloud-hosting",
    description: "Simple, fast cloud setups that keep your site online 24/7 without costing a fortune.",
    price: 2999,
    icon: <Cloud className="w-8 h-8" />,
    features: ["Fast Loading", "Safe Backups", "Low Cost"],
    accent: "bg-primary/80 shadow-primary/10",
  },
  {
    title: "Expert Maintenance",
    slug: "technical-sla",
    description: "We watch over your site 24/7 so you never have to worry about tech problems again.",
    price: 499,
    icon: <LifeBuoy className="w-8 h-8" />,
    features: ["24/7 Support", "Updates Included", "Safety First"],
    accent: "bg-brand-dark shadow-black/20",
  },
  {
    title: "Business Advice",
    slug: "technical-consulting",
    description: "We help you understand your data and find the best ways to grow your company.",
    price: 1499,
    icon: <BarChart className="w-8 h-8" />,
    features: ["Search Growth", "Save Money", "New Customers"],
    accent: "bg-primary/60 shadow-primary/5",
  },
  {
    title: "Safety & Protection",
    slug: "cyber-security",
    description: "We protect your data and your customers from hackers with the best security tools.",
    price: 3499,
    icon: <ShieldCheck className="w-8 h-8" />,
    features: ["Hacker Proof", "Data Privacy", "Safe Shopping"],
    accent: "bg-black shadow-black/20",
  },
  {
    title: "AI Solutions",
    slug: "ai-ecosystems",
    description: "We build custom AI tools that help your business automate tasks and make better decisions.",
    price: 7999,
    icon: <Brain className="w-8 h-8" />,
    features: ["Custom AI Bots", "Smart Automation", "Data Insights"],
    accent: "bg-purple-600 shadow-purple-600/20",
  },
  {
    title: "Old System Updates",
    slug: "legacy-migration",
    description: "We move your old software to the cloud safely so it works faster and better.",
    price: 5999,
    icon: <GitBranch className="w-8 h-8" />,
    features: ["No Data Loss", "Modern Cloud", "Fast Speed"],
    accent: "bg-indigo-600 shadow-indigo-600/20",
  },
];

const pricingData: Record<string, { currency: string, symbol: string, rate: number, name: string }> = {
  'US': { currency: 'USD', symbol: '$', rate: 1, name: 'United States' },
  'GB': { currency: 'GBP', symbol: '£', rate: 0.79, name: 'United Kingdom' },
  'EU': { currency: 'EUR', symbol: '€', rate: 0.92, name: 'Europe' },
  'IN': { currency: 'INR', symbol: '₹', rate: 83, name: 'India' },
  'CA': { currency: 'CAD', symbol: 'C$', rate: 1.35, name: 'Canada' },
  'AU': { currency: 'AUD', symbol: 'A$', rate: 1.52, name: 'Australia' },
  'JP': { currency: 'JPY', symbol: '¥', rate: 150, name: 'Japan' },
  'CN': { currency: 'CNY', symbol: '¥', rate: 7.2, name: 'China' },
  'AE': { currency: 'AED', symbol: 'dh', rate: 3.67, name: 'UAE' },
  'SG': { currency: 'SGD', symbol: 'S$', rate: 1.34, name: 'Singapore' },
  'Global': { currency: 'USD', symbol: '$', rate: 1, name: 'Global' }
};

const ServicesSection = () => {
  const { countryCode, isLoading } = useLocation();
  const [currentRegion, setCurrentRegion] = useState('Global');
  const [showSpecs, setShowSpecs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    if (!isLoading && countryCode) {
      if (pricingData[countryCode]) {
        setCurrentRegion(countryCode);
      } else if (['DE', 'FR', 'IT', 'ES', 'NL'].includes(countryCode)) {
        setCurrentRegion('EU');
      } else {
        setCurrentRegion('Global');
      }
    }
  }, [countryCode, isLoading]);

  const formatPrice = (basePrice: number) => {
    const data = pricingData[currentRegion] || pricingData['Global'];
    const { currency, rate } = data;
    const value = Math.round(basePrice * rate);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(value);
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('services-carousel');
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="w-full relative py-20 lg:py-32 overflow-hidden bg-[#fafafa]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-40" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none opacity-40" />

      {/* Modern Mesh Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-primary/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Explore Our Skills</span>
            </div>
            <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter mb-6 text-foreground">
              Our <span className="text-primary italic font-light">Services </span>
              <span className="text-muted-foreground/40 font-thin">List.</span>
            </h2>

            {/* Search Input for Tool Feel */}
            <div className="relative max-w-md group">
              <input
                type="text"
                placeholder="Search protocols (e.g. AI, Cloud, Security)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 bg-white border border-border rounded-xl px-12 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <Zap className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-border shadow-sm">
              <Button
                variant={!showSpecs ? "default" : "ghost"}
                size="sm"
                onClick={() => setShowSpecs(false)}
                className="rounded-lg text-[10px] font-black uppercase tracking-widest px-4"
              >
                Concepts
              </Button>
              <Button
                variant={showSpecs ? "default" : "ghost"}
                size="sm"
                onClick={() => setShowSpecs(true)}
                className="rounded-lg text-[10px] font-black uppercase tracking-widest px-4"
              >
                Specs
              </Button>
            </div>
            <div className="hidden lg:flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full border-border hover:bg-secondary transition-all" onClick={() => scroll('left')}>
                <ArrowRight className="w-5 h-5 rotate-180" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full border-border hover:bg-secondary transition-all" onClick={() => scroll('right')}>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          id="services-carousel"
          className="flex flex-col lg:flex-row gap-6 lg:overflow-x-auto pb-12 lg:snap-x lg:snap-mandatory hide-scrollbar lg:touch-pan-x lg:overscroll-x-contain"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {filteredServices.length > 0 ? (
            filteredServices.map((service, idx) => (
              <div
                key={idx}
                className="w-full lg:min-w-[480px] lg:snap-start"
              >
                {/* Desktop Card - stays vertical */}
                <Card className="hidden lg:flex group h-[520px] bg-white border border-border/60 hover:border-primary/30 overflow-hidden relative transition-all duration-500 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] flex-col">
                  {/* Visual Header */}
                  <div className="h-48 relative overflow-hidden bg-slate-100">
                    <div className="absolute inset-0 z-0">
                      <img
                        src={idx % 2 === 0 ? "/assets/nanotech_abstract_1_1772615413352.png" : "/assets/nanotech_curved_2_1772615432367.png"}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/5 to-transparent z-[1]" />
                    <div className={cn("absolute top-6 left-6 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 z-[2]", service.accent)}>
                      {service.icon}
                    </div>
                    <div className="absolute top-6 right-6 z-[2]">
                      <Badge className="bg-white/90 backdrop-blur-md text-foreground border-border text-[9px] font-black py-1 px-3 uppercase tracking-widest shadow-sm">
                        Service {idx + 1}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex-grow p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-primary font-black text-sm">
                          {currentRegion === 'IN' ? '₹10k+' : `${formatPrice(service.price).split('.')[0]}+`}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                        {service.description}
                      </p>

                      {/* Dynamic Specs or Concepts View */}
                      <div className="pt-4 h-24 overflow-hidden relative">
                        <div className={cn("grid grid-cols-1 gap-2 transition-all duration-500", showSpecs ? "opacity-0 -translate-y-4 scale-95 pointer-events-none" : "opacity-100 transform-none")}>
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                              <Check className="w-3 h-3 text-primary" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        <div className={cn("absolute inset-0 grid grid-cols-2 gap-2 transition-all duration-500", !showSpecs ? "opacity-0 translate-y-4 scale-95 pointer-events-none" : "opacity-100 transform-none")}>
                          <div className="bg-secondary/30 p-2 rounded-lg border border-primary/5">
                            <p className="text-[8px] font-black uppercase text-primary mb-1">Availability</p>
                            <p className="text-xs font-bold">99.98%</p>
                          </div>
                          <div className="bg-secondary/30 p-2 rounded-lg border border-primary/5">
                            <p className="text-[8px] font-black uppercase text-primary mb-1">Latency</p>
                            <p className="text-xs font-bold">&lt; 40ms</p>
                          </div>
                          <div className="bg-secondary/30 p-2 rounded-lg border border-primary/5">
                            <p className="text-[8px] font-black uppercase text-primary mb-1">Architecture</p>
                            <p className="text-xs font-bold">Modern</p>
                          </div>
                          <div className="bg-secondary/30 p-2 rounded-lg border border-primary/5">
                            <p className="text-[8px] font-black uppercase text-primary mb-1">Security</p>
                            <p className="text-xs font-bold">Safe</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-6">
                      <Link href={`/specialty/${service.slug}`} className="flex-grow">
                        <Button
                          className="w-full h-12 bg-foreground text-background hover:bg-primary hover:text-white transition-all duration-500 rounded-xl font-black uppercase tracking-widest text-[9px]"
                        >
                          Learn More <Zap className="ml-2 w-3 h-3 fill-current" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent('delvare:autofill', {
                            detail: { message: `I am interested in ${service.title}.` }
                          }));
                        }}
                        className="w-12 h-12 rounded-xl border-border hover:bg-secondary transition-all"
                      >
                        <ArrowRight className="w-4 h-4 -rotate-45" />
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Mobile Card - rectangular/horizontal */}
                <Card className="flex lg:hidden group bg-white border border-border/60 p-4 gap-4 items-center rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] mb-4">
                  <div className="flex-grow space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-black tracking-tight text-foreground">
                        {service.title}
                      </h3>
                      <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-widest px-2">
                        {idx + 1}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {service.description}
                    </p>
                    <div className="flex gap-4">
                      {service.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[9px] font-bold text-muted-foreground">
                          <Check className="w-2.5 h-2.5 text-primary" />
                          {feat}
                        </div>
                      ))}
                    </div>
                    <div className="pt-2">
                      <Link href={`/specialty/${service.slug}`}>
                        <Button size="sm" className="h-8 px-4 text-[9px] font-black uppercase tracking-widest bg-primary text-white rounded-lg">
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className={cn("w-20 h-20 shrink-0 rounded-xl flex items-center justify-center text-white shadow-lg", service.accent)}>
                    {service.icon}
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <div className="w-full py-20 text-center">
              <p className="text-muted-foreground font-bold">No matching protocols found in the active catalog.</p>
            </div>
          )}

          {/* Final Exploration Card */}
          <div className="w-full lg:min-w-[320px] lg:snap-start flex items-center justify-center p-8 bg-white/50 backdrop-blur-md rounded-2xl border border-border/60 text-center">
            <div className="space-y-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto border-2 border-primary/20 animate-breath">
                <ArrowRight className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-foreground">Full Catalog</h4>
                <p className="text-sm text-muted-foreground">Detailed Engineering Protocols</p>
              </div>
              <Button
                variant="link"
                className="text-primary font-black uppercase tracking-widest text-xs"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('delvare:autofill', {
                    detail: { message: "Requesting comprehensive service ledger." }
                  }));
                }}
              >
                Request Ledger
              </Button>
            </div>
          </div>
        </div>

        {/* Dynamic Tool Overlay Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-border/40 animate-fade-in-up [animation-delay:800ms]">
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-white text-[10px] font-black">+42</div>
            </div>
            <p className="text-xs font-bold text-muted-foreground">
              <span className="text-foreground">Active Projects</span> in 12+ Countries
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none">Speed</p>
              <p className="text-xl font-black text-foreground">18ms <span className="text-[10px] align-top text-primary">avg</span></p>
            </div>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 transition-all font-black uppercase tracking-widest text-[9px] px-8"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('delvare:autofill', {
                  detail: { message: "I want to see the full list of services." }
                }));
              }}
            >
              See All Services <Globe className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
