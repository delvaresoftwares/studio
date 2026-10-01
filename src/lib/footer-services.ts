/**
 * GENERATED FILE — do not edit by hand.
 * Run `npm run gen:footer-services` after editing src/lib/specialties-data.ts.
 *
 * The six service links rendered in the site footer. specialties-data.ts is
 * ~39 KB of long-form service copy, but the footer only needs slug and title
 * from it. Because the footer is a client component mounted on every route,
 * importing the dataset there shipped the whole module to the browser for six
 * links. This mirrors only the slice the footer renders.
 */
export type FooterService = { slug: string; title: string };

export const footerServices: FooterService[] = [
    {
        "slug": "seo-optimization",
        "title": "SEO & Digital Infrastructure"
    },
    {
        "slug": "business-analyst",
        "title": "Strategic Business Analysis"
    },
    {
        "slug": "software-engineering",
        "title": "Custom Software Engineering"
    },
    {
        "slug": "ai-dashboard",
        "title": "Business Intelligence Dashboards"
    },
    {
        "slug": "ai-ecosystems",
        "title": "AI & Process Automation"
    },
    {
        "slug": "software-design",
        "title": "UI/UX Design & Strategy"
    }
];
