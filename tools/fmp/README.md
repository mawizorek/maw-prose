# FileMaker paste tools

Run from the repo root of a local pull. Each tool puts FileMaker's private clipboard type on the clipboard; then paste in FileMaker.

## Tables

    python3 tools/fmp/fmp-tables.py apps/<app>
    python3 tools/fmp/fmp-tables.py apps/<app> xt_RECORD sync_EVENT

Manage Database > Tables tab > Cmd-V. Source is `apps/<app>/schema/<TABLE>.tsv`; the filename is the table name. Grammar is in the script header.

Anything the tool cannot translate (calculation fields, calculation validation, range checks) is listed with `!!` and skipped, never pasted silently short.

`audit-fields.xml` is the five audit fields exactly as FileMaker copied them from URITP Utilities on 11-21-2026. Every other shape in the script was read from that same copy.

## Teaching it a new shape

Build the field once in FileMaker, copy its table, then save the clipboard:

    osascript -e 'the clipboard as «class XMTB»' | sed 's/^«data XMTB//; s/»$//' | xxd -r -p > ~/Desktop/XMTB.xml

Write the translation from that file only.
