# Agentic QA loop (from AgentE2EQAWorkflow-Playwright)

Same three agents as https://github.com/fiazhassan1/AgentE2EQAWorkflow-Playwright

1. playwright-test-planner — explore the app, write `specs/*.md`
2. playwright-test-generator — turn one spec scenario into one `tests/**/*.spec.ts`
3. playwright-test-healer — run, debug, patch until green (or `test.fixme`)

Orchestration prompt: `QAEnd2EndPromptFile.md` in this repo (Lessons Learned variant).
