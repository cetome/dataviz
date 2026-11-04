# The dataviz file format

A **dataviz file** describes a standard as a graph: its **items** (chapters, requirements,
recommendations...), the **links** between them, the item and link **types**, and the
**filters** a reader can tick. The viewer (`/view/` of a dataviz site) and the
builder (`/builder/`) read it in the browser: nothing is uploaded, there is
no account.

A dataviz file is not the standard itself. To use a standard you have as a PDF, turn it into a
dataviz file first, in one of three ways:

- **by hand**, from a template: [Excel](../templates/dataviz-template.xlsx),
  [YAML](../templates/dataviz-template.yaml) (commented), [JSON](../templates/dataviz-template.json),
  or CSV ([items](../templates/dataviz-template-items.csv), [links](../templates/dataviz-template-links.csv));
- **in the builder**, item by item, with a live preview;
- **with an AI assistant**: give it [this prompt](../templates/ai-prompt.txt) and the standard, then
  open its answer in the builder and check it against the standard (the Check tab lists any problem).

The same content can be written in four carriers, all read the same way: **JSON**, **YAML**,
**Excel** (one sheet per table) and **CSV** (one file per table). A complete example using every
feature: [example.dataviz.yaml](../examples/example.dataviz.yaml). A JSON Schema for editors and
validators: [dataviz-file.schema.json](../schema/dataviz-file.schema.json).

## The smallest file

Only items with an `id` are required.

```yaml
items:
  - id: "1"
  - id: "1.1"
    parent: "1"
```

## About the standard

| Field | Meaning | Default |
|---|---|---|
| `dataviz` | Format version: `1` | 1 |
| `id` | Short name used for file names, links and the browser storage: lower case, digits, dashes | from the title |
| `title` | Shown at the top of the viewer | "Untitled standard" |
| `subtitle` | One line under the title | |
| `version` | Version of the standard (quote it in YAML: `"1.0"`) | |
| `date` | Date, `YYYY-MM-DD` | |
| `authors` | Who made this file | |
| `url` | Where the standard can be read | |
| `licence` | The licence of **this file** (`CC-BY-4.0`, `CC0-1.0`, ...). Mind the copyright of any text quoted from a standard | |
| `description` | A few lines, same text syntax as items | |
| `layout` | `auto` (saved positions if any, else organic), `saved`, `hierarchical`, `organic`, `grid`, `circle` | `auto` |
| `direction` | For `hierarchical`: `LR`, `TB`, `RL`, `BT` | `LR` |

In Excel and CSV these are the rows of the **About** table, with the columns `field` and `value`.

## Items

One per chapter, requirement, recommendation, document, test... Table **Items**.

| Field | Meaning |
|---|---|
| `id` | **Required.** Unique. Use the standard's own numbering (`5.1-1`, `ACM-1`). In YAML, quote ids that look like numbers |
| `title` | The item's name |
| `type` | The id of a type (below) |
| `parent` | The id of the item that contains it. Leave it out at the top level. Parents are drawn as boxes around their children |
| `tags` | Tag ids (below). A list in JSON and YAML, comma-separated in Excel and CSV |
| `text` | The description. One paragraph per line, `- ` starts a bullet, `**bold**`, backticks for code, `[link](https://...)`. Anything else is shown as typed (no HTML) |
| `label` | Optional short text drawn on the node, instead of what its type shows |
| `url` | Optional link to the item in the standard |
| `x`, `y` | Saved position, for the `saved` layout. The builder fills them in when you arrange the graph |

## Links

One per arrow. Table **Links**.

| Field | Meaning |
|---|---|
| `from` | **Required.** Item id where the arrow starts |
| `to` | **Required.** Item id the arrow points to |
| `type` | The id of a link type (below) |
| `label` | Optional text on the arrow (the reader can show link labels) |

## Item types

What each item is, how it looks, and whether it can be assessed. Table **Item types**.

