# Value lists

*Mirrors Manage Value Lists. Three lists, all with design-intent values rather than values read from the file. Verified 2026-07-31.*

The rule that decides whether something belongs here at all: **display-only labels live in a value list; anything carrying metadata belongs in a table.** Transaction types have a category, a cash direction and an applied layer, so they are `Standard_Transactions` and not a value list. A delivery type is just a word, so it is a value list.

| Name | Source | Values | Status |
|---|---|---|---|
| TransactionStatus | field-based | Late / Paid / Outstanding-Due / Upcoming | pending |
| DeliveryType | custom | mailing / wire / ACH | pending |
| DocumentType | custom | Balloon Note / Settlement Statement / Interest Payment / Check Received | pending |

`TransactionStatus` matches the status pill design. `DocumentType` drives `Documents.DocumentType` and is parked with that table.

## Open

Every value above is design intent. **None have been read out of the FileMaker file**, and the stored values may differ from the labels — `Outstanding-Due` in particular reads like a display label rather than something anyone typed into a value list. Enumerate them on the next pass through the file.
