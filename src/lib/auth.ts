import { cookies } from 'next/headers';
import { signSession, verifySession, SESSION_TTL_SECONDS, type SessionPayload } from '@/lib/auth-jwt';

export const SESSION_COOKIE_NAME = 'delvare_session';
export const OAUTH_STATE_COOKIE_NAME = 'delvare_oauth_state';
export const OAUTH_REDIRECT_COOKIE_NAME = 'delvare_oauth_redirect';

export type AuthUser = {
  email: string;
  name: string | null;
  picture: string | null;
  provider: 'email' | 'google';
};

const isProduction = () => process.env.NODE_ENV === 'production';

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: isProduction(),
  path: '/',
  maxAge: SESSION_TTL_SECONDS,
};

export async function getSessionUser(): Promise<AuthUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifySession(token);
  if (!payload) return null;

  return {
    email: payload.email,
    name: payload.name ?? null,
    picture: payload.picture ?? null,
    provider: payload.provider,
  };
}

export async function createSession(user: AuthUser): Promise<void> {
  const store = await cookies();
  const token = signSession({
    sub: user.email,
    email: user.email,
    name: user.name,
    picture: user.picture,
    provider: user.provider,
  });
  store.set(SESSION_COOKIE_NAME, token, sessionCookieOptions);
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
}

// Server actions / handlers can call this to require a signed-in user.
export async function requireAuth(): Promise<AuthUser | null> {
  return getSessionUser();
}

export type { SessionPayload };