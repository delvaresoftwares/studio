'use client';

import { ShieldCheck, LineChart, Cpu, Laptop, Zap, Layers, Database, Globe, Command, Radio, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const coreFeatures = [
  {
    name: "Cyber Security",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    description: "Zero-trust architecture and AI-driven threat detection.",
    color: "emerald",
    status: "Operational",
    pos: { top: '15%', left: '10%' }
  },
  {
    name: "Digital Marketing",
    icon: <LineChart className="w-6 h-6 text-blue-400" />,
    description: "Data-first strategies that convert traffic into revenue.",
    color: "blue",
    status: "Active",
    pos: { top: '15%', right: '10%' }
  },
  {
    name: "AI Integration",
    icon: <Cpu className="w-6 h-6 text-purple-400" />,
    description: "Neural networks that automate complex business logic.",
    color: "purple",
    status: "Syncing",
    pos: { bottom: '15%', left: '10%' }
  },
  {
    name: "Software Dev",
    icon: <Laptop className="w-6 h-6 text-orange-400" />,
    description: "Scalable, resilient systems built for the future.",
    color: "orange",
    status: "Optimized",
    pos: { bottom: '15%', right: '10%' }
  }
];

const TechFeaturesSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="features" className="w-full relative py-40 overflow-hidden bg-background text-foreground selection:bg-emerald-500/30">
      {/* Background Cyber-Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0),
            linear-gradient(currentColor 1px, transparent 1px), 
            linear-gradient(90deg, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 40px 40px, 40px 40px',
          color: 'hsl(var(--foreground) / 0.05)'
        }}
      />

      {/* Dynamic Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-32 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 text-xs font-mono text-emerald-500 mb-8 backdrop-blur-md shadow-xl">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span className="tracking-[0.2em] font-black uppercase text-[10px]">System Infrastructure V3.0</span>
          </div>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-none">
            Built at <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 relative inline-block">
              Absolute Core
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            </span>
          </h2>
          <p className="max-w-2xl text-xl text-muted-foreground font-medium leading-relaxed opacity-80">
            Our proprietary XAAS engine coordinates complex operations with military-grade precision and infinite scalability.
          </p>
        </div>

        {/* The Main Tech Visualizer */}
        <div className="relative h-[800px] md:h-[900px] w-full max-w-7xl mx-auto flex items-center justify-center">

          {/* Central Connecting Hub Structure */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full opacity-30" viewBox="0 0 1000 1000">
              <defs>
                <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                  <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Data streams to each card */}
              <path d="M 500 500 L 150 200" className="text-emerald-500 stroke-[1.5] animate-data-flow" fill="none" strokeDasharray="10 20" />
              <path d="M 500 500 L 850 200" className="text-emerald-500 stroke-[1.5] animate-data-flow" fill="none" strokeDasharray="10 20" style={{ animationDelay: '0.5s' }} />
              <path d="M 500 500 L 150 800" className="text-emerald-500 stroke-[1.5] animate-data-flow" fill="none" strokeDasharray="10 20" style={{ animationDelay: '1s' }} />
              <path d="M 500 500 L 850 800" className="text-emerald-500 stroke-[1.5] animate-data-flow" fill="none" strokeDasharray="10 20" style={{ animationDelay: '1.5s' }} />

              {/* Additional Aesthetic Nodes */}
              <circle cx="500" cy="500" r="300" className="stroke-foreground/5 dark:stroke-white/5" fill="none" strokeDasharray="5 10" />
              <circle cx="500" cy="500" r="400" className="stroke-foreground/5 dark:stroke-white/5" fill="none" strokeDasharray="2 8" />
            </svg>
          </div>

          {/* THE CORE REACTOR */}
          <div className="relative z-20 group">
            {/* Outer Rotating Interface */}
            <div className="absolute -inset-40 border border-emerald-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute -inset-32 border-2 border-dashed border-emerald-500/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

            {/* Core Body */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-[3.5rem] bg-background/60 dark:bg-black/60 backdrop-blur-3xl border border-emerald-500/40 shadow-[0_0_100px_rgba(16,185,129,0.2)] flex items-center justify-center group-hover:scale-105 transition-transform duration-700 animate-breath">
              {/* Glow Core */}
              <div className="absolute inset-4 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/20 to-transparent blur-xl" />

              {/* Reactor Icon */}
              <div className="relative flex flex-col items-center gap-3">
                <div className="relative">
                  <Zap className="w-20 h-20 md:w-28 md:h-28 text-emerald-400 fill-emerald-500/10 animate-pulse" />
                  <div className="absolute inset-0 text-emerald-400 animate-ping opacity-20">
                    <Zap className="w-full h-full" />
                  </div>
                </div>
                <span className="font-mono text-[10px] tracking-[0.4em] text-emerald-500 opacity-60 font-black">CORE ENGINE</span>
              </div>

              {/* Satellite data bits */}
              <div className="absolute top-0 right-0 p-4 animate-float">
                <Terminal className="w-4 h-4 text-emerald-500/40" />
              </div>
              <div className="absolute bottom-0 left-0 p-4 animate-float" style={{ animationDelay: '1s' }}>
                <Command className="w-4 h-4 text-emerald-500/40" />
              </div>
            </div>
          </div>

          {/* FEATURE NODES */}
          <div className="absolute inset-0 pointer-events-none">
            {coreFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="absolute w-full h-full flex items-center justify-center p-4"
                style={{
                  top: feature.pos.top,
                  bottom: feature.pos.bottom,
                  left: feature.pos.left,
                  right: feature.pos.right,
                  width: 'auto',
                  height: 'auto'
                }}
              >
                <TechNode feature={feature} />
              </div>
            ))}
          </div>

          {/* Decorative floating bits */}
          <div className="hidden lg:block">
            <NodeDot pos={{ top: '20%', right: '35%' }} delay="0.5s" />
            <NodeDot pos={{ bottom: '25%', left: '30%' }} delay="1.2s" />
            <NodeDot pos={{ top: '45%', left: '20%' }} delay="0.8s" />
            <NodeDot pos={{ bottom: '40%', right: '25%' }} delay="2.1s" />
          </div>
        </div>
      </div>
    </section>
  );
};

