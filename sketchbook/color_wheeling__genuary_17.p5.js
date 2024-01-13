//  color wheeling, genuary 17 https://editor.p5js.org/abachman/sketches/dRXT5CdFy
const ROWS = 160;
const STEP = 5;

// color wheel separation
// 120 - triadic
// 20 - monochromatic
const SEP = 90;
const SATS = [60, 70, 80]
const BRITS = [60, 70, 90]

const PALETTE = [];
const LINE_COLORS = [];

let btn;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);

  gen();

  btn = createButton("RECOLOR");
  btn.addClass("button-50");
  btn.mouseClicked(gen);
}

function gen() {
  const root = floor(random(360)),
    s = shuff(SATS),
    b = shuff(BRITS);

  while (PALETTE.length > 0) PALETTE.pop();
  while (LINE_COLORS.length > 0) LINE_COLORS.pop();

  for (let i = 0; i < 3; i++) {
    PALETTE.push(color((root + SEP * i) % 360, s[i], b[i]));
  }

  for (let n = 0; n < ROWS; n++) {
    LINE_COLORS.push(PALETTE[floor(random(PALETTE.length))]);
  }
}

function shuff(array) {
  const rand = array.map(() => random());
  return array.sort(function (a, b) {
    return rand[a] - rand[b];
  });
}

function draw() {
  background(0);
  noFill();
  const high = STEP * 3;

  let ay = 0;
  for (let n = 0; n < ROWS; n++) {
    const nz = noise(n * 0.005, frameCount * 0.02);
    const th = STEP * 2 * nz;

    ay += th;

    stroke(LINE_COLORS[n]);
    strokeWeight(th);

    elps(ay);

    ay += th - 1;
  }

  stroke(16);
  strokeWeight(2);
  const sz = 16;
  
  for (let x = 0; x < 3; x++) {
    fill(PALETTE[x]);
    rect(10 + (x * (sz + 4)), height - (sz + 10), sz);
  }
}

function vert(ay) {
  line(ay, -2, ay, height + 2);
}

function horiz(ay) {
  line(-2, ay, width + 2, ay);
}

function elps(ay) {
  ellipse(width / 2, height / 2, ay);
}

