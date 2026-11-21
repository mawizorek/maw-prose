---
id: relationships
title: Relationships
type: index
status: public
order: 30
nav: collapsed
revised: 2026-08
summary: What the graph SHOULD be. The DDR is what it IS. The value is the diff.
data:
  catalog:
    file: RELATIONSHIPS.tsv
---

# Relationships

!!! abstract "Grain"
    One row per table occurrence. Grouped by the ANCHOR that owns it.

🔴 **This file holds INTENT, never inventory.** What should exist, why, which anchor owns it, whether creation is allowed through it. **The DDR already generates what DOES exist** — its overview line counts and lists every relationship on every export. Keeping a second hand-written list of the same fact is a second claimant, and the hand-written one always loses.

**So: this is the plan, the DDR is the audit, and the useful artifact is the DIFF between them.**

⚠️ **It only survives if a row is written BEFORE the relationship is built.** Written after, it is transcription, and transcription gets skipped on the first busy afternoon. Written before, it is the design step — decide the predicates and the create flag here, then go tick the boxes. **The same reason the layouts TSV works.**

🚫 **Never write a relationship count on this page. The rows are the count.**

## Why these columns

Most of them are self-evident. Two are not, and they are the reason the file exists:

- **`Allow_Create`** — the transaction pattern depends on this checkbox and **it is invisible on the graph**. A relationship that silently lost it breaks a rebuild script with no error.
- **`Used_By`** — which layout or script depends on the occurrence. **This is what makes deleting one safe**, and no DDR can tell you.

`Sorted_By` earns its place too: the sorted-relationship mechanism is load-bearing three separate times here — value lists, emphasis resolution, and span portals — and a sort living on the wrong side of a relationship has already cost an afternoon.

## Anchor and buoy

One **anchor** occurrence per table a layout is built on, with **buoys** hanging off it for everything that anchor must reach. Never one interconnected web.

**Why:** in a web-shaped graph, adding a relationship for a new report silently changes what existing layouts can see, and the symptom arrives on a printed page weeks later. **In anchor and buoy, a change to one anchor's buoys cannot affect another anchor. Ever.**

**Cost, stated honestly:** the graph gets wide. `LOCATIONS` may appear under several anchors. You will scroll — and you will never debug a cross-anchor side effect, because there cannot be one.

⚠️ **A `view | TABLE` occurrence is used by its OWN layout and nothing else.** The moment a portal on another anchor points at one, they become shared buoys and the web is back.

⚠️ **Naming, corrected 2026-08-16:** this page specified `<ANCHOR>_<PATH>`; the file uses **`<TABLE>_for_<ANCHOR>`** (`STYLES_for_WORKDAYS`, `THEMES_X_STYLES_for_EVENTS`). **The file's version wins** — it reads as a sentence and sorts by target table, which is how you actually hunt an occurrence. Documented convention updated to match the build.

## 🪦 Retired vocabulary · "HOUSE"

🚫 **The word HOUSE is retired from this app's theme vocabulary as of 2026-08-16. The word is DEFAULT.**

It came from the 08-09 config design, where the fallback theme was a **record**: `ORGANIZATION.fkDefaultTheme` was called the *house theme* because ORGANIZATION represented the company that owns the copy of the app, cascading `PRODUCERS.fkTheme` → house → magenta. In that model "house" carried real meaning: it named a **level of ownership**, distinct from a producer.

🔴 **That cascade is not what got built.** The file resolves the floor from **`GLOBAL_USE::g_pkDefaultTheme`**, true Global storage, set at startup. There is no ORGANIZATION hop and no producer hop in the styling chain — **two globals, `g_pkCurrentTheme` and `g_pkDefaultTheme`, and that is the whole cascade.**

⭐ **So "house" now names a level that does not exist**, which is worse than a merely unfamiliar word: it implies a hop a reader will go looking for. The theme named `default` is a row in `THEMES`; the global is `g_pkDefaultTheme`; **the branch is the DEFAULT branch.** One word, three surfaces, no translation.

⚠️ Historical note kept deliberately, because the ORGANIZATION cascade may still return for **logos and brand**, which is what that level was genuinely for. If it does, it will be a *producer/organization* cascade feeding the theme choice — not a fourth fallback rung inside the styling resolve.

## ✅ RESOLVED 2026-08-16 · the global-in-predicate fork

This page previously carried an open three-way fork: a relationship matches two occurrences only, so it *"cannot reach `GLOBAL_USE::g_currentCalendar` from the WORKDAYS side."* The three drafted options were (1) put the global field on WORKDAYS, (2) portal filter, (3) re-anchor the grid on `GLOBAL_USE`. It was flagged as also hitting `STYLES_ACTIVE` and `STYLES_HOUSE`, with *decide once, apply to all three.*

🔴 **The premise was wrong, and that is why none of the three options was satisfying.**

⭐ **OPTION 4 — A GLOBAL FIELD IS READABLE FROM ANY CONTEXT IN A CALCULATION, WITH NO RELATIONSHIP AT ALL.** That is what global storage *is*: one value, file-wide, not reached through the graph. So the source table does not need the global; it needs a **calculation that references it**.

```
STYLES::calc_ActiveThemeKey  =  GLOBAL_USE::g_pkCurrentTheme & ">" & PrimaryKey
```

Unstored (it must be — it references a global), and **unstored is fine because it is the LEFT side of the relationship.** Only the right side needs a stored, indexed field.

**Why it beats all three drafted options:**

