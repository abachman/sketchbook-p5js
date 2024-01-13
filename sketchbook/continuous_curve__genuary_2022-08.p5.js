//  continuous curve, genuary 2022-08 https://editor.p5js.org/abachman/sketches/82kNk-PDD
let g,
  gw = 2000,
  gh = 2000;

let cx, cy, rot, hh, hw, v, t;

const CAPTURE = false;
const FRAMES = 900;
const capturer = new window.CCapture({
  framerate: 30,
  format: "webm",
  verbose: false,
});

function setup() {
  createCanvas(400, 400);

  hw = width / 2;
  hh = height / 2;

  g = createGraphics(gw, gh);
  g.background(0);
  g.colorMode(HSB);
  g.noStroke();
  g.fill(100, 100, 100);

  cx = gw / 2;
  cy = gh / 2;

  v = 6;
  t = 0;
}

let running = false;
let count = 0;
function draw() {

  if (CAPTURE && !running) {
    capturer.start();
    running = true;
  }

  background(51);

  g.fill((frameCount * 0.2) % 360, 100, 100);
  g.ellipse(cx, cy, v * 3);

  // move a step
  cx += v * cos(t);
  cy += v * sin(t);

  // wrap around edges
  if (cx < 0) cx = gw;
  if (cx > gw) cx = 0;
  if (cy < 0) cy = gh;
  if (cy > gh) cy = 0;

  // change direction of next step
  const n = noise(frameCount * 0.005);
  t += map(n, 0, 1, -0.2, 0.2);

  //   // stay inbounds?
  //   const mt = t % TWO_PI;
  //   const uppy = PI * 1.5;
  //   const dnny = PI / 2;
  //   // close to top/bottom
  //   if (cy < 100) {
  //     if (mt < uppy && mt > dnny) {
  //       t -= 0.1;
  //     } else {
  //       t += 0.1;
  //     }
  //   } else if (cy > gh - 100) {
  //     if (mt < uppy && mt > dnny) {
  //       t += 0.1;
  //     } else {
  //       t -= 0.1;
  //     }
  //   }
  //   if (cx < 100) {
  //     // close to left
  //     if (mt < PI && mt > 0) {
  //       t -= 0.1;
  //     } else {
  //       t += 0.1;
  //     }
  //   } else if (cx > gw - 100) {
  //     // close to right
  //     if (mt < PI && mt > 0) {
  //       t += 0.1;
  //     } else {
  //       t -= 0.1;
  //     }
  //   }

  push();
  translate(-(cx - hw), -(cy - hh));
  image(g, 0, 0);
  pop();

  if (CAPTURE) {
    capturer.capture(document.getElementById("defaultCanvas0"));
    count++;

    if (count > FRAMES) {
      console.log("DONE");
      capturer.stop();
      capturer.save();
      screenshot();
      noLoop();
    }
  }
}

function screenshot() {
  const i = createImage(gw, gh);
  i.copy(g, 0, 0, gw, gh, 0, 0, gw, gh);
  const name = `continuous-curve--${frameCount}`;
  i.save(name, "jpg");
  console.log("tried to save", name);
}

function keyPressed() {
  if (key == "Enter") {
    console.log("screenshot!");
    screenshot();
  } else {
    console.log("boop", key);
  }
}

