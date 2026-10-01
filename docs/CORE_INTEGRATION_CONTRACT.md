# Enterprise AI Chatbot core — verified integration contract (draft)

Status: **discovery only. Nothing is integrated into Lessons Learned yet.**
Source: read-only inspection of `QAITEK/enterprise-ai-chatbot` at commit `c3ce648a36e3fa852a1effe650f189d8c90d064e` (2026-09-24). Only code and comments in that commit were used; nothing below comes from planned/unbuilt features.

## Core version identity

- No release tag or core version exists that I could verify. `apps/api` and `packages/shared` are `0.1.0`, `apps/web` is `0.0.0` (package.json only).
- Per docs/SHARED_AI_INTEGRATION_AND_ROLES.md, the pin is therefore the **exact core commit SHA**. Current candidate pin: `c3ce648a36e3fa852a1effe650f189d8c90d064e`.

## What exists (verified in code)

| Capability | Evidence |
| --- | --- |
| Drop-in embed bundle: one self-mounting IIFE `widget.js` that injects its own CSS and container | `apps/web/src/widget/embed.tsx`, `apps/web/vite.widget.config.ts`; built with `npm run build:widget` in `apps/web` → `dist-widget/widget.js` |
| Anonymous visitor identity by `externalUserRef`, no cookie | `apps/web/src/api/client.ts` (`credentials: "omit"` for widget calls); `POST /api/v1/conversations` accepts optional `externalUserRef` |
| Public widget routes with reflect-any-origin, credential-free CORS | `apps/api/src/app.ts` `PUBLIC_WIDGET_ROUTE_PATTERNS` (bot-config/public, conversation create, message send/SSE); all other routes are single-origin credentialed |
| Branding from the API (name, colors, avatar, status text, platform name) | `GET /api/v1/bot-config/public` |
| Rate limiting on the anonymous routes | bot-config/public 60/min; conversation create 20/min (`apps/api/src/routes/`) |
| Streaming replies | SSE on `POST /api/v1/conversations/{id}/messages` |

## Build and mount verification (executed 2026-10-01; stub-level, NOT integration evidence)

Run against a scratch export of core commit `c3ce648a36e3fa852a1effe650f189d8c90d064e` (`git archive`; the core repo was not modified). Node 24, `npm ci --ignore-scripts`, then from `apps/web`: `VITE_API_URL=<origin> npx vite build -c vite.widget.config.ts`.

| Check | Result |
| --- | --- |
| Bundle builds from the pinned commit | Yes: `dist-widget/widget.js` 345,329 bytes (about 106 KB gzip) |
| API origin is baked at build time | Confirmed: the literal `VITE_API_URL` value is present in the bundle, and a decoy `data-api` attribute on the host script is ignored (behavioural check in `npm run core:stub-check`: a second stub server receives zero requests) |
| Mounts on a third-party-origin host page | Yes, in Chromium: `#widget-root` created with content, 0 page errors |
| First network call | `GET <baked origin>/api/v1/bot-config/public`, cross-origin (`Origin` = host page) |

Limits of this check: the API was a 10-line stub returning a canned `bot-config/public`, so it proves only that the bundle builds, mounts and issues that request. It does **not** prove real response-shape compatibility, conversation creation, SSE streaming, branding, or any upgrade compatibility; those remain the BLOCKED real-core gate below. The check is now retained as a reproducible, opt-in script: `CORE_DIR=<core git checkout at the pinned SHA, clean, with `npm ci` done> npm run core:stub-check` (`scripts/core-widget-stub-check.mjs`; exit 0 = stub-level pass, 1 = assertion/runtime failure, 2 = BLOCKED). It refuses to produce a pass unless the checkout's HEAD equals the pin and tracked files are unmodified, so a pass can be cited only for the pinned commit. It builds to a temp directory and does not modify `CORE_DIR`. It is not part of CI because it needs a core checkout. No build output or `node_modules` is committed.

## Gaps that affect Lessons Learned (verified in code)

1. **No multi-tenancy.** `getOrCreateDefaultTenant` returns the first row in `tenant` (`apps/api/src/services/tenant.ts`). The embed reads `data-tenant` but deliberately ignores it (`embed.tsx` comment: multi-tenant resolution is "Phase 3 scope"). Therefore **per-project branding, knowledge base and conversation isolation for Lessons Learned is not available** from one shared deployment today. Lessons Learned would share QAITEK's tenant, bot config and knowledge.
2. **API origin is fixed at build time.** `apps/web/src/api/client.ts`: `API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000"`. The embed has no runtime `data-api` attribute. Each deployment target needs its own `widget.js` built with `VITE_API_URL` set to the real API origin.
3. **No hosted core.** No deployed API URL is recorded in the repo. The API needs Node + PostgreSQL/pgvector (`infra/docker-compose.yml`) and cannot run on Hostinger static/shared hosting (see docs/HOSTINGER_DEPLOYMENT.md). Only the static `widget.js` file could be hosted there.
4. **No published artifact/versioning mechanism.** `widget.js` is built from source; there is no npm package, CDN path, changelog or compatibility matrix.
5. **Anonymous write surface.** Reflect-any-origin CORS plus rate limits is the only abuse control visible for widget routes. Allowed-origin allowlisting per project does not exist.

## Proposed project-side contract (NOT implemented — needs Fiaz/BA decision)

- Lessons Learned loads `widget.js` from a URL built from a pinned core SHA, configured via a single project config file, never with secrets in browser code (none are required by the public routes).
- Two separate test layers, never interchangeable:
  1. **Deterministic client/failure tests** (Playwright against a project-maintained stub of the public routes): widget mounts, branding renders from a canned `bot-config/public`, failure UI appears when the API is down, page still works without the widget. A stub only reproduces this project's own assumptions, so it **cannot** show compatibility with the core and must never be cited as integration or upgrade evidence.
  2. **Core contract/integration check against the actual pinned core build** (the real API at the pinned SHA, with a controlled/mock LLM provider if needed to keep it deterministic): real `bot-config/public` response shape, conversation create, and a message round-trip over real SSE. This is the only gate that may support a claim of "integrated" or "upgrade-compatible".
- If the environment for layer 2 (core build, PostgreSQL/pgvector, controlled LLM provider) is unavailable, the gate is recorded as **BLOCKED**, not passed, and integration/upgrade is not claimed.
- Upgrade = bump pinned SHA, rebuild `widget.js`, run layer 1 + layer 2 + LL smoke/e2e, Fiaz acceptance for UI impact. Rollback = revert the pin and the published `widget.js`.

## Decisions needed before any integration code is written

1. Is sharing QAITEK's single default tenant acceptable for Lessons Learned, or is multi-tenancy (core Phase 3) a prerequisite? Until answered, per-project branding/knowledge isolation **cannot** be claimed.
2. Where will the core API be hosted (a real `VITE_API_URL`), and who owns building/publishing `widget.js` for it?
3. Should the core gain a runtime `data-api` (and eventually `data-tenant`) option, or should Lessons Learned build its own bundle per environment? The first requires a change in the core repo, which LL-002 does not authorize.
