# QAITEK implementation plan

## What OG means

**OG = Open Graph.** It is the set of `<meta property="og:*">` tags and the **1200×630** image crawlers use to build the preview card when a URL is shared on Facebook, LinkedIn, WhatsApp, Slack, or iMessage. `share.html` exists so that card has a stable, honest target.

## Current state

- Marketing site is still the Hostinger static drop (`index.html`, `share.html`, OG image).
- This repo adds Playwright smoke + e2e and a GitHub Actions pipeline.
- Backend skeleton ships in `apps/api` (in-memory store + Prisma schema). Postgres is still Phase 2 host work. Do not block Hostinger on Docker.

## Testing

| Layer | What | Where |
|---|---|---|
| Smoke | Home loads, H1 is a product job, assets 200, OG tags exist | `tests/smoke` + CI on every PR |
| E2E | CTA/form path, homepage and `share.html` share the same `og:image` | `tests/e2e` + CI on every PR |
| Live | Manual workflow_dispatch with `base_url` = Hostinger domain | Actions UI |
