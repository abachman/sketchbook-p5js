let ox, oy, px, py, drawing = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawCircles(circleFill(0, 0, width, height, 20, 50));
}

function draw() {
  if (drawing) {
    background(220);
    strokeWeight(3);
    stroke(100, 0, 0);
    fill(200, 170, 170);
    rect(ox, oy, px - ox, py - oy);
    const area = abs((px - ox) * (py - oy))

    let x = ox < px ? ox : px;
    let y = oy < py ? oy : py;


    if (ox > px) {}

    drawCircles(
      circleFill(x + 2, y + 2, abs(px - ox - 4), abs(py - oy - 4),
        map(area, 0, width * height, 2, 200),
        map(area, 0, width * height, 8, 800),
      )
    );
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  const circs = circleFill(0, 0, width, height);
  drawCircles(circs);
}

function drawCircles(circs) {
  noStroke();
  fill(100, 100, 230);
  for (let circ of circs) {
    ellipse(circ[0], circ[1], circ[2]);
  }
}

function mousePressed() {
  ox = mouseX;
  oy = mouseY;
  px = mouseX;
  py = mouseY;
  drawing = true;
}

function mouseReleased() {
  ox = null;
  oy = null;
  drawing = false;
}

function mouseDragged() {
  px = mouseX;
  py = mouseY;
}

// fill the given rectangle with circles between 20 and 30px in diameter
function circleFill(x, y, w, h, dmin = 120, dmax = 300) {
  let cols = 0,
    rows = 0,
    circles = [];

  // first, for width
  let d = dmin
  let remw = w % d
  let remws = []
  for (let i = 0; i < dmax - dmin; i += 2) {
    d = dmin + i
    remws.push([w % d + h % d, w % d, h % d, d]);
  }

  const sorted = remws.sort((a, b) => {
    if (a[0] < b[0]) {
      return -1
    } else if (a[0] > b[0]) {
      return 1
    } else {
      return (a[3] > b[3]);
    }
  })

  let cd = sorted[0][3];
  let pw = Math.floor(sorted[0][1] / 2);
  let ph = Math.floor(sorted[0][2] / 2);

  // fill(70, 100, 200);
  // noStroke();
  const hd = cd / 2;
  let xsteps = w / cd;
  let ysteps = h / cd;
  if (w % cd !== 0) {
    xsteps -= 1;
  }
  if (h % cd !== 0) {
    ysteps -= 1;
  }
  for (let col = 0; col < xsteps; col++) {
    for (let row = 0; row < ysteps; row++) {
      circles.push([pw + hd + x + (col * cd), ph + hd + y + (row * cd), cd]);
      // ellipse(pw + hd + x + (col * cd), ph + hd + y + (row * cd), cd);
    }
  }

  return circles;
}