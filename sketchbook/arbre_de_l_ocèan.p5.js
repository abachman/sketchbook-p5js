//  Arbre de l'ocèan https://editor.p5js.org/abachman/sketches/_kxKSY7rm
// based on:
// https://www.reddit.com/r/processing/comments/h9idw1/arbre_de_loc%C3%A8an_processing/

const pale = [251, 234, 201];
const dark = [30];

const growths = [];
let running = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(pale);
  stroke(pale);
  strokeWeight(2);
  fill(dark);
}

function draw() {
  let dels = [];
  for (let i = 0; i < growths.length; i++) {
    let g = growths[i];

    if (typeof g === 'undefined') continue;

    ellipse(g[0], g[1], g[2]);

    g[0] += random(-12, 12); // wiggle left/right
    g[1] += random(-8, -3); // move up a bit
    g[2] -= random(-0.1, 2); // shrink (probably) a tiny bit    


    if (g[2] < 3) {
      // remove when it's too small
      dels.push(i);
    }
  }

  // do removal
  for (let i = dels.length - 1; i >= 0; i--) {
    growths.splice(i, 1);
  }

  // seed new growths
  if (running && frameCount % 3) {
    growths.push([width / 2 + random(-40, 40), height - random(40), 80]);
  }
}

// manually seed
function mousePressed() {
  growths.push([mouseX, mouseY, 80]);
}

// pause
function keyPressed() {
  running = !running;
}
