// Part of page-id-autocomplete. Split 2026-10-12 to stay under the ~22KB
// read ceiling: one concern per file, shared mutable state lives in state.js.
const vscode = require('vscode');
const path = require('path');
const S = require('./state');
const { extractRefs, fmBounds, fmMapKeys, codeRanges, inRanges, maskCode } = require('./refs');
const { lintSyntax } = require('./mdsyntax');
const { lintRegistry } = require('./registry');
const { DIRECTIVES } = require('./vocab');

// ═══════════════════════════════════════════════════════════════════════════
// DIAGNOSTICS
// ═══════════════════════════════════════════════════════════════════════════


function lintDocument(document) {
  if (document.languageId !== 'markdown') return;
  const diagnostics = [];
  const text = document.getText();

  // ── Dead references: body links, !!! chain, fm chain/related/parent ──
  const KIND_LABEL = {
    'link': 'page reference', 'chain-directive': '!!! chain target',
    'fm:chain': 'chain: entry', 'fm:related': 'related: entry', 'fm:parent': 'parent:'
  };
  for (const r of extractRefs(text)) {
    if (S.pageIndex[r.id]) continue;
    const diag = new vscode.Diagnostic(
      new vscode.Range(document.positionAt(r.start), document.positionAt(r.end)),
      'Unresolved ' + (KIND_LABEL[r.kind] || (r.kind.startsWith('marker:') ? '@' + r.kind.slice(7) + ': target' : 'reference')) + ': @' + r.id,
      vscode.DiagnosticSeverity.Warning
    );
    diag.source = 'page-id';
    diag.code = 'unresolved-ref';
    diagnostics.push(diag);
  }

  // ── Directive slots: !!! data|form|formpicker|view|tally "slot" ──
  const code = codeRanges(text);
  const bodyStart = (fmBounds(text) || { end: 0 }).end;
  const dirRe = /^[ \t]*!!![ \t]+([a-z]+)[ \t]+"([^"\n]*)"/gm;
  let dm;
  while ((dm = dirRe.exec(text)) !== null) {
    if (dm.index < bodyStart || inRanges(code, dm.index)) continue;
    const d = DIRECTIVES.find(x => x.name === dm[1]);
    if (!d || !d.slots || d.slots === 'page') continue;
    const slot = dm[2].trim();
    const declared = fmMapKeys(text, d.slots);
    if (declared.includes(slot)) continue;
    const s0 = dm.index + dm[0].lastIndexOf('"' + dm[2]) + 1;
    const diag = new vscode.Diagnostic(
      new vscode.Range(document.positionAt(s0), document.positionAt(s0 + dm[2].length)),
      '!!! ' + d.name + ' "' + slot + '": no such slot in this page\'s `' + d.slots + ':` block. Declared: '
        + (declared.join(', ') || 'nothing'),
      vscode.DiagnosticSeverity.Warning);
    diag.source = 'page-id'; diag.code = 'dead-slot';
    diagnostics.push(diag);
  }

  // ── Unknown markers: {.x} / [text]{.x} that no markers.tsv row claims ──
  // Information, not a warning: the engine hands unknown names back untouched
  // on purpose ({ .md-button } is attr_list). But `{.calc}` sat unrendered on a
  // live site for days that way, so it is worth seeing.
  const known = new Set(S.MARKERS.map(m => m[0]).concat(S.ATTR_CLASSES.map(c => c[0])));
  const markRe = /(?:\[[^\]\n]*\])?\{[ \t]*\.([a-z][a-z0-9-]*)[ \t]*\}/g;
  let mm;
  while ((mm = markRe.exec(text)) !== null) {
    if (mm.index < bodyStart || inRanges(code, mm.index) || known.has(mm[1])) continue;
    if (text.charAt(mm.index - 1) === ')') continue;   // attr_list on a link: [x](@id){.no-print}
    const s0 = mm.index + mm[0].lastIndexOf('.' + mm[1]) + 1;
    const diag = new vscode.Diagnostic(
      new vscode.Range(document.positionAt(s0), document.positionAt(s0 + mm[1].length)),
      '{.' + mm[1] + '} is not a marker (theme/markers.tsv), so it renders as plain text / an attr_list class.',
      vscode.DiagnosticSeverity.Information);
    diag.source = 'page-id'; diag.code = 'unknown-marker';
    diagnostics.push(diag);
  }

  // ── Stock markdown syntax + @x: registries (mdsyntax.js, registry.js) ──
  const masked = maskCode(text);
  for (const d of lintSyntax(document, text, masked)) diagnostics.push(d);
  for (const d of lintRegistry(document, masked)) diagnostics.push(d);

  // ── Frontmatter validation ────────────────────────────────────────────
  const fmMatch = text.match(/^---\s*\n(.*?)\n---/s);
  if (fmMatch) {
    const fm = fmMatch[1];
    const fmStart = 4; // after "---\n"

    // Missing id
    if (!fm.match(/^(?:@id|id)\s*:/m)) {
      diagnostics.push(new vscode.Diagnostic(
        new vscode.Range(0, 0, 0, 3),
        'Missing required field: id',
        vscode.DiagnosticSeverity.Warning
      ));
    }

    // Missing title
    if (!fm.match(/^title\s*:/m)) {
      diagnostics.push(new vscode.Diagnostic(
        new vscode.Range(0, 0, 0, 3),
        'Missing required field: title',
        vscode.DiagnosticSeverity.Warning
      ));
    }

    // Missing summary (required on _base; renders as the lede)
    if (!fm.match(/^summary\s*:\s*\S/m)) {
      const d = new vscode.Diagnostic(new vscode.Range(0, 0, 0, 3),
        'Missing summary: (required on every page, renders as the lede)',
        vscode.DiagnosticSeverity.Warning);
      d.source = 'page-id'; diagnostics.push(d);
    }

    // Type-specific required fields
    const tMatch = fm.match(/^type\s*:\s*(\S+)/m);
    const tName = tMatch ? tMatch[1] : 'page';
    for (const req of (S.TYPE_REQUIRES[tName] || [])) {
      if (!fm.match(new RegExp('^' + req + '\\s*:\\s*\\S', 'm'))) {
        const d = new vscode.Diagnostic(new vscode.Range(0, 0, 0, 3),
          'type: ' + tName + ' requires ' + req + ':',
          vscode.DiagnosticSeverity.Warning);
        d.source = 'page-id'; diagnostics.push(d);
      }
    }
    if (tName === 'index' && path.basename(document.uri.fsPath) !== 'index.md') {
      const d = new vscode.Diagnostic(new vscode.Range(0, 0, 0, 3),
        "type: index on a file that isn't index.md. Index behaviours key on the filename.",
        vscode.DiagnosticSeverity.Information);
      d.source = 'page-id'; diagnostics.push(d);
    }

    // Invalid field values
    const lines = fm.split('\n');
    let lineOffset = 1; // line 0 is "---"
    for (const line of lines) {
      const statusMatch = line.match(/^status\s*:\s*(.+?)\s*$/);
      if (statusMatch && !S.KNOWN_STATUSES.includes(statusMatch[1].trim().toLowerCase())) {
        const diag = new vscode.Diagnostic(
          new vscode.Range(lineOffset, 0, lineOffset, line.length),
          'Invalid status: "' + statusMatch[1] + '". Expected: ' + S.KNOWN_STATUSES.join(', '),
          vscode.DiagnosticSeverity.Error
        );
        diag.source = 'page-id';
        diag.code = 'invalid-status';
        diagnostics.push(diag);
      }

      const typeMatch = line.match(/^type\s*:\s*(.+?)\s*$/);
      if (typeMatch && !S.KNOWN_TYPES.includes(typeMatch[1])) {
        const diag = new vscode.Diagnostic(
          new vscode.Range(lineOffset, 0, lineOffset, line.length),
          'Invalid type: "' + typeMatch[1] + '". Expected: ' + S.KNOWN_TYPES.join(', '),
          vscode.DiagnosticSeverity.Error
        );
        diag.source = 'page-id';
        diag.code = 'invalid-type';
        diagnostics.push(diag);
      }

      const themeMatch = line.match(/^theme\s*:\s*(.+?)\s*$/);
      if (themeMatch && !S.KNOWN_THEMES.includes(themeMatch[1])) {
        const diag = new vscode.Diagnostic(
          new vscode.Range(lineOffset, 0, lineOffset, line.length),
          'Unknown theme: "' + themeMatch[1] + '"',
          vscode.DiagnosticSeverity.Warning
        );
        diag.source = 'page-id';
        diag.code = 'unknown-theme';
        diagnostics.push(diag);
      }

      lineOffset++;
    }

    // Duplicate ID in workspace
    const idMatch = fm.match(/^(?:@id|id)\s*:\s*["']?(.+?)["']?\s*$/m);
    if (idMatch) {
      const id = idMatch[1];
      const locs = S.idLocations[id];
      if (locs && locs.length > 1) {
        const others = locs.filter(l => l.fullPath !== document.uri.fsPath);
        if (others.length > 0) {
          const otherFiles = others.map(l => l.file).join(', ');
          const idLine = fm.substring(0, fm.indexOf(idMatch[0])).split('\n').length;
          const diag = new vscode.Diagnostic(
            new vscode.Range(idLine, 0, idLine, idMatch[0].length),
            'Duplicate page ID "' + id + '" also in: ' + otherFiles,
            vscode.DiagnosticSeverity.Error
          );
          diag.source = 'page-id';
          diag.code = 'duplicate-id';
          diagnostics.push(diag);
        }
      }
    }
  }

  S.diagnosticCollection.set(document.uri, diagnostics);
}

function lintAllOpen() {
  for (const doc of vscode.workspace.textDocuments) lintDocument(doc);
}


module.exports = { lintDocument, lintAllOpen };
