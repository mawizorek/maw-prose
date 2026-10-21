---
status: hidden
type: reference
generated: fmp-state
---

# URITP Budget.fmp12 · STATE
DDR-XML export 10/10/2026 10:39:13 PM · FM 19.6.3
Source drop: `zFMP-drops/URITP Budget_fmp12.xml` · recover raw: `git show d77b61648a76:"zFMP-drops/URITP Budget_fmp12.xml"`
Companion files: DELTA.md (vs previous drop, read first) · STEPS.md (full script steps, load on demand)

## Tables (30) · rec = record count (state, not hashed) · _std audit_ = stock PrimaryKey/Created*/Modified* fields, factored

### GLOBAL_USE_VARIABLES · 27 fields · 1 rec
- _std audit 3/5 (missing: CreatedBy, CreationTimestamp)_
- `APP_TITLE` Text g
- `APP_VERSION` Text g
- `calc_FILEPATH` Number/Calculated g = `Get ( FilePath )`
- `calc_FILENAME` Text/Calculated g = `Get (FileName)`
- `calc_HOSTED_STATUS` Text/Calculated g = `If ( Get ( MultiUserState ) > 1 ; "Hosted" ; "Local" )`
- `calc_FILESIZE_MB` Text/Calculated g = `/* GetAsNumber ( Get (FileSize) ) / 100 */ Let ( ~bytes = Get (FileSize) ; Round ( ~bytes / 1048576 ; 2 ) & " MB" )`
- `script_Stats_RecordCounts` Text g
- `script_LastSaved` TimeStamp g
- `g_fkACTIVE_BUDGET` Text g
- `gPRINT_CodeSortedBy` Text g
- `g_fkSelectedBudgetVersion` Text g
- `g_fkSelectedCode` Text g
- `g_fkSelectedImportURFSession` Text g
- `g_fkImportURFSession` Text g
- `g_fkSelectedFiscalYear` Text g
- `g_fkPREVIOUS_BUDGET` Text g
- `g_fkNEXT_BUDGET` Text g
- `g_fkCOMPARE_BUDGET` Text g
- `gLIST_BudgetVersions` Text g
- `gLIST_2` Text g
- `gLIST_StatusGROUPS` Text g
- `gLIST_ImportStatuses` Text g
- `g_tempImportContainer` Binary g
- `gLIST_ImportSessionStatuses` Text g

### GLOBAL_scriptVariabls · 3 fields · 0 rec
- _std audit 1/5 (missing: CreatedBy, CreationTimestamp, ModificationTimestamp, ModifiedBy)_
- `CODEpk` Text g
- `_copyCode` Text g

### XX_GLOBAL_PrintingVariables · 6 fields · 0 rec
- _std audit 5/5_
- `xx_CodeSortedBy` Text g

### XX_GLOBAL_fileSetup · 13 fields · 0 rec
- _std audit 5/5_
- `APP_TITLE` Text g
- `APP_VERSION` Text g
- `calc_FilePath` Number/Calculated g = `Get ( FilePath )`
- `calc_FileName` Text/Calculated g = `Get (FileName)`
- `calc_HostedStatus` Text/Calculated g = `If ( Get ( MultiUserState ) > 1 ; "Hosted" ; "Local" )`
- `calc_FileSize` Text/Calculated g = `Get (FileSize)`
- `script_Stats_RecordCounts` Text g
- `script_LastSaved` TimeStamp g

### BUDGET_Versions · 12 fields · 10 rec
- _std audit 5/5_
- `TITLE` Text
- `VERSION` Text
- `DateReceived` Date
- `SORT_ORDER` Number ae=calc
- `Notes` Text
- `fkFiscalYear` Text
- `fkSuperseededBy` Text

### BudgetCode_YearConfig · 14 fields · 40 rec
- _std audit 5/5_
- `Code_snapshot` Number ae=calc
- `Name_snapshot` Text ae=calc
- `fkBudgetCodeDefinition` Text
- `fkFiscalYear` Text ae=calc
- `calc_CodeHundred` Number/Calculated = `Code_snapshot - Mod ( Code_snapshot ; 100 )`
- `calc_CodeTen` Number/Calculated = `Code_snapshot - Mod ( Code_snapshot ; 10 )`
- `xx_fkCodeHeaderCategory` Text
- `calc_CodeInCurrentConfig` Number/Calculated = `GetAsNumber ( Budget_FamilyDefintions::calc_DigitsAsText & Budget_ContextDefinitions::calc_DigitsAsText & Budget_Contex…`
- `auto_DisplayName` Text ae=calc

### Budget_Codes_Defintions · 31 fields · 280 rec
- _std audit 1/5 (missing: CreatedBy, CreationTimestamp, ModificationTimestamp, ModifiedBy)_
- `Default Code` Number
- `Default Name` Text
- `PUBLICNotes` Text ae=calc
- `PVT Allocation Notes` Text
- `_temp` Number ae=ConstantData
- `is_active` Number ae=ConstantData
- `fkOWNER` Text
- `fkAllocation` Text
- `xx_fkDefaultHeaderCategory` Text
- `calc_CodeHundred` Number/Calculated = `Default Code - Mod ( Default Code ; 100 )`
- `calc_CodeTen` Number/Calculated = `Default Code - Mod ( Default Code ; 10 )`
- `calcTotalAllocation` Number/Calculated = `Sum ( Budget_Allocation::AmountAwarded )`
- `calcDisplay_Code` Number/Calculated = `"[" & GetAsText ( Default Code ) & "] " & Default Name`
- `xxFY26_Spent` Number/Calculated = `Sum ( URF_IMPORT_ROWS::source_Amount ) + Sum ( CumSale_LABOUR::FYTD_Regular_Extra )`
- `xxFY26_REMAINING` Number/Calculated = `xxFY26 Allocation - xxFY26_Spent`
- `xxFY27 Allocation Summary` Number/Summary
- `xxFY26 Allocation Summary` Number/Summary
- `xxFY26 Spent Summary` Number/Summary
- `xxFY26 Remaining Summary` Number/Summary
- `xxFY26 Allocation` Number ae=calc
- `xxFY27 Allocation` Number ae=calc
- `fkBudget_FAMILY` Text // two-digits
- `fkBudget_CONTEXT` Text // one middle digit
- `fkBudget_SUFFIX` Text // final last two digits
- `fkUROperatingLine` Text
- `fkURSpendCateogry` Text
- `calc_ExpectedCode` Number/Calculated = `/* Budget_FamilyDefintions::calc_DigitsAsText & "." & Budget_ContextDefinitions::calc_DigitsAsText & "." & If ( IsEmpty…`
- `Suffix_OVerride` Number
- `display_CodeCurrent` Text ae=calc
- `auto_Display_forPopups` Text ae=calc

