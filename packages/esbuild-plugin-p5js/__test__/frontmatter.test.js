const { test } = require("node:test")
const assert = require("node:assert")
const extractFrontmatter = require("../src/frontmatter")

const FIXTURES = [
  [
    `
// version: 1.0.0
function setup() {
  createCanvas(400, 400);
}`,
    { version: "1.0.0" },
  ],
  [
    `
function setup() {
  createCanvas(400, 400);
}`,
    {},
  ],
  [``, {}],
  [
    `// title: My cool sketch 1.0`,
    {
      title: "My cool sketch 1.0",
    },
  ],
  [ 
    `
// name: like
/*
 *
 * version-url: https://github.com/version
 *`,
    {
      name: 'like',
      'version-url': 'https://github.com/version'
    }
  ]
]

for (const [i, [source, expected]] of Object.entries(FIXTURES)) {
  test(`extract frontmatter from fixture ${i}`, () => {
    const [front, code] = extractFrontmatter(source)
    assert.deepStrictEqual(front, expected)
    assert.equal(code, source)
  })
}
