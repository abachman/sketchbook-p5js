function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(210);
  translate(width / 2, height / 2);

  ellipse(0, 0, 2);
  [
    ["0", 0],
    ["PI * 0.5", PI / 2],
    ["PI", PI],
    ["PI * 1.5", PI * 1.5]
  ].forEach(([lbl, rot]) => {
    // VECTOR
    // const a = createVector(1, 0);
    // a.mult(50);
    // a.rotate(rot);
    // line(0, 0, a.x, a.y);
    // text(lbl, a.x, a.y);
    
    // POLAR
    const x = 50 * cos(rot);
    const y = 50 * sin(rot);
    line(0, 0, x, y);
    text(lbl, x, y);
  });
}
