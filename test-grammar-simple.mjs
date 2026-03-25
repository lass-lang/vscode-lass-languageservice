import { readFileSync } from 'fs'

const grammar = JSON.parse(readFileSync('./syntaxes/lass.tmLanguage.json', 'utf-8'))

console.log('=== ROOT PATTERNS ===')
grammar.patterns.forEach((p, i) => {
  console.log(`[${i}]`, p.comment || p.include || p.match?.substring(0, 50))
  if (p.patterns) {
    p.patterns.forEach((pp, j) => {
      console.log(`  [${i}.${j}]`, pp.include || 'pattern')
    })
  }
})

console.log('\n=== CHECKING CSS INCLUDE ===')
const hasCssInclude = JSON.stringify(grammar).includes('"include":"source.css"')
console.log('Has source.css include?', hasCssInclude)

console.log('\n=== CHECKING TS INCLUDE ===')
const hasTsInclude = JSON.stringify(grammar).includes('"include":"source.ts"')
console.log('Has source.ts include?', hasTsInclude)
