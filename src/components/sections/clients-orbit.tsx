'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { FadeIn, TypingText } from '@/components/ui/motion';
import { clients, domainOf, type Client } from '@/lib/clients';
import { cn } from '@/lib/utils';

/**
 * Rings, innermost first. Radii, durations and track sizes live in globals.css
 * under `.client-orbit[data-ring='…']` so they can be tightened on narrow
 * viewports, where the stage has less slack for cards riding the outer track.
 *
 * Durations increase with radius so the outer ring reads as further out rather
 * than as a faster spin, and the middle ring runs retrograde for the surreal
 * offset.
 */
const ORBITS = [
    { duration: '28s', reverse: false, share: 4, stagger: 0 },
    { duration: '42s', reverse: true, share: 5, stagger: 0.1 },
    { duration: '56s', reverse: false, share: 4, stagger: 0.2 },
] as const;

const PlanetCard = ({ name, url, logo, plate, label }: Client) => {
    const subline = label || domainOf(url);

    const body = (
        <>
            <span
                className={cn(
                    'flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg',
                    'border border-border/60 bg-white p-0.5 shadow-sm',
                    plate
                )}
            >
                {logo ? (
                    <Image src={logo} alt="" fill sizes="(min-width: 640px) 36px, 32px" className="object-contain" />
                ) : (
                    <span className="text-[10px] font-black text-primary">{name.charAt(0).toUpperCase()}</span>
                )}
            </span>
            <span className="flex min-w-0 flex-col leading-none">
                <span className="truncate font-headline text-[10px] font-black uppercase italic tracking-tighter text-foreground sm:text-[11px]">
                    {name}
                </span>
                <span className="mt-0.5 hidden truncate text-[7px] font-black uppercase tracking-[0.12em] text-muted-foreground/70 sm:block">
                    {subline}
                </span>
            </span>
        </>
    );

    const shell = cn(
        'flex w-max max-w-[7rem] items-center gap-1.5 rounded-lg border border-border/70 bg-white/95',
        'px-1.5 py-1 shadow-sm backdrop-blur-sm transition-all duration-300 sm:max-w-[8.75rem]',
        url && 'hover:-translate-y-1 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10'
    );

    if (!url) {
        return <span className={shell}>{body}</span>;
    }

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${name} — ${subline}`} className={shell}>
            {body}
        </a>
    );
};

const ClientsOrbit = () => {
    const total = clients.length;

    // Deal the clients across the rings by the shares above, then spread each
    // ring evenly with a per-ring stagger so the planets never line up radially.
    const placed: {
        client: Client;
        ring: number;
        phase: number;
    }[] = [];

    let cursor = 0;
    for (let ring = 0; ring < ORBITS.length; ring++) {
        const orbit = ORBITS[ring];
        const count = Math.min(orbit.share, total - cursor);
        for (let i = 0; i < count; i++) {
            const phase = (orbit.stagger + i / count) % 1;
            placed.push({ client: clients[cursor], ring, phase });
            cursor++;
        }
    }

    return (
        <section id="clients" className="relative w-full overflow-hidden bg-gradient-to-b from-white via-white to-[#fafafa] py-16 lg:py-24">
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.35] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />
            <div aria-hidden className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[130px] pointer-events-none" />

            {/* Title block sits above the stage so it stays readable across
                every breakpoint instead of living inside the orbital centre. */}
            <FadeIn delay={0.05} className="container relative z-20 mx-auto mb-10 max-w-2xl px-4 text-center md:mb-14">
                <Badge
                    variant="outline"
                    className="mb-4 border-primary/20 bg-primary/5 px-5 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-primary/70"
                >
                    {total} Trusted Partners
                </Badge>
                <h2 className="font-headline text-3xl font-black leading-none tracking-tighter sm:text-4xl md:text-5xl">
                    <TypingText text="Trusted" delay={0.2} as="span" />{' '}
                    <span className="font-light italic tracking-tight text-primary/60">Clients.</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-relaxed text-muted-foreground sm:text-base">
                    Our own platforms and the websites we design, build, run and grow for clients worldwide.
                </p>
            </FadeIn>

            <div className="container relative z-10 mx-auto px-4">
                <div className="client-orbit-stage max-w-[20rem] sm:max-w-[30rem] lg:max-w-[42rem]">
                    {/* Orbit tracks */}
                    {ORBITS.map((_, i) => (
                        <div
                            key={i}
                            aria-hidden
                            data-ring={i + 1}
                            className="client-orbit-ring"
                            style={{ opacity: 0.75 - i * 0.15 }}
                        />
                    ))}

                    {/* Centre: the brief and the count, ringed like a star. Sits above every orbit
                        so planets pass behind the copy rather than over it. */}
                    <div className="absolute left-1/2 top-1/2 z-40 w-[52%] max-w-[17rem] -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="rounded-full border border-primary/20 bg-white/90 px-3 py-4 shadow-[0_0_60px_-18px_rgba(16,185,129,0.55)] backdrop-blur-md sm:px-6 sm:py-6">
                            <p className="font-headline text-[9px] font-black uppercase tracking-[0.28em] text-primary sm:text-[11px]">
                                Our Orbit
                            </p>
                            <p className="mt-1.5 font-headline text-xl font-black leading-none tracking-tighter text-foreground sm:text-3xl">
                                {total}
                                <span className="ml-1 text-xs font-light italic text-muted-foreground sm:text-base">
                                    brands
                                </span>
                            </p>
                            <p className="mt-1.5 text-[8px] font-bold uppercase leading-relaxed tracking-[0.12em] text-muted-foreground sm:mt-2 sm:text-[10px] sm:tracking-[0.15em]">
                                Designed · Built · Run · Grown
                            </p>
                        </div>
                    </div>

                    {/* Planets */}
                    {placed.map(({ client, ring, phase }) => (
                        <div
                            key={client.name}
                            data-ring={ring + 1}
                            data-reverse={ORBITS[ring].reverse || undefined}
                            className="client-planet client-orbit"
                            style={{ '--phase': phase } as React.CSSProperties}
                        >
                            <PlanetCard {...client} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientsOrbit;