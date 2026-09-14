import { NextResponse } from 'next/server';

export function jsonOk(data: unknown, init?: ResponseInit): NextResponse {
  return NextResponse.json({ ...(data as Record<string, unknown>) }, init);
}

export function jsonError(message: string, status = 400, extra?: Record<string, unknown>): NextResponse {
  return NextResponse.json(
    { error: message, ...extra },
    { status }
  );
}

type SlidingWindowEntry = { count: number; resetAt: number };
const buckets = new Map<string, SlidingWindowEntry>();

/**
 * Minimal in-memory sliding-window rate limiter (single-instance).
 * Used to slow down OTP spam for a given key (e.g. IP address).
 */
export function rateLimit(key: string, max: number, windowMs: number): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (entry.count >= max) {
    return { allowed: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  return 'unknown';
}

export function getRequestOrigin(request: Request): string {
  const url = new URL(request.url);
  return url.origin;
}