# ContributorRoles

Manage → Database → Tables → ContributorRoles

Grain: **one kind of contribution.** Author, editor, translator, illustrator, photographer,
compiler, foreword author.

⭐ **This is a controlled vocabulary borrowed straight from cataloguing practice.** MARC
carries the role as a three-character *relator code* (`aut`, `edt`, `trl`, `ill`) in
subfields `$e`/`$4`; BIBFRAME models the same thing as `bf:Contributor`. Recording the code
means the vocabulary is standard rather than invented, which matters the first time data
comes in from or goes out to anything bibliographic.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| RoleName | text | Display term: Author / Editor / Translator | | ⚠️ use the MARC term, not a synonym |
| RelatorCode | text | MARC relator code: aut / edt / trl / ill | | ⭐ from id.loc.gov/vocabulary/relators |
| SortOrder | number | Display order in a contributor list | | 🔴 this is why it is a table, not a value list |
| IsActive | number | 1 = offered in pickers | | |
| Notes | text | When to use this rather than a near neighbour | | |

Audit fields on every table → [data-standards.md](../data-standards.md).

## 🔴 Why this is a TABLE and not a value list

The app-wide rule: **if the thing needs an attribute beyond its display label, it is a
table.** A role carries a relator code and a display order. A value list can hold neither.

That is the whole test, and it is the same one that keeps entity architecture from hiding
inside giant value lists elsewhere in this app.

## 🚩 The name is load-bearing

This table was `PEOPLE_ROLES` in the graph that started this build, and **that name is what
caused the wrong schema.** *"People roles"* reads as *roles a person has*, which is a claim
about people — so the next step looked obvious: a `PEOPLE_JOINS` table pairing a person with
a role, reusable everywhere.

It was wrong because **a contribution role is a property of the contribution, not of the
person.** Uva is the author of one book and could be the editor of another. Three costs
followed from the pair table: the same person+role pair could exist twice, per-work
attributes had nowhere to live, and every contributor read took two hops for no gain.

**Renamed `ContributorRoles`, the extra join stops looking necessary on sight.** The rename
was the fix; collapsing the join was just the consequence.

🚩 **Do not add a person FK to this table.** If that ever looks like a good idea, this note is
why it is not.

## Seed values

Start small and add on demand. The MARC list has hundreds of terms and seeding them all
makes the picker useless.

| RoleName | RelatorCode | SortOrder |
|---|---|---|
| Author | `aut` | 10 |
| Editor | `edt` | 20 |
| Translator | `trl` | 30 |
| Illustrator | `ill` | 40 |
| Photographer | `pht` | 50 |
| Compiler | `com` | 60 |
| Author of foreword | `aui` | 70 |

⚠️ **Look the code up rather than guessing it.** They are mnemonic but not derivable — the
list is at `id.loc.gov/vocabulary/relators` and a wrong code is worse than none, because it
looks authoritative.

## Open

- Theatrical roles (designer, stage manager, playwright) have MARC codes too — `lgd` is
  lighting designer, `cst` costume designer. **Worth seeding once production paperwork is in
  the archive**, and a genuine reason this vocabulary was the right borrow.
- No rule yet for a person credited in two roles on one work (author AND illustrator).
  **Two `DocumentPeople` rows is the correct answer** and costs nothing; noted so nobody
  invents a compound role value instead.

Full relationship context → [README.md](../relationships/README.md)
