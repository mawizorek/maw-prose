# Custom functions

*Mirrors Manage Custom Functions. One function in the app. Verified 2026-07-31.*

## MSG_ValueListErrors ( token )

Single source of truth for user-facing validation-error message text. A caller passes a token and gets back the matching human-readable message, so the wording lives in one place and matches what the field's own validation would have said.

It exists because of a specific FileMaker fact: **`Get(LastError)` returns a code — 507 validate-by-calc, 506 required, 504 unique — and never the field's own custom validation message.** Something has to own the words, and a custom function is the only place they can live once and be reached from every script.

Takes one text parameter, the message key, for example `validate_enforce_1_to_1`. Returns the resolved message, or empty for an unknown token.

Its primary caller is `scripts/utilities/commitRecord`.

### Body — not captured

The token-to-message map has never been read out of the FileMaker file. The shape is a `Case` over tokens returning strings, and writing a plausible one here would make the function look documented when it is not.

The body is the whole function, so **this page is a stub with a purpose, not a reference.** Capture it on the next pass through the file.
