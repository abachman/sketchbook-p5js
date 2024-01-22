//  Wandering Painters https://editor.p5js.org/abachman/sketches/nbXlCs11J
// Moving from a single actor to many
// (see goal image)

// Tools: 
// - the `for () {}` loop structure
// - 2 FloatList objects

// storing position

let length = 300;

// watch out for those Array constructors!
let x = []
let y = []
let c = []

function setup() {
  createCanvas(500, 500);
  background(0);
  stroke(255, 255, 255, 30);
  strokeWeight(4);

  let i = 0;
  while (i < length) {
    x[i] = random(width);
    y[i] = random(height);
    c[i] = random(180);
    i = i + 1;
  }
}

function draw() {
  let i = 0;
  while (i < x.length) {
    stroke(0, c[i], 0, 30);
    point(x[i], y[i]);
    x[i] = x[i] + random(-2, 2);
    y[i] = y[i] + random(-2, 2);
    i = i + 1;
  }
}

function keyPressed() {
  console.log("you commented out the save feature");
  // saveCanvas("screen.png");
}
