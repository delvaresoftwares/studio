import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadBlogs } from './load-blogs.mjs';

/**
 * Generates 1200×630 Open Graph images for every article plus the journal hub.
 *
 * The hero images used inside the site are square (640×640 or 1024×1024), so
 * declaring them as 1200×630 in metadata made every social card crop badly.
 * These cards are designed at the exact size the metadata promises.
 *
 * Run after adding or renaming a post:
 *   npm run gen:og-images
 */

const OUT_DIR = resolve(process.cwd(), 'public/og');
const FONT_BOLD = '/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf';
const FONT_REGULAR = '/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf';

const { blogs } = loadBlogs();

mkdirSync(OUT_DIR, { recursive: true });

function renderCard({ slug, title, category, author = 'Alfas B' }) {
    const out = resolve(OUT_DIR, `${slug}.jpg`);

    execFileSync('convert', [
        '-size', '1200x630',
        'gradient:#07130f-#020403',

        // Ambient brand shapes.
        '-fill', '#0d3d2e',
        '-draw', 'circle 1130,-10 1130,280',
        '-fill', '#0a2b22',
        '-draw', 'circle 1130,-10 1130,190',
        '-fill', '#20c594',
        '-draw', 'rectangle 0,0 1200,8',
        '-draw', 'rectangle 76,96 82,534',

        // Kicker and category.
        '-font', FONT_BOLD,
        '-pointsize', '22',
        '-fill', '#5eead4',
        '-kerning', '6',
        '-annotate', '+126+128', 'DELVARE JOURNAL',
        '-kerning', '2',
        '-pointsize', '18',
        '-fill', '#a7f3d0',
        '-annotate', '+126+166', category.toUpperCase(),

        // Headline. caption: wraps automatically inside the 900px column.
        '(', '-background', 'none',
        '-font', FONT_BOLD,
        '-pointsize', '58',
        '-interline-spacing', '8',
        '-fill', '#ffffff',
        '-size', '900x',
        '-gravity', 'northwest',
        `caption:${title}`,
        ')',
        '-gravity', 'northwest',
        '-geometry', '+126+214',
        '-composite',

        // Footer.
        '-font', FONT_REGULAR,
        '-pointsize', '22',
        '-fill', '#94a3b8',
        '-annotate', '+126+556', `${author}  ·  Delvare Journal`,
        '-font', FONT_BOLD,
        '-fill', '#5eead4',
        '-pointsize', '22',
        '-annotate', '+930+556', 'delvare.in',

        '-strip',
        '-quality', '88',
        out,
    ]);

    return out;
}

const generated = [
    ...blogs.map((post) => renderCard(post)),
    renderCard({
        slug: 'delvare-journal',
        title: 'Engineering insights for people who ship.',
        category: 'Software · AI · Cloud · Growth',
        author: 'Delvare',
    }),
];

for (const file of generated) {
    console.log(`wrote ${file}`);
}
