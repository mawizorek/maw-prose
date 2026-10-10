
To define a flexible "reconcilliation" popup for when scripts run and find conflicting data.  

## Use Case Examples  

???+ example "Budget Code Year Configs"  
    If a code assignment already exists and it's code or description are now different than the canonical row in Budget Code Definitions.  

???+ example "Allocation Updates"  
    Once a new allocation has been defined, a new snapshot is to be stored - these updates to the current config (published version) should be confirmed and verified.  

## References  

- Lightwright and VWX live data exchange conflicting data menu.  

## How it Works

- Treats *fields* and *discrepancies* as the records, and does not care about the content.  

### Field Overview
    - Audit Fields
        - Primary Key
        - Creation Timestamp, Created By, Modification Timestamp, Modified By  
    - Source_Table_A  
    - Source_Table_B  
    - Field_Name  
    - Value_in_A  
    - Value_in_B  
    - Value_in_Custom
    - User_Decision = [ A or B ]  <C for custom??>
    - Value_Decided   
    - script_Timestamp_Decision_Updated