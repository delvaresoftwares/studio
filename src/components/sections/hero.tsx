'use client';

import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Terminal, Cloud, ShieldCheck, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const keywords = [
  "24/7 IT Support", "System Maintenance", "Cloud Management", "Security Audits", "Data Backup", "Technical Consulting", "Network Monitoring", "IT Infrastructure", "Software Updates", "Troubleshooting", "System Optimization"
];

const HeroSection = () => {
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [arrowRotation, setArrowRotation] = useState(90);
  const heroRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sequence = setTimeout(() => {
      setArrowRotation(0);
    }, 1500);

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setKeywordIndex((prev) => (prev + 1) % keywords.length);
        setFade(true);
      }, 300);
    }, 2500);

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || !arrowRef.current) return;

      const heroRect = heroRef.current.getBoundingClientRect();
      const inBounds =
        e.clientX >= heroRect.left &&
        e.clientX <= heroRect.right &&
        e.clientY >= heroRect.top &&
        e.clientY <= heroRect.bottom;

      if (inBounds) {
        const arrowRect = arrowRef.current.getBoundingClientRect();
        const centerX = arrowRect.left + arrowRect.width / 2;
        const centerY = arrowRect.top + arrowRect.height / 2;

        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
        setArrowRotation(angle - 90);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      clearTimeout(sequence);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={heroRef} id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 " />
      <div className="container relative z-10 px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left animate-slide-in-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 animate-fade-in-up [animation-delay:100ms] opacity-0">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                XaaS by Delvare.in.
              </span>
            </div>
            <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-foreground animate-fade-in-up [animation-delay:200ms] opacity-0">
              Reliable IT Support
              <br />
              <span className="text-primary italic">for Your Business.</span>
            </h1>
            <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-muted-foreground font-medium leading-relaxed animate-fade-in-up [animation-delay:300ms] opacity-0">
              We provide proactive IT support, system maintenance, and technical consulting to ensure your business stays connected, secure, and productive every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-6 animate-fade-in-up [animation-delay:400ms] opacity-0">
              <Button
                size="xl"
                className="h-16 px-12 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-300 group"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book IT Support
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="pt-10 flex items-center justify-center lg:justify-start gap-8 opacity-0 transition-all duration-500 animate-fade-in-up [animation-delay:500ms]">
              <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Proactive Support • 24/7 Monitoring • Secure Systems • IT Consulting
              </div>
            </div>
          </div>
          <div className="relative hidden lg:flex items-center justify-center min-h-[600px] w-full animate-slide-in-right">
            <div className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out">
              <div ref={arrowRef} className="absolute z-20 w-64 h-64 bg-white rounded-[3rem] flex flex-col items-center justify-center transition-transform duration-200 ease-out animate-fade-in">
                <img src="/assets/arrow.png" alt="Our Expertise" className="w-32 h-32 object-contain transition-transform duration-200 ease-out" style={{ transform: `rotate(${arrowRotation}deg)` }} />
              </div>
              <div className="absolute top-20 left-10 w-48 h-56 bg-white rounded-3xl p-6 flex flex-col justify-between animate-fade-in-up [animation-delay:600ms] opacity-0 transition-all cursor-default group/card">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors duration-300">
                  <Terminal className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-foreground text-xl">Custom Software</h3>
                  <p className="text-sm text-muted-foreground">Tailored for You</p>
                </div>
              </div>
              <div className="absolute top-10 right-10 w-44 h-44 bg-white rounded-3xl p-6 flex flex-col justify-between animate-fade-in-up [animation-delay:750ms] opacity-0 transition-all cursor-default group/card">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors duration-300">
                  <Cloud className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-foreground text-xl">Cloud</h3>
                  <p className="text-sm text-muted-foreground">Scalable Services</p>
                </div>
              </div>
              <div className="absolute bottom-32 right-0 w-48 h-60 bg-white rounded-3xl p-6 flex flex-col justify-between animate-fade-in-up [animation-delay:900ms] opacity-0 transition-all cursor-default group/card">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors duration-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-headline font-bold text-foreground text-xl">Cybersecurity</h3>
                  <p className="text-sm text-muted-foreground">Protect Assets</p>
                </div>
              </div>
              <div className="absolute bottom-20 left-0 w-52 h-44 bg-white rounded-3xl p-6 flex flex-col justify-between animate-fade-in-up [animation-delay:1050ms] opacity-0 transition-all cursor-default group/card">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors duration-300">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className={cn("font-headline font-bold text-foreground text-xl transition-opacity duration-300", fade ? "opacity-100" : "opacity-0")}>
                    {keywords[keywordIndex]}
                  </h3>
                  <p className="text-sm text-muted-foreground">Integrated AI</p>
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
