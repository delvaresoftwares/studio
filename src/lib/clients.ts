export type Client = {
    name: string;
    url: string;
    /** Path to the brand mark inside /public/assets (mixed webp / jpeg / svg) */
    logo?: string;
    /** Sub-line shown when there is no public site to take a domain from */
    label?: string;
    /**
     * How the brand relates to Delvare. `own` marks platforms we built and run
     * ourselves; `client` (the default) marks businesses we partner with.
     */
    relationship?: 'own' | 'client';
};

/**
 * Every logo referenced here lives in /public/assets/clients.
 * The folder holds mixed formats (webp, jpeg, svg) — each entry below points
 * at the file that actually matches that brand, including the non-webp ones.
 */
export const clients: Client[] = [
    { name: 'ECBills', url: 'https://ecbills.in', logo: '/assets/clients/ecbills-logo.webp', relationship: 'own' },
    { name: 'Blendly.sbs', url: 'https://blendly.sbs', logo: '/assets/clients/blendly.webp', relationship: 'own' },
    { name: 'Dvenue', url: 'https://dvenue.space', logo: '/assets/clients/dvenue-logo.webp', relationship: 'own' },
    { name: 'Dvenue Bublnet', url: 'https://dvenue.bublnet.in', logo: '/assets/clients/dvenue-logo.webp', relationship: 'own' },
    { name: 'Masdar Al Riyadh', url: 'https://masdaralriyadh.com', logo: '/assets/clients/masdar.webp', relationship: 'client' },
    { name: 'Laynered', url: 'https://laynered.com', logo: '/assets/clients/laynered-logo.webp', relationship: 'client' },
    { name: 'Spectra School', url: 'https://spectraschool.in', logo: '/assets/clients/spectra.webp', relationship: 'client' },
    { name: 'Nature of the Divine', url: 'https://natureofthedivine.com', logo: '/assets/clients/logo.svg', relationship: 'client' },
    { name: 'Alien Hills', url: 'https://alienhills.shop', relationship: 'client' },
    { name: 'RiZa Hijabs', url: 'https://rizahijabs.com', logo: '/assets/clients/riza-logo.webp', relationship: 'client' },
    { name: 'Pacha Mobiles', url: '', logo: '/assets/clients/pacha.jpeg', label: 'Delvare Client', relationship: 'client' },
    { name: 'Zufo', url: '', logo: '/assets/clients/zufo.webp', label: 'Delvare Client', relationship: 'client' },
    { name: 'Delvare', url: 'https://delvare.in', logo: '/assets/logo.png', relationship: 'own' },
];

/** Brands on display, excluding Delvare itself. */
export const clientBrands = clients.filter((client) => client.name !== 'Delvare');

export const domainOf = (url: string) => {
    if (!url) return '';
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return url;
    }
};

/** URL-safe identifier used for structured-data @id values. */
export const clientSlug = (name: string) =>
    name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
