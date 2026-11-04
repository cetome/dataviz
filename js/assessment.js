/**
 * dataviz - assessment tracking shared by every graph page.
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * One module gives each graph the same details panel and the same tracking:
 *   - details panel (floating over the graph) with the page's own description of the clicked item,
 *   - for every assessable item: implementation status, justification, evidence,
 *   - assessor mode: the self-assessment is frozen, each item gets a verdict and notes, the graph
 *     shows the verdicts, and a scan lists the inconsistencies,
 *   - statuses and verdicts roll up to the parents (chapters, mechanisms, ...),
 *   - the entries are kept in the browser (localStorage, per page), can be downloaded as CSV,
 *     saved to / loaded from a JSON file, and cleared,
 *   - a deployment may put a gate in front of the downloads and keep a copy of the entries, through
 *     the optional DV.gate hook (js/extras.js); without one, nothing leaves the browser.
 *
 * Usage, in a page's init (after cytoscape is created and before the first render):
 *   const assessment = DV.assessment(cy, {
 *     page: 'en303645',                       // storage key suffix and file names
 *     describe: (node) => ({ heading, subtitle, html }),   // what the details panel shows
 *     assessable: (node) => node.isChildless(),            // which items carry a form (default)
 *     onSelect: (node) => { ... },            // the page selects the node (from the scan list)
 *     onModeChange: (active) => { ... },      // the page re-renders when assessor mode toggles
 *   });
 *   // on tap: assessment.select(node); on background tap / reset: assessment.clear();
 *   // stylesheet: [...pageStyles, ...DV.assessmentStyles()]
 *
 * The page provides two containers: <main class="graph"> (the panel is inserted there) and
 * <section id="assessment-panel"> in the sidebar (filled with the controls).
 *
 * Node data written by this module: complianceStatus, justification, evidence, assessmentVerdict,
 * assessorNotes (never part of the data files).
 */
