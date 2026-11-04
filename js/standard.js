/*!
 * dataviz - the standard format: read any carrier (JSON, YAML, Excel, CSV), check it, write it back,
 * turn it into a graph, pack it into a share link. Runs in the browser (global `DVStandard`) and in
 * Node (`require('./js/standard.js')`), with no dependency of its own: the YAML and Excel libraries
 * are passed in by the caller (js/vendor/js-yaml.min.js, js/vendor/xlsx.full.min.js).
 *
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * The format is described in docs/FORMAT.md and schema/dataviz-standard.schema.json. In short:
 *
 *   dataviz: 1                         format version
 *   id, title, subtitle, version, date, authors, url, licence, description
 *   layout: auto | saved | hierarchical | organic | grid | circle      direction: LR | TB | RL | BT
 *   types:      [{ id, label, color, shape, border, caption, assess, description }]
 *   linkTypes:  [{ id, label, color, style, arrow }]
 *   filters:    [{ id, label, mode: any | all | none, tags: [{ id, label }] }]
 *   items:      [{ id, label, title, type, parent, tags: [], text, url, x, y }]
 *   links:      [{ from, to, type, label }]
 *
 * read(raw) never throws on messy input: it returns { std, issues }, where `std` is always drawable
 * (duplicates, dangling parents and dangling links are left out of the graph) and `issues` says what
 * was wrong, as [{ level: 'error' | 'warning', message, table, row, id }].
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.DVStandard = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const FORMAT = 1;
  const LAYOUTS = ['auto', 'saved', 'hierarchical', 'organic', 'grid', 'circle'];
  const DIRECTIONS = ['LR', 'TB', 'RL', 'BT'];
  const SHAPES = ['round-rectangle', 'rectangle', 'ellipse', 'hexagon', 'diamond', 'triangle', 'octagon', 'tag', 'barrel'];
  const BORDERS = ['solid', 'dashed', 'dotted', 'double', 'none'];
  const ARROWS = ['triangle', 'none', 'square', 'circle', 'diamond', 'tee', 'vee'];
  const MODES = ['any', 'all', 'none'];
  const CAPTIONS = ['id', 'title', 'both'];
  const ASSESS = ['auto', 'yes', 'no'];

  /** Colours given to types that do not name one: distinct, readable with white or dark text. */
  const PALETTE = ['#0044aa', '#16a34a', '#7e22ce', '#c2410c', '#0891b2', '#be185d', '#4d7c0f', '#b45309', '#475569', '#1d4ed8'];
  const LINK_PALETTE = ['#475569', '#16a34a', '#7e22ce', '#c2410c', '#0891b2', '#be185d'];

  /* ---- small helpers ------------------------------------------------------------------- */
  const str = (v) => (v === undefined || v === null ? '' : String(v)).trim();
  const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
  const num = (v) => {
    if (v === '' || v === undefined || v === null) return undefined;
    const n = typeof v === 'number' ? v : Number(String(v).replace(',', '.'));
    return Number.isFinite(n) ? n : undefined;
  };
  const bool = (v) => {
    const s = str(v).toLowerCase();
    if (v === true || ['yes', 'y', 'true', '1', 'x', 'oui'].includes(s)) return 'yes';
    if (v === false || ['no', 'n', 'false', '0', 'non'].includes(s)) return 'no';
    return 'auto';
  };
  const list = (v) => {
    if (Array.isArray(v)) return v.map(str).filter(Boolean);
    return str(v).split(/[,;\n|]/).map((s) => s.trim()).filter(Boolean);
  };
  const oneOf = (v, allowed, fallback) => { const s = str(v).toLowerCase(); const hit = allowed.find((a) => a.toLowerCase() === s); return hit || fallback; };
  const color = (v) => {
    const s = str(v);
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s)) return s.toLowerCase();
    if (/^[0-9a-f]{6}$/i.test(s)) return '#' + s.toLowerCase();
    return '';
  };
  /** A file-name and storage-key friendly id: "EN 303 645 v3" -> "en-303-645-v3". */
  const slug = (s) => str(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

  /* ---- read: anything -> canonical standard + issues ------------------------------------- */

  /**
   * Coerce a parsed object (from JSON, YAML or the tables) into the canonical shape, then check it.
   * Accepts a bare array of cytoscape elements too (the data files of the built-in graphs, or a
   * cytoscape JSON export), which is mapped field by field.
   */
  function read(raw) {
    const issues = [];
    const add = (level, message, where) => issues.push({ level, message, ...(where || {}) });
    if (Array.isArray(raw) || (isObj(raw) && (Array.isArray(raw.nodes) || isObj(raw.elements)))) raw = fromCytoscape(raw);
    if (!isObj(raw)) {
      add('error', 'The file does not contain a standard (an object with items is expected).');
      raw = {};
    }
    // the first drafts of the format said "kinds" and "kind": still read, never written
    if (raw.types === undefined && raw.kinds !== undefined) raw = { ...raw, types: raw.kinds };
    if (raw.linkTypes === undefined && raw.linkKinds !== undefined) raw = { ...raw, linkTypes: raw.linkKinds };
    if (raw.dataviz !== undefined && num(raw.dataviz) > FORMAT) add('warning', `This file uses format version ${raw.dataviz}, and this page knows version ${FORMAT}. Some parts may be ignored.`);

    const std = {
      dataviz: FORMAT,
      id: slug(raw.id) || slug(raw.title) || 'standard',
      title: str(raw.title) || 'Untitled standard',
      subtitle: str(raw.subtitle),
      version: str(raw.version),
      date: str(raw.date instanceof Date ? raw.date.toISOString().slice(0, 10) : raw.date),
      authors: Array.isArray(raw.authors) ? raw.authors.map(str).filter(Boolean).join(', ') : str(raw.authors || raw.author),
      url: str(raw.url),
      licence: str(raw.licence || raw.license),
      description: str(raw.description),
      layout: oneOf(raw.layout, LAYOUTS, 'auto'),
      direction: oneOf(raw.direction, DIRECTIONS, 'LR'),
      types: [], linkTypes: [], filters: [], items: [], links: [],
    };
    if (raw.layout && std.layout === 'auto' && str(raw.layout).toLowerCase() !== 'auto') add('warning', `Unknown layout "${raw.layout}". Using auto. Possible values: ${LAYOUTS.join(', ')}.`, { table: 'about' });

    /* types */
    const typeIds = new Set();
    (Array.isArray(raw.types) ? raw.types : objectToList(raw.types)).forEach((k, i) => {
      if (!isObj(k)) return;
      const id = str(k.id);
      if (!id) { add('error', 'A type has no id.', { table: 'types', row: i + 1 }); return; }
      if (typeIds.has(id)) { add('error', `Type "${id}" is declared twice. The first one is kept.`, { table: 'types', row: i + 1, id }); return; }
      typeIds.add(id);
      if (k.color && !color(k.color)) add('warning', `Type "${id}": "${k.color}" is not a colour like #0044aa.`, { table: 'types', row: i + 1, id });
      std.types.push({
        id, label: str(k.label) || id, color: color(k.color),
        shape: oneOf(k.shape, SHAPES, 'round-rectangle'), border: oneOf(k.border, BORDERS, 'solid'),
        caption: oneOf(k.caption, CAPTIONS, 'id'), assess: bool(k.assess), description: str(k.description),
      });
    });

    /* link types */
    const linkTypeIds = new Set();
    (Array.isArray(raw.linkTypes) ? raw.linkTypes : objectToList(raw.linkTypes)).forEach((k, i) => {
      if (!isObj(k)) return;
      const id = str(k.id);
      if (!id) { add('error', 'A link type has no id.', { table: 'linkTypes', row: i + 1 }); return; }
      if (linkTypeIds.has(id)) { add('error', `Link type "${id}" is declared twice. The first one is kept.`, { table: 'linkTypes', row: i + 1, id }); return; }
      linkTypeIds.add(id);
      std.linkTypes.push({ id, label: str(k.label) || id, color: color(k.color), style: oneOf(k.style, ['solid', 'dashed', 'dotted'], 'solid'), arrow: oneOf(k.arrow, ARROWS, 'triangle') });
    });

    /* filters and their tags */
    const tagOwner = new Map(); // tag id -> filter id
    (Array.isArray(raw.filters) ? raw.filters : objectToList(raw.filters)).forEach((f, i) => {
      if (!isObj(f)) return;
      const id = str(f.id) || slug(f.label);
      if (!id) { add('error', 'A filter has no id.', { table: 'filters', row: i + 1 }); return; }
      if (std.filters.some((x) => x.id === id)) { add('error', `Filter "${id}" is declared twice. The first one is kept.`, { table: 'filters', row: i + 1, id }); return; }
      const filter = { id, label: str(f.label) || id, mode: oneOf(f.mode, MODES, 'any'), tags: [] };
      (Array.isArray(f.tags) ? f.tags : objectToList(f.tags)).forEach((t) => {
        const tag = isObj(t) ? { id: str(t.id), label: str(t.label) || str(t.id) } : { id: str(t), label: str(t) };
        if (!tag.id) return;
        if (tagOwner.has(tag.id)) { add('error', `Tag "${tag.id}" belongs to two filters (${tagOwner.get(tag.id)}, ${id}). Tags must be unique.`, { table: 'filters', id: tag.id }); return; }
        tagOwner.set(tag.id, id);
        filter.tags.push(tag);
      });
      std.filters.push(filter);
    });

    /* items */
    const itemIds = new Set();
    (Array.isArray(raw.items) ? raw.items : []).forEach((it, i) => {
      if (!isObj(it)) return;
      const where = { table: 'items', row: i + 1 };
      const id = str(it.id);
      if (!id) { add('error', 'An item has no id. It is left out.', where); return; }
      if (itemIds.has(id)) { add('error', `Item id "${id}" is used twice. Only the first one is drawn.`, { ...where, id }); return; }
      itemIds.add(id);
      const item = { id };
      const label = str(it.label); if (label && label !== id) item.label = label;
      const title = str(it.title); if (title) item.title = title;
      const type = str(it.type ?? it.kind); if (type) item.type = type;
      const parent = str(it.parent); if (parent) item.parent = parent;
      const tags = list(it.tags); if (tags.length) item.tags = [...new Set(tags)];
      const text = str(it.text); if (text) item.text = text;
      const url = str(it.url); if (url) item.url = url;
      const x = num(it.x); const y = num(it.y);
      if (x !== undefined && y !== undefined) { item.x = Math.round(x * 10) / 10; item.y = Math.round(y * 10) / 10; }
      else if ((x === undefined) !== (y === undefined)) add('warning', `Item "${id}" has only one of x and y. Its position is ignored.`, { ...where, id });
      std.items.push(item);
    });

    /* links */
    const seen = new Set();
    (Array.isArray(raw.links) ? raw.links : []).forEach((l, i) => {
      if (!isObj(l)) return;
      const link = { from: str(l.from), to: str(l.to) };
      const type = str(l.type ?? l.kind); if (type) link.type = type;
      const label = str(l.label); if (label) link.label = label;
      const where = { table: 'links', row: i + 1 };
      if (!link.from || !link.to) { add('error', 'A link needs both "from" and "to". It is left out.', where); return; }
      const key = `${link.from}\u0000${link.to}\u0000${link.type || ''}\u0000${link.label || ''}`;
      if (seen.has(key)) { add('warning', `The link ${link.from} → ${link.to} is listed twice.`, where); return; }
      seen.add(key);
      std.links.push(link);
    });

    check(std).forEach((i) => issues.push(i));
    return { std, issues };
  }

  /** `{ a: {...}, b: {...} }` -> `[{ id: 'a', ... }, { id: 'b', ... }]` (YAML authors like maps). */
  function objectToList(v) {
    if (!isObj(v)) return [];
    return Object.entries(v).map(([id, val]) => (isObj(val) ? { id, ...val } : { id, label: val }));
  }

  /**
   * Semantic checks on a canonical standard. Adds the types and tags the items use but nobody
   * declared (so the graph and the filters still work) and reports them.
   */
  function check(std) {
    const issues = [];
    const add = (level, message, where) => issues.push({ level, message, ...(where || {}) });
    const ids = new Map(std.items.map((it, i) => [it.id, i]));

    // types used but not declared
    const declared = new Set(std.types.map((k) => k.id));
    const usedTypes = [...new Set(std.items.map((it) => it.type).filter(Boolean))];
    usedTypes.filter((k) => !declared.has(k)).forEach((k) => {
      std.types.push({ id: k, label: k, color: '', shape: 'round-rectangle', border: 'solid', caption: 'id', assess: 'auto', description: '' });
      add('warning', `Type "${k}" is used by items but not declared. It was added with default looks.`, { table: 'types', id: k });
    });
    std.types.forEach((k, i) => { if (!k.color) k.autoColor = PALETTE[i % PALETTE.length]; });

    const declaredLinkTypes = new Set(std.linkTypes.map((k) => k.id));
    [...new Set(std.links.map((l) => l.type).filter(Boolean))].filter((k) => !declaredLinkTypes.has(k)).forEach((k) => {
      std.linkTypes.push({ id: k, label: k, color: '', style: 'solid', arrow: 'triangle' });
      add('warning', `Link type "${k}" is used but not declared. It was added with default looks.`, { table: 'linkTypes', id: k });
    });
    std.linkTypes.forEach((k, i) => { if (!k.color) k.autoColor = LINK_PALETTE[i % LINK_PALETTE.length]; });

    // tags used but not declared: collected in a "Tags" filter
    const known = new Set(std.filters.flatMap((f) => f.tags.map((t) => t.id)));
    const stray = [...new Set(std.items.flatMap((it) => it.tags || []))].filter((t) => !known.has(t));
    if (stray.length) {
      let bucket = std.filters.find((f) => f.id === 'tags');
      if (!bucket) { bucket = { id: 'tags', label: 'Tags', mode: 'any', tags: [] }; std.filters.push(bucket); }
      stray.forEach((t) => bucket.tags.push({ id: t, label: t }));
      add('warning', `${stray.length} tag${stray.length > 1 ? 's are' : ' is'} used but not declared in a filter (${stray.slice(0, 6).join(', ')}${stray.length > 6 ? ', ...' : ''}). They were added to a "Tags" filter.`, { table: 'filters' });
    }

    // parents: must exist, must not loop
    std.items.forEach((it, i) => {
      if (!it.parent) return;
      if (it.parent === it.id) { add('error', `Item "${it.id}" is its own parent. The parent is ignored.`, { table: 'items', row: i + 1, id: it.id }); it.brokenParent = true; return; }
      if (!ids.has(it.parent)) { add('error', `Item "${it.id}": parent "${it.parent}" does not exist. The item is drawn at the top level.`, { table: 'items', row: i + 1, id: it.id }); it.brokenParent = true; }
    });
    const byId = new Map(std.items.map((it) => [it.id, it]));
    std.items.forEach((it, i) => {
      const path = new Set([it.id]);
      let p = it.brokenParent ? null : byId.get(it.parent);
      while (p) {
        if (path.has(p.id)) { add('error', `Items "${it.id}" and "${p.id}" are each other's ancestors (a loop). The parent of "${it.id}" is ignored.`, { table: 'items', row: i + 1, id: it.id }); it.brokenParent = true; break; }
        path.add(p.id);
        p = p.brokenParent ? null : byId.get(p.parent);
      }
    });

    // links: both ends must exist
    std.links.forEach((l, i) => {
      const missing = [l.from, l.to].filter((x) => !ids.has(x));
      if (missing.length) { add('error', `Link ${l.from} → ${l.to}: no item "${missing.join('", "')}". The link is left out.`, { table: 'links', row: i + 1 }); l.broken = true; }
      else if (l.from === l.to) add('warning', `Link ${l.from} → ${l.to} points to itself.`, { table: 'links', row: i + 1 });
    });

    // positions: all or nothing for the drawn leaves
    const parents = new Set(std.items.filter((it) => it.parent && !it.brokenParent).map((it) => it.parent));
    const leaves = std.items.filter((it) => !parents.has(it.id));
    const placed = leaves.filter((it) => it.x !== undefined);
    if (placed.length && placed.length < leaves.length) add('warning', `${leaves.length - placed.length} of ${leaves.length} items have no saved position. The automatic layout places them.`, { table: 'items' });
    if (std.layout === 'saved' && !placed.length) add('warning', 'The layout is "saved" but no item has a position. The organic layout is used.', { table: 'about' });

    if (!std.items.length) add('error', 'The standard has no items yet.', { table: 'items' });
    return issues;
  }

  /** Strip the helper fields check() adds, for writing back out. */
  function clean(std) {
    const out = {
      dataviz: FORMAT, id: std.id, title: std.title,
      ...(std.subtitle && { subtitle: std.subtitle }), ...(std.version && { version: std.version }), ...(std.date && { date: std.date }),
      ...(std.authors && { authors: std.authors }), ...(std.url && { url: std.url }), ...(std.licence && { licence: std.licence }),
      ...(std.description && { description: std.description }),
      layout: std.layout, ...(std.layout === 'hierarchical' && { direction: std.direction }),
      types: std.types.map((k) => drop({ id: k.id, label: k.label !== k.id ? k.label : '', color: k.color, shape: k.shape !== 'round-rectangle' ? k.shape : '', border: k.border !== 'solid' ? k.border : '', caption: k.caption !== 'id' ? k.caption : '', assess: k.assess !== 'auto' ? k.assess : '', description: k.description })),
      linkTypes: std.linkTypes.map((k) => drop({ id: k.id, label: k.label !== k.id ? k.label : '', color: k.color, style: k.style !== 'solid' ? k.style : '', arrow: k.arrow !== 'triangle' ? k.arrow : '' })),
      filters: std.filters.map((f) => ({ id: f.id, label: f.label, ...(f.mode !== 'any' && { mode: f.mode }), tags: f.tags.map((t) => (t.label && t.label !== t.id ? { id: t.id, label: t.label } : { id: t.id })) })),
      items: std.items.map((it) => drop({ id: it.id, label: it.label, title: it.title, type: it.type, parent: it.parent, tags: it.tags, text: it.text, url: it.url, x: it.x, y: it.y })),
      links: std.links.map((l) => drop({ from: l.from, to: l.to, type: l.type, label: l.label })),
    };
    ['types', 'linkTypes', 'filters', 'links'].forEach((k) => { if (!out[k].length) delete out[k]; });
    return out;
  }
  const drop = (o) => { Object.keys(o).forEach((k) => { if (o[k] === '' || o[k] === undefined || (Array.isArray(o[k]) && !o[k].length)) delete o[k]; }); return o; };

  /* ---- cytoscape elements (the built-in data files, cytoscape exports) -> raw standard ---- */
  function fromCytoscape(input) {
    let elements = input;
    if (isObj(input) && isObj(input.elements)) elements = input.elements;
    const nodes = Array.isArray(elements) ? elements.filter((e) => e && e.data && e.data.source === undefined) : (elements.nodes || []);
    const edges = Array.isArray(elements) ? elements.filter((e) => e && e.data && e.data.source !== undefined) : (elements.edges || []);
    const valid = (s) => { const v = str(s); return v && v !== 'nan' ? v : ''; };
    return {
      title: 'Imported graph',
      items: nodes.map((n) => {
        const d = n.data || {};
        return {
          id: d.id, label: valid(d.label) !== str(d.id) ? valid(d.label) : '',
          title: valid(d.display_title) || valid(d.title), type: valid(d.type) || valid(d.kind),
          parent: valid(d.parent), text: valid(d.info) || valid(d.text) || valid(d.description),
          x: n.position && n.position.x, y: n.position && n.position.y,
        };
      }),
      links: edges.map((e) => ({ from: e.data.source, to: e.data.target, type: valid(e.data.type) || valid(e.data.kind), label: valid(e.data.label) || valid(e.data.documentation) })),
    };
  }

  /* ---- graph: canonical standard -> cytoscape elements and stylesheet ------------------- */

  function captionOf(std, it) {
    if (it.label) return it.label;
    const type = std.types.find((k) => k.id === it.type);
    const mode = type ? type.caption : 'id';
    if (mode === 'title' && it.title) return it.title;
    if (mode === 'both' && it.title && it.title !== it.id) return `${it.id} ${it.title}`;
    return it.id;
  }

  function toElements(std) {
    const typeIndex = new Map(std.types.map((k, i) => [k.id, i]));
    const linkTypeIndex = new Map(std.linkTypes.map((k, i) => [k.id, i]));
    const nodes = std.items.map((it) => {
      const data = { id: it.id, label: captionOf(std, it), title: it.title || it.label || it.id, type: it.type || '', tags: it.tags || [], text: it.text || '', url: it.url || '' };
      if (it.parent && !it.brokenParent) data.parent = it.parent;
      const el = { group: 'nodes', data, classes: it.type && typeIndex.has(it.type) ? `k${typeIndex.get(it.type)}` : 'k-none' };
      if (it.x !== undefined) el.position = { x: it.x, y: it.y };
      return el;
    });
    const typeLabel = new Map(std.linkTypes.map((k) => [k.id, k.label]));
    const edges = std.links.filter((l) => !l.broken).map((l, i) => ({
      group: 'edges',
      data: { id: `link-${i}`, source: l.from, target: l.to, type: l.type || '', typeLabel: typeLabel.get(l.type) || '', label: l.label || typeLabel.get(l.type) || '' },
      classes: l.type && linkTypeIndex.has(l.type) ? `lk${linkTypeIndex.get(l.type)}` : 'lk-none',
    }));
    return [...nodes, ...edges];
  }

  /** Relative luminance of a #rrggbb colour, to pick a readable text colour on top of it. */
  function luminance(hex) {
    const h = hex.length === 4 ? hex.replace(/^#(.)(.)(.)$/, '#$1$1$2$2$3$3') : hex;
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  const textOn = (hex) => (luminance(hex) > 0.4 ? '#0f172a' : '#ffffff');

  /** The cytoscape stylesheet for a standard: generic looks plus one rule per type and link type. */
  function stylesheet(std, opts) {
    const font = (opts && opts.font) || 'Inter, system-ui, sans-serif';
    const showLinkLabels = Boolean(opts && opts.linkLabels);
    const width = (n) => Math.min(190, Math.max(36, String(n.data('label')).length * 6.6 + 18));
    const height = (n) => (String(n.data('label')).length * 6.6 + 18 > 190 ? 44 : 28);
    const rules = [
      { selector: 'node', style: {
        label: 'data(label)', 'font-family': font, 'font-size': 11, color: '#0f172a',
        'text-valign': 'center', 'text-halign': 'center', 'text-wrap': 'wrap', 'text-max-width': 176,
        shape: 'round-rectangle', width, height, 'background-color': '#ffffff', 'border-width': 1.5, 'border-color': '#0044aa',
      } },
      { selector: 'node:parent', style: {
        'text-valign': 'top', 'text-halign': 'center', 'font-size': 13, 'font-weight': 600, color: '#0044aa',
        'background-color': '#0044aa', 'background-opacity': 0.05, 'border-width': 1, padding: 14, shape: 'round-rectangle',
      } },
      { selector: 'edge', style: {
        width: 1.5, 'line-color': '#94a3b8', 'target-arrow-color': '#94a3b8', 'target-arrow-shape': 'triangle',
        'curve-style': 'bezier', 'arrow-scale': 0.9,
      } },
    ];
    std.types.forEach((k, i) => {
      const c = k.color || k.autoColor;
      rules.push({ selector: `node.k${i}:childless`, style: {
        'background-color': c, color: textOn(c), 'border-color': c, shape: k.shape,
        'border-style': k.border === 'none' ? 'solid' : k.border, 'border-width': k.border === 'none' ? 0 : (k.border === 'double' ? 4 : 1.5),
      } });
      // dashed or dotted types read as "optional": a light fill with the colour on the border
      if (k.border === 'dashed' || k.border === 'dotted') rules.push({ selector: `node.k${i}:childless`, style: { 'background-color': '#ffffff', color: c, 'border-width': 2 } });
      rules.push({ selector: `node.k${i}:parent`, style: { 'background-color': c, 'border-color': c, color: c, 'border-style': k.border === 'none' ? 'solid' : k.border } });
    });
    std.linkTypes.forEach((k, i) => {
      const c = k.color || k.autoColor;
      rules.push({ selector: `edge.lk${i}`, style: { 'line-color': c, 'target-arrow-color': c, 'line-style': k.style, 'target-arrow-shape': k.arrow } });
    });
    if (showLinkLabels) rules.push({ selector: 'edge[label != ""]', style: { label: 'data(label)', 'font-family': font, 'font-size': 8, color: '#64748b', 'text-rotation': 'autorotate', 'text-wrap': 'wrap', 'text-max-width': 140, 'text-background-color': '#ffffff', 'text-background-opacity': 0.85, 'text-background-padding': 1 } });
    rules.push(
      { selector: '.faded', style: { opacity: 0.18 } },
      { selector: 'node.focus', style: { 'border-width': 3, 'border-color': '#217aff', 'z-index': 999 } },
      { selector: 'node.match', style: { 'underlay-color': '#facc15', 'underlay-opacity': 0.55, 'underlay-padding': 5 } },
      { selector: 'edge.focus', style: { width: 2.5, 'z-index': 999 } },
    );
    return rules;
  }

  /** Cytoscape layout options for the standard's layout choice. */
  function layoutOptions(std, name, cy) {
    const choice = name || std.layout;
    const hasPositions = std.items.some((it) => it.x !== undefined);
    const resolved = choice === 'auto' ? (hasPositions ? 'saved' : 'organic') : choice;
    const organic = { name: 'cose-bilkent', padding: 30, idealEdgeLength: 60, nestingFactor: 0.1, gravityRangeCompound: 2, nodeDimensionsIncludeLabels: true, animate: false, randomize: true };
    if (resolved === 'saved') {
      if (!hasPositions) return organic;
      const all = cy ? cy.nodes(':childless').every((n) => std.items.some((it) => it.id === n.id() && it.x !== undefined)) : true;
      return all ? { name: 'preset', fit: true, padding: 30 } : { ...organic, randomize: false };
    }
    if (resolved === 'hierarchical') return { name: 'dagre', rankDir: std.direction || 'LR', rankSep: 120, nodeSep: 30, padding: 30, animate: false };
    if (resolved === 'grid') return { name: 'grid', padding: 30, avoidOverlap: true, nodeDimensionsIncludeLabels: true };
    if (resolved === 'circle') return { name: 'circle', padding: 30, avoidOverlap: true, nodeDimensionsIncludeLabels: true };
    return organic;
  }

  /* ---- item text: a little Markdown, always escaped ------------------------------------- */
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function inline(s) {
    return esc(s)
      .replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/(^|[\s(])((?:https?:\/\/)[^\s<)]+)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }
  /** Paragraphs (one per line), "- " or "* " bullets, **bold**, `code`, [links](https://...). */
  function textToHtml(text) {
    let html = ''; let inList = false;
    String(text || '').split('\n').map((l) => l.trim()).filter(Boolean).forEach((line) => {
      const bullet = line.match(/^[-*•]\s+(.*)$/);
      if (bullet) { if (!inList) { html += '<ul>'; inList = true; } html += `<li>${inline(bullet[1])}</li>`; return; }
      if (inList) { html += '</ul>'; inList = false; }
      html += `<p>${inline(line)}</p>`;
    });
    return html + (inList ? '</ul>' : '');
  }

  /* ---- tables: the spreadsheet (Excel, CSV) view of a standard ----------------------------- */

  /** Columns of each table, in order, with the header the spreadsheet shows. */
  const TABLES = {
    about: { sheet: 'About', columns: ['field', 'value'] },
    types: { sheet: 'Item types', columns: ['id', 'label', 'color', 'shape', 'border', 'caption', 'assess', 'description'] },
    linkTypes: { sheet: 'Link types', columns: ['id', 'label', 'color', 'style', 'arrow'] },
    filters: { sheet: 'Filters', columns: ['filter', 'filter label', 'mode', 'tag', 'tag label'] },
    items: { sheet: 'Items', columns: ['id', 'title', 'type', 'parent', 'tags', 'text', 'label', 'url', 'x', 'y'] },
    links: { sheet: 'Links', columns: ['from', 'to', 'type', 'label'] },
  };
  const ABOUT_FIELDS = ['dataviz', 'id', 'title', 'subtitle', 'version', 'date', 'authors', 'url', 'licence', 'description', 'layout', 'direction'];

  /** Header spellings people use, per table, mapped to ours (lower case, spaces, dashes and underscores removed). */
  const ALIASES = {
    items: {
      identifier: 'id', ref: 'id', reference: 'id', key: 'id', code: 'id', number: 'id', no: 'id', clauseid: 'id',
      name: 'title', heading: 'title', requirementtitle: 'title',
      type: 'type', kind: 'type', category: 'type', class: 'type',
      parentid: 'parent', group: 'parent', chapter: 'parent', section: 'parent',
      tag: 'tags', applies: 'tags', appliesto: 'tags',
      description: 'text', requirement: 'text', details: 'text', info: 'text', body: 'text',
      caption: 'label', shortlabel: 'label', link: 'url', href: 'url', source: 'url',
    },
    links: { source: 'from', target: 'to', fromid: 'from', toid: 'to', type: 'type', kind: 'type', relation: 'type', linktype: 'type', linkkind: 'type', name: 'label' },
    types: { colour: 'color', name: 'label', assessable: 'assess', shows: 'caption' },
    linkTypes: { colour: 'color', name: 'label', line: 'style' },
    filters: { filterid: 'filter', group: 'filter', grouplabel: 'filterlabel', tagid: 'tag', label: 'taglabel', name: 'taglabel' },
    about: { property: 'field', key: 'field', name: 'field' },
  };
  const ABOUT_ALIASES = { license: 'licence', author: 'authors', name: 'title', format: 'dataviz', version: 'version' };
  const headerKey = (h) => str(h).toLowerCase().replace(/[\s_.-]+/g, '');
  const norm = (h, table) => { const k = headerKey(h); return (ALIASES[table] || {})[k] || k; };

  /** Canonical standard -> { about, types, linkTypes, filters, items, links }, each an array of rows (first row = headers). */
  function toTables(std) {
    const s = clean(std);
    const about = [['field', 'value'], ...ABOUT_FIELDS.map((f) => [f, f === 'dataviz' ? FORMAT : (s[f] ?? (f === 'direction' ? std.direction : ''))])];
    const rows = (key, objs, pick) => [TABLES[key].columns, ...objs.map(pick)];
    return {
      about,
      types: rows('types', std.types, (k) => [k.id, k.label, k.color, k.shape, k.border, k.caption, k.assess, k.description]),
      linkTypes: rows('linkTypes', std.linkTypes, (k) => [k.id, k.label, k.color, k.style, k.arrow]),
      filters: [TABLES.filters.columns, ...std.filters.flatMap((f) => f.tags.map((t) => [f.id, f.label, f.mode, t.id, t.label]))],
      items: rows('items', s.items, (it) => [it.id, it.title || '', it.type || '', it.parent || '', (it.tags || []).join(', '), it.text || '', it.label || '', it.url || '', it.x ?? '', it.y ?? '']),
      links: rows('links', s.links || [], (l) => [l.from, l.to, l.type || '', l.label || '']),
    };
  }

  /** Rows (first row = headers, any column order, any known spelling) -> array of objects keyed by our names. */
  function rowsToObjects(rows, table) {
    const clean = (rows || []).filter((r) => Array.isArray(r) && r.some((c) => str(c) !== ''));
    if (!clean.length) return [];
    const headers = clean[0].map((h) => norm(h, table));
    return clean.slice(1).filter((r) => !str(r[0]).startsWith('#')).map((r) => {
      const o = {};
      headers.forEach((h, i) => { if (h && r[i] !== undefined && r[i] !== null && str(r[i]) !== '') o[h] = r[i]; });
      return o;
    });
  }

  /** Which table a set of rows is, from its headers (for CSV files and unnamed sheets). */
  function guessTable(rows, name) {
    const n = slug(name || '');
    if (/link-?(types?|kinds?)|relations?/.test(n)) return 'linkTypes';
    if (/^(.*-)?(types?|kinds?)(-.*)?$/.test(n)) return 'types';
    if (/about|meta/.test(n)) return 'about';
    if (/filters?|tags?$/.test(n)) return 'filters';
    if (/links?|edges?|dependenc/.test(n)) return 'links';
    if (/items?|nodes?|requirements?|provisions?/.test(n)) return 'items';
    const first = (rows || [])[0] || [];
    const h = new Set([...first.map(headerKey), ...first.map((x) => norm(x, 'items')), ...first.map((x) => norm(x, 'links'))]);
    if (h.has('from') && h.has('to')) return 'links';
    if (h.has('filter') && h.has('tag')) return 'filters';
    if (h.has('field') && h.has('value')) return 'about';
    if (h.has('id') && (h.has('parent') || h.has('title') || h.has('text') || h.has('tags'))) return 'items';
    if (h.has('id') && (h.has('shape') || h.has('caption') || h.has('assess') || h.has('border'))) return 'types';
    if (h.has('id') && (h.has('arrow') || h.has('style'))) return 'linkTypes';
    if (h.has('id')) return 'items';
    return null;
  }

  /** { about?, types?, linkTypes?, filters?, items?, links? } (rows) -> raw standard for read(). */
  function fromTables(tables) {
    const raw = {};
    rowsToObjects(tables.about, 'about').forEach((r) => { const k = headerKey(r.field); const f = ABOUT_ALIASES[k] || k; if (f && ABOUT_FIELDS.includes(f)) raw[f] = r.value; });
    if (tables.types) raw.types = rowsToObjects(tables.types, 'types');
    if (tables.linkTypes) raw.linkTypes = rowsToObjects(tables.linkTypes, 'linkTypes');
    if (tables.filters) {
      const filters = [];
      rowsToObjects(tables.filters, 'filters').forEach((r) => {
        const id = str(r.filter) || slug(r.filterlabel);
        if (!id) return;
        let f = filters.find((x) => x.id === id);
        if (!f) { f = { id, label: str(r.filterlabel) || id, mode: r.mode, tags: [] }; filters.push(f); }
        if (!f.mode && r.mode) f.mode = r.mode;
        if (str(r.tag)) f.tags.push({ id: str(r.tag), label: str(r.taglabel) || str(r.tag) });
      });
      raw.filters = filters;
    }
    raw.items = rowsToObjects(tables.items, 'items');
    raw.links = rowsToObjects(tables.links, 'links');
    return raw;
  }

  /* ---- CSV ------------------------------------------------------------------------------ */
  function parseCsv(text) {
    text = String(text || '').replace(/^﻿/, '');
    const firstLine = text.split(/\r?\n/, 1)[0] || '';
    const counts = [',', ';', '\t'].map((d) => [d, firstLine.split(d).length]);
    const sep = counts.sort((a, b) => b[1] - a[1])[0][0];
    const rows = []; let row = []; let cell = ''; let quoted = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (quoted) {
        if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
        else if (c === '"') quoted = false;
        else cell += c;
      } else if (c === '"' && cell === '') quoted = true;
      else if (c === sep) { row.push(cell); cell = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(cell); rows.push(row); row = []; cell = '';
      } else cell += c;
    }
    if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
    return rows;
  }
  function toCsv(rows) {
    const cell = (v) => { const s = String(v ?? ''); return /[",\n\r;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
    return '﻿' + rows.map((r) => r.map(cell).join(',')).join('\r\n') + '\r\n';
  }

  /* ---- Excel (SheetJS passed in) ---------------------------------------------------------- */
  const README_ROWS = [
    ['dataviz standard workbook'],
    [''],
    ['Fill in the sheets, then open the file in the dataviz builder or viewer (drop it on the page). Nothing is uploaded: the file is read in your browser.'],
    [''],
    ['Sheet', 'What it holds'],
    ['About', 'One row per field: title, version, authors, licence, layout (auto, saved, hierarchical, organic, grid, circle), direction (LR, TB, RL, BT).'],
    ['Item types', 'The item types (chapter, requirement, recommendation...). color as #rrggbb. shape: round-rectangle, rectangle, ellipse, hexagon, diamond, triangle, octagon, tag, barrel. border: solid, dashed, dotted, double, none. caption: id, title or both (what the node shows). assess: yes, no, or empty (= items without children).'],
    ['Link types', 'The link types (depends on, maps to...). style: solid, dashed, dotted. arrow: triangle, none, square, circle, diamond, tee, vee.'],
    ['Filters', 'One row per tag. Tags with the same filter id form one filter in the sidebar. mode: any (show items with any ticked tag), all (items with every ticked tag), none (hide items with a ticked tag).'],
    ['Items', 'One row per item. Only id is required. parent = the id of the item that contains it (a chapter...). tags: comma-separated tag ids. text: the description, one paragraph per line, "- " for bullets. x, y: saved position (the builder fills them).'],
    ['Links', 'One row per arrow: from (item id), to (item id), type (a link type id), label (shown on the arrow).'],
    [''],
    ['Rows whose first cell starts with # are ignored. Column headers can be in any order, and extra columns are ignored.'],
    ['Format reference: docs/FORMAT.md at https://github.com/cetome/dataviz'],
  ];
  function toWorkbook(std, XLSX) {
    const t = toTables(std);
    const wb = XLSX.utils.book_new();
    const add = (rows, name, widths) => {
      const ws = XLSX.utils.aoa_to_sheet(rows);
      ws['!cols'] = widths.map((w) => ({ wch: w }));
      XLSX.utils.book_append_sheet(wb, ws, name);
    };
    add(README_ROWS, 'Read me', [14, 120]);
    add(t.about, TABLES.about.sheet, [14, 80]);
    add(t.types, TABLES.types.sheet, [18, 26, 10, 16, 10, 10, 8, 40]);
    add(t.linkTypes, TABLES.linkTypes.sheet, [18, 26, 10, 10, 10]);
    add(t.filters, TABLES.filters.sheet, [16, 24, 8, 16, 40]);
    add(t.items, TABLES.items.sheet, [18, 40, 16, 16, 20, 80, 16, 30, 8, 8]);
    add(t.links, TABLES.links.sheet, [18, 18, 16, 40]);
    return wb;
  }
  function fromWorkbook(wb, XLSX) {
    const tables = {};
    wb.SheetNames.forEach((name) => {
      const rows = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, raw: true, defval: '', blankrows: false });
      if (/^read ?me$/i.test(name.trim())) return;
      const key = guessTable(rows, name);
      if (key && !tables[key]) tables[key] = rows;
    });
    return fromTables(tables);
  }

  /* ---- YAML (js-yaml passed in) ------------------------------------------------------------ */
  function toYaml(std, jsyaml) {
    const head = `# dataviz standard, format ${FORMAT}. Reference: docs/FORMAT.md\n# Open this file in the dataviz builder or viewer. Nothing is uploaded.\n`;
    return head + jsyaml.dump(clean(std), { lineWidth: 120, noRefs: true, quotingType: '"', sortKeys: false });
  }

  /* ---- any file -> raw ---------------------------------------------------------------------- */

  /**
   * Parse files dropped or picked by the user: [{ name, text?, buffer? }]. One JSON, YAML or Excel
   * file, or one or more CSV files (one per table, told apart by name and headers). `libs` holds
   * `{ XLSX, jsyaml }`. Returns a raw object for read(), or throws an Error with a readable message.
   */
  function parseFiles(files, libs) {
    if (!files.length) throw new Error('No file.');
    const ext = (f) => (f.name.match(/\.([a-z0-9]+)$/i) || [, ''])[1].toLowerCase();
    const csv = files.filter((f) => ['csv', 'tsv', 'txt'].includes(ext(f)));
    if (csv.length && csv.length === files.length) {
      const tables = {};
      csv.forEach((f) => { const rows = parseCsv(f.text); const key = guessTable(rows, f.name.replace(/\.[^.]+$/, '')); if (key) tables[key] = rows; });
      if (!tables.items) throw new Error('None of the CSV files is an items table (a header row with at least an "id" column is expected).');
      const raw = fromTables(tables);
      if (!raw.title) raw.title = csv[0].name.replace(/\.[^.]+$/, '').replace(/[-_]?(items|links|types|filters|about)$/i, '') || 'Imported standard';
      return raw;
    }
    if (files.length > 1) throw new Error('Open one JSON, YAML or Excel file, or several CSV files (one per table).');
    const f = files[0];
    const e = ext(f);
    if (['pdf', 'doc', 'docx', 'odt', 'rtf', 'html', 'htm'].includes(e)) {
      throw new Error(`A .${e} file is a document, not a dataviz file: dataviz cannot read the standard itself. Turn it into a dataviz file first: with an AI assistant and our prompt, from a template (Excel, YAML...), or in the builder.`);
    }
    if (['xlsx', 'xlsm', 'xls', 'ods', 'xltx'].includes(e)) {
      if (!libs || !libs.XLSX) throw new Error('The spreadsheet reader is not loaded.');
      const raw = fromWorkbook(libs.XLSX.read(f.buffer, { type: 'array' }), libs.XLSX);
      if (!raw.items.length) throw new Error('No "Items" sheet with an "id" column was found in this workbook.');
      if (!raw.title) raw.title = f.name.replace(/\.[^.]+$/, '');
      return raw;
    }
    const text = f.text !== undefined ? f.text : new TextDecoder().decode(f.buffer);
    if (e === 'json' || /^\s*[[{]/.test(text)) {
      try { return JSON.parse(text); } catch (err) { throw new Error(`This JSON file cannot be read: ${err.message}`); }
    }
    if (['yaml', 'yml'].includes(e) || /^\s*(#|dataviz:|title:|id:)/m.test(text)) {
      if (!libs || !libs.jsyaml) throw new Error('The YAML reader is not loaded.');
      try { return libs.jsyaml.load(text, { schema: libs.jsyaml.CORE_SCHEMA }); } catch (err) { throw new Error(`This YAML file cannot be read: ${err.reason || err.message}${err.mark ? ` (line ${err.mark.line + 1})` : ''}`); }
    }
    throw new Error(`Files of type .${e || '?'} are not supported. Use JSON, YAML, Excel (.xlsx) or CSV.`);
  }

  /* ---- share links: the standard itself, compressed, in the URL fragment ------------------- */
  // The fragment (#...) never reaches the server: the link carries the data, nobody stores it.
  const b64url = (bytes) => {
    let bin = ''; const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };
  const unb64url = (s) => { const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)); const out = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i); return out; };
  async function pipe(bytes, stream) { return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer()); }
  async function encodeShare(std) {
    const bytes = new TextEncoder().encode(JSON.stringify(clean(std)));
    return b64url(await pipe(bytes, new CompressionStream('deflate-raw')));
  }
  async function decodeShare(code) {
    const bytes = await pipe(unb64url(code), new DecompressionStream('deflate-raw'));
    return JSON.parse(new TextDecoder().decode(bytes));
  }

  return {
    FORMAT, LAYOUTS, DIRECTIONS, SHAPES, BORDERS, ARROWS, MODES, CAPTIONS, ASSESS, PALETTE, TABLES,
    read, check, clean, slug, fromCytoscape, toElements, stylesheet, layoutOptions, captionOf, textOn, textToHtml,
    toTables, fromTables, guessTable, parseCsv, toCsv, toWorkbook, fromWorkbook, toYaml, parseFiles, encodeShare, decodeShare,
  };
});
