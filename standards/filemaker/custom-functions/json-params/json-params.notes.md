# JSON script parameters — the contract

*Shared sidecar for all nine copy targets in this folder. Content verified 2026-08-09. Adopted as the canonical cross-app definition on 2026-08-09; the family itself was designed for `hml-llc` and predates this file.*

## 🔴 UNRESOLVED NAME COLLISION — the ninth function has two names and the fixture cannot run

**Found 2026-08-10 by FMP Fiona, reading this folder before installing it into `production-mawster`. Not fixed here, because fixing it is a rename and a rename may break an installed file.**

Four surfaces in this folder name the ninth function. **They do not agree.**

| Surface | Says |
|---|---|
| the calc file's own header comment | `ParamGetBool` |
| the filename | `paramgetbool.fmcalc` |
| `README.md`'s copy-target list | `paramgetboolean` |
| `conformance.json` → `functions` | `ParamGetBoolean` |
| `conformance.json` → **V12, executable** | `ParamGetBoolean ( "{}" ; "x" ; 3 )` |
| this file's own reader example, below | `ParamGetBoolean` |

🔴 **The consequence is not cosmetic. Paste the `.fmcalc` verbatim, as this folder instructs, and you create a function named `ParamGetBool`. V12 then fails — not because the code is stale, but because the name does not resolve.** The audit designed to prove the installed copy is current reports a failure whose cause is a typo in the source, and the two look identical from inside FileMaker.

⭐ **This is the exact defect the "compare behaviour, not a version" argument was written to avoid, arriving through the one door that argument left open.** That reasoning assumed the fixture and the definition could not drift, because both live here. They are still two files, and two files stating one fact is the shape this fleet has retired three manifests over. **A behavioural check is only as good as the NAME it calls.**

### The recommendation, which is not a ruling

**`ParamGetBoolean` on four surfaces against `ParamGetBool` on two**, the executable one is in that four, and `ParamGetText` / `ParamGetNumber` are both spelled in full — so `ParamGetBool` also breaks the family's own parallelism, which is the whole reason a reader can hold nine functions in their head.

⚠️ **What blocks it: `hml-llc` is where this family was designed and may have the short name installed, in callers nobody has listed.** This file already says its own installed-where lines are not a status board. **Renaming a custom function in a live file breaks every caller silently** — the identical failure mode as the two `goto_view_UTILITY_LOGS` twins in `production-mawster`, one runtime over. **Verify `hml-llc` before renaming anything, then rename in one pass.**

✅ **Safe in the meantime, and worth knowing: `production-mawster` has nothing installed**, so it can be built to whichever name wins at no cost. Its script specs already use `ParamGetBoolean`.

---

## What this is and what it is not

JSON stays the transport format. The script parameter is a real JSON object and any script may still be called with a plain `JSONSetElement ( "{}" ; ... )` payload. What these functions change is the caller's typing, and optionally the reader's, and nothing else. The transport does not change and the script contract does not change, which is why adopting them in an existing file is not a migration.

The builder side reads like this:

    Param (
        List (
            PText ( "mode" ; "edit" ) ;
            PText ( "loanID" ; LOANS::PrimaryKey ) ;
            PBool ( "openCard" ; 1 )
        )
    )

and the reader side like this:

    Set Variable [ $p ; Get ( ScriptParameter ) ]
    Set Variable [ $mode ; ParamGetText ( $p ; "mode" ; "view" ) ]
    Set Variable [ $openCard ; ParamGetBoolean ( $p ; "openCard" ; 0 ) ]

`List ( ... )` is the wrapper because FileMaker gives no true variadic signature, and it is the only way to keep the call site readable while passing many elements into one function.

## Install order, and it is not optional

The four builders first, then `Param`, then `ParamHas`, then the three `ParamGet` readers. Each `ParamGet` calls `ParamHas`, so entering them first fails validation.

`Param` uses `While ( )`. That is FileMaker 19.6 and later. In an older file the family does not partially work, it does not compile, so check the version before you start pasting.

## Keep the family at nine

No array builders, no object-graph helpers beyond `PJSON`, no required-key validator framework, no result-builder wrappers, and nothing that runs `Evaluate`. The value of a thin layer is that a person can hold all of it in their head; a tenth function is a claim that the layer became a language. Nested JSON is built with native functions and attached with `PJSON`.

Duplicate keys resolve last-wins, which matches repeated `JSONSetElement` and needs no rule of its own.

⚠️ **A tenth function has been proposed and is parked against this rule.** `production-mawster` needs an error payload builder (`ErrJSON ( code ; where ; comment )`) after retiring a script that tried to be one — a subscript cannot exit its caller, so the payload has to be a function. **It is a RESULT-BUILDER WRAPPER, which this section names explicitly as out.** It is not being smuggled in: either the app builds it locally as its own function, or the rule bends for one addition, and that is a decision rather than a side effect. Parked, not built.

## The characters that will break this

`PBool`, `ParamGetBoolean` and `Param` contain `≠`, and `ParamHas` contains `¶`. Both are load-bearing UTF-8 and neither has an ASCII spelling in FileMaker. A transcode anywhere between this file and the calculation dialog either fails to compile, which is fine because it is loud, or produces something that compiles and is wrong, which is not. Two of the conformance vectors exist specifically to catch the second case.

The `¶` in `ParamHas` is doing real work. It wraps both the key list and the search key so that asking for `note` does not match a payload carrying `notes`. Strip it and the function returns true for every key that is a prefix of another one.

## Why the audit compares behaviour and not a version

FileMaker cannot read its own custom function bodies at runtime. There is no introspection without a DDR or a plugin, so a solution genuinely does not know what code it is running. A version constant is therefore a label a human sets, and a label a human sets is a label a human forgets, which produces a file reporting a version it no longer matches. That failure is silent and looks like health.

So the check runs the code. `conformance.json` holds twelve calculations and the exact text each must return; the solution evaluates them against its own local functions and compares. A file running a stale `PBool` fails the boolean vector no matter what it claims about itself. Run the fixture after installing, and again whenever the app's own utility reports run.

When a vector fails, the definition here wins. This folder is the source and the installed copy is downstream of it.

🔴 **Amended 2026-08-10: "the definition here wins" assumes this folder agrees with itself, and on the ninth function it does not.** Read the collision block at the top before acting on a V12 failure. **A vector that fails on an unresolved NAME is reporting a defect in the source, not in the installation**, and treating it as staleness sends someone to re-paste code that was never the problem.

## Installed where

`hml-llc` is where the family was designed. Whether the file currently matches this definition has not been verified and should not be assumed. ⚠️ **It is also the file that decides the rename above** — check which spelling its callers use before anything is renamed.

`production-mawster` is the reason this folder exists and has nothing installed yet. Its `70-scripts/` specs are written against `ParamGetBoolean`.

Neither line is a status board. Verify against the fixture rather than trusting either sentence.
