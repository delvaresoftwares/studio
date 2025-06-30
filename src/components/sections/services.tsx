import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Code, Smartphone, Warehouse } from "lucide-react";

const services = [
  {
    title: "Custom Websites",
    description: "Beautiful, responsive, and high-performing websites that captivate your audience and grow your brand.",
    icon: <Code className="w-10 h-10 text-primary" />,
    image: "https://placehold.co/600x400.png",
    imageHint: "website design",
    price: "From $1,500",
    deal: "20% OFF"
  },
  {
    title: "Mobile Apps",
    description: "Intuitive and powerful iOS and Android applications to connect with your users on the go.",
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    image: "https://placehold.co/600x400.png",
    imageHint: "mobile app",
    price: "From $5,000"
  },
  {
    title: "Billing & Inventory Software",
    description: "Streamline your operations with custom software for billing, inventory, and resource management.",
    icon: <Warehouse className="w-10 h-10 text-primary" />,
    image: "https://placehold.co/600x400.png",
    imageHint: "inventory software",
    price: "From $10,000",
    deal: "Free Consultation"
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="h-screen w-full flex items-center justify-center snap-start bg-secondary/30">
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Our Core Services</h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-12">
          We offer a range of services to meet your business needs. Pricing may vary based on your location and project scope.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <CardHeader className="p-0 relative">
                <Image src={service.image} alt={service.title} width={600} height={400} className="transition-transform duration-300 group-hover:scale-110" data-ai-hint={service.imageHint} />
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
                <p className="font-bold text-lg text-primary">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
