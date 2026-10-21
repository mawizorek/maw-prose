---
id: print-geometry
title: Print & iPad Geometry
type: reference
status: public
order: 26
revised: 2026-08
summary: Design at letter geometry, because the iPad IS roughly a piece of paper. One layout serves screen and print — until it hits a portal.
---

# Print & iPad geometry

**The PDF is the product.** `PRINT_PRESETS` · `PRINT_SESSIONS` · `PRINT_SETS` · `PRINT_SET_ITEMS` are in the schema before a single layout exists, and the whole [[Projection Law](@projection-law)] layer is generated in order to be *rendered*. So print is not a feature bolted on at the end; it is the output the app exists to produce.

Michael, 2026-08-08: *"design it well for an ipad the size of a piece of paper."* That instinct is dimensionally correct, and it is checkable.

## The measurement

13-inch iPad Pro display is **2752 × 2064 px at 264 ppi** (Apple spec) → **10.42″ × 7.82″** in portrait.

| | US Letter | 13″ iPad screen | ratio |
|---|---|---|---|
| width | 8.5″ | 7.82″ | **92%** |
| height | 11″ | 10.42″ | **95%** |
| aspect (w/h) | 0.773 | 0.750 | letter is slightly wider |

**A letter page fit to that screen's width renders at ~92% of physical size and clears the height with room to spare.** Accurate to within 8%. Designing at letter geometry is therefore not a compromise for the screen — on the primary surface it is close to 1:1.

## One layout CAN serve both — two first-party mechanisms

**1. Hide when printing.** Inspector → **Position** tab → **Sliding & Visibility** → Object visibility. Non-printing objects are visible in Browse and Layout modes but **not in Preview or when printed** ([Preventing objects from printing](https://help.claris.com/en/pro-help/content/preventing-objects-from-printing.html)). Navigation, buttons and on-screen hints can live on the printed layout and evaporate on output.

**2. `Get ( WindowMode )`** for a conditional Hide: `0` Browse · `1` Find · `2` Preview · `3` printing in progress · `4` Data Viewer while in Layout mode ([first-party](https://help.claris.com/en/pro-help/content/get-windowmode.html)).

🪤 **The gotcha that bites everyone once:** a Hide condition of bare `Get ( WindowMode )` is **inverted**, because Browse returns `0` and `0` is false — so it hides the object in every mode *except* Browse. Write `Get ( WindowMode ) = 0`, or `not Get ( WindowMode )`.

## Two mechanisms, two surfaces — do not confuse them

Both change an object's height, which is why they feel like one feature. They are not.

| | Anchoring (auto-resize) | Sliding |
|---|---|---|
| Responds to | the **window** size | the **content** |
| Works in | Browse — the iPad | Preview / print / PDF only |
| Direction | grows and shrinks | **shrinks only** |

Vertical anchoring does nothing on paper: a page has no window to grow into, and Claris notes only the *horizontal* auto-resize settings apply in Preview and printing ([auto-resize options](https://help.claris.com/en/pro-help/content/auto-resize-options.html)).

> **Anchoring is the screen tool. Sliding is the paper tool.**

## 🚫 Where "one layout for both" stops being true

**1. Hiding an object leaves its hole.** Claris's own note: to close the blank space you must set sliding on that object *and every object below it*. Print output is not screen output minus chrome; it is screen output **compressed**, and compression is a separate pass of work.

**2. Sliding applies only in Preview and print, never in Browse — and it is vertical-only.** So the iPad view is genuinely NOT what prints. Design at page geometry, then **check Preview mode as a distinct step**; it is the only honest proof.

**3. A portal never grows.** Whatever row count you draw is the permanent ceiling — a 6-row portal over 40 events prints 6. **Draw for tech week, not for an average week:** busy weeks cost nothing extra, quiet weeks give the space back.

## ⭐ The self-sizing week grid (Michael, 2026-08-08)

🔧 **Correction, logged because the wrong version was briefly written here.** *"A field inside a portal row cannot shrink"* is TRUE — row height is fixed. *"A portal cannot shrink"* is **FALSE**. Claris: *"You can slide any object, **including fields, portals**, other objects, and even layout parts"* ([Removing blank spaces in printouts](https://help.claris.com/en/pro-help/content/removing-blank-spaces.html)).

So the calendar day cell **can** be a portal, and the design is:

> **Draw ~10 slots per day. Turn sliding on. Each week row collapses to its busiest day.**

*Also resize enclosing part* shrinks a part to its **tallest remaining object**, and seven day-portals sit side by side in one week row — so the row's printed height is set by the heaviest day that week. A week topping out at 3 events collapses hard; tech week prints at full depth. One layout, self-sizing per week, no scripting.

### ✅ Build checklist — the failure mode is forgetting one of these

- [ ] All **seven** day portals set to slide up + **also resize enclosing part**. Six out of seven pins the row open.
- [ ] **Every object below the portals** slides too — rules, labels, footers. Anything that does not slide blocks the collapse.
- [ ] 🚫 **No rectangle as the day-cell border.** Non-field objects *slide* but never *shrink*, so a box drawn for 10 rows keeps its height on a collapsed week and breaks the grid. Use the portal's own row borders or alternating fill, or a bottom rule set to slide.
- [ ] Draw the slot count for **tech week**.
- [ ] Overflow past the last slot uses the displaced-event treatment: visible, marked, **and carrying its own date in its label** (see the Decision Log, J17).
- [ ] Check it in **Preview**, not Browse. Browse will never show the collapse.

### 🔴 Test this BEFORE building all seven columns

**An empty sliding portal is documented as corrupting `Save/Send Records as PDF`** — with slide + resize enclosing part, a record whose portal is empty produces a PDF where the object *below* the portal does not render at all. Print-to-PDF is reportedly unaffected; only Save/Send ([thread](https://community.claris.com/en/s/question/0D50H00006ezK6HSAU/pdf-with-an-empty-sliding-portal-is-corrupted)).

This app has **empty days by design** (dark Mondays, hidden days per the emphasis rules), and `PRINT_SESSIONS` exists to log PDF output, so Save/Send is the intended path rather than an edge case.

**Test:** one week containing a fully empty day → export → confirm nothing vanishes. If it reproduces, a hidden single space in the day cell keeps the portal from ever being truly empty.

## The rule

> **Design at letter geometry. Hub layouts are dual-purpose, with chrome set to hide when printing. A portal is fine on paper as long as sliding is on and the drawn row count is the real ceiling.**

Screen-only chrome *hides*; screen-only *space* has to *slide*.

⚠️ A list that must print **every** record regardless of count still wants a body part per record rather than a portal — that constraint has not changed, it just does not apply to a fixed-slot calendar cell.

## ⬜ To verify

- **Portal + Hide when printing.** An FMP13-era report has *Hide when printing* being ignored inside portal rows in Preview ([thread](https://community.claris.com/en/s/question/0D50H00006h8ujMSAQ/object-visibility-in-fmp-13)). Old, possibly long fixed — but worth one test in FMP 26 given how portal-heavy this app is.
- Whether the screen layout keeps 6 slots or matches print's 10. Screen has no sliding, so 10 fixed rows on a light week is dead space on the iPad; different counts on the two layouts is legitimate because they are different layouts.
- Whether any of this generalizes into the **FileMaker Canonical Object Library** as a fleet-wide pattern rather than a MAWster one. Likely yes; that is Fiona's call, not this doc's.
