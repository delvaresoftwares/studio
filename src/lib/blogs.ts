/**
 * Blog content source.
 *
 * Posts are plain, typed data — the same pattern used by
 * `specialties-data.ts` and the products section. To publish a new article,
 * add an entry to `blogs`; the index page, sitemap, RSS-free structured data,
 * related posts and author cards all derive from this file.
 *
 * Add the full article body under `sections` instead of a raw HTML string so
 * every heading, paragraph and list is rendered with the site's typography and
 * can never silently lose its structure.
 */

import type { BlogAuthor, BlogPost } from './blog-types';

export type {
    BlogAuthor,
    BlogFaq,
    BlogPost,
    BlogSection,
    BlogStat,
    BlogSummary,
} from './blog-types';

const ALFAS_B: BlogAuthor = {
    name: 'Alfas B',
    role: 'Founder & CEO, Delvare',
    bio: 'Alfas builds and ships custom software, cloud infrastructure and AI automation for international clients. He leads product, engineering and strategy at Delvare — and writes about the decisions behind the work.',
    avatar: '/assets/avatar.webp',
    profileUrl: '/founder',
    sameAs: [
        'https://github.com/living-tuna',
        'https://in.linkedin.com/in/alfas-b-717054222',
    ],
};

export const blogs: BlogPost[] = [
    {
        slug: 'ai-for-business-growth',
        title: 'How AI Is Changing Small Businesses in 2026',
        subtitle: 'Less hype, more margin: the four places AI pays for itself first.',
        excerpt:
            'AI is no longer a big-company advantage. Here is where small teams are using it to save hours, answer customers faster and make better decisions — with realistic numbers and a rollout plan that does not stall.',
        metaDescription:
            'Where AI actually pays off for small businesses in 2026 — realistic workflows, payback times and a four-week rollout plan that reaches production.',
        category: 'AI Automation',
        date: '2026-10-28',
        updated: '2026-11-02',
        author: ALFAS_B,
        image: '/assets/blog_ai_business_1772616812117.webp',
        imageAlt: 'Abstract visual representing AI automation in a small business',
        ogImage: '/og/ai-for-business-growth.jpg',
        tags: ['AI', 'Automation', 'Growth', 'Small Business'],
        readingTime: 4,
        featured: true,
        serviceSlug: 'ai-ecosystems',
        serviceTitle: 'AI & Process Automation',
        serviceBlurb:
            'We map the repetitive work inside your business, then automate the highest-value steps with human approval where it matters.',
        stats: [
            { label: 'Hours Saved / Week', value: '6–10' },
            { label: 'Typical Payback', value: '4–8 wks' },
            { label: 'Workflows To Start', value: 'One' },
        ],
        takeaways: [
            'Start with one expensive, repetitive workflow — not a company-wide AI strategy.',
            'Measure hours and response time before you automate, or you cannot prove the gain.',
            'Keep a human approval step on anything that touches money, contracts or customers.',
            'Clean, structured data matters more than which model you choose.',
        ],
        sections: [
            {
                heading: 'The shift: AI moved from demo to daily work',
                paragraphs: [
                    'For the last two years, most small businesses have seen AI as a demo: a chatbot that writes emails, an image generator, a clever assistant that occasionally invents a fact. In 2026 the useful shift is quieter. AI is being embedded into specific steps of real workflows — reading supplier invoices, drafting first replies, summarizing support threads, flagging unusual orders — and those steps now run every day without anyone opening a chat window.',
                    'The businesses getting value are not the ones with the largest AI budget. They are the ones that picked a narrow, repetitive process, measured how long it took, and automated only that. The result is usually unglamorous: four hours a week returned to a finance manager, or support replies that go out in minutes instead of hours.',
                ],
            },
            {
                heading: 'Where it pays for itself first',
                paragraphs: [
                    'Across the projects we build, the same four areas consistently show a fast, defensible return. They share two traits: the work is repetitive, and success is easy to measure.',
                ],
                bullets: [
                    'Document processing — invoices, purchase orders, forms and contracts read and filed automatically, with low-confidence items sent to a person.',
                    'Inbox and inquiry triage — incoming messages classified, routed and drafted against your own service information instead of a generic script.',
                    'Customer support — an assistant trained strictly on your policies, pricing and product docs, with a clean handover to a human when it is unsure.',
                    'Reporting — daily or weekly numbers pulled from the tools you already use, summarized in plain language before a meeting.',
                ],
            },
            {
                heading: 'A realistic four-week rollout',
                paragraphs: [
                    'The failure mode is a six-month “AI transformation” that never reaches production. A smaller sequence works better, because each week ends with something you can measure.',
                ],
                bullets: [
                    'Week 1 — Pick one workflow and write down the current cost: minutes per item, items per week, error rate and who fixes mistakes.',
                    'Week 2 — Connect the data sources and build the smallest working version, even if a human still performs the final step.',
                    'Week 3 — Run it in parallel with the old process. Compare speed, accuracy and exceptions. Do not remove the old process yet.',
                    'Week 4 — Put a confidence threshold and approval step in place, document what happens when the model is wrong, then switch over.',
                ],
            },
            {
                heading: 'The mistakes that make AI expensive',
                paragraphs: [
                    'Most failed pilots we are asked to rescue made the same handful of mistakes. None of them were about model quality.',
                ],
                bullets: [
                    'Automating a process nobody has defined. If two people do the task differently, AI will scale the inconsistency.',
                    'Skipping the measurement baseline, then arguing about whether the result “feels faster”.',
                    'Giving a model access to everything because integration is easier than access control.',
                    'Removing the human review step before the exception rate is understood.',
                    'Choosing a tool first and looking for a problem second.',
                ],
            },
            {
                heading: 'How to measure whether it worked',
                paragraphs: [
                    'Use the same three numbers before and after: time per item, exception rate and turnaround time. Add a fourth for customer-facing work: first-response time. If those improve and the quality of the output holds, the project paid for itself. If only the demo looks impressive, it did not.',
                    'AI is now a practical operating lever for small teams, but it rewards discipline more than enthusiasm. One measured workflow, a clear owner and a human checkpoint will beat a sprawling pilot every time.',
                ],
            },
        ],
        faqs: [
            {
                question: 'Do we need a large dataset before we start using AI?',
                answer:
                    'No. Most useful first projects work with the documents, messages and spreadsheets you already have. What matters is that the data is accessible and reasonably consistent. If it is not, cleaning that one workflow is the first project.',
            },
            {
                question: 'Will AI replace our team?',
                answer:
                    'In the workflows we build, it removes the repetitive part of a role, not the role itself. The practical pattern is fewer hours spent copying data, reading routine messages and assembling reports — with people handling exceptions, judgment and relationships.',
            },
            {
                question: 'How do you keep sensitive business data safe?',
                answer:
                    'We limit each integration to the minimum data it needs, keep credentials server-side, log every automated action, and use approval steps for anything financial or contractual. For regulated work we can keep processing inside your own cloud environment.',
            },
            {
                question: 'What does a first AI project usually cost?',
                answer:
                    'A focused first workflow — one integration, one process, human review and monitoring — typically fits inside a four-to-six week engagement. The scope stays deliberately small so you can see a real result before committing to a wider rollout.',
            },
        ],
    },
    {
        slug: 'website-speed-business-impact',
        title: 'Why Website Speed Decides Who Wins in 2026',
        subtitle: 'Every hundred milliseconds is a customer deciding whether to stay.',
        excerpt:
            'Speed is not a technical vanity metric. It changes conversion, ad cost and search visibility at the same time. Here is what actually makes modern sites slow — and the fixes that move Core Web Vitals.',
        metaDescription:
            'Website speed changes conversion, ad cost and search visibility at once. See what makes modern sites slow and the fixes that move Core Web Vitals.',
        category: 'Cloud & Performance',
        date: '2026-09-16',
        updated: '2026-10-21',
        author: ALFAS_B,
        image: '/assets/nanotech_curved_2_1772615432367.webp',
        imageAlt: 'Abstract curved technology visual representing fast cloud infrastructure',
        ogImage: '/og/website-speed-business-impact.jpg',
        tags: ['Cloud', 'Performance', 'Core Web Vitals', 'Hosting'],
        readingTime: 4,
        featured: false,
        serviceSlug: 'cloud-hosting',
        serviceTitle: 'Cloud Infrastructure & Hosting',
        serviceBlurb:
            'We move sites onto fast, monitored cloud infrastructure — global delivery, image pipelines, caching and backups included.',
        stats: [
            { label: 'LCP Target', value: '<2.5s' },
            { label: 'Mobile Share', value: 'Majority' },
            { label: 'Speed + SEO', value: 'Linked' },
        ],
        takeaways: [
            'Measure real users, not just a desktop lab score.',
            'Images and third-party scripts cause most avoidable delay.',
            'Serve from a CDN close to your customers and cache aggressively.',
            'Treat performance as an ongoing budget, not a one-time cleanup.',
        ],
        sections: [
            {
                heading: 'Speed is a revenue metric wearing a technical costume',
                paragraphs: [
                    'When a page takes more than a few seconds to become useful, visitors leave before they ever see the offer. On mobile networks this happens far more often than most owners realize, because the site feels instant on a laptop in the office and slow on a phone in a moving car.',
                    'The cost shows up in three places at once: fewer conversions, higher cost per click because poor experiences depress quality signals, and weaker search visibility when Core Web Vitals are consistently poor. Fixing speed is one of the few changes that improves acquisition and conversion together.',
                ],
            },
            {
                heading: 'What actually makes modern sites slow',
                paragraphs: [
                    'The usual suspect is not the framework. It is the weight and order in which the browser receives work.',
                ],
                bullets: [
                    'Unoptimized images — full-resolution photographs served to a 390px phone, often in the wrong format.',
                    'Third-party scripts — chat widgets, heatmaps, ad pixels and tag managers loading before the content.',
                    'Render-blocking CSS and fonts that delay the first meaningful paint.',
                    'A server far from the customer, adding network round-trips to every request.',
                    'Uncached pages rebuilt on every visit, even when the content has not changed.',
                ],
            },
            {
                heading: 'What good looks like',
                paragraphs: [
                    'A fast site in 2026 is mostly a set of defaults rather than a heroic optimization project. The stack should make the healthy path the easy path.',
                ],
                bullets: [
                    'Responsive images in modern formats, correctly sized, lazy-loaded below the fold and prioritized for the hero.',
                    'A global CDN with static assets cached at the edge and sensible cache headers.',
                    'Server rendering or static generation for content that does not need per-request personalization.',
                    'Third-party scripts deferred, audited quarterly and removed when they earn nothing.',
                    'A performance budget in CI so a heavy dependency cannot quietly ship.',
                ],
            },
            {
                heading: 'A practical 30-day checklist',
                paragraphs: [
                    'If you only do five things this month, do these in order. Each one is measurable before and after.',
                ],
                bullets: [
                    'Run PageSpeed Insights on your three most valuable pages, mobile first, and record LCP, INP and CLS.',
                    'Compress and resize the largest images, then serve them through a CDN image pipeline.',
                    'Move analytics, chat and marketing tags to load after the main content, or remove unused ones.',
                    'Put a CDN in front of the site and verify cache hit ratio.',
                    'Re-measure with field data in Search Console after two weeks, not just the lab score.',
                ],
            },
            {
                heading: 'Measure the experience, not the score',
                paragraphs: [
                    'A perfect lab score on a fast office connection is not proof. Field data from real visitors is. Watch Largest Contentful Paint for loading, Interaction to Next Paint for responsiveness, and Cumulative Layout Shift for visual stability. Track them by device type and by page template, because a fast homepage can hide a slow product page.',
                    'Speed work compounds the same way SEO does: the initial cleanup removes the worst delays, and a small ongoing budget keeps them from returning. The businesses that treat it as a permanent constraint consistently outperform those that run a one-time audit and move on.',
                ],
            },
        ],
        faqs: [
            {
                question: 'How fast should a business website be?',
                answer:
                    'Aim for Largest Contentful Paint under 2.5 seconds, Interaction to Next Paint under 200 milliseconds and Cumulative Layout Shift under 0.1 on real mobile devices. Those are the thresholds Google uses for Core Web Vitals, and they line up well with what visitors tolerate.',
            },
            {
                question: 'Does website speed really affect SEO rankings?',
                answer:
                    'Yes, though it is one signal among many. Page experience and Core Web Vitals influence search visibility, and speed also affects crawl efficiency, bounce rate and conversion. It is rarely the only reason a page ranks — but it is frequently the reason a good page underperforms.',
            },
            {
                question: 'Is shared hosting always too slow?',
                answer:
                    'Not always, but it becomes a ceiling quickly. Shared hosting can work for a small brochure site with low traffic. Once you add dynamic pages, e-commerce, personalization or steady traffic, dedicated cloud infrastructure with caching and a CDN is usually cheaper than the revenue lost to delay.',
            },
            {
                question: 'How long does a performance project take?',
                answer:
                    'A focused cleanup of a typical business site takes two to four weeks, including image work, script cleanup, caching and verification with field data. Larger platforms take longer because every template and integration has to be checked separately.',
            },
        ],
    },
    {
        slug: 'custom-software-cost-2026',
        title: 'What Custom Software Really Costs in 2026',
        subtitle: 'A transparent breakdown of build, launch and ownership.',
        excerpt:
            'Quotes for the same idea can differ by a factor of five. This is what actually drives custom software cost, what good quotes include, and how to keep the budget under control without shipping something you will have to rebuild.',
        metaDescription:
            'What really drives custom software cost in 2026 — scope, integrations and ownership — plus what good quotes include and how to control the budget.',
        category: 'Software Engineering',
        date: '2026-08-05',
        updated: '2026-09-30',
        author: ALFAS_B,
        image: '/assets/services/software.webp',
        imageAlt: 'Custom software engineering illustration',
        ogImage: '/og/custom-software-cost-2026.jpg',
        tags: ['Software', 'Pricing', 'SaaS', 'Product'],
        readingTime: 4,
        featured: false,
        serviceSlug: 'software-engineering',
        serviceTitle: 'Custom Software Engineering',
        serviceBlurb:
            'We design, build and maintain web applications, internal tools and SaaS platforms — scoped so you can see value before the full build.',
        stats: [
            { label: 'Discovery', value: '1–2 wks' },
            { label: 'Usable MVP', value: '6–12 wks' },
            { label: 'Annual Upkeep', value: '15–20%' },
        ],
        takeaways: [
            'Price follows scope, integrations, compliance and uncertainty — not the number of screens.',
            'A paid discovery phase is cheaper than discovering the scope during the build.',
            'Budget for hosting, maintenance and support from day one.',
            'Ship a narrow usable version first; expand only after real usage.',
        ],
        sections: [
            {
                heading: 'Why two quotes for the same idea differ so much',
                paragraphs: [
                    'One supplier quotes a few thousand, another quotes five times that, and both can be sincere. The difference is almost never the hourly rate. It is what each one assumes about scope: how many user roles exist, how many systems must connect, how much of the design is already decided, what happens when something fails, and who is responsible after launch.',
                    'A low quote often describes a demo. A professional quote describes an operated product: authentication, permissions, payments, error handling, backups, monitoring, documentation and a plan for the first year. Comparing the headline number without comparing those assumptions is how projects end up paying twice.',
                ],
            },
            {
                heading: 'The five real cost drivers',
                paragraphs: [
                    'If you want to understand a quote, ask how it treats these five items. They explain most of the variance.',
                ],
                bullets: [
                    'Scope clarity — a defined workflow with agreed edge cases versus a broad idea still being discovered.',
                    'Integrations — every external payment, accounting, messaging or logistics system adds authentication, failure handling and testing.',
                    'Access and compliance — multiple roles, audit trails, data residency or regulated data raise the engineering and review effort.',
                    'Design maturity — a reusable design system is cheaper than inventing every screen; bespoke interaction design costs more.',
                    'Ownership after launch — monitoring, support, security updates and a roadmap are ongoing work, not a one-time deliverable.',
                ],
            },
            {
                heading: 'Realistic ranges, without the fantasy',
                paragraphs: [
                    'Exact numbers depend on the team and the market, but the shape is consistent. A focused marketing site or a small internal tool is a short engagement. A custom web application with a handful of roles and integrations is a mid-sized project. A multi-tenant SaaS platform with billing, onboarding, admin tooling and a public API is a product program, not a task.',
                    'The most useful budgeting question is not “what does an app cost?” but “what is the smallest version that proves the value?” That version is usually one core workflow, one primary user type and one integration. It can be live in weeks rather than quarters, and it teaches you what the next phase should be.',
                ],
            },
            {
                heading: 'What good quotes include — and what they leave out',
                paragraphs: [
                    'A professional quote separates build from run. If everything is bundled into one number, ask what happens in month seven when the server needs an upgrade or a dependency needs a security patch.',
                ],
                bullets: [
                    'Discovery and scope documentation, including what is explicitly out of scope.',
                    'A phased delivery plan with milestones you can test, not one final handover.',
                    'Hosting, database, storage and third-party service costs, stated separately.',
                    'Maintenance, monitoring and support expectations for the first year.',
                    'Source code ownership, documentation and a handover process.',
                ],
            },
            {
                heading: 'How to keep the budget under control',
                paragraphs: [
                    'Control comes from sequencing, not from squeezing the day rate. Build the smallest useful workflow, put it in front of real users, then invest in what they actually use. Reuse proven infrastructure for authentication, payments and email instead of rebuilding commodities. Keep the design system tight so new screens are assembly rather than invention.',
                    'Finally, treat the first release as the start of ownership. Software that is not maintained becomes a liability faster than most businesses expect. A clear annual budget for hosting, updates and improvements is part of the real cost — and the part that protects everything you already spent.',
                ],
            },
        ],
        faqs: [
            {
                question: 'Is custom software more expensive than off-the-shelf tools?',
                answer:
                    'Usually upfront, sometimes cheaper over time. Off-the-shelf is better when your process matches the product and the subscription is affordable. Custom makes sense when the process is your advantage, when integrations are central, or when per-seat pricing grows faster than building and owning the tool.',
            },
            {
                question: 'How long does a custom application take to build?',
                answer:
                    'A focused internal tool can be usable in six to eight weeks. A customer-facing application with several roles and integrations typically takes three to six months. A full SaaS platform is a staged program measured in quarters, with a deliberately narrow first release.',
            },
            {
                question: 'What happens after launch?',
                answer:
                    'Plan for monitoring, security updates, backups, small fixes and a roadmap. A common working budget is 15–20% of the initial build cost per year, depending on how business-critical the system is. This should be agreed before the build starts, not discovered afterwards.',
            },
            {
                question: 'Can you take over a project someone else started?',
                answer:
                    'Yes. We start with a code and infrastructure review, document what exists, identify the highest-risk gaps and give you a staged plan. Rescues are usually more predictable once the unknowns are written down and the first release is scoped tightly.',
            },
        ],
    },
    {
        slug: 'seo-content-that-ranks',
        title: 'SEO Content That Ranks: A Practical Playbook',
        subtitle: 'Search intent, structure and internal links — the parts most sites skip.',
        excerpt:
            'Publishing more posts does not create visibility. This playbook covers how to choose topics, structure pages, connect them to service pages and measure whether the content is actually earning traffic.',
        metaDescription:
            'How to plan SEO content that ranks: choose topics from real demand, match format to intent, structure pages and measure qualified clicks.',
        category: 'SEO & Growth',
        date: '2026-06-24',
        updated: '2026-10-10',
        author: ALFAS_B,
        image: '/assets/services/seo.webp',
        imageAlt: 'SEO and digital infrastructure illustration',
        ogImage: '/og/seo-content-that-ranks.jpg',
        tags: ['SEO', 'Content', 'Strategy', 'Search'],
        readingTime: 4,
        featured: false,
        serviceSlug: 'seo-optimization',
        serviceTitle: 'SEO & Digital Infrastructure',
        serviceBlurb:
            'Technical audits, keyword strategy, structured data and content optimization — measured against real traffic and rankings every month.',
        stats: [
            { label: 'Time To Traction', value: '3–6 mo' },
            { label: 'Hub + Cluster', value: '1 + 8–12' },
            { label: 'Primary Metric', value: 'Qualified clicks' },
        ],
        takeaways: [
            'Choose topics from real search demand, not from what you feel like writing.',
            'Match the format to intent: guide, comparison, pricing or definition.',
            'Give every article one job and one clear next step.',
            'Link posts to service pages and to each other, or they stay orphaned.',
        ],
        sections: [
            {
                heading: 'Start with demand, not with keywords',
                paragraphs: [
                    'A keyword list is not a content strategy. The useful question is what a real buyer is trying to finish when they search. Someone searching “custom software cost” wants a budget range and the factors that change it. Someone searching “best billing software for retail” wants a comparison and a reason to shortlist. The same words can describe different jobs, and the page has to pick one.',
                    'Build the topic list from sales conversations, support questions and search suggestions. Then group the queries by job. Each group becomes one page, not five thin variations of the same answer.',
                ],
            },
            {
                heading: 'Match the format to the intent',
                paragraphs: [
                    'Search engines reward pages that satisfy the query quickly. The format is part of that satisfaction.',
                ],
                bullets: [
                    'Informational intent — a clear guide with definitions, examples and a practical sequence.',
                    'Commercial intent — a comparison or buyer guide with honest trade-offs, not a disguised advert.',
                    'Transactional intent — a service or product page with scope, proof, pricing logic and a direct next step.',
                    'Navigational intent — a brand or support page that answers the exact question without detours.',
                ],
            },
            {
                heading: 'Structure the page so it can be skimmed and cited',
                paragraphs: [
                    'A strong article answers the main question in the first two paragraphs, then earns the rest of the scroll. Use one H1, descriptive H2s that reflect real sub-questions, short paragraphs and lists where sequence matters. Include the specifics people cannot get from a generic summary: numbers, trade-offs, failure modes and what you would do differently.',
                    'Add structured data that matches the page — Article or BlogPosting, FAQPage where there are genuine questions, BreadcrumbList for hierarchy. Schema does not create rankings on its own, but it makes the page easier to understand and eligible for richer presentation.',
                ],
            },
            {
                heading: 'Internal linking is the part most sites skip',
                paragraphs: [
                    'An article that nothing links to is a page waiting to be ignored. Every post should link to the service page it supports, to two or three related posts, and back to the hub. The hub should link to everything. Service pages should link to the articles that answer the objections buyers raise before contacting you.',
                    'This is also how topical authority compounds: a cluster of genuinely related pages, all reachable within a couple of clicks, gives search engines a clear picture of what the site knows about. Orphaned pages do not contribute that signal, no matter how well they are written.',
                ],
            },
            {
                heading: 'Measure qualified clicks, not publishing volume',
                paragraphs: [
                    'Track impressions, clicks, average position and conversions by page in Search Console and analytics. A post that ranks for a term nobody buys from is a vanity metric. A post that brings ten qualified visitors a month and links them to the right service page is doing real work.',
                    'Review content quarterly: update facts, merge overlapping pages, remove or redirect pages that never earned traffic, and add internal links to new articles. Content is an asset that needs maintenance, not a queue that only grows.',
                ],
            },
        ],
        faqs: [
            {
                question: 'How many blog posts do I need before SEO works?',
                answer:
                    'There is no magic number, but a useful starting shape is one strong hub page plus eight to twelve articles that answer the questions buyers actually ask. Depth and internal linking matter more than raw count. Ten connected, useful pages beat fifty orphaned ones.',
            },
            {
                question: 'How long does content SEO take to show results?',
                answer:
                    'New pages usually need a few weeks to be crawled and evaluated, and meaningful traffic typically builds over three to six months. Technical problems can delay that indefinitely, so fix crawlability, speed and indexation before scaling content production.',
            },
            {
                question: 'Should I use AI to write blog posts?',
                answer:
                    'AI can help with outlines, research summaries and editing, but publishing generic AI text at volume rarely earns trust or rankings. The pages that perform contain first-hand experience, specific numbers and a clear point of view that a model cannot invent for you.',
            },
            {
                question: 'Do blog posts still help a service business?',
                answer:
                    'Yes, when they answer pre-purchase questions and link to the relevant service. They widen the set of searches you can appear for, demonstrate expertise and give sales a useful resource. They do not replace strong service pages, reviews or backlinks.',
            },
        ],
    },
];

export const getPostBySlug = (slug: string) => blogs.find((post) => post.slug === slug);

export const getFeaturedPost = () => blogs.find((post) => post.featured) ?? blogs[0];

export const getRelatedPosts = (post: BlogPost, limit = 2) =>
    blogs
        .filter((candidate) => candidate.slug !== post.slug)
        .map((candidate) => ({
            post: candidate,
            score:
                (candidate.category === post.category ? 2 : 0) +
                candidate.tags.filter((tag) => post.tags.includes(tag)).length,
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((entry) => entry.post);

export const blogTopics = ['All', ...Array.from(new Set(blogs.map((post) => post.category)))];

export const getPostWordCount = (post: BlogPost) => {
    const text = [
        post.title,
        post.subtitle,
        post.excerpt,
        ...post.takeaways,
        ...post.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])]),
        ...post.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ].join(' ');

    return text.split(/\s+/).filter(Boolean).length;
};
