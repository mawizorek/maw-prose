# DocumentPeople

Manage → Database → Tables → DocumentPeople

Grain: **one contribution.** This person, in this role, on this work. Three rows if a book has an
author, a translator and an illustrator.

⭐ **One table replaced two chained joins**, and it matches BIBFRAME's `bf:Contributor`: one agent
plus one role, together, on the resource. **No library system chains two joins for this.**

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| fkDocument | text-uuid | The work contributed to | → Documents | |
| fkPerson | text-uuid | Who contributed | → People | |
| fkRole | text-uuid | In what capacity | → ContributorRoles | 🔴 the role lives HERE |
| SortOrder | number | Billing order on this work | | ⭐ homeless in the old design |
| Notes | text | "translator of the 2nd edition only" | | ⭐ also homeless before |

Audit fields → [data-standards.md](../data-standards.md).

<!-- AGENT NOTE · the two-join design and its three concrete costs.
The original graph: MAW Library -> PEOPLE_ON_BOOKS -> PEOPLE_JOINS -> POEPLE + PEOPLE_ROLES. Two
chained joins making "Person-in-a-Role" a globally reusable entity. It fails three ways:
  1. SILENT DUPLICATION — nothing stops Uva+Author existing as two PEOPLE_JOINS rows, so one
     contribution becomes two and every count is wrong with no error anywhere.
  2. HOMELESS ATTRIBUTES — SortOrder and Notes are properties of THIS person's contribution to THIS
     work; in the two-join design they must sit on the near join, so role data lives in two places.
  3. TWO HOPS FOR NOTHING — an extra table traversal, zero new capability.
Root cause was the NAME, not the topology: PEOPLE_ROLES reads as "roles a person has," which
invites a person+role entity. See ContributorRoles.md.
-->

## Rules

1. **A person credited twice on one work is TWO rows** — author and illustrator. Never a compound
   role value like "author/illustrator".
2. **Uniqueness is on the triple** (`fkDocument` + `fkPerson` + `fkRole`). ⚠️ **FileMaker will not
   enforce it** — the creation script must.
3. **Display is built from this table, unstored.** 🚩 No stored contributor string anywhere.
4. **Zero rows is legitimate** — an anonymous work, a form, a receipt scan.

<!-- AGENT NOTE · rule 2 is not optional.
Allowing that duplicate is the exact defect the old two-join design was criticised for. Failing to
guard it here reproduces the criticised failure one table over. The exit test in next-build-spec.md
step 2 exists specifically to catch it.
-->

## 🚩 The field that must never come back

`Documents.fkPeopleJoins` — a single FK on the ONE side of this many-to-many. Struck once. **It will
look like a good idea again, because a single field is always cheaper than a join read.**

## Open

- No `SortOrder` default rule. Libraries put the primary creator first, then title-page order.
  **Decide before intake**, or order becomes whatever sequence records were entered in.
- Whether a contribution can point at a variant rather than the work — a translator of one edition,
  an annotator of one copy. ⚠️ **Currently `Notes`, which is a workaround and marked as one.**

FK map → [relationships/README.md](../relationships/README.md)