(function () {
  'use strict';
  const { $, $$, escapeHtml, colors } = DV;

  const STATUSES = { TODO: '⏳ To do', IN_PROGRESS: '⚙️ In progress', COMPLIANT: '✅ Compliant', NON_COMPLIANT: '❌ Non-compliant', NOT_APPLICABLE: '🔘 Not applicable' };
  const VERDICTS = { INCONCLUSIVE: 'Inconclusive', PASS: 'Pass', FAIL: 'Fail', 'N/A': 'N/A (not applicable)' };
  const FIELDS = ['complianceStatus', 'justification', 'evidence', 'assessmentVerdict', 'assessorNotes'];
  const DEFAULTS = { complianceStatus: 'TODO', justification: '', evidence: '', assessmentVerdict: 'INCONCLUSIVE', assessorNotes: '' };
  const EMPTY = '<h2>Details</h2><p class="detail-body detail-empty">Click an item of the graph to read it and record its status.</p>';

  /** Cytoscape styles for the statuses and verdicts; append them after the page's own styles. */
  DV.assessmentStyles = () => [
    { selector: 'node[complianceStatus="IN_PROGRESS"]', style: { 'background-color': '#7dd3fc', color: '#0c4a6e', 'border-color': '#0369a1' } },
    { selector: 'node[complianceStatus="COMPLIANT"]', style: { 'background-color': colors.green, color: '#fff', 'border-color': colors.greenDeep } },
    { selector: 'node[complianceStatus="NON_COMPLIANT"]', style: { 'background-color': colors.red, color: '#fff', 'border-color': colors.redDeep } },
    { selector: 'node[complianceStatus="NOT_APPLICABLE"]', style: { 'background-color': '#94a3b8', color: '#fff', 'border-color': colors.muted } },
    { selector: 'node.assess[assessmentVerdict="PASS"]', style: { 'background-color': '#15803d', color: '#fff', 'border-color': '#14532d' } },
    { selector: 'node.assess[assessmentVerdict="FAIL"]', style: { 'background-color': colors.redDeep, color: '#fff', 'border-color': '#7f1d1d' } },
    { selector: 'node.assess[assessmentVerdict="N/A"]', style: { 'background-color': colors.muted, color: '#fff', 'border-color': '#475569' } },
    { selector: 'node.assess[assessmentVerdict="INCONCLUSIVE"]:childless', style: { 'background-color': '#fde68a', color: '#78350f', 'border-color': '#d97706' } },
    // parents (chapters, mechanisms...) carry the rolled-up status or verdict as a light tint
    { selector: 'node:parent[complianceStatus]', style: { 'background-opacity': 0.22 } },
    { selector: 'node.assess:parent[assessmentVerdict]', style: { 'background-opacity': 0.22, color: colors.ink } },
    { selector: 'node.flagged', style: { 'border-width': 4, 'border-color': colors.redDeep, 'border-style': 'double' } },
  ];

  DV.assessment = function (cy, opts) {
    const page = opts.page;
    const storageKey = `dataviz:assessment:${page}`;
    const assessable = opts.assessable || ((n) => n.isChildless());
    const labelOf = opts.labelOf || ((n) => n.data('title') || n.data('label') || n.id());
    const fileStem = opts.fileStem || `cetome dataviz ${page} assessment`;
    let assessorMode = false;
    let selected = null;

    /* ---- DOM: details panel over the graph, controls in the sidebar ----------------- */
    const main = $('main.graph');
    main.insertAdjacentHTML('afterbegin', `
      <article class="details" id="details" aria-live="polite">
        <div class="details-head">
          <div id="details-content">${EMPTY}</div>
          <button type="button" class="details-toggle" id="details-toggle" aria-expanded="true" aria-controls="details-content">Hide</button>
        </div>
      </article>`);
    const panel = $('#details');
    const content = $('#details-content');
    $('#details-toggle').addEventListener('click', (e) => {
      const collapsed = panel.classList.toggle('collapsed');
      e.target.textContent = collapsed ? 'Show' : 'Hide';
      e.target.setAttribute('aria-expanded', String(!collapsed));
    });

    const side = $('#assessment-panel');
    side.innerHTML = `
      <h2 class="panel-title">Assessment</h2>
      <div class="inline-switch">
        <span class="label" id="assessment-label">Assessor mode</span>
        <label class="switch"><input type="checkbox" id="assessment-toggle" aria-labelledby="assessment-label"><span class="track"></span></label>
      </div>
      <p class="hint">Click an item to record its status, justification and evidence. In assessor mode the self-assessment is frozen, each item gets a verdict and the graph shows the verdicts.</p>
      <button type="button" class="btn" id="scan-btn" hidden>🔍 Scan for inconsistencies</button>
      <div class="scan-result" id="scan-result" aria-live="polite"></div>
      <p class="hint" id="assessment-saved"></p>
      <div class="actions assessment-tools">
        <button type="button" class="btn" id="assessment-csv" title="The statuses, evidence and verdicts as a spreadsheet">Download .csv</button>
        <button type="button" class="btn" id="assessment-save" title="A file to keep or to send to the assessor">Save .json</button>
        <button type="button" class="btn" id="assessment-load">Load .json</button>
        <input type="file" id="assessment-file" accept=".json,application/json" class="visually-hidden" tabindex="-1">
        <button type="button" class="btn" id="assessment-clear">Clear</button>
      </div>`;

    /* ---- data on the nodes ---------------------------------------------------------- */
    const ensure = (node) => { FIELDS.forEach((k) => { if (node.data(k) === undefined) node.data(k, DEFAULTS[k]); }); };
    const items = () => cy.nodes().filter(assessable);

    /** Parent status from its children: all compliant (or N/A) -> compliant, any non-compliant -> non-compliant, nothing started -> to do. */
    function rollupStatus(parent) {
      if (!parent || parent.length === 0 || parent.isChildless()) return;
      const statuses = parent.children().map((c) => c.data('complianceStatus') || 'TODO');
      let status = 'IN_PROGRESS';
      if (statuses.every((s) => s === 'NOT_APPLICABLE')) status = 'NOT_APPLICABLE';
      else if (statuses.every((s) => s === 'COMPLIANT' || s === 'NOT_APPLICABLE')) status = 'COMPLIANT';
      else if (statuses.includes('NON_COMPLIANT')) status = 'NON_COMPLIANT';
      else if (statuses.every((s) => s === 'TODO')) status = 'TODO';
      parent.data('complianceStatus', status);
      rollupStatus(parent.parent());
    }
    /** Parent verdict from its leaves: any fail -> fail, all pass (or N/A) -> pass, all N/A -> N/A, else inconclusive. */
    function rollupVerdicts() {
      cy.nodes(':parent').forEach((p) => {
        const verdicts = p.descendants().filter(assessable).map((n) => n.data('assessmentVerdict') || 'INCONCLUSIVE');
        let verdict = 'INCONCLUSIVE';
        if (verdicts.includes('FAIL')) verdict = 'FAIL';
        else if (verdicts.length && verdicts.every((v) => v === 'N/A')) verdict = 'N/A';
        else if (verdicts.length && verdicts.every((v) => v === 'PASS' || v === 'N/A')) verdict = 'PASS';
        p.data('assessmentVerdict', verdict);
      });
    }
    function rollupAll() {
      cy.nodes(':parent').filter((p) => p.children().every((c) => c.isChildless())).forEach((p) => rollupStatus(p));
      rollupVerdicts();
    }

    /** Items whose self-assessment and verdict disagree, or that claim compliance with no rationale. */
    function findInconsistencies() {
      return items().filter((n) => {
        const status = n.data('complianceStatus') || 'TODO';
        const verdict = n.data('assessmentVerdict') || 'INCONCLUSIVE';
        const unexplained = status === 'COMPLIANT' && !(n.data('justification') || '').trim() && !(n.data('evidence') || '').trim();
        const contradicted = (status === 'COMPLIANT' && verdict === 'FAIL') || (status === 'NON_COMPLIANT' && verdict === 'PASS')
          || (status === 'NOT_APPLICABLE' && (verdict === 'PASS' || verdict === 'FAIL'));
        return unexplained || contradicted;
      });
    }

    /* ---- persistence --------------------------------------------------------------- */
    const entries = () => {
      const out = {};
      items().forEach((n) => {
        const e = {};
        let touched = false;
        FIELDS.forEach((k) => { const v = n.data(k); if (v !== undefined && v !== DEFAULTS[k]) { e[k] = v; touched = true; } });
        if (touched) out[n.id()] = e;
      });
      return out;
    };
    const savedNote = $('#assessment-saved');
    /** What is kept with the address once the browser is unlocked: the counts and the entries. */
    const snapshot = () => {
      const statuses = { TODO: 0, IN_PROGRESS: 0, COMPLIANT: 0, NON_COMPLIANT: 0, NOT_APPLICABLE: 0 };
      const verdicts = { INCONCLUSIVE: 0, PASS: 0, FAIL: 0, 'N/A': 0 };
      const all = items();
      all.forEach((n) => {
        const s = n.data('complianceStatus') || 'TODO';
        const v = n.data('assessmentVerdict') || 'INCONCLUSIVE';
        if (s in statuses) statuses[s]++;
        if (v in verdicts) verdicts[v]++;
      });
      return { items: all.length, assessor: assessorMode, statuses, verdicts, entries: entries() };
    };
    const keepWithAddress = () => { if (DV.gate) DV.gate.sync(page, snapshot); };
    function save() {
      const data = entries();
      keepWithAddress();
      try {
        if (Object.keys(data).length) {
          localStorage.setItem(storageKey, JSON.stringify({ version: 1, page, savedAt: new Date().toISOString(), entries: data }));
          savedNote.textContent = `${Object.keys(data).length} item${Object.keys(data).length > 1 ? 's' : ''} recorded, kept in this browser.`;
        } else {
          localStorage.removeItem(storageKey);
          savedNote.textContent = '';
        }
      } catch (e) { savedNote.textContent = 'This browser does not keep the entries (private window or storage blocked). Save a file instead.'; }
    }
    function apply(data) {
      cy.batch(() => {
        FIELDS.forEach((k) => cy.nodes().removeData(k));
        Object.entries(data || {}).forEach(([id, e]) => {
          const n = cy.getElementById(id);
          if (!n.length) return;
          FIELDS.forEach((k) => { if (e[k] !== undefined) n.data(k, e[k]); });
        });
        rollupAll();
      });
    }
    function load() {
      try {
        const raw = localStorage.getItem(storageKey);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        apply(parsed.entries);
        const n = Object.keys(parsed.entries || {}).length;
        savedNote.textContent = `${n} item${n > 1 ? 's' : ''} recorded, kept in this browser${parsed.savedAt ? ' (last change ' + new Date(parsed.savedAt).toLocaleString() + ')' : ''}.`;
        if (n) keepWithAddress();
      } catch (e) { /* unreadable or blocked storage: start empty */ }
    }

    const download = (name, text, type) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([text], { type }));
      a.download = name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
    const csvCell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const gated = (kind, make) => () => (DV.gate ? DV.gate.require(kind, make) : make());
    $('#assessment-csv').addEventListener('click', gated('csv', () => {
      const rows = [['id', 'item', 'status', 'justification', 'evidence', 'verdict', 'assessor notes']];
      items().sort((a, b) => a.id().localeCompare(b.id(), undefined, { numeric: true })).forEach((n) => {
        rows.push([n.id(), labelOf(n), STATUSES[n.data('complianceStatus') || 'TODO'].replace(/^\S+\s/, ''), n.data('justification') || '', n.data('evidence') || '', VERDICTS[n.data('assessmentVerdict') || 'INCONCLUSIVE'], n.data('assessorNotes') || '']);
      });
      download(`${fileStem}.csv`, '﻿' + rows.map((r) => r.map(csvCell).join(';')).join('\r\n'), 'text/csv;charset=utf-8');
    }));
    $('#assessment-save').addEventListener('click', gated('json', () => {
      download(`${fileStem}.json`, JSON.stringify({ version: 1, page, savedAt: new Date().toISOString(), entries: entries() }, null, 2), 'application/json');
    }));
    $('#assessment-load').addEventListener('click', () => $('#assessment-file').click());
    $('#assessment-file').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      file.text().then((text) => {
        const parsed = JSON.parse(text);
        if (!parsed || typeof parsed.entries !== 'object') throw new Error('not an assessment file');
        if (parsed.page && parsed.page !== page) { savedNote.textContent = `This file belongs to the ${parsed.page} graph, not to this one.`; return; }
        apply(parsed.entries);
        save();
        refreshView();
      }).catch(() => { savedNote.textContent = 'This file is not a dataviz assessment (.json saved from this page).'; });
      e.target.value = '';
    });
    $('#assessment-clear').addEventListener('click', () => {
      if (!window.confirm('Clear every status, justification, evidence and verdict recorded for this graph?')) return;
      apply({});
      save();
      refreshView();
    });

    /* ---- details panel --------------------------------------------------------------- */
    const options = (map, current) => Object.entries(map).map(([v, label]) => `<option value="${escapeHtml(v)}"${v === current ? ' selected' : ''}>${escapeHtml(label)}</option>`).join('');

    function render(node) {
      const d = opts.describe(node);
      ensure(node);
      const status = node.data('complianceStatus');
      const verdict = node.data('assessmentVerdict');
      const locked = assessorMode ? ' disabled' : '';
      let forms = '';
      if (assessable(node)) {
        forms = `
          <div class="form-box">
            <label class="field-label" for="f-status">Implementation status</label>
            <select id="f-status" class="input status-${escapeHtml(status)}" data-field="complianceStatus"${locked}>${options(STATUSES, status)}</select>
            <label class="field-label" for="f-justification">Justification / engineering notes</label>
            <textarea id="f-justification" class="input" data-field="justification" placeholder="Rationale for the status, or what blocks it"${locked}>${escapeHtml(node.data('justification'))}</textarea>
            <label class="field-label" for="f-evidence">Evidence and references</label>
            <input id="f-evidence" type="text" class="input" data-field="evidence" placeholder="User manual, URL, document reference..." value="${escapeHtml(node.data('evidence'))}"${locked}>
          </div>`;
        if (assessorMode) {
          forms += `
          <div class="form-box assessment">
            <label class="field-label" for="f-verdict">Assessor verdict</label>
            <select id="f-verdict" class="input verdict-${escapeHtml(verdict)}" data-field="assessmentVerdict">${options(VERDICTS, verdict)}</select>
            <label class="field-label" for="f-notes">Justification of the verdict</label>
            <textarea id="f-notes" class="input" data-field="assessorNotes" placeholder="Audit feedback, reasons for rejection...">${escapeHtml(node.data('assessorNotes'))}</textarea>
          </div>`;
        }
      } else if (node.isParent()) {
        forms = `
          <div class="status-row status-${escapeHtml(status)}"><span>Self-assessment</span><span class="pill">${escapeHtml(STATUSES[status] || status)}</span></div>
          <div class="status-row verdict-${escapeHtml(verdict)}"><span>Verdict</span><span class="pill">${escapeHtml(VERDICTS[verdict] || verdict)}</span></div>`;
      }
      content.innerHTML = `
        <h2>${escapeHtml(d.heading)}</h2>
        ${d.subtitle ? `<span class="detail-id">${escapeHtml(d.subtitle)}</span>` : ''}
        <div class="detail-body">${d.html || '<p class="detail-empty">No description.</p>'}</div>
        ${forms}`;
      panel.classList.remove('collapsed');
      $('#details-toggle').textContent = 'Hide';
    }

    content.addEventListener('change', (event) => {
      const field = event.target.dataset.field;
      if (!field || !selected) return;
      selected.data(field, event.target.value);
      if (field === 'complianceStatus') rollupStatus(selected.parent());
      if (field === 'assessmentVerdict') rollupVerdicts();
      if (field === 'complianceStatus' || field === 'assessmentVerdict') {
        event.target.className = `input ${field === 'complianceStatus' ? 'status' : 'verdict'}-${event.target.value}`;
      }
      save();
    });

    /* ---- assessor mode and scan ---------------------------------------------------------- */
    const scanResult = $('#scan-result');
    $('#assessment-toggle').addEventListener('change', (e) => {
      assessorMode = e.target.checked;
      document.body.classList.toggle('assessment-view-active', assessorMode);
      $('#scan-btn').hidden = !assessorMode;
      if (assessorMode) rollupVerdicts();
      cy.nodes().toggleClass('assess', assessorMode).removeClass('flagged');
      scanResult.innerHTML = '';
      if (selected) render(selected);
      if (opts.onModeChange) opts.onModeChange(assessorMode);
    });
    $('#scan-btn').addEventListener('click', () => {
      rollupVerdicts();
      const flagged = findInconsistencies();
      cy.nodes().removeClass('flagged');
      flagged.addClass('flagged');
      if (flagged.length === 0) {
        scanResult.innerHTML = '<p>No inconsistency: every compliant item is justified and no verdict contradicts a self-assessment.</p>';
        return;
      }
      const list = flagged.sort((a, b) => a.id().localeCompare(b.id(), undefined, { numeric: true }))
        .map((n) => `<li><a href="#" data-node="${escapeHtml(n.id())}">${escapeHtml(labelOf(n))}</a></li>`).join('');
      scanResult.innerHTML = `<p><strong>${flagged.length}</strong> item${flagged.length > 1 ? 's' : ''} to review (compliant without justification or evidence, or a verdict that contradicts the self-assessment):</p><ul>${list}</ul>`;
    });
    scanResult.addEventListener('click', (event) => {
      const link = event.target.closest('a[data-node]');
      if (!link) return;
      event.preventDefault();
      const node = cy.getElementById(link.dataset.node);
      if (!node.length) return;
      if (opts.onSelect) opts.onSelect(node); else api.select(node);
      cy.animate({ center: { eles: node }, zoom: Math.max(cy.zoom(), 0.8), duration: 400 });
    });

    function refreshView() {
      cy.nodes().removeClass('flagged');
      scanResult.innerHTML = '';
      if (selected && selected.inside()) render(selected);
    }

    /* ---- API for the page ------------------------------------------------------------------ */
    const api = {
      select(node) { selected = node; render(node); },
      clear() { selected = null; content.innerHTML = EMPTY; },
      get assessorMode() { return assessorMode; },
      /** Leave assessor mode and clear the selection (page reset); the recorded entries stay. */
      reset() {
        if (assessorMode) { $('#assessment-toggle').checked = false; $('#assessment-toggle').dispatchEvent(new Event('change')); }
        api.clear();
      },
    };

    load();
    return api;
  };
})();
