import { cn } from '@/lib/utils';
import { CLIENTS, METRICS, type Metric, type MetricMedia } from '../content';
import { getIcon } from '../icons';
import CommitActivity from './commit-activity';

const CARD_CLASSES =
    'group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2';

const ICON_BOX_CLASSES =
    'w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all text-white/60';

const BODY_CLASSES = 'text-white/50 leading-relaxed font-medium';

const ROLES = [
    { title: 'CEO', description: 'A-Z operation' },
    { title: 'Development', description: 'Lead Dev' },
];

function Clients() {
    return (
        <div className="mt-8 space-y-3">
            <span className="text-[9px] font-black uppercase tracking-widest text-white/40">
                Active Clients
            </span>
            <div className="flex flex-wrap gap-2">
                {CLIENTS.map((client) => (
                    <span
                        key={client}
                        className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-black uppercase tracking-wider hover:bg-primary hover:text-black transition-all"
                    >
                        {client}
                    </span>
                ))}
            </div>
        </div>
    );
}

function OrgChart() {
    return (
        <div className="space-y-3">
            <div className="flex justify-center">
                <div className="px-5 py-2 rounded-xl bg-primary text-black text-[11px] font-black uppercase tracking-widest shadow-[0_0_30px_-8px_rgba(16,185,129,0.7)]">
                    ME
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-px h-4 bg-primary/40" />
            </div>
            <div className="grid grid-cols-2 gap-3">
                {ROLES.map((role) => (
                    <div key={role.title} className="flex flex-col items-center">
                        <div className="w-full text-center px-3 py-2 rounded-lg border border-primary/30 bg-primary/5 text-[10px] font-black uppercase tracking-wider text-primary">
                            {role.title}
                        </div>
                        <div className="w-px h-3 bg-primary/30" />
                        <div className="text-[9px] font-bold text-white/40 uppercase tracking-wider text-center">
                            {role.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Media({ media }: { media: MetricMedia }) {
    if (media === 'commit') return <CommitActivity className="mt-8" animated />;
    if (media === 'clients') return <Clients />;
    return <OrgChart />;
}

function MetricCard({ metric }: { metric: Metric }) {
    const Icon = getIcon(metric.icon);
    const body = (
        <p className={cn(BODY_CLASSES, metric.bodyAfterMedia && 'p-4')}>{metric.body}</p>
    );

    return (
        <article className={CARD_CLASSES}>
            <div className={ICON_BOX_CLASSES}>
                <Icon className="w-8 h-8" aria-hidden />
            </div>
            <h3 className="text-2xl font-black tracking-tighter mb-4 text-white">{metric.title}</h3>
            {!metric.bodyAfterMedia && body}
            <Media media={metric.media} />
            {metric.bodyAfterMedia && body}
        </article>
    );
}

export default function MetricsSection() {
    return (
        <section className="py-32 relative border-b border-white/5">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {METRICS.map((metric) => (
                        <MetricCard key={metric.title} metric={metric} />
                    ))}
                </div>
            </div>
        </section>
    );
}
