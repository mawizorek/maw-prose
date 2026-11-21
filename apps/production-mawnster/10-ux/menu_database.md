---
id: menu-database
title: Database
type: page
status: unlisted
chrome: app
revised: Sep 2026
summary: "The database layer, as the app's own menu reaches it."
hide:
  - navigation
  - toc
  - footer
---

# Database {.align-center}

!!! cards cols=3 phone=1 size=m
    - 🗃️ [Tables](@menu-tables) {color=blue}
      Every table in the file, grouped the way the app groups them.
    - 🏷️ [Fields](@menu-fields) {color=teal}
      Per table. Each row opens that table's field menu.
    - 🔗 [Relationships](@menu-relationships) {color=purple}
      The graph as designed. Anchor and buoy.

<p><br/></p>

⚠️ **This is a MENU, not a source.** Every page it reaches is the existing
documentation page; nothing here holds a second copy of a table, a field or a
predicate. A menu that owns content becomes a second claimant, and the
hand-written one always loses.

🚫 **Never write a count on this page.** Not tables, not fields, not
relationships. The rows are the count, and a number in prose is wrong within two
days — the rule `30-RELATIONSHIPS/index.md` already states for itself.

??? tip "Why this page wears no site chrome"
    `chrome: app` (`docrender/chrome.py`) drops the tabs, both sidebars, search,
    the site title, the footer and the breadcrumbs **on screen only**. It keeps
    the letterhead, the light/dark switch and the print button. Print is
    untouched — `print-chrome.css` already strips all of it on paper.

    `status: unlisted` is the partner key: `chrome: app` hides the site from the
    reader, `unlisted` hides the page from the site. ⚠️ **Neither makes it
    private.** Anyone with the link can open it.
