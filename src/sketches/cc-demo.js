// Javascript is "dynamic"
let x = 0; // no more int, float, String, Array, ArrayList, color, color[]

// instead of void setup
function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  // make the ellipse move
  ellipse(x, mouseY, 30, 30);
  x = (x + 1) % width;
}

function mousePressed() {
  x = "Hello world";
  console.log(x);
  x = 0;
}