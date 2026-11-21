---
id: theme-resolution
title: Theme Resolution
type: reference
status: public
order: 17
revised: 2026-08
summary: How a layout object finds its appearance. SELECTION picks the theme once at startup; RESOLUTION reads it per object. Two layers, not two rival designs.
---

# Theme resolution

How any styled object on any layout gets its appearance, using the **month day label** as the worked example because it is the first token family built out.

> 🔴 **For what is actually IN the tables and the graph right now, read [[Theme State](@theme-state)] first.** This page is the mechanism; that page is the evidence, and it is newer.

## ⭐ TWO LAYERS, and conflating them cost half a session

```
   SELECTION  ....  WHICH theme is in force?     runs ONCE, at startup
                    a cascade -> two globals

   RESOLUTION ....  what does THIS object look like?   runs per object, per render
                    globals -> token -> vectors -> values
```

🔴 **The `ORGANIZATIONS` → `PRODUCERS` cascade and the two globals are NOT rival designs, and they never were.** The 08-09 design and the 08-16 build were mistaken for competing answers because both were described as "the cascade." They are different layers:

- **The cascade SELECTS.** Producer's theme, else the organization's default — a question about *whose paperwork is this*.
- **The globals CARRY the answer.** `g_pkCurrentTheme` + `g_pkDefaultTheme`, read by every resolve calc.

✅ **So nothing was lost, and the better mechanism composes with the built one.** The cascade is what a startup script RUNS to set the globals. Neither replaces the other.

🚫 **The cascade must NOT be moved INSIDE the resolve chain**, and this is the load-bearing reason the split matters:

1. **Cost per cell.** A resolve calc runs on every styled object on every row. A 42-cell month grid × several tokens per cell would walk producer → organization lookups thousands of times per print. **Resolving once into a global is the whole point of a global.**
2. **It pushes magenta further away.** The per-vector coalesce is `active → default → MAGENTA`. Add producer and organization as *rungs* and it becomes four-deep × three vectors, and the bug detector stops being adjacent to the bug.
3. **Two answers to one question.** If the resolve calc can re-derive the theme, the global is no longer authoritative and nothing keeps them equal. ⭐ **One question, one answering surface.**

## 🔴 What the SELECTION layer needs (mostly already there)

✅ **`ORGANIZATIONS` already carries both pointers:** `fkProducer` and `fkDefaultTheme`, both relationship-typed. The 08-09 design's data half exists.

⚠️ **`PRODUCERS` has NO `fkTheme` in its table doc**, though an 08-09 note claimed it landed. Either the doc is stale or the field was never built. **Verify against a DDR before building the cascade** — without it there is no producer rung and the cascade is one hop.

⚠️ **The table is `ORGANIZATIONS` (plural).** Docs and session notes have called it `ORGANIZATION` throughout. One of them is wrong and it is about to appear in a script.

🔴 **`ORGANIZATIONS.tsv`'s field NOTES are copied from an export table** — `fkProducer` is annotated *"what it's called in this set"* and `fkDefaultTheme` *"the final per-file export path choice"*. Neither describes a theme. **The comments-are-the-spec defect, again: treat every field comment as a claim.**

⚠️ **Which organization record is "us" is unresolved.** Tenancy was phased 08-09 to multi-record-by-design with `g_pkCurrentOrg` selecting one. **The selection script needs that global set before it can read a default theme** — so the cascade is really `g_pkCurrentOrg → organization → producer → theme`, and the first hop is itself a startup choice.

### The script, in order

```
OnFirstWindowOpen
  |
  1. set g_pkCurrentOrg        (which organization is this copy)
  2. set g_pkDefaultTheme  <-  ORGANIZATIONS::fkDefaultTheme     THE FLOOR
  3. set g_pkCurrentTheme  <-  PRODUCERS::fkTheme  if not empty
                               else g_pkDefaultTheme
  4. HALT + report if either theme global is empty
```

🔴 **Step 4 is not optional.** A global is volatile — it holds nothing until something sets it, so **an empty `g_pkDefaultTheme` prints the entire file magenta.** That is the one real advantage the record-based design had: a stored fact cannot be unset by opening the file. **The floor is now a startup obligation, and it needs an explicit guard rather than trust.**

