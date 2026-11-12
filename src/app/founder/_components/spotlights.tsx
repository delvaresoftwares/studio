import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SPOTLIGHTS, type SpotlightCta } from '../content';
import Eyebrow from './eyebrow';

function CtaButton({ cta }: { cta: SpotlightCta }) {
    return (
        <Button asChild size="xl" className={cta.className}>
            <a href={cta.href} target="_blank" rel="noopener noreferrer">
                {cta.label}
                {cta.icon === 'arrow' ? (
                    <ArrowRight className="ml-3 w-4 h-4" aria-hidden />
                ) : (
                    <ExternalLink className="ml-2 w-3.5 h-3.5" aria-hidden />
                )}
            </a>
        </Button>
    );
}

/** All project/author spotlights, driven by `SPOTLIGHTS`. */
export default function Spotlights() {
    return (
        <>
            {SPOTLIGHTS.map((spotlight) => (
                <section
                    key={spotlight.id}
                    className="py-24 relative border-b border-white/5 last:border-b-0"
                >
                    <div className="container max-w-4xl mx-auto px-4 text-center">
                        <div className="flex flex-col items-center space-y-8">
                            <Eyebrow tone={spotlight.tone}>{spotlight.eyebrow}</Eyebrow>

                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]">
                                {spotlight.title}
                                <br />
                                <span
                                    className={cn(
                                        'text-transparent bg-clip-text bg-gradient-to-r italic font-light',
                                        spotlight.accentClassName
                                    )}
                                >
                                    {spotlight.accent}
                                </span>
                            </h2>

                            <p className="text-lg text-white/50 leading-relaxed font-medium max-w-2xl mx-auto">
                                {spotlight.body}
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 pt-2">
                                {spotlight.ctas.map((cta) => (
                                    <CtaButton key={cta.href} cta={cta} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </>
    );
}
