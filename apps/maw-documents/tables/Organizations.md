# Organizations

Manage → Database → Tables → Organizations

Grain: **one company or institution, once.** Publishers, bookstores, universities, libraries,
producing companies. One row regardless of how many roles the body plays.

⭐ **This table exists to prevent three org-shaped tables.** Before it, this app had a `COMPANIES`
authority on its design page, a `Publisher` text field, and a vendor arriving with the ledger.

## Fields

| Field | Type | FMP Comment | TO | ⚠️ |
|---|---|---|---|---|
| PrimaryKey | text-uuid | Auto-generated unique identifier | | |
| OrganizationName | text | Display form: "Powell's Books" | | |
| SortName | text | Authority form for list order | | |
| fkOrganizationType | text-uuid | Bookstore / Publisher / University / Library | → OrganizationTypes | 🔴 DESCRIPTIVE ONLY |
| URL | text | Where to buy from them or look them up | | |
| IsActive | number | 1 = offered in pickers | | ⚠️ a closed shop stays in the data |
| Notes | text | Disambiguation, imprints, local branch | | |

Audit fields → [data-standards.md](../data-standards.md).

## 🔴 The type field is NOT the role

**Yale University Press is a publisher on a bibliographic row and a vendor on a purchase —
simultaneously, from one row.** A type field cannot express that; it would need two values at once,
which means two rows, which is what this table prevents.

**The role is carried by which FK points at the row:**

| Pointer | Role |
|---|---|
| `BibliographicDetails.fkPublisher` | publisher of that edition |
| `Purchases.fkVendor` | vendor of that order |
| *(future)* a lender FK | lending institution |

The type field's real job is browsing and keeping a picker sane.

<!-- AGENT NOTE · this was specified wrong and corrected the same day.
The original spec said "the type distinguishes them" — the same error as the PEOPLE_ROLES name, one
table over. Third instance in one session of putting a role on the entity instead of the
relationship. One habit, not three accidents.
-->

## 🚩 Four tables that must never be created

**No `Publishers`. No `Vendors`. No `Borrowers`. No `Libraries`.** And the case that proves it is not
a corner case: **a library is a vendor when you buy its discards, a lender when you borrow, and a
holding institution when you note where a copy exists.** Three roles, one row.

## 🏪 Seed data already exists

The ClickUp **Bookstores** list under Travel ▸ POIs is a vendor authority in disguise.
⚠️ **A note, not a migration instruction** — nothing has been ruled, and the two lists have
different purposes (places to visit vs parties you transact with).

## Relationship to HML's `Organizations`

⚠️ **HML's is parked and undesigned** — its page refuses to list fields and carries an open scope
question (borrowers only, or all transacting entities?).

🔴 **So this is the first real design of the table in the shared lineage.** Per the
reference-implementation stance, **HML should adopt THIS shape**, which also answers its own open
question: all transacting entities, one row each, role by pointer.

## Open

- `OrganizationTypes` is a table (type carries sort order, maybe a code) and is not yet cut.
- **Imprints.** Vintage is an imprint of Penguin Random House. ⚠️ A `ParentOrganization` self-join is
  cheap and correct; **not ruled**, and it matters the first time "everything from Penguin" is asked.
- **When the production layer arrives, `Companies` folds in HERE.** Do not stand up a second
  org-shaped table — that is the mistake this table exists to have prevented.

FK map → [relationships/README.md](../relationships/README.md)
