import { createPublicKey, createVerify } from 'crypto';

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_CERTS_URL = 'https://www.googleapis.com/oauth2/v3/certs';
const GOOGLE_USERINFO_URL = 'https://openidconnect.googleapis.com/v1/userinfo';

export const GOOGLE_SCOPE_OPENID = 'openid email profile';
export const GOOGLE_SCOPE_ANALYTICS_READONLY = 'https://www.googleapis.com/auth/analytics.readonly';

type JwksCache = { fetchedAt: number; keys: GoogleJwkKey[] };
let jwksCache: JwksCache | null = null;

type GoogleJwkKey = {
  kty: string;
  kid: string;
  use?: string;
  alg?: string;
  n: string;
  e: string;
  x5c: string[];
};

function getClientId(): string {
  const id = process.env.G_CLIENT_ID;
  if (!id) throw new Error('[auth] G_CLIENT_ID is not configured.');
  return id;
}

function getClientSecret(): string {
  const secret = process.env.G_CLIENT_SECRET;
  if (!secret) throw new Error('[auth] G_CLIENT_SECRET is not configured.');
  return secret;
}

function base64UrlDecode(value: string): string {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(padded, 'base64').toString('utf8');
}

function base64UrlToBuffer(value: string): Buffer {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(padded, 'base64');
}

export type GoogleAuthOptions = {
  scopes?: string[];
  accessType?: 'online' | 'offline';
  prompt?: string;
  /** Must match the callback route that exchanges the code (default: sign-in). */
  redirectPath?: string;
};

/** Builds the authorization URL the user is redirected to. */
export function buildGoogleAuthUrl(origin: string, state: string, options: GoogleAuthOptions = {}): string {
  const redirectUri = `${origin}${options.redirectPath ?? '/api/auth/google/callback'}`;
  const params = new URLSearchParams({
    client_id: getClientId(),
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: (options.scopes ?? ['openid', 'email', 'profile']).join(' '),
    state,
    access_type: options.accessType ?? 'online',
  });
  if (options.prompt) {
    params.set('prompt', options.prompt);
  }
  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

/** Builds the authorization URL for the admin GA4 token flow. */
export function buildAdminAuthUrl(origin: string, state: string): string {
  return buildGoogleAuthUrl(origin, state, {
    scopes: ['openid', 'email', 'profile', GOOGLE_SCOPE_ANALYTICS_READONLY],
    accessType: 'offline',
    prompt: 'consent',
    redirectPath: '/api/admin/auth/google/callback',
  });
}

export type GoogleTokens = {
  accessToken: string;
  refreshToken: string | null;
  expiresAt: number;
};

export type GoogleProfile = {
  email: string;
  name: string | null;
  picture: string | null;
};

/**
 * Exchanges an authorization code for tokens, verifies the id_token, and
 * fetches the userinfo endpoint. Returns the profile and (optionally) the
 * raw OAuth tokens so secrets stay server-side.
 */
export async function exchangeGoogleCode(
  code: string,
  origin: string,
  options: { wantTokens?: boolean; scopes?: string[]; redirectPath?: string } = {},
): Promise<{ user: GoogleProfile; tokens: GoogleTokens | null }> {
  const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: getClientId(),
      client_secret: getClientSecret(),
      redirect_uri: `${origin}${options.redirectPath ?? '/api/auth/google/callback'}`,
      grant_type: 'authorization_code',
    }),
  });

  const tokenData = await tokenResponse.json();
  if (!tokenResponse.ok) {
    throw new Error(
      `[auth] Google token exchange failed (${tokenResponse.status}): ${
        tokenData?.error_description || tokenData?.error || 'unknown error'
      }`
    );
  }

  const idToken: string | undefined = tokenData?.id_token;
  if (!idToken) {
    throw new Error('[auth] Google did not return an id_token.');
  }

  const verified = await verifyGoogleIdToken(idToken);
  let user: GoogleProfile = {
    email: verified.email,
    name: verified.name ?? null,
    picture: verified.picture ?? null,
  };

  // A second concrete fetch to the userinfo endpoint (server-to-server)
  // guarantees the identity is real and owned by this token.
  if (tokenData.access_token) {
    const userInfoResponse = await fetch(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    if (userInfoResponse.ok) {
      const userInfo = await userInfoResponse.json();
      if (userInfo?.email) {
        user = {
          email: userInfo.email,
          name: userInfo.name ?? user.name,
          picture: userInfo.picture ?? user.picture,
        };
      }
    }
  }

  let tokens: GoogleTokens | null = null;
  if (options.wantTokens && tokenData.access_token) {
    tokens = {
      accessToken: tokenData.access_token as string,
      refreshToken: (tokenData.refresh_token as string) ?? null,
      expiresAt: Date.now() + ((tokenData.expires_in as number) ?? 3600) * 1000,
    };
  }

  return { user, tokens };
}

