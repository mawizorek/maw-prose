---
id: script-template
title: _TEMPLATE · New Script
type: reference
status: public
order: 1
revised: 2026-08
summary: Duplicate this to start every script. The house rules live in the header on purpose.
---

# _TEMPLATE · New Script

!!! abstract "Grain"
    One starting point for every script in the file. Duplicate, rename, delete what does not apply.

The rules are written **inside** the script rather than in this page, because a rule you have to go and look up is a rule that gets skipped. They are meant to get shorter over time as the instincts form — **strike a line when it is genuinely automatic, do not delete the file.**

## The template

```
# ═══════════════════════════════════════════════════
# <SCRIPT NAME>
# Purpose:
# Params (JSON):
# Returns (JSON):
# ═══════════════════════════════════════════════════
# HOUSE RULES - delete a line only when it truly does not apply
#  1. Error capture is LINE ONE. A subscript cannot set it.
#  2. Check Get(LastError) after EVERY risky step. Capture
#     hides the dialog, it does not handle the error.
#     Branch on the CODE: 401 after a find is an answer.
#  3. No inline Enter Find Mode. Call FIND-Entity.
#  4. No inline Go to Layout. Call GOTO-Destination.
#  5. Params in and out are JSON, even for one value.
#     Default ONLY where a wrong guess cannot go unnoticed.
#  6. No domain strings typed in calcs. Custom function.
#  7. Inside a transaction, nothing that implicitly commits
#     (Go to Layout / Go to Record / New Record / Show All).
#  8. Land on util_TABLE, never a user-facing layout.
#  9. Run Start and Run End wrap the work. Always both,
#     and the failure paths pass their OWN status.
# 10. ONE exit shape, on the LAST line. Falling off the end
#     returns the last SUBSCRIPT's result, not nothing.
# ═══════════════════════════════════════════════════

Set Error Capture [ On ]
Allow User Abort [ Off ]

Set Variable [ $p     ; Get ( ScriptParameter ) ]
Perform Script [ UTIL · Run Start ]
Set Variable [ $ctx   ; Get ( ScriptResult ) ]
Set Variable [ $logPK ; JSONGetElement ( $ctx ; "logPK" ) ]

#  -- work ------------------------------------------


#  -- close -----------------------------------------
Perform Script [ UTIL · Run End ; JSON: logPK, status, comment ]
Exit Script [ JSONSetElement ( "{}" ; "ok" ; 1 ; JSONNumber ) ]
```

## Why each rule is there

**1 · Error capture is line one.** FileMaker restores the error-capture state when a subscript returns, so a `UTIL · Set Up` script that turns it on gives the caller **nothing**. The centralised version everyone writes first is a silent no-op. This one line cannot be delegated.

**2 · Capture without a check is worse than no capture.** `Set Error Capture` suppresses the *dialog*; it does not handle the error. Turn it on and skip the check and the script sails past a failed find, a failed commit or a failed write and reports success. Capture, act, check, branch.

⚠️ **And it goes wrong in both directions, which is why the rule now says branch on the CODE.** `If [ Get ( LastError ) ≠ 0 ]` after `Perform Find` fires on **401, "no records match"** — a normal, correct outcome — and turns an empty list into a crash. Same for **101** at the end of a found set. *(Live instance: [status_index_move](@script:script-util-value-index-move), 2026-08-09.)*

**3 and 4 · Chokepoints.** Every search for an entity goes through one `FIND ·` script; every navigation through one [GOTO ·](@script:script-goto). FileMaker has no grep — a DDR lists fields, not the fifty places `Enter Find Mode` was typed. In a searchable codebase inline is recoverable; here it is not. It is also what makes a later change (an org predicate, a renamed layout) one edit instead of a hunt.

**5 · JSON parameters.** A positional parameter list cannot gain an argument without breaking every caller. JSON can.

### 🔴 5a · The default test, and it is the rule this file got wrong most often

Four defaults in this folder were written the same way and only two of them were defensible. The test that separates them, arrived at 2026-08-10:

> **Default ONLY where a wrong guess cannot go unnoticed.**

Not *how likely is the caller to omit it* — **how visible is the damage when they do.**

| Live case | Default | Verdict |
|---|---|---|
| [UTIL · Run End](@script:script-util-run-end) status → `ok` | a run succeeded | 🔴 **KILLED.** You only read the log because something broke, and it says nothing did. Invisible by construction |
| [new_UTILITY_LOG](@script:retired-new-utility-log) kind → `script` | read from the wrong variable | 🔴 **RETIRED.** Fired on EVERY row. A default that fires when nobody omitted anything is not a default, it is a constant |
| [UTIL · Run Start](@script:script-util-run-start) kind → `script` | the caller is a script | ✅ **KEPT.** One obviously-wrong row per day, one exception, and it passes explicitly |
| [FIND · All Or None](@script:script-find-all-or-none) mode → `abort` | nothing | 🔴 **KILLED.** `abort` was also a legal input, so forgot and meant-it were the same branch |

⭐ **Three ways to be safe, in order of preference: no default and treat empty as an error · a CONSPICUOUS default that nothing legitimately produces · a plain default whose wrongness is visible on sight.** The conspicuous one is the **magenta** pattern borrowed straight from the theme cascade — a value nothing real generates, so hitting it is proof of a break rather than a guess that might be right. Run End's `unreported` is the live example.

🚫 **Never a default that is also a plausible real value.** The fallback firing and the system working then look identical, forever, with nothing to tell them apart.

**6 · No domain strings in calcs.** A [vl_Domain]{.field} comparison against `"event-status"` typed into a calculation returns FALSE forever if it is misspelled, silently, with nothing to highlight it. Custom function, one definition, autocompletes.

