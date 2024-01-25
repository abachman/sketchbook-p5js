import { SVG } from "@svgdotjs/svg.js"
import { Cell } from "./svg/cell.js"
import { Region } from "./svg/region.js"

function domReady(fn) {
  document.addEventListener("DOMContentLoaded", fn)
  if (document.readyState === "interactive" || document.readyState === "complete") {
    fn()
  }
}

// calculate geometry
const width = 680
const height = 500
const cell = 32

// top left corner of grid
const ox = (width - cell * 9) / 2
const oy = (height - cell * 9) / 2

const cells = []
const regions = []
for (let band = 0; band < 3; band++) {
  // bands
  for (let stack = 0; stack < 3; stack++) {
    // stacks
    const rx = ox + stack * cell * 3
    const ry = oy + band * cell * 3

    regions.push(new Region({
      coords: [rx, ry, cell * 3, cell * 3]
    }))

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const cx = rx + r * cell
        const cy = ry + c * cell
        cells.push(new Cell({ 
          coords: [cx, cy, cell, cell],
          band, stack, 
          x: c, y: r
        }))
      }
    }
  }
}

export default function () {
  domReady(function () {
    // Create SVG and set viewbox
    // so that we zoom into the center
    const canvas = SVG().addTo("body").size(width, height)

    // const regions = canvas.group()
    // const cells = canvas.group()

    // grid
    for (const [i, { coords }] of Object.entries(cells)) {
      const [cx, cy, cw, ch] = coords
      const cell = canvas.rect(cw, ch).attr({
        x: cx,
        y: cy,
        fill: "#fff",
        stroke: "#000",
        "stroke-width": 1,
      })

      cells[i].draw = canvas
      cells[i].el = cell
    }

    // regions
    for (const [i, { coords }] of Object.entries(regions)) {
      const [rx, ry, rw, rh] = coords
      const region = canvas
        .rect(rw, rh)
        .attr({
          x: rx,
          y: ry,
          fill: "transparent",
          stroke: "#000",
          "stroke-width": 3,
        })
        .css({ "pointer-events": "none" })

      // regions[i].el = region
    }
  })
}
