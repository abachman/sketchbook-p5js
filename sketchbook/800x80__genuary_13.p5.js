//
// title: 800x80, genuary 13
// url: https://editor.p5js.org/abachman/sketches/y1FrVDp4g
// description: A simple implementation of Conway's Game of Life
// author: Adam Bachman
//
const STEP = 8,
  W = 800,
  H = 80;
const ROWS = H / STEP,
  COLS = W / STEP;

let World = [];

for (let y = 0; y < H / STEP; y++) {
  const r = [];
  for (let x = 0; x < W / STEP; x++) {
    r.push(false);
  }
  World.push(r);
}

function setup() {
  createCanvas(W, H);
  noStroke();
  // enableCapture({
  //   frameCount: 300,
  //   frameRate: 30
  // })
}

const MODELS = {
  glider: [
    [0, 0],
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 2],
  ],
  r: [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
  ],
};

// matrix moves
const Model = {
  transpose(model) {
    return model.map((coord) => coord.reverse());
  },

  flip(model) {
    // mirror over horizontal axis
    const ymax = model.reduce((p, c) => (p > c[1] ? p : c[1]), 0);
    return model.map((coord) => [
      coord[0],
      int(map(coord[1], 0, ymax, ymax, 0)),
    ]);
  },

  translate(model, cx, cy) {
    return model.map((coord) => [coord[0] + cx, coord[1] + cy]);
  },

  rotate(model, rot) {
    // left 90deg rotation
    let next = model.slice(0);
    for (let n = 0; n < rot; n++) {
      next = Model.flip(Model.transpose(next));
    }
    return next;
  },
};

// drop a random glider onto the world
function launch() {
  const model = 'glider'
  const next = Model.translate(
    Model.rotate(MODELS[model], floor(random(0, 4))),
    floor(random(COLS - 2)),
    floor(random(ROWS - 2))
  );
  next.forEach((coord) => (World[coord[1]][coord[0]] = true));
}

const UNIT_SQUARE = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

function neighbors(x, y, cb) {
  return UNIT_SQUARE.map((p) => [(COLS + p[0] + x) % COLS, (ROWS + p[1] + y) % ROWS]);
}

function draw() {
  // background(220);
  fill(80, 0, 0, 20);
  rect(0, 0, width, height)

  // update
  const next = [];
  for (let y = 0; y < ROWS; y++) {
    const r = [];
    for (let x = 0; x < COLS; x++) {
      let self = World[y][x];
      let alive = 0;
      const ns = neighbors(x, y);
      for (let n = 0; n < ns.length; n++) {
        alive += World[ns[n][1]][ns[n][0]] ? 1 : 0;
      }

      if (alive == 3) {
        r.push(true);
      } else if (self && alive == 2) {
        r.push(true);
      } else {
        r.push(false);
      }
    }
    next.push(r);
  }
  World = next;
  
  // display
  fill(100, 200, 240);
  for (let y = 0; y < ROWS; y++) {
    const r = [];
    for (let x = 0; x < COLS; x++) {
      if (World[y][x]) {
        rect(x * STEP, y * STEP, STEP);
      }
    }
  }

  if (frameCount % 20 == 0) {
    launch("glider");
  }
}

