let particles = [];
let doDraw = false,
  drawing = true;
let bg;

let mover;
let follower;

const RATE = 20;
const COLOR = [0, 80, 80];
const NCOLOR = [30, 90, 70];
const SPREAD = [0.6, 2];

// https://en.wikipedia.org/wiki/Lissajous_curve
const A = 3;
const B = 2;

function lissa(t) {
  return [
    width / 2 + 160 * sin(A * t + HALF_PI),
    height / 2 + 160 * sin(B * t),
  ];
}

// ------------------
// capture code
const CAPTURE = false;
const FRAMES = 300;
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

function setup() {
  createCanvas(400, 400);
  noStroke();
  

  bg = createGraphics(width, height);
  
  colorMode(HSB);
  
  bg.background(30);
  
  bg.colorMode(HSB);

  bg.fill(COLOR);
  bg.stroke(COLOR);

  const r = random(4, 8);
  const t = random(TWO_PI);
  mover = {
    x: random(width),
    y: random(height),
  };
}

function draw() {
  startCapture();

  image(bg, 0, 0);

  fill(COLOR);
  stroke(COLOR);
  bg.fill(COLOR);
  bg.stroke(COLOR);
  particles.forEach(move);
  particles.forEach(display);

  const t = frameCount * 0.025;

  const [x, y] = lissa(t);
  mover.x = x
  mover.y = y

  if (drawing) {
    for (let n = 0; n < RATE; n++) spawn(mover.x, mover.y);
  }

  if (frameCount % 30 == 0 && particles.length > 0) {
    particles = particles.filter((p) => p[0]);
  }

  for (let i = 0; i < 3; i++) {
    if (abs(NCOLOR[i] - COLOR[i]) < 1) {
      if (i == 0) {
        NCOLOR[i] = random(0, 80)
      } else {
        NCOLOR[i] = random(80, 100)
      }
    } else if (NCOLOR[i] > COLOR[i]) {
      COLOR[i] += 0.5;
    } else {
      COLOR[i] -= 0.5;
    }
  }

  stopCapture();
}

function move(particle, idx) {
  if (!particle[0]) return;

  particle[1] += particle[3].x;
  particle[2] += particle[3].y;

  particle[3].mult(0.9);

  if (particle[3].mag() < 0.5) {
    particle[0] = false;
  }
}

function display(particle) {
  const x = particle[1],
    y = particle[2];
  if (particle[0]) {
    point(x, y);
  } else {
    if (!particle[4]) {
      bg.point(x, y);
      // bg.rect(x, y, 2)
      particle[4] = true;
    }
  }
}

function spawn(x, y) {
  let v = p5.Vector.random2D();
  v.mult(random(...SPREAD));
  if (random() > 0.9) v.mult(random(2, 4))
  particles.push([true, x, y, v, false]);
}

function keyPressed() {
  if (key == 'Enter') {
    screenshot()
  }
}

function screenshot() {
  const name = `sand-tracing--${frameCount}`;
  console.log("saving", name);
  saveCanvas(name, "png");
}

//// --------------------

function touchStarted() {
  doDraw = true;
}

function mousePressed() {
  doDraw = true;
  drawing = true;
}

function mouseMoved() {
  if (doDraw) drawing = true;
}

function touchMoved() {
  if (doDraw) drawing = true;
}

// function touchReleased() {
//   doDraw = false;
//   drawing = false;
// }

// function mouseReleased() {
//   doDraw = false;
//   drawing = false;
// }
