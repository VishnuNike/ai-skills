#!/usr/bin/env node
import puppeteer from 'puppeteer-core';
import { lookup } from 'dns/promises';
 
const args = process.argv.slice(2);
const url = args.find(a => !a.startsWith('--'));
const openNew = args.includes('--new');
 
if (!url) {
  console.error('Usage: nav.js <url> [--new]');
  process.exit(1);
}
 
// ============================================================================
// SECURITY: URL validation to prevent SSRF, file access, and JS execution
// ============================================================================
 
const ALLOWED_SCHEMES = ['http:', 'https:'];
 
// RFC 1918 + loopback + link-local + cloud metadata ranges
function isPrivateIP(ip) {
  // IPv4 patterns
  if (/^127\./.test(ip)) return true;                              // loopback
  if (/^10\./.test(ip)) return true;                               // Class A private
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(ip)) return true;         // Class B private
  if (/^192\.168\./.test(ip)) return true;                         // Class C private
  if (/^169\.254\./.test(ip)) return true;                         // link-local
  if (ip === '0.0.0.0') return true;                               // unspecified
  if (/^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./.test(ip)) return true; // CGNAT
 
  // IPv6 patterns
  if (ip === '::1') return true;                                   // loopback
  if (/^fe80:/i.test(ip)) return true;                             // link-local
  if (/^fc00:/i.test(ip) || /^fd/i.test(ip)) return true;         // unique local
 
  return false;
}
 
async function validateUrl(rawUrl) {
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new Error(`Invalid URL: ${rawUrl}`);
  }
 
  // Block dangerous schemes
  if (!ALLOWED_SCHEMES.includes(parsed.protocol)) {
    throw new Error(
      `Blocked scheme "${parsed.protocol}" — only ${ALLOWED_SCHEMES.join(', ')} are allowed. ` +
      `This prevents file:// access and javascript: execution.`
    );
  }
 
  // Resolve hostname and check for private/internal IPs
  const hostname = parsed.hostname;
 
  // Block direct IP addresses that are private
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname) || hostname.includes(':')) {
    if (isPrivateIP(hostname)) {
      throw new Error(
        `Blocked navigation to private/internal IP: ${hostname}. ` +
        `This prevents SSRF attacks against internal services and cloud metadata endpoints.`
      );
    }
  }
 
  // DNS resolution check — the hostname might resolve to a private IP
  try {
    const { address } = await lookup(hostname);
    if (isPrivateIP(address)) {
      throw new Error(
        `Blocked: ${hostname} resolves to private IP ${address}. ` +
        `This prevents DNS rebinding and SSRF via hostname aliases.`
      );
    }
  } catch (err) {
    if (err.message.includes('Blocked')) throw err;
    // DNS resolution failure — let puppeteer handle it (will show its own error)
  }
 
  return parsed.href;
}
 
async function main() {
  const validatedUrl = await validateUrl(url);
 
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9222',
  });
 
  let page;
  if (openNew) {
    page = await browser.newPage();
  } else {
    const pages = await browser.pages();
    page = pages[0];
    if (!page) {
      page = await browser.newPage();
    }
  }
 
  await page.goto(validatedUrl, { waitUntil: 'domcontentloaded' });
  console.log(`✓ Navigated to: ${validatedUrl}${openNew ? ' (new tab)' : ''}`);
  browser.disconnect();
}
 
main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