**7 · Implicit commits break transactions.** FileMaker's only rollback is: edit everything through relationships from **one** anchor record, then a single `Commit Records`, with `Revert Record` on error. `Go to Layout`, `Go to Record`, `New Record` and `Show All Records` all commit — which is why this discipline has to be adopted before the habits form.

**8 · Script-only layouts.** A script needs a layout for context. If it borrows a user-facing one, redesigning that layout breaks the script and the breakage is silent. It also destroys whatever the user was looking at.

**9 · Run Start / Run End.** [UTIL · Run Start](@script:script-util-run-start) writes the [UTILITY_LOGS]{.rel} row and returns the entry context. [UTIL · Run End](@script:script-util-run-end) writes the outcome and **puts the user back where they were**. An unlogged run is indistinguishable from one that never happened.

🔴 **Every failure path passes its OWN status.** Run End cannot see what happened upstream. Forget it and the row now reads `unreported` rather than `ok` — visible, but still a hole in the record. **This is the single easiest thing in the whole pattern to forget.**

🔴 **10 · One exit shape, on the last line. Added 2026-08-09 after it nearly locked the file open.** Omitting `Exit Script` does **not** return nothing — FileMaker persists the last subscript's result up to the caller ([Claris Community](https://community.claris.com/en/s/question/0D50H00006h8zTbSAI/why-exit-script-at-the-end-of-a-script)). So a script that falls off the end hands back a value produced by something else entirely, and the caller cannot tell.

Two live instances the same day: [Show ALL or NONE](@alias:script-find-all-or-none), whose success branches return the previous subscript's result to anyone checking; and [FILE · Close](@script:script-file-close), where the inherited result **is the close veto** and declining a backup prompt stopped the file from shutting. **A trailing `Exit Script` is not tidiness. It is the only way a script controls its own answer.**

⚠️ **`Allow User Abort [ Off ]`** is in the template because Escape mid-transaction leaves records half-written and uncommitted. It also disables the debugger's abort — **turn it back On while developing.**

## Script naming

Older FileMaker has no script folders and sorts alphabetically, so the prefix **is** the folder:

- `_TEMPLATE ·` — this file
- `FILE ·` — the file's own lifecycle: Open, Close, Save Backup. Fired from File Options, not by a person
- `FIND ·` — one per entity, returns a found set
- `GOTO ·` — one per destination. **The whole body is `Go to Layout`.** Nothing else, ever
- `SHOW ·` — sets state, then calls `GOTO ·`. The door a human or a button uses
- `UTIL ·` — Run Start, Run End, registry refreshers
- `BUILD ·` — generators (workdays, projections, theme rows)
- `EXPORT ·` — the print/export chain

⚠️ **`FILE ·` was missing from this list until 2026-08-09** while two specced scripts already used it. A naming standard that does not list a prefix in live use is how a file ends up with two conventions — which is exactly what happened in the script workspace. **Add the prefix here in the same pass as the first script that uses it.**

🔴 **`GOTO ·` and `SHOW ·` are two scripts on purpose.** A utility script needs to *land* somewhere without disturbing state; a person needs to *arrive* somewhere meaningful. Collapse them and every internal jump silently rewrites the user's current calendar.

**Folders mirror the prefixes 1:1 and hold nothing else.** See [the scripts index](@scripts) for the one-taxonomy ruling — a folder that does not correspond to a prefix is a second filing system, and one of the two always goes stale.

---

## 🔴 DOCUMENTING a script — the page has rules too, and they were broken first

The rules above govern the script. This section governs its PAGE, and it exists because the first eleven pages in this folder were written without it.

**Every FileMaker object named in prose gets its marker.** `[UTIL · Run Start](@script:script-util-run-start)` · `[fkCalendar](@rel:table-events)` · `[dateFormat]{.calc}` · `[$$SESSION.token]{.global}` · `[OnFirstWindowOpen]{.trigger}` · `[vl_Kind]{.vl}` · `[util_VALUES]{.layout}`.

**Every claim you did not verify gets `{.tbc}` or `{.verify}`. Every thing that should exist and does not gets `{.gap}`. Every retired name gets `{.alias}`, pointed at the live one.**

⭐ **The reason is not tidiness, and it is the thing that was missed: a callout and an emoji are read by a HUMAN ON THAT PAGE. A marker is amassed at build time into the report, across the whole site.** So `⬜ not verified` in prose and `{.tbc}` look equally serious to the person writing them, and only one of them can answer *what is unconfirmed across this whole app.* Writing the first and skipping the second produces a build report that says the tree is clean.

🔴 **Prefer the LINK form for `script`, `rel`, `calc`, `vl`, `layout` and `alias`.** A span records a MENTION; a link records an EDGE, and the edges are what turn this folder into a call graph instead of a list of names. **A dead reference never degrades into a span** — it renders as a visible broken marker — so only link to an id that exists.

🚫 **Never put a marker inside a verbatim code block.** A marker inside evidence is an edit to the evidence, and it would not render anyway.

⚠️ **`status:` is REQUIRED in the frontmatter.** A page without one is reported as NOT BUILT, its id never registers, and **every link pointing at it breaks silently.** Six pages in this folder shipped without it on 2026-08-09.

## Unverified

- **Rule 1** is stated from knowledge, not tested in this file. {.tbc} It is load-bearing for the shape of every script here — **confirm it before the convention is locked.**
- **Rule 5** needs FileMaker 16+. {.verify} File options currently declare a minimum allowed version of 12.
- Whether `@script:` resolves against these page ids as expected. {.verify} The resolver matches any built page id, so it should; **read the first build report rather than assuming it.**
