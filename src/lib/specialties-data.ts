import { Cloud, Brain, Layout, ShieldCheck, LifeBuoy, GitBranch, Zap, MessageSquare, Code2, Search, TrendingUp, Smartphone, Globe, BarChart3, Rocket, LineChart } from 'lucide-react';

export const specialties = [
    {
        slug: "seo-optimization",
        title: "Delvare Fixing SEO",
        description: "We breathe life into your brand, building deep trust and emotional connections that drive real growth.",
        detailedDescription: "Beyond keywords and algorithms, we focus on the human heart of your business. Delvare fixing SEO means transforming your digital presence into a compelling narrative that captures emotion, builds unwavering trust, and shares your genuine value with the world. We craft creative, soul-stirring campaigns that don't just rank, but resonate deeply with your audience to build lifelong loyalty.",
        features: [
            "Emotional Brand Storytelling",
            "Trust-Building Content",
            "Creative SEO Strategies",
            "Audience Empathy Mapping",
            "Authentic Outreach",
            "Organic Growth Architecture"
        ],
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
