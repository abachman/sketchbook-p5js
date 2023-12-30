const fs = require("node:fs")

const P5_FUNCTIONS = [
  "draw",
  "preload",
  "setup",
  "windowResized",
  "mousePressed",
  "mouseReleased",
  "mouseClicked",
  "mouseMoved",
  "mouseDragged",
  "mouseWheel",
  "keyPressed",
  "keyReleased",
  "keyTyped",
  "deviceMoved",
  "deviceTurned",
  "deviceShaken",
].map((fn) => {
  return { fn, matcher: new RegExp(`function *${fn}\\(\\) *\\{`, "g") }
})

function translateWindowFunctions(code) {
  for (const fn of P5_FUNCTIONS) {
    if (code.match(fn.matcher)) {
      console.log(`Replacing ${fn.fn}`)
      code = code.replace(fn.matcher, `window.${fn.fn} = () => {`)
    }
  }
  return code
}

const p5jsPlugin = {
  name: "p5js",
  setup(build) {
    console.log("p5jsPlugin setup")
    build.onLoad({ filter: /\.p5\.js$/ }, async (args) => {
      console.log("p5jsPlugin", args.path)
      const input = await fs.promises.readFile(args.path, "utf8")
      const contents = translateWindowFunctions(input)

      return { contents }
    })
  },
}

module.exports = { p5jsPlugin }
