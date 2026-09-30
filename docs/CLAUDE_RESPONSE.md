# Claude Code — scope and review clarification

Fiaz requested this clarification on 2026-09-30 in response to Claude's three onboarding questions.

## 1. What should I build or change?

The scope is broader than the historical handover's CI/OG follow-up. See Issue #1 and user-stories/LL-002-onboarding-source-and-integration.md.

First independently review the ChatGPT-authored onboarding PR and current owner rules. Then continue on your proposed implementation branch `claude/fervent-allen-t0rdkw`, updated from the reviewed baseline. Verify existing CI and record clean-checkout test results and skips.

Locate the existing approved Lessons Learned website ZIP/folder in the local project files. Current GitHub site/ is a QAITEK-branded starter fixture. If the package is available, inventory and safely import its required source/assets in a separate PR, preserving existing work. If missing, record the source blocker in Issue #1 and continue safe baseline testing and integration discovery; do not fabricate a replacement design.

Every project must support shared enterprise AI chatbot integration and future core upgrades by default. Inspect the actual core integration docs/code read-only and document verified interfaces, versions, configuration, tenant/knowledge/branding isolation, tests and upgrade/rollback steps. Do not invent APIs or claim a planned core capability already exists. Implement project-side integration only against a verified supported contract and approved source/acceptance criteria; otherwise record the gap and proposed next slice.

Use the approved production-origin intent from docs/HOSTINGER_DEPLOYMENT.md when preparing metadata, but do not equate a configured string with a live domain or verified image. No DNS/hosting/deployment is authorized here.

## 2. How should GPT review work?

Option (a): work on a branch and open a PR; ChatGPT reviews the PR through its GitHub connection. No direct GPT API call is needed. Use a draft while incomplete; mark ready when self-tests and evidence are ready.

Put the structured review brief from option (b) directly into the PR description: Issue/AC, exact head SHA, changed areas, preview instructions, actual test results/skips, CI links, risks and schema/security impact. Fiaz need not copy/paste the brief. Address review comments in GitHub and identify the new head SHA for verification.

There is no verified automatic ChatGPT review trigger configured. Opening a PR is a durable handoff, not a guarantee that an idle ChatGPT session automatically starts reviewing. When invoked in this project, ChatGPT can read the PR directly. Do not invent a ChatGPT reviewer username.

Fiaz's latest clarification: the independent AI QA reviewer merges after applicable checks. Non-UI changes without a frontend acceptance path need one independent AI review without a second Fiaz review. UI changes retain applicable Fiaz manual acceptance. The developer never self-approves/self-merges. ChatGPT authored the onboarding documentation, so Claude may independently review/merge that documentation checkpoint, then return to Dev/STED responsibility.

## 3. Should work touch the other projects?

Modify only `fiazhassan1/lession_learned` for this task. Read `QAITEK/enterprise-ai-chatbot` only as needed to verify the core integration contract; do not edit it or GBOB_Automation here.

The old “keep chatbot code out” instruction means do not copy/rebuild the core inside Lessons Learned. It does not prohibit the newly required shared integration. Keep independent project source/hosting and shared core behavior through the supported adapter/widget/API/SDK.

## Roles

Claude: Dev and STED automation QA.
ChatGPT: BA and independent QA.
Fiaz: Product Owner, PM, manual and automation QA.
GitHub: durable technical source of truth for requirements, checkpoints, defects and reviews.
