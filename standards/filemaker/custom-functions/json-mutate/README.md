# JSON mutation

*Non-destructive writes into a stored JSON object. Seeded with one function, its contract, and its self-audit fixture. Content verified 2026-08-15.*

`JSONUpsert ( json ; key ; value ; kind )` sets one key and leaves every other key untouched. Key present overwrites, key absent appends. `kind` is `"text" | "number" | "boolean" | "json"`, or `""` to infer the type from the element already at that key (loop-safe). A brand-new key under `""` lands as text.

This is not `json-params`. That family moves script parameters — one call in, one result out. This writes into a stored JSON field on a record. Separate folder so `json-params` stays locked at nine.

## Documents

`json-mutate.notes.md` is the contract — what it is for, the `kind` argument and its auto-inference, the version floor, the one character that will break it, and what may join the folder later. Read it before installing.

`jsonupsert.fmcalc` is the copy target. One paste into a new custom function, verbatim.

`conformance.json` is the self-audit fixture — ten vectors, each a calculation and the exact text it must return. The app runs them against its own local function, the only honest check, because FileMaker cannot read its own function bodies at runtime. See the notes for why a version stamp is not enough.

## Gaps

No packaged clipboard snippet — one manual paste, same as every family on the shelf. No runner script published here; each solution writes its own against `conformance.json` and reports into its own utility-report surface.
