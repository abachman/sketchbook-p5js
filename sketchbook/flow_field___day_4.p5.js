//  flow field,  day 4 https://editor.p5js.org/abachman/sketches/N1QAqnwMA
// genuary 2022, day 4
let p, v;
let dir;
let scale = 0.015;
let step = 8;
let MODES = {
  LINE: "line",
  DOT: "dot",
};
let MODE = MODES.LINE;
let ALPH = false;

let palette = [
  "#D1B97F",
  "#2F211B",
  "#60C8D9",
  "#766e38",
  "#227388",
  "#91a570",
  "#796e63",
  "#ce3d1a",
  "#9cc1d6",
  "#263e86",
];

function setup() {
  createCanvas(400, 400);
  stroke(255, 30);
  noFill();
  background(0);
  strokeWeight(step);
  palette = palette.map((c) => {
    c = color(c);
    if (ALPH) c.setAlpha(100);
    return c;
  });
  dir = createVector(random(-1, 1), random(-1, 1));
}

function draw() {
  // p = createVector(floor(random(width/step)) * step, floor(random(height / step)) * step);
  p = createVector(random(-step, width), random(-step, height)); // , floor(random(height / step)) * step);
  v = dir.copy()
  v.normalize();

  let len = random(20, 40);

  // LINE BASED
  if (MODE == MODES.LINE) {
    beginShape();
    noFill();
    stroke(csamp());
    for (let i = 0; i < len; i++) {
      move(p, v);
      vertex(p.x, p.y);
    }
    endShape();
  } else if (MODE == MODES.DOT) {
    // // DOTTED
    noStroke();
    fill(csamp());
    for (let i = 0; i < len; i++) {
      move(p, v);
      ellipse(p.x, p.y, step);
    }
  }
}

function csamp() {
  return palette[floor(random(palette.length))];
}

function move(p, v) {
  let vel = v.copy();
  vel.rotate(rot(p.x, p.y));
  vel.mult(8);
  p.add(vel);
}

function rot(x, y) {
  // NOISE
  // return noise(p.x * scale, p.y * scale) * TWO_PI;
  // X CIRCLE
  // return map(x, 0, width, 0, PI)
  // Y CIRCLE
  return map(y, 0, height, PI, 0)
}

