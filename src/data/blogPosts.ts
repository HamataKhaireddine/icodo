export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  author: string
  body: string[]
  gradient: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'choosing-the-right-stack',
    title: 'Choosing the right stack for your first product launch',
    excerpt:
      'How we evaluate speed, maintainability, and hiring when starting a new web or mobile project — without chasing hype.',
    category: 'Product',
    date: 'Mar 12, 2026',
    readTime: '8 min read',
    author: 'Ahmad Hassan Khan',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)',
    body: [
      'Launching a digital product is rarely about picking the trendiest framework. It is about matching your timeline, team, and growth plans to tools you can maintain twelve months after launch — when the demo magic has worn off and real users are depending on you.',
      'At ICODO we start every engagement with constraints: budget, team size, expected user load, and how quickly the business needs to learn from the market. Those inputs matter more than whether you use Next.js, Remix, or something else entirely.',
      'For most greenfield web products we default to React on the front end and Node.js or serverless APIs on the back end. That combination gives fast iteration, a deep hiring pool in Qatar and internationally, and predictable hosting on Vercel or AWS.',
      'When e-commerce is central, we often integrate Shopify or a headless storefront. Merchandising teams can update collections, pricing, and campaigns without waiting on engineering for every catalog change — a operational win that compounds over time.',
      'Mobile needs are evaluated separately. If the experience requires push notifications, offline access, or heavy device APIs, React Native or native iOS/Android may be worth the investment. Otherwise a responsive progressive web app keeps one codebase and ships faster.',
      'Database choice follows data shape and scale expectations. PostgreSQL handles most SaaS and enterprise workloads reliably. We reach for Redis when caching or job queues matter, and document stores only when the domain genuinely fits unstructured data.',
      'The anti-pattern we see most often is over-engineering for scale you do not have yet. Microservices, Kubernetes, and exotic databases make sense at millions of users — not at MVP. A modular monolith with clear boundaries often gets you to product-market fit faster and cheaper.',
      'The right stack is the one your team can operate confidently after we hand off — documented, tested, and aligned with how you actually plan to grow.',
    ],
  },
  {
    slug: 'pos-inventory-ecommerce-flow',
    title: 'Connecting POS, inventory, and e-commerce in one flow',
    excerpt:
      'Lessons from retail clients who needed real-time stock across stores and online channels — and what broke when they did not have it.',
    category: 'Retail',
    date: 'Feb 8, 2026',
    readTime: '10 min read',
    author: 'Khair-eddine Hamata',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #2563eb 100%)',
    body: [
      'Retail operators in Qatar and the wider GCC often sell in-store, online, and through marketplaces simultaneously. Without a single source of truth for inventory, overselling and manual reconciliation become daily fire drills — not edge cases.',
      'The symptom is familiar: a customer orders online, drives to the store, and the item is not on the shelf. Or worse, you sell the last unit twice because the POS and website never synced. Staff lose trust in the system. Customers lose trust in you.',
      'We design flows where the POS is the operational hub. Every sale, return, transfer, and adjustment updates stock levels immediately. Online channels read from the same inventory service, so customers only see what is actually available.',
      'Event-driven architecture helps here. When a sale completes, an inventory event propagates to e-commerce, reporting, and any fulfillment systems subscribed to the stream. No batch jobs running every hour hoping nothing changed in between.',
      'Kitchen and back-of-house workflows can subscribe to the same events. When an order is placed, prep screens and picker apps update without duplicate data entry — the same pattern we use for retail POS suites and food-service operators.',
      'Reporting becomes simpler too. Revenue, stock movement, shrinkage, and channel performance live in one dashboard instead of three disconnected spreadsheets that finance reconciles at month-end.',
      'Implementation details vary by business: number of locations, existing ERP integrations, whether Shopify or a custom storefront is in play. But the principle holds — one inventory model, many touchpoints, zero silent desync.',
      'If you are planning omnichannel retail, inventory architecture should be decided in week one of discovery — not bolted on after launch when bad data is already in production.',
    ],
  },
  {
    slug: 'design-systems-that-scale',
    title: 'Design systems that scale with your brand',
    excerpt:
      'Why consistent UI tokens and components save time as your marketing and product surfaces grow — and how to start without a six-month side project.',
    category: 'Design',
    date: 'Jan 22, 2026',
    readTime: '7 min read',
    author: 'ICODO Team',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)',
    body: [
      'A design system is not a Figma library you never open. It is the shared language between design, marketing, and engineering — colors, spacing, typography, and components that stay aligned as you ship more pages, campaigns, and product areas.',
      'We start with tokens: primary and accent colors, neutrals, border radii, and type scales. Those tokens become CSS variables in code so the live site, landing pages, and email templates reuse the same values without manual copy-paste.',
      'Components come next — buttons, inputs, cards, navigation patterns, form validation states. Documented once, implemented once, reused everywhere. That is how Stripe and Linear feel cohesive even with dozens of teams contributing.',
      'For early-stage companies, a full design system can feel like overkill. We recommend a pragmatic middle path: token file plus ten to fifteen core components that cover eighty percent of your UI. Expand as patterns repeat.',
      'The payoff shows up when you add a pricing page, a blog, a customer portal, or a new product line. Instead of reinventing layout and styling, teams assemble from proven pieces and ship faster with fewer visual inconsistencies.',
      'Accessibility belongs in the system from day one — focus states, contrast ratios, keyboard navigation on modals and menus. Retrofitting accessibility after launch costs more and often gets deprioritized.',
      'For growing businesses in Qatar and the region, visual consistency reads as professionalism. It signals that you invest in quality — and it reduces cost every time you launch something new.',
    ],
  },
  {
    slug: 'mvp-scope-without-overbuilding',
    title: 'How to scope an MVP without overbuilding',
    excerpt:
      'The difference between a minimum viable product and a minimum viable demo — and how to cut scope without cutting value.',
    category: 'Product',
    date: 'Jan 5, 2026',
    readTime: '9 min read',
    author: 'Ahmad Hassan Khan',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #38bdf8 100%)',
    body: [
      'Founders often confuse MVP with "everything we might ever need." The result is a six-month build, a burned budget, and a product nobody has validated with real users.',
      'An MVP should answer one critical question: will people pay for this — or use it enough that payment becomes obvious? Everything else is negotiable.',
      'We use a simple framework in discovery: Must Have for launch, Should Have for month two, Could Have for later, Won\'t Have for this phase. Stakeholders rank features honestly. Engineering estimates the Must Haves only.',
      'Authentication is a common trap. If you are B2B with ten pilot customers, email magic links or invite-only access beats building SSO, social login, and password recovery flows on day one.',
      'Admin panels are another. Founders want dashboards before they have data worth dashboarding. Often a well-structured database and a Retool or internal script is enough until usage patterns are clear.',
      'Integrations multiply scope fast. Each third-party API — payments, CRM, accounting, shipping — is a mini-project. Launch with one payment provider, one email tool, and add others when revenue justifies the complexity.',
      'What you should not cut: security basics, error handling users can understand, and analytics so you know what people actually do. An MVP that loses user data or crashes silently is not viable — it is a liability.',
      'The best MVPs feel focused. Users understand the value proposition in thirty seconds and can complete the core action without a tutorial. That clarity is a feature.',
    ],
  },
  {
    slug: 'custom-vs-off-the-shelf',
    title: 'When to build custom software vs. buy off the shelf',
    excerpt:
      'A decision framework we use with clients debating Shopify, Salesforce, or a bespoke platform.',
    category: 'Strategy',
    date: 'Dec 14, 2025',
    readTime: '8 min read',
    author: 'ICODO Team',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #0f172a 100%)',
    body: [
      'Not every problem needs custom code. Sometimes the right answer is Shopify, HubSpot, or a vertical SaaS product — shipped this week instead of this quarter.',
      'Buy when your workflow matches the product\'s defaults, differentiation is low, and speed to market matters more than unique UX. A standard e-commerce store with standard checkout is a classic buy case.',
      'Build when the workflow is your competitive advantage, integrations are unusual, or off-the-shelf tools force compromises that hurt revenue or operations. Custom POS with kitchen displays and multi-location inventory is a build case.',
      'Hybrid is often optimal: Shopify for catalog and checkout, custom middleware for ERP sync and loyalty logic. Headless commerce exists because the buy-vs-build line is rarely binary.',
      'Total cost of ownership surprises people. Subscription fees look cheap until you add plugins, agency hours, and workarounds for features the platform does not support natively. Custom build has higher upfront cost but predictable long-term control.',
      'Team capability matters. Buying Shopify does not eliminate engineering — it shifts it to integrations, theme customization, and data pipelines. Be honest about who will operate the system after launch.',
      'We help clients map this in discovery sprints: document workflows, score differentiation, estimate build vs. configure costs over three years. The answer should be a recommendation with numbers, not a sales pitch for custom work.',
    ],
  },
  {
    slug: 'ai-in-production-sme',
    title: 'AI in production: what actually works for SMEs',
    excerpt:
      'Beyond the hype — practical AI use cases we have shipped for regional businesses and what to avoid.',
    category: 'AI',
    date: 'Nov 28, 2025',
    readTime: '11 min read',
    author: 'Khair-eddine Hamata',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
    body: [
      'Every board deck mentions AI. Few SMEs know where it creates margin versus where it creates slide deck filler. We have shipped AI features that users rely on daily — and passed on ideas that sounded impressive but solved no real problem.',
      'What works: document summarization for internal teams, customer support triage with human handoff, image generation for visualization products like exterior design previews, and structured data extraction from invoices or forms.',
      'What often fails: fully autonomous customer-facing chatbots with no escalation path, generic "AI-powered" dashboards that regurgitate existing reports, and fine-tuned models when a well-prompted API call would suffice.',
      'Latency and cost matter at SME scale. A feature that adds four seconds to every request or costs more per user than your margin allows is not production-ready — regardless of model quality.',
      'Human-in-the-loop is not a compromise; it is good product design. MAAN\'s AI previews accelerate decisions; humans still approve purchases. Support AI drafts replies; agents still send them.',
      'Data privacy and regional expectations require upfront planning. Where is data processed? Are prompts logged? Do you need on-premise or regional cloud deployment for sensitive industries?',
      'Start with one workflow, measure time saved or conversion impact, then expand. AI roadmaps that promise ten features in quarter one usually deliver zero that anyone uses.',
      'The businesses winning with AI treat it as infrastructure for a specific outcome — not a marketing badge on the homepage.',
    ],
  },
  {
    slug: 'discovery-sprint-roi',
    title: 'Why a two-week discovery sprint pays for itself',
    excerpt:
      'How structured discovery de-risks builds, aligns stakeholders, and prevents six-figure scope mistakes.',
    category: 'Process',
    date: 'Nov 10, 2025',
    readTime: '7 min read',
    author: 'Ahmad Hassan Khan',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #2563eb 55%, #38bdf8 100%)',
    body: [
      'The most expensive line in software is "we assumed that was included." Discovery sprints exist to surface assumptions before they become change orders.',
      'In two weeks we run stakeholder workshops, map user journeys, audit technical feasibility, produce wireframes for core flows, and deliver a fixed-scope proposal for the build phase.',
      'Clients leave with a roadmap they can execute with us or with another team — the artifact has standalone value. That is intentional; discovery should not feel like a sales trap.',
      'We regularly find that thirty percent of the original feature list is unnecessary for launch, and ten percent of "obvious" requirements were never discussed — like admin roles, audit logs, or export formats finance needs.',
      'Architecture decisions made in discovery prevent rebuilds. Multi-tenant vs. single-tenant, which payment provider supports your markets, whether mobile is truly required — these are cheaper to decide on a whiteboard than in production.',
      'For funded startups, discovery output feeds investor updates with credible timelines. For enterprises, it gives procurement a clear SOW boundary.',
      'The sprint costs a fraction of a full build. One avoided month of rework typically returns three to five times the investment.',
    ],
  },
  {
    slug: 'saas-architecture-day-one',
    title: 'SaaS architecture decisions to get right on day one',
    excerpt:
      'Multi-tenancy, billing, and auth patterns that are painful to retrofit — explained for non-engineers.',
    category: 'Engineering',
    date: 'Oct 22, 2025',
    readTime: '10 min read',
    author: 'Khair-eddine Hamata',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #38bdf8 55%, #0f172a 100%)',
    body: [
      'SaaS products that succeed eventually need multi-tenant data isolation, subscription billing, role-based access, and usage analytics. Bolting these on after one hundred customers is expensive and risky.',
      'Multi-tenancy does not always mean separate databases. For most B2B SaaS, row-level tenant IDs with strict query scoping is sufficient until significant scale. We document the migration path to schema-per-tenant or database-per-tenant if enterprise clients require it.',
      'Billing integration should be chosen early. Stripe Billing, Paddle, or regional providers each impose constraints on how you model plans, trials, and seat-based pricing. Changing providers later touches invoices, tax, and customer portals.',
      'Authentication and authorization deserve separate thinking. Auth proves identity; authorization decides what that identity can do within an organization. Team invites, role hierarchies, and API keys for integrations belong in the auth model from the start.',
      'Background jobs and webhooks are easy to ignore in MVP but critical for reliability. Email delivery, report generation, and third-party sync should not block HTTP requests. Queue infrastructure can be simple — but it must exist.',
      'Observability is a feature. Structured logging, error tracking, and basic performance monitoring let you support customers professionally instead of debugging blind in production.',
      'We are not advocating big upfront design. We advocate identifying the decisions that compound — and making them deliberately, with documentation, in the first sprint of engineering.',
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
