// STUB-LEVEL check of the shared enterprise chatbot widget bundle.
//
// Builds the core's embeddable widget.js from a core GIT CHECKOUT AT THE PINNED SHA,
// loads it on a third-party-origin host page next to project-owned stub APIs, and
// asserts that it builds, bakes in the API origin, ignores a runtime data-api
// attribute, mounts without page errors and requests GET /api/v1/bot-config/public
// cross-origin.
//
// This is NOT integration evidence. The stub returns a canned bot-config, so real
// response shape, conversation creation, SSE streaming, branding and upgrade
// compatibility are NOT tested. Those stay a separate BLOCKED gate until a real pinned
// core build (with a controlled LLM provider) is available.
//
// Usage: CORE_DIR=/path/to/core-git-checkout npm run core:stub-check
//   - CORE_DIR must be a git checkout whose HEAD equals the pinned SHA below (override
//     with CORE_EXPECTED_SHA only when deliberately bumping the pin through the
//     upgrade procedure), with a clean tracked tree and `npm ci` already run.
//   - A non-git export, a different HEAD or modified tracked files are BLOCKED, never a
//     pass: the result could not be cited as evidence for the pinned core.
//   - The build goes to a temp dir; CORE_DIR sources are not modified.
//   - CHROMIUM_EXE optionally overrides the browser executable.
// Exit codes: 0 all assertions passed, 1 an assertion/runtime failure, 2 BLOCKED.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { chromium } from "@playwright/test";

const PINNED_SHA = "c3ce648a36e3fa852a1effe650f189d8c90d064e";

const blocked = (reason) => {
  console.error(`BLOCKED (not a pass): ${reason}`);
  return 2;
};

const listen = (server) =>
  new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server.address().port)));

async function main() {
  const cleanups = [];
  try {
    const coreDir = process.env.CORE_DIR;
    if (!coreDir) return blocked("set CORE_DIR to a core git checkout at the pinned SHA with dependencies installed");
    const root = path.resolve(coreDir);
    const webDir = path.join(root, "apps", "web");
    if (!fs.existsSync(path.join(webDir, "vite.widget.config.ts"))) return blocked(`${webDir}/vite.widget.config.ts not found`);
    if (!fs.existsSync(path.join(root, "node_modules"))) return blocked("core dependencies missing; run `npm ci` in CORE_DIR");

    const expected = (process.env.CORE_EXPECTED_SHA ?? PINNED_SHA).toLowerCase();
    const head = spawnSync("git", ["-C", root, "rev-parse", "HEAD"], { encoding: "utf8" });
    if (head.status !== 0) return blocked("CORE_DIR is not a git checkout, so the core identity cannot be verified");
    const actual = head.stdout.trim().toLowerCase();
    if (actual !== expected) return blocked(`core HEAD ${actual} is not the expected pin ${expected}`);
    const dirty = spawnSync("git", ["-C", root, "status", "--porcelain", "--untracked-files=no"], { encoding: "utf8" });
    if (dirty.status !== 0 || dirty.stdout.trim() !== "") return blocked("core checkout has modified tracked files; it is not the pinned source");

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
    const decoyCalls = [];
    const decoy = http.createServer((req, res) => {
      decoyCalls.push(`${req.method} ${req.url}`);
      res.setHeader("access-control-allow-origin", "*");
      res.statusCode = 404;
      res.end("{}");
    });
    const apiPort = await listen(api);
    const decoyPort = await listen(decoy);
    cleanups.push(() => new Promise((r) => api.close(r)), () => new Promise((r) => decoy.close(r)));
    const apiOrigin = `http://127.0.0.1:${apiPort}`;
    const decoyOrigin = `http://127.0.0.1:${decoyPort}`;

    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "core-widget-"));
    cleanups.push(async () => fs.rmSync(outDir, { recursive: true, force: true }));
    const build = spawnSync(
      "npx",
      ["vite", "build", "-c", "vite.widget.config.ts", "--outDir", outDir, "--emptyOutDir"],
      { cwd: webDir, env: { ...process.env, VITE_API_URL: apiOrigin }, encoding: "utf8" },
    );
    if (build.status !== 0) {
      console.error(build.stdout, build.stderr);
      console.error("FAIL: widget build failed");
      return 1;
    }
    const bundle = fs.readFileSync(path.join(outDir, "widget.js"));

    const host = http.createServer((req, res) => {
      if (req.url === "/widget.js") {
        res.setHeader("content-type", "application/javascript");
        return res.end(bundle);
      }
      res.setHeader("content-type", "text/html");
      res.end(
        `<!doctype html><title>host</title><h1>Host page</h1><script src="/widget.js" data-tenant="stub" data-api="${decoyOrigin}"></script>`,
      );
    });
    const hostPort = await listen(host);
    cleanups.push(() => new Promise((r) => host.close(r)));
    const hostOrigin = `http://127.0.0.1:${hostPort}`;

    let browser;
    try {
      browser = await chromium.launch(process.env.CHROMIUM_EXE ? { executablePath: process.env.CHROMIUM_EXE } : {});
    } catch (error) {
      return blocked(`Chromium could not be launched (${String(error.message).split("\n")[0]}); install it or set CHROMIUM_EXE`);
    }
    cleanups.push(() => browser.close());

    const page = await browser.newPage();
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await page.goto(hostOrigin);
    await page.locator("#widget-root").waitFor({ state: "attached", timeout: 10_000 }).catch(() => {});
    await page.waitForTimeout(1500);
    const rootCount = await page.locator("#widget-root").count();
    const rootHtml = rootCount ? await page.locator("#widget-root").innerHTML() : "";

    const botConfig = apiCalls.find((c) => c.method === "GET" && c.url === "/api/v1/bot-config/public");
    const results = [
      ["bundle built and non-empty", bundle.length > 0],
      ["API origin baked into the bundle", bundle.includes(apiOrigin)],
      ["#widget-root created on the host page", rootCount === 1],
      ["widget rendered content", rootHtml.length > 0],
      ["no page errors", pageErrors.length === 0],
      ["requested GET /api/v1/bot-config/public at the baked origin", Boolean(botConfig)],
      ["request was cross-origin (Origin = host page)", botConfig?.origin === hostOrigin],
      ["host script's data-api attribute is ignored (decoy API got 0 requests)", decoyCalls.length === 0],
    ];

    console.log(`core ref verified: ${actual} (clean tracked tree)`);
    console.log(`bundle: ${bundle.length} bytes`);
    for (const [name, ok] of results) console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
    if (pageErrors.length) console.log("page errors:", JSON.stringify(pageErrors));
    if (decoyCalls.length) console.log("decoy API requests:", JSON.stringify(decoyCalls));
    const failed = results.filter(([, ok]) => !ok).length;
    console.log(
      failed
        ? `\n${failed} assertion(s) FAILED (stub-level).`
        : "\nSTUB-LEVEL PASS only: this is not real-core compatibility; the real-core gate remains BLOCKED.",
    );
    return failed ? 1 : 0;
  } catch (error) {
    console.error(`FAIL: unexpected error: ${error?.stack ?? error}`);
    return 1;
  } finally {
    for (const cleanup of cleanups.reverse()) {
      try {
        await cleanup();
      } catch {
        // best-effort cleanup
      }
    }
  }
}

process.exit(await main());
