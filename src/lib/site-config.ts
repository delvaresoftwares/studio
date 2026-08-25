/**
 * Centralized site configuration.
 * Use this for URLs, contact info, and metadata to ensure consistency.
 */
export const siteConfig = {
  name: 'Delvare',
  title: 'XAAS by Delvare | High-Performance Business Solutions',
  description: 'Custom-softwares, Cloud, Infrastructure, AI-automation, and Cybersecurity services for businesses. We build scalable and secure solutions for your business by adapting innovative approaches and emerging technologies.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://delvare.in',
  ogImage: 'https://res.cloudinary.com/dt4mweku7/image/upload/v1751266409/buissware_amykyt.gif',
  icon: 'https://res.cloudinary.com/dt4mweku7/image/upload/v1751266408/buissware_h6bmig.png',
  keywords: ['alfas','alfa','who is alfas', 'alfas delvare', 'delvare', 'delvare.in', 'delvare softwares', 'best software startups', 'XAAS', 'software engineering', 'AI automation', 'cloud infrastructure', 'business automation', 'cybersecurity services', 'marketing for startups', 'digital transformation', 'enterprise solutions', 'managed IT services'],
  contact: {
    email: 'admin@delvare.in',
    emailHref: 'mailto:admin@delvare.in',
    address: 'CO-Space | VSV Building, 4th Floor, Spectra School of Designs | East of Iron Bridge, CCNB Road, Aleppuzha, Kerala, India - 688001'
  },
} as const;
