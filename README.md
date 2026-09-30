# Lessons Learned Global

Repository: `fiazhassan1/lession_learned` (repository spelling retained).
Current main contains a static starter fixture, Playwright tests, GitHub Actions and an optional in-memory Node API. The finished Lessons Learned design has not yet been imported.

## Start here

- [AI development SOP](AI_DEVELOPMENT_SOP.md): roles, evidence, review and independent AI QA merge rules.
- [Claude Code instructions](CLAUDE.md) and [onboarding prompt](docs/CLAUDE_ONBOARDING.md).
- [Verified baseline and gaps](docs/PROJECT_STATUS.md).
- [Preview and testing](docs/TESTING.md).
- [Hostinger deployment intent](docs/HOSTINGER_DEPLOYMENT.md).
- [Implementation plan](docs/IMPLEMENTATION-PLAN.md).
- [Historical handover](HANDOVER-FOR-LLM.md).

Claude Code: Dev and STED automation QA. ChatGPT: BA and independent QA. Fiaz: Product Owner, PM, manual/automation QA and business acceptance authority. GitHub Actions runs CI.

Every project supports the shared enterprise chatbot integration and a tested upgrade path. See [shared integration and role policy](docs/SHARED_AI_INTEGRATION_AND_ROLES.md).

## Local tests

```bash
npm install
npx playwright install chromium
npm run api:test
npm run test:smoke
npm run test:e2e
```

Playwright starts site/ on http://127.0.0.1:4173. Optional API: npm run api:dev on port 3001. API health tests can skip; see the testing guide.

For manual static preview when Python 3 is installed:

```bash
python3 -m http.server 4173 --bind 127.0.0.1 --directory site
```

## CI and release

.github/workflows/e2e.yml runs on PRs, main/master pushes and manual dispatch.
The fixture's green CI is not finished-site acceptance. Work uses branches/PRs; independent AI QA merges after applicable gates pass.
Lessons Learned must use a separate Hostinger website folder from QAITEKSolutions.com. Hosting capacity/DNS/SSL and actual deployment are still pending.