| Option | Verdict |
|---|---|
| 1 · global field on the source table | 🚫 **Second claimant on the session value.** Two fields named for one truth, and nothing keeps them equal. |
| 2 · portal filter | 🚫 **Display only.** No effect on a found set, a report, or a PDF — and this app's whole purpose is print. |
| 3 · re-anchor on `GLOBAL_USE` | ⚠️ Works, and is right for a Home/dashboard layout that is *about* session state. **Wrong for a data grid**, whose anchor should be its own records. |
| **4 · unstored calc reading the global** | ✅ **One origin, no restructuring, works for found sets and print.** |

⚠️ **The cost, stated:** an unstored calc referencing a global **cannot be indexed**, so it may never be the right side of a relationship and never a stored match target. In this pattern it never is.

⚠️ **Apply to all three** as the original fork instructed: `STYLES_ACTIVE`, `STYLES_DEFAULT` (drafted as `STYLES_HOUSE`), and the `WORKDAYS_EVENTS` calendar predicate.

## 🎨 The theme resolution chain (the shape to build)

Full reasoning: [[Theme Resolution](@theme-resolution)] · observed state: [[Theme State](@theme-state)].

⭐ **The two key calcs live on the STYLES BASE TABLE, so every occurrence of STYLES inherits them for free** — `STYLES_for_WORKDAYS`, `STYLES_for_EVENTS`, and any future consumer. **Fields are shared across occurrences; TOs are not.** That is why extending this to a second anchor costs predicates and buoys, never fields.

```
ANCHOR: WORKDAYS  (the print grid)
  |
  +-- STYLES_for_WORKDAYS            StyleJoin_auto = calc_Key
  |     |                             (built 08-16)
  |     |
  |     +-- TXS_ACTIVE_for_WORKDAYS   calc_ActiveThemeKey  = calc_ThemeStyleKey
  |     |     |                        g_pkCurrentTheme & ">" & PrimaryKey
  |     |     +-- COLOR_ACTIVE_for_WORKDAYS    fkColor_Text = PrimaryKey
  |     |     +-- TYPE_ACTIVE_for_WORKDAYS     fkTypography = PrimaryKey
  |     |
  |     +-- TXS_DEFAULT_for_WORKDAYS  calc_DefaultThemeKey = calc_ThemeStyleKey
  |           |                        g_pkDefaultTheme & ">" & PrimaryKey
  |           +-- COLOR_DEFAULT_for_WORKDAYS   fkColor_Text = PrimaryKey
  |           +-- TYPE_DEFAULT_for_WORKDAYS    fkTypography = PrimaryKey
```

🔴 **TWO parallel appearance branches, not one.** Active and default. The per-vector coalesce needs **both sides simultaneously**, so it cannot be done by re-pointing one relationship.

🔴 **A single composite predicate per hop, never two separate predicates.** `fkTheme` + `fkStyle` as two predicates would need two match fields on the STYLES side; one composite key needs one. Same argument that produced `calc_Key`, one level down.

🔴 **`THEMES_x_STYLES` needs a new stored key:** `calc_ThemeStyleKey = fkTheme & ">" & fkStyle`, **stored and indexed**, and **backfilled** across all 18 existing rows — auto-enter does not populate rows that already exist.

⚠️ **Verify what `fkTheme` and `fkStyle` actually STORE before writing that key.** The table view displays `default` and `monthLabel>january`, which is either the stored value or a value-list display of a UUID. **A composite built from a display label is not a key.** If they store UUIDs, the composite is UUID-based and correct; if they store the readable strings, that is a separate finding.

⚠️ **The four leaf occurrences are unavoidable.** Text colour and typography are different tables, and active and default are different rows, so it is 2 × 2. Anchor–buoy forbids sharing them with the EVENTS chain — **that duplication is the pattern working, not a cost of it.**

### 🔴 The EVENTS branch has the same defect, and a flip-order trap

`THEMES_X_STYLES_for_EVENTS` matches on **`fkStyle` alone** — no theme predicate. It works today only because `default` is the only theme with rows, so one style matches exactly one record. **Repoint it to `calc_ActiveThemeKey = calc_ThemeStyleKey` and mirror the default branch**, exactly as WORKDAYS.

🔴 **THE TRAP:** `g_pkCurrentTheme` is set to `URITP`, which has **zero** appearance rows. **The instant that predicate is repointed, every event style on every layout goes blank**, because `URITP>...` matches nothing and the default branch does not exist yet to catch it. ⚠️ **It looks like the change broke the relationship, when it actually started telling the truth** — the old match was hiding an unset theme.

✅ Safe orders: set `g_pkCurrentTheme` to `default` FIRST, then repoint · or build both branches and the resolve calc in one sitting, then flip the global. 🚫 **Never repoint and then go build the default branch afterwards** — that leaves the file visibly broken between two edits, which is exactly when a session gets interrupted.

### The floor

✅ **`GLOBAL_USE` already holds both halves as true Global storage:** `g_pkCurrentTheme` and `g_pkDefaultTheme`. 🔴 **So the default-theme floor is a GLOBAL, not `ORGANIZATION.fkDefaultTheme`** — the 08-09 plan put it on a record and the file put it in session state. **The 08-09 open item is satisfied differently than written, and every doc claiming the floor is missing is stale.**

⚠️ But a global is *volatile*: something must SET it at startup, and an empty `g_pkDefaultTheme` prints the whole file magenta. `OnFirstWindowOpen` owns that, and the completeness report must check it. **This is the one real advantage the record-based design had, and it is now a startup obligation instead of a stored fact.**

## What the first draft already caught

Written before a single relationship exists, it surfaced: **two blocked anchors** (no PEOPLE table, no STANDARD_DOCS) · **two joins that cannot work until an index is added** (the crosswalk, the upsert) · **one grain mismatch in the layouts plan** (highlights hanging off an export set rather than a calendar) · and **three misspelled keys** that must be fixed before a relationship binds them.

## Fields

!!! data "catalog"
