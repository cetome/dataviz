/**
 * Writes the software bill of materials (SBOM) and the vulnerability exploitability exchange (VEX)
 * of dataviz, both in CycloneDX 1.6 JSON:
 *   node tools/sbom.mjs                          sbom/dataviz.cdx.json and sbom/dataviz.vex.cdx.json
 *   node tools/sbom.mjs --site private/site.json the same for a site: the public components plus the
 *                                                ones the site file lists (its "sbom" entry), written
 *                                                into the site's overlay folder (sbom/), so that
 *                                                tools/build.mjs serves them at /sbom/ on that site
 *
 * Every component shipped is listed with its version, licence, package URL and the SHA-256 of its
 * file. The VEX states, for every known vulnerability of those versions, whether dataviz is affected
 * and why. The script asks OSV (osv.dev) for the vulnerabilities known today: one that has no
 * analysis below is written as "in_triage" and the script exits with 1, so that it gets looked at.
 * Update COMPONENTS when a library in js/vendor/ changes, and ANALYSES when a vulnerability is studied.
 *
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = (name) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };

/** The release of dataviz these files describe. */
const DATAVIZ_VERSION = '1.0.0';
const REPO = 'https://github.com/cetome/dataviz';

/* ---- what dataviz ships ------------------------------------------------------------------------ */
const COMPONENTS = [
  { ref: 'cytoscape', name: 'cytoscape', version: '3.30.3', licence: 'MIT', files: ['js/vendor/cytoscape.min.js'],
    supplier: 'The Cytoscape Consortium', website: 'https://js.cytoscape.org', vcs: 'https://github.com/cytoscape/cytoscape.js', description: 'Graph theory and visualisation library: draws every graph.' },
  { ref: 'cytoscape-cose-bilkent', name: 'cytoscape-cose-bilkent', version: '4.1.0', licence: 'MIT', files: ['js/vendor/cose-bilkent/cytoscape-cose-bilkent.js'], dependsOn: ['cose-base'],
    supplier: 'i-Vis Research Lab, Bilkent University', vcs: 'https://github.com/cytoscape/cytoscape.js-cose-bilkent', description: 'The organic layout of the graphs.' },
  { ref: 'cose-base', name: 'cose-base', version: '2.2.0', licence: 'MIT', files: ['js/vendor/cose-bilkent/cose-base.js'], dependsOn: ['layout-base'],
    supplier: 'i-Vis Research Lab, Bilkent University', vcs: 'https://github.com/iVis-at-Bilkent/cose-base', description: 'Core of the CoSE layout algorithm.' },
  { ref: 'layout-base', name: 'layout-base', version: '2.0.1', licence: 'MIT', files: ['js/vendor/cose-bilkent/layout-base.js'],
    supplier: 'i-Vis Research Lab, Bilkent University', vcs: 'https://github.com/iVis-at-Bilkent/layout-base', description: 'Base classes of the layout algorithms.' },
  { ref: 'cytoscape-dagre', name: 'cytoscape-dagre', version: '2.5.0', licence: 'MIT', files: ['js/vendor/dagre/cytoscape-dagre.js'], dependsOn: ['dagre'],
    supplier: 'The Cytoscape Consortium', vcs: 'https://github.com/cytoscape/cytoscape.js-dagre', description: 'The hierarchical layout of the graphs.' },
  { ref: 'dagre', name: 'dagre', version: '0.8.5', licence: 'MIT', files: ['js/vendor/dagre/dagre.min.js'], dependsOn: ['graphlib', 'lodash'],
    supplier: 'Chris Pettitt', vcs: 'https://github.com/dagrejs/dagre', description: 'Directed graph layout. Its distribution file bundles graphlib and a subset of lodash.' },
  { ref: 'graphlib', name: 'graphlib', version: '2.1.8', licence: 'MIT', bundledIn: 'js/vendor/dagre/dagre.min.js', dependsOn: ['lodash'],
    supplier: 'Chris Pettitt', vcs: 'https://github.com/dagrejs/graphlib', description: 'Graph data structure, bundled in dagre.min.js (version stated in the bundle).' },
  { ref: 'lodash', name: 'lodash', version: '4.17.15', licence: 'MIT', bundledIn: 'js/vendor/dagre/dagre.min.js',
    supplier: 'OpenJS Foundation', vcs: 'https://github.com/lodash/lodash',
    description: 'Subset of lodash modules bundled in dagre.min.js: clone, cloneDeep, constant, defaults, each, filter, find, flatten, forEach, forIn, has, isArray, isEmpty, isFunction, isUndefined, keys, last, map, mapValues, max, merge, min, minBy, now, pick, range, reduce, size, sortBy, transform, union, uniqueId, values, zipObject. The bundle states no version: dagre 0.8.5 was built on 2019-12-03 against lodash ^4.17.15, the latest lodash release at that date.' },
  { ref: 'js-yaml', name: 'js-yaml', version: '4.3.2', licence: 'MIT', files: ['js/vendor/js-yaml.min.js'],
    supplier: 'Vitaly Puzrin and contributors', vcs: 'https://github.com/nodeca/js-yaml', description: 'Reads and writes the YAML dataviz files.' },
  { ref: 'xlsx', name: 'xlsx', version: '0.20.3', licence: 'Apache-2.0', files: ['js/vendor/xlsx.full.min.js'],
    supplier: 'SheetJS LLC', website: 'https://sheetjs.com', vcs: 'https://git.sheetjs.com/sheetjs/sheetjs', distribution: 'https://cdn.sheetjs.com/xlsx-0.20.3/',
    description: 'SheetJS Community Edition: reads and writes the Excel dataviz files, the ICS and the IXIT list. Distributed by cdn.sheetjs.com since 0.19 (the npm package stopped at 0.18.5).' },
  { ref: 'inter', type: 'file', name: 'Inter', version: '4.001', licence: 'OFL-1.1', files: ['fonts/inter-latin-variable.woff2'], purl: 'pkg:github/rsms/inter@v4.001',
    supplier: 'Rasmus Andersson', website: 'https://rsms.me/inter/', vcs: 'https://github.com/rsms/inter', description: 'The typeface, variable, latin subset (version 4.001 from the font name table).' },
  { ref: 'playwright-core', name: 'playwright-core', version: '1.64.0', licence: 'Apache-2.0', scope: 'excluded',
    supplier: 'Microsoft', vcs: 'https://github.com/microsoft/playwright', description: 'Build tooling only (tools/icons.mjs, tools/social.mjs), never part of the site.' },
];
const TOP_LEVEL = ['cytoscape', 'cytoscape-cose-bilkent', 'cytoscape-dagre', 'js-yaml', 'xlsx', 'inter'];

