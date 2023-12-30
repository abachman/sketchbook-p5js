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
