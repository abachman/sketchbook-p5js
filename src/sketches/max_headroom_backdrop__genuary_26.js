let a, b, c

// ------------------
// capture code
const CAPTURE = false;
const FRAMES = 900;
const capturer = new window.CCapture({
  framerate: 60,
  format: "webm",
  verbose: false,
});
let running = false;
let count = 0;
function startCapture() {
  if (CAPTURE && !running) {
    capturer.start();
    running = true;
  }
}
function stopCapture() {
  if (CAPTURE) {
    capturer.capture(document.getElementById("defaultCanvas0"));
    count++;

    if (count > FRAMES) {
      console.log("DONE");
      capturer.stop();
      capturer.save();
      noLoop();
    }
    
    if (count % 100 == 0) {
      console.log(count)
    }
  }
}
// -----------------


function setup() {
  createCanvas(800, 600, WEBGL);
  
  a = createGraphics(1600, 1600, P2D)
  stripes(a, "#ff70ff")
  
  b = createGraphics(1600, 1600, P2D)
  stripes(b, "#70ff8d")
  
  c = createGraphics(1600, 1600, P2D)
  stripes(c, "#4757ff")
}

function draw() {
  startCapture();
  
  // background(220);
  noStroke();
  
  // back wall
  texture(a)
  plane(800);
  
  // right wall
  push()
  translate(400, 0, 400);
  rotateY(radians(90));
  texture(b)
  plane(800);
  pop()
  
  // floor
  push();
  translate(0, 300, 400)
  rotateX(radians(90));
  texture(c);
  plane(800);
  pop();
  
  camera(0, 
         0, 
         (height/2) / tan(PI/6), 
         442 + sin(frameCount * 0.005) * 350, 
         400 + cos(frameCount * 0.003) * 350, 
         0, 
         0, 1, 0)
  
  stopCapture();
}

function stripes(g, c) {
  const step = 40
  const rows = 1600 / step

  g.background(0)
  g.strokeWeight(5)
  g.stroke(c)
  for (let y=0; y < (1600 / step); y++) {
    g.line(0, y * step, 1600, y * step);
  }
  
}