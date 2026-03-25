# Lass TextMate Grammar

TextMate grammar for `.lass` files, providing syntax highlighting for the Lass language across VS Code, GitHub, Shiki, and other TextMate-compatible editors.

## Overview

Lass is a CSS superset that bridges JavaScript and CSS with six symbols. The grammar handles Lass's two-zone model:

- **Script Preamble** (between opening and closing `---` delimiters): TypeScript (default) or JavaScript
- **CSS Zone** (after closing `---` or entire file): CSS with Lass symbol extensions

## Features

### Two-Zone Model

Files can contain:
1. **With delimiters**: JS preamble between opening `---` (line 1) and closing `---`, CSS after
2. **Without delimiters**: Pure CSS with Lass symbols

### Lass Symbol Highlighting

| Symbol | Description | Scope |
|--------|-------------|-------|
| `---` | Opening/closing delimiters (optional comment after space) | `meta.separator.lass.open` / `meta.separator.lass.close` |
| `$param` | Variable substitution | `variable.other.lass` |
| `{{ expr }}` | JavaScript expression interpolation | `meta.embedded.inline.js` |
| `@(prop)` | Property lookup accessor | `variable.function.lass` |
| `@{ css }` | CSS fragment block | `meta.embedded.inline.css` |
| `//` | Single-line comment (stripped from output) | `comment.line.double-slash.lass` |

### Protected Contexts

Lass symbols inside the following contexts are **not** highlighted as Lass syntax (they remain as CSS):

- String literals: `"$notavar"`, `'@(notaprop)'`
- `url()` values: `url("path/with/$dollar")`
- Block comments: `/* $notavar @(notaprop) */`

This matches the transpiler's behavior, which does not transform symbols in these contexts.

## Scope Names for Theme Authors

The grammar uses the following scope names that theme authors can customize:

### Lass-Specific Scopes

```
source.lass                                  # Root scope
meta.separator.lass                          # --- separator line
comment.line.separator.lass                  # Comment after --- 
variable.other.lass                          # $param variables
variable.function.lass                       # @(prop) property accessors
comment.line.double-slash.lass               # // comments
meta.embedded.inline.js                      # {{ expr }} content
meta.embedded.inline.css                     # @{ css } content
punctuation.definition.template.expression.begin.lass  # {{
punctuation.definition.template.expression.end.lass    # }}
punctuation.definition.template.fragment.begin.lass    # @{
punctuation.definition.template.fragment.end.lass      # }
```

### Delegated Scopes

- **Script Preamble**: Uses `source.ts` (VS Code's built-in TypeScript grammar — highlights both TS and JS)
- **CSS Zone**: Uses `source.css` (VS Code's built-in CSS grammar)
- **Inside `{{ }}`**: Uses `source.ts`
- **Inside `@{ }`**: Uses `source.css` with Lass symbol overrides

## Example Highlighting

### File with Separator

```lass
---
import palette from './palette.json'
const $primary = '#2563eb'
--- design tokens and styles

.button {
  background: $primary;
}

:root {
  {{ Object.entries(palette).map(([name, value]) => @{
    --{{ name }}: {{ value }};
  }) }}
}
```

**Highlighting**:
- Line 1: Opening delimiter
- Line 2-3: JavaScript (preamble zone)
- Line 4: Closing delimiter + comment
- Line 6-8: CSS with `$primary` as Lass variable
- Line 11-13: `{{ }}` interpolation with `@{ }` fragment inside

### File without Separator

```lass
.box {
  color: $primary;
  outline: @(border);
}

{{ utils.map(u => @{ .{{ u }}: value; }) }}
```

**Highlighting**:
- Entire file: CSS zone with Lass symbols
- No JS preamble zone

## Testing

### Manual Testing in VS Code

1. Open a `.lass` file in VS Code
2. Run **Developer: Inspect Editor Tokens and Scopes** (Cmd+Shift+P)
3. Click on any token to see its scope
4. Verify scopes match the table above

### Test Files

- `examples/test-file.lass` - Comprehensive test covering all features
- `examples/no-separator.lass` - File without `---` separator

## Technical Details

### Architecture

The grammar follows Astro's frontmatter-style approach:

1. **Detect file structure**: Check for `---` on line 1 using `\A` anchor
2. **Zone delegation**:
   - Between opening and closing `---`: Inject `source.ts` (TypeScript grammar — JS is valid TS)
   - After closing `---` or entire file: Inject `source.css` with Lass overrides
3. **Symbol patterns**: Match Lass symbols with higher priority than CSS
4. **Recursion**: `@{ }` can contain `{{ }}`, which can contain `@{ }`, etc.

### Delimiter Pattern

```regex
\A---(\s.*|-*)$    # Opening delimiter (line 1 only)
^---(\s.*|-*)$     # Closing delimiter
```

- `\A`: Absolute start of document (opening delimiter must be on line 1)
- `^---`: Three dashes at start of line
- `(\s.*|-*)`: Optional whitespace + comment, or extra dashes (e.g., `---`, `------`)
- Whitespace required after `---` to avoid matching CSS custom properties (`--this`)

### Protected Context Handling

TextMate's scope hierarchy automatically prevents Lass pattern matching inside higher-priority scopes:

- When inside `string.quoted.double.css`, Lass patterns don't apply
- When inside `meta.function.url.css`, Lass patterns don't apply
- When inside `comment.block.css`, Lass patterns don't apply

No special logic needed - this is handled by pattern priority.

## Integration

### VS Code Extension (Story 10.2)

This grammar will be bundled in the Lass VS Code extension along with language configuration (brackets, comments, auto-closing pairs).

### Shiki (Story 10.3)

Load the grammar into Shiki for build-time syntax highlighting:

```ts
import lassGrammar from '@lass-lang/vscode-lass/syntaxes/lass.tmLanguage.json'
import { createHighlighter } from 'shiki'

const highlighter = await createHighlighter({
  themes: ['github-dark'],
  langs: [lassGrammar]
})
```

### GitHub Linguist (Story 10.4)

Submit this grammar to `github-linguist/linguist` for `.lass` file highlighting on GitHub.

## References

- [TextMate Language Grammars](https://macromates.com/manual/en/language_grammars)
- [VS Code Syntax Highlighting Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
- [Shiki Custom Languages](https://shiki.style/guide/load-lang)
- [Lass Language Specification](../../apps/lass-docs/content/llms.txt)

## License

MIT
