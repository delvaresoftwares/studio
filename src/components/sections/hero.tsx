'use client';

import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Terminal, Cloud, ShieldCheck, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const keywords = [
  "AI & ML", "Cloud Infrastructure", "Automations", "Custom Software", "Websites", "Applications", "Maintenance", "Migration", "Consulting", "Security", "Hardware", "IoT"
];

const HeroSection = () => {
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [arrowRotation, setArrowRotation] = useState(90); // Start pointing left (90 deg if down is 0)
  const heroRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial sequence: Start at left (90), then point down (0)
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
        // Assuming original image points DOWN (90 deg from X-axis).
        // To point to (angle), we rotate by (angle - 90).
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
    <section ref={heroRef} id="hero" className="relative w-full min-h-[110vh] flex items-center justify-center overflow-hidden bg-background">

      {/* --- Upscale Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-80" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-slate-400/10 rounded-full blur-[120px] opacity-60 delay-1000" />
      </div>

      {/* --- Refined Minimal Grid --- */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container relative z-10 px-4 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Typography & CTA */}
          <div className="space-y-8 text-center lg:text-left animate-slide-in-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border shadow-sm backdrop-blur-md animate-fade-in-up [animation-delay:100ms] opacity-0">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Better Business & Technology
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.05] text-foreground animate-fade-in-up [animation-delay:200ms] opacity-0">
              <span className="text-primary drop-shadow-[0_0_20px_rgba(16,185,129,0.3)] motion-safe:animate-pulse">Grow Your Business</span>
              <br />
              <span className="text-muted-foreground font-light tracking-tight">
                With Simple Tech
              </span>
              <span className="text-primary">.</span>
            </h1>

            {/* Subheadline */}
            <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-muted-foreground font-medium leading-relaxed animate-fade-in-up [animation-delay:300ms] opacity-0">
              We help you build better businesses with <span className="text-primary font-bold">simple AI</span>, <span className="text-primary font-bold">fast cloud systems</span>, and <span className="text-primary font-bold">24/7 security</span>. We make technology work for you, so you can focus on yours.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-6 animate-fade-in-up [animation-delay:400ms] opacity-0">
              <Button
                size="xl"
                className="h-16 px-10 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                onClick={() => window.dispatchEvent(new CustomEvent('open-estimator'))}
              >
                Price Calculator
                <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="h-16 px-10 text-lg font-bold bg-white text-foreground border-border hover:bg-secondary hover:border-border/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Our Services
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Metrics / Trust */}
            <div className="pt-10 flex items-center justify-center lg:justify-start gap-8 opacity-0 grayscale hover:grayscale-0 transition-all duration-500 animate-fade-in-up [animation-delay:500ms]">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Always Online</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Trusted by 50+ Businesses
              </div>
            </div>
          </div>

          {/* Right Column: Feature Cluster */}
          <div className="relative hidden lg:flex items-center justify-center perspective-1000 group min-h-[600px] w-full animate-slide-in-right">

            {/* Solar System of Cards */}
            <div className="relative w-full h-full flex items-center justify-center preserve-3d transition-transform duration-700 ease-out group-hover:rotate-y-3 group-hover:rotate-x-3">

              {/* Center: Our Speciality */}
              <div
                ref={arrowRef}
                className="absolute z-20 w-64 h-64 bg-card/80 backdrop-blur-3xl border-4 border-primary/20 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(16,185,129,0.2)] flex flex-col items-center justify-center transition-transform duration-200 ease-out animate-fade-in"
              >
                <img
                  src="/assets/arrow.png"
                  alt="Our Expertise"
                  className="w-32 h-32 object-contain transition-transform duration-200 ease-out"
                  style={{ transform: `rotate(${arrowRotation}deg)` }}
                />
              </div>

              {/* Orbital 1: Code (Top Left) */}
              <div className="absolute top-20 left-10 w-48 h-56 bg-card border border-border/60 rounded-3xl p-6 flex flex-col justify-between shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] animate-fade-in-up [animation-delay:600ms] opacity-0 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] transition-all cursor-default group/card">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors duration-300">
                  <Terminal className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-foreground text-xl">Code</h3>
                  <p className="text-sm text-muted-foreground">Clean & Scalable</p>
                </div>
              </div>

              {/* Orbital 2: Cloud (Top Right) */}
              <div className="absolute top-10 right-10 w-44 h-44 bg-card border border-border/60 rounded-3xl p-6 flex flex-col justify-between shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] animate-fade-in-up [animation-delay:750ms] opacity-0 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] transition-all cursor-default group/card">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors duration-300">
                  <Cloud className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-foreground text-xl">Cloud</h3>
                  <p className="text-sm text-muted-foreground">Serverless</p>
                </div>
              </div>

              {/* Orbital 3: Security (Bottom Right) */}
              <div className="absolute bottom-32 right-0 w-48 h-60 bg-card border border-border/60 rounded-3xl p-6 flex flex-col justify-between shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] animate-fade-in-up [animation-delay:900ms] opacity-0 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] transition-all cursor-default group/card">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors duration-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-headline font-bold text-foreground text-xl">Security</h3>
                  <p className="text-sm text-muted-foreground">Enterprise Grade</p>
                </div>
              </div>

              {/* Orbital 4: Dynamic Keywords (Bottom Left) */}
              <div className="absolute bottom-20 left-0 w-52 h-44 bg-card border border-border/60 rounded-3xl p-6 flex flex-col justify-between shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] animate-fade-in-up [animation-delay:1050ms] opacity-0 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] transition-all cursor-default group/card">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors duration-300">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className={cn("font-headline font-bold text-foreground text-xl transition-opacity duration-300", fade ? "opacity-100" : "opacity-0")}>
                    {keywords[keywordIndex]}
                  </h3>
                  <p className="text-sm text-muted-foreground">Active Module</p>
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
