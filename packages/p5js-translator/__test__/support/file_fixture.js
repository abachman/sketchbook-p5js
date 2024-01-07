const path = require("node:path");
const fs = require("node:fs/promises");
const callsite = require("./callsite.js");

// resolve path relative to calling context
// returns { before: string, after: string }
async function load(prefix) {
  const before = await fs.readFile(prefix + '.before.js', { encoding: 'utf8' })
  const after = await fs.readFile(prefix + '.after.js', { encoding: 'utf8' })

  return { before, after }
}

function fileFixture(fp) {
  const stack = callsite()
  const requester = stack[1].getFileName();
  const prefix = path.resolve(path.dirname(requester), fp)

  return { 
    type: 'file',
    load: () => load(prefix)
  }
}

module.exports = fileFixture 
