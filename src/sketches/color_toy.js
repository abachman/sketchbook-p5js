function setup() {
  createCanvas(600, 600);
  noStroke();
  smooth();
  frameRate(0.2);
}

function draw() {
  background(0);

  let hw = width * .5
  let hh = height * .5

  pickFill(); // fill(255, 255, 0);
  rect(0, 0, hw, hh);

  pickFill(); // fill(255, 0, 0);
  rect(hw, 0, hw, hh);

  pickFill(); // fill(0, 255, 0);
  rect(0, hh, hw, hh);

  pickFill(); // fill(0, 0, 255);
  rect(hw, hh, hw, hh);

  fill(0);

  let qw = width * .25
  let qh = height * .25
  
  pickFill(); // fill(255, 0, 0);
  ellipse(qw, qh, qw, qh);

  pickFill(); // fill(0, 255, 0);
  ellipse(qw + hw, qh, qw, qh);

  pickFill(); // fill(0, 0, 255);
  ellipse(qw, qh + hh, qw, qh);
  
  pickFill(); // fill(255, 0, 255);
  ellipse(qw + hw, qh + hh, qw, qh);
}

function pickFill() {
  fill(random(255), random(255), random(255));
}