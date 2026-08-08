---
id: table-producers
title: Producers
type: reference
status: public
order: 10
revised: Aug 2026
summary: Who presents the work. Carries the logo.
---

# Producers

!!! abstract "Grain"
    One producing organization. URITP, Ogunquit Playhouse, a student org.

⭐ **This is the table that makes the app portable.** The legacy file held `VenueLOGO` and `ProductionLOGO` as globals on SETUP, so branding was baked into the file rather than attached to whoever is presenting. A producer record with logos means a calendar for a non-URITP show comes out correctly branded with zero code.

## Open

- ⬜ **Legacy had a PRODUCTION logo too, and it has no home now.** `media_LogoWide` here is the producer's mark; a show's own artwork belongs on PRODUCTIONS. Add it there or decide shows do not get artwork.
- ⬜ **`fkProducer` on PRODUCTIONS is singular.** A co-production has two producers, and both logos print. If that is real, this wants a join.
- Which logo prints where is a PRINT_PRESETS decision, not a field here.

## Fields

See [PRODUCERS.tsv](./PRODUCERS.tsv).
