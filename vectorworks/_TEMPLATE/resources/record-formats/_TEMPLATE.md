---
id: TEMPLATE-record
name: "Record Format Name"
type: record-format
status: gap
folder: "Resource Manager folder path"
grain: "one row = one <thing>"
attached_to: TEMPLATE-symbol
data: fields.tsv
use: "one line. what this record is for."
---

# Record Format Name

🔑 **This is the one VWX noun that genuinely mirrors a FileMaker table**, so it carries a `grain:` line and a field register exactly like `apps/<app>/tables/<Table>.md` does. Same shape, same reasoning, deliberately not reinvented.

<!--
KEYS beyond the class set

grain        "one row = one <thing>". The sentence that stops a record from
             quietly holding two different kinds of thing. 🔴 A record file
             with no grain is RED in the renderer.

attached_to  the @id of the symbol or object type this record is attached to.
             An unattached record format holds no data and is a finding.

data         the sibling .tsv holding the field register, placed in the body
             with `!!! data "<slot>"`.
-->

!!! abstract "Grain"

    One row = one \<thing\>. Replace this, and be specific enough that a
    second kind of thing could not be smuggled in.

## Fields

!!! data "fields"

Sibling `fields.tsv`, columns by header name: `Field_Name`, `Type`, `Options`, `Notes`, `status`.

⚠️ **`status` on a field row is a field GROUP, never build state.** Same rule as the FileMaker register, and it is the rule most often broken on first use.

## Who reads the data

A worksheet, a data tag, an export, a downstream tool. Name it — a record nobody reads is a record that will rot without anybody noticing.
