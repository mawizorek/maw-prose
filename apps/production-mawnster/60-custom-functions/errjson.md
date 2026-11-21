---
id: cf-errjson
title: ErrJSON
type: reference
status: public
order: 61
revised: Aug 2026
summary: The failure payload every script returns. App-level on purpose - the canonical family refuses this shape.
---

# ErrJSON

!!! abstract "Grain"
    One call per failure. Builds the JSON a script returns when it did not do its job.

```
/* ErrJSON ( code ; where ; comment )
   The failure payload. Composes the canonical family; adds no syntax.
   Requires: Param, PBool, PNum, PText installed first. */

Param (
    List (
        PBool ( "ok"      ; 0 ) ;
        PNum  ( "error"   ; code ) ;
        PText ( "where"   ; where ) ;
        PText ( "comment" ; comment )
    )
)
```

Called by [FIND · All Or None](@script:script-find-all-or-none), [UTIL · Value Index Move](@script:script-util-value-index-move), [FIND · Values](@script:script-util-value-index-move) and [FILE · Save Backup](@script:script-file-save-backup). Replaces the retired [exit w/ errors](@script:retired-exit-w-errors), which could never work.

## 🔴 The canonical family REFUSES this function, and the refusal is correct

`maw-prose → standards/filemaker/custom-functions/json-params/` is the canonical nine, and its contract says, in a section headed **Keep the family at nine**:

> *No array builders, no object-graph helpers beyond `PJSON`, no required-key validator framework, and **no result-builder wrappers**… a tenth function is a claim that the layer became a language.*

**`ErrJSON` is a result-builder wrapper. It is the named example.**

⚠️ **I specced it into four script pages on 2026-08-09 without reading that file.** The rule is one day old, it is well argued, and it stands. **This page exists because the function was already load-bearing before anyone checked whether it was allowed.**

### So why does it exist at all

**The ban is scoped to the FAMILY, and the family's own reasoning says why.** Those nine are installed in **every** solution, so a tenth taxes every file forever and has to be held in every head. **An app-level function taxes one file.** Different cost, different answer.

⭐ **The test that decides it, and it is the one to reuse: does this need to be true in every solution, or only in this one?** A parameter-building vocabulary is the first. *What our error payload looks like* is the second — it is a house convention, not a language feature.

### 🔴 The promotion trigger, written now so it is not improvised later

**The moment a SECOND app wants an error payload, it does NOT write its own.** Two apps with two error shapes is the divergence that makes `ok` mean different things in different files, and it is the failure this whole family was consolidated to prevent.

**It gets promoted to a SIBLING canonical folder** — `standards/filemaker/custom-functions/error-payload/` — 🚫 **never merged into `json-params/`.** That folder's rule survives promotion: a family stays at nine and a new idea gets its own folder.

## ⚠️ It must not grow, and the pressure to grow it is obvious

A fifth argument. An `ErrJSONFrom ( )` that reads `Get ( LastError )` itself. A success twin. **Every one of those is the family-becomes-a-language failure, one level down, in a file with no contract to refuse it.**

**If a caller needs more than these four keys, it builds the payload inline with `Param`.** That is not a workaround — it is the reason the canonical family exists, and inline is where an unusual shape belongs.

## 🔴 `error: 0` is a REFUSAL, not a success, and this is the trap

Four call sites pass `0`:

```
ErrJSON ( 0 ; "FIND · All Or None" ; "mode is required" )
```

**`0` is FileMaker's code for "no error," so the payload reads `ok: 0, error: 0`** — which looks self-contradictory and is not.

⭐ **It means WE refused, FileMaker did not fail.** A missing mandatory parameter is a rejection by the script, and there is no FileMaker error code for *the caller wrote the wrong thing*. Inventing a private code would put a number in the log that no Claris reference explains.

**So the contract is: read `ok` FIRST, always. `error` is diagnostic detail, never the test.** A caller branching on `error ≠ 0` treats every validation refusal as a success.

⬜ **Named, not chosen:** a distinct `reason` key (`"validation"` against `"filemaker"`) would make it self-describing at the cost of a fifth argument this page just argued against. **Michael's, if the ambiguity ever bites.** {.tbc}

## 🚫 PII: `where` and `comment` are LOGGED

Both land in [UTILITY_LOGS::Comment]{.field} through [UTIL · Run End](@script:script-util-run-end). Same rule as `json_Params`: **pass keys, ids and step names, never values.**

⚠️ **And the tempting call is the wrong one.** `ErrJSON ( err ; "Perform Find" ; $searchTerm )` is exactly what you want while debugging and exactly what puts a person's name in a permanent log. **Pass the FIELD you searched, never what you searched for.**

## Install

After the canonical nine — it calls four of them, so entering it first fails validation. It is not in `conformance.json` and **should not be added to it**: that fixture audits the shared family against its canonical definition, and an app-level function in it would make the file's conformance check depend on this app's private conventions.

⬜ **Nothing verifies this function.** {.gap} The honest fix is one vector in whatever local fixture this app grows, not a line in the shared one.

## Unverified

- Whether `PNum` renders `0` as `0` rather than empty in the built payload. {.verify} `Param`'s `_type = "number"` branch passes the value through `JSONSetElement` as `JSONNumber`, so it should — **but every call site that passes `0` depends on it**, and it has not been run.
- The canonical family is **not installed in this file yet.** {.gap} `ErrJSON` cannot be entered until it is, and the family needs FileMaker 19.6 for `Param`'s `While ( )`.
