'use client';

import { ShieldCheck, LineChart, Cpu, Laptop, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    name: "Cyber Security",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    description: "Zero-trust architecture and AI-driven threat detection.",
    color: "emerald"
  },
  {
    name: "Digital Marketing",
    icon: <LineChart className="w-6 h-6 text-blue-400" />,
    description: "Data-first strategies that convert traffic into revenue.",
    color: "blue"
  },
  {
    name: "AI Integration",
    icon: <Cpu className="w-6 h-6 text-purple-400" />,
    description: "Neural networks that automate complex business logic.",
    color: "purple"
  },
  {
    name: "Software Dev",
    icon: <Laptop className="w-6 h-6 text-orange-400" />,
    description: "Scalable, resilient systems built for the future.",
    color: "orange"
  }
];

const TechFeaturesSection = () => {
  return (
    <section id="features" className="w-full relative py-40 overflow-hidden bg-black text-white">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-24">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/20">
            Technology <br />
            <span className="text-emerald-500">At Core.</span>
          </h2>
          <p className="max-w-xl text-lg text-white/40">
            Powered by a proprietary stack of next-gen tools and frameworks.
          </p>
        </div>

        <div className="relative flex items-center justify-center h-[600px] w-full max-w-5xl mx-auto">
          {/* The Core Reactor */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-emerald-500/20 animate-[spin_10s_linear_infinite]" />
            <div className="absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full border border-emerald-500/30 border-dashed animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-emerald-500/5 rounded-full blur-[80px]" />
            <div className="absolute w-24 h-24 bg-emerald-500 rounded-full blur-xl animate-pulse" />
            <div className="relative z-10 w-32 h-32 rounded-full bg-black border border-emerald-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)]">
              <Zap className="w-12 h-12 text-emerald-400 fill-emerald-400 animate-breath" />
            </div>
          </div>

          {/* Orbiting Features */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top Left */}
            <div className="absolute top-[10%] left-[5%] md:left-[15%] animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              <FeatureCard feature={features[0]} align="right" />
            </div>
            {/* Top Right */}
            <div className="absolute top-[10%] right-[5%] md:right-[15%] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <FeatureCard feature={features[1]} align="left" />
            </div>
            {/* Bottom Left */}
            <div className="absolute bottom-[10%] left-[5%] md:left-[15%] animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <FeatureCard feature={features[2]} align="right" />
            </div>
            {/* Bottom Right */}
            <div className="absolute bottom-[10%] right-[5%] md:right-[15%] animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <FeatureCard feature={features[3]} align="left" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature, align }: { feature: typeof features[0], align: 'left' | 'right' }) => (
  <div className={cn(
    "bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-64 md:w-80 pointer-events-auto hover:bg-white/10 transition-colors duration-300",
    align === 'right' ? "text-right" : "text-left"
  )}>
    <div className={cn("flex items-center gap-4 mb-3", align === 'right' ? "flex-row-reverse" : "flex-row")}>
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center bg-white/5", `text-${feature.color}-400`)}>
        {feature.icon}
      </div>
      <h3 className="font-bold text-xl">{feature.name}</h3>
    </div>
    <p className="text-sm text-gray-400">{feature.description}</p>
  </div>
);

export default TechFeaturesSection;
