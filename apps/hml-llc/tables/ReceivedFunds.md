---
id: hml-llc-table-receivedfunds
title: "ReceivedFunds"
type: reference
status: hidden
summary: "One real-world cash event."
data:
  catalog:
    file: ReceivedFunds.tsv
---
# ReceivedFunds

!!! abstract "Grain"
    one real-world cash event. What the bank saw. Transaction parent for rollback-protected writes. Not yet built.

⚠️ No fkLoan on purpose. Loan is reached through applications (one receipt can touch several loans).

Full relationship context → [graph.md](../relationships/README.md)

## Fields

!!! data "catalog"
