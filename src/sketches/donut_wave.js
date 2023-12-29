window.setup = () => {
  createCanvas(400, 400, WEBGL);
  colorMode(HSB);
  noStroke();
  fill(200, 100, 100);
};

window.draw = () => {
  lights();
  background(220);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  torus(150, 75);
};
