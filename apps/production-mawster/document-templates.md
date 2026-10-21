---
id: document-templates
title: Document Templates
type: reference
status: public
order: 40
revised: 2026-08
summary: Documents are templates. Each one declares which roles and events canonically belong on it.
---

# Document Templates

!!! abstract "Grain"
    One `STANDARD_DOCS` row per document TYPE. One `DOC_ROLES` row per (document × role).

**Michael, 2026-08-09:** *"the whole point of this endeavor is that our documents become templates. Standard docs will be templatized so that every event and every document lists which roles or events canonically belong there. For instance, an info sheet will specify that it typically includes the director, stage manager, and designer running tech, while a crew call calendar will look much different."*

That is the app's purpose, and it is what `STANDARD_DOCS` is for. It is also what `EXPORT_SET_ITEMS::fkDocument` has been pointing at since the table was written — the comment *"back to the canonical DOC index. Decides WHICH overrides apply"* had no referent until this was stated.

## The join already exists, fused onto ROLES

🔴 **`ROLES::Contact Sheet HEADER` (in ClickUp) is named for the document it serves.** *Creatives · Program · CAST · Shop Staffs · STAGE MANAGERS* is not a property of a role. It is **which section of ONE SPECIFIC DOCUMENT that role prints under.**

It works today because there is one document. **It breaks at document two**, because a crew call's sections are not a contact sheet's sections and the field can only hold one answer.

⭐ **Third instance of this shape found in a single day**, alongside `STYLES` (already a theme, the default one, unnamed) and `ROLES::CALLS` (already an event join, stored as text). **In all three the tell was the same: a field named after the only instance that existed.**

## The tables

```
STANDARD_DOCS ......... one row per DOCUMENT TYPE
  Name .............. "Info Sheet" · "Crew Call Calendar" · "Contact Sheet"
  Sort · Description
  fkLayout .......... ⬜ hypothesis: → auto_LAYOUTS. see below

DOC_ROLES ............. one row per (DOC × ROLE)
  fkDoc · fkRole .... both indexed
  SectionHeader ..... where Contact Sheet HEADER goes
  Sort .............. empty = inherit ROLES::Sort
  bool_Required ..... expected, vs merely permitted
  bool_Seeded ....... machine-proposed?
  bool_Reviewed ..... has a human blessed it?
```

**`Sort` belongs on the JOIN, not the role.** A crew call sorts run crew to the top; a program sorts artistic staff first. One-per-(doc × role) — the same grain test that settles every placement argument in this app. `ROLES::Sort` stays as the global default and the join overrides it; **empty means inherit**, per the house pattern.

## AUTHORED, with the query as a seeding tool

**Ruled by Michael, 2026-08-09.** `DOC_ROLES` rows are real records a human owns. **The query proposes; it never governs.**

### 🔴 The seeder runs ONCE per (doc × role), ever

It is a **create-if-absent** pass, never an update pass. It proposes rows that do not exist and never revisits one that does. **The moment "re-seed" comes to mean "re-derive," every hand edit is gone and AUTHORED stopped being true.**

⭐ **And the deletion is worse than the edit.** A hand-added Video Designer has no rule behind it — that is exactly why a human added it. A re-derive removes it as *not matching*, which reads as the system being clever and is **the system discarding the only information it did not already have.**

| State | Meaning | Machine may touch? |
|---|---|---|
| **Seeded, unreviewed** | proposed by the query | ✅ yes — re-derive or drop |
| **Authored** | a human made or blessed it | 🚫 never |
| **Diverged** | seeded, then hand-edited | 🚫 never — authored from that moment |

### What the seeder reads

For a contact sheet: every role carrying a `Contact Sheet HEADER`, section pre-filled. For a crew call: every role whose `CALLS` contains that event type.

⭐ **The multi-value fields are perfectly good SEED SOURCES even though they are bad JOIN KEYS.** A seed source is read once by a script; a join key is read on every render. **Only the second has to be clean** — which retires most of the pressure to unfuse `CALLS` into an `EVENT_ROLES` table right now.

## A template is an EXPECTATION, not a filter

What prints is the **intersection** of what the template declares and what the production actually assigned. **The difference between those two sets is the most useful report in the app.**

It fails in three ways and only the first is visible:

1. **Declared but unassigned** — the info sheet expects an LD, this show has none. A blank line on the page.
2. 🔴 **Assigned but undeclared** — the show HAS a Video Designer, no template lists one, **so they are silently absent from the paperwork.** No blank, no error, nothing to notice.
3. 🔴 **A role in NO template at all** — added in ClickUp, declared nowhere, will never print. **This one is created by the authored ruling** (the seeder does not revisit), and it is the honest price of not letting a rule overwrite judgement.

**All three belong in the completeness report.** ⭐ Same shape as the `EXPECTED_ASSIGNMENTS` vs `COMPLETIONS` model already ruled for URITP Safety Programs — expected rows generated, actual rows imported, **the mismatch is the product.** Second app, arrived at independently.

## Consequence for the first build

**A brand-new template starts EMPTY, and that is correct.** Seed, review, edit. **The template is trustworthy only because a human signed it** — a query-governed doc set looks identical on day one and drifts apart by October.

## ⬜ Open

- **`STANDARD_DOCS::fkLayout → auto_LAYOUTS`** — hypothesis, not a finding. A document template must know which layout renders it, and this would make the layout registry load-bearing rather than decorative. **If true, the upsert-never-rebuild rule on `auto_LAYOUTS` gains a real dependency: deleting and recreating those rows would orphan every template.**
- **`EVENT_ROLES`** — the event half of the same unfuse. Not forced yet; `DOC_ROLES` is, because of the Contact Sheet HEADER collision. **They are one pattern and must not get solved two different ways.**
- **Multi-value sections** — `Contact Sheet HEADER` already holds *"STAGE MANAGERS, Run Crew"* on the PSM. Under `DOC_ROLES` that is two rows, which resolves it cleanly. Confirm no document needs one role printing twice within itself.

## Sources

Canonical role data: **URITP CRM ▸ CONTACT SHEETS ▸ SHOW ROLES**, fully populated, nine custom fields per role. Rulings: *Production MAWster FMP — Decision Log* J10 and J11.
