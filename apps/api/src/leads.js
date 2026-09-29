const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLead(body) {
  const errors = [];
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const message = String(body?.message ?? "").trim();

  if (name.length < 2) errors.push("name");
  if (!EMAIL.test(email)) errors.push("email");
  if (message.length > 2000) errors.push("message");

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