const colorMappings: Record<string, any> = {
  emerald: { bg: "bg-emerald-500", from: "from-emerald-500/20", to: "to-emerald-500/5", border: "border-emerald-500/20" },
  blue: { bg: "bg-blue-500", from: "from-blue-500/20", to: "to-blue-500/5", border: "border-blue-500/20" },
  purple: { bg: "bg-purple-500", from: "from-purple-500/20", to: "to-purple-500/5", border: "border-purple-500/20" },
  orange: { bg: "bg-orange-500", from: "from-orange-500/20", to: "to-orange-500/5", border: "border-orange-500/20" }
};

const TechNode = ({ feature }: { feature: typeof coreFeatures[0] }) => {
  const colors = colorMappings[feature.color] || colorMappings.emerald;

  return (
    <div className="pointer-events-auto group animate-fade-in-up">
      <div className={cn(
        "relative bg-foreground/5 dark:bg-white/5 backdrop-blur-2xl border border-foreground/10 dark:border-white/10 p-6 rounded-[2rem] w-72 md:w-80 overflow-hidden text-left transition-all duration-500",
        "group-hover:translate-y-[-10px] group-hover:border-emerald-500/40 group-hover:bg-foreground/10 dark:group-hover:bg-white/10 shadow-2xl hover:shadow-emerald-500/10"
      )}>
        {/* Shine Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Status Chip */}
        <div className="flex items-center justify-between mb-6">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-xl group-hover:scale-110 transition-transform duration-500",
            colors.from, colors.to, colors.border
          )}>
            {feature.icon}
          </div>
          <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-tighter">{feature.status}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black tracking-tight group-hover:text-emerald-500 dark:group-hover:text-white transition-colors">{feature.name}</h3>
          <p className="text-sm text-muted-foreground font-medium leading-relaxed opacity-80">{feature.description}</p>
        </div>

        {/* Technical Data Bar */}
        <div className="mt-8 pt-6 border-t border-foreground/5 dark:border-white/5 flex items-center justify-between gap-4">
          <div className="flex-grow h-1 bg-foreground/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div className={cn("h-full rounded-full animate-pulse", colors.bg)} style={{ width: '65%' }} />
          </div>
          <span className="text-[10px] font-mono font-bold opacity-40 uppercase tracking-widest">Load: 65%</span>
        </div>
      </div>
    </div>
  );
};

const NodeDot = ({ pos, delay }: { pos: any, delay: string }) => (
  <div
    className="absolute w-2 h-2 bg-emerald-500/40 rounded-full animate-pulse-glow pointer-events-none"
    style={{ ...pos, animationDelay: delay }}
  />
);

const Terminal = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
  </svg>
);

export default TechFeaturesSection;
