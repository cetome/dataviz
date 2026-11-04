/**
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Proves that the data files in data/ hold exactly the graph elements (and saved positions) that the
 * original scripts in _archive/js/ handed to cytoscape(): the rework moved the data, it did not edit it.
 *   node tools/check-data.mjs
 * Exits with 1 on the first difference.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

/** Run an original script with a fake cytoscape() that records its options; the logic after it needs a browser and is ignored. */
function captureOriginal(file) {
  let captured = null;
  const stub = new Proxy(function () {}, { get: () => stub, apply: () => stub });
  const ctx = vm.createContext({ cytoscape: (o) => { captured = o; return stub; }, document: stub, window: {}, console });
  try { vm.runInContext(read(file), ctx); } catch (e) { /* expected: the script goes on to touch the DOM */ }
  return captured;
}
function loadData(file, name) {
  const ctx = vm.createContext({});
  vm.runInContext(read(file) + `\n;__out = ${name};`, ctx);
  return ctx.__out;
}
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
let ok = true;
const check = (label, cond) => { console.log((cond ? 'OK   ' : 'FAIL ') + label); if (!cond) ok = false; };

check('EN 18031 elements identical', same(captureOriginal('_archive/js/EN18031.js').elements, loadData('data/en18031.js', 'EN18031_DATA')));

check('E.Info elements identical', same(captureOriginal('_archive/js/EN18031_einfo.js').elements, loadData('data/en18031-einfo.js', 'EN18031_EINFO_DATA')));
const einfoPositions = JSON.parse(read('_archive/js/EN18031_utils.js').match(/const jsonPositions = '(\{.*?\})';/s)[1]);
check('E.Info positions identical', same(einfoPositions, loadData('data/en18031-einfo.js', 'EN18031_EINFO_POSITIONS')));

check('EN 303 645 elements identical', same(captureOriginal('_archive/js/EN303645.js').elements, loadData('data/en303645.js', 'EN303645_DATA')));
const en303645Positions = JSON.parse(read('_archive/js/EN303645.js').match(/const jsonPositions = `(\[.*?\])`;/s)[1]);
check('EN 303 645 positions identical', same(en303645Positions, loadData('data/en303645.js', 'EN303645_POSITIONS')));

check('prEN 40000-1-3 elements identical', same(loadData('_archive/js/prEN40000_1_3.js', 'graphElements'), loadData('data/pren40000-1-3.js', 'PREN40000_1_3_DATA')));

console.log(ok ? 'ALL DATA IDENTICAL' : 'DATA MISMATCH');
process.exit(ok ? 0 : 1);
