const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A missing/null field is treated as empty; any other non-string value is
// invalid. Never String()-coerce: {} would become "[object Object]" and pass.
function text(value) {
  if (value === undefined || value === null) return { value: "", valid: true };
  if (typeof value !== "string") return { value: "", valid: false };
  return { value: value.trim(), valid: true };
}

export function validateLead(body) {
  const errors = [];
  const nameField = text(body?.name);
  const emailField = text(body?.email);
  const messageField = text(body?.message);
  const name = nameField.value;
  const email = emailField.value.toLowerCase();
  const message = messageField.value;

  if (!nameField.valid || name.length < 2) errors.push("name");
  if (!emailField.valid || !EMAIL.test(email)) errors.push("email");
  if (!messageField.valid || message.length > 2000) errors.push("message");

  return {
    ok: errors.length === 0,
    errors,
    value: { name, email, message, createdAt: new Date().toISOString() },
  };
}

export function createLeadStore() {
  const rows = [];
  return {
    add(lead) {
      const row = { id: rows.length + 1, ...lead };
      rows.push(row);
      return row;
    },
    all() {
      return [...rows];
    },
  };
}
