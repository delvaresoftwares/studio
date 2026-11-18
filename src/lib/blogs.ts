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
        slug: 'agi-the-god-imitator',
        title: 'AGI, the God Imitator: What It Can and Cannot Do',
        subtitle: 'The label is getting louder. The useful question is much smaller.',
        excerpt:
            'I keep hearing AGI described as a mind that will think for us. I think "imitator" is the more honest word — and it still describes something worth taking seriously.',
        metaDescription:
            'AGI, the "god imitator": what it means, why it is still theoretical in 2026, and how to judge the claims without mistaking a model for a mind.',
        category: 'AI Automation',
        date: '2026-11-18',
        updated: '2026-11-18',
        author: ALFAS_B,
        image: '/assets/blog/agi-humanoid-robot.webp',
        imageAlt: 'Humanoid robot standing in a robotics laboratory',
        ogImage: '/og/agi-the-god-imitator.jpg',
        tags: ['AGI', 'AI', 'AI Safety', 'Future of Work'],
        readingTime: 5,
        featured: true,
        serviceSlug: 'ai-ecosystems',
        serviceTitle: 'AI & Process Automation',
        serviceBlurb:
            'We build systems that use AI where it earns its place — with task-level evaluation, clear limits and a person accountable for the outcome.',
        stats: [
            { label: 'Status in 2026', value: 'Theoretical' },
            { label: 'Claim To Watch', value: 'Self-improvement' },
            { label: 'Buying Rule', value: 'Test the task' },
        ],
        takeaways: [
            'AGI is a claim about general capability, not a product you can put in a procurement spreadsheet.',
            'Imitating intelligent output is not the same as showing understanding, and the distinction matters in production.',
            'Self-improving systems are the interesting hypothesis — and, for now, still a hypothesis.',
            'Ignore the label when buying software. Test the exact task, with the exact data and a measurable error cost.',
        ],
        sections: [
            {
                heading: 'Why I keep the word "imitator"',
                paragraphs: [
                    'A client asked me last month whether we were "building toward AGI". I said no, and then I had to explain what I actually meant, because the phrase has become a container for everyone’s hopes and fears. The word I keep coming back to is imitator.',
                    'Models learn to reproduce the shape of intelligent answers. That is an extraordinary engineering achievement. It is also a different claim from saying a system understands the world the way a person does. Calling it a god adds theatre to the conversation; calling it an imitator keeps the question precise: how convincing is the imitation, in which tasks, under what conditions?',
                ],
            },
            {
                heading: 'Where the label breaks down',
                paragraphs: [
                    'Britannica was still describing artificial general intelligence as theoretical in November 2026, while a respected academic discussion asked the opposite question: what if it is already here? Both can be reasonable positions, which tells you the term itself is doing too much work.',
                    'In my own reviews, the gap shows up in transfer. A model can pass a benchmark and still fail on a slightly different invoice layout, a new customer tone or a policy that changed last week. General capability is not measured by the most impressive demo. It is measured by how quickly performance falls when the situation moves outside the example set.',
                ],
            },
            {
                heading: 'Self-improvement is the claim to watch',
                paragraphs: [
                    'The most interesting version of the AGI argument is not "a bigger model". It is a system that can improve its own performance, and the safety questions that come with it. The founder of Z.ai argued in November that self-improvement is the key step toward AGI while insisting that safety has to travel with it.',
                    'I take that seriously, but I separate the direction from the timetable. A research direction is not a release date, and a lab’s roadmap is not your architecture. What would change my mind is evidence: repeatable gains on unseen tasks, done under controlled conditions, with failure modes that engineers can actually inspect.',
                ],
            },
            {
                heading: 'Scenarios are not forecasts',
                paragraphs: [
                    'RAND published two scenarios in November for how advanced AI could affect the economy and society. The useful part of that kind of work is not the headline. It is the reminder that outcomes branch: regulation, adoption speed, compute costs and public trust all change the result.',
                    'I have seen teams make budgets from a single forecast about AGI. That is a mistake in either direction. If you stop investing because a god-like system is coming next year, you lose a year of compounding gains. If you bet the company on a date, you inherit a plan built on someone else’s guess.',
                ],
            },
            {
                heading: 'What I would do in your position',
                paragraphs: [
                    'Treat the name as background noise and the behaviour as the product. The questions below are the ones I ask in an evaluation, and they work whether or not AGI ever arrives.',
                ],
                bullets: [
                    'Test the task with your own data, not a public leaderboard or a vendor demo.',
                    'Write down what a wrong answer costs before you decide how much autonomy to give the system.',
                    'Keep a person accountable for decisions that touch money, contracts, safety or customers.',
                    'Limit access to the minimum the workflow needs, and log every automated action.',
                    'Re-run the evaluation quarterly. Models, policies and failure modes all move.',
                ],
            },
        ],
        faqs: [
            {
                question: 'Has AGI arrived already?',
                answer:
                    'There is no agreed test that would let me say yes. Some researchers argue current systems already meet a practical definition; others, including Britannica, still describe AGI as theoretical. What matters for a business is narrower: does the system do your task reliably on your data?',
            },
            {
                question: 'Why do you call AGI a god imitator?',
                answer:
                    'Because "god" describes the expectation people project onto it, while "imitator" describes what the system actually does: reproducing patterns of intelligent output. The second phrase keeps the engineering question honest without denying how capable these systems have become.',
            },
            {
                question: 'Should we delay projects until AGI arrives?',
                answer:
                    'No. Waiting for a hypothetical breakthrough gives up the compounding value of fixing a real workflow now. Build for measurable tasks, keep the architecture replaceable, and upgrade the model when a better one clears your evaluation.',
            },
            {
                question: 'What would make a system genuinely general?',
                answer:
                    'At minimum, reliable transfer to unfamiliar tasks, the ability to notice and correct its own errors, and behaviour you can verify under changing conditions. Passing one benchmark or producing fluent prose does not establish any of those.',
            },
        ],
        sources: [
            {
                label: 'Britannica — Why is artificial general intelligence still considered theoretical? (6 Nov 2026)',
                url: 'https://www.britannica.com/technology/Why-is-artificial-general-intelligence-still-considered-theoretical',
            },
            {
                label: 'The Conversation — What is artificial general intelligence, and is it already here? (28 Oct 2026)',
                url: 'https://theconversation.com/what-is-artificial-general-intelligence-and-is-it-already-here-293600',
            },
            {
                label: 'South China Morning Post — Self-improving AI the key step towards AGI, says Z.ai founder (1 Nov 2026)',
                url: 'https://www.scmp.com/tech/tech-trends/article/3372834/self-improving-ai-key-step-towards-agi-safety-key-zai-founder',
            },
            {
                label: 'RAND — Infinite Potential: economic and societal impacts across two scenarios (16 Nov 2026)',
                url: 'https://www.rand.org/pubs/research_reports/RRA4767-4.html',
            },
        ],
    },
    {
        slug: 'ai-economic-crisis-2026',
        title: 'AI and the Economic Crisis: What the Data Says',
        subtitle: 'One in eleven jobs, a tech rout, and a labour market that has not broken yet.',
        excerpt:
            'I get asked whether to stop hiring because of AI almost every week. My answer is longer than a yes or no, because the honest data does not fit either one.',
        metaDescription:
            'AI, jobs and the economy in 2026: what the one-in-eleven estimate really means, why the tech rout matters, and how businesses should respond.',
        category: 'AI & Economy',
        date: '2026-11-16',
        updated: '2026-11-16',
        author: ALFAS_B,
        image: '/assets/blog/ai-economy-financial-district.webp',
        imageAlt: 'Financial district skyscrapers photographed from street level',
        ogImage: '/og/ai-economic-crisis-2026.jpg',
        tags: ['AI', 'Economy', 'Jobs', 'Business Strategy', 'Automation'],
        readingTime: 5,
        featured: false,
        serviceSlug: 'business-analyst',
        serviceTitle: 'Business Analysis & Strategy',
        serviceBlurb:
            'We separate forecast from fact: where automation saves money, where it creates risk, and which decisions still need a person in the room.',
        stats: [
            { label: 'Goldman Estimate', value: '1 in 11' },
            { label: 'Evidence Today', value: 'Mixed' },
            { label: 'My Advice', value: 'Measure first' },
        ],
        takeaways: [
            'A projection about displacement is not the same as a layoff announcement.',
            'Reported evidence on AI and jobs in 2026 is mixed, so confident timelines deserve scepticism.',
            'The market is pricing AI spending and returns separately from the underlying technology.',
            'Automate tasks, not job titles — and do not cut headcount on a forecast.',
        ],
        sections: [
            {
                heading: 'The number everyone quotes',
                paragraphs: [
                    'Goldman Sachs put forward an estimate that AI could displace roughly one in eleven workers, with the important caveat that the layoffs may wait for a recession. That is a serious forecast, and it is also exactly the kind of number that gets repeated without its conditions.',
                    'Displacement is not the same as unemployment. A role can change tasks, a task can be automated without a role disappearing, and a company can absorb savings as margin rather than headcount cuts. I have seen all three happen in the same quarter across different clients. The headline number cannot tell you which one applies to you.',
                ],
            },
            {
                heading: 'The evidence is genuinely mixed',
                paragraphs: [
                    'The New York Times reported in November that the evidence for AI coming for jobs is, so far, mixed. That matches what I see on the ground. Some teams ship a workflow and redeploy the hours. Others run a pilot for six months and quietly go back to the spreadsheet because the exception rate was too high.',
                    'This is where I try to be careful in client conversations. I do not know the month when a particular role becomes unnecessary, and neither does anyone selling certainty. What I can do is measure the task in front of us: minutes per item, error rate, turnaround time and who fixes the mistakes. Those numbers are local, defensible and useful whether a recession arrives or not.',
                ],
            },
            {
                heading: 'The market is pricing a different risk',
                paragraphs: [
                    'In late October, tech stocks fell sharply as AI spending approached a trillion dollars. In November, Baidu’s CEO said investment has to turn into profit or risk becoming a bubble. These are not claims that the technology is fake. They are claims about the gap between what companies spend and what they earn.',
                    'That gap reaches ordinary businesses. Tool prices can change quickly when vendors compete for proof of value. Providers consolidate. A platform you built a workflow around may be repriced or retired. I now ask two questions in every AI architecture review: what does this cost at ten times the volume, and what is our exit if the vendor disappears?',
                ],
            },
            {
                heading: 'What I tell clients to do this quarter',
                paragraphs: [
                    'Nobody needs a dramatic restructure based on a headline. These are the moves I consider defensible with the information we have today.',
                ],
                bullets: [
                    'Do not freeze hiring on a forecast. Freeze it when the workload or the margin says the role is not needed.',
                    'Automate a measured task first, then decide what to do with the time you saved.',
                    'Protect the entry-level ladder. If you stop hiring juniors, you also stop growing the people who will eventually run these systems.',
                    'Keep cash and optionality. Vendor and pricing shifts are more likely than a single dramatic break.',
                    'Write a one-page scenario for both a slowdown and a boom, with a trigger for each decision.',
                ],
            },
            {
                heading: 'The honest answer',
                paragraphs: [
                    'Is AI causing an economic crisis? Not on the evidence in front of me. Is it changing the cost structure of certain tasks fast enough that businesses which ignore it will look expensive? Yes. Those two statements can both be true, and they point to the same response: measure, adapt, and avoid irreversible decisions based on a story.',
                    'The risk I worry about in my own company is not a model taking over. It is reorganising around a forecast, then discovering the workflow never worked — with people and institutional knowledge already gone. That is a mistake you can avoid, and the numbers to avoid it are sitting in your own operations.',
                ],
            },
        ],
        faqs: [
            {
                question: 'Is AI causing a recession right now?',
                answer:
                    'There is no clear evidence that it is. Market volatility around AI spending is real, but a stock selloff is not the same as a recession, and employment data so far is mixed rather than conclusive.',
            },
            {
                question: 'Should we stop hiring because AI will replace the role?',
                answer:
                    'Not on a headline. Decide on workload, margin and measured automation. Removing a role before the workflow is proven usually costs more in rework and lost knowledge than it saves.',
            },
            {
                question: 'What does "displace one in eleven workers" actually mean?',
                answer:
                    'It is a projection that a share of work could be automated, not a prediction that a specific one in eleven people will be dismissed next year. Fortune’s reporting on the estimate noted that actual layoffs may wait for a downturn.',
            },
            {
                question: 'How should a small business protect its margins?',
                answer:
                    'Track time per task, exception rate and turnaround before and after automation. Redeploy saved hours into revenue work, keep a human check on high-cost errors, and avoid long commitments to a single vendor while pricing is unsettled.',
            },
        ],
        sources: [
            {
                label: 'Fortune — AI could displace one in 11 workers, but layoffs may wait for a recession (22 Oct 2026)',
                url: 'https://fortune.com/2026/10/22/goldman-sachs-forecast-how-many-jobs-lost-to-ai-9-percent/',
            },
            {
                label: 'The New York Times — A.I. Was Supposed to Come for Our Jobs. So Far, Evidence Is Mixed. (6 Nov 2026)',
                url: 'https://www.nytimes.com/2026/11/06/business/economy/ai-jobs-layoffs.html',
            },
            {
                label: 'BBC — US tech stocks see sharp falls as AI spending nears $1tn (30 Oct 2026)',
                url: 'https://www.bbc.co.uk/news/articles/cvwy72e0n72yo',
            },
            {
                label: 'Reuters — Baidu CEO says AI investment must deliver profits to avoid bubble (17 Nov 2026)',
                url: 'https://www.reuters.com/business/media-telecom/baidu-ceo-says-ai-investment-must-deliver-profits-avoid-bubble-2026-11-17/',
            },
        ],
    },
    {
        slug: 'ai-hardware-software-evolution',
        title: 'AI Hardware and Software Are Merging in 2026',
        subtitle: 'On-device inference, smarter sensors and the quiet end of the cloud-only default.',
        excerpt:
            'I used to treat the model as the product and the hardware as a detail. After a year of edge projects, I think that is backwards. Here is where the real integration work sits.',
        metaDescription:
            'AI hardware and software are merging in 2026: what on-device inference, edge sensors and tighter integration mean for product architecture.',
        category: 'AI Automation',
        date: '2026-11-14',
        updated: '2026-11-14',
        author: ALFAS_B,
        image: '/assets/blog/ai-hardware-circuit.webp',
        imageAlt: 'Close-up photograph of a circuit board with electronic components',
        ogImage: '/og/ai-hardware-software-evolution.jpg',
        tags: ['AI', 'Edge AI', 'Hardware', 'On-Device AI', 'Inference'],
        readingTime: 5,
        featured: false,
        serviceSlug: 'ai-ecosystems',
        serviceTitle: 'AI & Process Automation',
        serviceBlurb:
            'We decide where inference should run, then build the workflow around it — with the latency, privacy and failure behaviour your users actually need.',
        stats: [
            { label: 'Inference Moving', value: 'On-device' },
            { label: 'New Bottleneck', value: 'Embedded' },
            { label: 'First Question', value: 'Latency' },
        ],
        takeaways: [
            'The competitive edge in 2026 is less about model size and more about where inference runs.',
            'Silicon, runtime, operating system and workflow have to be designed as one system.',
            'Edge AI still needs a cloud path for updates, heavy jobs and review — hybrid is the default.',
            'The scarce skill is embedded engineering, so budget for integration and device testing.',
        ],
        sections: [
            {
                heading: 'What changed on the projects I see',
                paragraphs: [
                    'A year ago, almost every AI request I received started with a model name. Now the first conversation is about a device: a phone, a camera, a handheld terminal, a machine on a factory floor. The client already knows a model can do the task. What they want to know is whether it will do it in 200 milliseconds, offline, on hardware they already own.',
                    'That shift is visible across the industry. Analysts are describing Apple’s tight hardware-software integration as an underappreciated AI advantage, and chip vendors are shipping reference designs that connect sensors to inference pipelines instead of selling accelerators in isolation. The interesting engineering is no longer only inside the model. It is in the seams between layers.',
                ],
            },
            {
                heading: 'The four layers that now have to agree',
                paragraphs: [
                    'When inference runs on the device, a change in one layer moves the cost of every other layer. I draw the same four boxes on every architecture review.',
                ],
                bullets: [
                    'Silicon — what the device can actually execute, and what that costs in power and heat.',
                    'Model and runtime — quantisation, context size and startup time, not just benchmark accuracy.',
                    'Operating system and sensors — which signals the app can read, with what permissions and latency.',
                    'Workflow — what the user does with the result, and what happens when the answer is wrong or the network disappears.',
                ],
            },
            {
                heading: 'The bottleneck moved to embedded engineering',
                paragraphs: [
                    'Intel and Altera’s recent sensor-integration work is a good example of the direction: connecting perception hardware to edge compute as a system, not as separate purchases. Electronics Weekly reported in October that embedded engineering is becoming a bottleneck for industrial automation. I recognise it.',
                    'A model that runs beautifully on a workstation can be useless on a device with a fixed power budget, a slow storage bus and no debugger attached. This is why AI projects now fail in integration rather than in training. The hard part is proving reliable behaviour across firmware revisions, drivers and a dozen device models — then keeping it reliable in the field.',
                ],
            },
            {
                heading: 'What I change in an architecture review',
                paragraphs: [
                    'I ask four questions before anyone opens a model catalogue. They sound simple and they expose most bad assumptions.',
                ],
                bullets: [
                    'Where does the data originate? If it is created on the device, sending it to a data centre and back is a choice you should have to defend.',
                    'What is the latency budget? A 900 ms answer can be excellent in a report and unusable at a checkout counter.',
                    'What happens offline? If the workflow stops when the network drops, the edge in edge AI was never really designed.',
                    'How do you update the model? A deployment path that needs a truck roll is not a deployment path.',
                ],
            },
            {
                heading: 'Hybrid is the default, not a compromise',
                paragraphs: [
                    'On-device inference does not abolish the cloud. It changes its job. The cloud becomes the place for heavy runs, fleet updates, aggregated review and audit logs, while the device keeps the fast, private, routine decisions close to the user.',
                    'My rule is to put the smallest reliable model on the device and keep an escape hatch to a larger model in the cloud. That gives you speed and privacy for normal cases and a path to recover when the edge case arrives. It costs more to build than a single-layer design, but it is the shape that survives real usage.',
                    'The probability that hardware and software keep converging is high; the timing of any particular feature is much less certain. What I would bet on is the skill: teams that can design across all four layers will ship the products everyone else spends the next two years trying to catch.',
                ],
            },
        ],
        faqs: [
            {
                question: 'Will on-device AI replace cloud AI?',
                answer:
                    'No. The useful pattern is hybrid: fast, private inference on the device, with the cloud reserved for heavy jobs, model updates, fleet-wide review and audit. Very few products can afford to give up either layer.',
            },
            {
                question: 'Does this mean we should buy new AI hardware now?',
                answer:
                    'Not by itself. Start with the latency, privacy and connectivity the workflow needs. If existing devices meet those constraints, changing hardware is a cost with no customer value. If they do not, the gap tells you exactly what to buy.',
            },
            {
                question: 'Why do edge AI projects cost more than expected?',
                answer:
                    'Because the model is rarely the expensive part. Integration, device testing, power and thermal constraints, sensor calibration and firmware maintenance take the time — and they need engineers comfortable across both hardware and software.',
            },
            {
                question: 'Is data safer when inference runs on the device?',
                answer:
                    'Often, yes, because raw inputs can stay local. But check the full path: telemetry, crash reports, logs and model updates can still leave the device. Privacy is a property of the whole system, not of the inference location alone.',
            },
        ],
        sources: [
            {
                label: 'Yahoo Finance — Deep hardware-software integration drives Apple’s AI advantage (19 Oct 2026)',
                url: 'https://finance.yahoo.com/markets/stocks/articles/deep-hardware-software-integration-drives-163110026.html',
            },
            {
                label: 'Intel — Intel and Altera simplify sensor integration for edge and physical AI (10 Nov 2026)',
                url: 'https://www.intel.com/content/www/us/en/newsroom/news/artificial-intelligence/altera-sensor-integration-edge-physical-ai.html',
            },
            {
                label: 'Electronics Weekly — Why embedded engineering is becoming a bottleneck for industrial automation (22 Oct 2026)',
                url: 'https://www.electronicsweekly.com/?p=909260',
            },
        ],
    },
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
        image: '/assets/blog/ai-small-business-team.webp',
        imageAlt: 'Small team collaborating around laptops in a bright office',
        ogImage: '/og/ai-for-business-growth.jpg',
        tags: ['AI', 'Automation', 'Growth', 'Small Business'],
        readingTime: 4,
        featured: false,
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
        image: '/assets/blog/mobile-speed.webp',
        imageAlt: 'Person holding a smartphone, checking a slow-loading page',
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
        image: '/assets/blog/custom-software-code.webp',
        imageAlt: "Developer's screen showing source code for a custom application",
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
        image: '/assets/blog/seo-workspace.webp',
        imageAlt: 'Laptop and notes on a desk during an SEO planning session',
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
