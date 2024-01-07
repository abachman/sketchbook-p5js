const NSCALE = 0.05;
const WIGGLE = 2;

let code;

// ------------------
// capture code
const CAPTURE = false;
const FRAMES = 300;
const capturer = new window.CCapture({
  framerate: 30,
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
  }
}
// -----------------


function setup() {
  createCanvas(400, 400);

  code = qrcode(4, "M");
  code.addData("https://editor.p5js.org/abachman/full/jI2UD0iiN", "Byte");
  code.make();
  
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(42);
  textStyle(BOLD);
  
  colorMode(HSB)
}

function draw() {
  startCapture();
  
  background('#dedede')

  const ox = 80;
  const oy = 20;

  const step = (width - ox * 2) / code.getModuleCount();
  const dark = color((frameCount * 0.5) % 360, 100, 50)
  
  fill(dark)
  
  for (var r = 0; r < code.getModuleCount(); r += 1) {
    for (var c = 0; c < code.getModuleCount(); c += 1) {
      if (!code.isDark(r, c)) continue;
      
      const w = map(
        noise(r * NSCALE, c * NSCALE, frameCount * NSCALE), 
        0, 1, 
        0, TWO_PI
      )
      
      const wx = WIGGLE * cos(w)
      const wy = WIGGLE * sin(w)
      
      rect(ox + c * step + wx, oy + r * step + wy, step + w)
    }
  }

  fill(30)
  text("this is not a NFT", width / 2, height - 20);
  
  if (frameCount == 30) screenshot();
  
  stopCapture();
}

function screenshot() {
  const rand = []
  for (let n=0; n < 3; n++) {
    rand.push(random(1000).toString())
  }
  const name = `this-is-not-a-nft--${btoa(rand.join('')).replace(/=/g, '')}`;
  saveCanvas(name, 'png');
  console.log("tried to save", name);
}
