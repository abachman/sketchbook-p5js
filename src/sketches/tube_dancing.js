
function setup() {
  createCanvas(400, 400);
  background(0);
  noStroke()
  
  colorMode(HSB);
  
}

let x = 10;
let z = 10;
let c = 0;

function draw() {
  c = (c + 4) % 360
  fill(c, 100, 100)
  
  let vz = height - mouseY * 0.1
  
  let mx = random(width);
  let my = random(height)
  
  for (let i=0; i < 100; i++) {
    let vx = dist(mx, my, x, i * 4);
    ellipse(x + vx, i * 4, 40)
  }
}

function mousePressed() {
  fill(0)
  rect(0, 0, width, height)
}