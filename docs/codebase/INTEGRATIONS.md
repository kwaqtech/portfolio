# External Integrations

## Core Sections (Required)

### 1) Integration Inventory

| System | Type (API/DB/Queue/etc) | Purpose | Auth model | Criticality | Evidence |
|--------|---------------------------|---------|------------|-------------|----------|
| Vercel | Hosting/Deployment | Serve application | Vercel Token (if deployed via CLI) or GitHub OAuth | High | `README.md`, `public/vercel.svg` |

### 2) Data Stores

| Store | Role | Access layer | Key risk | Evidence |
|-------|------|--------------|----------|----------|
| Local Data | Static Content | `data/projects.ts` | Re-deployment needed for updates | `data/projects.ts` |

### 3) Secrets and Credentials Handling

- Credential sources: [TODO] No environment variables detected in scan.
- Hardcoding checks: [TODO]
- Rotation or lifecycle notes: [TODO]

### 4) Reliability and Failure Behavior

- Retry/backoff behavior: N/A (No external APIs detected)
- Timeout policy: N/A
- Circuit-breaker or fallback behavior: N/A

### 5) Observability for Integrations

- Logging around external calls: N/A
- Metrics/tracing coverage: Next.js built-in performance metrics (potentially Vercel Analytics)
- Missing visibility gaps: [TODO]

### 6) Evidence

- `data/projects.ts`
- `docs/codebase/.codebase-scan.txt`
