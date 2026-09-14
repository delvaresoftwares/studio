import { createHmac, timingSafeEqual } from 'crypto';

const ALG = 'HS256';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type SessionPayload = {
  sub: string;
  email: string;
  name: string | null;
  picture: string | null;
  provider: 'email' | 'google';
  nonce?: string;
  iat: number;
  exp: number;
};

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error('[auth] AUTH_SECRET is not configured. Set a strong AUTH_SECRET environment variable.');
  }
  return secret;
}

function base64UrlEncode(value: string | Buffer): string {
  return Buffer.from(value)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(value: string): string {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(padded, 'base64').toString('utf8');
}

function base64UrlToBuffer(value: string): Buffer {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(padded, 'base64');
}

export function signSession(input: {
  sub: string;
  email: string;
  name?: string | null;
  picture?: string | null;
  provider: 'email' | 'google';
}): string {
  const iat = Math.floor(Date.now() / 1000);
  const payloadBase = {
    sub: input.sub,
    email: input.email,
    name: input.name ?? null,
    picture: input.picture ?? null,
    provider: input.provider,
    iat,
    exp: iat + SESSION_TTL_SECONDS,
  };
  const payload = base64UrlEncode(JSON.stringify(payloadBase));
  const header = base64UrlEncode(JSON.stringify({ alg: ALG, typ: 'JWT' }));
  const signingInput = `${header}.${payload}`;
  const signature = createHmac('sha256', getSecret())
    .update(signingInput)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  return `${signingInput}.${signature}`;
}

export function verifySession(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;
    const signingInput = `${header}.${payload}`;
    const expected = createHmac('sha256', getSecret())
      .update(signingInput)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    const expectedBuf = base64UrlToBuffer(expected);
    const actualBuf = base64UrlToBuffer(signature);
    if (expectedBuf.length !== actualBuf.length || !timingSafeEqual(expectedBuf, actualBuf)) {
      return null;
    }

    const parsed = JSON.parse(base64UrlDecode(payload)) as SessionPayload;
    if (parsed.exp * 1000 <= Date.now()) return null;
    if (!parsed.sub || !parsed.email) return null;

    return parsed;
  } catch (error) {
    console.error('[auth] Failed to verify session token:', error);
    return null;
  }
}

export { SESSION_TTL_SECONDS };