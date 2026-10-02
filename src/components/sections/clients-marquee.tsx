'use client';

import { Badge } from '@/components/ui/badge';
import { FadeIn, TypingText } from '@/components/ui/motion';
import { clients, domainOf, type Client } from '@/lib/clients';
import { cn } from '@/lib/utils';

const LogoPlate = ({ name, logo, plate }: Pick<Client, 'name' | 'logo' | 'plate'>) => (
    <span
        className={cn(
            'flex h-12 w-auto shrink-0 items-center justify-center overflow-hidden rounded-xl',
            'border border-border/60 bg-white p-1 shadow-sm',
            plate
        )}
    >
        {logo ? (
            <img src={logo} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain" />
        ) : (
            <span className="text-sm font-black text-primary">{name.charAt(0).toUpperCase()}</span>
        )}
    </span>
);

const ClientCard = ({ name, url, logo, plate, label }: Client) => {
    const subline = label || domainOf(url);

    const body = (
        <>
            <LogoPlate name={name} logo={logo} plate={plate} />
            <span className="flex min-w-0 flex-col leading-none">
                <span className="whitespace-nowrap font-headline text-[15px] font-black uppercase italic tracking-tighter text-foreground sm:text-base">
                    {name}
                </span>
                <span className="mt-1 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">
                    {subline}
                </span>
            </span>
        </>
    );

    const shell = cn(
        'flex w-max min-w-[13.5rem] shrink-0 items-center gap-3 rounded-2xl border border-border/70 bg-white',
        'px-3 py-2.5 shadow-sm transition-all duration-300',
        url && 'hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10'
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

/**
 * Two counter-scrolling rectangular strips that reuse the keyword marquee's
 * movement, rendered as one evenly divided track so the duplicated copy lands
 * exactly on the seam. The clone is hidden from assistive tech.
 */
const MarqueeRow = ({ reverse = false }: { reverse?: boolean }) => {
    const copy = (clone: boolean) => (
        <div
            aria-hidden={clone || undefined}
            className={cn('flex shrink-0 items-center gap-4 pr-4', clone && 'motion-reduce:hidden')}
        >
            {clients.map((client) => (
                <ClientCard key={client.name} {...client} />
            ))}
        </div>
    );

    return (
        <div
            className={cn(
                'flex w-max motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-4',
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
            'relative rounded-[2rem] border border-border/60 bg-white/70 py-5 shadow-sm backdrop-blur-sm',
            'overflow-hidden',
            reverse ? 'rotate-[1.2deg]' : '-rotate-[1.2deg]',
            'motion-reduce:rotate-0 motion-reduce:bg-transparent motion-reduce:shadow-none'
        )}
    >
        <MarqueeRow reverse={reverse} />
    </div>
);

const ClientsMarquee = () => {
    const total = clients.length;

    return (
        <section id="clients" className="relative w-full overflow-hidden bg-gradient-to-b from-white via-white to-[#fafafa] py-16 lg:py-20">
            <div
                className="absolute inset-0 opacity-[0.35] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[280px] w-[560px] rounded-full bg-primary/[0.06] blur-[120px] pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4">
                <FadeIn delay={0.1} className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
                    <Badge
                        variant="outline"
                        className="mb-4 border-primary/20 bg-primary/5 px-5 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-primary/70"
                    >
                        {total} Trusted Partners
                    </Badge>
                    <h2 className="font-headline text-3xl font-black leading-none tracking-tighter sm:text-4xl md:text-5xl">
                        <TypingText text="Trusted" delay={0.25} as="span" />{' '}
                        <span className="font-light italic tracking-tight text-primary/60">Clients.</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-relaxed text-muted-foreground sm:text-base">
                        Our own platforms and the websites we design, build, run and grow for clients worldwide.
                    </p>
                </FadeIn>

                <div className="flex flex-col gap-5 md:gap-7">
                    <Strip />
                    <Strip reverse />
                </div>
            </div>

            {/* Editorial side fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent md:w-40" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent md:w-40" />
        </section>
    );
};

export default ClientsMarquee;
