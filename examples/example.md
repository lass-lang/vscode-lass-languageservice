---
title: Lass Examples
description: Comparing Lass syntax with other CSS preprocessors
author: Lass Team
date: 2024-03-24
tags: [css, lass, preprocessor, comparison]
layout: documentation
---

# Lass Examples

## Basic CSS
```css
.button {
  background: var(--primary);
  padding: 16px;
}
```

## With Lass
```lass
---
const primary = '#6366f1';
const spacing = (n) => `${n * 0.25}rem`;
---

.button {
  background: {{ primary }};
  padding: {{ spacing(4) }};
  outline: @(border);
}

{{ [1, 2, 4].map(n => @{
  .m-{{ n }} {
    margin: {{ spacing(n) }};
  }
}) }}
```

## SCSS Comparison
```scss
$primary: #6366f1;

.button {
  background: $primary;
  padding: 1rem;
}
```

## Features

| Feature | SCSS | Lass |
|---------|------|------|
| Variables | `$var` | `$var` or `{{ var }}` |
| Functions | `@function` | JS functions |
| Mixins | `@mixin` | JS functions with `@{ }` |
| Loops | `@for`, `@each` | `{{ array.map() }}` |

### Code in Lists

- SCSS: `$primary-color: #6366f1;`
- Lass: `const $primary = '#6366f1';`
- CSS: `--primary: #6366f1;`

Inline code: Use `@(border)` for property lookup and `{{ expr }}` for interpolation.
