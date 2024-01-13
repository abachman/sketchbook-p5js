//  Identicons https://editor.p5js.org/abachman/sketches/fijrFyXIH
const CELLS = 5;
const IMG = 200;
let img = null;
const s = [];

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  show();
}

function draw() {}

function show() {
  background(255);
  s.splice(0, s.length);
  const times = Math.floor(16 + Math.random() * 64);
  for (let c = 0; c < times; c++) {
    s.push(Math.floor(Math.random() * 17).toString(16));
  }
  img = generate(s.join(""));

  if (img) {
    image(img, width / 2, height / 2);
  }

  fill(0);
  text(s.join(""), 20, 20);
}

function mousePressed() {
  show();
}
// draw left, then flip right
/* e.g.

blank
_ _ _ _ _ 
_ _ _ _ _ 
_ _ _ _ _ 
_ _ _ _ _ 
_ _ _ _ _ 

draw
_ + _ _ _ 
+ _ + _ _ 
+ + _ _ _ 
+ _ + _ _ 
_ + + _ _ 

flip
_ + _ - _ 
+ _ + _ - 
+ + _ - -  
+ _ + _ - 
_ + + - _ 
*/
function generate(id) {
  const gr = createGraphics(IMG, IMG);
  const step = IMG / CELLS;
  const sh = (hash(id) + Math.pow(2, 31)).toString(16);
  let i = 0;

  // color
  const r = parseInt(sh.slice(i, i + 2), 16) % 256;
  i += 2;
  const g = parseInt(sh.slice(i, i + 2), 16) % 256;
  i += 2;
  const b = parseInt(sh.slice(i, i + 2), 16) % 256;

  // 5 rows, each one a 3 bit number
  // 3 bit numbers have a value in the range 0, 7
  // let i = 18;
  const bitlen = Math.ceil(CELLS / 2);
  const bitmod = Math.pow(2, bitlen);
  const bits = [];

  for (let n = 0; n < CELLS; n++) {
    bits.push(parseInt(sh.slice(i, i + 1), 16) % bitmod);
    // the hash function is only interesting in the first 4 bytes
    if (i + 1 >= 8) {
      i = 0;
    } else {
      i++;
    }
  }

  gr.noStroke();
  gr.fill(r, g, b);
  for (let row = 0; row < CELLS; row++) {
    let y = row * step;
    for (let col = 0; col < CELLS; col++) {
      let x = col * step;
      let cidx = Math.abs(col - Math.floor(CELLS / 2));

      if (bits[row] & Math.pow(2, cidx)) {
        gr.rect(x, y, step, step);
      }
    }
  }

  return gr;
}

function hash(b) {
  for (var a = 0, c = b.length; c--; )
    (a += b.charCodeAt(c)), (a += a << 10), (a ^= a >> 6);
  a += a << 3;
  a ^= a >> 11;
  return (((a + (a << 15)) & 4294967295) >>> 0).toString(16);
}

