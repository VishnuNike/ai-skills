#!/usr/bin/env node
import puppeteer from 'puppeteer-core';
 
const code = process.argv[2];
 
if (!code) {
  console.error('Usage: eval.js <javascript-code>');
  process.exit(1);
}
 
// ============================================================================
// SECURITY: Defense-in-depth approach
//
// Layer 1: Static blocklist (catches obvious attempts)
// Layer 2: Dynamic wrapper that deletes sensitive APIs before execution
// Layer 3: Execution in an isolated world (separate JS context from the page)
//
// The static blocklist alone is NOT sufficient — it can be bypassed via string
// concatenation, bracket notation, Reflect, eval-in-eval, base64, etc.
// The isolated world + API deletion provides the real protection.
// ============================================================================
 
// Layer 1: Static blocklist — reject obvious attempts early
const BLOCKED_PATTERNS = [
  /document\.cookie/i,
  /localStorage/i,
  /sessionStorage/i,
  /indexedDB/i,
  /\.getItem\s*\(/i,
  /\.setItem\s*\(/i,
  /navigator\.credentials/i,
  /window\.caches/i,
  /\.openDatabase/i,
  /serviceWorker/i,
];
 
for (const pattern of BLOCKED_PATTERNS) {
  if (pattern.test(code)) {
    console.error(`Blocked: code contains restricted API (${pattern.source})`);
    console.error('Access to cookies, storage, and credentials is not allowed.');
    process.exit(1);
  }
}
 
// Layer 2 + 3: Execute in an isolated world with sensitive APIs neutered
async function main() {
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9222',
  });
 
  const pages = await browser.pages();
  const page = pages[0];
 
  if (!page) {
    console.error('No active page found');
    process.exit(1);
  }
 
  // Create a unique isolated world — this is a separate JavaScript execution
  // context that shares the DOM but has its own global scope. This prevents
  // the evaluated code from accessing page-level JS variables, event handlers,
  // or any state set by the page's own scripts.
  const { executionContextId } = await page._client().send(
    'Page.createIsolatedWorld',
    {
      frameId: page.mainFrame()._id,
      worldName: `__eval_sandbox_${Date.now()}`,
      grantUniversalAccess: false,
    }
  );
 
  // Wrap user code with a preamble that deletes sensitive APIs in this context
  const sandboxedCode = `
    (async () => {
      // Neuter sensitive APIs in this isolated context
      const _noop = () => { throw new Error("Blocked: access to sensitive APIs is not allowed"); };
      const _noopObj = new Proxy({}, { get: () => _noop, set: () => false });
 
      // Delete/override storage and credential APIs
      Object.defineProperty(document, 'cookie', { get: _noop, set: _noop, configurable: false });
      window.localStorage = _noopObj;
      window.sessionStorage = _noopObj;
      window.indexedDB = undefined;
      window.caches = undefined;
      if (navigator.credentials) navigator.credentials = _noopObj;
      if (navigator.serviceWorker) navigator.serviceWorker = _noopObj;
      window.openDatabase = undefined;
 
      // Block dynamic script creation that could escape sandbox
      const origCreateElement = document.createElement.bind(document);
      document.createElement = function(tag, options) {
        if (typeof tag === 'string' && tag.toLowerCase() === 'script') {
          throw new Error("Blocked: dynamic script creation is not allowed");
        }
        return origCreateElement(tag, options);
      };
 
      // Block fetch/XHR to non-same-origin (prevent data exfiltration)
      const origFetch = window.fetch;
      window.fetch = function(url, ...args) {
        if (typeof url === 'string') {
          try {
            const parsed = new URL(url, window.location.origin);
            if (parsed.origin !== window.location.origin) {
              throw new Error("Blocked: cross-origin fetch is not allowed in eval sandbox");
            }
          } catch (e) {
            if (e.message.includes('Blocked:')) throw e;
            // If URL parsing fails, allow (relative URLs are fine)
          }
        }
        return origFetch.call(window, url, ...args);
      };
 
      // Execute user code
      return await eval(\`(async () => \${${JSON.stringify(code)}})()\`);
    })()
  `;
 
  try {
    const { result, exceptionDetails } = await page._client().send(
      'Runtime.evaluate',
      {
        expression: sandboxedCode,
        contextId: executionContextId,
        returnByValue: true,
        awaitPromise: true,
        timeout: 30000,
      }
    );
 
    if (exceptionDetails) {
      const errorMsg =
        exceptionDetails.exception?.description ||
        exceptionDetails.text ||
        'Unknown error';
      console.error('Error:', errorMsg);
      process.exit(1);
    }
 
    if (result.value !== undefined) {
      console.log(JSON.stringify(result.value, null, 2));
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
 
  browser.disconnect();
}
 
main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
