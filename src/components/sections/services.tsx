'use client';

import { useState } from 'react';
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
  Eye,
  Target,
  Quote,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { smoothScrollTo } from '@/lib/smooth-scroll';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import FounderHighlight from '@/components/sections/founder-highlight';

const services = [
  {
    title: "SEO & Digital Presence",
    slug: "seo-optimization",
    description: "Improve your search engine rankings and increase your online visibility to reach more potential customers.",
    price: 48,
    icon: <TrendingUp className="w-5 h-5" />,
    features: ["Keyword Strategy", "Content Marketing", "Technical SEO", "Performance Analysis", "Organic Search Growth", "Local SEO"],
    accent: "bg-orange-500 shadow-orange-500/20",
    image: "/assets/services/seo.webp"
  },
  {
    title: "Strategic Business Analysis",
    slug: "business-analyst",
    description: "In-depth analysis of your business performance to guide strategic decision-making and operational improvements.",
    price: 145,
    icon: <BarChart3 className="w-5 h-5" />,
    features: ["Operational Efficiency", "Market Analysis", "Strategic Planning"],
    accent: "bg-yellow-500 shadow-yellow-500/20",
    image: "/assets/services/support.webp"
  },
  {
    title: "Custom Software Solutions",
    slug: "software-engineering",
    description: "Bespoke software applications tailored to meet your unique business requirements and goals.",
    price: 240,
    icon: <Database className="w-5 h-5" />,
    features: ["Enterprise Software", "Web Applications", "Scalable Systems"],
    accent: "bg-blue-600 shadow-blue-600/20",
    image: "/assets/services/software.webp"
  },
  {
    title: "Business Intelligence Dashboards",
    slug: "ai-dashboard",
    description: "Centralized dashboards providing real-time data insights to manage your operations effectively.",
    price: 180,
    icon: <Globe className="w-5 h-5" />,
    features: ["Real-time Reporting", "Data Visualization", "Operational Oversight"],
    accent: "bg-indigo-600 shadow-indigo-600/20",
    image: "/assets/projects/p2.webp"
  },
  {
    title: "Process Automation & AI",
    slug: "ai-ecosystems",
    description: "Streamline repetitive tasks and integrate AI to increase productivity and reduce costs.",
    price: 120,
    icon: <Brain className="w-5 h-5" />,
    features: ["Workflow Automation", "AI Integration", "Process Optimization"],
    accent: "bg-purple-600 shadow-purple-600/20",
    image: "/assets/services/ai.webp"
  },
  {
    title: "UI/UX Design & Strategy",
    slug: "software-design",
    description: "User-focused design that enhances engagement and improves the usability of your digital products.",
    price: 60,
    icon: <Layout className="w-5 h-5" />,
    features: ["User Research", "Interface Design", "Usability Testing"],
    accent: "bg-emerald-500 shadow-emerald-500/20",
    image: "/assets/services/design.webp"
  },
  {
    title: "Cloud Infrastructure",
    slug: "cloud-hosting",
    description: "Secure and reliable cloud management services to ensure your business stays online and efficient.",
    price: 36,
    icon: <Cloud className="w-5 h-5" />,
    features: ["Cloud Migration", "Hosting Solutions", "Architecture Design"],
    accent: "bg-cyan-500 shadow-cyan-500/20",
    image: "/assets/services/cloud.webp"
  },
  {
    title: "Professional Cybersecurity",
    slug: "cyber-security",
    description: "Protect your digital assets and customer data with proactive security monitoring and defense strategies.",
    price: 42,
    icon: <ShieldCheck className="w-5 h-5" />,
    features: ["Security Audits", "Data Protection", "Threat Mitigation"],
    accent: "bg-red-600 shadow-red-600/20",
    image: "/assets/services/security.webp"
  },
  {
    title: "Business Support & Consulting",
    slug: "technical-sla",
    description: "On-demand technical support and consulting to keep your systems running smoothly.",
    price: 6,
    icon: <LifeBuoy className="w-5 h-5" />,
    features: ["Technical Consulting", "Maintenance Support", "Process Guidance"],
    accent: "bg-amber-500 shadow-amber-500/20",
    image: "/assets/services/support.webp"
  },
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

const ServicesSection = () => {
  const isMobile = useIsMobile();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleService = (idx: number) => {
    if (!isMobile) return;
    setExpandedIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <>
      <section id="vision" className="w-full relative py-24 lg:py-32 overflow-hidden bg-white">
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/[0.07] blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 -right-32 w-[400px] h-[300px] bg-primary/[0.05] blur-[110px] rounded-full pointer-events-none" />
        <div className="absolute bottom-24 -left-32 w-[420px] h-[320px] bg-amber-500/[0.06] blur-[110px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Section Header */}
          <FadeIn delay={0.1} className="mb-14 md:mb-16">
            <Badge variant="outline" className="mb-5 border-primary/20 py-1.5 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-primary/70 bg-primary/5">
              Our MOTTO
            </Badge>
            <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
              Vision <span className="text-primary italic font-light">&amp; Mission.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed font-medium">
              Analysing your business&apos;s nature and requirements, we excel in delivering the perfect & optimal solution built to last a lifetime.
            </p>
          </FadeIn>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
            <FadeIn delay={0.15} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-[2.5rem] border border-border/60 bg-white shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-500 p-8 sm:p-10 text-left">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-indigo-500 to-purple-500" />
                <span className="pointer-events-none absolute -bottom-8 -right-4 select-none font-headline text-9xl font-black leading-none text-foreground/[0.04] group-hover:text-primary/[0.08] transition-colors duration-500">
                  01
                </span>

                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500">
                  <Eye className="w-7 h-7" />
                </div>

                <h3 className="font-headline text-2xl sm:text-3xl font-black tracking-tighter text-foreground mb-4">
                  Our <span className="text-primary italic font-light">Vision</span>
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                  To be the <span className="font-black text-primary">#pioneer</span> of technological{' '}
                  <span className="font-black text-foreground">evolution</span> &mdash; engineering computing{' '}
                  <span className="font-black text-foreground">hardware-software</span> that acts as an entire company, letting founders &amp; C-suites automate their pipeline, deployment and maintenance across every digital aspect.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {['Automation-first', 'End-to-end', 'Hardware + Software'].map((chip) => (
                    <span key={chip} className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-primary">
                      <Sparkles className="w-3 h-3" />
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-[2.5rem] border border-border/60 bg-gradient-to-br from-primary/[0.04] to-transparent shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-500 p-8 sm:p-10 text-left">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500" />
                <span className="pointer-events-none absolute -bottom-8 -right-4 select-none font-headline text-9xl font-black leading-none text-foreground/[0.04] group-hover:text-primary/[0.08] transition-colors duration-500">
                  02
                </span>

                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-600 mb-6 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition-all duration-500">
                  <Target className="w-7 h-7" />
                </div>

                <h3 className="font-headline text-2xl sm:text-3xl font-black tracking-tighter text-foreground mb-4">
                  Our <span className="text-primary italic font-light">Mission</span>
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                  To empower <span className="font-black text-foreground">business</span> and{' '}
                  <span className="font-black text-foreground">start-ups</span> with radiant{' '}
                  <span className="font-black text-primary">#Technology</span> solutions that drive{' '}
                  <span className="font-black text-foreground">innovation</span>,{' '}
                  <span className="font-black text-foreground">efficiency</span>, and{' '}
                  <span className="font-black text-foreground">growth</span> in the digital age.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {['Innovation', 'Efficiency', 'Radiant Growth'].map((chip) => (
                    <span key={chip} className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-primary">
                      <Sparkles className="w-3 h-3" />
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Motto quote strip */}
          <FadeIn delay={0.25} className="max-w-3xl mx-auto mt-10 md:mt-12">
            <div className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-gradient-to-br from-primary/5 via-white to-amber-500/5 p-8 sm:p-10 text-center">
              <Quote className="w-10 h-10 mx-auto mb-4 text-primary/30" />
              <p className="font-headline text-2xl sm:text-3xl font-light italic leading-snug text-foreground">
                &ldquo;The perfect &amp; optimal solution,{' '}
                <span className="font-black not-italic text-primary">built to last a lifetime.</span>&rdquo;
              </p>
              <p className="mt-5 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/70">
                Grow ahead of the curve — <span className="text-primary">Delvare.</span>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Trinity of Delvare — Our Three Pillars */}
      <section id="trinity" className="w-full relative py-20 lg:py-28 overflow-hidden bg-[#fafafa]">
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/[0.07] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[300px] bg-primary/[0.05] blur-[110px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeIn delay={0.1}>
            <Badge variant="outline" className="mb-6 border-primary/20 py-1.5 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-primary/70 bg-primary/5">
              Pillars of Delvare
            </Badge>
            <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.95] mb-6">
              <span className="text-primary">#</span>Trinity of{' '}
              <span className="text-primary/60 italic font-light">Delvare.</span>
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
              Our three pillars.
            </p>
          </FadeIn>

          <StaggerContainer
            staggerDelay={0.12}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 md:mt-20 max-w-6xl mx-auto items-stretch"
          >
            {[
              {
                number: '01',
                icon: Globe,
                title: 'E-Solutions',
                description:
                  'Delivering solutions to businesses and startups internationally.',
                stat: '9+ Global Clients Served',
                cta: 'Explore Our Clients',
                target: 'clients',
              },
              {
                number: '02',
                icon: Layout,
                title: 'Delvare systems',
                description:
                  'Helping global workflows using our seamless systems and interesting apps by Delvare.',
                stat: '10+ Delvare Projects',
                cta: 'See ECBills & Blendly',
                target: 'products',
              },
              {
                number: '03',
                icon: Brain,
                title: 'Innovations',
                description:
                  'Researching on utilising the software-hardware evolution for the future AI systems that automates almost everything digitally possible.',
                stat: 'Currently Raising Funding for Research',
                cta: 'Schedule Meeting',
                target: 'contact',
                schedule: true,
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <StaggerItem key={pillar.number} className="h-full">
                  <div className="group relative h-full flex flex-col items-center text-center p-8 sm:p-10 rounded-[2.5rem] bg-white border border-border/60 shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                    <span className="pointer-events-none absolute -top-4 right-2 select-none font-headline text-8xl font-black leading-none text-foreground/[0.04] group-hover:text-primary/[0.08] transition-colors duration-500">
                      {pillar.number}
                    </span>

                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 text-primary">
                      <Icon className="w-8 h-8" />
                    </div>

                    <h3 className="font-headline text-xl sm:text-2xl font-black tracking-tighter text-foreground mb-4">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium flex-1">
                      {pillar.description}
                    </p>

                    {pillar.stat && (
                      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                          {pillar.stat}
                        </span>
                      </div>
                    )}

                    <Button
                      onClick={() => {
                        if (pillar.schedule) {
                          window.dispatchEvent(new CustomEvent('open-contact-form', { detail: { type: 'contact' } }));
                        } else {
                          smoothScrollTo('#' + pillar.target);
                        }
                      }}
                      className="mt-8 h-11 px-6 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:gap-3 transition-all"
                    >
                      {pillar.cta}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
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
              const isOpen = !isMobile || expandedIndex === idx;
              return (
                <StaggerItem key={service.slug} className="w-full">
                  <div
                    className={cn(
                      'bg-white rounded-2xl border transition-all duration-300 overflow-hidden',
                      isOpen ? 'border-primary/40 shadow-lg' : 'border-border/70 hover:border-primary/25 hover:shadow-md'
                    )}
                  >
                    {/* Collapsed header — always visible; toggling is mobile-only */}
                    <button
                      onClick={() => toggleService(idx)}
                      aria-expanded={isOpen}
                      className={cn('w-full flex items-center gap-4 p-4 sm:p-5 text-left', isMobile ? 'cursor-pointer' : 'cursor-default')}
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
                      {isMobile && (
                        <ChevronDown className={cn('w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-300', isOpen && 'rotate-180 text-primary')} />
                      )}
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
                                decoding="async"
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
