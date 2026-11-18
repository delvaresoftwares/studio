import { blogs } from '@/lib/blogs';
import { siteConfig } from '@/lib/site-config';

/**
 * RSS feed for the journal. Linked from every page through metadata
 * alternates, so readers and feed readers can subscribe without hunting for it.
 */
export const dynamic = 'force-static';

const escapeXml = (value: string) =>
    value.replace(/[<>&"']/g, (char) => {
        switch (char) {
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '&':
                return '&amp;';
            case '"':
                return '&quot;';
            default:
                return '&apos;';
        }
    });

export function GET() {
    const latestUpdate = blogs.reduce(
        (latest, post) => (post.updated > latest ? post.updated : latest),
        blogs[0]?.updated ?? new Date().toISOString().slice(0, 10)
    );
    const items = blogs
        .map((post) => {
            const url = `${siteConfig.url}/blogs/${post.slug}`;
            return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(post.author.name)}</dc:creator>
      <description>${escapeXml(post.metaDescription)}</description>
${post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`;
        })
        .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Delvare Journal</title>
    <link>${siteConfig.url}/blogs</link>
    <description>Practical writing on software, AI, cloud infrastructure and growth — from the team that builds and runs the systems.</description>
    <language>en</language>
    <lastBuildDate>${new Date(`${latestUpdate}T00:00:00Z`).toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=0, s-maxage=3600',
        },
    });
}
