# Lessons Learned Global implementation plan

## Current baseline

See docs/PROJECT_STATUS.md for source and CI evidence. The repository has a testable starter fixture, not the finished marketing website. The earlier claim that it already contains the Hostinger static drop was not supported by inspected source.

## Next coherent checkpoints

1. Establish reproducible local developer test results and inspect current CI.
2. Locate the approved finished website package; import its source/assets on a dedicated branch if available. If missing, report the blocker rather than inventing a redesign.
3. Reconcile QAITEK fixture leftovers with the approved Lessons Learned source and requirements. Keep the existing OG contract: website/article type, absolute HTTPS image, real 1200×630 asset and summary_large_image.
4. Validate actual page navigation, submission behavior, responsive design, accessibility and social metadata. Update tests from approved requirements, keeping defects visible.
5. Independent ChatGPT review and fix verification, CI, Applicable Fiaz acceptance and independent AI QA merge.
6. Verify separate Hostinger website capacity and prepare an isolated static release. Deploy only after separate release authorization, then smoke test.

## Shared chatbot integration

This is a default requirement from Fiaz for every project. Discover the enterprise core's actual widget/API/SDK, supported capabilities, authentication/configuration and versioning. Record the Lessons Learned integration contract, selected core version, environment configuration and compatibility tests. Use project-specific knowledge/branding with shared core behavior. Verify upgrades and rollback through the normal PR/QA/CI/Fiaz acceptance flow; do not assume all planned core features already exist.

## Future work

The optional in-memory API and unwired Prisma schema do not establish persistence. CMS, database storage, production API and other architecture additions require an approved scope. Do not block static preview/import on Docker, and integrate the shared Enterprise AI Chatbot core rather than copying its feature implementation into this repository.
