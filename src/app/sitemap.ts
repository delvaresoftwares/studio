import { type MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { specialties } from '@/lib/specialties-data';
import { blogs } from '@/lib/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const routes = [
    '',
    '/portfolio/founder',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const specialtyRoutes = specialties.flatMap((specialty) => [
    {
      url: `${baseUrl}/main/${specialty.slug}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/specialty/${specialty.slug}`,
      lastModified: new Date(),
    },
  ]);

  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...specialtyRoutes, ...blogRoutes];
}
