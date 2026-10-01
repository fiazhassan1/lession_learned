// STUB-LEVEL check of the shared enterprise chatbot widget bundle.
//
// Builds the core's embeddable widget.js from a core checkout/export, loads it on a
// third-party-origin host page next to a project-owned stub API, and asserts that it
// builds, bakes in the API origin, mounts without page errors and requests
// GET /api/v1/bot-config/public cross-origin.
//
// This is NOT integration evidence. The stub returns a canned bot-config, so real
// response shape, conversation creation, SSE streaming, branding and upgrade
// compatibility are NOT tested. Those stay a separate BLOCKED gate until a real pinned
// core build (with a controlled LLM provider) is available.
//
// Usage: CORE_DIR=/path/to/core npm run core:stub-check
//   CORE_DIR must contain apps/web and an installed node_modules (run `npm ci` there).
//   The build output goes to a temp dir; CORE_DIR sources are not modified.
//   CHROMIUM_EXE optionally overrides the browser executable.
// Exit codes: 0 all assertions passed, 1 an assertion failed, 2 BLOCKED (prerequisite missing).
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { chromium } from "@playwright/test";

const blocked = (reason) => {
  console.error(`BLOCKED (not a pass): ${reason}`);
  process.exit(2);
};

const coreDir = process.env.CORE_DIR;
if (!coreDir) blocked("set CORE_DIR to a core checkout/export with installed dependencies");
const webDir = path.join(path.resolve(coreDir), "apps", "web");
if (!fs.existsSync(path.join(webDir, "vite.widget.config.ts"))) blocked(`${webDir}/vite.widget.config.ts not found`);
if (!fs.existsSync(path.join(path.resolve(coreDir), "node_modules"))) blocked("core dependencies missing; run `npm ci` in CORE_DIR");

const git = spawnSync("git", ["-C", coreDir, "rev-parse", "HEAD"], { encoding: "utf8" });
const coreRef = git.status === 0 ? git.stdout.trim() : "unknown (not a git checkout)";

const apiCalls = [];
const api = http.createServer((req, res) => {
  apiCalls.push({ method: req.method, url: req.url, origin: req.headers.origin });
  res.setHeader("access-control-allow-origin", "*");
  if (req.method === "GET" && req.url === "/api/v1/bot-config/public") {
    res.setHeader("content-type", "application/json");
    return res.end(JSON.stringify({ name: "StubBot", platformName: "Stub" }));
  }
  res.statusCode = 404;
  res.end("{}");
});
await new Promise((resolve) => api.listen(0, "127.0.0.1", resolve));
const apiOrigin = `http://127.0.0.1:${api.address().port}`;

const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "core-widget-"));
const build = spawnSync(
  "npx",
  ["vite", "build", "-c", "vite.widget.config.ts", "--outDir", outDir, "--emptyOutDir"],
  { cwd: webDir, env: { ...process.env, VITE_API_URL: apiOrigin }, encoding: "utf8" },
);
if (build.status !== 0) {
  api.close();
  console.error(build.stdout, build.stderr);
  console.error("FAIL: widget build failed");
  process.exit(1);
}
const bundle = fs.readFileSync(path.join(outDir, "widget.js"));

const host = http.createServer((req, res) => {
  if (req.url === "/widget.js") {
    res.setHeader("content-type", "application/javascript");
    return res.end(bundle);
  }
  res.setHeader("content-type", "text/html");
  res.end('<!doctype html><title>host</title><h1>Host page</h1><script src="/widget.js" data-tenant="stub"></script>');
});
await new Promise((resolve) => host.listen(0, "127.0.0.1", resolve));
const hostOrigin = `http://127.0.0.1:${host.address().port}`;

const browser = await chromium.launch(process.env.CHROMIUM_EXE ? { executablePath: process.env.CHROMIUM_EXE } : {});
const page = await browser.newPage();
const pageErrors = [];
page.on("pageerror", (error) => pageErrors.push(error.message));
await page.goto(hostOrigin);
await page.locator("#widget-root").waitFor({ state: "attached", timeout: 10_000 }).catch(() => {});
await page.waitForTimeout(1500);
const rootCount = await page.locator("#widget-root").count();
const rootHtml = rootCount ? await page.locator("#widget-root").innerHTML() : "";
await browser.close();
api.close();
host.close();
fs.rmSync(outDir, { recursive: true, force: true });

const botConfig = apiCalls.find((c) => c.method === "GET" && c.url === "/api/v1/bot-config/public");
const results = [
  ["bundle built and non-empty", bundle.length > 0],
  ["API origin baked into the bundle", bundle.includes(apiOrigin)],
  ["no runtime data-api option in the bundle", !bundle.includes("dataset.api")],
  ["#widget-root created on the host page", rootCount === 1],
  ["widget rendered content", rootHtml.length > 0],
  ["no page errors", pageErrors.length === 0],
  ["requested GET /api/v1/bot-config/public", Boolean(botConfig)],
  ["request was cross-origin (Origin = host page)", botConfig?.origin === hostOrigin],
];

console.log(`core ref: ${coreRef}`);
console.log(`bundle: ${bundle.length} bytes`);
for (const [name, ok] of results) console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
if (pageErrors.length) console.log("page errors:", JSON.stringify(pageErrors));
const failed = results.filter(([, ok]) => !ok).length;
console.log(
  failed
    ? `\n${failed} assertion(s) FAILED (stub-level).`
    : "\nSTUB-LEVEL PASS only: this is not real-core compatibility; the real-core gate remains BLOCKED.",
);
process.exit(failed ? 1 : 0);
