//  Path Follower https://editor.p5js.org/abachman/sketches/ntB7c49mv
// follower
const SPEED = 1
const path = []
let seg = 0
let prog = -1

// mark making
let drawing = false

function setup() {
  createCanvas(400, 400);
  strokeWeight(1);
}

function draw() {
  // drawPath();
  if (drawing) {
    drawPath();
    recordPath();
  } else if (path.length > 0) {
    drawFollower();
  }
}

function recordPath() {
  let [px, py] = path.length > 0 ? path[path.length - 1] : [pmouseX, pmouseY]

  if (dist(px, py, mouseX, mouseY))
    path.push([mouseX, mouseY, dist(px, py, mouseX, mouseY)])
}


function drawFollower() {
  const s = path[seg]
  const e = path[seg + 1]

  if (typeof e === 'undefined') return

  const gap = dist(s[0], s[1], e[0], e[1])

  const perc = prog / gap
  const nx = lerp(s[0], e[0], perc)
  const ny = lerp(s[1], e[1], perc)

  prog += SPEED

  if (gap - prog < 0.1) {
    seg += 1
    prog = 0
  }

  noStroke()
  fill(0, 200, 100)
  ellipse(nx, ny, map(mouseY, 0, height, 3, 150))
}

function drawPath() {
  stroke(0)
  path.forEach((point, i) => {
    if (i + 1 < path.length) {
      // console.log({ from: point, to: path[i+1] })
      line(
        point[0],
        point[1],
        path[i + 1][0],
        path[i + 1][1],
      )
    }
  })
}

function mousePressed() {
  
  background(220)
  while (path.length > 0) path.pop()
  seg = 0
  drawing = true
}

function mouseReleased() {
  drawing = false
}