### Budget_FamilyDefintions · 10 fields · 7 rec
- _std audit 5/5_
- `Name` Text
- `Digits` Number
- `calc_DigitsAsText` Text/Calculated = `GetAsText ( leadingZeros ( Digits ; 1 ) )`
- `auto_PopupName` Text ae=calc
- `SuffixScope` Text

### Budget_ContextDefinitions · 12 fields · 80 rec
- _std audit 5/5_
- `Digit` Number
- `Name` Text
- `calc_DigitsAsText` Text/Calculated = `GetAsText ( leadingZeros ( Digit ; 2 ) )`
- `fkFamily_forContext` Text
- `calcViz_code` Text/Calculated = `Budget_FamilyDefintions_forFiltering::calc_DigitsAsText & calc_DigitsAsText`
- `fkUROperatingLine` Text
- `auto_popupName` Text ae=calc

### Budget_ContextSuffixDefinitions · 10 fields · 136 rec
- _std audit 5/5_
- `Name` Text
- `Digits` Number
- `calc_DigitsAsText` Text/Calculated = `GetAsText ( leadingZeros ( Digits ; 2 ) )`
- `fkFamily_forSubContext` Text
- `calcViz_code` Text/Calculated = `Budget_FamilyDefintions_forFiltering::calc_DigitsAsText & "--" & calc_DigitsAsText`

### Budget_Allocation · 14 fields · 837 rec
- _std audit 1/5 (missing: CreatedBy, CreationTimestamp, ModificationTimestamp, ModifiedBy)_
- `Title` Text
- `Description` Text ae=calc
- `AmountAwarded` Number ae=calc
- `fkBudgetVersion` Text
- `fkBudgetCode` Text
- `Notes` Text ae=calc
- `SummaryAmountAwarded` Number/Summary
- `FLAG` Number ae=ConstantData
- `WORKSHEET` Text
- `NM_sort` Number
- `AllocationWorksheet` Text
- `NM_Subtotal` Text
- `fkDefaultExtAllocation` Text

### Budget_Supervisors · 6 fields · 7 rec
- _std audit 5/5_
- `Name` Text

### BudgetCode_Header_Categories · 3 fields · 20 rec
- _std audit 1/5 (missing: CreatedBy, CreationTimestamp, ModificationTimestamp, ModifiedBy)_
- `HeaderTITLE` Text
- `HeaderStartNumber` Number

### IMPORT_SESSIONS · 19 fields · 13 rec
- _std audit 5/5_
- `SessionLabel` Text // "FY27-02 URF0985 import"
- `ImportTimestamp` TimeStamp
- `ReportMonthEnd` Date
- `fkFiscalYear` Text
- `fkSessionStatus` Text
- `ImportedRowCount` Number
- `CarryForwardRowCount` Number
- `IgnoreDuplicateRowCount` Number
- `NewRowCount` Number
- `NeedsReviewRowCount` Number
- `Notes` Text
- `OriginalFile` Binary // don't delete yet but keep it super lightweight.
- `auto_Filename` Number/Calculated = `GetContainerAttribute ( OriginalFile ; "filename" )` // don't delete yet but keep it super lightweight.
- `auto_FilesizeKB` Number/Calculated = `GetAsNumber ( GetContainerAttribute ( OriginalFile ; "filesize" ) ) / 100` // don't delete yet but keep it super lightweight.

