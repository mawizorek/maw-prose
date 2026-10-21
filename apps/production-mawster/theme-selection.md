---
id: theme-selection
title: Theme Selection
type: reference
status: public
order: 19
nav: collapsed
revised: 2026-08-16
summary: WHICH theme is in force. A startup script walks records and lands the answer in two globals. Carries the MASTER DIAGRAM of the whole theme system, fields through to printed page.
---

# Theme selection

The **SELECTION** half of the theme system. [[Theme Resolution](@theme-resolution)] is the other half.

```
   SELECTION  ....  WHICH theme is in force?          ONCE, at startup
                    records -> script -> two globals

   RESOLUTION ....  what does THIS object look like?  per object, per render
                    globals -> token -> vectors -> values
```

⭐ **The app and every print reference only a CURRENT and a DEFAULT theme. A script sets those from records.** That is the whole idea: the cascade is expensive and situational, so it runs once; the resolve chain is hot, so it reads two globals and nothing else.

<a id="master-diagram"></a>

## ⭐ THE MASTER DIAGRAM — fields to printed page

!!! tip "Read this one first"
    Captured verbatim 2026-08-16 at Michael's request. **If you only read one thing about theming in this app, read this.** Every claim below it is elaboration.

```
FIELDS
=========================================================================

ORGANIZATIONS ....... who OWNS this copy       ✅ built
  Name                Text
  fkProducer          →PRODUCERS    which producer row is US (brand/logo)
  fkDefaultTheme      →THEMES       ⭐ THE FLOOR
  + audit ×5

PRODUCERS ........... the producing entities   ✅ built
  Name / NameShort / NameDisplay
  media_LogoWide / media_LogoSquare
  fkTheme             →THEMES       ✅ built. nullable = inherit floor
  + audit ×5

PRODUCTIONS ......... a show                   ✅ built
  fkProducer          →PRODUCERS    ⭐ who produces THIS show
  Title / dates / cuProductionToken / fkVenue / fkCourse

GLOBAL_USE .......... session state, all true Global
  g_pkCurrentTheme        ⭐ the ACTIVE side of every resolve
  g_pkDefaultTheme        ⭐ the FLOOR
  g_pkCurrentProduction      reaches the show's producer
  g_pkCurrentAppSession / g_pkCurrentUtilitySession
  g_AppTitle / g_AppTitleShort
  g_pkCurrentOrg          ✅ built

THEMES .............. default(90) · URITP(20) · database(80)


SELECTION  ──  runs ONCE at startup
=========================================================================

  OnFirstWindowOpen
     │
     1. resolve the ORGANIZATION record
     │
     2. g_pkDefaultTheme  ←  ORGANIZATIONS::fkDefaultTheme
     │                       the floor, set FIRST
     3. g_pkCurrentProduction  ←  last used / user picks
     │
     4. walk to the SHOW's producer:
     │      PRODUCTIONS::fkProducer → PRODUCERS::fkTheme
     │         has value?  → g_pkCurrentTheme = it
     │         empty?      → g_pkCurrentTheme = g_pkDefaultTheme
     │
     5. GUARD: either global empty → HALT + report
     ▼
   two globals hold the answer. nothing else re-derives it.


RESOLUTION  ──  runs per object, reads only the globals
=========================================================================

  ClickUp authors
     │  CU_StatusToken  ("Rehearsal", "DEADLINE"...)
     ▼
  import_EVENTS ──"calendar>"& token──→ STYLES::calc_Key
     │
     ▼
  EVENTS::fkStyle   ← stamped at import, or a user picks it on the portal
     │                ✅ stamping a token FK is IDENTITY, allowed
     │                🚫 stamping a resolved COLOUR is not
     │
  ═══ projection: WORKDAYS + EVENTS_X_WORKDAYS (generated) ═══
     │
     ▼
  print | Calendar        anchor = WORKDAYS
     │
     ├─ MONTH HEADER                    ├─ EVENT ROW
     │   StyleJoin_auto                 │   EVENTS::fkStyle
     │   = STYLES::calc_Key             │   = STYLES::PrimaryKey
     │        ▼                         │        ▼
     │   STYLES_for_WORKDAYS            │   STYLES_for_EVENTS
     │     ├─ ACTIVE  → COLOR / TYPE    │     ├─ ACTIVE  → COLOR / TYPE
     │     └─ DEFAULT → COLOR / TYPE    │     └─ DEFAULT → COLOR / TYPE
     │        ▼                         │        ▼
     │   coalesce per vector            │   coalesce per vector
     │   active → default → MAGENTA     │   active → default → MAGENTA
     │        ▼                         │        ▼
     │   TextColor(TextFont(TextSize(   │   TextColor(TextFont(TextSize(
     │      Upper( "JANUARY" ))))       │      "First Rehearsal" )))
     └──────────────┬──────────────────┘
                    ▼
              🖨️  ONE PDF PAGE
```

✅ **`PRODUCERS::fkTheme` and `GLOBAL_USE::g_pkCurrentOrg` were both built 2026-08-16**, minutes after being flagged missing. **Every field the selection layer needs now exists.** What is left is the script that walks them.

## 🔴 `fkProducer` means TWO DIFFERENT THINGS, and only one of them should drive a theme

