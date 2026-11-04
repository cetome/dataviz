/**
 * Converts the four built-in graphs (data/*.js, never edited) into the open dataviz format:
 * standards/<id>.json, which the viewer (/view/?std=<id>) and the builder can open.
 *   node tools/convert-builtins.mjs
 * Prints the issues the format check finds; exits with 1 if a conversion lost an item or a link.
 *
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * (The generated files hold cetome's data: CC BY 4.0, see DATA-LICENSE.md, not the AGPL.)
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const S = createRequire(import.meta.url)(path.join(root, 'js/standard.js'));
const load = (file, names) => {
  const ctx = vm.createContext({});
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8') + `\n;__out = { ${names.join(', ')} };`, ctx);
  return ctx.__out;
};
const valid = (s) => (s === undefined || s === null || String(s).trim() === '' || s === 'nan' ? '' : String(s).trim());
const positionsOf = (p) => (Array.isArray(p) ? Object.fromEntries(p.map((e) => [e.data.id, e.data.position])) : p || {});
const LICENCE = 'CC BY 4.0, data by cetome (see DATA-LICENSE.md)';
const PARTS = [{ id: 'en18031-1', label: 'EN 18031-1' }, { id: 'en18031-2', label: 'EN 18031-2' }, { id: 'en18031-3', label: 'EN 18031-3' }];
const partsOf = (d) => PARTS.filter((p, i) => d[`en18031_${i + 1}`]).map((p) => p.id);
const FAMILIES = {
  ACM: 'Access control mechanism', AUM: 'Authentication mechanism', SUM: 'Secure update mechanism', SSM: 'Secure storage mechanism',
  SCM: 'Secure communication mechanism', RLM: 'Resilience mechanism', NMM: 'Network monitoring mechanism', TCM: 'Traffic control mechanism',
  LGM: 'Logging mechanism', DLM: 'Deletion mechanism', UNM: 'User notification mechanism', CCK: 'Confidential cryptographic keys',
  GEC: 'General equipment capabilities', CRY: 'Cryptography',
};

/* ---- EN 18031 mechanisms ------------------------------------------------------------------ */
function en18031() {
  const { EN18031_DATA: d } = load('data/en18031.js', ['EN18031_DATA']);
  const labels = [...new Set(d.edges.map((e) => e.data.label).filter(Boolean))];
  return {
    id: 'en18031', title: 'EN 18031 security mechanisms', subtitle: 'Dependencies between the mechanisms of EN 18031-1, -2 and -3',
    authors: 'cetome', licence: LICENCE, layout: 'organic',
    description: 'Dependencies between the security mechanisms of EN 18031-1, EN 18031-2 and EN 18031-3.',
    types: [
      { id: 'family', label: 'Mechanism family', color: '#0044aa', caption: 'both' },
      { id: 'mechanism', label: 'Mechanism', color: '#1565d8' },
    ],
    linkTypes: labels.map((l) => ({ id: S.slug(l), label: l })),
    filters: [{ id: 'part', label: 'Applies to', mode: 'all', tags: PARTS }],
    items: d.nodes.map(({ data: n }) => ({
      id: n.id, title: !n.parent && FAMILIES[n.id] ? FAMILIES[n.id] : '', type: n.parent ? 'mechanism' : 'family',
      parent: valid(n.parent), tags: partsOf(n),
    })),
    links: d.edges.map(({ data: e }) => ({ from: e.source, to: e.target, type: e.label ? S.slug(e.label) : '' })),
  };
}

