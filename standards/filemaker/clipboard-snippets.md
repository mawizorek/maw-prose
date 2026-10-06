---
id: fmp-clipboard-snippets
title: Clipboard snippets
status: public
type: standard
summary: How a script written in this repo gets into FileMaker without retyping it. The fmp-renderer turns the .fmscript into FileMaker's clipboard format on demand; nothing generated is stored.
revised: 2026-10
---

# Clipboard snippets

## Why plain text does not paste

FileMaker's Script Workspace ignores ordinary text on the clipboard. It only accepts steps in its own XML, `fmxmlsnippet`, carried under a private clipboard type, `XMSS`. Copy a `.fmscript` from GitHub and paste it, and nothing happens. Proven on URITP People's PEOPLE_Compare, 89 steps, 2026-10-05.

## The .fmscript is the only source

A script lives here once, as its readable `.fmscript`. Its XML is derived, so it is never committed: a stored copy is a second version of the script that drifts the first time someone edits one and not the other.

## Getting a script into FileMaker

Open the app in the fmp-renderer, go to Scripts, pick the script, press Copy for FileMaker. The renderer reads the `.fmscript`, builds the XML in the browser, and copies a one-line Terminal command with the XML baked in. Paste it into Terminal, press Enter, click into an empty script in FileMaker, press ⌘V. Nothing touches the disk, so it does not matter where or whether the repo is checked out.

A browser cannot put FileMaker's private clipboard type on the clipboard itself, which is the only reason Terminal is in the loop.

## Steps that do not translate yet

The renderer translates only steps whose XML has been proven by a real paste. Any other step pastes as a comment reading `TYPE BY HAND:` followed by the original line, and shows in red before you copy, so a script never pastes silently short. Type those few by hand.

To teach the renderer a new step: build it once in FileMaker, copy it, and read what FileMaker wrote. This command saves the clipboard's steps to a file:

```
osascript -e 'the clipboard as «class XMSS»' | sed 's/^«data XMSS//; s/»$//' | xxd -r -p > step.xml
```

That file is what the translation for the step gets written from, so the renderer only ever writes XML FileMaker itself produced.

## What resolves on paste

Fields resolve by table occurrence and field name, so a script written against the file's real names pastes cleanly. A name that does not exist pastes as a missing-field marker rather than failing, which makes it easy to find. Check every Go to Layout step after a paste.
