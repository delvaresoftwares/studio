'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Cloud,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Check,
  Globe,
  Layout,
  LifeBuoy,
  Database,
  Brain,
  TrendingUp,
  ChevronDown,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation } from '@/hooks/use-location';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import FounderHighlight from '@/components/sections/founder-highlight';

const services = [
  {
    title: "SEO & Digital Presence",
    slug: "seo-optimization",
    description: "Improve your search engine rankings and increase your online visibility to reach more potential customers.",
    price: 4000,
    icon: <TrendingUp className="w-5 h-5" />,
    features: ["Keyword Strategy", "Content Marketing", "Technical SEO", "Performance Analysis", "Organic Search Growth", "Local SEO"],
    accent: "bg-orange-500 shadow-orange-500/20",
    image: "/assets/services/seo.png"
  },
  {
    title: "Strategic Business Analysis",
    slug: "business-analyst",
    description: "In-depth analysis of your business performance to guide strategic decision-making and operational improvements.",
    price: 12000,
    icon: <BarChart3 className="w-5 h-5" />,
    features: ["Operational Efficiency", "Market Analysis", "Strategic Planning"],
    accent: "bg-yellow-500 shadow-yellow-500/20",
    image: "/assets/services/support.png"
  },
  {
    title: "Custom Software Solutions",
    slug: "software-engineering",
    description: "Bespoke software applications tailored to meet your unique business requirements and goals.",
    price: 20000,
    icon: <Database className="w-5 h-5" />,
    features: ["Enterprise Software", "Web Applications", "Scalable Systems"],
    accent: "bg-blue-600 shadow-blue-600/20",
    image: "/assets/services/software.png"
  },
  {
    title: "Business Intelligence Dashboards",
    slug: "ai-dashboard",
    description: "Centralized dashboards providing real-time data insights to manage your operations effectively.",
    price: 15000,
    icon: <Globe className="w-5 h-5" />,
    features: ["Real-time Reporting", "Data Visualization", "Operational Oversight"],
    accent: "bg-indigo-600 shadow-indigo-600/20",
    image: "/assets/projects/p2.png"
  },
  {
    title: "Process Automation & AI",
    slug: "ai-ecosystems",
    description: "Streamline repetitive tasks and integrate AI to increase productivity and reduce costs.",
    price: 10000,
    icon: <Brain className="w-5 h-5" />,
    features: ["Workflow Automation", "AI Integration", "Process Optimization"],
    accent: "bg-purple-600 shadow-purple-600/20",
    image: "/assets/services/ai.png"
  },
  {
    title: "UI/UX Design & Strategy",
    slug: "software-design",
    description: "User-focused design that enhances engagement and improves the usability of your digital products.",
    price: 4999,
    icon: <Layout className="w-5 h-5" />,
    features: ["User Research", "Interface Design", "Usability Testing"],
    accent: "bg-emerald-500 shadow-emerald-500/20",
    image: "/assets/services/design.png"
  },
  {
    title: "Cloud Infrastructure",
    slug: "cloud-hosting",
    description: "Secure and reliable cloud management services to ensure your business stays online and efficient.",
    price: 2999,
    icon: <Cloud className="w-5 h-5" />,
    features: ["Cloud Migration", "Hosting Solutions", "Architecture Design"],
    accent: "bg-cyan-500 shadow-cyan-500/20",
    image: "/assets/services/cloud.png"
  },
  {
    title: "Professional Cybersecurity",
    slug: "cyber-security",
    description: "Protect your digital assets and customer data with proactive security monitoring and defense strategies.",
    price: 3499,
    icon: <ShieldCheck className="w-5 h-5" />,
    features: ["Security Audits", "Data Protection", "Threat Mitigation"],
    accent: "bg-red-600 shadow-red-600/20",
    image: "/assets/services/security.png"
  },
  {
    title: "Business Support & Consulting",
    slug: "technical-sla",
    description: "On-demand technical support and consulting to keep your systems running smoothly.",
    price: 499,
    icon: <LifeBuoy className="w-5 h-5" />,
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
  const { countryCode, isLoading } = useLocation();
  const [currentRegion, setCurrentRegion] = useState('Global');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && countryCode && pricingData[countryCode]) {
      setCurrentRegion(countryCode);
    }
  }, [countryCode, isLoading]);

  const formatPrice = (value: number) => {
    const region = pricingData[currentRegion] || pricingData['Global'];
    const converted = value * region.rate;
    if (region.currency === 'INR') {
      if (converted >= 100000) return `₹${(converted / 100000).toFixed(converted % 100000 === 0 ? 0 : 1)}L`;
      return `₹${Math.round(converted / 1000)}k`;
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: region.currency, maximumFractionDigits: 0 }).format(converted);
  };

  const toggleService = (idx: number) => {
    setExpandedIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <>
      <section id="vision" className="w-full relative py-20 lg:py-28 overflow-hidden bg-white">
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <FadeIn delay={0.1} className="text-center mb-12">
            <Badge variant="outline" className="mb-5 border-primary/20 py-1.5 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-primary/70 bg-primary/5">
              Our MOTTO
            </Badge>
            <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4">
              Vision <span className="text-primary italic font-light">&amp; Mission.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed font-medium">
              Analysing your business&apos;s nature and requirements, we excel in delivering the perfect & optimal solution built to last a lifetime.
            </p>
          </FadeIn>

          {/* Condensed Vision & Mission */}
          <FadeIn delay={0.2} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 sm:p-8 rounded-[2rem] border border-border/60 shadow-sm">
              <div>
                <h3 className="text-lg font-black text-foreground mb-2">Vision</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  To be the most trusted and innovative technology partner, empowering AI and automation as our signature for businesses worldwide.
                </p>
              </div>
              <div className="md:border-l md:border-border/60 md:pl-6">
                <h3 className="text-lg font-black text-foreground mb-2">Mission</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  To empower business and start-ups with radiant technology solutions that drive innovation, efficiency, and growth in the digital age.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <FounderHighlight />

      <section id="services" className="w-full relative py-20 lg:py-28 overflow-hidden bg-[#fafafa]">
        <div className="container mx-auto px-4 relative z-10">
          {/* Services Header */}
          <FadeIn delay={0.1} className="text-center mb-12">
            <Badge variant="outline" className="mb-5 border-primary/20 py-1.5 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-primary/70 bg-primary/5">
              TECHNICAL SERVICES
            </Badge>
            <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4">
              Technical <span className="text-primary italic font-light">Services.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed font-medium">
            A-Z of technical services, from business analysis to software development, cloud hosting, cybersecurity, and AI integration. We provide comprehensive solutions to meet your business needs.
            </p>
          </FadeIn>

          {/* Collapsed / Expandable Service Cards */}
          <StaggerContainer
            staggerDelay={0.06}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start max-w-6xl mx-auto"
          >
            {services.map((service, idx) => {
              const isOpen = expandedIndex === idx;
              return (
                <StaggerItem key={service.slug} className="w-full">
                  <div
                    className={cn(
                      'bg-white rounded-2xl border transition-all duration-300 overflow-hidden',
                      isOpen ? 'border-primary/40 shadow-lg' : 'border-border/70 hover:border-primary/25 hover:shadow-md'
                    )}
                  >
                    {/* Collapsed header — always visible */}
                    <button
                      onClick={() => toggleService(idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center gap-4 p-4 sm:p-5 text-left cursor-pointer"
                    >
                      <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md', service.accent)}>
                        {service.icon}
                      </div>
                      <h3 className="flex-grow min-w-0 text-sm sm:text-base font-black tracking-tight text-foreground truncate">
                        {service.title}
                      </h3>
                      <span className="hidden sm:block shrink-0 text-primary font-black text-xs whitespace-nowrap">
                        {formatPrice(service.price)}+
                      </span>
                      <ChevronDown className={cn('w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-300', isOpen && 'rotate-180 text-primary')} />
                    </button>
  
                    {/* Expanded detail view */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-border/60">
                            <div className="p-4 sm:p-5 space-y-4">
                            <Link href={`/main/${service.slug}`} prefetch={true} className="block space-y-4 group cursor-pointer">
                              <img
                                src={service.image}
                                alt={service.title}
                                loading="lazy"
                                className="w-full h-36 object-cover rounded-xl border border-border/50 group-hover:opacity-90 transition-opacity"
                              />
                              <p className="text-sm text-muted-foreground leading-relaxed font-medium group-hover:text-foreground transition-colors">
                                {service.description}
                              </p>
                              <div className="flex flex-wrap gap-x-4 gap-y-2">
                                {service.features.map((feature, i) => (
                                  <div key={i} className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                                    <Check className="w-3 h-3 text-primary shrink-0" />
                                    {feature}
                                  </div>
                                ))}
                              </div>
                            </Link>
                            <div className="flex items-center justify-between pt-1">
                              <div className="flex-grow flex items-center gap-2">
                                <Link href={`/main/${service.slug}`} prefetch={true} className="flex-grow">
                                  <Button className="w-full h-10 bg-foreground text-background hover:bg-primary hover:text-white transition-all rounded-xl font-black uppercase tracking-widest text-[9px]">
                                    Full Details
                                    <ArrowRight className="ml-2 w-3 h-3" />
                                  </Button>
                                </Link>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    window.dispatchEvent(new CustomEvent('delvare:autofill', {
                                      detail: { message: `I am interested in ${service.title}.` }
                                    }));
                                  }}
                                  className="h-10 px-4 rounded-xl border-border hover:bg-secondary font-black text-foreground uppercase tracking-widest text-[9px]"
                                  aria-label="Enquire"
                                >
                                  <MessageSquare className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
