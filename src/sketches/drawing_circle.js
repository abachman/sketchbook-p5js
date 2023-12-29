let segs = []
let cols = []

function sum(nums) {
  return nums.reduce((acc, val) => acc + val, 0)
}

function setup() {
  createCanvas(400, 400);
  strokeCap(SQUARE)
  colorMode(HSB)

  while (sum(segs) < TWO_PI) {
    const s = sum(segs)
    if (s > PI + HALF_PI) {
      segs.push(TWO_PI - s)
    } else {
      segs.push(random(HALF_PI * 0.5, HALF_PI))
    }
    cols.push([random(256), 200, 200])
  }
}

function draw() {
  // background(220);
  strokeWeight(20)
  drawRing(mouseX, mouseY)
}

function drawRing(x, y) {
  noFill();

  translate(x, y)

  const r = 100
  const nudgeR = 0
  const nudgeT = 1
  let t = 0

  for (let i = 0; i < segs.length; i++) {
    // curve (cx1, cy1, x1, y1, x2, y2, cx2, cy2)
    let nt = t + segs[i]

    const args = [
      (r + nudgeR) * cos(t - nudgeT),
      (r + nudgeR) * sin(t - nudgeT),
      r * cos(t),
      r * sin(t),
      r * cos(nt),
      r * sin(nt),
      (r + nudgeR) * cos(nt + nudgeT),
      (r + nudgeR) * sin(nt + nudgeT),
    ]

    stroke(cols[i])
    curve(...args)

    // line(x1, y1, x2, y2)

    t = t + segs[i]
  }
}

function mousePressed() {
  while (cols.length > 0) cols.pop()

  segs.forEach(() =>
    cols.push([random(256), 200, 200]))
}