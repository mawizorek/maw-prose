# Sheets and drawing sets

*The paper side: what a sheet layer is, and how a drawing set gets numbered. Sourced from Vectorworks documentation and the National CAD Standard; checked 2026-07-16.*

## Design layers versus sheet layers

This is the distinction nobody gets right without being told once.

**Design layers are the drawing.** They are scaled, they hold the actual geometry, and they all share one user origin.

**Sheet layers are paper.** They are always **1:1**, they hold viewports, title block borders, notes and annotations, and each one has its own origin. You do not draw the show on a sheet layer; you put a window onto the drawing there.

A **viewport** is that window. It renders a chosen combination of design layers and classes, each set visible, greyed, or hidden. So one drawing produces a lighting plate, a rigging plate, and a scenic plate by changing what the viewport shows rather than by drawing three times.

- [Organizing the drawing](https://app-help.vectorworks.net/2026/eng/VW2026_Guide/Structure/Organizing_the_drawing.htm) · [Setting the user origin](https://app-help.vectorworks.net/2024/eng/VW2024_Guide/Setup/Setting_the_user_origin.htm) · [Vectorworks equivalents to AutoCAD and Revit terms](https://app-help.vectorworks.net/2020/eng/VW2020_Guide/DXFDWG/Vectorworks_equivalents_to_AutoCAD_and_Revit_terms_and_concepts.htm)

## How professional sets get numbered

The **National CAD Standard** model: a sheet number is a **discipline designator** (a letter or letters — A architectural, S structural, E electrical) plus a **sheet-type digit** distinguishing plans from sections from details from schedules, plus a sequence number. The discipline letter is the load-bearing part.

Discipline order runs general, then site, then architectural, then structural, then MEP, and offices adapt it.

In theatre, **USITT** does the same job: RP-2 for lighting, and the Scenic Design and Technical Production Graphic Standard for the rest. Those are the graphic language a plot is expected to speak.

**Our scheme is already a discipline-prefix system, which is worth knowing before anyone proposes replacing it.** The department prefixes (UR, S, L, A, R, V) plus a number, with `0` as the department readme sheet, is the National CAD model arrived at independently. It is drafted, not locked, and the full per-department drawing list gets settled at a venue build rather than in advance.

- [Construction document sheet numbers and order](https://www.archtoolbox.com/construction-document-sheet-numbers/) · [USITT RP-2 (PDF)](https://cad4theatre.org.uk/USITT-RP2-Lighting-Standard.pdf) · [USITT Scenic Design and Technical Production Graphic Standard](https://docslib.org/doc/1655565/usitt-scenicdesign-and-technicalproduction-graphicstandard)
