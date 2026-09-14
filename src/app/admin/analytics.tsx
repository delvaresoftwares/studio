'use client';

import { useEffect, useMemo, useState } from 'react';
import { getVisitsAction, getClicksAction, type VisitEntry, type ClickEntry } from '@/app/actions';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Users, Activity, MousePointerClick, ArrowDown, BarChart3, Globe, Network, Clock, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    Cell,
} from 'recharts';

type RangeKey = 'day' | 'week' | 'month' | 'year' | 'all';

const RANGES: { key: RangeKey; label: string; caption: string }[] = [
    { key: 'day', label: 'Day', caption: 'Today, by hour' },
    { key: 'week', label: 'Week', caption: 'Last 7 days' },
    { key: 'month', label: 'Month', caption: 'Last 30 days' },
    { key: 'year', label: 'Year', caption: 'Last 12 months' },
    { key: 'all', label: 'All', caption: 'All time (from property creation)' },
];

const BUTTON_LABELS: Record<string, string> = {
    'hero-enquire': 'Hero: Enquire',
    'header-start-now': 'Header: Start Now',
    'header-start-project': 'Mobile: Start Project',
    'header-form-submit': 'Header: Form Submit',
    'contact-execute': 'Contact: Execute Inquiry',
    'estimator-confirm': 'Estimator: Confirm Blueprint',
    'careers-apply': 'Careers: Apply',
    'footer-schedule': 'Footer: Schedule Meeting',
    'fab-support': 'FAB: Executive Support',
    'fab-estimator': 'FAB: Core Estimator',
    'catalog-download': 'Catalog: Download Guide',
    'catalog-estimator': 'Catalog: Access Estimator',
};

const BAR_COLORS = [
    '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7',
    '#ec4899', '#f43f5e', '#f97316', '#eab308',
];

type Ga4ApiResponse = {
    status: string;
    range: RangeKey;
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
    timeSeries: { label: string; users: number; sessions: number; pageViews: number }[];
    topPages: { path: string; title: string; pageViews: number; users: number }[];
    channels: { channel: string; sessions: number; users: number }[];
};

type ApiError = { message: string; code?: string };

function formatInt(n: number): string {
    return n.toLocaleString('en-US');
}

