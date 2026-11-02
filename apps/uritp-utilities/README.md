---
id: uritp-utilities
title: URITP Utilities
status: public
type: index
summary: The shared FileMaker transport and external-record mirror hub for the URITP fleet.
revised: 2026-11
---

# URITP Utilities

## Boundary

`URITP Utilities.fmp12` owns transport, external-system credentials, the external field catalog, latest raw payloads, engine vocabulary and the shared event log. Consuming apps reference the hub through relative external data sources. The hub never references a consuming app.

Each app keeps its domain tables, `Target_Tables`, `XTERNAL_JOINS`, `sync_RECONCILE`, dispatch and entity upserts. Its thin `sync RUN` orchestrator calls the hub with JSON parameters and receives JSON results. Org identity, fiscal years and departments remain in URITP GLOBAL Setup.

## Reference

The table notes and field registers are the target schema, not evidence of the contents of a live FileMaker file. Open them in the [FMP Renderer](https://mawizorek.github.io/ClickUp_apps/fmp-renderer/).

- [xt_SYSTEMS](tables/xt_SYSTEMS.md): systems, codes and credentials.
- [xt_CONTAINERS](tables/xt_CONTAINERS.md): mirrored lists and repositories.
- [sync_SOURCES](tables/sync_SOURCES.md): views and paths feeding containers.
- [xt_RECORDS](tables/xt_RECORDS.md): latest external records and stable join keys.
- [xt_FIELDS](tables/xt_FIELDS.md): external field catalog and semantic mapKeys.
- [sync_SESSIONS](tables/sync_SESSIONS.md): run provenance and summaries.
- [sync_EVENTS](tables/sync_EVENTS.md): transport and app-reported events.
- [value_LISTS](tables/value_LISTS.md): engine vocabulary lists.
- [VALUES](tables/VALUES.md): seeded vocabulary codes and labels.
- [Next build spec](next-build-spec.md): build order and script contracts.
- [Build sheet](build-sheet.md): last reported progress, unverified work and integration gates.

## Identity and sending rules

J19 through J23 govern this target. Scripts use machine identity or stable validated codes, never mutable display labels. App-to-hub script calls are picked from the Perform Script list, not calculated from names. A push rechecks the external version and refuses a mismatch. No live People sync is repointed until People passes Checkpoint 2 in-file.

## Reference gaps

A relationship/TO register, layout notes, script copy targets and a per-file custom-function inventory have not been authored for Utilities. The script contracts remain in the build spec; there are no placeholder scripts here. The cross-repository GitHub identity limitation is called out in the xt_RECORDS note and is not silently redesigned.

## Data handling

This repository contains schema, not records. Never publish tokens, actual payloads, recipient data or session/event exports here. Utilities is a credential-bearing local file; credentials are entered on the destination device, never copied through documentation.
