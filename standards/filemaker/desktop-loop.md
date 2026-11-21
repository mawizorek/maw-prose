---
id: fmp-desktop-loop
title: "Desktop loop: building FileMaker with an agent session"
type: reference
status: hidden
summary: How a cold agent works with Michael's desktop to change a FileMaker file. State comes in as a DDR, change goes out as a commit plus one local command, proof comes back as a rerun or a fresh DDR.
---

# Desktop loop

Proven 11-20 and 11-21-2026 building URITP Utilities: 10 tables in one paste, a 112-step script in one paste, zero fields typed.

**Two sides.** Michael at the desktop: FileMaker, Terminal, and a local pull of maw-prose at `/Users/pm-prod/_repos/maw-prose`. The agent in a ClickUp session, logging to its session task on the Agent Activity Board.

## The loop

1. **Open.** Seat the agent from its bundle (Fiona builds; Anna holds scope when asked). Open the session task. Write the definition of done in Michael's words before touching anything.
2. **State in.** Michael exports Tools > Database Design Report > XML and drops `<File>_fmp12.xml` in chat. Never `Summary.xml`. Never Save a Copy as XML (it carries auth data). The agent parses the DDR in its sandbox and never builds against an older one.
3. **Diff.** The agent compares the DDR to the source in `apps/<app>/schema/` and `apps/<app>/scripts/`, and reports drift by name: fields, tables, layouts, occurrences, broken references.
4. **Brief.** Before any commit or paste, in plain words: what changes (by name), why it is needed now, what Michael will do (keystrokes in order). Structural or destructive moves wait for a go.
5. **Commit, then command.** The agent commits FileMaker source to maw-prose `main`, checks that each committed blob SHA equals the file it tested, and only then hands over the command. A command that names something not yet committed is a failure.
6. **Paste.** Michael runs one line from the local pull:

        cd /Users/pm-prod/_repos/maw-prose && git pull && python3 tools/fmp/fmp-tables.py apps/<app> [TABLE …]
        cd /Users/pm-prod/_repos/maw-prose && git pull && python3 tools/fmp/fmp-script.py "apps/<app>/scripts/<name>.fmscript"

    Tables: Manage Database > Tables > Cmd-V. Scripts: Script Workspace > new script > step pane > Cmd-V. Any `!!` line printed by a tool is read before pasting.
7. **Hand steps.** Paste only adds. Every delete, rename, relationship, layout fix and data-source link is listed by name for Michael to do.
8. **Proof.** A screenshot or a fresh DDR. Counts are checked against the brief. Anything meant to be safe to rerun gets rerun, and the counts must not move.
9. **File wins.** When Michael renames or deletes in FileMaker, the next DDR shows it and the agent updates the source to match. The source never overwrites a choice Michael made in the file.

## Teaching the tools a new shape

The tools only emit XML that FileMaker produced. For an unproven field or step, Michael builds or picks one real example, copies it, and saves the clipboard:

    osascript -e 'the clipboard as «class XMTB»' | sed 's/^«data XMTB//; s/»$//' | xxd -r -p > ~/Desktop/XMTB.xml
    osascript -e 'the clipboard as «class XMSS»' | sed 's/^«data XMSS//; s/»$//' | xxd -r -p > ~/Desktop/XMSS.xml

XMTB for tables (Manage Database > Tables), XMSS for script steps. Check that a capture holds no literal token before dropping it in chat. The agent writes the translation into `tools/fmp/` from that file only.

## Rules that keep it clean

- Local repo only. Never hand Michael a downloaded file to run.
- Design for the edge case, build for today. A field must answer a need in the current phase.
- Don't mirror the mess. ClickUp's band-aid fields and multi-list homes stay out of the build.
- Names: singular tables and occurrences; `uniqAuto_` on auto-enter uniqueness keys; `Name_Display` for labels; `Code` for immutable identity; no table names inside SQL strings, only `sql.Table ( GetFieldName ( … ) )`.
- One decision per button card.
- Every reply logs a spine line; every step lands as a short comment on the session task.

## Tools

- `tools/fmp/fmp-tables.py`: schema tsv to tables
- `tools/fmp/fmp-script.py`: .fmscript to script steps, a port of the renderer's `fmscript.js`
- `standards/filemaker/clipboard-snippets.md`: the clipboard standard these follow
- `apps/zFMP-drops/`: the repo drop for DDRs when a session isn't open
