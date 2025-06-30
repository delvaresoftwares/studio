import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="h-screen w-full flex flex-col items-center justify-center snap-start relative text-center p-4">
      <div className="animate-fade-in-up">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4">
          Build. Launch. Succeed.
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
          Delvare provides cutting-edge software solutions tailored to your business needs. From websites to complex inventory systems, we deliver excellence.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <a href="#services">Our Services</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#contact">Get a Quote</a>
          </Button>
        </div>
      </div>
      <a href="#services" aria-label="Scroll to next section" className="absolute bottom-10 animate-bounce">
        <ArrowDown className="w-8 h-8 text-muted-foreground" />
      </a>
    </section>
  );
};

export default HeroSection;
