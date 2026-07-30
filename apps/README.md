# Apps

*What is true about a particular application we built. Opened 2026-07-30.*

This is `venues/` for software, and the parallel is the reason it exists rather than being folded into `standards/`. A venue note tells you what is true about one room — where the dimmer racks are, what the beams hold. An app note tells you what is true about one application — what the tables mean, what the scripts do, where the thing will bite you.

Neither is a standard and neither is a guide. A standard is what correct practice looks like in general; a guide is how to perform a task. These are descriptions of one specific built thing, and they go stale the same way a venue note does, for the same reason: somebody changed the thing and did not come back here.

## What is in here

**`hml-llc/`** — the FileMaker solution that services private-money real-estate loans. Ten tables, a script tree, and a review fixture. Runtime is FileMaker 19, permanently.

## How an app package is shaped

The folders mirror the application's own menus rather than a taxonomy someone invented. For a FileMaker solution that means you open `tables/`, `scripts/`, `relationships/` and see the same names you would see in *Manage*. `CONVENTIONS.md` carries the exemption that allows this to go deeper than the usual three path segments, and the reasoning: you are not choosing where a thing goes, you are copying where it already is.

Two kinds of file live side by side in here and they behave differently.

**Notes** are the normal thing — prose, read cold, explaining what a table means and what breaks if you get it wrong.

**Registers** are the enumerations: a field list, a script inventory. Those are allowed to be tables, because a complete list you scan for one row is not something prose does well. But a register on its own is a data dump, so each one sits beside a note that says the part a table cannot hold.

**Copy targets** are the third kind and the strangest. A `.fmscript` is not read, it is *typed* — hand-entered into FileMaker step by step. So everything in one has to be something you want to type, and all the status and history goes in a `.notes.md` sidecar next to it. Get that wrong and you paste a changelog into a script at two in the morning.

## What is NOT in here

The repo HTML apps. Those are code, they live in `ClickUp_apps`, and their documentation is a README next to the code that runs — which is the right place for a thing whose reader is the person editing it.

And records. A signed payoff quote, a completed form, a dated acknowledgment — those are FileMaker's, tied to a person or a production. A FileMaker record can carry a path into this repo; nothing here holds a copy of a record.