⭐ **Why the cascade does NOT block the print, and why deferring it is cheap this time:** it lives in a script. The 08-09 reasoning — *add a level to a cascade now, because converting a single lookup into a cascade later means touching every resolve calc* — was true **of the resolve chain**. In a startup script, adding a rung is one step in one place. **Build the resolve chain, get a page out, then deepen selection whenever.** Choosing the layer is what made it cheap.

## RESOLUTION — the chain

```
LAYOUT: month-view part / portal row
=====================================================================

    [ TEXT OBJECT: the month day label ]
                |
                |  displays a CALC, not a plain date field
                v
    [ calc_DateLabel_Styled ]   unstored, on the object's base TO
                |
                |   TextColor( TextFont( TextSize( label ; size ) ; font ) ; rgb )
                |                  ^           ^                   ^
                |            text colour   font family           size
                |                  |           |                   |
                +------------------+-----------+-------------------+
                                   |
=================================  |  ==============================
 HOP 1     DATE ------> JOIN KEY   |
                                   |
    [ WORKDAYS::Date ]             |
            |                      |
            |  "monthLabel>" & Lower ( MonthName ( Date ) )
            v
    [ WORKDAYS::StyleJoin_auto ]   auto-enter TEXT, stored
            |
 HOP 2      |   JOIN KEY ------> TOKEN
            v
        ||||||||||||||||||||||||||||||||||||||||
        ||  TO: STYLES_for_WORKDAYS            ||
        ||     StyleJoin_auto = calc_Key       ||
        ||||||||||||||||||||||||||||||||||||||||
            |
            v
        [ STYLES ]  ---- IDENTITY ONLY. 12 month rows.
        [   PrimaryKey                          ]
        [   vl_Domain = "monthLabel"            ]
        [   vl_Label  = "january"               ]
        [   calc_Key  = vl_Domain &">"& vl_Label ]  <-- STORED, indexed
        [   LegendText   printed string, NOT a key ]
        [   Sort = 70.01   PRESENTATION ONLY    ]
        [   no colour  no font  no theme key    ]
            |
 HOP 3 + 4   TOKEN ------> APPEARANCE      TWO parallel TOs
            |
        +---+-----------------------------+
        v                                 v
 [ TXS_ACTIVE_for_WORKDAYS ]      [ TXS_DEFAULT_for_WORKDAYS ]
 [  calc_ActiveThemeKey     ]     [  calc_DefaultThemeKey     ]
 [    = calc_ThemeStyleKey  ]     [    = calc_ThemeStyleKey   ]
        |                                 |
        |  fkColor_Text                   |  fkColor_Text
        |  fkTypography                   |  fkTypography
        +---------------+-----------------+
                        |
        PER-VECTOR coalesce -- twice, INDEPENDENTLY.
        Never one row-level If.  Empty = inherit, per vector.
                        |
   text = active.fkColor_Text or default.fkColor_Text or MAGENTA
   type = active.fkTypography or default.fkTypography or MAGENTA
                        |
 HOP 5     VECTOR ------> VALUE
        +---------------+-----------------+
        v                                 v
 [ THEME_COLORS ]                 [ THEME_TYPOGRAPHY ]
 [  R / G / B --> RGB( r;g;b )  <-- layout eats THIS ]
 [  Hex       --> export / HTML only                ]
```

⭐ **The two key calcs live on the STYLES BASE TABLE, so every occurrence inherits them free** — `STYLES_for_WORKDAYS`, `STYLES_for_EVENTS`, any future consumer. **Fields are shared across occurrences; TOs are not.** Extending to a second anchor costs predicates and buoys, never fields.

## ✅ The join key is a COMPOSITE (Michael's design, adopted 08-16)

```
STYLES            calc_Key            = vl_Domain & ">" & vl_Label       stored, indexed
WORKDAYS          StyleJoin_auto      = "monthLabel>" & Lower(MonthName(Date))
THEMES_x_STYLES   calc_ThemeStyleKey  = fkTheme & ">" & fkStyle          stored, indexed
STYLES            calc_ActiveThemeKey = g_pkCurrentTheme & ">" & PrimaryKey   unstored
STYLES            calc_DefaultThemeKey= g_pkDefaultTheme & ">" & PrimaryKey   unstored
```

⭐ **Why a composite beats two predicates:** two predicates need two match fields per side. One composite needs one. Multiply by token families and it halves the field count on every consumer.

