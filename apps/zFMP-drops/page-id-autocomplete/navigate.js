// Part of page-id-autocomplete. Split 2026-10-12 to stay under the ~22KB
// read ceiling: one concern per file, shared mutable state lives in state.js.
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const S = require('./state');
const { idContextAt } = require('./refs');

// ═══════════════════════════════════════════════════════════════════════════
// HOVER PROVIDER — shows page info on @id refs
// ═══════════════════════════════════════════════════════════════════════════

function makeHoverProvider() {
  return {
    provideHover(document, position) {
      const mr = document.getWordRangeAtPosition(position, /\{[ \t]*\.[a-z][a-z0-9-]*[ \t]*\}/);
      if (mr) {
        const name = document.getText(mr).replace(/[{}.\s]/g, '');
        const row = S.MARKERS.find(m => m[0] === name);
        const md = row
          ? '**{.' + name + '}** · ' + row[1] + (row[2] ? ' · ' + row[2] : '') + '\n\n' + row[3]
          : '**{.' + name + '}** is not a marker. Renders as plain text.';
        return new vscode.Hover(new vscode.MarkdownString(md), mr);
      }
      const ref = idContextAt(document, position);
      let id, range;
      if (ref) {
        id = ref.id;
        range = new vscode.Range(document.positionAt(ref.start), document.positionAt(ref.end));
      } else {
        const wr = document.getWordRangeAtPosition(position, /@[A-Za-z0-9][A-Za-z0-9_.-]*/);
        if (!wr) return null;
        id = document.getText(wr).slice(1);
        range = wr;
      }
      const page = S.pageIndex[id];
      if (!page) return null;
      const lines = ['**' + id + '**', '', 'File: `' + page.description + '`'];
      const refs = S.reverseRefs[id];
      if (refs && refs.length > 0) {
        lines.push('', '**Referenced by** (' + refs.length + '):');
        for (const r of refs.slice(0, 10)) {
          const via = r.kind && r.kind.startsWith('fm:') ? ' (' + r.kind.slice(3) + ':)' : '';
          lines.push('- `' + r.fromFile + '` line ' + r.fromLine + via);
        }
        if (refs.length > 10) lines.push('- ...and ' + (refs.length - 10) + ' more');
      }
      const fwd = [];
      for (const [targetId, list] of Object.entries(S.reverseRefs)) {
        if (list.some(r => r.fromId === id)) fwd.push(targetId);
      }
      if (fwd.length > 0) {
        lines.push('', '**Links to** (' + fwd.length + '):');
        for (const f of fwd.slice(0, 10)) lines.push('- @' + f);
      }
      return new vscode.Hover(new vscode.MarkdownString(lines.join('\n')), range);
    }
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// DEFINITION PROVIDER — Ctrl-click to open target file
// ═══════════════════════════════════════════════════════════════════════════

function makeDefinitionProvider() {
  return {
    provideDefinition(document, position) {
      const ref = idContextAt(document, position);
      let id = ref ? ref.id : null;
      if (!id) {
        const wr = document.getWordRangeAtPosition(position, /@[A-Za-z0-9][A-Za-z0-9_.-]*/);
        if (!wr) return null;
        id = document.getText(wr).slice(1);
      }
      const page = S.pageIndex[id];
      if (!page || !page.description) return null;
      for (const folder of S.getWorkspaceFolders()) {
        const targetPath = path.join(folder.uri.fsPath, page.description);
        if (fs.existsSync(targetPath)) {
          return new vscode.Location(vscode.Uri.file(targetPath), new vscode.Position(0, 0));
        }
      }
      return null;
    }
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// CODE ACTIONS — create page from dead ref, fix frontmatter
// ═══════════════════════════════════════════════════════════════════════════

function makeCodeActionProvider() {
  return {
    provideCodeActions(document, range, context) {
      const actions = [];
      for (const diag of context.diagnostics) {
        if (diag.code === 'unresolved-ref') {
          // Extract the ID from the diagnostic message
          const idMatch = diag.message.match(/Unresolved .*?: @(.+)$/);
          if (idMatch) {
            const id = idMatch[1];
            const action = new vscode.CodeAction(
              'Create page "' + id + '"',
              vscode.CodeActionKind.QuickFix
            );
            action.command = {
              command: 'pageId.createPage',
              title: 'Create page',
              arguments: [id]
            };
            action.diagnostics = [diag];
            action.isPreferred = true;
            actions.push(action);
          }
        }

        if (diag.code === 'invalid-status') {
          for (const status of S.KNOWN_STATUSES) {
            const action = new vscode.CodeAction(
              'Change to "' + status + '"',
              vscode.CodeActionKind.QuickFix
            );
            action.edit = new vscode.WorkspaceEdit();
            action.edit.replace(document.uri, diag.range, 'status: ' + status);
            action.diagnostics = [diag];
            actions.push(action);
          }
        }

        if (diag.code === 'invalid-type') {
          for (const t of S.KNOWN_TYPES) {
            const action = new vscode.CodeAction(
              'Change to "' + t + '"',
              vscode.CodeActionKind.QuickFix
            );
            action.edit = new vscode.WorkspaceEdit();
            action.edit.replace(document.uri, diag.range, 'type: ' + t);
            action.diagnostics = [diag];
            actions.push(action);
          }
        }
      }
      return actions;
    }
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// CREATE PAGE COMMAND
// ═══════════════════════════════════════════════════════════════════════════

async function createPageCommand(idArg) {
  let id = idArg;
  if (!id) {
    id = await vscode.window.showInputBox({
      prompt: 'Page ID (kebab-case)',
      placeHolder: 'my-new-page'
    });
  }
  if (!id) return;

  const folders = S.getWorkspaceFolders();
  if (folders.length === 0) return;

  // Ask where to put it if there's an active file, default to its folder
  let targetDir = folders[0].uri.fsPath;
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    targetDir = path.dirname(activeEditor.document.uri.fsPath);
  }

  const fileName = id + '.md';
  const filePath = path.join(targetDir, fileName);

  if (fs.existsSync(filePath)) {
    vscode.window.showWarningMessage('File already exists: ' + fileName);
    const doc = await vscode.workspace.openTextDocument(filePath);
    await vscode.window.showTextDocument(doc);
    return;
  }

  const title = id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const content = [
    '---',
    'id: ' + id,
    'title: ' + title,
    'type: page',
    'status: hidden',
    'revised: ' + S.todayFormatted(),
    'summary: ',
    '---',
    '',
    '# ' + title,
    '',
    ''
  ].join('\n');

  fs.writeFileSync(filePath, content, 'utf8');
  const doc = await vscode.workspace.openTextDocument(filePath);
  await vscode.window.showTextDocument(doc);

  // Place cursor at the end
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const lastLine = doc.lineCount - 1;
    editor.selection = new vscode.Selection(lastLine, 0, lastLine, 0);
  }
}


module.exports = { makeHoverProvider, makeDefinitionProvider, makeCodeActionProvider, createPageCommand };
