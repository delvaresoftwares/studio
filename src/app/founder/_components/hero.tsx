import Image from 'next/image';
import { FOUNDER_DATA } from '../constants';
import { SKILLS } from '../content';
import FounderAge from './founder-age';
import SocialLinks from './social-links';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4">
            {/* Background gradients */}
            <div
                className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary/20 blur-[200px] rounded-full mix-blend-screen opacity-50 animate-[pulse_10s_ease-in-out_infinite]"
                aria-hidden
            />
            <div
                className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full mix-blend-screen opacity-50"
                aria-hidden
            />

            {/* Grid + noise */}
            <div
                className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"
                aria-hidden
            />
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                    backgroundSize: '64px 64px',
                }}
                aria-hidden
            />

            <div className="container max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
                    <div className="flex-1 space-y-10">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                                    Portfolio
                                </span>
                            </div>
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85]">
                                {FOUNDER_DATA.name}
                            </h1>
                        </div>

                        <div className="space-y-6 max-w-xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-white/90 leading-tight">
                                {FOUNDER_DATA.role} at{' '}
                                <span className="text-primary font-black">{FOUNDER_DATA.company}</span>
                            </h2>
                            <p className="text-lg text-white/50 leading-relaxed font-medium">
                                {FOUNDER_DATA.bio}
                            </p>

                            <div className="flex items-center gap-4 pt-2 border-t border-white/10 mt-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">
                                        Age
                                    </span>
                                    <span className="text-white font-bold">
                                        <FounderAge /> Years Old
                                    </span>
                                </div>
                                <div className="w-px h-8 bg-white/10 mx-2" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">
                                        DOB
                                    </span>
                                    <span className="text-white font-bold">25.12.2001</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-5">
                            <SocialLinks />
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-2.5 animate-fade-in-up [animation-delay:500ms]">
                            {SKILLS.map((skill) => (
                                <div
                                    key={skill.title}
                                    className="inline-flex items-baseline gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-primary/10 hover:border-primary/40 transition-all cursor-default"
                                >
                                    <span className="text-[11px] font-black uppercase tracking-widest text-primary whitespace-nowrap">
                                        {skill.title}
                                    </span>
                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider hidden sm:inline">
                                        {skill.sub}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-md relative flex justify-center md:justify-end">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-br from-primary/40 via-primary/10 to-transparent shadow-[0_0_100px_-20px_rgba(16,185,129,0.3)] group">
                            <div className="absolute inset-0 bg-[#050505] rounded-full z-0 group-hover:scale-[0.98] transition-transform duration-500" />

                            <div className="absolute inset-2 rounded-full overflow-hidden bg-zinc-900 border border-white/10 z-10 [transform:translateZ(0)]">
                                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <Image
                                    src={FOUNDER_DATA.profileUrl}
                                    alt={FOUNDER_DATA.name}
                                    fill
                                    sizes="(min-width: 768px) 320px, 256px"
                                    priority
                                    className="object-cover object-center rounded-full transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                            </div>

                            {/* Orbiting rings */}
                            <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]" />
                            <div className="absolute inset-[-1rem] rounded-full border border-dashed border-white/10 animate-[spin_20s_linear_infinite_reverse]" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
