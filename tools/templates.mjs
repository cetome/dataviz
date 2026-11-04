/**
 * Builds the files people take away to make their own dataviz file, from the one hand-written source
 * templates/dataviz-template.yaml (commented), so that every carrier says the same thing:
 *   templates/dataviz-template.json, .xlsx, -items.csv, -links.csv
 * and the pages format/index.html (from docs/FORMAT.md) and licence/index.html (from DATA-LICENSE.md).
 * Then checks that the template, the example and every built-in standard read without an error.
 *   node tools/templates.mjs
 *
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const S = require(path.join(root, 'js/standard.js'));
const XLSX = require(path.join(root, 'js/vendor/xlsx.full.min.js'));
const jsyaml = require(path.join(root, 'js/vendor/js-yaml.min.js'));
const at = (...p) => path.join(root, ...p);
let ok = true;

/* ---- templates ---------------------------------------------------------------------------- */
const source = fs.readFileSync(at('templates/dataviz-template.yaml'), 'utf8');
const { std, issues } = S.read(jsyaml.load(source, { schema: jsyaml.CORE_SCHEMA }));
if (issues.length) { ok = false; issues.forEach((i) => console.log(`FAIL template: ${i.message}`)); }
fs.writeFileSync(at('templates/dataviz-template.json'), JSON.stringify(S.clean(std), null, 2) + '\n');
fs.writeFileSync(at('templates/dataviz-template.xlsx'), XLSX.write(S.toWorkbook(std, XLSX), { type: 'buffer', bookType: 'xlsx', compression: true }));
const tables = S.toTables(std);
fs.writeFileSync(at('templates/dataviz-template-items.csv'), S.toCsv(tables.items));
fs.writeFileSync(at('templates/dataviz-template-links.csv'), S.toCsv(tables.links));
console.log('templates/dataviz-template.{json,xlsx} and -items.csv, -links.csv written');

/* every carrier must read back to the same standard */
const same = (label, raw) => {
  const back = S.clean(S.read(raw).std);
  const good = JSON.stringify(back) === JSON.stringify(S.clean(std));
  console.log(`${good ? 'OK  ' : 'FAIL'} round trip through ${label}`);
  if (!good) { ok = false; console.log(JSON.stringify(back).slice(0, 400)); }
};
same('JSON', JSON.parse(fs.readFileSync(at('templates/dataviz-template.json'), 'utf8')));
same('Excel', S.parseFiles([{ name: 'x.xlsx', buffer: fs.readFileSync(at('templates/dataviz-template.xlsx')) }], { XLSX, jsyaml }));
same('YAML (written by the tool)', S.parseFiles([{ name: 'x.yaml', text: S.toYaml(std, jsyaml) }], { XLSX, jsyaml }));
same('all CSV tables', S.parseFiles(Object.entries(tables).map(([k, rows]) => ({ name: `x-${k === 'linkTypes' ? 'link-types' : k === 'types' ? 'item-types' : k}.csv`, text: S.toCsv(rows) })), { XLSX, jsyaml }));

/* ---- the example and the built-ins must be clean ------------------------------------------- */
const check = (file) => {
  const raw = S.parseFiles([{ name: file, text: fs.readFileSync(at(file), 'utf8') }], { XLSX, jsyaml });
  const errors = S.read(raw).issues.filter((i) => i.level === 'error');
  const known = file.endsWith('en18031-einfo.json'); // three duplicate ids in the source data, kept as they are
  console.log(`${errors.length && !known ? 'FAIL' : 'OK  '} ${file}${errors.length ? `: ${errors.length} error(s)${known ? ' (known)' : ''}` : ''}`);
  if (errors.length && !known) { ok = false; errors.forEach((e) => console.log(`       ${e.message}`)); }
};
check('examples/example.dataviz.yaml');
fs.readdirSync(at('standards')).filter((f) => f.endsWith('.json') && f !== 'index.json').forEach((f) => check(`standards/${f}`));

