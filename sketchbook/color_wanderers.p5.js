//  Color Wanderers https://editor.p5js.org/abachman/sketches/-nNWon9Gx
let QUANT = 15
let SPEED = 1.2

let PALETTE = []
let ps = []
let fps = 30;

function setup() {
  createCanvas(500, 500)
  background(0)
  stroke(255)
  strokeWeight(4)
  smooth(8)
  frameRate(fps)

  PALETTE = [
    color(245, 245, 237),
    // color(156, 160, 149),
    color(232, 142, 21),
    // color(189, 78, 56),
    // color(47, 46, 50),
    // color(250, 249, 249),
    color(221, 177, 77),
    color(144, 207, 235),
    color(228, 114, 50),
    color(56, 66, 118),
  ]

  let w4 = width * .4
  let h4 = height * .2

  for (let i = 0; i < QUANT; i++) {
    ps.push(new Wanderer())
  }
}


function draw() {
  for (let w of ps) {
    w.move()
    w.display()
  }

}

class Wanderer {
  constructor(x, y, scroll, a) {
    this.init()
  }

  init() {
    this.x = width / 2 // random(width)
    this.y = height / 2 // random(height)
    this.a = random(TWO_PI) // starting angle
    this.n = random(100) // starting noise coordinate
    this.c = PALETTE[floor(random(PALETTE.length))]
    this.ec = PALETTE[floor(random(PALETTE.length))]
    this.w = random(1) // starting line width
    this.l = 0 // life
    this.s = random(1000, 2000) // max life
    this.nm = random(15)
    this.dead = false
    this.scroll = random(2, 10)
  }

  move() {
    if (this.dead) return

    // change angle by a small amount between -0.5 and 0.5,
    let t = (0.5 - noise(this.n)) / this.scroll // smooth random
    // let t = random(-0.5, 0.5); // jagged random

    this.a += t //

    let ox = SPEED * cos(this.a)
    let oy = SPEED * sin(this.a)

    this.x += ox
    this.y += oy
    this.n += 0.01
    this.w = noise(10, this.n * 2) * this.nm

    this.l++
    if (this.l > this.s) {
      this.init()
      // or die
      // this.dead = true
    }
  }

  display() {
    if (this.dead) return
    stroke(lerpColor(this.c, this.ec, this.l / this.s))
    strokeWeight(this.w)
    point(this.x, this.y)
  }
}
