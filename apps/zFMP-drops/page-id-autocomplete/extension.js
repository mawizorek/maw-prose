const vscode = require('vscode');
const S = require('./state');
const { loadPageIndex, loadImageIndex, buildReverseRefs, buildIdLocations, loadAll } = require('./scan');
const { loadVocab } = require('./vocab');
const { lintDocument, lintAllOpen } = require('./lint');
const { makeHoverProvider, makeDefinitionProvider, makeCodeActionProvider, createPageCommand } = require('./navigate');
const { makePageProvider, makeImageProvider, makePeerProvider, makeBodyProvider, makeFrontmatterProvider } = require('./complete');
const { makeMarkdownProvider } = require('./complete-md');
const { makeSyntaxActionProvider } = require('./mdsyntax');

// page-id-autocomplete. Router only: every concern lives in its own module.
//   state.js     shared mutable state + fallback vocabulary
//   vocab.js     reads the live vocabulary from a doc-render-engine checkout
//   refs.js      reference extraction: body @id, !!! chain, fm chain/related/parent
//   scan.js      workspace indexes (pages, images, peers, reverse refs, id locations)
//   lint.js      diagnostics
//   navigate.js  hover, Cmd-click, quick fixes, New Page
//   complete.js  @id, @img:, peers, frontmatter, !!! / {. completion
//   complete-md.js  tabs, footnotes, #anchors, @url:, @fmp:, @rel:-style ids
//   mdsyntax.js  stock-markdown lints + their quick fixes
//   registry.js  @url: / @fmp: / heading registries + their lint

// ═══════════════════════════════════════════════════════════════════════════
// ACTIVATION
// ═══════════════════════════════════════════════════════════════════════════

function activate(context) {
  loadAll();
  const engineRoot = loadVocab();
  if (engineRoot) {
    const ew = vscode.workspace.createFileSystemWatcher(
      new vscode.RelativePattern(engineRoot, '{objects/*.yml,theme/markers.tsv,theme/blocks.tsv,docrender/objects.py}'));
    const reload = () => { loadVocab(); lintAllOpen(); };
    ew.onDidChange(reload); ew.onDidCreate(reload); ew.onDidDelete(reload);
    context.subscriptions.push(ew);
  }
  context.subscriptions.push(vscode.commands.registerCommand('pageId.vocabSource', () =>
    vscode.window.showInformationMessage('Page ID vocab: ' + S.VOCAB_SOURCE + ' · '
      + S.KNOWN_TYPES.length + ' types, ' + S.CALLOUTS.length + ' callouts, ' + S.MARKERS.length + ' markers')));

  // File watchers
  const snippetsWatcher = vscode.workspace.createFileSystemWatcher('**/.vscode/project.code-snippets');
  snippetsWatcher.onDidChange(() => { loadPageIndex(); buildIdLocations(); buildReverseRefs(); lintAllOpen(); });
  snippetsWatcher.onDidCreate(() => { loadPageIndex(); buildIdLocations(); buildReverseRefs(); lintAllOpen(); });
  context.subscriptions.push(snippetsWatcher);

  const imgWatcher = vscode.workspace.createFileSystemWatcher('**/*.{jpg,jpeg,png,svg,gif,webp}');
  imgWatcher.onDidCreate(() => loadImageIndex());
  imgWatcher.onDidDelete(() => loadImageIndex());
  context.subscriptions.push(imgWatcher);

  const mdWatcher = vscode.workspace.createFileSystemWatcher('**/*.md');
  mdWatcher.onDidChange(() => { buildReverseRefs(); buildIdLocations(); });
  mdWatcher.onDidCreate(() => { buildReverseRefs(); buildIdLocations(); });
  mdWatcher.onDidDelete(() => { buildReverseRefs(); buildIdLocations(); });
  context.subscriptions.push(mdWatcher);

  const md = { language: 'markdown', scheme: 'file' };

  // Completion providers
  context.subscriptions.push(vscode.languages.registerCompletionItemProvider(md, makePageProvider(), '@'));
  context.subscriptions.push(vscode.languages.registerCompletionItemProvider(md, makeImageProvider(), ':'));
  context.subscriptions.push(vscode.languages.registerCompletionItemProvider(md, makePeerProvider(), ':'));
  context.subscriptions.push(vscode.languages.registerCompletionItemProvider(md, makeFrontmatterProvider(), ' ', '-', ',', '['));
  // Body: !!! / ??? / ???+ callouts + directives, {. markers, directive slots
  context.subscriptions.push(vscode.languages.registerCompletionItemProvider(md, makeBodyProvider(), '!', '?', '+', ' ', '.', '"'));

  // Stock markdown + registries: === tabs, [^ footnotes, #anchors, @url:, @fmp:, @rel:
  context.subscriptions.push(vscode.languages.registerCompletionItemProvider(md, makeMarkdownProvider(), '=', '+', '!', '^', '#', ':'));
  context.subscriptions.push(vscode.languages.registerCodeActionsProvider(md, makeSyntaxActionProvider(), {
    providedCodeActionKinds: [vscode.CodeActionKind.QuickFix]
  }));

  // Hover + go-to-definition
  context.subscriptions.push(vscode.languages.registerHoverProvider(md, makeHoverProvider()));
  context.subscriptions.push(vscode.languages.registerDefinitionProvider(md, makeDefinitionProvider()));

  // Code actions (quick fixes)
  context.subscriptions.push(vscode.languages.registerCodeActionsProvider(md, makeCodeActionProvider(), {
    providedCodeActionKinds: [vscode.CodeActionKind.QuickFix]
  }));

  // Create page command
  context.subscriptions.push(vscode.commands.registerCommand('pageId.createPage', createPageCommand));

  // Diagnostics
  S.diagnosticCollection = vscode.languages.createDiagnosticCollection('pageIdRefs');
  context.subscriptions.push(S.diagnosticCollection);
  context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(doc => lintDocument(doc)));
  context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(doc => lintDocument(doc)));
  let lintTimer;
  context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(e => {
    clearTimeout(lintTimer);
    lintTimer = setTimeout(() => lintDocument(e.document), 400);
  }));
  lintAllOpen();
}

function deactivate() {}

module.exports = { activate, deactivate };
