'use client';

import { Badge } from '@/components/ui/badge';
import { FadeIn, TypingText } from '@/components/ui/motion';
import { clientBrands, clients, domainOf, type Client } from '@/lib/clients';
import { clientFaqs } from '@/lib/clients-seo';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowUpRight, BadgeCheck, ChevronDown, Sparkles } from 'lucide-react';

const isOwnPlatform = (client: Client) => client.relationship === 'own';
const isDelvare = (client: Client) => client.name === 'Delvare';

const sublineOf = (client: Client) => client.label || domainOf(client.url) || 'Delvare client';

/** Full label used on the desktop strips and for accessible names. */
const partnerLabel = (client: Client) =>
    isDelvare(client) ? 'Our studio' : isOwnPlatform(client) ? 'Built & run by Delvare' : 'Delvare technology partner';

/** Compact label so two-column mobile cards never overflow. */
const compactPartnerLabel = (client: Client) =>
    isDelvare(client) ? 'Our studio' : isOwnPlatform(client) ? 'By Delvare' : 'Delvare partner';

const ariaLabelOf = (client: Client) =>
    `${client.name} — ${partnerLabel(client)}${client.url ? ' (opens in a new tab)' : ''}`;

const joinNames = (names: string[]) =>
    names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names[0] ?? '';

