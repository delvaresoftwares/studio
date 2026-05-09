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

const services = [
  {
    title: "Delvare Fixing SEO",
    slug: "seo-optimization",
    description: "We breathe life into your brand, building deep trust and emotional connections that drive real growth.",
    price: 4000,
    icon: <TrendingUp className="w-8 h-8" />,
    features: ["Emotional Storytelling", "Trust Content", "Creative Strategies", "Audience Empathy", "Organic Growth", "Technical SEO"],
    accent: "bg-orange-500 shadow-orange-500/20",
    image: "/assets/services/seo.png"
  },
  {
    title: "Business Analyst",
    slug: "business-analyst",
    description: "Analyzing financial and economic factors to ideate further.",
    price: 12000,
    icon: <BarChart3 className="w-8 h-8" />,
    features: ["Financial Analysis", "Growth Modeling", "Risk Assessment"],
    accent: "bg-yellow-500 shadow-yellow-500/20",
    image: "/assets/services/support.png"
  },
  {
    title: "Software Engineering",
    slug: "software-engineering",
    description: "Your idea, our engineering, together we share flight.",
    price: 20000,
    icon: <Database className="w-8 h-8" />,
    features: ["Emerging Frameworks", "PaaS Architecture", "High-Availability"],
    accent: "bg-blue-600 shadow-blue-600/20",
    image: "/assets/services/software.png"
  },
  {
    title: "AI Integrated Dashboards",
    slug: "ai-dashboard",
    description: "We interconnect your systems and let AI handle simple tasks.",
    price: 15000,
    icon: <Globe className="w-8 h-8" />,
    features: ["System Interconnection", "Automated Tasks", "Enterprise Oversight"],
    accent: "bg-indigo-600 shadow-indigo-600/20",
    image: "/assets/projects/p2.png"
  },
  {
    title: "AI & Automation",
    slug: "ai-ecosystems",
    description: "Focuses on training, tuning and automating functions.",
    price: 10000,
    icon: <Brain className="w-8 h-8" />,
    features: ["LLM Fine-Tuning", "RAG Implementation", "Neural Networks"],
    accent: "bg-purple-600 shadow-purple-600/20",
    image: "/assets/services/ai.png"
  },
  {
    title: "UI/UX Design",
    slug: "software-design",
    description: "Share your brand's value with Delvare UI/UX psychology.",
    price: 4999,
    icon: <Layout className="w-8 h-8" />,
    features: ["UI/UX Psychology", "Cognitive Load", "Micro-Interactions"],
    accent: "bg-emerald-500 shadow-emerald-500/20",
    image: "/assets/services/design.png"
  },
  {
    title: "Cloud Solutions",
    slug: "cloud-hosting",
    description: "Manage, migrate, and start cloud systems for business efficiency.",
    price: 2999,
    icon: <Cloud className="w-8 h-8" />,
    features: ["Cloud Migration", "System Management", "Architecture Setup"],
    accent: "bg-cyan-500 shadow-cyan-500/20",
    image: "/assets/services/cloud.png"
  },
  {
    title: "Cyber Security",
    slug: "cyber-security",
    description: "Analyse testing, training and tuning AI models securely.",
    price: 3499,
    icon: <ShieldCheck className="w-8 h-8" />,
    features: ["AI Model Security", "Vulnerability Scans", "Zero-Trust Auth"],
    accent: "bg-red-600 shadow-red-600/20",
    image: "/assets/services/security.png"
  },
  {
    title: "Managed Support",
    slug: "technical-sla",
    description: "Handle, business consultancy, analysis and our stake.",
    price: 499,
    icon: <LifeBuoy className="w-8 h-8" />,
    features: ["Business Consultancy", "Technical Handling", "Mutual Growth Stake"],
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
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-xl">
            <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in-up">
              <Badge variant="outline" className="mb-6 border-primary/20 py-1.5 px-6 text-[10px] font-black tracking-[0.3em] uppercase text-primary/60 bg-primary/5">
                Market Situation Analysis
              </Badge>
              <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tight mb-8">
                Delivering{' '}
                <span className="text-primary italic font-light">Astonishing</span> Results.
              </h2>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                We analyze your business criteria and market situations to deploy major marketing automations and AI integrations that <span className="text-foreground font-bold">pivot your brand</span> to market leadership.
              </p>
            </div>

            {/* Pivot Hook: Budget Input */}
            <div className="relative group w-full max-w-md animate-fade-in-up mt-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative flex items-center bg-white border-2 border-border/60 rounded-2xl p-1 shadow-xl focus-within:border-primary/40 transition-all duration-500">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/5 text-primary ml-1">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="number"
                  placeholder="Enter your budget (e.g. 4000)..."
                  className="flex-grow bg-transparent border-none focus:ring-0 px-4 py-3 text-lg font-black text-foreground placeholder:text-muted-foreground/40"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
                {budget && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 rounded-lg mr-1 hover:bg-red-50 text-red-400"
                    onClick={() => setBudget('')}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6 animate-fade-in-up [animation-delay:100ms]">
              <Badge variant="outline" className="bg-white/50 border-border py-1 px-3 text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">
                ₹4k: Marketing
              </Badge>
              <Badge variant="outline" className="bg-white/50 border-border py-1 px-3 text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">
                ₹15k: AI Dashboard
              </Badge>
              <Badge variant="outline" className="bg-white/50 border-border py-1 px-3 text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">
                ₹20k: Software
              </Badge>
            </div>
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
        <div
          id="services-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12"
        >
          {filteredServices.length > 0 ? (
            filteredServices.map((service, idx) => (
              <div
                key={idx}
                className="w-full"
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
              </div>
            ))
          ) : (
            <div className="w-full py-20 text-center">
              <p className="text-muted-foreground font-bold">No matching protocols found in the active catalog.</p>
            </div>
          )}

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
                window.dispatchEvent(new CustomEvent('open-contact-form'));
              }}
            >
              Start Project <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