/**
 * Refreshes an expired access token using a stored refresh token.
 */
export async function refreshGoogleAccessToken(
  refreshToken: string,
): Promise<{ accessToken: string; expiresAt: number }> {
  const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: getClientId(),
      client_secret: getClientSecret(),
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  const tokenData = await tokenResponse.json();
  if (!tokenResponse.ok || !tokenData.access_token) {
    throw new Error(
      `[auth] Google token refresh failed (${tokenResponse.status}): ${
        tokenData?.error_description || tokenData?.error || 'authorization needed again'
      }`
    );
  }

  return {
    accessToken: tokenData.access_token as string,
    expiresAt: Date.now() + ((tokenData.expires_in as number) ?? 3600) * 1000,
  };
}

async function fetchJwks(): Promise<GoogleJwkKey[]> {
  if (jwksCache && Date.now() - jwksCache.fetchedAt < 24 * 60 * 60 * 1000) {
    return jwksCache.keys;
  }

  const response = await fetch(GOOGLE_CERTS_URL);
  if (!response.ok) {
    throw new Error(`[auth] Failed to fetch Google JWKS (${response.status})`);
  }

  const data = (await response.json()) as { keys: GoogleJwkKey[] };
  if (jwksCache) {
    jwksCache = { ...jwksCache, fetchedAt: Date.now(), keys: data.keys };
  } else {
    jwksCache = { fetchedAt: Date.now(), keys: data.keys };
  }
  return data.keys;
}

function pemFromCert(base64Der: string): string {
  const body = base64Der.match(/.{1,64}/g)?.join('\n') || base64Der;
  return `-----BEGIN CERTIFICATE-----\n${body}\n-----END CERTIFICATE-----`;
}

export type GoogleIdPayload = {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
  email_verified?: boolean;
  iss?: string;
  aud?: string;
  exp?: number;
  iat?: number;
  nonce?: string;
};

/** Verifies Google's RS256 id_token signature and claims against G_CLIENT_ID. */
export async function verifyGoogleIdToken(idToken: string): Promise<GoogleIdPayload> {
  const parts = idToken.split('.');
  if (parts.length !== 3) {
    throw new Error('[auth] Malformed Google id_token.');
  }

  const [headerB64, payloadB64, signatureB64] = parts;
  const header = JSON.parse(base64UrlDecode(headerB64)) as { alg?: string; kid?: string };
  const payload = JSON.parse(base64UrlDecode(payloadB64)) as GoogleIdPayload;

  if (header.alg !== 'RS256') {
    throw new Error('[auth] Unexpected Google id_token algorithm.');
  }

  const keys = await fetchJwks();
  const jwk = keys.find((key) => key.kid === header.kid);
  if (!jwk) {
    throw new Error('[auth] No matching Google signing key found.');
  }

  const publicKey = createPublicKey(pemFromCert(jwk.x5c[0]));
  const verifier = createVerify('RSA-SHA256');
  verifier.update(`${headerB64}.${payloadB64}`);
  verifier.end();

  const validSignature = verifier.verify(publicKey, base64UrlToBuffer(signatureB64));
  if (!validSignature) {
    throw new Error('[auth] Google id_token signature verification failed.');
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  const allowedIssuers = ['https://accounts.google.com', 'accounts.google.com'];
  if (!payload.iss || !allowedIssuers.includes(payload.iss)) {
    throw new Error('[auth] Google id_token has an invalid issuer.');
  }
  if (payload.aud !== getClientId()) {
    throw new Error('[auth] Google id_token audience does not match the client.');
  }
  if (!payload.exp || payload.exp < nowSeconds) {
    throw new Error('[auth] Google id_token is expired.');
  }
  if (!payload.email) {
    throw new Error('[auth] Google id_token did not include an email address.');
  }

  return payload;
}