const LogoPlate = ({
    client,
    size,
    decorative = false,
}: {
    client: Client;
    size: string;
    decorative?: boolean;
}) => (
    <span
        className={cn(
            'flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-white',
            size
        )}
    >
        {client.logo ? (
            <img
                src={client.logo}
                alt={decorative ? '' : `${client.name} logo`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain p-1.5"
            />
        ) : (
            <span className="font-headline text-lg font-black text-primary" aria-hidden>
                {client.name.charAt(0).toUpperCase()}
            </span>
        )}
    </span>
);

const MarqueeClientCard = ({ client, clone = false }: { client: Client; clone?: boolean }) => {
    const { name, url } = client;

    const body = (
        <>
            <LogoPlate client={client} size="h-11 w-11" decorative={clone} />
            <span className="flex min-w-0 flex-col">
                <span className="whitespace-nowrap font-headline text-[15px] font-black uppercase italic leading-none tracking-tighter text-foreground">
                    {name}
                </span>
                <span className="mt-1.5 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">
                    {sublineOf(client)}
                </span>
                <span
                    className={cn(
                        'mt-1.5 inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-[0.16em]',
                        isOwnPlatform(client) ? 'text-primary/65' : 'text-primary'
                    )}
                >
                    {isOwnPlatform(client) ? (
                        <Sparkles className="h-2.5 w-2.5" aria-hidden />
                    ) : (
                        <BadgeCheck className="h-2.5 w-2.5" aria-hidden />
                    )}
                    {partnerLabel(client)}
                </span>
            </span>
            {url && (
                <ArrowUpRight
                    className="ml-2 h-4 w-4 shrink-0 text-muted-foreground/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden
                />
            )}
        </>
    );

    const shell = cn(
        'group flex w-max min-w-[16.5rem] shrink-0 items-center gap-3 rounded-2xl border border-border/60 bg-white/90 px-3.5 py-3 shadow-[0_1px_0_rgba(15,23,42,0.03)] backdrop-blur-sm transition-all duration-300',
        'hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
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
            tabIndex={clone ? -1 : undefined}
            className={shell}
        >
            {body}
        </a>
    );
};

const GridClientCard = ({ client }: { client: Client }) => {
    const { name, url } = client;

    const body = (
        <>
            <span className="flex w-full items-start justify-between gap-2">
                <LogoPlate client={client} size="h-11 w-11" />
                {url && (
                    <ArrowUpRight
                        className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden
                    />
                )}
            </span>
            <span className="flex min-w-0 flex-col">
                <span className="break-words font-headline text-[13px] font-black uppercase italic leading-tight tracking-tight text-foreground min-[400px]:text-sm">
                    {name}
                </span>
                <span className="mt-1 truncate text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground/70">
                    {sublineOf(client)}
                </span>
            </span>
            <span
                className={cn(
                    'mt-auto inline-flex w-fit max-w-full items-center gap-1 rounded-full px-2 py-1 text-[8px] font-black uppercase leading-none tracking-[0.12em]',
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
        </>
    );

    const shell = cn(
        'group flex h-full w-full min-w-0 flex-col gap-3 rounded-2xl border border-border/60 bg-white/90 p-3.5 shadow-sm backdrop-blur-sm transition-all duration-300',
        'hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        isDelvare(client) && 'border-primary/30 bg-gradient-to-br from-primary/[0.07] via-white to-white'
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

/**
 * Two counter-scrolling strips that reuse the keyword marquee's movement.
 * The duplicate copy is hidden from assistive tech and removed from the tab
 * order, so screen-reader and keyboard users traverse each client only once.
 */
const MarqueeRow = ({ reverse = false }: { reverse?: boolean }) => {
    const copy = (clone: boolean) => (
        <ul
            aria-hidden={clone || undefined}
            className={cn(
                'flex shrink-0 items-stretch gap-4 pr-4',
                'motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0',
                clone && 'motion-reduce:hidden'
            )}
        >
            {clients.map((client) => (
                <li key={client.name} className="flex">
                    <MarqueeClientCard client={client} clone={clone} />
                </li>
            ))}
        </ul>
    );

    return (
        <div
            className={cn(
                'marquee-track flex w-max motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-4',
                reverse ? 'animate-marquee-slow-reverse' : 'animate-marquee-slow'
            )}
        >
            {copy(false)}
            {copy(true)}
        </div>
    );
};

const Strip = ({ reverse = false }: { reverse?: boolean }) => (
    <div
        className={cn(
            'marquee-frame relative overflow-hidden rounded-[2rem] border border-border/60 bg-white/70 py-5 shadow-sm backdrop-blur-sm',
            reverse ? 'rotate-[1.2deg]' : '-rotate-[1.2deg]',
            'motion-reduce:rotate-0 motion-reduce:bg-transparent motion-reduce:shadow-none'
        )}
    >
        <MarqueeRow reverse={reverse} />
    </div>
);

const ClientsMarquee = () => {
    const brandNames = joinNames(clientBrands.map((client) => client.name));

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

                {/* Mobile & tablet: a tidy two/three-column card grid */}
                <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:hidden">
                    {clients.map((client) => (
                        <li key={client.name} className="flex min-w-0">
                            <GridClientCard client={client} />
                        </li>
                    ))}
                </ul>

                {/* Desktop: two counter-scrolling strips that pause on hover/focus */}
                <div className="hidden md:flex md:flex-col md:gap-7">
                    <Strip />
                    <Strip reverse />
                </div>

                <FadeIn delay={0.2} className="mx-auto mt-10 max-w-4xl md:mt-14">
                    <div className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-white/80 px-5 py-6 text-center shadow-sm backdrop-blur-sm sm:px-8 sm:py-7">
                        <span
                            className="pointer-events-none absolute -right-4 -top-8 select-none font-headline text-8xl font-black leading-none text-primary/[0.04]"
                            aria-hidden
                        >
                            TP
                        </span>
                        <p className="relative text-[11px] font-medium leading-relaxed text-muted-foreground sm:text-sm">
                            <span className="font-black uppercase tracking-[0.18em] text-primary/70">
                                Technology partner:{' '}
                            </span>
                            Delvare is the technology partner of {brandNames}. We design, develop, host and maintain
                            their digital products end to end.
                        </p>
                        <a
                            href="#contact"
                            className="relative mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-primary transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            Become our next client
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </a>
                    </div>

                    {/* Visible counterpart of the FAQPage structured data */}
                    <details className="group mt-5 text-left">
                        <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-full border border-border/60 bg-white/70 px-4 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                            Who is the technology partner of each brand?
                            <ChevronDown
                                className="h-3.5 w-3.5 transition-transform duration-300 group-open:rotate-180"
                                aria-hidden
                            />
                        </summary>
                        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                            {clientFaqs.map((faq) => (
                                <div
                                    key={faq.question}
                                    className="rounded-xl border border-border/50 bg-white/70 p-4 backdrop-blur-sm"
                                >
                                    <dt className="font-headline text-[11px] font-black uppercase leading-snug tracking-tight text-foreground">
                                        {faq.question}
                                    </dt>
                                    <dd className="mt-1.5 text-[11px] font-medium leading-relaxed text-muted-foreground">
                                        {faq.answer}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </details>
                </FadeIn>
            </div>

            {/* Editorial side fades — desktop strips only */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-24 bg-gradient-to-r from-white to-transparent md:block md:w-40" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-24 bg-gradient-to-l from-white to-transparent md:block md:w-40" />
        </section>
    );
};

export default ClientsMarquee;
