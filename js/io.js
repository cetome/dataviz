/*!
 * dataviz - opening and handing over standards in the browser, shared by the viewer and the builder:
 * files picked or dropped, a web address, a share link, the browser library, the built-in standards;
 * downloads as JSON, YAML, Excel and CSV; share links. Nothing here talks to a server of ours: the
 * only requests are for the built-in files of this site and for an address the visitor typed.
 *
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Needs js/standard.js (DVStandard), js/library.js (DVLibrary), and for YAML and Excel the vendor
 * libraries js/vendor/js-yaml.min.js (jsyaml) and js/vendor/xlsx.full.min.js (XLSX).
 */
(function (root) {
  'use strict';
  const S = root.DVStandard;
  const libs = () => ({ XLSX: root.XLSX, jsyaml: root.jsyaml });

  /** FileList or File[] -> raw standard (throws an Error with a readable message). */
  async function readFiles(fileList) {
    const files = await Promise.all(Array.from(fileList).map(async (f) => {
      const isBinary = /\.(xlsx|xlsm|xls|ods|xltx)$/i.test(f.name);
      return isBinary ? { name: f.name, buffer: new Uint8Array(await f.arrayBuffer()) } : { name: f.name, text: await f.text() };
    }));
    return S.parseFiles(files, libs());
  }

  /** Fetch a standard from an address: one of our built-ins, or any public file with CORS. */
  async function fetchStandard(url) {
    let response;
    try { response = await fetch(url, { credentials: 'omit', redirect: 'follow' }); }
    catch (e) { throw new Error('The file could not be fetched. The server may not allow other sites to read it (CORS), or the address is wrong.'); }
    if (!response.ok) throw new Error(`The server answered ${[response.status, response.statusText].filter(Boolean).join(' ')} for this address.`);
    const name = decodeURIComponent(new URL(response.url || url, location.href).pathname.split('/').pop() || 'standard');
    const type = response.headers.get('content-type') || '';
    const isBinary = /\.(xlsx|xlsm|xls|ods)$/i.test(name) || /spreadsheet|excel|octet-stream/.test(type);
    const named = /\.[a-z0-9]+$/i.test(name) ? name : name + (type.includes('json') ? '.json' : type.includes('yaml') ? '.yaml' : type.includes('csv') ? '.csv' : '');
    const file = isBinary ? { name: named, buffer: new Uint8Array(await response.arrayBuffer()) } : { name: named, text: await response.text() };
    return S.parseFiles([file], libs());
  }

  /**
   * A file address written after the # of a page link -> the address to fetch, or null.
   *   #https://example.org/my-standard.yaml      any public address
   *   #gh:owner/repo/path/file.yaml              a file in a GitHub repository (default branch)
   *   #gh:owner/repo@branch/path/file.yaml       ... on a given branch or tag
   *   #/examples/example.dataviz.yaml            a file of this site
   * The part after # never leaves the browser: the server and its logs never see which file is opened.
   */
  function addressFromHash(hash) {
    const h = decodeURIComponent(String(hash || '').replace(/^#/, '')).trim();
    if (!h || h.startsWith('s=')) return null;
    const gh = h.match(/^gh:([\w.-]+)\/([\w.-]+)(?:@([^/]+))?\/(.+)$/);
    if (gh) return `https://raw.githubusercontent.com/${gh[1]}/${gh[2]}/${gh[3] || 'HEAD'}/${gh[4]}`;
    if (/^https?:\/\//i.test(h) || h.startsWith('/')) return new URL(h, location.href).href;
    return null;
  }

  /** The shortest # form of an address: raw GitHub files become gh:owner/repo/path. */
  function hashOf(address) {
    const gh = address.match(/^https:\/\/raw\.githubusercontent\.com\/([\w.-]+)\/([\w.-]+)\/([^/]+)\/(.+)$/);
    if (gh) return `#gh:${gh[1]}/${gh[2]}${gh[3] === 'HEAD' ? '' : `@${gh[3]}`}/${gh[4]}`;
    if (address.startsWith(location.origin + '/')) return '#' + address.slice(location.origin.length);
    return '#' + address;
  }

  /**
   * What the page address asks to open: #s=<share code>, #<address> (see addressFromHash),
   * ?std=<built-in id>, ?local=<library id>. Returns { raw, origin }
   * or null when nothing is asked. `origin` is { type: 'share' | 'std' | 'src' | 'local', value }
   * and decides how the page shares it back.
   */
  async function fromLocation() {
    const params = new URLSearchParams(location.search);
    if (location.hash.startsWith('#s=')) {
      try { return { raw: await S.decodeShare(location.hash.slice(3)), origin: { type: 'share' } }; }
      catch (e) { throw new Error('This share link is damaged or cut short (some apps shorten long links). Ask for the file instead.'); }
    }
    const std = params.get('std');
    if (std) {
      if (!/^[a-z0-9-]+$/.test(std)) throw new Error('Unknown built-in standard.');
      return { raw: await fetchStandard(`/standards/${std}.json`), origin: { type: 'std', value: std } };
    }
    // a file address: only ever after the #, so that it never reaches the server
    const src = addressFromHash(location.hash);
    if (location.hash.length > 1 && !src) throw new Error('This link does not point to a dataviz file. After the # it expects an address (https://...) or gh:owner/repository/path.');
    if (src) {
      const url = new URL(src);
      if (!/^https?:$/.test(url.protocol)) throw new Error('Only http and https addresses can be opened.');
      return { raw: await fetchStandard(url.href), origin: { type: 'src', value: url.href } };
    }
    const local = params.get('local');
    if (local) {
      const kept = root.DVLibrary.get(local);
      if (!kept) throw new Error('This standard is not kept in this browser any more (the browser data may have been cleared).');
      return { raw: kept, origin: { type: 'local', value: local } };
    }
    return null;
  }

  /* ---- downloads ---------------------------------------------------------------------------- */
  function download(name, data, type) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(data instanceof Blob ? data : new Blob([data], { type }));
    a.download = name;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  /** Download the standard as 'json' | 'yaml' | 'xlsx' | 'csv' (one file per table). */
  function exportAs(std, format) {
    const stem = std.id || 'standard';
    if (format === 'json') return download(`${stem}.dataviz.json`, JSON.stringify(S.clean(std), null, 2) + '\n', 'application/json');
    if (format === 'yaml') return download(`${stem}.dataviz.yaml`, S.toYaml(std, root.jsyaml), 'application/yaml');
    if (format === 'xlsx') return root.XLSX.writeFile(S.toWorkbook(std, root.XLSX), `${stem}.dataviz.xlsx`, { compression: true });
    if (format === 'csv') {
      const t = S.toTables(std);
      const names = { items: 'items', links: 'links', types: 'item-types', linkTypes: 'link-types', filters: 'filters', about: 'about' };
      // one after the other: browsers ask once to allow several downloads
      Object.entries(names).forEach(([key, n], i) => {
        if (key !== 'items' && key !== 'about' && t[key].length < 2) return;
        setTimeout(() => download(`${stem}.${n}.csv`, S.toCsv(t[key]), 'text/csv;charset=utf-8'), i * 350);
      });
    }
  }

  /**
   * A link that opens this standard for anyone. A built-in or a public address gives a short link;
   * anything else carries the standard itself, compressed, after the # (never sent to a server).
   */
  async function shareUrl(std, origin, page) {
    const base = `${location.origin}${page || '/view/'}`;
    if (origin && origin.type === 'std') return { url: `${base}?std=${encodeURIComponent(origin.value)}`, embedded: false };
    if (origin && origin.type === 'src') return { url: `${base}${hashOf(origin.value)}`, embedded: false };
    return { url: `${base}#s=${await S.encodeShare(std)}`, embedded: true };
  }

  async function copy(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (e) {
      const area = Object.assign(document.createElement('textarea'), { value: text });
      document.body.append(area); area.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (err) { /* ignore */ }
      area.remove();
      return ok;
    }
  }

  let toastTimer = null;
  function toast(text, ms) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = text;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, ms || 4500);
  }

  /** Wire a drop zone (label containing a file input) to `onFiles(FileList)`. */
  function dropZone(zone, input, onFiles) {
    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag-active'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-active'));
    zone.addEventListener('drop', (e) => { e.preventDefault(); zone.classList.remove('drag-active'); if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files); });
    input.addEventListener('change', () => { if (input.files.length) onFiles(input.files); input.value = ''; });
  }

  // a new link pasted in the address bar only changes the #: open what it points to
  root.addEventListener('hashchange', () => { if (location.hash.length > 1) location.reload(); });

  root.DVio = { readFiles, fetchStandard, fromLocation, addressFromHash, hashOf, download, exportAs, shareUrl, copy, toast, dropZone };
})(window);
