const path = require("node:path")
const process = require("node:process")
const fs = require("node:fs/promises")
const Debug = require("debug")
const debug = Debug("esbuild-sketchbook-templates")
const cd = Debug('config')

const cwd = process.cwd()
const templates = path.resolve(__dirname, "../../../templates")

// esbuild plugin to copy library template files into the build
// directory
const sketchbookTemplates = (config = {}) => {
  return {
    name: "sketchbook-templates",
    setup(build) {
      // build.options
      const options = build.initialOptions
      cd("sketchbookTemplates plugin setup", { options, config })

      let scriptTags = ""
      if (config.scriptTags) {
        for (const tag of config.scriptTags) {
          scriptTags += `<script src="${tag}"></script>\n`
        }
      }

      build.onStart(async () => {
        debug("onStart")
        debug("copying builder templates into output directory")

        const outputDir = options.outdir || path.dirname(options.outfile)

        const favicon = path.join(templates, "favicon.ico")
        await fs.copyFile(favicon, path.join(outputDir, "favicon.ico"))

        // replace {{ scriptTags }} with the script tags from the config
        const index = path.join(templates, "index.html")
        const contents = (await fs.readFile(index, "utf8")).replace("{{ scriptTags }}", scriptTags)
        await fs.writeFile(path.join(outputDir, "index.html"), contents)
      })
    },
  }
}

module.exports = sketchbookTemplates
