---
id: table-producer-info
title: PRODUCER_INFO
type: reference
status: unlisted
order: 10
revised: 2026-08
summary: A name in the index with no table behind it. Likely folds into PRODUCERS.
---

# PRODUCER_INFO

⬜ **Named in the index, not designed.**

[[PRODUCERS](@table-producers)] already holds the producing organization: name, short name, display name, and the wide/square logos that make the app portable to a non-URITP show.

**So the open question is whether PRODUCER_INFO is anything at all.** Two readings:

- **A fold-in.** Same entity, leftover name → delete the index row and point at PRODUCERS.
- **A child.** Per-production producer DETAIL — billing contact, credit-block wording, a logo override for one show. ⚠️ **Then it is a JOIN between PRODUCTIONS and PRODUCERS, not a second producer table**, and it should be named like one.

🚦 **Unruled. Do not build it on either reading yet** — the second is a join wearing an entity's name, which is precisely how a schema grows a duplicate.

`unlisted`: the link resolves, the nav stays clean.
