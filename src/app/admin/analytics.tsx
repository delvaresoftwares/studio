'use client';

import { useEffect, useMemo, useState } from 'react';
import { getVisitsAction, getClicksAction, type VisitEntry, type ClickEntry } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Eye, Users, Activity, CalendarDays, MousePointerClick, ArrowDown, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';

type RangeKey = 'day' | 'week' | 'month' | 'year' | 'all';

const RANGES: { key: RangeKey; label: string; caption: string }[] = [
    { key: 'day', label: 'Day', caption: 'Today, by hour' },
    { key: 'week', label: 'Week', caption: 'Last 7 days' },
    { key: 'month', label: 'Month', caption: 'Last 30 days' },
    { key: 'year', label: 'Year', caption: 'Last 12 months' },
    { key: 'all', label: 'All', caption: 'All time, by month' },
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

type Bucket = { start: number; end: number; label: string };
type ChartPoint = { label: string; views: number; visitors: number };
type Summary = { views: number; visitors: number };

const DAY_MS = 24 * 60 * 60 * 1000;

function buildBuckets(range: RangeKey, earliestMs: number): Bucket[] {
    const now = new Date();
    const buckets: Bucket[] = [];

    if (range === 'day') {
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        for (let h = 0; h < 24; h++) {
            const s = new Date(midnight.getTime() + h * 3600000);
            const e = new Date(midnight.getTime() + (h + 1) * 3600000);
            buckets.push({
                start: s.getTime(),
                end: e.getTime(),
                label: `${String(h).padStart(2, '0')}:00`,
            });
        }
    } else if (range === 'week') {
        for (let i = 6; i >= 0; i--) {
            const s = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
            const e = new Date(s.getTime() + DAY_MS);
            buckets.push({ start: s.getTime(), end: e.getTime(), label: s.toLocaleDateString('en-US', { weekday: 'short' }) });
        }
    } else if (range === 'month') {
        for (let i = 29; i >= 0; i--) {
            const s = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
            const e = new Date(s.getTime() + DAY_MS);
            buckets.push({ start: s.getTime(), end: e.getTime(), label: s.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) });
        }
    } else if (range === 'year') {
        for (let i = 11; i >= 0; i--) {
            const s = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const e = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
            buckets.push({ start: s.getTime(), end: e.getTime(), label: s.toLocaleDateString('en-US', { month: 'short' }) });
        }
    } else {
        const first = earliestMs > 0 ? new Date(earliestMs) : now;
        const cursor = new Date(first.getFullYear(), first.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        while (cursor.getTime() < end.getTime()) {
            const next = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
            buckets.push({
                start: cursor.getTime(),
                end: next.getTime(),
                label: cursor.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
            });
            cursor.setTime(next.getTime());
        }
    }

    return buckets;
}

function aggregate(visits: VisitEntry[], buckets: Bucket[]): ChartPoint[] {
    return buckets.map(b => {
        const inBucket = visits.filter(v => v.createdAt >= b.start && v.createdAt < b.end);
        return {
            label: b.label,
            views: inBucket.length,
            visitors: new Set(inBucket.map(v => v.sessionId || v.id)).size,
        };
    });
}

function summarize(visits: VisitEntry[], sinceMs: number): Summary {
    const inRange = visits.filter(v => v.createdAt >= sinceMs);
    return {
        views: inRange.length,
        visitors: new Set(inRange.map(v => v.sessionId || v.id)).size,
    };
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
    const [visits, setVisits] = useState<VisitEntry[]>([]);
    const [clicks, setClicks] = useState<ClickEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [range, setRange] = useState<RangeKey>('week');

    useEffect(() => {
        let alive = true;
        (async () => {
            setIsLoading(true);
            const [visitsRes, clicksRes] = await Promise.all([
                getVisitsAction(),
                getClicksAction(),
            ]);
            if (!alive) return;
            if (visitsRes.error || clicksRes.error) {
                setError(visitsRes.error || clicksRes.error || 'Failed to fetch analytics.');
            }
            setVisits(visitsRes.visits ?? []);
            setClicks(clicksRes.clicks ?? []);
            setIsLoading(false);
        })();
        return () => { alive = false; };
    }, []);

    const data = useMemo(() => {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const earliest = visits.reduce((min, v) => Math.min(min, v.createdAt), Number.MAX_SAFE_INTEGER);

        const buckets = buildBuckets(range, earliest === Number.MAX_SAFE_INTEGER ? Date.now() : earliest);

        return {
            chart: aggregate(visits, buckets),
            caption: RANGES.find(r => r.key === range)?.caption ?? '',
            stats: [
                { key: 'day' as RangeKey, label: 'Today', ...summarize(visits, todayStart) },
                { key: 'week' as RangeKey, label: 'Week', ...summarize(visits, todayStart - 6 * DAY_MS) },
                { key: 'month' as RangeKey, label: 'Month', ...summarize(visits, todayStart - 29 * DAY_MS) },
                { key: 'year' as RangeKey, label: 'Year', ...summarize(visits, new Date(now.getFullYear(), now.getMonth() - 11, 1).getTime()) },
                { key: 'all' as RangeKey, label: 'All Time', views: visits.length, visitors: new Set(visits.map(v => v.sessionId || v.id)).size },
            ],
        };
    }, [visits, range]);

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

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Error Fetching Analytics</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-6">
            {/* Summary Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {data.stats.map(stat => (
                    <Card key={stat.key} className={cn('transition-all', range === stat.key && 'border-primary/50 ring-1 ring-primary/30')}>
                        <CardContent className="p-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="text-2xl lg:text-3xl font-bold">{stat.views}</span>
                                <span className="text-xs text-muted-foreground font-medium">views</span>
                            </div>
                            <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                                <Users className="h-3 w-3" /> {stat.visitors} unique
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Desktop: 2-column layout | Mobile: stacked */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left Column: Site Traffic + Funnel (3 cols) */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Site Traffic Chart */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <Activity className="h-4 w-4 text-primary" />
                                    <h3 className="font-bold">Site Traffic</h3>
                                    <span className="text-xs text-muted-foreground hidden sm:inline">— {data.caption}</span>
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

                            {data.chart.some(p => p.views > 0) ? (
                                <div className="h-56 lg:h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data.chart} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
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
                                            <Area type="monotone" dataKey="views" name="Views" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#viewsGradient)" />
                                            <Area type="monotone" dataKey="visitors" name="Unique visitors" stroke="#8b5cf6" strokeWidth={2} fill="url(#visitorsGradient)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            ) : (
                                <div className="h-56 lg:h-64 flex flex-col items-center justify-center text-muted-foreground gap-2">
                                    <CalendarDays className="h-10 w-10 opacity-40" />
                                    <p className="text-sm font-medium">No visitor data recorded yet.</p>
                                    <p className="text-xs">Data starts collecting once this deploy goes live.</p>
                                </div>
                            )}

                            <div className="mt-4 flex items-center gap-6 justify-center text-xs text-muted-foreground">
                                <span className="flex items-center gap-2"><Eye className="h-3.5 w-3.5 text-primary" /> Views (page loads)</span>
                                <span className="flex items-center gap-2"><Users className="h-3.5 w-3.5 text-violet-500" /> Unique visitors</span>
                            </div>
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

                {/* Right Column: Button Clicks (2 cols) */}
                <div className="lg:col-span-2">
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
