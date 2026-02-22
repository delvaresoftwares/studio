'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Terminal, Cloud, ShieldCheck, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';

const keywords = [
  "System Optimized", "Custom Software", "High-End Websites", "Digital Marketing", "Automation", "Artificial Intelligence", "Hardware Solutions", "Cyber Security", "Cloud Computing", "Machine Learning", "SaaS Platforms", "IoT Ecosystems"
];

const HeroSection = () => {
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setKeywordIndex((prev) => (prev + 1) % keywords.length);
        setFade(true);
      }, 300); // Wait for fade out
    }, 2500); // Change every 2.5s

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-[110vh] flex items-center justify-center overflow-hidden bg-background">

      {/* --- Ambient Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-emerald-500/10 rounded-full blur-[150px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px] opacity-30 animate-pulse delay-1000" />
      </div>

      {/* --- Cyber Grid --- */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="container relative z-10 px-4 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Typography & CTA */}
          <div className="space-y-8 text-center lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                Anything as a Service
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-headline font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground/90 to-foreground/40 dark:from-white dark:via-white/90 dark:to-white/40 animate-fade-in-up [animation-delay:200ms]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 animate-shine bg-[length:200%_auto]">
                XAAS
              </span>
              <span className="text-emerald-500">.</span>
            </h1>

            {/* Subheadline */}
            <p className="max-w-xl mx-auto lg:mx-0 text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed animate-fade-in-up [animation-delay:400ms]">
              Resolve all your technical and business oriented problems with our <span className="text-foreground dark:text-white font-bold">Scalable</span> and <span className="text-foreground dark:text-white font-bold">Secure</span>, well-optimized and customized solutions built according to your convenience.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-6 animate-fade-in-up [animation-delay:600ms]">
              <Button
                size="xl"
                className="h-16 px-10 text-lg font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl shadow-[0_20px_50px_-15px_rgba(16,185,129,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.8)] hover:scale-105 transition-all duration-300 group"
                onClick={() => document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                AI Estimator
                <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="h-16 px-10 text-lg font-bold border-foreground/20 dark:border-white/20 hover:bg-foreground/5 dark:hover:bg-white/5 rounded-2xl backdrop-blur-sm group hover:border-emerald-500/50 transition-all duration-300"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Services
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Metrics / Trust */}
            <div className="pt-10 flex items-center justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 animate-fade-in-up [animation-delay:800ms]">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-sm font-code text-muted-foreground">Systems Operational</span>
              </div>
              <div className="h-4 w-px bg-foreground/20 dark:bg-white/20" />
              <div className="text-sm font-code text-muted-foreground">
                trusted by 50+ unicorns
              </div>
            </div>
          </div>

          {/* Right Column: 3D Visual */}
          {/* Right Column: 3D Feature Cluster */}
          <div className="relative hidden lg:flex items-center justify-center perspective-1000 group min-h-[600px] w-full">

            {/* Solar System of Cards */}
            <div className="relative w-full h-full flex items-center justify-center preserve-3d transition-transform duration-500 ease-out group-hover:rotate-y-6 group-hover:rotate-x-6">

              {/* Center: Brand Core */}
              <div className="absolute z-20 w-64 h-64 bg-background/40 dark:bg-black/40 backdrop-blur-3xl border border-foreground/10 dark:border-white/20 rounded-[3rem] shadow-[0_0_80px_rgba(16,185,129,0.2)] flex items-center justify-center animate-breath">
                <div className="scale-150 drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]"><Logo /></div>
              </div>

              {/* Orbital 1: Code (Top Left) */}
              <div className="absolute top-20 left-10 w-48 h-56 bg-foreground/5 dark:bg-white/5 backdrop-blur-xl border border-foreground/10 dark:border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-2xl animate-float [animation-delay:0ms] hover:scale-110 hover:bg-foreground/10 dark:hover:bg-white/10 transition-all cursor-default group/card">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover/card:bg-blue-500 group-hover/card:text-white transition-colors">
                  <Terminal className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-foreground dark:text-white text-xl">Code</h3>
                  <p className="text-sm text-muted-foreground">Clean & Scalable</p>
                </div>
              </div>

              {/* Orbital 2: Cloud (Top Right) */}
              <div className="absolute top-10 right-10 w-44 h-44 bg-foreground/5 dark:bg-white/5 backdrop-blur-xl border border-foreground/10 dark:border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-2xl animate-float [animation-delay:1000ms] hover:scale-110 hover:bg-foreground/10 dark:hover:bg-white/10 transition-all cursor-default group/card">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover/card:bg-orange-500 group-hover/card:text-white transition-colors">
                  <Cloud className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-foreground dark:text-white text-xl">Cloud</h3>
                  <p className="text-sm text-muted-foreground">Serverless</p>
                </div>
              </div>

              {/* Orbital 3: Security (Bottom Right) */}
              <div className="absolute bottom-32 right-0 w-48 h-60 bg-foreground/5 dark:bg-white/5 backdrop-blur-xl border border-foreground/10 dark:border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-2xl animate-float [animation-delay:2000ms] hover:scale-110 hover:bg-foreground/10 dark:hover:bg-white/10 transition-all cursor-default group/card">
                <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-400 group-hover/card:bg-red-500 group-hover/card:text-white transition-colors">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-headline font-bold text-foreground dark:text-white text-xl">Security</h3>
                  <p className="text-sm text-muted-foreground">Military-Grade Encryption</p>
                </div>
                <div className="h-1.5 w-full bg-foreground/10 dark:bg-white/10 rounded-full overflow-hidden mt-2">
                  <div className="h-full w-full bg-red-500 animate-pulse" />
                </div>
              </div>

              {/* Orbital 4: Dynamic Keywords (Bottom Left) */}
              <div className="absolute bottom-20 left-0 w-52 h-44 bg-foreground/5 dark:bg-white/5 backdrop-blur-xl border border-foreground/10 dark:border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-2xl animate-float [animation-delay:3000ms] hover:scale-110 hover:bg-foreground/10 dark:hover:bg-white/10 transition-all cursor-default group/card">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover/card:bg-purple-500 group-hover/card:text-white transition-colors">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className={cn("font-headline font-bold text-foreground dark:text-white text-xl transition-opacity duration-300", fade ? "opacity-100" : "opacity-0")}>
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
