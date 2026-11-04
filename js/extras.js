/*!
 * dataviz - the deployment hook of the built-in graph pages. Empty on purpose.
 *
 * Copyright (C) 2024-2026 cetome
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * The four built-in pages load this file after js/graph-common.js and before js/assessment.js. A
 * deployment may replace it to add something of its own (analytics, a notice...). It may also set
 * `DV.gate`, which js/assessment.js and js/en303645.js call when present:
 *   DV.gate.require(kind, make)   before a download: call make() to hand the file over
 *   DV.gate.sync(page, snapshot)  after an assessment change: snapshot() returns the counts and entries
 * Without it (this file), every download is handed over at once and nothing leaves the browser.
 * The viewer (/view/) and the builder (/builder/) never load this file.
 */
