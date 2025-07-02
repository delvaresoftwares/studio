'use client'

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { Code, Smartphone, Warehouse, Mail, Calculator, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Custom Websites",
    description: "Beautiful, responsive, and high-performing websites that captivate your audience and grow your brand.",
    icon: <Code className="w-10 h-10" />,
    image: "https://media.istockphoto.com/id/1352601968/photo/programming-code-abstract-technology-background-of-software-developer-and-computer-script.jpg?s=612x612&w=0&k=20&c=JjVz2LgNf9_O0N2i-5_D_Jjdnj21t2TZaLw7o_XmXeo=",
    imageHint: "website development",
    deal: "20% OFF"
  },
  {
    title: "Mobile Apps",
    description: "Intuitive and powerful iOS and Android applications to connect with your users on the go.",
    icon: <Smartphone className="w-10 h-10" />,
    image: "https://media.istockphoto.com/id/1249219337/photo/mobile-application-development-concept-with-person-using-a-laptop.jpg?s=612x612&w=0&k=20&c=N5a6c4Xg3gSDHhQ2GIs2yK0iVtMZTfS2sKxJvyiU3Rw=",
    imageHint: "mobile app",
  },
  {
    title: "Billing & Inventory Software",
    description: "Streamline your operations with custom software for billing, inventory, and resource management.",
    icon: <Warehouse className="w-10 h-10" />,
    image: "https://media.istockphoto.com/id/1311598658/photo/scanning-parcel-with-barcode-scanner-in-warehouse.jpg?s=612x612&w=0&k=20&c=T_o2krwn2s3eN2N-2k2gzUXg2OKjSAe0L5u3CxfUPjc=",
    imageHint: "inventory software",
    deal: "Annual Plans"
  }
];

const pricingData = {
  'USA': { 'Custom Websites': 199, 'Mobile Apps': 949, 'Billing & Inventory Software': 4999, currency: 'USD' },
  'India': { 'Custom Websites': 15000, 'Mobile Apps': 75000, 'Billing & Inventory Software': 399999, currency: 'INR' },
  'Europe': { 'Custom Websites': 185, 'Mobile Apps': 875, 'Billing & Inventory Software': 4600, currency: 'EUR' }
};

type Country = keyof typeof pricingData;
type ServiceTitle = keyof (typeof pricingData)['USA'];

const europeanCountryCodes = ['AL', 'AD', 'AM', 'AT', 'BY', 'BE', 'BA', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FO', 'FI', 'FR', 'DE', 'GI', 'GR', 'HU', 'IS', 'IE', 'IM', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'MD', 'MC', 'ME', 'NL', 'MK', 'NO', 'PL', 'PT', 'RO', 'RU', 'SM', 'RS', 'SK', 'SI', 'ES', 'SE', 'CH', 'TR', 'UA', 'GB', 'VA'];

const ServicesSection = () => {
  const [country, setCountry] = useState<Country | null>(null);
  const [isLocating, setIsLocating] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      setIsLocating(true);
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch location');
        }
        const data = await response.json();
        const countryCode = data.country_code;
        
        if (countryCode === 'US') {
          setCountry('USA');
        } else if (countryCode === 'IN') {
          setCountry('India');
        } else if (europeanCountryCodes.includes(countryCode)) {
          setCountry('Europe');
        } else {
          setCountry('USA'); // Default
        }
      } catch (error) {
        console.error("Could not auto-detect location:", error);
        setCountry('USA'); // Fallback on error
      } finally {
        setIsLocating(false);
      }
    };

    fetchCountry();
  }, []);

  const formatPrice = (price: number, selectedCountry: Country) => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: pricingData[selectedCountry].currency,
        minimumFractionDigits: 0,
      }).format(price);
    } catch (e) {
      console.error(e);
      return 'N/A';
    }
  };

  return (
    <section id="services" className="w-full py-24 sm:py-32">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Our Core Services</h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          We offer a range of services to meet your business needs. Pricing may vary based on your location and project scope.
        </p>
        <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
                <span className="text-muted-foreground">Show prices in:</span>
                 <Select onValueChange={(value) => setCountry(value as Country)} value={country || ''} disabled={isLocating}>
                    <SelectTrigger className="w-[180px] glass-card border-white/20">
                        <SelectValue placeholder={isLocating ? "Detecting..." : "Select country"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="USA">USA (USD)</SelectItem>
                        <SelectItem value="India">India (INR)</SelectItem>
                        <SelectItem value="Europe">Europe (EUR)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service, index) => (
            <div key={index} className="group relative rounded-xl p-px bg-gradient-to-b from-border/50 to-transparent transition-all duration-300 hover:bg-gradient-to-br hover:from-primary hover:to-accent">
              <Card className="glass-card h-full flex flex-col text-left overflow-hidden transition-all duration-300 group-hover:-translate-y-2">
                <CardHeader className="p-0 relative">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    width={600} 
                    height={400} 
                    className="transition-transform duration-500 group-hover:scale-110 object-cover aspect-[3/2]" 
                    data-ai-hint={service.imageHint} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  {service.deal && (
                    <Badge className={cn("absolute top-4 right-4 text-sm py-1 px-3 shadow-lg", service.title === 'Billing & Inventory Software' ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground')}>{service.deal}</Badge>
                  )}
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="flex items-center gap-4">
                      {React.cloneElement(service.icon, { className: 'w-10 h-10 text-white' })}
                      <CardTitle className="text-2xl font-bold font-headline text-white drop-shadow-md">{service.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <CardDescription className="mb-6 flex-grow">{service.description}</CardDescription>
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground">Starts from</p>
                    <div className="font-bold text-4xl text-primary h-11 flex items-center">
                      {country ? (
                        <>
                          {formatPrice(pricingData[country][service.title as ServiceTitle], country)}
                          <span className="text-base font-normal text-muted-foreground ml-1">{service.title === 'Billing & Inventory Software' ? '/year' : ''}</span>
                        </>
                      ) : (
                        <Loader2 className="w-8 h-8 animate-spin" />
                      )}
                    </div>
                  </div>
                  <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Button asChild>
                          <a href="#contact">
                              <Mail />
                              Get a Quote
                          </a>
                      </Button>
                      <Button asChild variant="outline">
                          <a href="#estimator">
                              <Calculator />
                              Estimate
                          </a>
                      </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
