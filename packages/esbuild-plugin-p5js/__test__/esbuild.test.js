const { test } = require("node:test")
const assert = require("node:assert")
const fs = require("node:fs/promises")
const path = require("node:path")

const esbuild = require("esbuild");
const { p5jsPlugin } = require("../src/rewrite.js")

const fixtures = path.resolve(__dirname, "./fixtures")
const output = path.resolve(__dirname, "./output")

const singleSketchBody = `(sketch) => {
    sketch.setup = function() {
      sketch.createCanvas(800, 800);
      sketch.noStroke();
      sketch.enableCapture();
    };
    sketch.draw = function() {
      if (sketch.frameCount % 10 === 0) {
        sketch.circle(sketch.random(sketch.width), sketch.random(sketch.height), 10);
      }
    };
  };
`

test('esbuild-plugin-p5js', async (t) => {
  await t.test('builds single files', async () => {
    const entryPoints = [ path.join(fixtures, 'single_sketch.js') ]
    const outfile = path.join(output, "outfile-single.js")

    await esbuild.build({
      entryPoints,
      outfile,
      bundle: true,
      target: "es2020",
      plugins: [
        p5jsPlugin({ instanceMethods: ['enableCapture'], skipImport: true }),
      ],
    })

    const actual = await fs.readFile(outfile, 'utf8')
    const expected = singleSketchBody

    assert.ok(actual.includes(expected), `expected ${outfile} to include\n\n${expected}`)
  })
   
  await t.test('builds *.p5.js', async () => {
    const entryPoints = [ path.join(fixtures, 'blob_sketch.js') ]
    const outfile = path.join(output, "outfile-blob.js")

    await esbuild.build({
      entryPoints,
      outfile,
      bundle: true,
      target: "es2020",
      plugins: [
        p5jsPlugin({ instanceMethods: ['enableCapture'], skipImport: true  }),
      ],
    })

    const actual = await fs.readFile(outfile, 'utf8')
    const expected = singleSketchBody

    assert.ok(actual.includes(expected), `expected ${outfile} to include\n\n${expected}`)
  })
})