/* ---- what the known vulnerabilities mean for dataviz ------------------------------------------------ */
// state: not_affected | resolved | exploitable | in_triage | false_positive
// justification (not_affected): code_not_present | code_not_reachable | requires_configuration |
//   requires_dependency | requires_environment | protected_by_compiler | protected_at_runtime |
//   protected_at_perimeter | protected_by_mitigating_control
const JS_YAML_UPDATE = 'dataviz updated js-yaml from 4.1.0 to 4.3.2 on 2026-11-04, which fixes it. Before that, dataviz was not affected either: it parses YAML with CORE_SCHEMA only, which treats "<<" as an ordinary key and refuses the !!omap tag.';
const ANALYSES = {
  'GHSA-4r6h-8v6p-xvw6': { component: 'xlsx', cve: 'CVE-2023-30533', summary: 'Prototype Pollution in sheetJS', state: 'not_affected', justification: 'code_not_present',
    detail: 'Fixed in SheetJS CE 0.19.3. dataviz ships 0.20.3 from cdn.sheetjs.com. Databases list every npm version as affected because the fixed releases are not published on npm.' },
  'GHSA-5pgg-2g8v-p4x9': { component: 'xlsx', cve: 'CVE-2024-22363', summary: 'SheetJS Regular Expression Denial of Service (ReDoS)', state: 'not_affected', justification: 'code_not_present',
    detail: 'Fixed in SheetJS CE 0.20.2. dataviz ships 0.20.3 from cdn.sheetjs.com. Databases list every npm version as affected because the fixed releases are not published on npm.' },
  'GHSA-29mw-wpgm-hmr9': { component: 'lodash', cve: 'CVE-2020-28500', summary: 'Regular Expression Denial of Service (ReDoS) in lodash', state: 'not_affected', justification: 'code_not_reachable',
    detail: 'The slow regular expression runs when toNumber, trim or trimEnd receive long strings. trim and trimEnd are not in the bundle. toNumber is, but dagre only passes it numbers (sizes, ranges), never text from a dataviz file.' },
  'GHSA-35jh-r3h4-6jhm': { component: 'lodash', cve: 'CVE-2021-23337', summary: 'Command Injection in lodash', state: 'not_affected', justification: 'code_not_present',
    detail: 'Affects lodash template, which is not in the subset bundled in dagre.min.js.' },
  'GHSA-p6mc-m468-83gw': { component: 'lodash', cve: 'CVE-2020-8203', summary: 'Prototype Pollution in lodash', state: 'not_affected', justification: 'code_not_reachable',
    detail: 'The flaw is in the path setter used by zipObjectDeep (not bundled). The bundle reaches the same setter only through pick, which dagre calls with fixed attribute names. Nothing from a dataviz file becomes a path.' },
  'GHSA-r5fr-rjxr-66jc': { component: 'lodash', cve: 'CVE-2026-4800', summary: 'lodash vulnerable to Code Injection via _.template imports key names', state: 'not_affected', justification: 'code_not_present',
    detail: 'Affects lodash template, which is not in the subset bundled in dagre.min.js.' },
  'GHSA-xxjr-mmjv-4gpg': { component: 'lodash', cve: 'CVE-2025-13465', summary: 'Lodash has Prototype Pollution Vulnerability in _.unset, _.omit, and _.pullAt functions', state: 'not_affected', justification: 'code_not_present',
    detail: 'unset, omit and pullAt are not in the subset bundled in dagre.min.js.' },
  'GHSA-mh29-5h37-fv8m': { component: 'js-yaml', cve: 'CVE-2025-64718', summary: 'js-yaml has prototype pollution in merge (<<)', state: 'resolved', detail: JS_YAML_UPDATE, history: true },
  'GHSA-h67p-54hq-rp68': { component: 'js-yaml', cve: 'CVE-2026-53550', summary: 'Quadratic-complexity DoS in merge key handling via repeated aliases', state: 'resolved', detail: JS_YAML_UPDATE, history: true },
  'GHSA-52cp-r559-cp3m': { component: 'js-yaml', cve: 'CVE-2026-59869', summary: 'YAML merge-key chains can force quadratic CPU consumption', state: 'resolved', detail: JS_YAML_UPDATE, history: true },
  'GHSA-5p4m-2wfm-xmqj': { component: 'js-yaml', summary: 'Quadratic CPU consumption in !!omap resolution', state: 'resolved', detail: JS_YAML_UPDATE, history: true },
  'GHSA-2883-xcg3-v3hh': { component: 'js-yaml', cve: 'CVE-2026-84375', summary: 'maxTotalMergeKeys does not limit CPU use for empty merge sources', state: 'resolved', detail: JS_YAML_UPDATE, history: true },
};

