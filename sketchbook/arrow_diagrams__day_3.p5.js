// genuary 2022, day 3
class Particle {
  constructor(p, v) {
    Object.assign(this, { p, v });
    this.ang = 0;
    this.life = random(15, 90);
    this.alive = true;

    this.dang = random(0.1, 0.5);
    this.dvx = random(-0.5, 0.5);
    this.dvy = random(-0.5, 0.5);
    this.f = color(random(100, 255), random(0, 100), random(100, 200));
    if (random(1) < 0.1) this.f = color(255)
  }

  update() {
    this.life--;

    if (this.life <= 0) {
      this.alive = false;
    }

    // modify velocity
    this.ang = this.ang + this.dang; // % TWO_PI
    this.v.limit(2);
    this.v.add(this.dvx * sin(this.ang), this.dvy * cos(this.ang));

    this.p.add(this.v);
  }

  draw() {
    fill(this.f);
    ellipse(this.p.x, this.p.y, 4);
    if (!this.alive) {
      push()
      translate(this.p.x, this.p.y)
      rotate(this.v.heading())
      // triangle(0, 10, 5, -5, -5, -5)
      triangle(0, 6, 12, 0, 0, -6)
      pop()
    }
  }
}

let COUNT = 30;
let parts = [];

function setup() {
  createCanvas(400, 400);
  background(0);
  fill(50, 10, 200, 20);
  noStroke();
  for (let i = 0; i < COUNT; i++) {
    parts.push(spawn());
  }
}

function spawn() {
  return new Particle(
    createVector(random(width), random(height)),
    // p5.Vector.random2D()
    //   .mult(100)
    //   .add(width / 2, height / 2),
    p5.Vector.random2D().mult(2)
  );
}

function draw() {
  // background(0);

  parts.forEach((p, i) => {
    p.update();
    p.draw();
    if (!p.alive) parts[i] = spawn();
  });
}
