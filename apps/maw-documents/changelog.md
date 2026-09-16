# Changelog

*Structural changes to this documentation set. Not a dumping ground for every note — if it did
not change the shape of the docs or the schema, it does not belong here.*

📋 Decision history →
[MAW Documents — Decision Log](https://app.clickup.com/36074068/docs/12cwjm-57453/12cwjm-80213)

## 2026-09-16 · Package opened (v1.0)

**Cut on Michael's go-ahead**, six weeks after the placement was approved and never acted on.

Root: `OPEN-ME.md`, `README.md`, `schema-notes.md`, `design-decisions.md`, `data-standards.md`,
`next-build-spec.md`, this file. Plus `relationships/README.md` and ten pages in `tables/`.

**Ten tables documented:** `Documents`, `BibliographicDetails`, `DocumentCopies`, `People`,
`ContributorRoles`, `DocumentPeople`, `Organizations`, `Purchases`, `PurchaseLines`, `CopyLoans`.

### What was settled the same day these pages were written

- **Books are documents.** No separate library file — the design had already covered it and two
  differently-named surfaces hid the fact.
- **The contribution join collapsed from two tables to one.** A role belongs to the
  relationship, not the party.
- **`DocumentCopies` became load-bearing**, decided by implication when a purchase ledger was
  requested. You cannot buy a title.
- **Purchase ledger: header plus lines**, attaching to the copy.
- **One `Organizations` authority** instead of three org-shaped tables.
- **Naming locked to J3** and a rival `pk_`/`fk_` convention marked superseded on its own page.

### Corrections applied within the same session

Recorded because they were one habit, not five accidents — **a role or attribute placed on the
entity instead of on the relationship:**

1. `Organizations.fkOrganizationType` demoted from role-carrier to descriptive field.
2. `DocumentCopies.LentTo` struck; replaced by `CopyLoans`.
3. `BibliographicDetails.Publisher` changed from text to `fkPublisher`.
4. The claim that this tree projects the ClickUp page set — wrong. **It mirrors FileMaker's own
   Manage menus.**
5. The claim that the repo should only receive settled schema — wrong. **What is barred is
   *answerable* content, not unsettled content.**

### Deliberately absent

The library spine (`DocumentVariants`, `DocumentFiles`, `Contexts`, `Subjects`, `DocumentTypes`,
`ImportBatches`, `GLOBAL_USE_VARIABLES`) and the `layouts/` `scripts/` `value-lists/`
`calculations/` `fixtures/` directories.

They are designed but carry pre-J3 naming, and **cutting empty stubs would ship the scaffolding
and call it the building.** A file that exists and says nothing reads as a file that has been
written. [OPEN-ME.md](./OPEN-ME.md) lists exactly what is missing and why.

### Known imperfection in this package, stated rather than left to be found

⚠️ `tables/PurchaseLines.md` uses ASCII arrows in its Manage path and FK column where every other
page uses the `→` glyph. Cosmetic, real, and noted here rather than quietly left — **the sibling
app's nav map drifted from its own tree the same way and nobody caught it for six weeks.**

⚠️ `theme:` is set to `default-theme`, the documented grayscale fallback. **This app has not been
assigned a theme.** The frontmatter block is STRICT, so a placeholder is correct and an omission
would not be.
