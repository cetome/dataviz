/**
 * dataviz - EN 18031 graphs (security mechanisms in en18031/, E.Info in einfo/).
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Usage (at the end of the page, after the data file, js/graph-common.js and js/assessment.js):
 *   DV.en18031({ elements: EN18031_DATA });                                            // mechanisms
 *   DV.en18031({ elements: EN18031_EINFO_DATA, positions: EN18031_EINFO_POSITIONS }); // E.Info
 *
 * Node data used here: id, title, parent, en18031_1/_2/_3 (booleans), isParent (mechanisms),
 * mechanism (E.Info, "ACM-1, SSM-2, ..."), condition (E.Info, true when the node is conditional).
 *
 * The view is a function of one state object: every control writes the state and calls render().
 */
DV.en18031 = function init(config) {
  'use strict';
  const { $, $$, colors, escapeHtml } = DV;
  const isEinfo = Boolean(config.positions);

  /* ---- cytoscape ---------------------------------------------------------- */
  const stylesheet = [
    { selector: 'node', style: {
      label: 'data(title)', color: colors.ink, 'font-size': 12, 'font-family': 'Inter, system-ui, sans-serif',
      'background-color': colors.surface, 'border-width': 1, 'border-color': colors.blue,
      'text-valign': 'center', 'text-halign': 'center',
    } },
    { selector: 'node:childless', style: { 'text-valign': 'top', 'text-margin-y': -2 } },
    { selector: 'node:parent', style: {
      'text-valign': 'top', 'font-weight': 600, color: colors.blue, 'background-color': colors.surfaceAlt,
      'background-opacity': 0.5, padding: 10,
    } },
    { selector: 'node[condition]', style: { 'background-color': colors.lineSoft, 'border-color': colors.muted, 'border-style': 'dashed' } },
    { selector: 'edge', style: {
      width: 1, 'curve-style': 'taxi', 'line-color': '#AAA', 'target-arrow-color': '#AAA',
      'target-arrow-shape': isEinfo ? 'triangle' : 'square',
    } },
    { selector: 'node.mech-highlighted', style: { 'background-color': '#DFE' } },
    { selector: 'node.highlighted', style: { 'background-color': '#DFE' } },
    { selector: 'node.selected', style: { 'background-color': '#28F', color: '#28F' } },
    { selector: 'node.parenthighlighted', style: { 'background-color': '#68F', 'background-opacity': 0.5, color: '#68D' } },
    { selector: 'edge.highlighted, edge.selected', style: { 'line-color': '#28F', 'target-arrow-color': '#28F', width: 2 } },
  ];

  const cy = cytoscape({
    container: $('#cy'),
    elements: config.elements,
    style: [...stylesheet, ...DV.assessmentStyles()],
    layout: { name: 'preset' }, // the real layout runs below, once
  });
  window.cy = cy; // handy in the browser console

  const coseLayout = { name: 'cose-bilkent', padding: 8, idealEdgeLength: 30, nestingFactor: 0.1, gravityRange: 1.6, nodeDimensionsIncludeLabels: true, animate: false };
  const layout = isEinfo ? DV.layoutFromPositions(cy, config.positions, coseLayout) : cy.layout({ ...coseLayout, fit: true, padding: 30 });
  layout.run();

  /* ---- state --------------------------------------------------------------- */
  const STANDARDS = { 'filter-1': 'en18031_1', 'filter-2': 'en18031_2', 'filter-3': 'en18031_3' };
  const state = {
    standards: [],          // data keys the node must have (AND)
    excludeConditions: false,
    menuItem: null,         // E.Info menu: mechanism prefix ("AUM", "AUM-1", ...)
    mechanisms: [],         // E.Info "highlight mechanisms" checkboxes
    selected: null,         // tapped node or edge (a cytoscape element)
  };

  const mechanismsOf = (node) => String(node.data('mechanism') || '').split(',').map((m) => m.trim()).filter(Boolean);
  const matchesMechanism = (node, item) => mechanismsOf(node).some((m) => m === item || m.startsWith(item + '-'));

  /* ---- render: state -> classes and visibility ---------------------------------- */
  function render() {
    cy.batch(() => {
      cy.elements().removeClass('selected highlighted parenthighlighted mech-highlighted');

      // 1. filters: which nodes pass the standard / condition / menu filters
      let base = cy.nodes().filter((n) => {
        if (state.standards.some((key) => !n.data(key))) return false;
        if (state.excludeConditions && n.data('condition')) return false;
        if (state.menuItem && !matchesMechanism(n, state.menuItem)) return false;
        return true;
      });

      // 2. selection: focus on the tapped node (or edge) and its context
      let visible = base;
      const sel = state.selected;
      if (sel && sel.inside()) {
        let focus;
        if (sel.isNode()) {
          sel.addClass('selected');
          if (sel.isParent()) sel.addClass('parenthighlighted');
          const neighbours = sel.neighborhood('node');
          neighbours.not(':parent').addClass('highlighted');
          sel.connectedEdges().addClass('highlighted');
          focus = sel.union(neighbours).union(sel.descendants()).union(sel.ancestors()).union(neighbours.ancestors());
        } else {
          sel.addClass('selected');
          const ends = sel.connectedNodes();
          ends.addClass('highlighted');
          focus = ends.union(ends.ancestors()).union(ends.descendants());
        }
        visible = base.intersection(focus);
      }

      // a node can only be drawn when its ancestors are drawn
      visible = visible.filter((n) => n.ancestors().every((a) => visible.has(a)));
      cy.nodes().forEach((n) => (visible.has(n) ? n.show() : n.hide()));
      cy.edges().show(); // an edge is drawn only when both endpoints are visible

      // 3. E.Info: highlight the nodes of the ticked mechanisms
      if (state.mechanisms.length) {
        cy.nodes().forEach((n) => {
          const hit = mechanismsOf(n).some((m) => state.mechanisms.includes(m.split('-')[0]));
          n.toggleClass('mech-highlighted', hit);
        });
      }
    });
  }

  /* ---- details and assessment (shared module) ------------------------------------------- */
  const STANDARD_NAMES = { en18031_1: 'EN 18031-1', en18031_2: 'EN 18031-2', en18031_3: 'EN 18031-3' };
  const standardsOf = (n) => Object.keys(STANDARD_NAMES).filter((k) => n.data(k)).map((k) => STANDARD_NAMES[k]);
  const linkItem = (arrow, node, label) => `<li>${arrow} ${escapeHtml(node.data('title') || node.id())}${label ? ` <em>(${escapeHtml(label)})</em>` : ''}</li>`;

  const assessment = DV.assessment(cy, {
    page: isEinfo ? 'en18031-einfo' : 'en18031',
    describe: (node) => {
      const parts = [];
      const standards = standardsOf(node);
      parts.push(`<p><strong>Applies to:</strong> ${standards.length ? escapeHtml(standards.join(', ')) : 'none of the three parts'}</p>`);
      if (isEinfo) {
        if (node.data('mechanism')) parts.push(`<p><strong>Mechanisms:</strong> ${escapeHtml(node.data('mechanism'))}</p>`);
        if (node.data('condition')) parts.push('<p><em>Conditional item: only to be documented when the condition applies.</em></p>');
      }
      if (node.isParent()) parts.push(`<p><strong>Contains</strong> ${node.children().length} item${node.children().length > 1 ? 's' : ''}.</p>`);
      const out = node.outgoers('edge').map((e) => linkItem('→', e.target(), e.data('label')));
      const inc = node.incomers('edge').map((e) => linkItem('←', e.source(), e.data('label')));
      if (out.length || inc.length) parts.push(`<p><strong>Links:</strong></p><ul>${out.join('')}${inc.join('')}</ul>`);
      const title = node.data('title') || node.id();
      const subtitle = title !== node.id() ? `ID: ${node.id()}` : (node.parent().length ? `In ${node.parent().data('title') || node.parent().id()}` : '');
      return { heading: title, subtitle, html: parts.join('') };
    },
    onSelect: (node) => { state.selected = node; render(); assessment.select(node); },
  });

  /* ---- controls ------------------------------------------------------------ */
  const readFilters = () => {
    state.standards = Object.keys(STANDARDS).filter((id) => $('#' + id)?.checked).map((id) => STANDARDS[id]);
    state.excludeConditions = Boolean($('#filter-condition')?.checked);
    state.mechanisms = DV.checkedValues('#highlight-mechanism input[type=checkbox]');
  };
  DV.onChange('#standard-filter input, #condition-filter input, #highlight-mechanism input', () => { readFilters(); render(); });

  DV.setupMenu($('#mechanism-menu'), (item) => {
    state.menuItem = item;
    state.selected = null;
    assessment.clear();
    render();
    DV.fit(cy);
  });

  cy.on('tap', 'node', (event) => { state.selected = event.target; assessment.select(event.target); render(); });
  cy.on('tap', 'edge', (event) => { state.selected = event.target; assessment.clear(); render(); });
  DV.onBackgroundTap(cy, () => { state.selected = null; assessment.clear(); render(); });

  $('#reset-graph')?.addEventListener('click', () => {
    $$('aside input[type=checkbox]').forEach((el) => { el.checked = false; });
    DV.clearMenu($('#mechanism-menu'));
    state.menuItem = null;
    state.selected = null;
    assessment.reset();
    readFilters();
    render();
    DV.fit(cy);
  });
  $('#fit-graph')?.addEventListener('click', () => DV.fit(cy));

  readFilters();
  render();
  return cy;
};