🔴 **The reuse is asymmetric.** `calc_Key` on STYLES is ONE field serving N relationships. A consumer's join field holds one domain's value at a time, so it is **one field PER DOMAIN** — `StyleJoin_Month`, `StyleJoin_Emphasis`. **Suffix from row one**; an unsuffixed first field forces the second into a worse name and the pair reads as though one is authoritative (the `fkStyle` / `ovr_fkStyle` defect).

⚠️ **Right sides MUST be stored and indexed.** An unstored right side makes a relationship **non-functional**, not slow. ✅ Left sides may be unstored, which is what lets them read globals.

⚠️ **Auto-enter does NOT backfill.** Any new key field is empty on every pre-existing row until `Replace Field Contents` runs. ⚠️ `calc_ThemeStyleKey` needs it across all 18 rows.

⚠️ **Verify what `fkTheme` and `fkStyle` STORE** before building `calc_ThemeStyleKey`. The table view displays `default` and `monthLabel>january` — either the stored value or a value-list rendering of a UUID. **A composite built from a display label is not a key.**

⚠️ **The delimiter is `>`.** Chosen over `.` because `.` already means decimal in `Sort` (`70.01`) in the same table, and `vl_Label` holds human strings. `>` has no second job. **One character wrong on either side fails as *no related record*.**

⚠️ **Call it a KEY, never a hash.** Readable composites survive the Data Viewer, which is the only debugging surface a calculation has.

## 🔴 `Sort` IS NOT A JOIN KEY

`Sort` for the month family is **70.01–70.12** — a block-prefixed presentation ordering, not identity.

1. ⭐ **Positional values get renumbered.** Resequencing a legend is a routine presentation edit; key a relationship on it and **a legend reorder silently restyles the calendar**, with the symptom nowhere near the edit.
2. Matching it needs `70 + Month ( Date ) / 100` — a domain constant typed into a calc.
3. `Sort` is globally unique, so any domain predicate beside it becomes decorative. A predicate that cannot fail is not a predicate.

✅ It is typed Number. It is the wrong key for reasons unrelated to its type.

## Hop 1 — what is in the calc

🔴 **A predicate cannot hold an expression** — FileMaker matches field to field, so a field on the consumer is required either way. 🔴 **And a calculation cannot call a SCRIPT** (nor can conditional formatting, a merge field, or web viewer content) — *anything a script returns but does not DO is a custom function, and on a boundary it MUST be.* ⚠️ Debug it in the **Data Viewer**; custom functions have no step-through.

✅ **As built: `Lower ( MonthName ( Date ) )`.** ⚠️ **`Lower ( )` is load-bearing** — `MonthName` returns `January`, the token is `january`. Remove it and all twelve fail silently.

⚠️ **`MonthName ( )` reads the file's language setting**, so the key's correctness now depends on a locale. Failure mode is *no related record* → magenta, which reads as a theme bug. ⚠️ Reasoned, **not observed in this file.**

✅ **It is also the ONLY place the twelve strings are derived** — no `Choose ( )`, no typed literals. **So the `MonthLabel ( )` custom-function proposal is now OPTIONAL rather than required:** a native function plus `Lower ( )` already gives one origin. Promote it only if the locale risk is confirmed real.

🚫 **A numeric `MatchKey` field on `STYLES` was REFUSED** — it duplicates what `vl_Label` already is, a **convenience copy**, the defect caught three times in this file.

## 🌐 Value lists: YES for domains, NO for months

**Domains — back it with a value list.** `vl_Domain` is half of a join key; a typo orphans a token permanently and prints magenta. Typing is the only failure mode; a picker removes it.

🔴 **Months — no, structurally.** `vl_Label` is **polymorphic**: month names on month rows, calendar names on `calendar` rows. One field whose legal values depend on another field cannot be backed by one flat list, and a conditional list would need a source of legal (domain, label) pairs — which is `STYLES` itself. Circular.

⭐ **The real problem it was reaching for: the twelve strings must not exist twice.** ✅ Solved by `Lower ( MonthName ( ) )` being the sole derivation. If rows are ever re-seeded, **seed them BY SCRIPT from the same expression**, never by typing.

## 🔴 FILL is DEMOTED, not missing (ruled 08-16)

The capability list says CF can set fill and text colour. True — and **it never distinguishes STATIC from CALCULATED, which is the whole question.**

