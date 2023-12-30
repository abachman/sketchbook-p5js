const steps = []
const COUNT = 100

function setup() {
  createCanvas(400, 400, WEBGL);
  
  for (let i = 0; i < 100; i++) {
    steps.push( random(-0.4, 0.4) )
  }
}



function draw() {
  background(200);

  // const theta = noise(frameCount * 0.01) * TWO_PI;

  // camera(2 * sin(fc), 0, 2 * cos(fc), 0, 0, 0, 0, 1, 0);
  
  // rotateZ(theta);
  
  let lx = 0, ly = 0
  
  steps.forEach((step, i) => {
    console.log(step)
    fill(i * (256/steps.length))
    rotateZ(step);
    box(8)
    translate(0, -20);
    ly += -20
  })

  camera(lx, ly, height, lx, ly, 0);
  
  noLoop()
}