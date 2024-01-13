//  DLA -- 02 https://editor.p5js.org/abachman/sketches/9FGH8Q-5w
// https://en.wikipedia.org/wiki/Diffusion-limited_aggregation
const SPEED = 4;
const SIZE = 7;
const COUNT = 4000;
const FRAME_COUNT = 150;
const ROUNDS = 1;
const GEN_RATE = 1;
const AGEOUT = 1000;
const CAPTURE = false;

let tree,
  world,
  qt,
  particles = [];

function setup() {
  createCanvas(400, 650);
  colorMode(HSB);

  // https://github.com/timohausmann/quadtree-ts
  qt = new Quadtree({
    width,
    height,
    x: 0, // optional, default:  0
    y: 0, // optional, default:  0
    maxObjects: 8, // optional, default: 10
    maxLevels: 4, // optional, default:  4
  });

  fill(255);
  noStroke();

  tree = new Tree(qt, world);
  for (let i = 0; i < COUNT; i++) {
    particles.push(new Particle(createVector(random(width), random(height))));
  }

  if (CAPTURE) {
    enableCapture({
      frameCount: -1,
      frameRate: 30,
      onComplete: () => {
        console.log("done!");
        noLoop();
      },
    });
  }
}

let gen = 0;
let done = false;
let seeded = false;
function draw() {
  let clean = false;

  if (!done) {
    for (let z = 0; z < ROUNDS; z++) {
      background(0);

      qt.clear();

      fill(30);
      for (let p of particles) {
        if (p.alive) {
          clean = true;
          qt.insert(p);
          p.update();
          p.display();
        }
      }

      tree.update(gen * GEN_RATE);
      tree.display();

      if (clean) {
        for (let i = particles.length - 1; i > 0; i--) {
          if (!particles[i].alive) {
            particles.splice(i, 1);
          }
        }
      }
      gen++;
    }

    if (tree.nodes.length > COUNT) {
      console.log("DONE", frameCount, {
        nodes: tree.nodes.length,
        particles: particles.length,
      });
      done = true;
      stopCapture();
      // noLoop();
    }
  }

  // if (frameCount > FRAME_COUNT) {
  //   console.log("ded");
  // }

  if (!seeded) {
    createSeed(random(width), random(height));
    seeded = true;
  }

  // if (frameCount % 15 == 0) {
  //   createSeed(random(width), random(height));
  // }
}

function mousePressed() {
  createSeed(mouseX, mouseY);
}

function createSeed(x, y) {
  const seed = new Particle(createVector(x, y));
  tree.add(seed);
}

class Tree {
  constructor(qt, g) {
    this.nodes = [];
    this.qt = qt;
    this.g = g;
  }

  add(particle, gen) {
    if (particle.treed) return;

    particle.treed = true;
    particle.gen = gen;
    this.nodes.push(particle);

    // this.g.fill(0, 100, 250, 130);
    // for (let node of this.nodes) {
    //   this.g.ellipse(particle.x, particle.y, SIZE - 2);
    // }
  }

  update(gen) {
    let nexts = [],
      node;
    for (let n = 0; n < this.nodes.length; n++) {
      node = this.nodes[n];
      if (gen - node.gen > AGEOUT) continue;
      if (node.seeded > 2) continue;

      const parts = this.qt.retrieve(node);
      for (let part of parts) {
        if (!part.alive) continue;
        const d = dist(node.x, node.y, part.x, part.y);
        if (d < SIZE) {
          nexts.push(part);
          part.alive = false;
          node.seeded++;
        }
      }
    }

    for (let particle of nexts) {
      this.add(particle, gen);
    }
  }

  display() {
    let node;
    for (let n = 0; n < this.nodes.length; n++) {
      node = this.nodes[n];
      fill(node.gen % 360, 100, 100);
      ellipse(node.x, node.y, SIZE);
    }
  }
}

class Particle extends Quadtree.Circle {
  constructor(p) {
    super({
      x: p.x,
      y: p.y,
      r: SIZE / 2,
    });
    this.alive = true;
    this.seeded = 0;
    this.treed = false;
    this.gen = 0;
  }

  update() {
    if (this.alive) {
      const v = p5.Vector.random2D();
      v.mult(SPEED);

      // this.p.add(v);
      this.x = constrain(this.x + v.x, 0, width);
      this.y = constrain(this.y + v.y, 0, height);
    }
  }

  display() {
    if (this.alive) {
      ellipse(this.x, this.y, SIZE);
    }
  }
}

