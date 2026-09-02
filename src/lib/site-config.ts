/**
 * Centralized site configuration.
 * Use this for URLs, contact info, and metadata to ensure consistency.
 */
export const siteConfig = {
  name: 'Delvare',
  title: 'Delvare — Software Development Company | Custom Software, SaaS, AI & Cloud Solutions',
  description:
    'Delvare is a software development company building custom software, SaaS & PaaS platforms, AI automation, cloud infrastructure and cybersecurity solutions for businesses worldwide — including ECBills.in, Blendly.sbs, Dvenue and more. Founded by Alfas B.',
  companyTagline: 'Software Development Company',
  mainKeywords:
    'software development company, custom software development, software development company in Kerala, website development company, mobile app development, SaaS development company, SaaS platform development, PaaS development, AI automation services, AI integration, cloud infrastructure services, cloud hosting, cybersecurity services, UI/UX design, digital transformation, business automation solutions, web application development',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://delvare.in',
  ogImage: 'https://res.cloudinary.com/dt4mweku7/image/upload/v1751266409/buissware_amykyt.gif',
  icon: 'https://res.cloudinary.com/dt4mweku7/image/upload/v1751266408/buissware_h6bmig.png',
  keywords: ['delvare', 'delvare.in', 'delvare softwares', 'software development company', 'custom software development', 'software development company kerala', 'web development company', 'app development company', 'SaaS development', 'SaaS platform development', 'PaaS development', 'AI automation', 'AI integration services', 'cloud infrastructure', 'cloud hosting', 'cybersecurity services', 'UI UX design', 'digital transformation', 'business automation', 'enterprise solutions', 'managed IT services', 'alfas', 'alfas delvare', 'who is alfas', 'ecbills', 'ecbills.in', 'blendly', 'blendly.sbs', 'dvenue', 'masdar al riyadh', 'laynered', 'spectra school', 'nature of the divine', 'alien hills', 'best software startups'],
  contact: {
    email: 'admin@delvare.in',
    emailHref: 'mailto:admin@delvare.in',
    address: 'CO-Space | VSV Building, 4th Floor, Spectra School of Designs | East of Iron Bridge, CCNB Road, Aleppuzha, Kerala, India - 688001'
  },
} as const;
