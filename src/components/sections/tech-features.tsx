'use client';

import {
  Cloud,
  Brain,
  Code2,
  ShieldCheck,
  Wrench,
  RefreshCw,
  Zap,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const stackItems = [
  {
    name: "Cloud Hosting",
    icon: <Zap className="w-8 h-8" />,
    description: "High-tier server clusters with 99.99% uptime and global CDN distribution.",
    price: "From ₹5,000/mo",
    gradient: "from-blue-500/10 to-cyan-500/10"
  },
  {
    name: "AI Ecosystems",
    icon: <Zap className="w-8 h-8" />,
    description: "Proprietary model training and neural network automation for enterprise.",
    price: "From ₹25,000/mo",
    gradient: "from-purple-500/10 to-pink-500/10"
  },
  {
    name: "Product Design",
    icon: <Zap className="w-8 h-8" />,
    description: "Next-generation software architecture built with high-performance frameworks.",
    price: "From ₹50,000",
    gradient: "from-emerald-500/10 to-teal-500/10"
  },
  {
    name: "Cyber Security",
    icon: <Zap className="w-8 h-8" />,
    description: "Military-grade encryption and perpetual perimeter defense systems.",
    price: "From ₹15,000/mo",
    gradient: "from-red-500/10 to-orange-500/10"
  },
  {
    name: "Technical SLA",
    icon: <Zap className="w-8 h-8" />,
    description: "Full-lifecycle maintenance and 24/7 technical oversight for platforms.",
    price: "From ₹8,000/mo",
    gradient: "from-amber-500/10 to-yellow-500/10"
  },
  {
    name: "Legacy Migration",
    icon: <Zap className="w-8 h-8" />,
    description: "Seamless architectural transformation of mature software assets.",
    price: "From ₹1,00,000",
    gradient: "from-indigo-500/10 to-blue-500/10"
  },
  {
    name: "System Update",
    icon: <Zap className="w-8 h-8" />,
    description: "Continuous delivery of performance patches and feature expansion units.",
    price: "From ₹10,000/mo",
    gradient: "from-yellow-400/10 to-orange-400/10"
  },
  {
    name: "High-End Consulting",
    icon: <Zap className="w-8 h-8" />,
    description: "Executive technical strategy and architectural roadmap planning.",
    price: "From ₹15,000/hr",
    gradient: "from-teal-400/10 to-cyan-400/10"
  }
];

const TechFeaturesSection = () => {
  return (
    <section id="features" className="w-full relative py-32 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24 animate-fade-in-up">
          <Badge variant="outline" className="mb-6 border-primary text-primary px-6 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase">
            Technology Stack
          </Badge>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 text-foreground leading-[0.9]">
            Our Tech <br />
            <span className="text-primary italic font-light">Stack.</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg text-muted-foreground font-medium italic">
            "We use the best tools and methods to build technology that works for your business."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {stackItems.map((item, idx) => (
            <div
              key={item.name}
              className="group relative p-8 md:p-10 rounded-[2.5rem] bg-[#fdfdfd] border border-border/80 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl animate-fade-in-up flex flex-col justify-between"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Card Glow */}
              <div className={cn("absolute inset-0 rounded-[2.5rem] bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", item.gradient)} />

              <div className="relative z-10 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-border/50 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  {item.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-black tracking-tight text-foreground transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium italic opacity-70">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-8 mt-auto flex items-center justify-between border-t border-border/50">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black tracking-widest text-muted-foreground/40 uppercase">Initial Plan</span>
                  <span className="text-sm font-black text-primary">{item.price}</span>
                </div>
                <button
                  className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                  onClick={() => {
                    const msg = `Executive inquiry for ${item.name} (${item.price}).`;
                    window.open(`https://wa.me/918606821125?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA or Label */}
        <div className="mt-24 text-center">
          <Badge variant="outline" className="mb-6 border-primary text-primary px-6 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase">
            Instant Quotes
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default TechFeaturesSection;
