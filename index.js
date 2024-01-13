import App from "p5js-sketchbook-app"

import "./src/ccapture.js"
import * as sketches from "./sketchbook/*.p5.js"

window.SKETCHES = sketches

// import p5 from npmjs.com/package/p5 (p5js.org)
// or from https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.js
// import p5 from "p5"
App({ sketches, p5: window.p5 })
