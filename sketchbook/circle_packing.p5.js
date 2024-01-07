const INITIAL = 4;
const SPAWN_FRAMES = 8;
const GROW = 1;
const DRAW = "circles";
const ALLOW_INSIDE = true;

const circles = [];

function addCircle(existing) {
  let tries = 10;

  let c = {
    x: random(width),
    y: random(height),
    r: 2,
    growing: true,
    neighbors: [],
  };
  if (ALLOW_INSIDE) {
    c.touching = overlap(c);
  } else {
    c.touching = inside(c);
  }
    
  while (tries > 0 && existing.some(c.touching)) {
    c.x = random(width);
    c.y = random(height);
    tries--;
  }

  if (tries > 0) {
    existing.push(c);
    return true;
  }
}

function inside(c) {
  return function (other) {
    return other !== c && dist(c.x, c.y, other.x, other.y) < c.r + other.r;
  };
}

function overlap(c) {
  const margin = GROW * 3
  return function (other) {
    if (other === c) {
      return false
    }
    const dc = dist(c.x, c.y, other.x, other.y);
    if (dc < c.r + other.r) { // inside
      return other.growing || abs(other.r  - (dc + c.r)) < margin
    } else { // outside
      return abs(other.r - (dc - c.r)) < margin
    }
  }
}

function grow(cs) {
  cs.forEach((c) => {
    if (c.growing) {
      c.r += GROW;
      let touched;
      if ((touched = cs.find(c.touching))) {
        c.r -= 1;
        c.growing = false;
        c.col = color(random(360), 60, 90);

        touched.neighbors.push(c);
        c.neighbors.push(touched);
      }
    }
  });
}

function display(cs) {
  if (DRAW == "circles") {
    cs.forEach((c) => {
      fill(c.growing ? 220 : c.col);
      ellipse(c.x, c.y, c.r * 2);
    });
  } else if (DRAW == "lines") {
    cs.forEach((c) => {
      c.neighbors.forEach((n) => {
        if (c.col) {
          stroke(c.col);
          line(c.x, c.y, n.x, n.y);
        }
      });
    });
  }
}

// ------------------
// capture code
const CAPTURE = false;
const FRAMES = 900;
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
      screenshot();
      noLoop();
    }
  }
}
// -----------------

function setup() {
  createCanvas(400, 400);

  if (DRAW == "lines") {
    strokeWeight(2);
  } else {
    noStroke();
  }
  colorMode(HSB);

  for (let i = 0; i < INITIAL; i++) {
    addCircle(circles);
  }
}

let blocks = 0;
function draw() {
  startCapture();

  background(28);

  if (frameCount % SPAWN_FRAMES == 0) {
    const added = addCircle(circles);
    if (!added) {
      blocks++;
    }
  }

  if (blocks == 50) {
    // screenshot();
    while (circles.length > 0) { circles.pop() }
    blocks = 0;
    // noLoop();
  }

  grow(circles);
  display(circles);

  stopCapture();
}

function screenshot() {
  const name = `hidden-circle-tree--${frameCount}`;
  saveCanvas(name);
  console.log("tried to save", name);
}

function keyPressed() {
  if (key == "Enter") {
    console.log("screenshot!");
    screenshot();
  } else {
    console.log("boop", key);
  }
}
