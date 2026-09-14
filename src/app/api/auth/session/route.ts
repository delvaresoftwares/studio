import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { jsonOk, jsonError } from '@/lib/http';

export async function GET(): Promise<NextResponse> {
  try {
    const user = await getSessionUser();
    return jsonOk({ user });
  } catch (error) {
    console.error('[auth/session] Failed to read session:', error);
    return jsonError('Failed to read session.', 500);
  }
}