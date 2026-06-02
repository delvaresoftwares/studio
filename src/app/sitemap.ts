import { type MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { specialties } from '@/lib/specialties-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const routes = [
    '',
    '/portfolio/founder',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const specialtyRoutes = specialties.map((specialty) => ({
    url: `${baseUrl}/main/${specialty.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...specialtyRoutes];
}
