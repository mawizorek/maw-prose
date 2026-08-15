# JSON mutation — the contract

*Sidecar for the copy target in this folder. Content verified 2026-08-15. Designed for `production-mawster`'s backup-field JSON and adopted as a cross-app family the same day; seeded with one function, with room for siblings.*

## What this is and what it is not

One function so far: `JSONUpsert ( json ; key ; value ; kind )`. It writes ONE key into an existing JSON object and touches nothing else. Key present, the value is overwritten; key absent, the key is appended. Every other key, and every other key's type, is left exactly as it was.

It is **not** the script-parameter family. `json-params/` moves a parameter into a script and a result back out — one call in, one structured object out. This writes into a STORED JSON field on a record and hands the new object back for you to set. Different lane, different folder, on purpose, so `json-params` stays locked at nine.

It is **not** RFC 6902 JSON Patch. That is an operation-list format; this is a single upsert. The name was chosen over "patch" precisely to keep a cold reader from expecting the RFC.

## The `kind` argument, and why it defaults to inference

`kind` is the value's type, spelled in the SAME words the `P*` builders tag internally: `"text"`, `"number"`, `"boolean"`, `"json"`. A caller who already reads the transport lexicon knows these for free.

Pass `""` for AUTO. The function reads the type of the element ALREADY at `key` with `JSONGetElementType` and re-adopts it. This is the loop-safe mode: walk a set of keys, patch each with `""`, and every field keeps the type it already had. A boolean stays boolean; a `"14"` stored as text stays text and is NOT coerced to a number. It assumes, as the caller promises, that the incoming value has been pre-validated to match what it replaces.

⭐ **The one thing AUTO cannot know: a brand-new key.** There is no existing element to read a type from, so it lands as `text`. For an overwrite this never bites — the type is already on the record. To APPEND a real number or boolean under a fresh key, pass the kind explicitly that one time. AUTO falls to lossless text rather than fabricating a type, which is the safe direction: a number kept as text survives, a mis-guessed type does not.

## Install

One paste. `jsonupsert.fmcalc` goes into a new custom function, verbatim.

No install order — it is one function, and it calls only native functions, so it has no dependency on `json-params`.

Version floor: **FileMaker 19.0+**, for `JSONGetElementType`. Every file already carrying `json-params` clears this (that family needs 19.6 for `Param`'s `While`), so adopting this alongside it adds no new floor.

## The character that will break this

The boolean branch contains `≠` (not-equal), load-bearing UTF-8 with no ASCII spelling in FileMaker. A transcode between this file and the calculation dialog either fails to compile — loud, and fine — or compiles wrong, which is not. `V07` exists to catch the second case: it asserts `0` becomes JSON `false`, which only holds if `≠` survived intact.

## Keep the family honest

A sibling here earns the folder the same way the folder earned the shelf: a recurring cross-app job, no existing family does it without ugly overrides, more consistency than maintenance. A key-DELETE (`JSONDeleteKey`) is the obvious future candidate and is the same lane. A type-COERCING variant is not — that is exactly what an explicit `kind` already does.

Do not let this grow into a mutation DSL. A caller setting five keys calls this five times, or uses native `JSONSetElement` with a bracket list; both read fine.

## Why the audit compares behaviour and not a version

Same reason as every family on this shelf: FileMaker cannot read its own custom function bodies at runtime, so a version constant is a label a human sets and a human forgets. `conformance.json` holds the vectors; the solution evaluates them against its own local `JSONUpsert` and compares. When a vector fails, the definition here wins — this folder is the source and the installed copy is downstream of it.

## Installed where

Nothing installed as of 2026-08-15. `production-mawster` is the intended first home (backup-field JSON), and its specs should call `JSONUpsert`. This line is not a status board — verify against the fixture, never trust the sentence.
