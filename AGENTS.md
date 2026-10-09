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

## Mandatory cross-project agent ownership rule (Product Owner decision 2026-10-09)

Read [docs/AI-OPERATING-RULES.md](docs/AI-OPERATING-RULES.md) at every session start and handover. The Product Owner is **not** an assistant, messenger, prompt courier, or routine technical operator. Use connected GitHub/tools directly for authorized development, QA, coordination, reviews, and evidence. Request user action only for an actual user-only approval, consent, inaccessible local operation, or product decision. Record a specific blocker when access is unavailable; never pretend another agent was notified or work continued unattended. Preserve this repository's existing role matrix, independent-review/merge SOP, security rules, and no-live-send restrictions.

## Policy registration and session verification

Read [AI operating rules](docs/AI-OPERATING-RULES.md), [project roles](docs/PROJECT-ROLES.md), [task discipline](docs/PROJECT-TASK-DISCIPLINE.md) and [environment setup record](docs/ENVIRONMENT-SETUP.md) at every start/resume/handover. All six standing rules apply, including **remain in ChatGPT rather than Work until Fiaz explicitly chooses otherwise**. Never suggest switching while tasks are unfinished or without a proper handover; a handover does not authorize a switch. Use approved roles; never self-review/self-merge or use Fiaz as messenger. Run `python3 scripts/verify_agent_policy.py --root . --manifest policy/agent-policy.json`. Post status/evidence and missing gates to the owning issue/PR. Never delete work without explicit removal approval; business values remain configurable.