### IMPORT_URF0985 · 54 fields · 1499 rec
- _std audit 5/5_
- `is_first_seen_ever` Number ae=ConstantData
- `was_seen_in_prior_import` Number ae=ConstantData
- `is_duplicate_within_session` Number ae=ConstantData
- `is_revision_candidate` Number ae=ConstantData
- `fkMatchedPriorRow` Text
- `fkMatchedPriorSession` Text
- `fkImportSession` Text
- `fkImportStatus` Text // typicall Script Set
- `calc_NormalizedReference` Number/Calculated = `Let ( [ t = source_Reference ; t1 = Substitute ( t ; [ Char ( 13 ) ; " " ] ; [ Char ( 10 ) ; " " ] ; [ "¶" ; " " ] ) ] …`
- `calc_NormalizedBusinessDocument` Number/Calculated = `Let ( [ t = source_BusinessDocument ; t1 = Substitute ( t ; [ Char ( 13 ) ; " " ] ; [ Char ( 10 ) ; " " ] ; [ "¶" ; " "…`
- `calc_NormalizedSupplier` Number/Calculated = `Let ( [ t = source_Supplier ; t1 = Substitute ( t ; [ Char ( 13 ) ; " " ] ; [ Char ( 10 ) ; " " ] ; [ "¶" ; " " ] ) ] ;…`
- `calc_NormalizedLineMemo` Number/Calculated = `Let ( [ t = source_LineMemo_SupplierReferenceNumber ; t1 = Substitute ( t ; [ Char ( 13 ) ; " " ] ; [ Char ( 10 ) ; " "…`
- `calc_sourceUKey_LineFingerprint` Number/Calculated = `Let ( [ raw = source_FAO_ID & "¦" & GetAsText ( source_AccountingDate ) & "¦" & GetAsText ( source_BudgetDate ) & "¦" &…`
- `calc_sourceUKey_DocumentFingerprint` Number/Calculated = `Let ( [ raw = source_FAO_ID & "¦" & source_JournalSource & "¦" & calc_NormalizedReference & "¦" & calc_NormalizedBusine…`
- `xxURF_UNIQUE` Text/Calculated = `GetAsNumber ( source_AccountingDate ) & Let ( ~amount = Round ( source_Amount ; 2 ) ; If ( Mod ( source_Amount ; 1 ) = …`
- `xxFLAG` Number ae=ConstantData
- `xxs_Amount` Number/Summary
- `xxfkBUDGET_CODE` Text
- `xxCODING_Notes` Text
- `sourceScripted_RowNumber` Number
- `source_Company` Text
- `source_Fund` Text
- `source_CostCenter` Text
- `source_FAO_ID` Text
- `source_FAOName` Text
- `source_ObjectClassName` Text
- `source_ObjectClassSortOrder` Text
- `source_LedgerAccount` Text
- `source_LedgerAccountIdentifier` Text
- `source_FAC_ID` Text
- `source_FACName` Text
- `source_Supplier` Text
- `source_PONumber` Text
- `source_AccountingDate` Date // the date it was reconciled.
- `source_BudgetDate` Date // the month that "absorbs" that charge actually
- `source_JournalSource` Text
- `source_Reference` Text
- `source_BusinessDocument` Text
- `source_HeaderMemo_PONumber` Text
- `source_LineMemo_SupplierReferenceNumber` Text
- `source_Amount` Number
- `source_Award` Text
- `source_AwardName` Text
- `source_FromDate` Date
- `source_ToDate` Date
- `source_AwardLineAmount` Number
- `source_PrincipalInvestigator` Text
- `source_FiscalTimePeriodStartDate` Date
- `source_FiscalTimePeriodEndDate` Date

### Import_URF0989 · 18 fields · 0 rec
- _std audit 5/5_
- `fkFAO` Text
- `fkCompany` Text
- `fkCostCenter` Text
- `fkFund` Text
- `fkLedgerAccount` Text
- `fkSpendCategory` Text
- `import_OriginalBudget` Number
- `import_CurrentBudget` Number
- `import_MonthActual` Number
- `import_FYTD Actual` Number
- `import_BalanaceAvailable` Number
- `import_PercentUsed` Number
- `fkImportSession` Text

### URF_ROW_ASSIGNMENTS · 13 fields · 0 rec
- _std audit 5/5_
- `fkURFImportRow` Text
- `fkBudgetCode` Text
- `AssignedAmount` Number
- `AssignmentMethod` Text
- `AssignedBy` Text
- `AssignedAt` TimeStamp
- `Notes` Text
- `fkAssingmentStatus` Text

### URF_CODED_TRANSACTIONS · 10 fields · 0 rec
- _std audit 5/5_
- `fkAssignment` Text
- `Amount` Number
- `PostingDate` Date
- `SourceType` Text
- `fkDefaultCode` Text

### Import_CumSaleLABOUR · 10 fields · 25 rec
- _std audit 5/5_
- `Worker` Text
- `FYTD_Regular_Extra` Number
- `fkBudgetCode` Text
- `Summary_Earnings` Number/Summary
- `fkImportSession` Text

### XXFiscal Years · 8 fields · 3 rec
- _std audit 5/5_
- `ShortName` Text
- `Start Date` Date
- `End Date` Date

### file_WorkNotes · 8 fields · 2 rec
- _std audit 5/5_
- `NOTES` Text
- `_temp` Number ae=ConstantData
- `URGENCY` Text

### zfile_ValueLISTS · 12 fields · 4 rec
- _std audit 5/5_
- `Name` Text
- `is_actve` Number ae=ConstantData
- `is_status_list` Number
- `enforce_1_to_1` Number
- `tester` Text g
- `Notes` Text
- `sCount_Values` Number/Calculated = `Count ( ufile_Values::PrimaryKey )`

### zfile_Values · 10 fields · 16 rec
- _std audit 5/5_
- `Name` Text
- `sort_order` Number
- `use_Notes` Text
- `fkList` Text
- `fkStatusCATEGORY` Text

### Budget_Allocation_OthersCodes · 10 fields · 2 rec
- _std audit 5/5_
- `Title` Text
- `Description_and_notes` Text
- `fkDefaultSpendCategory` Text
- `fkDefaultURITPBudgetCode` Text
- `calc_combinedName` Number/Calculated = `1`

### UR_SpendRevenueCategory · 9 fields · 70 rec
- _std audit 5/5_
- `auto_DisplayName` Text ae=calc
- `Code_Prefix` Text ae=ConstantData
- `Code` Number
- `Title` Text

### UR_Company · 8 fields · 1 rec
- _std audit 5/5_
- `Name` Text
- `Code` Text
- `auto_DisplayName` Text ae=calc

### UR_OperatingLineFAO · 9 fields · 69 rec
- _std audit 5/5_
- `Title` Text
- `Code` Number
- `Code_Prefix` Text ae=ConstantData
- `auto_DisplayName` Text ae=calc

