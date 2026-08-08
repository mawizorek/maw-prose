---
id: table-print-sets
title: PRINT_SETS
type: reference
status: public
order: 10
revised: Aug 2026
summary: A batch of documents to produce together. The print hub.
---

# PRINT_SETS

!!! abstract "Grain"
    One named batch of documents produced together. A HEADER; the actual
    doc x preset pairs are [[PRINT_SET_ITEMS](@table-print-set-items)].

**Build your print set from the available docs, editions, presets, overrides and formats.** One run, N PDFs.

## 🔴 The legacy file already had this, written as CODE

`EXPORT Calendar Set` prints four outputs in a hardcoded sequence — 8.5x11 landscape, 8.5x11 portrait, 11x17 expanded, agenda. **That IS a print set with no table.** Same discovery as the six `stored production INFO` scripts being the PRODUCTIONS table written as code. Adding a row is now how you add an output.

## Header / line split, and why overrides live on the LINE

A set legitimately contains **the same document at two presets**, or **two documents sharing one preset**. If overrides sat on the header, every line would inherit the same ones and a set could only ever mean one thing. So:

| Table | Holds |
|---|---|
| `PRINT_SETS` | the name, the scratch/template flags, the calendar it belongs to |
| `PRINT_SET_ITEMS` | one row per output: doc type, preset, edition, sort, **its own overrides** |

## ⭐ SCRATCH: one reserved set, reset from a TEMPLATE set

**`bool_IsScratch`** marks the single working set the print hub lands on. It is never saved and always overwritten, so it needs no naming and produces no clutter.

**`bool_IsDefaultTemplate`** marks the set the scratch RESETS FROM. Reset = delete the scratch's items, duplicate the template's items onto it. One reserved template, one reserved scratch, per calendar.

🔴 **RESET ON ENTRY, not on close.** Reset-at-close looks tidier and fails the first time the app quits unexpectedly, leaving yesterday's staging as today's starting point — a stale-state bug with no symptom. **Entry-time reset is idempotent and self-healing:** whatever happened last time, opening the hub gives you the template. Resetting at close as well is harmless but redundant.

⚠️ **This retires `GLOBAL_EXPORT_VARIABLES`** (considered and dropped 2026-08-08). Staging is a RECORD you can see, sort and re-run, so `GLOBAL_USE` keeps one field — `g_fkPrintSet` — and no per-field global staging exists.

- Globals were per-user and collision-free, which was their one real advantage. **Single-operator year, so a shared scratch record is acceptable** — two people staging at once would fight over it. Noted, not solved.

## Running a set

**N items produce N [[PRINT_SESSIONS](@table-print-sessions)] rows**, sharing one run stamp. Receipt granularity stays per-PDF (each has its own path and edition) while the SET is the thing you re-run.

## Fields

See [PRINT_SETS.tsv](./PRINT_SETS.tsv).
