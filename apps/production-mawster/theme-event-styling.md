---
id: theme-event-styling
title: Event Styling
type: reference
status: public
order: 21
nav: collapsed
revised: 2026-08-16
summary: How an EVENT gets its style. ONE path— the ClickUp token arrives, a domain prefix is added, the string finds the STYLES row. The calendar vocabulary is a contract with ClickUp.
---

# Event styling

How a canonical `EVENTS` row gets its style token.

> Mechanism: [[Theme Resolution](@theme-resolution)] · selection: [[Theme Selection](@theme-selection)] · observed state: [[Theme State](@theme-state)] · remaining work: [[Theme Build Order](@theme-build-order)].

## 🔴 CORRECTION 2026-08-16 — read this before anything else on this page

An earlier revision of this page (PR #140) described `EVENTS::fkStyle` and `EVENTS::autoKey_StyleLookup` as **two mechanisms**: a UUID foreign key acting as a human OVERRIDE, and a derived string acting as the AUTO path, with a resolve order between them, two relationships, and a coalesce branch in the resolve calc.

🚫 **All of that was invented. There is no override layer. Retracted in full.**

**What is actually true:**

```
EVENTS::fkStyle              holds the RAW ClickUp token:  "DEADLINE"  "Production"
EVENTS::autoKey_StyleLookup  =  "calendar>" & fkStyle
```

**They are the same fact, one step apart.** `fkStyle` is the token; `autoKey_StyleLookup` is that token with its domain prefix. ✅ **The relationship to `STYLES` keys on `autoKey_StyleLookup`, and that is the only path.** One route, no override, no second relationship, no coalesce.

### Why the error happened, because the cause is still in the schema

🔴 **Two different fields in two different tables are both named `fkStyle`, and they hold different KINDS of value.**

| Field | Holds |
|---|---|
| `THEMES_x_STYLES::fkStyle` | a **UUID** — a real foreign key to `STYLES::PrimaryKey` |
| `EVENTS::fkStyle` | the **raw token text** — `"DEADLINE"` |

A screenshot of `THEMES_x_STYLES::calc_ThemeStyleKey` rendering as `UUID>UUID` was read as proof that *`fkStyle`* stores a UUID — and then that conclusion was carried one table over to `EVENTS`, where the same field name means something else entirely. **The evidence was real and the inference crossed a table boundary.**

⭐ **The lesson, and it is worth more than the correction: `fk` is a TYPE CLAIM.** In this file the prefix means *this holds a key to another table's `PrimaryKey`*. On `EVENTS` it holds display text from another system. **A field whose prefix lies will be reasoned about wrongly by everyone who reads it — including its author's collaborators — and no DDR flags it, because a Text field holding text is perfectly valid.** This is the third `EVENTS::fkStyle` finding in the app's history and all three trace to the name.

### 🔴 Rename it, and `ovr_` is ALSO wrong

Fix-queue item 11 currently says *"`EVENTS::fkStyle` → rename `ovr_fkStyle`"*. 🚫 **That is wrong too, for the same reason** — it keeps the false `fk` claim and adds a false override claim on top of it.

**The field holds an imported vocabulary token, so name it that:**

```
EVENTS::styleToken           <-- preferred. says what it holds.
EVENTS::import_StyleToken    <-- if provenance matters more than brevity
```

⚠️ **Then `autoKey_StyleLookup` reads correctly as what it is:** the token with its domain prefix, built for one job — finding the row. ⚠️ Renaming breaks nothing (relationships and calcs follow field IDs, not names), but the `autoKey_StyleLookup` formula text will need re-reading once.

⚠️ **`EVENTS::fkStyle`'s own field note says "STYLES row, domain event-status."** Both halves are now wrong: it is not a STYLES row, and the live domain is `calendar`, not `event-status`. Fix in the same pass.

## ✅ Placement, ruled 2026-08-16 (Michael)

> *"The style applies to the canonical event in the database — which is EVENTS — and the stylekey gets updated on the canonical EVENT via import_. So the autoKey and relationship to style should be on the canonical EVENT, because that's where the workday print version comes from."*

**The key lives on `EVENTS`, not `import_EVENTS`.** This corrects an earlier draft that put the lookup on the import table.

⭐ **The reasoning generalizes into a rule: a resolution key belongs on the table the RENDER reads, not the table the VALUE arrived through.** `print | Calendar` is anchored on `WORKDAYS` and reaches events via `EVENTS_X_WORKDAYS` → `EVENTS`. It never touches `import_EVENTS`. A key on the import table would have forced the render to walk back through the archive to style a row, coupling the print path to the intake path.

✅ **Consequence: `import_EVENTS` stays purely ARCHIVAL.** It holds what arrived, verbatim, and nothing downstream reads it at render time.

## The one path

```
ClickUp status token                         "DEADLINE"
      |
      v
import_EVENTS::import_Style_Key              raw, archival, never read at render
      |
      |  import script writes it forward to the canonical row
      v
EVENTS::fkStyle   (→ styleToken)             "DEADLINE"
      |
      |  auto-enter:  "calendar>" & fkStyle
      v
EVENTS::autoKey_StyleLookup                  "calendar>DEADLINE"
      |
      |  = STYLES_for_EVENTS::calc_Key
      v
STYLES row  →  THEMES_X_STYLES  →  THEME_COLORS / THEME_TYPOGRAPHY
```

✅ **Keeping the bare token on `EVENTS` rather than only the prefixed key is right**, for two reasons worth stating: it is the **provenance** of the style decision (what ClickUp actually said, on the canonical row, without reopening the archive), and it keeps the prefix in exactly one place instead of being baked into stored data.

⚠️ **Auto-enter does not backfill.** Any existing `EVENTS` rows created before `autoKey_StyleLookup` existed have it empty. `Replace Field Contents` with calculated result, then eyeball the column.

## 🔴 The `calendar` vocabulary is a CONTRACT with ClickUp

The join is on a **string**, so the two vocabularies must agree character for character. That is not a flaw — **it is what the `calendar` domain IS: the mapping table from ClickUp's status names to our appearance.** `STYLES.md` says exactly that: *"STYLES maps token → colour."*

🔴 **But the two domains have OPPOSITE ownership, and that has to be written down:**

| Domain | Who owns the label text | Renaming a `vl_Label` |
|---|---|---|
| `calendar` | **ClickUp.** Mirrors of status names. | 🚫 **Never rename to taste.** It must match ClickUp exactly or the join dies. |
| `monthLabel` | **Us.** Derived by `Lower ( MonthName ( ) )`. | ⚠️ Only alongside the calc that produces it. |

⚠️ **Renaming a status in ClickUp is a two-system change.** The next import writes the new token, finds no `STYLES` row, and those events land unstyled.

🔴 **Unstyled is NOT magenta, and the difference is the whole reason the report matters.** Magenta means *a style was found and its appearance did not resolve* — loud, on the page. An unmatched token means *no style was ever found*: the relationship is simply empty, nothing resolves, nothing is flagged. **One failure announces itself and the other does not.**

✅ **So the unmatched-token report is the single defence on this path.** One `UTILITY_LOGS` row per import listing every distinct token that matched no `STYLES` row. ⚠️ **Never abort the import** — partial styling is recoverable, a refused batch is not. ⚠️ **`STYLES` rows must exist BEFORE the first import** or everything lands unstyled; the legacy file hardcoded status→RGB in a calc, so it had nothing to seed and this failure mode did not exist there.

⭐ **A note on key types, since this got argued in both directions today.** A UUID key is rename-safe because it is **opaque** — and opacity is precisely what you do NOT want on the ClickUp seam, whose entire job is to notice when two vocabularies stop agreeing. **The string key makes drift detectable; a UUID would have hidden it and gone on applying yesterday's mapping.** ⚠️ Detectable is not detected: the report does that work, not the key type.

## Naming · unify on `autoKey_`

Three conventions currently name one job:

```
STYLES::calc_Key                    the shared right side
WORKDAYS::StyleJoin_auto            month header, left side
EVENTS::autoKey_StyleLookup         event, left side
```

⭐ **`autoKey_` is the best of the three** — *auto-entered* AND *key* in two front-loaded tokens, so it sorts with its siblings in a field list. **Rename `WORKDAYS::StyleJoin_auto` → `autoKey_StyleLookup`** so both consumer halves match exactly. Do it before a third consumer exists.

⚠️ `STYLES::calc_Key` keeps `calc_` — it is the field on the *other* side of every join, and the different prefix marks that asymmetry usefully.

## ⚠️ The domain prefix is a typed string, in two calcs

`"calendar>"` and `"monthLabel>"` are literals inside auto-enter calculations — which the file's own pre-build discipline warns against (*no domain strings typed into calcs; a misspelling is FALSE forever, silently*).

✅ **Accepted as-is**, and the reason is worth recording so it is a decision rather than an oversight: it is **one literal per consumer table**, sitting immediately beside the join it feeds, and the failure is total rather than partial — misspell it and *every* row on that table fails at once, which is loud on the first test. Contrast a typo in a `vl_Domain` data value, which breaks exactly one token and hides.

⚠️ **Revisit if a third or fourth consumer appears.** At that point the domain names want to be a value list feeding both the data and a single derivation, not four literals in four calcs.

## Open items on this path

- ⬜ **Rename `EVENTS::fkStyle` → `styleToken`.** 🚫 Fix-queue item 11's `ovr_fkStyle` is **withdrawn** — wrong on both halves.
- ⬜ **Its field note** says *"STYLES row, domain event-status"* — wrong twice over.
- ⬜ **The unmatched-token report** does not exist. Only defence on this path.
- ⬜ **Backfill `autoKey_StyleLookup`** on any pre-existing `EVENTS` rows.
- ⬜ **Two claimants on the raw token in `import_EVENTS`:** `import_Style_Key` (`{.conf}`) and `CU_StatusToken` (`{.tbc}`). One field wearing two names. 🔴 If the parser fills the unused one, `fkStyle` is never written, `autoKey_StyleLookup` is `"calendar>"` with nothing after it, and **every event imports unstyled, silently.**
- ⬜ **`THEMES_X_STYLES_for_EVENTS` still has no theme predicate.** ⚠️ **Flip-order trap:** `g_pkCurrentTheme` is `URITP`, covering 4 of 19 tokens — repointing before `TXS_DEFAULT_for_EVENTS` exists blanks the other 15, and it reads as a broken relationship when it is the first honest answer.
- ⬜ **Is there a canonical style on `STANDARD_EVENTS`?** An 08-09 note claims so. If yes, *that* is where a real specific-else-general question lives — but it is about tokens, not about an FK on `EVENTS`, and it is not yet verified.
