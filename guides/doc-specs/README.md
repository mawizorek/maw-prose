# 🪦 TOMBSTONE — Doc Specs

**This folder is RETIRED as of 2026-08-07.** Michael: *"The one inside URITP docs is definitely the
one I want to keep. The one in MAW pros is functionally dead, so I never want to see it again."*

## Canonical home

**`mawizorek/uritp-docs` → `doc-specs/`**

🚫 **Do not read the specs in this folder. Do not update them. Do not point anything at them.**

## What moved

All four specs that existed only here were migrated to `uritp-docs/doc-specs/` on 2026-08-07 and
re-authored to that site's frontmatter contract:

| Spec | New home |
|---|---|
| `contact-sheet.md` | `uritp-docs/doc-specs/contact-sheet.md` |
| `crew-call.md` | `uritp-docs/doc-specs/crew-call.md` |
| `letterhead.md` | `uritp-docs/doc-specs/letterhead.md` |
| `production-calendar.md` | `uritp-docs/doc-specs/production-calendar.md` |
| `info-sheet.md` | **superseded** — `uritp-docs` already held a newer, larger version |

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
  folder, it is stale.
- `brain-config/hooks/doc-destroyer-reconcile.md` may carry the same retired coordinate.
