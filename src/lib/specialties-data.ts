export type ServiceFaq = { question: string; answer: string };

export const specialties = [
    {
        slug: "seo-optimization",
        title: "SEO & Digital Infrastructure",
        description: "Technical search optimization built for measurable, lasting organic growth.",
        detailedDescription: "We make your website fast, crawlable and easy for both people and search engines to understand — technical audits, structured data, content optimization and clean site architecture, all measured against real traffic and ranking data every month.",
        features: [
            "Technical SEO Audit",
            "Keyword Strategy",
            "Content Optimization",
            "Core Web Vitals",
            "Structured Data",
            "Authority Building"
        ],
        featureDefinitions: [
            { title: "Technical SEO Audit", definition: "A full health check of crawling, indexing, speed and site architecture — with a prioritized fix list." },
            { title: "Keyword Strategy", definition: "Research into what your customers actually search, mapped to pages that can realistically win those rankings." },
            { title: "Content Optimization", definition: "Rewriting and structuring existing pages so they match search intent and answer real questions." },
            { title: "Core Web Vitals", definition: "Page-speed and stability tuning that improves user experience and search performance together." },
            { title: "Structured Data", definition: "Schema markup that helps search engines richly display your products, reviews and business details." },
            { title: "Authority Building", definition: "Earning quality backlinks and local citations so your domain grows trust over time." }
        ],
        faqs: [
            {
                question: "How long before I see SEO results?",
                answer: "Technical fixes can show impact within a few weeks, but meaningful ranking and traffic growth usually takes 3–6 months. SEO compounds — the work we do in month one keeps paying off in month twelve."
            },
            {
                question: "Do you guarantee the #1 spot on Google?",
                answer: "No honest SEO partner can guarantee a specific position — Google's algorithm isn't for sale. What we do guarantee is transparent monthly reporting on traffic, keyword positions and technical health, so you always see exactly what you're paying for."
            },
            {
                question: "What do you need from me to get started?",
                answer: "Access to your website backend, plus Google Search Console and Analytics if they're set up. We'll also need 30 minutes to understand your customers and priorities — after that, we handle the rest."
            },
            {
                question: "Is this a one-time fix or an ongoing service?",
                answer: "Both options exist. A one-time engagement covers audits, cleanup and foundational optimization. Most clients continue monthly because search competition, content and algorithms never stand still."
            },
            {
                question: "Can you recover a site that lost its rankings?",
                answer: "Yes. We start by identifying the cause — technical errors, penalties, bad migrations or content decay — then rebuild systematically. Recovery timelines vary, but every step is documented and reported."
            }
        ],
        icon: "TrendingUp",
        accent: "bg-orange-500",
        image: "/assets/services/seo.png",
        portfolioImages: ["/assets/services/seo.png", "/assets/projects/p2.png", "/assets/projects/p3.png"],
        stats: [
            { label: "Reporting", value: "Monthly" },
            { label: "Approach", value: "Technical" },
            { label: "Growth", value: "Organic" }
        ]
    },
    {
        slug: "business-analyst",
        title: "Strategic Business Analysis",
        description: "Financial, market and operational analysis that turns uncertainty into decisions.",
        detailedDescription: "We study your numbers, market and operations, then give you a clear picture of what's working, what's leaking and where the next realistic growth step is. Think of us as the analytical brain behind your decisions — from pricing and risk to forecasting and strategy.",
        features: [
            "Financial Analysis",
            "Market Research",
            "Risk Assessment",
            "Growth Modeling",
            "Operational Review",
            "Decision Support"
        ],
        featureDefinitions: [
            { title: "Financial Analysis", definition: "A clear read on margins, cash flow and unit economics — where money is made and where it leaks." },
            { title: "Market Research", definition: "Sizing, competitors and customer behavior analyzed so strategy rests on evidence, not guesswork." },
            { title: "Risk Assessment", definition: "The threats most likely to hurt your business, ranked by probability and impact, with mitigation plans." },
            { title: "Growth Modeling", definition: "Scenario-based projections showing what expansion actually costs — and what it realistically returns." },
            { title: "Operational Review", definition: "Process walkthroughs that surface bottlenecks, duplicated effort and automation opportunities." },
            { title: "Decision Support", definition: "Clear written recommendations for the calls you're facing right now — not a 100-page report nobody reads." }
        ],
        faqs: [
            {
                question: "What exactly does a Delvare business analyst do?",
                answer: "We examine your financials, market position and day-to-day operations, then hand you clear findings and recommendations. You make the decisions — we make sure they're informed ones."
            },
            {
                question: "I only have an idea, not a running business. Is this useful?",
                answer: "Yes — that's often when analysis matters most. We validate demand, estimate realistic costs and revenues, and stress-test the idea before you invest months or savings into it."
            },
            {
                question: "What do I actually receive at the end?",
                answer: "A concise findings document: key metrics explained simply, risks ranked, opportunities sized, and specific recommended next steps. On request, we walk your team through it in a live session."
            },
            {
                question: "How is this different from hiring a regular consultant?",
                answer: "Consultants often advise and leave. Because we also build software, our analysis connects directly to implementation — if the answer is automation or a system, we can build it ourselves."
            },
            {
                question: "Is my business data kept confidential?",
                answer: "Always. Everything you share is covered by strict confidentiality, used solely for your analysis, and never shared with third parties."
            }
        ],
        icon: "LineChart",
        accent: "bg-yellow-500",
        image: "/assets/services/support.png",
        portfolioImages: ["/assets/services/support.png", "/assets/projects/p1.png", "/assets/projects/p2.png"],
        stats: [
            { label: "Analysis", value: "Evidence-based" },
            { label: "Output", value: "Decisions" },
            { label: "Jargon", value: "None" }
        ]
    },
    {
        slug: "software-engineering",
        title: "Custom Software Engineering",
        description: "Web apps, internal tools and platforms engineered around how your business works.",
        detailedDescription: "From customer-facing web applications to internal tools and full Product-as-a-Service platforms, we design, build and maintain software tailored to your exact workflows — modern frameworks, clean architecture and code you own outright.",
        features: [
            "Web Applications",
            "Internal Tools",
            "PaaS Platforms",
            "API Development",
            "Third-party Integrations",
            "Maintenance & Support"
        ],
        featureDefinitions: [
            { title: "Web Applications", definition: "Fast, responsive apps built with modern frameworks like Next.js — usable on any device." },
            { title: "Internal Tools", definition: "Custom dashboards and admin panels that replace spreadsheets and manual processes." },
            { title: "PaaS Platforms", definition: "Complete multi-tenant products — billing, roles, onboarding — ready to sell to your own customers." },
            { title: "API Development", definition: "Clean, documented APIs so your systems can talk to each other and to partners securely." },
            { title: "Integrations", definition: "Payments, messaging, logistics, accounting — we connect the services you already rely on." },
            { title: "Maintenance & Support", definition: "Monitoring, updates and fixes after launch, so the software keeps improving as you grow." }
        ],
        faqs: [
            {
                question: "Which technologies do you build with?",
                answer: "Primarily Next.js/React on the front end with Node-based services, Firebase or Supabase for data, and cloud infrastructure on AWS or GCP. We pick the stack per project — boring, proven technology that will still be maintainable in five years."
            },
            {
                question: "Who owns the code you write?",
                answer: "You do. On final payment, full intellectual property transfers to you, including repositories and documentation. No lock-in, no hostage situations."
            },
            {
                question: "Can you take over an existing codebase another team built?",
                answer: "Usually, yes. We start with a short audit to assess code quality and risk, tell you honestly whether it's worth saving or rebuilding, and give you a fixed plan either way."
            },
            {
                question: "How do you handle scope changes mid-project?",
                answer: "Changes are normal. We work in short iterations with regular demos; new requests are estimated and scheduled visibly, so budget and timeline stay predictable instead of drifting."
            },
            {
                question: "What happens after launch?",
                answer: "Software needs care. Every build includes a support window for bug fixes, and most clients move onto a maintenance plan covering monitoring, updates and small improvements."
            }
        ],
        icon: "Code2",
        accent: "bg-blue-600",
        image: "/assets/services/software.png",
        portfolioImages: ["/assets/services/software.png", "/assets/projects/p3.png", "/assets/projects/p1.png"],
        stats: [
            { label: "Code Ownership", value: "Yours" },
            { label: "Stacks", value: "Modern" },
            { label: "Delivery", value: "Iterative" }
        ]
    },
    {
        slug: "ai-dashboard",
        title: "Business Intelligence Dashboards",
        description: "All your business data in one live view — no more spreadsheet archaeology.",
        detailedDescription: "We connect your sales, inventory, finance and marketing data into one real-time dashboard, so every decision starts from the same accurate picture. Live reports, alerts and KPI tracking replace end-of-month spreadsheet stitching.",
        features: [
            "Live KPI Tracking",
            "Data Consolidation",
            "Custom Reports",
            "Automated Alerts",
            "Role-based Access",
            "Scheduled Exports"
        ],
        featureDefinitions: [
            { title: "Live KPI Tracking", definition: "Revenue, orders, stock and other key numbers updating in real time on one screen." },
            { title: "Data Consolidation", definition: "Your tools — billing, CRM, sheets, databases — unified into one reliable source of truth." },
            { title: "Custom Reports", definition: "Views built per role: owners see profit, managers see operations, staff see tasks." },
            { title: "Automated Alerts", definition: "Threshold notifications — low stock, unusual refunds, target hits — delivered before problems grow." },
            { title: "Role-based Access", definition: "Everyone sees exactly the data they need, nothing they don't." },
            { title: "Scheduled Exports", definition: "Daily, weekly or monthly summaries delivered automatically to email or chat." }
        ],
        faqs: [
            {
                question: "Which tools and data sources can you connect?",
                answer: "Spreadsheets, billing systems, CRMs, databases, payment gateways and custom APIs — if it holds data, we can usually pipe it in. During scoping we map exactly which sources matter for your KPIs."
            },
            {
                question: "Where does my data live?",
                answer: "In your own cloud account, not ours. You keep ownership and control of storage, and we configure access rules, backups and encryption around it."
            },
            {
                question: "Will my non-technical team actually use it?",
                answer: "That's the design goal. Dashboards are built role-first: each person opens one screen and immediately sees their relevant numbers, with no queries, filters or training sessions required."
            },
            {
                question: "How current is the data shown?",
                answer: "Most sources update in near real time; others sync on a schedule that suits their importance — hourly, nightly, whatever the decision actually requires. We agree this per source up front."
            },
            {
                question: "Can it alert me when something goes wrong?",
                answer: "Yes. Define thresholds once — stock below ten units, refunds spiking, daily sales under target — and the dashboard notifies you by email or chat automatically."
            }
        ],
        icon: "BarChart3",
        accent: "bg-indigo-600",
        image: "/assets/projects/p2.png",
        portfolioImages: ["/assets/projects/p2.png", "/assets/projects/p1.png", "/assets/projects/p3.png"],
        stats: [
            { label: "Sources", value: "Unified" },
            { label: "Data", value: "Real-time" },
            { label: "Truth", value: "Single" }
        ]
    },
    {
        slug: "ai-ecosystems",
        title: "AI & Process Automation",
        description: "Practical AI that removes repetitive work — tuned to your business, not a demo.",
        detailedDescription: "We automate repetitive workflows and embed AI where it genuinely earns its place: fine-tuned language models, retrieval over your own documents, and pipelines that classify, draft and route work automatically — with humans keeping final say where it counts.",
        features: [
            "Workflow Automation",
            "LLM Fine-tuning",
            "RAG Knowledge Systems",
            "Document Processing",
            "Chat & Support Bots",
            "Human-in-the-loop Controls"
        ],
        featureDefinitions: [
            { title: "Workflow Automation", definition: "Repetitive multi-step processes executed automatically across the tools you already use." },
            { title: "LLM Fine-tuning", definition: "Language models adapted to your domain vocabulary and tone, instead of generic outputs." },
            { title: "RAG Knowledge Systems", definition: "AI that answers from your documents, policies and data — with citations, not guesses." },
            { title: "Document Processing", definition: "Invoices, forms and contracts read, extracted and filed without manual entry." },
            { title: "Chat & Support Bots", definition: "Assistants trained strictly on your content to handle routine questions around the clock." },
            { title: "Human-in-the-loop Controls", definition: "Confidence thresholds and approval steps so sensitive actions always wait for a person." }
        ],
        faqs: [
            {
                question: "Do I need my own data for this to be useful?",
                answer: "Some of your best starting material is data you already have — invoices, tickets, product docs, chat logs. We start with one high-friction process, prove the automation works on it, then expand."
            },
            {
                question: "Is my business data used to train public AI models?",
                answer: "Never. Your data stays inside your private deployment, is used only to serve your automations, and we prefer providers with no-training-on-your-data guarantees."
            },
            {
                question: "How do you stop the AI from making things up?",
                answer: "We ground answers in retrieval from your verified documents (RAG), add confidence thresholds, and route anything sensitive to a human. The goal is assistive accuracy, not creative guessing."
            },
            {
                question: "Will AI replace my staff?",
                answer: "It replaces tasks, not people — the copy-paste, sorting and first-draft work. Teams we work with typically redirect saved hours to customers and quality rather than headcount cuts."
            },
            {
                question: "What does maintaining an AI system involve?",
                answer: "Models drift and data changes, so we include monitoring, periodic evaluation and retraining cycles in maintenance plans. You'll know exactly how the system is performing month to month."
            }
        ],
        icon: "Brain",
        accent: "bg-purple-600",
        image: "/assets/services/ai.png",
        portfolioImages: ["/assets/services/ai.png", "/assets/projects/p1.png", "/assets/projects/p2.png"],
        stats: [
            { label: "Grounding", value: "RAG-based" },
            { label: "Data Privacy", value: "Strict" },
            { label: "Humans", value: "In Control" }
        ]
    },
    {
        slug: "software-design",
        title: "UI/UX Design & Strategy",
        description: "Interfaces designed around human psychology — simple to use, hard to forget.",
        detailedDescription: "We design digital experiences that feel obvious to use: research-backed layouts, reduced cognitive load, and micro-interactions that guide users toward action. From first wireframe to developer-ready specs, design decisions are always tied to a measurable purpose.",
        features: [
            "User Research",
            "Wireframes & Prototypes",
            "Interface Design",
            "Usability Testing",
            "Design Systems",
            "Conversion Optimization"
        ],
        featureDefinitions: [
            { title: "User Research", definition: "Interviews and behavior analysis to learn how your users actually think before a single pixel is drawn." },
            { title: "Wireframes & Prototypes", definition: "Clickable low-fidelity versions to validate structure and flow early — cheap to change, expensive to skip." },
            { title: "Interface Design", definition: "High-fidelity screens balancing brand personality with clarity and speed." },
            { title: "Usability Testing", definition: "Real users attempt real tasks while we watch, so problems surface before development does." },
            { title: "Design Systems", definition: "Reusable components and guidelines keeping every future screen consistent." },
            { title: "Conversion Optimization", definition: "Journeys deliberately shaped toward signup, purchase or enquiry — with analytics to verify." }
        ],
        faqs: [
            {
                question: "Do I get designs my developers can build from?",
                answer: "Yes — organized Figma files with components, states, spacing and responsive breakpoints specified. If we're building too, handoff is seamless; if not, your developers get everything they need."
            },
            {
                question: "Can you work with our existing brand identity?",
                answer: "Absolutely. We treat your logo, colors and voice as constraints to respect, extending them into a coherent interface rather than redesigning your brand from scratch."
            },
            {
                question: "Can we hire you for design only, without development?",
                answer: "Of course. Many clients take our design packages and build in-house. The deliverables are tool-agnostic and fully documented either way."
            },
            {
                question: "How many revision rounds are included?",
                answer: "Each phase — wireframes, visual design, final polish — includes structured feedback rounds. Because prototypes are validated early, late-stage surprises (the expensive kind) are rare."
            },
            {
                question: "How do you prove the design actually works better?",
                answer: "Before-and-after measurement: task completion rates, drop-off points, conversion tracking. Good design is a hypothesis we test, not just a pretty screen."
            }
        ],
        icon: "Layout",
        accent: "bg-emerald-500",
        image: "/assets/services/design.png",
        portfolioImages: ["/assets/services/design.png", "/assets/projects/p1.png", "/assets/projects/p2.png"],
        stats: [
            { label: "Research-led", value: "Always" },
            { label: "Handoff", value: "Dev-ready" },
            { label: "Focus", value: "Conversion" }
        ]
    },
    {
        slug: "cloud-hosting",
        title: "Cloud Infrastructure & Hosting",
        description: "Migration, setup and management of secure, scalable cloud environments.",
        detailedDescription: "Whether you're moving out of a dusty server room or launching fresh, we architect cloud environments that are fast, redundant and cost-aware — then keep them patched, monitored and backed up so you never think about infrastructure again.",
        features: [
            "Cloud Migration",
            "Architecture Design",
            "Managed Hosting",
            "Backup & Recovery",
            "Cost Optimization",
            "24/7 Monitoring"
        ],
        featureDefinitions: [
            { title: "Cloud Migration", definition: "Planned, tested moves of your apps and data to AWS, GCP or Azure with minimal downtime." },
            { title: "Architecture Design", definition: "Scalable foundations — load balancing, autoscaling, networking — sized for your actual traffic." },
            { title: "Managed Hosting", definition: "We run the environment: deployments, patching, certificates, so your team just ships features." },
            { title: "Backup & Recovery", definition: "Automated backups with regularly tested restores — because an untested backup isn't a backup." },
            { title: "Cost Optimization", definition: "Rightsizing and reserved capacity planning that routinely trims double-digit percentages off cloud bills." },
            { title: "24/7 Monitoring", definition: "Uptime, performance and security alerts around the clock, with response playbooks ready." }
        ],
        faqs: [
            {
                question: "Which cloud providers do you work with?",
                answer: "AWS, Google Cloud and Azure primarily, plus simpler platforms like Vercel and Cloudflare for lighter workloads. We recommend based on your workload and budget, not provider loyalty programs."
            },
            {
                question: "Will there be downtime during migration?",
                answer: "Usually minutes, sometimes zero. We stage the new environment in parallel, sync data, test thoroughly, then switch over during your quietest hours with a rollback plan ready."
            },
            {
                question: "Can you reduce our current cloud bill?",
                answer: "Very often, yes. Most bills we review carry oversized instances, forgotten resources or missing discounts. An audit typically finds meaningful savings without touching performance."
            },
            {
                question: "Who manages everything after setup?",
                answer: "We do, under a managed plan: updates, monitoring, backups and incident response. Or we hand over documented control to your team — your choice, no lock-in."
            },
            {
                question: "What if something goes wrong at 3 AM?",
                answer: "Monitoring alerts wake the right person, not you. Managed clients get defined response times and a documented incident process, so issues are handled and reported before morning coffee."
            }
        ],
        icon: "Cloud",
        accent: "bg-cyan-500",
        image: "/assets/services/cloud.png",
        portfolioImages: ["/assets/services/cloud.png", "/assets/projects/p3.png", "/assets/projects/p1.png"],
        stats: [
            { label: "Uptime Target", value: "99.9%" },
            { label: "Backups", value: "Tested" },
            { label: "Bills", value: "Optimized" }
        ]
    },
    {
        slug: "cyber-security",
        title: "Cybersecurity Services",
        description: "Audits, penetration testing and protection that keep threats off your books.",
        detailedDescription: "We find weaknesses before attackers do: vulnerability scanning, penetration testing, secure configuration and ongoing monitoring — practical security sized to your business, including hardening for AI systems and APIs.",
        features: [
            "Security Audits",
            "Penetration Testing",
            "Vulnerability Scanning",
            "Zero-trust Access",
            "Incident Response",
            "AI System Hardening"
        ],
        featureDefinitions: [
            { title: "Security Audits", definition: "Systematic review of infrastructure, code and policies, producing a ranked list of fixes." },
            { title: "Penetration Testing", definition: "Controlled simulated attacks on your systems to prove which defenses hold and which fail." },
            { title: "Vulnerability Scanning", definition: "Continuous automated checks so new holes are caught within days, not years." },
            { title: "Zero-trust Access", definition: "Strict authentication and least-privilege permissions across your team and tools." },
            { title: "Incident Response", definition: "A practiced playbook: contain, eradicate, recover, learn — agreed before anything happens." },
            { title: "AI System Hardening", definition: "Protecting models and pipelines from prompt injection, data poisoning and misuse." }
        ],
        faqs: [
            {
                question: "We're a small business — are we really a target?",
                answer: "Yes, statistically especially you. Most attacks are automated sweeps for easy targets, and small businesses are hit disproportionately because defenses are weaker. Basic hardening removes you from the 'easy' list."
            },
            {
                question: "What does a penetration test actually involve?",
                answer: "With your written permission, we attack your systems the way a real attacker would — probing networks, apps and staff processes — then deliver a report ranking every finding by risk with concrete remediation steps."
            },
            {
                question: "Will testing disrupt our live systems?",
                answer: "We test carefully and schedule aggressive checks outside business hours. Disruption is rare and planned for; production-like staging environments are used wherever possible."
            },
            {
                question: "What do we receive after a security audit?",
                answer: "A plain-language report: what was tested, what was found, how severe each issue is, and exactly how to fix it. We can also implement the fixes ourselves."
            },
            {
                question: "Can you secure our AI models and automations too?",
                answer: "Yes — securing AI is a core specialty. We defend against prompt injection, data poisoning and model theft, and set up guardrails so automated systems fail safely."
            }
        ],
        icon: "ShieldCheck",
        accent: "bg-red-600",
        image: "/assets/services/security.png",
        portfolioImages: ["/assets/services/security.png", "/assets/projects/p2.png", "/assets/projects/p3.png"],
        stats: [
            { label: "Findings", value: "Risk-ranked" },
            { label: "Coverage", value: "AI Included" },
            { label: "Response", value: "Playbooked" }
        ]
    },
    {
        slug: "technical-sla",
        title: "Managed Support & Consulting",
        description: "On-demand technical support and honest consulting, whenever you need it.",
        detailedDescription: "A standing technical team without the payroll: priority support, maintenance, troubleshooting and straightforward technology advice. When something breaks or a decision looms, you call one number and we handle it.",
        features: [
            "Priority Support",
            "Preventive Maintenance",
            "Troubleshooting",
            "Technology Consulting",
            "Vendor Coordination",
            "Quarterly Health Reviews"
        ],
        featureDefinitions: [
            { title: "Priority Support", definition: "Defined response times through a dedicated channel — no ticket black holes." },
            { title: "Preventive Maintenance", definition: "Regular updates, patching and checkups that stop problems before they page you." },
            { title: "Troubleshooting", definition: "Whatever breaks — software, integrations, email, hosting — diagnosed and resolved." },
            { title: "Technology Consulting", definition: "Straight answers on tools, purchases and architecture, with zero commission bias." },
            { title: "Vendor Coordination", definition: "We speak to your hosting, registrar and SaaS vendors so you don't have to." },
            { title: "Health Reviews", definition: "Quarterly reports on system status, risks found and improvements made." }
        ],
        faqs: [
            {
                question: "What exactly is covered under support?",
                answer: "Anything technical in your agreed scope: bug fixes, updates, outages, configuration, integrations and advice. Scope is written clearly at signing, so 'is this included?' never becomes a debate."
            },
            {
                question: "How fast do you respond?",
                answer: "Response times are contractual, tiered by severity — critical outages jump the queue. Typical plans range from same-hour response on critical issues to next-business-day for minor requests."
            },
            {
                question: "Do you support software you didn't build?",
                answer: "Usually. We begin with a short assessment of the existing systems, flag anything risky, and then support what's viable — being honest with you if something should be replaced instead of maintained."
            },
            {
                question: "Is this remote or on-site?",
                answer: "Almost everything happens remotely, which keeps plans affordable and response times short. On-site visits in Kerala can be arranged when hands-on presence genuinely matters."
            },
            {
                question: "Can the plan scale with us?",
                answer: "That's the point of a SLA. Coverage, hours and response tiers adjust quarterly as your systems and team grow — you never pay for capacity you don't use."
            }
        ],
        icon: "LifeBuoy",
        accent: "bg-amber-500",
        image: "/assets/services/support.png",
        portfolioImages: ["/assets/services/support.png", "/assets/projects/p1.png", "/assets/projects/p2.png"],
        stats: [
            { label: "Support", value: "One Number" },
            { label: "Response", value: "Contractual" },
            { label: "Advice", value: "Unbiased" }
        ]
    },
    {
        slug: "ecbills",
        title: "ECBills.in",
        description: "Intelligent billing & inventory platform for retail — counter to balance sheet.",
        detailedDescription: "ECBills is our flagship Product-as-a-Service platform for retail and enterprise selling. Rapid billing, live stock across stores, role-based staff access, built-in accounting and encrypted cloud sync — one system from the billing counter to the balance sheet.",
        features: [
            "Fast & Easy Billing",
            "Multi-store Management",
            "Live Stock Tracking",
            "Accounting & Reports",
            "Staff Roles & Permissions",
            "Secure Cloud Sync"
        ],
        featureDefinitions: [
            { title: "Fast & Easy Billing", definition: "Checkouts designed for rush hour — barcode-ready, fewest possible taps, printable receipts." },
            { title: "Multi-store Management", definition: "Every branch's sales, stock and staff visible from one login." },
            { title: "Live Stock Tracking", definition: "Inventory updates with every bill, transfer or return — discrepancies surface instantly." },
            { title: "Accounting & Reports", definition: "Daily sales, profit, taxes and trends generated automatically from real transactions." },
            { title: "Staff Roles & Permissions", definition: "Cashiers bill, managers adjust, owners see everything — enforced by the system, not trust." },
            { title: "Secure Cloud Sync", definition: "Encrypted syncing across counters and devices, so any device can become a billing point." }
        ],
        faqs: [
            {
                question: "Does ECBills work if my internet goes down?",
                answer: "Billing keeps working offline and transactions sync safely once connectivity returns. Your counter never has to turn customers away because a fiber got cut."
            },
            {
                question: "Can I run multiple shops from one account?",
                answer: "Yes. Each store gets its own catalog, stock and staff, while you see consolidated reports and move inventory between branches from one dashboard."
            },
            {
                question: "What hardware do I need to start?",
                answer: "Any computer, tablet or phone with a browser. Standard receipt printers and barcode scanners work out of the box — no proprietary hardware lock-in."
            },
            {
                question: "Who controls what staff can see and do?",
                answer: "You do. Role-based permissions decide who can bill, discount, edit stock or view profits, and every sensitive action leaves an audit trail."
            },
            {
                question: "How is ECBills priced?",
                answer: "Simple subscription pricing per store, with onboarding and training included — contact us for current rates and a guided demo tailored to your shop."
            }
        ],
        icon: "Receipt",
        accent: "bg-emerald-500",
        image: "/assets/ecbillmin.png",
        portfolioImages: ["/assets/ecbillmin.png", "/assets/projects/p2.png", "/assets/projects/p1.png"],
        stats: [
            { label: "Billing", value: "Offline-safe" },
            { label: "Stores", value: "Multi-unit" },
            { label: "Hardware", value: "Any Device" }
        ]
    },
    {
        slug: "blendly",
        title: "Blendly.sbs",
        description: "A social network for literature lovers — lend books nearby, share poetry.",
        detailedDescription: "Blendly connects readers in the same neighborhood: lend and borrow physical books with people nearby, publish poems and prose, and discover readers whose shelves match your taste. Community-driven, moderation-supported, built for the love of literature.",
        features: [
            "Lend & Borrow Books",
            "Read & Write Poetry",
            "Discover Nearby Readers",
            "Shelf Matching",
            "Community Moderation",
            "Safe Profiles"
        ],
        featureDefinitions: [
            { title: "Lend & Borrow Books", definition: "List titles from your shelf and request books from readers around the corner." },
            { title: "Read & Write Poetry", definition: "Publish verse and prose to an audience that actually shows up for literature." },
            { title: "Discover Nearby Readers", definition: "Location-aware discovery connecting you with bibliophiles genuinely close by." },
            { title: "Shelf Matching", definition: "Taste-based suggestions from real people's shelves, not ad-driven algorithms." },
            { title: "Community Moderation", definition: "Reporting tools and active moderation keep exchanges respectful." },
            { title: "Safe Profiles", definition: "Verified profiles and controlled visibility so sharing stays comfortable." }
        ],
        faqs: [
            {
                question: "Is Blendly free to use?",
                answer: "Yes — joining, lending, borrowing and publishing are free for readers. Optional premium touches may arrive later, but the core community experience stays free."
            },
            {
                question: "How does lending a book actually work?",
                answer: "List a book from your shelf, a nearby reader sends a request, you agree on a pickup spot and return date, and Blendly tracks the loan so nothing gets forgotten."
            },
            {
                question: "Is it safe to meet strangers from the internet?",
                answer: "Safety features are built in: profiles with history and ratings, in-app chat before meeting, public meetup suggestions, reporting tools and active moderation. You stay in control of what you share and when."
            },
            {
                question: "Can I publish my own writing?",
                answer: "Yes — poems, short prose and thoughts go straight to a feed of people who are there for literature, with feedback and discussion, not another algorithmic popularity contest."
            },
            {
                question: "What if someone doesn't return my book?",
                answer: "Loans carry due dates, reminders and a rating record. Repeat offenders lose borrowing privileges, and persistent issues are handled by moderation directly."
            }
        ],
        icon: "BookOpen",
        accent: "bg-violet-500",
        image: "/assets/projects/p3.png",
        portfolioImages: ["/assets/projects/p3.png", "/assets/projects/p2.png", "/assets/projects/p1.png"],
        stats: [
            { label: "For Readers", value: "By Readers" },
            { label: "Discovery", value: "Hyperlocal" },
            { label: "Moderation", value: "Active" }
        ]
    }
];