/* ---- a site adds its own components (its "sbom" entry) ------------------------------------------- */
let site = null; let siteDir = root; let outDir = path.join(root, 'sbom');
if (arg('--site')) {
  const file = path.resolve(arg('--site'));
  site = JSON.parse(fs.readFileSync(file, 'utf8'));
  siteDir = path.dirname(file);
  const overlay = path.resolve(siteDir, site.overlay || '.');
  outDir = path.join(overlay, 'sbom');
  for (const c of (site.sbom && site.sbom.components) || []) COMPONENTS.push({ ...c, base: overlay });
  for (const c of (site.sbom && site.sbom.topLevel) || []) TOP_LEVEL.push(c);
  Object.assign(ANALYSES, (site.sbom && site.sbom.analyses) || {});
}

/* ---- SBOM -------------------------------------------------------------------------------------- */
const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const purlOf = (c) => c.purl || `pkg:npm/${c.name}@${c.version}`;
const refs = (c) => [
  c.website && { type: 'website', url: c.website },
  c.vcs && { type: 'vcs', url: c.vcs },
  c.distribution && { type: 'distribution', url: c.distribution },
].filter(Boolean);
function componentOf(c) {
  const base = c.base || root;
  const out = {
    'bom-ref': c.ref, type: c.type || 'library', name: c.name, version: c.version,
    ...(c.supplier && { supplier: { name: c.supplier } }),
    ...(c.description && { description: c.description }),
    scope: c.scope || 'required',
    licenses: [c.licence.startsWith('LicenseRef-') ? { license: { name: c.licence.replace('LicenseRef-', '') } } : { license: { id: c.licence } }],
    ...(c.type !== 'application' || c.purl ? { purl: purlOf(c) } : {}),
  };
  const files = c.files || [];
  if (files.length === 1) out.hashes = [{ alg: 'SHA-256', content: sha256(path.join(base, files[0])) }];
  if (files.length > 1) out.components = files.map((f) => ({ 'bom-ref': `${c.ref}:${f}`, type: 'file', name: f, hashes: [{ alg: 'SHA-256', content: sha256(path.join(base, f)) }] }));
  if (files.length || c.bundledIn) out.evidence = { occurrences: (files.length ? files : [c.bundledIn]).map((f) => ({ location: f })) };
  const ext = refs(c);
  if (ext.length) out.externalReferences = ext;
  return out;
}
const components = COMPONENTS.map(componentOf);
// a stable serial number: the same components give the same number
const digest = crypto.createHash('sha256').update(JSON.stringify(components)).digest('hex');
const serial = `urn:uuid:${digest.slice(0, 8)}-${digest.slice(8, 12)}-4${digest.slice(13, 16)}-a${digest.slice(17, 20)}-${digest.slice(20, 32)}`;
const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const subject = site && site.sbom && site.sbom.name ? site.sbom.name : 'dataviz';
const metadataComponent = {
  'bom-ref': 'dataviz', type: 'application', name: 'dataviz', version: DATAVIZ_VERSION,
  supplier: { name: 'cetome', url: ['https://github.com/cetome'] },
  licenses: [{ license: { id: 'AGPL-3.0-or-later' } }],
  purl: `pkg:github/cetome/dataviz@${DATAVIZ_VERSION}`,
  description: site && site.sbom && site.sbom.description ? site.sbom.description : 'Interactive dependency graphs for standards, a static web application.',
  externalReferences: [{ type: 'vcs', url: REPO }],
};
const sbom = {
  bomFormat: 'CycloneDX', specVersion: '1.6', serialNumber: serial, version: 1,
  metadata: {
    timestamp: now,
    tools: { components: [{ type: 'application', name: 'tools/sbom.mjs', supplier: { name: 'cetome' }, externalReferences: [{ type: 'vcs', url: REPO }] }] },
    component: metadataComponent,
    supplier: { name: 'cetome', url: ['https://github.com/cetome'] },
  },
  components,
  dependencies: [
    { ref: 'dataviz', dependsOn: TOP_LEVEL },
    ...COMPONENTS.map((c) => ({ ref: c.ref, dependsOn: c.dependsOn || [] })),
  ],
};

