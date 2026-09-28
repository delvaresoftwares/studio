'use client';

import { Badge } from '@/components/ui/badge';
import { FadeIn, TypingText } from '@/components/ui/motion';

type Client = { name: string; url: string; logo?: string };

const allClients: Client[] = [
  { name: 'EC Bills', url: 'https://ecbills.in', logo: '/assets/clients/ecbills-logo.webp' },
  { name: 'Blendly.sbs', url: 'https://blendly.sbs', logo: '/assets/clients/blendly.webp' },
  { name: 'Dvenue', url: 'https://dvenue.space', logo: '/assets/clients/dvenue-logo.webp' },
  { name: 'Dvenue Bublnet', url: 'https://dvenue.bublnet.in', logo: '/assets/clients/dvenue-logo.webp' },
  { name: 'Masdar Al Riyadh', url: 'https://masdaralriyadh.com', logo: '/assets/clients/masdar.webp' },
  { name: 'Laynered', url: 'https://laynered.com', logo: '/assets/clients/laynered-logo.webp' },
  { name: 'Spectra School', url: 'https://spectraschool.in', logo: '/assets/clients/spectra.webp' },
  { name: 'Delvare', url: 'https://delvare.in', logo: '/assets/logo.png' },
  { name: 'Nature of the Divine', url: 'https://natureofthedivine.com', logo: '/assets/clients/natureofdivine.webp' },
  { name: 'Alien Hills', url: 'https://alienhills.shop' },
  { name: 'RiZa Hijabs', url: 'https://rizahijabs.com', logo: '/assets/clients/riza-logo.webp' },
  { name: 'Pacha Mobiles', url: '' },
  { name: 'Zufo', url: '' },
];

const domainOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

const LogoChip = ({ name, logo }: { name: string; logo?: string }) =>
  logo ? (
    <img
      src={logo}
      alt=""
      loading="lazy"
      decoding="async"
      className="h-9 w-9 shrink-0 rounded-lg border border-border/60 bg-white object-contain p-0.5"
    />
  ) : (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-secondary text-sm font-black text-primary">
      {name.charAt(0).toUpperCase()}
    </span>
  );

const ClientBadge = ({ name, url, logo }: Client) => {
  const pill =
    'inline-flex h-full w-full items-center rounded-2xl border border-border/70 bg-white py-3 pl-3 pr-5';
  const domain = url ? domainOf(url) : '';

  const content = (
    <span className="flex w-full min-w-0 items-center gap-3 text-left">
      <LogoChip name={name} logo={logo} />
      <span className="flex min-w-0 flex-col leading-snug">
        <span className="truncate text-sm font-black tracking-tight text-foreground">{name}</span>
        {domain && (
          <span className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/60">
            {domain}
          </span>
        )}
      </span>
    </span>
  );

  if (!url) {
    return <span className={`${pill} cursor-default`}>{content}</span>;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} — ${domain}`}
      className={`${pill} transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10`}
    >
      {content}
    </a>
  );
};

const ClientsSection = () => {
  const total = allClients.length;

  return (
    <section id="clients" className="w-full relative py-24 md:py-32 overflow-hidden bg-[#fafafa]">
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/[0.07] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-[400px] h-[300px] bg-primary/[0.05] blur-[110px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <FadeIn delay={0.1} className="mb-12 md:mb-14">
          <Badge variant="outline" className="mb-5 border-primary/20 py-1.5 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-primary/70 bg-primary/5">
            {total} Trusted Partners
          </Badge>
          <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-none mb-4">
            <TypingText text="Our Trusted" delay={0.3} />{' '}
            <span className="text-primary/60 font-light italic tracking-tight">Partners</span>
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
            {total} trusted clients &amp; partners &mdash; our own platforms and the websites we design, build, run and grow for clients worldwide.
          </p>
        </FadeIn>

        <FadeIn
          delay={0.2}
          className="mx-auto grid w-full max-w-4xl grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {allClients.map((client) => (
            <ClientBadge key={client.name} {...client} />
          ))}
        </FadeIn>
      </div>
    </section>
  );
};

export default ClientsSection;