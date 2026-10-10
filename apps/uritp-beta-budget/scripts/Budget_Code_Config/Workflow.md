

Each fiscal year gets (1) set of unique budget codes.  
The codes correlate to a URITP internally defined 'bucket' of funds allocated and spent.  

The codes may be updated or changed between semesters, but the corresponding 'bucket' behind them remains the same - more or less based on the bucket description which reflects its purpose.  

## Generate Codes vs Code SNAPSHOTS

Each published set of codes is a 'snapshot' of the current code configuration. Ideally, commonly used codes do not shift in the schema.  
Generate codes in the 'backend' and then update the current snapshot.  


## Generate Codes

1. The available buckets are generated from a MATRIX (join) of (3) dropdown fields.  

First, the code FAMILY essentialy defines the WORKSHEET of the code. This *may* effect behaviour of the join??

The second and third options - for context and subcontext - compose the available codes.  
The **CONTEXT** defines the *timeline* or *various stakeholders*; these are the header VECTORS.  

The **SUB-CONTEXT** defines the repeateable buckets to be available within each record in the CONTEXT vector.  
Not all subcontexts are necessarily relevant to each context, the design of this relationship is the nuance of this build.  

Generated Codes are the complete list of AVAILABLE codes based on the matrix of FAMILY_X_CONTEXT_X_SUBCONTEXT.  

## Year Configs  

Year Configs can serve to *filter* that an only make codes that are really relevant.

- JOIN: Code Defintion to current Fiscal Year  

- Ideally, this is automated. (1) button to bring in all available(?) codes <not marked for ignoring> and update the info in this join for the current FY.  

!!! note "We shall mark the back-end budget OPTIONS as either relevant or not."  

### [](@budget-code-year-config-UPDATE)

- Button trigger from [](@layout-view-current-code-config)  

1. Only consider records where <fkFiscalYear = fkCurrentFiscalYear>  
1. For every existent record with a current FY assignment, start a RECONCILLIATION record.  