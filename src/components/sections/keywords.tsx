'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Cpu, Cloud, Code2, Globe, HardDrive, ShieldCheck, LifeBuoy, Bot, Zap, Database, GitBranch, MessageSquare } from 'lucide-react';

const keywordItems = [
  { text: "Intelligence", icon: <Bot className="w-8 h-8 md:w-10 md:h-10" /> },
  { text: "Infrastructure", icon: <Cloud className="w-8 h-8 md:w-10 md:h-10" /> },
  { text: "Automation", icon: <Zap className="w-8 h-8 md:w-10 md:h-10" /> },
  { text: "Engineering", icon: <Code2 className="w-8 h-8 md:w-10 md:h-10" /> },
  { text: "Platform", icon: <Globe className="w-8 h-8 md:w-10 md:h-10" /> },
  { text: "Security", icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" /> },
  { text: "Consultancy", icon: <LifeBuoy className="w-8 h-8 md:w-10 md:h-10" /> },
  { text: "Speciality", icon: <Cpu className="w-8 h-8 md:w-10 md:h-10" /> },
];

const MarqueeRow = ({ reverse = false, speed = 30 }: { reverse?: boolean; speed?: number }) => {
  const content = (
    <div className="flex shrink-0 gap-16 md:gap-24 items-center px-12">
      {keywordItems.map((item, idx) => (
        <div key={idx} className="flex items-center gap-6 text-white/60 hover:text-white transition-all duration-700 cursor-default group">
          <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter whitespace-nowrap italic">
            {item.text}
          </span>
          <div className="text-white/40 group-hover:text-white shrink-0 transition-all duration-700">{item.icon}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "flex w-max py-4 will-change-transform",
        reverse ? "animate-marquee-scroll-reverse" : "animate-marquee-scroll"
      )}
      style={{ animationDuration: `${speed}s` }}
    >
      {content}
      {content}
    </div>
  );
};

const KeywordMarquee = () => {
  return (
    <section className="w-full py-20 md:py-28 overflow-hidden bg-primary relative border-y border-white/10">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-white/[0.05] blur-[150px] rounded-full pointer-events-none" />

      <div className="flex flex-col gap-6 md:gap-8 relative z-10">
        <div className="relative rotate-[-1.5deg] overflow-hidden">
          <MarqueeRow speed={35} />
        </div>

        <div className="relative rotate-[1deg] overflow-hidden">
          <MarqueeRow reverse speed={28} />
        </div>

        <div className="relative rotate-[-0.5deg] overflow-hidden">
          <MarqueeRow speed={32} />
        </div>
      </div>

      {/* Editorial side fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-primary to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-primary to-transparent z-10" />
    </section>
  );
};

export default KeywordMarquee;
