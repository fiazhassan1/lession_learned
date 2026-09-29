# User Story: LL-001 — Hostinger site + share card

## Story Title
As a visitor, I want a product homepage and an honest share card so I can understand QAITEK and preview the URL on social apps.

## Application URL
Local fixture: `http://127.0.0.1:4173`
Live: Hostinger domain (set `BASE_URL`)

## Acceptance Criteria

### AC1: Homepage job
- GIVEN I open `/`
- THEN I see an H1 that names the product job
- AND I see one primary CTA matching book / start / view / contact
- AND the H1 is not wellness marketing copy

### AC2: Share card
- GIVEN I open `/share.html`
- THEN `og:type` is website or article (never `x:game`)
- AND `og:image` is an absolute https URL
- AND width/height are 1200 / 630
- AND `twitter:card` is `summary_large_image`

### AC3: Consistency
- GIVEN I compare `/` and `/share.html`
- THEN both pages advertise the same `og:image`

### AC4: Footer boundary
- GIVEN I read the footer
- THEN the wellbeing line is a non-clinical boundary, not a service

## Definition of Done
- [x] Smoke + e2e specs exist
- [x] Files committed to fiazhassan1/lession_learned
- [ ] Actions e2e run is green
- [ ] Live BASE_URL set after Hostinger upload
