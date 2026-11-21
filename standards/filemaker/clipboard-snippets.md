---
id: fmp-clipboard-snippets
title: Clipboard snippets
status: public
type: standard
summary: How scripts and tables written in this repo get into FileMaker without retyping. Scripts render from .fmscript in the fmp-renderer; tables render from schema .tsv with tools/fmp/fmp-tables.py. Nothing generated is stored.
revised: 2026-11
---

# Clipboard snippets

## Why plain text does not paste

FileMaker ignores ordinary text on the clipboard. It only accepts its own XML, `fmxmlsnippet`, carried under a private clipboard type: `XMSS` for script steps, `XMTB` for tables. Copy a `.fmscript` from GitHub and paste it, and nothing happens. Proven on URITP People's PEOPLE_Compare, 89 steps, 2026-10-05.

## The readable file is the only source

A script lives here once, as its `.fmscript`. A table lives here once, as `apps/<app>/schema/<TABLE>.tsv`. The XML is derived, so it is never committed: a stored copy is a second version that drifts the first time someone edits one and not the other.

## Getting a script into FileMaker

Open the app in the fmp-renderer, go to Scripts, pick the script, press Copy for FileMaker. The renderer reads the `.fmscript`, builds the XML in the browser, and copies a one-line Terminal command with the XML baked in. Paste it into Terminal, press Enter, click into an empty script in FileMaker, press ⌘V. Nothing touches the disk, so it does not matter where or whether the repo is checked out.

A browser cannot put FileMaker's private clipboard type on the clipboard itself, which is the only reason Terminal is in the loop.

## Getting tables into FileMaker

Proven 2026-11-21: ten URITP Utilities tables, 54 fields plus audit fields, one paste.

From the repo root of a local pull:

```
python3 tools/fmp/fmp-tables.py apps/<app>
python3 tools/fmp/fmp-tables.py apps/<app> xt_RECORD sync_EVENT
```

Then Manage Database → Tables tab → ⌘V. Tables arrive with their fields, comments, auto-enter, validation and indexing, and FileMaker creates a table occurrence for each.

- One `.tsv` per table; the filename is the table name. Columns: Field_Name, Type, Options, Notes, status. Notes become field comments.
- Options grammar is in the script header: `audit`, `key`, `fk`, `not empty`, `unique`, `strict`, `always`, `indexed`, `raw`, `auto <value>`, `calc: <expr>`.
- Anything the tool cannot translate yet (calculation fields, calculation validation, range checks) prints as `!!` and is skipped. A table never pastes silently short. Do those few by hand.
- A table whose name already exists pastes alongside it, not over it. Rename or delete the old one first.
- `tools/fmp/audit-fields.xml` holds the five audit fields exactly as FileMaker copied them.

## Teaching a tool a new shape

The tools translate only what a real paste has proven. To add a step or field shape, build it once in FileMaker, copy it, and read what FileMaker wrote.

Script steps:

```
osascript -e 'the clipboard as «class XMSS»' | sed 's/^«data XMSS//; s/»$//' | xxd -r -p > step.xml
```

Tables (copy the table in Manage Database → Tables):

```
osascript -e 'the clipboard as «class XMTB»' | sed 's/^«data XMTB//; s/»$//' | xxd -r -p > ~/Desktop/XMTB.xml
```

That file is what the translation gets written from, so the tools only ever write XML FileMaker itself produced. Script steps that do not translate yet paste as a `TYPE BY HAND:` comment and show in red in the renderer.

## What resolves on paste

Fields resolve by table occurrence and field name, so a script written against the file's real names pastes cleanly. A name that does not exist pastes as a missing-field marker rather than failing, which makes it easy to find. Check every Go to Layout step after a paste. Calculations inside pasted tables resolve against fields in the same paste, so list a calc's inputs above the calc.
