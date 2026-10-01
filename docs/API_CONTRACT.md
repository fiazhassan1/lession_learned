# Optional lead API — verified contract

Scope: the small in-memory Node API in `apps/api/` (`npm run api:dev`, port 3001). It is an **optional stub**: it is not connected to any form on the site, has no persistence and is not a production lead service. This document records only behavior verified by `apps/api/src/server.test.js` and `leads.test.js` (10 tests) and by the independent reviewer's boundary checks in PR #6. Anything marked "not defined" is a gap, not a decision.

## Endpoints

| Request | Response |
| --- | --- |
| `GET /health` | `200 {"ok":true,"service":"qaitek-api"}` (the service name is a stale QAITEK fixture value; not yet reconciled) |
| `POST /leads` valid | `201 {"ok":true,"lead":{id,name,email,message,createdAt}}` |
| `POST /leads` invalid fields | `400 {"ok":false,"errors":["name"|"email"|"message", ...]}` (field names, in that order) |
| `POST /leads` malformed JSON | `400 {"ok":false,"error":"invalid_json"}` |
| `POST /leads` body over 16,384 bytes | `413 {"ok":false,"error":"payload_too_large"}` with `Connection: close` |
| `OPTIONS <any path>` | `204` |
| anything else, including `GET /leads` | `404 {"ok":false,"error":"not_found"}` (leads are never readable over HTTP) |

## Lead validation

- `name`: required string, trimmed, at least 2 characters.
- `email`: required string, trimmed and lower-cased, must match `^[^\s@]+@[^\s@]+\.[^\s@]+$` (permissive).
- `message`: optional string, trimmed, at most 2000 characters. Missing or `null` is treated as empty.
- Any non-string value for a field (object, array, number, boolean) is rejected with that field's name. Values are never coerced to strings.
- `id` is a per-process counter starting at 1; `createdAt` is an ISO-8601 server timestamp.

## Limits and not defined

- Storage is in-memory, unbounded and lost on restart.
- Every response carries `access-control-allow-origin: *`.
- Not defined: authentication, rate limiting, `Content-Type` enforcement, spam protection, email/WhatsApp delivery, retention/consent handling, and which fields the finished site's form will send. These need approved requirements from the finished website source before any change.

## How to verify

```bash
npm ci
npm run api:test          # 10 tests
npm run api:dev           # then: curl -i localhost:3001/health
```
CI runs `api:test`, starts the API and requires `/health` (see docs/TESTING.md).
