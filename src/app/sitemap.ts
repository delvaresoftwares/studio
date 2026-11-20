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
    {
      url: `${baseUrl}/`,
      lastModified: new Date(latestBlogUpdate),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/founder`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(latestBlogUpdate),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  const specialtyRoutes = specialties.map((specialty) => ({
    url: `${baseUrl}/main/${specialty.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.updated),
    changeFrequency: 'monthly' as const,
    priority: blog.featured ? 0.9 : 0.7,
  }));

  return [...routes, ...specialtyRoutes, ...blogRoutes];
}
