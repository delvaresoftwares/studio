import { FOUNDER_DATA } from './constants';
import type { IconName } from './icons';

export type Tone = 'primary' | 'emerald' | 'violet' | 'amber';

/* -------------------------------------------------------------------------- */
/*                                   Hero                                     */
/* -------------------------------------------------------------------------- */

export type Skill = {
    title: string;
    sub: string;
};

export const SKILLS: Skill[] = [
    { title: 'Flutter', sub: 'Android, iOS, Web' },
    { title: 'React framework', sub: 'Next.js, Vite.js, Gatsby' },
    { title: 'Backend', sub: 'Express, Supabase, SQL' },
    { title: 'Security', sub: 'Exploitation & Defense' },
    { title: 'Automation', sub: 'Workflow automation' },
    { title: 'AI & Machine Learning', sub: 'Intelligent Systems' },
];

type SocialBase = {
    label: string;
    href: string;
    external: boolean;
    hoverClassName: string;
};

export type Social =
    | (SocialBase & { icon: 'github' | 'linkedin' })
    | (SocialBase & { icon: 'image'; image: string; imageAlt: string });

export const SOCIALS: Social[] = [
    {
        label: 'GitHub',
        href: FOUNDER_DATA.socials.github,
        external: true,
        hoverClassName: 'hover:bg-primary hover:border-primary',
        icon: 'github',
    },
    {
        label: 'LinkedIn',
        href: FOUNDER_DATA.socials.linkedin,
        external: true,
        hoverClassName: 'hover:bg-blue-600 hover:border-blue-600',
        icon: 'linkedin',
    },
    {
        label: 'Visit Delvare',
        href: '/',
        external: false,
        hoverClassName: 'hover:bg-primary hover:border-primary',
        icon: 'image',
        image: '/assets/arrow-transparent.png',
        imageAlt: 'Delvare',
    },
];

/* -------------------------------------------------------------------------- */
/*                                  Metrics                                   */
/* -------------------------------------------------------------------------- */

export type MetricMedia = 'commit' | 'clients' | 'org';

export type Metric = {
    icon: IconName;
    title: string;
    body: string;
    media: MetricMedia;
    /** Some cards place their copy after the visual instead of before it. */
    bodyAfterMedia?: boolean;
};

export const METRICS: Metric[] = [
    {
        icon: 'Code2',
        title: 'Software Engineering',
        body: 'Experienced building diverse frameworks. Experienced with Vite.js, Next.js, Gatsby & Flutter.',
        media: 'commit',
    },
    {
        icon: 'TrendingUp',
        title: 'Networking',
        body: 'Years of experience in Client-Relation, Sales and Decision Making. I have been a part of multiple startups.',
        media: 'clients',
    },
    {
        icon: 'Award',
        title: 'Founder & CEO',
        body: 'As Founder & CEO, I manage end-to-end operations of development procedures along with business executive operations — from strategic planning to hands-on development.',
        media: 'org',
        bodyAfterMedia: true,
    },
];

export const CLIENTS = [
    'laynered.com',
    'Masdaralriyadh.com',
    'Dvenue.space',
    'Blendly.sbs',
    'ECBills.in',
];

/* -------------------------------------------------------------------------- */
/*                                 Spotlights                                 */
/* -------------------------------------------------------------------------- */

const SPOTLIGHT_CTA =
    'h-16 px-10 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-[11px] transition-all duration-500';

const BOOK_CTA =
    'h-14 px-8 rounded-2xl text-black font-black uppercase tracking-widest text-[10px] transition-all duration-500';

export type SpotlightCta = {
    label: string;
    href: string;
    icon: 'arrow' | 'external';
    className: string;
};

export type Spotlight = {
    id: string;
    eyebrow: string;
    tone: Tone;
    title: string;
    accent: string;
    accentClassName: string;
    body: string;
    ctas: SpotlightCta[];
};

export const SPOTLIGHTS: Spotlight[] = [
    {
        id: 'ecbills',
        eyebrow: 'Intelligent & Rapid Billing System',
        tone: 'emerald',
        title: 'Founder',
        accent: 'ECBills.in',
        accentClassName: 'from-emerald-400 to-cyan-400',
        body: 'Beyond client services, I am actively building proprietary platforms. ECBills.in is our flagship PaaS — designed for infinite retail scale, precision inventory tracking, and high-availability operations.',
        ctas: [
            {
                label: 'View Live Platform',
                href: 'https://ecbills.in',
                icon: 'arrow',
                className: SPOTLIGHT_CTA,
            },
        ],
    },
    {
        id: 'blendly',
        eyebrow: 'Social network for Literature Lovers',
        tone: 'violet',
        title: 'Founder',
        accent: 'Blendly.sbs',
        accentClassName: 'from-violet-400 to-pink-400',
        body: 'Blendly is a community-driven platform to lend books nearby and read poetry online. Connecting readers, fostering sharing, and building a culture of knowledge exchange.',
        ctas: [
            {
                label: 'Visit Blendly',
                href: 'https://blendly.sbs',
                icon: 'arrow',
                className: SPOTLIGHT_CTA,
            },
        ],
    },
    {
        id: 'nature-of-the-divine',
        eyebrow: 'Author (Philosophy & Spirituality)',
        tone: 'amber',
        title: 'Nature of the',
        accent: 'Divine.',
        accentClassName: 'from-amber-400 to-orange-400',
        body: "Non-Fiction on the Simple solution for humanity's complex struggles. The secret key, the divine code, the ultimate-truth. Nature of the Divine helps readers unlick the hidden understandings about a world created by God, the real world.",
        ctas: [
            {
                label: 'Amazon',
                href: 'https://www.amazon.in/Nature-Divine-spiritual-awakening-development/dp/9334306513',
                icon: 'external',
                className: `${BOOK_CTA} bg-[#FF9900] hover:bg-[#FF9900]/90`,
            },
            {
                label: 'Flipkart',
                href: 'https://www.flipkart.com/nature-divine-align/p/itm2433ecc20ab88',
                icon: 'external',
                className: `${BOOK_CTA} bg-[#2874F0] text-white hover:bg-[#2874F0]/90`,
            },
            {
                label: 'Website',
                href: 'https://www.natureofthedivine.com',
                icon: 'external',
                className: `${BOOK_CTA} bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black`,
            },
        ],
    },
];
