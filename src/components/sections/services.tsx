'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Smartphone, Cloud, PenTool, BarChart, ShieldCheck, ArrowRight, Zap, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const pricingData = {
  'USA': { currency: 'USD', symbol: '$', rate: 1 },
  'India': { currency: 'INR', symbol: '₹', rate: 83 }, // Approx rate
  'Europe': { currency: 'EUR', symbol: '€', rate: 0.92 } // Approx rate
};

const ServicesSection = () => {
  const [region, setRegion] = useState<'USA' | 'India' | 'Europe'>('USA');

  const formatPrice = (basePrice: number) => {
    const { currency, rate, symbol } = pricingData[region];
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
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-500">Our Expertise</Badge>
            <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tight mb-6">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">The Impossible.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We deliver full-cycle software development services that adapt to your business needs and grow with your ambition.
            </p>
          </div>

          {/* Region Selector */}
          <div className="flex items-center gap-1 p-1 bg-secondary/50 backdrop-blur-md rounded-full border border-white/10">
            {Object.keys(pricingData).map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r as any)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-500",
                  region === r ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className={cn("group relative", service.colSpan)}>
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl rounded-3xl",
                service.gradient
              )} />
              <Card className="h-full bg-card/40 backdrop-blur-xl border-white/10 overflow-hidden relative transition-all duration-500 group-hover:translate-y-[-5px] group-hover:border-white/20">
                {/* Card Inner Glow */}
                <div className={cn("absolute top-0 right-0 w-64 h-64 bg-gradient-to-br opacity-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none", service.gradient)} />

                <CardHeader className="relative z-10">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white bg-gradient-to-br shadow-inner", service.gradient)}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground/80">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 space-y-8">
                  <div className="space-y-3">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-emerald-500">
                          <Check className="w-3 h-3" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Starting from</p>
                      <p className="text-2xl font-black text-foreground">{formatPrice(service.price)}</p>
                    </div>
                    <Button size="icon" className="rounded-full w-12 h-12 bg-white/5 hover:bg-white/10 text-foreground border border-white/10">
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