- **CF picks a colour from a swatch picker, per condition.** The condition is a formula; the colour is not. So CF **cannot read** `THEME_COLORS`, and a CF-driven fill means one hardcoded condition per token per theme — the exact defect the model prevents.
- ✅ **`TextColor ( )` · `TextFont ( )` · `TextSize ( )` in a calc DO take data, PROVEN IN THIS FILE:** `THEME_COLORS::Hex_autoCalc` renders each hex string in its own colour from stored R/G/B. **Text and typography are deliverable.**
- 🔴 **There is no `Fill ( )` function.** Fill is not calculable by any route.

⭐ **Fill is a CELL concern; colour and typography are a TEXT concern.** A month label is text inside a cell. The one token that genuinely wants a fill (`BLACK`) wants a whole-cell treatment via the emphasis path and a real layout object — **the vector had no delivery mechanism because it was aimed at the wrong layer.**

Consequences: ✅ the default theme is **COMPLETE at two vectors**, so magenta is unreachable and meaningful again · 🚫 keep `fkColor_Fill`, but **exclude it from the completeness test** or that test reports false failures forever · 🔴 **the CF capability test is OFF the critical path** — it was load-bearing only for fill · ⚠️ revive when a real cell background is needed AND CF is shown to take data.

⚠️ **Case is data too** (`vl_Case`) and CF cannot set case — apply `Upper ( )` in the calc. 🔴 **FileMaker has no SmallCaps text function**, so `SmallCaps` is undeliverable by the calc path and needs a real font variant. Untested.

## 🔴 MAGENTA is a CALC LITERAL, never a record

`RGB ( 255 ; 0 ; 255 )` inline in the resolve calc. Stored nowhere, and it must not be.

**Why:** magenta exists to prove a lookup failed. A fallback stored as a record can itself be renamed, deleted or fail to resolve — the exact failure it detects. **A detector that shares the failure mode of the thing it detects is not a detector.** It must also not be themeable, or a theme could hide its own gaps. It is deliberately **ugly**: an unresolved join renders as ordinary black and prints silently, which is the whole problem.

## Currency at the boundary

✅ `THEME_COLORS` stores `R` / `G` / `B`, so **the layout path needs no conversion at all** — `RGB ( R ; G ; B )` reads straight off the vector. Hex serves export and HTML only, which makes the canonical `color/` custom-function family an **export** concern, never a rendering blocker.

## Known open items

- ✅ **The default-theme floor EXISTS as `g_pkDefaultTheme`** (true Global storage), not `ORGANIZATIONS.fkDefaultTheme`. The 08-09 open item is satisfied **differently than written** — every doc calling the floor missing is stale. ⚠️ But it is volatile: **`OnFirstWindowOpen` must set it, with a guard.**
- 🔴 **`THEMES_X_STYLES_for_EVENTS` matches on `fkStyle` alone** — no theme predicate. Works only while `default` is the sole populated theme. ⚠️ **FLIP-ORDER TRAP:** `g_pkCurrentTheme` is `URITP`, which has zero rows, so repointing before the default branch exists **blanks every event style** — and it reads as a broken relationship when it is actually the first honest answer. Set the global to `default` first, or build both branches in one sitting.
- ⬜ **`PRODUCERS::fkTheme`** — claimed built 08-09, absent from the table doc. Verify.
- ⬜ **`ORGANIZATIONS` vs `ORGANIZATION`** — plural in the table doc, singular everywhere else.
- ⬜ **`g_pkCurrentOrg` must be set before the cascade can read a default theme.**
- ⬜ **`calc_ThemeStyleKey` not built**, and needs backfilling on all 18 rows.
- ⬜ **The WORKDAYS chain stops at STYLES** — no appearance buoys yet.
- ⬜ **`BLACK` has a token, no appearance row, no `LegendText`.**
- ⚠️ **`STYLES.md` describes a superseded design** — specs a nonexistent `MonthNum`, puts `Hex` + RGB on STYLES against the identity-only model, and lists domains (`month`, `event-status`) the file does not use. **Reconcile before building from it.**

Related: [[Theme State](@theme-state)] · [[Relationships](@relationships)] · [[Projection Law](@projection-law)] — a formatting need with no rule behind it becomes a build task, never a hand-edit. A month that needs its own look is a `STYLES` row.
