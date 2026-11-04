/*!
 * dataviz - "My standards": the standards a visitor opened or built, kept in this browser only
 * (localStorage). There is no account and no server copy: clearing the browser's site data clears
 * the library. Used by the viewer (/view/) and the builder (/builder/).
 *
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 *   DVLibrary.list()               -> [{ id, title, subtitle, items, savedAt, source }], newest first
 *   DVLibrary.get(id)              -> the standard (canonical object) or null
 *   DVLibrary.put(std, source)     -> true, or false when the browser refuses (private window, full)
 *   DVLibrary.remove(id)
 */
(function (root) {
  'use strict';
  const INDEX = 'dataviz:library';
  const KEY = (id) => `dataviz:standard:${id}`;

  const readIndex = () => { try { return JSON.parse(localStorage.getItem(INDEX) || '{}') || {}; } catch (e) { return {}; } };
  const writeIndex = (index) => { localStorage.setItem(INDEX, JSON.stringify(index)); };

  root.DVLibrary = {
    list() {
      return Object.values(readIndex()).sort((a, b) => String(b.savedAt).localeCompare(String(a.savedAt)));
    },
    get(id) {
      try { const raw = localStorage.getItem(KEY(id)); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
    },
    put(std, source) {
      try {
        localStorage.setItem(KEY(std.id), JSON.stringify(std));
        const index = readIndex();
        index[std.id] = { id: std.id, title: std.title, subtitle: std.subtitle || '', items: (std.items || []).length, savedAt: new Date().toISOString(), source: source || (index[std.id] && index[std.id].source) || '' };
        writeIndex(index);
        return true;
      } catch (e) { return false; }
    },
    remove(id) {
      try { localStorage.removeItem(KEY(id)); const index = readIndex(); delete index[id]; writeIndex(index); } catch (e) { /* nothing kept anyway */ }
    },
    /** An id not used yet in the library: "my-standard", "my-standard-2", ... */
    freeId(id) {
      const index = readIndex();
      if (!index[id]) return id;
      let n = 2;
      while (index[`${id}-${n}`]) n++;
      return `${id}-${n}`;
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
