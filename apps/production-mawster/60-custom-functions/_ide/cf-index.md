---
id: mawster-ide-cf-index
title: "IDE mirror - Custom Functions (INDEX ONLY)"
type: reference
status: hidden
order: 1
revised: 2026-08
summary: Index of the 10 custom functions present in Production_MAWnster. Deliberately NOT a transcription - the canonical bodies live in another repo.
---

# IDE mirror - Custom Functions *(INDEX ONLY)*

<!-- INDEX, NOT A TRANSCRIPTION. Deliberate scope limit, ruled by Michael 2026-08-16.
     Source: mawizorek/uritp-docs @ d47535e,
     production-mawster/90-file-imports-temp/DDR_imports/2608151650/raw.txt, part 21/21.
     Chunk set UUID 7534bbed-6a2a-4d5a-a2a2-7d3b00ced5b8, START/END UUIDs verified. -->

## 🔴 Why this file has no function bodies

**Custom functions are stored canonically in a different repo. What appears in this app is a
projection of those.** Michael's ruling, 2026-08-16:

> *"C.F. are stored canonically in the other repo - these are just a projection of those."*

So transcribing the ten definitions here would create a **second claimant** on text that
already has an owner, and the copy would go stale the first time the canonical version is
edited. This file therefore records **names, signatures and call sites only** — enough to
reconcile against the canonical library, and nothing that can rot into a rival source.

⚠️ **This is the OPPOSITE of the rule in `70-scripts/_ide/`.** Scripts are transcribed verbatim
because the file IS their only home. Custom functions are not. The distinction is
source-of-truth, not importance.

## 📋 THE RECONCILIATION RULE — read this before the next DDR pass

Established 2026-08-16 for every future DDR reconciliation on this app:

1. Pull the **CF name index** from the DDR (the list below, refreshed).
2. Compare it against the files in the **canonical CF repo**.
3. **Confirm each one EXISTS. Stop there.**
4. **Do NOT diff line-for-line.** If a function is present in both places, that is a pass.

Michael's wording:

> *"we'll compare an index of the CF vs the files we have in our CF canonical repo and confirm
> they all exist. no need to line for line them if you see they exist, kinda thing."*

**What a failure looks like:** a name in the DDR with no file in the canonical repo (the app
has a function the library does not know about — the real risk), or a file in the canonical
repo whose name never appears in the DDR (never installed here, which may be fine).

⚠️ **The canonical CF repo is not named in this file on purpose** — it was not stated in the
session that set this rule, and guessing at a repo coordinate is exactly the failure the
repo-referent gate exists to stop. **Resolve it live, from Michael or from the FileMaker
Canonical Object Library, before running step 2.** A cold agent that cannot resolve it says so
rather than picking a plausible repo.

## Completeness

The DDR Overview reports **`Custom Functions 10`**. Ten entries are printed and all ten are
indexed below.

🔴 **This section did not exist in DDR `2608142227`, which reported `Custom Functions 0`.** That
zero was previously flagged as a possible DDR omission, since scripts were already calling
`Param` and friends. It was not an omission: the functions genuinely were not installed on
Aug 14. Scripts written against them were calling functions that did not yet exist.

## Index

| # | Function | Parameters | Availability | Call sites (count) |
|---|---|---|---|---|
| 1 | `Param` | `elementList` | All accounts | 38 |
| 2 | `PText` | `key;value` | All accounts | 38 |
| 3 | `PNum` | `key;value` | All accounts | 6 |
| 4 | `Pjson` | `key;jsonValue` | All accounts | **0** |
| 5 | `Pbool` | `key;value` | All accounts | 7 |
| 6 | `ParamHas` | `json;key` | All accounts | **0** |
| 7 | `ParamGetText` | `json;key;fallback` | All accounts | 26 |
| 8 | `ParamGetNumber` | `json;key;fallback` | All accounts | 1 |
| 9 | `ParamGetBool` | `json;key;fallback` | All accounts | 3 |
| 10 | `JSONPatch` | `json;key;value;kind` | All accounts | 1 |

Call-site counts are the length of the DDR's own `In Field Definitions` + `In Scripts` list per
function. They are a reconciliation aid, not a definition.

