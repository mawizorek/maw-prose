---
id: fmp-clipboard-snippets
title: Clipboard snippets
status: public
type: standard
summary: How a script written in this repo gets into FileMaker without retyping it. Every .fmscript has an .xml twin, and one shell command puts it on the clipboard in the format Script Workspace accepts.
revised: 2026-10
---

# Clipboard snippets

## Why plain text does not paste

FileMaker's Script Workspace ignores ordinary text on the clipboard. It only accepts steps in its own XML, `fmxmlsnippet`, carried under a private clipboard type. Copy a `.fmscript` from GitHub and paste it, and nothing happens. Proven on URITP People's PEOPLE_Compare, 89 steps, 2026-10-05.

## Every script has two files

`<name>.fmscript` is the readable copy: what reviews read, what diffs show, what a person types from if they must. `<name>.xml` is the paste copy: the same steps as an `fmxmlsnippet`. They describe the same script and change together; an `.xml` that disagrees with its `.fmscript` is a defect.

The `.xml` is a copy target in the strictest sense. Everything in it lands in the script, so status and history go in the `.notes.md` sidecar like any other copy target.

## The two commands

Put these in `~/.zshrc` once:

```
fmpaste() { osascript -e "set the clipboard to «data XMSS$(xxd -p "$1" | tr -d '\n')»"; }
fmcopy()  { osascript -e 'the clipboard as «class XMSS»' | sed 's/^«data XMSS//; s/»$//' | xxd -r -p > "$1"; }
```

`fmpaste file.xml` loads a snippet; then click into an empty script and press ⌘V. `fmcopy file.xml` goes the other way: select steps in Script Workspace, ⌘C, run it, and the steps land in the file. That is how an improvement made in FileMaker comes back to the repo instead of living only in the file.

`XMSS` is the type for script steps. FileMaker uses other four-letter types for other objects, and the commands work the same way with the type swapped.

## What resolves on paste and what does not

Fields resolve by table occurrence and field name, so a snippet written against the spec's names pastes cleanly into any file that uses them. A name that does not exist pastes as a missing-field marker rather than failing, which makes it easy to find. Layout references are the weak spot: check every Go to Layout step after a paste.

## Writing a snippet

Each step is one `<Step enable="True" id="…" name="…">` element, with its calculations in CDATA. The ids are FileMaker's own step ids: Set Variable 141, If 68, Else 69, Else If 125, End If 70, Loop 71, Exit Loop If 72, End Loop 73, Set Field 76, Set Field By Name 147, Go to Layout 6, Go to Record/Request/Page 16, Enter Find Mode 22, Perform Find 28, Show All Records 23, New Record/Request 7, Commit Records/Requests 75, Exit Script 103, Set Error Capture 86, comment 89. When in doubt about a step's XML, build the step once in FileMaker, `fmcopy` it, and read what FileMaker wrote.
