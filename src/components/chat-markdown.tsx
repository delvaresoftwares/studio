'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Markdown renderer for chat replies, split out so `react-markdown` +
 * `remark-gfm` (and the micromark parser chain) live in their own async chunk.
 *
 * The chat widget is mounted in the root layout, so importing the renderer
 * directly pulled the whole markdown pipeline into the chunk every page loads.
 * Loading it through `next/dynamic` means it is only fetched once a message
 * actually needs rendering.
 */
const ChatMarkdown = ({ content }: { content: string }) => (
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

export default ChatMarkdown;