'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Smartphone, Cloud, PenTool, BarChart, ShieldCheck, ArrowRight, Zap, Check, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation } from '@/hooks/use-location';

const services = [
  {
    title: "Software Development",
    description: "Enterprise-grade architectures built for massive scale.",
    price: 9999,
    icon: <Code className="w-8 h-8" />,
    features: ["Custom Architecture", "High Scalability", "Microservices"],
    gradient: "from-blue-500 to-cyan-400",
    colSpan: "lg:col-span-2",
  },
  {
    title: "Websites & Portals",
    description: "Award-winning designs that convert visitors.",
    price: 4999,
    icon: <Smartphone className="w-8 h-8" />,
    features: ["SEO Optimized", "Interactive UI", "CMS Integration"],
    gradient: "from-purple-500 to-pink-500",
    colSpan: "lg:col-span-1",
  },
  {
    title: "Cloud Infrastructure",
    description: "Secure, reliable, and serverless solution deployment.",
    price: 2999,
    icon: <Cloud className="w-8 h-8" />,
    features: ["AWS/Azure", "Auto-scaling", "Cost Optimization"],
    gradient: "from-orange-500 to-amber-400",
    colSpan: "lg:col-span-1",
  },
  {
    title: "SLA Maintenance",
    description: "24/7 uptime guarantees and rapid incident response.",
    price: 499,
    icon: <Zap className="w-8 h-8" />,
    features: ["24/7 Support", "Performance Monitoring", "Security Patches"],
    gradient: "from-emerald-500 to-green-400",
    colSpan: "lg:col-span-2",
  },
  {
    title: "Business Analysis",
    description: "Data-driven insights to unlock new growth channels.",
    price: 1499,
    icon: <BarChart className="w-8 h-8" />,
    features: ["Market Research", "Process Optimization", "Growth Strategy"],
    gradient: "from-indigo-500 to-violet-500",
    colSpan: "lg:col-span-1",
  },
  {
    title: "Security Engineering",
    description: "Military-grade protection for your digital assets.",
    price: 3499,
    icon: <ShieldCheck className="w-8 h-8" />,
    features: ["Penetration Testing", "Compliance", "Threat Detection"],
    gradient: "from-red-500 to-rose-500",
    colSpan: "lg:col-span-2",
  },
];

// Comprehensive pricing database mock
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
  'DE': { currency: 'EUR', symbol: '€', rate: 0.92, name: 'Germany' }, // Fallback to EU currency
  'FR': { currency: 'EUR', symbol: '€', rate: 0.92, name: 'France' },
  // Default fallback
  'Global': { currency: 'USD', symbol: '$', rate: 1, name: 'Global' }
};

const ServicesSection = () => {
  const { countryCode, isLoading } = useLocation();
  const [currentRegion, setCurrentRegion] = useState('Global');

  useEffect(() => {
    if (!isLoading && countryCode) {
      // Check if exact code exists, else check for EU countries or fallback
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

  return (
    <section id="services" className="w-full relative py-32 overflow-hidden bg-background">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-500 animate-fade-in-up">
              Engineering the Possibility
            </Badge>
            <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tight mb-6 animate-fade-in-up [animation-delay:100ms]">
              Solutions <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                Beyond Limits.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in-up [animation-delay:200ms]">
              We deliver full-cycle software development services that adapt to your business needs and grow with your ambition.
            </p>
          </div>

          {/* Region Indicator */}
          <div className="flex flex-col items-end gap-2 animate-fade-in-up [animation-delay:300ms]">
            {currentRegion === 'IN' && (
              <Badge className="bg-emerald-500 text-white border-none animate-pulse">
                Special Offer: India Launch
              </Badge>
            )}
            <div className="flex items-center gap-3 p-2 pr-4 bg-secondary/30 backdrop-blur-md rounded-full border border-foreground/10 dark:border-white/10">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Globe className="w-4 h-4" />
              </div>
              <div className="text-sm">
                <span className="block text-xs text-muted-foreground uppercase font-bold tracking-wider">Region Detected</span>
                <span className="font-bold text-foreground">
                  {isLoading ? 'Locating...' : (pricingData[currentRegion]?.name || 'Global')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className={cn("group relative animate-fade-in-up", service.colSpan)} style={{ animationDelay: `${idx * 100}ms` }}>
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl rounded-3xl",
                service.gradient
              )} />
              <Card className="h-full bg-card/40 backdrop-blur-xl border-foreground/10 dark:border-white/10 overflow-hidden relative transition-all duration-500 group-hover:translate-y-[-5px] group-hover:border-foreground/20 dark:group-hover:border-white/20 shadow-lg hover:shadow-2xl">
                {/* Card Inner Glow */}
                <div className={cn("absolute top-0 right-0 w-64 h-64 bg-gradient-to-br opacity-5 group-hover:opacity-20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-500", service.gradient)} />

                <CardHeader className="relative z-10 pb-2">
                  <div className="flex justify-between items-start">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform duration-500", service.gradient)}>
                      {service.icon}
                    </div>
                    <Badge variant="secondary" className="bg-foreground/5 dark:bg-white/5 hover:bg-foreground/10 dark:hover:bg-white/10 text-muted-foreground font-normal backdrop-blur-md border-foreground/5 dark:border-white/5">
                      Service
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{service.title}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground/80">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 space-y-8 pt-4">
                  <div className="space-y-3">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        <div className="w-5 h-5 rounded-full bg-foreground/5 dark:bg-white/5 flex items-center justify-center text-emerald-500">
                          <Check className="w-3 h-3" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-foreground/5 dark:border-white/5">
                    <div className="flex flex-col">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Starting from</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-black text-foreground group-hover:text-emerald-400 transition-colors duration-300">
                          {currentRegion === 'IN' ? '₹10,000' : formatPrice(service.price)}
                        </p>
                        {currentRegion === 'IN' && (
                          <span className="text-sm text-muted-foreground line-through opacity-70">
                            {formatPrice(service.price)}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      size="icon"
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('delvare:autofill', {
                          detail: { message: `I am interested in your ${service.title} service. Please provide more details about the pricing and timeline.` }
                        }));
                      }}
                      className="rounded-full w-12 h-12 bg-foreground/5 dark:bg-white/5 hover:bg-emerald-500 text-foreground dark:text-white dark:hover:text-white hover:text-white border border-foreground/10 dark:border-white/10 transition-all duration-300 group-hover:scale-110"
                    >
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
