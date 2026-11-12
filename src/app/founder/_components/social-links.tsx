import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SOCIALS } from '../content';

const BUTTON_CLASSES = 'h-16 w-16 rounded-2xl border-white/10 bg-white/5 text-white transition-all';

/** Founder social links, driven by `SOCIALS` so the markup lives in one place. */
export default function SocialLinks() {
    return (
        <div className="flex gap-3">
            {SOCIALS.map((social) => {
                const externalProps = social.external
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {};

                return (
                    <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="group"
                        {...externalProps}
                    >
                        <Button
                            variant="outline"
                            size="icon"
                            className={cn(
                                BUTTON_CLASSES,
                                social.hoverClassName,
                                social.icon === 'image' && 'relative p-3.5'
                            )}
                        >
                            {social.icon === 'github' && <Github className="w-6 h-6" />}
                            {social.icon === 'linkedin' && <Linkedin className="w-6 h-6" />}
                            {social.icon === 'image' && (
                                <Image
                                    src={social.image}
                                    alt={social.imageAlt}
                                    fill
                                    sizes="36px"
                                    className="object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-all"
                                />
                            )}
                        </Button>
                    </a>
                );
            })}
        </div>
    );
}
