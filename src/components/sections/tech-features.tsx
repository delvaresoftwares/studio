'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          {icon}
          <CardTitle className="font-headline text-xl">{featureName}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="font-semibold text-muted-foreground mb-3">{tldr}</p>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

const TechFeaturesSection = () => {
  return (
    <section id="features" className="w-full">
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
