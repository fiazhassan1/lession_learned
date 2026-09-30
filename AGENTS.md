# Repository agent guidelines

Read AI_DEVELOPMENT_SOP.md and docs/PROJECT_STATUS.md before starting or resuming work.
The SOP defines the project workflow for all repository agents. Claude Code also reads CLAUDE.md.

- Fiaz is Product Owner, PM and manual/automation QA; he owns business acceptance and release scope; independent AI QA performs merging.
- Claude Code is developer and STED automation QA.
- ChatGPT is BA and independent QA; disclose any contribution authored by the reviewer.
- Communicate technical decisions and evidence through GitHub Issues/PRs.
- Use branches and PRs. Do not self-merge as developer or write implementation directly to main. Independent AI QA merges after applicable gates pass.
- Preserve unrelated work; no file deletion without Fiaz's explicit confirmation.
- Record exact commit SHA, executed checks, CI, defects, skipped/blocked gates and schema/security impact.
- Do not weaken tests, conceal defects or invent product requirements.
- Lessons Learned Global has separate source and hosting from QAITEKSolutions.com. Shared enterprise AI chatbot integration and core upgrades are baseline requirements; see docs/SHARED_AI_INTEGRATION_AND_ROLES.md.
- Onboarding does not authorize deployment, DNS changes, production messages or database changes.
