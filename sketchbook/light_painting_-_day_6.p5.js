//  light painting - day 6 https://editor.p5js.org/abachman/sketches/jKtcd_X2u
// 2022, genuary day 6, ""
//
// good artists trade, other artists steal
//
// this one's for my buddy Joshua Penrose, inspired by
// his light paintings pieces: https://joshuapenrose.com/untitled-light-paintings-triptych

const MIN_GRAY = 100;
const NOISE_SCALE = 0.02;
const STEP = 10;
const CAPTURE = false;
const SEED = 38;
const FRAMES = 300;
const COLOR = false;
const DO_BLUR = true;

class Panel {
  constructor(x, y, w, h, graphic) {
    Object.assign(this, { x, y, w, h, graphic });
    this.image = createGraphics(this.w, this.h);
  }

  update() {
    // copy pixels of graphic sliced by this panel's dimensions
    this.image.copy(
      this.graphic,
      this.x,
      this.y,
      this.w,
      this.h,
      0,
      0,
      this.w,
      this.h
    );
    if (DO_BLUR) {
      this.image.filter(BLUR, 4);
    }
  }

  draw() {
    // draws a slice of the image
    image(this.image, this.x, this.y);

    stroke(60);
    strokeWeight(6);

    noFill();
    rect(this.x, this.y, this.w, this.h);
  }
}

const panels = [];

const capturer = new window.CCapture({
  framerate: 30,
  format: "webm",
  verbose: false,
});

function setup() {
  createCanvas(400, 400);
  background("#efefef");
  noStroke();
  noiseSeed(SEED);

  g = createGraphics(400, 400);
  if (COLOR) {
    g.colorMode(HSB);
    colorMode(HSB);
    g.background(60);
  }
  g.noStroke();

  const pad = 20,
    w = (width - pad * 3) / 2,
    h = height - pad * 2;

  panels.push(new Panel(pad, pad, w, h, g));
  panels.push(new Panel(w + 2 * pad, pad, w, h, g));
}

function getColor(x, y) {
  let c = noise(x * NOISE_SCALE, y * NOISE_SCALE, (frameCount * NOISE_SCALE)) * 256;
  if (COLOR) {
    c = color(c, 100, 100);
  } else {
    c = constrain(floor(c / 4) * 8, MIN_GRAY, 255);
    c = color(c);
  }

  return c;
}

let running = false;
let count = 0;

function draw() {
  if (CAPTURE && !running) {
    capturer.start();
    running = true;
  }

  // draw LEDs
  if (!COLOR) {
    g.background(MIN_GRAY);
  }

  let cols = width / STEP,
    rows = height / STEP,
    hs = STEP / 2;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let c = getColor(x, y);
      g.fill(c);
      g.ellipse(x * STEP + hs, y * STEP + hs, STEP - 2);
    }
  }

  panels.forEach((panel) => {
    panel.update();
    panel.draw();
  });

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

function keyPressed() {
  if (key == ENTER) {
    saveCanvas(`light-painting--${frameCount}`, "png");
  }
}

