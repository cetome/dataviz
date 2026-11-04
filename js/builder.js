/*!
 * dataviz - the standard builder (/builder/): make or edit a standard in the dataviz format, with a
 * live preview, then export it (JSON, YAML, Excel, CSV), share it as a link or open it in the viewer.
 *
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * The document being edited (`doc`) is a canonical standard (DVStandard.clean). Every change goes
 * through commit(), which keeps the undo history, re-checks the standard, refreshes the preview and
 * keeps the standard in this browser (DVLibrary). Nothing is sent anywhere.
 */
(function () {
  'use strict';
  const { $, $$, escapeHtml: esc } = DV;
  const S = window.DVStandard;
  const io = window.DVio;
  const lib = window.DVLibrary;
  const LAST = 'dataviz:builder:last';

  /* ---- the document ------------------------------------------------------------------------ */
  let doc = null;
  let checked = { std: null, issues: [] };
  let openIssues = [];          // what read() fixed when the file was opened
  let tab = 'items';
  let selected = null;          // id of the item in the form
  let itemFilter = '';
  let linkFilter = '';
  const past = []; const future = [];

  const BLANK = () => ({
    dataviz: 1, id: lib.freeId('my-standard'), title: 'My standard', layout: 'auto',
    types: [
      { id: 'chapter', label: 'Chapter', color: '#475569', caption: 'both', assess: 'no' },
      { id: 'requirement', label: 'Requirement', color: '#0044aa' },
      { id: 'recommendation', label: 'Recommendation', color: '#0044aa', border: 'dashed' },
    ],
    linkTypes: [{ id: 'depends-on', label: 'Depends on' }],
    filters: [],
    items: [
      { id: '1', title: 'First chapter', type: 'chapter' },
      { id: '1.1', title: 'First requirement', type: 'requirement', parent: '1', text: 'What the requirement asks for.\n- one paragraph per line\n- "- " starts a bullet' },
      { id: '1.2', title: 'Second requirement', type: 'requirement', parent: '1' },
    ],
    links: [{ from: '1.2', to: '1.1', type: 'depends-on' }],
  });

  /** Anything (raw file content) -> canonical document, keeping the issues read() found. */
  function load(raw, source, keepId) {
    const { std, issues } = S.read(raw);
    doc = S.clean(std);
    ['types', 'linkTypes', 'filters', 'links'].forEach((k) => { if (!doc[k]) doc[k] = []; });
    if (!keepId && lib.get(doc.id)) {
      // opening a file whose id is already in the library: keep both, unless it is the same standard re-opened
      const kept = lib.get(doc.id);
      if (JSON.stringify(kept) !== JSON.stringify(doc)) doc.id = lib.freeId(doc.id);
    }
    openIssues = issues.filter((i) => i.level === 'error');
    past.length = 0; future.length = 0;
    selected = doc.items[0] ? doc.items[0].id : null;
    lastStructure = null;
    refresh({ source, rerender: true, relayout: true });
    if (openIssues.length) io.toast(`${openIssues.length} problem${openIssues.length > 1 ? 's' : ''} found while opening: see the Check tab.`, 7000);
  }

  /** Apply a change: `fn(doc)` mutates the document. */
  function commit(fn, opts = {}) {
    past.push(JSON.stringify(doc));
    if (past.length > 100) past.shift();
    future.length = 0;
    fn(doc);
    refresh(opts);
  }
  function undo() { if (!past.length) return; future.push(JSON.stringify(doc)); doc = JSON.parse(past.pop()); fixSelection(); refresh({ rerender: true }); }
  function redo() { if (!future.length) return; past.push(JSON.stringify(doc)); doc = JSON.parse(future.pop()); fixSelection(); refresh({ rerender: true }); }
  const fixSelection = () => { if (selected && !doc.items.some((it) => it.id === selected)) selected = doc.items[0] ? doc.items[0].id : null; };

  let saveTimer = null; let previewTimer = null;
  let previousId = null;
  function refresh({ rerender = false, source = '', relayout = false } = {}) {
    checked = S.read(JSON.parse(JSON.stringify(doc)));
    $('#doc-title').textContent = doc.title || 'Untitled standard';
    document.title = `${doc.title || 'Untitled'} ◼ dataviz builder`;
    $('#count-items').textContent = doc.items.length;
    $('#count-links').textContent = doc.links.length;
    $('#count-types').textContent = doc.types.length + doc.linkTypes.length;
    $('#count-filters').textContent = doc.filters.length;
    const errors = checked.issues.filter((i) => i.level === 'error').length;
    const countIssues = $('#count-issues');
    countIssues.textContent = checked.issues.length || '';
    countIssues.className = `count${errors ? ' count-error' : checked.issues.length ? ' count-warning' : ''}`;
    $('#undo').disabled = !past.length;
    $('#redo').disabled = !future.length;
    if (rerender) renderPanel();
    else if (tab === 'check') renderPanel();
    clearTimeout(previewTimer);
    previewTimer = setTimeout(() => updatePreview(relayout), relayout ? 0 : 250);
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => keep(source), 400);
  }

  function keep(source) {
    if (previousId && previousId !== doc.id) lib.remove(previousId); // the id was changed: one entry, not two
    previousId = doc.id;
    const ok = lib.put(doc, source);
    try { localStorage.setItem(LAST, doc.id); } catch (e) { /* ignore */ }
    $('#save-state').textContent = ok ? `Kept in this browser · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Not kept: this browser stores nothing (private window?). Export before leaving.';
    $('#save-state').classList.toggle('warn', !ok);
    renderLibraryMenu();
  }

  /* ---- references: renames and deletions keep the document consistent ---------------------- */
  function renameItem(d, from, to) {
    d.items.forEach((it) => { if (it.id === from) it.id = to; if (it.parent === from) it.parent = to; });
    d.links.forEach((l) => { if (l.from === from) l.from = to; if (l.to === from) l.to = to; });
  }
  function deleteItem(d, id) {
    const it = d.items.find((x) => x.id === id);
    d.items.forEach((x) => { if (x.parent === id) { if (it && it.parent) x.parent = it.parent; else delete x.parent; } });
    d.items = d.items.filter((x) => x.id !== id);
    d.links = d.links.filter((l) => l.from !== id && l.to !== id);
  }
  function renameType(d, from, to) { d.types.forEach((k) => { if (k.id === from) k.id = to; }); d.items.forEach((it) => { if (it.type === from) it.type = to; }); }
  function renameLinkType(d, from, to) { d.linkTypes.forEach((k) => { if (k.id === from) k.id = to; }); d.links.forEach((l) => { if (l.type === from) l.type = to; }); }
  function renameTag(d, from, to) {
    d.filters.forEach((f) => f.tags.forEach((t) => { if (t.id === from) t.id = to; }));
    d.items.forEach((it) => { if (it.tags) it.tags = it.tags.map((t) => (t === from ? to : t)); });
  }
  function dropTag(d, id) { d.items.forEach((it) => { if (it.tags) { it.tags = it.tags.filter((t) => t !== id); if (!it.tags.length) delete it.tags; } }); }

  /** The item and everything inside it, at any depth (ids). */
  function subtree(d, id) {
    const ids = new Set([id]);
    let grew = true;
    while (grew) {
      grew = false;
      d.items.forEach((it) => { if (it.parent && ids.has(it.parent) && !ids.has(it.id)) { ids.add(it.id); grew = true; } });
    }
    return ids;
  }
  /** The item just above, with the same parent, or undefined. */
  function previousSibling(d, id) {
    const it = d.items.find((x) => x.id === id);
    const i = d.items.indexOf(it);
    for (let j = i - 1; j >= 0; j--) if ((d.items[j].parent || '') === (it.parent || '')) return d.items[j];
    return undefined;
  }
  /**
   * Move an item, with everything inside it, relative to another: 'inside' (its last child),
   * 'before' or 'after' (same parent as the target). Refuses to move an item into itself.
   */
  function moveItem(d, id, targetId, where) {
    const block = subtree(d, id);
    if (block.has(targetId)) return false;
    const moving = d.items.filter((it) => block.has(it.id));
    const rest = d.items.filter((it) => !block.has(it.id));
    const target = rest.find((it) => it.id === targetId);
    const me = moving.find((it) => it.id === id);
    if (!target || !me) return false;
    let at = rest.indexOf(target);
    if (where !== 'before') {
      const inTarget = subtree({ items: rest }, targetId);
      rest.forEach((it, i) => { if (inTarget.has(it.id)) at = Math.max(at, i); });
      at += 1;
    }
    setField(me, 'parent', where === 'inside' ? targetId : (target.parent || ''));
    rest.splice(at, 0, ...moving);
    d.items = rest;
    return true;
  }

  /** A free id near `base`: "5.1-3" -> "5.1-4"; "x" -> "x-2". */
  function nextId(base) {
    const ids = new Set(doc.items.map((it) => it.id));
    const m = String(base).match(/^(.*?)(\d+)$/);
    if (m) { let n = Number(m[2]) + 1; while (ids.has(m[1] + n)) n++; return m[1] + n; }
    let n = 2; while (ids.has(`${base}-${n}`)) n++; return `${base}-${n}`;
  }
  const setField = (obj, key, value) => { if (value === '' || value === undefined || (Array.isArray(value) && !value.length)) delete obj[key]; else obj[key] = value; };

  /* ---- panels --------------------------------------------------------------------------------- */
  const options = (values, current, labels) => values.map((v) => `<option value="${esc(v)}"${v === current ? ' selected' : ''}>${esc(labels ? labels[v] || v : v)}</option>`).join('');
  const typeOptions = (current) => `<option value="">(no type)</option>${doc.types.map((k) => `<option value="${esc(k.id)}"${k.id === current ? ' selected' : ''}>${esc(k.label || k.id)}</option>`).join('')}`;
  const linkTypeOptions = (current) => `<option value="">(no type)</option>${doc.linkTypes.map((k) => `<option value="${esc(k.id)}"${k.id === current ? ' selected' : ''}>${esc(k.label || k.id)}</option>`).join('')}`;
  const itemDatalist = () => `<datalist id="item-ids">${doc.items.map((it) => `<option value="${esc(it.id)}">${esc(it.title || '')}</option>`).join('')}</datalist>`;
  const field = (label, html, hint) => `<label class="field"><span class="field-name">${label}</span>${html}${hint ? `<span class="field-hint">${hint}</span>` : ''}</label>`;

  function renderPanel() {
    $$('.tabs [data-tab]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === tab)));
    const panel = $('#panel');
    const scroll = panel.scrollTop;
    panel.innerHTML = ({ about: aboutPanel, items: itemsPanel, links: linksPanel, types: typesPanel, filters: filtersPanel, check: checkPanel }[tab])();
    panel.scrollTop = scroll;
    if (tab === 'items') { const row = $('.item-row.active', panel); if (row) row.scrollIntoView({ block: 'nearest' }); }
  }

  function aboutPanel() {
    const d = doc;
    return `
      <div class="form-grid">
        ${field('Title', `<input class="input" data-about="title" value="${esc(d.title)}">`)}
        ${field('Subtitle', `<input class="input" data-about="subtitle" value="${esc(d.subtitle || '')}">`)}
        ${field('Id', `<input class="input" data-about="id" value="${esc(d.id)}" pattern="[a-z0-9-]+">`, 'Short name for files and links: lower case, digits and dashes.')}
        ${field('Version', `<input class="input" data-about="version" value="${esc(d.version || '')}">`)}
        ${field('Date', `<input class="input" type="date" data-about="date" value="${esc(d.date || '')}">`)}
        ${field('Authors', `<input class="input" data-about="authors" value="${esc(d.authors || '')}">`)}
        ${field('Source', `<input class="input" type="url" data-about="url" value="${esc(d.url || '')}" placeholder="https://...">`, 'Where the standard itself can be read or bought.')}
        ${field('Licence', `<input class="input" data-about="licence" list="licences" value="${esc(d.licence || '')}" placeholder="CC-BY-4.0">
          <datalist id="licences"><option value="CC-BY-4.0"><option value="CC-BY-SA-4.0"><option value="CC0-1.0"><option value="ODbL-1.0"><option value="All rights reserved"></datalist>`,
          'The licence of this file, so others know whether they may reuse it. Mind the copyright of any text you quote from a standard.')}
        ${field('Layout', `<select class="input" data-about="layout">${options(S.LAYOUTS, d.layout || 'auto', { auto: 'auto (saved positions if any, else organic)', saved: 'saved positions', hierarchical: 'hierarchical', organic: 'organic', grid: 'grid', circle: 'circle' })}</select>`)}
        ${field('Direction', `<select class="input" data-about="direction"${d.layout === 'hierarchical' ? '' : ' disabled'}>${options(S.DIRECTIONS, d.direction || 'LR', { LR: 'left to right', TB: 'top to bottom', RL: 'right to left', BT: 'bottom to top' })}</select>`, 'For the hierarchical layout.')}
      </div>
      ${field('Description', `<textarea class="input" rows="5" data-about="description">${esc(d.description || '')}</textarea>`, 'Shown in the viewer. One paragraph per line, "- " for bullets, **bold**, [links](https://...).')}`;
  }

  function itemsPanel() {
    const q = itemFilter.toLowerCase();
    const depth = new Map();
    const byId = new Map(doc.items.map((it) => [it.id, it]));
    const depthOf = (it, seen = new Set()) => {
      if (depth.has(it.id)) return depth.get(it.id);
      if (!it.parent || !byId.has(it.parent) || seen.has(it.id)) return 0;
      seen.add(it.id);
      const d = depthOf(byId.get(it.parent), seen) + 1;
      depth.set(it.id, d);
      return d;
    };
    const typeOf = new Map(doc.types.map((k, i) => [k.id, k.color || S.PALETTE[i % S.PALETTE.length]]));
    const rows = doc.items.filter((it) => !q || [it.id, it.title, it.text, it.type, ...(it.tags || [])].some((v) => String(v || '').toLowerCase().includes(q)))
      .map((it) => `<li class="item-row${it.id === selected ? ' active' : ''}" data-item="${esc(it.id)}" draggable="true" style="padding-left:${0.6 + Math.min(depthOf(it), 6) * 0.9}rem">
          <span class="dot" style="background:${esc(typeOf.get(it.type) || '#cbd5e1')}"></span>
          <span class="item-id">${esc(it.id)}</span> <span class="item-title">${esc(it.title || '')}</span></li>`).join('');
    return `
      <div class="items-layout">
        <div class="items-list">
          <div class="list-tools">
            <input type="search" class="input" id="item-filter" placeholder="Find an item..." value="${esc(itemFilter)}">
            <button type="button" class="btn" data-act="add-item" title="New item after the selected one">+ Item</button>
            <button type="button" class="btn" data-act="add-child" title="New item inside the selected one"${selected ? '' : ' disabled'}>+ Child</button>
          </div>
          <ul class="rows">${rows || '<li class="hint">No item.</li>'}</ul>
          <p class="hint drag-hint">Drag an item onto another to put it inside, or onto its top or bottom edge to place it before or after, at the same level.</p>
        </div>
        <div class="item-form">${itemForm()}</div>
      </div>`;
  }

  function itemForm() {
    const it = doc.items.find((x) => x.id === selected);
    if (!it) return '<p class="hint">Select an item in the list or in the preview, or add one.</p>';
    const tagChecks = doc.filters.map((f) => f.tags.length ? `
        <fieldset class="tag-group"><legend>${esc(f.label)}</legend>
          ${f.tags.map((t) => `<label class="check"><input type="checkbox" data-tag="${esc(t.id)}"${(it.tags || []).includes(t.id) ? ' checked' : ''}> ${esc(t.label || t.id)}</label>`).join('')}
        </fieldset>` : '').join('');
    const known = new Set(doc.filters.flatMap((f) => f.tags.map((t) => t.id)));
    const otherTags = (it.tags || []).filter((t) => !known.has(t)).join(', ');
    const out = doc.links.map((l, i) => ({ l, i })).filter(({ l }) => l.from === it.id || l.to === it.id);
    return `
      <div class="form-head">
        <h2>${esc(it.id)}</h2>
        <div class="form-actions">
          <button type="button" class="btn btn-small" data-act="outdent" title="Out of its parent, to the level above"${it.parent ? '' : ' disabled'}>← Outdent</button>
          <button type="button" class="btn btn-small" data-act="indent" title="Into the item above it, as its last child"${previousSibling(doc, it.id) ? '' : ' disabled'}>Indent →</button>
          <button type="button" class="btn btn-small" data-act="move-up" title="Move up">↑</button>
          <button type="button" class="btn btn-small" data-act="move-down" title="Move down">↓</button>
          <button type="button" class="btn btn-small" data-act="duplicate">Duplicate</button>
          <button type="button" class="btn btn-small btn-danger" data-act="delete-item">Delete</button>
        </div>
      </div>
      <div class="form-grid">
        ${field('Id', `<input class="input" data-item-field="id" value="${esc(it.id)}" required>`, 'Unique. Renaming updates its children and links.')}
        ${field('Type', `<select class="input" data-item-field="type">${typeOptions(it.type || '')}</select>`)}
        ${field('Title', `<input class="input" data-item-field="title" value="${esc(it.title || '')}">`)}
        ${field('Parent', `<input class="input" data-item-field="parent" list="item-ids" value="${esc(it.parent || '')}" placeholder="(top level)">`, 'The id of the item that contains it.')}
        ${field('Label on the graph', `<input class="input" data-item-field="label" value="${esc(it.label || '')}" placeholder="${esc(S.captionOf(checked.std, it))}">`, 'Optional. By default the type decides: the id, the title or both.')}
        ${field('Source link', `<input class="input" type="url" data-item-field="url" value="${esc(it.url || '')}" placeholder="https://...">`)}
      </div>
      ${field('Text', `<textarea class="input" rows="6" data-item-field="text">${esc(it.text || '')}</textarea>`, 'One paragraph per line, "- " for bullets, **bold**, `code`, [links](https://...).')}
      ${tagChecks ? `<div class="tags-box"><span class="field-name">Tags</span>${tagChecks}</div>` : ''}
      ${field('Other tags', `<input class="input" data-item-field="tags-other" value="${esc(otherTags)}" placeholder="tag-a, tag-b">`, doc.filters.length ? 'Tags not in a filter yet. They show up in a "Tags" filter.' : 'Comma-separated. Declare filters (Filters tab) to give them labels and group them.')}
      <div class="item-links">
        <span class="field-name">Links of this item</span>
        <ul class="mini-list">${out.map(({ l, i }) => `<li>${l.from === it.id ? `→ <a href="#" data-goto="${esc(l.to)}">${esc(l.to)}</a>` : `← <a href="#" data-goto="${esc(l.from)}">${esc(l.from)}</a>`}
          <em>${esc([(doc.linkTypes.find((k) => k.id === l.type) || {}).label || l.type, l.label].filter(Boolean).join(': '))}</em>
          <button type="button" class="link-btn" data-del-link="${i}">remove</button></li>`).join('') || '<li class="hint">No link yet.</li>'}</ul>
        <div class="add-link">
          <input class="input" id="new-link-to" list="item-ids" placeholder="Link to (item id)">
          <select class="input" id="new-link-type">${linkTypeOptions(doc.linkTypes[0] ? doc.linkTypes[0].id : '')}</select>
          <input class="input" id="new-link-label" placeholder="Label (optional)">
          <button type="button" class="btn" data-act="add-link">Add link</button>
        </div>
      </div>
      ${it.x !== undefined ? `<p class="hint">Saved position: ${it.x}, ${it.y} · <button type="button" class="link-btn" data-act="clear-position">forget it</button></p>` : ''}
      ${itemDatalist()}`;
  }

  function linksPanel() {
    const q = linkFilter.toLowerCase();
    const rows = doc.links.map((l, i) => ({ l, i })).filter(({ l }) => !q || [l.from, l.to, l.type, l.label].some((v) => String(v || '').toLowerCase().includes(q)));
    return `
      <div class="list-tools">
        <input type="search" class="input" id="link-filter" placeholder="Find a link..." value="${esc(linkFilter)}">
        <button type="button" class="btn" data-act="add-link-row">+ Link</button>
      </div>
      <p class="hint">Each link is an arrow from one item to another. Tip: <strong>Draw links</strong> above the preview adds them by clicking two items.</p>
      <table class="grid">
        <thead><tr><th>From</th><th>To</th><th>Type</th><th>Label</th><th></th></tr></thead>
        <tbody>${rows.map(({ l, i }) => `<tr data-link="${i}">
          <td><input class="input" data-link-field="from" list="item-ids" value="${esc(l.from)}"></td>
          <td><input class="input" data-link-field="to" list="item-ids" value="${esc(l.to)}"></td>
          <td><select class="input" data-link-field="type">${linkTypeOptions(l.type || '')}</select></td>
          <td><input class="input" data-link-field="label" value="${esc(l.label || '')}"></td>
          <td><button type="button" class="link-btn" data-del-link="${i}" aria-label="Remove this link">✕</button></td></tr>`).join('') || '<tr><td colspan="5" class="hint">No link.</td></tr>'}</tbody>
      </table>
      ${itemDatalist()}`;
  }

  function typesPanel() {
    const colorCell = (k, i, palette) => `<span class="color-cell"><input type="color" data-color-pick value="${esc(k.color || palette[i % palette.length])}"><input class="input" data-field="color" value="${esc(k.color || '')}" placeholder="auto"></span>`;
    return `
      <h2 class="section-title">Item types</h2>
      <p class="hint">What sort of thing each item is (chapter, requirement, recommendation...). The type gives its look and whether it can be assessed.</p>
      <table class="grid">
        <thead><tr><th>Id</th><th>Label</th><th>Colour</th><th>Shape</th><th>Border</th><th>Node shows</th><th>Assessed</th><th></th></tr></thead>
        <tbody>${doc.types.map((k, i) => `<tr data-type="${i}">
          <td><input class="input" data-field="id" value="${esc(k.id)}"></td>
          <td><input class="input" data-field="label" value="${esc(k.label || '')}" placeholder="${esc(k.id)}"></td>
          <td>${colorCell(k, i, S.PALETTE)}</td>
          <td><select class="input" data-field="shape">${options(S.SHAPES, k.shape || 'round-rectangle')}</select></td>
          <td><select class="input" data-field="border">${options(S.BORDERS, k.border || 'solid')}</select></td>
          <td><select class="input" data-field="caption">${options(S.CAPTIONS, k.caption || 'id', { id: 'id', title: 'title', both: 'id + title' })}</select></td>
          <td><select class="input" data-field="assess">${options(S.ASSESS, k.assess || 'auto', { auto: 'if no children', yes: 'yes', no: 'no' })}</select></td>
          <td><button type="button" class="link-btn" data-del-type="${i}" aria-label="Remove this type">✕</button></td></tr>`).join('')}</tbody>
      </table>
      <button type="button" class="btn" data-act="add-type">+ Item type</button>

      <h2 class="section-title">Link types</h2>
      <p class="hint">What an arrow means (depends on, maps to, requires...).</p>
      <table class="grid">
        <thead><tr><th>Id</th><th>Label</th><th>Colour</th><th>Line</th><th>Arrow</th><th></th></tr></thead>
        <tbody>${doc.linkTypes.map((k, i) => `<tr data-link-type="${i}">
          <td><input class="input" data-field="id" value="${esc(k.id)}"></td>
          <td><input class="input" data-field="label" value="${esc(k.label || '')}" placeholder="${esc(k.id)}"></td>
          <td>${colorCell(k, i, ['#475569', '#16a34a', '#7e22ce', '#c2410c', '#0891b2', '#be185d'])}</td>
          <td><select class="input" data-field="style">${options(['solid', 'dashed', 'dotted'], k.style || 'solid')}</select></td>
          <td><select class="input" data-field="arrow">${options(S.ARROWS, k.arrow || 'triangle')}</select></td>
          <td><button type="button" class="link-btn" data-del-link-type="${i}" aria-label="Remove this link type">✕</button></td></tr>`).join('')}</tbody>
      </table>
      <button type="button" class="btn" data-act="add-link-type">+ Link type</button>`;
  }

  function filtersPanel() {
    const modes = { any: 'any: show items with any ticked tag', all: 'all: show items with every ticked tag', none: 'none: hide items with a ticked tag' };
    return `
      <p class="hint">Filters become checkbox groups in the viewer's sidebar. Each tag is ticked on the items it applies to (Items tab), for example "Applies to: part 1, part 2" or "Condition: passwords are used".</p>
      ${doc.filters.map((f, fi) => `
        <div class="filter-card" data-filter="${fi}">
          <div class="form-grid">
            ${field('Filter name', `<input class="input" data-filter-field="label" value="${esc(f.label || '')}">`)}
            ${field('Id', `<input class="input" data-filter-field="id" value="${esc(f.id)}">`)}
            ${field('Ticking a tag', `<select class="input" data-filter-field="mode">${options(S.MODES, f.mode || 'any', modes)}</select>`)}
          </div>
          <table class="grid">
            <thead><tr><th>Tag id</th><th>Label</th><th>Items</th><th></th></tr></thead>
            <tbody>${f.tags.map((t, ti) => `<tr data-tag-row="${ti}">
              <td><input class="input" data-tag-field="id" value="${esc(t.id)}"></td>
              <td><input class="input" data-tag-field="label" value="${esc(t.label || '')}" placeholder="${esc(t.id)}"></td>
              <td class="num">${doc.items.filter((it) => (it.tags || []).includes(t.id)).length}</td>
              <td><button type="button" class="link-btn" data-del-tag="${ti}" aria-label="Remove this tag">✕</button></td></tr>`).join('')}</tbody>
          </table>
          <div class="list-tools"><button type="button" class="btn" data-act="add-tag">+ Tag</button><button type="button" class="btn btn-danger" data-act="delete-filter">Delete the filter</button></div>
        </div>`).join('')}
      <button type="button" class="btn" data-act="add-filter">+ Filter</button>`;
  }

  const n = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;
  function checkPanel() {
    const where = (i) => (i.id ? `<a href="#" data-goto="${esc(i.id)}" data-table="${esc(i.table || '')}">${esc(i.id)}</a>` : i.table ? `<a href="#" data-goto-tab="${esc(i.table === 'linkTypes' ? 'types' : i.table)}">${esc(i.table)}${i.row ? ` row ${i.row}` : ''}</a>` : '');
    const list = (issues) => `<ul class="issue-list">${issues.map((i) => `<li class="issue-${i.level}"><span class="pill">${i.level}</span> ${esc(i.message)} ${where(i)}</li>`).join('')}</ul>`;
    return `
      ${checked.issues.length ? list(checked.issues) : '<p class="ok">✓ No problem found: the standard is consistent.</p>'}
      ${openIssues.length ? `<h2 class="section-title">Fixed while opening the file</h2><p class="hint">The file had these problems. The builder left out what it could not use.</p>${list(openIssues)}` : ''}
      <h2 class="section-title">Summary</h2>
      <p>${n(doc.items.length, 'item')} (${doc.items.filter((it) => !doc.items.some((c) => c.parent === it.id)).length} without children), ${n(doc.links.length, 'link')}, ${n(doc.types.length, 'item type')}, ${n(doc.linkTypes.length, 'link type')}, ${n(doc.filters.length, 'filter')} with ${n(doc.filters.reduce((x, f) => x + f.tags.length, 0), 'tag')}.</p>`;
  }

  /* ---- panel events --------------------------------------------------------------------------- */
  const panel = $('#panel');

  // text typed in a field: update the document without redrawing the panel (the cursor stays)
  panel.addEventListener('input', (e) => {
    const t = e.target;
    if (t.id === 'item-filter') { itemFilter = t.value; const pos = t.selectionStart; renderPanel(); const f = $('#item-filter'); f.focus(); f.setSelectionRange(pos, pos); return; }
    if (t.id === 'link-filter') { linkFilter = t.value; const pos = t.selectionStart; renderPanel(); const f = $('#link-filter'); f.focus(); f.setSelectionRange(pos, pos); return; }
    if (t.dataset.about && t.dataset.about !== 'id' && t.tagName !== 'SELECT') return commit((d) => setField(d, t.dataset.about, t.value.trim() === '' ? '' : t.value));
    if (t.dataset.itemField && ['title', 'text', 'label', 'url'].includes(t.dataset.itemField)) {
      return commit((d) => { const it = d.items.find((x) => x.id === selected); if (it) setField(it, t.dataset.itemField, t.value); });
    }
    if (t.dataset.colorPick !== undefined) { const txt = t.parentElement.querySelector('[data-field="color"]'); txt.value = t.value; txt.dispatchEvent(new Event('change', { bubbles: true })); }
  });

  // committed changes (blur, enter, select): ids, selects, table cells
  panel.addEventListener('change', (e) => {
    const t = e.target;
    const v = t.type === 'checkbox' ? t.checked : t.value.trim();
    if (t.dataset.about) {
      const key = t.dataset.about;
      if (key === 'id') { const id = S.slug(v) || 'standard'; t.value = id; return commit((d) => { d.id = id; }); }
      return commit((d) => setField(d, key, v), { rerender: key === 'layout', relayout: key === 'layout' || key === 'direction' });
    }
    if (t.dataset.itemField) {
      const key = t.dataset.itemField;
      const it = doc.items.find((x) => x.id === selected);
      if (!it) return;
      if (key === 'id') {
        if (!v || v === it.id) { t.value = it.id; return; }
        if (doc.items.some((x) => x.id === v)) { io.toast(`An item "${v}" already exists.`); t.value = it.id; return; }
        const old = it.id; selected = v;
        return commit((d) => renameItem(d, old, v), { rerender: true });
      }
      if (key === 'type' || key === 'parent') {
        if (key === 'parent' && v === it.id) { io.toast('An item cannot contain itself.'); t.value = it.parent || ''; return; }
        return commit((d) => setField(d.items.find((x) => x.id === selected), key, v), { rerender: true });
      }
      if (key === 'tags-other') {
        const known = new Set(doc.filters.flatMap((f) => f.tags.map((x) => x.id)));
        return commit((d) => { const x = d.items.find((y) => y.id === selected); const kept = (x.tags || []).filter((tg) => known.has(tg)); setField(x, 'tags', [...new Set([...kept, ...v.split(',').map((s) => s.trim()).filter(Boolean)])]); });
      }
      return;
    }
    if (t.dataset.tag !== undefined) {
      return commit((d) => { const x = d.items.find((y) => y.id === selected); const tags = new Set(x.tags || []); if (v) tags.add(t.dataset.tag); else tags.delete(t.dataset.tag); setField(x, 'tags', [...tags]); });
    }
    const linkRow = t.closest('[data-link]');
    if (linkRow && t.dataset.linkField) return commit((d) => setField(d.links[Number(linkRow.dataset.link)], t.dataset.linkField, v));
    const typeRow = t.closest('[data-type]');
    if (typeRow && t.dataset.field) {
      const k = doc.types[Number(typeRow.dataset.type)];
      if (t.dataset.field === 'id') {
        if (!v || doc.types.some((x) => x !== k && x.id === v)) { io.toast('Type ids must be unique and not empty.'); t.value = k.id; return; }
        const old = k.id; return commit((d) => renameType(d, old, v), { rerender: true });
      }
      if (t.dataset.field === 'color' && v && !/^#?[0-9a-f]{6}$/i.test(v)) { io.toast('A colour is written like #0044aa.'); return; }
      return commit((d) => setField(d.types[Number(typeRow.dataset.type)], t.dataset.field, t.dataset.field === 'color' && v && !v.startsWith('#') ? `#${v}` : v), { rerender: t.dataset.field === 'color' });
    }
    const lkRow = t.closest('[data-link-type]');
    if (lkRow && t.dataset.field) {
      const k = doc.linkTypes[Number(lkRow.dataset.linkType)];
      if (t.dataset.field === 'id') {
        if (!v || doc.linkTypes.some((x) => x !== k && x.id === v)) { io.toast('Link type ids must be unique and not empty.'); t.value = k.id; return; }
        const old = k.id; return commit((d) => renameLinkType(d, old, v), { rerender: true });
      }
      return commit((d) => setField(d.linkTypes[Number(lkRow.dataset.linkType)], t.dataset.field, t.dataset.field === 'color' && v && !v.startsWith('#') ? `#${v}` : v), { rerender: t.dataset.field === 'color' });
    }
    const card = t.closest('[data-filter]');
    if (card) {
      const fi = Number(card.dataset.filter);
      const f = doc.filters[fi];
      if (t.dataset.filterField) {
        if (t.dataset.filterField === 'id' && (!v || doc.filters.some((x) => x !== f && x.id === v))) { io.toast('Filter ids must be unique and not empty.'); t.value = f.id; return; }
        return commit((d) => setField(d.filters[fi], t.dataset.filterField, v));
      }
      const tagRow = t.closest('[data-tag-row]');
      if (tagRow && t.dataset.tagField) {
        const ti = Number(tagRow.dataset.tagRow);
        const tag = f.tags[ti];
        if (t.dataset.tagField === 'id') {
          if (!v || doc.filters.some((x) => x.tags.some((y) => y !== tag && y.id === v))) { io.toast('Tag ids must be unique across all filters and not empty.'); t.value = tag.id; return; }
          const old = tag.id; return commit((d) => renameTag(d, old, v), { rerender: true });
        }
        return commit((d) => setField(d.filters[fi].tags[ti], 'label', v));
      }
    }
    return undefined;
  });

  panel.addEventListener('click', (e) => {
    const t = e.target;
    const row = t.closest('.item-row');
    if (row) { selectItem(row.dataset.item); return; }
    const go = t.closest('[data-goto]');
    if (go) {
      e.preventDefault();
      const id = go.dataset.goto;
      if (go.dataset.table === 'types' || go.dataset.table === 'linkTypes') { tab = 'types'; renderPanel(); return; }
      if (go.dataset.table === 'filters') { tab = 'filters'; renderPanel(); return; }
      if (doc.items.some((it) => it.id === id)) selectItem(id);
      return;
    }
    const goTab = t.closest('[data-goto-tab]');
    if (goTab) { e.preventDefault(); tab = goTab.dataset.gotoTab; renderPanel(); return; }
    if (t.dataset.delLink !== undefined) { const i = Number(t.dataset.delLink); commit((d) => d.links.splice(i, 1), { rerender: true }); return; }
    if (t.dataset.delType !== undefined) {
      const k = doc.types[Number(t.dataset.delType)];
      const used = doc.items.filter((it) => it.type === k.id).length;
      if (used && !window.confirm(`${used} item${used > 1 ? 's use' : ' uses'} the type "${k.label || k.id}". Remove it? Those items will have no type.`)) return;
      commit((d) => { d.types = d.types.filter((x) => x.id !== k.id); d.items.forEach((it) => { if (it.type === k.id) delete it.type; }); }, { rerender: true });
      return;
    }
    if (t.dataset.delLinkType !== undefined) {
      const k = doc.linkTypes[Number(t.dataset.delLinkType)];
      commit((d) => { d.linkTypes = d.linkTypes.filter((x) => x.id !== k.id); d.links.forEach((l) => { if (l.type === k.id) delete l.type; }); }, { rerender: true });
      return;
    }
    if (t.dataset.delTag !== undefined) {
      const fi = Number(t.closest('[data-filter]').dataset.filter);
      const tag = doc.filters[fi].tags[Number(t.dataset.delTag)];
      commit((d) => { d.filters[fi].tags = d.filters[fi].tags.filter((x) => x.id !== tag.id); dropTag(d, tag.id); }, { rerender: true });
      return;
    }
    const act = t.closest('[data-act]');
    if (!act || act.disabled) return;
    const sel = doc.items.find((it) => it.id === selected);
    const a = act.dataset.act;
    if (a === 'add-item' || a === 'add-child') {
      const child = a === 'add-child' && sel;
      const siblings = doc.items.filter((it) => (child ? it.parent === sel.id : sel && it.parent === sel.parent));
      const base = child ? (siblings.length ? siblings[siblings.length - 1].id : `${sel.id}.0`) : (sel ? sel.id : 'item-0');
      const id = nextId(base);
      const item = { id, title: '' };
      if (child) item.parent = sel.id; else if (sel && sel.parent) item.parent = sel.parent;
      const sameType = siblings.find((s) => s.type) || (child ? null : sel);
      if (sameType && sameType.type) item.type = sameType.type;
      else if (child && doc.types[1]) item.type = doc.types.find((k) => k.id !== sel.type)?.id;
      selected = id;
      commit((d) => {
        const at = child ? (() => { let last = d.items.findIndex((x) => x.id === sel.id); d.items.forEach((x, i) => { if (x.parent === sel.id) last = i; }); return last + 1; })() : (sel ? d.items.findIndex((x) => x.id === sel.id) + 1 : d.items.length);
        d.items.splice(at, 0, item);
      }, { rerender: true });
      setTimeout(() => { const f = $('[data-item-field="title"]'); if (f) f.focus(); }, 0);
      return;
    }
    if (a === 'duplicate' && sel) {
      const id = nextId(sel.id);
      const copy = JSON.parse(JSON.stringify(sel)); copy.id = id; delete copy.x; delete copy.y;
      selected = id;
      commit((d) => d.items.splice(d.items.findIndex((x) => x.id === sel.id) + 1, 0, copy), { rerender: true });
      return;
    }
    if (a === 'delete-item' && sel) {
      const kids = doc.items.filter((it) => it.parent === sel.id).length;
      const links = doc.links.filter((l) => l.from === sel.id || l.to === sel.id).length;
      if ((kids || links) && !window.confirm(`Delete "${sel.id}"?${kids ? ` Its ${kids} item${kids > 1 ? 's' : ''} move up one level.` : ''}${links ? ` Its ${links} link${links > 1 ? 's' : ''} go too.` : ''}`)) return;
      const i = doc.items.findIndex((x) => x.id === sel.id);
      commit((d) => deleteItem(d, sel.id), { rerender: false });
      selected = doc.items[Math.min(i, doc.items.length - 1)] ? doc.items[Math.min(i, doc.items.length - 1)].id : null;
      renderPanel();
      return;
    }
    if (a === 'outdent' && sel && sel.parent) {
      const parent = sel.parent;
      commit((d) => moveItem(d, sel.id, parent, 'after'), { rerender: true });
      return;
    }
    if (a === 'indent' && sel) {
      const above = previousSibling(doc, sel.id);
      if (above) commit((d) => moveItem(d, sel.id, above.id, 'inside'), { rerender: true });
      return;
    }
    if ((a === 'move-up' || a === 'move-down') && sel) {
      commit((d) => { const i = d.items.findIndex((x) => x.id === sel.id); const j = a === 'move-up' ? i - 1 : i + 1; if (j < 0 || j >= d.items.length) return; [d.items[i], d.items[j]] = [d.items[j], d.items[i]]; }, { rerender: true });
      return;
    }
    if (a === 'clear-position' && sel) { commit((d) => { const x = d.items.find((y) => y.id === sel.id); delete x.x; delete x.y; }, { rerender: true }); return; }
    if (a === 'add-link' && sel) {
      const to = $('#new-link-to').value.trim();
      if (!doc.items.some((it) => it.id === to)) { io.toast(`There is no item "${to}".`); return; }
      const link = { from: sel.id, to }; setField(link, 'type', $('#new-link-type').value); setField(link, 'label', $('#new-link-label').value.trim());
      commit((d) => d.links.push(link), { rerender: true });
      return;
    }
    if (a === 'add-link-row') {
      const first = doc.items[0] ? doc.items[0].id : '';
      linkFilter = '';
      commit((d) => d.links.push({ from: selected || first, to: first, ...(d.linkTypes[0] && { type: d.linkTypes[0].id }) }), { rerender: true });
      $('#panel').scrollTop = $('#panel').scrollHeight;
      return;
    }
    if (a === 'add-type') {
      let n = doc.types.length + 1; while (doc.types.some((k) => k.id === `type-${n}`)) n++;
      commit((d) => d.types.push({ id: `type-${n}`, label: `Type ${n}` }), { rerender: true });
      return;
    }
    if (a === 'add-link-type') {
      let n = doc.linkTypes.length + 1; while (doc.linkTypes.some((k) => k.id === `link-type-${n}`)) n++;
      commit((d) => d.linkTypes.push({ id: `link-type-${n}`, label: `Link type ${n}` }), { rerender: true });
      return;
    }
    if (a === 'add-filter') {
      let n = doc.filters.length + 1; while (doc.filters.some((f) => f.id === `filter-${n}`)) n++;
      commit((d) => d.filters.push({ id: `filter-${n}`, label: `Filter ${n}`, tags: [] }), { rerender: true });
      return;
    }
    const card = t.closest('[data-filter]');
    if (a === 'add-tag' && card) {
      const fi = Number(card.dataset.filter);
      const all = new Set(doc.filters.flatMap((f) => f.tags.map((x) => x.id)));
      let n = 1; while (all.has(`${doc.filters[fi].id}-${n}`)) n++;
      commit((d) => d.filters[fi].tags.push({ id: `${d.filters[fi].id}-${n}`, label: '' }), { rerender: true });
      return;
    }
    if (a === 'delete-filter' && card) {
      const f = doc.filters[Number(card.dataset.filter)];
      if (!window.confirm(`Delete the filter "${f.label || f.id}" and remove its tags from every item?`)) return;
      commit((d) => { d.filters = d.filters.filter((x) => x.id !== f.id); f.tags.forEach((tg) => dropTag(d, tg.id)); }, { rerender: true });
    }
  });

  $$('.tabs [data-tab]').forEach((b) => b.addEventListener('click', () => { tab = b.dataset.tab; renderPanel(); }));

  /* ---- drag and drop in the Items list: inside, before or after another item ---------------- */
  let dragId = null;
  const zoneOf = (row, e) => {
    const r = row.getBoundingClientRect();
    const y = (e.clientY - r.top) / r.height;
    return y < 0.28 ? 'before' : y > 0.72 ? 'after' : 'inside';
  };
  const clearDrop = () => $$('.item-row.drop-before, .item-row.drop-after, .item-row.drop-inside', panel).forEach((r) => r.classList.remove('drop-before', 'drop-after', 'drop-inside'));
  panel.addEventListener('dragstart', (e) => {
    const row = e.target.closest && e.target.closest('.item-row');
    if (!row) return;
    dragId = row.dataset.item;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', dragId);
    row.classList.add('dragging');
  });
  panel.addEventListener('dragover', (e) => {
    if (!dragId) return;
    const row = e.target.closest && e.target.closest('.item-row');
    clearDrop();
    if (!row || subtree(doc, dragId).has(row.dataset.item)) { e.dataTransfer.dropEffect = 'none'; return; }
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    row.classList.add(`drop-${zoneOf(row, e)}`);
  });
  panel.addEventListener('dragleave', (e) => { if (!panel.contains(e.relatedTarget)) clearDrop(); });
  panel.addEventListener('drop', (e) => {
    if (!dragId) return;
    const row = e.target.closest && e.target.closest('.item-row');
    e.preventDefault();
    e.stopPropagation(); // not a file dropped on the page
    clearDrop();
    const id = dragId; dragId = null;
    if (!row || row.dataset.item === id) return;
    const where = zoneOf(row, e);
    if (subtree(doc, id).has(row.dataset.item)) { io.toast('An item cannot go inside one of its own children.'); return; }
    selected = id;
    commit((d) => moveItem(d, id, row.dataset.item, where), { rerender: true });
    const verb = { inside: 'is now inside', before: 'now comes before', after: 'now comes after' }[where];
    io.toast(`"${id}" ${verb} "${row.dataset.item}". Undo with Ctrl+Z.`);
  });
  panel.addEventListener('dragend', () => { dragId = null; clearDrop(); $$('.item-row.dragging', panel).forEach((r) => r.classList.remove('dragging')); });

  function selectItem(id) {
    selected = id;
    if (tab !== 'items') tab = 'items';
    if (itemFilter && !doc.items.find((it) => it.id === id && [it.id, it.title].some((v) => String(v || '').toLowerCase().includes(itemFilter.toLowerCase())))) itemFilter = '';
    renderPanel();
    highlightInPreview();
  }

  /* ---- preview ----------------------------------------------------------------------------- */
  const cy = cytoscape({ container: $('#cy'), elements: [], style: [], layout: { name: 'preset' }, maxZoom: 1.6 });
  window.cy = cy;
  let lastStructure = null;
  let previewLayout = 'auto';
  let linkFrom = null;
  let linkMode = false;
  let dragged = false;

  const structureOf = (els) => els.map((e) => (e.group === 'nodes' ? `n:${e.data.id}<${e.data.parent || ''}` : `e:${e.data.source}>${e.data.target}`)).join('|');
  const resolvedLayout = () => {
    const choice = previewLayout === 'auto' ? (doc.layout || 'auto') : previewLayout;
    if (choice === 'auto') return checked.std.items.some((it) => it.x !== undefined) ? 'saved' : 'organic';
    return choice;
  };

  function updatePreview(forceLayout) {
    const std = checked.std;
    const elements = S.toElements(std);
    const structure = structureOf(elements);
    cy.style([...S.stylesheet(std),
      { selector: 'node.link-from', style: { 'underlay-color': '#217aff', 'underlay-opacity': 0.4, 'underlay-padding': 6 } },
      { selector: 'node.drop-into', style: { 'underlay-color': '#217aff', 'underlay-opacity': 0.35, 'underlay-padding': 8, 'border-width': 3, 'border-color': '#217aff', 'border-style': 'dashed' } },
      { selector: 'node.drop-out', style: { 'underlay-color': '#d97706', 'underlay-opacity': 0.3, 'underlay-padding': 8, 'border-width': 3, 'border-color': '#d97706', 'border-style': 'dashed' } }]);
    if (structure === lastStructure && !forceLayout) {
      cy.batch(() => elements.forEach((el) => { const e = cy.getElementById(el.data.id); if (e.length) { e.data(el.data); e.classes(el.classes); } }));
      highlightInPreview();
      return;
    }
    const before = {};
    cy.nodes().forEach((n) => { before[n.id()] = { ...n.position() }; });
    const fresh = lastStructure === null;
    lastStructure = structure;
    cy.batch(() => {
      cy.elements().remove();
      cy.add(elements.map((el) => {
        if (el.group !== 'nodes') return el;
        const pos = before[el.data.id] || el.position;
        return pos ? { ...el, position: pos } : el;
      }));
    });
    const layout = resolvedLayout();
    if (layout === 'saved') {
      const saved = new Map(std.items.filter((it) => it.x !== undefined).map((it) => [it.id, { x: it.x, y: it.y }]));
      cy.nodes(':childless').forEach((n) => { if (saved.has(n.id()) && (fresh || forceLayout)) n.position(saved.get(n.id())); else if (!saved.has(n.id()) && !before[n.id()]) placeNear(n); });
      if (fresh || forceLayout) cy.fit(undefined, 30);
    } else {
      const known = cy.nodes(':childless').filter((n) => before[n.id()]);
      const incremental = !fresh && !forceLayout && known.length > cy.nodes(':childless').length * 0.6;
      if (incremental) {
        // a small change: place the new items next to their neighbours, keep the rest where it is
        cy.nodes(':childless').filter((n) => !before[n.id()]).forEach(placeNear);
      } else {
        const opts = S.layoutOptions({ ...std, layout }, layout, cy);
        cy.layout({ ...opts, fit: true }).run();
      }
    }
    highlightInPreview();
  }

  function placeNear(n) {
    const ref = n.neighborhood('node').filter((m) => m.isChildless()).first();
    const sib = n.siblings().filter((m) => m.isChildless()).last();
    const anchor = (sib.length ? sib : ref.length ? ref : null);
    const p = anchor ? anchor.position() : { x: cy.width() / 2, y: cy.height() / 2 };
    n.position({ x: p.x + 60, y: p.y + 40 });
  }

  function highlightInPreview() {
    cy.elements().removeClass('focus faded');
    cy.nodes().removeClass('link-from');
    if (linkFrom) cy.getElementById(linkFrom).addClass('link-from');
    const n = selected ? cy.getElementById(selected) : null;
    if (n && n.length) { n.addClass('focus'); n.connectedEdges().addClass('focus'); }
  }

  cy.on('tap', 'node', (e) => {
    const id = e.target.id();
    if (linkMode) {
      if (!linkFrom) { linkFrom = id; highlightInPreview(); $('#preview-hint').textContent = `Now click the item "${id}" links to. Esc to cancel.`; return; }
      const from = linkFrom; linkFrom = null;
      if (from === id) { highlightInPreview(); return; }
      commit((d) => d.links.push({ from, to: id, ...(d.linkTypes[0] && { type: d.linkTypes[0].id }) }), { rerender: true });
      $('#preview-hint').textContent = `Linked ${from} → ${id}. Click another item to start the next link.`;
      return;
    }
    selectItem(id);
  });
  /* ---- drag in the preview: drop onto an item or a box to put it inside; drop it outside its box
          to take it out. No key to hold: Ctrl, Shift and Cmd are the graph library's selection keys.
          While a child is dragged its box stretches to follow it, so the boxes are measured as they were
          when the item was picked up. The hint says what releasing will do. ---------------------- */
  let pickedUp = null; // { id, parent, boxes: Map(id -> bounding box at grab time) }
  const PREVIEW_HINT = 'Click an item to edit it. Drag it onto another to put it inside, or out of its box to take it out.';
  const box = (n) => n.boundingBox({ includeLabels: false });
  const area = (b) => b.w * b.h;

  /** Where the item would land: the smallest box (as it was at grab time) under its centre, or the top level. */
  function landingParent(node) {
    const p = node.position();
    const mine = subtree(doc, node.id());
    let best = null;
    pickedUp.boxes.forEach((b, id) => {
      if (mine.has(id)) return;
      if (p.x >= b.x1 && p.x <= b.x2 && p.y >= b.y1 && p.y <= b.y2 && (!best || area(b) < area(best.b))) best = { id, b };
    });
    return best ? best.id : '';
  }
  /** What releasing now would do: { action: 'in' | 'out' | null, to, from } */
  function dropIntent(node) {
    if (!pickedUp || pickedUp.id !== node.id()) return { action: null };
    const from = pickedUp.parent;
    const to = landingParent(node);
    if (to === from) return { action: null };
    // leaving for one of the boxes around it (or the top level) is "out"; anything else is "in"
    const around = [];
    for (let p = from; p; p = (doc.items.find((it) => it.id === p) || {}).parent || '') around.push(p);
    return { action: !to || around.includes(to) ? 'out' : 'in', to, from };
  }
  function showDropIntent(node) {
    cy.nodes().removeClass('drop-into drop-out');
    const intent = dropIntent(node);
    const hint = $('#preview-hint');
    const who = `<strong>${esc(node.id())}</strong>`;
    if (intent.action === 'in') {
      cy.getElementById(intent.to).addClass('drop-into');
      hint.innerHTML = `Release to put ${who} inside <strong>${esc(intent.to)}</strong>.`;
    } else if (intent.action === 'out') {
      cy.getElementById(intent.from).addClass('drop-out');
      if (intent.to) cy.getElementById(intent.to).addClass('drop-into');
      hint.innerHTML = `Release to take ${who} out of <strong>${esc(intent.from)}</strong>${intent.to ? ` (into <strong>${esc(intent.to)}</strong>)` : ' (to the top level)'}.`;
    } else {
      hint.innerHTML = 'Drop it onto an item or a box to put it inside, or outside its box to take it out.';
    }
  }
  cy.on('grab', 'node', (e) => {
    const item = doc.items.find((it) => it.id === e.target.id());
    const boxes = new Map();
    cy.nodes(':visible').forEach((n) => boxes.set(n.id(), box(n)));
    pickedUp = { id: e.target.id(), parent: item ? item.parent || '' : '', boxes };
  });
  cy.on('drag', 'node', (e) => showDropIntent(e.target));
  cy.on('dragfree', 'node', (e) => {
    const node = e.target;
    const intent = dropIntent(node);
    cy.nodes().removeClass('drop-into drop-out');
    pickedUp = null;
    const id = node.id();
    if (intent.action) {
      selected = id;
      commit((d) => {
        if (intent.to) return moveItem(d, id, intent.to, 'inside');
        // to the top level: right after the top-level item it came from
        let top = intent.from;
        for (let up = top; up; up = (d.items.find((it) => it.id === up) || {}).parent || '') top = up;
        return moveItem(d, id, top, 'after');
      }, { rerender: true });
      io.toast(intent.action === 'in' ? `"${id}" is now inside "${intent.to}". Undo with Ctrl+Z.` : `"${id}" is out of "${intent.from}"${intent.to ? `, now in "${intent.to}"` : ', now at the top level'}. Undo with Ctrl+Z.`);
      $('#preview-hint').textContent = PREVIEW_HINT;
      return;
    }
    dragged = true;
    $('#save-positions').classList.add('btn-primary');
    $('#preview-hint').innerHTML = 'Moved. <strong>Save positions</strong> keeps this arrangement in the standard.';
  });

  $('#preview-layout').addEventListener('change', (e) => { previewLayout = e.target.value; updatePreview(true); });
  $('#relayout').addEventListener('click', () => updatePreview(true));
  $('#fit').addEventListener('click', () => cy.fit(undefined, 30));
  $('#link-mode').addEventListener('click', (e) => {
    linkMode = !linkMode; linkFrom = null;
    e.currentTarget.setAttribute('aria-pressed', String(linkMode));
    $('#preview-hint').textContent = linkMode ? `Click an item, then the item it links to (link type: ${doc.linkTypes[0] ? doc.linkTypes[0].label || doc.linkTypes[0].id : 'none'}).` : PREVIEW_HINT;
    highlightInPreview();
  });
  $('#save-positions').addEventListener('click', () => {
    const pos = {};
    cy.nodes(':childless').forEach((n) => { const p = n.position(); pos[n.id()] = { x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10 }; });
    commit((d) => { d.items.forEach((it) => { if (pos[it.id]) { it.x = pos[it.id].x; it.y = pos[it.id].y; } else { delete it.x; delete it.y; } }); d.layout = 'saved'; }, { rerender: tab === 'about' || tab === 'items' });
    dragged = false;
    $('#save-positions').classList.remove('btn-primary');
    $('#preview-layout').value = 'auto'; previewLayout = 'auto';
    io.toast('Positions saved: the viewer will show this arrangement (layout: saved positions).');
  });

  /* ---- toolbar: new, open, library, export, share, viewer --------------------------------------- */
  const confirmReplace = () => true; // the current standard stays in "My standards": nothing is lost

  $$('[data-new]').forEach((b) => b.addEventListener('click', async () => {
    b.closest('details').open = false;
    if (!confirmReplace()) return;
    if (b.dataset.new === 'blank') { load(BLANK(), 'new'); return; }
    try { load(await io.fetchStandard('/examples/example.dataviz.yaml'), 'example'); }
    catch (e) { io.toast(e.message, 7000); }
  }));
  fetch('/standards/index.json').then((r) => (r.ok ? r.json() : [])).then((list) => {
    $('#new-builtins').innerHTML = list.length ? `<p class="menu-note">Start from a built-in standard</p>${list.map((s) => `<button type="button" data-builtin="${esc(s.id)}">${esc(s.title)}</button>`).join('')}` : '';
  }).catch(() => {});
  $('#new-builtins').addEventListener('click', async (e) => {
    const b = e.target.closest('[data-builtin]');
    if (!b) return;
    b.closest('details').open = false;
    try { load(await io.fetchStandard(`/standards/${b.dataset.builtin}.json`), `built-in ${b.dataset.builtin}`); }
    catch (err) { io.toast(err.message, 7000); }
  });
  $('#import-file').addEventListener('change', async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    try { load(await io.readFiles(files), Array.from(files).map((f) => f.name).join(', ')); }
    catch (err) { io.toast(err.message, 8000); }
    e.target.value = '';
  });
  // drop a file anywhere on the page
  document.addEventListener('dragover', (e) => { if (e.dataTransfer && [...e.dataTransfer.types].includes('Files')) { e.preventDefault(); document.body.classList.add('dropping'); } });
  document.addEventListener('dragleave', (e) => { if (!e.relatedTarget) document.body.classList.remove('dropping'); });
  document.addEventListener('drop', async (e) => {
    if (!e.dataTransfer || !e.dataTransfer.files.length) return;
    e.preventDefault();
    document.body.classList.remove('dropping');
    try { load(await io.readFiles(e.dataTransfer.files), Array.from(e.dataTransfer.files).map((f) => f.name).join(', ')); }
    catch (err) { io.toast(err.message, 8000); }
  });

  function renderLibraryMenu() {
    const list = lib.list();
    $('#library-items').innerHTML = list.length ? list.map((s) => `
      <div class="lib-row${s.id === doc.id ? ' current' : ''}"><button type="button" data-lib="${esc(s.id)}"><strong>${esc(s.title)}</strong><small>${s.items} items · ${esc(new Date(s.savedAt).toLocaleString())}</small></button>
      ${s.id === doc.id ? '<span class="menu-note">editing</span>' : `<button type="button" class="link-btn" data-lib-remove="${esc(s.id)}">remove</button>`}</div>`).join('')
      : '<p class="menu-note">Nothing kept in this browser yet.</p>';
  }
  $('#library-items').addEventListener('click', (e) => {
    const rm = e.target.closest('[data-lib-remove]');
    if (rm) { if (window.confirm('Remove this standard from this browser? Export it first if you want to keep it.')) { lib.remove(rm.dataset.libRemove); renderLibraryMenu(); } return; }
    const b = e.target.closest('[data-lib]');
    if (!b) return;
    $('#library-menu').open = false;
    const std = lib.get(b.dataset.lib);
    if (std) { previousId = std.id; load(std, '', true); }
  });

  $$('[data-export]').forEach((b) => b.addEventListener('click', () => { b.closest('details').open = false; io.exportAs(doc, b.dataset.export); }));
  $('#share').addEventListener('click', async () => {
    const { url } = await io.shareUrl(doc, null);
    const ok = await io.copy(url);
    io.toast(ok ? `Share link copied. It carries the whole standard (${Math.round(url.length / 1024)} kB), so nothing is stored anywhere.${url.length > 8000 ? ' Some apps cut long links: send the file if it does not open.' : ''}` : 'The link could not be copied.', 8000);
  });
  $('#open-viewer').addEventListener('click', () => {
    clearTimeout(saveTimer); keep('');
    window.open(`/view/?local=${encodeURIComponent(doc.id)}`, '_blank', 'noopener');
  });

  // close a dropdown when clicking elsewhere
  document.addEventListener('click', (e) => { $$('details.dropdown[open]').forEach((d) => { if (!d.contains(e.target)) d.open = false; }); });
  document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName);
    if ((e.ctrlKey || e.metaKey) && !typing && e.key.toLowerCase() === 'z') { e.preventDefault(); if (e.shiftKey) redo(); else undo(); }
    if ((e.ctrlKey || e.metaKey) && !typing && e.key.toLowerCase() === 'y') { e.preventDefault(); redo(); }
    if (e.key === 'Escape' && linkFrom) { linkFrom = null; highlightInPreview(); $('#preview-hint').textContent = 'Link cancelled.'; }
  });
  $('#undo').addEventListener('click', undo);
  $('#redo').addEventListener('click', redo);
  window.addEventListener('beforeunload', () => { clearTimeout(saveTimer); if (doc) keep(''); });

  /* ---- start --------------------------------------------------------------------------------- */
  (async () => {
    try {
      const found = await io.fromLocation();
      if (found) {
        if (found.origin.type === 'local') previousId = found.origin.value;
        load(found.raw, found.origin.type === 'src' ? found.origin.value : found.origin.type === 'std' ? `built-in ${found.origin.value}` : '', found.origin.type === 'local');
        history.replaceState(null, '', '/builder/');
        return;
      }
    } catch (e) { io.toast(e.message, 8000); }
    let last = null;
    try { last = localStorage.getItem(LAST); } catch (e) { /* ignore */ }
    const kept = last && lib.get(last);
    if (kept) { previousId = kept.id; load(kept, '', true); }
    else load(BLANK(), 'new');
  })();
})();
