# lession_learned

QAITEK static fixture, Playwright smoke + e2e, GitHub Actions, and a small Node API.

## Run locally

```bash
npm install
npx playwright install chromium
npm run api:test
npx playwright test
```

`npx playwright test` starts `site/` on port 4173.

```bash
npm run api:dev   # GET /health  POST /leads on :3001
```

## CI

Push to `main` runs `.github/workflows/e2e.yml`.
GitHub → Actions → **e2e**.
