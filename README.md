# Lass Language Support for VS Code

Official VS Code extension for the [Lass](https://lass-lang.dev) language — syntax highlighting, bracket matching, and language features for `.lass` files.

## Features

- **Syntax Highlighting** — Full TextMate grammar for `.lass` files with VS Code-quality highlighting
- **Two-Zone Model** — Proper highlighting for the TypeScript preamble (above `---`) and CSS zone (below `---`)
- **Smart Editing** — Auto-closing for Lass symbols: `{{ }}`, `@{ }`, `@( )`
- **Comment Toggling** — `//` line comments (Cmd+/) and `/* */` block comments (Shift+Alt+A)
- **Bracket Matching** — Intelligent matching for CSS braces, JS brackets, and Lass symbols

## What is Lass?

Lass is a CSS authoring language that embeds TypeScript instead of inventing its own programming constructs. Where Sass adds `@mixin` and `@for`, Lass uses real JavaScript/TypeScript — one language to learn, zero new control flow.

Learn more at [lass-lang.dev](https://lass-lang.dev)

## Quick Example

```lass
---
import palette from './palette.json'
const $primary = '#2563eb'
---

.button {
  background: $primary;
}

:root {
  {{ Object.entries(palette).map(([name, value]) => @{
    --{{ name }}: {{ value }};
  }) }}
}
```

**What you'll see:**

- Lines 1-4: TypeScript preamble highlighted between `---` delimiters
- `$primary` highlighted as a Lass variable
- `{{ }}` expressions highlighted as embedded TypeScript
- `@{ }` fragments highlighted as embedded CSS
- Everything else highlighted as standard CSS

## Installation

Install from the VS Code Marketplace:

1. Open VS Code
2. Go to Extensions (Cmd+Shift+X / Ctrl+Shift+X)
3. Search for **"Lass Language Support"**
4. Click **Install**

Or install from the command line:

```bash
code --install-extension lass-lang.vscode-lass
```

## Supported Lass Symbols

| Symbol | Purpose | Auto-close |
|--------|---------|------------|
| `---` | Zone separator (preamble / CSS) | — |
| `$param` | Variable substitution | — |
| `{{ expr }}` | TypeScript expression interpolation | Yes |
| `@{ css }` | CSS fragment block | Yes |
| `@(prop)` | Property lookup accessor | Yes |
| `//` | Single-line comment (stripped from output) | — |

## Requirements

- VS Code 1.80.0 or higher

## Extension Settings

This extension contributes syntax highlighting and language configuration only. No additional settings are required.

## Known Issues

See [GitHub Issues](https://github.com/lass-lang/lass/issues) for known issues and feature requests.

## Release Notes

See [CHANGELOG.md](CHANGELOG.md) for release history.

## Contributing

Contributions are welcome! Visit the [Lass monorepo](https://github.com/lass-lang/lass) to get started.

## License

MIT — See [LICENSE](LICENSE) for details.
