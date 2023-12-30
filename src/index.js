// import "./sketches/800x80__genuary_13.js"
import "./sketches/800x80__genuary_13.p5.js"

import p5 from "p5"
new p5()

new EventSource("/esbuild").addEventListener("change", () => {
  console.log("RELOAD 2")
  location.reload()
})
