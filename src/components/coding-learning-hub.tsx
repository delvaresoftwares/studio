'use client';

import { useState, useEffect } from 'react';
import {
    X,
    Zap,
    Server,
    Laptop,
    ShieldCheck,
    Lock,
    Unlock,
    ArrowRight,
    Layout,
    Settings,
    Terminal,
    Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CodingLearningHub = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLevel, setActiveLevel] = useState(1);
    const [isSecure, setIsSecure] = useState(false);
    const [showAttack, setShowAttack] = useState(false);

    // Level state
    const [placedSecurity, setPlacedSecurity] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        window.addEventListener('open-learning-hub', handleOpen);
        return () => window.removeEventListener('open-learning-hub', handleOpen);
    }, []);

    const resetLevel = () => {
        setPlacedSecurity(false);
        setShowAttack(false);
        setIsSecure(false);
    };

    const handleTest = () => {
        setShowAttack(true);
        setTimeout(() => {
            if (placedSecurity) {
                setIsSecure(true);
            } else {
                setIsSecure(false);
                setTimeout(resetLevel, 2000);
            }
        }, 1500);
    };

    return (
        <>

            {/* Fullscreen Interactive Hub */}
            <div className={cn(
                "fixed inset-0 z-[9999] bg-black transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
            )}>
                {/* Background Decor */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]" />
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                <div className="h-full flex flex-col relative z-10">
                    {/* Header */}
                    <header className="flex justify-between items-center p-6 lg:p-10 border-b border-white/5">
                        <div className="flex items-center gap-3 lg:gap-4">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                                <Brain className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-lg lg:text-xl font-black tracking-tight text-white uppercase leading-none">Delvare Learning</h1>
                                <p className="text-[9px] lg:text-[10px] font-black tracking-widest text-primary/60 uppercase mt-1">System v6.0 / Training</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-white/5 text-white hover:bg-white/10 hover:text-primary transition-all"
                        >
                            <X className="w-6 h-6 lg:w-8 lg:h-8" />
                        </Button>
                    </header>

                    {/* Interaction Space */}
                    <main className="flex-grow overflow-y-auto lg:overflow-hidden p-8 lg:p-12">
                        <div className="max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-12">

                            {/* Left Side: Instructions & Selection */}
                            <div className="lg:col-span-4 space-y-8 lg:space-y-12">
                                <div className="space-y-4 lg:space-y-6">
                                    <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1 lg:px-4 lg:py-1.5 text-[8px] lg:text-[9px] font-black uppercase tracking-widest">
                                        Level 01: Perimeter Defense
                                    </Badge>
                                    <h2 className="text-3xl lg:text-5xl font-black tracking-tighter text-white leading-none">
                                        Secure the <br /> <span className="text-primary italic">Architecture.</span>
                                    </h2>
                                    <p className="text-white/40 text-xs lg:text-base font-medium leading-relaxed italic">
                                        "Prevent threats from breaching your server by deploying a WAF."
                                    </p>
                                </div>

                                <div className="space-y-4 lg:space-y-6">
                                    <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Available Components</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        <button
                                            onClick={() => setPlacedSecurity(!placedSecurity)}
                                            className={cn(
                                                "flex items-center gap-4 lg:gap-6 p-4 lg:p-6 rounded-2xl border transition-all text-left group",
                                                placedSecurity
                                                    ? "bg-primary border-primary text-white"
                                                    : "bg-white/5 border-white/10 text-white/60 hover:border-primary/40"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center transition-all shrink-0",
                                                placedSecurity ? "bg-white text-primary" : "bg-white/10 text-white"
                                            )}>
                                                <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6" />
                                            </div>
                                            <div>
                                                <span className="block text-xs lg:text-sm font-black uppercase tracking-widest">WAF Firewall</span>
                                                <span className="text-[9px] lg:text-[10px] font-medium opacity-60">Blocks malicious attacks.</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4 lg:pt-8 flex gap-3">
                                    <Button
                                        onClick={handleTest}
                                        disabled={showAttack}
                                        className="h-14 lg:h-16 flex-1 bg-white text-brand-dark rounded-xl lg:rounded-2xl font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-2xl"
                                    >
                                        Deploy & Test
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={resetLevel}
                                        className="h-14 lg:h-16 px-6 lg:px-8 rounded-xl lg:rounded-2xl border-white/10 text-white font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 shrink-0"
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </div>

                            {/* Right Side: Simulation Stage */}
                            <div className="lg:col-span-8 relative rounded-[2rem] lg:rounded-[3rem] bg-black/40 border border-white/5 overflow-hidden flex flex-col items-center justify-center p-6 lg:p-12 min-h-[500px] lg:min-h-0">
                                <div className="absolute inset-0 bg-[#0a0a0a]">
                                    <div className="absolute inset-0 opacity-[0.03]"
                                        style={{
                                            backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
                                            backgroundSize: '40px 40px'
                                        }}
                                    />
                                </div>

                                <div className="relative z-10 w-full max-w-4xl flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12 xl:gap-24">
                                    {/* User Node */}
                                    <div className="flex flex-col items-center gap-4 lg:gap-6">
                                        <div className="w-20 h-20 lg:w-32 lg:h-32 rounded-[2rem] lg:rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center relative shadow-2xl">
                                            <Laptop className="w-10 h-10 lg:w-12 lg:h-12 text-white/40" />
                                            <div className="absolute -bottom-8 lg:-bottom-10 whitespace-nowrap text-[8px] lg:text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Client Node</div>
                                        </div>
                                    </div>

                                    {/* Flow Track */}
                                    <div className="flex-grow w-1 h-32 lg:w-auto lg:h-1 bg-white/5 relative rounded-full overflow-visible">
                                        {showAttack && (
                                            <div className={cn(
                                                "absolute rounded-full blur-sm transition-all duration-[1500ms] ease-linear",
                                                "w-full lg:w-12 h-12 lg:h-full",
                                                isSecure ? "bg-primary shadow-[0_0_20px_hsl(var(--primary))]" : "bg-red-500 shadow-[0_0_20px_red]"
                                            )}
                                                style={{
                                                    top: isSecure ? '20%' : '100%',
                                                    left: '0%',
                                                    transform: isSecure ? 'translateY(20%)' : 'none',
                                                    transitionDuration: isSecure ? '800ms' : '1500ms'
                                                }} />
                                        )}

                                        {/* Security Box Placeholder */}
                                        <div className={cn(
                                            "absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl lg:rounded-3xl border-2 border-dashed transition-all duration-500 flex items-center justify-center z-20",
                                            placedSecurity
                                                ? "bg-primary border-primary shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-110"
                                                : "bg-white/5 border-white/10"
                                        )}>
                                            {placedSecurity ? <ShieldCheck className="w-8 h-8 lg:w-10 lg:h-10 text-white" /> : <Lock className="w-6 h-6 lg:w-8 lg:h-8 text-white/10" />}
                                        </div>
                                    </div>

                                    {/* Server Node */}
                                    <div className="flex flex-col items-center gap-4 lg:gap-6">
                                        <div className={cn(
                                            "w-20 h-20 lg:w-32 lg:h-32 rounded-[2rem] lg:rounded-[2.5rem] border transition-all duration-700 flex items-center justify-center relative shadow-2xl",
                                            showAttack && !isSecure && placedSecurity === false ? "bg-red-500/20 border-red-500/50 scale-110" : "bg-white/5 border-white/10"
                                        )}>
                                            <Server className={cn(
                                                "w-10 h-10 lg:w-12 lg:h-12 transition-colors",
                                                showAttack && !isSecure && placedSecurity === false ? "text-red-500" : "text-white/40"
                                            )} />
                                            <div className="absolute -bottom-8 lg:-bottom-10 whitespace-nowrap text-[8px] lg:text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Target Server</div>

                                            {/* Health Bar */}
                                            <div className="absolute -top-10 lg:-top-12 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className={cn("h-full transition-all duration-1000", isSecure ? "bg-primary w-full" : showAttack ? "bg-red-500 w-0" : "bg-primary w-full")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Overlay */}
                                {showAttack && (
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center animate-fade-in-up">
                                        {isSecure ? (
                                            <div className="bg-primary/20 border border-primary text-primary px-8 py-4 rounded-2xl backdrop-blur-xl">
                                                <span className="block text-2xl font-black uppercase tracking-widest mb-1">Threat Mitigated</span>
                                                <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-80">Security Protocol Successful</span>
                                            </div>
                                        ) : placedSecurity === false && showAttack ? (
                                            <div className="bg-red-500/20 border border-red-500 text-red-500 px-8 py-4 rounded-2xl backdrop-blur-xl">
                                                <span className="block text-2xl font-black uppercase tracking-widest mb-1">Server Breached</span>
                                                <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-80">Infrastructure compromised</span>
                                            </div>
                                        ) : null}
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default CodingLearningHub;
