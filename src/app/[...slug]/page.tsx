import { redirect, notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { KNOWN_SOURCES } from '@/lib/tracking-sources';
import { trackSourceAction } from '@/app/actions';

export const dynamic = 'force-dynamic';

export const metadata = {
    robots: { index: false, follow: false },
};

/**
 * Tracking-link redirects, e.g.:
 *   /linked-in                 ->  /            (source: linked-in)
 *   /founder/linked-in         ->  /founder     (source: linked-in)
 *   /blog/<slug>/facebook      ->  /blog/<slug> (source: facebook)
 *
 * The last path segment is the source; everything before it is the destination.
 */
export default async function TrackingRedirectPage({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) {
    const { slug } = await params;
    const segments = slug.map(s => s.toLowerCase());

    const source = segments[segments.length - 1];
    const target = segments.length === 1 ? '/' : `/${segments.slice(0, -1).join('/')}`;

    // Preserve 404 behaviour for anything that isn't a known tracking link.
    if (!KNOWN_SOURCES.has(source)) {
        notFound();
    }

    const headerList = await headers();
    const referer = headerList.get('referer') || '';

    await trackSourceAction(source, target, referer).catch(() => {
        /* tracking must never break the redirect */
    });

    redirect(target);
}