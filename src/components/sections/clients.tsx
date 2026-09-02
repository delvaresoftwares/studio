'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FadeIn, TypingText } from '@/components/ui/motion';

type ShowcaseClient = {
  name: string;
  url: string;
  domain: string;
  eyebrow: string;
  tagline: string;
  logo?: string;
  bg?: string;
  gradient: string;
};

const ROTATE_MS = 2000;

const showcaseClients: ShowcaseClient[] = [
  {
    name: 'EC Bills',
    url: 'https://ecbills.in',
    domain: 'ecbills.in',
    eyebrow: 'SaaS · Billing Suite',
    tagline: 'Modern inventory management & billing for businesses of all sizes.',
    logo: '/assets/clients/ecbills-logo.png',
    bg: '/assets/clients/ecbills-bg.png',
    gradient: 'from-emerald-400 via-teal-600 to-slate-950',
  },
  {
    name: 'Blendly',
    url: 'https://blendly.sbs',
    domain: 'blendly.sbs',
    eyebrow: 'Web App · Books',
    tagline: 'Lend books nearby & read poetry online.',
    logo: '/assets/clients/blendly.png',
    gradient: 'from-amber-300 via-rose-500 to-purple-950',
  },
  {
    name: 'Dvenue',
    url: 'https://dvenue.space',
    domain: 'dvenue.space',
    eyebrow: 'Marketplace · Venues',
    tagline: 'Last-minute booking for curated high-end venues & luxury banquet halls.',
    logo: '/assets/clients/dvenue-logo.png',
    bg: '/assets/clients/dvenue-bg.png',
    gradient: 'from-violet-400 via-fuchsia-600 to-indigo-950',
  },
  {
    name: 'Masdar Al Riyadh',
    url: 'https://masdaralriyadh.com',
    domain: 'masdaralriyadh.com',
    eyebrow: 'Commerce · Furniture',
    tagline: 'Premium home & office furniture outlet — balanced environments for balanced lives.',
    logo: '/assets/clients/masdar.png',
    gradient: 'from-amber-400 via-orange-600 to-stone-950',
  },
  {
    name: 'Laynered',
    url: 'https://laynered.com',
    domain: 'laynered.com',
    eyebrow: 'Store · Apparel',
    tagline: 'Premium T-shirts & apparel — trendy, comfortable, affordable for all styles.',
    logo: '/assets/clients/laynered-logo.png',
    bg: '/assets/clients/laynered.png',
    gradient: 'from-rose-400 via-red-600 to-zinc-950',
  },
  {
    name: 'Spectra School',
    url: 'https://spectraschool.in',
    domain: 'spectraschool.in',
    eyebrow: 'Academy · Design',
    tagline: 'Create. Communicate. Inspire — premier interior, graphic & digital academy.',
    logo: '/assets/clients/spectra.png',
    bg: '/assets/clients/spectra-bg.png',
    gradient: 'from-sky-400 via-indigo-600 to-slate-950',
  },
  {
    name: 'Nature of the Divine',
    url: 'https://natureofthedivine.com',
    domain: 'natureofthedivine.com',
    eyebrow: 'Publishing · Spirituality',
    tagline: 'The science of transcendence — peak consciousness & divine intelligence.',
    logo: '/assets/clients/natureofdivine.png',
    gradient: 'from-indigo-400 via-violet-700 to-black',
  },
  {
    name: 'Alien Hills',
    url: 'https://alienhills.shop',
    domain: 'alienhills.shop',
    eyebrow: 'Shop · Curated Goods',
    tagline: 'Otherworldly drops & curated finds from beyond the hills.',
    bg: '/assets/clients/alienhill-bg.png',
    gradient: 'from-lime-400 via-emerald-600 to-gray-950',
  },
];

