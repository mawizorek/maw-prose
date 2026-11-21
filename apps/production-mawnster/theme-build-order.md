---
id: theme-build-order
title: Theme Build Order
type: reference
status: public
order: 20
nav: collapsed
revised: 2026-08-16
summary: Every remaining step to get styled month headers and styled events onto one printed page. Nine steps, dependency-ordered, with what to verify after each.
---

# Theme build order

The design is settled ([[Theme Selection](@theme-selection)] · [[Theme Resolution](@theme-resolution)]) and the data is entered ([[Theme State](@theme-state)]). **This page is the remaining WORK, in the order it has to happen, with the verification step that proves each one before the next depends on it.**

⚠️ Written 2026-08-16 while the build was moving hourly. **Check [[Theme State](@theme-state)] before trusting any ⬜ here.**

## ✅ Already built — do not rebuild

```
STYLES::calc_Key            = vl_Domain &">"& vl_Label       auto-enter text, stored, indexed
WORKDAYS::StyleJoin_auto    = "monthLabel>"& Lower(MonthName(Date))
THEMES_x_STYLES::calc_ThemeStyleKey = fkTheme &">"& fkStyle  stored, UUID>UUID
PRODUCERS::fkTheme          →THEMES, nullable
GLOBAL_USE::g_pkCurrentTheme / g_pkDefaultTheme / g_pkCurrentOrg / g_pkCurrentProduction
ORGANIZATIONS::fkProducer / fkDefaultTheme
PRODUCTIONS::fkProducer
WORKDAYS → STYLES_for_WORKDAYS   (StyleJoin_auto = calc_Key)
EVENTS → STYLES_for_EVENTS → THEMES_X_STYLES_for_EVENTS → COLORS / TYPOGRAPHY
DATA: 19 STYLES · 23 THEME_COLORS · 4 THEME_TYPOGRAPHY · 3 THEMES · 22 THEMES_x_STYLES
```

---

# 🔴 STEP 0 · Settle the two claimants on the incoming status token

**Nothing else in the import path can be built until this is decided, because it decides which field the lookup reads.**

`import_EVENTS` already carries **TWO** fields for the same fact:

| Field | Its own note | Status |
|---|---|---|
| `import_Style_Key` | *"just get the data in and safe"* | `{.conf}` — treated as built |
| `CU_StatusToken` | *"Raw label text, unmapped"* | `{.tbc}` — to be confirmed |

⭐ **These are one field wearing two names, and the naming tells you which survives.** Every sibling in that block is `import_*` (`import_Name`, `import_dateSTART`, `import_dateEND`, `import_raw_payload`) — the prefix means *raw, as it arrived, not yet trusted*. `CU_StatusToken` sits in an INTEGRATION block beside `cu_TaskID` and uses a different casing convention.

**Recommendation: keep `import_Style_Key`, retire `CU_StatusToken`.** It matches its neighbours, it is already `{.conf}` rather than `{.tbc}`, and the import parser writing all the other `import_*` fields writes this one in the same pass. 🔴 **Two claimants on one value is the defect this file has been caught on repeatedly** — and this one is worse than most, because a parser that fills the *other* one leaves the lookup permanently empty and every event imports unstyled, silently.

⚠️ **Verify against a DDR which one the import script actually populates today** before deleting either. Archive → repoint → delete, never delete first.

⚠️ **`EVENTS::fkStyle`'s note says *"STYLES row, domain event-status"* and the file's domain is `calendar`.** Stale note, from before the rename. Fix it in the same pass.

---

# 🔴 STEP 1 · The import-side lookup (2 fields, 1 TO)

This is the part I skimmed. Written out fully:

```
A.  import_EVENTS::calc_StyleLookup
       type ....... Text, auto-enter calculated value
       formula .... "calendar>" & import_Style_Key
       storage .... stored is fine (same-record)
       ⚠️ leave "Do not replace existing value" UNCHECKED
       ⚠️ BACKFILL if any import rows already exist

B.  New TO:  STYLES_for_IMPORT
       import_EVENTS::calc_StyleLookup  =  STYLES::calc_Key
       Allow creation ...... NO
       ⚠️ its own occurrence — anchor–buoy, do not reuse STYLES_for_EVENTS

C.  import_EVENTS::calc_StyleMatch   (optional but recommended)
       type ....... Calculation, UNSTORED, returns Text
       formula .... STYLES_for_IMPORT::PrimaryKey
       ⭐ this is what the import script reads. Empty = no match = report it.
```

