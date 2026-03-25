# Manual Testing Checklist for Lass TextMate Grammar

## Setup

**Option 1: Open vscode-lass folder directly**
1. Open `plugins/vscode-lass` in VS Code
2. Press **F5** to launch Extension Development Host
3. The dev host window will open with `examples/` folder
4. Open `examples/test-file.lass`

**Option 2: Use workspace file from root**
1. Open `dev.code-workspace` from the workspace root
2. The workspace includes both root and `vscode-lass` folders
3. Press **F5** to launch Extension Development Host
4. Navigate to the vscode-lass folder in the dev host
5. Open `examples/test-file.lass`

## Test Checklist

### ✅ AC1: Grammar File Structure

- [ ] File opens without errors
- [ ] Syntax highlighting is active
- [ ] Language mode shows "Lass" in bottom-right corner

### ✅ AC2: Two-Zone Model - Files WITH Delimiters

Open: `examples/test-file.lass`

**Opening Delimiter:**
- [ ] Line 1: `---` is highlighted (opening delimiter scope)

**JS Preamble (between delimiters):**
- [ ] Line 2: `import` is highlighted as JavaScript keyword
- [ ] Line 3: `const` is highlighted as JavaScript keyword
- [ ] Line 4: Variable names highlighted as JS variables

**Closing Delimiter:**
- [ ] Line 5: `---` is highlighted (closing delimiter scope)
- [ ] Line 5: `design tokens and styles` is highlighted as comment

**CSS Zone (after closing `---`):**
- [ ] Line 8+: CSS selectors highlighted (e.g., `.button`)
- [ ] CSS properties highlighted (e.g., `background`, `color`)

### ✅ AC3: Two-Zone Model - Files WITHOUT Delimiters

Open: `examples/no-separator.lass`

- [ ] No opening `---` on line 1
- [ ] No JS preamble highlighting
- [ ] Entire file is CSS with Lass symbols
- [ ] Lass symbols work (test `$primary`, `{{ }}`)

### ✅ AC4: Lass Symbols in CSS Zone

Use **Developer: Inspect Editor Tokens and Scopes** (Cmd+Shift+P):

**`$param` variable:**
- [ ] Click on `$primary` in line 14
- [ ] Scope includes `variable.other.lass`

**`@(prop)` property accessor:**
- [ ] Click on `@(border)` in line 25
- [ ] Scope includes `support.function.lass.property-accessor`
- [ ] Property name `border` scoped as `support.constant.property-value.css`

**`{{ expr }}` interpolation:**
- [ ] Click inside `{{ Object.entries(...)` on line 28
- [ ] Scope includes `meta.embedded.inline.js`
- [ ] JavaScript inside is highlighted (e.g., `.map`, `=>`)

**`@{ css }` fragment:**
- [ ] Click inside `@{ --color-{{ name }}` on line 29
- [ ] Scope includes `meta.embedded.inline.css`
- [ ] Nested `{{ name }}` is highlighted

**`//` single-line comment:**
- [ ] Click on `// This is a dev comment` on line 45
- [ ] Scope includes `comment.line.double-slash.lass`

### ✅ AC5: Protected Contexts - Symbols NOT Highlighted

**Strings:**
- [ ] Click on `$notavar` inside `"$notavar"` on line 51
- [ ] Scope is `string.quoted.double.css` (NOT `variable.other.lass`)
- [ ] Click on `@(notaprop)` inside `'@(notaprop)'` on line 52
- [ ] Scope is `string.quoted.single.css` (NOT `variable.function.lass`)

**`url()` values:**
- [ ] Click on `$dollar` inside `url("path/with/$dollar")` on line 58
- [ ] Scope is `string.quoted.double.css` or `meta.function.url.css` (NOT `variable.other.lass`)

**Block comments:**
- [ ] Click on `$notavar` inside `/* $notavar ... */` on line 63
- [ ] Scope is `comment.block.css` (NOT `variable.other.lass`)

### ✅ AC6: Delimiter Comment Support

**Valid closing delimiter with comment:**
- [ ] Line 5: `--- design tokens and styles`
- [ ] `---` is highlighted as closing delimiter
- [ ] `design tokens and styles` is highlighted as comment

**Invalid delimiter (no whitespace):**
- [ ] Line 68: `---nospace: value;`
- [ ] NOT highlighted as delimiter (should be CSS property)
- [ ] Treated as regular CSS custom property

### ✅ Recursion Test

**Nested `{{ }}` inside `@{ }` inside `{{ }}`:**
- [ ] Line 74-82: Complex nesting example
- [ ] All levels highlight correctly
- [ ] JavaScript in `{{ }}` is highlighted
- [ ] CSS in `@{ }` is highlighted
- [ ] Nested symbols work at all levels

## Results

**All tests passed?** ✅ Grammar is working correctly!

**Issues found?** Document them:
- Token: _______________
- Expected scope: _______________
- Actual scope: _______________
- Line number: _______________

## Notes

- Exact colors depend on your VS Code theme
- Scopes are what matter, not colors
- Use "Inspect Editor Tokens and Scopes" to verify scopes
