'use client';

import { useEffect, useMemo, useState } from 'react';
import { getVisitsAction, type VisitEntry } from '@/app/actions';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Eye, Users, Activity, CalendarDays } from 'lucide-react';
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

const AnalyticsPanel = () => {
    const [visits, setVisits] = useState<VisitEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [range, setRange] = useState<RangeKey>('week');

    useEffect(() => {
        let alive = true;
        (async () => {
            setIsLoading(true);
            const res = await getVisitsAction();
            if (!alive) return;
            if (res.error) setError(res.error);
            setVisits(res.visits ?? []);
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {data.stats.map(stat => (
                    <Card key={stat.key} className={cn('transition-all', range === stat.key && 'border-primary/50 ring-1 ring-primary/30')}>
                        <CardContent className="p-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="text-3xl font-bold">{stat.views}</span>
                                <span className="text-xs text-muted-foreground font-medium">views</span>
                            </div>
                            <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                                <Users className="h-3 w-3" /> {stat.visitors} unique
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-primary" />
                            <h3 className="font-bold">Visitor Traffic</h3>
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
                        <div className="h-72 w-full">
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
                        <div className="h-72 flex flex-col items-center justify-center text-muted-foreground gap-2">
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
        </div>
    );
};

export default AnalyticsPanel;
