/*

create, carry, connect

(a window between worlds)

"What is your north star?"

- What do you value?
- What do you want to carry with you?

2025-09-12

*/

class Star {
  constructor() {
    this.color = color(random(256), random(200, 256), random(220, 256))
    this.points = []
  }

  get length() {
    return this.points.length
  }

  get origin() {
    return this.points[0]
  }

  wiggle() {
    this.points.forEach((p) => {
      p[0] += random(-2, 2)
      p[1] += random(-2, 2)
    })
  }
}

let shape = new Star()
const shapes = []

function setup() {
  createCanvas(500, 700)
  colorMode(HSB)
  background(30)
  noStroke()
}

function draw() {
  background(0)

  visualize(shape)

  shapes.forEach((s) => {
    visualize(s, true)
  })
}

function mousePressed() {
  shape.points.push([mouseX, mouseY])
}

function keyPressed() {
  if (key === ' ') {
    shapes.push(shape)
    shape = new Star()
  }
}

function visualize(shape, wiggle) {
  fill(shape.color, 255, 255)

  let x = 0,
    y = 0

  beginShape()
  shape.points.forEach((p) => {
    x += p[0]
    y += p[1]
    vertex(p[0], p[1])
  })
  if (shape.points.length > 0) {
    vertex(shape.origin[0], shape.origin[1])
  }
  endShape()

  if (wiggle) {
    shape.wiggle()
  }

  fill(0)
  try {
    text('NORTH', x / shape.length - 30, y / shape.length)
  } catch (ex) {
    console.error(ex, { x, y, l: shape.length })
  }
}
