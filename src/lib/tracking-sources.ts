/**
 * Known traffic-source slugs used to build tracking/redirect links:
 *
 *   https://delvare.in/<source>          ->  https://delvare.in/
 *   https://delvare.in/founder/<source>  ->  https://delvare.in/founder
 *   https://delvare.in/blog/<slug>/<source> -> https://delvare.in/blog/<slug>
 *
 * The last path segment becomes the recorded source, everything before it is
 * the destination page. Add new channels here to start tracking them.
 */
export const TRACKING_SOURCES = [
  'linked-in',
  'linkedin',
  'facebook',
  'fb',
  'meta-ads',
  'instagram',
  'ig',
  'twitter',
  'x',
  'youtube',
  'whatsapp',
  'telegram',
  'google',
  'google-ads',
  'ad',
  'ads',
  'ad-social',
  'social',
  'email',
  'newsletter',
  'referral',
  'reddit',
  'medium',
  'github',
] as const;

export const KNOWN_SOURCES = new Set<string>(TRACKING_SOURCES);

export const SOURCE_LABELS: Record<string, string> = {
  'linked-in': 'LinkedIn',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  fb: 'Facebook',
  'meta-ads': 'Meta Ads',
  instagram: 'Instagram',
  ig: 'Instagram',
  twitter: 'Twitter',
  x: 'X (Twitter)',
  youtube: 'YouTube',
  whatsapp: 'WhatsApp',
  telegram: 'Telegram',
  google: 'Google',
  'google-ads': 'Google Ads',
  ad: 'Ad',
  ads: 'Ads',
  'ad-social': 'Social Ad',
  social: 'Social',
  email: 'Email',
  newsletter: 'Newsletter',
  referral: 'Referral',
  reddit: 'Reddit',
  medium: 'Medium',
  github: 'GitHub',
};

export function sourceLabel(source: string): string {
  return SOURCE_LABELS[source] || source;
}