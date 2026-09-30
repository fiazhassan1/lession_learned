# Shared enterprise AI chatbot integration and project roles

Fiaz's portfolio requirement, 2026-09-30: every project must support the enterprise AI chatbot by default and be able to adopt upgrades when the core product is updated.

## Roles

| Project | Claude Code | ChatGPT | Fiaz |
| --- | --- | --- | --- |
| Enterprise AI Chatbot | Dev, STED automation QA | BA, QA | Product Owner, PM, manual and automation QA |
| GBOB Automation | BA, QA, STED automation QA | Dev | Product Owner, PM, manual and automation QA |
| Lessons Learned Global | Dev, STED automation QA | BA, QA | Product Owner, PM, manual and automation QA |
| QAITEK official website and AI chatbot integration | Dev, STED automation QA | BA, QA | Product Owner, PM, manual and automation QA |

The developer self-tests; the project's separate QA role independently verifies. STED refers to Fiaz's specified automation QA role; no expansion is assumed here. Fiaz owns business acceptance and release decisions. The independent AI QA reviewer merges after applicable gates pass.

## Simplified prompt for every project's Dev and QA

Every project must support integration with our shared Enterprise AI Chatbot core by default. Reuse the core through its supported widget, API or SDK; do not build a separate chatbot in each project.

Read the project SOP, requirements and current core integration documentation first. Confirm what the core actually supports. Keep project branding, knowledge, tenant identity and configuration separate, and keep secrets out of browser code.

Document the core version and integration contract so this project can adopt core upgrades. For each upgrade, check compatibility, test affected features and regressions, provide rollback, and obtain Fiaz's acceptance before release. Do not automatically deploy an untested core update.

Use the roles in the table above. Dev implements and self-tests. BA clarifies requirements and acceptance criteria. QA independently validates functionality, security/privacy, isolation, failure handling, mobile behavior and upgrades, including STED automation where assigned. Fiaz is Product Owner, PM and manual/automation QA, with business acceptance and release authority; independent AI QA performs merges.

Use GitHub Issues and PRs for requirements, changes, reviews and test evidence. Report the exact commit/core version, test results, CI status and remaining gaps. Do not claim planned or unavailable core capabilities are implemented.

## Integration evidence to retain

- Verified core interface/version and project adapter/configuration; if the core has no release version yet, identify the exact core commit.
- Supported capabilities vs missing/planned capabilities; no invented API contract.
- Project-specific branding/knowledge and tenant/data isolation where supported.
- Functional, security/privacy, failure handling and integration regression evidence.
- Compatibility/upgrade procedure and recoverable rollback, including schema/config impact where applicable.
- Fiaz acceptance and release authorization.

Upgradability is a requirement, not proof of existing capability. A breaking core update requires a coordinated compatibility change; version pinning/contract verification must match the actual core release mechanism. Integration preparation is authorized; production changes remain gated.
