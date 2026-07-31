# The FileMaker app package

*What documentation a FileMaker build gets, and where each piece sits. Written 2026-07-31, from the shape proven on `hml-llc`. Applies to every FMP solution going forward.*

A FileMaker solution is documented as a package under `apps/`, and the package **mirrors FileMaker's own *Manage* menu**. Open `tables/` here and you should be looking at the same list you see in the IDE. That mirror is the whole design: you never decide where a thing goes, you copy where it already is, and the repo's depth-cap exemption exists specifically to allow it.

The rule that makes the mirror worth having is that it survives a cold read. Somebody who has never opened the file can navigate it, because they are navigating FileMaker, not somebody's taxonomy.

## The shape

```
apps/<app-slug>/
  README.md              the menu — every document, and the ones that should exist and do not
  build-sheet.md         start here before a build session
  next-build-spec.md     where feature requests land
  architecture-notes.md
  data-standards.md
  design-decisions.md
  changelog.md
  tables/
  relationships/
  calculations/
  scripts/
  functions/
  layouts/
  value-lists/
  fixtures/
```

**Mirrored folders are the application. Root files are the prose about the application.** That line decides every placement question you will have, and it is why there is no `meta/` folder: `meta/` has no counterpart in the *Manage* menu, so it does not qualify for the mirror exemption, and its files are legal at package root anyway with a segment to spare.

## Casing

Mirrored names keep FileMaker's casing. `tables/Loans.md`, because the table is called `Loans`. `scripts/60_PAYMENTS/`, because that is what the Script Workspace calls the folder — renaming it breaks the mirror and the mirror is the point.

Everything else is kebab-case like the rest of the repo. `build-sheet.md`, `architecture-notes.md`.

The test is one question: could you read this name off a FileMaker dialog? If yes, keep its casing. If no, kebab it.

## State stamps

Every page carries one, and an unstamped page is a defect rather than an oversight.

**🥇 GOLDEN** is the target — what we are building toward, not what exists. **🔨 BUILT** is verified in the file, and it carries the date it was verified. **⛔ SUPERSEDED** is do-not-implement, kept with a pointer to what replaced it.

This is the most load-bearing convention in the package and it earns that on evidence. Documentation that cannot distinguish a target from a fact will eventually be read as a fact, and then somebody builds to it. The workspace has already lost a naming standard exactly that way: a page describing intended conventions was cited as the gold standard for weeks after the build had walked away from it in four separate places, because nothing on the page said which state it was in.

Pair the stamp with the verification date and one line does both jobs:

```
🔨 BUILT · verified in file 2026-07-29
```

"Last touched" is not the same fact and is much less useful. Copying a file is not verifying it.

## Notes, registers, copy targets

Three kinds of file live in a package and they behave differently.

**Notes** are prose. What a table means, what breaks if you get it wrong, the thing that catches people. A table page opens with its grain — *one record means one note with its own terms* — because grain is the fact everything else depends on and the one most often left implicit.

**Registers** are enumerations: a field list, a script inventory. They may be tabular, because seventeen fields written as paragraphs is unreadable in a way the table is not. But a register alone is a data dump. Each one sits beside a note carrying the part a table cannot hold.

**Copy targets** are neither. A `.fmscript` is not read, it is *typed* — hand-entered into the script workspace step by step — and a `.fmcalc` pastes back into the calculation dialog verbatim. Everything in one has to be something you want to type. Status, history and defect flags go in a `<name>.notes.md` sidecar, and the split is the whole file rather than a section below a marker, because `#` is a valid FileMaker comment step and over-selecting past a marker does not fail, it silently pastes your changelog into the script.

## No machine index

A package does not carry `_index.json` files. This repo forbids a viewer outright, so nothing reads them, and a machine-readable inventory with no machine reading it is a second index that drifts against the README until one of them is wrong and you cannot tell which.

The `README.md` is the index. It is also the only index.

## What does not live here

**Questions.** A `- [ ]` in this repo is dead text — nobody can answer it. Decision logs stay in ClickUp, where the checkbox is real and the inverted polarity works. The package carries findings; the log carries the asking.

**Records.** A signed payoff quote, a completed form, a dated acknowledgment. Those are FileMaker's, tied to a person or a production. A record may carry a path into this repo; the repo never holds a copy of a record.

**Templates.** A blank form or a letterhead is a binary asset the application exists to hold. It is not a record and it is not prose. It lives in the app.