/* ---- EN 18031 E.Info ---------------------------------------------------------------------- */
function einfo() {
  const { EN18031_EINFO_DATA: d, EN18031_EINFO_POSITIONS: p } = load('data/en18031-einfo.js', ['EN18031_EINFO_DATA', 'EN18031_EINFO_POSITIONS']);
  const pos = positionsOf(p);
  const families = (m) => [...new Set(String(m || '').split(',').map((s) => s.trim().split('-')[0]).filter(Boolean))];
  return {
    id: 'en18031-einfo', title: 'EN 18031 E.Info', subtitle: 'The information the E.Info annex asks for, mechanism by mechanism',
    authors: 'cetome', licence: LICENCE, layout: 'saved',
    description: 'The information the E.Info annex of EN 18031 asks for, mechanism by mechanism, to simplify the EN 18031 documentation.',
    types: [
      { id: 'req', label: 'Information requirement', color: '#0044aa', caption: 'title' },
      { id: 'subreq', label: 'Information item', color: '#1565d8', caption: 'title' },
      { id: 'L3', label: 'Detail', color: '#0891b2', caption: 'title' },
    ],
    filters: [
      { id: 'part', label: 'Applies to', mode: 'all', tags: PARTS },
      { id: 'family', label: 'Mechanism', mode: 'any', tags: Object.entries(FAMILIES).map(([id, label]) => ({ id, label: `${id} ${label}` })) },
      { id: 'exclude', label: 'Hide', mode: 'none', tags: [{ id: 'conditional', label: 'Conditional items' }] },
    ],
    items: d.nodes.map(({ data: n }) => ({
      id: n.id, title: valid(n.title), type: n.type, parent: valid(n.parent),
      tags: [...partsOf(n), ...families(n.mechanism), ...(n.condition ? ['conditional'] : [])],
      text: [n.mechanism ? `**Mechanisms:** ${n.mechanism}` : '', n.condition ? 'Conditional item: only to be documented when the condition applies.' : ''].filter(Boolean).join('\n'),
      x: pos[n.id] && pos[n.id].x, y: pos[n.id] && pos[n.id].y,
    })),
    links: d.edges.map(({ data: e }) => ({ from: e.source, to: e.target })),
  };
}

/* ---- EN 303 645 / TS 103 701 ------------------------------------------------------------- */
function en303645() {
  const { EN303645_DATA: d, EN303645_POSITIONS: p } = load('data/en303645.js', ['EN303645_DATA', 'EN303645_POSITIONS']);
  const pos = positionsOf(p);
  // the condition labels of the page's sidebar (en303645/index.html)
  const html = fs.readFileSync(path.join(root, 'en303645/index.html'), 'utf8');
  const conditions = [...html.matchAll(/value="(c\d+)">\s*\d+\)\s*([^<]+)</g)].map((m) => ({ id: m[1], label: m[2].trim() }));
  return {
    id: 'en303645', title: 'EN 303 645 and TS 103 701', subtitle: 'Provisions, conditions and the IXITs they need',
    authors: 'cetome', licence: LICENCE, layout: 'saved',
    description: 'The provisions of ETSI EN 303 645, their conditions, and the TS 103 701 IXIT fields each provision requires.',
    types: [
      { id: 'parent', label: 'Chapter', color: '#475569', caption: 'title' },
      { id: 'mandatory', label: 'Mandatory provision', color: '#0044aa', assess: 'yes' },
      { id: 'recommended', label: 'Recommended provision', color: '#64748b', border: 'dashed', assess: 'yes' },
      { id: 'IXIT', label: 'IXIT (TS 103 701)', color: '#16a34a', assess: 'no' },
    ],
    linkTypes: [{ id: 'requires', label: 'Requires IXIT fields' }],
    filters: [{ id: 'condition', label: 'Conditions', mode: 'any', tags: conditions }],
    items: d.nodes.map(({ data: n }) => ({
      id: n.id, title: valid(n.title), type: n.type, parent: valid(n.parent), tags: String(n.condition || '').split(',').map((c) => c.trim()).filter(Boolean),
      x: pos[n.id] && pos[n.id].x, y: pos[n.id] && pos[n.id].y,
    })),
    links: d.edges.map(({ data: e }) => ({ from: e.source, to: e.target, type: 'requires', label: valid(e.documentation) })),
  };
}

