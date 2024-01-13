//  destroy a square, day 5 https://editor.p5js.org/abachman/sketches/u-EBIyXf-
//
// Destroy a square, #genuary2022 day 5, https://genuary.art/prompts#jan5
//
// Scattered lines in the square reveal the edges of the world 
// through progressive revelation of negative space. Given 
// enough time the square will be whole again.
//

const BORDER = 40;
const XOFF = 0.15;
const YOFF = 0.1;
const ROT = 3.1415 * 2;
const COLOR = [0, 255, 255];

const SCATTER = {
  x: true,
  y: true,
  rot: true,
  color: false,
};

function b(val) { return !!val ? '1' : '0' }
function zp(s) { return s.length == 1 ? `0${s}` : s }
function h(col) { return COLOR.map(c => (parseInt(c) % 256).toString(16)).map(zp).join('') }

function name() {
  const s = [SCATTER.x, SCATTER.y, SCATTER.rot, SCATTER.color].map(b).join('')
  return `2022-01-05--square--${h(COLOR)}-${BORDER}-${XOFF}-${YOFF}-${s}-${(ROT * 1000).toFixed(0)}--${frameCount}`
}

function rot() {
  if (SCATTER.rot) {
    return random(ROT);
  } else {
    return ROT;
  }
}

function setup() {
  createCanvas(400, 400);
  background(0);
  noFill();
  colorMode(SCATTER.color ? HSB : RGB);
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

function draw() {
  push();
  scolor();
  strokeWeight(2);
  translate(xoff(), yoff());
  rotate(rot());
  line(0, -height, 0, height);
  pop();

  border();
}

function keyPressed() {
  if (keyCode == ENTER) {
    saveCanvas(name(), 'png')
  }  
}

