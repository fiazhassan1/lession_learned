# Requesting an independent AI review (all projects)

Project-agnostic. Applies to every current and future project that uses the Fiaz / Claude Code / ChatGPT workflow. Replace the `<…>` placeholders; do not change the structure. Each repository should carry a copy (or link to this file), because an agent in a different repo cannot see this one. **The target repo's current approved SOP always wins** over anything here, including roles and merge rules.

## Who reviews whom

The reviewer must be independent of the author. Route the request to the *other* AI:

| Author of the change | Independent reviewer |
| --- | --- |
| Claude Code | ChatGPT |
| ChatGPT | Claude Code |
| Fiaz (human) | Either AI, per the project's SOP |

Author/reviewer separation check (required before reviewing **or** merging): state who authored each commit in the PR; if the intended reviewer authored any part of it, that part is not independently reviewed by them and needs the other AI or Fiaz. Disclose the contribution in the review. Note: both AIs may act through the same GitHub account, so GitHub's author/approver fields cannot prove independence. Put the author and reviewer identities in the PR text and review body, and expect a COMMENT review rather than a formal approval or REQUEST_CHANGES event.

## What is and is not automatic

- Opening a PR or posting a comment is a **durable handoff**, not a trigger. No automatic AI review is configured or verified in any project inspected (Lessons Learned, GBOB Automation). An idle session does not start on its own.
- The reviewer reviews when it is **invoked in its own session** with a prompt like the one below. It reads the PR and Issue directly through its GitHub connection.
- Do not invent a reviewer username, and do not request a GitHub review from an account that is not a real, verified reviewer.
- Fiaz should not have to copy technical content between tools. The only thing pasted into the reviewer's session is the short prompt; everything else lives in the PR/Issue.

## Author steps

1. Push the branch and open the PR from the repo's PR template, with the exact head SHA, acceptance criteria, commands run with pass/fail/skip results, CI link, risks, and schema/security impact.
2. Comment once on the linked Issue with the PR link, head SHA and any blockers.
3. Post the invocation prompt (below) as a PR comment so it is visible and reusable, and tell Fiaz in chat which AI must be invoked with it.
4. Never self-approve or self-merge. After any new commit, post the new head SHA and ask for re-verification.

## Invocation prompt (copy, fill in, paste into the reviewer's session)

```
Independently review PR #<n> at head <full SHA> in <owner>/<repo>.
Read Issue #<n>, the repo's SOP and <story/AC file> first.
You are the independent reviewer (<ChatGPT | Claude Code>) in role <BA and independent QA | QA/reviewer>. The change was authored by <Claude Code | ChatGPT | Fiaz>. Confirm you did not author any of it; if you did, disclose which parts and do not treat your review of them as independent.
Review: requirements/AC coverage, correctness, tests and CI, security/privacy, accessibility and responsive behavior where UI changes, and <project-specific checks>.
Verify claims against the code or named upstream commit: <e.g. core chatbot commit SHA>.
Post findings on the PR with the SHA you reviewed, severity, evidence and required fixes. State which checks you actually ran vs only read.
Merge only if this repo's current approved SOP says the independent reviewer merges and every applicable gate has passed (author/reviewer separation confirmed, CI green on the current head, UI acceptance where required).
```

## Reviewer output expected

Exact SHA reviewed; author/reviewer separation statement; findings with severity and evidence; tests reviewed/run and checks that were blocked; CI status; required fixes; readiness for Fiaz acceptance (UI) or for merge under the project's rule.

## When GitHub is not available to a session

Fall back to the project's documented handoff file (for GBOB: `CLAUDE_TO_CHATGPT.md` / `CHATGPT_TO_CLAUDE.md` in Google Drive > GBOB > Source Code). Use it only while GitHub access is missing, and move the content into the PR/Issue afterward.

## Roles and merge rules differ by project

Always read the target repo's current, merged SOP. Do not copy a role or merge rule from another repo or from an unmerged branch. For reference only (verify in each repo): Lessons Learned (merged SOP and docs/SHARED_AI_INTEGRATION_AND_ROLES.md): Claude develops, ChatGPT is BA/independent QA, and the independent AI QA reviewer merges after applicable gates. GBOB Automation's roles are reversed (ChatGPT develops, Claude reviews); its merge rule was not confirmed in a merged SOP, so check it there before acting.
