# JSON script parameters

*The canonical definition of the JSON script-parameter helper family. Every FileMaker solution installs these nine and none of them are re-derived per file. Content verified 2026-08-09.*

Nine custom functions: four builders, one combiner, four readers. They do not replace JSON, they make it faster to author. A script that already reads its parameter with `JSONGetElement` keeps working untouched.

## Documents

`json-params.notes.md` is the contract — what the family is for, the install order, the version floor, and what must never be added to it. Read it before installing anything.

The nine `.fmcalc` files are copy targets. Each one pastes into the FileMaker calculation dialog verbatim and holds nothing you would not want to type: `ptext`, `pnum`, `pbool`, `pjson`, `param`, `paramhas`, `paramgettext`, `paramgetnumber`, `paramgetboolean`.

`conformance.json` is the self-audit fixture. Twelve vectors, each a calculation and the exact text it must return. An app pulls this file and runs the vectors against its own local functions, which is the only honest check available — see the notes for why a version stamp is not.

## Gaps

There is no packaged clipboard snippet. Installing is nine manual pastes, and until an `fmxmlsnippet` export exists that is the only supported path.

There is no runner script published here. Each solution writes its own against `conformance.json` and reports into whatever its utility-report surface is called. If a second app writes one, the two should be compared and the better one described here.

~~`standards/filemaker/` above this folder has no README of its own.~~ Closed 2026-08-11 — the shelf README exists and indexes both families.
