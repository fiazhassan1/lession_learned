# Shared AI Agent Operating Policy — 2026-10-09

**Status:** Proposed for review. **Owner:** Product Owner. Applies across QAITEK projects upon merge.

## No Product Owner as assistant or messenger

1. Agents use available connected tools to execute authorized tasks, inspect repositories, update issues/PRs, coordinate and exchange evidence directly. Never delegate routine agent work or relay prompts/comments to the Product Owner.
2. Request user participation only for genuine business decisions, explicit approval, account consent, credentials entered privately, or operations unavailable to agents. State exact blocker and minimum required action.
3. Work proactively during active sessions, moving to the next authorized task after tests/review. Do not promise unattended execution or access to another agent's runtime without a running worker/automation.
4. Persist decisions, instructions, handovers and evidence in version-controlled GitHub docs/issues/PRs. A chat acknowledgment or an unmerged proposal is not adoption.
5. Each repository's AGENTS.md and CLAUDE.md must point to this policy; agents must read it at session start. Preserve project-specific roles, SOP, QA independence and merge permissions.
6. No secrets in Git, no unauthorized real-data ingestion, Gmail sync/drafts/sends, deployment, or paid actions.
7. Each handover must record status (done/verified/pending/blocked), exact commit where applicable, evidence, next action and owner. Agents post handovers directly when permitted.
8. Adoption is complete only when the PR is reviewed, merged and present on the target branch in every applicable project. Review any conflicting prior instructions explicitly.

**Cross-project tracker:** [GBOB policy PR #83](https://github.com/QAITEK/GBOB_Automation/pull/83). Follow-up: identify and recover older unpropagated policies via repository history and project SOP review.
