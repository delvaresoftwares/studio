'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { getTechFeatureDescriptionAction } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldCheck, LineChart, Cpu, Laptop } from 'lucide-react';

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
    <Card className="group flex h-full flex-col p-8 text-center transition-all duration-300 ease-in-out hover:-translate-y-2 bg-card/50 backdrop-blur-sm border border-border/20 hover:border-primary/50 shadow-lg hover:shadow-primary/20">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 mx-auto">
        {icon}
      </div>
      <CardTitle className="font-headline text-2xl mb-3">{featureName}</CardTitle>
      <CardDescription className="mb-6 flex-grow font-semibold text-muted-foreground">{tldr}</CardDescription>
      <div className="w-full">
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
  );
};

const TechFeaturesSection = () => {
  return (
    <section id="features" className="w-full bg-secondary min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-24 sm:py-32 text-center">
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
