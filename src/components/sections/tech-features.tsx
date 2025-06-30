'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTechFeatureDescriptionAction } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldCheck, LineChart, Cpu } from 'lucide-react';

const features = [
  {
    name: "Cyber Security",
    icon: <ShieldCheck className="w-8 h-8 text-primary" />
  },
  {
    name: "Digital Marketing",
    icon: <LineChart className="w-8 h-8 text-primary" />
  },
  {
    name: "AI Integration",
    icon: <Cpu className="w-8 h-8 text-primary" />
  }
];

const TechFeatureCard = ({ featureName, icon }: { featureName: string; icon: React.ReactNode }) => {
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
    <Card className="flex flex-col h-full transform transition-transform duration-300 hover:-translate-y-2">
      <CardHeader>
        <div className="flex items-center gap-4">
          {icon}
          <CardTitle className="font-headline text-xl">{featureName}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <p className="text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

const TechFeaturesSection = () => {
  return (
    <section id="features" className="h-screen w-full flex items-center justify-center snap-start">
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Technology at the Core</h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-12">
          We leverage the latest technologies to build robust and scalable solutions.
        </p>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <TechFeatureCard key={feature.name} featureName={feature.name} icon={feature.icon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechFeaturesSection;
