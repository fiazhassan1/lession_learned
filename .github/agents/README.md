# Developer test-agent workflow

The planner/generator/healer pattern referenced by this repository comes from fiazhassan1/AgentE2EQAWorkflow-Playwright. This README does not install agent definitions or guarantee those tools are available.

- Planner: explore approved acceptance criteria and produce a test plan.
- Generator: implement meaningful scenarios in tests/.
- Healer: diagnose failures and fix their causes; keep product defects visible and do not conceal them with test.fixme/skips.

Read AI_DEVELOPMENT_SOP.md and QAEnd2EndPromptFile.md. These capabilities are Claude's developer tooling, not independent ChatGPT approval. Use branches/PRs, record exact SHA and test evidence, and leave merging to independent AI QA after applicable gates pass.
