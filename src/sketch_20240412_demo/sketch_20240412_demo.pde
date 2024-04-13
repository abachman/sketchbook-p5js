void setup() {
  size(400, 400);
  noStroke();
  background(20, 20, 50);
}

void draw() {
  fill(255);
  circle(mouseX, mouseY, 5);
}

void keyPressed() {
  if (key == ' ') {
    background(20, 20, 50);
  }
}
