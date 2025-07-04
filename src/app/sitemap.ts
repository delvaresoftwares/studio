import { type MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://delvare.vercel.app'
 
  const routes = ['', '#services', '#features', '#estimator', '#game-space', '#contact'];

  return routes.map((route) => ({
      url: `${baseUrl}/${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: route === '' ? 1 : 0.8,
  }));
}
