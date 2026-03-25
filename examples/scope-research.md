# Context-Switching Scopes in Various Languages

## JSX/TSX - `< >` (HTML in JS)
- Opening `<div>`: `punctuation.definition.tag.begin.js`
- Closing `>`: `punctuation.definition.tag.end.js`

## Template Literals - `` `${ }` `` (JS in strings)
- Opening `${`: `punctuation.definition.template-expression.begin.js`
- Closing `}`: `punctuation.definition.template-expression.end.js`

## SCSS Interpolation - `#{ }` (expression in CSS)
- `#{`: `punctuation.definition.interpolation.begin.bracket.curly.scss`
- `}`: `punctuation.definition.interpolation.end.bracket.curly.scss`

## Vue Template - `{{ }}` (JS in HTML)
- `{{`: `punctuation.definition.generic.begin.html`
- `}}`: `punctuation.definition.generic.end.html`

## Markdown Code Blocks - ``` ``` ``` (code in text)
- Opening: `punctuation.definition.markdown`
- Language name: `fenced_code.block.language`

## Pattern Analysis

Most context-switching constructs use:
1. `punctuation.definition.*` base
2. Specific suffix describing the construct type
3. `.begin` / `.end` differentiation (optional)

## Recommendation for Lass

### Current:
- `@{` and `}`: `support.function.misc.lass` (function-like, yellow)

### Semantically better options:

**Option 1: Template/Interpolation style (like SCSS)**
```
@{  →  punctuation.definition.template.fragment.begin.lass
}   →  punctuation.definition.template.fragment.end.lass
```

**Option 2: Block/Embedded style**
```
@{  →  punctuation.section.embedded.begin.lass
}   →  punctuation.section.embedded.end.lass
```

**Option 3: Keep function-like (current)**
```
@{  →  support.function.misc.lass
}   →  support.function.misc.lass
```

## Trade-offs

- **`support.function`**: Visually distinctive (yellow), but semantically wrong (it's not a function call)
- **`punctuation.definition`**: Semantically correct, theme-dependent color
- **`punctuation.section`**: Good for block-level constructs, usually gets decent styling

