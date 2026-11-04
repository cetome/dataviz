/**
 * Writes standards/index.json: the list of dataviz files in standards/ that the viewer's start page
 * and the builder's "New" menu offer. Run it after adding or removing a file there.
 *   node tools/index-standards.mjs
 *
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'standards');
const index = fs.readdirSync(dir).filter((f) => f.endsWith('.json') && f !== 'index.json').sort().map((f) => {
  const s = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  return { id: f.replace(/\.json$/, ''), title: s.title || f, subtitle: s.subtitle || '', items: (s.items || []).length, licence: s.licence || '' };
});
fs.writeFileSync(path.join(dir, 'index.json'), JSON.stringify(index, null, 2) + '\n');
console.log(`standards/index.json: ${index.length} standards listed`);