### UR_CostCenter · 9 fields · 1 rec
- _std audit 5/5_
- `auto_DisplayName` Text ae=calc
- `Code` Text
- `Code_Prefix` Text ae=ConstantData
- `Title` Text

### UR_Fund · 8 fields · 7 rec
- _std audit 5/5_
- `Name` Text
- `auto_DisplayName` Text ae=calc
- `Fund_Restrictions` Text

### UR_LedgerAccount · 8 fields · 32 rec
- _std audit 5/5_
- `Name` Text
- `Code` Text
- `auto_DisplayName` Text ae=calc

## Table occurrences (64) · name[base table]
BUDGET_Versions_selfSuperseed[BUDGET_Versions], BudgetCode_Defintions[Budget_Codes_Defintions], BudgetCode_YearConfig[BudgetCode_YearConfig], Budget_Allocation[Budget_Allocation], BUDGET_AllocationVersions[BUDGET_Versions], Import_URF0989[Import_URF0989], fURF0989_IMPORT_SESSIONS[IMPORT_SESSIONS], fURF0989_UR_SpendRevenueCategory[UR_SpendRevenueCategory], fURF0989_UR_LedgerAccount[UR_LedgerAccount], fURF0989_UR_Fund[UR_Fund], fURF0989_UR_OperatingLineFAO[UR_OperatingLineFAO], fURF0989_UR_CostCenter[UR_CostCenter], fURF0989_UR_Company[UR_Company], self_BudgetCodes_byCode[Budget_Codes_Defintions], ufile_ValueLISTS[zfile_ValueLISTS], ui_GLOBAL_BudgetHub[GLOBAL_USE_VARIABLES], Budget_ContextSuffixDefinitions_forFiltering[Budget_ContextSuffixDefinitions], Budget_ContextDefinitions_forFiltering[Budget_ContextDefinitions], Budget_FamilyDefintions_forFiltering[Budget_FamilyDefintions], Budget_FamilyDefintions[Budget_FamilyDefintions], GLOBAL_forIMPORTING[GLOBAL_USE_VARIABLES], Budget_ContextSuffix_forPopup[Budget_ContextSuffixDefinitions], Budget_ContextSuffixDefinitions[Budget_ContextSuffixDefinitions], OP_Lines[UR_OperatingLineFAO], Budget_Contexts_forPopup[Budget_ContextDefinitions], BudgetCode_Header_Categories[BudgetCode_Header_Categories], Budget_ContextDefinitions[Budget_ContextDefinitions], values_ImportSessionStatuses[GLOBAL_USE_VARIABLES], ufile_Values[zfile_Values], ufile_ValuesSelfStatusCategories[zfile_Values], values_ImportStatuses[GLOBAL_USE_VARIABLES], ufile_Values_OtherSameListSameCategory[zfile_Values], values_List2 2[GLOBAL_USE_VARIABLES], values_BudgetVersions[GLOBAL_USE_VARIABLES], values_List2[GLOBAL_USE_VARIABLES], values_StatusCategories[GLOBAL_USE_VARIABLES], Code_Definitions[Budget_Codes_Defintions], URF_CODED_TRANSACTIONS[URF_CODED_TRANSACTIONS], SpecificBudgetCode_forURF_Assigning[BudgetCode_YearConfig], URF_ROW_ASSIGNMENTS[URF_ROW_ASSIGNMENTS], URF_IMPORT_ROWS[IMPORT_URF0985], IMPORT_SESSIONS[IMPORT_SESSIONS], Budget_Supervisors[Budget_Supervisors], BudgetCodes_forDefaultOthersCodes[Budget_Codes_Defintions], Budget_Allocation_OthersCodes[Budget_Allocation_OthersCodes], UR_SpendRevenueCategory[UR_SpendRevenueCategory], file_WorkNotes[file_WorkNotes], ui_ValueLISTS[zfile_ValueLISTS], ui_Values[zfile_Values], ui_ValuesSelfStatusCategories[zfile_Values], XX_GLOBAL_PrintingVariables[XX_GLOBAL_PrintingVariables], XX_GLOBAL_fileSetup[XX_GLOBAL_fileSetup], XXlocalFiscal_Years[XXFiscal Years], GLOBAL_USE_VARIABLES[GLOBAL_USE_VARIABLES], GLOBAL_scriptVariables[GLOBAL_scriptVariabls], CumSale_LABOUR[Import_CumSaleLABOUR], URITPCodes_forCodingCumSale[Budget_Codes_Defintions]
**External file refs:** Fiscal_Years_forBudgetCodeConfigs → URITP Global Setup, Fiscal_Years_forBudgetVersions → URITP Global Setup, eds_Departments → URITP Global Setup, Fiscal_Years_forCurrent → URITP Global Setup, Fiscal_Years_forImports → URITP Global Setup, eds_URITP_GLOBAL_Variables → URITP Global Setup, eds_Fiscal_Years → URITP Global Setup

