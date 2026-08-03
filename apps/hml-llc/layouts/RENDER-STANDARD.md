# Layout Render Standard

> Mira + Dex + Riley, 2026-08-02

## Core principle: bake tokens, portable viewer

Every `-render.html` is **self-contained**. Theme tokens inlined as `:root{}` CSS vars at commit time. No runtime resolution for the render itself.

The **viewer** is the sandbox layer. It lives beside the renders and re-skins them live.

## The portable renderer (`viewer.html`)

**Zero-config.** Copy `viewer.html` into any folder of any GitHub Pages-enabled repo. It:

1. Detects owner/repo/path from its own URL (no manual config on Pages)
2. Scrubs all subfolders for `*.html` files via GitHub Trees API
3. Populates a layout dropdown (grouped by subfolder)
4. Populates a theme dropdown from `_themes.json`
5. Renders selected layout in an iframe
6. On theme change, resolves all 4 vectors (color, typography, forms, spacing) from TSVs and overwrites `:root` vars on the iframe

**To deploy in a new app:**
1. Copy `viewer.html` into the app's doc root
2. Ensure repo has `.nojekyll` at root
3. Ensure GitHub Pages is enabled (deploy from branch: main, root)
4. Done. Navigate to `{owner}.github.io/{repo}/{path}/viewer.html`

**Fallback config:** If not on `*.github.io` (local dev, custom domain), edit the three `FALLBACK_*` vars at the top of the script block.

## How renders are built

1. Agent reads the app's declared theme from frontmatter (e.g. `theme: papyrus`)
2. Resolves that theme's 4 vector pointers via `_themes.json`
3. Looks up each vector's row in the corresponding TSV
4. Dumps ALL resolved tokens into a `:root {}` block
5. Layout CSS uses `var(--token)` references exclusively
6. Google Fonts `<link>` is progressive enhancement (system fallbacks defined)
7. Zero `<script src>` to external repos. Zero runtime fetching.

## Template skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{LAYOUT_NAME}</title>
<!-- RENDER: {layout-slug} | THEME: {theme-slug} (baked) -->
<link href="https://fonts.googleapis.com/css2?family={fonts}&display=swap" rel="stylesheet">
<style>
:root {
  /* === BAKED TOKENS from {theme-slug} === */
  /* colors */
  --bg: ...;
  --surface: ...;
  /* typography */
  --font-display: ...;
  --font-body: ...;
  /* forms */
  --radius: ...;
  /* spacing */
  --gap-sm: ...;
}
/* layout CSS here, var(--token) only */
</style>
</head>
<body>
  <!-- layout markup -->
</body>
</html>
```

## Re-bake on theme change

When a token changes in any TSV, agent does a mechanical `:root{}` find-and-replace in affected render files. That's the entire build step.

## File naming

- `form-{name}-render.html` (Form View)
- `table-{name}-render.html` (Table View)
- `list-{name}-render.html` (List View)

Sits beside its `.md` wireframe counterpart.

## Object library

Renders use CSS class names from `_objects.json` as semantic markers in HTML comments. Objects are expressed as CSS in the render. No JS reads the library at runtime.

## Theme system source of truth

- Join index: `mawizorek/ClickUp_apps/shared/themes/_themes.json`
- Vectors: `colors.tsv`, `typography.tsv`, `forms.tsv`, `spacing.tsv` (same folder)
- Object library: `shared/themes/_objects.json`

## Agent build rules (for all future HTML renders)

1. **Consult the theme system.** Every HTML render MUST use tokenized CSS vars from the declared theme. Never hardcode colors, fonts, radii, or spacing.
2. **Fit the viewer.** Renders MUST work standalone AND inside the viewer's iframe with theme overrides.
3. **Object library first.** Use default object library components. Only create custom elements when no library match exists.
4. **Bake, don't fetch.** The render file ships complete. The viewer handles re-skinning.
5. **One viewer per app.** Drop it at the doc root. It finds everything below it.
