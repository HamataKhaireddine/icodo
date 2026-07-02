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
      'How we evaluate speed, maintainability, and cost when starting a new web or mobile project.',
    category: 'Product',
    date: 'Mar 12, 2026',
    readTime: '6 min read',
    author: 'ICODO',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)',
    body: [
      'Launching a digital product is rarely about picking the trendiest framework. It is about matching your timeline, team, and growth plans to tools you can maintain after launch.',
      'For most client projects we start with React on the front end and Node.js or serverless APIs on the back end. That combination gives us fast iteration, strong hiring pools, and predictable hosting costs.',
      'When e-commerce is central, we often integrate Shopify or a headless storefront so merchandising teams can move quickly without waiting on engineering for every catalog change.',
      'Mobile needs are evaluated separately. If the experience is content-heavy or needs push notifications, a native or React Native app may be worth the investment. Otherwise a responsive web app keeps one codebase and ships faster.',
      'The right stack is the one your team can operate confidently six months after launch — not just the one that demos well on day one.',
    ],
  },
  {
    slug: 'pos-inventory-ecommerce-flow',
    title: 'Connecting POS, inventory, and e-commerce in one flow',
    excerpt:
      'Lessons from retail clients who needed real-time stock across stores and online channels.',
    category: 'Retail',
    date: 'Feb 8, 2026',
    readTime: '8 min read',
    author: 'ICODO',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #2563eb 100%)',
    body: [
      'Retail operators in Qatar often sell in-store, online, and through marketplaces at the same time. Without a single source of truth for inventory, overselling and manual reconciliation become daily problems.',
      'We design flows where the POS is the operational hub: every sale, return, and transfer updates stock levels immediately. Online channels read from the same inventory service, so customers only see what is actually available.',
      'Kitchen and fulfillment workflows can subscribe to the same events — when an order is placed, prep screens and picker apps update without duplicate data entry.',
      'Reporting becomes simpler too. Revenue, stock movement, and channel performance live in one dashboard instead of three disconnected spreadsheets.',
      'The implementation details vary by business, but the principle holds: one inventory model, many touchpoints, zero silent desync.',
    ],
  },
  {
    slug: 'design-systems-that-scale',
    title: 'Design systems that scale with your brand',
    excerpt:
      'Why consistent UI tokens and components save time as your marketing and product surfaces grow.',
    category: 'Design',
    date: 'Jan 22, 2026',
    readTime: '5 min read',
    author: 'ICODO',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)',
    body: [
      'A design system is not a Figma library you never open. It is the shared language between design, marketing, and engineering — colors, spacing, typography, and components that stay aligned as you ship more pages.',
      'We start with tokens: primary and accent colors, neutrals, border radii, and type scales. Those tokens become CSS variables so the live site and future campaigns reuse the same values.',
      'Components come next — buttons, cards, form fields, navigation patterns. Documented once, implemented once, reused everywhere.',
      'The payoff shows up when you add a landing page, a blog, or a new product area. Instead of reinventing layout and styling, teams assemble from proven pieces and ship faster with fewer visual inconsistencies.',
      'For growing businesses in Qatar and the region, that consistency reads as professionalism — and it reduces cost every time you launch something new.',
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
