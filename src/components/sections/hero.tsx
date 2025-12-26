import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Briefcase, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  return (
    <section id="hero" className="w-full flex items-center justify-center relative min-h-screen p-4 overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center pt-20 pb-10 z-10">
        <div className="animate-fade-in-up text-center md:text-left">
          <h1 className={cn(
            "hero-headline-shadow font-headline text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
            )}>
            Build. Launch. Succeed.
          </h1>
          <p className="max-w-xl mx-auto md:mx-0 text-base md:text-lg text-muted-foreground mb-8">
            Delvare provides cutting-edge software solutions tailored to your business needs. From websites to complex inventory systems, we deliver excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" asChild>
              <a href="#services">
                <Briefcase />
                Our Services
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#estimator">
                <Calculator />
                Estimate Cost
              </a>
            </Button>
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center">
             {/* GIF removed as per request */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
