export type CaseStudyMetric = {
  value: string
  label: string
}

export type CaseStudy = {
  slug: string
  title: string
  tagline: string
  category: string
  client: string
  year: string
  timeline: string
  href?: string
  thumb: string
  thumbUrl?: string
  icon: string
  problem: string
  solution: string
  features: string[]
  stack: string[]
  metrics: CaseStudyMetric[]
  impact: string[]
  body: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'assam',
    title: 'ASSAM',
    tagline: 'Luxury fragrance e-commerce built for conversion and brand prestige.',
    category: 'E-Commerce',
    client: 'ASSAM',
    year: '2025',
    timeline: '12 weeks',
    href: 'https://assam.qa/',
    thumb: 'linear-gradient(135deg,#1a0f14,#2e1825)',
    thumbUrl: '/portfolio/assam.png',
    icon: 'icon-cart',
    problem:
      'A premium fragrance brand needed a digital storefront that matched the elegance of the product — not a template that felt generic or slow at checkout.',
    solution:
      'ICODO designed and engineered a custom e-commerce experience with refined product storytelling, fast catalog browsing, and a checkout flow optimized for mobile buyers in the GCC.',
    features: [
      'Custom product detail experiences',
      'Shopify headless integration',
      'Mobile-first checkout',
      'SEO-optimized catalog structure',
      'Performance-tuned asset delivery',
    ],
    stack: ['React', 'Next.js', 'Shopify', 'Node.js', 'Vercel'],
    metrics: [
      { value: '38%', label: 'Faster page loads' },
      { value: '2.1s', label: 'Avg. mobile LCP' },
      { value: '24%', label: 'Mobile add-to-cart lift' },
    ],
    impact: [
      'Page load times dropped from 3.4s to 2.1s on mobile — a meaningful gain for luxury buyers who abandon slow sites.',
      'Product detail engagement increased as rich imagery and faster transitions kept shoppers in the funnel.',
      'Headless architecture lets the merchandising team launch collections without engineering bottlenecks.',
    ],
    body: [
      'ASSAM required more than a storefront — they needed a digital expression of luxury that still performed like a modern commerce engine.',
      'We partnered from discovery through launch, aligning brand, merchandising, and engineering so every page reinforced trust and desire to purchase.',
      'The result is a platform founders can iterate on without rebuilding — new launches, campaigns, and regional expansions ship on a stable architecture.',
    ],
  },
  {
    slug: 'maan',
    title: 'MAAN',
    tagline: 'AI-assisted visualization for architecture and exterior design decisions.',
    category: 'AI Product',
    client: 'MAAN Trading',
    year: '2025',
    timeline: '16 weeks',
    href: 'https://maantrading.net/',
    thumb: 'linear-gradient(135deg,#0a1418,#102428)',
    thumbUrl: '/portfolio/maan.png',
    icon: 'icon-monitor',
    problem:
      'Clients struggled to visualize facade and exterior changes before committing to costly renovations — slowing sales cycles and increasing uncertainty.',
    solution:
      'We built an AI-powered preview platform that lets users upload properties and explore design directions instantly, turning abstract ideas into tangible visuals.',
    features: [
      'AI image generation pipeline',
      'Project and preview management',
      'Responsive web application',
      'Secure user workflows',
      'Admin tooling for content control',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'AI APIs', 'PostgreSQL'],
    metrics: [
      { value: '60%', label: 'Faster design previews' },
      { value: '3×', label: 'Consultation bookings' },
      { value: '45%', label: 'Fewer revision rounds' },
    ],
    impact: [
      'Consultation-to-close cycles shortened as clients aligned on visuals before procurement.',
      'Sales teams use AI previews as a differentiator in a market still relying on static catalogs.',
      'The platform architecture supports additional AI features without a ground-up rebuild.',
    ],
    body: [
      'MAAN saw an opportunity to productize AI for a real business problem — helping buyers and consultants align on exterior outcomes before construction begins.',
      'ICODO structured the product around clarity: simple uploads, fast previews, and a workflow that non-technical users could trust.',
      'The platform positions MAAN as a technology-forward partner, not just a materials supplier.',
    ],
  },
  {
    slug: 'pos-system',
    title: 'Retail POS Suite',
    tagline: 'Unified point-of-sale, inventory, and checkout for multi-channel retail.',
    category: 'Enterprise Systems',
    client: 'Retail operator',
    year: '2025',
    timeline: '20 weeks',
    href: 'https://system-zeta-one.vercel.app/login',
    thumb: 'linear-gradient(135deg,#0f1420,#1a2435)',
    thumbUrl: '/portfolio/pos-system.png',
    icon: 'icon-chart',
    problem:
      'Store staff relied on disconnected tools for sales, stock, and reporting — causing overselling, manual reconciliation, and poor visibility for leadership.',
    solution:
      'ICODO delivered a custom POS ecosystem connecting inventory, sales, and checkout with real-time updates across locations and online channels.',
    features: [
      'Real-time inventory sync',
      'Role-based staff access',
      'Sales and reporting dashboard',
      'Multi-location support',
      'Integrated checkout flows',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'REST APIs'],
    metrics: [
      { value: '99.2%', label: 'Inventory accuracy' },
      { value: '4 hrs', label: 'Saved daily on reconciliation' },
      { value: '90%', label: 'Fewer stock discrepancies' },
    ],
    impact: [
      'End-of-day reconciliation dropped from hours of spreadsheet work to a single dashboard review.',
      'Overselling incidents fell sharply once online and in-store channels shared one inventory source.',
      'Leadership gained live visibility into location performance — a prerequisite for opening new stores.',
    ],
    body: [
      'Retail operators cannot scale on spreadsheets and siloed systems. This project unified operations into one dependable platform.',
      'We mapped in-store workflows first, then engineered APIs and interfaces that staff could adopt without heavy training.',
      'Leadership now has live visibility into performance — a prerequisite for opening new locations and channels confidently.',
    ],
  },
  {
    slug: 'minizoo',
    title: 'MiniZoo',
    tagline: 'Omnichannel pet retail — online store connected to in-store operations.',
    category: 'E-Commerce',
    client: 'MiniZoo',
    year: '2024',
    timeline: '10 weeks',
    href: 'https://minizoo.qa/',
    thumb: 'linear-gradient(135deg,#0a1a16,#102e28)',
    thumbUrl: '/portfolio/minizoo.png',
    icon: 'icon-store',
    problem:
      'A growing pet retailer needed to sell online without losing control of inventory shared with physical stores.',
    solution:
      'We launched a Shopify-powered storefront integrated with operational workflows so online and in-store inventory stay aligned.',
    features: [
      'Shopify storefront customization',
      'Catalog and collection strategy',
      'Mobile commerce optimization',
      'Brand-aligned UI design',
      'Launch and handoff documentation',
    ],
    stack: ['Shopify', 'React', 'Liquid', 'POS integration'],
    metrics: [
      { value: '10 wks', label: 'Time to launch' },
      { value: '35%', label: 'Orders now online' },
      { value: '50%', label: 'Faster checkout flow' },
    ],
    impact: [
      'A new revenue channel went live on schedule without disrupting in-store operations.',
      'Brand consistency across web and physical touchpoints strengthened customer trust.',
      'The operations team runs daily e-commerce independently after structured handoff training.',
    ],
    body: [
      'MiniZoo needed speed to market without sacrificing quality — a common challenge for SMEs entering e-commerce.',
      'ICODO balanced pragmatic platform choices with custom design so the store felt owned, not rented.',
    ],
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}
