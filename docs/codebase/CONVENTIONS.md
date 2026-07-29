# Coding Conventions

## Core Sections (Required)

### 1) Naming Rules

| Item | Rule | Example | Evidence |
|------|------|---------|----------|
| Files (Components) | PascalCase | `DoubleBezelCard.tsx` | `components/ui/DoubleBezelCard.tsx` |
| Files (Routes) | Next.js standard conventions | `page.tsx`, `layout.tsx` | `app/page.tsx` |
| Files (Utils/Data) | camelCase / kebab-case | `utils.ts`, `projects.ts` | `lib/utils.ts` |
| Types/interfaces | PascalCase | [TODO] | N/A |

### 2) Formatting and Linting

- Formatter: Prettier / ESLint (Likely standard Next.js config)
- Linter: ESLint `v9` with `eslint.config.mjs`
- Most relevant enforced rules: Next.js recommended rules (`eslint-config-next`)
- Run commands: `npm run lint`

### 3) Import and Module Conventions

- Import grouping/order: [TODO: Needs source file inspection to confirm import organization rules]
- Alias vs relative import policy: Likely uses `@/*` for absolute imports based on Next.js setup.
- Public exports/barrel policy: No `index.ts` barrel files are visible in the directory structure. Direct imports are used.

### 4) Error and Logging Conventions

- Error strategy by layer: [TODO] No custom error boundaries like `error.tsx` found in `app/`.
- Logging style and required context fields: [TODO]
- Sensitive-data redaction rules: [TODO]

### 5) Testing Conventions

- Test file naming/location rule: [TODO] No test files found.
- Mocking strategy norm: [TODO]
- Coverage expectation: [TODO]

### 6) Evidence

- `eslint.config.mjs`
- `docs/codebase/.codebase-scan.txt`
