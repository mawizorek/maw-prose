# Standard_Transactions

*The taxonomy. 🔨 BUILT · verified in file 2026-07-14. Field register reconciled 2026-07-31.*

**Grain: one kind of money movement.** A taxonomy table, not a glorified value list — the difference being that each row carries behaviour, not just a label. `value_Category`, `value_CashDirection` and `value_AppliedToLayer` are what make it a table: a value list can tell you "Late Fee" is a legal choice, but only a record can tell you that a late fee is a fee, that it comes in rather than goes out, and that it applies at the expected layer.

That is the general rule this table exists to demonstrate. Metadata beyond the display value means a table. A bare label means a value list.

## Locked `Name` values

`Payment Received` · `Interest Payment` · `Principal` · `Origination Points` · `Maturation Fee` · `Late Fee`

`Payment Received` is the actual cash-in bucket. The other five are expected-item, application or payoff categories that received cash can satisfy. The taxonomy may later grow a wire fee, an extension fee, a principal paydown.

## 🔴 `Payment Received` is on borrowed time

It exists specifically to paper over the fact that the file had no receipt table. Once `ReceivedFunds` is built, it is a redundant type sitting in a picker where somebody will choose it by accident, putting the same cash in two places — and any rollup that filters on it will double-count without complaining.

Retire it or write down why it survives. Do not leave it undecided past the day `ReceivedFunds` lands.

## Fields

| Field | Type | Key | Category | Notes |
|---|---|---|---|---|
| PrimaryKey | text-uuid | pk | key | |
| CreationTimestamp | timestamp | audit | audit | |
| CreatedBy | text | audit | audit | |
| ModificationTimestamp | timestamp | audit | audit | |
| ModifiedBy | text | audit | audit | |
| Name | text | plain | detail | indexed; locked values above |
| DisplayName | text | plain | detail | auto-enter calc |
| value_Category | text | plain | taxonomy | |
| value_CashDirection | text | plain | taxonomy | in / out |
| value_AppliedToLayer | text | plain | taxonomy | expected / actual |
| sort_order | number | plain | detail | numeric, drives display sequence |
| is_active | number | plain | detail | |

## Relationships

Referenced by `ExpectedTransactions.fkStandardTransaction` and `AccountTransactions.fkStandardTransaction`, both locked.

## Open

The table name itself drifts between `Standard_Transactions` and `StandardTransactions`. It is the one table in the stack carrying an underscore, and it predates the PascalCase lock. Settle it before any `ExecuteSQL` references it, because SQL embeds the name as text and returns nothing rather than erroring when it is wrong.

Seed the remaining taxonomy rows from the file.
