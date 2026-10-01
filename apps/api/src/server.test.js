import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { server } from "./server.js";

let base;

before(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

const post = (body, headers = { "content-type": "application/json" }) =>
  fetch(`${base}/leads`, {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

test("GET /health is ok", async () => {
  const res = await fetch(`${base}/health`);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).ok, true);
});

test("POST /leads stores a valid lead and normalizes it", async () => {
  const res = await post({ name: "  Fiaz Hassan ", email: "Owner@Example.com", message: "hi" });
  assert.equal(res.status, 201);
  const json = await res.json();
  assert.equal(json.ok, true);
  assert.equal(typeof json.lead.id, "number");
  assert.equal(json.lead.name, "Fiaz Hassan");
  assert.equal(json.lead.email, "owner@example.com");
});

test("POST /leads rejects invalid fields with 400 and field names", async () => {
  const res = await post({ name: "A", email: "nope" });
  assert.equal(res.status, 400);
  assert.deepEqual((await res.json()).errors, ["name", "email"]);
});

test("POST /leads rejects malformed JSON with 400", async () => {
  const res = await post("{not json");
  assert.equal(res.status, 400);
  assert.equal((await res.json()).error, "invalid_json");
});

test("POST /leads rejects non-string field types instead of coercing them", async () => {
  for (const body of [
    { name: {}, email: "a@b.co" },
    { name: ["Fiaz"], email: "a@b.co" },
    { name: "Fiaz", email: ["a@b.co"] },
    { name: "Fiaz", email: "a@b.co", message: { x: 1 } },
    { name: 12345, email: "a@b.co" },
  ]) {
    const res = await post(body);
    assert.equal(res.status, 400, `expected 400 for ${JSON.stringify(body)}`);
  }
});

test("POST /leads rejects an oversized body with 413", async () => {
  const res = await post({ name: "Fiaz", email: "a@b.co", message: "x".repeat(40_000) });
  assert.equal(res.status, 413);
  assert.equal((await res.json()).error, "payload_too_large");
});

test("unknown routes are 404 and leads are not readable over HTTP", async () => {
  assert.equal((await fetch(`${base}/nope`)).status, 404);
  assert.equal((await fetch(`${base}/leads`)).status, 404);
});

test("OPTIONS preflight answers 204", async () => {
  const res = await fetch(`${base}/leads`, { method: "OPTIONS" });
  assert.equal(res.status, 204);
});
