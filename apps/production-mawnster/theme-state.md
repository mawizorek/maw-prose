---
id: theme-state
title: Theme State (observed)
type: reference
status: public
order: 18
nav: collapsed
revised: 2026-08-16
summary: The colour chain RESOLVES END TO END and renders on the print layout. What is built, what the remaining work is, and the two bugs that cost the afternoon.
---

# Theme state — observed 2026-08-16

> 🔴 **EVIDENCE, not plan.** Read off the running file. Mechanism → [[Theme Resolution](@theme-resolution)]; **this** page is record- and schema-level truth and where they disagree, this one is newer.
>
> ⚠️ **A SNAPSHOT.** It went stale three times inside one hour on 08-16. Re-read before acting.

## ✅ THE COLOUR CHAIN WORKS — 14:00 ET, 2026-08-16

**Month-token colour resolves end to end and renders on `print | Calendar`.** Date headers print in their month's colour, from data, with no hardcoding on the layout. **First proof that the whole model delivers.**

Every hop verified by eye in a table view:

```
WORKDAYS::Date               8/8/2026
  → StyleJoin_auto          "monthLabel>august"          ✅
  → STYLES_for_WORKDAYS     the august token row         ✅
  → calc_ActiveThemeKey     "8B833BAF…>007629BE…"        ✅
  → TXS_for_curr_WORKDAYS   ::fkColor_Text = 3E37CF9C…   ✅
  → THEME_COLORS_for_curr   ::Name = "august"            ✅
  → TextColor( … RGB(R;G;B) )   renders on the page      ✅
```

## 🔴 The two bugs that cost the afternoon — both silent, both invisible to a DDR

### 1. Delimiter mismatch: `.` vs `>`

```
calc_ActiveThemeKey   =  g_pkCurrentTheme & "." & PrimaryKey    ← built from a stale doc
calc_ThemeStyleKey    =  fkTheme & ">" & fkStyle                ← the file's real delimiter
```

**Never matched. Symptom: every date header printed BLACK**, because `RGB ( 0 ; 0 ; 0 )` is what an empty relationship yields. 🔴 **That is the exact silent-black failure magenta was designed to catch, and magenta could not catch it** — the fallback lives *inside* the calc, so a join that returns nothing never reaches it. ⭐ **A bug detector downstream of the break cannot see the break.**

⚠️ **Cause was a stale doc**: an early revision of `theme-resolution.md` specced `"."` before the file's `">"` was observed. **The doc was corrected; the field built from it was not.** Correcting a document does not correct what was already built from it.

### 2. Globals held NAMES, not keys

`g_pkCurrentTheme` held `"default"` while `fkTheme` holds a UUID, so the composite could never match. 🔴 **Third instance in one day of a prefix making a false type claim** (`g_pk…` promising a key, `EVENTS::fkStyle` promising an FK). ✅ Fixed: globals now hold UUIDs, with a pop-up display override so they stay human-readable on screen.

⭐ **The debugging method that actually found both:** put each hop's raw value on a layout as a plain field, side by side, and read across. The first blank column is the broken hop. **Two blank columns plus one populated key column localised it in one pass.**

## ⭐ Size is layout, everything else is data (ruled 14:20)

Full reasoning → [[Vector Grain](@theme-vector-grain)]. **Colour, font, bold, italic and case stay DATA. Only SIZE moves to the layout object.** Omit `TextSize ( )` and the object's own point size governs while `TextFont` / `TextStyleAdd` still apply, so **ONE calculation field serves every surface.**

