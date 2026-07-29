---
title: S-2 — Master-File Reference Model
type: standard
package: vectorworks
sequence: 2
domain: theatre
department: all
audience: designers-and-drafters
status: active
last_verified: 2026-07-16
decision: D-011
---

# S-2 — Master-file reference model

**Adopted 2026-07-16 · D-011**

---

## The rule

- **One dense MASTER base file** holds all departments as layers. It is the single source of truth for venue geometry.
- **Department and per-show files REFERENCE the master.** They do not copy it. They pull only the layers they need.
- The master is **authored to be referenced**: clean department × elevation layering (S-1), resources embedded and cleanly laid out.
- **Venue geometry is edited once, in the master**, and propagates to every referencing file.

---

## The technical method, and the one that is wrong

**Use a referenced Design Layer Viewport (DLVP).** Create a DLVP in the target file and reference the master's design layers into it.

**Why this one specifically:** it does **not** force-import all of the master's layers, classes, and resources. The department file stays thin, which is the whole intent of this standard.

**Do NOT use layer-import referencing.** It is the Fundamentals default and it copies layers in wholesale. Heavier, and it defeats the purpose.

**Two constraints that bite:**

1. Referencing pulls the referenced layers **with their classes and resources**. Referenced items display **italicized**, which is how you tell at a glance.
2. **The master and every target must be on the same Vectorworks version.** This matters directly for the eventual Educational-to-licensed rebuild (D-008) — the rebuild has to move the master and its consumers together.

**Project Sharing** (`.vwxp` plus working files) is a separate multi-user mechanism. Possibly relevant later; **not required** for this model.

---

## Status

The model is adopted. **Confirming the referenced-DLVP mechanism against a real file is still open** — it is documented from vendor sources but has not been exercised here.

---

*Distilled from finding F-013 (referencing mechanism, vendor-documented). Source research: `ClickUp_apps/Vectorworks/VWX-BEST-PRACTICES.md`.*
