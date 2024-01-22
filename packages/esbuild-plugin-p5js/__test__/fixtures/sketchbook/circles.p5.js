// name: like wind
// author: Adam B.
function setup() {
  createCanvas(800, 800);
  noStroke();
  enableCapture();
}

function draw() {
  if (frameCount % 10 === 0) {
    circle(random(width), random(height), 10)
  }
}
