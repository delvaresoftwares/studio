/**
 * Centralized site configuration.
 * Use this for URLs, contact info, and metadata to ensure consistency.
 */
export const siteConfig = {
  name: 'XAAS by Delvare',
  title: 'XAAS by Delvare | Anything as a Service',
  description: 'Scalable & Secure Business Solutions at affordability',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://delvare.in',
  ogImage: 'https://res.cloudinary.com/dt4mweku7/image/upload/v1751266409/buissware_amykyt.gif',
  icon: 'https://res.cloudinary.com/dt4mweku7/image/upload/v1751266408/buissware_h6bmig.png',
  keywords: ['XAAS', 'Delvare', 'software', 'company', 'MNC', 'business solutions', 'cloud infrastructure', 'security engineering', 'business analysis'],
  contact: {
    email: 'admin@delvare.in',
    emailHref: 'mailto:admin@delvare.in',
    phone: '+91 8606821125',
    phoneHref: 'tel:+918606821125',
    whatsapp: 'https://wa.me/918606821125',
  },
} as const;
