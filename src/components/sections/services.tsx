'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cloud, BarChart3, ShieldCheck, ArrowRight, Zap, Check, Globe, Layout, LifeBuoy, Database, Brain, TrendingUp, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation } from '@/hooks/use-location';
import { useRouter } from 'next/navigation';
import { FadeIn, StaggerContainer, StaggerItem, TypingText } from '@/components/ui/motion';

const services = [
  {
    title: "SEO & Digital Presence",
    slug: "seo-optimization",
    description: "Improve your search engine rankings and increase your online visibility to reach more potential customers.",
    price: 4000,
    icon: <TrendingUp className="w-8 h-8" />,
    features: ["Keyword Strategy", "Content Marketing", "Technical SEO", "Performance Analysis", "Organic Search Growth", "Local SEO"],
    accent: "bg-orange-500 shadow-orange-500/20",
    image: "/assets/services/seo.png"
  },
  {
    title: "Strategic Business Analysis",
    slug: "business-analyst",
    description: "In-depth analysis of your business performance to guide strategic decision-making and operational improvements.",
    price: 12000,
    icon: <BarChart3 className="w-8 h-8" />,
    features: ["Operational Efficiency", "Market Analysis", "Strategic Planning"],
    accent: "bg-yellow-500 shadow-yellow-500/20",
    image: "/assets/services/support.png"
  },
  {
    title: "Custom Software Solutions",
    slug: "software-engineering",
    description: "Bespoke software applications tailored to meet your unique business requirements and goals.",
    price: 20000,
    icon: <Database className="w-8 h-8" />,
    features: ["Enterprise Software", "Web Applications", "Scalable Systems"],
    accent: "bg-blue-600 shadow-blue-600/20",
    image: "/assets/services/software.png"
  },
  {
    title: "Business Intelligence Dashboards",
    slug: "ai-dashboard",
    description: "Centralized dashboards providing real-time data insights to manage your operations effectively.",
    price: 15000,
    icon: <Globe className="w-8 h-8" />,
    features: ["Real-time Reporting", "Data Visualization", "Operational Oversight"],
    accent: "bg-indigo-600 shadow-indigo-600/20",
    image: "/assets/projects/p2.png"
  },
  {
    title: "Process Automation & AI",
    slug: "ai-ecosystems",
    description: "Streamline repetitive tasks and integrate AI to increase productivity and reduce costs.",
    price: 10000,
    icon: <Brain className="w-8 h-8" />,
    features: ["Workflow Automation", "AI Integration", "Process Optimization"],
    accent: "bg-purple-600 shadow-purple-600/20",
    image: "/assets/services/ai.png"
  },
  {
    title: "UI/UX Design & Strategy",
    slug: "software-design",
    description: "User-focused design that enhances engagement and improves the usability of your digital products.",
    price: 4999,
    icon: <Layout className="w-8 h-8" />,
    features: ["User Research", "Interface Design", "Usability Testing"],
    accent: "bg-emerald-500 shadow-emerald-500/20",
    image: "/assets/services/design.png"
  },
  {
    title: "Cloud Infrastructure",
    slug: "cloud-hosting",
    description: "Secure and reliable cloud management services to ensure your business stays online and efficient.",
    price: 2999,
    icon: <Cloud className="w-8 h-8" />,
    features: ["Cloud Migration", "Hosting Solutions", "Architecture Design"],
    accent: "bg-cyan-500 shadow-cyan-500/20",
    image: "/assets/services/cloud.png"
  },
  {
    title: "Professional Cybersecurity",
    slug: "cyber-security",
    description: "Protect your digital assets and customer data with proactive security monitoring and defense strategies.",
    price: 3499,
    icon: <ShieldCheck className="w-8 h-8" />,
    features: ["Security Audits", "Data Protection", "Threat Mitigation"],
    accent: "bg-red-600 shadow-red-600/20",
    image: "/assets/services/security.png"
  },
  {
    title: "Business Support & Consulting",
    slug: "technical-sla",
    description: "On-demand technical support and consulting to keep your systems running smoothly.",
    price: 499,
    icon: <LifeBuoy className="w-8 h-8" />,
    features: ["Technical Consulting", "Maintenance Support", "Process Guidance"],
    accent: "bg-amber-500 shadow-amber-500/20",
    image: "/assets/services/support.png"
  },
];

const pricingData: Record<string, { currency: string, symbol: string, rate: number, name: string }> = {
  'US': { currency: 'USD', symbol: '$', rate: 1, name: 'United States' },
  'IN': { currency: 'INR', symbol: '₹', rate: 83, name: 'India' },
  'Global': { currency: 'USD', symbol: '$', rate: 1, name: 'Global' }
};

