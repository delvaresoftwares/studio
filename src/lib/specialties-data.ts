import { Cloud, Brain, Layout, ShieldCheck, LifeBuoy, GitBranch, Zap, MessageSquare, Code2, Search, TrendingUp, Smartphone, Globe, BarChart3, Rocket, LineChart } from 'lucide-react';

export const specialties = [
    {
        slug: "seo-optimization",
        title: "SEO & Digital Infrastructure",
        description: "Professional search optimization services focused on technical performance and measurable organic growth.",
        detailedDescription: "Professional SEO services focused on technical optimization, structured data implementation, and measurable organic performance improvements to enhance your digital infrastructure and increase search visibility.",
        features: [
            "Technical SEO Audit",
            "Content Optimization",
            "Performance Optimization",
            "Keyword Analysis & Strategy",
            "Backlink & Authority Building",
            "Site Structure & Indexing"
        ],
        featureDefinitions: [
            { title: "Technical SEO Audit", definition: "Comprehensive analysis of site architecture, crawlability, and indexability issues." },
            { title: "Content Optimization", definition: "Improving existing content to meet search intent and improve relevance." },
            { title: "Performance Optimization", definition: "Enhancing core web vitals and page load speed to improve user experience and rankings." },
            { title: "Keyword Analysis & Strategy", definition: "Data-driven research to identify high-value search terms relevant to your business." },
            { title: "Backlink & Authority Building", definition: "Developing authoritative external links to increase site domain authority." },
            { title: "Site Structure & Indexing", definition: "Organizing your digital content to ensure search engines crawl and index your pages effectively." }
        ],
        whyBetter: {
            performance: "We ensure fast load times through optimized asset delivery and lean codebase structure, crucial for maintaining user retention and search engine rankings.",
            security: "Our SEO strategies prioritize safe-link practices and platform compliance, protecting your brand from penalties and digital reputation risks.",
            optimality: "We continuously analyze user behavior data to refine content strategies, ensuring your digital presence is always optimized for maximum conversion and organic growth."
        },
        icon: "TrendingUp",
        accent: "bg-orange-500",
        image: "/assets/services/seo.png",
        portfolioImages: ["/assets/services/seo.png", "/assets/projects/p2.png", "/assets/projects/p3.png"],
        stats: [
            { label: "Trust", value: "Absolute" },
            { label: "Growth", value: "Organic" },
            { label: "Connection", value: "Deep" }
        ]
    },
    {
        slug: "business-analyst",
        title: "Business Analyst",
        description: "Analyzing financial and economic factors to ideate further.",
        detailedDescription: "We participate in boards and ideate further with our support and vision. We specialize in analyzing financial, economic, strategic growth modeling, risk assessment, and market forecasting to ensure your startup reaches its maximum potential.",
        features: [
            "Financial & Economic Analysis",
            "Strategic Growth Modeling",
            "Risk Assessment",
            "Market Forecasting",
            "Board Participation",
            "Vision & Ideation"
        ],
        featureDefinitions: [
            { title: "Financial & Economic Analysis", definition: "Comprehensive evaluation of fiscal health and market trends to inform strategic decisions." },
            { title: "Strategic Growth Modeling", definition: "Building long-term frameworks to scale your business sustainably and efficiently." },
            { title: "Risk Assessment", definition: "Identifying and mitigating potential threats to your business model before they materialize." },
            { title: "Market Forecasting", definition: "Predicting future market shifts to keep your business ahead of the competition." },
            { title: "Board Participation", definition: "Active involvement in leadership decisions, providing expert support and high-level vision." },
            { title: "Vision & Ideation", definition: "Collaborating with leadership to refine, expand, and execute your core business strategy." }
        ],
        whyBetter: {
            performance: "We provide data-driven insights that streamline your business operations, eliminating inefficiencies and enhancing your organization's overall performance.",
            security: "Our strategic analysis includes rigorous risk assessment and forecasting, protecting your business from potential economic and operational vulnerabilities.",
            optimality: "We transform raw data into clear, actionable strategies, ensuring your business model is perfectly tuned for maximum growth and market impact."
        },
        icon: "LineChart",
        accent: "bg-yellow-500",
        image: "/assets/services/support.png",
        portfolioImages: ["/assets/services/support.png", "/assets/projects/p1.png", "/assets/projects/p2.png"],
        stats: [
            { label: "Forecasting", value: "Accurate" },
            { label: "Analysis", value: "In-Depth" },
            { label: "Strategy", value: "Proven" }
        ]
    },
    {
        slug: "software-engineering",
        title: "Software Engineering",
        description: "Your idea, our engineering, together we share flight.",
        detailedDescription: "Expertise in various and emerging frameworks for business, startups, and Product-as-a-Service (PaaS) systems. We build robust, scalable architectures. Your idea, our engineering, together we share flight.",
        features: [
            "Emerging Frameworks",
            "Startup & Business Logic",
            "PaaS Architecture",
            "Custom App Development",
            "High-Availability Systems",
            "Shared Flight Ideology"
        ],
        featureDefinitions: [
            { title: "Emerging Frameworks", definition: "Leveraging cutting-edge technology stacks to build faster, more modern applications." },
            { title: "Startup & Business Logic", definition: "Engineering software solutions specifically designed to solve complex business problems." },
            { title: "PaaS Architecture", definition: "Developing scalable Product-as-a-Service systems built for long-term growth and reliability." },
            { title: "Custom App Development", definition: "Tailoring application development to meet the unique functional requirements of your startup." },
            { title: "High-Availability Systems", definition: "Ensuring your software remains operational and performant under heavy demand." },
            { title: "Shared Flight Ideology", definition: "A commitment to partnership, ensuring our engineering excellence powers your success." }
        ],
        whyBetter: {
            performance: "We build scalable, high-performance architectures optimized for low latency and high throughput, ensuring seamless experiences for your users.",
            security: "Security is built into our core engineering practices, with rigorous code reviews and adherence to industry-standard protocols to prevent vulnerabilities.",
            optimality: "Our engineering process focuses on clean, maintainable code and robust architectural design, ensuring your systems are efficient and built for long-term sustainability."
        },
        icon: "Code2",
        accent: "bg-blue-600",
        image: "/assets/services/software.png",
        portfolioImages: ["/assets/services/software.png", "/assets/projects/p3.png", "/assets/projects/p1.png"],
        stats: [
            { label: "Scale", value: "Infinite" },
            { label: "Systems", value: "PaaS Ready" },
            { label: "Support", value: "Elite" }
        ]
    },
    {
        slug: "ai-dashboard",
        title: "AI Integrated Dashboards",
        description: "We interconnect your systems and let AI handle simple tasks.",
        detailedDescription: "We interconnect your systems and its functions, letting AI handle simple tasks like automations and data synchronization. An enterprise-grade oversight tool for startups to maintain total control with zero manual effort.",
        features: [
            "System Interconnection",
            "Automated Task Handling",
            "Function Syncing",
            "Predictive Alerts",
            "Enterprise Oversight",
            "Zero Manual Effort"
        ],
        featureDefinitions: [
            { title: "System Interconnection", definition: "Bridging diverse software tools to work as a unified, cohesive ecosystem." },
            { title: "Automated Task Handling", definition: "Using AI to execute routine, repetitive workflows without human intervention." },
            { title: "Function Syncing", definition: "Ensuring data and actions are consistent across all connected platforms in real-time." },
            { title: "Predictive Alerts", definition: "AI-driven notifications that anticipate issues before they disrupt your operations." },
            { title: "Enterprise Oversight", definition: "High-level dashboards providing total visibility into all your business activities." },
            { title: "Zero Manual Effort", definition: "Streamlining operations so you can focus on strategy rather than data entry or simple tasks." }
        ],
        whyBetter: {
            performance: "We leverage AI to streamline complex workflows, dramatically improving operational performance and reducing the time required for routine business tasks.",
            security: "Our dashboard integrates security monitoring with real-time alerts, ensuring your interconnected systems are protected and compliant at all times.",
            optimality: "Our dashboards provide a single source of truth, optimizing decision-making processes by presenting key metrics and actionable insights with zero manual effort."
        },
        icon: "BarChart3",
        accent: "bg-indigo-600",
        image: "/assets/projects/p2.png",
        portfolioImages: ["/assets/projects/p2.png", "/assets/projects/p1.png", "/assets/projects/p3.png"],
        stats: [
            { label: "Integration", value: "Seamless" },
            { label: "Tasks", value: "Automated" },
            { label: "Oversight", value: "Total" }
        ]
    },
    {
        slug: "ai-ecosystems",
        title: "AI & Automation",
        description: "Focuses on training, tuning and automating functions.",
        detailedDescription: "We focus on training, tuning, and automating functions using advanced LLM fine-tuning, RAG (Retrieval-Augmented Generation), neural networks, and hyperparameter optimization to build intelligent, autonomous ecosystems.",
        features: [
            "LLM Fine-Tuning",
            "RAG Implementation",
            "Hyperparameter Optimization",
            "Neural Network Training",
            "Autonomous Workflows",
            "Function Automation"
        ],
        featureDefinitions: [
            { title: "LLM Fine-Tuning", definition: "Customizing large language models to master your specific domain and style." },
            { title: "RAG Implementation", definition: "Connecting models to your proprietary data for accurate, context-aware responses." },
            { title: "Hyperparameter Optimization", definition: "Fine-tuning model configurations to achieve peak performance and efficiency." },
            { title: "Neural Network Training", definition: "Designing and training deep learning architectures for complex pattern recognition." },
            { title: "Autonomous Workflows", definition: "Creating self-running processes that adapt and optimize based on real-time data." },
            { title: "Function Automation", definition: "Replacing manual tasks with intelligent, code-based automations." }
        ],
        whyBetter: {
            performance: "Our AI training methodologies are optimized for speed and efficiency, delivering high-performance models that operate with minimal latency.",
            security: "We implement robust security measures for AI models, protecting them from adversarial attacks and ensuring the integrity of your data and insights.",
            optimality: "Through rigorous fine-tuning and optimization, we build autonomous systems that are highly tuned to your specific goals, achieving superior operational efficiency."
        },
        icon: "Brain",
        accent: "bg-purple-600",
        image: "/assets/services/ai.png",
        portfolioImages: ["/assets/services/ai.png", "/assets/projects/p1.png", "/assets/projects/p2.png"],
        stats: [
            { label: "Models", value: "Tuned" },
            { label: "RAG", value: "Integrated" },
            { label: "Autonomy", value: "High" }
        ]
    },
    {
        slug: "software-design",
        title: "UI/UX Design",
        description: "Share your brand's value with Delvare UI/UX psychology.",
        detailedDescription: "This calls for brands to share their value with Delvare UI/UX psychology. We implement cognitive load reduction, heuristic evaluation, conversion rate optimization, and intuitive micro-interactions to create perfect digital experiences.",
        features: [
            "UI/UX Psychology",
            "Cognitive Load Reduction",
            "Heuristic Evaluation",
            "Conversion Optimization",
            "Micro-Interactions",
            "Brand Value Integration"
        ],
        featureDefinitions: [
            { title: "UI/UX Psychology", definition: "Applying cognitive principles to design interfaces that users naturally understand and trust." },
            { title: "Cognitive Load Reduction", definition: "Simplifying complex interfaces to minimize user effort and maximize focus." },
            { title: "Heuristic Evaluation", definition: "Systematic expert reviews to identify and fix usability issues before they impact users." },
            { title: "Conversion Optimization", definition: "Designing user journeys specifically crafted to increase action-taking and sales." },
            { title: "Micro-Interactions", definition: "Small, intuitive animations that provide feedback and delight during user navigation." },
            { title: "Brand Value Integration", definition: "Ensuring every design element communicates your brand's core mission and personality." }
        ],
        whyBetter: {
            performance: "We design with performance in mind, ensuring interfaces are light, responsive, and provide an immediate, fluid user experience.",
            security: "Our UI design patterns include secure user authentication flows and clear feedback, building user trust and reducing the likelihood of accidental security errors.",
            optimality: "We utilize psychological insights to optimize user paths, ensuring that every design decision serves a clear purpose and maximizes user engagement."
        },
        icon: "Layout",
        accent: "bg-emerald-500",
        image: "/assets/services/design.png",
        portfolioImages: ["/assets/services/design.png", "/assets/projects/p1.png", "/assets/projects/p2.png"],
        stats: [
            { label: "Cognitive Load", value: "Low" },
            { label: "Conversion", value: "Optimized" },
            { label: "Experience", value: "Psychological" }
        ]
    },
    {
        slug: "cloud-hosting",
        title: "Cloud Solutions",
        description: "Manage, migrate, and start cloud systems for business efficiency.",
        detailedDescription: "We help manage, migrate, and start cloud systems for business efficiency and connectivity. From setting up the initial architecture to ongoing maintenance, we ensure your startup is always online, secure, and fast.",
        features: [
            "Cloud Migration",
            "System Management",
            "Architecture Setup",
            "Business Efficiency",
            "High Connectivity",
            "Always Online"
        ],
        featureDefinitions: [
            { title: "Cloud Migration", definition: "Securely and seamlessly transitioning your infrastructure to high-performance cloud environments." },
            { title: "System Management", definition: "Continuous monitoring and upkeep of your cloud resources to ensure optimal health." },
            { title: "Architecture Setup", definition: "Designing scalable cloud foundations tailored to your business needs." },
            { title: "Business Efficiency", definition: "Optimizing infrastructure costs and performance to boost your overall productivity." },
            { title: "High Connectivity", definition: "Ensuring low-latency, reliable access to your systems from anywhere in the world." },
            { title: "Always Online", definition: "Implementing redundant, high-uptime architectures to prevent downtime." }
        ],
        whyBetter: {
            performance: "Our cloud solutions are built on high-performance infrastructure, ensuring your applications are always fast, responsive, and ready for global traffic.",
            security: "Security is paramount in our cloud designs. We implement robust firewalls, automated threat detection, and secure access protocols to keep your data protected.",
            optimality: "We optimize your cloud architecture for both performance and cost, ensuring you receive the maximum value from your infrastructure with minimal operational overhead."
        },
        icon: "Cloud",
        accent: "bg-cyan-500",
        image: "/assets/services/cloud.png",
        portfolioImages: ["/assets/services/cloud.png", "/assets/projects/p3.png", "/assets/projects/p1.png"],
        stats: [
            { label: "Migration", value: "Smooth" },
            { label: "Efficiency", value: "High" },
            { label: "Uptime", value: "99.9%" }
        ]
    },
    {
        slug: "cyber-security",
        title: "Cyber Security",
        description: "Analyse testing, training and tuning AI models securely.",
        detailedDescription: "Our cyber security division helps analyze testing, training, and tuning AI models in systems. We perform rigorous security scans, penetration testing, and other services to guarantee zero vulnerabilities in your startup's infrastructure.",
        features: [
            "AI Model Security",
            "Vulnerability Scans",
            "Penetration Testing",
            "Zero-Trust Auth",
            "System Analysis",
            "Threat Mitigation"
        ],
        featureDefinitions: [
            { title: "AI Model Security", definition: "Hardening your AI models against adversarial attacks and unauthorized manipulation." },
            { title: "Vulnerability Scans", definition: "Automated, recurring checks to detect and patch security gaps." },
            { title: "Penetration Testing", definition: "Simulating real-world cyberattacks to test the resilience of your systems." },
            { title: "Zero-Trust Auth", definition: "Implementing strict access controls based on continuous verification." },
            { title: "System Analysis", definition: "Deep architectural review to identify weak points in your security posture." },
            { title: "Threat Mitigation", definition: "Proactive strategies to neutralize potential cyber threats." }
        ],
        whyBetter: {
            performance: "Our security solutions are engineered to be lightweight, ensuring robust protection without impacting system speed or user experience.",
            security: "We provide comprehensive, proactive defense against modern threats, constantly updating our security models to stay ahead of vulnerabilities.",
            optimality: "Our approach to security is risk-based and efficient, optimizing your security posture to focus resources on the most critical threats."
        },
        icon: "ShieldCheck",
        accent: "bg-red-600",
        image: "/assets/services/security.png",
        portfolioImages: ["/assets/services/security.png", "/assets/projects/p2.png", "/assets/projects/p3.png"],
        stats: [
            { label: "Threats", value: "Mitigated" },
            { label: "Scans", value: "Rigorous" },
            { label: "AI Models", value: "Secured" }
        ]
    },
    {
        slug: "technical-sla",
        title: "Managed Support",
        description: "Handle, business consultancy, analysis and our stake.",
        detailedDescription: "We provide comprehensive managed support: we handle technical issues, offer business consultancy, perform analysis, and share our stake in your scenario to ensure mutual growth and stability.",
        features: [
            "Business Consultancy",
            "Scenario Analysis",
            "Technical Handling",
            "Mutual Growth Stake",
            "24/7 Availability",
            "Strategic Support"
        ],
        featureDefinitions: [
            { title: "Business Consultancy", definition: "Expert advice and strategic planning to guide your business growth." },
            { title: "Scenario Analysis", definition: "Evaluating various business outcomes to prepare for future opportunities and challenges." },
            { title: "Technical Handling", definition: "Resolving technical bottlenecks and supporting your daily operational needs." },
            { title: "Mutual Growth Stake", definition: "Aligning our success with yours by actively investing in your business outcomes." },
            { title: "24/7 Availability", definition: "Around-the-clock support to ensure your business never stops." },
            { title: "Strategic Support", definition: "Ongoing, proactive assistance to align your technology and strategy." }
        ],
        whyBetter: {
            performance: "Our proactive monitoring and support ensure your systems operate at peak performance, with rapid incident resolution when issues arise.",
            security: "We offer ongoing security support and guidance, ensuring your business remains compliant and resilient as it scales.",
            optimality: "Our managed services are focused on long-term stability and growth, optimizing your processes and technology to deliver sustained value."
        },
        icon: "LifeBuoy",
        accent: "bg-amber-500",
        image: "/assets/services/support.png",
        portfolioImages: ["/assets/services/support.png", "/assets/projects/p1.png", "/assets/projects/p2.png"],
        stats: [
            { label: "Consultancy", value: "Strategic" },
            { label: "Support", value: "24/7" },
            { label: "Analysis", value: "Ongoing" }
        ]
    }
];
