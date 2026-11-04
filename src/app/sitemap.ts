import { type MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { specialties } from '@/lib/specialties-data';
import { blogs } from '@/lib/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const latestBlogUpdate = blogs.reduce(
    (latest, blog) => (blog.updated > latest ? blog.updated : latest),
    blogs[0]?.updated ?? new Date().toISOString().slice(0, 10)
  );

  const routes = [
    '',
    '/founder',
    '/blogs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: route === '/blogs' ? new Date(latestBlogUpdate) : new Date(),
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
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.updated),
  }));

  return [...routes, ...specialtyRoutes, ...blogRoutes];
}
