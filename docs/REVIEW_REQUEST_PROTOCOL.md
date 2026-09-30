# Requesting an independent ChatGPT review (all projects)

Project-agnostic. Applies to every current and future project that uses the Fiaz / Claude Code / ChatGPT workflow. Replace the `<…>` placeholders; do not change the structure. Each repository should carry a copy (or link to this file), because an agent in a different repo cannot see this one.

## What is and is not automatic

- Opening a PR or posting a comment is a **durable handoff**, not a trigger. No automatic ChatGPT review is configured or verified in any project inspected (Lessons Learned, GBOB Automation). An idle ChatGPT session does not start on its own.
- ChatGPT reviews when it is **invoked in its own session** with a prompt like the one below. It reads the PR and Issue directly through its GitHub connection.
- Do not invent a ChatGPT reviewer username, and do not request a GitHub review from an account that is not a real, verified reviewer.
- Fiaz should not have to copy technical content between tools. The only thing he (or whoever opens the ChatGPT session) pastes is the short prompt; everything else lives in the PR/Issue.

## Developer steps (whoever authored the change)

1. Push the branch and open the PR from the repo's PR template, with the exact head SHA, acceptance criteria, commands run with pass/fail/skip results, CI link, risks, and schema/security impact.
2. Comment once on the linked Issue with the PR link, head SHA and any blockers.
3. Post the invocation prompt (below) as a PR comment so it is visible and reusable, and tell Fiaz in chat that ChatGPT needs to be invoked with it.
4. Never self-approve or self-merge. After any new commit, post the new head SHA and ask for re-verification.

## Invocation prompt (copy, fill in, paste into ChatGPT)

```
Independently review PR #<n> at head <full SHA> in <owner>/<repo>.
Read Issue #<n>, AI_DEVELOPMENT_SOP.md (or the repo's SOP) and <story/AC file> first.
Your role here: <BA and independent QA | independent reviewer>. You did not author this change: <yes/no; disclose if you did>.
Review: requirements/AC coverage, correctness, tests and CI, security/privacy, accessibility and responsive behavior where UI changes, and <project-specific checks>.
Verify claims against the code or named upstream commit: <e.g. core chatbot commit SHA>.
Post findings on the PR with the SHA you reviewed, severity, evidence and required fixes. State which checks you actually ran vs only read.
Do not merge unless the project's merge rule says the independent reviewer merges and all applicable gates have passed.
```

## Reviewer output expected

Exact SHA reviewed; findings with severity and evidence; tests reviewed/run and checks that were blocked; CI status; required fixes; readiness for Fiaz acceptance (UI) or for merge under the project's rule.

## When GitHub is not available to a session

Fall back to the project's documented handoff file (for GBOB: `CLAUDE_TO_CHATGPT.md` / `CHATGPT_TO_CLAUDE.md` in Google Drive > GBOB > Source Code). Use it only while GitHub access is missing, and move the content into the PR/Issue afterward.

## Roles differ by project

Check each project's SOP before acting. Examples as of 2026-09-30 (verify; may change): Lessons Learned: Claude develops, ChatGPT is BA/independent QA, independent AI QA merges non-UI changes. GBOB Automation (unmerged KB branch): ChatGPT develops, Claude is QA/reviewer, only Fiaz merges. The invocation prompt works in either direction by changing the role line.
