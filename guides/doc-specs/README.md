# 🪦 TOMBSTONE — Doc Specs

**This folder is RETIRED as of 2026-08-07.** Michael: *"The one inside URITP docs is definitely the
one I want to keep. The one in MAW pros is functionally dead, so I never want to see it again."*

## Canonical home

**`mawizorek/uritp-docs`** — 🔒 that repo is PRIVATE while this one is PUBLIC. Do not carry a
visibility judgment across this pointer in either direction.

🚫 **Do not read the specs in this folder. Do not update them. Do not point anything at them.**

## What moved

All four specs that existed only here were migrated to `uritp-docs` on 2026-08-07 and re-authored to
that site's frontmatter contract.

🔴 **Resolve each by its `@id`. Do not use the paths below as addresses** — `uritp-docs` is being
FLATTENED, with pages consolidating into one `REPO_PAGES/` folder keyed by slug id and layout coming
from the renderer and binder specs rather than the folder tree. The paths are where each file was
observed on 2026-10-10 and they are expected to change:

| Spec | `@id` | Observed 2026-10-10 |
|---|---|---|
| `contact-sheet.md` | `@report-contact-sheet` | ✅ `REPO_PAGES/report-contact-sheet.md` — already consolidated |
| `crew-call.md` | `@crew-call` | `doc-specs/crew-call.md` |
| `letterhead.md` | `@letterhead` | `doc-specs/stewards/producer/letterhead.md` |
| `production-calendar.md` | `@production-calendar` | `doc-specs/production-calendar.md` |
| `info-sheet.md` | **superseded** | `uritp-docs` already held a newer, larger version |

🪦 **Two corrections here, both 2026-10-10 (DOC REVIEW 001).**

**First:** this table named `uritp-docs/doc-specs/contact-sheet.md` and
`uritp-docs/doc-specs/letterhead.md`. **Neither path existed.** Both specs are real and were located
by code search; only the destinations were wrong. **A tombstone that points at nothing is worse than
no tombstone** — it reads as authoritative, it sends the reader to a 404, and the reader's next move
is to assume the spec was lost and rewrite it. That is how you get a third claimant.

**Second, and it was the reviewer's error, not the author's:** the first correction flagged
`REPO_PAGES/report-contact-sheet.md` as 🔴 *"not in `doc-specs/` at all"*, as though being there were
the defect. **It is the destination.** That page is ahead of the migration, not outside it.

Which sharpens the original lesson rather than replacing it: **a path can be wrong in two directions,
stale or early, and the `@id` is the only half of the record that survives both.** Internal links
resolve on id. Write the id; treat any path as a dated observation.

**The files are left in place rather than deleted**, per the house rule that a retired thing gets a
tombstone and not a hole. They are frozen. The canonical copies are the ones in `uritp-docs`.

## Why this folder existed and why it stopped

It was the v1 of the doc-spec system and it worked. The migration to `uritp-docs` started, moved
`info-sheet` across, and **stalled with four specs still living only here** — which is why a sweep on
2026-08-07 found two live folders both claiming the same job, each with a README stating an exclusive
contract, neither mentioning the other.

⚠️ **The live consequence, recorded because it is the instructive part:**
`brain-config/hooks/production-doc-audit.md` resolved its spec source to this folder from 2026-08-02
to 2026-08-07. **Every audit in that window compared production documents against specs in the dead
repo and reported clean.** A freshness tool reading a retired source is worse than no tool. The hook
was repointed at v1.1.

**A stalled migration looks exactly like duplication.** The tell is that one copy is growing and the
other is not. Check which before calling either one dead — and check for orphans before culling,
because four of the five files here had no counterpart at all.

## Still to do

- The `Spec URL` custom field on the doc-type tasks in the ClickUp **Document TEMPLATES** list
  (`901319214267`) may still point here. **A `Spec URL` is data, not truth** — if it names this
  folder, it is stale. ⚠️ And once the flattening lands, a `Spec URL` holding any path at all is a
  field holding the wrong kind of value; it wants the slug id.
- `brain-config/hooks/doc-destroyer-reconcile.md` may carry the same retired coordinate.
- 🔴 **These spec bodies are still on `main` and discoverable by anything that walks the tree.** The
  "do not read" instruction works on a human and does nothing to a crawler or a cold agent. Deleting
  them is Michael's call; flagged here rather than acted on.
