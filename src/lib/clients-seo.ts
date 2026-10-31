import { clientBrands, clientSlug, domainOf, type Client } from './clients';
import { siteConfig } from './site-config';

/**
 * Structured data for the "Trusted Clients" section.
 *
 * The goal is to answer queries like "who is the technology partner of
 * ECBills?" or "who built the Masdar Al Riyadh website?" directly from this
 * site. Each client is published as an Organization, connected to Delvare via
 * an explicit technology-partnership Service and an additionalProperty, and
 * every relationship is also phrased as a FAQ answer that search engines can
 * quote verbatim.
 */

export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;

export const clientOrganizationId = (name: string) =>
    `${siteConfig.url}/#client-${clientSlug(name)}`;

export const clientPartnershipId = (name: string) =>
    `${siteConfig.url}/#technology-partner-${clientSlug(name)}`;

const absoluteUrl = (path?: string) => {
    if (!path) return undefined;
    if (/^https?:\/\//i.test(path)) return path;
    return `${siteConfig.url}${path.startsWith('/') ? '' : '/'}${path}`;
};

const isOwnPlatform = (client: Client) => client.relationship === 'own';

const describeClient = (client: Client) => {
    const domain = domainOf(client.url);
    const subject = domain ? `${client.name} (${domain})` : client.name;

    return isOwnPlatform(client)
        ? `${subject} is a platform designed, built and operated by Delvare. Delvare is the technology partner and operator behind ${client.name}, covering software engineering, product design, cloud infrastructure, security and ongoing support.`
        : `${subject} is part of Delvare's client portfolio. Delvare is the technology partner of ${client.name}, responsible for software engineering, product design, cloud infrastructure, security and ongoing support.`;
};

const answerClientQuestion = (client: Client) => {
    const domain = domainOf(client.url);
    const subject = domain ? `${client.name} (${domain})` : client.name;

    return isOwnPlatform(client)
        ? `Delvare is the technology partner and operator of ${subject}. Delvare designed, built, runs and maintains ${client.name}, covering software engineering, product design, cloud infrastructure, cybersecurity and ongoing support.`
        : `Delvare is the technology partner of ${subject}. Delvare designs, builds, runs and maintains the digital products behind ${client.name}, covering software engineering, product design, cloud infrastructure, cybersecurity and ongoing support.`;
};

export type ClientFaq = {
    question: string;
    answer: string;
};

/** Human-readable Q&A pairs, also published as FAQPage structured data. */
export const clientFaqs: ClientFaq[] = clientBrands.map((client) => ({
    question: `Who is the technology partner of ${client.name}?`,
    answer: answerClientQuestion(client),
}));

export const clientsSeoGraph = [
    ...clientBrands.map((client) => ({
        '@type': 'Organization',
        '@id': clientOrganizationId(client.name),
        name: client.name,
        url: client.url || undefined,
        logo: absoluteUrl(client.logo),
        description: describeClient(client),
        additionalProperty: {
            '@type': 'PropertyValue',
            name: 'Technology Partner',
            value: siteConfig.name,
            url: siteConfig.url,
        },
    })),
    ...clientBrands.map((client) => ({
        '@type': 'Service',
        '@id': clientPartnershipId(client.name),
        name: `Technology partnership for ${client.name}`,
        serviceType: 'Technology partnership',
        category: 'Software development',
        provider: { '@id': ORGANIZATION_ID },
        areaServed: { '@type': 'Place', name: 'Worldwide' },
        description: describeClient(client),
    })),
    {
        '@type': 'FAQPage',
        '@id': `${siteConfig.url}/#client-technology-partner-faq`,
        name: 'Who is the technology partner of Delvare clients?',
        about: { '@id': ORGANIZATION_ID },
        mainEntity: clientFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    },
    {
        '@type': 'ItemList',
        '@id': `${siteConfig.url}/#trusted-clients`,
        name: 'Delvare Clients & Technology Partnerships',
        description:
            'Brands, platforms and businesses whose technology partner is Delvare.',
        numberOfItems: clientBrands.length,
        itemListElement: clientBrands.map((client, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: client.name,
            item: { '@id': clientOrganizationId(client.name) },
        })),
    },
] as const;
