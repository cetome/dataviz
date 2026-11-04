# Contributing to dataviz

Thank you for helping. dataviz stays free, open and account-free, and contributions keep it that way.

## Ground rules

- **No accounts, no tracking, no server-side storage** in the viewer and the builder. Everything a
  visitor opens or makes stays in their browser unless they download or share it themselves.
- **No build step.** Plain HTML, CSS and JavaScript that a browser runs as is. Third-party libraries
  go in `js/vendor/`, pinned, with their licence listed in `NOTICE`. When you add or update one, update
  `COMPONENTS` in `tools/sbom.mjs` and run it: the SBOM and the VEX in `sbom/` must stay current.
- **The format is a contract.** Files written for `dataviz: 1` must keep opening. A change to the
  format updates `js/standard.js`, `docs/FORMAT.md`, `schema/`, the YAML template and the AI
  prompt together. Then run `node tools/templates.mjs`, which must end with `ALL GOOD`.
- **Do not edit `data/` by hand** unless you are correcting the standards mapping, and say so. Run
  `node tools/check-data.mjs`: it reports any difference with the original data.

## Ways to help

- **Report a problem** with a dataviz file that does not open as expected: attach the file (or a
  small one that shows the problem) and what you expected.
- **Correct the built-in data**: point to the clause of the standard and what is wrong. Corrections
  are accepted under CC BY 4.0, like the data (`DATA-LICENSE.md`).
- **Share a dataviz file** you made: publish it in your own repository with a licence, and open an
  issue so it can be listed.
- **Improve the viewer or the builder**: open an issue first for anything larger than a fix.

## Pull requests

1. One subject per pull request, with a short description of what changes for the user.
2. Test in a browser: serve the folder (`python -m http.server`), open the viewer, the builder and
   a built-in page, and check the console is clean. Check a phone-width window too.
3. Run the checks: `node tools/templates.mjs`, `node tools/check-data.mjs`, `node tools/check-public.mjs`.
4. Keep the style of the code around you: one `state` object and a `render()` per page, small
   functions, comments that say why.

By contributing code, you agree that it is licensed under the AGPL-3.0-or-later, like the rest of the code.

## Conduct

Be type and assume good faith. Harassment or abuse leads to removal from the project. Report
problems to the maintainers through GitHub (privately as described in SECURITY.md if needed).
