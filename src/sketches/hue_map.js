function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
}

function draw() {
  background(220);
  
  for (let x=0; x < width; x++) {
    stroke(map(x, 0, width, 0, 255), 100, 100)
    line(x, 0, x, height) 
  }
  
  text(mouseX, 10, 10)
  text(int(map(mouseX, 0, width, 0, 255)), 10, 20)
}