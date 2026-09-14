const DEFAULT_ADMIN_EMAILS = '4lfasbadar@gmail.com';

function adminEmails(): string[] {
  const raw = process.env.ADMIN_ALLOWED_EMAILS || DEFAULT_ADMIN_EMAILS;
  return raw
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return adminEmails().includes(email.trim().toLowerCase());
}

export function getAdminEmails(): string[] {
  return adminEmails();
}

export const ADMIN_EMAIL = DEFAULT_ADMIN_EMAILS;