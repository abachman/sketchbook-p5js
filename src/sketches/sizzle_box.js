function setup() {
  createCanvas(700, 700);
}

function draw() {
  fill(0, 0, map(mouseY, 0, height, 0, 255));

  // 
  translate(width / 2, height / 2);
  rotate(map(mouseX, 0, width, 0, TWO_PI));
  scale(map(mouseY, 0, height, 0.5, 2));

  square(-100, -100, 200);

  // background(255, 255, map(mouseY, 0, height, 255, 0));
}


function mymethod() {}