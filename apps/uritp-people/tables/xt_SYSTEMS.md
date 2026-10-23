---
id: uritp-people-table-xt-systems
title: xt_SYSTEMS
type: reference
status: public
order: 40
revised: 2026-10
summary: One external system this file talks to, with its address and its token. ClickUp and GitHub.
data:
  catalog:
    file: xt_SYSTEMS.tsv
---

# xt_SYSTEMS

!!! abstract "Grain"
    One external system. Exactly one row each for ClickUp and GitHub.

## Fields

!!! data "catalog"

## The token is a password

`Token` is a personal API token. Anyone holding it can act as its owner in that system. It never goes into a script, a clone, an export or any repo. The target is field access for Full Access only, with the adapter scripts running with full access privileges so a phone account can still sync; that lockdown is not in place yet.

## Everything system-specific stops here

The tables below this one are the same whatever the system. What differs between ClickUp and GitHub is this row and the `ADAPTER_<System>_` scripts, and nothing else.
