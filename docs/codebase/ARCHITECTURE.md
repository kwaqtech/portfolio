# Architecture

## Core Sections (Required)

### 1) Architectural Style

- Primary style: Feature-based Routing with Layered Component Architecture
- Why this classification: Uses Next.js App Router for routing (`app/`). Separates UI concerns into atomic components (`components/ui`), structural components (`components/layout`), and data logic (`data/`).
- Primary constraints: Next.js Server/Client component boundary (React Server Components), hydration constraints.

### 2) System Flow

```text
[HTTP Request] -> [Next.js App Router (app/)] -> [Layout/Page Components] -> [UI/Section Components] -> [Static Data (data/)] -> [Rendered HTML/JSON]
```
1. Request hits route (e.g. `app/projects/[slug]/page.tsx`).
2. Next.js loads the Root Layout and Page.
3. Page fetches static data from `data/projects.ts`.
4. Page renders structural components (e.g., `AppShell`, `Sidebar`).
5. Components apply Tailwind styles and Framer Motion animations.

### 3) Layer/Module Responsibilities

| Layer or module | Owns | Must not own | Evidence |
|-----------------|------|--------------|----------|
| `app/` | Routing, Page metadata, SEO | Highly reusable UI | `app/page.tsx` |
| `components/ui/`| Pure presentation, reusable styled elements | Application state, routing | `components/ui/Button.tsx` |
| `data/` | Static content storage | React hooks, UI | `data/projects.ts` |
| `lib/` | Pure utility functions (e.g. `cn` for classes) | React components | `lib/utils.ts` |

### 4) Reused Patterns

| Pattern | Where found | Why it exists |
|---------|-------------|---------------|
| Tailwind utility merge | `lib/utils.ts` | Merge conflicting Tailwind classes dynamically |
| Client Components | `app/projects/[slug]/client.tsx` | Manage client-side state/interactivity distinct from Server Components |

### 5) Known Architectural Risks

- [Client Component Bloat]: Overuse of `'use client'` at high levels can impact initial load performance and hydration.
- [Static Data Coupling]: Projects are hardcoded in `data/projects.ts` rather than a CMS, requiring a new deployment for content changes.

### 6) Evidence

- `app/projects/[slug]/page.tsx`
- `app/projects/[slug]/client.tsx`
- `data/projects.ts`
