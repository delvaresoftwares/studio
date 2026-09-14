import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';
import {
  OAUTH_STATE_COOKIE_NAME,
  OAUTH_REDIRECT_COOKIE_NAME,
  sessionCookieOptions,
} from '@/lib/auth';
import { buildAdminAuthUrl } from '@/lib/google-verify';
import { getRequestOrigin, jsonError } from '@/lib/http';

function sanitizeRedirectPath(value: string | null): string {
  if (!value) return '/admin';
  const candidate = value.startsWith('/') ? value : `/${value}`;
  if (candidate.startsWith('//') || candidate.includes('://')) return '/admin';
  return candidate;
}

/**
 * Starts the Google OAuth flow that additionally requests read-only access
 * to Google Analytics (GA4) so the admin dashboard can pull real reports.
 * An offline refresh token is requested and stored server-side for the admin.
 */
export async function GET(request: Request): Promise<NextResponse> {
  try {
    if (!process.env.G_CLIENT_ID || !process.env.G_CLIENT_SECRET) {
      return jsonError('Google sign-in is not configured on the server.', 503);
    }

    const origin = getRequestOrigin(request);
    const state = randomBytes(16).toString('hex');
    const redirectTo = sanitizeRedirectPath(new URL(request.url).searchParams.get('redirect'));

    const store = await cookies();
    store.set(OAUTH_STATE_COOKIE_NAME, state, sessionCookieOptions);
    store.set(OAUTH_REDIRECT_COOKIE_NAME, redirectTo, sessionCookieOptions);

    return NextResponse.redirect(buildAdminAuthUrl(origin, state));
  } catch (error) {
    console.error('[admin/auth/google] Failed to initialize GA4 sign-in:', error);
    return jsonError('Failed to initialize Google Analytics sign-in.', 500);
  }
}