/* 

interesting places to tweak: 
- these first 4 consts
- 

*/

const DIVERGE = 18;
const DJIT = 10;
const LENGTH = 20;
const LJIT = 7;

// weighted random branch collection
const GROWTH = [
  [1, 6],
  [2, 4],
  [3, 1],
  [4, 1],
];

const GENERATIONS = 10;

let t;

function branches() {
  const choice_weight = GROWTH.map(([v, w]) => w);
  const num_choices = GROWTH.length;
  let sum_of_weight = 0;
  for (let i = 0; i < num_choices; i++) {
    sum_of_weight += choice_weight[i];
  }
  let rnd = floor(random(sum_of_weight));
  for (let i = 0; i < num_choices; i++) {
    if (rnd < choice_weight[i]) {
      return GROWTH[i][0];
    }
    rnd -= choice_weight[i];
  }
  return 0;
}

function times(_n, cb) {
  const n = parseInt(_n);
  if (!n) return;
  for (let i = 0; i < n; i++) {
    cb(i);
  }
}

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

  t = new Branch(0, 0, 270, LENGTH);
  times(GENERATIONS, () => t.grow());
}

function draw() {
  background(200);
  translate(width / 2, height);
  t.display();
  noLoop();
}

class Branch {
  constructor(x, y, a, l, lvl = 0) {
    this.l = l;
    this.a = a; // constrain(a, 180, 360);
    this.s = createVector(x, y);

    const vx = l * cos(a);
    const vy = l * sin(a);

    this.e = createVector(vx, vy);
    this.edges = [];
    this.grown = false;

    this.lvl = lvl;
  }

  grow() {
    if (this.grown) {
      this.edges.forEach((e) => e.grow());
      return;
    }

    const bs = branches(); // floor(random(...GROWTH));

    times(bs, () => {
      const mod = random() > 0.5 ? 1 : -1;

      this.edges.push(
        new Branch(
          this.e.x,
          this.e.y,
          this.a + mod * (DIVERGE + random(-DJIT, DJIT)),
          abs(this.l + random(-LJIT, LJIT)),
          this.lvl + 1
        )
      );
    });

    this.grown = true;
  }

  display() {
    translate(this.s.x, this.s.y);

    stroke(255);
    strokeWeight(5);
    line(0, 0, this.e.x, this.e.y);

    this.edges.forEach((e) => {
      push();
      e.display();
      pop();
    });

    stroke(0);
    strokeWeight(1);
    line(0, 0, this.e.x, this.e.y);
  }
}
