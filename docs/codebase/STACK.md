# Technology Stack

## Core Sections (Required)

### 1) Runtime Summary

| Area | Value | Evidence |
|------|-------|----------|
| Primary language | TypeScript | `package.json`, `tsconfig.json` |
| Runtime + version | Node.js (>= 20) | `package.json` (`@types/node`) |
| Package manager | npm | `package-lock.json` |
| Module/build system | Next.js (App Router) | `package.json` (`next` dependency), `next.config.ts` |

### 2) Production Frameworks and Dependencies

| Dependency | Version | Role in system | Evidence |
|------------|---------|----------------|----------|
| Next.js | 16.2.1 | React framework / Build system | `package.json` |
| React / React DOM | 19.2.4 | UI library | `package.json` |
| Tailwind CSS | ^4 | Styling | `package.json` |
| Framer Motion | ^12.38.0 | Animations | `package.json` |
| Lucide React | ^1.27.0 | Icons | `package.json` |
| clsx / tailwind-merge | ^2.1.1 / ^3.6.0 | Utility for conditional classes | `package.json` |
| cmdk | ^1.1.1 | Command menu UI | `package.json` |

### 3) Development Toolchain

| Tool | Purpose | Evidence |
|------|---------|----------|
| TypeScript (^5) | Type checking | `package.json`, `tsconfig.json` |
| ESLint (^9) | Linting | `package.json`, `eslint.config.mjs` |

### 4) Key Commands

```bash
npm install
npm run build
npm run dev
npm run lint
```

### 5) Environment and Config

- Config sources: `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json`
- Required env vars: [TODO] (No .env file found)
- Deployment/runtime constraints: Deployed to Vercel (indicated by `public/vercel.svg`, `.github/workflows/nextjs.yml`, and `README.md`)

### 6) Evidence

- `package.json`
- `next.config.ts`
- `README.md`
