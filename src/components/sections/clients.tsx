'use client';

import { Badge } from '@/components/ui/badge';
import { FadeIn, TypingText } from '@/components/ui/motion';
import { clientBrands, clients, domainOf, type Client } from '@/lib/clients';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowUpRight, BadgeCheck, Sparkles } from 'lucide-react';

const isOwnPlatform = (client: Client) => client.relationship === 'own';

const sublineOf = (client: Client) => client.label || domainOf(client.url) || 'Delvare client';

/** Full label used for accessible names and desktop cards. */
const partnerLabel = (client: Client) =>
    isOwnPlatform(client) ? 'Built & run by Delvare' : 'Delvare technology partner';

/** Compact label so two-column mobile cards never overflow. */
const compactPartnerLabel = (client: Client) => (isOwnPlatform(client) ? 'Built by Delvare' : 'Delvare partner');

const ariaLabelOf = (client: Client) =>
    `${client.name} — ${partnerLabel(client)}${client.url ? ' (opens in a new tab)' : ''}`;

const joinNames = (names: string[]) =>
    names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names[0] ?? '';

const LogoPlate = ({ client, size }: { client: Client; size: string }) => (
    <span
        className={cn(
            'flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-white',
            size
        )}
    >
        {client.logo ? (
            <img
                src={client.logo}
                alt={`${client.name} logo`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain p-1.5 transition-transform duration-500 ease-out group-hover:scale-105"
            />
        ) : (
            <span className="font-headline text-lg font-black text-primary" aria-hidden>
                {client.name.charAt(0).toUpperCase()}
            </span>
        )}
    </span>
);

const ClientCard = ({ client, index }: { client: Client; index: number }) => {
    const { name, url } = client;

    const body = (
        <>
            <span
                className="pointer-events-none absolute right-2.5 top-1.5 select-none font-headline text-2xl font-black leading-none tracking-tighter text-foreground/[0.04] md:text-3xl"
                aria-hidden
            >
                {String(index + 1).padStart(2, '0')}
            </span>

            <span className="relative">
                <LogoPlate client={client} size="h-12 w-12 md:h-14 md:w-14" />
            </span>

            <span className="relative mt-4 flex min-w-0 flex-col">
                <span className="break-words font-headline text-[13px] font-black uppercase italic leading-tight tracking-tight text-foreground md:text-[15px]">
                    {name}
                </span>
                <span className="mt-1 truncate text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground/70">
                    {sublineOf(client)}
                </span>
            </span>

            <span className="relative mt-auto flex items-center justify-between gap-2 pt-4">
                <span
                    className={cn(
                        'inline-flex w-fit max-w-full items-center gap-1 rounded-full px-2 py-1 text-[8px] font-black uppercase leading-none tracking-[0.1em] md:text-[8.5px]',
                        isOwnPlatform(client) ? 'bg-primary/5 text-primary/70' : 'bg-primary/10 text-primary'
                    )}
                >
                    {isOwnPlatform(client) ? (
                        <Sparkles className="h-2.5 w-2.5 shrink-0" aria-hidden />
                    ) : (
                        <BadgeCheck className="h-2.5 w-2.5 shrink-0" aria-hidden />
                    )}
                    <span className="truncate">{compactPartnerLabel(client)}</span>
                </span>
                {url && (
                    <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-muted-foreground/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden
                    />
                )}
            </span>
        </>
    );

    const shell = cn(
        'group relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 md:p-5',
        'hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
    );

    if (!url) {
        return <span className={shell}>{body}</span>;
    }

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabelOf(client)}
            className={shell}
        >
            {body}
        </a>
    );
};

const ClientsSection = () => {
    const brandNames = joinNames(clientBrands.map((client) => client.name));
    const delvare = clients.find((client) => client.name === 'Delvare') ?? clients[0];

    return (
        <section
            id="clients"
            aria-labelledby="clients-heading"
            className="relative w-full scroll-mt-24 overflow-hidden bg-gradient-to-b from-white via-white to-[#fafafa] py-16 lg:py-20"
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                    backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />
            <div className="pointer-events-none absolute -top-20 left-1/2 h-[280px] w-[560px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[120px]" />

            <div className="container relative z-10 mx-auto px-4">
                <FadeIn delay={0.1} className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
                    <Badge
                        variant="outline"
                        className="mb-4 border-primary/20 bg-primary/5 px-5 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-primary/70"
                    >
                        {clientBrands.length} Brands · One Technology Partner
                    </Badge>
                    <h2
                        id="clients-heading"
                        className="font-headline text-3xl font-black leading-none tracking-tighter sm:text-4xl md:text-5xl"
                    >
                        <TypingText text="Trusted" delay={0.25} as="span" />{' '}
                        <span className="font-light italic tracking-tight text-primary/60">Clients.</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-relaxed text-muted-foreground sm:text-base">
                        Delvare is the technology partner behind these brands — we design, build, run and grow the
                        platforms and websites they rely on.
                    </p>
                </FadeIn>

                <FadeIn delay={0.15}>
                    <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
                        {clientBrands.map((client, index) => (
                            <li key={client.name} className="flex min-w-0">
                                <ClientCard client={client} index={index} />
                            </li>
                        ))}
                    </ul>
                </FadeIn>

                {/* Delvare sits outside the wall as the single partner behind it */}
                <FadeIn delay={0.2} className="mt-5 md:mt-6">
                    <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/15 bg-gradient-to-br from-primary/[0.07] via-white to-amber-500/[0.04] p-5 shadow-sm sm:p-7 md:p-8">
                        <span
                            className="pointer-events-none absolute -right-3 -top-6 select-none font-headline text-8xl font-black leading-none text-primary/[0.045] md:text-9xl"
                            aria-hidden
                        >
                            TP
                        </span>

                        <div className="relative flex flex-col items-center gap-5 text-center md:flex-row md:justify-between md:gap-8 md:text-left">
                            <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
                                <LogoPlate client={delvare} size="h-14 w-14 md:h-16 md:w-16" />
                                <div className="min-w-0">
                                    <p className="text-[9px] font-black uppercase tracking-[0.24em] text-primary/70">
                                        The technology partner
                                    </p>
                                    <h3 className="mt-1 font-headline text-lg font-black uppercase italic leading-none tracking-tighter text-foreground sm:text-xl">
                                        One partner behind every brand.
                                    </h3>
                                    <p className="mx-auto mt-2 max-w-2xl text-[11px] font-medium leading-relaxed text-muted-foreground sm:text-xs md:mx-0">
                                        Delvare is the technology partner of {brandNames}. We design, develop, host and
                                        maintain their digital products end to end.
                                    </p>
                                </div>
                            </div>

                            <a
                                href="#contact"
                                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.18em] text-primary transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            >
                                Become our next client
                                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                            </a>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default ClientsSection;
