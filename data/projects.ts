export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  desc: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string;
  results: string;
};

export const projects: Project[] = [
  {
    slug: "presist",
    title: "Presist",
    oneLiner: "Bridging the gap between static slides and dynamic delivery.",
    desc: "Presist is an innovative presentation support tool designed to empower speakers by bridging the gap between static slides and dynamic delivery. Unlike traditional slideshow software, Presist focuses on the presenter's performance rather than just the visual aids.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    githubUrl: "https://tmkamal.github.io/under-construction-template/",
    liveUrl: "https://presist.app/",
    problem: "Presenters often rely too heavily on their slides, reading off screens rather than engaging with the audience. Existing software like PowerPoint or Keynote treats the slide deck as the primary focus, lacking tools that prioritize the speaker's delivery, pacing, and audience engagement.",
    solution: "Presist shifts the paradigm by providing a 'Presenter First' dashboard. It offers intelligent pacing prompts, live audience feedback loops, and an unobtrusive teleprompter mode. The interface is completely stripped back to ensure cognitive load is minimized during high-stakes presentations.",
    architecture: "Built on Next.js App Router for optimal Server-Side Rendering (SSR) performance, with a highly responsive React frontend. State management is handled gracefully to ensure real-time synchronization between the presenter view and the audience broadcast view via WebSockets.",
    challenges: "The primary challenge was ensuring ultra-low latency between slide transitions and the speaker's notes, especially on slow network connections. We had to implement optimistic UI updates and a robust offline-first synchronization strategy using service workers.",
    results: "Beta testers reported a 40% reduction in 'umms' and 'ahhs' during their deliveries. The tool successfully helped speakers maintain eye contact with their audience 60% more of the time compared to using traditional presentation software."
  },
  {
    slug: "xom-connect",
    title: "Xom Connect",
    oneLiner: "A mobile-first social platform bringing neighbors together.",
    desc: "Xom Connect is a mobile-first social platform designed to bring neighbors together. Whether you're looking to borrow a ladder, give away extra fruit from your garden, or need urgent SOS assistance, Xom Connect prioritizes what is happening near you over global noise.",
    tags: ["React", "TypeScript", "CSS", "PLpgSQL", "Javascript"],
    githubUrl: "https://github.com/kwaqtech/xom-connect",
    liveUrl: "https://tmkamal.github.io/under-construction-template/",
    problem: "Global social networks connect us to the world but often isolate us from our immediate neighbors. There is a lack of trusted, hyper-local communication platforms for borrowing items, sharing local news, or organizing community events without the noise of a global feed.",
    solution: "We designed a localized feed restricted to a 5km radius. The UI is built to feel familiar yet distinctively community-focused, featuring an 'SOS' button for immediate neighborhood assistance and a 'Marketplace' for free items and borrowing.",
    architecture: "The frontend is a Progressive Web App (PWA) built with React and TypeScript, ensuring native-like mobile performance. The backend relies heavily on PostgreSQL (with PLpgSQL for complex geospatial queries) to rapidly filter and serve hyper-local content based on user coordinates.",
    challenges: "Handling geospatial queries at scale while maintaining a snappy feed was challenging. We had to optimize database indexing for spatial data (PostGIS) and implement a robust caching layer for frequently accessed neighborhood zones.",
    results: "Launched in three pilot neighborhoods, achieving a 75% weekly active user rate. Successfully facilitated over 200 local item exchanges in the first month and was instrumental in coordinating a local neighborhood watch program."
  },
  {
    slug: "price-guard",
    title: "Price Guard",
    oneLiner: "Real-time best deals across major Vietnamese marketplaces.",
    desc: "PriceGuard is a powerful Chrome Extension and API backend that takes the guesswork out of online shopping. It automatically detects products on major Vietnamese marketplaces and shows you the best deals across the web in real-time.",
    tags: ["TypeScript", "Manifest V3"],
    githubUrl: "https://github.com/kwaqtech/PriceGuard",
    liveUrl: "https://tmkamal.github.io/under-construction-template/",
    problem: "Consumers in Vietnam frequently overpay for products because checking prices across multiple marketplaces (Shopee, Lazada, Tiki) is tedious and time-consuming. Prices fluctuate rapidly, and finding the true 'lowest price' requires manual effort.",
    solution: "A lightweight, unobtrusive Chrome extension (Manifest V3) that injects a clean, minimalistic widget onto product pages. It automatically scans the current product, queries our backend, and instantly displays cheaper alternatives across competitor platforms without requiring the user to leave the page.",
    architecture: "The extension is built with pure TypeScript using Manifest V3 standards for maximum security and performance. The backend is a microservice architecture that concurrently scrapes and normalizes product data from multiple REST and GraphQL endpoints.",
    challenges: "Marketplaces frequently change their DOM structure and employ anti-scraping measures. We had to build a resilient, ML-assisted selector engine that adapts to minor DOM changes and gracefully degrades when a marketplace temporarily blocks our requests.",
    results: "Saved users an average of 15% per transaction. Grew to 5,000 active daily users within the first two months, processing over 100,000 price comparison requests per day with a p95 latency of under 800ms."
  }
];
