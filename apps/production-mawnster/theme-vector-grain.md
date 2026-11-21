---
id: theme-vector-grain
title: Vector Grain (what is data, what is layout)
type: reference
status: public
order: 22
nav: collapsed
revised: 2026-08-16
summary: SIZE is the only typography property that varies by surface. Strip it to the layout object; colour, font, bold, italic and case all stay data. One placeable field serves every surface.
---

# Vector grain

> Michael, 2026-08-16: *"an agenda view workday header would be a very different font size than the calendar view day-portal view — how do we handle both?"* → then, after three worse answers: *"what if SIZE was stripped down to per layout but the rest of typography applied regardless of surface?"*

## ⭐ THE RULING · SIZE is the only property that belongs to the surface

```
DATA  (themeable, in-app editable, joins from STYLES)
   colour ....... varies by month / status / theme
   font family .. semantic. a month header is Menlo everywhere
   bold ......... semantic
   italic ....... semantic
   case ......... semantic

LAYOUT  (the object's own formatting)
   SIZE ......... the ONLY one that changes because of WHERE it is printed
```

⭐ **Everything except size is semantic — it describes what the thing IS.** A month header is uppercase Menlo bold in the grid, on the agenda, and on a wall poster. It is only **bigger** on the agenda. **Size is the one axis that is genuinely about the surface, and it is the one that was forcing every other property to be duplicated per surface.**

✅ **And FileMaker cooperates: omit `TextSize ( )` and the layout object's own point size governs**, while `TextFont ( )` and `TextStyleAdd ( )` still apply from data. They are independent formatting runs on the same text.

```
TextColor (
   TextFont ( TextStyleAdd ( ~text ; ~case ) ; ~font ) ;
   RGB ( ~r ; ~g ; ~b )
)
```

⭐ **Result: ONE calculation field, placeable on every layout.** The grid object is set to 9pt, the agenda object to 22pt, and both render Menlo bold uppercase in august blue. Typography stays user-editable per theme.

## 🪦 SUPERSEDED · the `surface` domain

An earlier revision of this page (PR #145) ruled that typography resolves from a **second token** — `surface>cal-day-header`, `surface>agenda-day-header` — as a fourth `vl_Domain`.

🚫 **Withdrawn. Do not build the `surface` domain.** It solved the right problem (a token matrix of 12 months × N surfaces) at the wrong layer, and it still cost **one resolve calc field per surface** plus a STYLES row and a `THEMES_x_STYLES` row per surface per theme.

⭐ **The size-only split gets the same outcome for nothing:** no new domain, no new tokens, no per-surface fields, no per-surface rows. **It is strictly cheaper and it is strictly simpler**, and the reason is that it cut along the axis where the variation actually was.

🪦 Also dead, recorded so they are not re-proposed:

- **A global `surface`.** 🔴 Provably impossible: `print | Calendar` renders **two surfaces at once** — the month header and the event names inside the portal are different typography roles on the same page in the same pass. One global cannot be two values. (Michael reached this himself mid-riff.)
- **A token per month per surface.** 12 × 4 = 48 rows per theme with 36 duplicated colours; recolouring August becomes a four-row edit that can drift. **The exact failure the object library exists to prevent.**
- **Moving typography entirely into FileMaker theme styles.** Native and clean, but it takes typography out of the data, so a theme could recolour and never restyle. Rejected because Michael wanted it in-app editable — correctly, since that is what makes it a THEME rather than a palette.

## What `THEME_TYPOGRAPHY::Size` becomes

⚠️ **SPEC, not render.** The number a human reads while sizing a layout object — the same role hex plays for colour (hex is for export and human eyes, `R`/`G`/`B` is what the layout eats).

🔴 **DO NOT DELETE THE FIELD.** It is populated, it is genuinely useful, and it is the only written record of what size a role is supposed to be. ⚠️ **But an unused field that looks used is exactly the defect this app keeps getting bitten by** (`LineWeight`, `fkColor_Fill`, `enter_Hex`) — so it must SAY it is spec, in its own field comment, or someone wires `TextSize ( )` back in and re-breaks the surface split.

✅ The `LineWeight` precedent does **not** apply: that rule is *never build a container nothing can fill*, and `Size` is filled with real values that do real work. **The test is whether the field has content and purpose, not whether the RENDER reads it.**

## ⚠️ The cost, stated plainly

**A font swap changes width at a fixed size.** Georgia 9pt is wider than Menlo 9pt, so a theme change can overflow a cell that a font change never used to touch. ✅ Accepted by Michael. Mitigation is generous object sizing, not a mechanism.

⚠️ **A theme cannot change scale.** URITP can make the agenda serif and italic; it cannot make it 30% larger. If that ever becomes a real requirement, the answer is a per-surface resolve field on **that one surface** — which is now an additive, local change rather than an architecture.

## Related

[[Theme Resolution](@theme-resolution)] · [[Theme Selection](@theme-selection)] · [[Theme State](@theme-state)] · [[Event Styling](@theme-event-styling)] · [[Theme Build Order](@theme-build-order)]
