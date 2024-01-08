// import "./sketches/800x80__genuary_13.p5.js"
import App from "./selector/Selector.jsx"
import CCapture from "./ccapture.js"

import p5 from "p5"
import * as sketches from "../sketchbook/*.p5.js"

function domReady(fn) {
  // If we're early to the party
  document.addEventListener("DOMContentLoaded", fn)
  // If late; I mean on time.
  if (document.readyState === "interactive" || document.readyState === "complete") {
    fn()
  }
}

window.CCapture = CCapture

domReady(() => App({ sketches, p5 }))
