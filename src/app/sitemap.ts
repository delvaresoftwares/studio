import { type MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  // This dynamic sitemap is deprecated in favor of the static public/sitemap.xml.
  // Returning an empty array to avoid conflicts with the static file.
  return [];
}