🪦 **The `surface` domain is withdrawn** (PR #145's model). 🪦 So is a global `surface` — impossible, since `print | Calendar` renders two typography roles at once.

⚠️ `THEME_TYPOGRAPHY::Size` becomes **spec, not render** — keep the field, comment it, do not delete it.

## 🔴 Object calcs are a HACK — use real fields

The styled text was prototyped as **button-bar calculations** (`Action: Do Nothing`), which is the only native way to put an expression on a layout without a field.

🚫 **Not shippable.** A button bar is a click target, it is **invisible to the DDR** so it cannot be audited or documented, no script or export can read it, and it cannot be reused on a second layout. ✅ **The resolve calc references only related data from `WORKDAYS` context, so a real unstored calculation field behaves identically and is placeable.** Result must be **Text** or formatting is stripped.

## The tables

```
STYLES               19 rows   ✅  calendar ×7 · monthLabel ×12
THEME_COLORS         23 rows   ✅  11 semantic + 12 month
THEME_TYPOGRAPHY      4 rows   ✅  display · cal-month-portal-header · body · meta
THEMES                3 rows   ✅  default(90) · URITP(20) · database(80)
THEMES_x_STYLES      22 rows   ✅  18 default + 4 URITP (sparse, by design)
```

✅ **Keys and graph, all confirmed live:**

```
STYLES::calc_Key              = vl_Domain &">"& vl_Label        stored, indexed
STYLES::calc_ActiveThemeKey   = g_pkCurrentTheme &">"& PrimaryKey   Calculation, unstored
STYLES::calc_DefaultThemeKey  = g_pkDefaultTheme &">"& PrimaryKey   Calculation, unstored
WORKDAYS::StyleJoin_auto      = "monthLabel>" & Lower(MonthName(Date))
THEMES_x_STYLES::calc_ThemeStyleKey = fkTheme &">"& fkStyle    Calculation, INDEXED
EVENTS::autoKey_StyleLookup   = "calendar>" & <the imported token>
```

✅ **An UNSTORED calculation IS usable as a relationship's left side** — verified live. Only the right side needs storage and an index. `calc_ThemeStyleKey` is indexed and correct.

✅ `LineWeight` deleted · the nameless fifth `THEME_TYPOGRAPHY` record deleted · month `LegendText` populated (`JAN`…`DEC`) · `BLACK` given `--`.

⚠️ **`fkColor_Fill` is empty on all 22 rows and fill is DEMOTED, not missing.** Fill is a CELL concern and text colour is a TEXT concern; the one token that wants a real fill (`BLACK`) needs a whole-cell treatment via the emphasis path. **Exclude it from any completeness test** or that test reports false failures forever. 🔴 **Consequently the CF capability test is OFF the critical path** — it was load-bearing only for fill, and text/typography are now proven by a rendered page rather than by a pending test.

## 🔴 The domains in the FILE are `calendar` and `monthLabel`

`STYLES.md` says `month` · `event-status` · `watermark` · `emphasis` — **stale.** `watermark`, `emphasis` and `base` do not exist; `event-status` was renamed `calendar` with no doc following.

⭐ **THE GOVERNING LESSON: the DATA is the truth and the table doc is a CLAIM.** On 08-16 an agent read `STYLES.md`, found `month`, and *corrected Michael away from* `monthLabel` — the string actually in his file. **A domain string is half of a join predicate**, so acting on the stale doc would have produced twelve tokens resolving to nothing.

🔴 `STYLES.md` also specs a **`MonthNum` field that does not exist** and describes STYLES as a colour table holding `Hex` + R/G/B, contradicting the identity-only model. **It documents a superseded design.**

## Remaining work

- ⬜ **Typography still reads `_for_EVENTS`** in the date calc, so the month header apes the top portal event's font. Repoint to `THEME_TYPOGRAPHY_for_curr_WORKDAYS`.
- ⬜ **`~italic` / `~bold` / `~underline` are declared in the `Let` and never used in the output** — so `cal-month-portal-header`'s bold is computed and thrown away.
- ⬜ **Convert the button-bar calcs to real calculation fields.**
- ⬜ **The DEFAULT branch is not built on WORKDAYS** — only `_for_curr_*`. Until it exists there is no inherit path and a sparse theme renders nothing. 🔴 **Build it before adding more URITP rows.**
- ⬜ **`THEMES_X_STYLES_for_EVENTS` has no theme predicate**, so two rows qualify and found order picks. ⚠️ **Flip-order trap:** repointing while `g_pkCurrentTheme` covers only 4 of 19 tokens blanks the rest.
- ⬜ **Rename `EVENTS::fkStyle` → `styleToken`** — it holds raw token text, not a key. 🚫 Fix-queue item 11's `ovr_fkStyle` is withdrawn: wrong on both halves.
- ⬜ **Two claimants on the raw token** in `import_EVENTS`: `import_Style_Key` and `CU_StatusToken`.
- ⬜ **The unmatched-token report** — the only defence against a ClickUp status rename landing events unstyled. 🔴 Unstyled ≠ magenta: an empty FK is silent.
- ⬜ **The startup script** to set the two theme globals, with a guard.
- ⬜ **Leave one URITP row's `fkTypography` genuinely EMPTY** — three of four restate `body`, and a restated default never exercises the inherit path.
- ⬜ **`ORGANIZATIONS` singular/plural** — settle before a script names it.

Related: [[Vector Grain](@theme-vector-grain)] · [[Theme Build Order](@theme-build-order)] · [[Event Styling](@theme-event-styling)] · [[Theme Selection](@theme-selection)] · [[Theme Resolution](@theme-resolution)]
