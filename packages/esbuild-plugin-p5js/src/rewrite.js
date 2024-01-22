const fs = require("node:fs/promises")
const child_process = require("node:child_process")
const path = require("node:path")
const globalToInstance = require("p5js-translator")

const Debug = require("debug")
const debug = Debug("esbuild-plugin-p5js")
const cd = Debug("config")
const rebuildLog = Debug("rebuild")

const FileCache = require("./file_cache.js")
const extractFrontmatter = require("./frontmatter")
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

function j(obj) {
  return JSON.stringify(obj)
}

function wrappedSketch(file, { i = 0, varname = null, asDefault = false }) {
  debug("wrap", { file })

  if (varname === null) {
    const varsafe = safeName(path.basename(file.path, ".p5.js"))
    varname = `p5${zp(i)}_${varsafe}`
  }

  const bundle = `${varname}_bundle`
  const metadata = JSON.stringify(file.metadata)
  const jpath = JSON.stringify(file.path)
  const date = JSON.stringify(new Date())
  const exporter = asDefault ? `export default ${bundle}` : `export { ${bundle} as ${varname} }`
  return `
  const ${varname} = (sketch) => {
    ${file.contents} 
  };
  const ${bundle} = {
    translated: ${date},
    path: ${jpath},
    sketch: ${varname},
    metadata: ${metadata},
  };
  ${exporter};
  `
}

async function loadAndTranslateFile(fpath, translateOptions) {
  const stat = await fs.stat(fpath)
  const mtime = stat.mtime.getTime()

  debug("fetch:", fpath, mtime)
  return FileCache.fetch(fpath, mtime, async () => {
    debug("build:", path.basename(fpath))
    const original = await fs.readFile(fpath, "utf8")

    const [metadata, sketch] = extractFrontmatter(original)
    if (metadata && !metadata.mtime) {
      metadata["mtime"] = mtime
    }

    const [imports, code] = extractImports(sketch)

    const contents = globalToInstance(code, { instance: "sketch", config: translateOptions })

    return { path: fpath, metadata, imports, contents }
  })
}

async function formatJs(contents) {
  const proc = child_process.spawn("npx", ["biome", "format", "--stdin-file-path=generated.js"], {
    stdio: "pipe",
  })

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

// type config = {
//   instanceMethods: string[],
//   skipImport: boolean,
// }
const p5jsPlugin = (config = {}) => {
  return {
    name: "p5js",
    setup(build) {
      const options = build.initialOptions
      cd("p5jsPlugin setup", { options, config })
      const translateOptions = config

      build.onStart(() => {
        debug("onStart")
      })

      // activates on a blob search for .p5.js files, like:
      //
      //   import * as sketches from "sketchbook/*.p5.js"
      //
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

      // glob load for resolved p5.js sketches
      //
      // Reads all files, translates global sketches to instance-based, and
      // concatenates everything into a single ESM file.
      build.onLoad({ filter: /\*\.p5\.js$/, namespace: "p5js" }, async (args) => {
        const { dirname, sketches, resolveDir } = args.pluginData

        // split each sketch into `import ...` statements and code
        const sketchContents = await Promise.all(
          sketches.map((sketch) =>
            loadAndTranslateFile(path.join(dirname, sketch), translateOptions),
          ),
        )

        const files = sketchContents.map((translated, i) => {
          return { path: sketches[i], ...translated }
        })

        let contents = files.map((f) => f.imports)
        if (!translateOptions.skipImport) {
          contents.unshift(`import p5 from 'p5';`)
        }
        const bundled = files
          .map((file, i) => {
            return wrappedSketch(file, { i })
          })
          .join("\n")
        contents.push(bundled)
        contents = contents.join("\n")

        // const formatted = await formatJs(contents)
        if (debug.enabled) {
          const tmpdir = path.join(process.cwd(), "tmp")
          await fs.writeFile(path.join(tmpdir, "translated.js"), contents)
          // await fs.writeFile(path.join(tmpdir, "formatted.js"), formatted)
        }

        rebuildLog('rebuilt', contents.length, 'bytes') 

        return {
          contents: contents,
          pluginName: "p5js",
          resolveDir: dirname,
        }
      })

      // individual files
      build.onLoad({ filter: /[^*]\.p5\.js$/ }, async (args) => {
        const translated = await loadAndTranslateFile(args.path, translateOptions)

        debug({ path: args.path, translated })

        const module = wrappedSketch(translated, { varname: "mySketch", asDefault: true })
        const contents = [...translated.imports, module]
        if (!translateOptions.skipImport) {
          contents.unshift(`import p5 from 'p5';`)
        }

        return { contents: contents.join("\n") }
      })

      build.onDispose(() => {
        FileCache.reset()
      })
    },
  }
}

module.exports = { p5jsPlugin }
