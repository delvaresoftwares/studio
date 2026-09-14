import { NextResponse } from 'next/server';
import { z } from 'zod';
import { randomBytes } from 'crypto';
import { saveOtp, AuthStorageError } from '@/lib/auth-store';
import { sendOtpEmail } from '@/lib/resend';
import { jsonError, rateLimit, getClientIp } from '@/lib/http';

const requestSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address.'),
});

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const parsed = requestSchema.safeParse(await request.json());
    if (!parsed.success) {
      return jsonError(parsed.error.errors[0]?.message || 'Invalid request body.', 400);
    }

    const email = parsed.data.email.toLowerCase();

    const ipLimit = rateLimit(`otp:${getClientIp(request)}`, 5, 15 * 60 * 1000);
    if (!ipLimit.allowed) {
      return jsonError(
        `Too many requests. Try again in ${ipLimit.retryAfterSeconds} seconds.`,
        429
      );
    }

    const otp = randomBytes(3).toString('hex').toUpperCase();

    const { sent, waitSeconds } = await saveOtp(email, otp);
    if (!sent) {
      return jsonError(
        `Please wait ${waitSeconds} seconds before requesting another code.`,
        429
      );
    }

    const delivered = await sendOtpEmail(email, otp);
    if (!delivered) {
      return jsonError(
        'We could not deliver the verification code. Please try again shortly.',
        502
      );
    }

    return NextResponse.json({ success: true, message: 'Verification code sent.' });
  } catch (error) {
    if (error instanceof AuthStorageError) {
      return jsonError(error.message, 500);
    }
    console.error('[auth/otp/request] Unexpected error:', error);
    return jsonError('Failed to request a verification code.', 500);
  }
}