# JSON script parameters — the contract

*Shared sidecar for all nine copy targets in this folder. Content verified 2026-08-09. Adopted as the canonical cross-app definition on 2026-08-09; the family itself was designed for `hml-llc` and predates this file.*

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

## The characters that will break this

`PBool`, `ParamGetBoolean` and `Param` contain `≠`, and `ParamHas` contains `¶`. Both are load-bearing UTF-8 and neither has an ASCII spelling in FileMaker. A transcode anywhere between this file and the calculation dialog either fails to compile, which is fine because it is loud, or produces something that compiles and is wrong, which is not. Two of the conformance vectors exist specifically to catch the second case.

The `¶` in `ParamHas` is doing real work. It wraps both the key list and the search key so that asking for `note` does not match a payload carrying `notes`. Strip it and the function returns true for every key that is a prefix of another one.

## Why the audit compares behaviour and not a version

FileMaker cannot read its own custom function bodies at runtime. There is no introspection without a DDR or a plugin, so a solution genuinely does not know what code it is running. A version constant is therefore a label a human sets, and a label a human sets is a label a human forgets, which produces a file reporting a version it no longer matches. That failure is silent and looks like health.

So the check runs the code. `conformance.json` holds twelve calculations and the exact text each must return; the solution evaluates them against its own local functions and compares. A file running a stale `PBool` fails the boolean vector no matter what it claims about itself. Run the fixture after installing, and again whenever the app's own utility reports run.

When a vector fails, the definition here wins. This folder is the source and the installed copy is downstream of it.

## Installed where

`hml-llc` is where the family was designed. Whether the file currently matches this definition has not been verified and should not be assumed.

`production-mawster` is the reason this folder exists and has nothing installed yet.

Neither line is a status board. Verify against the fixture rather than trusting either sentence.
