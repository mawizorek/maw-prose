---
id: menu-tables
title: Tables
type: page
status: unlisted
chrome: app
revised: Sep 2026
summary: "Every table page, grouped as the app groups them. Pick one to open it."
hide:
  - navigation
  - toc
  - footer
---

# Tables {.align-center}

[← Database](@menu-database)

⭐ **Passive by design.** This page states nothing about any table. It is a list
of doors. The grouping follows `20-tables/INDEX.tsv`; the narrative version, with
the design notes and the open questions, is [[Tables](@tables)].

## Normalized

!!! cards cols=1 style=rows
    - @table-producers
    - @table-roles
    - @table-productions
    - @table-production-calendars
    - @table-weeks
    - @table-workdays
    - @table-standard-events
    - @table-location-types
    - @table-organizations

## Working data

!!! cards cols=1 style=rows
    - @table-events
    - @table-events-workday
    - @table-calendar-emphasis
    - @table-assignments
    - @table-editions
    - @table-versions
    - @table-locations

## Styling

!!! cards cols=1 style=rows
    - @table-styles
    - @table-themes
    - @table-themes_x_styles
    - @table-colors
    - @table-typography

## Import

!!! cards cols=1 style=rows
    - @table-import-sessions
    - @table-import-sources
    - @table-import-events

## Export

!!! cards cols=1 style=rows
    - @table-print-sessions
    - @table-export-presets
    - @table-print-sets
    - @table-print-set-items

## External data sources

!!! cards cols=1 style=rows
    - @table-fiscal-years
    - @table-people

## Globals and utility

!!! cards cols=1 style=rows
    - @table-global-use
    - @table-global-export
    - @table-utility-reports
    - @table-utility-logs
    - @table-utility_logs

## Essentially value lists

!!! cards cols=1 style=rows
    - @table-value-lists
    - @table-values

<p><br/></p>

---

## What this list could not reach, and why

Written down rather than quietly dropped, because a menu missing a door looks
like the table does not exist.

???+ warning "🔴 One defect still open in `20-tables/`"
    **`table-colors` is claimed TWICE.** Both `COLORS.md` and `theme_colors.md`
    declare `id: table-colors`. One id cannot address two pages, so **one of them
    is unreachable by `@id` and this menu can only hold one row for the pair.**

    **They are not duplicates.** `COLORS.tsv` has **stored** `R`/`G`/`B` Numbers,
    a `probablyCalcAHex?` open question and a `< STYLES` child.
    `THEME_COLORS.tsv` has `R`/`G`/`B` as **unstored** `HexToRGB` calcs plus
    `calc_Hex`. ⭐ Two designs of one idea, one of them superseded — and
    `INDEX.tsv` lists `THEME_COLORS` as `{.conf}` while **plain `COLORS` is not
    in the catalog at all.** 🚫 Which file dies is not guessable from the files.

??? tip "✅ Three defects this menu surfaced and fixed, 2026-09-30"
    1. **`theme_typography.md` carried `id: table-typogrpahy`.** Misspelled, and
       the only reference to it anywhere in the repo was its own declaration, so
       the rename to `table-typography` was free. Fixed in the same commit as the
       row above that points at it.
    2. **`@table-print-presets` was DEAD on [[Tables](@tables)].**
       `EXPORT_PRESETS.md` carries `id: table-export-presets`. Repointed. ⭐ The
       rest of the `table-print-*` family is fine — `EXPORT_SESSIONS`,
       `EXPORT_SETS` and `EXPORT_SET_ITEMS` kept their old PRINT ids when the
       files were renamed to EXPORT. **Only PRESETS drifted on both sides at
       once.**
    3. **`theme_colors.md` and `theme_typography.md` both had the H1 `# Styles`**,
       inherited from `STYLES.md` by duplication. Corrected. ⚠️ Their Grain
       blocks and commented bodies are STILL STYLES' text and are flagged in
       place.

??? tip "Two near-collisions that are NOT bugs, and one typo that is"
    `table-utility-logs` (`utility_logs.md`) and `table-utility_logs`
    (`utility_logmaw.md`) differ by one character and are genuinely two pages —
    the second is the `-maw` variant. Both are listed. ⚠️ **Hyphen versus
    underscore is a terrible seam to leave on purpose**, so if either is ever
    renamed, rename both.

    ⚠️ **`themes..md`** — double dot in the filename. Renders today, and it is a
    typo waiting to break a relative link.

??? tip "Named in INDEX.tsv with no page yet"
    `STYLE_VALUES` and `auto_LAYOUTS` appear in the catalog and have no `.md`, so
    they have no door. Not an error — the catalog is the plan, pages follow.
