# LL-002 — onboard Claude, import approved source and establish chatbot integration contract

Tracked by https://github.com/fiazhassan1/lession_learned/issues/1

## User story

As the Product Owner, I want Claude to continue the approved Lessons Learned website from reproducible GitHub source, with independent QA and a reusable enterprise chatbot integration/upgrade path.

## Scope

Work only in Lessons Learned. Read the core chatbot repository for integration discovery when needed; do not modify the core or GBOB. No guessed redesign, file deletion, DNS/hosting change or production deployment.

## Acceptance criteria

### AC1 — Roles and review
Read AI_DEVELOPMENT_SOP.md, CLAUDE.md, AGENTS.md and docs/CLAUDE_RESPONSE.md. Claude owns Dev/STED; ChatGPT owns BA/independent QA; Fiaz owns Product Owner/PM/manual and automation QA. Use branches/PRs and exact commit evidence. The independent reviewer handles merging under the latest owner rule; developers do not self-merge.

### AC2 — Baseline evidence
Record current main/head SHA, local changes, CI status and appropriate local checks from docs/TESTING.md. Distinguish pass, fail, skip and unavailable prerequisites. Green fixture CI and skipped API health do not prove backend or completed-site acceptance.

### AC3 — Approved website source
Locate the approved website ZIP/folder, inventory its pages/assets and compare against the fixture before importing. Preserve existing source and check imports for secrets/private data. If absent, record a blocked source-import gate; do not claim completion or invent source. Import available approved source in a separate PR with reproducible preview instructions.

### AC4 — Shared core contract
Discover supported enterprise chatbot widget/API/SDK and the actual core release/version or commit. Document available vs missing capabilities, project configuration, branding/knowledge/tenant isolation where supported, secure authentication and browser-safe configuration. Do not duplicate the core. If the core contract is unavailable, record the gap and proposed integration slice.

### AC5 — Upgrade and verification
Document integration compatibility tests, core-upgrade regression checks, failure handling and rollback. Actual implementation/upgrade requires testing against the verified contract. Include relevant desktop/mobile, accessibility, security/privacy and social metadata evidence for imported/integrated UI. Mark product implementation blocked when source/contract is missing rather than treating a plan as implemented.

### AC6 — Handoff
PR description links Issue #1, identifies exact head SHA, AC coverage, changed paths, preview instructions, test/CI results and remaining gaps. ChatGPT reviews Claude-authored implementation through GitHub; Claude responds there. No direct GPT invocation or technical copy/paste courier is required.

## Checkpoint boundaries

1. Independently reviewed onboarding documentation.
2. Baseline/source inventory and verified integration contract.
3. Approved-source import and project-side integration in coherent implementation PRs as prerequisites become available.

Documentation-only onboarding may merge after an independent review and applicable checks without a second Fiaz review. Actual UI work retains applicable Fiaz manual acceptance. Release is separate.
