import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Tone } from '../content';

const TONE_CLASSES: Record<Tone, string> = {
    primary: 'border-primary/30 text-primary bg-primary/10',
    emerald: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    violet: 'border-violet-500/30 text-violet-400 bg-violet-500/10',
    amber: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
};

type EyebrowProps = {
    tone?: Tone;
    className?: string;
    children: ReactNode;
};

/** The small uppercase pill used above every section heading. */
export default function Eyebrow({ tone = 'primary', className, children }: EyebrowProps) {
    return (
        <Badge
            variant="outline"
            className={cn(
                'py-1.5 px-6 text-[10px] font-black tracking-[0.3em] uppercase',
                TONE_CLASSES[tone],
                className
            )}
        >
            {children}
        </Badge>
    );
}