/* ---- prEN 40000-1-3 and the CRA ---------------------------------------------------------- */
function pren() {
  const { PREN40000_1_3_DATA: d } = load('data/pren40000-1-3.js', ['PREN40000_1_3_DATA']);
  const nodes = d.filter((e) => e.data.source === undefined).map((e) => e.data);
  const edges = d.filter((e) => e.data.source !== undefined).map((e) => e.data);
  return {
    id: 'pren40000-1-3', title: 'prEN 40000-1-3 and the CRA', subtitle: 'Vulnerability handling requirements mapped to the essential requirements of Annex I Part 2',
    authors: 'cetome', licence: LICENCE, layout: 'hierarchical', direction: 'LR',
    description: 'The vulnerability handling requirements of prEN 40000-1-3, their dependencies, and how they map to the essential requirements of CRA Annex I Part 2.',
    types: [
      { id: 'ROOT_CONTAINER', label: 'Domain', color: '#0044aa' },
      { id: 'CHAPTER', label: 'Chapter', color: '#1565d8' },
      { id: 'RQ', label: 'Requirement (RQ)', color: '#0044aa' },
      { id: 'RC', label: 'Recommendation (RC)', color: '#0044aa', border: 'dashed' },
      { id: 'PM', label: 'Permission (PM)', color: '#7dd3fc' },
      { id: 'EXTERNAL_ROOT', label: 'prEN 40000-1-2', color: '#7e22ce' },
      { id: 'EXTERNAL_LEAF', label: 'prEN 40000-1-2 requirement', color: '#7e22ce', border: 'dotted', assess: 'no' },
      { id: 'ESSR_CONTAINER', label: 'CRA Annex I Part 2', color: '#16a34a' },
      { id: 'ESSR', label: 'Essential requirement (ESSR)', color: '#16a34a', shape: 'hexagon', caption: 'title' },
    ],
    linkTypes: [{ id: 'dependency', label: 'Depends on', color: '#475569' }, { id: 'essr', label: 'Maps to essential requirement', color: '#166534' }],
    items: nodes.map((n) => {
      const label = valid(n.label);
      const title = valid(n.display_title);
      return {
        id: n.id, label: label !== n.id ? label : '', title: title && title !== label ? title : '',
        type: n.type, parent: valid(n.parent), text: valid(n.info),
      };
    }),
    links: edges.map((e) => ({ from: e.source, to: e.target, type: valid(e.kind) })),
  };
}

/* ---- write ------------------------------------------------------------------------------- */
const outDir = path.join(root, 'standards');
fs.mkdirSync(outDir, { recursive: true });
let ok = true;
for (const [make, source] of [[en18031, 'data/en18031.js'], [einfo, 'data/en18031-einfo.js'], [en303645, 'data/en303645.js'], [pren, 'data/pren40000-1-3.js']]) {
  const raw = make();
  const { std, issues } = S.read(raw);
  const out = S.clean(std);
  const file = path.join(outDir, `${out.id}.json`);
  fs.writeFileSync(file, JSON.stringify(out, null, 2) + '\n');
  // round trip: what was written must read back to the same standard
  const again = S.clean(S.read(JSON.parse(fs.readFileSync(file, 'utf8'))).std);
  const same = JSON.stringify(again) === JSON.stringify(out);
  const lost = raw.items.length - out.items.length + (raw.links.length - (out.links || []).length);
  const expected = out.id === 'en18031-einfo' && lost === 4; // three ids used twice or more in the source: cytoscape keeps the first one too
  console.log(`${same && (!lost || expected) ? 'OK  ' : 'FAIL'} ${source} -> standards/${out.id}.json: ${out.items.length} items, ${(out.links || []).length} links${lost ? `, ${lost} duplicates left out${expected ? ' (known, as in the source)' : ''}` : ''}${same ? '' : ', ROUND TRIP DIFFERS'}`);
  issues.forEach((i) => console.log(`       ${i.level}: ${i.message}`));
  if (!same || (lost && !expected)) ok = false;
}

// standards/index.json, the list the viewer and the builder offer
await import('./index-standards.mjs');
process.exit(ok ? 0 : 1);