## Relationships (47)
- BUDGET_AllocationVersions ⇄ Budget_Allocation on PrimaryKey Equal fkBudgetVersion [R:create]
- BudgetCode_Defintions ⇄ BudgetCode_Header_Categories on xx_fkDefaultHeaderCategory Equal PrimaryKey
- Fiscal_Years_forBudgetVersions ⇄ BUDGET_AllocationVersions on PrimaryKey Equal fkFiscalYear
- Budget_Supervisors ⇄ BudgetCode_Defintions on CreationTimestamp Equal fkOWNER
- URF_IMPORT_ROWS ⇄ IMPORT_SESSIONS on fkImportSession Equal PrimaryKey
- Fiscal_Years_forImports ⇄ IMPORT_SESSIONS on PrimaryKey Equal fkFiscalYear
- CumSale_LABOUR ⇄ URITPCodes_forCodingCumSale on fkBudgetCode Equal PrimaryKey
- CumSale_LABOUR ⇄ IMPORT_SESSIONS on fkImportSession Equal PrimaryKey
- ui_GLOBAL_BudgetHub ⇄ Fiscal_Years_forCurrent on g_fkSelectedFiscalYear Equal PrimaryKey
- ui_GLOBAL_BudgetHub ⇄ BUDGET_AllocationVersions on g_fkSelectedBudgetVersion Equal PrimaryKey
- BUDGET_Versions_selfSuperseed ⇄ BUDGET_AllocationVersions on PrimaryKey Equal fkSuperseededBy
- ufile_ValuesSelfStatusCategories ⇄ ufile_Values on PrimaryKey Equal fkStatusCATEGORY
- ufile_ValueLISTS ⇄ ufile_Values on PrimaryKey Equal fkList [R:create]
- ui_ValueLISTS ⇄ ui_Values on PrimaryKey Equal fkList [R:create]
- ui_ValuesSelfStatusCategories ⇄ ui_Values on PrimaryKey Equal fkStatusCATEGORY
- UR_SpendRevenueCategory ⇄ Budget_Allocation_OthersCodes on PrimaryKey Equal fkDefaultSpendCategory
- Budget_Allocation ⇄ Budget_Allocation_OthersCodes on fkDefaultExtAllocation Equal PrimaryKey
- BudgetCodes_forDefaultOthersCodes ⇄ Budget_Allocation_OthersCodes on PrimaryKey Equal fkDefaultURITPBudgetCode
- OP_Lines ⇄ BudgetCode_Defintions on PrimaryKey Equal fkUROperatingLine
- Budget_ContextDefinitions ⇄ BudgetCode_Defintions on PrimaryKey Equal fkBudget_CONTEXT
- BudgetCode_Defintions ⇄ Budget_ContextSuffixDefinitions on fkBudget_SUFFIX Equal PrimaryKey
- Budget_Allocation ⇄ BudgetCode_YearConfig on fkBudgetCode Equal PrimaryKey
- BudgetCode_YearConfig ⇄ BudgetCode_Defintions on fkBudgetCodeDefinition Equal PrimaryKey
- Budget_FamilyDefintions ⇄ BudgetCode_Defintions on PrimaryKey Equal fkBudget_FAMILY
- URF_IMPORT_ROWS ⇄ URF_ROW_ASSIGNMENTS on PrimaryKey Equal fkURFImportRow
- URF_CODED_TRANSACTIONS ⇄ URF_ROW_ASSIGNMENTS on fkAssignment Equal PrimaryKey
- SpecificBudgetCode_forURF_Assigning ⇄ URF_ROW_ASSIGNMENTS on PrimaryKey Equal fkBudgetCode
- Code_Definitions ⇄ URF_CODED_TRANSACTIONS on PrimaryKey Equal fkDefaultCode
- values_ImportStatuses ⇄ ufile_Values on gLIST_ImportStatuses Equal fkList
- values_StatusCategories ⇄ ufile_Values on gLIST_StatusGROUPS Equal fkList
- values_BudgetVersions ⇄ ufile_Values on gLIST_BudgetVersions Equal fkList
- values_List2 ⇄ ufile_Values on gLIST_2 Equal fkList
- ufile_Values_OtherSameListSameCategory ⇄ ufile_Values on fkList Equal fkList & fkStatusCATEGORY Equal fkStatusCATEGORY & PrimaryKey NotEqual PrimaryKey
- values_ImportSessionStatuses ⇄ ufile_Values on gLIST_ImportSessionStatuses Equal fkList
- Budget_Contexts_forPopup ⇄ BudgetCode_Defintions on fkFamily_forContext Equal fkBudget_FAMILY
- Budget_ContextSuffix_forPopup ⇄ BudgetCode_Defintions on fkFamily_forSubContext Equal fkBudget_FAMILY
- Budget_ContextSuffixDefinitions_forFiltering ⇄ Budget_FamilyDefintions on fkFamily_forSubContext Equal PrimaryKey
- Budget_ContextDefinitions_forFiltering ⇄ Budget_FamilyDefintions on fkFamily_forContext Equal PrimaryKey
- BudgetCode_Defintions ⇄ self_BudgetCodes_byCode on display_CodeCurrent Equal display_CodeCurrent
- Fiscal_Years_forBudgetCodeConfigs ⇄ BudgetCode_YearConfig on PrimaryKey Equal fkFiscalYear
- fURF0989_UR_Company ⇄ Import_URF0989 on PrimaryKey Equal fkCompany
- fURF0989_UR_CostCenter ⇄ Import_URF0989 on PrimaryKey Equal fkCostCenter
- fURF0989_UR_OperatingLineFAO ⇄ Import_URF0989 on PrimaryKey Equal fkFAO
- fURF0989_UR_Fund ⇄ Import_URF0989 on PrimaryKey Equal fkFund
- fURF0989_UR_LedgerAccount ⇄ Import_URF0989 on PrimaryKey Equal fkLedgerAccount
- fURF0989_UR_SpendRevenueCategory ⇄ Import_URF0989 on PrimaryKey Equal fkSpendCategory
- fURF0989_IMPORT_SESSIONS ⇄ Import_URF0989 on PrimaryKey Equal fkImportSession