function formatDuration(seconds: number): string {
    const s = Math.max(0, Math.round(seconds));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${String(r).padStart(2, '0')}`;
}

interface AnalyticsPanelProps {
    contactsCount?: number;
    estimationsCount?: number;
    contactsReadCount?: number;
    estimationsReadCount?: number;
}

const AnalyticsPanel = ({
    contactsCount = 0,
    estimationsCount = 0,
    contactsReadCount = 0,
    estimationsReadCount = 0,
}: AnalyticsPanelProps) => {
    const [ga4, setGa4] = useState<Ga4ApiResponse | null>(null);
    const [visits, setVisits] = useState<VisitEntry[]>([]);
    const [clicks, setClicks] = useState<ClickEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);
    const [range, setRange] = useState<RangeKey>('week');

    // Load GA4 reports whenever the selected range changes.
    useEffect(() => {
        let alive = true;
        (async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/admin/analytics?range=${range}`, { cache: 'no-store' });
                const data = await response.json();
                if (!alive) return;
                if (!response.ok) {
                    setError({ message: data?.error || 'Failed to load analytics.', code: data?.code });
                    setGa4(null);
                } else {
                    setGa4(data as Ga4ApiResponse);
                }
            } catch (err) {
                if (!alive) return;
                setError({ message: 'Could not reach the analytics service.' });
                setGa4(null);
            } finally {
                if (alive) setIsLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [range]);

    // Firestore-based funnel + button clicks load once.
    useEffect(() => {
        let alive = true;
        (async () => {
            const [visitsRes, clicksRes] = await Promise.all([
                getVisitsAction(),
                getClicksAction(),
            ]);
            if (!alive) return;
            if (!visitsRes.error) setVisits(visitsRes.visits ?? []);
            if (!clicksRes.error) setClicks(clicksRes.clicks ?? []);
        })();
        return () => { alive = false; };
    }, []);

    const summaryCards = useMemo(() => {
        if (!ga4) return [];
        const s = ga4.summary;
        return [
            { key: 'users', label: 'Users', value: formatInt(s.totalUsers), sub: `${formatInt(s.newUsers)} new`, Icon: Users },
            { key: 'sessions', label: 'Sessions', value: formatInt(s.sessions), sub: `${formatInt(s.engagedSessions)} engaged`, Icon: Activity },
            { key: 'pageviews', label: 'Page Views', value: formatInt(s.pageViews), sub: '', Icon: Eye },
            { key: 'engagement', label: 'Engagement', value: `${Math.round(s.engagementRate * 100)}%`, sub: `${formatDuration(s.avgSessionSeconds)} avg. session`, Icon: Clock },
        ];
    }, [ga4]);

    const chartData = useMemo(() => {
        if (!ga4) return [];
        return ga4.timeSeries;
    }, [ga4]);

    const topPages = ga4?.topPages ?? [];
    const channels = ga4?.channels ?? [];

    const maxPageViews = useMemo(() => Math.max(...topPages.map(p => p.pageViews), 0), [topPages]);
    const maxChannelSessions = useMemo(() => Math.max(...channels.map(c => c.sessions), 0), [channels]);

    const buttonAnalytics = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const c of clicks) {
            counts[c.buttonId] = (counts[c.buttonId] || 0) + 1;
        }
        const totalClicks = clicks.length;
        return Object.entries(counts)
            .map(([id, count]) => ({
                id,
                label: BUTTON_LABELS[id] || id,
                count,
                pct: totalClicks > 0 ? Math.round((count / totalClicks) * 100) : 0,
            }))
            .sort((a, b) => b.count - a.count);
    }, [clicks]);

    const funnelData = useMemo(() => {
        const totalVisitors = new Set(visits.map(v => v.sessionId || v.id)).size;
        const totalClicks = clicks.length;
        const totalEnquiries = contactsCount + estimationsCount;
        const totalRead = contactsReadCount + estimationsReadCount;

        return [
            { label: 'Visitors', count: totalVisitors, color: 'bg-blue-500' },
            { label: 'Button Clicks', count: totalClicks, color: 'bg-violet-500' },
            { label: 'Enquiries', count: totalEnquiries, color: 'bg-amber-500' },
            { label: 'Read Enquiries', count: totalRead, color: 'bg-emerald-500' },
        ];
    }, [visits, clicks, contactsCount, estimationsCount, contactsReadCount, estimationsReadCount]);

    const maxFunnelCount = Math.max(...funnelData.map(f => f.count), 1);

    if (isLoading && !ga4) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    if (error && !ga4) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Error Loading Google Analytics</AlertTitle>
                <AlertDescription>
                    {error.message}
                    {error.code === 'MISSING_PROPERTY' && (
                        <span className="block mt-2 text-xs">
                            Set <code className="font-mono">GA4_PROPERTY_ID</code> (the numeric property ID
                            from GA4 admin → Property settings) in your server environment, then
                            reconnect Google Analytics above.
                        </span>
                    )}
                    {error.code === 'NOT_AUTHORIZED' && (
                        <span className="block mt-2 text-xs">
                            Click "Connect Google Analytics" above and approve read-only access.
                        </span>
                    )}
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-6">
            {/* Summary Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {summaryCards.map(card => {
                    const Icon = card.Icon;
                    return (
                        <Card key={card.key}>
                            <CardContent className="p-4">
                                <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                    <Icon className="h-3.5 w-3.5" /> {card.label}
                                </p>
                                <div className="mt-2 text-2xl lg:text-3xl font-bold">{card.value}</div>
                                {card.sub && (
                                    <p className="mt-1 text-[11px] text-muted-foreground">{card.sub}</p>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Desktop: 2-column layout | Mobile: stacked */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left Column: GA4 Traffic + Funnel (3 cols) */}
                <div className="lg:col-span-3 space-y-6">
                    {/* GA4 Traffic Chart */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <Activity className="h-4 w-4 text-primary" />
                                    <h3 className="font-bold">Google Analytics Traffic</h3>
                                    <span className="text-xs text-muted-foreground hidden sm:inline">
                                        — {RANGES.find(r => r.key === range)?.caption ?? ''}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {RANGES.map(r => (
                                        <button
                                            key={r.key}
                                            onClick={() => setRange(r.key)}
                                            className={cn(
                                                'px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all',
                                                range === r.key
                                                    ? 'bg-primary text-primary-foreground shadow'
                                                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                                            )}
                                        >
                                            {r.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {chartData.some(p => p.pageViews > 0 || p.users > 0) ? (
                                <div className="h-56 lg:h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="pageViewsGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                                            <XAxis dataKey="label" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} minTickGap={18} />
                                            <YAxis allowDecimals={false} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))', color: 'hsl(var(--card-foreground))', fontSize: 12 }}
                                                labelStyle={{ fontWeight: 700 }}
                                            />
                                            <Area type="monotone" dataKey="pageViews" name="Page views" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#pageViewsGradient)" />
                                            <Area type="monotone" dataKey="sessions" name="Sessions" stroke="#10b981" strokeWidth={2} fill="transparent" />
                                            <Area type="monotone" dataKey="users" name="Users" stroke="#8b5cf6" strokeWidth={2} fill="url(#usersGradient)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            ) : (
                                <div className="h-56 lg:h-64 flex flex-col items-center justify-center text-muted-foreground gap-2">
                                    <Activity className="h-10 w-10 opacity-40" />
                                    <p className="text-sm font-medium">No traffic in this range yet.</p>
                                    <p className="text-xs">GA4 is live and will start showing data as visitors arrive.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Top Pages */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Globe className="h-4 w-4 text-primary" />
                                <h3 className="font-bold">Top Pages</h3>
                                <span className="ml-auto text-xs text-muted-foreground font-medium">by page views</span>
                            </div>

                            {topPages.length > 0 ? (
                                <div className="space-y-3">
                                    {topPages.map(page => (
                                        <div key={page.path} className="flex items-center gap-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <p className="text-xs font-bold truncate font-mono">{page.path || '/'}</p>
                                                    <span className="text-xs text-muted-foreground font-medium shrink-0 ml-2">
                                                        {formatInt(page.pageViews)} views · {formatInt(page.users)} users
                                                    </span>
                                                </div>
                                                <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full bg-primary transition-all duration-500"
                                                        style={{ width: `${maxPageViews > 0 ? Math.max((page.pageViews / maxPageViews) * 100, 4) : 0}%`, opacity: 0.8 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground py-6 text-center">No page data in this range yet.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Conversion Funnel */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-6">
                                <BarChart3 className="h-4 w-4 text-primary" />
                                <h3 className="font-bold">Conversion Funnel</h3>
                            </div>

                            <div className="space-y-4">
                                {funnelData.map((stage, idx) => {
                                    const widthPct = maxFunnelCount > 0 ? Math.max((stage.count / maxFunnelCount) * 100, 4) : 4;
                                    const convRate = idx > 0 && funnelData[idx - 1].count > 0
                                        ? Math.round((stage.count / funnelData[idx - 1].count) * 100)
                                        : null;

                                    return (
                                        <div key={stage.label}>
                                            {idx > 0 && (
                                                <div className="flex items-center gap-1.5 ml-2 my-1">
                                                    <ArrowDown className="h-3 w-3 text-muted-foreground" />
                                                    {convRate !== null && (
                                                        <span className="text-[10px] font-bold text-muted-foreground">{convRate}%</span>
                                                    )}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 lg:w-28 shrink-0">
                                                    <p className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">{stage.label}</p>
                                                </div>
                                                <div className="flex-1 relative h-10 rounded-xl bg-secondary/50 overflow-hidden">
                                                    <div
                                                        className={cn('h-full rounded-xl transition-all duration-700 ease-out', stage.color)}
                                                        style={{ width: `${widthPct}%`, opacity: 0.85 }}
                                                    />
                                                    <span className="absolute inset-y-0 left-3 flex items-center text-xs font-black text-foreground mix-blend-difference">
                                                        {stage.count.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Channels + Button Clicks (2 cols) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Channels */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Network className="h-4 w-4 text-primary" />
                                <h3 className="font-bold">Acquisition Channels</h3>
                                <span className="ml-auto text-xs text-muted-foreground font-medium">by sessions</span>
                            </div>

                            {channels.length > 0 ? (
                                <div className="h-56 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={channels} layout="vertical" margin={{ top: 0, right: 8, left: 8, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
                                            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                                            <YAxis type="category" dataKey="channel" width={64} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))', color: 'hsl(var(--card-foreground))', fontSize: 12 }}
                                                labelStyle={{ fontWeight: 700 }}
                                            />
                                            <Bar dataKey="sessions" name="Sessions" radius={[0, 6, 6, 0]}>
                                                {channels.map((entry, index) => (
                                                    <Cell key={entry.channel} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-muted-foreground gap-2 py-12">
                                    <Network className="h-10 w-10 opacity-40" />
                                    <p className="text-sm font-medium">No channel data in this range yet.</p>
                                </div>
                            )}

                            {channels.length > 0 && (
                                <div className="mt-4 space-y-1.5">
                                    {channels.slice(0, 4).map(c => (
                                        <div key={c.channel} className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">{c.channel}</span>
                                            <span className="font-semibold">{formatInt(c.sessions)} sessions</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Button Clicks */}
                    <Card className="h-full">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-6">
                                <MousePointerClick className="h-4 w-4 text-primary" />
                                <h3 className="font-bold">Button Clicks</h3>
                                <span className="ml-auto text-xs text-muted-foreground font-medium">{clicks.length} total</span>
                            </div>

                            {buttonAnalytics.length > 0 ? (
                                <div className="space-y-3">
                                    {buttonAnalytics.map(btn => (
                                        <div key={btn.id} className="flex items-center gap-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <p className="text-xs font-bold truncate">{btn.label}</p>
                                                    <span className="text-xs text-muted-foreground font-medium shrink-0 ml-2">{btn.count} ({btn.pct}%)</span>
                                                </div>
                                                <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full bg-primary transition-all duration-500"
                                                        style={{ width: `${btn.pct}%`, opacity: 0.8 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-muted-foreground gap-2 py-12">
                                    <MousePointerClick className="h-10 w-10 opacity-40" />
                                    <p className="text-sm font-medium">No button clicks recorded yet.</p>
                                    <p className="text-xs">Clicks are tracked on key CTAs across the site.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPanel;