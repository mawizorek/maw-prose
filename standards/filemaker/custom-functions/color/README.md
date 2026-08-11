# Color conversion

*The canonical definition of the RGB↔hex helper family. Every FileMaker solution that renders a color outside itself installs these two. Content verified 2026-08-11.*

Two custom functions. `RGBToHex ( r ; g ; b )` returns six bare uppercase digits with no leading hash. `HexToRGB ( hex )` returns `{ "ok": true, "r": …, "g": …, "b": … }`, or `ok: false` with an `error` string when the input is not a color.

Inside FileMaker you want native `RGB ( )`. Hex only matters where a value leaves the file — web viewer, HTML artifact, CSS token, export, ClickUp. That boundary is calculation-field territory and cannot call a script, which is why this is a function family and not a utility script.

## Documents

`color.notes.md` is the contract — why the family is two functions, why their return types deliberately differ, what each one does with bad input, and what belongs in a different family instead. Read it before installing.

The two `.fmcalc` files are copy targets. Each pastes into the FileMaker calculation dialog verbatim: `rgbtohex`, `hextorgb`. No install order — neither calls the other.

`conformance.json` is the self-audit fixture. Twelve vectors, each a calculation and the exact text it must return. An app pulls this file and runs the vectors against its own local functions, which is the only honest check available — FileMaker cannot read its own function bodies at runtime, so a version stamp proves nothing.

## Gaps

No packaged clipboard snippet. Two manual pastes.

No alpha, no HSL, no named colors, no FileMaker `TextColor` packing. Each of those is a new family rather than a file added here.

No strict variant of `RGBToHex` — it clamps out-of-range channels silently and cannot report that it did. Real gap, documented in the notes with the shape the fix should take.
