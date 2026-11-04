/**
 * Blog content types.
 *
 * Kept in a standalone module so client components can import the types
 * without pulling the full article dataset into the browser bundle.
 */

export type BlogAuthor = {
    name: string;
    role: string;
    bio: string;
    avatar: string;
    profileUrl: string;
    sameAs: string[];
};

export type BlogSection = {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
};

export type BlogStat = {
    label: string;
    value: string;
};

export type BlogFaq = {
    question: string;
    answer: string;
};

/** Author fields needed to render a byline, without the long biography. */
export type BlogSummaryAuthor = Pick<
    BlogAuthor,
    'name' | 'role' | 'avatar' | 'profileUrl' | 'sameAs'
>;

/** Lightweight shape used by cards, filters and the homepage journal section. */
export type BlogSummary = {
    slug: string;
    title: string;
    subtitle: string;
    excerpt: string;
    metaDescription: string;
    category: string;
    date: string;
    updated: string;
    author: BlogSummaryAuthor;
    image: string;
    imageAlt: string;
    /** 1200×630 social preview image. */
    ogImage: string;
    tags: string[];
    readingTime: number;
    featured: boolean;
    serviceSlug: string;
    serviceTitle: string;
};

/** Full article shape, including the body. Server components only. */
export type BlogPost = BlogSummary & {
    author: BlogAuthor;
    serviceBlurb: string;
    stats: BlogStat[];
    takeaways: string[];
    sections: BlogSection[];
    faqs: BlogFaq[];
};
