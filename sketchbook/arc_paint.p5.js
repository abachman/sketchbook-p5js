//  Arc Paint https://editor.p5js.org/abachman/sketches/bryF1F8Kl
const PALETTE = [
  '#ef4f4f',
  '#a685e2',
  '#ffcda3',
  // '#e7e7de',
  '#74c7b8',
  // '#6f9eaf',
  // '#c7753d',
  // '#16c79a',
  '#001531',
]

// ring
let segs = []
let cols = []
const PULSE = 0.008
const MIN_R = 6
const MAX_R = 100

function sum(nums, idx) {
  if (!isNaN(Number(idx))) {
    return nums.reduce((acc, val) => acc + val[idx], 0)
  }
  return nums.reduce((acc, val) => acc + val, 0)
}

function avg(nums) {
  return sum(nums) / nums.length
}

function generate() {
  let g = () => floor(random(PALETTE.length))
  let nxt = (l) => {
    let n = g();
    while (n === l) n = g();
    return n
  }
  let l = -1

  segs = []
  cols = []

  while (sum(segs) < TWO_PI) {
    const s = sum(segs)
    if (s > PI + HALF_PI) {
      segs.push(TWO_PI - s)
    } else {
      segs.push(random(0.2, HALF_PI * 0.8))
    }
    l = nxt(l)
    cols.push(PALETTE[l])
  }
}

// path
const SPEED = 2
const path = []
let seg = 0
let prog = -1
let drawing = false // mark making

function recordPath() {
  let [px, py] = path.length > 0 ? path[path.length - 1] : [pmouseX, pmouseY]

  if (dist(px, py, mouseX, mouseY))
    path.push([mouseX, mouseY, dist(px, py, mouseX, mouseY)])
}

function drawPath() {
  stroke(0)
  path.forEach((point, i) => {
    if (i + 1 < path.length) {
      line(
        point[0],
        point[1],
        path[i + 1][0],
        path[i + 1][1],
      )
    }
  })
}

let dr = 0

function drawFollower() {
  const s = path[seg]
  const e = path[seg + 1]

  if (typeof e === 'undefined') return

  // SIZE OF SHAPE
  const r = MIN_R + constrain(abs((sin(dr) * MAX_R)), MIN_R, MAX_R)  
  // map(mouseY, 0, height, MIN_R, MAX_R)
  
  const gap = dist(s[0], s[1], e[0], e[1])

  const perc = prog / gap
  const nx = lerp(s[0], e[0], perc)
  const ny = lerp(s[1], e[1], perc)

  // SIZE OF SHAPE
  prog += SPEED + map(r, MIN_R, MAX_R, 1, 0)

  if (gap - prog < 0.1) {
    seg += 1
    prog = 0
  }

  dr += PULSE
  strokeWeight(r)
  // let t = 0 // noise(nx * 0.02, ny * 0.02) * 0.1
  
  drawRing(nx, ny, r)
  // segs.forEach((seg, idx) => {
  //   ring(nx, ny, r, t, t + seg, idx)
  //   t += seg
  // })
  
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeCap(SQUARE)
  noFill()
  generate()
  background(0, 20, 50);
}

function draw() {
  if (drawing) {
    strokeWeight(1);
    drawPath();
    recordPath();
  } else if (path.length > 0) {
    drawFollower();
  }
}

function drawRing(x, y, r) {
  noFill();

  translate(x, y)

  // const r = 100
  const nudgeR = -20
  const nudgeT = 0.1
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

function ring(x, y, w, st, et, i) {
  stroke(cols[i])
  arc(x, y, w, w, st, et)
}

function keyPressed() {
  background(0, 20, 50)
  generate()
}


function mousePressed() {
  generate()
  while (path.length > 0) path.pop()
  seg = 0
  drawing = true
}

function mouseReleased() {
  drawing = false
}
