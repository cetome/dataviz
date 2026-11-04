/**
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Renders the social (Open Graph) images into img/social/: one card per page, 1200 x 630 drawn at
 * twice that (2400 x 1260) so LinkedIn, Teams and the others do not soften the lettering, in the
 * same style as cetome's cards: the white dataviz logo on cetome blue, the page title and
 * summary, and a frame holding a live screenshot of the page's graph (the home card shows the four).
 * The pages' <head> point at these files (og:image / twitter:image).
 *
 * Needs Microsoft Edge and playwright-core (`npm install` in tools/). The script serves the site
 * itself from the repository root, so nothing else has to run:
 *   node tools/social.mjs            every card
 *   node tools/social.mjs einfo      one card (the slug of its folder; "home" for the landing page)
 */
import { chromium } from 'playwright-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// options: --url https://your.site (printed on the cards; default: none) --out folder (default img/social)
const arg = (name) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
const KICKER = arg('--url') ? new URL(arg('--url')).host : 'dataviz';
const out = path.resolve(root, arg('--out') || path.join('img', 'social'));
fs.mkdirSync(out, { recursive: true });

/* The cards: title and summary as the pages state them (keep in step with each page's <title> and description). */
const PAGES = [
  { slug: 'home', url: '/', title: 'Dependency graphs for product security standards', description: 'Explore the relationships inside and between EN 303 645, TS 103 701, EN 18031 and the CRA harmonised standard prEN 40000-1-3, free and in the browser.' },
  { slug: 'pren40000-1-3', url: '/pren40000-1-3/', title: 'prEN 40000-1-3 and the CRA essential requirements', description: 'Vulnerability handling requirements of the CRA harmonised standard, mapped to Annex I Part 2, with a self-assessment and assessor mode.' },
  { slug: 'en303645', url: '/en303645/', title: 'EN 303 645 and TS 103 701', description: 'Provisions, conditions and the IXITs they need. Import your ICS to tailor the graph to your product and generate the IXIT list.' },
  { slug: 'en18031', url: '/en18031/', title: 'EN 18031 security mechanisms', description: 'Dependencies between the security mechanisms of EN 18031-1, EN 18031-2 and EN 18031-3.' },
  { slug: 'einfo', url: '/einfo/', title: 'EN 18031 E.Info', description: 'The information the E.Info annex asks for, mechanism by mechanism, to simplify the EN 18031 documentation.' },
];
const only = process.argv.slice(2).find((a, i, all) => !a.startsWith('--') && !(all[i - 1] || '').startsWith('--'));
const pages = only ? PAGES.filter((p) => p.slug === only) : PAGES;
if (pages.length === 0) { console.error(`unknown page "${only}"; one of: ${PAGES.map((p) => p.slug).join(', ')}`); process.exit(1); }

/* a static server for the repository root, so the graph pages load exactly as they do live */
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.statusCode = 404; return res.end(); }
  res.setHeader('content-type', types[path.extname(f)] || 'application/octet-stream');
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;

const logo = fs.readFileSync(path.join(root, 'img', 'dataviz_white.svg'), 'utf8').replace(/width="[^"]*" height="[^"]*"/, 'height="60"');
const font = fs.readFileSync(path.join(root, 'fonts', 'inter-latin-variable.woff2')).toString('base64');
const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const card = (p, pictures) => `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: Inter; font-weight: 100 900; src: url(data:font/woff2;base64,${font}) format('woff2'); }
  html, body { margin: 0; }
  body { width: 1200px; height: 630px; background: #0044aa; color: #fff; font-family: Inter, Arial, sans-serif; }
  .card { box-sizing: border-box; width: 1200px; height: 630px; padding: 52px 72px 56px; display: flex; flex-direction: column; }
  .head { display: flex; align-items: center; justify-content: space-between; }
  .kicker { font-size: 18px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.75); }
  .body { flex: 1; display: grid; grid-template-columns: minmax(0, 1fr) 520px; gap: 48px; align-items: center; padding-top: 36px; }
  .title { margin: 0; font-size: 44px; line-height: 1.1; font-weight: 800; letter-spacing: -0.02em; }
  .desc { margin: 20px 0 0; font-size: 20px; line-height: 1.45; color: rgba(255,255,255,0.85); }
  .media { background: #fff; border-radius: 18px; padding: 14px; display: grid; gap: 10px; align-self: center; }
  .media.grid { grid-template-columns: 1fr 1fr; }
  .media img { display: block; width: 100%; height: auto; border-radius: 6px; }
</style></head><body><div class="card">
  <div class="head">${logo}<span class="kicker">${KICKER}</span></div>
  <div class="body">
    <div><h1 class="title">${escapeHtml(p.title)}</h1><p class="desc">${escapeHtml(p.description)}</p></div>
    <div class="media${pictures.length > 1 ? ' grid' : ''}">${pictures.map((src) => `<img src="${src}">`).join('')}</div>
  </div>
</div></body></html>`;

const browser = await chromium.launch({ channel: 'msedge' });

/** A screenshot of a page's graph, fitted, as a data URL. */
async function graphPicture(url, size) {
  const page = await browser.newPage({ viewport: size, deviceScaleFactor: 2 });
  await page.goto(origin + url, { waitUntil: 'load' });
  await page.waitForFunction(() => window.cy && window.cy.nodes().length > 0);
  await page.waitForTimeout(1500); // animated layouts settle
  await page.addStyleTag({ content: '.details { display: none !important; }' });
  await page.evaluate(() => window.cy.fit(window.cy.elements(':visible'), 20));
  await page.waitForTimeout(300);
  const png = await page.locator('#cy').screenshot({ type: 'png' });
  await page.close();
  return `data:image/png;base64,${png.toString('base64')}`;
}

const shots = {};
const graphPages = PAGES.filter((p) => p.slug !== 'home');
const needed = pages.some((p) => p.slug === 'home') ? graphPages : pages;
for (const p of needed) {
  shots[p.slug] = await graphPicture(p.url, { width: 1000, height: 560 });
  console.log(`  graph ${p.slug}`);
}

const tab = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
for (const p of pages) {
  const pictures = p.slug === 'home' ? graphPages.map((g) => shots[g.slug]) : [shots[p.slug]];
  await tab.setContent(card(p, pictures), { waitUntil: 'load' });
  await tab.evaluate(() => document.fonts.ready);
  await tab.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
  const file = path.join(out, `${p.slug}.png`);
  await tab.screenshot({ path: file, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log(`  social ${p.slug}.png (${Math.round(fs.statSync(file).size / 1024)} KB)`);
}
await browser.close();
server.close();