const allClients = [
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

const firstLetterOf = (name: string) => name.charAt(0).toUpperCase();

const LogoChip = ({ client }: { client: ShowcaseClient }) =>
  client.logo ? (
    <img
      src={client.logo}
      alt=""
      loading="lazy"
      className="relative z-10 h-full w-full object-cover drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)]"
    />
  ) : (
    <div className={`absolute inset-0 bg-gradient-to-br ${client.gradient}`} />
  );

const ClientCard = ({ client, index }: { client: ShowcaseClient; index: number }) => {
  const tiltRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = 'transform 120ms ease-out';
    el.style.transform = `perspective(1000px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg) translateY(-4px) scale(1.008)`;
  };

  const handleLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transition = 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.transform = '';
  };

  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${client.name} — ${client.tagline}`}
      className="group relative block w-full select-none focus-visible:outline-none"
    >
      <div
        className={`absolute -inset-4 rounded-[3rem] bg-gradient-to-br ${client.gradient} opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-35`}
      />

      <div
        ref={tiltRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-[2rem] border border-white/15 bg-black shadow-[0_40px_80px_-32px_rgba(0,0,0,0.5)]"
      >
        {client.bg ? (
          <img
            src={client.bg}
            alt=""
            loading={index < 3 ? 'eager' : 'lazy'}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${client.gradient}`}>
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '26px 26px',
              }}
            />
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-black/30 blur-3xl" />
          </div>
        )}

        <span className="pointer-events-none absolute -bottom-8 -right-3 select-none font-headline text-[11rem] font-black leading-none text-white/[0.07]">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/70" />

        <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/10 opacity-0 transition-all duration-1000 ease-out group-hover:left-[130%] group-hover:opacity-100" />

        <span className="absolute left-5 top-5 flex items-center gap-2">
          <span className="rounded-full border border-white/15 bg-black/35 px-3.5 py-1.5 text-[9px] font-black tracking-[0.28em] text-white/75 backdrop-blur-md">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="rounded-full border border-primary/40 bg-primary/20 px-3.5 py-1.5 text-[8px] font-black uppercase tracking-[0.22em] text-primary backdrop-blur-md">
            Developed by Delvare
          </span>
        </span>
        <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
          <ExternalLink className="h-3.5 w-3.5 text-white" />
        </span>

        <div className="absolute inset-x-4 bottom-4 rounded-[1.4rem] border border-white/15 bg-white/[0.09] p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.25),transparent_72%)]" />
              <LogoChip client={client} />
            </div>
            <div className="min-w-0">
              <h3 className="truncate font-headline text-sm font-black tracking-tight text-white">{client.name}</h3>
              <p className="mt-0.5 truncate text-[8.5px] font-black uppercase tracking-[0.22em] text-primary/90">
                {client.eyebrow}
              </p>
            </div>
          </div>
          <p className="mt-3 min-h-[2.2rem] text-xs font-medium leading-snug text-white/80 line-clamp-2">
            {client.tagline}
          </p>
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-2.5">
            <span className="truncate text-[9px] font-bold tracking-wider text-white/40">{client.domain}</span>
            <span className="inline-flex shrink-0 items-center gap-1 text-[9px] font-black uppercase tracking-[0.22em] text-white/75 transition-colors duration-300 group-hover:text-primary">
              Visit
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

