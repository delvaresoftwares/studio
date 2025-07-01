'use client'

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { Code, Smartphone, Warehouse, Mail, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Custom Websites",
    description: "Beautiful, responsive, and high-performing websites that captivate your audience and grow your brand.",
    icon: <Code className="w-10 h-10" />,
    image: "https://www.justinmind.com/wp-content/uploads/2020/02/website-background-design-guide.png",
    imageHint: "website design",
    deal: "20% OFF"
  },
  {
    title: "Mobile Apps",
    description: "Intuitive and powerful iOS and Android applications to connect with your users on the go.",
    icon: <Smartphone className="w-10 h-10" />,
    image: "https://c0.wallpaperflare.com/preview/260/841/181/concept-development-device-flat.jpg",
    imageHint: "mobile app",
  },
  {
    title: "Billing & Inventory Software",
    description: "Streamline your operations with custom software for billing, inventory, and resource management.",
    icon: <Warehouse className="w-10 h-10" />,
    image: "https://media.istockphoto.com/id/917884972/photo/businessperson-checking-invoice-on-computer.jpg?s=612x612&w=0&k=20&c=poJnPJ0nYZUDRM2-ccfhwFhWaZhfTIt6ISY-W-QgQJM=",
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


const ServicesSection = () => {
  const [country, setCountry] = useState<Country>('USA');

  const formatPrice = (price: number) => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: pricingData[country].currency,
        minimumFractionDigits: 0,
      }).format(price);
    } catch (e) {
      console.error(e);
      return 'N/A';
    }
  };

  return (
    <section id="services" className="w-full bg-secondary">
      <div className="container mx-auto px-4 py-24 sm:py-32 text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Our Core Services</h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          We offer a range of services to meet your business needs. Pricing may vary based on your location and project scope.
        </p>
        <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
                <span className="text-muted-foreground">Show prices in:</span>
                 <Select onValueChange={(value) => setCountry(value as Country)} defaultValue={country}>
                    <SelectTrigger className="w-[180px] bg-card">
                        <SelectValue placeholder="Select country" />
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
            <Card key={index} className="flex flex-col text-left overflow-hidden group transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2">
              <CardHeader className="p-0 relative">
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  width={600} 
                  height={400} 
                  className="transition-transform duration-500 group-hover:scale-110 object-cover aspect-[3/2]" 
                  data-ai-hint={service.imageHint} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 {service.deal && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground text-sm py-1 px-3 shadow-lg">{service.deal}</Badge>
                )}
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="flex items-center gap-4">
                     {React.cloneElement(service.icon, { className: 'w-10 h-10 text-white' })}
                    <CardTitle className="text-2xl font-bold font-headline text-white drop-shadow-md">{service.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col bg-card">
                <CardDescription className="mb-6 flex-grow">{service.description}</CardDescription>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">Starts from</p>
                  <p className="font-bold text-4xl text-primary">{formatPrice(pricingData[country][service.title as ServiceTitle])}
                    <span className="text-base font-normal text-muted-foreground">{service.title === 'Billing & Inventory Software' ? '/year' : ''}</span>
                  </p>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
