'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowUp, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_KNOWLEDGE } from '@/lib/site-knowledge';
import { useScrollLock } from '@/hooks/use-scroll-lock';

const TEASER_DISMISSED_KEY = 'delvare-ai-teaser-dismissed';
const TEASER_DELAY_MS = 3500;

type ChatMessage = {
    role: 'user' | 'assistant';
    content: string;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const SUGGESTIONS = [
    'What services do you offer?',
    'Tell me about ECBills.in',
    'What is Blendly.sbs?',
    'Who founded Delvare?',
    'How do I contact you?',
];

const HOOK_MESSAGES: string[] = [
    "Hey! I'm Delvare's AI assistant. Ask me anything — services, products like ECBills.in or Blendly.sbs, pricing, or the team.",
    "Hi there! 👋 Want to know what we can build for your business? Just ask.",
    "Hello! Curious about our starting prices? Tap a question below and I'll break it down.",
    "Hey! I know all about our SEO, cloud, AI and cybersecurity work. What would you like to explore?",
    "Welcome! Ask me about Delvare's services — or tap one of the quick questions below.",
    "Hi! Looking for custom software, automation or a security audit? I can point you the right way.",
    "Hey! Wondering who's behind Delvare or what we've shipped? Go ahead, ask me.",
    "Hello! Need help picking the right service for your project? I'm great at that — try me.",
    "Hi! Ask me anything about our platforms — ECBills.in for retail or Blendly.sbs for book lovers.",
    "Hey! From billing systems to AI ecosystems — ask me what fits your business best.",
];

const THINKING_STATUSES = [
    'Thinking …',
    'Processing …',
    'Analyzing your question…',
    'Double checking …',
    'Composing response …',
];

const TYPE_INTERVAL_MS = 55;
const TYPE_MIN_CHARS_PER_TICK = 2;
const TYPE_CATCH_UP_DIVISOR = 20;

const PLANNING_LINE =
    /^(?:we\s+(?:need|should|must|have)\b|i\s+(?:need|should|will|must)\b|i'll\b|let'?s\b|let us\b|make sure\b|ensure\b|keep (?:it|every|replies)\b|under ~?\d+ words\b|use markdown\b|use \d|\d-\d emojis?\b|emojis? count\b|word count\b|recount\b|check words\b|exceeding\b|must reduce\b|already prepared\b|we have that\b|no preamble\b|the user\b|user says\b|according to\b|provide (?:the )?final answer\b|respond concisely\b)[^\n]*$/i;

const HANDOFF_CUE = /\b(?:let'?s\s+(?:output|craft|produce|write|finalize|answer|go)|provide\s+(?:the\s+)?final\s+answer|final\s+answer)\b\s*[:.!]*/gi;

const stripPlanningLines = (text: string): string => {
    const lines = text.split('\n');
    let i = 0;
    while (i < lines.length) {
        const t = lines[i].trim();
        if (!t || PLANNING_LINE.test(t)) {
            i++;
            continue;
        }
        break;
    }
    return lines.slice(i).join('\n').trim();
};

const stripMeta = (text: string): string => {
    let out = text
        .replace(/<think>[\s\S]*?<\/think>/gi, '')
        .replace(/^\s*(?:analysis|reasoning|thinking)\s*[:\-]\s*/i, '');

    const cues = Array.from(out.matchAll(HANDOFF_CUE)).filter(c => (c.index ?? 0) <= 800);
    const last = cues[cues.length - 1];
    if (last && typeof last.index === 'number') {
        out = out.slice(last.index + last[0].length);
    }

    out = out
        .split('\n')
        .filter(line => !/[A-Za-z&]\(\d{1,4}\)/.test(line))
        .join('\n');

    return stripPlanningLines(out);
};

const extractReply = (raw: string): string => {
    try {
        const data = JSON.parse(raw);
        if (typeof data === 'string') return stripMeta(data);
        const candidates = [
            data.reply,
            data.response,
            data.answer,
            typeof data.output === 'string' ? data.output : undefined,
            data.result,
            data.content,
            data.message?.content,
            typeof data.message === 'string' ? data.message : undefined,
            data.text,
            data.data?.reply,
            data.data?.response,
            data.choices?.[0]?.message?.content,
            data.choices?.[0]?.text,
            data.candidates?.[0]?.content?.parts?.[0]?.text,
        ];
        for (const c of candidates) {
            if (typeof c === 'string' && c.trim()) {
                const cleaned = stripMeta(c);
                if (cleaned) return cleaned;
            }
        }
        return '';
    } catch {
        return raw.trim().startsWith('{') ? '' : stripMeta(raw);
    }
};

const consumeStream = async (
    res: Response,
    onDelta: (text: string) => void
): Promise<{ ok: boolean; error?: string }> => {
    const contentType = res.headers.get('content-type') ?? '';

    if (!res.body || contentType.includes('application/json')) {
        const raw = await res.text();
        if (!res.ok) {
            let serverError = raw.slice(0, 140);
            try {
                const parsed = JSON.parse(raw);
                if (typeof parsed?.error === 'string') serverError = parsed.error;
            } catch { /* keep raw */ }
            return { ok: false, error: serverError };
        }
        const reply = extractReply(raw);
        if (!reply) return { ok: false, error: 'AI returned an empty response' };
        onDelta(reply);
        return { ok: true };
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let streamError: string | undefined;

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let sep: number;
        while ((sep = buffer.indexOf('\n\n')) >= 0) {
            const frame = buffer.slice(0, sep);
            buffer = buffer.slice(sep + 2);

            for (const line of frame.split('\n')) {
                if (!line.startsWith('data:')) continue;
                let evt: any = null;
                try {
                    evt = JSON.parse(line.slice(5).trim());
                } catch {
                    continue;
                }

                switch (evt?.type) {
                    case 'delta':
                        if (typeof evt.text === 'string') onDelta(evt.text);
                        break;
                    case 'error':
                        streamError = typeof evt.error === 'string' ? evt.error : 'AI request failed';
                        break;
                    case 'done':
                    case 'start':
                    default:
                        break;
                }
            }
        }
    }

    return { ok: !streamError, error: streamError };
};

const MarkdownContent = ({ content }: { content: string }) => (
    <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            strong: ({ children }) => <strong className="font-black">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            ul: ({ children }) => <ul className="list-disc pl-4 my-2 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-4 my-2 space-y-1">{children}</ol>,
            li: ({ children }) => <li className="leading-relaxed marker:text-white/70">{children}</li>,
            a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-black/70 transition-colors">
                    {children}
                </a>
            ),
            table: ({ children }) => (
                <div className="overflow-x-auto my-3 rounded-xl border border-white/30">
                    <table className="w-full text-[11px] border-collapse text-left">{children}</table>
                </div>
            ),
            th: ({ children }) => (
                <th className="bg-black/10 px-2.5 py-1.5 font-black uppercase tracking-wide border-b border-white/30 first:pl-3 last:pr-3">
                    {children}
                </th>
            ),
            td: ({ children }) => (
                <td className="px-2.5 py-1.5 align-top border-t border-white/20 first:pl-3 last:pr-3">
                    {children}
                </td>
            ),
            code: ({ children }) => (
                <code className="bg-black/15 rounded px-1 py-0.5 text-[11px] font-bold">{children}</code>
            ),
            blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-white/40 pl-3 my-2 italic opacity-90">{children}</blockquote>
            ),
        }}
    >
        {content}
    </ReactMarkdown>
);

