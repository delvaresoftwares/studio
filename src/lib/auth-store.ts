import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { app, db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const OTP_RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds
const OTP_MAX_ATTEMPTS = 5;

export class AuthStorageError extends Error {}

function idForKey(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

function ensureStorage(): void {
  if (!app.options.projectId) {
    throw new AuthStorageError(
      'Firebase is not configured on the server. Authentication storage is unavailable.'
    );
  }
}

export function hashOtp(code: string): string {
  const secret = process.env.AUTH_SECRET || 'otp';
  return createHmac('sha256', secret).update(code).digest('hex');
}

export type StoredOtp = {
  email: string;
  codeHash: string;
  attempts: number;
  expiresAt: number;
  createdAt: number;
};

/** Stores a new OTP for an email, enforcing a per-email resend cooldown. */
export async function saveOtp(email: string, code: string): Promise<{ sent: boolean; waitSeconds?: number }> {
  ensureStorage();

  const emailKey = idForKey(email);
  const otpRef = doc(db, 'otps', emailKey);

  const existing = await getDoc(otpRef);
  if (existing.exists()) {
    const data = existing.data() as StoredOtp;
    const waitUntil = (data.createdAt || 0) + OTP_RESEND_COOLDOWN_MS;
    if (Date.now() < waitUntil) {
      return {
        sent: false,
        waitSeconds: Math.ceil((waitUntil - Date.now()) / 1000),
      };
    }
  }

  await setDoc(otpRef, {
    email: email.trim().toLowerCase(),
    codeHash: hashOtp(code),
    attempts: 0,
    expiresAt: Date.now() + OTP_TTL_MS,
    createdAt: Date.now(),
    updatedAt: serverTimestamp(),
  });

  return { sent: true };
}

export type OtpVerificationResult =
  | { status: 'success' }
  | { status: 'invalid' }
  | { status: 'expired' }
  | { status: 'too_many_attempts' }
  | { status: 'not_found' };

/** Verifies an OTP and consumes it on success. */
export async function verifyOtp(email: string, code: string): Promise<OtpVerificationResult> {
  ensureStorage();

  const emailKey = idForKey(email);
  const otpRef = doc(db, 'otps', emailKey);
  const snapshot = await getDoc(otpRef);

  if (!snapshot.exists()) {
    return { status: 'not_found' };
  }

  const data = snapshot.data() as StoredOtp;

  if (Date.now() > data.expiresAt) {
    await deleteDoc(otpRef);
    return { status: 'expired' };
  }

  if (data.attempts >= OTP_MAX_ATTEMPTS) {
    await deleteDoc(otpRef);
    return { status: 'too_many_attempts' };
  }

  const expected = Buffer.from(data.codeHash, 'hex');
  const actual = Buffer.from(hashOtp(code.trim()), 'hex');

  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    const attempts = data.attempts + 1;
    if (attempts >= OTP_MAX_ATTEMPTS) {
      await deleteDoc(otpRef);
      return { status: 'too_many_attempts' };
    }
    await updateDoc(otpRef, { attempts });
    return { status: 'invalid' };
  }

  await deleteDoc(otpRef);
  return { status: 'success' };
}

export type StoredUser = {
  email: string;
  name: string | null;
  picture: string | null;
  provider: 'email' | 'google';
  lastLoginAt: number;
  createdAt: number;
};

export type StoredAdminTokens = {
  email: string;
  accessToken: string;
  refreshToken: string | null;
  expiresAt: number;
  scope?: string | null;
  createdAt: number;
};

const ADMIN_TOKENS_DOC = 'ga4';

export async function saveAdminTokens(fields: {
  email: string;
  accessToken: string;
  refreshToken: string | null;
  expiresAt: number;
  scope?: string | null;
}): Promise<void> {
  ensureStorage();
  const snapshot = await getDoc(doc(db, 'admin_tokens', ADMIN_TOKENS_DOC));
  const createdAt = snapshot.exists() ? (snapshot.data().createdAt as number) || Date.now() : Date.now();
  await setDoc(
    doc(db, 'admin_tokens', ADMIN_TOKENS_DOC),
    {
      ...fields,
      createdAt,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function getAdminTokens(): Promise<StoredAdminTokens | null> {
  ensureStorage();
  const snapshot = await getDoc(doc(db, 'admin_tokens', ADMIN_TOKENS_DOC));
  if (!snapshot.exists()) return null;
  const data = snapshot.data() as StoredAdminTokens;
  if (!data.accessToken) return null;
  return data;
}

/** Creates or updates a user profile and returns it. */
export async function upsertUser(user: {
  email: string;
  name?: string | null;
  picture?: string | null;
  provider: 'email' | 'google';
}): Promise<StoredUser> {
  ensureStorage();

  const userRef = doc(db, 'users', idForKey(user.email));
  const snapshot = await getDoc(userRef);
  const now = Date.now();

  const payload: StoredUser = {
    email: user.email.trim().toLowerCase(),
    name: user.name || null,
    picture: user.picture || null,
    provider: user.provider,
    lastLoginAt: now,
    createdAt: snapshot.exists() ? (snapshot.data().createdAt as number) || now : now,
  };

  await setDoc(
    userRef,
    { ...payload, updatedAt: serverTimestamp() },
    { merge: true }
  );

  return payload;
}

export type { StoredUser as AuthStoreUser };