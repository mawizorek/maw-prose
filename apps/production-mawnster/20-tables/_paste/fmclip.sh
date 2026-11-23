#!/bin/bash
# Put a FileMaker field snippet (XMFD) on the macOS clipboard.
# Usage: bash fmclip.sh DOCz_PACKAGE.fields.xml
# Then: Manage Database > Fields > Cmd-V
set -euo pipefail
f="${1:?usage: bash fmclip.sh <file.fields.xml>}"
[ -f "$f" ] || { echo "no such file: $f" >&2; exit 1; }
hex=$(xxd -p "$f" | tr -d '\n')
osascript -e "set the clipboard to run script \"«data XMFD${hex}»\""
echo "Clipboard: $(basename "$f"). Manage Database > Fields > Cmd-V."
