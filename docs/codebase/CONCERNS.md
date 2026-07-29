# Codebase Concerns

## Core Sections (Required)

### 1) Top Risks (Prioritized)

| Severity | Concern | Evidence | Impact | Suggested action |
|----------|---------|----------|--------|------------------|
| high | Lack of automated tests | `TESTING.md` / `package.json` | Regressions during refactoring or updates will go undetected. | Implement a basic test suite (Jest/React Testing Library or Playwright). |
| med | Client Component Overuse | `app/projects/[slug]/client.tsx` / Next.js app structure | Potential performance impact if client components enclose too much of the page logic. | Audit component boundaries and push `'use client'` down the tree. |

### 2) Technical Debt

| Debt item | Why it exists | Where | Risk if ignored | Suggested fix |
|-----------|---------------|-------|-----------------|---------------|
| Hardcoded content | Simplest initial implementation | `data/projects.ts` | Development bottleneck for content updates | Integrate a lightweight Headless CMS or Markdown/MDX setup. |

### 3) Security Concerns

| Risk | OWASP category (if applicable) | Evidence | Current mitigation | Gap |
|------|--------------------------------|----------|--------------------|-----|
| No automated security checks | A06: Vulnerable and Outdated Components | `docs/codebase/.codebase-scan.txt` | None | Need Dependabot or Snyk integration for dependency scanning. |

### 4) Performance and Scaling Concerns

| Concern | Evidence | Current symptom | Scaling risk | Suggested improvement |
|---------|----------|-----------------|-------------|-----------------------|
| Animation performance | `package.json` (`framer-motion`), `Prompt.md` | Mobile lag (referenced in `Prompt.md`) | Low end devices will struggle with heavy JS animations. | Optimize Framer Motion usage, reduce layout animations, use CSS transforms where possible. |

### 5) Fragile/High-Churn Areas

| Area | Why fragile | Churn signal | Safe change strategy |
|------|-------------|-------------|----------------------|
| `app/page.tsx` | Central landing page | 4 commits (highest in 90 days) | Test layout thoroughly across responsive breakpoints before merging. |
| `app/globals.css` | Global styles | 3 commits | Avoid global changes; encapsulate styles in Tailwind utility classes or CSS modules. |

### 6) `[ASK USER]` Questions

1. [ASK USER] Should content in `data/projects.ts` remain static, or is there a plan to migrate to a CMS?
2. [ASK USER] Are there any specific test frameworks (e.g., Playwright vs. Cypress, Jest vs. Vitest) preferred for this project?
3. [ASK USER] Should I consider adding `.env.example` if future integrations are planned, or will it remain purely static?

### 7) Evidence

- `docs/codebase/.codebase-scan.txt`
- `data/projects.ts`
- `Prompt.md`
