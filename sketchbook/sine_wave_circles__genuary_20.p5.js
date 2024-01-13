//  sine wave circles, genuary 20 https://editor.p5js.org/abachman/sketches/BwJHVtn6T
let CCOUNT = 1; // first slider, how many sine waves to smash up
let SPIKEY = 80; // second slider, how many cycles per sine wave

let COUNT = 160; // points to render
let STEP = 80; // space for each gem
let SCALE = 20; // size of gem

let compCount, compCountLabel, spikeLevel, spikeLevelLabel;

function setup() {
  createCanvas(400, 400);

  const l1 = createElement("label", "sine waves");
  compCountLabel = createElement("span");
  compCount = createSlider(1, 20, CCOUNT, 1);
  compCount.parent(l1);
  compCountLabel.parent(l1);

  const l2 = createElement("label", "spikiness");
  spikeLevel = createSlider(1, 100, SPIKEY, 4);
  spikeLevelLabel = createElement("span");
  spikeLevel.parent(l2);
  spikeLevelLabel.parent(l2);

  const doer = createButton("draw");

  doer.mouseClicked(() => {
    display();
  });

  // createElement('p', 'left slider: sine waves per circle')
  // createElement('p', 'right slider: spikiness')
  display();
}

function draw() {}

function display() {
  background(240);
  noFill();

  CCOUNT = compCount.value();
  SPIKEY = spikeLevel.value();

  compCountLabel.html(CCOUNT);
  spikeLevelLabel.html(SPIKEY);

  for (let y = 0; y < height / STEP; y++) {
    for (let x = 0; x < width / STEP; x++) {
      push();
      translate(STEP / 2 + x * STEP, STEP / 2 + y * STEP);
      generate(
        random(10000),
        SCALE,
        color(random(50, 100), random(80, 120), random(100, 240))
      );
      pop();
    }
  }
}

function generate(seed, scale, colr) {
  randomSeed(seed);

  const comps = [];
  const offs = [];
  const rs = [];

  for (let i = 0; i < CCOUNT; i++) {
    comps.push(ceil(random(3, SPIKEY)));
    offs.push(random(5));
  }

  for (let i = 0; i < COUNT + 1; i++) {
    const components = comps.map((factor, c) => {
      return (
        (scale / 7) * sin(map(i, 0, COUNT, offs[c], offs[c] + factor * TWO_PI))
      );
    });
    rs.push(scale + components.reduce((sum, val) => sum + val));
  }

  strokeWeight(2);

  let times = 2, // ceil(random(2, 5)),
    t = 0,
    nc = colr,
    drop = random(4, 10);
  do {
    stroke(nc);
    beginShape();
    for (let i = 0; i < COUNT + 1; i++) {
      const r = rs[i];
      const t = map(i, 0, COUNT, 0, TWO_PI);
      const x = r * cos(t);
      const y = r * sin(t);
      vertex(x, y);
    }
    endShape();
    t++;

    strokeWeight(1);
    nc = color(red(nc), green(nc), blue(nc), 100 - t * 10);
    if (random() > 0.5) {
      translate(0, drop);
    } else {
      translate(drop, 0);
    }
  } while (t < times);
}

