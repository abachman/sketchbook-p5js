//  destroy packed circles, genuary 21 https://editor.p5js.org/abachman/sketches/pG3Z7woMh
//
// destroy packed circles, #genuary2022 day 21
//
// day 5 + day 12
//

// lines
const BORDER = 40;
const XOFF = 0.15;
const YOFF = 0.1;
const ROT = 3.1415 * 2;
const COLOR = [0, 255, 255];

const SCATTER = {
  x: true,
  y: true,
  rot: true,
  color: true,
};

// circles
const INITIAL = 4;
const SPAWN_FRAMES = 30;
const GROW = 0.2;
const DRAW = "circles";
const ALLOW_INSIDE = false;
const circles = [];

// image naming
function b(val) { return !!val ? '1' : '0' }
function zp(s) { return s.length == 1 ? `0${s}` : s }
function h(col) { return COLOR.map(c => (parseInt(c) % 256).toString(16)).map(zp).join('') }

function name() {
  const s = [SCATTER.x, SCATTER.y, SCATTER.rot, SCATTER.color].map(b).join('')
  return `2022-01-21--destroy-packed--${h(COLOR)}-${BORDER}-${XOFF}-${YOFF}-${s}-${(ROT * 1000).toFixed(0)}--${frameCount}`
}

let g

function setup() {
  createCanvas(400, 400);
  background(0);
  noFill();
  colorMode(SCATTER.color ? HSB : RGB);
  
  g = createGraphics(width, height);
  
  for (let i = 0; i < INITIAL; i++) {
    addCircle(circles);
  }
}

let blocks = 0;
function draw() {
  push();
  scolor();
  strokeWeight(2);
  translate(xoff(), yoff());
  rotate(rot());
  line(0, -height, 0, height);
  pop();
  
  // draw packed circles over lines as holes punched out
  if (frameCount % SPAWN_FRAMES == 0) {
    addCircle(circles);
  }
  grow(circles);
  g.background(0);
  g.erase();
  display(circles, g);
  
  image(g, 0, 0)
}

function keyPressed() {
  if (keyCode == ENTER) {
    saveCanvas(name(), 'png')
  }  
}

/* ------------------======================------------------
 * circle-packing.js
 * ------------------======================------------------ */

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

function display(cs, g) {
  if (DRAW == "circles") {
    cs.forEach((c) => {
      g.ellipse(c.x, c.y, c.r * 2);
    });
  } else if (DRAW == "lines") {
    cs.forEach((c) => {
      c.neighbors.forEach((n) => {
        if (c.col) {
          g.stroke(c.col);
          g.line(c.x, c.y, n.x, n.y);
        }
      });
    });
  }
}

/* ------------------======================------------------
 * line-drawing.js
 * ------------------======================------------------ */
function rot() {
  if (SCATTER.rot) {
    return random(ROT);
  } else {
    return ROT;
  }
}

function border() {
  const b = BORDER,
    hb = BORDER / 2;
  strokeWeight(b);
  stroke(0);
  rect(hb, hb, width - b, height - b);
}

function scolor() {
  if (SCATTER.color) {
    const [h, s, b] = COLOR;
    stroke(h, s, b, 0.2);
    COLOR[0] += 0.1;
  } else {
    stroke(...COLOR, 30);
  }
}

function xoff() {
  return SCATTER.x ? random(width) + height * XOFF : XOFF;
}

function yoff() {
  return SCATTER.y ? random(height) + height * YOFF : YOFF;
}

