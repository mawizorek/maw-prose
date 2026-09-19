# REPO_PAGES

Manage → Database → Tables → REPO_PAGES

**Grain:** one rendered page that lives in a git repo. NOT one document. NOT one file on disk.

🔴 **Page grain is not document grain.** The Stage Manager Handbook is ONE work with roughly forty pages. One row per page is correct here and catastrophic in `DOCUMENTS`: forty rows in `DOCUMENTS` would put forty claimants on one bibliographic identity, and every citation, every purchase line, every loan would have to pick one of them. `DOCUMENTS` answers *what work is this*. `REPO_PAGES` answers *where does this page live and what does the build do with it*. A document with no repo pages is normal (an acquired textbook). A repo page with no parent document is a defect.

🔴 **This table is a sparse 1:N extension, not a spine table.** It exists only for documents whose prose is committed. Nothing in `DOCUMENTS` becomes required because this table exists.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
| --- | --- | --- | --- | --- |
| `PrimaryKey` | text-uuid | Bare UUID, auto-enter Get(UUID), never displayed | REPO_PAGES | |
| `fkDocument` | text-uuid | FK → DOCUMENTS.PrimaryKey. The bibliographic parent. Required. | DOCUMENTS_forPage | 🔴 no orphans |
| `PageID` | text | The `id:` in the page front matter. Unique across the whole tree. | | 🔴 THE SEAM |
| `Repo` | text | `owner/name`, no URL, no branch | | |
| `RepoPath` | text | Path from repo root, e.g. `safety/programs/mewp.md` | | |
| `PublishedURL` | text | Live rendered page (gh-pages / Pages site) | | |
| `BlobURL` | text | GitHub `/blob/` URL to the source. Never `raw.githubusercontent` | | 🚩 |
| `PageType` | text | Value from the renderer's `objects/<type>.yml` vocabulary | PAGE_TYPES | |
| `PageStatus` | text | `draft` / `internal` / `public` / `withdrawn` | | |
| `NavState` | text | `collapsed` / `expanded` / `hidden`. Mirrors front matter `nav:` | | |
| `SortOrder` | number | Mirrors front matter `order:`. Sibling ordering within a section | | |
| `RevisedLabel` | text | Human revision stamp shown on the page, e.g. `2026-08` | | |
| `LastVerifiedTimestamp` | timestamp | When a human last confirmed the prose is still true | | |
| `VerifiedBy` | text-uuid | FK → POEPLE.PrimaryKey (misspelling is live, do not fix in isolation) | POEPLE_forVerify | |
| `calc_PageLabel` | (c→Text) | `PageID & " · " & RepoPath` for list views and value lists | | |
| `calc_IsPublished` | (c→Number) | `not IsEmpty(PublishedURL)` | | |

Audit fields → data-standards.md

## 🔴 PageID is the seam. Everything else is convenience.

`PageID` is the ONLY field in this table that another system reads. It must equal the front matter `id:` on the page byte for byte. The renderer already resolves `@id` cross references against that value, the safety site already had four dangling `@id` refs after two file deletions, and the TSV slot resolver already refuses duplicate basenames rather than guessing. `PageID` is what lets the catalogue answer *which record is this page* and lets a validator answer *does every `@id` in the tree resolve*.

Uniqueness cannot be enforced in ClickUp and is not enforced by FMP validation alone across a tree the build also writes. It is enforced by the export validator, which **fails closed**: duplicate `PageID`, or a `PageID` that no committed page carries, stops the build.

<!-- AGENT NOTE · Why the grain splits here.
     A document is a bibliographic identity: one title, one set of authors, one citation.
     A page is a build artifact: one file, one URL, one sort position.
     Collapsing them means either (a) forty DOCUMENTS rows for one handbook, which
     destroys citation, or (b) one DOCUMENTS row carrying forty RepoPaths in a
     repeating field, which is not a database. The split is the whole point. -->

## 🚩 Deliberately NOT here

- **Prose.** Not a field, not a container, not a note. The page body lives in git and only in git. This table points AT prose, it never holds prose.
- **`fkPageJoins`.** Same defect class as `DOCUMENTS.fkPeopleJoins` (struck in J5, still sitting in the built graph with zero child rows) and `BIBLIOGRAPHIC_DETAILS.fkOrgRoleJoin`. A fourth strike. FKs point at tables, never at joins.
- **Per-show or per-context copies of a page.** That is what the renderer's named data SLOTS are for: the body names a SLOT, the show supplies the TSV, prose stays byte-identical. A second row here for the same prose is a bug.
- **Anything ClickUp's "tasks in multiple lists" could carry.** A list membership is a join with no row. It cannot hold `IsPrimaryContext`, it cannot hold `fkRole` plus `SortOrder`, and it does not migrate: the blueprint mapping has no line for it and cannot get one. Test before reaching for it: *does removing the membership lose a fact?* Yes → build a join LIST with one task per join row. No → navigation only, harmless.

<!-- AGENT NOTE · Why DOCUMENTS gains almost nothing.
     DOCUMENTS gains exactly ONE field for this whole feature: ContentDisposition.
     Everything else lands here, sparse, off a FK. That is the anti-slop rule.
     If a future field would be empty for every acquired textbook, it belongs in
     REPO_PAGES or in BIBLIOGRAPHIC_DETAILS, never in the spine. -->

## Rules

1. `fkDocument` is required. A page with no bibliographic parent is a defect the validator rejects, not a row to be tolerated.
2. `PageID` equals the front matter `id:` exactly. Case, punctuation, everything.
3. `PageID` is unique tree-wide. The validator fails closed on collision.
4. `BlobURL` uses `/blob/`. `raw.githubusercontent.com` links are rejected on sight.
5. `PageStatus` and `DOCUMENTS.ContentDisposition` must agree. `CatalogOnly` with one or more child pages means copyrighted prose was committed to a public repo. **The validator fails closed on that combination.** It is the copyright firewall, and it is the reason `ContentDisposition` defaults to the restrictive value.
6. `ContentDisposition` is a DECLARED permission. `calc_PageCount` on `DOCUMENTS` is a DERIVED fact. Derived Field Pattern: when a declaration and a derivation disagree, the validator stops, it does not reconcile.
7. **Authority direction, declared:** the target state is that ClickUp (later FMP) AUTHORS this metadata and the build GENERATES front matter from it. Today it is a MIRROR of front matter that already exists in the tree. Both directions are legitimate; running them undeclared is not. Every export header stamps which direction produced it.
8. Rows are never culled. A withdrawn page becomes `PageStatus = withdrawn` and keeps its row, because `@id` references to it still need to resolve to something that explains itself.

## Scripts

- `Export REPO_PAGES to TSV` — one record per line, **sorted by `PrimaryKey`**, or re-export reordering turns every diff into noise. The export is a timestamped projection, not the database.
- `Validate PageID against tree` — walk committed front matter, diff `PageID` sets both ways. Report: in tree but not catalogued, catalogued but not in tree, duplicated.
- `Report dangling @id` — every `@id` reference in the tree whose target `PageID` does not exist. The free win: this is exactly the failure that emptied `housekeeping.md` after commit `3882b7f`.

## Open

- Whether `PageType` gets its own authority table or borrows the renderer's `objects/<type>.yml` vocabulary as the single source. Leaning borrow: two vocabularies for one concept is how the naming convention forked in the first place.
- Whether `NavState` and `SortOrder` belong here at all once authority flips to ClickUp-authors. If the build generates front matter, these are inputs. If the build only mirrors, they are noise. Revisit at the flip, not before.

FK map → relationships/README.md
