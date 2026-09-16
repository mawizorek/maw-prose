# Organizations

Manage → Database → Tables → Organizations

Grain: **one company or institution, once.** Publishers, bookstores, universities, libraries,
producing companies. One row regardless of how many roles the body plays.

⭐ **This table exists to prevent three org-shaped tables.** Before it was collapsed, this app
had a `COMPANIES` authority on its design page, a `Publisher` text field on the bibliographic
extension, and a vendor arriving with the purchase ledger. **Three claimants on "an
organization" — collapsed before any of them existed rather than after.**

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| OrganizationName | text | Display form: "Powell's Books" | | |
| SortName | text | Authority form for shelf/list order | | ⭐ same authority-control job as People.SortName |
| fkOrganizationType | text-uuid | Bookstore / Publisher / University / Library / Theatre company | → OrganizationTypes | 🔴 DESCRIPTIVE ONLY. Not the role. See below |
| URL | text | Where to buy from them or look them up | | |
| IsActive | number | 1 = offered in pickers | | ⚠️ a closed bookstore stays in the data forever; it just stops being offered |
| Notes | text | Disambiguation, imprint relationships, local branch | | |

Audit fields on every table → [data-standards.md](../data-standards.md).

## 🔴 `fkOrganizationType` is DESCRIPTIVE, and this was corrected the same day

The original spec said *"the type distinguishes them"* — meaning the type field would tell
you whether a row was a publisher or a vendor. **That is wrong, and it is the same error as
the `PEOPLE_ROLES` name, one table over.**

**Yale University Press is a publisher on a bibliographic row and a vendor on a purchase you
made directly from them — simultaneously, from one row.** A type field cannot express that.
It would need two values at once, which means two rows, which is the duplicate-source shape
this table was created to prevent.

**The role is carried by WHICH FOREIGN KEY POINTS AT THE ROW:**

| Pointer | Role it means |
|---|---|
| `BibliographicDetails.fkPublisher` | publisher of that edition |
| `Purchases.fkVendor` | vendor of that order |
| *(future)* a lender FK on an inbound loan | lending institution |

**The type field's real job** is browsing and keeping a picker sane — *show me bookstores* —
and nothing more.

## 🚩 The four tables that must never be created

**No `Publishers`. No `Vendors`. No `Borrowers`. No `Libraries`.**

Each would be a role wearing a table's clothes. And the case that proves it is not a corner
case: **a library is a vendor when you buy its discards, a lender when you borrow from it, and
a holding institution when you are noting where a copy exists.** Three roles, one
organization, one row.

## Seed data already exists

🏪 The ClickUp **Bookstores** list under Travel ▸ POIs is a vendor authority in disguise —
names, locations, notes, already curated.

⚠️ **This is a note, not a migration instruction.** Nothing has been ruled about importing it,
and the two lists have different purposes (one is places to visit, one is parties you
transact with). Recorded so the seed is not built from scratch when the time comes.

## Relationship to `apps/hml-llc/tables/Organizations.md`

HML has a table by the same name. ⚠️ **It is parked and undesigned** — its page refuses to
list fields on the grounds that *"listing plausible fields would imply design that doesn't
exist,"* and it carries an open scope question about whether it covers borrowers only or all
transacting entities.

🔴 **So this is the first real design of this table in the shared lineage, not a clone of a
built one.** Per the reference-implementation stance, **HML should adopt THIS shape when its
version is designed** — including the role-lives-on-the-pointer rule, which answers HML's own
open scope question: all transacting entities, one row each, role by pointer.

## Open

- `OrganizationTypes` is a table (a type has a sort order and possibly a code), and it is not
  yet cut. Same test as [ContributorRoles](./ContributorRoles.md).
- **Imprints.** Vintage is an imprint of Penguin Random House. One row with a note, or a
  parent FK? ⚠️ A `ParentOrganization` self-join is cheap and correct; **not ruled**, and it
  will matter the first time "everything from Penguin" is asked.
- **When the production authority layer arrives, `Companies` folds in HERE.** Do not stand up
  a second org-shaped table — that is the mistake this table exists to have already prevented.

Full relationship context → [README.md](../relationships/README.md)