## Value lists (32)
- One · custom: 1
- BUDGET_VERSIONS · Field: BUDGET_AllocationVersions::PrimaryKey, BUDGET_AllocationVersions::TITLE
- (dropdown) Budget_REVs · custom: A B C D E F Original Final MAW NM SG Deans template Proposed
- Budget Code Extended Names · Field: BudgetCode_Defintions::PrimaryKey, BudgetCode_Defintions::calcDisplay_Code
- popup Budget Code Number · Field: BudgetCode_Defintions::PrimaryKey, BudgetCode_Defintions::display_CodeCurrent
- popup Budget Code DisplayName · Field: BudgetCode_Defintions::PrimaryKey, BudgetCode_Defintions::auto_Display_forPopups
- (popup) Fiscal Year · External: XXlocalFiscal_Years::PrimaryKey, XXlocalFiscal_Years::ShortName
- FAOs · custom: OP211035 OP213141 OP213142 OP213143 OP213144
- Ledger Accounts · Field: URF_IMPORT_ROWS::source_LedgerAccount
- FAC Names · Field: URF_IMPORT_ROWS::source_FACName
- fk_budgetOwners · Field: ::, ::
- (popup) Code HEADERS · Field: ::, ::
- NM_Worksheets · custom: Bellow the Line Staffing Production Budget Production Budget Summary Program Budget Breakdowns & Wo…
- NM_AllocationWorksheets · custom: Below the Line Staffing Production 1 Production 2 Production 3 Production 4 Production - Other Prod…
- NM_SubtotalCategories · custom: Artist Fees Travel & Accom Production Expenses 1 Production Expenses 2
- popupEDS_FiscalYears · External: XXlocalFiscal_Years::PrimaryKey, XXlocalFiscal_Years::ShortName
- popupV_StatusCategories · Field: ufile_Values::PrimaryKey, ufile_Values::Name
- popupV_ImportSessionStatuses · Field: ufile_Values::PrimaryKey, ufile_Values::Name
- popupV_BudgetVersions · Field: ufile_Values::PrimaryKey, ufile_Values::Name
- popupV_List2 · Field: ufile_Values::PrimaryKey, ufile_Values::Name
- popupV_ImportStatuses · Field: ufile_Values::PrimaryKey, ufile_Values::Name
- popupV_ValueLists · Field: ufile_ValueLISTS::PrimaryKey, ufile_ValueLISTS::Name
- popup_SpendCategories · Field: UR_SpendRevenueCategory::PrimaryKey, UR_SpendRevenueCategory::Title
- popup_OPLines · Field: OP_Lines::PrimaryKey, OP_Lines::Title
- popup_BudgetFAMILIES · Field: Budget_FamilyDefintions::PrimaryKey, Budget_FamilyDefintions::auto_PopupName
- popup_BudgetSUFFIX_byFamily · Field: Budget_ContextSuffix_forPopup::PrimaryKey, Budget_ContextSuffix_forPopup::Name
- popup_BudgetCodeCONTEXTS · Field: Budget_ContextDefinitions::PrimaryKey, Budget_ContextDefinitions::auto_popupName
- popup_BudgetCodeCONTEXTS_FilteredbyFamily · Field: Budget_ContextDefinitions_forFiltering::PrimaryKey, Budget_ContextDefinitions_forFiltering::auto_popupName
- popup_BudgetCodeContextSUFFIX_filtered · Field: Budget_ContextSuffixDefinitions_forFiltering::PrimaryKey, Budget_ContextSuffixDefinitions_forFiltering::Name
- value_SuffixScope · custom: FAMILY CONTEXT
- values_Fund_Restrictions · custom: Unrestricted Temp Restricted High Temp Restricted Low
- popupV_BudgetCode_fromCurrentConfig · Field: BudgetCode_YearConfig::PrimaryKey, BudgetCode_YearConfig::auto_DisplayName

## Custom functions (19)
- leadingZeros(value;numDigitsTotal)
- JSON()
- PNum(key;value)
- PBool(key;value)
- PJSON(key;jsonValue)
- Param(elementList)
- PText(key;value)
- ParamHas(json;key)
- ParamGetText(json;key;default)
- ParamGetNumber(json;key;default)
- ParamGetBoolean(json;key;default)
- --()
- AddMonths(myDate;numberOfMonths)
- CSSPixelWidth()
- exists(field)
- MESSAGES()
- --()
- MSG_ValueListErrors(message)
- MSG_PreflightErrors(message)

## Scripts (folder tree · step counts exclude comments · `-` separators omitted)

**📁 File Scripts**
- **lastWindowClose** · 3 steps · calls: save zBACKUP | File
- **firstWindowOpen** · 1 steps

**📁 File Scripts/File OPERATIONS**
- **save zBACKUP | File** · 9 steps

**📁 Layout ENTER, EXIT**
- **enter | GLOBAL SETUP** · 1 steps · calls: set G | FILE RECORD STATS

**📁 SET | Fields**

**📁 SET | Fields/set GLOBALS**
- **set G | FILE RECORD STATS** · 1 steps
- **set G | SELECTED CODE** · 6 steps
- **set G | SELECTED Version from gFY** · 10 steps

**📁 SELECTOR triggers**
- **select | g FISCAL YEAR** · 2 steps · calls: set G | SELECTED Version from gFY

**📁 BUTTONS**

**📁 BUTTONS/NAVIGATION**
- **navi | Select Code** · 11 steps · calls: set G | SELECTED CODE

**📁 URF IMPORT**
- **Create_New_URF_Import** · 61 steps (6 disabled) · calls: IMPORT_URF_Create_Session, IMPORT_URF_Preflight_Profile, IMPORT_rows_to_URF0985, Omit_all, commitRecord, new_square_window
- **IMPORT_URF_Create_Session** · 29 steps · calls: Omit_all
- **IMPORT_URF_Preflight_Profile** · 20 steps
- **IMPORT_rows_to_URF0985** · 22 steps (4 disabled) · calls: Omit_all
- **Recompute_URF_Fingerprints** · EMPTY

