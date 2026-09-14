import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  OAUTH_STATE_COOKIE_NAME,
  OAUTH_REDIRECT_COOKIE_NAME,
  createSession,
} from '@/lib/auth';
import { exchangeGoogleCode } from '@/lib/google-verify';
import { upsertUser, saveAdminTokens, AuthStorageError } from '@/lib/auth-store';
import { isAdminEmail } from '@/lib/admin';
import { getRequestOrigin } from '@/lib/http';

function fallbackRedirect(): string {
  return '/admin?auth_error=1';
}

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const origin = getRequestOrigin(request);
  const store = await cookies();
  const expectedState = store.get(OAUTH_STATE_COOKIE_NAME)?.value;
  const redirectTo = store.get(OAUTH_REDIRECT_COOKIE_NAME)?.value || '/admin';

  store.delete(OAUTH_STATE_COOKIE_NAME);
  store.delete(OAUTH_REDIRECT_COOKIE_NAME);

  try {
    if (url.searchParams.get('error')) {
      return NextResponse.redirect(new URL(fallbackRedirect(), origin));
    }

    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (!code || !state || !expectedState || state !== expectedState) {
      return NextResponse.redirect(new URL(fallbackRedirect(), origin));
    }

    const { user: profile, tokens } = await exchangeGoogleCode(code, origin, {
      wantTokens: true,
      redirectPath: '/api/admin/auth/google/callback',
    });

    // Only persist Google Analytics credentials for the authorized admin email.
    if (isAdminEmail(profile.email) && tokens) {
      await saveAdminTokens({
        email: profile.email,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: tokens.expiresAt,
        scope: 'https://www.googleapis.com/auth/analytics.readonly',
      });
    }

    const user = await upsertUser({
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
      provider: 'google',
    });

    await createSession({
      email: user.email,
      name: user.name,
      picture: user.picture,
      provider: 'google',
    });

    return NextResponse.redirect(new URL(redirectTo, origin));
  } catch (error) {
    console.error('[admin/auth/google/callback] GA4 authorization failed:', error);
    if (error instanceof AuthStorageError) {
      console.error('[admin/auth/google/callback]', error.message);
    }
    return NextResponse.redirect(new URL(fallbackRedirect(), origin));
  }
}