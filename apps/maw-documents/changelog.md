# Changelog

*Structural changes to this documentation set. Not a dumping ground for every note — if it did
not change the shape of the docs or the schema, it does not belong here.*

📋 Decision history →
[MAW Documents — Decision Log](https://app.clickup.com/36074068/docs/12cwjm-57453/12cwjm-80213)

## 2026-09-16 (later) · Doc reader shipped (v1.1)

**`docs-viewer.html`** — renders every markdown page in this tree in a browser, with sidebar nav,
deep links per page, and in-tree `.md` links that resolve inside the reader.
[Open it.](https://mawizorek.github.io/maw-prose/apps/maw-documents/docs-viewer.html)

<p></p>

**Why it is a separate tool and not an update to `viewer.html`** (ruled by Michael, same day):
`viewer.html` in `apps/hml-llc/` is a **layout renderer + theme sandbox** — it filters for
`*.html` wireframe renders. It covers one of the twelve doc categories and covers it well.
Teaching it markdown would have made it a second tool wearing the first one's filename.
**`doc-render-engine` is a third thing: the markdown publisher.** Three tools, three jobs.

<p></p>

**Built to avoid the specific defect the sibling tool carries:** `viewer.html` hardcodes
`FALLBACK_APP_ROOT = 'apps/hml-llc'`, so off GitHub Pages it silently renders another app's
content with no error. **This reader has no fallback at all** — if it cannot derive its own app
from the URL it says so and renders nothing. A documentation reader that guesses its own app
would show you the wrong schema and look like it was working.

<p></p>

No third-party JavaScript. The markdown parser is in the file: headings, tables, fences,
lists, blockquotes, rules, inline code, links, bold, italic, strikethrough. Discovery is one
unauthenticated GitHub trees call; page bodies are same-origin fetches of the deployed file, so
**what renders is what shipped.**

### Fixed in the same pass

- ✅ **`tables/PurchaseLines.md`** now uses `→` like every sibling page. It shipped with ASCII
  arrows an hour earlier and was declared here rather than left to be found.
- ✅ **`OPEN-ME.md` nav map** re-verified against a live directory listing and now lists the
  reader. **Regenerate it from the tree; never hand-maintain it.**
- ✅ **`apps/hml-llc/OPEN-ME.md` corrected** (its own package, but the map was actively
  misleading): it named `_viewer.html` when the file is `viewer.html`, and omitted **eight root
  files that were on disk the whole time** — so a cold agent following it would have concluded
  `design-decisions.md` did not exist. Its known limits are now written into that file.

### Still open, and not mine to close

- ⚠️ **`theme: default-theme` is a placeholder.** This app has no assigned theme; the frontmatter
  block is STRICT, so a placeholder is correct and an omission would not be. The reader shows it
  as an amber badge rather than pretending. **Needs a real slug from Michael.**
- ⚠️ **`viewer.html`'s hardcoded fallback and hardcoded `DEFAULT_THEME` are unfixed in code.**
  Both are documented in that app's `OPEN-ME.md`. They are harmless where the file currently
  sits (it IS `apps/hml-llc`, and both theme claimants say `papyrus`) and become real on the
  first copy. Rewriting a live 14KB renderer to change three lines is how a working tool breaks.
- ⚠️ **Neither viewer appears in any app ledger.** `ClickUp_apps/VERSIONS.md` scopes coverage to
  that repo's root folders, so an HTML tool inside a `maw-prose` app package is structurally
  invisible to the fleet's only ledger. *"An app nobody indexes is an app nobody verifies."*
  Fleet-scope question, not a MAW Documents build step.

## 2026-09-16 · Package opened (v1.0)

**Cut on Michael's go-ahead**, six weeks after the placement was approved and never acted on.

Root: `OPEN-ME.md`, `README.md`, `schema-notes.md`, `design-decisions.md`, `data-standards.md`,
`next-build-spec.md`, this file. Plus `relationships/README.md` and ten pages in `tables/`.

**Ten tables documented:** `Documents`, `BibliographicDetails`, `DocumentCopies`, `People`,
`ContributorRoles`, `DocumentPeople`, `Organizations`, `Purchases`, `PurchaseLines`, `CopyLoans`.

### What was settled the same day these pages were written

- **Books are documents.** No separate library file — the design had already covered it and two
  differently-named surfaces hid the fact.
- **The contribution join collapsed from two tables to one.** A role belongs to the
  relationship, not the party.
- **`DocumentCopies` became load-bearing**, decided by implication when a purchase ledger was
  requested. You cannot buy a title.
- **Purchase ledger: header plus lines**, attaching to the copy.
- **One `Organizations` authority** instead of three org-shaped tables.
- **Naming locked to J3** and a rival `pk_`/`fk_` convention marked superseded on its own page.

### Corrections applied within the same session

Recorded because they were one habit, not five accidents — **a role or attribute placed on the
entity instead of on the relationship:**

1. `Organizations.fkOrganizationType` demoted from role-carrier to descriptive field.
2. `DocumentCopies.LentTo` struck; replaced by `CopyLoans`.
3. `BibliographicDetails.Publisher` changed from text to `fkPublisher`.
4. The claim that this tree projects the ClickUp page set — wrong. **It mirrors FileMaker's own
   Manage menus.**
5. The claim that the repo should only receive settled schema — wrong. **What is barred is
   *answerable* content, not unsettled content.**

### Deliberately absent

The library spine (`DocumentVariants`, `DocumentFiles`, `Contexts`, `Subjects`, `DocumentTypes`,
`ImportBatches`, `GLOBAL_USE_VARIABLES`) and the `layouts/` `scripts/` `value-lists/`
`calculations/` `fixtures/` directories.

They are designed but carry pre-J3 naming, and **cutting empty stubs would ship the scaffolding
and call it the building.** A file that exists and says nothing reads as a file that has been
written. [OPEN-ME.md](./OPEN-ME.md) lists exactly what is missing and why.
