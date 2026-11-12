import {
    Activity,
    Award,
    Code2,
    Cpu,
    Globe,
    Layout,
    ShieldCheck,
    Terminal,
    TrendingUp,
} from 'lucide-react';

/**
 * Icons used by roadmap/project content, keyed by the `logo` values stored in
 * `roadmap.ts`. `Code` is kept as an alias for older entries that use it.
 */
export const ICONS = {
    Activity,
    Award,
    Code: Code2,
    Code2,
    Cpu,
    Globe,
    Layout,
    ShieldCheck,
    Terminal,
    TrendingUp,
} as const;

export type IconName = keyof typeof ICONS;

/** Resolves a data-supplied icon name, falling back to `Award`. */
export const getIcon = (name: string) => ICONS[name as IconName] ?? Award;
