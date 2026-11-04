/**
 * Builds a ready-to-upload copy of dataviz for a site, in dist/.
 *
 *   node tools/build.mjs                              the public site as it is, for any address
 *   node tools/build.mjs --url https://example.org    + canonical addresses, link previews, sitemap
 *   node tools/build.mjs --site private/site.json     the same, with the settings of a site file
 *
 * The pages of the repository name no site: a page's canonical address, the address and picture
 * of its link preview (og:url, og:image, twitter:image), sitemap.xml and the robots.txt sitemap line
 * depend on where it is hosted, so this script adds them for the address given. A site file
 * (JSON) can also hold:
 *   url       the address of the site, as --url
 *   overlay   a folder (relative to the site file) laid over the build at the same paths: the site's
 *             own files, such as social pictures (img/social/<page>.png), a js/extras.js, a server API
 *   footer    HTML added at the end of every page footer (the site's own links)
 * Then upload the content of dist/ to the root of the web server.
 *
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const arg = (name) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };

/* ---- settings ------------------------------------------------------------------------------- */
let site = {};
let siteDir = root;
if (arg('--site')) {
  const file = path.resolve(arg('--site'));
  if (!fs.existsSync(file)) { console.error(`No site file at ${file}. Nothing written.`); process.exit(1); }
  site = JSON.parse(fs.readFileSync(file, 'utf8'));
  siteDir = path.dirname(file);
}
const url = (arg('--url') || site.url || '').replace(/\/+$/, '');
if (url && !/^https?:\/\/[^/]+$/.test(url)) { console.error(`"${url}" is not a site address like https://example.org`); process.exit(1); }
const overlay = site.overlay ? path.resolve(siteDir, site.overlay) : null;
const footer = site.footer || '';

/* ---- 1. the public files ---------------------------------------------------------------------- */
// not served: the tooling, the notes, the archive, private folders, the build itself
const SKIP_TOP = new Set(['.git', '.github', 'cetome', 'private', 'dist', 'tools', '_archive', 'docs', 'node_modules']);
const SKIP_FILE = /\.md$|^\.gitignore$|^\.gitattributes$|^\.editorconfig$|^LICENSE$|^NOTICE$/;
// empty dist/ rather than delete it: it may be open in a file manager or an SFTP program
fs.mkdirSync(dist, { recursive: true });
for (const entry of fs.readdirSync(dist)) fs.rmSync(path.join(dist, entry), { recursive: true, force: true });
let publicCount = 0;
function copyTree(from, to, top, skipFile) {
  let n = 0;
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (top && SKIP_TOP.has(entry.name)) continue;
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) { n += copyTree(src, dst, false, skipFile); continue; }
    if (skipFile.test(entry.name)) continue;
    fs.mkdirSync(to, { recursive: true });
    fs.copyFileSync(src, dst);
    n++;
  }
  return n;
}
publicCount = copyTree(root, dist, true, SKIP_FILE);

/* ---- 2. the site's own files, at the same paths --------------------------------------------- */
let overlayCount = 0;
if (overlay) {
  if (!fs.existsSync(overlay)) { console.error(`The overlay folder ${overlay} does not exist. Nothing more written.`); process.exit(1); }
  overlayCount = copyTree(overlay, dist, false, /\.md$|^site\.json$/);
}

/* ---- 3. the pages: the site's address and footer links ---------------------------------------- */
const pages = [];
(function findPages(dir, rel) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) { findPages(path.join(dir, entry.name), `${rel}${entry.name}/`); continue; }
    if (entry.name === 'index.html') pages.push(rel);
  }
})(dist, '');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
for (const rel of pages) {
  const file = path.join(dist, rel, 'index.html');
  if (!fs.existsSync(file) || /^(api|lib|storage)\//.test(rel)) continue;
  let html = fs.readFileSync(file, 'utf8');
  if (url) {
    const slug = rel.split('/')[0] || 'home';
    const picture = ['img/social/' + slug + '.png', 'img/social/home.png'].find((p) => fs.existsSync(path.join(dist, p)));
    const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || 'dataviz';
    const tags = [
      `<link rel="canonical" href="${url}/${rel}">`,
      `<meta property="og:url" content="${url}/${rel}">`,
      ...(picture ? [
        `<meta property="og:image" content="${url}/${picture}">`,
        `<meta property="og:image:alt" content="${esc(title)}">`,
        '<meta property="og:image:type" content="image/png">',
        '<meta property="og:image:width" content="2400">',
        '<meta property="og:image:height" content="1260">',
        `<meta name="twitter:image" content="${url}/${picture}">`,
      ] : []),
    ];
    html = html.replace(/(\s*)<\/head>/, (m, space) => `\n    <!-- added by tools/build.mjs for ${url} -->\n    ${tags.join('\n    ')}${space}</head>`);
  }
  html = html.split('<!-- site-footer -->').join(footer);
  fs.writeFileSync(file, html);
}

/* ---- 4. sitemap and robots for the address --------------------------------------------------- */
if (url) {
  const listed = pages.filter((rel) => !/^(api|lib|storage)\//.test(rel)).sort((a, b) => a.length - b.length || a.localeCompare(b));
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${listed.map((rel) => `  <url><loc>${url}/${rel}</loc></url>`).join('\n')}\n</urlset>\n`);
  const robots = path.join(dist, 'robots.txt');
  fs.writeFileSync(robots, fs.readFileSync(robots, 'utf8').replace(/\n*$/, '\n') + `\nSitemap: ${url}/sitemap.xml\n`);
}

console.log(`dist/ ready: ${publicCount} public files${overlay ? ` + ${overlayCount} from ${path.relative(root, overlay) || overlay}` : ''}${url ? `, for ${url} (canonical addresses, link previews, sitemap)` : ', for any address (no canonical address, no sitemap)'}.`);
console.log('Upload the content of dist/ to the root of the web server.');
