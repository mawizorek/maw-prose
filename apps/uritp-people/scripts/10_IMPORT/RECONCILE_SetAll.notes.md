---
id: uritp-people-script-reconcile-setall
title: RECONCILE_SetAll and RECONCILE_ShowSession
type: reference
status: public
order: 40
revised: 2026-10
summary: The two small helpers behind the review window. Mark every row Apply or Skip; show one session's rows.
---

# RECONCILE_SetAll and RECONCILE_ShowSession

Copy targets: `RECONCILE_SetAll.fmscript` and `RECONCILE_ShowSession.fmscript`, folder `10_IMPORT`.

`RECONCILE_SetAll` walks the window's found set and sets every unapplied New and Changed row to the decision it is given. It skips Gone rows and anything already applied, so pressing Skip all after an apply cannot rewrite history.

`RECONCILE_ShowSession` finds one session's rows on the RECONCILE layout and restores the layout's saved sort. [PEOPLE_Apply](@uritp-people-script-people-apply) calls it after writing and after a cancel.
