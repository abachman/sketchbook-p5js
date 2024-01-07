const sphs = [];
// let img;

// function preload() {
//   img = loadImage('paper.jpg')
// }

function gen(y) {
  const RANGE = 200
  return [random(-RANGE, RANGE), y, random(-RANGE, RANGE)]
}


function setup() {
  createCanvas(400, 400, WEBGL);
  for (let y=-400; y <= 400; y += 10) {
    sphs.push(gen(-y));
  }
}

function draw() {
  background(0);
  // lights();
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;

  const cy = -frameCount * 1;
  
  // if (frameCount % 60 === 0) console.log(cy)

  ambientLight(100);
  
  rotateY(frameCount * 0.02);

  pointLight(40, 200, 100, -50, cy + 20, 50);
  pointLight(250, 100, 0, 29, cy, height / 2 / tan(PI / 6));
  pointLight(0, 100, 250, -10, cy - 20, 100);
  
  fill(200);
  noStroke();
  
  // texture(img)
  
  // ambientMaterial(50);
  // shininess(10);
  sphs.forEach(([x, y, z]) => {
    push();
    translate(x, y, z);
    sphere(30);
    pop();
  });

  camera(0, cy, height / 2 / tan(PI / 6), 0, cy, 0, 0, 1, 0);

  if (cy - 300 < sphs[sphs.length - 1][1] - 10) {
    for (let n = 0; n < 1; n++) {
      sphs.push(gen(cy - 300));
    }
  }

  //   if (frameCount % 60 == 0) console.log(cy)
  if (sphs[0][1] > cy + height / 2 + 100) sphs.shift();
}
