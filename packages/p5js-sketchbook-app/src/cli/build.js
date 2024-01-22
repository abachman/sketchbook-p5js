const { p5jsPlugin } = require("esbuild-plugin-p5js")
const sketchbookPlugin = require("./plugins/sketchbook_templates.js")
const esbuild = require("esbuild")
const path = require("node:path")
const fs = require("node:fs/promises")
const process = require("node:process")

const cwd = process.cwd()
const config = path.resolve(cwd, "p5js-sketchbook.json")

async function builder(options) {
  const entry = path.resolve(cwd, "index.js")

  const config = await loadConfig()

  let ctx = await esbuild.context({
    entryPoints: [entry],
    outfile: path.join(cwd, "public/bundle.js"),
    bundle: true,
    minify: false,
    target: "es2020",
    jsx: "automatic",
    sourcemap: true,
    plugins: [p5jsPlugin(config.translate), sketchbookPlugin(config.sketchbook)],
  })

  if (options.watch) {
    console.log(`Watching for changes...`)
    await ctx.watch()

    let { host, port } = await ctx.serve({
      servedir: path.resolve(cwd, "public"),
      onRequest: (args) => {
        console.log(args)
      },
    })

    console.log(`Serving on http://${host}:${port}`)
  } else {
    await ctx.rebuild()
    console.log(`Build complete`)
  }
}

async function loadConfig() {
  let exists = true
  try {
    await fs.access(config, fs.constants.R_OK)
  } catch (err) {
    exists = false
  }

  if (exists) {
    return JSON.parse(await fs.readFile(config, "utf8"))
  } else {
    return { translate: {}, sketchbook: {} }
  }
}

async function build(options) {
  return builder(options).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}

module.exports = { build }
