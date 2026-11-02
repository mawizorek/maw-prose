---
id: uritp-utilities-table-xt-systems
title: xt_SYSTEMS
status: public
type: reference
summary: External-system identities, API roots and device-local credentials.
order: 10
revised: 2026-11
data:
  catalog:
    file: xt_SYSTEMS.tsv
---

# xt_SYSTEMS

!!! abstract "Grain"
    One external system, such as ClickUp or GitHub.

## Fields

!!! data "catalog"

## Codes select adapters

`Code` is the immutable machine-facing value, such as `clickup` or `github`. Validate it as lowercase letters, digits and underscores, with strict uniqueness and a nonempty value. `Name` is a display label and can change without changing adapter selection.

[Containers](@uritp-utilities-table-xt-containers) point here through `fk_System`. Nothing in this table points at a consuming app.

## Credentials stay on the device

`Token` is never exported, logged or included in request diagnostics. A new device receives a fresh Utilities file and a locally entered credential. Documentation and DDR handling must not become a credential-transfer path.
