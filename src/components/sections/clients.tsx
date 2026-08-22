'use client';

import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, TypingText } from '@/components/ui/motion';

const clients = [
  { name: 'EC Bills', url: 'https://ecbills.in' },
  { name: 'Blendly.sbs', url: 'https://blendly.sbs' },
  { name: 'Dvenue', url: 'https://dvenue.space' },
  { name: 'Dvenue Bublnet', url: 'https://dvenue.bublnet.in' },
  { name: 'Masdaralriyadh', url: 'https://masdaralriyadh.com' },
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

const getHostname = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

const ClientsSection = () => {
  return (
    <section id="clients" className="w-full relative py-24 md:py-32 overflow-hidden bg-[#fafafa]">
      {/* Decorative dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />
      {/* Ambient glows */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/[0.07] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-[400px] h-[300px] bg-primary/[0.05] blur-[110px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <FadeIn delay={0.1} className="mb-14 md:mb-16">
          <Badge variant="outline" className="mb-5 border-primary/20 py-1.5 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-primary/70 bg-primary/5">
            Our Clients
          </Badge>
          <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-none mb-4">
            <TypingText text="Delvare's Own &..." delay={0.3} />{' '}
            <br />
            <span className="text-primary/60 font-light italic tracking-tight">Third party-clients.</span>
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
            From billing platforms to literature networks &mdash; real products we build, run and grow, live for their communities every day.
          </p>
        </FadeIn>

        <StaggerContainer staggerDelay={0.06} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {clients.map((client, idx) => {
            const faviconUrl = getFaviconUrl(client.url);
            return (
              <StaggerItem key={client.url}>
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center text-center gap-3.5 p-6 pt-8 rounded-[2rem] bg-white border border-border/70 shadow-sm overflow-hidden hover:border-primary/30 hover:shadow-[0_25px_60px_-20px_rgba(16,185,129,0.25)] hover:-translate-y-1.5 transition-all duration-500"
                >
                  {/* Gradient hairline reveal */}
                  <div className="absolute top-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  {/* Index */}
                  <span className="absolute top-5 left-6 text-[9px] font-black tracking-[0.25em] text-muted-foreground/40 group-hover:text-primary/50 transition-colors duration-500">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <ExternalLink className="absolute top-5 right-6 w-3.5 h-3.5 text-muted-foreground opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500" />

                  {/* Logo tile with glow */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-[1.25rem] bg-primary/25 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-16 h-16 rounded-[1.25rem] bg-secondary border border-border overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:border-primary/30">
                      <img
                        src={faviconUrl}
                        alt={`${client.name} logo`}
                        loading="lazy"
                        className="w-9 h-9 object-contain"
                      />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-black tracking-tight text-foreground truncate group-hover:text-primary transition-colors duration-300">
                      {client.name}
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 mt-1">
                      {getHostname(client.url)}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-primary opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    Visit Site
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </a>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Live marquee strip */}
        <FadeIn delay={0.3} className="mt-14 md:mt-16 relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-4 py-1">
            {[...clients, ...clients].map((client, i) => (
              <a
                key={`${client.url}-${i}`}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={i >= clients.length}
                tabIndex={i >= clients.length ? -1 : undefined}
                className="flex items-center gap-3 pl-4 pr-7 py-3 rounded-full bg-white border border-border/60 whitespace-nowrap hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="w-8 h-8 rounded-full bg-secondary border border-border/60 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src={getFaviconUrl(client.url)} alt="" aria-hidden loading="lazy" className="w-5 h-5 object-contain" />
                </span>
                <span className="text-xs font-black tracking-tight text-foreground">{client.name}</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">
                  {getHostname(client.url)}
                </span>
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ClientsSection;
