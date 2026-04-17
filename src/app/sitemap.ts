import { type MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const routes = [
    '',
    '#services',
    '#products',
    '#clients',
    '#features',
    '#estimator',
    '#game-space',
    '#contact',
  ].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
  }));

  return routes;
}
