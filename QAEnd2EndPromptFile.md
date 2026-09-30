# Lessons Learned — developer QA workflow

Read AI_DEVELOPMENT_SOP.md first. This developer loop does not replace ChatGPT independent review or Fiaz acceptance. Use installed planner/generator/healer capabilities only when actually available; ordinary Playwright work is acceptable.

1. Read the approved user story and identify acceptance criteria and authorized target URL. Current fixture story: user-stories/LL-001-hostinger-share.md.
2. Plan relevant scenarios; record assumptions and missing requirements. Save durable plans under specs/ when useful.
3. Explore the local app with a real browser when available. Prefer role/name locators.
4. Implement meaningful smoke/E2E scenarios under tests/, grounded in the approved behavior.
5. Run the appropriate suites. Fix implementation/selector causes and retest. Do not use test.fixme or new skips to conceal broken product behavior. Report existing optional API-health skips separately.
6. Put durable results in the Issue/PR or docs/qa/: exact SHA, commands, pass/fail/skip counts, environment, defects, limitations and CI. test-results/ is ignored; it is not a durable handoff location.
7. Commit/push on a scoped branch and open a PR linked to the Issue. Do not commit implementation directly to main or self-merge as developer. ChatGPT independently reviews; Fiaz handles business/UI acceptance; independent AI QA performs merges.
