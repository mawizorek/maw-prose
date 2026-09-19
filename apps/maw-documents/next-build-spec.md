# Next build spec

*What gets built next, in order, with the test that says it worked. Feature requests land HERE.*

🔴 **THE FILE EXISTS.** 14 tables built, records in `DOCUMENTS`, `POEPLE` and the roles table (J19,
2026-09-16). ~~Nothing is built. No `.fmp12` exists.~~ **Per the Lifecycle SoT rule the built file is
now the source and every page in this package is a CLAIM.** Verify against Manage before trusting a
field list here.

🪦 ~~**Rename pass — first, and cheap now.** Rename to PascalCase plural.~~ **DEAD CONVENTION.**
Reversed by Michael 2026-09-16 (*"clearly i'm committing to all caps"*) after the file was built
all-caps. Tables shout, fields do not. Struck in place, not deleted, because 10 of the 11 table pages
in `tables/` still carry the dead convention in their filenames.

---

## 🔴 THE ONE BLOCKER ON THE SPINE — answer before cutting anything

`data-standards.md` names **`DOCUMENT_INSTANCES`** as a live base table with `fkDocumentInstance` as
its key, and `tables/DocumentCopies.md` still exists beside it. **Three readings, and they are not
the same build:**

1. `DOCUMENT_INSTANCES` is `DocumentCopies` renamed → the variant and file layers are still uncut.
2. `DOCUMENT_INSTANCES` is `DOCUMENT_VARIANTS` + `DOCUMENT_FILES` merged → **the three-layer rule
   collapsed to two in the built file** and J1's *"document vs variant vs file version as three
   different layers"* needs restating or retiring.
3. It is all three collapsed → the library spine is done and this spec's step list is wrong.

⚠️ **UNVERIFIED — nobody has read Manage against this package.** The answer decides whether the spine
cut is six tables or two, so it is a blocker rather than a detail. Everything in *The renderer seam*
below is independent of it and can proceed today.

<!-- AGENT NOTE · why this is a blocker and not a footnote.
A table page for a table that was renamed is a second claimant on one entity, and the shape reads as
two tables to anyone who opens the folder. This package already carries evidence of what that costs:
the app was documented under two names for three months and the own-file-vs-integrate question read
as open the whole time (J8, J13).
The worse half is reading 2 as reading 1: cutting DOCUMENT_VARIANTS and DOCUMENT_FILES into a file
that already merged them ships two empty tables with FKs pointing at them, and per data-standards.md
an FK pointing at an uncut table resolves to nothing silently, forever.
-->

---

## The renderer seam — FMP → TSV → git → rendered page

⭐ **THE SEAM IS ALREADY BUILT AND IT IS NOT A MANIFEST FORMAT.** `doc-render-engine` stage 01b
(`docrender/datatable.py`) resolves TSV files declared as named SLOTS in page frontmatter. Do not
design a second bridge.

```yaml
---
type: policy
id: mewp-policy
status: public
summary: URITP delta on the EH&S aerial lift policy.
data:
  founded_on:
    file: relations-mewp-policy.tsv
    caption: What this policy is founded on
---
```

Then `!!! data "founded_on"` draws the table where it belongs, or `[the authorities](@data:founded_on)`
links it inline.

🔴 **THE BODY NAMES A SLOT, NEVER A FILE.** That indirection is the whole feature: swap the filename
in frontmatter and the prose is byte-identical across shows, courses or productions.

### What moves out of frontmatter

| Stays in frontmatter | Becomes a TSV row |
|---|---|
| `id` · `title` · `type` · `status` · `summary` | contributors, roles, relator codes |
| `nav` · `order` · `revised` · `keywords` | citations and founded-on authorities |
| `data:` slot declarations | contexts, subjects, audiences |
| | copies, locations, conditions |

⭐ **The rule: frontmatter carries what renders THIS page. A record is a row.** That is the answer to
*"so much of the work is setting up the front matter"* — the front matter was holding records.

### Export contract — FMP or ClickUp → TSV

1. 🔴 **SORT BY `PrimaryKey` ON EVERY EXPORT.** A re-export in a different order turns every diff into
   noise and the history becomes worthless. This is the single most important line in the section.
