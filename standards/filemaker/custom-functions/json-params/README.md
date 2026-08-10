# JSON script parameters

*The canonical definition of the JSON script-parameter helper family. Every FileMaker solution installs these and none of them are re-derived per file. Content verified 2026-08-10.*

Builders, one combiner, readers, and one error return. They do not replace JSON, they make it faster to author. A script that already reads its parameter with `JSONGetElement` keeps working untouched.

⚠️ **This page states no counts, deliberately.** It used to open *"Nine custom functions"* and describe *"Twelve vectors,"* and both were wrong within a day of the family gaining a tenth member. **The folder is the count and `conformance.json` is the vector list** — a number here is a second claimant that nothing can check.

## Documents

`json-params.notes.md` is the contract — what the family is for, the install order, the version floor, and what must never be added to it. Read it before installing anything.

The `.fmcalc` files are copy targets. Each one pastes into the FileMaker calculation dialog verbatim and holds nothing you would not want to type.

`conformance.json` is the self-audit fixture. Each vector is a calculation and the exact text it must return. An app pulls this file and runs the vectors against its own local functions, which is the only honest check available — see the notes for why a version stamp is not.

## `ParamErr` — the error return (added 2026-08-10)

`ParamErr ( code ; where ; comment )` builds the standard FAILURE payload: `ok` false, the error number, the step that failed, and a human note. **Install it LAST** — it composes `Param`, `PBool`, `PNum` and `PText`, so entering it before them fails validation.

🔴 **`ok` is 0 unconditionally and must never be derived from `code`.** A validation failure carries no FileMaker error number and passes `0`, so a "simplified" version that computes `ok` from `code` reports every validation failure as a success. **V14 exists solely to catch that edit**, and it is the vector most likely to be deleted by whoever makes it.

⭐ **It also names something the family was already doing and had not written down: these functions are used in BOTH directions.** The folder is called *script parameters*, but every house script returns `Param ( List ( PBool ( "ok" ; 1 ) ... ) )` as well as reading one. `ParamErr` is the failure half of a return convention that existed in practice and had no canonical shape, which is why four separate app specs referenced an error builder that did not exist.

⚠️ **Named `ParamErr`, not `ErrJSON`.** The app specs that first reached for it used the second name; it was renamed on the way in because a file living in this folder and installed with this family should not announce that it belongs to a different one. **One taxonomy per container.** Cheap now, because nothing has been entered into a FileMaker file yet.

## Gaps

There is no packaged clipboard snippet. Installing is a manual paste per function, and until an `fmxmlsnippet` export exists that is the only supported path.

There is no runner script published here. Each solution writes its own against `conformance.json` and reports into whatever its utility-report surface is called. If a second app writes one, the two should be compared and the better one described here.

⬜ **`ParamErr` has never been evaluated in a FileMaker file.** It is composed entirely of functions whose behaviour V01–V12 already prove, which is the argument for it being safe — not evidence that it ran. **The first app to install it runs V13–V15 before relying on it.**

`standards/filemaker/` above this folder has no README of its own.
