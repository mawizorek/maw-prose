# DOCUMENT_TYPES

Manage → Database → Tables → DOCUMENT_TYPES

Grain: **one kind of document.** Textbook, light plot, lease, scanned receipt, syllabus. **The primary
lensing axis** — the field the hub filters on before anything else.

🔴 **Yes, a table.** `DOCUMENTS.fkDocumentType` is already built pointing at it, so the FK exists and the
target did not.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| Name | text | Display term: "Light plot" | | |
| Name_short | text | Compact form for chips and column headers | | ⭐ matches the ORGANIZATIONS pattern |
| fkTypeGroup | text-uuid | Which family this type belongs to | → TYPE_GROUPS | ⚠️ see below — may be premature |
| ExpectsBibliographic | number | 1 = a BIBLIOGRAPHIC_DETAILS row is expected | | ⭐ the useful one |
| ExpectsInstance | number | 1 = a physical or file copy is expected | | |
| SortOrder | number | Display order in pickers and the facet rail | | gaps of 10 |
| IsActive | number | 1 = offered in pickers | | ⚠️ never delete a type in use |
| Notes | text | When to use this over a near neighbour | | |

Audit fields (`CreatedBy`, `CreationTimestamp`, `ModifiedBy`, `ModificationTimestamp`) →
[data-standards.md](../data-standards.md).

## ⭐ The two flag fields are what make this more than a label

`ExpectsBibliographic` and `ExpectsInstance` turn the type into a **completeness rule** rather than a
word. A textbook with no `BIBLIOGRAPHIC_DETAILS` row is incomplete; a scanned receipt with none is
fine. **Without these, "what still needs cataloguing" cannot be computed** — it has to be remembered.

| Type | ExpectsBibliographic | ExpectsInstance |
|---|---|---|
| Textbook | 1 | 1 |
| Reference PDF | 1 | 1 |
| Light plot | 0 | 1 |
| Scanned receipt | 0 | 1 |
| Lease | 0 | 1 |
| Template | 0 | 0 |

## Seed values

Start with what is actually in the archive. **Ten to twenty; more than that and the picker stops being
a decision.**

| Name | Name_short | Group | Bib | Inst |
|---|---|---|---|---|
| Textbook | Textbook | Published | 1 | 1 |
| Reference book | Reference | Published | 1 | 1 |
| Reference PDF | Ref PDF | Published | 1 | 1 |
| Article / offprint | Article | Published | 1 | 1 |
| Score | Score | Published | 1 | 1 |
| Play script | Script | Published | 1 | 1 |
| Light plot | Light plot | Production paperwork | 0 | 1 |
| Sound plot | Sound plot | Production paperwork | 0 | 1 |
| Contact sheet | Contacts | Production paperwork | 0 | 1 |
| Production calendar | Cal | Production paperwork | 0 | 1 |
| Syllabus | Syllabus | Teaching | 0 | 1 |
| Lesson plan | Lesson | Teaching | 0 | 1 |
| Lease | Lease | Legal / business | 0 | 1 |
| Form | Form | Legal / business | 0 | 1 |
| Scanned receipt | Receipt | Records | 0 | 1 |
| Correspondence | Letter | Records | 0 | 1 |
| Manual | Manual | Published | 1 | 1 |
| Template | Template | Templates | 0 | 0 |

🔴 **`Template` is deliberately last and deliberately expects nothing.** A template belongs to nobody
and is reused; a record belongs to one thing and is evidence. **Never let a template and an executed
copy share a type.**

## ⚠️ `fkTypeGroup` — include the field, defer the table

The Group column above is real and useful for the facet rail (*show me all production paperwork*), but
**`TYPE_GROUPS` as its own table is one more join before the archive has a hundred records in it.**

**Two honest options:**

1. **Build the FK now, leave `TYPE_GROUPS` uncut.** The field sits empty; grouping is by hand until it
   earns a table. ⚠️ An FK pointing at nothing is exactly the `fkStorageLocation` situation already in
   the built file — tolerable once, a pattern if repeated.
2. **Skip `fkTypeGroup` entirely**, add it when the facet rail is actually built.

⭐ **My pick: option 2.** A type list of eighteen rows does not need grouping to be usable, and the
group names above are the seed data for the table whenever it arrives. **Recorded rather than silently
chosen** — the field is listed in the register above so the intent survives either way.

<!-- AGENT NOTE · why this is a table, not a value list, and the trap in the built file.
APP RULE: if the thing needs an attribute beyond its display label, it is a TABLE. A document type
carries a short name, a sort order, two completeness flags and a group. A value list can hold exactly
one string. This is the same test that made CONTRIBUTOR ROLES a table (relator code + sort order).
THE TRAP: DOCUMENTS.fkDocumentType was built BEFORE this table existed, so the FK has been pointing at
nothing. Same shape as fkStorageLocation pointing at an uncut STORAGE_LOCATIONS. An FK to a missing
table does not error in FileMaker — the relationship simply resolves to nothing, forever, silently.
COMPLETENESS FLAGS are the reason this table earns its place beyond lensing: they let "what still needs
cataloguing" be a FOUND SET rather than a memory. Without them, NeedsTagging on DOCUMENTS is a manual
flag somebody has to remember to set, which is the tag-soup failure one level up.
DO NOT let types drift into subjects. A type is WHAT KIND OF THING this is (one value, exclusive). A
subject is WHAT IT IS ABOUT (many values). Forcing one into the other is how a facet rail rots — the
same KIND-vs-CONDITION gap already flagged in the object library.
-->

FK map → [relationships/README.md](../relationships/README.md)
