// editor.p5js.org

function setup() {
  createCanvas(400, 400);
  background(220);
  noStroke();
}

function draw() {
  //   r    g  b, a
  fill("#0B00F077");
  // circle(mouseX, mouseY, 20);
  if (mouseY > height/2) noStroke();
  circle(random(-10, 10) + mouseX + 20, random(-20, 20) + mouseY, 20);
}
