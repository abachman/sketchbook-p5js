const https = require("node:https")
const path = require("node:path")
const fs = require("node:fs/promises")
const process = require("node:process")
const sanitize = require("sanitize-filename")
const debug = require("debug")("p5js-sketchbook:download")

const cwd = process.cwd()
const sketchbookDir = path.join(cwd, "sketchbook")

const out = {
  c(m, _color) {
    return m
  },
  b(m, _color) {
    return m
  },
}

const log = console.log.bind(console)

async function loadChalk() {
  // ESM only library, so we need to import it dynamically
  const { Chalk } = await import("chalk")
  const chalk = new Chalk({ level: 2 })
  out.c = (m, color) => chalk[color](m)
  out.b = (m, color) => chalk[color].bold(m)
}

async function getJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(
      url,
      {
        headers: {
          accept: "application/json,text/plain",
        },
      },
      (res) => {
        let body = ""

        res.on("data", (chunk) => {
          body += chunk
        })

        res.on("end", () => {
          resolve(JSON.parse(body))
        })
      },
    )
  })
}

// pull JSON from given username's project URL
async function getSketches({ username }) {
  const url = `https://editor.p5js.org/editor/${username}/projects`
  return await getJSON(url)
}

function sketchUrl({ username, id }) {
  return `https://editor.p5js.org/${username}/sketches/${id}`
}

function transformFilename(filename) {
  return (
    sanitize(filename)
      .replace(/[ ,.!?()'"]/g, "_")
      .toLowerCase() + ".p5.js"
  )
}

class FakeWriter {
  constructor(name) {
    this.filename = transformFilename(name)
    this.fullpath = path.join(sketchbookDir, this.filename)
    this.ts = new Date().toISOString()
    this.handle = null
  }

  async check() {
    let exists = true
    try {
      await fs.access(this.fullpath, fs.constants.R_OK | fs.constants.W_OK)
    } catch (err) {
      exists = false
      debug(`${this.fullpath} does not exist`)
    }

    if (exists) {
      log(out.b(this.filename, "red"), out.c("already exists", "red"))
    }

    return exists
  }

  async open() {
    return Promise.resolve()
  }
  async close() {
    return Promise.resolve()
  }
  async write(...args) {
    log(out.b(this.filename, "blue"), out.c(this.ts, "yellow"), ...args)
    return Promise.resolve()
  }
}

class FileWriter extends FakeWriter {
  async open() {
    log("writing to", out.b(this.filename, "green"))
    await fs.mkdir(path.dirname(this.fullpath), { recursive: true })
    this.handle = await fs.open(this.fullpath, "w")
  }

  async write(...args) {
    await this.handle.write(args.join(" ") + "\n")
  }

  async close() {
    await this.handle.close()
  }
}

async function writeSketchFile({ sketchJson, username }, writer) {
  const mainFile = sketchJson.files.find((f) => f.name == "sketch.js")
  await writer.write("// ", sketchJson.name, sketchUrl({ username, id: sketchJson.id }))
  await writer.write(mainFile.content)

  const otherJsFiles = sketchJson.files.filter(
    (f) => /.+\.js/.test(f.name) && f.name != "sketch.js",
  )
  if (otherJsFiles.length > 0) {
    debug("--------------------")
    debug(out.c(writer.filename, "green"), out.c("has other js files", "green"))
    debug("--------------------")

    for (const file of otherJsFiles) {
      await writer.write("/* ------------------======================------------------")
      await writer.write(" *", file.name)
      await writer.write(" * ------------------======================------------------ */")
      await writer.write(file.content)
    }
  }
}

async function writeSketches({ sketches, Writer, username }) {
  for (const sketchJson of sketches) {
    const writer = new Writer(sketchJson.name)
    if (!(await writer.check())) {
      await writer.open()
      await writeSketchFile({ sketchJson, username }, writer)
      await writer.close()
    }
  }
}

// fake download function
async function mockDownload({ username }) {
  await loadChalk()
  const sketches = JSON.parse(await fs.readFile("tmp/request.json", "utf8"))
  await writeSketches({ sketches, Writer: FakeWriter, username })
}

async function Download({ username }) {
  await loadChalk()
  const sketches = await getSketches({ username })
  await writeSketches({ sketches, Writer: FileWriter, username })
}

module.exports = { download: Download, writeSketches, writeSketchFile }

