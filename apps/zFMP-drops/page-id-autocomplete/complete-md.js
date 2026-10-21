// Part of page-id-autocomplete (v0.6). Completions for stock markdown syntax and
// the engine's `@x:` registries:
//   ===  ===+  ===!       tabs (pymdownx.tabbed alternate_style), 4-space body
//   [^                    footnote labels already defined + the next number
//   ](@id#  ](#           heading anchors on the target page (or this one)
//   @url:                 page links: + site.yml links:
//   @fmp:                 nearest NAMES.tsv keys
//   @rel: @calc: @role:   page ids (marker link form; prefixes from markers.tsv)
const vscode = require('vscode');
const S = require('./state');
const { urlNames, fmpCatalog, headingsOf, markerPrefixes } = require('./registry');

const K = () => vscode.CompletionItemKind;

function makeMarkdownProvider() {
  return {
    provideCompletionItems(document, position) {
      const line = document.lineAt(position).text;
      const prefix = line.substring(0, position.character);
      const rangeBack = (n) => new vscode.Range(position.translate(0, -n), position);
      let m;

      // Tabs
      if ((m = prefix.match(/^([ \t]*)(===[+!]?)$/))) {
        const body = '\n' + m[1] + '    ';
        const range = rangeBack(m[2].length);
        return [
          ['===', 'tab', 'a tab in the current set'],
          ['===+', 'tab, selected', 'this tab is open on load'],
          ['===!', 'tab, NEW set', 'starts a new tab set even if one sits directly above']
        ].map(([f, label, doc], i) => {
          const it = new vscode.CompletionItem(f + ' "' + label + '"', K().Snippet);
          it.detail = doc; it.range = range; it.filterText = m[2]; it.sortText = String(i);
          it.insertText = new vscode.SnippetString(f + ' "${1:Label}"' + body + '$0');
          it.documentation = new vscode.MarkdownString('Body indented 4 spaces. On paper every label prints as a heading (print-flow.css).');
          return it;
        });
      }

      // Footnotes
      if ((m = prefix.match(/\[\^([\w-]*)$/))) {
        const text = document.getText();
        const labels = [...new Set([...text.matchAll(/^\[\^([^\]\s]+)\]:/gm)].map(x => x[1]))];
        const nums = labels.map(Number).filter(n => !isNaN(n));
        const next = String((nums.length ? Math.max(...nums) : 0) + 1);
        const closes = line.charAt(position.character) === ']';
        const items = labels.map(l => {
          const it = new vscode.CompletionItem(l, K().Reference);
          it.detail = 'defined footnote'; it.range = rangeBack(m[1].length);
          it.insertText = l + (closes ? '' : ']');
          return it;
        });
        const nu = new vscode.CompletionItem(next + ' (new)', K().Snippet);
        nu.detail = 'cite a new footnote; add  [^' + next + ']: ...  below';
        nu.range = rangeBack(m[1].length); nu.insertText = next + (closes ? '' : ']'); nu.sortText = 'zz';
        items.push(nu);
        return items;
      }

      // Anchors
      if ((m = prefix.match(/\]\((?:@(?:([a-z]+):)?([A-Za-z0-9_.-]+))?#([\w-]*)$/))) {
        const [, pfx, id] = m;
        if (pfx && !markerPrefixes().has(pfx)) return [];
        const hs = headingsOf(id, document);
        if (!hs) return [];
        return hs.map((h, i) => {
          const it = new vscode.CompletionItem(h.slug, K().Reference);
          it.detail = '#'.repeat(h.level) + ' ' + h.text; it.range = rangeBack(m[3].length);
          it.sortText = String(i).padStart(4, '0');
          return it;
        });
      }

      // @url:
      if ((m = prefix.match(/@url:([\w.-]*)$/))) {
        const { names, siteKnown } = urlNames(document);
        const items = [...names.values()].map(e => {
          const it = new vscode.CompletionItem(e.name, K().Reference);
          const url = e.value || e.children.url || '';
          it.detail = (e.children.text ? e.children.text + ' · ' : '') + e.where;
          it.documentation = url; it.range = rangeBack(m[1].length);
          return it;
        });
        if (!siteKnown) {
          const it = new vscode.CompletionItem('(site.yml links not found: page links only)', K().Text);
          it.insertText = ''; it.range = rangeBack(m[1].length); it.sortText = 'zz';
          items.push(it);
        }
        return items;
      }

      // @fmp:
      if ((m = prefix.match(/@fmp:([\w.]*)$/))) {
        const cat = fmpCatalog(document.uri.fsPath);
        if (!cat) {
          const it = new vscode.CompletionItem('(no NAMES.tsv at or above this folder)', K().Text);
          it.insertText = ''; it.range = rangeBack(m[1].length);
          return [it];
        }
        return cat.rows.map(r => {
          const it = new vscode.CompletionItem(r.key, K().Field);
          const shown = (r.status === 'new' || !r.current) ? r.proposed : r.current;
          it.detail = (shown || '') + ' · ' + (r.status || 'keep');
          it.documentation = new vscode.MarkdownString([
            'current: `' + (r.current || '') + '`', 'proposed: `' + (r.proposed || '') + '`',
            r.page ? 'page: @' + r.page : '', 'catalog: ' + cat.file].filter(Boolean).join('  \n'));
          it.range = rangeBack(m[1].length);
          return it;
        });
      }

      // Marker link form: @rel:id, @role:id ...
      if ((m = prefix.match(/@([a-z]+):([A-Za-z0-9_.-]*)$/)) && markerPrefixes().has(m[1])) {
        const pfx = m[1];
        const typed = S.KNOWN_TYPES.includes(pfx);     // markerlinks type check: @role: -> type: role
        return Object.entries(S.pageIndex).map(([pid, info]) => {
          const it = new vscode.CompletionItem(pid, K().Reference);
          it.detail = (info.description || '') + '  (@' + pfx + ':)';
          it.range = rangeBack(m[2].length);
          if (typed && pid.startsWith(pfx)) it.sortText = '0' + pid;
          return it;
        });
      }
      return [];
    }
  };
}

module.exports = { makeMarkdownProvider };
