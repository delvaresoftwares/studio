import { NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyOtp, upsertUser, AuthStorageError } from '@/lib/auth-store';
import { createSession } from '@/lib/auth';
import { rateLimit, getClientIp, jsonError } from '@/lib/http';

const requestSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address.'),
  otp: z.string().trim().min(4, 'Please enter the verification code.'),
});

const MESSAGES: Record<string, string> = {
  success: 'Signed in successfully.',
  invalid: 'Incorrect code. Please try again.',
  expired: 'This code has expired. Request a new one.',
  too_many_attempts: 'Too many incorrect attempts. Request a new code.',
  not_found: 'No verification code found. Request a new one.',
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const parsed = requestSchema.safeParse(await request.json());
    if (!parsed.success) {
      return jsonError(parsed.error.errors[0]?.message || 'Invalid request body.', 400);
    }

    const email = parsed.data.email.toLowerCase();

    const ipLimit = rateLimit(`otp-verify:${getClientIp(request)}`, 10, 15 * 60 * 1000);
    if (!ipLimit.allowed) {
      return jsonError(
        `Too many attempts. Try again in ${ipLimit.retryAfterSeconds} seconds.`,
        429
      );
    }

    const result = await verifyOtp(email, parsed.data.otp);

    if (result.status !== 'success') {
      return jsonError(MESSAGES[result.status], result.status === 'not_found' || result.status === 'expired' ? 404 : 400);
    }

    const user = await upsertUser({ email, provider: 'email' });
    await createSession({
      email: user.email,
      name: user.name,
      picture: user.picture,
      provider: 'email',
    });

    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        name: user.name,
        picture: user.picture,
        provider: user.provider,
      },
    });
  } catch (error) {
    if (error instanceof AuthStorageError) {
      return jsonError(error.message, 500);
    }
    console.error('[auth/otp/verify] Unexpected error:', error);
    return jsonError('Failed to verify the code.', 500);
  }
}