'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const technologies = [
    { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/000000' },
    { name: 'Gatsby', icon: 'https://cdn.simpleicons.org/gatsby/663399' },
    { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
    { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
    { name: 'Flutter', icon: 'https://cdn.simpleicons.org/flutter/02569B' },
    { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
    { name: 'HTML5', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
    { name: 'CSS3', icon: 'https://cdn.simpleicons.org/css3' },
    { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript' },
    { name: 'Java', icon: 'https://cdn.simpleicons.org/openjdk' },
    { name: 'Python', icon: 'https://cdn.simpleicons.org/python' },
    { name: 'C++', icon: 'https://cdn.simpleicons.org/cplusplus' },
    { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonaws' },
    { name: 'Azure', icon: 'https://cdn.simpleicons.org/microsoftazure' },
    { name: 'OpenAI', icon: 'https://cdn.simpleicons.org/openai' },
    { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
    { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
    { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
    { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/DC382D' },
    { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/000000' },
];

const TechStackSection = () => {
    return (
        <section className="w-full py-32 bg-white border-y border-border overflow-hidden">
            <div className="container mx-auto px-4 mb-20 text-center">
                <Badge variant="outline" className="mb-8 border-border py-1.5 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-muted-foreground">
                    Technical Foundation
                </Badge>
                <h2 className="font-headline text-5xl md:text-7xl font-black mb-10 tracking-tight text-foreground leading-none">
                    Crafted with <br />
                    <span className="text-muted-foreground font-light italic tracking-tight">Precision.</span>
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                    We deploy world-class engineering stacks to ensure your platforms are resilient, modern, and high-performance.
                </p>
            </div>

            {/* Marquee 1 */}
            <div className="relative flex overflow-x-hidden group">
                <div className="flex animate-marquee flex-nowrap whitespace-nowrap py-10">
                    {[...technologies, ...technologies].map((tech, idx) => (
                        <TechIconCard key={`m1-${idx}`} tech={tech} />
                    ))}
                </div>
            </div>

            {/* Marquee 2 - Reverse */}
            <div className="relative flex overflow-x-hidden group">
                <div className="flex animate-marquee-reverse flex-nowrap whitespace-nowrap py-10">
                    {[...technologies, ...technologies].map((tech, idx) => (
                        <TechIconCard key={`m2-${idx}`} tech={tech} />
                    ))}
                </div>
            </div>

            {/* Overlay gradients for marquee fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        </section>
    );
};

const TechIconCard = ({ tech }: { tech: typeof technologies[0] }) => (
    <div className="flex flex-col items-center gap-6 px-10 flex-shrink-0 transition-all duration-500 group/item">
        <div className="w-24 h-24 flex items-center justify-center rounded-[2rem] bg-[#fdfdfd] border border-border/80 shadow-sm group-hover/item:border-primary/20 group-hover/item:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] group-hover/item:-translate-y-2 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover/item:opacity-100 transition-opacity" />
            <img
                src={tech.icon}
                alt={tech.name}
                className="w-10 h-10 object-contain grayscale-0 opacity-100 group-hover/item:scale-110 transition-all duration-500"
            />
        </div>
        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-muted-foreground/60 group-hover/item:text-primary transition-colors">
            {tech.name}
        </span>
    </div>
);

export default TechStackSection;
