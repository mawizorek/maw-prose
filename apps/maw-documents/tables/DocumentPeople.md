# DocumentPeople

Manage → Database → Tables → DocumentPeople

Grain: **one contribution.** This person, in this role, on this work. Three rows if a book
has an author, a translator and an illustrator.

⭐ **This single table replaced two chained join tables, and it is the central correction of
this app's foundation.** It is also exactly what cataloguing standards do: BIBFRAME's
`bf:Contributor` is one agent plus one role, together, on the resource. **No library system
chains two joins to express a contribution.**

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| fkDocument | text-uuid | The work contributed to | → Documents | |
| fkPerson | text-uuid | Who contributed | → People | |
| fkRole | text-uuid | In what capacity | → ContributorRoles | 🔴 the role lives HERE. That is the whole point |
| SortOrder | number | Billing order on this work: first author, second author | | ⭐ the attribute that had nowhere to live in the two-join design |
| Notes | text | Scope of contribution: "translator of the 2nd edition only" | | ⭐ also homeless in the old design |

Audit fields on every table → [data-standards.md](../data-standards.md).

## 🔴 What was here before, and the three costs of it

The original graph had `MAW Library` → `PEOPLE_ON_BOOKS` → `PEOPLE_JOINS` → `POEPLE` +
`PEOPLE_ROLES`. **Two chained joins**, making *Person-in-a-Role* a globally reusable entity.

It is a reasonable-looking idea and it fails three specific ways:

1. **Silent duplication.** Nothing stops `Uva + Author` existing as two `PEOPLE_JOINS` rows.
   Then one contribution is two rows and every count is wrong, with no error anywhere.
2. **Homeless attributes.** `SortOrder` and `Notes` above are properties of *this person's
   contribution to this work*. In the two-join design they have to go on the near join,
   which means role data lives in two places.
3. **Two hops for nothing.** Every contributor read traverses an extra table and gains no
   capability.

**The root cause was the NAME, not the topology** — `PEOPLE_ROLES` reads as *roles a person
has*, which invites a person+role entity. See [ContributorRoles](./ContributorRoles.md).

## Business rules

1. **A person credited twice on one work is TWO rows** — author and illustrator, two rows,
   two roles. Never a compound role value like "author/illustrator".
2. **Uniqueness is on the triple** (`fkDocument` + `fkPerson` + `fkRole`). ⚠️ FileMaker will
   not enforce this for you: either the creation script checks, or duplicates are possible.
   **This is the exact defect the old design was criticised for, so failing to guard it here
   would be reproducing it one table over.**
3. **Display is built from this table, unstored.** `Documents.calc_ContributorDisplay` reads
   the join ordered by `SortOrder`. 🚩 **No stored contributor string anywhere** — it is a
   snapshot and it lies the moment a name is corrected.
4. **Zero rows is legitimate.** An anonymous work, a form, a scan of a receipt. Absence of
   contributors is not incomplete data.

## 🚩 The field that must never come back

`Documents.fkPeopleJoins` — a single FK on the ONE side of this many-to-many. The *first
author* shortcut. It is correct until a second contributor exists and then it disagrees with
this table forever, silently.

It has been struck once. It will look like a good idea again, because a single field is
always cheaper than a join read. **It is not a shortcut, it is a second claimant.**

## Open

- No `SortOrder` default rule. Libraries put the primary creator first; everything else is
  order-of-appearance on the title page. **Worth deciding before intake, or the order becomes
  whatever sequence records happened to be entered in.**
- Whether a contribution can point at a `DocumentVariants` row rather than the work — a
  translator of one edition, an annotator of one copy. ⚠️ **Currently the answer is `Notes`,
  which is a workaround and marked as one.**

Full relationship context → [README.md](../relationships/README.md)
