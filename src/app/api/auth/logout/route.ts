import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, OAUTH_STATE_COOKIE_NAME, OAUTH_REDIRECT_COOKIE_NAME } from '@/lib/auth';
import { jsonOk } from '@/lib/http';

export async function POST(): Promise<NextResponse> {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
  store.delete(OAUTH_STATE_COOKIE_NAME);
  store.delete(OAUTH_REDIRECT_COOKIE_NAME);
  return jsonOk({ success: true });
}