let STEP_SIZE = 2;
let RAD = 2;
let REPS = 100;

let p, dir;
let n = 1;
let numSteps = 1;
let sideCount = 0;
let numSides = 0;
let totalSteps;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  x = width / 2;
  y = height / 2;

  totalSteps = (width / STEP_SIZE) * (height / STEP_SIZE) + 1;
  precalc(totalSteps);

  p = createVector(x, y);
  dir = createVector(STEP_SIZE, 0);
  fill(255);
  stroke(255);
  textSize(10);
  textAlign(CENTER, CENTER);
  // }

  // function draw() {
  while (n <= totalSteps) {
    const from = p.copy();
    p.add(dir);

    stroke(200);
    strokeWeight(1);
    // line(from.x, from.y, p.x, p.y);

    if (PRIMES[n]) {
      fill(180, 255, 100);
      noStroke();
      ellipse(p.x, p.y, RAD);
    }

    sideCount++;
    n++;

    if (sideCount == numSteps) {
      numSides++;
      sideCount = 0;
      // turn left
      dir.rotate(-HALF_PI);
      if (numSides == 2) {
        // increase numSteps
        numSteps++;
        numSides = 0;
      }
    }

    if (n > totalSteps) {
      noLoop();
    }

    if (!isLooping()) {
      console.log("DONE!");
      console.log("n =", n);
    }
  }
}

const PRIMES = {};
const COMPS = {};

function precalc(mx) {
  let i = 2;
  while (i < mx) {
    if (!COMPS[i]) {
      PRIMES[i] = true;
      let ni = i + i;
      while (ni < mx) {
        COMPS[ni] = true;
        ni += i;
      }
    }
    i++;
  }

  console.log("precalc up to", mx);
}