⭐ **Why C is worth the field:** without it the script has to navigate the relationship inline, and an unmatched token looks identical to a matched-but-empty one. A named field makes *"did this row find a style?"* answerable in a table view, which is the only debugging surface an import gets.

**VERIFY:** put `calc_StyleLookup` and `calc_StyleMatch` side by side in the `import_EVENTS` table view. Every row should show a UUID in the second column. **Any blank is a token with no STYLES row.**

---

# 🔴 STEP 2 · Stamp the FK during import (script)

In the existing upsert loop, where each `import_EVENTS` row becomes or updates an `EVENTS` row:

```
Set Variable [ $styleFK ; import_EVENTS::calc_StyleMatch ]

If [ IsEmpty ( $styleFK ) ]
    #  do NOT abort the import. Log and continue.
    Set Variable [ $unmatched ; $unmatched & import_EVENTS::import_Style_Key & ¶ ]
End If

Set Field [ EVENTS::fkStyle ; $styleFK ]
```

Then after the loop:

```
If [ not IsEmpty ( $unmatched ) ]
    #  one UTILITY_LOGS row listing every distinct unmatched token
End If
```

🔴 **The unmatched report is the ONLY defence on this whole path, and it is why the step exists.** A UUID FK makes renames safe for already-imported events — rename `DEADLINE` → `Deadline` and existing rows keep their styling. But the NEXT import finds no row, writes an empty `fkStyle`, and those events render with **no styling at all**. ⚠️ **That is not magenta.** Magenta means *a style was found and its appearance did not resolve*; an empty FK means *no style was ever found*, the relationship is simply empty, and nothing is flagged. **The two failures look nothing alike and only one of them is self-announcing.**

⚠️ **Never abort the import on an unmatched token.** Partial styling is recoverable; a refused import loses the whole batch.

⚠️ **`STYLES` rows must exist BEFORE the first import**, or every event lands unstyled. The legacy file hardcoded status→RGB in a calc, so there was nothing to seed and this failure mode did not exist there.

**VERIFY:** run an import, then check `EVENTS::fkStyle` is populated. Confirm the log row appears when you deliberately misspell a token.

---

# 🔴 STEP 3 · The two theme-key calcs on STYLES (2 fields, serves everything)

```
STYLES::calc_ActiveThemeKey
    type ...... Calculation, UNSTORED, Text
    formula ... GLOBAL_USE::g_pkCurrentTheme & ">" & PrimaryKey

STYLES::calc_DefaultThemeKey
    type ...... Calculation, UNSTORED, Text
    formula ... GLOBAL_USE::g_pkDefaultTheme & ">" & PrimaryKey
```

🔴 **UNSTORED is mandatory, not a preference.** A calc referencing a global cannot be stored or indexed — FileMaker will refuse. ✅ **And that is fine, because these are always the LEFT side of a relationship, and the left side needs no index.** Only the right side (`calc_ThemeStyleKey`, already stored) does.

⭐ **These are the highest-leverage two fields in the build.** They live on the STYLES **base table**, so every occurrence inherits them — `STYLES_for_WORKDAYS`, `STYLES_for_EVENTS`, `STYLES_for_IMPORT`, and anything added later. **Both branches on both chains, from two fields.**

⚠️ **No relationship to `GLOBAL_USE` is required.** A global is readable from any context in a calculation; that is what global storage means. (This is the fork that blocked three relationships in the relationships doc until 08-16.)

**VERIFY:** in the Data Viewer, evaluate `STYLES::calc_ActiveThemeKey` on a month row. It should read `<URITP-uuid>>january-uuid` and **change the moment you edit `g_pkCurrentTheme`.** If it does not change, the global is not truly global.

---

# 🔴 STEP 4 · The WORKDAYS appearance branches (6 TOs)

The WORKDAYS chain currently reaches `STYLES` and stops. Both branches:

```
WORKDAYS (anchor)
  └─ STYLES_for_WORKDAYS                     ✅ exists
       ├─ TXS_ACTIVE_for_WORKDAYS            ⬜ calc_ActiveThemeKey = calc_ThemeStyleKey
       │    ├─ COLOR_ACTIVE_for_WORKDAYS     ⬜ fkColor_Text = THEME_COLORS::PrimaryKey
       │    └─ TYPE_ACTIVE_for_WORKDAYS      ⬜ fkTypography = THEME_TYPOGRAPHY::PrimaryKey
       └─ TXS_DEFAULT_for_WORKDAYS           ⬜ calc_DefaultThemeKey = calc_ThemeStyleKey
            ├─ COLOR_DEFAULT_for_WORKDAYS    ⬜ fkColor_Text = THEME_COLORS::PrimaryKey
            └─ TYPE_DEFAULT_for_WORKDAYS     ⬜ fkTypography = THEME_TYPOGRAPHY::PrimaryKey
```

