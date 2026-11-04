import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { loadBlogs, loadTsModule } from './load-blogs.mjs';

/**
 * Build-time content validation for the journal.
 *
 * Catches the mistakes that are easy to make when publishing:
 * duplicate slugs, broken dates, over-long meta descriptions, missing images,
 * malformed sections and links to services that no longer exist. Runs from
 * `prebuild`, so a bad post cannot reach production.
 */

const { blogs } = loadBlogs();
const { specialties } = loadTsModule('src/lib/specialties-data.ts');
const serviceSlugs = new Set(specialties.map((service) => service.slug));
const publicFile = (path) => resolve(process.cwd(), 'public', `.${path}`);

const errors = [];
const warnings = [];

const add = (condition, message) => {
    if (!condition) errors.push(message);
};

add(Array.isArray(blogs) && blogs.length > 0, 'blogs must contain at least one post');

const slugs = new Set();
const titles = new Set();

for (const post of blogs) {
    const where = `[${post.slug || 'missing-slug'}]`;

    if (!post.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) {
        errors.push(`${where} slug must be lowercase kebab-case`);
    }
    if (slugs.has(post.slug)) errors.push(`${where} duplicate slug`);
    slugs.add(post.slug);

    if (titles.has(post.title)) errors.push(`${where} duplicate title "${post.title}"`);
    titles.add(post.title);

    add(post.title?.length >= 20 && post.title.length <= 70, `${where} title should be 20–70 characters (got ${post.title?.length})`);
    add(
        post.metaDescription?.length >= 70 && post.metaDescription.length <= 160,
        `${where} metaDescription should be 70–160 characters (got ${post.metaDescription?.length})`
    );
    add(post.excerpt?.length >= 60, `${where} excerpt is too short`);

    for (const field of ['date', 'updated']) {
        const value = post[field];
        const date = new Date(`${value}T00:00:00Z`);
        add(/^\d{4}-\d{2}-\d{2}$/.test(value ?? '') && !Number.isNaN(date.getTime()), `${where} ${field} is not a valid ISO date`);
    }
    add(post.updated >= post.date, `${where} updated date is before the published date`);

    add(Boolean(post.author?.name), `${where} author name is required`);
    add(Boolean(post.author?.role), `${where} author role is required`);
    add(Boolean(post.author?.bio), `${where} author bio is required`);

    for (const asset of [post.image, post.ogImage, post.author?.avatar]) {
        if (!asset) {
            errors.push(`${where} missing asset path`);
            continue;
        }
        const absolute = publicFile(asset);
        add(existsSync(absolute), `${where} asset does not exist: public${asset}`);
    }

    if (post.ogImage && existsSync(publicFile(post.ogImage))) {
        try {
            const geometry = execFileSync('identify', ['-format', '%wx%h', publicFile(post.ogImage)], {
                encoding: 'utf8',
            });
            add(geometry === '1200x630', `${where} ogImage must be 1200x630 (got ${geometry})`);
        } catch {
            warnings.push(`${where} could not verify ogImage dimensions`);
        }
    }

    add(Number.isInteger(post.readingTime) && post.readingTime >= 1 && post.readingTime <= 30, `${where} readingTime should be 1–30 minutes`);
    add(Array.isArray(post.stats) && post.stats.length === 3, `${where} should have exactly 3 stats`);
    add(Array.isArray(post.takeaways) && post.takeaways.length >= 3, `${where} should have at least 3 takeaways`);
    add(Array.isArray(post.sections) && post.sections.length >= 3, `${where} should have at least 3 sections`);
    add(Array.isArray(post.faqs) && post.faqs.length >= 1, `${where} should have at least 1 FAQ`);
    add(Boolean(post.serviceSlug) && serviceSlugs.has(post.serviceSlug), `${where} serviceSlug does not match a specialty: ${post.serviceSlug}`);

    for (const section of post.sections ?? []) {
        add(Boolean(section.heading), `${where} a section is missing a heading`);
        add(Array.isArray(section.paragraphs) && section.paragraphs.length > 0, `${where} section "${section.heading}" has no paragraphs`);
    }
}

const featured = blogs.filter((post) => post.featured);
add(featured.length === 1, `exactly one post must be featured (found ${featured.length})`);

if (warnings.length) {
    for (const warning of warnings) console.warn(`warning: ${warning}`);
}

if (errors.length) {
    for (const error of errors) console.error(`error: ${error}`);
    process.exit(1);
}

console.log(`blog validation passed (${blogs.length} posts)`);
