import assert from "node:assert/strict";
import test from "node:test";
import { createLeadStore, validateLead } from "./leads.js";

test("rejects a short name and bad email", () => {
  const result = validateLead({ name: "A", email: "nope", message: "" });
  assert.equal(result.ok, false);
  assert.deepEqual(result.errors, ["name", "email"]);
});

test("accepts a real lead and stores it", () => {
  const parsed = validateLead({
    name: "Fiaz Hassan",
    email: "owner@example.com",
    message: "Need Hostinger go-live",
  });
  assert.equal(parsed.ok, true);
  const store = createLeadStore();
  const row = store.add(parsed.value);
  assert.equal(row.id, 1);
  assert.equal(store.all().length, 1);
});
