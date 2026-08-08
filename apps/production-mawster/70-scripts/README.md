---
id: scripts-readme
title: Script conventions
type: standard
status: unlisted
order: 71
revised: 2026-08
summary: How a script gets documented here. One file per script, notes only.
---

# Script conventions

**One file per script**, named for the script, holding NOTES rather than steps.

⚠️ **Do not paste FileMaker script step text as documentation.** The legacy import proves why: a raw DDR paste is 19–30KB per file, over the 22KB read limit, unsearchable, and it goes stale the moment the script is edited. **The script is the source; a note explains WHY it is shaped that way.**

What a note carries:

- What the script is for, in one line.
- Its **failure mode** — what breaks if it half-runs, and whether it fails loudly.
- Anything non-obvious about the found set it assumes on entry.
- What it deliberately does NOT do.

🔴 **The house rule that applies hardest here:** `Set Error Capture [On]` plus a `Get(LastError)` check after every write. A swallowed error means the caller believes a write landed. Legacy had scripts that failed silently and one that shipped with a live debug dialog.
