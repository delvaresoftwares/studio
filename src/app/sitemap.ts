import { type MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://delvare.vercel.app';

  const routes = [
    '',
    '#services',
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
