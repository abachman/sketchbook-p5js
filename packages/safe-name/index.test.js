const { test } = require('node:test')
const assert = require('node:assert')

const safe = require("./index.js")

const FIXTURES = [
  ['foo', 'foo'],
  [10, '_10'],
  ['800x80__genuary_13', '_800x80__genuary_13'],
  ['100, this is #*&#%! cool, man!?', '_100__this_is________cool__man__'],
  ['await', '_await'],
]

for (const [input, expected] of FIXTURES) {
  test(`safe('${input}') => ${expected}`, () => {
    assert.equal(safe(input), expected)
  })
}
