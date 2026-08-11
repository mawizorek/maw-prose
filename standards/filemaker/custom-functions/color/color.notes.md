# Color — the contract

🥇 GOLDEN · authored 2026-08-11

Two functions. `RGBToHex ( r ; g ; b )` and `HexToRGB ( hex )`. They convert between FileMaker's native color numbers and the hex string every other runtime speaks.

## Why this is a family and not a script

Hex is only ever needed at a **boundary** — a web viewer, an HTML artifact, a CSS token, a ClickUp field, an export. Inside FileMaker you want `RGB ( r ; g ; b )` and nothing else, so a solution that reaches for hex is by definition about to hand a value to something outside itself.

Boundaries live in calculation fields, conditional formatting, merge fields and web viewer content — **none of which can call a script.** A script wrapper would have been unreachable from every place the value is actually consumed, and it would have returned a value without doing anything, which the house rule already forbids: *anything a script RETURNS but does not DO is a custom function.*

## Why two and not one

A converter that only runs one direction cannot round-trip in its own conformance fixture, so it can never prove it is correct against anything but a hand-written table of expected answers. `C12` exists because `HexToRGB` exists.

The second reason is practical: a hex string arriving from outside is the same boundary running backwards, and it will arrive. Theme tokens, a pasted brand color, a value pulled from a repo `.tsv`.

**Two is the family. A third function would be padding.**

## The asymmetry is deliberate

`RGBToHex` returns a **bare string**. `HexToRGB` returns **JSON**.

That looks inconsistent and is not. `RGBToHex` produces one value, so a string is the whole answer and wrapping it in JSON would force every calculation field on the boundary to parse its own result. `HexToRGB` produces three values plus a validity verdict, and JSON is the only honest shape for that.

The rule underneath: **let the return type be decided by the number of things being returned, not by family consistency.**

## Behaviour worth knowing before you use it

`RGBToHex` **clamps and rounds silently.** `300` becomes `FF`, `-20` becomes `00`, `127.6` becomes `80`. This is the right default for a display value — a color is never the reason a layout should fail — but it means the function cannot tell you that its input was wrong. **If the input being in range is a fact you care about, test it before you call.**

`HexToRGB` **refuses rather than salvages.** It strips a leading `#` and whitespace and accepts either case, then requires that everything remaining is a hex digit and that there are exactly three or six of them. An earlier draft used `Filter ( )` to strip non-hex characters, which quietly turned garbage into a plausible color; that is the failure this family most needed to avoid, and `C11` is the guard.

Three-digit shorthand expands by **doubling each digit**, per CSS: `F80` → `FF8800`. Not by padding with zeros.

Neither function knows anything about alpha, named colors, HSL, or FileMaker's own `TextColor` packing. Adding any of those is a **new family**, not a fourth file here.

## Install

No order dependency — neither function calls the other. Paste both, then run `conformance.json` against the local definitions.

No version floor. Both use functions available well before the 19.6 `While ( )` requirement that `json-params` carries, so a file too old for the parameter family can still install this one.

## Audit

Same reasoning as every family on this shelf: **FileMaker cannot read its own custom function bodies at runtime**, so a version stamp is a label a human sets and forgets, and the file reports health it no longer has. The vectors are the only honest check. Run them from whatever the solution calls its utility-report surface.

Two vectors exist purely as guards and should never be edited for convenience: **C02** catches a dropped high nibble, which produces a four or five character string that still looks like a color, and **C11** catches a parser that salvages garbage.

## Gaps

No packaged clipboard snippet. Two manual pastes.

`RGBToHex` has no strict sibling. If a caller ever genuinely needs to know that a channel was out of range, that is a real gap and the answer is probably a `HexToRGB`-shaped `RGBToHexStrict` returning JSON — **not** a flag argument on the existing function, which would change the return type based on an input and break every calculation field already using it.
