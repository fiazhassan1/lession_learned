# AI Development SOP — Lessons Learned Global

Repository: https://github.com/fiazhassan1/lession_learned
Prepared 2026-09-30. This protocol becomes the repository baseline when the independently reviewed onboarding PR is merged. It is adapted from the Enterprise AI Chatbot SOP at commit `693cddb84486d21e8006acfac41edefd444c605b` (PR #1, still unmerged when inspected); only the operating process is reused, not chatbot features or infrastructure.

## Principles

- GitHub is the technical source of truth for requirements, code, decisions, defects, reviews and checkpoints.
- Work must be reproducible from a clean checkout on a supported environment, without dependence on one machine or AI conversation.
- Preserve existing work. Do not delete files without Fiaz's explicit confirmation.
- Use small, coherent branches and PRs. No direct implementation commits to main, force-pushes to main, unreviewed merges or bypassing review.
- This is Lessons Learned Global. QAITEKSolutions.com and the Enterprise AI Chatbot are separate repositories/products; every project must support integration with the shared enterprise chatbot core. See docs/SHARED_AI_INTEGRATION_AND_ROLES.md.
- Explicit task instructions from Fiaz control scope. Report material conflicts rather than silently changing approved business rules.

## Roles

| Role | Responsibility |
| --- | --- |
| Fiaz | Product Owner, PM, business-rule and scope authority, manual and automation QA, final acceptance authority and business acceptance authority |
| Claude Code | Developer and STED automation QA: implement frontend, approved backend/API/database work, integrations, developer tests, regression fixes, CI and technical documentation |
| ChatGPT | BA and independent QA: clarify requirements/acceptance criteria, review architecture, implementation, API/database, security/privacy, accessibility, responsive UI, SEO, tests, CI, regression and fixes |
| GitHub Actions | Repeatable automated gate; green CI is evidence, not acceptance or merge authority |

ChatGPT may contribute scoped process documentation, tests or fixes. It must disclose authorship and must not present a review of its own contribution as independent approval. Claude's internal test agents are developer tooling, not a substitute for ChatGPT review.

## Workflow

1. Capture Fiaz's requirement in an Issue with acceptance criteria and scope.
2. Claude reads this SOP, CLAUDE.md, current requirements, relevant code and existing Issues/PRs.
3. Implement on a branch from current main. Preserve unrelated local changes.
4. Run developer checks and document the exact commands, results, failures, skips and unavailable prerequisites.
5. Push a coherent checkpoint and open a PR linked to the Issue.
6. ChatGPT independently reviews the exact head SHA and tests where tooling permits.
7. Claude fixes findings and runs affected regression checks.
8. ChatGPT verifies the new head SHA; material changes after review require renewed verification.
9. Required CI is green. For UI changes, Fiaz performs the applicable manual/automated acceptance from VS Code. For non-UI changes with no frontend acceptance path, the independent AI review and appropriate automated checks suffice without a second Fiaz review.
10. The independent AI QA reviewer performs the final merge after the applicable gates pass. The independent AI QA reviewer merges after applicable gates pass; the developer must not self-approve or self-merge.
11. Production deployment is a separate action requiring Fiaz's release authorization and a smoke test of the approved release.

## Communication and evidence

Use GitHub Issues, commits, PR descriptions, review comments and CI results rather than asking Fiaz to relay technical messages between tools. A role name is not a GitHub account: do not invent reviewer usernames. If a tool/session cannot access GitHub, disclose the limitation.

Development checkpoints identify: Issue/acceptance criteria, exact commit SHA, changed areas, test commands and outcomes, CI link/status, known defects/skips, DB/schema and security impact, and readiness for independent review.
Reviews identify: exact SHA reviewed, evidence and severity of findings, tests reviewed/run, blocked checks, CI status, required fixes and readiness for Fiaz acceptance.
No unsupported “done,” “production ready” or “all tests passed” claims.

## Testing integrity

- Preserve approved acceptance criteria; fix causes rather than weakening assertions.
- Do not use test.fixme, test.skip, retries, mocks or CI changes to hide a regression. A legitimate optional check must have a documented reason; existing skips must be reported.
- Developer testing, independent review, CI and Fiaz acceptance are distinct gates.
- Browser emulation does not establish real iPhone/Android acceptance.
- A cloud session first checks whether a prerequisite is available. If required tooling is genuinely local-only or unavailable, report the blocked gate and provide a reproducible local command; never silently mark it passed.
- This project currently has no Ollama/RAG/GPU test requirement. Do not import chatbot-specific prerequisites.
- Live tests must use an explicitly authorized target and synthetic data; do not contact real recipients or submit production leads as part of routine tests.

## Stop the affected work and report

Report approved-functionality regressions, secret/private-data exposure, security vulnerabilities, auth bypasses, unapproved destructive DB changes, unexplained CI regressions, accidental production actions or material requirement conflicts. Continue unrelated safe work where possible. Do not change an approved business rule to make a test pass.

## Project boundaries

The current repository is a starter fixture and test harness, not evidence that the finished Lessons Learned website has been imported. See docs/PROJECT_STATUS.md.
Phase 1 hosting intent is a separate Hostinger website/domain folder. No changes to QAITEK's folder, DNS, emails or deployment. Docker/Postgres and a production API are not prerequisites for uploading a static site.
Shared enterprise chatbot integration and an upgrade path are baseline requirements from Fiaz. Integrate the reusable core through its verified supported interface; do not duplicate its implementation. Project-specific CMS, authentication, migrations and hosting changes still need scoped requirements.

## Latest merge rule — Fiaz clarification, 2026-09-30

This overrides the original reference SOP's Fiaz-only merge rule. The assigned independent AI QA reviewer performs the merge after required checks pass. For changes with no UI and no frontend acceptance path, one independent AI review plus required tests/CI is sufficient; a second Fiaz review is not required. UI changes retain applicable Fiaz manual acceptance. The developer must not self-approve or self-merge. New commits after review require verification of the new head. Production release remains separately authorized.

Lessons Learned roles: Claude develops and runs STED automation QA; ChatGPT handles BA and independent QA. ChatGPT authored this onboarding documentation, so Claude may independently review and merge this documentation checkpoint. ChatGPT cannot independently approve its own contribution.

## Interim QA/STAGING decision — 2026-10-01

Fiaz approves the Mac Mini as separate QA/STAGING until production is complete. [docs/INTERIM_QA_STAGING.md](docs/INTERIM_QA_STAGING.md) defines isolation, reproducibility, evidence and release boundaries. Production/VPS setup does not block development or available testing. Keep genuinely environment-specific checks pending until run. This does not change Lessons Learned's approved production hosting intent or authorize deployment.