2. One row per record. Header row carries the field names.
3. A column may declare type and role in its header (`credits::num`, `thtr::id.key`) — `sheet.split_header`
   runs before the option validator, so `sort:` still matches a decorated column.
4. 🔴 **BASENAMES MUST BE UNIQUE TREE-WIDE.** The resolver searches the whole docs tree by name and
   **refuses a duplicate rather than choosing** — it reports every path instead. Michael accepted
   unique naming as the price of the feature; on a call sheet the wrong file is the wrong dates.
5. ⚠️ A declared **path** that misses is reported and refused. It does **not** fall through to the
   by-name search, because quietly finding a same-named file elsewhere hides the typo.
6. No PII in an exported TSV. **This repo is PUBLIC.** Roles and discrepancies, never student phones
   or personal emails.

### Slot vocabularies — 🔴 DIFFERENT REPO

**Coordinate: `mawizorek/doc-render-engine@main`, `objects/<type>.yml` → `data_slots`.**

Declare the vocabulary per type so a misspelled slot is reported instead of ignored:

| Type | `data_slots` |
|---|---|
| `policy` | `founded_on` · `supersedes` |
| `program` | `gates_privileges` · `completion_records` |
| `privilege` | `earned_by` · `covers_hazards` |
| `handbook` | `contributors` · `cited_works` |
| `index` | *(leave empty)* |

