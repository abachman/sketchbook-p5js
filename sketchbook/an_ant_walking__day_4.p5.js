// HEY LOOK AT THIS! IT'S LANGSTON' ANT!
// If you run it, it'll fill your dang hard drive with ant-life pngs.

// generates a random ruleset and runs an ant for awhile.
// see https://en.wikipedia.org/wiki/Langton%27s_ant for deets on how rules work

const ACOUNT = 1; // number of ants at one time (all have the same rules)
const STEP = 2; // size of grid cells (must evenly divide 400)
const COLOR_STEP = 37; // stepping through hues, small #, more reddish
const GENS = 1000; // simulation frames per drawing frame. lower == slower
const STATIC_RULES = null; // set to a string like "LRLLLLR" for a fixed pattern
const POSS = "RRRRRRLLLLLLNU"; // weighted set of potential rules
const PIC_AFTER = 300000; // save screenshot after generations

function td(ds) {
  return ds
    .split(" ")
    .map((p) => p.split(""))
    .reduce((m, o) => {
      m[o[0]] = o[1];
      return m;
    }, {});
}
let TURNS = {
  R: td("UR RD DL LU"),
  L: td("UL LD DR RU"),
  U: td("UD DU RL LR"),
  N: td("UU DD RR LL"),
};

class Ant {
  constructor(x, y, r, g) {
    this.x = x;
    this.y = y;
    this.g = g;
    this.dir = "U";
    this.rules = r;
    this.cols = this.g[0].length;
    this.rows = this.g.length;
  }

  update() {
    // 1. eval
    let color = this.g[this.y][this.x];

    // 2. turn
    let turn = this.rules[color];
    try {
      this.dir = TURNS[turn][this.dir];
    } catch (ex) {
      console.log(
        "error reading turn",
        turn,
        "with dir",
        this.dir,
        "from TURNS",
        TURNS
      );
    }

    // 3. flip cell to next state
    this.g[this.y][this.x] = (color + 1) % this.rules.length;

    // 4. move
    this.move();
  }

  move() {
    let dx = this.dir == "L" ? -1 : this.dir == "R" ? 1 : 0;
    let dy = this.dir == "U" ? -1 : this.dir == "D" ? 1 : 0;
    this.x += dx;
    this.y += dy;
    if (this.x >= this.cols) this.x = 0;
    if (this.x < 0) this.x = this.cols - 1;
    if (this.y >= this.rows) this.y = 0;
    if (this.y < 0) this.y = this.rows - 1;
  }
}

const world = [],
  prevWorld = [],
  ants = [];
let rules = [];
let ROWS, COLS;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  noStroke();
  background(0);

  ROWS = height / STEP;
  COLS = width / STEP;

  clean();
  init();
}

let gen = 0;

function draw() {
  // background(220);

  for (let n = 0; n < GENS; n++) {
    gen++;
    ants.forEach((ant) => ant.update());
  }

  for (let y = 0; y < COLS; y++) {
    for (let x = 0; x < ROWS; x++) {
      let c = world[y][x];
      if (c != prevWorld[y][x]) {
        fill((c * COLOR_STEP) % 255, 100, 100);
        rect(x * STEP, y * STEP, STEP);
        prevWorld[y][x] = c;
      }
    }
  }

  if (gen >= PIC_AFTER) {
    // saveCanvas(`ant-life-x${ACOUNT}-${rules.join("")}`, "png");
    gen = 0;
    // clean();
    init();
  }
}

function clean() {
  for (let y = 0; y < COLS; y++) {
    let r = [];
    for (let x = 0; x < ROWS; x++) {
      r.push(0);
    }

    if (typeof world[y] !== "undefined") {
      world[y] = r;
      prevWorld[y] = r.slice(0);
    } else {
      world.push(r);
      prevWorld.push(r.slice(0));
    }
  }
  background(0);
}

function init() {
  rules = [];

  if (STATIC_RULES == null) {
    let len = ceil(random(2, 8));
    for (let i = 0; i < len; i++) {
      rules.push(POSS[floor(random(POSS.length))]);
    }
  } else {
    rules = STATIC_RULES.split("");
  }

  if (ACOUNT > 1) {
    for (let i = 0; i < ACOUNT; i++) {
      ants.pop();
    }
    for (let i = 0; i < ACOUNT; i++) {
      ants.push(
        new Ant(floor(random(COLS)), floor(random(ROWS)), rules, world)
      );
    }
  } else {
    ants.pop();
    ants.push(new Ant(floor(COLS / 2), floor(ROWS / 2), rules, world));
  }

  console.log(rules.join(""));
}

function keyPressed() {
  if (keyCode == ENTER) noLoop();
  else if (key == " ") {
    // change it up
    clean();
    init();
  }
}