/* ---- format/index.html from docs/FORMAT.md --------------------------------------------------- */
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const inline = (s) => esc(s)
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, text, href) => `<a href="${href.replace(/^\.\.\/templates\//, '/templates/').replace(/^\.\.\/schema\//, '/schema/').replace(/^\.\.\/examples\//, '/examples/')}">${text}</a>`);
function markdown(md) {
  const out = []; const lines = md.split(/\r?\n/); let i = 0;
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  while (i < lines.length) {
    const line = lines[i];
    if (/^```/.test(line)) { const code = []; i++; while (i < lines.length && !/^```/.test(lines[i])) code.push(lines[i++]); i++; out.push(`<pre><code>${esc(code.join('\n'))}</code></pre>`); continue; }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) { out.push(`<h${h[1].length} id="${slug(h[2])}">${inline(h[2])}</h${h[1].length}>`); i++; continue; }
    if (/^\|/.test(line)) {
      const rows = []; while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]);
      const cells = (r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      out.push(`<div class="table-wrap"><table><thead><tr>${cells(rows[0]).map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${rows.slice(2).map((r) => `<tr>${cells(r).map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    // lists: an item goes on over the indented lines below it, until the next item or a blank line
    const listOf = (marker, tag) => {
      const items = [];
      while (i < lines.length) {
        if (marker.test(lines[i])) items.push(lines[i++].replace(marker, ''));
        else if (items.length && /^\s+\S/.test(lines[i]) && !/^\s*[-*]\s+/.test(lines[i])) items[items.length - 1] += ' ' + lines[i++].trim();
        else break;
      }
      out.push(`<${tag}>${items.map((x) => `<li>${inline(x)}</li>`).join('')}</${tag}>`);
    };
    if (/^\s*[-*]\s+/.test(line)) { listOf(/^\s*[-*]\s+/, 'ul'); continue; }
    if (/^\d+\.\s+/.test(line)) { listOf(/^\d+\.\s+/, 'ol'); continue; }
    if (/^>\s?/.test(line)) { const quote = []; while (i < lines.length && /^>\s?/.test(lines[i])) quote.push(lines[i++].replace(/^>\s?/, '')); out.push(`<blockquote><p>${inline(quote.join(' '))}</p></blockquote>`); continue; }
    if (line.trim() === '') { i++; continue; }
    const para = []; while (i < lines.length && lines[i].trim() !== '' && !/^(#|```|\||\s*[-*]\s|\d+\.\s)/.test(lines[i])) para.push(lines[i++]);
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return out.join('\n');
}
const shell = fs.readFileSync(at('tools/doc-page.html'), 'utf8');
const ACTIONS = `        <nav class="doc-actions" aria-label="Make a dataviz file">
            <a class="btn btn-primary" href="/builder/">Open the builder</a>
            <a class="btn" href="/view/">Open a dataviz file</a>
            <a class="btn" href="/templates/dataviz-template.xlsx" download>Excel template</a>
            <a class="btn" href="/templates/dataviz-template.yaml" download>YAML template</a>
            <a class="btn" href="/templates/ai-prompt.txt">AI prompt</a>
        </nav>`;
const DOCS = [
  { source: 'docs/FORMAT.md', path: 'format', title: 'The dataviz file format', subtitle: 'Make your own: by hand, in the builder or with an AI',
    description: 'The dataviz file format: a standard as items, links, types and filters, in JSON, YAML, Excel or CSV. Templates, an AI prompt and a JSON Schema to make your own.',
    actions: ACTIONS, footnote: '' },
  { source: 'DATA-LICENSE.md', path: 'licence', title: 'Licence of the graph data', subtitle: "The built-in graphs are CC BY 4.0; the standards remain their publishers'",
    description: "The built-in graph data of dataviz is licensed under CC BY 4.0. The standards it refers to remain their publishers', on their own terms.",
    actions: '', footnote: '' },
];
for (const d of DOCS) {
  const md = fs.readFileSync(at(d.source), 'utf8');
  const html = shell.replace(/\{\{(\w+)\}\}/g, (m, k) => ({ SOURCE: d.source, TITLE: d.title, SUBTITLE: d.subtitle, DESCRIPTION: d.description, PATH: d.path, ACTIONS: d.actions, FOOTNOTE: d.footnote }[k] ?? m))
    .replace('<!-- CONTENT -->', () => markdown(md.replace(/^# .*\n/, '')));
  fs.mkdirSync(at(d.path), { recursive: true });
  fs.writeFileSync(at(d.path, 'index.html'), html);
  console.log(`${d.path}/index.html written from ${d.source}`);
}

console.log(ok ? 'ALL GOOD' : 'PROBLEMS FOUND');
process.exit(ok ? 0 : 1);