⚠️ **AN EMPTY LIST MEANS UNRESTRICTED, NOT FORBIDDEN** (Michael, 2026-08-06: *"empty means anything
goes"*). The `legal and` guard in `datatable._declared` is what implements that. **Do not tidy it
away** — deleting two words there puts five types' worth of pages into the build report in one
commit, `uritp-docs`' automatic-revision-log included.

---

## What git versions

| Versioned | Why git is right for it |
|---|---|
| **Prose** | sentence diffs, blame, review. Git's actual strength. |
| **The TSVs** | line-oriented: one record per line, so a field edit is a readable one-line diff |
| Engine code, object specs, theme tables | ordinary code review |

| 🚫 NOT versioned | Why |
|---|---|
| The `.fmp12` | binary, no useful diff, and it is the source of truth not a copy of one |
| Acquired PDFs and scans | copyright, and `maw-prose` + `ClickUp_apps` are both PUBLIC |
| Rendered HTML | already deployed to `gh-pages` |
| Anything with real PII | leaked twice already |

⭐ **The reframe worth keeping: a YAML frontmatter block cannot give a readable field-edit diff; a TSV
can.** Git was never the wrong tool. Records in headers were the wrong storage.

⚠️ **An exported TSV is a timestamped PROJECTION, not the database.** It is evidence of a state. When
it and the built file disagree, the file wins and the TSV gets re-exported.

---

## ClickUp schema skin — 🚩 Tasks in Multiple Lists is a TRAP

**A list membership is a join with NO ROW.** It cannot carry `IsPrimaryContext`, and it cannot carry
`fkRole` + `SortOrder`, which is the entire J5 ruling.

🔴 **AND IT DOES NOT MIGRATE.** The blueprint maps parent task → `DOCUMENTS`, subtask → variant/file
candidates, field values → controlled lists. **A multi-list membership has no line in that mapping
and cannot get one, because there is no record to export.** It evaporates at migration.

**The test: does removing the membership lose a fact?**

- **Yes** → it was schema. Build a **join list**, one task per join row, carrying its own fields.
  That is the honest skin for `DOCUMENT_PEOPLE`, `DOCUMENT_CONTEXTS`, `DOCUMENT_SUBJECTS`, `DOCUMENT_ORGS`.
- **No** → navigation only, and it is fine. Surfacing a task in a working-now list beside its home
  list loses nothing when removed.

<!-- AGENT NOTE · this is the same defect a fifth time, in a different runtime.
A single FK on the ONE side of a many-to-many has now been struck four times (fkPeopleJoins twice,
fkOrgRoleJoin once in built schema, plus the original two-join design). A multi-list membership is
the same shape with even less to inspect: no row, no attributes, no export.
It is seductive because it LOOKS like the many-to-many works — the task appears in both places, which
is exactly what a join produces visually. Shape is not content.
Michael's own data-standards.md already rules the one-level-down version: "do not hide entity
architecture inside a value list. If the thing needs an attribute beyond its display label, it is a
table." Same rule, one runtime over.
-->

---

## Two schema additions

### 1 · `DOCUMENT_RELATIONS` — citation and foundation are ONE table

**The insight, and it is Michael's own safety rule read structurally:** *"a URITP policy is founded on
an external authority and references it rather than restating it."* That is a bibliographic citation.

`PrimaryKey` · `fkFromDocument` · `fkToDocument` · `fkRelationType` · `CitationLocator` ·
`CitationLabel` · `IsPrimary` · `Notes` · audit fields.

**Controlled vocabulary**, `RelationType` as a table not a value list (it needs a sort order and a
reverse label, so per `data-standards.md` it is a table): `Cites` · `FoundedOn` · `DerivedFrom` ·
`Adapts` · `Translates` · `Summarizes` · `Supersedes` · `Amends` · `PartOf`.

🔴 **DIRECTION IS PART OF THE DATA.** `fkFromDocument` is the document making the claim. One row, never
a mirrored pair — a reverse row is a second claimant and they will disagree.

⭐ **This is the table that lets URITP safety join the master library.** Without it the MEWP policy
cannot point at the EH&S policy, and an authored handbook cannot cite an acquired one. Everything else
in the URITP fold-in is a field.

### 2 · `DOCUMENTS.ContentDisposition` — the render gate

`RepoAuthored` · `CatalogOnly` · `InternalRecord` · `Retired`

- `RepoAuthored` → prose lives in git, the renderer may build it, `id` matches the page's frontmatter `id`.
- `CatalogOnly` → catalogued and **citable**, never committed, never rendered.

🚫 **THIS IS THE COPYRIGHT FIREWALL, not a convenience flag.** An acquired handbook being downloadable
is not permission to republish it, and both repos are public. **A build that finds a `CatalogOnly` row
with a repo path fails closed.**

⚠️ **A citation to a `CatalogOnly` item renders as citation TEXT with no link** — author, title,
edition, publisher, year, locator, internal catalog key. Never the PDF, never the OCR text, never a
private storage path.

---

## Defects — free now, expensive with records

| Defect | State | Cost of fixing today |
|---|---|---|
| `DOCUMENTS.fkPeopleJoins` | struck in J5, **still in the built graph** | zero rows in the child. Delete. |
| `BIBLIOGRAPHIC_DETAILS.fkOrgRoleJoin` | same defect, **newly created** beside `DOCUMENT_ORGS` | zero rows. Delete. |
| `PURCHASES` | 5 fields, **all plumbing** — no `fkVendor`, `PurchaseDate`, `OrderReference`, `Subtotal`, `ShippingAmount`, `TaxAmount`, `TotalAmount`, `Currency` | the ledger cannot answer its own question |
| `PURCHASE_LINES.Quantity` | **missing**, while `UnitPrice` and `LineTotal` both exist | the validation has no second operand |
| `fkStorageLocation` | points at `STORAGE_LOCATIONS`, **which was never cut** | resolves to nothing, silently, forever |
| `POEPLE` | misspelled in the live graph | a name is a contract |
| 10 of 11 `tables/` pages | still PascalCase filenames; only `DOCUMENT_TYPES.md` was renamed | the reversal is half-applied |

---

## Build order

1. **Answer the `DOCUMENT_INSTANCES` question.** Read Manage, write the answer into `schema-notes.md`.
2. **Delete the two dead FKs** (`fkPeopleJoins`, `fkOrgRoleJoin`) while both children are empty.
3. **Fill `PURCHASES`** with its header fields; add `PURCHASE_LINES.Quantity`.
4. **`DOCUMENT_RELATIONS` + `RELATION_TYPES`**, seeded with the nine relation types.
5. **`DOCUMENTS.ContentDisposition`**, defaulting to `CatalogOnly` — 🔴 **the safe default is the
   restrictive one.**
6. **Cut the spine** per step 1's answer: `CONTEXTS`, `DOCUMENT_CONTEXTS`, `SUBJECTS`,
   `DOCUMENT_SUBJECTS`, `IMPORT_BATCHES`, `GLOBAL_USE_VARIABLES`, `STORAGE_LOCATIONS`, and the
   variant/file layers **only if step 1 says they are not already merged.**
7. **First TSV export** — `DOCUMENT_RELATIONS` for one real policy, sorted by `PrimaryKey`.
8. **Declare `data_slots`** on the safety types in `doc-render-engine`.
9. **Render one page** whose founded-on table comes entirely from the TSV.

### ✂️ CUT HERE

Steps 1–9 are the upgrade. **Everything below is a later session and saying otherwise is lying about
the arithmetic:**

the 74-row `need to import` migration · reconciling the three competing ClickUp document lists ·
reclassifying the 41 `VERSIONS / PARTS` rows · normalizing authors and publishers · the
`h_DocLibrary` hub · intake flows · a CI validator that fails closed on a duplicate `id` ·
repairing the Decision Log page body (**J10–J19 are parked as COMMENTS because the body refuses
writes** — ten rulings living outside the log).

---

## Exit tests

**An exit test that cannot fail is not a test.**

1. **`DOCUMENTS` + the copy layer** → one work with **two copies** in different locations with
   different conditions, plus a third work with **zero copies** still in the catalogue.
2. **`PEOPLE` + roles + `DOCUMENT_PEOPLE`** → one person as **author on one work and editor on
   another**, exactly one `PEOPLE` row. Then try the same person+role on one work twice and confirm
   the script refuses — ⚠️ **FileMaker will not.**
3. **`BIBLIOGRAPHIC_DETAILS`** → a packing slip with **no row at all** beside a textbook with a full
   one, and **no empty columns on `DOCUMENTS`.**
4. **`ORGANIZATIONS`** → **one row serving as both publisher and vendor.** If that needs two rows,
   `fkOrganizationType` has been misused as the role again.
5. **`PURCHASES` + `PURCHASE_LINES`** → one order, three books, one shipping charge. Then **force a
   failure mid-commit and confirm NO header is left behind.** ⚠️ Lines must be created through the
   `PURCHASE_LINES` relationship from the parent record — anywhere else is outside revert scope.
6. **`COPY_LOANS`** → the same copy **lent twice, first loan still legible.**
7. **`DOCUMENT_RELATIONS`** → the MEWP policy `FoundedOn` the EH&S policy, **and** an authored
   handbook `DerivedFrom` an acquired one. **One table, both facts.** Then confirm the acquired row
   renders as citation text with **no link and no file.**
8. **The seam** → change one cell in the TSV, re-export, rebuild. **The rendered page changes and the
   prose file has a zero-line diff.** 🔴 **This is the test that proves the whole architecture.**

<!-- AGENT NOTE · why the exit tests are shaped this way.
Step 5's forced failure is the one nobody runs and the only one that matters: a partial purchase
(header, no lines) looks completely fine in a list view, and calc_LineCount = 0 is the only tell.
Step 2's duplicate check exists because the two-join design this app replaced was criticised for
allowing exactly that duplicate. Failing to guard it here reproduces the defect one table over.
Step 1's zero-copy case is how a library records a work it does not own.
Step 8 is new and it is the load-bearing one. A zero-line prose diff alongside a changed page is the
ONLY observable proof that content and metadata actually separated. If the prose file changed too,
the records are still in the page and nothing was fixed — which would look like success, because the
page would render correctly either way.
-->

---

## Reports this schema unlocks

All one join away — **none were reachable from the original graph:** spend by vendor and by year ·
cost per subject or document type · average price by format · what you paid for and never annotated ·
replacement value for insurance · what you owe and what is owed to you · **every document founded on
a given external authority** (the safety-audit question) · **every authored page citing a work you no
longer have a copy of.**

<!-- AGENT NOTE · keep this list; it earned the layer.
The original design added a second join on the PEOPLE side hoping to unlock reporting, and unlocked
none. The purchase, copy and relation layers unlock every line above. Right instinct, wrong table —
worth remembering the next time a table is proposed "for reporting."
The last two lines are the ones that justify DOCUMENT_RELATIONS on its own: neither is answerable by
any amount of prose, and both are one join once the table exists.
-->

---

## Not in scope

Payments/refunds · currency conversion · valuation over time · condition history · barcode/QR ·
movement log · the production authority layer · loan reminders · a headless content API (**premature
until the schema stops moving**). Reasons in [schema-notes.md](./schema-notes.md). **Deferred is not
forgotten.**