### Notes worth carrying, taken from the index rather than the bodies

- ⚠️ **The function names are `Pjson` and `Pbool`, but their own header comments call them
  `PJSON ( ... )` and `PBool ( ... )`.** The declared name is what FileMaker resolves; the
  comment casing is not. When matching against the canonical repo, **match on the declared
  name.**
- ⚠️ **`Pjson` and `ParamHas` show ZERO call sites in the DDR.** `ParamHas` is nonetheless
  load-bearing: `ParamGetText`, `ParamGetNumber` and `ParamGetBool` all call it internally, and
  the DDR does not count CF-to-CF calls. `Pjson` appears genuinely unused so far. **Neither is
  evidence of a dead function; do not cull either.**
- ⚠️ `Param`'s header comment states **`Requires While ( ) — FileMaker 19.6 or later`**, while
  the file's `Minimum allowed version` is **`12.0`**. Recorded as an observation, not a verdict.
- ⚠️ The DDR lists `IMPORT_EVENTS::json_cleanImportDetails` as a **field-definition** call site
  for `Param`, `PText` and `Pbool`. These functions are used in a stored/calculated field, not
  only in scripts.
- 🔴 **`ErrJSON` does NOT appear in this file.** `70-scripts/index.md` records it as written
  2026-08-10. It is not among the ten installed here. No claim is made about where it lives.

## Call-site detail, verbatim from the DDR

Recorded because it is the actual dependency map, and it is the one thing this index can offer
that a body-diff cannot.

**`Param` and `PText`** — identical 38-entry lists:

```
IMPORT_EVENTS::json_cleanImportDetails   (field definition)
file | Create Backup
on App Open
on App Close
button | import EVENTS
button | generate events x workdays
new | workday x event
lookup | production short
import | new events
import | Event records
import | write row numbers
import | copy Payload
link | fkUtilityReport
link | fkReport fkProd Hash
import | delete empty rows
import | delete header row
import EVENT | remove ProdShortName
import | remove maw notes
import | bool all day
import | pass to workspace
compare | cu_ID
import | net new Event
import | merge Event
merge | compare field
XXmerge | Event Field
lookup | calendar for production
goTo | view_UTILITY_REPORTS
goTo | Calendars
goTo | new window currentRunReport
trigger_App_Open
new | Utility Report
end | Utility Report
new | Utility Log
Show ALL or NONE
status_index_move
exit w/ errors
button | generate Workdays
```

**`PNum`:**

```
import | merge Event
new | Utility Report
new | Utility Log
Show ALL or NONE
status_index_move
exit w/ errors
```

**`Pjson`:** (none)

**`Pbool`:**

```
IMPORT_EVENTS::json_cleanImportDetails   (field definition)
compare | cu_ID
lookup | calendar for production
new | Utility Report
new | Utility Log
status_index_move
exit w/ errors
```

**`ParamHas`:** (none printed — see the note above; it is called by three sibling functions)

**`ParamGetText`:**

```
set Global | pkCurrentUtilitySession
file | Create Backup
button | import EVENTS
new | workday x event
lookup | production short
import | new events
link | fkReport fkProd Hash
import EVENT | remove ProdShortName
import | pass to workspace
compare | cu_ID
import | net new Event
import | merge Event
backup | EVENT
merge | compare field
XXmerge | Event Field
lookup | calendar for production
goTo | view_UTILITY_REPORTS
goTo | Calendars
goTo | new window currentRunReport
App_Startup
new | Utility Report
end | Utility Report
new | Utility Log
Show ALL or NONE
status_index_move
exit w/ errors
```

**`ParamGetNumber`:**

```
XXmerge | Event Field
```

**`ParamGetBool`:**

```
import | pass to workspace
import | merge Event
backup | EVENT
```

**`JSONPatch`:**

```
backup | EVENT
```

⚠️ **The `Param`/`PText` list is the closest thing in the DDR to a full script census taken
from the other direction** — 37 script names plus one field. It is 15 short of the 52 scripts in
the file, and the absentees are mostly the `goTo` family, which take no parameters. Useful as a
cross-check on the script mirror; **not a substitute for the Script Hierarchy block.**
