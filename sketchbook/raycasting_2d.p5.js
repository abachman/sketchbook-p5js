//  raycasting 2d https://editor.p5js.org/abachman/sketches/BTuwWi94v
//2D visibility
// Ray Casting

const CAPTURE = false;

let source = { pos: null, rays: [] };
let walls = [];
let xoff,cf,
  rad = 160,
  t = 0;

function setup() {
  createCanvas(400, 400);

  if (CAPTURE) {
    enableCapture({
      frameCount: 60,
      element: document.getElementById("defaultCanvas0"),
      onComplete: function () {
        noLoop();
      },
    });
  }
  
  xoff = width / 2 + rad * cos(radians(t));
  yoff = height / 2 + rad * sin(radians(t));

  source.pos = createVector(width / 2, height / 2);
  for (let i = 0; i < 360; i += 1) {
    source.rays.push(new Ray(source.pos, radians(i)));
  }

  for (let n = 0; n < 5; n++) {
    let x1 = random(width);
    let x2 = random(width);
    let y1 = random(height);
    let y2 = random(height);

    walls.push(new Boundary(x1, y1, x2, y2));
  }
  walls.push(new Boundary(0, 0, width, 0)); // top
  walls.push(new Boundary(0, 0, 0, height)); // left
  walls.push(new Boundary(width, 0, width, height)); // right
  walls.push(new Boundary(width, height, 0, height)); // bottom
}

function draw() {
  background(0);

  for (let wall of walls) {
    wall.show();
  }

  ellipse(source.pos.x, source.pos.y, 10);
  move(source);

  for (let ray of source.rays) {
    let closest;
    let record = Infinity;
    for (let wall of walls) {
      let pt = ray.cast(wall);
      if (pt) {
        const d = p5.Vector.dist(ray.pos, pt);
        if (d < record) {
          record = d;
          closest = pt;
        }
      }
    }

    if (closest) {
      stroke(255, 100);
      line(ray.pos.x, ray.pos.y, closest.x, closest.y);
    }
  }

  captureFrame();
}

function move(source) {
  source.pos.set(xoff, yoff);
  t += 1;

  xoff = width / 2 + rad * cos(radians(t));
  yoff = height / 2 + rad * sin(radians(t));
  // source.pos.set(noise(xoff) * width, noise(yoff) * height)
  // xoff += 0.005
  // yoff += 0.005
}

/* ------------------======================------------------
 * boundary.js
 * ------------------======================------------------ */
  class Boundary {
    constructor(x1, y1, x2, y2) {
      this.a = createVector(x1, y1)
      this.b = createVector(x2, y2)
    }

    show() {
      stroke(255)
      line(
        this.a.x,
        this.a.y,
        this.b.x,
        this.b.y
      )
    }
  }
/* ------------------======================------------------
 * ray.js
 * ------------------======================------------------ */
class Ray {
  constructor(pos, angle) {
    this.pos = pos
    this.dir = p5.Vector.fromAngle(angle)
  }

  lookAt(x, y) {
    this.dir.x = x - this.pos.x
    this.dir.y = y - this.pos.y
    this.dir.normalize()
  }

  show() {
    stroke(255, 50)

    push() // start changing geometry
    translate(this.pos.x, this.pos.y)
    line(0, 0, this.dir.x * 1000, this.dir.y * 1000)
    pop() // change geometry back
  }

  cast(wall) {
    // learn math!
    // line-line intersection

    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;
    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    if (denom == 0) {
      return
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom
    const u = - ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom
    if (t > 0 && t < 1 && u > 0) {
      const pt = createVector()
      pt.x = x1 + t * (x2 - x1)
      pt.y = y1 + t * (y2 - y1)
      return pt
    } else {
      return
    }
  }
}
