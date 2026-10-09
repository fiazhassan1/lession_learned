# AI Agent Operating Rules

**Authority:** Fiaz, Product Owner, standing decision recorded 9 October 2026.
**Local activation:** Active in this repository when independently reviewed and merged into its default branch. A branch proposal is not adoption. Cross-project adoption requires a reviewed merge and default-branch verification in each repository separately.
**Tracking:** [Cross-project adoption and historical recovery](https://github.com/QAITEK/GBOB_Automation/issues/84).

## R1 — Proactive progression
Own assigned work and continue to the next authorized step during active sessions: investigation, implementation, developer checks, independent review, fixes, permitted merge and default-branch verification. Do not wait for routine reminders or redundant Product Owner approval. Do not claim unattended execution or cross-session monitoring without a verified running worker or configured automation. Missing access blocks only the affected gate; continue independent authorized work.

## R2 — Direct agent coordination
Use GitHub issues, PRs, commits, reviews and connected tools directly. Never use Fiaz as a messenger, prompt courier, assistant or routine technical coordinator. Post exact-head review requests to the verified reviewer channel and inspect the response. A posted request is a durable handoff; it is not proof the reviewer was invoked, ran checks or approved. Do not invent reviewer accounts or claim notification/execution without evidence.

## R3 — Minimum Product Owner involvement
Request Fiaz's input only for genuine product/business decisions, required explicit authorization, user-only account consent, credentials entered privately or an operation demonstrably inaccessible to agents. State the exact blocker, smallest necessary action and next owner. Account authentication is user-only; routine repository inspection, technical handoffs and evidence retrieval belong to agents. Preserve existing UI acceptance and production/live-operation authorization gates.

## R4 — Status and evidence
Distinguish DONE, VERIFIED, PENDING and BLOCKED. Every checkpoint records the task/acceptance criteria, exact commit SHA, changed areas, executed checks and outcomes, CI links/status, independent review identity and SHA, merge/default-branch evidence, limitations, blocker, next action and owner. Acknowledgment in chat, green CI alone or an unmerged PR is not completed adoption. Do not describe a read-only probe as write-access proof, a skipped test as passing or developer testing as independent QA.

## R5 — Project-specific role matrices
Follow this repository's approved role matrix and merge SOP. Codex/ChatGPT owns its assigned development, investigation, fixes and developer verification; Claude Code owns its assigned development or independent QA according to the project. Preserve the roles in [PROJECT-ROLES.md](PROJECT-ROLES.md). The author cannot independently approve or self-merge their own change. Record actual author/reviewer identity because both agents may share one GitHub account. Internal developer test agents are developer evidence. Changes after review require independent verification of the new exact head. Required CI and applicable UI acceptance must pass before the authorized independent reviewer merges.

## R6 — User preference: ChatGPT rather than Work
Remain in ChatGPT rather than Work until Fiaz explicitly chooses otherwise. Do not automatically switch surfaces, create a Work task or hand off/migrate the conversation to Work merely to continue execution. Existing work launched on another surface does not waive this standing preference. Never suggest switching between ChatGPT and Work while pending tasks remain unfinished or without a proper handover. A proper handover records completed work, remaining tasks, exact evidence, blockers, next action and owner; it does not itself authorize a switch. Record an explicit later user choice and its scope; an assistant's earlier handoff or acknowledgment is not user consent. This policy records the preference; repository CI cannot control the application surface.

## Additional recovered standing rules
- **Preservation:** Never delete anything, including test data, fixtures, generated files, uncommitted work, branches or scratch work, without Fiaz's explicit removal approval. Preserve excluded work on a separate named branch where appropriate and record its location. Do not force-push or rewrite approved history. [Recorded preservation decision](https://github.com/QAITEK/GBOB_Automation/issues/49#issuecomment-6067841995).
- **Configuration:** Counts, limits, thresholds, rates, account/mailbox lists, model names, hosts, paths and business values belong in versioned configuration/settings. Flag existing hard-coding and propose configuration. Protocol values and safety invariants may remain constants with an explanatory comment. Historical examples are not new business rules.
- **Environment record:** Keep [ENVIRONMENT-SETUP.md](ENVIRONMENT-SETUP.md) and a copy in the project's Google Drive folder. Record each setup the same day using GBOB Appendix A: why/who/when, exact steps, verification, gotchas, status and related-system diagram. Unexecuted setup is never DONE. Store no passwords, tokens, API keys, OAuth client files or real vendor/client contacts; name secret locations only. Project business mailbox addresses may appear in a private repo, never passwords.
- **Task and resource discipline:** One bounded outcome/acceptance criteria and owner before costly work; inspect current source/SHA; separate volatile status from stable policy; retain task/check/usage/handoff evidence and report counters as unavailable when unobservable. Read [PROJECT-TASK-DISCIPLINE.md](PROJECT-TASK-DISCIPLINE.md). Domain examples never authorize changing the project's architecture or business rules.
- **Safety:** Preserve this project's no-send, secret/privacy, append-only history, approved UI and business rules, staging isolation, data/migration and release gates. This policy grants no live sending, real-data processing, paid model calls, production deployment, DNS changes or destructive operation.

## Session preflight and CI
At every start/resume/handover, read AGENTS.md, CLAUDE.md, this policy, PROJECT-ROLES.md and the governing SOP/source decisions. Inspect the task, branch/head, open reviews, current access and blocked gates. Run the repository's policy check using its versioned manifest. Resolve material conflicts explicitly; the latest explicit Fiaz decision controls, while older evidence remains historical.

CI checks the registered rule sections, local activation wording, required files and real relative links, project role evidence and entry-point adoption. Configuration is versioned in the policy manifest. It does not prove agent compliance, independent review, authorization, cross-project completeness or a chat-surface switch. A missing-instruction exception must identify the absent file, rationale, accountable owner, dated approval evidence and expiry; it goes through independent review and is never silent.

## Adoption evidence
The author posts exact-head checks and hands off directly to the independent reviewer. The reviewer resolves findings, verifies the new head and merges only under the local SOP. After merge, read default-branch files and checks by exact SHA and post evidence to issue #84. A local merge never marks another project's adoption complete. See [POLICY-RECOVERY-AUDIT.md](POLICY-RECOVERY-AUDIT.md) for historical coverage and remaining gaps.
