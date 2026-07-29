# Codebase Structure

## Core Sections (Required)

### 1) Top-Level Map

| Path | Purpose | Evidence |
|------|---------|----------|
| `app/` | Next.js App Router definitions and pages | `docs/codebase/.codebase-scan.txt` |
| `components/` | Reusable React components (UI, layout, sections) | `docs/codebase/.codebase-scan.txt` |
| `data/` | Static data sources (e.g., project data) | `docs/codebase/.codebase-scan.txt` |
| `lib/` | Utility functions | `docs/codebase/.codebase-scan.txt` |
| `public/` | Static assets (SVGs, icons) | `docs/codebase/.codebase-scan.txt` |

### 2) Entry Points

- Main runtime entry: `app/layout.tsx` (Root layout), `app/page.tsx` (Home page)
- Secondary entry points (worker/cli/jobs): NONE
- How entry is selected (script/config): Next.js App Router convention (`app/` directory)

### 3) Module Boundaries

| Boundary | What belongs here | What must not be here |
|----------|-------------------|------------------------|
| `app/` | Route definitions, page components | Reusable UI components |
| `components/ui/` | Generic reusable atomic UI components | Business logic, routing |
| `components/layout/` | Global layout structure (AppShell, Sidebar) | Page-specific content |
| `data/` | Static typescript arrays/objects | UI components |

### 4) Naming and Organization Rules

- File naming pattern: PascalCase for components (`AppShell.tsx`, `Sidebar.tsx`), Next.js specific names for routes (`page.tsx`, `layout.tsx`).
- Directory organization pattern: Layer-based (`app`, `components`, `lib`, `data`). Components are categorized (`ui`, `layout`, `sections`).
- Import aliasing or path conventions: Likely `@/*` based on standard Next.js setup (needs verification in `tsconfig.json`).

### 5) Evidence

- `docs/codebase/.codebase-scan.txt`
- `app/page.tsx`
- `components/layout/AppShell.tsx`