**📁 Filter**
- **Omit_all** · 3 steps

**📁 New Windows**
- **new_square_window** · 12 steps
- **button_CurrentAllocationPupup** · 2 steps · calls: goToRelatedAllocations
- **showOnly_CurrentAllocation** · 5 steps · calls: goToRelatedAllocations
- **goToRelatedAllocations** · 2 steps
- **RefreshCurrentAllocation** · 2 steps (1 disabled)
- **assignToCurrent** · 3 steps
- **commitSummaryButtonTriggerFY26** · 7 steps (3 disabled)
- **commitSummaryButtonTrigger CopyFY26** · 4 steps (1 disabled)
- **COMMIT_ALL** · 11 steps · calls: SORT_BudgetCodes, commitSummaryButtonTriggerFY26
- **SORT_BudgetCodes** · 1 steps
- **showUNASSIGNED** · 5 steps (1 disabled)
- **showUNASSIGNED Copy** · 6 steps (1 disabled)
- **assignCODE** · 1 steps
- **useSelectedCode** · 4 steps (1 disabled)
- **goToCode** · 9 steps (2 disabled)
- **POPUP_selectCODE** · 5 steps

**📁 Scripts for Buttons**
- **goToCodedTransactions** · 7 steps (2 disabled)
- **printAllCodeFormats** · 13 steps (1 disabled) · calls: SortbyCode100, SortedbyCode10, SortedbyHeader
- **Layout #29** · 2 steps
- **SortbyCode100** · 3 steps
- **SortedbyCode10** · 3 steps
- **SortedbyCode10 Copy** · 3 steps
- **SortedbyHeader** · 3 steps
- **REPLACE_fkBudgetCode** · 1 steps
- **COPY_code** · 2 steps
- **PASTE_code** · 2 steps
- **buttonPassCodeNum** · 11 steps
- **enterLayoutSpecificCodeURF** · 3 steps
- **FilterSingleCodeASK** · 10 steps (9 disabled) · calls: getCODEpk
- **getCODEpk** · 8 steps
- **New Script** · EMPTY

**📁 LayoutEnter**

**📁 LayoutEnter/Sort By**
- **sortByNMAllocation** · 1 steps
- **BudgetVersionBY_SortOrder** · 1 steps
- **findAllocation** · 5 steps · calls: sortByNMAllocation
- **newAllocationWcurrent** · 2 steps
- **showOnlyActiveAllocation** · 4 steps
- **DuplicateWRelated** · 1 steps
- **commitRecord** · 12 steps
- **sort | Budget Code SUFFIXES** · 1 steps
- **sort | Budget Code SUFFIXES Copy** · 1 steps
- **sort | Budget Code Assignment Join** · 1 steps
- **temp** · 8 steps (1 disabled)
- **New Script** · 6 steps
- **CREATE Budget Code Year Config Snapshot** · 21 steps (1 disabled)
- **CHECK BudgetCodeDef** · 2 steps
- **sort | Budget Allocation VERSIONS** · 1 steps

## Layouts (folder tree · base TO · fields placed · button → script) · geometry + styling NOT captured

**📁 view**
- **viewEXT_Fiscal_Years** [eds_Fiscal_Years] · 5 fields
- **(table) values** [ufile_Values] · 5 fields

**📁 UR Workday**

**📁 UR Workday/Operating Lines FOAs**
- **UR_OperatingLines_FAOs** [OP_Lines] · 4 fields
- **fURF0989_UR_Company** [fURF0989_UR_Company] · 3 fields
- **fURF0989_UR_CostCenter** [fURF0989_UR_CostCenter] · 4 fields
- **fURF0989_UR_Fund** [fURF0989_UR_Fund] · 3 fields
- **fURF0989_UR_LedgerAccount** [fURF0989_UR_LedgerAccount] · 3 fields

**📁 UR Workday/Spend Categories**
- **UR_Spend_Categories** [UR_SpendRevenueCategory] · 4 fields

**📁 ALLOCATION**
- **(Layout) NM Allocation Format Copy** [BUDGET_AllocationVersions] · 9 fields · btn → findAllocation, newAllocationWcurrent
- **(form) Budget HISTORY** [BUDGET_AllocationVersions] · 13 fields · 3 portals · btn → goToRelatedAllocations, sort | Budget Allocation VERSIONS
- **(tabel) Codes tht Others Use** [Budget_Allocation_OthersCodes] · 4 fields

**📁 Code generation**
- **(table) Generate Budget Codes** [BudgetCode_Defintions] · 11 fields · btn → New Script, sort | Budget Code Assignment Join, temp
- **(table) Budget FAMILY Definitions** [Budget_FamilyDefintions] · 5 fields
- **(table) Budget CONTEXT Definitions** [Budget_ContextDefinitions_forFiltering] · 7 fields · btn → sort | Budget Code SUFFIXES Copy
- **(table) Budget SUFFIX Definitions** [Budget_ContextSuffixDefinitions_forFiltering] · 5 fields · btn → sort | Budget Code SUFFIXES
- **(table) Budget Code Year Configs** [BudgetCode_YearConfig] · 7 fields · btn → CREATE Budget Code Year Config Snapshot
- **Value Lists** [ufile_ValueLISTS] · 18 fields · 2 portals

**📁 utility**
- **(form) Budget Versions** [BUDGET_AllocationVersions] · 9 fields · 2 portals · btn → DuplicateWRelated, goToRelatedAllocations
- **(table) URITP Budget Codes** [BudgetCode_Defintions] · 17 fields

