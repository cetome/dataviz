/**
 * Before publishing the repository: lists what git would publish (everything not in .gitignore)
 * and fails if any of it looks private: a value of the private configuration, the private
 * deployment files, PHP, a key.
 *   node tools/check-public.mjs
 * Uses `git ls-files` when the folder is a git repository, else applies .gitignore's top-level rules.
 *
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function publicFiles() {
  try {
    const out = execSync('git ls-files --cached --others --exclude-standard', { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    if (out.trim()) return out.trim().split('\n');
  } catch (e) { /* not a git repository yet */ }
  // fallback: the simple patterns of .gitignore (names, folder/, *.ext)
  const rules = fs.readFileSync(path.join(root, '.gitignore'), 'utf8').split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
  const ignored = (rel) => rules.some((r) => {
    const rule = r.replace(/^\//, '').replace(/\/$/, '');
    if (rule.startsWith('*.')) return rel.endsWith(rule.slice(1));
    return rel === rule || rel.startsWith(rule + '/') || rel.split('/').includes(rule);
  });
  const files = [];
  const walk = (dir) => fs.readdirSync(path.join(root, dir), { withFileTypes: true }).forEach((e) => {
    const rel = dir ? `${dir}/${e.name}` : e.name;
    if (e.name === '.git' || ignored(rel)) return;
    if (e.isDirectory()) walk(rel); else files.push(rel);
  });
  walk('');
  return files;
}

const files = publicFiles().filter((f) => fs.existsSync(path.join(root, f))); // not files deleted since the last commit
const problems = [];
const SUSPICIOUS = [
  [/BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY/, 'a private key'],
  [/'\w*(pass|secret|token)\w*'\s*=>\s*'[^']{6,}'/i, 'a password or secret set in PHP'],
];
// The private configuration, when it is on this machine, says what must never appear: every value it
// sets (8 characters or more). It is read here, at run time, so that none of it is written in this file.
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
for (const conf of ['cetome/config.php', 'cetome/config.sample.php']) {
  const full = path.join(root, conf);
  if (!fs.existsSync(full)) continue;
  for (const m of fs.readFileSync(full, 'utf8').matchAll(/'(\w+)'\s*=>\s*'([^']{8,})'/g)) {
    SUSPICIOUS.push([new RegExp(escapeRe(m[2])), `the value of "${m[1]}" from ${conf}`]);
  }
}
// The repository is meant to be hosted anywhere: no file may name the domain of the private site
// (cetome/site.json), except the contact address SECURITY.md keeps on purpose.
const siteFile = path.join(root, 'cetome', 'site.json');
const domainRule = fs.existsSync(siteFile) ? (() => {
  const host = new URL(JSON.parse(fs.readFileSync(siteFile, 'utf8')).url).host;
  const domain = host.split('.').slice(-2).join('.');
  return new RegExp(escapeRe(domain), 'i');
})() : null;
for (const f of files) {
  if (/^cetome\//.test(f) || /(^|\/)config(\.sample)?\.php$/.test(f)) problems.push(`${f}: part of the cetome overlay`);
  if (/\.php$/.test(f)) problems.push(`${f}: PHP (the public site is static)`);
  if (/^_archive\//.test(f)) problems.push(`${f}: the archive of the previous version`);
  if (/(^|\/)node_modules\//.test(f) || /^dist\//.test(f)) problems.push(`${f}: generated`);
  const full = path.join(root, f);
  if (fs.statSync(full).size > 2_000_000) { problems.push(`${f}: larger than 2 MB`); continue; }
  if (/\.(png|ico|woff2|xlsx)$/.test(f)) continue;
  const text = fs.readFileSync(full, 'utf8');
  SUSPICIOUS.forEach(([re, what]) => { if (re.test(text)) problems.push(`${f}: contains ${what}`); });
  if (domainRule && f !== 'SECURITY.md' && domainRule.test(text)) problems.push(`${f}: names the private site's domain (the repository must work on any site)`);
}

/* Content-Security-Policy: the header of .htaccess and the <meta> of every page say the same, and no
   page carries an inline script or an inline event handler (the policy would block them). */
const header = (fs.readFileSync(path.join(root, '.htaccess'), 'utf8').match(/Header always set Content-Security-Policy "([^"]+)"/) || [])[1];
if (!header) problems.push('.htaccess: no Content-Security-Policy header');
const pages = files.filter((f) => f.endsWith('.html') || f === 'tools/doc-page.html');
for (const f of pages) {
  const html = fs.readFileSync(path.join(root, f), 'utf8');
  const meta = (html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/) || [])[1];
  if (!meta) problems.push(`${f}: no Content-Security-Policy <meta>`);
  else if (header && meta !== header) problems.push(`${f}: its Content-Security-Policy differs from the .htaccess header`);
  if (/<script(?![^>]*\bsrc=)[^>]*>/i.test(html)) problems.push(`${f}: an inline <script> (blocked by the policy): move it to a file`);
  if (/<[a-z][^>]*\son[a-z]+\s*=/i.test(html)) problems.push(`${f}: an inline event handler (on...=), blocked by the policy`);
}

console.log(`${files.length} files would be published; ${pages.length} pages checked for the Content-Security-Policy.`);
if (problems.length) { console.log('NOT READY:'); problems.forEach((p) => console.log('  ' + p)); process.exit(1); }
console.log('OK: no secret, no PHP, nothing of the cetome overlay; one Content-Security-Policy everywhere.');
