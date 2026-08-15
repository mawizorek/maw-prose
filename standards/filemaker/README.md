# FileMaker standards

*Cross-app FileMaker law. What is written here is true for every solution; an app that diverges documents the divergence in its own package, it does not fork the standard. Content verified 2026-08-11.*

This shelf answers one question: **what does every FileMaker file we build agree on?** Anything that is true of exactly one app belongs in that app's package under `apps/`, not here.

## Documents

`fmp-app-package.md` is the documentation contract — the folder shape that mirrors FileMaker's own *Manage* menu, the casing test, the 🥇 GOLDEN / 🔨 BUILT / ⛔ SUPERSEDED state stamps, and the notes-vs-registers-vs-copy-targets split. Read it before starting a package.

`fmp-data-standards.md` is the naming table — keys, prefixes, audit fields, and when a value list has to become a table. It also carries the reason names lock before anyone writes `ExecuteSQL`: SQL embeds the name as text, so a rename returns empty rather than erroring.

`custom-functions/` holds the shared function families. A family is a small set of functions that solve one job, defined once here and **installed** into each solution — never re-derived per file. Three families exist:

- **`json-params/`** — the nine-function script-parameter layer (`PText` · `PNum` · `PBool` · `PJSON` · `Param` · `ParamHas` · `ParamGetText` · `ParamGetNumber` · `ParamGetBoolean`). Locked at nine; its notes carry an explicit list of what must never be added.
- **`color/`** — `RGBToHex` and `HexToRGB`, the boundary conversion between FileMaker's native RGB and the hex every other runtime speaks.
- **`json-mutate/`** — `JSONUpsert`, a non-destructive single-key write into a stored JSON object (overwrite if present, append if absent), with the value's type inferred from the existing element or forced with an explicit `kind`. Seeded with one function; room for sibling mutations. Distinct from `json-params`, which moves script parameters rather than writing stored fields.

Every family ships a `conformance.json` beside its definitions, and the reason is the same in all of them: **FileMaker cannot read its own custom function bodies at runtime.** No introspection without a DDR or a plugin, so a file genuinely does not know what code it is running, and a version stamp is a label a human sets and a human forgets. The app evaluates the vectors against its own local functions instead. A stale definition fails regardless of what it claims about itself.

## Where a new family goes

A new folder under `custom-functions/`, never a section bolted onto an existing family. The families are deliberately thin, and thin only survives if the next good idea gets its own shelf instead of the nearest one.

The test before you cut one: does this solve a recurring cross-app job, can no existing family do it without ugly overrides, does it improve consistency more than it adds maintenance. One yes is enough.

## Gaps

No family ships a packaged clipboard snippet. Installing is one manual paste per function, and until an `fmxmlsnippet` export exists that is the only supported path.

No conformance runner is published here. Each solution writes its own and reports into whatever its utility-report surface is called. If a second app writes one, compare the two and describe the better one at the family level.

`custom-functions/` has no README of its own. It does not need one while this file lists the families; if the shelf grows past what a paragraph can hold, that changes.
