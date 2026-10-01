# Lessons Learned Global — verified onboarding baseline

Inspected 2026-09-30 against main commit `db61faead8645c4b66105c2585d7364c1e9c5763`. This is a dated inspection, not a claim about future heads.

## Present on GitHub

| Path | Observed state |
| --- | --- |
| site/index.html, site/share.html | Minimal QAITEK-branded fixtures; example.com OG image and dummy WhatsApp number; no finished Lessons Learned styling or image assets |
| package.json, playwright.config.ts | Root Playwright scripts; desktop smoke/E2E and mobile Chromium smoke; local site server at 4173 |
| tests/ | Smoke and limited E2E suites; CTA test is not end-to-end message delivery |
| .github/workflows/e2e.yml | PR/push/manual workflow; root npm install and Chromium smoke/E2E |
| apps/api/ | Node HTTP API, in-memory lead store, unit tests and an unwired Prisma schema |
| docker-compose.yml | Optional future Postgres configuration |
| HANDOVER-FOR-LLM.md, user-stories/LL-001-hostinger-share.md | Existing handover and fixture acceptance criteria |

Latest main workflow was successful: https://github.com/fiazhassan1/lession_learned/actions/runs/36530269860
No open PRs or Issues existed at the inspection before onboarding.
This task inspected source and CI history; it did not execute product/browser tests or validate deployment.

## Important gaps

- The finished Lessons Learned website package described in prior discussion is not in the inspected repository. It was not located in the accessible file search/workspace during onboarding; its existence elsewhere is unresolved.
- No real OG image asset is present. HTTPS URL metadata alone does not validate image availability or dimensions.
- Root package.json, several docs and the fixtures still use QAITEK terminology. Treat these as starter leftovers requiring deliberate reconciliation, not approved Lessons Learned marketing content.
- Resolved after onboarding: a root package-lock.json is committed and CI uses `npm ci`.
- Resolved for CI after onboarding: CI runs `npm run api:test`, starts the in-memory API and sets `API_REQUIRED=1`, so the health spec fails rather than skips there. Locally it still skips when the API is down. Green CI still does not establish persistence (the store is in-memory) or completed-site acceptance.
- The in-memory API is not connected to a finished visitor submission form and is not a production lead service.
- Hostinger plan capacity, additional website creation, DNS, SSL, aliases and go-live remain unverified.

## New default integration requirement

Fiaz specified shared enterprise chatbot integration for every project on 2026-09-30. Lessons Learned must support the core's verified integration interface and a tested core-upgrade path. No such integration was observed in the inspected fixture. Discover actual core interfaces/versioning and track integration acceptance criteria; do not invent supported capabilities. Roles are defined in docs/SHARED_AI_INTEGRATION_AND_ROLES.md.

## Next developer work

1. Read/adopt the onboarding PR documents without merging them.
2. Establish a clean-checkout baseline and report actual test results and skips.
3. Check Claude's local working folder for the approved finished website package. If found, inventory it and import the required source/assets on a dedicated branch, preserving existing files and checking for secrets/private data.
4. If unavailable, explicitly report the source-package blocker; do not redesign the product from guessed requirements. Continue safe fixture/test/documentation inspection.
5. Review the actual imported site against its approved requirements. Reconcile stale QAITEK branding and fixture-specific criteria through documented changes, preserving the locked OG contract.
6. Open a reviewable PR with preview instructions, desktop/mobile screenshots when feasible, executed checks, CI and remaining gaps. No deployment or developer self-merge.

The quoted Share form/mailto behavior from prior conversation is an intended package behavior, not observed behavior of the current fixture.
