# Lessons Learned — same 7-step agentic QA loop

Source pattern: `fiazhassan1/AgentE2EQAWorkflow-Playwright`
Target repo: `fiazhassan1/lession_learned`

## STEP 1 — Read user story
Read `user-stories/LL-001-hostinger-share.md`. Summarize AC and URLs.

## STEP 2 — Plan
Use playwright-test-planner. Explore `BASE_URL` or `http://127.0.0.1:4173`.
Save `specs/ll-001-hostinger-share-plan.md`.

## STEP 3 — Explore
Walk each AC in a real browser. Note locators (roles, not nth-child).

## STEP 4 — Generate
Use playwright-test-generator. One scenario → one test under `tests/smoke` or `tests/e2e`.

## STEP 5 — Heal
Use playwright-test-healer. Run `npx playwright test`. Fix selectors. Re-run. `test.fixme` only if the product is wrong.

## STEP 6 — Report
Write `test-results/LL-001-report.md` (pass/fail, skips, gaps).

## STEP 7 — Commit
Commit on `main`. GitHub Actions runs `.github/workflows/e2e.yml`.
