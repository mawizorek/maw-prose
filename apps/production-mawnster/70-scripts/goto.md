---
id: script-goto
title: GOTO · (the family)
type: reference
status: public
order: 72
revised: Aug 2026
summary: One script per destination, one step each. Documented as a family because four stub pages would say the same thing four times.
---

# GOTO · (the family)

!!! abstract "Grain"
    One script per **destination**. The whole body is `Go to Layout`. Nothing else, ever.

They are documented together on purpose. A page per one-line script is four copies of the same paragraph that then rot at different rates; **the family has one contract, so it gets one page.** Deviations get their own page — and a `GOTO ·` that needs its own page has stopped being a `GOTO ·`.

## The shape

```
# ═══════════════════════════════════════════════════
# GOTO · <Destination>
# Purpose: land on util_<TABLE>
# Params (JSON): none
# Returns: nothing
# ═══════════════════════════════════════════════════

Go to Layout [ "util_<TABLE>" (<TABLE>) ]
```

No error capture, no parameter, no result. **A one-step script that grows a second step is a `SHOW ·`, not a `GOTO ·`** — see the split rule in the [template](@script-template).

## Current family

| Retired name | Becomes | Lands on |
|---|---|---|
| [goto_view_UTILITY_LOGS](@alias:script-goto) | `GOTO · Utility Logs` | [util_UTILITY_LOGS]{.layout} {.tbc} |
| `goto_view_UTILITY_LOGS` (2nd) | 🔴 **delete — see below** | — |
| [goto_view_APP_SESSIONS](@alias:script-goto) | ⬜ blocked on the `APP_SESSIONS` fork | — |
| [goto_view_VALUES](@alias:script-goto) | `GOTO · Values` | [util_VALUES]{.layout} {.tbc} |

Both destination layouts are marked {.tbc} because **neither exists yet** — the file had 0 layouts at the last DDR.

## 🔴 There are two scripts named `goto_view_UTILITY_LOGS`

Both sit in the same folder. **FileMaker does not require script names to be unique** — it identifies scripts internally, so `Perform Script [ Specified: From list ]` binds to a specific body and both callers appear to work.

The damage is threefold:

1. **You cannot tell which one you are editing.** Fix a bug in one twin and the caller bound to the other keeps the bug.
2. **`Perform Script by name` is a coin flip**, and so is anything that resolves a script from a stored string.
3. 🔴 **Deleting the wrong twin silently breaks every caller bound to it.** They become `Perform Script [ <unknown> ]`, which throws error 4 at runtime and is swallowed whole by the `Set Error Capture [ On ]` that every script in this file opens with.

⚠️ **That third one is not hypothetical here.** [App_Startup](@script:retired-app-startup) already carries a live `<unknown>` on line 12. **The file has an example of the failure before it has an example of the fix.**

**Order of operations, and it matters:** open both, find which is referenced (a DDR script-reference list is the only reliable way), repoint the callers to the keeper, *then* delete. Never delete first and hunt after.

## 🔴 `view_` is the wrong destination for a script

House rule 8: a script lands on `util_<TABLE>`, never a user-facing layout.

The live scripts target [view_UTILITY_LOGS]{.layout} and [view_VALUES]{.layout}. If those layouts are in the layout menu — and the `view_` prefix says they are meant to be looked at — then **every internal jump destroys whatever the user was doing**: their found set, their record, their scroll position, their sort. It also welds the script to a layout that exists to be redesigned, so a cosmetic change breaks a utility and nothing says so.

⚠️ **This is the second sighting of the unpicked table-occurrence naming fork** (`view_PRODUCTIONS` vs bare), already flagged in the relationships pass. The first sighting was a schema opinion; this one is a script that goes to the wrong place. **Pick the convention before the relationship graph binds it** — it is nearly free now and it is thirty edits later.

## Why no error check

`Go to Layout` on a hardcoded, existing layout fails only if the layout was deleted or the privilege set forbids it. **Adding a check would put a second step in a script whose entire value is that it has one** — the reason the family exists is that every destination in the file is greppable from the script list, and that only holds while the bodies are trivial.

The trade, stated plainly: **a deleted layout is caught by a DDR pass, not at runtime.** That is acceptable while layouts are being built and reviewed in the same sitting. Revisit it when the file has users who are not Michael.

## Unverified

- Which of the two `goto_view_UTILITY_LOGS` twins the live callers are bound to. {.gap} **Needs a DDR script-reference read, not a guess** — and it is the one thing that has to be known before either is deleted.
- Whether [view_UTILITY_LOGS]{.layout} and [view_VALUES]{.layout} are actually in the layout menu. {.verify} If they are not, rule 8 is already satisfied and only the prefix is misleading. **Cheap to check, and it changes the fix from a rebuild to a rename.**
