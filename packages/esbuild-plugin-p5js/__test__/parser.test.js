const { test } = require("node:test")
const assert = require("node:assert")

const parser = require("../src/frontmatter/parser.js")

test("parser captures comment lines", () => {
  const code = `// name is like wind

  /* this is a comment 
   * and so is this
   this too is in a comment block
   *  and this!*/
  // name: like wind
  function setup() {
    createCanvas(400, 400);
  }
  `

  const collection = []
  const handleComment = (comment) => {
    collection.push(comment)
  }

  parser(code, handleComment)
  assert.equal(collection.length, 6)
  assert.deepStrictEqual(collection, [
    "name is like wind",
    "this is a comment",
    "and so is this",
    "this too is in a comment block",
    "and this!",
    "name: like wind",
  ])
})

// [string, string[]][]
// where each pair is [code, expected]
const FIXTURES = [
  ["// name: like wind", ["name: like wind"]],
  ["/* name: like wind */", ["name: like wind"]],
  ["/* name: like wind*/", ["name: like wind"]],
  ["/* name: like wind */\n\nfunction setup() {}", ["name: like wind"]],
  ["const start = 1; /* name: like wind */ function setup() {}", []],
  ["// name\n\n// like   1.wind", ["name", "like 1.wind"]],
  ["// // name", ["// name"]],
  ["// name like /* wind */", ["name like /* wind */"]],
]

for (const [i, [code, expected]] of Object.entries(FIXTURES)) {
  test(`parser captures comments from fixture ${i}`, () => {
    const collection = []
    const handleComment = (comment) => {
      collection.push(comment)
    }

    parser(code, handleComment)
    assert.deepStrictEqual(collection, expected)
  })
}
