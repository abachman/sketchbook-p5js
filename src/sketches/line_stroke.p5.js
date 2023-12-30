let held = false;
let points = [];

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
}

function draw() {
  background(0);
  stroke(255);

  // line(10, 10, 100, 200);
  if (held) {
    points.push(getPoint());
  }
  
  points.forEach((point, idx) => {
    stroke((idx * 5 + frameCount) % 255, 255, 255);
    if (idx > 0) {
      strokeWeight(dist(points[idx - 1].x, points[idx - 1].y, point.x, point.y));
      line(points[idx - 1].x, points[idx - 1].y, point.x, point.y);
    }
  })
}

function getPoint() {
  return {
    x: mouseX,
    y: mouseY,
  }
}

function mousePressed() {
  held = true;
  // points = [];
}

function mouseReleased() {
  held = false;
}