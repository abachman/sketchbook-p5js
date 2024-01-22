// extract YAML-like frontmatter from comments at the top of code
// files
const debug = require("debug")("fm")
const parser = require("./parser.js")

const metadef = new RegExp("\s*([^ :]+):(.+)")

// simple YAML-like file headers
function frontmatter(code) {
  const front = {}

  // look inside comment bodies for lines matching
  const addFrontmatter = (line) => {
    let key, value
    const match = line.match(metadef)
    if (!match) {
      debug("no match for line", { line })
      return
    }
    debug({ line, pair: [match[1], match[2]] })
    front[match[1].trim()] = match[2].trim()
  }

  parser(code, addFrontmatter)

  return [front, code]
}

module.exports = frontmatter
