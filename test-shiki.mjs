import { createHighlighter } from 'shiki'
import lassGrammar from 'lass-tmlanguage' assert { type: 'json' }

const highlighter = await createHighlighter({
  themes: ['github-dark'],
  langs: ['svelte', 'css', 'javascript']
})

// Register the language with proper metadata
await highlighter.loadLanguage({
  ...lassGrammar,
  name: 'lass'
})

const lassCode = `import palette from './palette.json'
const $primary = '#2563eb'
--- design tokens

.box {
  color: $primary;
  background: blue;
}

:root {
  {{ Object.entries(palette).map(([name, value]) => @{
    --color-{{ name }}: {{ value }};
  }) }}
}`

const svelteCode = `<script>
  let count = 0
</script>

<style>
  .box {
    color: blue;
  }
</style>

<div class="box">
  Count: {count}
</div>`

console.log('=== SVELTE HIGHLIGHTING ===')
const svelteTokens = highlighter.codeToTokensBase(svelteCode, { lang: 'svelte', theme: 'github-dark' })
console.log('Total tokens:', svelteTokens.length)
console.log('First 20 tokens:')
svelteTokens.slice(0, 20).forEach((line, i) => {
  console.log(`Line ${i}:`, line.map(t => ({ content: t.content, color: t.color })))
})

console.log('\n=== LASS HIGHLIGHTING ===')
const lassTokens = highlighter.codeToTokensBase(lassCode, { lang: 'lass', theme: 'github-dark' })
console.log('Total tokens:', lassTokens.length)
console.log('First 20 tokens:')
lassTokens.slice(0, 20).forEach((line, i) => {
  console.log(`Line ${i}:`, line.map(t => ({ content: t.content, color: t.color })))
})
