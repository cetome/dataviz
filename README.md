# dataviz

**Standards as interactive dependency graphs.** Open a standard, see how its requirements depend on
each other, filter it by condition or product type, and track your assessment against it.
Free, open source, no account: everything happens in your browser.

Source: **https://github.com/cetome/dataviz**. Host it on your own site: it comes with four built-in graphs (EN 18031, EN 18031 E.Info,
EN 303 645 / TS 103 701, prEN 40000-1-3 and the CRA) and:

- **the viewer** (`/view/`): opens any *dataviz file* from your disk, a web address or a share link;
- **the builder** (`/builder/`): makes or edits a dataviz file, with a live preview, and exports it
  as JSON, YAML, Excel or CSV, or as a share link;
- **the format reference** (`/format/`), templates and an AI prompt to turn a standard into a dataviz file.

## Make your own dataviz file

A dataviz file describes a standard's **items** (chapters, requirements...), the **links** between
them, the item and link **types**, and the **filters** a reader can tick. Three ways to make one:

1. **With an AI assistant:** give it [`templates/ai-prompt.txt`](templates/ai-prompt.txt) and the
   standard, then open its answer in the builder and check it against the standard.
2. **By hand:** fill in a template: [Excel](templates/dataviz-template.xlsx),
   [YAML](templates/dataviz-template.yaml) (commented), [JSON](templates/dataviz-template.json),
   CSV ([items](templates/dataviz-template-items.csv), [links](templates/dataviz-template-links.csv)).
3. **In the builder**, item by item.

The format is described in [`docs/FORMAT.md`](docs/FORMAT.md), with a JSON Schema in
[`schema/`](schema/dataviz-file.schema.json) and an example using every feature in
[`examples/`](examples/example.dataviz.yaml).

To share one: send the file, publish it anywhere that allows cross-origin reads (a GitHub repository
works) and share `https://<your dataviz site>/view/#gh:owner/repo/my-standard.yaml` (or `#https://...`
for any other address: the part after `#` never reaches the server), or copy a share link
from the viewer or the builder: it carries the whole file after the `#`, so no server ever sees it.

## Privacy

No account, no cookie, no analytics, no server-side storage. Files are read in the browser, and what you
open, build and assess is kept in the browser's local storage, and you can download or delete it at
any time. The only requests the viewer makes are for the site's own files and for a web address you
typed. (The cetome-hosted copy of the four built-in graphs asks for an email address before
downloading the IXIT list and assessment files. That part is not in this repository.)

## Run it

It is a static site: plain HTML, CSS and JavaScript, no build step, no dependency to install. Serve
the folder at the root of a web server (pages use absolute paths such as `/js/...`):

```
python -m http.server 8000        # or: npx serve .
```

then open http://localhost:8000. Any web server works. `.htaccess` holds the settings for Apache
(HTTPS, caching, the folders not to serve, the Content-Security-Policy).

## Host it on your own site

The pages name no site, so the repository works anywhere as it is. To give your copy its own
canonical addresses, link previews and sitemap, build it for your address and upload `dist/`:

```
node tools/build.mjs --url https://your.site      # then upload the content of dist/
```

A site file holds more: your own files laid over the build at the same paths (social pictures in
`img/social/`, a `js/extras.js`...) and links added to every page footer. See the head of
`tools/build.mjs`, then run `node tools/build.mjs --site path/to/site.json`. Social pictures for
your address: `node tools/social.mjs --url https://your.site --out path/to/img/social`.

Replace the cetome name and logos with your own (see NOTICE). To offer your own dataviz files on
the start page, put them in `standards/` and run `node tools/index-standards.mjs`.

## Layout

```
index.html                 landing page
view/  builder/  format/   the viewer, the builder, the format reference (generated, see tools/)
en18031/ einfo/ en303645/ pren40000-1-3/
                           the four built-in graph pages (with their own extra features: ICS import,
                           IXIT list, domain menus...)
data/                      the built-in graph data, as the built-in pages load it
standards/                 the same data as dataviz files, and index.json (what the start page lists)
templates/  examples/  schema/  docs/
                           what people need to make their own dataviz file
js/standard.js             the format: read any carrier, check, write, graph elements (browser + Node)
js/io.js  js/library.js    opening, exporting, share links, "My standards" in the browser
js/viewer.js  js/builder.js
js/assessment.js           the details panel and assessment tracking shared by every graph
js/graph-common.js         helpers shared by the graph pages (the DV global)
js/extras.js               the deployment hook of the built-in pages (empty here)
js/en18031.js js/en303645.js js/pren40000-1-3.js
                           logic of the built-in pages
js/vendor/  fonts/  img/  css/
tools/                     maintenance scripts (Node 20+)
```

Each built-in page keeps one `state` object and a `render()` that derives the graph from it. The
viewer works the same way for any dataviz file.

## Tools

```
node tools/convert-builtins.mjs   data/ -> standards/*.json, then standards/index.json
node tools/index-standards.mjs    standards/index.json from the files in standards/
node tools/templates.mjs          templates/* and format/index.html from their sources, then checks
                                  every carrier round-trips and every dataviz file reads cleanly
node tools/check-data.mjs         data/ still holds exactly the original graph elements
node tools/build.mjs [--url ...]  dist/, ready to upload (see "Host it on your own site")
node tools/check-public.mjs       nothing private (secret, PHP, private files, a private domain) would be published
cd tools && npm install           once, for the two scripts below (drive Microsoft Edge):
node tools/icons.mjs              the favicon set
node tools/social.mjs [page]      the social cards (--url, --out)
```

## Licences

- **Code:** GNU Affero General Public License v3.0 or later ([LICENSE](LICENSE)). If you run a
  modified version for others over a network, offer them its source.
- **Built-in graph data** (`data/`, `standards/`): CC BY 4.0, credit cetome
  ([DATA-LICENSE.md](DATA-LICENSE.md)). The standards it refers to are not included and remain
  their publishers' (CEN, CENELEC, ETSI), available on their own terms.
- **Format, templates, example, schema, AI prompt:** CC0, no rights reserved: build tools on the
  format freely.
- **Third-party libraries and font:** their own licences, listed in [NOTICE](NOTICE).
- The cetome name and logos are not licensed.

Contributions are welcome: see [CONTRIBUTING.md](CONTRIBUTING.md). Security issues:
[SECURITY.md](SECURITY.md).
