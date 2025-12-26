'use client'

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Smartphone, Warehouse, Mail, Calculator, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Custom Websites",
    description: "High-performance, responsive websites built to scale. From simple portfolios to complex e-commerce platforms.",
    icon: <Code className="w-10 h-10" />,
    deal: "One-Time Cost"
  },
  {
    title: "Mobile Apps",
    description: "Intuitive and powerful native iOS and Android applications to connect with your users on the go.",
    icon: <Smartphone className="w-10 h-10" />,
    deal: "One-Time Cost"
  },
  {
    title: "Billing & Inventory Software",
    description: "A comprehensive suite to streamline your operations, including admin, billing, accounting, sales, purchasing, and multi-store/employee management.",
    icon: <Warehouse className="w-10 h-10" />,
    deal: "Subscription Plans"
  }
];

const pricingData = {
  'USA': { 'Custom Websites': 4999, 'Mobile Apps': 25999, 'Billing & Inventory Software': 299, currency: 'USD' },
  'India': { 'Custom Websites': 9999, 'Mobile Apps': 39999, 'Billing & Inventory Software': 4999, currency: 'INR' },
  'Europe': { 'Custom Websites': 4600, 'Mobile Apps': 24000, 'Billing & Inventory Software': 275, currency: 'EUR' }
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
              <Card className="glass-card h-full flex flex-col text-center overflow-hidden transition-all duration-300 group-hover:-translate-y-2">
                <CardHeader className="p-6 items-center flex-grow-0">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/20 mx-auto">
                      {React.cloneElement(service.icon, { className: 'w-10 h-10 text-primary' })}
                  </div>
                  <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                  {service.deal && (
                    <Badge className={cn("mt-2 text-sm py-1 px-3 shadow-lg", service.title === 'Billing & Inventory Software' ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground')}>{service.deal}</Badge>
                  )}
                </CardHeader>
                <CardContent className="p-6 pt-0 flex-grow flex flex-col">
                  <CardDescription className="mb-6 flex-grow">{service.description}</CardDescription>
                  
                  <div className="mt-auto space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Starts from</p>
                      <div className="font-bold text-3xl sm:text-4xl text-primary h-11 flex items-center justify-center">
                        {country ? (
                          <>
                            {formatPrice(pricingData[country][service.title as ServiceTitle] as number, country)}
                            <span className="text-base font-normal text-muted-foreground ml-1">{service.title === 'Billing & Inventory Software' ? '/month' : ''}</span>
                          </>
                        ) : (
                          <Loader2 className="w-8 h-8 animate-spin" />
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
