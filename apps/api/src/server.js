import http from "node:http";
import { createLeadStore, validateLead } from "./leads.js";

const port = Number(process.env.PORT ?? 3001);
const store = createLeadStore();
// A lead is a few hundred bytes; cap the body so the public endpoint cannot be
// used to buffer arbitrarily large payloads in memory.
const MAX_BODY_BYTES = 16 * 1024;

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > MAX_BODY_BYTES) {
        chunks.length = 0;
        return reject(new Error("payload_too_large"));
      }
      chunks.push(c);
    });
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("invalid_json"));
      }
    });
    req.on("error", reject);
  });
}

function send(res, status, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    ...extraHeaders,
    "content-type": "application/json",
    "content-length": Buffer.byteLength(body),
    "access-control-allow-origin": "*",
  });
  res.end(body);
}

export const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://127.0.0.1");

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      "access-control-allow-headers": "content-type",
    });
    return res.end();
  }

  if (req.method === "GET" && url.pathname === "/health") {
    return send(res, 200, { ok: true, service: "qaitek-api" });
  }

  if (req.method === "POST" && url.pathname === "/leads") {
    let body;
    try {
      body = await readBody(req);
    } catch (error) {
      if (error.message === "payload_too_large") {
        return send(res, 413, { ok: false, error: "payload_too_large" }, { connection: "close" });
      }
      return send(res, 400, { ok: false, error: "invalid_json" });
    }
    const parsed = validateLead(body);
    if (!parsed.ok) return send(res, 400, { ok: false, errors: parsed.errors });
    return send(res, 201, { ok: true, lead: store.add(parsed.value) });
  }

  return send(res, 404, { ok: false, error: "not_found" });
});

if (process.argv[1]?.endsWith("server.js")) {
  server.listen(port, "127.0.0.1", () => {
    process.stdout.write(`qaitek-api listening on ${port}\n`);
  });
}
