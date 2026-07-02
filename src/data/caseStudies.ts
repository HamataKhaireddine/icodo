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
  icon: string
  problem: string
  solution: string
  features: string[]
  stack: string[]
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
    impact: [
      '40% faster page loads vs. previous site',
      'Higher mobile conversion on product pages',
      'Scalable foundation for new collections',
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
    impact: [
      'Reduced time-to-decision for design consultations',
      'Differentiated product in a competitive market',
      'Platform ready for additional AI features',
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
    impact: [
      'Single source of truth for stock levels',
      'Faster end-of-day reconciliation',
      'Foundation for e-commerce integration',
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
    impact: [
      'New online revenue channel launched on schedule',
      'Consistent brand experience across touchpoints',
      'Operational team trained for daily management',
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
