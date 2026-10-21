---
id: layout-theme-rendering
title: Layout Theme Renderinng
type: reference
status: public
order: 51
revised: Aug 2026
summary: How MAW thinks themes and styles get applied to object.
---

# The Conditional-Formatting Capability Test

!!! abstract "Grain"
    How MAW thinks themes and styles get applied to objects.

## When 'defining' a new themes and styles

Themes define the overall aesthetic. It overwrite the "default" theme values set by MAW.

!!! note "Defining the 'default' theme
    It is essential that *all* styles, have an establish join to the default theme. The style will *never* render until it has at least (1) theme join.

- Therefore, define **new** styles from *from within* parent themes. Must have a theme known at inception of new style to amen the join at creation. Fallback to established default could be available.

## When on a layout

- Place objects on a layout - as calc fields?

## Defined via *Field Definitionas*

- RGB to HEX calculations
- 

## Defined via *Relationships*












<!---
🔴 **This has been listed as the next move since 2026-08-09 and has never been run.** Everything in the theme family — [STYLES]{.rel}, [THEMES_x_STYLES]{.rel}, [THEME_COLORS]{.rel}, [THEME_TYPOGRAPHY]{.rel}, the [ORGANIZATION]{.rel} → [PRODUCERS]{.rel} cascade, the magenta bug-detector — is built on one unverified assumption.

---

## 🔴 The assumption is stated on the wrong axis, and that is the finding

The handoff records the claim as: *conditional formatting **can** set fill, text colour, bold, italic, underline, font, size; it **cannot** set padding, margins, line height, case.*

**Every word of that is about WHICH PROPERTIES can be formatted. The theme model does not need that answer.** It needs a different one:

> **Can a conditional-formatting rule take its COLOUR VALUE from a field, at render time?**

Those are two different questions and the capability list answers only the first. **A model can pass the stated test completely and still be unbuildable.**

### ⚠️ What I expect the answer to be, stated before the test so it can be wrong

FileMaker's conditional formatting dialog takes a **condition** (a calculation, which absolutely may reference a related unstored calc) and then applies a **format chosen at design time from a colour picker**. There is no calculated-colour input. {.tbc}

**If that holds, the consequence is severe and specific:** `THEME_COLORS::calc_Hex` can never paint anything through conditional formatting. The chain resolves a hex, and there is nowhere to put it.

🚫 **I am not ruling on this from memory, which is the whole reason this page exists.** [The claim is marked unverified]{.tbc} and the test below is built to distinguish the two outcomes in one pass rather than to confirm what I think.

---

## The test

**Ten minutes. A throwaway layout, deleted afterward.** Do not build it on a real layout — house rule 8, and this layout is going to be ugly.

### Setup

1. New layout on any table with a live [THEMES_x_STYLES]{.rel} path. Name it `zTEST · CF` so it sorts to the bottom and is obviously disposable.
2. Put **one** text object on it carrying a literal word, e.g. `SAMPLE`.
3. Confirm a related unstored calc actually resolves on this layout before testing anything else — put `THEME_COLORS::calc_Hex` on the layout as a plain field and **read it with your eyes.** ⚠️ If it is empty, stop: the relationship is the problem, not conditional formatting, and the rest of the test would blame the wrong thing.

### T1 · Does the CONDITION see related data?

Conditional formatting → new condition → **Formula is** → `not IsEmpty ( THEMES_x_STYLES::fkColor_Fill )` → set any bold.

- ✅ Bold appears → conditions can read the chain. Expected to pass.
- 🚫 No bold → the whole model is dead here and nothing below matters.

### T2 · 🔴 THE DECIDING TEST · Can the FORMAT come from data?

In the same dialog, look at the **Fill Color** control.

- **If it offers a formula / calculated option:** the model works as designed. Bind it to `THEME_COLORS::calc_Hex`, confirm the swatch changes when `g_currentTheme` changes, and stop reading.
- **If it is a swatch picker only:** ⭐ **the model needs restating, not repairing.** See the fallbacks below.

**Write down which one you saw.** This single observation is the most load-bearing fact in the app and it currently exists nowhere.

### T3 · Theme switching

With whatever mechanism T2 allows, change [g_currentTheme]{.global} and confirm the object repaints **without a script and without a refresh.** An unstored related calc should re-evaluate on its own. ⚠️ If it needs a `Refresh Window [Flush cached join results]`, that is a real cost on every theme change and belongs in the docs.

### T4 · The 11×17 redraw cost

Duplicate the object to **~60 copies** — roughly one printed calendar page of styled cells — each carrying the same conditional formatting. Switch theme. **Time it with a stopwatch, on the iPad, not the desktop.**

This is the question nobody has asked and it is the one that decides whether the model is usable rather than merely correct. Sixty unstored related calcs re-evaluating on a tablet is a real number, and it is better to learn it now than on a print deadline.

---

## 🔧 If T2 says the format is static

**The model is not wrong; its mechanism is.** Three routes, in the order I would take them.

### A · One CF rule per COLOUR, not per token

A layout object gets N conditional-formatting rules, each hardcoding one swatch, each condition asking *is my resolved colour THIS one?*

```
Condition:  THEME_COLORS::Name = "green"     → fill: [green swatch]
Condition:  THEME_COLORS::Name = "amber"     → fill: [amber swatch]
...
```

⭐ **This keeps every good property of the design and moves only the last inch.** `STYLES` stays token identity, `THEMES_x_STYLES` stays the appearance join, the cascade and the magenta detector all survive untouched — **the resolution still happens in data, and only the final paint is enumerated.**

⚠️ **The cost is real and it is a hard ceiling: adding a colour means editing every styled object on every layout.** So the palette must be small and closed, and that is a design decision to make ON PURPOSE rather than discover at colour twelve.

### B · Object states instead of colours

If the token count is smaller than the colour count, invert it: a rule per [vl_Label]{.field} rather than per colour. Fewer rules, but the theme table stops driving anything and themes become a design-time concept. **Cheaper and it gives up the feature.**

### C · Web viewer for the calendar grid

Full control, real CSS, the theme tables drive it properly. **And it is a different app** — no field entry, no tap targets, no found-set behaviour. 🚫 Not recommended for the interactive iPad surface Michael actually uses; **plausible for PRINT only**, where interactivity is already gone. Raise it as a fork, do not adopt it quietly.

---

## ⭐ Why this page exists at all

The assumption was reasonable and it was written down honestly as unverified. **What went wrong is that it was written down on the wrong axis** — *which properties can be formatted* instead of *where the format value comes from* — and a wrong-axis question passes its own test.

Same family as [the default that is also a real value](@script:script-util-run-end): **a check that cannot return the answer you do not want has verified nothing.** Confirming that conditional formatting can set a fill colour would have felt like a green light and answered a question nobody was asking.

🔴 **Run it before the next relationship is drawn.** The file has [0 layouts]{.tbc} and [0 relationships]{.gap} as of the last DDR, which means the answer is currently free. It stops being free the moment the graph binds and a styled object exists in more than one place.

## Unverified

- Whether the Fill Color control accepts a calculation. {.tbc} **The entire page turns on this and it is one dialog away.**
- Whether an unstored related calc repaints on a global change without an explicit refresh. {.tbc}
- The 60-object redraw time on iPad. {.gap} Never measured, and the print layout will carry far more than 60.
- Whether `THEME_COLORS::calc_Hex` returns anything at all — it is [typed Number and cannot hold letters]{.gap}, fix-queue item 1, and its calc body is still a stub. ⚠️ **Fix that before running this test or T2 will fail for the wrong reason.**

--->
