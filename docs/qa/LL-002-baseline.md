# LL-002 baseline checkpoint 1

Base: `main` @ `1391a2a2935a1005cb66b2c66abbe4b36ae73132` (merge of onboarding PR #2). Issue: #1.

## Test evidence (pre-merge head `3973beac`, content identical to the merged docs)

Environment: Linux sandbox, Node 24 (as CI), `npm install` (no lockfile exists), Chromium build 1194 preinstalled in the sandbox. `npx playwright install chromium` was **blocked** (HTTP 403 for `cdn.playwright.dev`), so a temporary uncommitted config pointed `launchOptions.executablePath` at the preinstalled browser.

| Command | Result |
| --- | --- |
| `npm run api:test` | 2 pass, 0 fail |
| Playwright full (smoke ×2 desktop+mobile, e2e) | 17 tests: **14 pass, 3 skip, 0 fail** |
| CI `Playwright smoke + e2e` on the PR head | success, run 36749636508 |

Skips (all pre-existing and documented): `og:image URL returns an image` on chromium-smoke and mobile-chrome-smoke (host is `example.com`); `api-health` (API not running, non-OK/connection failure is skipped by design).

What this does **not** show: the real website, a live OG image, API persistence, real-device behavior or chatbot integration.

## Source-import gate — BLOCKED

Searched this session's filesystem (`/home`, `/root`, `/mnt`, `/workspace`, `/srv`, plus a system-wide name search for `*lesson*`, `*lession*`, ZIP/TAR archives and HTML files). Found only the QAITEK-branded fixture in `site/` and the core chatbot's own demo pages. **No approved finished Lessons Learned website package is available to this session.** Nothing was imported or invented. Needed from Fiaz: the ZIP/folder committed to a branch, attached to Issue #1, or a path in a location this session can read.

## Core-integration gate — PARTIAL (contract documented, integration blocked on decisions)

See docs/CORE_INTEGRATION_CONTRACT.md. Key blockers: no multi-tenancy in the core (single default tenant), API origin fixed at build time, no hosted core API, no core release version (pin by commit SHA).
