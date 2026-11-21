---
id: table-producers
title: Producers
type: reference
status: public
order: 10
revised: Aug 2026
summary: Who presents the work. Carries the logo.
data:
  catalog:
    file: PRODUCERS.tsv
---

# Producers

!!! abstract "Grain"
    One producing organization. URITP, Ogunquit Playhouse, a student org.

!!! data "catalog"

⭐ **This is the table that makes the app portable.** The legacy file held `VenueLOGO` and `ProductionLOGO` as globals on SETUP, so branding was baked into the file rather than attached to whoever is presenting. A producer record with logos means a calendar for a non-URITP show comes out correctly branded with zero code.

## Open

- ⬜ **Legacy had a PRODUCTION logo too, and it has no home now.** `media_LogoWide` here is the producer's mark; a show's own artwork belongs on PRODUCTIONS. Add it there or decide shows do not get artwork.
- ⬜ **`fkProducer` on PRODUCTIONS is singular.** A co-production has two producers, and both logos print. If that is real, this wants a join.
- Which logo prints where is a PRINT_PRESETS decision, not a field here.

## Fields

See [PRODUCERS.tsv](./PRODUCERS.tsv).


# PRODUCER_INFO

⬜ **Named in the index, not designed.**

[[PRODUCERS](@table-producers)] already holds the producing organization: name, short name, display name, and the wide/square logos that make the app portable to a non-URITP show.

**So the open question is whether PRODUCER_INFO is anything at all.** Two readings:

- **A fold-in.** Same entity, leftover name → delete the index row and point at PRODUCERS.
- **A child.** Per-production producer DETAIL — billing contact, credit-block wording, a logo override for one show. ⚠️ **Then it is a JOIN between PRODUCTIONS and PRODUCERS, not a second producer table**, and it should be named like one.

🚦 **Unruled. Do not build it on either reading yet** — the second is a join wearing an entity's name, which is precisely how a schema grows a duplicate.

`unlisted`: the link resolves, the nav stays clean.
