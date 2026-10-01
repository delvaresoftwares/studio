import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Regenerates src/lib/footer-services.ts from src/lib/specialties-data.ts.
 *
 * The footer is a client component mounted on every route, but it only needs
 * `slug` and `title` from the ~39 KB specialties dataset. Importing the dataset
 * shipped all of it to the browser for six links, so this writes out just the
 * slice the footer renders.
 *
 * Run after editing src/lib/specialties-data.ts:
 *   npm run gen:footer-services
 *   npm run check:footer-services   (CI guard; exits 1 if stale)
 *
 * Parses the source text rather than importing it so the script runs on plain
 * Node with no TypeScript loader installed.
 */

const SRC = resolve(process.cwd(), 'src/lib/specialties-data.ts');
const OUT = resolve(process.cwd(), 'src/lib/footer-services.ts');
const PRODUCT_SLUGS = ['ecbills', 'blendly'];

const source = readFileSync(SRC, 'utf8');

const services = [...source.matchAll(/^\s*slug:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]*)",/gm)]
    .map(([, slug, title]) => ({ slug, title }))
    .filter(({ slug }) => !PRODUCT_SLUGS.includes(slug))
    .slice(0, 6);

if (services.length === 0) {
    console.error('No specialties matched the slug/title pattern — aborting.');
    process.exit(1);
}

const body = `/**
 * GENERATED FILE — do not edit by hand.
 * Run \`npm run gen:footer-services\` after editing src/lib/specialties-data.ts.
 *
 * The six service links rendered in the site footer. specialties-data.ts is
 * ~39 KB of long-form service copy, but the footer only needs slug and title
 * from it. Because the footer is a client component mounted on every route,
 * importing the dataset there shipped the whole module to the browser for six
 * links. This mirrors only the slice the footer renders.
 */
export type FooterService = { slug: string; title: string };

export const footerServices: FooterService[] = ${JSON.stringify(services, null, 4)};
`;

const current = (() => { try { return readFileSync(OUT, 'utf8'); } catch { return ''; } })();

if (process.argv.includes('--check')) {
    if (current !== body) {
        console.error('footer-services.ts is out of date with specialties-data.ts.');
        console.error('Run: npm run gen:footer-services');
        process.exit(1);
    }
    console.log(`footer-services.ts is in sync (${services.length} services).`);
} else {
    writeFileSync(OUT, body);
    console.log(`Wrote ${services.length} footer services to src/lib/footer-services.ts`);
}