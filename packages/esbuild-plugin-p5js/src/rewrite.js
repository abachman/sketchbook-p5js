const fs = require("node:fs/promises")
const child_process = require("node:child_process")
const path = require("node:path")
const globalToInstance = require("p5js-translator")
const debug = require("debug")("esbuild-plugin-p5js")
const FileCache = require("./file_cache.js")
const safeName = require("safe-name")

function zp(n) {
  return n.toString().padStart(4, "0")
}

function extractImports(code) {
  const lines = code.split("\n")
  const imports = []
  const input = []

  for (const line of lines) {
    if (line.match(/^import/)) {
      imports.push(line)
    } else {
      input.push(line)
    }
  }

  return [imports.join("\n"), input.join("\n")]
}

function wrappedSketch(file, i) {
  const varName = safeName(path.basename(file.path, ".p5.js"))
  const sn = `p5${zp(i)}_${varName}`
  return `
  const ${sn} = (sketch) => {
    ${file.contents} 
  };
  const ${sn}_bundle = {
    sketch: ${sn},
    name: "${file.path}",
  };
  export { ${sn}_bundle as ${sn} };
  `
}

async function loadAndTranslateFile(fpath) {
  const stat = await fs.stat(fpath)
  const mtime = stat.mtime.getTime()

  debug("fetch", fpath, mtime)
  return FileCache.fetch(fpath, mtime, async () => {
    debug("building", path.basename(fpath))
    const original = await fs.readFile(fpath, "utf8")
    const [imports, input] = extractImports(original)
    const translated = globalToInstance(input, "sketch")
    return [imports, translated]
  })
}

async function formatJs(contents) {
  const proc = child_process.spawn(
    "node_modules/.bin/biome",
    ["format", "--stdin-file-path=generated.js"],
    { stdio: "pipe" },
  )

  let stdout = ""
  proc.stdout.setEncoding("utf8")
  proc.stdout.on("data", (data) => {
    stdout += data.toString()
  })

  proc.stdin.write(contents)
  proc.stdin.end()

  return new Promise((resolve, reject) => {
    proc.on("close", (code) => resolve(stdout))
  })
}

const p5jsPlugin = () => {
  const scache = {}

  return {
    name: "p5js",
    setup(build) {
      debug("p5jsPlugin setup")

      build.onStart(() => {
        debug("onStart")
      })

      build.onResolve({ filter: /\*.p5.js$/ }, async (args) => {
        if (args.resolveDir === "") return

        const dirname = path.dirname(path.join(args.resolveDir, args.path))
        const files = await fs.readdir(dirname)
        const sketches = files.filter((file) => file.match(/\.p5\.js$/))
        const pluginData = {
          resolveDir: args.resolveDir,
          dirname,
          sketches,
        }

        return {
          path: args.path,
          namespace: "p5js",
          pluginData,
          watchFiles: sketches.map((sketch) => path.join(dirname, sketch)),
        }
      })

      // glob
      build.onLoad({ filter: /\*\.p5\.js$/, namespace: "p5js" }, async (args) => {
        const { dirname, sketches, resolveDir } = args.pluginData
        const sketchContents = await Promise.all(
          sketches.map((sketch) => loadAndTranslateFile(path.join(dirname, sketch))),
        )
        const files = sketchContents.map(([imports, contents], i) => {
          return { path: sketches[i], contents, imports }
        })

        let contents = [
          'import p5 from "p5";',
          ...files.map(f => f.imports)
        ]
        contents.push(files.map(wrappedSketch).join("\n"))
        contents = contents.join("\n")
        const formatted = await formatJs(contents)
        if (debug.enabled) {
          const tmpdir = path.join(process.cwd(), "tmp")
          await fs.writeFile(path.join(tmpdir, "translated.js"), contents)
          await fs.writeFile(path.join(tmpdir, "formatted.js"), formatted)
        }
        return {
          contents: formatted,
          pluginName: "p5js",
          resolveDir: dirname,
        }
      })

      // individual files
      build.onLoad({ filter: /[^*]\.p5\.js$/ }, async (args) => {
        const input = await fs.readFile(args.path, "utf8")
        const contents = translateWindowFunctions(input)
        return { contents }
      })
    },
  }
}

module.exports = { p5jsPlugin }
