# meta/

Notes **about** this file's documentation, never the documentation itself.

## What belongs here

- **Export stamps.** When a worksheet export was taken, what criteria it used, and the commit it was reconciled against. An export is a snapshot and goes stale the moment the `.vwx` is edited, so **always record the timestamp.**
- **Reconcile findings.** What the file currently IS versus what this tree says it is SUPPOSED to be. Disagreements are information.
- **Revision notes** that are not already git history.

## What does NOT belong here

🚫 **The exported CSV itself, long-term.** An export is evidence for one pass, not a second claimant on the class list. Reconcile against it, record what it told you, then let it go — and if you must keep one, **write the tombstone row before the first delete**: source, criteria, timestamp, and the commit SHA that still contains it.

🚫 **Build state.** Whether a class exists in the file yet is not a property of the spec. The spec is the target. Same ruling as the FileMaker tree.

## Open, as of 2026-10-05

The reconcile pass does not exist yet. It is spec'd as a fifth member of the reconcile family and is **out of scope for `vwx-renderer` v1**, so until it is built this folder holds hand-written notes only.
