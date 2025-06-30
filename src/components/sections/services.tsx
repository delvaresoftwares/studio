'use client'

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { Code, Smartphone, Warehouse } from "lucide-react";

const services = [
  {
    title: "Custom Websites",
    description: "Beautiful, responsive, and high-performing websites that captivate your audience and grow your brand.",
    icon: <Code className="w-10 h-10 text-primary" />,
    image: "https://www.justinmind.com/wp-content/uploads/2020/02/website-background-design-guide.png",
    imageHint: "website design",
    deal: "20% OFF"
  },
  {
    title: "Mobile Apps",
    description: "Intuitive and powerful iOS and Android applications to connect with your users on the go.",
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    image: "https://c0.wallpaperflare.com/preview/260/841/181/concept-development-device-flat.jpg",
    imageHint: "mobile app",
  },
  {
    title: "Billing & Inventory Software",
    description: "Streamline your operations with custom software for billing, inventory, and resource management.",
    icon: <Warehouse className="w-10 h-10 text-primary" />,
    image: "https://media.istockphoto.com/id/917884972/photo/businessperson-checking-invoice-on-computer.jpg?s=612x612&w=0&k=20&c=poJnPJ0nYZUDRM2-ccfhwFhWaZhfTIt6ISY-W-QgQJM=",
    imageHint: "inventory software",
    deal: "Free Consultation"
  }
];

const pricingData = {
  'USA': { 'Custom Websites': 1000, 'Mobile Apps': 3000, 'Billing & Inventory Software': 7000, currency: 'USD' },
  'India': { 'Custom Websites': 80000, 'Mobile Apps': 250000, 'Billing & Inventory Software': 500000, currency: 'INR' },
  'Europe': { 'Custom Websites': 900, 'Mobile Apps': 2800, 'Billing & Inventory Software': 6500, currency: 'EUR' }
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
    <section id="services" className="w-full">
      <div className="container mx-auto px-4 py-24 sm:py-32 text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Our Core Services</h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          We offer a range of services to meet your business needs. Pricing may vary based on your location and project scope.
        </p>
        <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
                <span className="text-muted-foreground">Show prices in:</span>
                 <Select onValueChange={(value) => setCountry(value as Country)} defaultValue={country}>
                    <SelectTrigger className="w-[180px] bg-card/80">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <CardHeader className="p-0 relative">
                <Image src={service.image} alt={service.title} width={600} height={400} className="transition-transform duration-300 group-hover:scale-110 object-cover aspect-[3/2]" data-ai-hint={service.imageHint} />
                {service.deal && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground text-sm py-1 px-3">{service.deal}</Badge>
                )}
              </CardHeader>
              <CardContent className="p-6 text-left">
                <div className="flex items-center gap-4 mb-4">
                  {service.icon}
                  <CardTitle className="text-2xl font-bold font-headline">{service.title}</CardTitle>
                </div>
                <CardDescription className="mb-4">{service.description}</CardDescription>
                <p className="font-bold text-4xl text-primary">From {formatPrice(pricingData[country][service.title as ServiceTitle])}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