const pickHook = () =>
    HOOK_MESSAGES[Math.floor(Math.random() * HOOK_MESSAGES.length)];

const AIChatWidget = () => {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [hook] = useState(pickHook);
    const [messages, setMessages] = useState<ChatMessage[]>(() => [{ role: 'assistant', content: hook }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [teaserVisible, setTeaserVisible] = useState(false);
    const [statusIdx, setStatusIdx] = useState(0);

    const scrollRef = useRef<HTMLDivElement>(null);
    const abortRef = useRef<AbortController | null>(null);
    const cancelledRef = useRef(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 300);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const lastRole = messages[messages.length - 1]?.role;
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        if (lastRole === 'user' || distanceFromBottom < 140) {
            el.scrollTop = el.scrollHeight;
        }
    }, [messages, loading, lastRole]);

    const lastMessage = messages[messages.length - 1];
    const waitingForReply = loading && lastMessage?.role === 'assistant' && lastMessage.content === '';

    useEffect(() => {
        if (!waitingForReply) return;
        const id = setInterval(() => setStatusIdx(i => i + 1), 900);
        return () => clearInterval(id);
    }, [waitingForReply]);

    useEffect(() => () => abortRef.current?.abort(), []);

    useEffect(() => {
        let dismissed = false;
        try {
            dismissed = sessionStorage.getItem(TEASER_DISMISSED_KEY) === '1';
        } catch { /* storage unavailable */ }
        if (dismissed) return;

        const id = setTimeout(() => setTeaserVisible(true), TEASER_DELAY_MS);
        return () => clearTimeout(id);
    }, []);

    useScrollLock(open);

    const dismissTeaser = useCallback(() => {
        setTeaserVisible(false);
        try {
            sessionStorage.setItem(TEASER_DISMISSED_KEY, '1');
        } catch { /* storage unavailable */ }
    }, []);

    const openChat = () => {
        dismissTeaser();
        setOpen(true);
    };
    const closeChat = useCallback(() => {
        cancelledRef.current = true;
        abortRef.current?.abort();
        setOpen(false);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeChat();
        };
        if (open) window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, closeChat]);

    const send = async (text: string) => {
        const clean = text.trim();
        if (!clean || loading) return;

        cancelledRef.current = false;
        const controller = new AbortController();
        abortRef.current = controller;

        const history: ChatMessage[] = [...messages, { role: 'user', content: clean }];
        setMessages([...history, { role: 'assistant', content: '' }]);
        setInput('');
        setLoading(true);
        setStatusIdx(0);

        let received = '';
        let revealCount = 0;
        let inferenceDone = false;
        let failed = false;
        let errorMessage = '';

        const finishTyping = () => {
            const finalText =
                received.trim()
                    ? (stripMeta(received).trim() || received.trim())
                    : '';

            setLoading(false);

            if (!finalText && failed) {
                console.error('[ai-chat]', errorMessage || 'stream failed');
            }

            setMessages(prev => {
                const next = [...prev];
                next[next.length - 1] = {
                    role: 'assistant',
                    content:
                        finalText ||
                        'Hmm, I guess our AI service are Snoozed Zzzz!',
                };
                return next;
            });
        };

        const updateLastAssistant = (content: string) => {
            setMessages(prev => {
                const next = [...prev];
                next[next.length - 1] = { role: 'assistant', content };
                return next;
            });
        };

        const typer = setInterval(() => {
            const backlog = received.length - revealCount;
            if (backlog > 0) {
                revealCount += Math.max(TYPE_MIN_CHARS_PER_TICK, Math.ceil(backlog / TYPE_CATCH_UP_DIVISOR));
                if (revealCount > received.length) revealCount = received.length;
                updateLastAssistant(received.slice(0, revealCount));
            } else if (inferenceDone || failed) {
                clearInterval(typer);
                finishTyping();
            }
        }, TYPE_INTERVAL_MS);

        const priorTurns = history.slice(0, -1).slice(-12);
        const transcript = priorTurns.length
            ? '\n\nCONVERSATION SO FAR (use for context):\n' +
              priorTurns.map(m => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`).join('\n')
            : '';

        try {
            const res = await fetch(`${SUPABASE_URL}/functions/v1/ai-chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${SUPABASE_KEY}`,
                    apikey: SUPABASE_KEY as string,
                },
                signal: controller.signal,
                body: JSON.stringify({
                    name: 'delvare-ai',
                    message: clean,
                    system: SITE_KNOWLEDGE + transcript,
                    context: SITE_KNOWLEDGE,
                    messages: [
                        { role: 'user', content: SITE_KNOWLEDGE },
                        ...history.map(m => ({ role: m.role, content: m.content })),
                    ],
                }),
            });

            const result = await consumeStream(res, chunk => {
                received += chunk;
            });

            if (cancelledRef.current) return;

            if (!result.ok || !received.trim()) {
                failed = true;
                errorMessage = result.error ?? `Request failed (${res.status})`;
            }
        } catch (err: any) {
            if (cancelledRef.current || err?.name === 'AbortError') return;
            failed = true;
            errorMessage = err?.message ?? 'AI request failed';
        } finally {
            if (cancelledRef.current) {
                clearInterval(typer);
                setLoading(false);
            } else {
                inferenceDone = true;
            }
        }
    };

    if (!mounted || pathname?.startsWith('/admin')) return null;

    const currentStatus = THINKING_STATUSES[statusIdx % THINKING_STATUSES.length];

    return (
        <>
            {/* Floating orb (closed) */}
            {!open && (
                <>
                    <AnimatePresence>
                        {teaserVisible && scrolled && (
                            <motion.div
                                key="teaser"
                                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.92 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                                className="fixed bottom-10 right-28 z-[100] max-w-[250px] sm:max-w-[280px] cursor-pointer"
                                onClick={openChat}
                                role="button"
                                aria-label="Open chat with Delvare AI"
                            >
                                <div className="relative bg-white rounded-3xl rounded-br-md shadow-2xl border border-border px-4 py-3">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); dismissTeaser(); }}
                                        aria-label="Dismiss message"
                                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-dark text-white flex items-center justify-center shadow-md hover:bg-primary hover:text-black transition-colors cursor-pointer"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                    <p className="text-xs font-bold leading-relaxed text-brand-dark pr-1">
                                        {hook}
                                    </p>
                                    <span className="mt-2 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-primary">
                                        Tap to chat
                                        <ArrowUp className="w-3 h-3 rotate-45" />
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={openChat}
                        aria-label="Ask Delvare AI"
                        className={cn(
                            'fixed bottom-8 right-8 z-[100] group flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-2xl border border-border transition-all duration-500 hover:scale-110 active:scale-95 cursor-pointer',
                            scrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
                        )}
                    >
                        <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                        <img src="/assets/arrow.png" alt="" className="relative w-9 h-9 object-contain" />
                        <span className="absolute right-20 bg-white text-brand-dark text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg shadow-xl border border-border opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                            Ask AI
                        </span>
                    </button>
                </>
            )}

            {/* Fullscreen chat — orb expands to fill viewport */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="chat-fullscreen"
                        initial={{ borderRadius: '50%', width: 64, height: 64, bottom: 32, right: 32, top: 'auto', left: 'auto', opacity: 1 }}
                        animate={{ borderRadius: 0, width: '100vw', height: '100vh', bottom: 0, right: 0, top: 0, left: 0, opacity: 1 }}
                        exit={{ borderRadius: '50%', width: 64, height: 64, bottom: 32, right: 32, top: 'auto', left: 'auto', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 0.8 }}
                        className="fixed z-[200] bg-[#0a0a0a] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 select-none">
                                Delvare · AI Assistant
                            </span>
                            <button
                                onClick={closeChat}
                                aria-label="Close chat"
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat bubbles */}
                        <div
                            ref={scrollRef}
                            data-lenis-prevent
                            className="flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-4 px-4 sm:px-6 py-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
                        >
                            <div className="max-w-2xl lg:max-w-3xl mx-auto space-y-4">
                                <AnimatePresence initial={false}>
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeOut' }}
                                            className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                                        >
                                            {msg.role === 'assistant' && (
                                                <span className="w-8 h-8 rounded-full bg-white border border-black/10 shadow-md flex items-center justify-center shrink-0 mr-3 mt-1 self-start overflow-hidden">
                                                    <img src="/assets/arrow.png" alt="" className="w-[18px] h-[18px] object-contain" />
                                                </span>
                                            )}
                                            <div
                                                className={cn(
                                                    'max-w-[85%] px-5 py-3.5 text-sm leading-relaxed font-medium shadow-lg break-words',
                                                    msg.role === 'assistant'
                                                        ? 'bg-primary text-white rounded-3xl rounded-tl-md'
                                                        : 'bg-white text-black rounded-3xl rounded-tr-md whitespace-pre-wrap'
                                                )}
                                            >
                                                {msg.role === 'assistant' ? (
                                                    i === messages.length - 1 && waitingForReply ? (
                                                        <AnimatePresence mode="wait">
                                                            <motion.span
                                                                key={currentStatus}
                                                                initial={{ opacity: 0, y: 4 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -4 }}
                                                                transition={{ duration: 0.25 }}
                                                                className="flex items-center gap-2 text-[13px] font-bold whitespace-nowrap"
                                                            >
                                                                {currentStatus}
                                                                <span className="flex items-center gap-1">
                                                                    {[0, 1, 2].map(d => (
                                                                        <span
                                                                            key={d}
                                                                            className="w-1.5 h-1.5 rounded-full bg-white/90 animate-bounce"
                                                                            style={{ animationDelay: `${d * 150}ms` }}
                                                                        />
                                                                    ))}
                                                                </span>
                                                            </motion.span>
                                                        </AnimatePresence>
                                                    ) : (
                                                        <MarkdownContent content={i === messages.length - 1 && loading ? `${msg.content}▍` : msg.content} />
                                                    )
                                                ) : (
                                                    msg.content
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Suggestions */}
                        <div data-lenis-prevent className="px-4 sm:px-6">
                            <div className="max-w-2xl lg:max-w-3xl mx-auto">
                                <div className="flex gap-2 overflow-x-auto overscroll-x-contain pb-3 pt-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                    {SUGGESTIONS.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => send(s)}
                                            disabled={loading}
                                            className="shrink-0 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-[11px] font-bold text-white hover:bg-primary hover:text-black hover:border-primary disabled:opacity-40 transition-all duration-300 cursor-pointer"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Input */}
                        <div className="px-4 sm:px-6 pb-6 pt-2 shrink-0">
                            <div className="max-w-2xl lg:max-w-3xl mx-auto">
                                <form
                                    onSubmit={(e) => { e.preventDefault(); send(input); }}
                                    className="flex items-center gap-3 bg-white/10 border border-white/15 backdrop-blur-md rounded-full pl-6 pr-2 py-2 focus-within:border-primary/60 transition-colors"
                                >
                                    <input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask ..."
                                        className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-base font-medium min-w-0"
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        aria-label="Send message"
                                        disabled={!input.trim() || loading}
                                        className="w-11 h-11 shrink-0 rounded-full bg-primary text-black flex items-center justify-center hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 cursor-pointer"
                                    >
                                        <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatWidget;
