import { createHashRouter } from "react-router-dom"
import App from "p5js-sketchbook-app"

import "./src/ccapture.js"
// import * as sketches from "./sketchbook/*.p5.js"
// window.SKETCHES = sketches
// import SudokuGrid from "./sketchbook/sudoku-grid/sketch.jsx"
// const router = createHashRouter([
//   {
//     path: "/",
//     element: SudokuGrid(),
//   },
// ])
// App({ sketches, p5: window.p5, router })

import sudoku from "./sketchbook/sudoku-grid/sketch-svg.js"
sudoku()

