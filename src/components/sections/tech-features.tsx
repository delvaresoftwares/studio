'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { getTechFeatureDescriptionAction } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldCheck, LineChart, Cpu, Laptop } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    name: "Cyber Security",
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    tldr: "Protecting your digital assets with robust security measures."
  },
  {
    name: "Digital Marketing",
    icon: <LineChart className="w-8 h-8 text-primary" />,
    tldr: "Expanding your reach and engaging with your target audience."
  },
  {
    name: "AI Integration",
    icon: <Cpu className="w-8 h-8 text-primary" />,
    tldr: "Leveraging artificial intelligence to build smarter solutions."
  },
  {
    name: "Software Development",
    icon: <Laptop className="w-8 h-8 text-primary" />,
    tldr: "Building custom websites and mobile applications for your needs."
  }
];

const TechFeatureCard = ({ featureName, icon, tldr }: { featureName: string; icon: React.ReactNode; tldr: string; }) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDescription = async () => {
      setLoading(true);
      const desc = await getTechFeatureDescriptionAction(featureName);
      setDescription(desc);
      setLoading(false);
    };
    fetchDescription();
  }, [featureName]);

  return (
    <div className="group relative rounded-xl p-px bg-gradient-to-b from-white/10 to-transparent transition-all duration-300 hover:bg-white/20">
      <Card className="glass-card h-full flex flex-col p-8 text-center transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)]">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 mx-auto">
          {icon}
        </div>
        <CardTitle className="font-headline text-2xl mb-3">{featureName}</CardTitle>
        <CardDescription className="mb-6 flex-grow font-semibold text-muted-foreground">{tldr}</CardDescription>
        <div className="w-full min-h-[60px]">
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5 mx-auto" />
            </div>
          ) : (
            <p className="text-muted-foreground/80 text-sm">{description}</p>
          )}
        </div>
      </Card>
    </div>
  );
};

const TechFeaturesSection = () => {
  return (
    <section id="features" className="w-full relative py-24 sm:py-32">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Technology at the Core</h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-12">
          We leverage the latest technologies to build robust and scalable solutions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <TechFeatureCard key={feature.name} featureName={feature.name} icon={feature.icon} tldr={feature.tldr} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechFeaturesSection;
