// Purpose: translate global p5js sketches to instance-based p5js sketches

const process = require("node:process")
const acorn = require("acorn")
const walk = require("acorn-walk")
const debug = require("debug")("p5js-translator")
const keywords = require("./keywords.js")

// open file named in args and parse it
const lineAt = (code, pos) => {
  const lines = code
    .toString()
    .split("\n")
    .map((line, i) => {
      return {
        i,
        line,
        size: line.length + 1,
      }
    })

  let line = 0
  let col = 0
  let offset = 0
  let last = null

  for (const l of lines) {
    if (offset + l.size > pos) {
      col = pos - offset
      last = l.line
      break
    }

    offset += l.size
    line += 1
  }

  return { i: line, col, line: last }
}

const isDefined = (state, name) => {
  for (let i = state.depth; i >= 0; i--) {
    if (state.defs[i][name]) {
      return true
    }
  }
  return false
}

function defn(state, name, overrides = {}) {
  const depth = overrides.depth || state.depth
  if (!state.defs[depth]) {
    state.defs[depth] = {}
  }
  state.defs[depth][name] = true
}

function translate(code, instance = "p5") {
  /*
   * type Rewrite = { start, end, replacement }
   */
  const rewrites = []
  const parsed = acorn.parse(code, { ecmaVersion: "2020" })
  const defs = {}
  const initial = { depth: 0, prefix: "", defs: { 0: {} } }

  const FunctionNodeHandler = (node, state, next) => {
    debug(node.type)

    if (node.id && keywords.includes(node.id.name)) {
      if (debug.enabled) {
        const line = lineAt(code, node.start)
        debug(line.line)
        debug(`${line.col > 0 ? " ".repeat(line.col) : ""}^`)
      }

      rewrites.push({
        start: node.start,
        end: node.id.end,
        replacement: `${instance}.${node.id.name} = function`,
      })
    }

    for (const param of node.params) {
      if (param.type === "Identifier") {
        defn(state, param.name, { depth: state.depth + 1 })
      } else if (param.type === "AssignmentPattern") {
        defn(state, param.left.name, { depth: state.depth + 1 })
        next(param.right, state)
      } else if (param.type === "ObjectPattern") {
        for (const prop of param.properties) {
          // can't treat these like Identifier properties handled above
          // because they are defining a locally scoped variable with the
          // given name, instead of defining a property in an object.
          if (prop.kind === "init") {
            defn(state, prop.value.name, { depth: state.depth + 1 })
          } else if (prop.type === "RestElement") {
            defn(state, prop.argument.name, { depth: state.depth + 1 })
          } else {
            debug("ObjectPattern ignores", prop.type, prop)
          }
        }
      }
    }

    next(node.body, state)
  }

  walk.recursive(parsed, initial, {
    BlockStatement(node, state, next) {
      state.depth += 1
      defn(state, "")
      state.prefix = " ".repeat(state.depth)

      for (const child of node.body) {
        next(child, state)
      }

      // unset all definitions after leaving block
      delete state.defs[state.depth]
      state.depth -= 1
    },

    VariableDeclaration(node, state, next) {
      for (const decl of node.declarations) {
        // redefinition of a p5js keyword
        if (keywords.includes(decl.id.name)) {
          if (debug.enabled) {
            debug(state.prefix, "var", decl.id.name, "keyword override")
          }
          defn(state, decl.id.name)
        }

        next(decl, state)
      }
    },

    Identifier(node, state, next) {
      if (keywords.includes(node.name) && !isDefined(state, node.name)) {
        if (debug.enabled) {
          const line = lineAt(code, node.start)
          debug(line.line)
          debug("".padStart(line.col) + "^")
        }

        // check if Identifier is a Property of an ObjectExpression
        const parent = walk.findNodeAround(parsed, node.start, "Property")
        if (parent && parent.node.shorthand) {
          debug("identifier", node.name, "is a shorthand property")
          rewrites.push({
            start: node.start,
            end: node.end,
            replacement: `${node.name}: ${instance}.${node.name}`,
          })
        } else {
          debug("identifier", node.name, "is a global")
          debug(state.defs)
          rewrites.push({
            start: node.start,
            end: node.end,
            replacement: `${instance}.${node.name}`,
          })
        }
      } else if (debug.enabled && isDefined(state, node.name)) {
        debug(state.prefix, "ignore overridden", node.name)
        const line = lineAt(code, node.start)
        debug(line.line)
        debug(" ".repeat(line.col - 1), "^")
      }
    },

    FunctionDeclaration: FunctionNodeHandler,
    ArrowFunctionExpression: FunctionNodeHandler,

    FunctionExpression(node, state, next) {
      debug("FunctionExpression")
      for (const param of node.params) {
        if (param.type === "Identifier") {
          debug("param", param.name, "at depth", state.depth)
          if (!state.defs[state.depth + 1]) {
            state.defs[state.depth + 1] = {}
          }
          state.defs[state.depth + 1][param.name] = true
        }
      }

      state.depth += 1
      next(node.body, state)
      state.depth -= 1
    },
  })

  let recode = code.toString()

  // apply rewrites in reverse order to avoid offsetting
  rewrites
    .sort((a, b) => b.start - a.start)
    .forEach(({ start, end, replacement }) => {
      recode = recode.slice(0, start) + replacement + recode.slice(end)
    })

  if (debug.enabled) {
    debug(`const __sketch = (${instance}) => {`)
    debug(
      recode
        .toString()
        .split("\n")
        .map((line, i) => {
          return `  ${line}`
        })
        .join("\n"),
    )
    debug("}")
  }

  return recode
}

module.exports = translate
