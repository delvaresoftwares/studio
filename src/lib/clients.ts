export type Client = {
    name: string;
    url: string;
    /** Path to the brand mark inside /public/assets (mixed webp / jpeg / svg) */
    logo?: string;
    /**
     * Aspect ratio of the artwork, applied to the logo plate so portrait
     * marks are not letterboxed inside a square.
     */
    plate: string;
    /** Sub-line shown when there is no public site to take a domain from */
    label?: string;
};

/**
 * Every logo referenced here lives in /public/assets/clients.
 * The folder holds mixed formats (webp, jpeg, svg) — each entry below points
 * at the file that actually matches that brand, including the non-webp ones.
 */
export const clients: Client[] = [
    { name: 'ECBills', url: 'https://ecbills.in', logo: '/assets/clients/ecbills-logo.webp', plate: 'aspect-square' },
    { name: 'Blendly.sbs', url: 'https://blendly.sbs', logo: '/assets/clients/blendly.webp', plate: 'aspect-[3/4]' },
    { name: 'Dvenue', url: 'https://dvenue.space', logo: '/assets/clients/dvenue-logo.webp', plate: 'aspect-[2/3]' },
    { name: 'Dvenue Bublnet', url: 'https://dvenue.bublnet.in', logo: '/assets/clients/dvenue-logo.webp', plate: 'aspect-[2/3]' },
    { name: 'Masdar Al Riyadh', url: 'https://masdaralriyadh.com', logo: '/assets/clients/masdar.webp', plate: 'aspect-square' },
    { name: 'Laynered', url: 'https://laynered.com', logo: '/assets/clients/laynered-logo.webp', plate: 'aspect-square' },
    { name: 'Spectra School', url: 'https://spectraschool.in', logo: '/assets/clients/spectra.webp', plate: 'aspect-[3/5]' },
    { name: 'Nature of the Divine', url: 'https://natureofthedivine.com', logo: '/assets/clients/natureofdivine.webp', plate: 'aspect-square' },
    { name: 'Alien Hills', url: 'https://alienhills.shop', logo: '/assets/clients/logo.svg', plate: 'aspect-square' },
    { name: 'RiZa Hijabs', url: 'https://rizahijabs.com', logo: '/assets/clients/riza-logo.webp', plate: 'aspect-square' },
    { name: 'Pacha Mobiles', url: '', logo: '/assets/clients/pacha.jpeg', plate: 'aspect-[4/5]', label: 'Delvare Client' },
    { name: 'Zufo', url: '', logo: '/assets/clients/zufo.webp', plate: 'aspect-square', label: 'Delvare Client' },
    { name: 'Delvare', url: 'https://delvare.in', logo: '/assets/logo.png', plate: 'aspect-[5/4]' },
];

export const domainOf = (url: string) => {
    if (!url) return '';
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return url;
    }
};
