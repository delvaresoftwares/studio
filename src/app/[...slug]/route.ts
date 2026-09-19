import { NextRequest, NextResponse } from 'next/server';
import { KNOWN_SOURCES } from '@/lib/tracking-sources';
import { trackSourceAction } from '@/app/actions';

/**
 * Instant source-tracking redirect for links like:
 *   delvare.in/linked-in            -> 307 -> /          (source "linked-in")
 *   delvare.in/founder/linked-in    -> 307 -> /founder   (source "linked-in")
 *   delvare.in/blog/<slug>/whatsapp -> 307 -> /blog/<slug>
 *
 * Each click is recorded in Firestore (traffic_sources) for the analytics panel.
 */
export async function GET(request: NextRequest) {
    const segments = request.nextUrl.pathname.split('/').filter(Boolean).map(s => s.toLowerCase());

    if (segments.length === 0) {
        return NextResponse.next();
    }

    const source = segments[segments.length - 1];
    const target = segments.length === 1 ? '/' : `/${segments.slice(0, -1).join('/')}`;

    if (!KNOWN_SOURCES.has(source)) {
        return NextResponse.next();
    }

    // Record the click (fire-and-forget). Tracking must never break the redirect.
    try {
        await trackSourceAction(source, target, request.headers.get('referer') || '');
    } catch {
        /* ignore - analytics must never break the link */
    }

    return NextResponse.redirect(new URL(target, request.url));
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