/* ---- VEX: the known vulnerabilities, from OSV, with their analysis ----------------------------------- */
const fixedOrRange = (v) => (v.affected || []).flatMap((a) => (a.ranges || []).flatMap((r) => r.events.filter((e) => e.fixed).map((e) => e.fixed)));
async function knownVulnerabilities() {
  const queried = COMPONENTS.filter((c) => !c.purl || c.purl.startsWith('pkg:npm/'));
  try {
    const res = await fetch('https://api.osv.dev/v1/querybatch', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ queries: queried.map((c) => ({ package: { ecosystem: 'npm', name: c.name }, version: c.version })) }) });
    if (!res.ok) throw new Error(`OSV answered ${res.status}`);
    const { results } = await res.json();
    const found = [];
    for (let i = 0; i < queried.length; i++) {
      for (const { id } of results[i].vulns || []) {
        const r = await fetch(`https://api.osv.dev/v1/vulns/${id}`);
        const v = r.ok ? await r.json() : { id };
        found.push({ component: queried[i].ref, id, cve: (v.aliases || []).find((a) => a.startsWith('CVE-')), summary: v.summary || '', severity: ((v.database_specific || {}).severity || '').toLowerCase(), fixed: fixedOrRange(v) });
      }
    }
    return { found, online: true };
  } catch (e) {
    console.warn(`OSV could not be reached (${e.message}): the VEX is written from the recorded analyses only.`);
    return { found: [], online: false };
  }
}

