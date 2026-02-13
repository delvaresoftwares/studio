'use client';

import { ShieldCheck, LineChart, Cpu, Laptop, Zap, Layers, Database, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    name: "Cyber Security",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    description: "Zero-trust architecture and AI-driven threat detection.",
    color: "emerald",
    delay: "0ms"
  },
  {
    name: "Digital Marketing",
    icon: <LineChart className="w-6 h-6 text-blue-400" />,
    description: "Data-first strategies that convert traffic into revenue.",
    color: "blue",
    delay: "200ms"
  },
  {
    name: "AI Integration",
    icon: <Cpu className="w-6 h-6 text-purple-400" />,
    description: "Neural networks that automate complex business logic.",
    color: "purple",
    delay: "400ms"
  },
  {
    name: "Software Dev",
    icon: <Laptop className="w-6 h-6 text-orange-400" />,
    description: "Scalable, resilient systems built for the future.",
    color: "orange",
    delay: "600ms"
  }
];

const TechFeaturesSection = () => {
  return (
    <section id="features" className="w-full relative py-40 overflow-hidden bg-black text-white selection:bg-emerald-500/30">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Radial Gradient Filter */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-24 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 mb-6">
            <Layers className="w-3 h-3" />
            <span>INFRASTRUCTURE V2.0</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/10">
            Technology <br />
            <span className="text-emerald-500 relative inline-block">
              At Core.
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-emerald-500 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="max-w-xl text-lg text-white/50 leading-relaxed">
            Powered by a proprietary stack of next-gen tools and frameworks, engineered for absolute performance.
          </p>
        </div>

        <div className="relative flex items-center justify-center h-[800px] w-full max-w-6xl mx-auto perspective-1000">

          {/* Central Connecting Lines */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[800px] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            <div className="h-[800px] w-[1px] absolute bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
          </div>

          {/* The Core Reactor Complex */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Outer Rings */}
            <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-emerald-500/10 animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-emerald-500/20 border-dashed animate-[spin_30s_linear_infinite_reverse]" />

            {/* Energy Field */}
            <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gradient-radial from-emerald-500/10 to-transparent rounded-full blur-[60px]" />

            {/* Core */}
            <div className="relative z-10 w-40 h-40 rounded-full bg-black/80 backdrop-blur-xl border border-emerald-500/50 flex items-center justify-center shadow-[0_0_80px_rgba(16,185,129,0.3)] animate-float">
              <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping" />
              <Zap className="w-16 h-16 text-emerald-400 fill-emerald-500/20 animate-breath dropshadow-lg" />
            </div>
          </div>

          {/* Orbiting Features Grid Layout */}
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-[400px] md:gap-y-16 place-content-center pointer-events-none">
            {/* Render features in a layout around the center */}
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center justify-center md:block pointer-events-auto transform transition-all duration-500 hover:scale-105 animate-fade-in-up",
                  idx % 2 === 0 ? "md:text-right" : "md:text-left"
                )}
                style={{ animationDelay: feature.delay }}
              >
                <FeatureCard feature={feature} align={idx % 2 === 0 ? "right" : "left"} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature, align }: { feature: typeof features[0], align: 'left' | 'right' }) => (
  <div className={cn(
    "group relative bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl w-72 md:w-80 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:border-emerald-500/30",
    "shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
  )}>
    <div className={cn(
      "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500",
      `from-${feature.color}-500 to-transparent`
    )} />

    <div className={cn("relative z-10 flex flex-col gap-4", align === 'right' ? "md:items-end" : "md:items-start")}>
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform duration-500",
        `from-${feature.color}-500/20 to-${feature.color}-500/5 border border-${feature.color}-500/20`
      )}>
        {feature.icon}
      </div>
      <div>
        <h3 className="font-bold text-xl mb-1 group-hover:text-white transition-colors">{feature.name}</h3>
        <p className="text-sm text-gray-400 font-medium">{feature.description}</p>
      </div>
    </div>
  </div>
);

export default TechFeaturesSection;
