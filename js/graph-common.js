/**
 * dataviz - helpers shared by every graph page.
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Exposes a single global, `DV`, used by js/en18031.js, js/en303645.js and js/pren40000-1-3.js.
 */
window.DV = (function () {
  'use strict';

  /* Brand colours, the same values as css/base.css. Cytoscape draws on a canvas, so it cannot read CSS variables. */
  const colors = {
    blue: '#0044aa', blueLight: '#217aff', blueTint: '#e8effb', blueSoft: '#dbeafe',
    ink: '#0f172a', text: '#334155', muted: '#64748b', line: '#cbd5e1', lineSoft: '#e2e8f0',
    surface: '#ffffff', surfaceAlt: '#f1f5f9',
    green: '#22c55e', greenDeep: '#166534', greenTint: '#dcfce7',
    red: '#ef4444', redDeep: '#b91c1c', purple: '#7e22ce', purpleTint: '#faf5ff',
  };

  const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /** Saved layouts: `positions` is {id: {x, y}} or [{data: {id, position}}]; returns {id: {x, y}}. */
  function positionMap(positions) {
    if (!positions) return {};
    if (Array.isArray(positions)) {
      const map = {};
      positions.forEach((e) => { if (e && e.data && e.data.id) map[e.data.id] = e.data.position; });
      return map;
    }
    return positions;
  }

  /**
   * A layout for the saved positions: 'preset' when every childless node has one (fast, deterministic),
   * otherwise the given fallback layout followed by the saved positions for the nodes that have one.
   */
  function layoutFromPositions(cy, positions, fallback) {
    const map = positionMap(positions);
    const missing = cy.nodes(':childless').filter((n) => !map[n.id()]);
    if (missing.length === 0) {
      return cy.layout({ name: 'preset', positions: (n) => map[n.id()], fit: true, padding: 30 });
    }
    console.warn('dataviz: no saved position for', missing.map((n) => n.id()).join(', '), '- running', fallback.name, 'first');
    const layout = cy.layout({ ...fallback, animate: false });
    layout.one('layoutstop', () => {
      cy.batch(() => cy.nodes(':childless').forEach((n) => { if (map[n.id()]) n.position(map[n.id()]); }));
      cy.fit(undefined, 30);
    });
    return layout;
  }

  /** Show exactly `eles` (plus nothing else); edges follow their endpoints automatically. */
  function showOnly(cy, eles) {
    cy.batch(() => {
      cy.elements().hide();
      eles.show();
    });
  }

  /** Nodes that must be visible so that `nodes` can be shown: the nodes and all their ancestors. */
  const withAncestors = (nodes) => nodes.union(nodes.ancestors());

  /** Wire every checkbox matching `selector` to `handler`. */
  function onChange(selector, handler, root = document) {
    $$(selector, root).forEach((el) => el.addEventListener('change', handler));
  }

  /** Checked values of the checkboxes matching `selector` (their `value`, or their id when no value). */
  const checkedValues = (selector) => $$(selector).filter((el) => el.checked).map((el) => el.value || el.id);

  /**
   * Dropdown menu (ul.menu): `onSelect(text, li)` on click, with the clicked item marked `selected`.
   * Clicking the selected item again clears the selection (`onSelect(null)`).
   */
  function setupMenu(menu, onSelect) {
    if (!menu) return;
    menu.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link || !menu.contains(link)) return;
      event.preventDefault();
      const li = link.parentElement;
      const wasSelected = li.classList.contains('selected');
      $$('li.selected', menu).forEach((el) => el.classList.remove('selected'));
      if (wasSelected) { onSelect(null, null); return; }
      li.classList.add('selected');
      onSelect(link.textContent.trim(), li);
      link.blur(); // closes the hover/focus submenu
    });
  }

  const clearMenu = (menu) => { if (menu) $$('li.selected', menu).forEach((el) => el.classList.remove('selected')); };

  /** Tap on the empty canvas (not on a node or an edge). */
  function onBackgroundTap(cy, handler) {
    cy.on('tap', (event) => { if (event.target === cy) handler(event); });
  }

  /** "Fit view" convenience: fit the visible elements with some padding. */
  const fit = (cy, padding = 30) => cy.fit(cy.elements(':visible'), padding);

  return { colors, escapeHtml, $, $$, positionMap, layoutFromPositions, showOnly, withAncestors, onChange, checkedValues, setupMenu, clearMenu, onBackgroundTap, fit };
})();
