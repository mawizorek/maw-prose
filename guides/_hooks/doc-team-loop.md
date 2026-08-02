# /doc-team-loop
> Write tight. Review hard. Strip everything that doesn't earn its space.

## The Loop

### 1. WRITE
Draft full content. No self-editing yet. Get it all down.

### 2. REVIEW (content + behavior)
- Does every section serve the stated purpose?
- Anything factually wrong or behaviorally misaligned?
- Flag: contradictions, assumptions, missing context.

### 3. AUDIT (fresh eyes)
- Re-read as if first time seeing it.
- Content: accurate, complete, non-redundant?
- Behavior: matches how the system actually works?
- Cut anything that repeats what another section says.

### 4. STRIP (slop removal)
- Kill filler words, hedging, qualifiers that add nothing.
- Kill sentences that restate the heading.
- Kill "this section describes..." preambles.
- Kill bullets that say the same thing differently.
- Every line must justify its existence.

### 5. UX PASS (readability + completeness)
- Can a reader scan in 30 seconds and find what they need?
- Are headers distinct and descriptive?
- Is anything missing that was present before stripping?
- If cut that shouldn't have been: restore it.

### 6. REPORT
Deliver:
- **Summary:** what the doc says (2-3 sentences max)
- **Cut list:** what was removed and why (brief)
- **3 held-back bullets:** things cut for density that WOULD be nice to restore. Provide every time.

## Rules
- Each pass is a distinct step. Don't combine.
- Strip pass is allowed to be aggressive. UX pass catches over-cuts.
- If UX pass restores something, it must survive a re-strip justification.
- Final output reads like a reference card, not a manual.

## Downstream Gates (future)
- `/tone` : voice and register consistency
- `/grammar-check` : mechanical correctness
- Both fire AFTER the loop completes, not during.
