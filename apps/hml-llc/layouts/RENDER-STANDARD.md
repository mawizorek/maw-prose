# Layout Render Standard

> Mira + Dex, 2026-08-02

## Principle: bake, don't fetch

Every `-render.html` is **self-contained**. Theme tokens are inlined as CSS custom properties at commit time. No runtime resolution, no CDN, no cross-repo fetching, no CORS.

A render opens identically from: `file://`, GitHub Pages, raw.githack, a ClickUp task attachment, or Brain's artifact viewer.

## How it works

1. Agent reads `papyrus.json` (or whichever theme the app declares)
2. Agent dumps all tokens into a `:root {}` block inside a `<style>` tag
3. Layout-specific CSS uses those `var(--token)` references
4. Google Fonts `<link>` is optional progressive enhancement (system fallbacks always defined)
5. Zero `<script src="...">` tags pointing at external repos

## Template skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{LAYOUT_NAME} — HML_LLC</title>
<!-- RENDER: {layout-slug} | THEME: papyrus (baked) -->
<link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root {
  /* paste tokens from papyrus.json */
  --bg: oklch(0.935 0.026 85);
  /* ... all tokens ... */

  /* typography */
  --font-display: 'Gabarito', system-ui, sans-serif;
  --font-body: 'Gabarito', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
  --fs-lead: 1.35rem;
  --fs-body: 0.9375rem;
  --fs-sm: 0.8125rem;
  --fs-xs: 0.6875rem;

  /* forms */
  --radius: 0px;
  --radius-lg: 2px;
  --border-w: 1px;
  --shadow-out: 0 1px 2px oklch(0.30 0.02 60 / 0.08);
  --shadow-in: inset 0 1px 3px oklch(0.30 0.02 60 / 0.12);

  /* spacing */
  --gap-xs: 4px;
  --gap-sm: 8px;
  --gap-md: 12px;
  --gap-lg: 20px;
  --pad-cell: 8px;
  --pad-card: 16px;
}

/* layout-specific CSS here */
</style>
</head>
<body>
  <!-- layout markup here -->
</body>
</html>
```

## Re-bake on theme change

When a token value changes in `papyrus.json`, agent does a mechanical `:root{}` replacement in affected render files. Find the block, replace it, commit. That's the entire "build step."

## Viewer is optional

`_viewer.html` can link to renders for browsing convenience, but every render stands alone. The viewer is NOT required to view a render.

## File naming

- `form-{name}-render.html` (form view)
- `table-{name}-render.html` (table view)
- `list-{name}-render.html` (list view)

Keeps the layout type visible in the filename, matching the `.md` wireframe beside it.

## What the viewer becomes

A static index page that links to each render. No iframe embedding, no API calls, no dynamic discovery. Just a manually maintained list of `<a>` tags. Cheap, never breaks.

## Object library

Renders use CSS class names from `_objects.json` as semantic markers in HTML comments. The objects themselves are expressed as CSS (the classes in the render file). No JS runtime reads the object library.
