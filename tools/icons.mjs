/**
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Renders the favicon set into img/favicon/ from the dataviz mark (img/dataviz-mark.svg):
 *   favicon.svg (follows the browser colour scheme), favicon-96x96.png, apple-touch-icon.png (180),
 *   web-app-manifest-192x192.png and -512x512.png (maskable: the mark sits inside the safe zone),
 *   favicon.ico (16, 32 and 48 px, written by Python/Pillow from the PNGs).
 * Needs Microsoft Edge and the playwright-core package (`npm install` in tools/).
 *   node tools/icons.mjs
 */
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'img', 'favicon');
fs.mkdirSync(out, { recursive: true });

// the mark's drawing, without its <svg> wrapper: the paths are drawn in a 10.79 x 10.79 box
const markSvg = fs.readFileSync(path.join(root, 'img', 'dataviz-mark.svg'), 'utf8');
const paths = markSvg.match(/<g[^>]*>([\s\S]*)<\/g>/)[1]
  .replace(/fill="#0044aa"/g, '').replace(/stroke="#0044aa"/g, '');
const BLUE = '#0044aa';

// one tile: a rounded square of `size` px, the mark scaled to `markRatio` of it, centred
const tile = (size, markRatio, { radius = 0, bg = '#ffffff', fg = BLUE } = {}) => {
  const scale = (size * markRatio) / 10.79;
  const offset = (size - size * markRatio) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
<rect width="${size}" height="${size}" rx="${radius}" fill="${bg}"/>
<g transform="translate(${offset},${offset}) scale(${scale}) translate(0,-0.954)" fill="${fg}" stroke="${fg}">${paths}</g>
</svg>`;
};

// favicon.svg: blue mark on a white tile, white mark on a blue tile when the browser is dark
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><title>cetome dataviz</title>
<style>.tile{fill:#ffffff}.mark{fill:${BLUE};stroke:${BLUE}}@media (prefers-color-scheme: dark){.tile{fill:${BLUE}}.mark{fill:#ffffff;stroke:#ffffff}}</style>
<rect width="64" height="64" rx="12" class="tile"/>
<g transform="translate(6.4,6.4) scale(${(51.2 / 10.79).toFixed(4)}) translate(0,-0.954)" class="mark">${paths.replace(/stroke="#ffffff"/g, '')}</g>
</svg>
`;
fs.writeFileSync(path.join(out, 'favicon.svg'), svg);

const pngs = [
  ['favicon-96x96.png', 96, 0.82],
  ['apple-touch-icon.png', 180, 0.72],
  ['web-app-manifest-192x192.png', 192, 0.60],   // maskable: safe zone is the inner 80 % circle
  ['web-app-manifest-512x512.png', 512, 0.60],
  ['icon-16.png', 16, 0.9], ['icon-32.png', 32, 0.86], ['icon-48.png', 48, 0.84],  // for the .ico
];
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: 1 });
for (const [name, size, ratio] of pngs) {
  await page.setContent(`<!doctype html><body style="margin:0">${tile(size, ratio)}</body>`);
  await page.screenshot({ path: path.join(out, name), clip: { x: 0, y: 0, width: size, height: size } });
  console.log(`  ${name}`);
}
await browser.close();

// favicon.ico from the 16/32/48 renders (Pillow), then drop the intermediates
execFileSync('python', ['-c', `
import os, sys
from PIL import Image
d = sys.argv[1]
Image.open(os.path.join(d, 'icon-48.png')).convert('RGBA').save(os.path.join(d, 'favicon.ico'), format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
`, out], { stdio: 'inherit' });
for (const f of ['icon-16.png', 'icon-32.png', 'icon-48.png']) fs.unlinkSync(path.join(out, f));
console.log('  favicon.ico');

fs.writeFileSync(path.join(out, 'site.webmanifest'), JSON.stringify({
  name: 'cetome dataviz', short_name: 'dataviz',
  icons: [
    { src: '/img/favicon/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
    { src: '/img/favicon/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
  theme_color: '#ffffff', background_color: '#ffffff', display: 'standalone',
}, null, 2) + '\n');
console.log('  site.webmanifest');
