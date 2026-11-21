---
id: retired-app-startup
title: App_Startup (RETIRED)
type: reference
status: public
order: 792
revised: 2026-08
summary: A fragment. Tests a variable it never sets, calls a script that no longer exists.
---

# App_Startup — RETIRED 2026-08-09

!!! warning "Keep this one for the `<unknown>` on line 12"
    It is the file's only worked example of what a deleted script reference looks like, and it will happen again the first time someone tidies the GOTO folder.

## VERBATIM

Transcribed from the FileMaker script workspace, 2026-08-09 ~21:45 ET. Clipped lines are marked; nothing is reconstructed.

```
# ---

# EXPECTING: sessionToken
# ---
Set Error Capture [ On ]
Allow User Abort [ Off ]


Set Variable [ $p ; Value: Get(ScriptParameter) ]
Set Variable [ $session ; Value: ParamGetText ( $p ;…[clipped] ]

Perform Script [ Specified: From list ; <unknown> ; Parameter:   ]

If [ $mode = "ALL" ]
    Show All Records
Else If [ $mode = "NONE" or $mode = "none" or $mode…[clipped] ]

End If
```

Two lines are truncated in the source screenshot {.gap}.

## WHY IT DIED

**Three separate reasons, and the third is the one that decides it.**

### 1 · 🔴 `$mode` is never set in this script

Lines 14–16 branch on `$mode`. Nothing in the script assigns it. A `$` variable is script-local, so it is empty here **no matter what the caller did**, both branches evaluate false, and the `If` block does nothing at all — silently, with no error and no symptom.

⭐ **The block is a paste of [Show ALL or NONE](@script:script-find-all-or-none) with the one line that made it work left behind.** That is worth more than the bug: a copied block carries its *conditions* but not its *setup*, and FileMaker will not tell you which half you took. The rewrite's answer is that no script branches on a variable it did not read from its own parameter, on its own first few lines, where the omission is visible.

### 2 · 🔴 `Perform Script [ <unknown> ]` on line 12

`<unknown>` is FileMaker's rendering of a reference to a script that has been **deleted**. It is not a placeholder someone left; it is a broken pointer, and it throws error 4 (unknown command) at runtime — which, with `Set Error Capture [ On ]` two lines above and no `Get ( LastError )` check anywhere, is swallowed whole.

⚠️ **This is the exact failure that makes the duplicate `goto_view_UTILITY_LOGS` pair dangerous.** Delete the wrong twin and every caller that bound to it becomes this. See [the GOTO family](@script:script-goto).

⬜ **Which script it used to point at has never been established** {.gap} — the reference is dead, so the name is gone with it.

### 3 · It is the third claimant on the file-open handler

[00App_onFirstWindowOpen]{.script} {.tbc}, [trigger_App_Open](@script:retired-trigger-app-open) and this script all want to be what runs on [OnFirstWindowOpen]{.trigger}. **Only one thing can be set in File Options**, so two of the three are dead code that reads as live — and there is nothing in the file that says which one won.

⭐ Same second-claimant shape that killed [THEMES::bool_isDefault]{.field}, [EXPORT_SETS::bool_DefaultRecord]{.field} and [GLOBAL_EXPORT_VARIABLES::g_pkDefault_EXPORT_SET]{.global} earlier the same day. **Three N-designating-one defects in the schema, then immediately a fourth in the scripts.** The mechanism does not care which layer it is in.

## WHAT REPLACES IT

[**FILE · Open**](@script:script-file-open) — already specced, and it holds the pieces this script was reaching for: it mints [$$SESSION.token]{.global}, calls [UTIL · Run Start](@script:script-util-run-start), and keeps its setup work in one clearly marked block.

⚠️ **Before deleting this script, check whether File Options points at it** {.verify}. If it does, repoint to [FILE · Open](@script:script-file-open) first. A file whose open handler is a deleted script opens with an error dialog every single time, and it is a fiddly thing to fix from the inside.