⚠️ All six `Allow creation` = **NO**. ⚠️ **Write the six rows into `RELATIONSHIPS.tsv` BEFORE building them** — that file is the design step, and written afterwards it is transcription that gets skipped.

⚠️ Six occurrences for two vectors looks heavy and is correct: colour and typography are different tables (×2), active and default are different rows (×2), plus the two parents. **Anchor–buoy forbids sharing them with the EVENTS chain; that duplication is the pattern working.**

**VERIFY:** on a WORKDAYS layout, drop `COLOR_ACTIVE_for_WORKDAYS::Name` and `COLOR_DEFAULT_for_WORKDAYS::Name` as plain fields on the layout temporarily. For an August row under theme URITP you should see `pure-blue` and `august`. **Two different values is the cascade proving itself.**

---

# 🔴 STEP 5 · Mirror it on the EVENTS chain (1 repoint + 3 TOs)

```
REPOINT  THEMES_X_STYLES_for_EVENTS
    from ... fkStyle = STYLES::PrimaryKey
    to ..... STYLES::calc_ActiveThemeKey = calc_ThemeStyleKey

ADD      TXS_DEFAULT_for_EVENTS         calc_DefaultThemeKey = calc_ThemeStyleKey
           ├─ COLOR_DEFAULT_for_EVENTS
           └─ TYPE_DEFAULT_for_EVENTS
```

🔴 **THE FLIP-ORDER TRAP.** `g_pkCurrentTheme` is `URITP`, which covers only 4 of 19 tokens. **The instant you repoint, the other 15 event styles go blank**, because the default branch does not exist yet to catch them. ⚠️ **It reads as "I broke the relationship" when it is actually the first honest answer** — the old `fkStyle`-only match was ignoring the theme entirely and could return the wrong theme's row by found order.

✅ **Safe orders:** set `g_pkCurrentTheme` to `default` first, then repoint, then add the default branch · **or** build all three TOs and the resolve calc in one sitting, then flip the global back to URITP. 🚫 **Never repoint and then go build the default branch afterwards** — that leaves the file visibly broken between two edits, which is exactly when a session gets interrupted.

---

# 🔴 STEP 6 · The resolve calc

One per consumer. The WORKDAYS one:

```
WORKDAYS::calc_MonthLabel_Styled       Calculation, UNSTORED, Text result

Let ( [
    rgb  = If ( not IsEmpty ( COLOR_ACTIVE_for_WORKDAYS::PrimaryKey ) ;
                RGB ( COLOR_ACTIVE_for_WORKDAYS::R ;
                      COLOR_ACTIVE_for_WORKDAYS::G ;
                      COLOR_ACTIVE_for_WORKDAYS::B ) ;
            If ( not IsEmpty ( COLOR_DEFAULT_for_WORKDAYS::PrimaryKey ) ;
                RGB ( COLOR_DEFAULT_for_WORKDAYS::R ;
                      COLOR_DEFAULT_for_WORKDAYS::G ;
                      COLOR_DEFAULT_for_WORKDAYS::B ) ;
                RGB ( 255 ; 0 ; 255 ) ) ) ;

    fnt  = Case ( not IsEmpty ( TYPE_ACTIVE_for_WORKDAYS::Font ) ;
                      TYPE_ACTIVE_for_WORKDAYS::Font ;
                  not IsEmpty ( TYPE_DEFAULT_for_WORKDAYS::Font ) ;
                      TYPE_DEFAULT_for_WORKDAYS::Font ;
                  "Menlo" ) ;

    siz  = Case ( TYPE_ACTIVE_for_WORKDAYS::Size  > 0 ; TYPE_ACTIVE_for_WORKDAYS::Size ;
                  TYPE_DEFAULT_for_WORKDAYS::Size > 0 ; TYPE_DEFAULT_for_WORKDAYS::Size ;
                  9 ) ;

    cse  = Case ( not IsEmpty ( TYPE_ACTIVE_for_WORKDAYS::vl_Case ) ;
                      TYPE_ACTIVE_for_WORKDAYS::vl_Case ;
                  TYPE_DEFAULT_for_WORKDAYS::vl_Case ) ;

    lbl  = STYLES_for_WORKDAYS::vl_Label ;
    lbl  = Case ( cse = "UpperCase" ; Upper ( lbl ) ;
                  cse = "LowerCase" ; Lower ( lbl ) ;
                  cse = "TitleCase" ; Proper ( lbl ) ;
                  lbl )
] ;
    TextColor ( TextFont ( TextSize ( lbl ; siz ) ; fnt ) ; rgb )
)
```

