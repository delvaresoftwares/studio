import { type MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://delvare.vercel.app'
 
  // Sitemaps should only list canonical pages. Fragment identifiers (#) are for client-side navigation and are ignored by crawlers.
  // For a single-page site like this, only the root URL should be included.
  const routes = [''];

  return routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
  }));
}
