# 10_UI__Set_Hub_Tab

*🥇 GOLDEN. The only script that came through the June 2026 audit unscathed, because it does exactly one thing. Verified 2026-07-31.*

Copy text: [`10_UI__Set_Hub_Tab.fmscript`](10_UI__Set_Hub_Tab.fmscript)

## The rule that keeps it useful

**No data mutation. Ever.** The moment a tab switch starts posting records or generating schedules, every button on the hub becomes unpredictable and you can no longer reason about what a click costs. Tab switching is display state.

If a tab needs data prepared, the caller prepares it and *then* calls this — which is why `70_SCHEDULE__Generate_Expected_Schedule` calls it last rather than the reverse.

## Why it validates the tab name

A typo'd tab name would otherwise set the global to garbage and leave the hub on a blank panel with no error, because the layout object simply fails to match anything. Failing loudly on an unknown tab is much cheaper than debugging an empty screen.

⚠️ The `$known` list is a hardcoded mirror of the hub layout's panel names, which is a real duplication. Add a tab to the layout and forget this list and the new tab is unreachable. The trade was made deliberately — a wrong-but-silent global is worse than a list that occasionally needs syncing — but if the panel set starts churning, move it to a value list.

## Callers

The hub tab buttons directly, `30_CONTEXT__Select_Property_Context` when a `tab` param is passed, and `70_SCHEDULE__Generate_Expected_Schedule` returning the user to Schedule posture after generating.

## History

Audited 2026-06-18 and kept as-is. Ported to a real body 2026-07-29, at which point tab-name validation was added, because a silent blank panel is the failure mode this script would otherwise have.
