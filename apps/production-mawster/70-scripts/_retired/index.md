---
id: scripts-retired
title: Retired Scripts
type: index
status: public
order: 79
nav: collapsed
revised: 2026-08
summary: Scripts that were written, then ruled dead. Kept verbatim, never culled.
---

# Retired Scripts

!!! abstract "Grain"
    One page per script that was built in the file and then ruled dead. The body is pasted **as it was**, not as it should have been.

## Why this folder exists

A deleted script leaves no trace of the thinking that produced it, and the same idea comes back three weeks later wearing a different name. **The reasoning is the asset; the steps are disposable.** Same never-cull rule the Decision Logs run on.

## How to read a page here

Every page carries three things and nothing else:

1. **VERBATIM** — the script as it existed. Do not fix it. Do not reformat it. It is evidence, not code.
2. **WHY IT DIED** — one paragraph. The defect, not a summary of the steps.
3. **WHAT REPLACES IT** — a link, or an explicit "nothing."

⚠️ **Transcription honesty.** The 2026-08-09 set was read from screenshots of the FileMaker script workspace, so lines the screenshot clipped are marked {.gap}. **A clipped line is never reconstructed from a guess** — a plausible-looking body in an archive is worse than an obvious gap, because the gap gets checked and the guess gets quoted.

🚫 **Marker spans stop at the code fence.** The verbatim blocks carry no markup of any kind, deliberately: a marker inside evidence is an edit to the evidence. Everything on these pages that is tagged sits in the prose around the block.

## 🔴 Retiring a script does NOT delete it from the file

Archiving here and deleting in FileMaker are two separate actions, and the second one is Michael's.

Deleting a script breaks every `Perform Script` that referenced it, and FileMaker does not warn you — the caller silently becomes `Perform Script [ <unknown> ]`. **That exact symptom is already live in this file** on line 12 of [App_Startup](@script:retired-app-startup), which is how we know what a dead reference looks like here rather than in theory.

**So the order is: archive → find the callers → repoint them → then delete.** Never the other way round.

## The 2026-08-09 set

Four scripts from the file's first script-writing pass. All four were written before the [template](@script-template) existed, and each one is a genuinely useful mistake.

| Script | Died because | Replaced by |
|---|---|---|
| [trigger_App_Open](@script:retired-trigger-app-open) | Third claimant on the open handler, and it writes the session row to the wrong table | [FILE · Open](@script:script-file-open) |
| [App_Startup](@script:retired-app-startup) | A fragment. Tests a variable it never sets, and calls a script that no longer exists | [FILE · Open](@script:script-file-open) |
| [new_UTILITY_LOG](@script:retired-new-utility-log) | Second claimant on run logging, and three of its own variables never get a value | [UTIL · Run Start](@script:script-util-run-start) |
| [exit w/ errors](@script:retired-exit-w-errors) | 🔴 Cannot do what its name says. A subscript cannot exit its caller | a custom function, not a script |

⭐ **The pattern across all four is one thing: a script that reads as finished because it has a header, a parameter and a shape.** Three of them silently do nothing. None of them would look wrong on a layout, and none of them would fail loudly. That is the same *comments-are-the-spec, fields-are-the-build* defect already documented against the schema, arriving one layer up in the scripts.
