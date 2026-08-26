import { AppStateData } from '../types';

export const initialData: AppStateData = {
  profile: {
    name: "Touseef",
    title: "Professional Web Developer",
    tagline: "I build modern, fast, responsive and high-converting websites for businesses, startups and personal brands using Next.js, React, Node.js and Tailwind.",
    bio: "With extensive development experience, I specialize in crafting bespoke web applications, high-converting e-commerce stores, and high-performance digital platforms tailored for business growth.",
    detailedBio: "I combine modern frontend and backend engineering (React, Next.js, Node.js, TypeScript) with meticulous UI/UX craftsmanship, fast turnarounds, and search engine optimization. My focus is delivering production-grade web solutions that are blazing fast, mobile-friendly, secure, and engineered to convert visitors into clients.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    location: "Islamabad, Pakistan",
    email: "saidzaminjc@gmail.com",
    phone: "03419068797",
    whatsappNumber: "03419068797",
    whatsappDefaultMessage: "Hello Touseef, I found your portfolio and would like to discuss a website project with you.",
    whatsappProjectMessage: "Hello Touseef, I would like to order a website. Here are my project requirements:",
    emailSubject: "Website Project Inquiry",
    emailDefaultMessage: "Hello Touseef, I found your portfolio and would like to discuss a new website project with you.",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://twitter.com",
    youtubeUrl: "https://www.youtube.com/@dakaravines",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    tiktokUrl: "https://tiktok.com",
    telegramUrl: "https://t.me",
    discordUrl: "https://discord.gg",
    
    // YouTube Section Settings
    youtubeFeaturedVideoId: "dQw4w9WgXcQ",
    youtubeShowcaseTitle: "Web Development Tutorials & System Architecture",
    youtubeShowcaseDescription: "Explore my YouTube channel for deep dives into full-stack development, modern web architecture, and clean code techniques.",
    showYoutubeSection: true,

    // Floating Contact Hub
    floatingContactEnabled: true,
    floatingShowWhatsapp: true,
    floatingShowEmail: true,
    floatingShowPhone: true,
    floatingShowYoutube: true,

    // Dynamic Social Links
    socialLinks: [
      {
        id: "soc-youtube",
        platform: "YouTube",
        label: "YouTube Channel",
        url: "https://www.youtube.com/@dakaravines",
        icon: "youtube",
        enabled: true,
        order: 1
      },
      {
        id: "soc-whatsapp",
        platform: "WhatsApp",
        label: "WhatsApp Direct",
        url: "https://wa.me/923419068797",
        icon: "whatsapp",
        enabled: true,
        order: 2
      },
      {
        id: "soc-github",
        platform: "GitHub",
        label: "GitHub Repositories",
        url: "https://github.com",
        icon: "github",
        enabled: true,
        order: 3
      },
      {
        id: "soc-linkedin",
        platform: "LinkedIn",
        label: "LinkedIn Profile",
        url: "https://linkedin.com",
        icon: "linkedin",
        enabled: true,
        order: 4
      },
      {
        id: "soc-twitter",
        platform: "Twitter",
        label: "X / Twitter",
        url: "https://twitter.com",
        icon: "twitter",
        enabled: true,
        order: 5
      },
      {
        id: "soc-instagram",
        platform: "Instagram",
        label: "Instagram",
        url: "https://instagram.com",
        icon: "instagram",
        enabled: true,
        order: 6
      },
      {
        id: "soc-telegram",
        platform: "Telegram",
        label: "Telegram Direct",
        url: "https://t.me",
        icon: "telegram",
        enabled: true,
        order: 7
      }
    ],

    yearsExperience: 7,
    projectsCompleted: 84,
    happyClients: 68,
    technologiesCount: 24,
    availableForHire: true,
    hourlyRate: 85,
    resumeUrl: "#"
  },
  seo: {
    siteTitle: "Alex Rivera | Professional Full-Stack Web Developer & Agency Portfolio",
    metaDescription: "Professional Web Developer crafting custom React/Next.js websites, e-commerce stores, WordPress portals, and business landing pages with exceptional speed & SEO.",
    keywords: [
      "Web Developer",
      "Full Stack Developer",
      "React Developer",
      "Next.js Portfolio",
      "E-Commerce Website Developer",
      "WordPress Expert",
      "Hire Freelance Web Developer",
      "Custom Web Development"
    ],
    canonicalUrl: "https://riveradev.com",
    ogImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    googleSiteVerification: "google-site-verification-token-demo",
    googleAnalyticsId: "G-DEVPORTFOLIO99",
    personSchemaJobTitle: "Lead Full-Stack Web Engineer",
    serviceSchemaAreaServed: "Worldwide & United States"
  },
  services: [
    {
      id: "srv-web-dev",
      title: "Website Development",
      slug: "website-development",
      shortDesc: "Modern responsive websites for businesses and individuals tailored for peak performance.",
      fullDesc: "End-to-end custom website development built from scratch with clean code, pristine responsive layouts for all viewports, dynamic animations, and fast load times.",
      iconName: "Globe",
      features: [
        "100% Mobile & Tablet Responsive",
        "Clean, semantic HTML5/CSS3 & modern TypeScript",
        "Search engine friendly structure & meta tags",
        "Cross-browser testing (Chrome, Safari, Firefox, Edge)",
        "Social media preview tags & analytics integration"
      ],
      startingPrice: 650,
      currency: "$",
      deliveryTime: "5-7 Days",
      popular: false
    },
    {
      id: "srv-business",
      title: "Business Websites",
      slug: "business-websites",
      shortDesc: "Professional websites for companies, corporate brands, and local businesses.",
      fullDesc: "Strategic corporate websites designed to build brand authority, generate inbound leads, showcase services, and provide an intuitive client contact experience.",
      iconName: "Building2",
      features: [
        "Corporate branding integration & custom layout",
        "Lead capture forms & CRM integrations",
        "Google Maps & Local SEO setup",
        "Customer testimonial & case study galleries",
        "High-security SSL & speed optimization"
      ],
      startingPrice: 950,
      currency: "$",
      deliveryTime: "7-10 Days",
      popular: true
    },
    {
      id: "srv-ecommerce",
      title: "E-Commerce Websites",
      slug: "ecommerce-websites",
      shortDesc: "Online stores with products, cart, checkout and complete order management.",
      fullDesc: "Scalable e-commerce web stores featuring seamless shopping carts, frictionless checkouts, inventory tracking, Stripe/PayPal payment gateways, and automated customer receipts.",
      iconName: "ShoppingBag",
      features: [
        "Product catalog with filtering, variations & search",
        "Stripe, PayPal, Apple Pay & Google Pay checkout",
        "Automated transactional emails & customer invoices",
        "Inventory management & discount coupon codes",
        "Cart abandonment recovery & SSL payment security"
      ],
      startingPrice: 1450,
      currency: "$",
      deliveryTime: "12-16 Days",
      popular: true
    },
    {
      id: "srv-landing-page",
      title: "Landing Pages",
      slug: "landing-pages",
      shortDesc: "High-converting landing pages for products, services and marketing campaigns.",
      fullDesc: "Laser-focused landing pages engineered for maximum conversion rates, with persuasive visual storytelling, frictionless CTAs, fast page speeds, and A/B test readiness.",
      iconName: "Zap",
      features: [
        "Persuasive copywriting structure & optical hierarchy",
        "Conversion-focused lead capture & calendar booking",
        "Sub-second load times & 95+ Google Lighthouse scores",
        "Interactive product demo or feature visualizer",
        "Integrated pixel tracking (Meta, Google, TikTok)"
      ],
      startingPrice: 450,
      currency: "$",
      deliveryTime: "3-5 Days",
      popular: false
    },
    {
      id: "srv-react-next",
      title: "React / Next.js Development",
      slug: "react-nextjs-development",
      shortDesc: "Modern web applications using React and Next.js with server-side rendering.",
      fullDesc: "Enterprise-grade React and Next.js applications featuring dynamic client-side state, server-side rendering (SSR), API routes, real-time sync, and headless CMS integrations.",
      iconName: "Code2",
      features: [
        "React 19, Next.js App Router & TypeScript",
        "Server-Side Rendering (SSR) & Static Site Generation (SSG)",
        "REST & GraphQL API integrations",
        "State management (Zustand/Redux) & smooth motion animations",
        "Automated unit testing & CI/CD deployment pipelines"
      ],
      startingPrice: 1200,
      currency: "$",
      deliveryTime: "10-14 Days",
      popular: false
    },
    {
      id: "srv-wordpress",
      title: "WordPress Development",
      slug: "wordpress-development",
      shortDesc: "Professional WordPress websites, custom theme development and customization.",
      fullDesc: "Bespoke WordPress solutions with custom themes, Elementor/Gutenberg page builders, lightweight plugin architectures, and ultra-easy client content management.",
      iconName: "Layers",
      features: [
        "Custom lightweight theme or builder setup",
        "Intuitive visual page builder for easy client editing",
        "WooCommerce store configuration",
        "Anti-spam, firewall & brute-force security lockdown",
        "Automated daily cloud backups & database tuning"
      ],
      startingPrice: 750,
      currency: "$",
      deliveryTime: "6-8 Days",
      popular: false
    },
    {
      id: "srv-redesign",
      title: "Website Redesign",
      slug: "website-redesign",
      shortDesc: "Modernize old websites with a new professional UI/UX, enhanced speed and mobile polish.",
      fullDesc: "Transform outdated legacy websites into modern, sleek digital showcases with improved visual hierarchy, updated branding, mobile responsiveness, and higher engagement.",
      iconName: "Palette",
      features: [
        "Comprehensive UI/UX audit & user flow revamp",
        "Modern layout refresh matching current design standards",
        "SEO preservation & 301 redirect management",
        "Performance boost (reducing page weight & script delays)",
        "Mobile usability and touch target optimization"
      ],
      startingPrice: 600,
      currency: "$",
      deliveryTime: "5-7 Days",
      popular: false
    },
    {
      id: "srv-maintenance",
      title: "Website Maintenance",
      slug: "website-maintenance",
      shortDesc: "Updates, fixes, security, backups and ongoing technical improvements.",
      fullDesc: "Peace-of-mind monthly maintenance retaining optimal site health, 24/7 uptime monitoring, security patches, content updates, and continuous performance tuning.",
      iconName: "ShieldCheck",
      features: [
        "Weekly security scans & plugin/package updates",
        "Automated off-site cloud backups",
        "Uptime monitoring with instant incident alerts",
        "Content changes, banner updates & minor feature tweaks",
        "Monthly performance & analytics reports"
      ],
      startingPrice: 180,
      currency: "$",
      deliveryTime: "Monthly Plan",
      popular: false
    }
  ],
  skills: [
    { id: "sk-html", name: "HTML5", category: "Frontend", proficiency: 98, experienceYears: 7, featured: true },
    { id: "sk-css", name: "CSS3 / Modern Layouts", category: "Frontend", proficiency: 96, experienceYears: 7, featured: true },
    { id: "sk-js", name: "JavaScript (ES6+)", category: "Frontend", proficiency: 95, experienceYears: 7, featured: true },
    { id: "sk-react", name: "React.js", category: "Frontend", proficiency: 94, experienceYears: 6, featured: true },
    { id: "sk-next", name: "Next.js", category: "Frontend", proficiency: 92, experienceYears: 5, featured: true },
    { id: "sk-tailwind", name: "Tailwind CSS", category: "Frontend", proficiency: 96, experienceYears: 5, featured: true },
    { id: "sk-bootstrap", name: "Bootstrap", category: "Frontend", proficiency: 90, experienceYears: 6, featured: false },
    { id: "sk-wordpress", name: "WordPress & WooCommerce", category: "CMS & Platforms", proficiency: 92, experienceYears: 6, featured: true },
    { id: "sk-php", name: "PHP", category: "Backend", proficiency: 86, experienceYears: 5, featured: true },
    { id: "sk-mysql", name: "MySQL / PostgreSQL", category: "Backend", proficiency: 88, experienceYears: 5, featured: true },
    { id: "sk-node", name: "Node.js / Express", category: "Backend", proficiency: 90, experienceYears: 5, featured: true },
    { id: "sk-git", name: "Git", category: "Tools & DevOps", proficiency: 94, experienceYears: 7, featured: true },
    { id: "sk-github", name: "GitHub / CI/CD", category: "Tools & DevOps", proficiency: 92, experienceYears: 6, featured: true },
    { id: "sk-uiux", name: "UI/UX Design & Wireframing", category: "Design & SEO", proficiency: 90, experienceYears: 6, featured: true },
    { id: "sk-responsive", name: "Responsive & Adaptive Design", category: "Design & SEO", proficiency: 98, experienceYears: 7, featured: true },
    { id: "sk-seo", name: "Technical SEO & Core Web Vitals", category: "Design & SEO", proficiency: 92, experienceYears: 5, featured: true }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Apex Logistics Global Portal",
      slug: "apex-logistics-portal",
      category: "Business",
      shortDescription: "A high-performance corporate platform with live freight tracking and automated quote calculator.",
      fullDescription: "Designed and engineered an enterprise-tier web portal for an international logistics provider, handling over 25,000 monthly inquiries with real-time route estimates.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Express", "PostgreSQL", "Google Maps API"],
      liveUrl: "https://apexlogistics-demo.example.com",
      githubUrl: "https://github.com/example/apex-logistics",
      featured: true,
      completionDate: "January 2026",
      clientName: "Apex Global Freight Corp",
      caseStudy: {
        overview: "Apex Logistics needed to replace an 8-year-old static site that failed on mobile devices and lost incoming shipment quote leads to competitors.",
        clientRequirements: [
          "Interactive shipment quote estimation tool",
          "Real-time carrier tracking lookup by container number",
          "Multi-language support (English, Spanish, German)",
          "Sub-1.2s mobile load time across global regions"
        ],
        problem: "The previous site had an 11-second load time, zero mobile optimization, and caused over 45% of potential clients to abandon the quote inquiry form before completion.",
        solution: "Engineered a custom React application with code-splitting, an intuitive step-by-step quote builder, automated tracking API endpoints, and a responsive corporate design system.",
        results: [
          "+142% Increase in monthly online quote requests",
          "Page load time reduced from 11.2s to 0.85s (92% improvement)",
          "Mobile bounce rate dropped from 64% to 22%",
          "Won 2025 Best Corporate Logistics Web UI award"
        ],
        developmentProcess: [
          { step: "Discovery & UX Wireframes", description: "Mapped customer quote conversion funnel and reduced input fields from 18 to 6 guided steps." },
          { step: "Design System & Prototyping", description: "Crafted high-contrast navy/slate UI components in Figma with dark/light accessibility." },
          { step: "Frontend & API Integration", description: "Built dynamic reactive state forms with real-time validation and tracking webhooks." },
          { step: "Performance & SEO Audit", description: "Optimized Core Web Vitals to reach 99/100 on Google PageSpeed Insights." }
        ],
        screenshots: [
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
        ],
        metrics: [
          { label: "Quote Conversion", value: "+142%" },
          { label: "Lighthouse Score", value: "99/100" },
          { label: "Mobile Speed", value: "0.85s" }
        ]
      }
    },
    {
      id: "proj-2",
      title: "Lumina Home Luxury E-Commerce",
      slug: "lumina-home-ecommerce",
      category: "E-Commerce",
      shortDescription: "A bespoke modern furniture store with 3D product previews, instant checkout, and custom filter engine.",
      fullDescription: "Engineered a high-end direct-to-consumer e-commerce destination with 1,200+ SKU capacity, Stripe payments, AR room visualizer, and custom search indexing.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      technologies: ["Next.js", "React", "Tailwind CSS", "Stripe API", "Node.js", "Zustand"],
      liveUrl: "https://luminahome-demo.example.com",
      githubUrl: "https://github.com/example/lumina-ecommerce",
      featured: true,
      completionDate: "November 2025",
      clientName: "Lumina Living Collective",
      caseStudy: {
        overview: "Lumina Living required a premier e-commerce store with high editorial aesthetics to match their luxury architectural furniture catalog.",
        clientRequirements: [
          "Fluid, editorial design with immersive full-bleed imagery",
          "Multi-currency support ($ USD, € EUR, £ GBP, $ CAD)",
          "Frictionless 1-page checkout with Apple Pay & Klarna",
          "Dynamic product configuration (finishes, fabrics, dimensions)"
        ],
        problem: "Their legacy Shopify template was generic, slow to load hi-res product photography, and suffered from high cart abandonment at checkout.",
        solution: "Built a headless Next.js e-commerce storefront with optimized WebP/AVIF image pipelines, optimistic cart updates, and a single-screen checkout modal.",
        results: [
          "$180,000+ GMV generated in the first 45 days after launch",
          "38% decrease in cart abandonment rate",
          "3.4x average session duration increase",
          "100% responsive across all mobile & tablet devices"
        ],
        developmentProcess: [
          { step: "Catalog Architecture", description: "Structured multi-attribute variant data model for custom fabric & timber configurations." },
          { step: "High-Performance Storefront", description: "Created responsive grid layouts with micro-interactions and smooth slide-out drawer cart." },
          { step: "Stripe & Webhook Integration", description: "Engineered secure checkout with automatic sales tax and shipping rate calculators." },
          { step: "Global CDN Deployment", description: "Configured edge caching for sub-100ms response times globally." }
        ],
        screenshots: [
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80"
        ],
        metrics: [
          { label: "Checkout Conversion", value: "+38%" },
          { label: "First 45 Days GMV", value: "$180k+" },
          { label: "Image Load Time", value: "0.4s" }
        ]
      }
    },
    {
      id: "proj-3",
      title: "PulseMetrics SaaS Analytics App",
      slug: "pulsemetrics-saas-analytics",
      category: "Web Application",
      shortDescription: "A full-featured real-time KPI and subscription analytics dashboard for modern SaaS founders.",
      fullDescription: "Developed an interactive web application featuring customizable widget grids, real-time ARR/MRR charting, churn forecasting, and team role permissions.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      technologies: ["React 19", "TypeScript", "Tailwind CSS", "Recharts", "Express", "JWT Auth"],
      liveUrl: "https://pulsemetrics-demo.example.com",
      githubUrl: "https://github.com/example/pulsemetrics-app",
      featured: true,
      completionDate: "December 2025",
      clientName: "PulseMetrics Inc.",
      caseStudy: {
        overview: "PulseMetrics was building an analytics tool for tech founders and needed a lightning-fast web app interface with complex data visualizations.",
        clientRequirements: [
          "Real-time chart rendering without UI lag on 100k+ data points",
          "Customizable drag-and-drop metric cards",
          "Dark mode / Light mode toggle with user preferences",
          "Role-based team permission controls"
        ],
        problem: "The initial proof of concept had severe memory leaks and UI freezing whenever users switched between multi-year date filters.",
        solution: "Refactored the frontend into modular memoized React components with virtualized datasets, high-performance canvas/SVG charts, and JWT authentication.",
        results: [
          "Zero frame drops even during 50,000+ data point live streaming",
          "Adopted by 450+ SaaS startups in private beta",
          "Reduced client-side bundle size by 62%",
          "User retention increased by 44%"
        ],
        developmentProcess: [
          { step: "Data Pipeline Modeling", description: "Designed clean API schemas for aggregation of MRR, LTV, and churn events." },
          { step: "Dashboard Architecture", description: "Engineered responsive dashboard grid with widget layout customization." },
          { step: "Data Visualizations", description: "Implemented responsive SVG charts with tooltips and zoom capabilities." },
          { step: "Security & Role Access", description: "Built secure authentication layer with protected routes and RBAC guards." }
        ],
        screenshots: [
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
        ],
        metrics: [
          { label: "Active Startups", value: "450+" },
          { label: "Bundle Reduction", value: "62%" },
          { label: "Data Rendering", value: "<16ms" }
        ]
      }
    },
    {
      id: "proj-4",
      title: "Aura Dental Studio Brand & Booking",
      slug: "aura-dental-studio",
      category: "WordPress",
      shortDescription: "Custom WordPress website for a premier cosmetic dental practice with online appointment booking.",
      fullDescription: "Crafted an elegant, calming patient-facing website with custom before-and-after smile transformation gallery and integrated Cal.com appointment scheduling.",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
      technologies: ["WordPress", "PHP", "Tailwind CSS", "JavaScript", "Custom Gutenberg Blocks"],
      liveUrl: "https://auradental-demo.example.com",
      githubUrl: "",
      featured: false,
      completionDate: "October 2025",
      clientName: "Aura Dental Aesthetics",
      caseStudy: {
        overview: "Aura Dental needed to modernize their local clinical presence to attract high-value cosmetic dentistry and smile makeover patients.",
        clientRequirements: [
          "Before & After interactive image comparison slider",
          "HIPAA-compliant patient appointment intake form",
          "Doctor bio profiles and video treatment walk-throughs",
          "Top 3 Google local pack rankings in their metro area"
        ],
        problem: "Outdated template with stock medical graphics was failing to communicate premium service tier, resulting in low conversion of high-ticket cosmetic consultations.",
        solution: "Built a custom lightweight WordPress theme with custom Gutenberg blocks, interactive smile comparison sliders, and comprehensive local SEO schema markup.",
        results: [
          "+210% Increase in online consultation bookings",
          "Ranked #1 on Google for 'Cosmetic Dentist San Francisco'",
          "Over 3,000 monthly local organic visitors",
          "Average patient case value increased by 35%"
        ],
        developmentProcess: [
          { step: "Brand & Content Strategy", description: "Created clean aesthetic color palette evoking tranquility, precision and cleanliness." },
          { step: "Custom Block Development", description: "Built custom Gutenberg modules for treatments, pricing transparency, and doctor bios." },
          { step: "Booking Engine", description: "Integrated calendar availability with automated SMS/email appointment confirmations." },
          { step: "Local SEO & Structured Data", description: "Implemented Dentist and MedicalBusiness JSON-LD schemas with geo-coordinates." }
        ],
        screenshots: [
          "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
        ],
        metrics: [
          { label: "Bookings Boost", value: "+210%" },
          { label: "Google Rank", value: "#1 Local" },
          { label: "Page Speed", value: "98/100" }
        ]
      }
    },
    {
      id: "proj-5",
      title: "HyperFlow AI Launch Landing Page",
      slug: "hyperflow-ai-landing-page",
      category: "Landing Page",
      shortDescription: "Ultra high-converting product launch page with interactive workflow animations and waitlist system.",
      fullDescription: "Built a viral product launch page that generated 14,000+ early access waitlist signups in 72 hours, featuring interactive prompt simulations and smooth scrolling.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Motion", "Vite"],
      liveUrl: "https://hyperflow-demo.example.com",
      githubUrl: "https://github.com/example/hyperflow-landing",
      featured: false,
      completionDate: "February 2026",
      clientName: "HyperFlow Technologies",
      caseStudy: {
        overview: "HyperFlow was launching a generative developer tool and needed a launch page that demonstrated product capability visually before launch day.",
        clientRequirements: [
          "Interactive interactive workflow simulator",
          "Social referral waitlist engine with live rank tracking",
          "Responsive animations that do not drop 60fps on mobile",
          "Seamless email verification and webhook alerts"
        ],
        problem: "Complex technical product that was difficult to explain with standard static text without losing visitor interest.",
        solution: "Created an interactive terminal preview simulator where visitors could click sample prompts and watch real-time simulated AI outputs with buttery smooth animations.",
        results: [
          "14,200+ Waitlist signups collected in first 3 days",
          "41.8% visitor-to-waitlist conversion rate",
          "#1 Product of the Day on Product Hunt launch",
          "Featured on Hacker News front page"
        ],
        developmentProcess: [
          { step: "Interactive Sandbox Design", description: "Created an interactive browser terminal component to demonstrate code generation." },
          { step: "Viral Referral System", description: "Engineered unique referral links that bump users up the queue when shared." },
          { step: "Animation Optimization", description: "Tuned GPU transform layers with Motion for smooth 60 FPS transitions." }
        ],
        screenshots: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
        ],
        metrics: [
          { label: "Waitlist Signups", value: "14.2k+" },
          { label: "Conversion Rate", value: "41.8%" },
          { label: "Product Hunt", value: "#1 Top" }
        ]
      }
    },
    {
      id: "proj-6",
      title: "Elena Vance Creative Architect Portfolio",
      slug: "elena-vance-architect-portfolio",
      category: "Portfolio",
      shortDescription: "Minimalist, editorial portfolio with smooth grid transitions and high-resolution architectural photography.",
      fullDescription: "Created an award-winning minimal portfolio website for an architectural designer showcasing blueprints, completed buildings, and international press features.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Motion"],
      liveUrl: "https://elenavance-demo.example.com",
      githubUrl: "",
      featured: false,
      completionDate: "September 2025",
      clientName: "Studio Elena Vance",
      caseStudy: {
        overview: "Studio Elena Vance required a showcase portfolio that would appeal to luxury residential property developers and cultural institution commissions.",
        clientRequirements: [
          "High editorial typography pairing and ample whitespace",
          "Smooth fullscreen image modal with zoom capabilities",
          "Interactive project timeline & awards chronology",
          "Fast loading despite 80+ high-resolution 4K project photos"
        ],
        problem: "Previous portfolio suffered from sluggish image rendering, clunky navigation, and poor mobile layout.",
        solution: "Built a bespoke responsive layout with progressive lazy image loading, smooth modal transitions, and curated editorial typography.",
        results: [
          "Secured 3 major residential architectural contracts ($1.4M+ project value)",
          "Awwwards Site of the Day nominee",
          "Flawless mobile presentation across all iOS and Android devices",
          "Zero layout shift (CLS: 0.00)"
        ],
        developmentProcess: [
          { step: "Architectural Grid Layout", description: "Created an asymmetric golden-ratio grid system for project presentations." },
          { step: "Progressive Image Loading", description: "Implemented blurred thumbnail placeholders with seamless full-res transitions." },
          { step: "Motion Curation", description: "Added subtle kinetic scroll indicators and smooth page transitions." }
        ],
        screenshots: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
        ],
        metrics: [
          { label: "Contract Value Won", value: "$1.4M+" },
          { label: "Cumulative Layout Shift", value: "0.00" },
          { label: "Avg Session", value: "4m 12s" }
        ]
      }
    }
  ],
  pricing: [
    {
      id: "pkg-starter",
      name: "Starter Package",
      tier: "Starter",
      tagline: "Ideal for personal websites, portfolio showcases & small projects.",
      price: 650,
      currency: "$",
      billingPeriod: "project",
      features: [
        "Up to 3 Custom Designed Pages",
        "100% Mobile & Tablet Responsive Layout",
        "Clean, Fast Modern Code (React or HTML5)",
        "Contact Form with Email Notifications",
        "Social Media & WhatsApp Integration",
        "Basic On-Page SEO Setup",
        "Free 30-Day Post-Launch Support"
      ],
      notIncluded: [
        "E-Commerce & Online Store Functionality",
        "Complex Database / User Accounts",
        "Custom CMS Dashboard"
      ],
      deliveryDays: 5,
      revisions: "3 Rounds of Revisions",
      popular: false
    },
    {
      id: "pkg-professional",
      name: "Professional Package",
      tier: "Professional",
      tagline: "Perfect for growing businesses, startups & high-converting service companies.",
      price: 1250,
      currency: "$",
      billingPeriod: "project",
      features: [
        "Up to 8 Custom Designed Pages",
        "Custom UI/UX Design System & Typography",
        "Built with React / Next.js or WordPress",
        "Interactive Components & Micro-animations",
        "Lead Generation Forms & CRM Integration",
        "Google Analytics & Search Console Setup",
        "Advanced Technical SEO & Schema Markup",
        "Speed Optimization (90+ Google PageSpeed)",
        "Free 60-Day Post-Launch Support"
      ],
      notIncluded: [
        "Advanced Multi-Vendor Marketplace Systems"
      ],
      deliveryDays: 10,
      revisions: "Unlimited Revisions during build",
      popular: true
    },
    {
      id: "pkg-premium",
      name: "Premium / Enterprise",
      tier: "Premium",
      tagline: "For advanced websites, custom web applications & high-scale e-commerce stores.",
      price: 2400,
      currency: "$",
      billingPeriod: "project",
      features: [
        "Unlimited / Multi-Page Custom Architecture",
        "Full E-Commerce Store or Custom Web App",
        "Stripe / PayPal Payment Gateway Integration",
        "User Authentication, Client Portals & Database",
        "Custom API Integrations & Webhooks",
        "Dynamic Product Filters & Instant Search",
        "Comprehensive Security Lockdown & SSL Setup",
        "Automated Cloud Backups & CI/CD Pipeline",
        "Priority VIP 90-Day Direct Support & Training"
      ],
      deliveryDays: 16,
      revisions: "Unlimited Dedicated Revisions",
      popular: false
    }
  ],
  testimonials: [
    {
      id: "test-1",
      clientName: "David Sterling",
      clientRole: "CEO & Founder",
      company: "Apex Global Freight",
      clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      projectType: "Corporate Business Portal",
      comment: "Alex completely transformed our online presence. Our quote inquiries increased by over 140% within the first month. He communicated proactively at every step and delivered ahead of schedule.",
      projectUrl: "https://apexlogistics-demo.example.com",
      date: "January 2026",
      verified: true
    },
    {
      id: "test-2",
      clientName: "Sophia Chen",
      clientRole: "Creative Director",
      company: "Lumina Living Collective",
      clientAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      projectType: "Luxury E-Commerce Store",
      comment: "Working with Alex was the smoothest development experience we've ever had. He has an incredible eye for high-end design paired with rock-solid coding skills. The store runs blazing fast!",
      projectUrl: "https://luminahome-demo.example.com",
      date: "December 2025",
      verified: true
    },
    {
      id: "test-3",
      clientName: "Marcus Vance",
      clientRole: "Co-Founder",
      company: "PulseMetrics Inc.",
      clientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      projectType: "SaaS Web Application",
      comment: "The speed and responsiveness of our analytics dashboard is extraordinary. Alex solved complex real-time charting performance issues that other developers couldn't fix. Highly recommended!",
      projectUrl: "https://pulsemetrics-demo.example.com",
      date: "November 2025",
      verified: true
    },
    {
      id: "test-4",
      clientName: "Dr. Rachel Adams",
      clientRole: "Principal Dentist",
      company: "Aura Dental Studio",
      clientAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      projectType: "Medical Practice Website",
      comment: "Our new website looks stunning and we've reached #1 on Google in our area! Our appointment intake is now completely automated, saving our front desk staff hours every single day.",
      projectUrl: "https://auradental-demo.example.com",
      date: "October 2025",
      verified: true
    }
  ],
  orders: [
    {
      id: "ord-1",
      trackingCode: "ORD-89214",
      createdAt: "2026-02-18T10:30:00.000Z",
      updatedAt: "2026-02-24T15:00:00.000Z",
      status: "In Progress",
      clientName: "Michael Thorne",
      clientEmail: "m.thorne@thorneventures.io",
      clientPhone: "+1 (312) 555-0192",
      clientCountry: "United States",
      clientCompany: "Thorne Ventures Capital",
      projectType: "Business Websites",
      websiteType: "Venture Capital & Portfolio Showcase",
      pageCount: "5-8 Pages",
      requiredFeatures: ["Responsive Design", "Portfolio Showcase", "Contact Form", "SEO Setup", "Interactive Pitch Deck Viewer"],
      preferredTechnology: "React / Next.js",
      designPreference: "Minimalist, High-Contrast Dark & Slate Theme",
      existingWebsiteUrl: "https://thorneventures-old.com",
      referenceWebsites: "https://stripe.com, https://benchmark.com",
      projectDescription: "We need a clean, authoritative website to showcase our fund investments, portfolio founders, and investment thesis with fast loading speeds.",
      additionalRequirements: "Please ensure mobile responsiveness is top tier as many founders view our site on iPhones.",
      selectedPackage: "Professional Package",
      currency: "$",
      timeline: "2 Weeks",
      agreedPrice: 1250,
      deadline: "2026-03-05",
      attachments: [
        {
          id: "att-1",
          name: "Thorne_Brand_Guidelines.pdf",
          size: 2450000,
          type: "application/pdf",
          dataUrl: "#",
          uploadedAt: "2026-02-18T10:30:00.000Z"
        }
      ],
      milestones: [
        { id: "m-1", title: "Project Scope & Wireframes Approved", description: "Finalized site map and interactive Figma layouts.", status: "completed", completedAt: "2026-02-20" },
        { id: "m-2", title: "Frontend Architecture & Theme Setup", description: "Built responsive Next.js components and dark mode theme.", status: "completed", completedAt: "2026-02-23" },
        { id: "m-3", title: "Interactive Portfolio & Pitch Deck", description: "Developing dynamic investment filters and modal viewers.", status: "in-progress" },
        { id: "m-4", title: "QA Testing, SEO & Final Launch", description: "Speed optimization, Google Search Console, and DNS launch.", status: "pending" }
      ],
      messages: [
        {
          id: "msg-1",
          sender: "client",
          senderName: "Michael Thorne",
          content: "Hi Alex, excited to work with you on the new Thorne Ventures platform!",
          timestamp: "2026-02-18T10:32:00.000Z"
        },
        {
          id: "msg-2",
          sender: "admin",
          senderName: "Alex Rivera",
          content: "Welcome Michael! I've reviewed your brand guidelines and initial requirements. The wireframes are coming along nicely and I will share the live preview link shortly.",
          timestamp: "2026-02-18T14:15:00.000Z"
        },
        {
          id: "msg-3",
          sender: "admin",
          senderName: "Alex Rivera",
          content: "Milestone 2 is completed! The core Next.js shell and portfolio grid layout are ready. Moving on to the interactive pitch viewer today.",
          timestamp: "2026-02-23T16:00:00.000Z"
        }
      ],
      adminNotes: "Client requested modern slate colors. High priority client. Deposit confirmed.",
      paymentStatus: "Deposit Paid"
    },
    {
      id: "ord-2",
      trackingCode: "ORD-94301",
      createdAt: "2026-02-24T09:12:00.000Z",
      updatedAt: "2026-02-24T09:12:00.000Z",
      status: "New",
      clientName: "Clara Johansson",
      clientEmail: "clara@nordicglow.se",
      clientPhone: "+46 8 123 4567",
      clientCountry: "Sweden",
      clientCompany: "Nordic Glow Skincare",
      projectType: "E-Commerce Websites",
      websiteType: "Organic Skincare Online Store",
      pageCount: "8+ Pages",
      requiredFeatures: ["Shopping Cart & Stripe Checkout", "Product Reviews", "Multi-Currency", "Discount Codes", "Instagram Feed"],
      preferredTechnology: "React / Next.js with Stripe",
      designPreference: "Clean, Scandinavian Warm Neutrals with generous whitespace",
      existingWebsiteUrl: "",
      referenceWebsites: "https://glossier.com, https://aesop.com",
      projectDescription: "Launching a new organic skincare line with 12 initial products. Need high conversion checkout and elegant mobile experience.",
      additionalRequirements: "Need currency toggle for EUR, USD and SEK.",
      selectedPackage: "Premium / Enterprise",
      currency: "$",
      timeline: "1 Month",
      agreedPrice: 2400,
      deadline: "2026-03-28",
      attachments: [],
      milestones: [
        { id: "m-201", title: "Order Initial Review & Consultation", description: "Reviewing project specs and scheduling kick-off call.", status: "in-progress" },
        { id: "m-202", title: "Design Concept & Store Architecture", description: "Product catalog structure and UI wireframes.", status: "pending" },
        { id: "m-203", title: "E-Commerce Checkout & Payment Integration", description: "Stripe and multi-currency engine.", status: "pending" },
        { id: "m-204", title: "Launch & Training", description: "Final testing and staff tutorial for adding new products.", status: "pending" }
      ],
      messages: [
        {
          id: "msg-201",
          sender: "client",
          senderName: "Clara Johansson",
          content: "Hello Alex! We just submitted our order for our skincare store launch. Looking forward to your review!",
          timestamp: "2026-02-24T09:15:00.000Z"
        }
      ],
      adminNotes: "New inquiry from Sweden. Ready for initial kick-off contact.",
      paymentStatus: "Pending Deposit"
    }
  ],
  messages: [
    {
      id: "cmsg-1",
      name: "Jonathan Ward",
      email: "j.ward@wardtech.co",
      subject: "Inquiry regarding Custom Web App Redesign",
      message: "Hi Alex, I came across your portfolio on GitHub. We have an existing React dashboard that needs a complete UI overhaul and performance tuning. Are you available for a quick chat this week?",
      createdAt: "2026-02-24T18:40:00.000Z",
      read: false,
      replied: false
    },
    {
      id: "cmsg-2",
      name: "Sarah Jenkins",
      email: "sarah@jenkinscoffee.com",
      subject: "Landing page for specialty coffee brand",
      message: "Hello! We are launching a subscription coffee box and loved your Lumina Living case study. Would love to know your availability for a 2-week turnaround landing page.",
      createdAt: "2026-02-23T11:20:00.000Z",
      read: true,
      replied: true
    }
  ]
};
