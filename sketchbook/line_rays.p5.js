//  Line rays https://editor.p5js.org/abachman/sketches/b8wQI6rab
// aim a fuzzy line at a bouncing ball
let x = 0,
  y = 0,
  dx = 7,
  dy = 3;

function setup() {
  createCanvas(400, 400);
  background(100);
  stroke(255, 20);
  strokeWeight(4);
}


function draw() {
  let a = atan2(y - height / 2, x - width / 2);
  
  // show focus
  fill(0, 200, 0);
  ellipse(x, y, 5, 5);
  
  push()
  translate(width / 2, height / 2);
  rotate(a);
  line(0, 0, 300, 0);
  pop()

  x += dx
  y += dy

  if (x > width || x < 0) dx *= -1
  if (y > height || y < 0) dy *= -1
}
