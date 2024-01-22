// name: sudoku grid

const CELL = 32

function setup() {
  createCanvas(400, 400)
  background(0)
  stroke(255)
}

function draw() {
  // 3 x 3 grid (board) of 3 x 3 grids (region)

  const ox = (width - CELL * 9) / 2
  const oy = (height - CELL * 9) / 2

  noFill()

  for (let rr=0; rr < 3; rr++) {
    for (let rc=0; rc < 3; rc++) {
      // region
      const rx = ox + rc * CELL * 3
      const ry = oy + rr * CELL * 3

      strokeWeight(3)
      rect(rx, ry, CELL * 3, CELL * 3)

      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const cx = rx + r * CELL
          const cy = ry + c * CELL
          strokeWeight(1)
          stroke(255, 200, 200)
          rect(cx, cy, CELL, CELL)
        }
      }
    }
  }
}

class Grid {
  constructor() {
    this.cells = {}
  }

  get(x, y) {
  }
}

class Cell {
}

