const ROUNDS = 8

function setup() {
  createCanvas(600, 600)
  background(0)
  stroke(255)
  strokeWeight(2)
  fill(0)
}

function LayerFlower(n, a, r) {
  // x = r cos(t)
  // y = r sin(t)

  /*
    [
      r (a + Cos[n t])/(a + 1) {
          Cos[t + b Sin[2 n t]],
          Sin[t + b Sin[2 n t]]
      }, {t, 0, 2 Pi}
    ],
  */

  let period = 75
  let points = n * period
  let step = TWO_PI / points

  let lfo = 0
  let lfos = TWO_PI / period
  let x, y
  let lx = null,
    ly
  let fx, fy
  beginShape()
  for (let t = 0; t < TWO_PI; t += step) {
    let offset = sin(lfo) * 40
    let rad = r / 2 + offset
    x = rad * cos(t)
    y = rad * sin(t)

    if (lx === null) {
      fx = x
      fy = y
    } else {
      // line(lx, ly, x, y)
    }
    vertex(x, y)

    lx = x
    ly = y
    lfo += lfos
  }

  // line(lx, ly, fx, fy)
  vertex(fx, fy)
  endShape()
}

function LayerDisk(_n, _a, r) {
  circle(0, 0, r)
}

function LayerSpots(n, a, r) {
  let crad = random(a, a * 2)

  push()
  for (let i = 0; i < n; i++) {
    rotate(TWO_PI / n)
    circle(0, r / 2, crad)
  }
  pop()
}

/////

function draw() {
  let step = (width - 30) / ROUNDS - 30
  fill(0)
  // let r = step

  translate(width / 2, height / 2)

  for (let r = width - 30; r > step / 2; r -= step) {
    // LayerDisk(0, 0, r)
    // LayerSpots(int(random(7, 17)), random(8, 16), r)

    const f = random([LayerDisk, LayerSpots, LayerFlower])
    f(int(random(13, 27)), random(8, 16), r)
  }

  noLoop()
}
