//  palette image https://editor.p5js.org/abachman/sketches/pDSiFxrb2
const PALETTE = [];
function preload() {
  colorMode(HSB);
  loadImage("assets/merve-y-A52LbJNS5xc-unsplash.jpg", (i) => {
    const h = i.height,
      w = i.width;
    // i.loadPixels()
    const len = i.pixels.length;
    for (let n = 0; n < 24; n++) {
      PALETTE.push(i.get(floor(random(w)), floor(random(h))));
    }
  });
}

function brighten(arr, amt) {
  return arr.map((c, idx) => {
    const h = hue(c),
      s = saturation(c),
      b = brightness(c);
    return color(h, s, b * (1 + amt));
  });
}

function saturate(arr, amt) {
  return arr.map((c, idx) => {
    const h = hue(c),
      s = saturation(c),
      b = brightness(c);
    return color(h, s * (1 + amt), b);
  });
}

function setup() {
  createCanvas(400, 400);
  // frameRate(2);
  textAlign(LEFT, TOP);
}

function draw() {
  noStroke();

  // background(220);
  const xamt = norm(mouseX, 0, width);
  const yamt = norm(mouseY, 0, height);
  const plt = saturate(brighten(PALETTE, xamt), yamt);

  gen(plt);

  label(xamt.toFixed(2), 10, 10);
  label(yamt.toFixed(2), 10, 28);
}

function label(s, x, y) {
  fill(200);
  rect(x - 2, y - 3, textWidth(s) + 4, textAscent() + 4);
  fill(0);
  text(s, x, y);
}

function gen(palette) {
  let n = 0;
  const step = height / 10;
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      fill(palette[n++ % palette.length]);
      rect(x * step, y * step, step);
    }
  }

  //   for (let y=0; y < c; y++) {
  //     stroke(PALETTE[ floor(random(PALETTE.length)) ]);
  //     line(-10, y * step, width + 10, y * step)
  //   }
}

