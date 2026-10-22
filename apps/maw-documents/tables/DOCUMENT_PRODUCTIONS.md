---
id: maw-documents-table-documentproductions
title: "DOCUMENT_PRODUCTIONS"
type: reference
status: hidden
summary: "One document's involvement in one production.** The notes live here."
data:
  catalog:
    file: DOCUMENT_PRODUCTIONS.tsv
---
# DOCUMENT_PRODUCTIONS

!!! abstract "Grain"
    one document's involvement in one production.** This paperwork, on this show, with the notes
    for that show. Four rows if a run sheet is used on four productions.

⭐ **This is the table that makes a paperwork matrix possible.** Paperwork items are the rows,
productions are the columns, and **a cell is one record here.** The matrix is a PIVOT of this
table, never a column definition.


Audit fields → [data-standards.md](../data-standards.md).

<!-- AGENT NOTE · naming, because this page already got it wrong once.
ALL_CAPS is the live convention: Michael reversed the PascalCase rename pass on 2026-09-16 after
the file was built all-caps ("clearly i'm committing to all caps"). Tables shout, fields do not.
This page shipped as DocumentProductions.md on 2026-10-10 and was renamed same-day. The cause is
worth keeping: the house SHAPE was cloned correctly from DocumentPeople.md, and the CONVENTION was
cloned from the same stale file. Ten sibling pages still carry the dead names, so the exemplar
itself teaches the wrong answer. Live exemplars are DOCUMENT_TYPES.md and REPO_PAGES.md.
Rule: verify a convention against next-build-spec.md, never against the file you are cloning.
-->

<!-- AGENT NOTE · why a tag could never do this, which is the whole origin of the table.
Michael had productions as TAGS: MAW Documents > VALUE LISTS > TAGS (901329124550) holds
"Big Love" and "Thought/Crime" as rows, alongside six other axes in 38 rows.
A TAG CANNOT CARRY A PAYLOAD. "Big Love" as a tag can never hold the per-show notes, because a
tag is a membership assertion and nothing else. That is the same wall as uritp-docs
REPO_PAGES/current-production-*.md (four files): one slot on the spec side holding the current
member of a many-to-many.
MEASURED 2026-10-11: neither tag field carries a production at all. Document TAGS (252 docs) and
Version Tags (274 instances) both return ZERO production rows, so "Big Love" and "Thought/Crime"
are vocabulary nobody used. This table has no data to migrate -- it is a clean build.
The rule that generates the fix: a tag answers WHAT IS THIS ABOUT, a field answers WHAT STATE IS
THIS IN, a relationship answers WHICH THING IS THIS.
-->

<!-- AGENT NOTE · why a production is NOT a CONTEXTS row, which was the live temptation.
Q10 answered "a CONTEXT inside MAW Documents" and that answers WHICH APP, not which table.
CONTEXTS is the WORLD axis: URITP, HML_LLC, home. One row per world, and it is a bucket.
A production carries dates, a venue, a season and a cast. It is an ENTITY with attributes.
Putting productions into CONTEXTS would reproduce the TAGS defect inside the clean schema:
| URITP | and "Big Love" are not peers, one contains the other.
So BOTH joins exist and they are not redundant: DOCUMENT_CONTEXTS answers "which world does this
belong to" and DOCUMENT_PRODUCTIONS answers "which show was it used on, and what happened."
Supporting measurement: | URITP | is the single most-used tag in the whole vocabulary, on 61 of
252 documents. The world axis is real and heavily used; it is just not the production axis.
-->

## Rules

1. **One document on two productions is TWO rows.** Never a compound value, never a repeating
   field, never a multi-select production field.
2. **Uniqueness is on the pair** (`fkDocument` + `fkProduction`). ⚠️ **FileMaker will not enforce
   it** — the creation script must.
3. **`Notes` is the payload and the reason this table exists.** 🚩 Per-show notes never go on the
   document, the spec page, or a tag. The canonical doc stays canonical and note-free.
4. **`PaperworkStatus` is this document's state FOR THIS SHOW**, not the document's own state. A
   run sheet that is `final` on Big Love can be `not started` on the next show. **Two different
   facts; do not collapse them.**
5. **Zero rows is legitimate and MEANINGFUL** — a document that has never been used on a
   production. 🔴 **That absence IS the gap a matrix reports.** An empty cell is the answer, not
   missing data.
