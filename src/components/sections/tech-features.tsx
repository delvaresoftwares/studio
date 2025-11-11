'use client'

import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldCheck, LineChart, Cpu, Laptop } from 'lucide-react';

const features = [
  {
    name: "Cyber Security",
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    tldr: "Protecting your digital assets with robust security measures.",
    description: "We implement multi-layered security protocols, including encryption, threat detection, and regular audits to safeguard your data and infrastructure against cyber threats."
  },
  {
    name: "Digital Marketing",
    icon: <LineChart className="w-8 h-8 text-primary" />,
    tldr: "Expanding your reach and engaging with your target audience.",
    description: "Our data-driven strategies for SEO, content marketing, and social media campaigns are designed to increase your online visibility and drive customer engagement."
  },
  {
    name: "AI Integration",
    icon: <Cpu className="w-8 h-8 text-primary" />,
    tldr: "Leveraging artificial intelligence to build smarter solutions.",
    description: "We integrate machine learning models and AI-powered tools to automate processes, generate insights, and create intelligent applications that adapt to user needs."
  },
  {
    name: "Software Development",
    icon: <Laptop className="w-8 h-8 text-primary" />,
    tldr: "Building custom websites and mobile applications for your needs.",
    description: "From concept to deployment, we develop bespoke software solutions, including high-performance websites and cross-platform mobile apps, tailored to your specific goals."
  }
];

const TechFeatureCard = ({ feature }: { feature: typeof features[0] }) => {
  return (
    <div className="group relative rounded-xl p-px bg-gradient-to-b from-border/50 to-transparent transition-all duration-300 hover:bg-gradient-to-br hover:from-primary hover:to-accent">
      <Card className="glass-card h-full flex flex-col p-8 text-center transition-all duration-300 ease-in-out group-hover:-translate-y-2">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/20 mx-auto">
          {feature.icon}
        </div>
        <CardTitle className="font-headline text-2xl mb-3">{feature.name}</CardTitle>
        <CardDescription className="mb-6 flex-grow font-semibold text-muted-foreground">{feature.tldr}</CardDescription>
        <div className="w-full min-h-[60px]">
          <p className="text-muted-foreground/80 text-sm">{feature.description}</p>
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
            <TechFeatureCard key={feature.name} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechFeaturesSection;
