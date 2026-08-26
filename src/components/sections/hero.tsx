'use client';

import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Terminal, Cloud, ShieldCheck, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTrackClick } from '@/hooks/use-track-click';

const keywords = [
  "24/7 IT Support", "System Maintenance", "Cloud Management", "Security Audits", "Data Backup", "Technical Consulting", "Network Monitoring", "IT Infrastructure", "Software Updates", "Troubleshooting", "System Optimization"
];

const HeroSection = () => {
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const trackHeroEnquire = useTrackClick('hero-enquire');
  const heroRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const arrowImgRef = useRef<HTMLImageElement>(null);
  const geometryRef = useRef<{ hero: DOMRect | null; ax: number; ay: number }>({ hero: null, ax: 0, ay: 0 });

  useEffect(() => {
    const sequence = setTimeout(() => {
      if (arrowImgRef.current) arrowImgRef.current.style.transform = 'rotate(0deg)';
    }, 1500);

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setKeywordIndex((prev) => (prev + 1) % keywords.length);
        setFade(true);
      }, 300);
    }, 2500);

    // Geometry is cached and refreshed on scroll/resize so the mousemove
    // path performs zero layout reads and zero React re-renders.
    const measure = () => {
      const heroRect = heroRef.current?.getBoundingClientRect() ?? null;
      const arrowRect = arrowRef.current?.getBoundingClientRect();
      geometryRef.current = {
        hero: heroRect,
        ax: arrowRect ? arrowRect.left + arrowRect.width / 2 : 0,
        ay: arrowRect ? arrowRect.top + arrowRect.height / 2 : 0,
      };
    };

    let raf = 0;
    let mouseX = -1;
    let mouseY = -1;

    const applyRotation = () => {
      raf = 0;
      const geo = geometryRef.current;
      const heroRect = geo.hero;
      if (!heroRect || !arrowImgRef.current) return;
      if (
        mouseX < heroRect.left || mouseX > heroRect.right ||
        mouseY < heroRect.top || mouseY > heroRect.bottom
      ) return;
      const angle = Math.atan2(mouseY - geo.ay, mouseX - geo.ax) * (180 / Math.PI);
      arrowImgRef.current.style.transform = `rotate(${angle - 90}deg)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!raf) raf = requestAnimationFrame(applyRotation);
    };

    measure();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure, { passive: true });

    return () => {
      clearInterval(interval);
      clearTimeout(sequence);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <section ref={heroRef} id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 " />
      <div className="container relative z-10 px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-2 text-center lg:text-left order-2 lg:order-1 pt-4 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                XaaS by Delvare              </span>
            </div>
            <h1 className="font-headline font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-foreground">
              E-Solutions &
              <br />
              <span className="text-primary">Automations.</span>
            </h1>
            <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
              Your IT partner for seamless digital transformation, security and maintainance. We at Delvare, are committed to provide Innovative & Enhancing technology. Established in 2015, Delvare has been collaborating with businesses and startups to drive their digital agendas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-6">
              <Button
                size="xl"
                className="h-16 px-12 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-300 group"
                onClick={() => { trackHeroEnquire(); window.dispatchEvent(new CustomEvent('open-contact-form', { detail: { type: 'contact' } })); }}
              >
                Enquire
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="pt-10 flex items-center justify-center lg:justify-start gap-8">
              <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                SaaS • AI • AUTOMATION • PEN-TESTING • CLOUD • SECURITY • SUPPORT • MIGRATION • DEVOPS • MONITORING • BACKUP • CONSULTING • MAINTENANCE • TESTING • OPTIMIZATION • INTEGRATION • DEVELOPMENT • MANAGEMENT • ANALYTICS • TRAINING
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center min-h-[300px] lg:min-h-[600px] w-full order-1 lg:order-2">
            <div className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out">
              <div ref={arrowRef} className="absolute z-20 w-48 h-48 lg:w-64 lg:h-64 bg-white rounded-[2rem] lg:rounded-[3rem] flex flex-col items-center justify-center transition-transform duration-200 ease-out shadow-sm lg:shadow-none">
                {/* Mobile static arrow (landing highlight) */}
                <img src="/assets/arrow.png" alt="Our Expertise" className="w-66 h-66 object-contain lg:hidden" style={{ transform: 'rotate(0deg)' }} />
                {/* Desktop rotating arrow */}
                <img ref={arrowImgRef} src="/assets/arrow.png" alt="Our Expertise" className="hidden lg:block w-32 h-32 object-contain will-change-transform" style={{ transform: 'rotate(90deg)' }} />
              </div>
              <div className="hidden lg:flex absolute top-20 left-10 w-48 h-56 bg-white rounded-3xl p-6 flex-col justify-between transition-all cursor-default group/card shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors duration-300">
                  <Terminal className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-foreground text-xl">Custom Software</h3>
                  <p className="text-sm text-muted-foreground">Built just for you</p>
                </div>
              </div>
              <div className="hidden lg:flex absolute top-10 right-10 w-44 h-44 bg-white rounded-3xl p-6 flex-col justify-between transition-all cursor-default group/card shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors duration-300">
                  <Cloud className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-foreground text-xl">Cloud</h3>
                  <p className="text-sm text-muted-foreground">Grows with your business</p>
                </div>
              </div>
              <div className="hidden lg:flex absolute bottom-32 right-0 w-48 h-60 bg-white rounded-3xl p-6 flex-col justify-between transition-all cursor-default group/card shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors duration-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-headline font-bold text-foreground text-xl">Cybersecurity</h3>
                  <p className="text-sm text-muted-foreground">Keeps your data safe</p>
                </div>
              </div>
              <div className="hidden lg:flex absolute bottom-20 left-0 w-52 h-44 bg-white rounded-3xl p-6 flex-col justify-between transition-all cursor-default group/card shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors duration-300">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className={cn("font-headline font-bold text-foreground text-xl transition-opacity duration-300", fade ? "opacity-100" : "opacity-0")}>
                    {keywords[keywordIndex]}
                  </h3>
                  <p className="text-sm text-muted-foreground">Smart AI tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
