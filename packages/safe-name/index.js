// variable name sanitization
const reserved = `await break case catch class const continue debugger default delete do else enum export extends false finally for function if import in instanceof new null return super switch this throw true try typeof var void while with yield`.split(' ')

module.exports = function (name) {
  let sname = name.toString()
  if (reserved.includes(sname)) { sname = "_" + sname }
  if (sname.match(/^[^a-zA-Z_$]/)) { sname = "_" + sname }
  return sname.replace(/[^0-9a-zA-Z_$]/g, "_")
}
