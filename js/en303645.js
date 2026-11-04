/**
 * dataviz - EN 303 645 provisions and the TS 103 701 IXITs (en303645/).
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Usage (at the end of the page, after the data file, js/graph-common.js, js/assessment.js and the xlsx library):
 *   DV.en303645({ elements: EN303645_DATA, positions: EN303645_POSITIONS });
 *
 * Node data used here: id, title (chapters), parent, type (parent | mandatory | recommended | IXIT),
 * condition ("c1".."c13"). Edge data: source, target, documentation (the IXIT fields), provision.
 *
 * The view is a function of one state object: every control writes the state and calls render().
 * The ICS import removes elements from the graph for good (reload the page to start over).
 */
DV.en303645 = function init(config) {
  'use strict';
  const { $, $$, colors, escapeHtml } = DV;

  /* ---- cytoscape ---------------------------------------------------------- */
  const font = 'Inter, system-ui, sans-serif';
  const stylesheet = [
    { selector: 'node', style: { label: 'data(id)', 'font-family': font, 'font-size': 11, color: colors.ink, 'text-valign': 'top', 'text-margin-y': -2 } },
    { selector: 'node[type="parent"]', style: { label: 'data(title)', 'font-weight': 600, color: colors.text, 'background-color': colors.surfaceAlt, 'background-opacity': 0.8, 'border-width': 1, 'border-color': colors.line, padding: 12 } },
    { selector: 'node[type="mandatory"]', style: { 'background-color': colors.surface, 'border-width': 1.5, 'border-color': colors.blue } },
    { selector: 'node[type="recommended"]', style: { 'background-color': '#DADADA', 'border-width': 1, 'border-color': '#AAA', 'border-style': 'dashed' } },
    { selector: 'node[type="IXIT"]', style: { shape: 'round-rectangle', 'background-color': '#9FA', 'border-width': 1, 'border-color': '#4c9' } },
    { selector: 'edge', style: { width: 1, 'line-color': '#999', 'target-arrow-color': '#999', 'target-arrow-shape': 'triangle', 'curve-style': 'bezier' } },
    { selector: 'edge.showdoc', style: { label: 'data(documentation)', 'font-family': font, 'font-size': 8, 'font-style': 'italic', color: colors.muted, 'text-wrap': 'wrap', 'text-max-width': 160, 'text-rotation': 'autorotate' } },
    { selector: 'node.highlighted', style: { 'background-color': '#28F', color: '#28F' } },
    { selector: 'edge.highlighted', style: { 'line-color': '#28F', 'target-arrow-color': '#28F', width: 2 } },
    { selector: 'node[type="IXIT"].highlighted', style: { 'background-color': '#082', color: '#082' } },
    { selector: 'node[type="parent"].highlighted', style: { 'background-color': '#EAEAFA', color: colors.blue } },
  ];

  const cy = cytoscape({ container: $('#cy'), elements: config.elements, style: [...stylesheet, ...DV.assessmentStyles()], layout: { name: 'preset' } });
  window.cy = cy;
  DV.layoutFromPositions(cy, config.positions, { name: 'cose-bilkent', tilingPaddingHorizontal: 50, gravityRangeCompound: 4 }).run();

  /* ---- state --------------------------------------------------------------- */
  const state = {
    search: '',
    showDoc: false,
    types: [],              // ticked "highlight" types: mandatory / recommended
    conditions: [],         // ticked conditions: c1 .. c13
    ixit: '',               // id of the IXIT in view, or ''
    ixitOnly: false,
    highlightedOnly: false,
    selected: null,         // tapped node
  };

  /** The node, its neighbours and their chapters, its chapter, its children and their neighbours. */
  function contextOf(node) {
    const neighbours = node.neighborhood('node');
    const children = node.children();
    return node.union(neighbours).union(neighbours.parent()).union(neighbours.children()).union(node.parent())
      .union(children).union(children.neighborhood('node'));
  }

  /** Nodes and edges matched by the highlight controls and the search box. */
  function highlightSet() {
    let hits = cy.collection();
    if (state.conditions.length) {
      const types = state.types.length ? state.types : ['mandatory', 'recommended'];
      hits = cy.nodes().filter((n) => types.includes(n.data('type')) && state.conditions.includes(n.data('condition')));
    } else if (state.types.length) {
      hits = cy.nodes().filter((n) => state.types.includes(n.data('type')));
    }
    if (state.search) {
      const s = state.search;
      hits = hits.union(cy.nodes().filter((n) => n.id().toLowerCase().includes(s) || String(n.data('title') || '').toLowerCase().includes(s)));
      hits = hits.union(cy.edges().filter((e) => String(e.data('documentation') || '').toLowerCase().includes(s)));
    }
    return hits;
  }

  /* ---- render: state -> classes and visibility ---------------------------------- */
  function render() {
    // "highlighted only" needs something highlighted by the checkboxes; otherwise it is off and disabled
    const canRestrict = state.types.length > 0 || state.conditions.length > 0;
    const only = $('#show-highlighted-only');
    only.disabled = !canRestrict;
    if (!canRestrict && only.checked) only.checked = false;
    state.highlightedOnly = only.checked;

    cy.batch(() => {
      cy.elements().removeClass('highlighted');
      const hits = highlightSet();
      const hitNodes = hits.nodes().union(hits.edges().connectedNodes());
      let context = cy.collection();
      hitNodes.forEach((n) => { context = context.union(contextOf(n)); });
      const shown = hitNodes.union(context);

      let base = cy.nodes();
      if (state.ixit) {
        const ixit = cy.getElementById(state.ixit);
        if (ixit.length) { ixit.addClass('highlighted'); base = base.intersection(contextOf(ixit)); }
      }
      if (state.ixitOnly) base = base.filter('[type="IXIT"]');
      if (state.search || state.highlightedOnly) base = base.intersection(shown);
      if (state.selected && state.selected.inside()) base = base.intersection(contextOf(state.selected));

      // a node can only be drawn when its chapter is drawn
      base = base.filter((n) => n.ancestors().every((a) => base.has(a)));
      cy.nodes().forEach((n) => (base.has(n) ? n.show() : n.hide()));
      cy.edges().show();
      hits.addClass('highlighted');
      if (state.selected && state.selected.inside()) state.selected.addClass('highlighted');
      cy.edges().toggleClass('showdoc', state.showDoc);
    });
  }

  /* ---- details and assessment (shared module) ------------------------------------------- */
  const conditionLabel = (c) => { const input = $(`#condition-filter input[value="${c}"]`); return input ? input.parentElement.textContent.trim().replace(/^\d+\)\s*/, '') : c; };
  const isProvision = (n) => ['mandatory', 'recommended'].includes(n.data('type'));
  const fieldList = (edges, who) => `<ul>${edges.map((e) => `<li><strong>${escapeHtml(who(e).id())}</strong>: ${escapeHtml(e.data('documentation') || '')}</li>`).join('')}</ul>`;

  const assessment = DV.assessment(cy, {
    page: 'en303645',
    assessable: isProvision,
    labelOf: (n) => n.id(),
    describe: (node) => {
      const type = node.data('type');
      if (type === 'parent') {
        const kids = node.children();
        return { heading: node.data('title') || node.id(), subtitle: '', html: `<p><strong>${kids.length}</strong> provision${kids.length > 1 ? 's' : ''}: ${escapeHtml(kids.map((k) => k.id()).join(', '))}</p>` };
      }
      if (isProvision(node)) {
        const when = node.data('condition') ? `, applies when ${escapeHtml(conditionLabel(node.data('condition')))}` : '';
        const ixits = node.connectedEdges().filter((e) => e.target().data('type') === 'IXIT');
        const html = `<p><strong>${type === 'mandatory' ? 'Mandatory' : 'Recommended'} provision</strong>${when}.</p>`
          + (ixits.length ? `<p><strong>IXIT fields required (TS 103 701):</strong></p>${fieldList(ixits, (e) => e.target())}` : '<p>No IXIT field is required for this provision.</p>');
        return { heading: node.id(), subtitle: node.parent().length ? node.parent().data('title') : '', html };
      }
      const sources = node.connectedEdges().filter((e) => e.target().id() === node.id() && isProvision(e.source()));
      const html = sources.length ? `<p><strong>Required by:</strong></p>${fieldList(sources, (e) => e.source())}` : '<p>No provision of this graph requires this IXIT.</p>';
      return { heading: node.id(), subtitle: 'TS 103 701 implementation eXtra Information for Testing', html };
    },
    onSelect: (node) => { state.selected = node; render(); assessment.select(node); },
  });

  /* ---- controls ------------------------------------------------------------ */
  const ixitSelect = $('#ixit-filter');
  const ixitNumber = (id) => parseInt(id.replace('IXIT ', ''), 10) || 0;
  function fillIxitSelect() {
    const current = ixitSelect.value;
    const ixits = cy.nodes('[type="IXIT"]').map((n) => n.id()).sort((a, b) => ixitNumber(a) - ixitNumber(b));
    ixitSelect.innerHTML = '<option value="">Show all</option>' + ixits.map((id) => `<option value="${DV.escapeHtml(id)}">${DV.escapeHtml(id)}</option>`).join('');
    ixitSelect.value = ixits.includes(current) ? current : '';
    state.ixit = ixitSelect.value;
  }
  fillIxitSelect();

  const readControls = () => {
    state.search = $('#search-filter').value.trim().toLowerCase();
    state.showDoc = $('#show-documentation').checked;
    state.types = DV.checkedValues('#type-filter input');
    state.conditions = DV.checkedValues('#condition-filter input');
    state.ixit = ixitSelect.value;
    state.ixitOnly = $('#show-ixit-only').checked;
    state.highlightedOnly = $('#show-highlighted-only').checked;
  };
  DV.onChange('#type-filter input, #condition-filter input, #show-documentation, #ixit-filter, #show-ixit-only, #show-highlighted-only', () => { readControls(); render(); });
  $('#search-filter').addEventListener('input', () => { readControls(); render(); });

  cy.on('tap', 'node', (event) => { state.selected = event.target; assessment.select(event.target); render(); });
  DV.onBackgroundTap(cy, () => { state.selected = null; assessment.clear(); render(); });

  $('#reset-graph').addEventListener('click', () => {
    $$('aside input[type=checkbox]').forEach((el) => { el.checked = false; });
    $('#search-filter').value = '';
    ixitSelect.value = '';
    state.selected = null;
    assessment.reset();
    readControls();
    render();
    DV.fit(cy);
  });
  $('#fit-graph').addEventListener('click', () => DV.fit(cy));

  /* ---- ICS import: keep only the provisions the product supports ------------------- */
  const dropZone = $('#drop-zone');
  const status = $('#ics-status');

  function importIcs(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(new Uint8Array(event.target.result), { type: 'array' });
        const sheet = workbook.Sheets.ICS;
        if (!sheet) throw new Error('no ICS sheet');
        // rows 3 to 86 of the BSI template: provision id in column A, "Yes" in column C when supported
        const unsupported = [];
        for (let row = 2; row <= 85; row++) {
          const id = sheet[XLSX.utils.encode_cell({ r: row, c: 0 })];
          const support = sheet[XLSX.utils.encode_cell({ r: row, c: 2 })];
          if (id && support && support.v !== 'Yes') unsupported.push(String(id.v));
        }
        cy.batch(() => {
          cy.nodes().filter((n) => unsupported.includes(n.id())).remove();
          cy.edges().filter((e) => unsupported.includes(String(e.data('provision') || ''))).remove();
          cy.nodes('[type="parent"]').filter((n) => n.children().length === 0).remove();
          cy.nodes('[type="IXIT"]').filter((n) => n.neighborhood().length === 0).remove();
        });
        state.selected = null;
        assessment.clear();
        fillIxitSelect();
        render();
        DV.fit(cy);
        status.textContent = `${file.name}: ${unsupported.length} unsupported provision${unsupported.length === 1 ? '' : 's'} removed. Reload the page to start over.`;
      } catch (error) {
        status.textContent = 'This file is not the BSI ICS template (an "ICS" sheet is expected).';
      }
    };
    reader.readAsArrayBuffer(file);
  }

  dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-active'); });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-active'));
  dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('drag-active'); importIcs(e.dataTransfer.files[0]); });
  $('#ICSfile').addEventListener('change', (e) => importIcs(e.target.files[0]));

  /* ---- IXIT export: one sheet per IXIT with the fields the graph requires. Through the gate
          (js/gate.js): an address, verified once, and the download is recorded. ----------------- */
  const makeIxit = () => {
    const fields = new Map(); // IXIT id -> Set of field names
    cy.edges().forEach((edge) => {
      const target = edge.target();
      if (target.data('type') !== 'IXIT') return;
      if (!fields.has(target.id())) fields.set(target.id(), new Set());
      String(edge.data('documentation') || '').split(',').map((s) => s.trim()).filter(Boolean).forEach((f) => fields.get(target.id()).add(f));
    });
    const sorted = [...fields.entries()].sort((a, b) => ixitNumber(a[0]) - ixitNumber(b[0]));

    const workbook = XLSX.utils.book_new();
    const summary = XLSX.utils.aoa_to_sheet([
      ['Product name:'],
      ['Date:', new Date().toLocaleDateString()],
      ['created with cetome dataviz'],
      [],
      ['IXIT', 'Required fields'],
      ...sorted.map(([id, set]) => [id, [...set].join(', ')]),
    ]);
    XLSX.utils.book_append_sheet(workbook, summary, 'Summary');
    sorted.forEach(([id, set]) => {
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([[id], ...[...set].map((f) => [f])]), id.slice(0, 31));
    });
    XLSX.writeFile(workbook, 'cetome dataviz IXITs.xlsx');
  };
  $('#generate-ixit').addEventListener('click', () => (DV.gate ? DV.gate.require('ixit', makeIxit) : makeIxit()));

  readControls();
  render();
  return cy;
};
