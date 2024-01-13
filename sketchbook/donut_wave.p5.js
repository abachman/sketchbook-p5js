//  donut wave https://editor.p5js.org/abachman/sketches/iwUNaSfvn
function setup() {
  createCanvas(400, 400, WEBGL);
  colorMode(HSB);
  noStroke();
  fill(200, 100, 100)
}

let x = 0;
let y = 0;
let c = 0;

function draw() {
  lights();
  background(220);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  torus(150, 75);
}