**📁 SETUP Globals and Values**
- **File SETUP** [ui_GLOBAL_BudgetHub] · 17 fields · 1 portals

**📁 EDS**
- **GLOBAL_VARIABLES | Imported** [eds_URITP_GLOBAL_Variables] · 5 fields

**📁 PRINT**
- **Print BUDGET CODES** [BudgetCode_Defintions] · 12 fields · btn → sort | Budget Code Assignment Join

**📁 URF**
- **(table) Import SESSIONS URF** [IMPORT_SESSIONS] · 8 fields
- **(table) Import URF LINES** [URF_IMPORT_ROWS] · 28 fields · btn → Create_New_URF_Import, Recompute_URF_Fingerprints
- **(table) Import URF LINES Excel** [URF_IMPORT_ROWS] · 42 fields
- **URF_ROW_ASSIGNMENTS** [URF_ROW_ASSIGNMENTS] · 13 fields
- **URF_CODED_TRANSACTIONS** [URF_CODED_TRANSACTIONS] · 10 fields

**📁 zPREV**
- **gBudget Codes** [ui_GLOBAL_BudgetHub] · 18 fields · 2 portals

**📁 zPREV/SETUP**
- **ui_GLOBAL_BudgetHub** [ui_GLOBAL_BudgetHub] · 5 fields
- **relegate_Supervisors** [] · 0 fields
- **(Setup) Code Header Categories** [] · 0 fields
- **-** [BudgetCode_Defintions] · 0 fields
- **GLOBAL_scriptVariables** [GLOBAL_scriptVariables] · 1 fields

**📁 zPREV/SETUP/setup_Import/Export**
- **XXimport_URF_AUX** [] · 0 fields
- **XX_GLOBAL_PrintingVariables** [XX_GLOBAL_PrintingVariables] · 1 fields
- **-** [URF_IMPORT_ROWS] · 0 fields

**📁 zPREV/URITP CODES**
- **(Print) URITP Budget Codes FY26** [BudgetCode_YearConfig] · 0 fields · btn → SortbyCode100, SortedbyCode10, SortedbyCode10 Copy, SortedbyHeader, goToCodedTransactions, printAllCodeFormats
- **(Print) URITP Budget Codes Allocation HISTORY** [] · 0 fields · btn → SortbyCode100, SortedbyCode10, SortedbyCode10 Copy, SortedbyHeader, goToCodedTransactions, printAllCodeFormats
- **(form) CODED Transactions** [Code_Definitions] · 21 fields · 6 portals

**📁 zPREV/ALLOCATING**

**📁 zPREV/ALLOCATING/Budget Versions**
- **(List) Budget Versions** [BUDGET_AllocationVersions] · 7 fields

**📁 zPREV/ALLOCATING/NIGEL's ALLOCATIONS**
- **(Layout) NM Allocation Format** [Budget_Allocation] · 9 fields · btn → findAllocation, newAllocationWcurrent
- **(list) individual Allocations** [Budget_Allocation] · 6 fields
- **Current_Allocation** [Budget_Allocation] · 8 fields · btn → showOnly_CurrentAllocation
- **(form) URITP Budget Code** [BudgetCode_Defintions] · 16 fields · 5 portals · btn → COMMIT_ALL, commitSummaryButtonTriggerFY26
- **-** [URF_IMPORT_ROWS] · 0 fields

**📁 zPREV/Importing Data**

**📁 zPREV/Importing Data/URF**
- **URF_IMPORT_ROWS** [URF_IMPORT_ROWS] · 3 fields
- **URF_IMPORT Copy** [URF_IMPORT_ROWS] · 30 fields
- **URF_UNIQUE** [URF_IMPORT_ROWS] · 4 fields

**📁 zPREV/Assigning Codes**
- **UNASSIGNED** [URF_IMPORT_ROWS] · 10 fields · btn → POPUP_selectCODE, showUNASSIGNED
- **CodeSelectionPOPUP** [Code_Definitions] · 2 fields · btn → goToCode, useSelectedCode
- **Batch Assiging Budget Codes** [URF_IMPORT_ROWS] · 9 fields · btn → COPY_code, PASTE_code, POPUP_selectCODE, buttonPassCodeNum, showUNASSIGNED
- **MOBILE Assiging Budget Codes Copy** [URF_IMPORT_ROWS] · 8 fields · btn → COPY_code, PASTE_code, POPUP_selectCODE, REPLACE_fkBudgetCode, showUNASSIGNED, showUNASSIGNED Copy
- **CODED Ledgers** [URF_IMPORT_ROWS] · 11 fields
- **PRINT CODED TRANSACTIONS** [URF_IMPORT_ROWS] · 13 fields · btn → FilterSingleCodeASK
- **(PRINT) CODED Transactions Copy** [Code_Definitions] · 10 fields · 2 portals
- **CumSale_LABOUR** [CumSale_LABOUR] · 4 fields

**📁 zPREV/PRINTS/EXPORTS**
- **-** [URF_IMPORT_ROWS] · 0 fields
- **DIAGRAMING and NOTES** [Budget_Allocation] · 0 fields
- **file_WorkNotes** [file_WorkNotes] · 3 fields
- **XX_GLOBAL_fileSetup** [XX_GLOBAL_fileSetup] · 2 fields
- **IMPORT_SESSIONS** [IMPORT_SESSIONS] · 7 fields
- **Import_URF0989** [Import_URF0989] · 13 fields

## Counts
Tables 30 · Fields 384 · TOs 64 · Relationships 47 · Value lists 32 · Custom functions 19 · Scripts 61 · Layouts 62

## Not captured (declared)
- Layout object geometry, styles, local CSS, theme bodies
- Full script step text lives in STEPS.md, not here
- Record data, accounts, privileges