6. **A matrix column set is DERIVED, never declared.** If adding a production requires editing a
   layout, a page body or a field definition, the pivot has been built in the wrong place.

<!-- AGENT NOTE · rule 6 has a specific external constraint behind it.
The repo renderer draws a TSV as a table and its own spec (uritp-docs 00-authoring/data-tables.md)
states: "What the renderer will not do: Filters, totals, renamed columns, computed columns. The
sheet is the source of truth: the renderer draws it, it does not reinterpret it."
A PIVOT IS A COMPUTED COLUMN SET, so the renderer will never build the matrix. The TSV arrives
already pivoted, from FileMaker. That path is already proven on one file: audio-inventory.tsv is a
FIXTURES export whose header is written BY FILEMAKER, so "the spec lives in the FileMaker field name."
Two consequences for whoever builds the export: mark the paperwork-item column .key so the matrix
collapses into a tappable list on a phone, and never name a production in the page body (pin/sort/
hide reference columns BY NAME, so a body naming shows rots every season).
FileMaker's own weakness here is the crosstab: layout columns are fixed at design time. The standard
community answer is the Virtual List technique. UNVERIFIED against any current FMP version and not
to be specced from this note.
-->

## 🚩 The field that must never come back

`DOCUMENTS.fkCurrentProduction` — or any single production FK on the ONE side of this many-to-many.

<!-- AGENT NOTE · this is the FIFTH instance of one habit, and the first one caught before it was built.
Struck already: DOCUMENTS.fkPeopleJoins (J5, still in the built graph), DocumentCopies.LentTo (J7),
BIBLIOGRAPHIC_DETAILS.fkOrgRoleJoin (J19, newly created after the first was struck).
The fourth lives outside FileMaker entirely: uritp-docs REPO_PAGES/current-production-accessibility
.md, -egress, -house, -timings. "current" IS the single-slot defect, expressed as a filename.
It will look like a good idea again because a single field is always cheaper than a join read.
It is correct until production #2 exists, then silently wrong forever.
Same rule for a stored IsCurrent anywhere near this table: Q1's two-current-versions bug. Current is
an unstored calc, exactly as COPY_LOANS resolves "is it out right now" over ReturnedDate IS EMPTY.
A sixth instance of the same shape lives one runtime over: a ClickUp Tasks-in-Multiple-Lists
membership is a join with NO ROW, so it cannot carry these fields and evaporates at migration.
See next-build-spec.md, "ClickUp schema skin."
-->

## Open

- 🔴 **`fkProduction` has no target table in this app, deliberately.** J7's boundary: *"a table with
  two owners has no owner"* — URITP productions belong to URITP, the way `PEOPLE` here is not URITP
  People. **Three ways to resolve it and none is chosen:** a thin local `PRODUCTIONS` stub carrying
  only key + display name, a bare external key with no local table, or the production lives in the
  URITP app and this join lives there instead. ⚠️ **Decide before intake**, because a bare key with
  no authority silently accepts typos as new productions.
- 🔴 **Which table `fkDocumentInstance` points at is BLOCKED** by the `DOCUMENT_INSTANCES` question
  in `next-build-spec.md` step 1 — nobody has read Manage to learn whether the variant and file
  layers were merged in the built file. ⚠️ **An FK pointing at an uncut table resolves to nothing,
  silently, forever.** Leave the field unbuilt until step 1 is answered.
- No `PaperworkStatus` value list defined. ⚠️ **It is NOT the document's status vocabulary** and
  reusing that one would collapse rule 4.
- The DENOMINATOR is undefined and the matrix cannot report a GAP without it. Nothing declares *"every
  production owes these N documents."* `uritp-docs` has `doc-specs/` (4 species specs) and URITP
  PRODUCTIONS has `SHOW TEMPLATE ▸ Paperwork (P0)` (32 rows, mixed task types), and **neither is a
  declared spec list.** Without it this table shows what EXISTS, never what is MISSING.
- ⚠️ **No ClickUp row anywhere carries a `PrimaryKey`**, so nothing on the ClickUp side can be matched
  to a row here or to a TSV until UUIDs exist. Named in `next-build-spec.md` defects.

FK map → [relationships/README.md](../relationships/README.md)

## Fields

!!! data "catalog"
