//  atan2 pointing https://editor.p5js.org/abachman/sketches/XpksMwBgx
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  const t = atan2(mouseY - height/2, mouseX - width/2);
  
  translate(width/2, height/2)
  line(10 * cos(t), 10 * sin(t), 0,0)
}