| Field | Values | Default |
|---|---|---|
| `id` | **Required.** Referenced by items | |
| `label` | Shown in the legend and the details | the id |
| `color` | `#rrggbb` | automatic |
| `shape` | `round-rectangle`, `rectangle`, `ellipse`, `hexagon`, `diamond`, `triangle`, `octagon`, `tag`, `barrel` | `round-rectangle` |
| `border` | `solid`, `dashed`, `dotted`, `double`, `none`. Dashed and dotted draw a light "optional" look | `solid` |
| `caption` | What the node shows: `id`, `title`, `both` | `id` |
| `assess` | `yes`, `no`, or empty: items of this type get the self-assessment form (status, justification, evidence, verdict) | empty: items without children |
| `description` | Shown as a tooltip in the legend | |

A type used by an item but not declared is added with default looks (and reported).

## Link types

What an arrow means. Table **Link types**.

| Field | Values | Default |
|---|---|---|
| `id` | **Required.** Referenced by links | |
| `label` | Shown in the legend and the details | the id |
| `color` | `#rrggbb` | automatic |
| `style` | `solid`, `dashed`, `dotted` | `solid` |
| `arrow` | `triangle`, `none`, `square`, `circle`, `diamond`, `tee`, `vee` | `triangle` |

## Filters and tags

A filter is a group of checkboxes in the viewer's sidebar. Each checkbox is a tag, and items carry
the tags that apply to them. Table **Filters**: one row per tag, with the columns `filter`,
`filter label`, `mode`, `tag`, `tag label`. Rows with the same `filter` form one filter.

| `mode` | Ticking tags... | Typical use |
|---|---|---|
| `any` (default) | shows the items carrying **any** ticked tag | conditions ("passwords are used") |
| `all` | shows the items carrying **every** ticked tag | applicability ("part 1" and "part 2") |
| `none` | **hides** the items carrying a ticked tag | "hide recommendations" |

Tag ids are unique across all filters. Tags used by items but not declared are gathered in a "Tags"
filter (and reported). Several filters combine: an item must pass each one. Parents of a kept item
are always drawn, and the reader can also keep the items linked to the kept ones.

In JSON and YAML:

```yaml
filters:
  - id: condition
    label: Conditions
    mode: any
    tags:
      - id: c1
        label: Passwords are used
```

## Excel and CSV

The workbook has one sheet per table, named **About**, **Item types**, **Link types**, **Filters**,
**Items**, **Links** (a **Read me** sheet is ignored). The first row of each sheet holds the column
names, in any order. Unknown columns are ignored, and so are rows whose first cell starts with `#`.
Common spellings are understood: `source`/`target` for `from`/`to`, `kind` or `category` for `type`,
`description` for `text`, `name` for `title`...

With CSV, give one file per table. Each file is recognised by its name (`items.csv`,
`my-standard-links.csv`...) or by its columns, so a single file of items is enough to start.
Comma, semicolon and tab separators are all read.

## What the reader does with it

- **Open it:** drop the file on the viewer, or share a link to a file published on the web, with its
  address after the `#`: `https://<dataviz site>/view/#https://example.org/my-standard.yaml`, or
  for a file in a GitHub repository `https://<dataviz site>/view/#gh:owner/repo/my-standard.yaml`
  (`#gh:owner/repo@branch/...` for another branch). The part after `#` never reaches the server. The
  file's server must allow cross-origin reads (GitHub does). Or send a share link copied from the
  viewer or the builder: it carries the whole file after the `#`, so it is never sent to any server.
- **Explore it:** search, filters, legend, layouts, details of each item and its links.
- **Assess against it:** status, justification and evidence per assessable item, an assessor mode with
  verdicts, kept in the browser and exported as CSV or JSON.

## Checks

The viewer and the builder (Check tab) report what they had to fix:

- **errors**: an item without id, an id used twice (only the first is drawn), a parent that does not
  exist or a loop of parents (the item is drawn at the top level), a link to an unknown item (left
  out), a tag in two filters;
- **warnings**: an undeclared type, link type or tag (added), a link to itself, a link listed twice,
  items with only one coordinate, some items with a saved position and others without.

A file with errors still opens: what can be drawn is drawn.

## Versioning

`dataviz: 1` is the current format. Future versions will keep reading version 1 files. Unknown
fields are ignored by the viewer and are not kept when the builder saves the file.
