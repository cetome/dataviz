/*!
 * dataviz - the viewer (/view/): any standard in the dataviz format as an interactive graph.
 *
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Opens what the address asks for (js/io.js: share link, built-in, web address, browser library),
 * or shows the start screen. Like the built-in pages, the view is a function of one `state` object:
 * every control writes the state and calls render(). Everything stays in the browser.
 */
(function () {
  'use strict';
  const { $, $$, escapeHtml } = DV;
  const S = window.DVStandard;
  const io = window.DVio;
  const lib = window.DVLibrary;

  /* ---- start screen -------------------------------------------------------------------------- */
  function showStart(error) {
    $('#start').hidden = false;
    $('#app').hidden = true;
    document.body.classList.remove('graph-page');
    const err = $('#open-error');
    err.textContent = error || '';
    err.hidden = !error;

    const openRaw = (raw, source) => {
      const { std } = S.read(raw);
      // a standard with the same id replaces the copy kept in this browser (a newer version of it)
      if (lib.put(S.clean(std), source)) location.href = `/view/?local=${encodeURIComponent(std.id)}`;
      else open(raw, { type: 'file' }); // the browser keeps nothing (private window): show it once
    };
    io.dropZone($('#open-drop'), $('#open-file'), async (files) => {
      try { openRaw(await io.readFiles(files), Array.from(files).map((f) => f.name).join(', ')); }
      catch (e) { err.textContent = e.message; err.hidden = false; }
    });
    $('#copy-prompt').addEventListener('click', async (e) => {
      const button = e.currentTarget;
      try {
        const text = await (await fetch('/templates/ai-prompt.txt')).text();
        button.textContent = (await io.copy(text)) ? 'Copied: paste it into your AI assistant' : 'Could not copy: use "read it"';
      } catch (err) { button.textContent = 'Could not load it: use "read it"'; }
      setTimeout(() => { button.textContent = 'Copy the AI prompt'; }, 5000);
    });
    $('#open-url-form').addEventListener('submit', (e) => {
      e.preventDefault();
      location.href = `/view/${io.hashOf(new URL($('#open-url').value.trim()).href)}`;
    });

    // in this browser
    const kept = lib.list();
    $('#library-block').hidden = !kept.length;
    const renderLibrary = () => {
      const list = lib.list();
      $('#library-block').hidden = !list.length;
      $('#library-list').innerHTML = list.map((s) => `
        <li>
          <a class="std-open" href="/view/?local=${encodeURIComponent(s.id)}"><strong>${escapeHtml(s.title)}</strong>
            <span>${escapeHtml(s.subtitle || '')}</span>
            <small>${s.items} items · kept ${escapeHtml(new Date(s.savedAt).toLocaleString())}${s.source ? ` · from ${escapeHtml(s.source)}` : ''}</small></a>
          <span class="std-actions"><a href="/builder/?local=${encodeURIComponent(s.id)}">Edit</a>
          <button type="button" class="link-btn" data-remove="${escapeHtml(s.id)}">Remove</button></span>
        </li>`).join('');
    };
    renderLibrary();
    $('#library-list').addEventListener('click', (e) => {
      const b = e.target.closest('[data-remove]');
      if (!b) return;
      if (!window.confirm('Remove this standard from this browser? Download it first if you want to keep it.')) return;
      lib.remove(b.dataset.remove);
      renderLibrary();
    });

    // built-in standards: standards/index.json
    fetch('/standards/index.json').then((r) => (r.ok ? r.json() : [])).then((list) => {
      $('#builtin-list').innerHTML = list.map((s) => `
        <li>
          <a class="std-open" href="/view/?std=${encodeURIComponent(s.id)}"><strong>${escapeHtml(s.title)}</strong>
            <span>${escapeHtml(s.subtitle || '')}</span>
            <small>${s.items} items${s.licence ? ` · ${escapeHtml(s.licence)}` : ''}</small></a>
          <span class="std-actions"><a href="/builder/?std=${encodeURIComponent(s.id)}">Start from it</a></span>
        </li>`).join('') || '<li class="hint">None on this site.</li>';
    }).catch(() => { $('#builtin-list').innerHTML = '<li class="hint">The list could not be loaded.</li>'; });
  }

  /* ---- the graph ------------------------------------------------------------------------------ */
  function open(raw, origin) {
    const { std, issues } = S.read(raw);
    $('#start').hidden = true;
    $('#app').hidden = false;
    document.body.classList.add('graph-page');
    document.title = `${std.title} ◼ dataviz`;
    $('#page-title').innerHTML = `${escapeHtml(std.title)}${std.subtitle ? ` <small>${escapeHtml(std.subtitle)}</small>` : ''}`;

    const types = new Map(std.types.map((k) => [k.id, k]));
    const linkTypes = new Map(std.linkTypes.map((k) => [k.id, k]));
    const tagLabel = new Map(std.filters.flatMap((f) => f.tags.map((t) => [t.id, t.label])));
    const hasPositions = std.items.some((it) => it.x !== undefined);

    /* state */
    const state = {
      search: '',
      filters: Object.fromEntries(std.filters.map((f) => [f.id, new Set()])),
      hiddenTypes: new Set(),
      hiddenLinkTypes: new Set(),
      withLinked: true,
      isolate: false,
      linkLabels: false,
      layout: std.layout === 'auto' ? (hasPositions ? 'saved' : 'organic') : (std.layout === 'saved' && !hasPositions ? 'organic' : std.layout),
      selected: null,
    };

    const styles = () => [...S.stylesheet(std, { linkLabels: state.linkLabels }), ...DV.assessmentStyles()];
    const cy = cytoscape({ container: $('#cy'), elements: S.toElements(std), style: styles(), layout: { name: 'preset' }, maxZoom: 2.5 });
    window.cy = cy;

    /* layout */
    const saved = new Map(std.items.filter((it) => it.x !== undefined).map((it) => [it.id, { x: it.x, y: it.y }]));
    function savedPosition(n) {
      if (saved.has(n.id())) return saved.get(n.id());
      // no saved position: next to a placed sibling, or to anything placed in the same parent
      const near = n.siblings().filter((s) => saved.has(s.id()));
      const anchor = near.length ? saved.get(near[0].id()) : [...saved.values()][0] || { x: 0, y: 0 };
      const i = n.siblings().filter((s) => !saved.has(s.id())).add(n).sort((a, b) => a.id().localeCompare(b.id())).indexOf(n);
      return { x: anchor.x + 40 + i * 30, y: anchor.y + 60 };
    }
    let lastKey = null;
    function runLayout(force) {
      const eles = cy.elements(':visible');
      const key = eles.nodes().map((n) => n.id()).sort().join('|');
      if (!force && key === lastKey) return;
      lastKey = key;
      if (state.layout === 'saved') {
        if (force) cy.nodes(':childless').forEach((n) => n.position(savedPosition(n)));
        cy.animate({ fit: { eles, padding: 30 }, duration: force ? 0 : 250 });
        return;
      }
      const opts = S.layoutOptions({ ...std, layout: state.layout }, state.layout, cy);
      eles.layout({ ...opts, fit: true }).run();
    }

    /* visibility */
    const tagsOf = (n) => n.data('tags') || [];
    const anyFilter = () => Object.values(state.filters).some((set) => set.size);
    function passes(n) {
      for (const f of std.filters) {
        const ticked = state.filters[f.id];
        if (!ticked.size) continue;
        const tags = tagsOf(n);
        if (f.mode === 'any' && !tags.some((t) => ticked.has(t))) return false;
        if (f.mode === 'all' && ![...ticked].every((t) => tags.includes(t))) return false;
        if (f.mode === 'none' && tags.some((t) => ticked.has(t))) return false;
      }
      return true;
    }
    function computeVisible() {
      // types switched off in the legend take their whole content with them
      let base = cy.nodes().filter((n) => !n.union(n.ancestors()).some((a) => state.hiddenTypes.has(a.data('type'))));
      if (anyFilter()) {
        // an item is kept when it passes every filter; its parents are drawn around it
        let kept = base.filter(passes);
        // the linked items come along, unless a "hide" (none) filter rules them out
        const hiding = std.filters.filter((f) => f.mode === 'none' && state.filters[f.id].size);
        const notHidden = (n) => hiding.every((f) => !tagsOf(n).some((t) => state.filters[f.id].has(t)));
        if (state.withLinked) kept = kept.union(kept.filter(':childless').neighborhood('node').intersection(base).filter(notHidden));
        base = base.intersection(kept.union(kept.ancestors()));
      }
      return base.filter((n) => n.ancestors().every((a) => base.has(a)));
    }

    function searchHits() {
      const s = state.search;
      if (!s) return cy.collection();
      const inText = (v) => String(v || '').toLowerCase().includes(s);
      return cy.nodes().filter((n) => inText(n.id()) || inText(n.data('label')) || inText(n.data('title')) || inText(n.data('text'))
        || tagsOf(n).some((t) => inText(t) || inText(tagLabel.get(t))))
        .union(cy.edges().filter((e) => inText(e.data('label'))).connectedNodes());
    }

    function render() {
      const visible = computeVisible();
      cy.batch(() => {
        cy.nodes().forEach((n) => (visible.has(n) ? n.show() : n.hide()));
        cy.edges().forEach((e) => (state.hiddenLinkTypes.has(e.data('type')) ? e.hide() : e.show()));
      });
      // the layout follows the filters, never the click (hiding on click must not move the graph)
      runLayout(false);
      cy.batch(() => {
        cy.elements().removeClass('faded focus match');

        const hits = searchHits();
        hits.addClass('match');
        $('#search-count').textContent = state.search ? `${hits.intersection(visible).length} matching item${hits.length === 1 ? '' : 's'}${hits.length > hits.intersection(visible).length ? ` (${hits.length - hits.intersection(visible).length} hidden by the filters)` : ''}` : '';

        const sel = state.selected && state.selected.inside() && visible.has(state.selected) ? state.selected : null;
        if (sel) {
          const links = sel.connectedEdges(':visible');
          const context = sel.union(links).union(links.connectedNodes()).union(sel.descendants()).union(sel.ancestors()).union(links.connectedNodes().ancestors());
          sel.addClass('focus');
          links.addClass('focus');
          if (state.isolate) cy.nodes().difference(context).hide();
          else cy.elements().difference(context).addClass('faded');
        } else if (state.search && hits.length) {
          cy.nodes().difference(hits.union(hits.ancestors())).addClass('faded');
          cy.edges().addClass('faded');
        }
      });
    }

    /* details panel and assessment (js/assessment.js) */
    /** "5.1-1", "AUM-1 Authentication"; a title that already starts with its id is shown alone. */
    const fullName = (n) => { const t = n.data('title') || ''; return !t || t === n.id() ? n.id() : t.startsWith(n.id()) ? t : `${n.id()} ${t}`; };
    const nodeLink = (n) => `<a href="#" data-goto="${escapeHtml(n.id())}">${escapeHtml(fullName(n))}</a>`;
    function describe(node) {
      const type = types.get(node.data('type'));
      const title = node.data('title') || node.id();
      const parts = [];
      if (node.data('text')) parts.push(S.textToHtml(node.data('text')));
      if (node.data('url') && /^https?:\/\//.test(node.data('url'))) parts.push(`<p><a href="${escapeHtml(node.data('url'))}" target="_blank" rel="noopener noreferrer">Source ↗</a></p>`);
      std.filters.forEach((f) => {
        const mine = f.tags.filter((t) => tagsOf(node).includes(t.id));
        if (mine.length) parts.push(`<p><strong>${escapeHtml(f.label)}:</strong> ${mine.map((t) => `<span class="chip">${escapeHtml(t.label)}</span>`).join(' ')}</p>`);
      });
      if (node.parent().length) parts.push(`<p><strong>In:</strong> ${nodeLink(node.parent())}</p>`);
      const kids = node.children();
      if (kids.length) parts.push(`<p><strong>Contains ${kids.length} item${kids.length > 1 ? 's' : ''}:</strong></p><ul class="link-list">${kids.slice(0, 40).map((k) => `<li>${nodeLink(k)}</li>`).join('')}${kids.length > 40 ? `<li>... and ${kids.length - 40} more</li>` : ''}</ul>`);
      const linkLine = (e, arrow, other) => {
        const k = linkTypes.get(e.data('type'));
        const what = [k ? k.label : '', e.data('label') && (!k || e.data('label') !== k.label) ? e.data('label') : ''].filter(Boolean).join(': ');
        return `<li>${arrow} ${nodeLink(other)}${what ? ` <em>(${escapeHtml(what)})</em>` : ''}</li>`;
      };
      const out = node.outgoers('edge').map((e) => linkLine(e, '→', e.target()));
      const inc = node.incomers('edge').map((e) => linkLine(e, '←', e.source()));
      if (out.length || inc.length) parts.push(`<p><strong>Links:</strong></p><ul class="link-list">${out.join('')}${inc.join('')}</ul>`);
      return { heading: title, subtitle: [title !== node.id() ? node.id() : '', type ? type.label : ''].filter(Boolean).join(' · '), html: parts.join('') };
    }
    const assessable = (n) => {
      const k = types.get(n.data('type'));
      if (k && k.assess === 'yes') return true;
      if (k && k.assess === 'no') return false;
      return n.isChildless();
    };
    const assessment = DV.assessment(cy, {
      page: `std-${std.id}`,
      fileStem: `${std.id} assessment`,
      describe, assessable,
      labelOf: fullName,
      onSelect: (node) => select(node),
    });
    function select(node) {
      state.selected = node;
      if (node) assessment.select(node); else assessment.clear();
      render();
    }
    $('#details-content').addEventListener('click', (e) => {
      const a = e.target.closest('a[data-goto]');
      if (!a) return;
      e.preventDefault();
      const n = cy.getElementById(a.dataset.goto);
      if (!n.length) return;
      select(n);
      if (n.visible()) cy.animate({ center: { eles: n }, duration: 300 });
    });

    /* sidebar: about, filters, legend */
    const meta = [std.version && `Version ${escapeHtml(std.version)}`, std.date && escapeHtml(std.date), std.authors && `by ${escapeHtml(std.authors)}`].filter(Boolean).join(' · ');
    const errors = issues.filter((i) => i.level === 'error');
    $('#about-panel').innerHTML = `
      <h2 class="panel-title">About</h2>
      ${std.description ? `<div class="about-text">${S.textToHtml(std.description)}</div>` : ''}
      ${meta ? `<p class="hint">${meta}</p>` : ''}
      <p class="hint">${std.licence ? `Licence: ${escapeHtml(std.licence)}` : 'No licence stated: ask the author before reusing it.'}${std.url && /^https?:\/\//.test(std.url) ? ` · <a href="${escapeHtml(std.url)}" target="_blank" rel="noopener noreferrer">Source ↗</a>` : ''}</p>
      <p class="hint">${std.items.length} items, ${std.links.length} links${origin.type === 'src' ? ` · from ${escapeHtml(new URL(origin.value).host)}` : origin.type === 'local' ? ' · kept in this browser' : origin.type === 'share' ? ' · from a share link' : ''}</p>
      ${issues.length ? `<details class="issues"><summary>${errors.length ? `${errors.length} error${errors.length > 1 ? 's' : ''}` : ''}${errors.length && issues.length > errors.length ? ', ' : ''}${issues.length > errors.length ? `${issues.length - errors.length} warning${issues.length - errors.length > 1 ? 's' : ''}` : ''} in this file</summary><ul>${issues.map((i) => `<li class="issue-${i.level}">${escapeHtml(i.message)}</li>`).join('')}</ul></details>` : ''}`;

    const modeHint = { any: 'Shows the items with any ticked tag.', all: 'Shows the items with every ticked tag.', none: 'Hides the items with a ticked tag.' };
    $('#filter-panels').innerHTML = std.filters.map((f) => `
      <section class="panel">
        <h2 class="panel-title">${escapeHtml(f.label)}</h2>
        <p class="hint">${modeHint[f.mode]}</p>
        <ul>${f.tags.map((t) => `<li><label class="check"><input type="checkbox" data-filter="${escapeHtml(f.id)}" value="${escapeHtml(t.id)}"> ${escapeHtml(t.label)}</label></li>`).join('')}</ul>
      </section>`).join('');
    $('#filter-panels').addEventListener('change', (e) => {
      const input = e.target.closest('input[data-filter]');
      if (!input) return;
      const set = state.filters[input.dataset.filter];
      if (input.checked) set.add(input.value); else set.delete(input.value);
      render();
    });

    const usedTypes = new Set(std.items.map((it) => it.type || ''));
    const swatch = (k) => {
      const c = k.color || k.autoColor;
      const light = k.border === 'dashed' || k.border === 'dotted';
      return `<span class="swatch" style="background:${light ? '#fff' : c};border-color:${c};border-style:${k.border === 'none' ? 'solid' : k.border}"></span>`;
    };
    $('#legend-types').innerHTML = std.types.filter((k) => usedTypes.has(k.id)).map((k) => `
      <label class="check" title="${escapeHtml(k.description || '')}"><input type="checkbox" data-type="${escapeHtml(k.id)}" checked> ${swatch(k)} ${escapeHtml(k.label)}</label>`).join('');
    const usedLinkTypes = new Set(std.links.map((l) => l.type || ''));
    $('#legend-links').innerHTML = std.linkTypes.filter((k) => usedLinkTypes.has(k.id)).map((k) => `
      <label class="check"><input type="checkbox" data-link-type="${escapeHtml(k.id)}" checked> <span class="line-swatch" style="border-top-color:${k.color || k.autoColor};border-top-style:${k.style}"></span> ${escapeHtml(k.label)}</label>`).join('');
    $('#legend-panel').hidden = !$('#legend-types').children.length && !$('#legend-links').children.length;
    $('#legend-panel').addEventListener('change', (e) => {
      const k = e.target.dataset.type; const lk = e.target.dataset.linkType;
      if (k !== undefined) { if (e.target.checked) state.hiddenTypes.delete(k); else state.hiddenTypes.add(k); }
      if (lk !== undefined) { if (e.target.checked) state.hiddenLinkTypes.delete(lk); else state.hiddenLinkTypes.add(lk); }
      render();
    });

    /* options */
    const layoutSelect = $('#layout-select');
    layoutSelect.querySelector('option[value="saved"]').disabled = !hasPositions;
    layoutSelect.value = state.layout;
    layoutSelect.addEventListener('change', () => { state.layout = layoutSelect.value; runLayout(true); });
    $('#opt-linked').addEventListener('change', (e) => { state.withLinked = e.target.checked; render(); });
    $('#opt-isolate').addEventListener('change', (e) => { state.isolate = e.target.checked; render(); });
    $('#opt-labels').addEventListener('change', (e) => { state.linkLabels = e.target.checked; cy.style(styles()); });
    $('#search').addEventListener('input', (e) => { state.search = e.target.value.trim().toLowerCase(); render(); });

    cy.on('tap', 'node', (e) => select(e.target));
    cy.on('tap', 'edge', (e) => { state.selected = null; assessment.clear(); render(); e.target.connectedNodes().addClass('focus'); e.target.addClass('focus'); });
    DV.onBackgroundTap(cy, () => select(null));

    $('#fit-graph').addEventListener('click', () => DV.fit(cy));
    $('#reset-graph').addEventListener('click', () => {
      $$('#filter-panels input').forEach((el) => { el.checked = false; });
      $$('#legend-panel input').forEach((el) => { el.checked = true; });
      Object.values(state.filters).forEach((set) => set.clear());
      state.hiddenTypes.clear(); state.hiddenLinkTypes.clear();
      state.search = ''; $('#search').value = '';
      state.selected = null;
      assessment.reset();
      render();
      runLayout(true);
    });

    /* share and download */
    $('#share-link').addEventListener('click', async () => {
      const { url, embedded } = await io.shareUrl(std, origin);
      const ok = await io.copy(url);
      $('#share-note').textContent = !ok ? 'The link could not be copied. Copy it from the address bar.'
        : embedded ? `Link copied. It carries the whole standard (${Math.round(url.length / 1024)} kB of text), so nothing is stored anywhere.${url.length > 8000 ? ' It is long: some apps cut long links, so send the file if it does not open.' : ''}`
          : 'Link copied.';
      if (embedded && ok && origin.type !== 'share') history.replaceState(null, '', url.replace(location.origin, ''));
    });
    $('#edit-builder').addEventListener('click', () => {
      if (origin.type === 'std') { location.href = `/builder/?std=${encodeURIComponent(origin.value)}`; return; }
      if (origin.type === 'local') { location.href = `/builder/?local=${encodeURIComponent(origin.value)}`; return; }
      if (lib.put(S.clean(std), origin.type === 'src' ? origin.value : 'share link')) location.href = `/builder/?local=${encodeURIComponent(std.id)}`;
      else io.toast('This browser keeps nothing (private window?): download the file and open it in the builder.');
    });
    $$('[data-export]').forEach((b) => b.addEventListener('click', () => io.exportAs(std, b.dataset.export)));

    runLayout(true);
    render();
    if (state.layout !== 'saved') cy.fit(cy.elements(':visible'), 30);
  }

  /* ---- go ------------------------------------------------------------------------------------- */
  io.fromLocation()
    .then((found) => (found ? open(found.raw, found.origin) : showStart()))
    .catch((e) => showStart(e.message));
})();
