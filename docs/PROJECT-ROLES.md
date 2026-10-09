# Project roles and merge authority

Repository: fiazhassan1/lession_learned.

Claude Code develops and runs STED automation QA; ChatGPT / Codex handles BA and independent QA. The independent AI QA reviewer merges; Claude independently reviews and may merge this Codex-authored policy checkpoint.

| Responsibility | Owner |
| --- | --- |
| Product/business decisions, applicable UI acceptance and release/live authorization | Fiaz |
| This policy/CI/audit implementation and developer checks | Codex |
| Independent review of this Codex-authored checkpoint | Claude / Claude Code |
| Repeatable registration and project checks | GitHub Actions |

The author must not self-approve or self-merge. Record actual contribution authors, independent reviewer identity, exact head, executed versus inspected checks, findings, CI and limitations. A shared GitHub identity does not prove independence. New commits require fresh independent exact-head verification. This non-UI checkpoint needs no second PO review; production release remains separate.

Governing sources: [merged SOP](../AI_DEVELOPMENT_SOP.md) and [project matrix](SHARED_AI_INTEGRATION_AND_ROLES.md). The SOP allows Claude to review and merge ChatGPT-authored process documentation, then return to developer/STED role.

Read [AI operating rules](AI-OPERATING-RULES.md) at start/resume/handover.
