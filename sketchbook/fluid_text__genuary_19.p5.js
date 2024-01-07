let font, points, hh, hw, letters;
let rec;

const GFACT = 9;

function separate(points) {
  const ls = [];
  let i = 0;
  let letter = [];
  let avg = 0,
    sum = 0,
    counted = 0;

  while (i < points.length) {
    const curr = points[i];
    letter.push(curr);

    if (i < points.length - 1) {
      const next = points[i + 1];
      const gap = dist(curr.x, curr.y, next.x, next.y);

      if (counted > 10 && gap > avg * GFACT) {
        // pinch off a letter, don't update sum avg & counted
        ls.push(letter);
        letter = [];
      } else {
        // update sum avg & counted
        sum += gap;
        counted++;
        avg = sum / counted;
      }
    }
    i++;
  }

  ls.push(letter);
  return ls;
}

function preload() {
  font = loadFont("assets/Bitter-Regular.otf");
}

// ------------------
// capture code
const CAPTURE = false;
const FRAMES = 420;
const capturer = new window.CCapture({
  framerate: 30,
  format: "webm",
  verbose: false,
});
let running = false;
let count = 0;
function startCapture() {
  if (CAPTURE && !running) {
    capturer.start();
    running = true;
  }
}
function stopCapture() {
  if (CAPTURE) {
    capturer.capture(document.getElementById("defaultCanvas0"));
    count++;

    if (count > FRAMES) {
      console.log("DONE");
      capturer.stop();
      capturer.save();
      noLoop();
    }
  }
}
// -----------------


let mx = -10;

function setup() {
  createCanvas(400, 400);
  textFont(font);
  textSize(38);

  // per aspera ad astra
  points = font.textToPoints("per aspera ad astra", 0, 0, 42, {
    sampleFactor: 0.5,
    simplifyThreshold: 0,
  });
  letters = separate(points);

  fill(0);
  stroke(0);
  strokeWeight(1);

  hh = height / 2;
  hw = width / 2;
}

let f = 0;
function draw() {
  startCapture();

  let cx = 10,
    cy = height / 2;
  translate(cx, cy);

  fill(128 + sin(frameCount * 0.04) * 128, 50);
  noStroke();

  // letterShape(cx, cy);
  mx += 2;
  if (mx > width + 10) mx = -10;
  letters.forEach((letter) => letterShape(letter, cx, cy, mx, hh - 10));

  stopCapture();
}

function drawPoints(cx, cy) {
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    point(p.x, p.y);
  }
}

function easeIn(x) {
  // in out sine
  // return -(cos(PI * x) - 1) / 2;
  // in quad
  return x * x;
  // in expo
  // return x === 0 ? 0 : pow(2, 10 * x - 10);
}

function letterShape(ps, cx, cy, mx, my) {
  const ew = width - cx + 2;
  const eh = height - cy + 2;
  beginShape();
  for (let i = 0; i < ps.length; i++) {
    const p = ps[i];
    const t = atan2(my - (p.y + cy), mx - (p.x + cx));
    const d = 1 / norm(dist(p.x, p.y, mx - cx, my - cy), 0, 50);
    const ox = p.x + 20 * easeIn(d) * cos(t);
    const oy = p.y + 20 * easeIn(d) * sin(t);
    vertex(constrain(ox, -ew, ew), constrain(oy, -eh, eh));
  }
  endShape();
}
