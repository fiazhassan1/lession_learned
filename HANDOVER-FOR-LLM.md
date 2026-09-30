> **Onboarding update — 2026-09-30:** Read AI_DEVELOPMENT_SOP.md, CLAUDE.md and docs/PROJECT_STATUS.md first. This file is historical context. The SOP governs workflow; branch/PR review supersedes any older instruction to commit directly to main. The inspected site/ files are starter fixtures, not the finished Lessons Learned design. Preserve established product rules until an approved change reconciles them. Fiaz remains business acceptance authority.

# Handover: Lessons Learned Global (`lession_learned`)

Read this before changing anything. This is the only project Grok was supposed to build in the late session. Do not treat the Enterprise AI Chatbot as this repo.

**Repo:** https://github.com/fiazhassan1/lession_learned
**Owner:** fiazhassan1
**Default branch:** `main`
**Product owner:** not a developer. Do not assign them Git, CI, or permission chores. Take the action yourself when the GitHub connector can write. Ask only when a decision would change the product.

**Do not delete files without explicit confirmation from the owner.**

---

## What this project is

QAITEK / Lessons Learned Global: a static marketing surface plus Playwright smoke and e2e, plus GitHub Actions.

It is **not** the Enterprise AI Chatbot (`enterprise-ai-chatbot` / Drive `Grok_RAG_review`). That chatbot was only a **reference** for how Playwright and an agentic planner/generator/healer loop were structured. Grok mixed the two. Correct that if you see pgvector, HNSW, or `retrieveChunks` ideas applied here.

---

## What is on GitHub now (`main`)

Verified present:

| Path | Role |
|---|---|
| `site/index.html` | Fixture homepage (H1 product job, WhatsApp CTA, footer wellbeing boundary) |
| `site/share.html` | Share-card page with OG tags |
| `playwright.config.ts` | Smoke + e2e + mobile-chrome-smoke; local `webServer` on `:4173` |
| `tests/smoke/home.spec.ts` | Homepage job, CTA, asset 404 check |
| `tests/smoke/share-og.spec.ts` | OG contract (not `x:game`, 1200×630, `summary_large_image`) |
| `tests/e2e/share-card.spec.ts` | Same `og:image` on `/` and `/share.html` |
| `tests/e2e/contact-lead.spec.ts` | Contact/CTA href is not `#` |
| `tests/e2e/api-health.spec.ts` | `/health` if API is up; **skip** if nothing listens on `:3001` |
| `tests/helpers.ts` | OG attribute helpers |
| `.github/workflows/e2e.yml` | CI: push / PR / `workflow_dispatch` |
| `apps/api/` | In-memory Node `http` stub (`GET /health`, `POST /leads`) + Prisma schema (not wired to live DB) |
| `docker-compose.yml` | Postgres 16 for a later phase; do not block Hostinger on this |
| `docs/IMPLEMENTATION-PLAN.md` | Plan |
| `user-stories/LL-001-hostinger-share.md` | Acceptance criteria |
| `QAEnd2EndPromptFile.md` | 7-step agentic QA loop copied from AgentE2EQAWorkflow-Playwright |
| `.grok-write-check.md` | Access probe file. Leave it unless the owner asks to remove it |

OG fixture image URL is still `https://example.com/og.jpg`. Live Hostinger origin is not set.

---

## CI status (verified by Grok, 2026-09-29)

Workflow: `.github/workflows/e2e.yml` (`e2e`)

| Run | Commit | Result |
|---|---|---|
| 1 | Add Playwright suite… | cancelled (superseded) |
| 2 | Add site fixture… | **failure** — `api-health` `ECONNREFUSED :3001` (skip ran too late; `request.get` threw) |
| 3 | Skip API health when :3001 is down | **failure** — `curl` to `:4173` after `sleep 2`; `serve` was not ready |
| 4 | Wait until local site answers | **success** — `c9b0cd2864fec4788f32dd1de2ce570038fff802` |

Run 4 URL: https://github.com/fiazhassan1/lession_learned/actions/runs/36529946553

Fixes already in `main`:

1. `tests/e2e/api-health.spec.ts` wraps `request.get` in try/catch and skips if the API is down.
2. CI start step loops `curl` up to 30s instead of `sleep 2`.

Do not “explore CI best practices.” The pipeline exists. If it is red, read the job logs and patch.

---

## Locked product rules (from the owner)

- `og:type` must not be `x:game`.
- Share card: absolute `https` `og:image`, width **1200**, height **630**, `twitter:card` = `summary_large_image`.
- Homepage H1 is a product job, not wellness marketing (`empower` / `holistic` / `wellbeing journey` are rejected in smoke).
- Footer wellbeing line is a **boundary**, not a clinical service.
- Brand palette if you touch live visual design: deep navy `#071428`, ice blue `#8ecce4`, champagne gold `#d4b45a`, off-white `#f2f6fa`.
- Hostinger static upload is the marketing host. Do not require Docker for go-live.

---

## GitHub connector notes (for Grok / Claude tools)

- Account: `fiazhassan1`.
- App name on GitHub: **Grok (by xAI)** (`xai-org`).
- Early writes failed with `403 Resource not accessible by integration` because the app was **authorized** but not **installed** with Contents write on this repo.
- After Install & Authorize on `fiazhassan1/lession_learned` (Contents/code + workflows write), create-file and push-files worked.
- The owner should not be asked to debug that again unless write 403 returns.

---

## What Grok did **not** do

- Did not upload the live Hostinger site or a real `og.jpg`.
- Did not wire Prisma / Postgres into the running API (store is in-memory).
- Did not set repo variable `BASE_URL` to a live domain.
- Did not change the Enterprise AI Chatbot source of record. Extra RAG files were later placed only in Drive folder `Grok_RAG_review` for a separate Claude review. Ignore that folder for this repo.

---

## Suggested next work (do it yourself; do not ticket the owner)

Only if the owner asks to continue Lessons Learned:

1. Confirm Actions on latest `main` is still green.
2. When a Hostinger URL exists, set `BASE_URL` / workflow input and replace `example.com` OG URLs with that origin and a real 1200×630 image.
3. Keep chatbot code out of this repository.

---

## How to review

```bash
git clone https://github.com/fiazhassan1/lession_learned.git
cd lession_learned
npm install
npx playwright install chromium
npx playwright test
```

Local tests start `site/` on `http://127.0.0.1:4173`. API tests skip unless `npm run api:dev` is running on `:3001`.
