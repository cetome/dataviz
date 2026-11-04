/**
 * dataviz - prEN 40000-1-3 (CRA vulnerability handling) and the CRA essential requirements.
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Usage (at the end of pren40000-1-3/index.html, after the data file, js/graph-common.js and js/assessment.js):
 *   DV.pren40000({ elements: PREN40000_1_3_DATA });
 *
 * Node data used here: id, label, parent, type (ROOT_CONTAINER, CHAPTER, RQ, RC, PM, EXTERNAL_ROOT,
 * EXTERNAL_LEAF, ESSR_CONTAINER, ESSR), info, display_title. Edge data: source, target, kind.
 * The assessment (status, evidence, verdicts) is handled by js/assessment.js.
 *
 * The view is a function of one state object: every control writes the state and calls render().
 */
DV.pren40000 = function init(config) {
  'use strict';
  const { $, $$, colors, escapeHtml } = DV;

  /* ---- constants ------------------------------------------------------------ */
  const LEAF_TYPES = ['RQ', 'RC', 'PM', 'EXTERNAL_LEAF', 'ESSR'];
  const CONTAINER_TYPES = ['ROOT_CONTAINER', 'EXTERNAL_ROOT', 'ESSR_CONTAINER'];
  const HIGH_LEVEL_TYPES = [...CONTAINER_TYPES, 'CHAPTER'];

  const layouts = {
    dagre: { name: 'dagre', rankDir: 'LR', rankSep: 240, nodeSep: 70, animate: true, animationDuration: 500, padding: 50 },
    'cose-bilkent': { name: 'cose-bilkent', padding: 50, idealEdgeLength: 50, nodeDimensionsIncludeLabels: true, animate: true, animationDuration: 800 },
  };

  /* ---- cytoscape ---------------------------------------------------------- */
  const font = 'Inter, system-ui, sans-serif';
  const stylesheet = [
    { selector: ':parent', style: {
      label: 'data(label)', 'font-family': font, 'font-size': 30, 'font-weight': 'bold', color: colors.blue,
      'text-valign': 'top', padding: 40, 'background-color': colors.blue, 'background-opacity': 0.05,
      'border-width': 1, 'border-color': colors.blue,
    } },
    { selector: 'node[type="EXTERNAL_ROOT"]', style: { 'background-color': colors.purple, 'border-color': colors.purple, color: colors.purple, 'background-opacity': 0.06 } },
    { selector: 'node[type="ESSR_CONTAINER"]', style: { 'background-color': colors.green, 'border-color': colors.greenDeep, color: colors.greenDeep, 'background-opacity': 0.08 } },
    { selector: 'node:childless', style: {
      label: 'data(label)', 'font-family': font, 'font-size': 10, 'font-weight': 'bold', shape: 'round-rectangle',
      width: 155, height: 45, 'text-valign': 'center', 'text-halign': 'center', 'text-wrap': 'ellipsis', 'text-max-width': 145,
    } },
    { selector: 'node[type="RQ"]', style: { 'background-color': colors.blue, color: '#fff' } },
    { selector: 'node[type="RC"]', style: { 'background-color': '#fff', 'border-width': 2, 'border-color': colors.blue, color: colors.blue } },
    { selector: 'node[type="PM"]', style: { 'background-color': '#bae6fd', 'border-width': 1.5, 'border-color': '#0369a1', color: '#0369a1' } },
    { selector: 'node[type="EXTERNAL_LEAF"]', style: {
      label: (n) => String(n.data('id') || '').replace('40000-1-2/', ''),
      'background-color': colors.purpleTint, 'border-width': 2, 'border-color': colors.purple, color: colors.purple,
    } },
    { selector: 'node[type="ESSR"]', style: { 'background-color': colors.green, color: '#fff', shape: 'hexagon', width: 200, height: 75, 'text-wrap': 'wrap', 'text-max-width': 160 } },
    { selector: 'edge', style: { width: 2.5, 'line-color': '#475569', 'target-arrow-color': '#475569', 'target-arrow-shape': 'triangle', 'curve-style': 'bezier', opacity: 0.8 } },
    { selector: 'edge[kind="essr"]', style: { 'line-color': colors.greenDeep, 'target-arrow-color': colors.greenDeep, width: 3.2, opacity: 0.9 } },
    { selector: '.faded', style: { opacity: 0.25 } },
    { selector: '.highlighted', style: { opacity: 1, 'z-index': 999 } },
  ];

  const cy = cytoscape({ container: $('#cy'), elements: config.elements, style: [...stylesheet, ...DV.assessmentStyles()], layout: { name: 'preset' } });
  window.cy = cy;

  /* ---- state --------------------------------------------------------------- */
  const state = {
    layout: 'dagre',
    highLevel: false,
    showEdges: true,
    types: Object.fromEntries(LEAF_TYPES.map((t) => [t, true])),
    hiddenRoots: new Set(),   // ids of the unticked domains
    focus: null,              // id of the menu item in view ("[PRE-1]"), or null
    selected: null,           // node shown in the details panel
  };

  const typeOf = (n) => n.data('type') || '';
  const isContainer = (n) => CONTAINER_TYPES.includes(typeOf(n));
  const roots = cy.nodes().filter((n) => isContainer(n) && !n.data('parent'));

  /* ---- visibility: state -> set of visible nodes --------------------------------- */
  function computeVisible() {
    let base = cy.nodes().filter((n) => {
      if (n.union(n.ancestors()).some((a) => state.hiddenRoots.has(a.id()))) return false;
      if (n.isChildless()) {
        if (state.highLevel) return false;
        const t = typeOf(n);
        if (t in state.types && !state.types[t]) return false;
      }
      return true;
    });
    if (state.focus) {
      const target = cy.getElementById(state.focus);
      const subtree = target.union(target.descendants());
      const linked = subtree.neighborhood('node'); // what the focused chapter maps to (ESSR, prEN 40000-1-2, other chapters)
      base = base.intersection(subtree.union(linked).union(subtree.ancestors()).union(linked.ancestors()));
    }
    const ids = new Set(base.map((n) => n.id()));
    // a parent is drawn when it holds a visible requirement, or when the view is the high-level one
    return base.filter((n) => {
      if (n.isChildless()) return true;
      if (state.highLevel && HIGH_LEVEL_TYPES.includes(typeOf(n))) return true;
      return n.descendants(':childless').some((d) => ids.has(d.id()));
    });
  }

  let lastVisibleKey = null;
  function runLayout(fit = true) {
    const options = { ...layouts[state.layout], eles: cy.elements(':visible'), fit };
    cy.layout(options).run();
  }

  /** Apply the state to the graph. Re-runs the layout only when the set of visible nodes changed. */
  function render({ fit = false } = {}) {
    const visible = computeVisible();
    cy.batch(() => {
      cy.nodes().forEach((n) => (visible.has(n) ? n.show() : n.hide()));
      if (state.showEdges) cy.edges().show(); else cy.edges().hide();
      cy.elements().removeClass('faded highlighted');
      const sel = state.selected;
      if (sel && sel.inside() && visible.has(sel)) {
        const context = sel.closedNeighborhood();
        cy.elements().addClass('faded');
        context.union(context.ancestors()).removeClass('faded').addClass('highlighted');
      }
    });
    const key = visible.map((n) => n.id()).sort().join('|');
    if (key !== lastVisibleKey) { lastVisibleKey = key; runLayout(true); }
    else if (fit) cy.animate({ fit: { eles: cy.elements(':visible'), padding: 50 }, duration: 400 });
  }

  /* ---- details and assessment (shared module) ------------------------------------------- */
  const displayId = (node) => String(node.data('id') || '').replace('40000-1-2/', 'prEN 40000-1-2 ').replace(/\//g, ' ');

  function descriptionHtml(text) {
    if (!text || text === 'nan') return '<p class="detail-empty">No detailed description available.</p>';
    let html = ''; let inList = false;
    text.split('\n').map((l) => l.trim()).filter(Boolean).forEach((line) => {
      if (line.startsWith('-')) {
        if (!inList) { html += '<ul>'; inList = true; }
        html += `<li>${escapeHtml(line.slice(1).trim())}</li>`;
      } else {
        if (inList) { html += '</ul>'; inList = false; }
        html += `<p>${escapeHtml(line)}</p>`;
      }
    });
    return html + (inList ? '</ul>' : '');
  }

  const assessment = DV.assessment(cy, {
    page: 'pren40000-1-3',
    labelOf: (n) => n.data('label') || n.id(),
    describe: (node) => {
      const title = node.data('display_title');
      const heading = title && title !== node.id() && title !== 'nan' ? title : displayId(node);
      return { heading, subtitle: `ID: ${displayId(node)}`, html: descriptionHtml(node.data('info')) };
    },
    onSelect: (node) => { state.selected = node; render(); assessment.select(node); },
  });

  /* ---- controls ------------------------------------------------------------ */
  // domain filters, one checkbox per top-level container
  const rootFilters = $('#root-filters');
  roots.forEach((r) => {
    const label = document.createElement('label');
    label.className = 'check';
    const input = Object.assign(document.createElement('input'), { type: 'checkbox', checked: true, value: r.id() });
    input.addEventListener('change', () => {
      if (input.checked) state.hiddenRoots.delete(r.id()); else state.hiddenRoots.add(r.id());
      render();
    });
    label.append(input, document.createTextNode(' ' + (r.data('display_title') && r.data('display_title') !== 'nan' ? r.data('display_title') : r.id())));
    rootFilters.append(label);
  });

  DV.onChange('#type-filters input', () => {
    $$('#type-filters input').forEach((el) => { state.types[el.value] = el.checked; });
    render();
  });
  $('#show-highlevel-only').addEventListener('change', (e) => { state.highLevel = e.target.checked; render(); });
  $('#show-edges').addEventListener('change', (e) => { state.showEdges = e.target.checked; render(); });
  $('#layout-select').addEventListener('change', (e) => { state.layout = e.target.value; runLayout(true); });

  DV.setupMenu($('#mechanism-menu'), (item) => {
    if (!item) { state.focus = null; state.selected = null; assessment.clear(); render({ fit: true }); return; }
    const node = cy.getElementById(`[${item}]`).length ? cy.getElementById(`[${item}]`) : cy.getElementById(item);
    if (!node.length) return;
    state.focus = node.id();
    state.selected = null;
    assessment.select(node);
    render({ fit: true });
  });

  cy.on('tap', 'node', (event) => { state.selected = event.target; assessment.select(event.target); render(); });
  DV.onBackgroundTap(cy, () => { state.selected = null; assessment.clear(); render(); });

  $('#fit-btn').addEventListener('click', () => runLayout(true));
  $('#reset-btn').addEventListener('click', () => {
    state.highLevel = false; $('#show-highlevel-only').checked = false;
    state.showEdges = true; $('#show-edges').checked = true;
    LEAF_TYPES.forEach((t) => { state.types[t] = true; });
    $$('#type-filters input, #root-filters input').forEach((el) => { el.checked = true; });
    state.hiddenRoots.clear();
    state.focus = null; DV.clearMenu($('#mechanism-menu'));
    state.selected = null;
    assessment.reset();
    render({ fit: true });
  });

  render();
  return cy;
};
