---
id: uritp-utilities-table-xt-records
title: xt_RECORDS
status: public
type: reference
summary: The latest raw external record, its version and the stable identity consumed by app joins and logs.
order: 40
revised: 2026-11
data:
  catalog:
    file: xt_RECORDS.tsv
---

# xt_RECORDS

!!! abstract "Grain"
    One external record: a ClickUp task or a file in a GitHub repository.

## Fields

!!! data "catalog"

## Latest payload, not a second domain table

Pull writes the raw JSON to `xt_Payload` when `xt_Version` changes. An unchanged ClickUp date_updated or GitHub SHA skips the record. Previous transport activity belongs in [sync_EVENTS](@uritp-utilities-table-sync-events); the cache keeps only the latest payload.

`xt_Label` supports lists, finds and sorts before a consuming app has adopted the record. It is not an identity. A ClickUp task belongs to its home container even when it appears in additional Lists.

## App joins survive a cache rebuild

Apps keep their own XTERNAL_JOINS and use `xt_Key`, never this table's local `PrimaryKey`. Events also retain the external key. The v1 target defines a stored auto-enter text value as system `Code` plus `:` plus `xt_ID`, indexed and strictly unique.

!!! warning "GitHub identity is not yet repository-scoped"
    The v1 formula does not include the container. Since GitHub xt_ID is a repository-relative path, the same path in two repositories produces the same key under the github system. The formula is retained here without claiming it is collision-safe across repositories. Multi-repository GitHub integration remains unverified; this documentation pass does not choose a replacement identity contract.

A unique validation catches a collision at commit; it does not make the identity formula correct. Do not remove validation to make a failing import pass.
