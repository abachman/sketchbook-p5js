//  Bouncing triangle https://editor.p5js.org/abachman/sketches/2RQCsjhjI
var dx, dy;

function setup() {
  dx = random(10);
  dy = random(10);
  createCanvas(400, 400);
}


var pts = [{
    x: 25,
    y: 0
  },
  {
    x: 0,
    y: 50
  },
  {
    x: 50,
    y: 50
  }

];

function draw() {
  background(220);

  stroke(0);
  triangle(pts[0].x, pts[0].y, pts[1].x, pts[1].y, pts[2].x, pts[2].y);

  pts.forEach((p, idx) => {
    p.x += dx
    p.y += dy
  })

  if (pts[0].x > width || pts[0].x < 0) {
    dx *= -1
  }


  if (pts[0].y > height || pts[0].y < 0) {
    dy *= -1
  }
}
