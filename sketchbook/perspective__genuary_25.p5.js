const cs = [];
const STEP = 20;
let h = 0;

// ------------------
// capture code
const CAPTURE = false;
const FRAMES = 600;
const capturer = new window.CCapture({
  framerate: 60,
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


function samp() {
  h = (h + 23) % 360;
  return h
  // return random(360);
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  noStroke();
  background(0);

  const step = 20;
  const count = height / step;
  //   fill(0, 0, 100)

  for (let y = 0; y < count + 2; y++) {
    cs.push({ x: (STEP - 4) / 2 + 1, y: height - y * STEP, r: STEP - 2, h: samp() });
  }
}

function draw() {
  if (frameCount > 8) {
    startCapture();  
  }
  // background(0);
  strokeWeight(8);
  const hh = height / 2;
  cs.forEach((p, idx) => {
    fill(p.h, 80, 80);

    const a = p;
    const b = { x: a.x + a.r * 1.5, y: a.y + (a.y - hh), r: a.r * 2 };
    const c = { x: b.x + b.r * 1.5, y: b.y + (b.y - hh), r: b.r * 2 };
    const d = { x: c.x + c.r * 1.5, y: c.y + (c.y - hh), r: c.r * 2 };
    const e = { x: d.x + d.r * 1.5, y: d.y + (d.y - hh), r: d.r * 2 };

    stroke(0, 0, 20, 0.5); // , 100, 100)
    strokeWeight(1);
    // line(a.x, a.y, e.x, e.y)

    // noStroke();
    [a, b, c, d, e].forEach(display);

    // ellipse(a.x, a.y, a.r)
    // ellipse(b.x, b.y, b.r);
    // ellipse(c.x, c.y, c.r);
    // ellipse(d.x, d.y, d.r);
    // ellipse(e.x, e.y, e.r);

    if (p.y >= height + STEP) {
      p.y = -STEP;
      p.h = samp();
    }

    // p.x += sin(frameCount * 0.2) * 2
    p.y += map(sin((frameCount) * 0.1), -1, 1, 0.4, 1.5)
  });
  
  stopCapture();
}

function display(s) {
  if (s.y + s.r > 0 && s.y - s.r < height) {
    ellipse(s.x, s.y, s.r);
  }
}
