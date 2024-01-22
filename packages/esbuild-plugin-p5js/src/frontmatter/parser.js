const debug = require('debug')('fm-parser')

// read code from top down, passing each line to handleComment
// method when it is in a comment until a non-blank and non-comment
// line is reached
function parser(code, handleComment) {
  let inComment = false
  let inLineComment = false
  let inBlockComment = false
  let inLine = false
  let codeStart = false

  const lines = code.split('\n')
  const fields = []

  const slashslash = new RegExp("//")
  const slashstar = new RegExp("/\\*")
  const starslash = new RegExp("\\*/")
  const star = new RegExp("^\\*+")
  const nonw = /\S/

  for (const [i, line] of Object.entries(lines)) {
    if (debug.enabled) 
      debug(i.toString().padStart(4, ' ') + ':', line)

    // allow shebang line
    if (i === 0 && line.startsWith("#!")) continue

    // parse whole lines
    let lstr = []
    for (const word of line.split(/\s/)) {
      if (word === '') continue

      if (!inComment) {
        if (slashslash.test(word)) {
          debug('// starts line comment')
          inComment = true
          inLineComment = true
        } else if (slashstar.test(word)) {
          debug('/* starts block comment')
          inComment = true
          inBlockComment = true
        }

        if (inComment) { 
          inLine = true
          continue
        }

        if (nonw.test(word)) {
          // code char reached, parsing complete
          codeStart = true
          break
        }
      } else if (inBlockComment && starslash.test(word)) {
        // a block comment is ending, but there may be content
        // attached before the */
        if (word.length > 2) {
          const [part, ...rest] = word.split(starslash)
          lstr.push(part)
        }
        inComment = false
        inBlockComment = false
        continue
      } else if (!inLine) {
        // skip initial '*' characters
        if (star.test(word)) {
          continue
        } 
        inLine = true
      }

      lstr.push(word)
    }

    // at the end of each line, reset flags
    inComment = inBlockComment
    inLine = false
    inLineComment = false

    const phrase = lstr.join(' ')
    if (phrase.length > 0) fields.push(phrase)

    if (codeStart) {
      debug('code has started')
      break
    }
  }

  for (const line of fields) {
    handleComment(line)
  }
}

module.exports = parser
