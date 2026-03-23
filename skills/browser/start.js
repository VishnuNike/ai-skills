#!/usr/bin/env node
import { spawn } from 'child_process';
import { existsSync, mkdirSync, rmSync, mkdtempSync } from 'fs';
import { join } from 'path';
import { homedir, tmpdir, platform } from 'os';
 
function getChromePath() {
  const paths = platform() === 'win32'
    ? [
        join(process.env['PROGRAMFILES'] || '', 'Google/Chrome/Application/chrome.exe'),
        join(process.env['PROGRAMFILES(X86)'] || '', 'Google/Chrome/Application/chrome.exe'),
        join(process.env['LOCALAPPDATA'] || '', 'Google/Chrome/Application/chrome.exe'),
      ]
    : platform() === 'darwin'
    ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
    : ['/usr/bin/google-chrome', '/usr/bin/chromium-browser', '/usr/bin/chromium'];
 
  for (const p of paths) {
    if (existsSync(p)) return p;
  }
  throw new Error('Chrome not found');
}
 
async function main() {
  const chromePath = getChromePath();
 
  // SECURITY: Use mkdtempSync for unpredictable temp directory names.
  // Date.now() is predictable and vulnerable to symlink pre-creation attacks
  // on shared systems.
  const tempProfile = mkdtempSync(join(tmpdir(), 'chrome-debug-'));
 
  // Always use a fresh empty profile — never copy real user data
  const chromeArgs = [
    `--remote-debugging-port=9222`,
    // SECURITY: Bind to localhost only. Without this flag, Chrome may bind
    // to 0.0.0.0 on some systems, exposing full browser control to anyone
    // on the local network.
    `--remote-debugging-address=127.0.0.1`,
    `--user-data-dir=${tempProfile}`,
    '--no-first-run',
    '--no-default-browser-check',
  ];
 
  const child = spawn(chromePath, chromeArgs, {
    detached: true,
    stdio: 'ignore',
  });
  child.unref();
 
  // Clean up temp profile when Chrome exits
  child.on('exit', () => {
    try {
      rmSync(tempProfile, { recursive: true, force: true });
      console.log('✓ Cleaned up temp profile');
    } catch (err) {
      console.error('Warning: could not clean temp profile:', err.message);
    }
  });
 
  // Also clean up if this script is killed
  process.on('SIGINT', () => {
    try { rmSync(tempProfile, { recursive: true, force: true }); } catch {}
    process.exit();
  });
  process.on('SIGTERM', () => {
    try { rmSync(tempProfile, { recursive: true, force: true }); } catch {}
    process.exit();
  });
 
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log(`✓ Chrome started on 127.0.0.1:9222 (fresh profile)`);
}
 
main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
