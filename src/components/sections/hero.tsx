import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Briefcase, Calculator } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="w-full flex items-center justify-center relative min-h-screen p-4">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center pt-20 pb-10">
        <div className="animate-fade-in-up text-center md:text-left">
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-4 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent drop-shadow-sm">
            Build. Launch. Succeed.
          </h1>
          <p className="max-w-xl mx-auto md:mx-0 text-lg md:text-xl text-muted-foreground mb-8">
            Delvare provides cutting-edge software solutions tailored to your business needs. From websites to complex inventory systems, we deliver excellence.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
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
        <div className="hidden md:flex justify-center animate-fade-in-up">
          <Image 
            src="https://res.cloudinary.com/dt4mweku7/image/upload/v1751266409/buissware_amykyt.gif" 
            alt="Delvare services animation" 
            width={500} 
            height={500} 
            unoptimized 
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
