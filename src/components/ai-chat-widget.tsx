'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowUp, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_KNOWLEDGE } from '@/lib/site-knowledge';
import { useScrollLock } from '@/hooks/use-scroll-lock';

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

const WELCOME: ChatMessage = {
    role: 'assistant',
    content: "Hey! I'm Delvare's AI assistant. Ask me anything about our services, products like ECBills.in or Blendly.sbs, pricing, or the team.",
};

const PLANNING_LINE =
    /^(?:we\s+(?:need|should|must|have)\b|i\s+(?:need|should|will|must)\b|i'll\b|let me\b|make sure\b|ensure\b|keep (?:it|every|replies)\b|under ~?\d+ words\b|use markdown\b|use \d|\d-\d emojis?\b|already prepared\b|we have that\b|no preamble\b|the user\b|user says\b|provide (?:the )?final answer\b|respond concisely\b)[^\n]*$/i;

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

    // Cut everything up to and including a "final answer" hand-off marker
    const marker = /\bfinal answer\b\s*[:.\-—!]*/gi;
    const matches = Array.from(out.matchAll(marker));
    const last = matches[matches.length - 1];
    if (last && typeof last.index === 'number' && last.index <= 600) {
        out = out.slice(last.index + last[0].length);
    }

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

const AIChatWidget = () => {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [arrived, setArrived] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 300);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    useScrollLock(open);

    const openChat = () => setOpen(true);
    const closeChat = useCallback(() => {
        setArrived(false);
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

        const history: ChatMessage[] = [...messages, { role: 'user', content: clean }];
        setMessages(history);
        setInput('');
        setLoading(true);

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
                body: JSON.stringify({
                    name: 'delvare-ai',
                    message: clean,
                    system: SITE_KNOWLEDGE + transcript ,
                    context: SITE_KNOWLEDGE,
                    messages: [
                        { role: 'user', content: SITE_KNOWLEDGE },
                        ...history.map(m => ({ role: m.role, content: m.content })),
                    ],
                }),
            });
            const raw = await res.text();
            const reply = res.ok ? extractReply(raw) : '';
            if (!reply) {
                let serverError = '';
                try {
                    const parsed = JSON.parse(raw);
                    if (typeof parsed?.error === 'string') serverError = parsed.error;
                } catch {
                    serverError = raw.slice(0, 140);
                }
                console.error('[ai-chat]', serverError || `HTTP ${res.status}`);
                throw new Error(serverError || `Request failed (${res.status})`);
            }
            console.log("reply ", reply)
            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        } catch (err) {
            console.error('[ai-chat]', err);
            setMessages(prev => [
                ...prev,
                {
                    role: 'assistant',
                    content: "Hmm, I guess our AI service are Snoozed Zzzz!",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    if (!mounted || pathname?.startsWith('/admin')) return null;

    return (
        <>
            {/* Floating orb (closed) */}
            {!open && (
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
            )}

            <AnimatePresence>
                {open && (
                    <>
                        {/* Darkened + blurred backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            onClick={closeChat}
                            className="fixed inset-0 z-[105] bg-black/70 backdrop-blur-xl"
                        />

                        {/* Flying orb -> X at top */}
                        <motion.button
                            key="orb-open"
                            onClick={closeChat}
                            aria-label="Close chat"
                            initial={{ top: (typeof window !== 'undefined' ? window.innerHeight : 800) - 96, right: 32 }}
                            animate={{ top: 24, right: 32 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{ type: 'spring', stiffness: 130, damping: 19 }}
                            onAnimationComplete={() => setArrived(true)}
                            className="fixed z-[110] flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-2xl cursor-pointer"
                        >
                            <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                            <div className="relative w-full h-full flex items-center justify-center">
                                <motion.img
                                    src="/assets/arrow.png"
                                    alt=""
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 180, opacity: arrived ? 0 : 1 }}
                                    transition={{ rotate: { type: 'spring', stiffness: 130, damping: 19 }, opacity: { duration: 0.25 } }}
                                    className="absolute w-9 h-9 object-contain"
                                />
                                <X className={cn(
                                    'absolute w-7 h-7 text-black transition-all duration-300',
                                    arrived ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'
                                )} />
                            </div>
                        </motion.button>

                        {/* Fullscreen chat interface */}
                        <motion.div
                            key="panel"
                            initial={{ opacity: 0, y: 48 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 24 }}
                            transition={{ delay: 0.35, duration: 0.45, ease: 'easeOut' }}
                            className="fixed inset-0 z-[106] pt-28 pb-6 px-4 flex justify-center pointer-events-none"
                        >
                            <span className="absolute top-10 left-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 select-none">
                                Delvare · AI Assistant
                            </span>
                            <div className="pointer-events-auto w-full max-w-2xl h-full flex flex-col">
                                {/* Scrollable chat bubbles */}
                                <div
                                    ref={scrollRef}
                                    data-lenis-prevent
                                    className="flex-1 overflow-y-auto overscroll-contain space-y-4 px-1 pb-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
                                >
                                    <AnimatePresence initial={false}>
                                        {messages.map((msg, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                                className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                                            >
                                                {msg.role === 'assistant' && (
                                                    <span className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 mr-3 mt-1 self-start">
                                                        <Sparkles className="w-3.5 h-3.5 text-primary" />
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
                                                        <MarkdownContent content={msg.content} />
                                                    ) : (
                                                        msg.content
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    {loading && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                            <span className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 mr-3 mt-1 self-start">
                                                <Sparkles className="w-3.5 h-3.5 text-primary" />
                                            </span>
                                            <div className="bg-primary text-white rounded-3xl rounded-tl-md px-5 py-4 shadow-lg flex items-center gap-1.5">
                                                {[0, 1, 2].map(d => (
                                                    <span
                                                        key={d}
                                                        className="w-1.5 h-1.5 rounded-full bg-white/90 animate-bounce"
                                                        style={{ animationDelay: `${d * 150}ms` }}
                                                    />
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Suggestion prompts */}
                                <div data-lenis-prevent className="flex gap-2 overflow-x-auto overscroll-x-contain pb-3 pt-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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

                                {/* Input + send */}
                                <form
                                    onSubmit={(e) => { e.preventDefault(); send(input); }}
                                    className="flex items-center gap-3 bg-white/10 border border-white/15 backdrop-blur-md rounded-full pl-6 pr-2 py-2 focus-within:border-primary/60 transition-colors"
                                >
                                    <input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask ..."
                                        className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-sm font-medium min-w-0"
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
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatWidget;
