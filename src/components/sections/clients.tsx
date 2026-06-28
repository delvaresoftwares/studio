'use client';

import { Badge } from '@/components/ui/badge';
import { ExternalLink, Globe } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, TypingText } from '@/components/ui/motion';

const clients = [
  { name: 'EC Bills', url: 'https://ecbills.in' },
  { name: 'Laynered', url: 'https://laynered.com' },
  { name: 'Spectra School', url: 'https://spectraschool.in' },
  { name: 'Delvare', url: 'https://delvare.in' },
  { name: 'Nature of the Divine', url: 'https://natureofthedivine.com' },
  { name: 'Alien Hills', url: 'https://alienhills.shop' },
];

const getFaviconUrl = (domain: string) => {
  try {
    const url = new URL(domain.startsWith('http') ? domain : `https://${domain}`);
    return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=128`;
  } catch {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  }
};

const ClientsSection = () => {
  return (
    <section id="clients" className="w-full py-32 relative overflow-hidden bg-[#fafafa]">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <FadeIn delay={0.2} className="mb-16">
          <Badge variant="outline" className="mb-8 border-border py-1.5 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-muted-foreground">
            Portfolio
          </Badge>
          <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-none">
            <TypingText text="Trusted by" delay={0.4} /> <br />
            <span className="text-muted-foreground font-light italic tracking-tight">Leaders.</span>
          </h2>
        </FadeIn>

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {clients.map((client) => {
            const faviconUrl = getFaviconUrl(client.url);
            return (
              <StaggerItem key={client.url}>
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-5 p-5 px-7 rounded-[2rem] bg-white border border-border hover:border-primary/20 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden border border-border group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={faviconUrl}
                    alt={`${client.name} favicon`}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {client.name}
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                    Verified Partner
                  </span>
                </div>
                <ExternalLink className="absolute top-4 right-4 w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </a>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default ClientsSection;