const { found, online } = await knownVulnerabilities();
const vulnerabilities = new Map();
for (const f of found) vulnerabilities.set(f.id, f);
for (const [id, a] of Object.entries(ANALYSES)) {
  if (!COMPONENTS.some((c) => c.ref === a.component)) continue; // a site component not in this SBOM
  // a resolved one (fixed by an update) is kept as history; an analysis OSV no longer reports for this version is dropped
  if (!vulnerabilities.has(id) && (a.history || !online)) vulnerabilities.set(id, { component: a.component, id, cve: a.cve, summary: a.summary, severity: a.severity || '' });
}
const untriaged = [];
const vexEntries = [...vulnerabilities.values()].sort((a, b) => a.component.localeCompare(b.component) || a.id.localeCompare(b.id)).map((v) => {
  const a = ANALYSES[v.id];
  if (!a) untriaged.push(`${v.component}: ${v.id}${v.cve ? ` (${v.cve})` : ''} ${v.summary}`);
  const analysis = a ? { state: a.state, ...(a.justification && { justification: a.justification }), detail: a.detail }
    : { state: 'in_triage', detail: 'Reported by OSV, not analysed yet.' };
  return {
    'bom-ref': `vuln-${v.id}`,
    id: v.cve || v.id,
    source: v.cve ? { name: 'NVD', url: `https://nvd.nist.gov/vuln/detail/${v.cve}` } : { name: 'GitHub Advisories', url: `https://github.com/advisories/${v.id}` },
    references: [{ id: v.id, source: { name: 'GitHub Advisories', url: `https://github.com/advisories/${v.id}` } }],
    ...(v.severity && { ratings: [{ source: { name: 'GitHub Advisories' }, severity: v.severity === 'moderate' ? 'medium' : v.severity, method: 'other' }] }),
    description: v.summary || (a && a.summary) || '',
    analysis,
    affects: [{ ref: `urn:cdx:${serial.replace('urn:uuid:', '')}/1#${v.component}` }],
  };
});
const vex = {
  bomFormat: 'CycloneDX', specVersion: '1.6',
  serialNumber: `urn:uuid:${crypto.createHash('sha256').update(digest + 'vex').digest('hex').replace(/^(.{8})(.{4}).(.{3}).(.{3})(.{12}).*$/, '$1-$2-4$3-a$4-$5')}`,
  version: 1,
  metadata: { timestamp: now, component: metadataComponent, supplier: { name: 'cetome', url: ['https://github.com/cetome'] } },
  vulnerabilities: vexEntries,
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'dataviz.cdx.json'), JSON.stringify(sbom, null, 2) + '\n');
fs.writeFileSync(path.join(outDir, 'dataviz.vex.cdx.json'), JSON.stringify(vex, null, 2) + '\n');
const rel = path.relative(root, outDir).replace(/\\/g, '/');
console.log(`${subject}: ${components.length} components in ${rel}/dataviz.cdx.json, ${vexEntries.length} vulnerabilities analysed in ${rel}/dataviz.vex.cdx.json${online ? ' (checked against OSV today)' : ''}.`);
const byState = vexEntries.reduce((m, v) => { m[v.analysis.state] = (m[v.analysis.state] || 0) + 1; return m; }, {});
console.log('  ' + Object.entries(byState).map(([s, n]) => `${n} ${s.replace('_', ' ')}`).join(', '));
if (untriaged.length) {
  console.log('NEW, NOT ANALYSED (written as in_triage, add an analysis to tools/sbom.mjs):');
  untriaged.forEach((u) => console.log('  ' + u));
  process.exit(1);
}