const ClientWideCard = ({ client, index }: { client: ShowcaseClient; index: number }) => (
  <a
    href={client.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${client.name} — ${client.tagline}`}
    className="group relative block h-44 w-[300px] shrink-0 snap-center overflow-hidden rounded-[1.75rem] bg-black shadow-xl ring-1 ring-black/10 transition-transform duration-300 active:scale-[0.98]"
  >
    {client.bg ? (
      <img src={client.bg} alt="" loading={index < 3 ? 'eager' : 'lazy'} className="absolute inset-0 h-full w-full object-cover" />
    ) : (
      <div className={`absolute inset-0 bg-gradient-to-br ${client.gradient}`} />
    )}
    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/15" />
    <span className="pointer-events-none absolute -bottom-3 -right-1 select-none font-headline text-7xl font-black leading-none text-white/10">
      {String(index + 1).padStart(2, '0')}
    </span>

    <div className="relative flex h-full flex-col justify-between p-4 pr-24">
      <span className="flex items-center gap-2">
        <span className="w-fit rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[8px] font-black uppercase tracking-[0.24em] text-primary/90 backdrop-blur-md">
          {client.eyebrow}
        </span>
        <span className="w-fit rounded-full border border-primary/40 bg-primary/20 px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.2em] text-primary backdrop-blur-md">
          By Delvare
        </span>
      </span>
      <div>
        <h3 className="font-headline text-lg font-black leading-tight tracking-tight text-white">{client.name}</h3>
        <p className="mt-1 text-[11px] font-medium leading-snug text-white/70 line-clamp-2">{client.tagline}</p>
        <p className="mt-2 inline-flex items-center gap-1 text-[9px] font-bold tracking-wider text-white/45">
          {client.domain}
          <ArrowUpRight className="h-2.5 w-2.5 text-primary" />
        </p>
      </div>
    </div>

    <div className="absolute right-3 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.25),transparent_70%)]" />
      <div className="grid h-full w-full place-items-center">
        <LogoChip client={client} />
      </div>
    </div>
  </a>
);

const ClientsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [paused, setPaused] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const onSelect = useCallback(() => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || paused) return;
    const id = window.setInterval(() => emblaApi.scrollNext(), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [emblaApi, paused]);

  return (
    <section id="clients" className="w-full relative py-24 md:py-32 overflow-hidden bg-[#fafafa]">
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/[0.07] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-[400px] h-[300px] bg-primary/[0.05] blur-[110px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <FadeIn delay={0.1} className="mb-14 md:mb-16">
          <Badge variant="outline" className="mb-5 border-primary/20 py-1.5 px-5 text-[10px] font-black tracking-[0.3em] uppercase text-primary/70 bg-primary/5">
            Developed by Delvare
          </Badge>
          <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-none mb-4">
            <TypingText text="Developed by" delay={0.3} />{' '}
            <br />
            <span className="text-primary/60 font-light italic tracking-tight">Delvare.</span>
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
            Our own platforms and the websites we build, run and grow for international clients &mdash; every product here was designed, developed and managed by Delvare.
          </p>
        </FadeIn>

        {/* Mobile: compact wide card scroller */}
        <FadeIn delay={0.15} className="md:hidden">
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {showcaseClients.map((client, idx) => (
              <ClientWideCard key={client.domain} client={client} index={idx} />
            ))}
          </div>
          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
            Swipe to explore
          </p>
        </FadeIn>

        {/* Desktop: auto-rotating 3-up carousel */}
        <FadeIn delay={0.15} className="hidden md:block max-w-7xl mx-auto">
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onPointerDown={() => setPaused(true)}
            onPointerUp={() => setPaused(false)}
          >
            <div className="relative">
              <div className="overflow-hidden py-4" ref={emblaRef}>
                <div className="flex gap-6">
                  {showcaseClients.map((client, idx) => (
                    <div key={client.domain} className="min-w-0 shrink-0 grow-0 basis-1/2 lg:basis-1/3">
                      <ClientCard client={client} index={idx} />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                aria-label="Previous client"
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-white/95 text-foreground shadow-xl backdrop-blur transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next client"
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-white/95 text-foreground shadow-xl backdrop-blur transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
              {showcaseClients.map((client, idx) => (
                <button
                  key={client.domain}
                  type="button"
                  aria-label={`Go to ${client.name}`}
                  onClick={() => emblaApi?.scrollTo(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === selectedIndex
                      ? 'w-7 bg-primary'
                      : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Live marquee strip */}
        <FadeIn delay={0.3} className="mt-14 md:mt-16 relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-4 py-1">
            {[...allClients, ...allClients].map((client, i) => (
              <a
                key={`${client.url}-${i}`}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={i >= allClients.length}
                tabIndex={i >= allClients.length ? -1 : undefined}
                className="flex items-center gap-3 pl-4 pr-7 py-3 rounded-full bg-white border border-border/60 whitespace-nowrap hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="w-8 h-8 rounded-full bg-secondary border border-border/60 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src={getFaviconUrl(client.url)} alt="" aria-hidden loading="lazy" className="w-5 h-5 object-contain" />
                </span>
                <span className="text-xs font-black tracking-tight text-foreground">{client.name}</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">
                  {new URL(client.url).hostname.replace(/^www\./, '')}
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