const ServicesSection = () => {
  const router = useRouter();
  const { countryCode, isLoading } = useLocation();
  const [currentRegion, setCurrentRegion] = useState('Global');
  const [showSpecs, setShowSpecs] = useState(false);
  const [budget, setBudget] = useState<string>('');

  useEffect(() => {
    if (!isLoading && countryCode && pricingData[countryCode]) {
      setCurrentRegion(countryCode);
    }
  }, [countryCode, isLoading]);

  const convertPrice = (value: number) => {
    const region = pricingData[currentRegion] || pricingData['Global'];
    const convertedValue = value * region.rate;
    const currency = region.currency;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(convertedValue);
  };

  const filteredServices = services.filter(s => {
    if (!budget) return true;
    const numericBudget = parseFloat(budget);
    if (isNaN(numericBudget)) return true;
    const region = pricingData[currentRegion] || pricingData['Global'];
    // Compare in base price (₹ / USD)
    return s.price <= (numericBudget / region.rate);
  });


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
        <div className="flex flex-col justify-center items-center mb-16 gap-8">
          <div className="w-full max-w-4xl">
            <FadeIn delay={0.2} className="text-center max-w-4xl mx-auto mb-32">
              <Badge variant="outline" className="mb-6 border-primary/20 py-1.5 px-6 text-[10px] font-black tracking-[0.3em] uppercase text-primary/60 bg-primary/5">
                Our Foundation
              </Badge>
              <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tight mb-12">
                <TypingText text="Vision" delay={0.3} />{' '}
                <span className="text-primary italic font-light">& Mission.</span>
              </h2>
              <div className="space-y-10 text-left bg-white p-8 md:p-12 rounded-[2rem] border border-border/50 shadow-sm">
                <div>
                   <h3 className="text-2xl font-black text-foreground mb-4">Vision</h3>
                   <p className="text-lg text-muted-foreground leading-relaxed font-medium italic">"A leading organisation adapting fast-growing changes and modern frameworks available for public. To support the growth of ongoing business and tech community. To dive in the fundamentals for reinventions."</p>
                   <div className="flex flex-wrap gap-3 mt-4">
                      <Badge className="bg-primary/10 text-primary border-none font-bold uppercase tracking-widest text-[10px]">Adaptive Learning</Badge>
                      <Badge className="bg-primary/10 text-primary border-none font-bold uppercase tracking-widest text-[10px]">Innovations</Badge>
                      <Badge className="bg-primary/10 text-primary border-none font-bold uppercase tracking-widest text-[10px]">Product / Service</Badge>
                   </div>
                </div>
                <div>
                   <h3 className="text-2xl font-black text-foreground mb-4">Mission</h3>
                   <p className="text-lg text-muted-foreground leading-relaxed font-medium italic">"Tech has changed. The idea has been rediscovered. At Delvare, we analyse our clients business nature and requirements delivering the perfect solution they require for a lifetime."</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4} className="text-center max-w-4xl mx-auto mb-16">
               <h3 className="text-4xl md:text-5xl font-black tracking-tighter">Showcasing All Our Fields</h3>
            </FadeIn>

            {/* Empty space for structural consistency */}
            <div className="h-0"></div>

          </div>
        </div>

        <div className="flex justify-between items-center mb-12">
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
          </div>
        </div>

        {/* Services Grid Container */}
        <StaggerContainer
          id="services-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12"
          staggerDelay={0.08}
        >
          {filteredServices.length > 0 ? (
            filteredServices.map((service, idx) => (
              <StaggerItem
                key={idx}
                className="w-full h-full"
              >
                {/* Desktop Card - stays vertical */}
                <Card 
                  onClick={() => router.push(`/main/${service.slug}`)}
                  className="hidden lg:flex group h-[520px] bg-white border border-border/60 hover:border-primary/30 overflow-hidden relative transition-all duration-500 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] flex-col cursor-pointer"
                >
                  {/* Visual Header */}
                  <div className="h-48 relative overflow-hidden bg-slate-100">
                    <div className="absolute inset-0 z-0">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/5 z-[1]" />
                    <div className={cn("absolute top-6 left-6 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 z-[2]", service.accent)}>
                      {service.icon}
                    </div>
                    <div className="absolute top-6 right-6 z-[2] flex flex-col gap-2 items-end">
                      <Badge className="bg-white/90 backdrop-blur-md text-foreground border-border text-[9px] font-black py-1 px-3 uppercase tracking-widest shadow-sm">
                        Service {idx + 1}
                      </Badge>
                      {service.title.includes('Marketing') && (
                        <Badge className="bg-orange-500 text-white border-none text-[9px] font-black py-1 px-3 uppercase tracking-widest shadow-lg animate-pulse">
                          Super Plan Active
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex-grow p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-primary font-black text-sm">
                          {currentRegion === 'IN' ? '₹10k+' : `${convertPrice(service.price).split('.')[0]}+`}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                        {service.description}
                      </p>

                      {/* Dynamic Specs or Concepts View */}
                      <div className="pt-4 h-24 overflow-hidden relative">
                        <div className={cn("grid grid-cols-2 gap-x-4 gap-y-2 transition-all duration-500", showSpecs ? "opacity-0 -translate-y-4 scale-95 pointer-events-none" : "opacity-100 transform-none")}>
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">
                              <Check className="w-3 h-3 text-primary shrink-0" />
                              <span className="truncate">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-6">
                      <Link href={`/main/${service.slug}`} className="flex-grow">
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
                <Card 
                  onClick={() => router.push(`/main/${service.slug}`)}
                  className="flex lg:hidden group bg-white border border-border/60 p-4 gap-4 items-center rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] mb-4 cursor-pointer"
                >
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
                      <Link href={`/main/${service.slug}`}>
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
              </StaggerItem>
            ))
          ) : (
            <div className="w-full py-20 text-center col-span-full">
              <p className="text-muted-foreground font-bold">No matching protocols found in the active catalog.</p>
            </div>
          )}

        </StaggerContainer>
      </div>
    </section>
  );
};

export default ServicesSection;
