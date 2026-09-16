# ContributorRoles

Manage → Database → Tables → ContributorRoles

Grain: **one kind of contribution.** Author, editor, translator, illustrator, photographer, compiler.

⭐ **A controlled vocabulary borrowed from cataloguing practice** — MARC's three-character relator code
(`aut`, `edt`, `trl`, `ill`), which BIBFRAME models as `bf:Contributor`.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| RoleName | text | Display term: Author / Editor / Translator | | ⚠️ use the MARC term |
| RelatorCode | text | MARC relator code | | ⭐ from id.loc.gov/vocabulary/relators |
| SortOrder | number | Display order in a contributor list | | 🔴 why this is a table |
| IsActive | number | 1 = offered in pickers | | |
| Notes | text | When to use this over a near neighbour | | |

Audit fields → [data-standards.md](../data-standards.md).

## Seed values

Start small; the MARC list has hundreds of terms and seeding them all makes the picker useless.

| RoleName | RelatorCode | SortOrder |
|---|---|---|
| Author | `aut` | 10 |
| Editor | `edt` | 20 |
| Translator | `trl` | 30 |
| Illustrator | `ill` | 40 |
| Photographer | `pht` | 50 |
| Compiler | `com` | 60 |
| Author of foreword | `aui` | 70 |

⚠️ **Look codes up rather than guessing.** They are mnemonic but not derivable, and **a wrong code is
worse than none because it looks authoritative.**

## 🔴 Why a table, not a value list

App-wide rule: **if the thing needs an attribute beyond its display label, it is a table.** A role
carries a relator code and a display order. A value list can hold neither.

## 🚩 The name is load-bearing

This was `PEOPLE_ROLES`, and **that name caused the wrong schema.** *"People roles"* reads as *roles a
person has* — a claim about people — so a person+role pair table looked obvious. **Renamed, the extra
join stops looking necessary on sight.**

🚩 **Do not add a person FK to this table.**

<!-- AGENT NOTE · the full failure the rename fixed, and two open items.
A contribution role is a property of the CONTRIBUTION, not of the person: Uva is the author of one
book and could be the editor of another. The pair table cost three things — the same person+role pair
could exist twice, per-work attributes (billing order, "translator of the 2nd edition") had nowhere to
live, and every contributor read took two hops for no gain. The rename was the fix; collapsing the
join was the consequence.
OPEN: theatrical roles have MARC codes too (lgd = lighting designer, cst = costume designer) — worth
seeding once production paperwork is in the archive, and a real reason this vocabulary was the right
borrow.
OPEN: a person credited in two roles on one work is TWO DocumentPeople rows. Costs nothing. Noted so
nobody invents a compound role value like "author/illustrator" instead.
-->

FK map → [relationships/README.md](../relationships/README.md)