🔴 **Test emptiness on `PrimaryKey`, never on the value.** `IsEmpty ( ::R )` is TRUE when R is legitimately `0` — which is `january`'s red channel (`0000C5`) and every pure colour in the table. **Testing the value would make black and pure-blue fall through to magenta.** This is the single easiest way to get this calc wrong.

🔴 **Four independent coalesces, one per property.** Never one row-level `If` — the URITP DEADLINE row overrides colour *and* typography while the month rows override colour only, so a row-level test loses the inherited half.

⚠️ **Case is applied here, not by conditional formatting** — CF provably cannot set case. ⚠️ **`SmallCaps` has no FileMaker text function**, so the `display` row's value silently does nothing on this path; it needs a real font variant. Untested.

⚠️ **The literal fallbacks (`"Menlo"`, `9`) are a judgement call.** They only fire if the default theme is incomplete, which should be impossible — so arguably they should be conspicuous garbage instead. **Left readable deliberately: a print that comes out ugly-but-legible beats one that comes out unreadable**, and magenta already covers the colour vector loudly.

✅ The EVENTS twin is identical with `EVENTS::Name` in place of `vl_Label` and the `*_for_EVENTS` occurrences.

**VERIFY:** Data Viewer, on an August WORKDAYS row, theme URITP. Expect pure-blue Menlo 9 bold uppercase. Then set `g_pkCurrentTheme` to `default` — **the same field should go dark blue.**

---

# 🔴 STEP 7 · Put it on the layout

1. On `print | Calendar`, the month header object currently displays a date field or a literal. **Swap it to `calc_MonthLabel_Styled`.**
2. ⚠️ **Turn OFF any local formatting on that object.** A font or colour set on the object itself wins over `TextColor ( )` in some render paths — the object must be visually neutral so the data does all the work.
3. ⚠️ **The object must be big enough for the largest theme's type**, or a 22pt override clips silently in print with no error.
4. Same for the event name object with the EVENTS resolve calc.

**VERIFY:** Preview mode, not Browse. 🔴 **Then actually make a PDF** — print rendering and screen rendering are different code paths, and this whole model exists to produce paper.

---

# 🔴 STEP 8 · The startup script

```
00App_onFirstWindowOpen  (or a SET · Theme From Context subscript it calls)

  1. g_pkCurrentOrg      ← stored preference, else the only ORGANIZATIONS record
  2. g_pkDefaultTheme    ← ORGANIZATIONS::fkDefaultTheme        ⭐ FLOOR FIRST
  3. g_pkCurrentProduction ← last used, or the user picks
  4. g_pkCurrentTheme    ← PRODUCTIONS::fkProducer → PRODUCERS::fkTheme
                            if empty → g_pkDefaultTheme
  5. GUARD: either theme global still empty → dialog + halt
```

🔴 **Step 5 is not optional.** A global holds nothing until something sets it, so an empty `g_pkDefaultTheme` prints the entire file magenta. **That is the one real advantage the record-based design had: a stored fact cannot be unset by opening the file.** The floor is now a startup obligation and needs a guard, not trust.

⚠️ **A production switch IS a theme switch.** Step 4 must be its own subscript, called from open AND from the production picker. 🚫 Never duplicate the walk.

⚠️ Until this exists, the globals are hand-set, and that is fine for testing. **After it exists, hand-setting `g_pkCurrentTheme` is a debugging action, not configuration.**

---

# 🔴 STEP 9 · Leave one row genuinely EMPTY

Three of the four URITP rows set `fkTypography` = `body` rather than leaving it blank. ⭐ **A restated default is indistinguishable from an override, so those rows will never exercise the inherit path** — the coalesce could be completely broken and they would still look right.

**Blank `fkTypography` on at least one URITP row and confirm it still renders in the default's typography.** That is the only test that proves inheritance rather than coincidence.

---

## Dependency order, one line

```
0 claimant → 1 lookup → 2 stamp → 3 theme calcs → 4 WORKDAYS TOs
  → 5 EVENTS TOs → 6 resolve calc → 7 layout → PDF → 8 script → 9 inherit test
```

⭐ **Steps 3 + 4 + 6 + 7 alone get a styled month header onto paper.** 0–2 are the event half; 8–9 are correctness. **If the goal today is one printed page, do 3, 4, 6, 7 and stop.**

Related: [[Theme Selection](@theme-selection)] · [[Theme Resolution](@theme-resolution)] · [[Theme State](@theme-state)] · [[Relationships](@relationships)]