| Field | Question it answers |
|---|---|
| `ORGANIZATIONS::fkProducer` | **which producer row is US** — house identity, logos, brand |
| `PRODUCTIONS::fkProducer` | **who produces THIS show** — URITP vs One Acts vs ROC |

⭐ **A print's theme must follow the SHOW's producer, not the house's.** The whole point of the 08-09 design was *One Acts could print differently from the main season* — and One Acts is a value of `PRODUCTIONS::fkProducer`, never of `ORGANIZATIONS::fkProducer`.

🔴 **So the cascade path is `g_pkCurrentProduction → PRODUCTIONS::fkProducer → PRODUCERS::fkTheme`, NOT through ORGANIZATIONS.** The 08-09 write-up drew it as organization → producer, which reads correctly and resolves to the wrong producer for every show the house does not produce itself. ORGANIZATIONS contributes exactly ONE thing to selection: **the floor.**

⚠️ Same word, two grains, one already-built field each. Neither is wrong; using the wrong one is silent.

## The startup script, in detail

🔴 **Step 5 is not optional.** A global holds nothing until something sets it, so **an empty `g_pkDefaultTheme` prints the entire file magenta.** This is the one real advantage the record-based design had — a stored fact cannot be unset by opening the file. **The floor is now a startup obligation and needs an explicit guard, not trust.**

⚠️ **Changing production mid-session re-runs step 4.** A production switch **is** a theme switch, so the same subscript is called from wherever `g_pkCurrentProduction` changes. 🚫 Never duplicate the walk — one `SET · Theme From Context` subscript, called from open and from the production picker.

⚠️ **`g_pkCurrentTheme` is currently set to `URITP` by hand, and URITP has zero appearance rows.** Once step 4 exists, it is derived, and hand-setting it becomes a debugging action rather than configuration.

⚠️ **Step 1 depends on how many ORGANIZATIONS records there are.** `g_pkCurrentOrg` now exists, which supports the multi-record reading; the competing 08-09 ruling was *"a second company is a second FILE, so the tenant IS the file."* ⭐ **With the global built, the script should read it and fall back to the only record when it is empty** — that works under either answer and needs no decision today. 🔴 If it stays one record, **create by script and never via a layout**, or the day there are two the script silently reads whichever comes first.

⚠️ **The table is `ORGANIZATIONS` (plural); every doc and session note says `ORGANIZATION`.** About to appear in a script.

🔴 **`ORGANIZATIONS.tsv`'s field notes are pasted from an export table** — `fkProducer` reads *"what it's called in this set"* and `fkDefaultTheme` *"the final per-file export path choice."* Neither describes a theme. **Comments-are-the-spec, again: treat every field comment as a claim to verify.**

## Notes on the end-to-end path

✅ **Both print chains use the SAME `calc_ActiveThemeKey` / `calc_DefaultThemeKey` fields**, because those live on the `STYLES` **base table** and every occurrence inherits them. ⚠️ The **occurrences** must still be separate per anchor — anchor–buoy — and that duplication is the pattern working, not a cost of it.

🔴 **The two chains differ at ONE hop and it matters:** the month header joins on a **derived** key (`StyleJoin_auto`, computed from the date), the event joins on a **stored FK** (`fkStyle`, set at import or picked by a human). **Derived keys self-heal; stored FKs rot when the thing they point at is renamed or deleted.** So events need referential care that month labels never will.

⚠️ **`EVENTS::fkStyle` should be `ovr_fkStyle`** — `STANDARD_EVENTS` holds the canonical style and this field is the per-event OVERRIDE. Unprefixed, it reads as authoritative. Already on the fix queue.

🔴 **`cuProductionToken` and `CU_StatusToken` are EXACT ClickUp strings, and a rename in ClickUp breaks the join SILENTLY.** The styling chain inherits that fragility at its very first hop: a renamed ClickUp status produces `calendar>SomethingNew`, which matches no `STYLES` row, and the event lands unstyled. ⭐ **`STYLES` rows must exist BEFORE the first import**, and an unmatched token is worth a report line rather than silence.

## Open items

- ✅ ~~`PRODUCERS::fkTheme`~~ **BUILT 2026-08-16.**
- ✅ ~~`g_pkCurrentOrg`~~ **BUILT 2026-08-16.**
- ⬜ **The startup script** does not exist. `00App_onFirstWindowOpen` is present but was never read or specced.
- ⬜ **`THEMES_x_STYLES::calc_ThemeStyleKey`** not built; needs backfilling on all 18 rows.
- ⬜ **The WORKDAYS chain stops at `STYLES`** — no appearance buoys yet.
- ⬜ **`THEMES_X_STYLES_for_EVENTS` has no theme predicate.** ⚠️ **Flip-order trap:** repointing it while `g_pkCurrentTheme` is `URITP` blanks every event style, and it reads as a broken relationship when it is actually the first honest answer.
- ⬜ **URITP has zero appearance rows**, so the cascade is untestable until a few exist.
- ⬜ **`ORGANIZATIONS` singular/plural** — settle before the script names it.

Related: [[Theme Resolution](@theme-resolution)] · [[Theme State](@theme-state)] · [[Relationships](@relationships)] · [[Projection Law](@projection-law)]
