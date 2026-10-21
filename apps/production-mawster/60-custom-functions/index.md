---
id: custom-functions
title: Custom Functions
type: index
status: public
order: 60
nav: collapsed
revised: 2026-08
summary: What this app installs, what it authors, and the one test that decides which.
---

# Custom Functions

!!! abstract "Grain"
    One page per function this app AUTHORS. Installed-from-canonical functions are listed, never copied.

## 🔴 The rule: canonical is INSTALLED, app-level is AUTHORED, and the test is one question

**Does this need to be true in every solution, or only in this one?**

Everything in the first bucket lives in `maw-prose` and is **pulled, never restated here** — a copy is a second claimant that goes stale the first time the original moves, and three retired manifests in `brain-config` are the evidence. Everything in the second is a house convention that would tax other files for nothing.

## Installed from canonical — pointers only

**The JSON script-parameter family**, nine functions, at `maw-prose → standards/filemaker/custom-functions/json-params/`.

`PText` · `PNum` · `PBool` · `PJSON` · `Param` · `ParamHas` · `ParamGetText` · `ParamGetNumber` · `ParamGetBoolean`

⬜ **Not installed in this file yet** {.gap}, and everything in `70-scripts/` assumes them. ⚠️ `Param` uses `While ( )`, so **FileMaker 19.6 or later** — the file's options currently declare a minimum of 12, and in an older file the family does not partially work, **it does not compile.**

🔴 **Install order is not optional:** four builders → `Param` → `ParamHas` → the three readers. Each reader calls `ParamHas`.

⚠️ **Verify by BEHAVIOUR, never by a version note.** FileMaker cannot read its own function bodies at runtime, so a version stamp is a label a human sets and a human forgets — it reports health it no longer has. The canonical folder ships `conformance.json`, twelve calculations and the exact text each must return. **Run it after installing and again whenever the utility reports run.** When a vector fails, the canonical definition wins and the installed copy is what is wrong.

## Authored here

- [ErrJSON](@cf-errjson) — the failure payload every script returns. **Read its page before adding a second function to this list**; it carries the whole canonical-versus-app-level argument, including the reason it is not in the shared family and the trigger that would promote it.

## ⚠️ Adding one

**Check the canonical folder FIRST.** `ErrJSON` was specced into four script pages before anyone read the family contract that names its exact shape as forbidden — the rule was one day old and nobody looked.

Then ask the one question at the top. **If the answer is "every solution," it does not belong here at all**, and the right move is a proposal against `maw-prose`, not a file in this folder. 🚫 **And never merge a new idea into an existing canonical family** — a family stays the size it declared; a new idea gets its own folder beside it.

## Not here

🚫 **Scripts are not custom functions**, however small. A function returns a value and does nothing; a script does something. Conflating the two is the same family-discipline failure this folder exists to refuse — see [the scripts index](@scripts) for the parallel one-taxonomy ruling.
