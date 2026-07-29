export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  role: string;
  link?: string;
  githubUrl?: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  problem: string;
  solution: string;
  architecture: string;
  tradeoffs: string;
  highlights: string[];
}

export const projects: CaseStudy[] = [
  {
    slug: "price-guard",
    title: "Price Guard",
    subtitle: "High-throughput Price Tracking Service",
    description: "A distributed system designed to monitor, track, and alert users on e-commerce price fluctuations across millions of SKUs with ultra-low latency.",
    year: "2024",
    role: "Backend Architect",
    githubUrl: "https://github.com/kwaqtech/priceguard",
    techStack: ["Node.js", "Redis", "PostgreSQL", "Puppeteer", "Docker"],
    metrics: [
      { label: "Throughput", value: "10k req/s" },
      { label: "Data Points", value: "2.5M+" },
      { label: "Uptime", value: "99.9%" }
    ],
    problem: "Traditional price trackers rely on slow, synchronous polling that severely limits scale. Tracking millions of SKUs across multiple retailers resulted in stale data and immense server load.",
    solution: "Engineered a distributed scraping cluster utilizing Redis-backed job queues (BullMQ) to asynchronously process product pages. Implemented adaptive rate-limiting to bypass advanced anti-bot protections without IP bans.",
    architecture: "Microservices architecture where a stateless API Gateway handles user requests, while decoupled worker nodes perform head-less browser scraping. PostgreSQL serves as the persistent store for historical price trends, while Redis handles real-time caching and job state.",
    tradeoffs: "Opted for eventual consistency in price alerts to drastically improve write throughput. Polling frequency was scaled dynamically based on historical price volatility rather than a fixed cron job, saving 40% in compute costs.",
    highlights: [
      "Designed a robust job queue system resilient to node failures.",
      "Implemented intelligent proxy rotation and exponential backoff.",
      "Achieved sub-second API response times through aggressive Redis caching."
    ]
  },
  {
    slug: "xom-connect",
    title: "Xom Connect",
    subtitle: "Real-time Community Platform",
    description: "A high-performance community management platform featuring real-time WebSockets, RBAC, and complex relational data modeling.",
    year: "2023",
    role: "Full Stack Engineer",
    githubUrl: "https://github.com/kwaqtech/xom-connect",
    techStack: ["Next.js", "TypeScript", "Socket.io", "Prisma", "Tailwind CSS"],
    metrics: [
      { label: "Active Users", value: "5k+" },
      { label: "Latency", value: "<50ms" },
      { label: "Queries", value: "-45% load" }
    ],
    problem: "Communities lacked a unified platform that combined real-time chat with structured governance and resource sharing. Existing solutions suffered from bloated UI and high latency under load.",
    solution: "Developed a full-stack Next.js application leveraging Server Components to minimize client bundle size. Integrated Socket.io for instantaneous message delivery and presence tracking.",
    architecture: "Leveraged Next.js App Router for hybrid rendering. Used Prisma ORM for type-safe database access, implementing cursor-based pagination for infinite scroll feeds to maintain O(1) query performance on large datasets.",
    tradeoffs: "Chose to tightly couple the WebSocket server with the Next.js custom server for deployment simplicity in the MVP phase, accepting the tradeoff that horizontal scaling of WebSockets would require an external Pub/Sub (like Redis) in the future.",
    highlights: [
      "Engineered a granular Role-Based Access Control (RBAC) system.",
      "Optimized database indexing to reduce complex join query times by 45%.",
      "Built a highly responsive, optimistic UI for instantaneous user feedback."
    ]
  }
];
