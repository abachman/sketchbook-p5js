import "./src/stubs"
import * as sketches from "./sketchbook/*.p5.js"

import { createHashRouter } from "react-router-dom"
import App from "p5js-sketchbook-app"

App({ sketches, p5: window.p5 })

