# commitRecord

*🔨 BUILT. Shared cross-app helper, captured from the URITP Budget build. **The only script in this app verified present in a real FileMaker file.** Verified 2026-07-31.*

Copy text: [`commitRecord.fmscript`](commitRecord.fmscript)

## When to use it

Any commit that could fail field validation — elevated value-list `enforce_1_to_1`, required values, uniqueness. Call this instead of hand-rolling `Commit` plus `Get(LastError)`, so that both the behaviour and the user-facing message are identical everywhere.

## Why it exists at all

`Get(LastError)` returns a **code** — 507 validate-by-calc, 506 required, 504 unique — and **never the field's own custom validation message.** So the script has to own the message. That is the entire reason this is a helper rather than two steps inline.

Dialog text comes from the parameterized `MSG_ValueListErrors ( token )` custom function, so wording lives in one place and matches what the field itself would have said.

## skipValidation

The deliberate escape hatch for trusted bulk or scripted writes. Use it sparingly and only where the data is known-good — a fixture import is a legitimate case, a user-facing save is not.

## Candidate upgrades

The error branch is coupled to `enforce_1_to_1` and should be generalized, mapping 507, 506 and 504 to their own message tokens so it handles any validation failure.

More importantly it should **return JSON `{ ok, errorCode }`** per the house contract, so callers can branch on the result. Today it is fire-and-handle with no structured return, and that is exactly why `txn_Commit` cannot yet tell a validation failure from a lock failure through it. **Validation errors are not transaction errors** — a 507 means the data is wrong, a lock error means the transaction broke — and until this returns structured JSON the wrapper cannot distinguish them.

## Folder divergence

This sits in `utilities/`, which does not exist in the documented FileMaker script tree, and a house-standard helper does not obviously belong in `90_ADMIN` either since that folder is for one-offs and repair. Flagged rather than relocated: FileMaker-internal structure is Michael's to confirm.

## History

Captured from the URITP Budget build 2026-06-29 as a standard cross-app helper. Converted to dictation form in July, and the narrative moved out to this sidecar when the copy-target rule landed — one prose home per script, just not inside the thing that gets typed.
