let points = [];
let COUNT = 3000

// let x, y;


function setup() {
  createCanvas(800, 800);

  noStroke();
  background(0);
  fill(255, 10);

  for (let i = 0; i < COUNT; i++) {
    points.push({
      x: random(width),
      y: random(height),
      c: random(255)
    })
  }
}

function draw() {
  // background(0);

  for (let i = 0; i < COUNT; i++) {
    let { x, y, c } = points[i];
    fill(c, 20);
    circle(x, y, 4);
    points[i].x += random(-2, map(mouseX, 0, width, 2, 6));
    points[i].y += random(-2, 2);
  }
}