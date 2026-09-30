# Hostinger deployment intent — pending verification

The intended public primary URL is https://www.lessonslearnedglobal.com.
Additional owned domains lessonslearnedglobal.online and lessonslearnedglobal.live are candidates for aliases or canonical redirects after Fiaz chooses the behavior.
Keep domain registration at GoDaddy unless Fiaz requests a transfer.

## Isolation

Create a separate Hostinger website/domain folder for Lessons Learned Global. Do not upload to QAITEKSolutions.com's public_html, replace that website or modify its existing DNS/email configuration.
Verify the current plan's actual website quota in hPanel; an Add website button alone is not proof of available capacity. Record the plan's available slots and any upgrade prompt before proceeding.
No Hostinger/DNS/production action is authorized by this onboarding task.

## Release preparation

- Locate/import the approved finished static source and assets; review the PR and obtain applicable Fiaz acceptance and independent AI QA merge.
- Confirm the approved release entry page and deployment folder; index.html must sit directly in the new site's public_html.
- Verify assets, links, responsive behavior, actual contact/Share behavior, favicon, page titles and real 1200×630 share image.
- Use verified account/site connection instructions and DNS values. Do not guess nameservers or IP addresses.
- Review existing domain DNS/email records before any authorized DNS change.
- Decide canonical www/non-www and alias redirects; configure HTTPS certificates for every hostname actually served.
- Upload only the approved static release contents to the new website after release authorization.
- Check HTTPS, navigation/assets, forms and social metadata after deployment; keep a rollback copy of that site's prior release.

Shared enterprise chatbot integration is part of the default project baseline. Discover the core's supported widget/API/SDK and verify Hostinger compatibility. Keep server credentials out of static HTML/browser bundles. Do not assume shared hosting runs the core platform or its services. Test integration and rollback separately from static file upload.

The Node in-memory API and optional Docker/Postgres files are not a shared-hosting deployment package. A future CMS or persistence backend requires separate requirements and a hosting decision.
