import { getAdminTokens, saveAdminTokens } from '@/lib/auth-store';
import { refreshGoogleAccessToken } from '@/lib/google-verify';

const GA4_BASE = 'https://analyticsdata.googleapis.com/v1beta';

export type Ga4Range = 'day' | 'week' | 'month' | 'year' | 'all';

export type Ga4TimeSeriesPoint = {
  label: string;
  users: number;
  sessions: number;
  pageViews: number;
};

export type Ga4AnalyticsData = {
  propertyId: string;
  startDate: string;
  endDate: string;
  summary: {
    totalUsers: number;
    newUsers: number;
    sessions: number;
    engagedSessions: number;
    pageViews: number;
    avgSessionSeconds: number;
    engagementRate: number;
    bounceRate: number;
  };
  timeSeries: Ga4TimeSeriesPoint[];
  topPages: { path: string; title: string; pageViews: number; users: number }[];
  channels: { channel: string; sessions: number; users: number }[];
};

export class Ga4Error extends Error {
  code: 'MISSING_PROPERTY' | 'NOT_AUTHORIZED' | 'TOKEN_REFRESH_FAILED' | 'API_ERROR';

  constructor(message: string, code: Ga4Error['code']) {
    super(message);
    this.name = 'Ga4Error';
    this.code = code;
  }
}

type Ga4Row = {
  dimensionValues: { value: string }[];
  metricValues: { value: string }[];
};

type Ga4ReportResponse = {
  rows?: Ga4Row[];
  rowCount?: number;
  totals?: { metricValues: { value: string }[] }[];
  error?: { code: number; message: string; status: string };
};

function getPropertyId(): string {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) {
    throw new Ga4Error(
      'GA4_PROPERTY_ID is not configured. Set it to the numeric ID of the GA4 property (in GA4 admin → Property settings).',
      'MISSING_PROPERTY'
    );
  }
  return propertyId;
}

function getDateRange(range: Ga4Range): { startDate: string; endDate: string } {
  switch (range) {
    case 'day':
      return { startDate: '1daysAgo', endDate: 'today' };
    case 'week':
      return { startDate: '7daysAgo', endDate: 'today' };
    case 'year':
      return { startDate: '365daysAgo', endDate: 'today' };
    case 'all':
      return { startDate: '2020-01-01', endDate: 'today' };
    case 'month':
    default:
      return { startDate: '30daysAgo', endDate: 'today' };
  }
}

async function getAccessToken(): Promise<string> {
  const tokens = await getAdminTokens();
  if (!tokens) {
    throw new Ga4Error(
      'Google Analytics is not connected. Use the "Connect Google Analytics" button in the admin panel to authorize access.',
      'NOT_AUTHORIZED'
    );
  }

  const now = Date.now();
  if (tokens.accessToken && tokens.expiresAt > now + 120_000) {
    return tokens.accessToken;
  }

  if (!tokens.refreshToken) {
    throw new Ga4Error(
      'The stored Google Analytics token has expired and no refresh token is available. Reconnect Google Analytics from the admin panel.',
      'TOKEN_REFRESH_FAILED'
    );
  }

  const refreshed = await refreshGoogleAccessToken(tokens.refreshToken);
  await saveAdminTokens({
    email: tokens.email,
    accessToken: refreshed.accessToken,
    refreshToken: tokens.refreshToken,
    expiresAt: refreshed.expiresAt,
    scope: tokens.scope,
  });
  return refreshed.accessToken;
}

async function runReport(body: Record<string, unknown>): Promise<Ga4ReportResponse> {
  const propertyId = getPropertyId();
  const token = await getAccessToken();

  const response = await fetch(`${GA4_BASE}/properties/${propertyId}:runReport`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  const data = (await response.json()) as Ga4ReportResponse;
  if (!response.ok) {
    const detail = data?.error?.message || `GA4 Data API error (${response.status})`;
    throw new Ga4Error(detail, 'API_ERROR');
  }
  return data;
}

function num(value: string | undefined): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatDateLabel(date: string): string {
  const y = Number(date.slice(0, 4));
  const m = Number(date.slice(4, 6)) - 1;
  const d = Number(date.slice(6, 8));
  return new Date(y, m, d).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
}

export async function fetchGa4Data(range: Ga4Range): Promise<Ga4AnalyticsData> {
  const { startDate, endDate } = getDateRange(range);
  const propertyId = getPropertyId();

  // --- Summary (no dimensions) ---
  const summaryReport = await runReport({
    dateRanges: [{ startDate, endDate }],
    metrics: [
      { name: 'totalUsers' },
      { name: 'newUsers' },
      { name: 'sessions' },
      { name: 'engagedSessions' },
      { name: 'screenPageViews' },
      { name: 'averageSessionDuration' },
    ],
  });

  const summaryRow = summaryReport.rows?.[0];
  const totalUsers = summaryRow ? num(summaryRow.metricValues[0]?.value) : 0;
  const newUsers = summaryRow ? num(summaryRow.metricValues[1]?.value) : 0;
  const sessions = summaryRow ? num(summaryRow.metricValues[2]?.value) : 0;
  const engagedSessions = summaryRow ? num(summaryRow.metricValues[3]?.value) : 0;
  const pageViews = summaryRow ? num(summaryRow.metricValues[4]?.value) : 0;
  const avgSessionSeconds = summaryRow ? num(summaryRow.metricValues[5]?.value) : 0;
  const engagementRate = sessions > 0 ? engagedSessions / sessions : 0;

  // --- Time series (per day, or per hour for the day range) ---
  const isDay = range === 'day';
  const seriesReport = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: isDay ? 'hour' : 'date' }],
    metrics: [{ name: 'totalUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }],
    orderBys: [
      {
        dimension: { dimensionName: isDay ? 'hour' : 'date', orderType: 'NUMERIC' },
      },
    ],
  });

  const timeSeries: Ga4TimeSeriesPoint[] = (seriesReport.rows ?? []).map((row) => {
    const raw = row.dimensionValues[0]?.value ?? '';
    const label = isDay ? `${Number(raw)}:00` : formatDateLabel(raw);
    return {
      label,
      users: num(row.metricValues[0]?.value),
      sessions: num(row.metricValues[1]?.value),
      pageViews: num(row.metricValues[2]?.value),
    };
  });

  // --- Top pages ---
  const pagesReport = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
    metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'screenPageViews', desc: true } }],
    limit: 8,
  });

  const topPages = (pagesReport.rows ?? []).map((row) => ({
    path: row.dimensionValues[0]?.value || '/',
    title: row.dimensionValues[1]?.value || row.dimensionValues[0]?.value || '',
    pageViews: num(row.metricValues[0]?.value),
    users: num(row.metricValues[1]?.value),
  }));

  // --- Top channels ---
  const channelsReport = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'sessions', desc: true } }],
    limit: 8,
  });

  const channels = (channelsReport.rows ?? []).map((row) => ({
    channel: row.dimensionValues[0]?.value || 'Other',
    sessions: num(row.metricValues[0]?.value),
    users: num(row.metricValues[1]?.value),
  }));

  return {
    propertyId,
    startDate,
    endDate,
    summary: {
      totalUsers,
      newUsers,
      sessions,
      engagedSessions,
      pageViews,
      avgSessionSeconds,
      engagementRate,
      bounceRate: 1 - engagementRate,
    },
    timeSeries,
    topPages,
    channels,
  };
}