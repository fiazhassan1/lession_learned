# Interim QA/STAGING Environment

## Interim QA/STAGING approach — Fiaz decision, 2026-10-01

Until the production environment is completed and verified, the Mac Mini is the approved separate QA/STAGING host for Enterprise AI Chatbot, GBOB Automation and Lessons Learned Global.

- LOCAL remains the developer workspace. QA/STAGING runs a selected GitHub commit/build on the Mac Mini, separately from active development. GitHub remains the source of truth; setup and test commands must be reproducible on a replacement supported machine.
- Isolate each project's processes, ports, configuration, secrets, databases/data directories and test artifacts. Never share development or production data stores. Use synthetic test data and existing project safety rules; this decision does not authorize outreach, production writes or live sending.
- Development, fixes, code review, CI and all tests that can run in the available environment continue without waiting for VPS go-live, the Windows Firewall issue or production-environment completion. If Mac Mini access/setup is temporarily unavailable, continue local/CI testing and unrelated work; record only the affected deployed-QA check as pending.
- Infrastructure-dependent checks must still run on an environment that actually provides their prerequisites. Record exact commit, target environment, commands and results. A blocked or unavailable check is not a pass; the absence of production hosting alone is not a blanket development/testing stop.
- The separate-QA deployment criterion is satisfied only after the selected build has actually been deployed and smoke-tested on the Mac Mini with isolated configuration/data. This policy records the approved approach, not a claim that deployment has happened.
- Production-specific networking, public webhooks, HTTPS/domain integration, capacity, security and release validation remain separate pending gates where applicable. Complete them before the corresponding production release. Production hosting may use the project's approved destination; a VPS is not mandatory merely to continue implementation.
- Existing defect, required-CI, independent-review and applicable UI-acceptance gates remain in force. This environment decision does not waive them or declare all phases complete.
