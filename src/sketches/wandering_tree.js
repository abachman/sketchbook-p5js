let walkers = [];
let LEAF_GEN = 11;

function setup() {
  createCanvas(900, 900);
  background(220);
  generate();
}

function draw() {
  for (let w of walkers) {
    drawWalker(w);
    moveWalker(w);
  }
}

function newWalker(x, y, dir, gen) {
  return {
    x,
    y,
    dir, // angle in radians
    gen,
    life: random(20, 110),
    c: gen * 15,
    children: null,
  };
}

function newLeaf(x, y, dir) {
  return {
    x,
    y,
    dir, // angle in radians
    gen: LEAF_GEN,
    life: 15,
    c: color(10, random(100, 200), 50),
    children: null,
  };
}

function generate() {
  walkers.push(newWalker(width / 2, height, 2, 0));
}

function dead(w) {
  return w.x < 0 || w.x > width || w.y < 0 || w.y > height || w.life <= 0;
}

function drawWalker(w) {
  if (w.children) {
    for (let c of w.children) {
      drawWalker(c);
    }
  }

  if (dead(w)) {
    return;
  }

  if (w.gen === 11) {
    stroke(w.c);
    strokeWeight(2);
  } else {
    stroke(w.c);
    strokeWeight(1);
  }
  point(w.x, w.y);
}

function moveWalker(w) {
  if (w.children) {
    for (let c of w.children) {
      moveWalker(c);
    }
  }

  if (dead(w)) {
    return;
  }

  const r = random(0.4, 1.6);
  const t = (TWO_PI / 4) * w.dir + random(-0.6, 0.6);

  w.x += r * sin(t);
  w.y += r * cos(t);

  if (w.gen > 4 && random(1) < 0.02) {
    if (!w.children) w.children = [];
    w.children.push(newLeaf(w.x, w.y, w.dir - random(0.3)));
  }

  w.life--;
  if (w.life <= 0) {
    // split
    if (!w.children) w.children = [];

    if (w.gen < LEAF_GEN - 1 && w.dir > 0 && w.dir < PI) {
      w.children.push(newWalker(w.x, w.y, w.dir + random(0.3), w.gen + 1));
      w.children.push(newWalker(w.x, w.y, w.dir - random(0.3), w.gen + 1));
    } else if (w.gen === LEAF_GEN - 1) {
      w.children.push(newLeaf(w.x, w.y, w.dir - random(0.3)));
    }
  }
}

function keyPressed() {
  if (key == " ") {
    walkers = [];
    background(220);
    generate();
  }
}
