# Local preview and testing

These commands are grounded in package.json and playwright.config.ts at the onboarding baseline. CI uses Node 24; Python 3 is optional for a simple manual static preview. Use synthetic data only.

## Preview the current fixture

From the repository root, if Python 3 is available:

```bash
python3 -m http.server 4173 --bind 127.0.0.1 --directory site
```

On Windows with the Python launcher, replace python3 with py -3.
Open http://127.0.0.1:4173/ and /share.html. Stop the server with Ctrl+C.
This previews the existing fixture, not the missing finished design.

## Developer suites

```bash
npm install
npx playwright install chromium
npm run api:test
npm run lint:tests
npm run test:smoke
npm run test:e2e
```

lint:tests lists Playwright tests; it is not a code linter.
Playwright starts site/ on port 4173 when the configured base URL is local. Verify any reused server serves this checkout.
A root package-lock.json now exists; CI and clean-checkout baselines use `npm ci` (use `npm install` only when intentionally changing dependencies).

To include local API health, start a second terminal first:

```bash
npm run api:dev
```

Then run npm run test:e2e. The API is optional for static preview. Locally the health spec skips when the API is unreachable/non-OK, so count and explain skips; a skip is not a healthy API result. With `API_REQUIRED=1` (set by CI, which starts the API) the same spec FAILS instead of skipping. Its unit tests do not test HTTP persistence or production delivery.

## Independent review and acceptance

Claude records exact SHA, environment, commands, pass/fail/skip counts, CI link and missing prerequisites in the PR.
ChatGPT independently verifies the changed behavior where tooling permits and separates source review from runtime evidence.
Fiaz manually accepts the app and can run these same appropriate suites in a VS Code terminal.
Real iPhone/Android browser checks supplement desktop/mobile emulation.

For a real imported site, cover navigation, content, forms and their actual delivery contract, responsive layout, keyboard/focus, image loading, SEO/social previews and regression risks. Do not invent assertions for unapproved requirements.
Use a local mailto stub/check rather than sending actual emails during automated form tests.
Do not use a production BASE_URL or submit real leads without explicit authorization.

## Limits of current green CI

Current CI runs `npm ci`, `api:test`, starts the in-memory API and requires its `/health` (API_REQUIRED=1), then runs the fixture smoke/e2e. It still does not test persistence, a real site or the chatbot core. OG tests primarily check metadata; the placeholder remote image is not a verified share card. Report required blocked checks as blocked, not passed.
